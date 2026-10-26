import type { Position } from '@karagoz/hayali'

import { demoStart } from '.'

/** The query parameter that deep-links the demo to a step. */
export const stepQueryKey = 'step'

/** `chapterID/stepID`. Undefined for the start position, so the default URL stays clean. */
export const formatStepQuery = (position: Position) =>
  position.chapterId === demoStart.chapterId &&
  position.stepId === demoStart.stepId
    ? undefined
    : `${position.chapterId}/${position.stepId}`

/**
 * Reads a query value back into a position. Only the shape is checked: IDs the lesson doesn't have are left to
 * KrgzHayali, which falls back to the first step and corrects the model.
 */
export const parseStepQuery = (value: unknown): Position | undefined => {
  if (typeof value !== 'string') return undefined
  const [chapterId, stepId, ...rest] = value.split('/')
  if (!chapterId || !stepId || rest.length) return undefined
  return { chapterId, stepId }
}
