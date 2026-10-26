// @vitest-environment node
import { describe, expect, it } from 'vitest'

import { parseLesson } from './index'

const withStep = (block: string, preamble = '') =>
  parseLesson(
    `${preamble}# A {#a}\n\n## One {#one}\n\nProse.\n\n\`\`\`yaml krgz-step\n${block}\`\`\`\n`,
  )

const stepOf = (block: string) => withStep(block).lesson.chapters[0].steps[0]

describe('krgz-lesson block', () => {
  it('sets the immutable paths and stays out of the lesson', () => {
    const { lesson, issues } = parseLesson(
      '```yaml krgz-lesson\nimmutable:\n  - package.json\n  - lib/**\n```\n\n# A {#a}\n## One {#one}\n',
    )
    expect(issues).toEqual([])
    expect(lesson.immutable).toEqual(['package.json', 'lib/**'])
  })

  it('accepts an empty block', () => {
    const { lesson, issues } = parseLesson(
      '```yaml krgz-lesson\n```\n# A {#a}\n## One {#one}\n',
    )
    expect(issues).toEqual([])
    expect(lesson.immutable).toBeUndefined()
  })
})

describe('krgz-step block', () => {
  it('compiles removals, locks, preview and the body stays clean', () => {
    const { lesson, issues } = withStep(
      'removals: [about.html]\nlocks: [index.html, src/**]\npreview:\n  url: /about?x=1#top\n',
    )
    expect(issues).toEqual([])
    expect(lesson.chapters[0].steps[0]).toEqual({
      id: 'one',
      title: 'One',
      body: 'Prose.',
      removals: ['about.html'],
      locks: ['index.html', 'src/**'],
      preview: { url: '/about?x=1#top' },
    })
  })

  it('compiles editor directives', () => {
    const step = stepOf(
      'editor:\n  open:\n    - a.css\n    - path: b.js\n      line: 4\n  close: all\n  highlight:\n    - path: a.css\n      lines: 5\n',
    )
    expect(step.editor).toEqual({
      open: ['a.css', { path: 'b.js', line: 4 }],
      close: 'all',
      highlight: [{ path: 'a.css', lines: 5 }],
    })
  })

  it('accepts a list of paths to close', () => {
    expect(stepOf('editor:\n  close: [a.css]\n').editor).toEqual({
      close: ['a.css'],
    })
  })

  it.each([
    [
      '1-7, 13-17',
      [
        [1, 7],
        [13, 17],
      ],
    ],
    ['5', 5],
    ['3-5', [3, 5]],
    [
      '3, 5',
      [
        [3, 3],
        [5, 5],
      ],
    ],
    ['1, 3-4', [1, [3, 4]]],
    ['7-1', [7, 1]],
  ])('converts the lines shorthand %j', (shorthand, expected) => {
    const step = stepOf(
      `editor:\n  highlight:\n    - path: a.css\n      lines: "${shorthand}"\n`,
    )
    expect(step.editor?.highlight?.[0].lines).toEqual(expected)
  })

  it('passes LineSpec forms through unchanged', () => {
    const step = stepOf(
      'editor:\n  highlight:\n    - path: a.css\n      lines: [[1, 2], 4]\n',
    )
    expect(step.editor?.highlight?.[0].lines).toEqual([[1, 2], 4])
  })

  it('keeps block-free steps free of directive fields', () => {
    const { lesson } = parseLesson('# A {#a}\n## One {#one}\nx\n')
    expect(Object.keys(lesson.chapters[0].steps[0]).sort()).toEqual([
      'body',
      'id',
      'title',
    ])
  })
})

