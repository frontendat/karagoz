import ignore from 'ignore'
import { computed, ref, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { type FlatTree, findStep, flatten, normalize } from '../lesson'
import type { AdjustmentsTree, Lesson, Position, Step } from '../types'

/** The slice of WebContainer's `fs` this composable needs; injectable for tests. */
export interface LessonFs {
  watch(
    path: string,
    options: { recursive: boolean },
    listener: (event: string, filename: string | Uint8Array | null) => void,
  ): { close(): void }
  mount(tree: AdjustmentsTree): Promise<unknown>
  rm(
    path: string,
    options?: { recursive?: boolean; force?: boolean },
  ): Promise<unknown>
}

export type Tier = 'A' | 'B'

/**
 * What a package manager writes when the sandbox installs dependencies. It appears after boot without the learner
 * touching anything, so it must never count as an edit nor be removed by a reset. Always immutable, whether or not the
 * lesson lists it.
 */
const INSTALL_OUTPUT = [
  'node_modules',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  'bun.lock',
  'bun.lockb',
]

const nest = (flat: FlatTree): AdjustmentsTree => {
  const root: AdjustmentsTree = {}
  for (const [path, contents] of flat) {
    const parts = path.split('/')
    const name = parts.pop() as string
    let dir = root
    for (const part of parts) {
      const existing = dir[part]
      if (existing && 'directory' in existing) dir = existing.directory
      else {
        const created: AdjustmentsTree = {}
        dir[part] = { directory: created }
        dir = created
      }
    }
    dir[name] = { file: { contents } }
  }
  return root
}

/**
 * Tier A (immutable) / tier B (resettable) tracking, dirty flag, confirm gate and reset-on-navigate.
 * @param options.fs WebContainer-shaped `fs`
 * @param options.lesson
 */
export const useLessonReset = (options: {
  fs: LessonFs
  lesson: MaybeRefOrGetter<Lesson>
}) => {
  const { fs } = options
  const lesson = () => toValue(options.lesson)

  const immutable = computed(() =>
    ignore({ allowRelativePaths: true })
      .add(INSTALL_OUTPUT)
      .add(lesson().immutable ?? []),
  )

  const dirty = ref(false)
  const current = ref<Position>()
  /** Tier-B paths we wrote ourselves whose watch echo has not been seen yet. */
  const expected = new Set<string>()
  /** Directories containing paths we wrote; WebContainer also reports them, and they are never user edits. */
  const expectedDirs = new Set<string>()
  /** Tier-B paths created by the user (seen via watch), so reset can remove them. */
  const userPaths = new Set<string>()

  const tierOf = (path: string): Tier =>
    immutable.value.ignores(normalize(path)) ? 'A' : 'B'

  /** Tier-B file set for a step: base files overlaid with its adjustments, minus removals. */
  const tierBTree = (step: Step | undefined): FlatTree => {
    const tree: FlatTree = new Map()
    const merged = [...flatten(lesson().files), ...flatten(step?.adjustments)]
    for (const [path, contents] of merged)
      if (tierOf(path) === 'B') tree.set(path, contents)
    for (const removed of step?.removals ?? []) tree.delete(normalize(removed))
    return tree
  }

  /** Replace the expected set with `paths` plus their ancestor directories. */
  const expect = (...groups: Iterable<string>[]) => {
    expected.clear()
    expectedDirs.clear()
    for (const group of groups)
      for (const path of group) {
        expected.add(path)
        const parts = path.split('/')
        for (let i = 1; i < parts.length; i++)
          expectedDirs.add(parts.slice(0, i).join('/'))
      }
  }

  const listener = (_event: string, filename: string | Uint8Array | null) => {
    if (typeof filename !== 'string') return
    const path = normalize(filename)
    if (tierOf(path) !== 'B') return
    if (expectedDirs.has(path)) return
    if (expected.delete(path)) return
    userPaths.add(path)
    dirty.value = true
  }

  let watcher: { close(): void } | undefined
  const startWatching = () => {
    watcher ??= fs.watch('/', { recursive: true }, listener)
  }

  /** Mount tier A once and the tier-B tree for the given step. */
  const boot = async (position: Position) => {
    startWatching()
    const step = findStep(lesson(), position)
    const tierB = tierBTree(step)
    const tierA: FlatTree = new Map(
      [...flatten(lesson().files)].filter(([p]) => tierOf(p) === 'A'),
    )
    expect(tierB.keys())
    await fs.mount(nest(new Map([...tierA, ...tierB])))
    current.value = { ...position }
    dirty.value = false
  }

  /** Tier-B changes block navigation until confirmed. */
  const requiresConfirm = computed(() => dirty.value)

  /**
   * Remove stale tier-B paths (present now, absent in target), apply the target
   * step's tree, and clear the dirty flag.
   */
  const reset = async (from: Position, to: Position) => {
    const target = tierBTree(findStep(lesson(), to))
    const stale = new Set([
      ...tierBTree(findStep(lesson(), from)).keys(),
      ...userPaths,
    ])
    for (const path of target.keys()) stale.delete(path)

    expect(stale, target.keys())

    for (const path of stale)
      await fs.rm(path, { recursive: true, force: true })
    await fs.mount(nest(target))

    userPaths.clear()
    current.value = { ...to }
    dirty.value = false
  }

  /**
   * Navigate to `to`, asking `confirm` first when tier B is dirty.
   * Resolves false (and changes nothing) when the user cancels.
   */
  const navigate = async (
    to: Position,
    confirm: () => boolean | Promise<boolean>,
  ) => {
    const from = current.value
    if (!from) return false
    if (requiresConfirm.value && !(await confirm())) return false
    await reset(from, to)
    return true
  }

  const dispose = () => {
    watcher?.close()
    watcher = undefined
  }

  return {
    tierOf,
    dirty,
    requiresConfirm,
    current,
    boot,
    reset,
    navigate,
    dispose,
  }
}
