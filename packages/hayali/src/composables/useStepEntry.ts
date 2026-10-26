import { ref, watch } from 'vue'
import type { Ref } from 'vue'

import { findStep, normalize, resolveStepTree } from '../lesson'
import type { Lesson, Position } from '../types'
import { toRanges } from '../validateLesson'

/** The slice of `useSandbox()` this composable calls; injectable for tests. */
export interface StepEntrySandbox {
  editorTabs: {
    tabs: Readonly<Ref<readonly { id: string }[]>>
    open(id: string): void
    close(id: string): void
    closeAll(): void
  }
  editorViews: {
    /** One line or one inclusive `[from, to]` range per call (the sandbox does not take lists). */
    highlightLines(
      lines: number | [from: number, to: number],
      path: string,
      options: { open: false },
    ): Promise<void> | void
    goToLine(
      line: number,
      path: string,
      options: { focus: false },
    ): Promise<void>
    clearAllHighlightedLines(): void
  }
  preview: {
    navigate(path: string): void
    /** Reload the current page, e.g. after the files under it changed. */
    reload(): Promise<void> | void
    /** Current preview path. */
    path: Readonly<Ref<string>>
    /** Empty until the dev server is ready. */
    url: Readonly<Ref<string>>
  }
}

/** The slice of `useLessonReset()` this composable calls. */
export interface StepEntryReset {
  dirty: Readonly<Ref<boolean>>
  navigate(
    to: Position,
    confirm: () => boolean | Promise<boolean>,
  ): Promise<boolean>
}

const warn = (message: string) => {
  if (import.meta.env.DEV) console.warn(`[hayali] ${message}`)
}

/** Editor tab IDs are explorer-style paths, e.g. `./src/app.js`. */
const tabId = (path: string) => `./${normalize(path)}`

/**
 * Owns navigation (single-flight: confirm, reset, position) and the step-entry sequence that follows it: clear
 * highlights, close/open tabs, highlight, go to a line, then the preview. Everything is derived from the entered step
 * alone; nothing is inherited from the previous one. Bad directives are skipped with a dev warning, never thrown.
 */
