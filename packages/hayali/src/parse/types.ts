import type { Lesson } from '../types'
import type { BlockRule } from './blocks'

export type ParseIssueRule =
  | BlockRule
  | 'file-outside-step'
  | 'carry-cycle'
  | 'carry-drops-removals'
  | 'carry-unknown-step'
  | 'conflicting-file-source'
  | 'duplicate-file'
  | 'duplicate-id'
  | 'duplicate-lesson-block'
  | 'duplicate-step-block'
  | 'empty-chapter'
  | 'invalid-src'
  | 'invalid-id'
  | 'misplaced-lesson-block'
  | 'misplaced-step-block'
  | 'missing-file-path'
  | 'missing-id'
  | 'parser-failure'
  | 'ref-cycle'
  | 'ref-missing-path'
  | 'ref-unknown-step'
  | 'ref-with-body'
  | 'src-with-body'
  | 'step-outside-chapter'
  | 'unclosed-fence'
  | 'unresolved-src'
  | 'unknown-fence'

/** A problem found while parsing a lesson file. Distinct from a `LessonIssue`, which is found by `validateLesson`. */
export interface ParseIssue {
  rule: ParseIssueRule
  severity: 'error' | 'warning'
  message: string
  /** 1-based. */
  line: number
  column?: number
  chapterId?: string
  stepId?: string
  path?: string
}

export interface ParseLessonOptions {
  /** Reads a `src=` file; the path is relative to the lesson file. Without it any `src=` is unresolved. */
  resolveSrc?: (path: string) => string | undefined
}

export interface ParseLessonResult {
  /** Best-effort: whatever could be built, even when `issues` holds errors. */
  lesson: Lesson
  issues: ParseIssue[]
  /** Normalized `src=` paths asked of `resolveSrc`, for HMR/cache invalidation. */
  srcPaths: string[]
  /** 1-based Markdown line of a chapter, step or file, or `undefined` if it is not in the file. */
  locate(target: {
    chapterId: string
    stepId?: string
    path?: string
  }): number | undefined
}
