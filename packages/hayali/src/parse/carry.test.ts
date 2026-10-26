// @vitest-environment node
import { describe, expect, it } from 'vitest'

import { parseLesson } from './index'

const css = (path: string, body = '', attrs = '') =>
  `\`\`\`css file=${path}${attrs}\n${body}\`\`\`\n`

const block = (yaml: string) => `\`\`\`yaml krgz-step\n${yaml}\`\`\`\n`

const step = (id: string, ...parts: string[]) =>
  `## ${id} {#${id}}\n${parts.join('')}`

const file = (contents: string) => ({ file: { contents } })

describe('carry', () => {
  it('includes the files of the carried step', () => {
    const { lesson, issues } = parseLesson(
      `# A {#a}\n${step('one', css('a.css', '1\n'), css('b.css', '2\n'))}${step('two', block('carry: one\n'))}`,
    )
    expect(issues).toEqual([])
    expect(lesson.chapters[0].steps[1].adjustments).toEqual({
      'a.css': file('1\n'),
      'b.css': file('2\n'),
    })
  })

  it('lets the step own fences win on the same path and add more', () => {
    const { lesson } = parseLesson(
      `# A {#a}\n${step('one', css('a.css', '1\n'))}${step('two', block('carry: one\n'), css('a.css', 'new\n'), css('c.css', '3\n'))}`,
    )
    expect(lesson.chapters[0].steps[1].adjustments).toEqual({
      'a.css': file('new\n'),
      'c.css': file('3\n'),
    })
  })

  it('carries through a chain, with from= already expanded', () => {
    const { lesson, issues } = parseLesson(
      `${css('b.css', 'base\n')}# A {#a}\n${step('one', css('a.css', 'x\n'))}${step('two', block('carry: one\n'), css('b.css', '', ' from=base'))}${step('three', block('carry: two\n'))}`,
    )
    expect(issues).toEqual([])
    expect(lesson.chapters[0].steps[2].adjustments).toEqual({
      'a.css': file('x\n'),
      'b.css': file('base\n'),
    })
  })

  it('carries from another chapter with chapter/step', () => {
    const { lesson } = parseLesson(
      `# A {#a}\n${step('one', css('a.css', '1\n'))}# B {#b}\n${step('two', block('carry: a/one\n'))}`,
    )
    expect(lesson.chapters[1].steps[0].adjustments).toEqual({
      'a.css': file('1\n'),
    })
  })

  it('allows a forward carry', () => {
    const { lesson, issues } = parseLesson(
      `# A {#a}\n${step('one', block('carry: two\n'))}${step('two', css('a.css', '2\n'))}`,
    )
    expect(issues).toEqual([])
    expect(lesson.chapters[0].steps[0].adjustments).toEqual({
      'a.css': file('2\n'),
    })
  })

  it('does not carry locks, editor directives, removals or base files', () => {
    const { lesson } = parseLesson(
      `${css('base.css')}# A {#a}\n${step('one', block('locks: [a.css]\nremovals: [x.css]\neditor:\n  open: [a.css]\n'))}${step('two', block('carry: one\n'))}`,
    )
    expect(lesson.chapters[0].steps[1]).toEqual({
      id: 'two',
      title: 'two',
      body: '',
    })
  })

  it('carries nothing from a step without adjustments', () => {
    const { lesson, issues } = parseLesson(
      `# A {#a}\n${step('one', 'Prose.\n')}${step('two', block('carry: one\n'))}`,
    )
    expect(issues).toEqual([])
    expect(lesson.chapters[0].steps[1].adjustments).toBeUndefined()
  })

  it('keeps removals of the carrying step next to the carried files', () => {
    const { lesson } = parseLesson(
      `# A {#a}\n${step('one', css('a.css', '1\n'))}${step('two', block('carry: one\nremovals: [a.css]\n'))}`,
    )
    expect(lesson.chapters[0].steps[1]).toMatchObject({
      removals: ['a.css'],
      adjustments: { 'a.css': file('1\n') },
    })
  })

  it('lets from= reuse a file that arrives through carry', () => {
    const { lesson, issues } = parseLesson(
      `# A {#a}\n${step('one', css('a.css', '1\n'))}${step('two', block('carry: one\n'))}${step('three', css('a.css', '', ' from=two'))}`,
    )
    expect(issues).toEqual([])
    expect(lesson.chapters[0].steps[2].adjustments).toEqual({
      'a.css': file('1\n'),
    })
  })

  it('leaves the carried step as it was', () => {
    const { lesson } = parseLesson(
      `# A {#a}\n${step('one', css('a.css', '1\n'))}${step('two', block('carry: one\n'), css('a.css', '2\n'))}`,
    )
    expect(lesson.chapters[0].steps[0].adjustments).toEqual({
      'a.css': file('1\n'),
    })
  })
})

