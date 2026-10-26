// @vitest-environment node
import { describe, expect, it } from 'vitest'

import { validateLesson } from '../validateLesson'
import { parseLesson } from './index'

const source = [
  '```css file=base.css', // 1
  'b {}', // 2
  '```', // 3
  '', // 4
  '# A {#a}', // 5
  '', // 6
  '## One {#one}', // 7
  '', // 8
  '```css file=./src/style.css', // 9
  'a {}', // 10
  '```', // 11
  '', // 12
  '## Two {#two}', // 13
  '',
].join('\n')

const { locate } = parseLesson(source)

describe('locate', () => {
  it('finds a chapter heading', () => {
    expect(locate({ chapterId: 'a' })).toBe(5)
  })

  it('finds a step heading', () => {
    expect(locate({ chapterId: 'a', stepId: 'two' })).toBe(13)
  })

  it('finds the fence of a file the step defines, whatever the path spelling', () => {
    expect(
      locate({ chapterId: 'a', stepId: 'one', path: 'src/style.css' }),
    ).toBe(9)
    expect(
      locate({ chapterId: 'a', stepId: 'one', path: './src/style.css' }),
    ).toBe(9)
  })

  it('finds a base file fence when there is no step', () => {
    expect(locate({ chapterId: 'a', path: 'base.css' })).toBe(1)
  })

  it('falls back to the step heading for a path the step has no fence for', () => {
    expect(
      locate({ chapterId: 'a', stepId: 'two', path: 'src/style.css' }),
    ).toBe(13)
  })

  it('returns undefined for chapters and steps that are not in the file', () => {
    expect(locate({ chapterId: 'nope' })).toBeUndefined()
    expect(locate({ chapterId: 'a', stepId: 'nope' })).toBeUndefined()
    expect(locate({ chapterId: 'nope', stepId: 'one' })).toBeUndefined()
  })

  it('puts a validateLesson issue on the right fence line', () => {
    const md = [
      '# A {#a}', // 1
      '',
      '## One {#one}', // 3
      '',
      '```css file=style.css', // 5
      'a {}',
      '```',
      '',
      '```yaml krgz-step', // 9
      'editor:',
      '  highlight:',
      '    - path: style.css',
      '      lines: "5-9"',
      '```',
      '',
    ].join('\n')
    const { lesson, locate: at } = parseLesson(md)
    const [issue] = validateLesson(lesson)
    expect(issue).toMatchObject({
      rule: 'line-out-of-range',
      path: 'style.css',
    })
    expect(
      at({
        chapterId: issue.chapterId,
        stepId: issue.stepId,
        path: issue.path,
      }),
    ).toBe(5)
  })
})
