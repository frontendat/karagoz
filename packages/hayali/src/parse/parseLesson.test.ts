// @vitest-environment node
import { describe, expect, it } from 'vitest'

import { parseLesson } from './index'

describe('parseLesson structure', () => {
  it('compiles an H1 to a chapter and an H2 to a step with its body', () => {
    const { lesson, issues } = parseLesson(
      '# The page {#basics}\n\n## Style {#style}\n\nBody text.\n',
    )

    expect(issues).toEqual([])
    expect(lesson).toEqual({
      chapters: [
        {
          id: 'basics',
          title: 'The page',
          steps: [{ id: 'style', title: 'Style', body: 'Body text.' }],
        },
      ],
    })
  })
})

describe('parseLesson compile', () => {
  const steps = (source: string) =>
    parseLesson(source).lesson.chapters.flatMap((c) => c.steps)

  it('trims the body and ends it at the next heading', () => {
    expect(
      steps(
        '# A {#a}\n\n## One {#one}\n\n\n  text  \n\n\n## Two {#two}\nmore\n',
      ).map((s) => s.body),
    ).toEqual(['text', 'more'])
  })

  it('keeps H3+ headings, callouts and plain fences in the body', () => {
    const body = '### Sub\n\n:::tip\nHi\n:::\n\n```js\nlet a = 1\n```'
    expect(steps(`# A {#a}\n\n## One {#one}\n\n${body}\n`)[0].body).toBe(body)
  })

  it('ignores headings inside fences, quotes and lists', () => {
    const body =
      '```md\n# Not {#x}\n## Nor {#y}\n```\n\n> # Quoted {#q}\n\n- ## Listed {#l}'
    const { lesson, issues } = parseLesson(
      `# A {#a}\n\n## One {#one}\n\n${body}\n`,
    )
    expect(issues).toEqual([])
    expect(lesson.chapters[0].steps).toHaveLength(1)
    expect(lesson.chapters[0].steps[0].body).toBe(body)
  })

  it('ignores the preamble prose and anything before the first chapter', () => {
    const { lesson, issues } = parseLesson(
      'Some intro.\n\n# A {#a}\n\n## One {#one}\n\nx\n',
    )
    expect(issues).toEqual([])
    expect(lesson.chapters).toHaveLength(1)
  })

  it('allows the same step id in different chapters', () => {
    const { issues } = parseLesson('# A {#a}\n## S {#s}\n# B {#b}\n## S {#s}\n')
    expect(issues).toEqual([])
  })

  it('returns an empty lesson for empty input', () => {
    expect(parseLesson('')).toMatchObject({
      lesson: { chapters: [] },
      issues: [],
      srcPaths: [],
    })
  })
})

describe('parseLesson structure rules', () => {
  const ok = '# A {#a}\n\n## One {#one}\n\nx\n'

  const cases: {
    rule: string
    failing: string
    line: number
    passing: string
  }[] = [
    {
      rule: 'missing-id',
      failing: '# A\n\n## One {#one}\n',
      line: 1,
      passing: ok,
    },
    {
      rule: 'missing-id',
      failing: '# A {#a}\n\n## One\n',
      line: 3,
      passing: ok,
    },
    {
      rule: 'invalid-id',
      failing: '# A {#a b}\n\n## One {#one}\n',
      line: 1,
      passing: ok,
    },
    {
      rule: 'invalid-id',
      failing: '# A {#a}\n\n## One {#}\n',
      line: 3,
      passing: ok,
    },
    {
      rule: 'duplicate-id',
      failing: '# A {#a}\n## One {#one}\n# B {#a}\n## Two {#two}\n',
      line: 3,
      passing: ok,
    },
    {
      rule: 'duplicate-id',
      failing: '# A {#a}\n## One {#one}\n## Again {#one}\n',
      line: 3,
      passing: ok,
    },
    {
      rule: 'step-outside-chapter',
      failing: '## One {#one}\n\n# A {#a}\n## Two {#two}\n',
      line: 1,
      passing: ok,
    },
    {
      rule: 'empty-chapter',
      failing: '# A {#a}\n## One {#one}\n# B {#b}\n',
      line: 3,
      passing: ok,
    },
    {
      rule: 'unclosed-fence',
      failing: '# A {#a}\n## One {#one}\n\n```js\nlet a\n',
      line: 4,
      passing: '# A {#a}\n## One {#one}\n\n```js\nlet a\n```\n',
    },
    {
      rule: 'unclosed-fence',
      failing: '# A {#a}\n## One {#one}\n\n````\n```\n',
      line: 4,
      passing: '# A {#a}\n## One {#one}\n\n````\n```\n````\n',
    },
  ]

  it.each(cases)('$rule fires on line $line', ({ rule, failing, line }) => {
    const { issues } = parseLesson(failing)
    expect(issues).toContainEqual(
      expect.objectContaining({ rule, severity: 'error', line }),
    )
  })

  it.each(cases)('$rule stays quiet on valid input', ({ rule, passing }) => {
    expect(parseLesson(passing).issues.map((i) => i.rule)).not.toContain(rule)
  })

  it('drops the steps of a chapter it could not build without further noise', () => {
    const { lesson, issues } = parseLesson('# A\n\n## One {#one}\n')
    expect(lesson.chapters).toEqual([])
    expect(issues.map((i) => i.rule)).toEqual(['missing-id'])
  })

  it('keeps the first of two duplicate steps', () => {
    const { lesson } = parseLesson(
      '# A {#a}\n## One {#one}\nfirst\n## Again {#one}\nsecond\n',
    )
    expect(lesson.chapters[0].steps.map((s) => s.body)).toEqual(['first'])
  })
})
