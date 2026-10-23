import { normalize, resolveStepTree } from './lesson'
import type { Lesson } from './types'

export type LessonIssueRule =
  | 'invalid-path'
  | 'invalid-preview-url'
  | 'line-out-of-range'
  | 'malformed-lines'
  | 'missing-file'
  | 'removed-path'

export interface LessonIssue {
  rule: LessonIssueRule
  chapterId: string
  stepId: string
  /** Normalized offending path, when the issue is about one. */
  path?: string
  message: string
}

/** Treats a missing or non-array value as empty so malformed JSON-authored input cannot throw. */
const list = <T>(value: T[] | undefined): T[] =>
  Array.isArray(value) ? value : []

const GLOB = /[*?[\]{}]/

const isLine = (n: unknown): n is number =>
  Number.isInteger(n) && (n as number) >= 1

const toPair = (item: unknown): [number, number] | undefined =>
  Array.isArray(item) &&
  item.length === 2 &&
  isLine(item[0]) &&
  isLine(item[1]) &&
  item[0] <= item[1]
    ? [item[0], item[1]]
    : undefined

/**
 * Resolves a LineSpec to inclusive `[from, to]` ranges, or `undefined` if it is malformed. An ascending pair of numbers
 * is a range; any other non-empty array is a list of lines and `[from, to]` pairs (not nested further).
 */
export const toRanges = (spec: unknown): [number, number][] | undefined => {
  if (isLine(spec)) return [[spec, spec]]
  if (!Array.isArray(spec) || spec.length === 0) return undefined
  const pair = toPair(spec)
  if (pair) return [pair]
  const ranges: [number, number][] = []
  for (const item of spec) {
    const resolved = isLine(item)
      ? ([item, item] as [number, number])
      : toPair(item)
    if (!resolved) return undefined
    ranges.push(resolved)
  }
  return ranges
}

/**
 * Checks a lesson for authoring mistakes without a browser. Resolves each step's tree (base files plus the step's own
 * adjustments, minus its removals; steps are not cumulative) and validates the step's editor directives and preview.
 *
 * @returns the issues found; an empty array means the lesson is valid.
 */
export const validateLesson = (lesson: Lesson): LessonIssue[] => {
  const issues: LessonIssue[] = []
  for (const chapter of lesson.chapters) {
    for (const step of chapter.steps) {
      const tree = resolveStepTree(lesson, step)
      const removed = new Set((step.removals ?? []).map(normalize))
      const report = (rule: LessonIssueRule, message: string, path?: string) =>
        issues.push({
          rule,
          chapterId: chapter.id,
          stepId: step.id,
          path,
          message,
        })

      /** Returns the normalized path if it is a valid literal file path, otherwise reports and returns undefined. */
      const checkPath = (raw: unknown) => {
        if (typeof raw !== 'string') {
          report(
            'invalid-path',
            `Path must be a literal string, got ${typeof raw}`,
          )
          return undefined
        }
        const path = normalize(raw)
        const segments = path.split('/')
        const reason = !path
          ? 'is empty'
          : segments.some((s) => s === '' || s === '.' || s === '..')
            ? 'has an empty, "." or ".." segment (directories are not allowed)'
            : GLOB.test(path) && !tree.has(path) && !removed.has(path)
              ? 'contains glob characters'
              : [...tree.keys()].some((p) => p.startsWith(`${path}/`))
                ? 'is a directory'
                : undefined
        if (reason) {
          report('invalid-path', `Path "${raw}" ${reason}`, path || undefined)
          return undefined
        }
        return path
      }

      /** Like `checkPath`, plus the file must exist in this step's tree. Returns its contents. */
      const checkFile = (raw: unknown) => {
        const path = checkPath(raw)
        if (path === undefined) return undefined
        if (removed.has(path)) {
          report('removed-path', `"${path}" is removed by the same step`, path)
          return undefined
        }
        const contents = tree.get(path)
        if (contents === undefined) {
          report('missing-file', `"${path}" does not exist in this step`, path)
          return undefined
        }
        return { path, contents }
      }

      const checkLines = (
        spec: unknown,
        file: { path: string; contents: string },
        singleLine = false,
      ) => {
        const ranges = singleLine && !isLine(spec) ? undefined : toRanges(spec)
        if (!ranges) {
          report(
            'malformed-lines',
            `Invalid line spec ${String(JSON.stringify(spec) ?? spec)}`,
            file.path,
          )
          return
        }
        const lineCount = file.contents.split('\n').length
        const last = Math.max(...ranges.map(([, to]) => to))
        if (last > lineCount)
          report(
            'line-out-of-range',
            `Line ${last} is beyond the end of "${file.path}" (${lineCount} lines)`,
            file.path,
          )
      }

      for (const entry of list(step.editor?.open)) {
        const isObject = typeof entry === 'object' && entry !== null
        const file = checkFile(isObject ? entry.path : entry)
        if (file && isObject && entry.line !== undefined)
          checkLines(entry.line, file, true)
      }
      const close = step.editor?.close
      if (close !== undefined && close !== 'all') {
        if (Array.isArray(close)) for (const raw of close) checkPath(raw)
        else
          report(
            'invalid-path',
            'editor.close must be a list of paths or "all"',
          )
      }
      for (const entry of list(step.editor?.highlight)) {
        const file = checkFile(entry?.path)
        if (file) checkLines(entry.lines, file)
      }

      if (step.preview) {
        const { url } = step.preview as { url?: unknown }
        if (typeof url !== 'string' || !/^\/(?![/\\])/.test(url))
          report(
            'invalid-preview-url',
            `Preview url "${url}" must be root-relative (start with a single "/")`,
          )
      }
    }
  }
  return issues
}
