/** Glob-style path pattern, e.g. `package.json` or `src/**`. */
export type PathPattern = string

/** Adjustments tree: nested directories to file contents, as accepted by WebContainer `mount()`. */
export interface AdjustmentsTree {
  [name: string]:
    | { file: { contents: string } }
    | { directory: AdjustmentsTree }
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
}

export interface Chapter {
  /** Author-supplied, unique within the lesson. Never derived from title text. */
  id: string
  title: string
  steps: Step[]
}

export interface Lesson {
  /** Shown in the lesson header next to the Prev/Next controls. */
  title?: string
  chapters: Chapter[]
  /** Base tree mounted at boot, split into immutable and resettable tiers by `immutable`. */
  files?: AdjustmentsTree
  /** Paths mounted once and never reset. */
  immutable?: PathPattern[]
}

export interface Position {
  chapterId: string
  stepId: string
}
