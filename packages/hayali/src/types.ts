/** Glob-style path pattern, e.g. `package.json` or `src/**`. */
export type PathPattern = string

/** Adjustments tree: nested directories to file contents, as accepted by WebContainer `mount()`. */
export interface AdjustmentsTree {
  [name: string]:
    | { file: { contents: string } }
    | { directory: AdjustmentsTree }
}

/** 1-based, inclusive: a line, a `[from, to]` range, or a list of either. */
export type LineSpec =
  | number
  | [from: number, to: number]
  | (number | [number, number])[]

/** Per-step editor instructions, applied on every entry to the step. */
export interface EditorDirective {
  /** Files to open; the last one is focused. Optionally with a line to go to. */
  open?: (string | { path: string; line?: number })[]
  /** Files to close, or `'all'`. */
  close?: string[] | 'all'
  /** Lines to highlight. */
  highlight?: { path: string; lines: LineSpec }[]
}

export interface Step {
  /** Author-supplied, unique within its chapter. Never derived from title text. */
  id: string
  title: string
  /** Markdown body. */
  body: string
  /** Files added/changed by this step, overlaid on the lesson base tree. */
  adjustments?: AdjustmentsTree
  /** Paths deleted when entering this step. */
  removals?: string[]
  /** Paths locked (UI-only) for this step. */
  locks?: PathPattern[]
  /** Editor directives applied on entry to this step. */
  editor?: EditorDirective
  /** Preview to show on entry to this step. `url` is root-relative and may carry a query/hash. */
  preview?: { url: string }
}

export interface Chapter {
  /** Author-supplied, unique within the lesson. Never derived from title text. */
  id: string
  title: string
  steps: Step[]
}

export interface Lesson {
  chapters: Chapter[]
  /** Base tree mounted at boot, split into immutable and resettable tiers by `immutable`. */
  files?: AdjustmentsTree
  /** Paths mounted once and never reset. */
  immutable?: PathPattern[]
}

/**
 * A step within a lesson. Step IDs are unique only within their chapter, so both IDs are needed. A position that
 * names no existing step falls back to the first step of the lesson.
 */
export interface Position {
  chapterId: string
  stepId: string
}
