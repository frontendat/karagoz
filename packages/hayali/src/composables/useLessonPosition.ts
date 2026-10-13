import { computed, Ref, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { Chapter, Lesson, Position, Step } from '../types'

export interface StepGroupEntry {
  position: Position
  title: string
}

export interface StepGroup {
  chapterId: string
  /** Undefined when the lesson has a single chapter (flattened). */
  title?: string
  steps: StepGroupEntry[]
}

/**
 * Lesson traversal over a `{ chapterId, stepId }` position.
 * @param lesson
 * @param position the `v-model` ref; written through by `goTo`
 */
export const useLessonPosition = (
  lesson: MaybeRefOrGetter<Lesson>,
  position: Ref<Position>,
) => {
  const chapters = computed(() => toValue(lesson).chapters)

  // Linear order of every step; empty chapters contribute nothing.
  const flat = computed<Position[]>(() =>
    chapters.value.flatMap((c) =>
      c.steps.map((s) => ({ chapterId: c.id, stepId: s.id })),
    ),
  )

  const chapter = computed<Chapter | undefined>(() =>
    chapters.value.find((c) => c.id === position.value.chapterId),
  )

  const step = computed<Step | undefined>(() =>
    chapter.value?.steps.find((s) => s.id === position.value.stepId),
  )

  const index = computed(() =>
    step.value
      ? flat.value.findIndex(
          (p) =>
            p.chapterId === position.value.chapterId &&
            p.stepId === position.value.stepId,
        )
      : -1,
  )

  const prev = computed(() =>
    index.value > 0 ? flat.value[index.value - 1] : undefined,
  )
  const next = computed(() =>
    index.value >= 0 ? flat.value[index.value + 1] : undefined,
  )

  const groups = computed<StepGroup[]>(() => {
    const single = chapters.value.length === 1
    return chapters.value.map((c) => ({
      chapterId: c.id,
      title: single ? undefined : c.title,
      steps: c.steps.map((s) => ({
        position: { chapterId: c.id, stepId: s.id },
        title: s.title,
      })),
    }))
  })

  /** Move to a position. Unknown targets are ignored. */
  const goTo = (target: Position) => {
    const exists = flat.value.some(
      (p) => p.chapterId === target.chapterId && p.stepId === target.stepId,
    )
    if (exists)
      position.value = { chapterId: target.chapterId, stepId: target.stepId }
  }

  return { chapter, step, prev, next, groups, goTo }
}