describe('block rules', () => {
  const ok = '# A {#a}\n## One {#one}\n'
  const step = (yaml: string) =>
    `# A {#a}\n\n## One {#one}\n\n\`\`\`yaml krgz-step\n${yaml}\`\`\`\n`

  const cases = [
    {
      rule: 'malformed-yaml',
      // YAML reports an unterminated list where the block ends.
      failing: step('locks: [a\n'),
      line: 7,
      passing: step('locks: [a]\n'),
    },
    {
      rule: 'unknown-key',
      failing: '```yaml krgz-lesson\nimmutible: [a]\n```\n' + ok,
      line: 2,
      passing: '```yaml krgz-lesson\nimmutable: [a]\n```\n' + ok,
    },
    {
      rule: 'unknown-key',
      failing: step('locks: [a]\nlock: [b]\n'),
      line: 7,
      passing: step('locks: [a]\n'),
    },
    {
      rule: 'unknown-key',
      failing: step('editor:\n  opn: [a]\n'),
      line: 7,
      passing: step('editor:\n  open: [a]\n'),
    },
    {
      rule: 'unknown-fence',
      failing: '# A {#a}\n\n## One {#one}\n\n```yaml krgz-chapter\n```\n',
      line: 5,
      passing: ok,
    },
    {
      rule: 'misplaced-lesson-block',
      failing: '# A {#a}\n\n## One {#one}\n\n```yaml krgz-lesson\n```\n',
      line: 5,
      passing: '```yaml krgz-lesson\n```\n' + ok,
    },
    {
      rule: 'duplicate-lesson-block',
      failing: '```yaml krgz-lesson\n```\n\n```yaml krgz-lesson\n```\n' + ok,
      line: 4,
      passing: '```yaml krgz-lesson\n```\n' + ok,
    },
    {
      rule: 'misplaced-step-block',
      failing: '```yaml krgz-step\n```\n' + ok,
      line: 1,
      passing: step(''),
    },
    {
      rule: 'misplaced-step-block',
      failing: '# A {#a}\n\n```yaml krgz-step\n```\n\n## One {#one}\n',
      line: 3,
      passing: step(''),
    },
    {
      rule: 'duplicate-step-block',
      failing: step('') + '\n```yaml krgz-step\n```\n',
      line: 8,
      passing: step(''),
    },
    {
      rule: 'invalid-value',
      failing: step('locks: index.html\n'),
      line: 6,
      passing: step('locks: [index.html]\n'),
    },
    {
      rule: 'invalid-value',
      failing: step(
        'editor:\n  highlight:\n    - path: a.css\n      lines: "a-b"\n',
      ),
      line: 9,
      passing: step(
        'editor:\n  highlight:\n    - path: a.css\n      lines: "1-2"\n',
      ),
    },
    {
      rule: 'invalid-value',
      failing: step('preview: /about\n'),
      line: 6,
      passing: step('preview:\n  url: /about\n'),
    },
  ]

  it.each(cases)('$rule fires on line $line', ({ rule, failing, line }) => {
    expect(parseLesson(failing).issues).toContainEqual(
      expect.objectContaining({ rule, severity: 'error', line }),
    )
  })

  it.each(cases)('$rule stays quiet on valid input', ({ rule, passing }) => {
    expect(parseLesson(passing).issues.map((i) => i.rule)).not.toContain(rule)
  })

  it('keeps the first of two step blocks', () => {
    const { lesson } = parseLesson(
      step('locks: [a]\n') + '\n```yaml krgz-step\nlocks: [b]\n```\n',
    )
    expect(lesson.chapters[0].steps[0].locks).toEqual(['a'])
  })

  it('removes misplaced and unknown krgz blocks from the body', () => {
    const { lesson } = parseLesson(
      '# A {#a}\n\n## One {#one}\n\nProse.\n\n```yaml krgz-chapter\n```\n\n```yaml krgz-lesson\n```\n',
    )
    expect(lesson.chapters[0].steps[0].body).toBe('Prose.')
  })

  it('attaches the chapter and step ids to step block issues', () => {
    const { issues } = parseLesson(step('lock: [b]\n'))
    expect(issues[0]).toMatchObject({ chapterId: 'a', stepId: 'one' })
  })
})