export const useStepEntry = (options: {
  lesson: () => Lesson
  position: Readonly<Ref<Position>>
  /** Writes the new position (after a successful reset). */
  goTo: (to: Position) => void
  reset: StepEntryReset
  confirm: () => boolean | Promise<boolean>
  sandbox: StepEntrySandbox
  /** Whether the Sandbox pane is visible (always true on the side-by-side layout). */
  sandboxVisible: Readonly<Ref<boolean>>
  /** How long to wait for an editor view before skipping a go-to. */
  viewTimeoutMs?: number
}) => {
  const { sandbox, reset } = options
  const timeoutMs = options.viewTimeoutMs ?? 3000

  /** Covers confirm, reset and position change; directive application does not hold it. */
  const navigating = ref(false)

  /** Monotonic entry token: every async directive re-checks it and drops itself when superseded. */
  let token = 0
  let pendingGoTo: { path: string; line: number; token: number } | undefined
  let pendingUrl: { url: string; token: number } | undefined

  const goToLine = async (path: string, line: number) => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const timedOut = new Promise<'timeout'>((resolve) => {
      timer = setTimeout(() => resolve('timeout'), timeoutMs)
    })
    try {
      const result = await Promise.race([
        sandbox.editorViews
          .goToLine(line, path, { focus: false })
          .then(() => 'done' as const),
        timedOut,
      ])
      if (result === 'timeout')
        warn(
          `Timed out waiting for the editor of "${path}"; skipping go-to line ${line}`,
        )
    } catch (error) {
      warn(`Could not go to line ${line} of "${path}": ${String(error)}`)
    } finally {
      clearTimeout(timer)
    }
  }

  const applyEditor = async (
    entry: number,
    to: Position,
    from: Position | undefined,
  ) => {
    const alive = () => entry === token
    const lesson = options.lesson()
    const step = findStep(lesson, to)
    const tree = resolveStepTree(lesson, step)
    let removedAny = false

    if (from) {
      sandbox.editorViews.clearAllHighlightedLines()
      const before = resolveStepTree(lesson, findStep(lesson, from))
      const removed = [...before.keys()].filter((p) => !tree.has(p))
      removedAny = removed.length > 0
      for (const { id } of [...sandbox.editorTabs.tabs.value])
        if (removed.includes(normalize(id))) sandbox.editorTabs.close(id)
    }

    const editor = step?.editor
    const removals = new Set((step?.removals ?? []).map(normalize))
    const resolve = (raw: unknown, what: string) => {
      if (typeof raw !== 'string') {
        warn(`Skipping ${what}: path must be a string`)
        return undefined
      }
      const path = normalize(raw)
      if (!tree.has(path)) {
        warn(
          removals.has(path)
            ? `Skipping ${what} "${path}": the step removes it`
            : `Skipping ${what} "${path}": not in this step's file tree`,
        )
        return undefined
      }
      return path
    }

    // close
    if (editor?.close === 'all') sandbox.editorTabs.closeAll()
    else if (Array.isArray(editor?.close))
      for (const raw of editor.close)
        if (typeof raw === 'string') sandbox.editorTabs.close(tabId(raw))
        else warn('Skipping close: path must be a string')

    // open; the last valid entry becomes active
    let goTo: { path: string; line: number } | undefined
    if (Array.isArray(editor?.open))
      for (const item of editor.open) {
        const raw = typeof item === 'object' && item !== null ? item.path : item
        const path = resolve(raw, 'open')
        if (path === undefined) continue
        sandbox.editorTabs.open(tabId(path))
        const line =
          typeof item === 'object' && item !== null ? item.line : undefined
        goTo = line === undefined ? undefined : { path: tabId(path), line }
      }

    // highlight (never opens or focuses)
    if (Array.isArray(editor?.highlight))
      for (const item of editor.highlight) {
        const path = resolve(item?.path, 'highlight')
        if (path === undefined) continue
        if (reset.dirty.value) break // the learner already edited: lines may have shifted
        const ranges = toRanges(item.lines)
        if (!ranges) {
          warn(`Skipping highlight "${path}": invalid lines`)
          continue
        }
        for (const range of ranges) {
          await sandbox.editorViews.highlightLines(
            range[0] === range[1] ? range[0] : range,
            tabId(path),
            {
              open: false,
            },
          )
          if (!alive()) return
        }
      }

    // go to a line
    if (goTo && !reset.dirty.value) {
      if (options.sandboxVisible.value) {
        await goToLine(goTo.path, goTo.line)
        if (!alive()) return
      } else {
        pendingGoTo = { ...goTo, token: entry }
      }
    }

    if (!alive()) return

    // preview: show the step's page, or at least reload so the new files are visible
    const url = step?.preview?.url
    const serverReady = !!sandbox.preview.url.value
    if (url) {
      if (!serverReady) pendingUrl = { url, token: entry }
      // Assigning the same URL to the frame would not refresh it, and the files may have changed.
      else if (from && url === sandbox.preview.path.value)
        await sandbox.preview.reload()
      else sandbox.preview.navigate(url)
    } else if (from && serverReady) {
      if (removedAny && sandbox.preview.path.value !== '/')
        sandbox.preview.navigate('/')
      else await sandbox.preview.reload()
    }
  }

  const enter = async (to: Position, from?: Position) => {
    const entry = ++token
    pendingGoTo = undefined
    pendingUrl = undefined
    try {
      await applyEditor(entry, to, from)
    } catch (error) {
      warn(`Failed to apply step directives: ${String(error)}`)
    }
  }

  // First edit: highlights would point at shifted lines, and a deferred go-to is stale.
  watch(reset.dirty, (dirty, wasDirty) => {
    if (!dirty || wasDirty) return
    sandbox.editorViews.clearAllHighlightedLines()
    pendingGoTo = undefined
  })

  // Mobile: run the deferred go-to once the Sandbox pane is visible.
  watch(options.sandboxVisible, (visible) => {
    if (!visible || !pendingGoTo || pendingGoTo.token !== token) return
    const { path, line } = pendingGoTo
    pendingGoTo = undefined
    void goToLine(path, line)
  })

  // Initial load: the preview url waits for the first server-ready.
  watch(sandbox.preview.url, (url) => {
    if (!url || !pendingUrl || pendingUrl.token !== token) return
    const { url: target } = pendingUrl
    pendingUrl = undefined
    sandbox.preview.navigate(target)
  })

  const navigate = async (target: Position) => {
    if (navigating.value) return
    navigating.value = true
    try {
      const from = { ...options.position.value }
      if (!(await reset.navigate(target, options.confirm))) return
      options.goTo(target)
      void enter(target, from)
    } catch (error) {
      warn(`Navigation failed: ${String(error)}`)
    } finally {
      navigating.value = false
    }
  }

  /** Apply the current step's directives after the boot mount (no reset, no clear). */
  const enterInitial = () => enter({ ...options.position.value })

  return { navigating, navigate, enterInitial }
}
