import type { Lesson, Position, Step } from './types'

/** Strips a leading `./` or `/` so lesson paths are root-relative. */
export const normalize = (path: string) => path.replace(/^\.?\/+/, '')

export const findStep = (lesson: Lesson, p: Position): Step | undefined =>
  lesson.chapters
    .find((c) => c.id === p.chapterId)
    ?.steps.find((s) => s.id === p.stepId)
