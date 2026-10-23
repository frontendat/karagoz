import { validateLesson } from '@karagoz/hayali'
import { describe, expect, it } from 'vitest'

import {
  createDemoLesson,
  demoLocales,
  demoProse,
  demoStructure,
  translatedDemoLocales,
} from '../../lib/hayali-demo'

const chapterIds = demoStructure.chapters.map((c) => c.id)
const stepIds = demoStructure.chapters.flatMap((c) => c.steps.map((s) => s.id))

describe('demo lesson', () => {
  it('has 2 chapters and 5 steps', () => {
    expect(chapterIds).toHaveLength(2)
    expect(stepIds).toHaveLength(5)
  })

  it('validates clean', () => {
    expect(validateLesson(createDemoLesson('en'))).toEqual([])
  })

  it('exercises every directive the docs promise', () => {
    const steps = createDemoLesson('en').chapters.flatMap((c) => c.steps)
    const has = (pick: (s: (typeof steps)[number]) => unknown) =>
      steps.some((s) => Boolean(pick(s)))

    expect(has((s) => s.locks?.length)).toBe(true)
    expect(has((s) => s.editor?.highlight?.length)).toBe(true)
    expect(
      has((s) => s.editor?.open?.some((o) => typeof o === 'object' && o.line)),
    ).toBe(true)
    expect(has((s) => s.preview?.url)).toBe(true)
    expect(has((s) => s.removals?.length)).toBe(true)
    expect(has((s) => s.editor?.close === 'all')).toBe(true)
    expect(has((s) => Array.isArray(s.editor?.close))).toBe(true)
    expect(has((s) => /^:::(tip|warning|note)/m.test(s.body))).toBe(true)
  })
})

describe('demo prose', () => {
  it.each(translatedDemoLocales)(
    '%s covers every chapter and step id',
    (locale) => {
      const prose = demoProse[locale]
      expect(Object.keys(prose.chapters ?? {}).sort()).toEqual(
        [...chapterIds].sort(),
      )
      expect(Object.keys(prose.steps ?? {}).sort()).toEqual([...stepIds].sort())
      for (const id of stepIds) {
        expect(prose.steps?.[id]?.title, `${locale}/${id} title`).toBeTruthy()
        expect(prose.steps?.[id]?.body, `${locale}/${id} body`).toBeTruthy()
      }
    },
  )

  it.each(demoLocales)(
    '%s never has prose for an id that does not exist',
    (locale) => {
      const prose = demoProse[locale]
      for (const id of Object.keys(prose.steps ?? {}))
        expect(stepIds).toContain(id)
      for (const id of Object.keys(prose.chapters ?? {}))
        expect(chapterIds).toContain(id)
    },
  )

  it.each(demoLocales)(
    '%s resolves to a full lesson (English fills any gap)',
    (locale) => {
      const lesson = createDemoLesson(locale)
      for (const chapter of lesson.chapters) {
        expect(chapter.title).toBeTruthy()
        for (const step of chapter.steps) {
          expect(step.title).toBeTruthy()
          expect(step.body).toBeTruthy()
        }
      }
    },
  )

  it('falls back to English for an unknown locale', () => {
    expect(createDemoLesson('fr').chapters[0].title).toBe(
      createDemoLesson('en').chapters[0].title,
    )
  })
})
