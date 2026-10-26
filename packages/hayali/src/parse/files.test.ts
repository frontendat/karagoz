// @vitest-environment node
import { describe, expect, it } from 'vitest'

import { parseLesson } from './index'

const lesson = (steps: string, preamble = '') =>
  parseLesson(`${preamble}# A {#a}\n\n## One {#one}\n\n${steps}`)

describe('file fences', () => {
  it('turns fences before the first chapter into base files', () => {
    const { lesson: l, issues } = parseLesson(
      '```json file=package.json\n{ "name": "x" }\n```\n```css file=src/style.css\nbody {}\n```\n\n# A {#a}\n## One {#one}\n',
    )
    expect(issues).toEqual([])
    expect(l.files).toEqual({
      'package.json': { file: { contents: '{ "name": "x" }\n' } },
      src: {
        directory: { 'style.css': { file: { contents: 'body {}\n' } } },
      },
    })
  })

  it('turns fences inside a step into its adjustments', () => {
    const { lesson: l, issues } = lesson(
      'Text.\n\n```css file=style.css\nbody { margin: 0; }\n```\n',
    )
    expect(issues).toEqual([])
    expect(l.files).toBeUndefined()
    expect(l.chapters[0].steps[0].adjustments).toEqual({
      'style.css': { file: { contents: 'body { margin: 0; }\n' } },
    })
  })

  it('removes file fences from the body and keeps plain fences', () => {
    const { lesson: l } = lesson(
      'Before.\n\n```css file=style.css\na {}\n```\n\nAfter.\n\n```js\nlet a\n```\n',
    )
    expect(l.chapters[0].steps[0].body).toBe(
      'Before.\n\nAfter.\n\n```js\nlet a\n```',
    )
  })

  it('does not depend on where in the step the fence sits', () => {
    const { lesson: l } = lesson('```css file=a.css\n1\n```\n\nProse.\n')
    expect(l.chapters[0].steps[0].body).toBe('Prose.')
    expect(l.chapters[0].steps[0].adjustments).toBeDefined()
  })

  it('normalizes paths like directive paths', () => {
    const { lesson: l } = lesson('```css file=./src//a.css\n1\n```\n')
    expect(l.chapters[0].steps[0].adjustments).toEqual({
      src: { directory: { 'a.css': { file: { contents: '1\n' } } } },
    })
  })

  it('reads the file attribute whatever the language word is', () => {
    const { lesson: l } = lesson('``` file=a.txt\nhi\n```\n')
    expect(l.chapters[0].steps[0].adjustments).toEqual({
      'a.txt': { file: { contents: 'hi\n' } },
    })
  })

  it('keeps an empty fence as an empty file', () => {
    const { lesson: l, issues } = lesson('```css file=a.css\n```\n')
    expect(issues).toEqual([])
    expect(l.chapters[0].steps[0].adjustments).toEqual({
      'a.css': { file: { contents: '' } },
    })
  })

  it('does not treat a file attribute in a quoted info word as a file', () => {
    const { lesson: l } = lesson('```js title="file=x"\nlet a\n```\n')
    expect(l.chapters[0].steps[0].adjustments).toBeUndefined()
    expect(l.chapters[0].steps[0].body).toContain('let a')
  })

  it('survives a __proto__ path segment', () => {
    const { lesson: l } = lesson('```js file=__proto__/x.js\n1\n```\n')
    expect(
      Object.getPrototypeOf(l.chapters[0].steps[0].adjustments ?? {}),
    ).toBe(Object.prototype)
  })
})

describe('file fence rules', () => {
  const cases = [
    {
      rule: 'missing-file-path',
      failing: '```js file=\nlet a\n```\n',
      line: 5,
      passing: '```js file=a.js\nlet a\n```\n',
    },
    {
      rule: 'missing-file-path',
      failing: '```js file\nlet a\n```\n',
      line: 5,
      passing: '```js file=a.js\nlet a\n```\n',
    },
    {
      rule: 'duplicate-file',
      failing: '```js file=a.js\n1\n```\n\n```js file=./a.js\n2\n```\n',
      line: 9,
      passing: '```js file=a.js\n1\n```\n\n```js file=b.js\n2\n```\n',
    },
    {
      rule: 'duplicate-file',
      failing: '```js file=a\n1\n```\n\n```js file=a/b.js\n2\n```\n',
      line: 9,
      passing: '```js file=a/c.js\n1\n```\n\n```js file=a/b.js\n2\n```\n',
    },
  ]

  it.each(cases)('$rule fires on line $line', ({ rule, failing, line }) => {
    expect(lesson(failing).issues).toContainEqual(
      expect.objectContaining({
        rule,
        severity: 'error',
        line,
        chapterId: 'a',
        stepId: 'one',
      }),
    )
  })

  it.each(cases)('$rule stays quiet on valid input', ({ rule, passing }) => {
    expect(lesson(passing).issues.map((i) => i.rule)).not.toContain(rule)
  })

  it('reports duplicate base files without a step', () => {
    const { issues, lesson: l } = parseLesson(
      '```js file=a.js\n1\n```\n```js file=a.js\n2\n```\n\n# A {#a}\n## One {#one}\n',
    )
    expect(issues).toContainEqual(
      expect.objectContaining({
        rule: 'duplicate-file',
        line: 4,
        path: 'a.js',
      }),
    )
    expect(l.files).toEqual({ 'a.js': { file: { contents: '1\n' } } })
  })

  it('reports a file fence in a chapter intro instead of dropping it silently', () => {
    const { issues, lesson: l } = parseLesson(
      '# A {#a}\n\n```js file=a.js\n1\n```\n\n## One {#one}\nProse.\n',
    )
    expect(issues).toContainEqual(
      expect.objectContaining({
        rule: 'file-outside-step',
        severity: 'error',
        line: 3,
        chapterId: 'a',
      }),
    )
    expect(l.chapters[0].steps[0].adjustments).toBeUndefined()
  })

  it('stays quiet about fences under a heading that was already rejected', () => {
    const { issues } = parseLesson(
      '# A {#a}\n\n## One\n\n```js file=a.js\n1\n```\n\n```yaml krgz-step\n```\n',
    )
    expect(issues.map((i) => i.rule).sort()).toEqual([
      'empty-chapter',
      'missing-id',
    ])
  })
})