describe('carry rules', () => {
  const lessonWith = (...steps: string[]) => `# A {#a}\n${steps.join('')}`

  const cases = [
    {
      rule: 'carry-unknown-step',
      severity: 'error',
      failing: lessonWith(step('one', block('carry: nope\n'))),
      line: 4,
      passing: lessonWith(step('one'), step('two', block('carry: one\n'))),
    },
    {
      rule: 'carry-unknown-step',
      severity: 'error',
      // `base` is not a carry target.
      failing: lessonWith(step('one', block('carry: base\n'))),
      line: 4,
      passing: lessonWith(step('one'), step('two', block('carry: one\n'))),
    },
    {
      rule: 'carry-cycle',
      severity: 'error',
      failing: lessonWith(
        step('one', block('carry: two\n')),
        step('two', block('carry: one\n')),
      ),
      line: 4,
      passing: lessonWith(step('one'), step('two', block('carry: one\n'))),
    },
    {
      rule: 'carry-cycle',
      severity: 'error',
      failing: lessonWith(step('one', block('carry: one\n'))),
      line: 4,
      passing: lessonWith(step('one'), step('two', block('carry: one\n'))),
    },
    {
      rule: 'carry-drops-removals',
      severity: 'warning',
      failing: lessonWith(
        step('one', block('removals: [x.css, y.css]\n')),
        step('two', block('removals: [y.css]\ncarry: one\n')),
      ),
      line: 9,
      passing: lessonWith(
        step('one', block('removals: [x.css]\n')),
        step('two', block('removals: [./x.css]\ncarry: one\n')),
      ),
    },
    {
      rule: 'invalid-value',
      severity: 'error',
      failing: lessonWith(step('one', block('carry: [a, b]\n'))),
      line: 4,
      passing: lessonWith(step('one'), step('two', block('carry: one\n'))),
    },
  ]

  it.each(cases)(
    '$rule fires on line $line',
    ({ rule, severity, failing, line }) => {
      expect(parseLesson(failing).issues).toContainEqual(
        expect.objectContaining({ rule, severity, line }),
      )
    },
  )

  it.each(cases)('$rule stays quiet on valid input', ({ rule, passing }) => {
    expect(parseLesson(passing).issues.map((i) => i.rule)).not.toContain(rule)
  })

  it('reports a cycle once and still builds the steps', () => {
    const { lesson, issues } = parseLesson(
      lessonWith(
        step('one', block('carry: two\n'), css('a.css', '1\n')),
        step('two', block('carry: one\n')),
      ),
    )
    expect(issues.filter((i) => i.rule === 'carry-cycle')).toHaveLength(1)
    expect(lesson.chapters[0].steps).toHaveLength(2)
  })

  it('attaches ids to carry issues', () => {
    const { issues } = parseLesson(
      lessonWith(step('one', block('carry: nope\n'))),
    )
    expect(issues[0]).toMatchObject({ chapterId: 'a', stepId: 'one' })
  })
})
