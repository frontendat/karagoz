// @vitest-environment node
import { describe, expect, it } from 'vitest'

import { parseLesson } from './index'

const file = (path: string, body = '', attrs = '') =>
  `\`\`\`css file=${path}${attrs}\n${body}\`\`\`\n`

const adjustments = (source: string, chapter: string, step: string) =>
  parseLesson(source)
    .lesson.chapters.find((c) => c.id === chapter)
    ?.steps.find((s) => s.id === step)?.adjustments

const contents = (css = 'a {}\n') => ({ 'a.css': { file: { contents: css } } })

describe('from= references', () => {
  it('reuses a file from an earlier step in the same chapter by bare step id', () => {
    const source = `# A {#a}\n## One {#one}\n${file('a.css', 'a {}\n')}## Two {#two}\n${file('a.css', '', ' from=one')}`
    const { lesson, issues } = parseLesson(source)
    expect(issues).toEqual([])
    expect(lesson.chapters[0].steps[1].adjustments).toEqual(contents())
  })

  it('reuses a file from another chapter with chapter/step', () => {
    const source = `# A {#a}\n## One {#one}\n${file('a.css', 'a {}\n')}# B {#b}\n## Two {#two}\n${file('a.css', '', ' from=a/one')}`
    expect(adjustments(source, 'b', 'two')).toEqual(contents())
  })

  it('reuses the base version with from=base', () => {
    const source = `${file('a.css', 'base {}\n')}# A {#a}\n## One {#one}\n${file('a.css', '', ' from=base')}`
    expect(adjustments(source, 'a', 'one')).toEqual(contents('base {}\n'))
  })

  it('follows a chain of references', () => {
    const source = `# A {#a}\n## One {#one}\n${file('a.css', 'a {}\n')}## Two {#two}\n${file('a.css', '', ' from=one')}## Three {#three}\n${file('a.css', '', ' from=two')}`
    const { lesson, issues } = parseLesson(source)
    expect(issues).toEqual([])
    expect(lesson.chapters[0].steps[2].adjustments).toEqual(contents())
  })

  it('allows a forward reference', () => {
    const source = `# A {#a}\n## One {#one}\n${file('a.css', '', ' from=two')}## Two {#two}\n${file('a.css', 'late {}\n')}`
    const { lesson, issues } = parseLesson(source)
    expect(issues).toEqual([])
    expect(lesson.chapters[0].steps[0].adjustments).toEqual(
      contents('late {}\n'),
    )
  })

  it('takes the target path from the referencing fence, not the file name of the source', () => {
    const source = `# A {#a}\n## One {#one}\n${file('a.css', 'a {}\n')}## Two {#two}\n${file('b.css', '', ' from=one')}`
    const { issues } = parseLesson(source)
    expect(issues.map((i) => i.rule)).toEqual(['ref-missing-path'])
  })

  it('removes the reference fence from the body', () => {
    const source = `# A {#a}\n## One {#one}\n${file('a.css', 'a {}\n')}## Two {#two}\nProse.\n\n${file('a.css', '', ' from=one')}`
    expect(parseLesson(source).lesson.chapters[0].steps[1].body).toBe('Prose.')
  })
})

describe('reference rules', () => {
  const steps = (one: string, two: string) =>
    `# A {#a}\n## One {#one}\n${one}## Two {#two}\n${two}`

  const cases = [
    {
      rule: 'ref-unknown-step',
      failing: steps(file('a.css', 'x\n'), file('a.css', '', ' from=nope')),
      line: 7,
      passing: steps(file('a.css', 'x\n'), file('a.css', '', ' from=one')),
    },
    {
      rule: 'ref-unknown-step',
      failing: steps(file('a.css', 'x\n'), file('a.css', '', ' from=z/one')),
      line: 7,
      passing: steps(file('a.css', 'x\n'), file('a.css', '', ' from=a/one')),
    },
    {
      rule: 'ref-missing-path',
      failing: steps(file('b.css', 'x\n'), file('a.css', '', ' from=one')),
      line: 7,
      passing: steps(file('a.css', 'x\n'), file('a.css', '', ' from=one')),
    },
    {
      rule: 'ref-cycle',
      failing: steps(
        file('a.css', '', ' from=two'),
        file('a.css', '', ' from=one'),
      ),
      line: 3,
      passing: steps(file('a.css', 'x\n'), file('a.css', '', ' from=one')),
    },
    {
      rule: 'ref-cycle',
      failing: steps(file('a.css', '', ' from=one'), ''),
      line: 3,
      passing: steps(file('a.css', 'x\n'), ''),
    },
    {
      rule: 'ref-with-body',
      failing: steps(
        file('a.css', 'x\n'),
        file('a.css', 'not empty\n', ' from=one'),
      ),
      line: 7,
      passing: steps(file('a.css', 'x\n'), file('a.css', '', ' from=one')),
    },
    {
      rule: 'conflicting-file-source',
      failing: steps(
        file('a.css', 'x\n'),
        file('a.css', '', ' from=one src=./a.css'),
      ),
      line: 7,
      passing: steps(file('a.css', 'x\n'), file('a.css', '', ' from=one')),
    },
  ]

  it.each(cases)('$rule fires on line $line', ({ rule, failing, line }) => {
    expect(parseLesson(failing).issues).toContainEqual(
      expect.objectContaining({
        rule,
        severity: 'error',
        line,
        path: 'a.css',
      }),
    )
  })

  it.each(cases)('$rule stays quiet on valid input', ({ rule, passing }) => {
    expect(parseLesson(passing).issues.map((i) => i.rule)).not.toContain(rule)
  })

  it('reports a failing chain once, at the broken link', () => {
    const { issues } = parseLesson(
      `# A {#a}\n## One {#one}\n${file('b.css', 'x\n')}## Two {#two}\n${file('a.css', '', ' from=one')}## Three {#three}\n${file('a.css', '', ' from=two')}`,
    )
    expect(issues.map((i) => [i.rule, i.line])).toEqual([
      ['ref-missing-path', 7],
    ])
  })

  it('reports a two-step cycle once', () => {
    const { issues } = parseLesson(
      steps(file('a.css', '', ' from=two'), file('a.css', '', ' from=one')),
    )
    expect(issues.filter((i) => i.rule === 'ref-cycle')).toHaveLength(1)
  })

  it('skips an unresolved file but still compiles the step', () => {
    const { lesson } = parseLesson(
      steps(file('a.css', 'x\n'), 'Prose.\n' + file('a.css', '', ' from=nope')),
    )
    const two = lesson.chapters[0].steps[1]
    expect(two.adjustments).toBeUndefined()
    expect(two.body).toBe('Prose.')
  })

  it('does not resolve a bare step id outside a chapter', () => {
    const { issues } = parseLesson(
      `${file('a.css', '', ' from=one')}# A {#a}\n## One {#one}\nx\n`,
    )
    expect(issues.map((i) => i.rule)).toContain('ref-unknown-step')
  })
})
