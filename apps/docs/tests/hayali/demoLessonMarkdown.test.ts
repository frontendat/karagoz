import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { Lesson } from '@karagoz/hayali'
import { validateLesson } from '@karagoz/hayali'
import { parseLesson } from '@karagoz/hayali/parse'
import { describe, expect, it } from 'vitest'

import { createDemoLesson } from '../../lib/hayali-demo'

const markdown = readFileSync(
  fileURLToPath(new URL('./demo-lesson.md', import.meta.url)),
  'utf8',
)

/** Bodies differ only in blank-line runs and edge whitespace between the two authoring forms. */
const tidy = (lesson: Lesson): Lesson => ({
  ...lesson,
  chapters: lesson.chapters.map((chapter) => ({
    ...chapter,
    steps: chapter.steps.map((step) => ({
      ...step,
      body: step.body.replace(/\n{3,}/g, '\n\n').trim(),
    })),
  })),
})

describe('demo lesson as a Markdown file', () => {
  const { lesson, issues } = parseLesson(markdown)

  it('parses without issues', () => {
    expect(issues).toEqual([])
  })

  it('compiles to the English demo lesson', () => {
    expect(tidy(lesson)).toEqual(tidy(createDemoLesson('en')))
  })

  it('validates clean, like the demo lesson', () => {
    expect(validateLesson(lesson)).toEqual([])
    expect(validateLesson(createDemoLesson('en'))).toEqual([])
  })
})

describe('parseLesson never throws', () => {
  const shape = (input: string) => {
    const result = parseLesson(input)
    expect(Array.isArray(result.lesson.chapters)).toBe(true)
    expect(Array.isArray(result.issues)).toBe(true)
  }

  it('survives every prefix of the demo lesson', () => {
    for (let end = 0; end <= markdown.length; end++)
      shape(markdown.slice(0, end))
  })

  it.each([
    ['empty', ''],
    ['unclosed fence', '# A {#a}\n## One {#one}\n```js file=a.js\nlet a'],
    ['binary junk', '\u0000\u0001�￿'.repeat(40)],
    ['only fences', '```\n```\n```yaml krgz-step\n```\n'],
    [
      'broken yaml',
      '# A {#a}\n## One {#one}\n```yaml krgz-step\n: : [{\n```\n',
    ],
    [
      'non-mapping yaml',
      '# A {#a}\n## One {#one}\n```yaml krgz-step\n- 1\n```\n',
    ],
    [
      'proto path',
      '# A {#a}\n## One {#one}\n```js file=__proto__/x.js\n1\n```\n',
    ],
    [
      'self reference',
      '# A {#a}\n## One {#one}\n```js file=a.js from=one\n```\n',
    ],
    [
      'carry loop',
      '# A {#a}\n## One {#one}\n```yaml krgz-step\ncarry: one\n```\n',
    ],
  ])('survives %s', (_name, input) => shape(input))
})
