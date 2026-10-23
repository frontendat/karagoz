import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import type { Lesson, Position } from '../types'
import { useLessonPosition } from './useLessonPosition'

const step = (id: string) => ({ id, title: `T ${id}`, body: '' })

const multi: Lesson = {
  chapters: [
    { id: 'intro', title: 'Intro', steps: [step('a'), step('b')] },
    { id: 'core', title: 'Core', steps: [step('a'), step('c')] },
  ],
}

const single: Lesson = {
  chapters: [{ id: 'only', title: 'Only', steps: [step('a'), step('b')] }],
}

const setup = (lesson: Lesson, start: Position) => {
  const position = ref<Position>(start)
  return { position, ...useLessonPosition(ref(lesson), position) }
}

describe('useLessonPosition', () => {
  it('reads current chapter and step from position', () => {
    const { chapter, step } = setup(multi, { chapterId: 'core', stepId: 'c' })
    expect(chapter.value?.id).toBe('core')
    expect(step.value?.id).toBe('c')
  })

  it('resolves step ids per chapter (same id in two chapters)', () => {
    const { chapter, step } = setup(multi, { chapterId: 'core', stepId: 'a' })
    expect(chapter.value?.id).toBe('core')
    expect(step.value?.title).toBe('T a')
    expect(chapter.value?.steps[0]).toBe(step.value)
  })

  it('returns undefined for unknown position', () => {
    const { chapter, step } = setup(multi, { chapterId: 'nope', stepId: 'a' })
    expect(chapter.value).toBeUndefined()
    expect(step.value).toBeUndefined()
  })

  it('writes position via goTo and reflects in v-model ref', () => {
    const { position, step, goTo } = setup(multi, {
      chapterId: 'intro',
      stepId: 'a',
    })
    goTo({ chapterId: 'core', stepId: 'c' })
    expect(position.value).toEqual({ chapterId: 'core', stepId: 'c' })
    expect(step.value?.id).toBe('c')
  })

  it('reacts to external position writes', () => {
    const { position, step } = setup(multi, { chapterId: 'intro', stepId: 'a' })
    position.value = { chapterId: 'intro', stepId: 'b' }
    expect(step.value?.id).toBe('b')
  })

  it('ignores goTo for unknown targets', () => {
    const { position, goTo } = setup(multi, { chapterId: 'intro', stepId: 'a' })
    goTo({ chapterId: 'core', stepId: 'zzz' })
    expect(position.value).toEqual({ chapterId: 'intro', stepId: 'a' })
  })

  it('computes prev/next within a chapter', () => {
    const { prev, next } = setup(multi, { chapterId: 'intro', stepId: 'b' })
    expect(prev.value).toEqual({ chapterId: 'intro', stepId: 'a' })
    expect(next.value).toEqual({ chapterId: 'core', stepId: 'a' })
  })

  it('crosses chapter boundaries backwards', () => {
    const { prev } = setup(multi, { chapterId: 'core', stepId: 'a' })
    expect(prev.value).toEqual({ chapterId: 'intro', stepId: 'b' })
  })

  it('has no prev at first step and no next at last step', () => {
    const first = setup(multi, { chapterId: 'intro', stepId: 'a' })
    expect(first.prev.value).toBeUndefined()
    const last = setup(multi, { chapterId: 'core', stepId: 'c' })
    expect(last.next.value).toBeUndefined()
  })

  it('has no prev/next for unknown position', () => {
    const { prev, next } = setup(multi, { chapterId: 'x', stepId: 'y' })
    expect(prev.value).toBeUndefined()
    expect(next.value).toBeUndefined()
  })

  it('skips empty chapters when navigating', () => {
    const lesson: Lesson = {
      chapters: [
        { id: 'one', title: 'One', steps: [step('a')] },
        { id: 'empty', title: 'Empty', steps: [] },
        { id: 'two', title: 'Two', steps: [step('a')] },
      ],
    }
    const { next } = setup(lesson, { chapterId: 'one', stepId: 'a' })
    expect(next.value).toEqual({ chapterId: 'two', stepId: 'a' })
  })

  it('groups steps by chapter', () => {
    const { groups } = setup(multi, { chapterId: 'intro', stepId: 'a' })
    expect(groups.value).toHaveLength(2)
    expect(groups.value[0]).toMatchObject({
      chapterId: 'intro',
      title: 'Intro',
    })
    expect(groups.value[0].steps.map((s) => s.position)).toEqual([
      { chapterId: 'intro', stepId: 'a' },
      { chapterId: 'intro', stepId: 'b' },
    ])
    expect(groups.value[1].steps[0].title).toBe('T a')
  })

  it('flattens a single-chapter lesson (no chapter title)', () => {
    const { groups } = setup(single, { chapterId: 'only', stepId: 'a' })
    expect(groups.value).toHaveLength(1)
    expect(groups.value[0].title).toBeUndefined()
    expect(groups.value[0].steps).toHaveLength(2)
  })
})
