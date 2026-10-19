import type { SandboxOptions } from '@karagoz/sandbox'
import { computed, onScopeDispose, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

import type { Lesson, PathPattern, Position } from '../types'

type ExplorerOptions = SandboxOptions['explorer']

/** The slice of `useSandbox().setOption` this composable needs; injectable for tests. */
export type SetExplorerOption = (
  key: 'explorer',
  setter: (old: ExplorerOptions) => ExplorerOptions,
) => void

/**
 * Lesson patterns are gitignore-style and relative to the project root, while the sandbox explorer matches
 * `./`-prefixed paths. Anchor patterns containing a slash to `./` and let slash-less ones match at any depth.
 */
export const toSandboxPattern = (pattern: PathPattern) => {
  const negated = pattern.startsWith('!')
  const path = (negated ? pattern.slice(1) : pattern).replace(/^\.?\/+/, '')
  const anchored = path.replace(/\/$/, '').includes('/')
  return `${negated ? '!' : ''}${anchored ? './' : '**/'}${path}`
}

/**
 * Keeps the sandbox explorer's readonly patterns in sync with the current step's locks (plus the lesson's
 * immutable tier). Readonly is UI-only: it never blocks `container.fs` writes, so locked files still count as dirty.
 * @param options.lesson
 * @param options.position current step
 * @param options.setOption `useSandbox().setOption`
 */
export const useStepLocks = (options: {
  lesson: MaybeRefOrGetter<Lesson>
  position: MaybeRefOrGetter<Position>
  setOption: SetExplorerOption
}) => {
  const locks = computed<PathPattern[]>(() => {
    const { chapterId, stepId } = toValue(options.position)
    return (
      toValue(options.lesson)
        .chapters.find((c) => c.id === chapterId)
        ?.steps.find((s) => s.id === stepId)?.locks ?? []
    )
  })

  const patterns = computed(() =>
    [...(toValue(options.lesson).immutable ?? []), ...locks.value].map(
      toSandboxPattern,
    ),
  )

  /** Patterns this composable added, so they can be swapped without touching the sandbox's own. */
  let applied: string[] = []
  const apply = (next: string[]) => {
    options.setOption('explorer', (old) => ({
      ...old,
      readonly: [
        ...(old.readonly ?? []).filter((p) => !applied.includes(p)),
        ...next,
      ],
    }))
    applied = next
  }
  watch(patterns, apply, { immediate: true })
  // Sandbox options outlive this component; drop our patterns with it.
  onScopeDispose(() => apply([]))

  return locks
}
