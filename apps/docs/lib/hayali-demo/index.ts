import type { Chapter, Lesson, Position, Step } from '@karagoz/hayali'

import { ar } from './prose/ar'
import { de } from './prose/de'
import { en } from './prose/en'
import type { DemoProse } from './prose/types'
import { demoStructure } from './structure'

export { demoStructure }

export const demoProse: Record<'ar' | 'de' | 'en', DemoProse> = { ar, de, en }
export const demoLocales = ['ar', 'de', 'en'] as const

/**
 * Locales that have started translating (a non-empty prose file). The coverage test is strict for these, so a
 * partly translated locale fails until it covers every id; locales with an empty file fall back to English.
 */
export const translatedDemoLocales = demoLocales.filter(
  (locale) => Object.keys(demoProse[locale].steps ?? {}).length > 0,
)

/** The position the demo starts at. */
export const demoStart: Position = { chapterId: 'basics', stepId: 'markup' }

const proseOf = (locale: string): DemoProse =>
  (demoProse as Record<string, DemoProse>)[locale] ?? en

/**
 * Merges the structural file with one locale's prose by id. Anything the locale has not translated yet falls back
 * to English, so a partly translated locale still yields a complete lesson.
 */
export const createDemoLesson = (locale: string): Lesson => {
  const prose = proseOf(locale)
  const title = (id: string) => prose.chapters?.[id] ?? en.chapters![id]
  const text = (id: string) => prose.steps?.[id] ?? en.steps![id]
  return {
    files: demoStructure.files,
    immutable: demoStructure.immutable,
    chapters: demoStructure.chapters.map(
      (chapter): Chapter => ({
        id: chapter.id,
        title: title(chapter.id),
        steps: chapter.steps.map(
          (step): Step => ({ ...step, ...text(step.id) }),
        ),
      }),
    ),
  }
}
