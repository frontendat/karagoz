import { isMap, isSeq, LineCounter, parseDocument } from 'yaml'
import type { Node } from 'yaml'

import type { EditorDirective, Lesson, LineSpec, Step } from '../types'

export type BlockRule = 'invalid-value' | 'malformed-yaml' | 'unknown-key'

export const BLOCK_PREFIX = 'krgz-'
export const LESSON_BLOCK = 'krgz-lesson'
export const STEP_BLOCK = 'krgz-step'

/** A problem inside a YAML block; `line` is 0-based in the lesson file. */
export interface BlockIssue {
  rule: BlockRule
  line: number
  column: number
  message: string
}

type Where = Pick<BlockIssue, 'line' | 'column'>

interface ParsedBlock {
  data: Record<string, unknown> | undefined
  /** Position of every key and list item, by dotted path such as `editor.highlight.0.lines`. */
  at: (path: string) => Where
}

/** Parses the YAML of a block. `firstLine` is the 0-based lesson line the YAML text starts on. */
export const parseYamlBlock = (
  text: string,
  firstLine: number,
  issues: BlockIssue[],
): ParsedBlock => {
  const lineCounter = new LineCounter()
  const doc = parseDocument(text, { lineCounter })
  const where = (offset: number): Where => {
    const { line, col } = lineCounter.linePos(offset)
    return { line: firstLine + line - 1, column: col }
  }
  const positions = new Map<string, Where>()
  const walk = (node: unknown, prefix: string) => {
    if (isMap(node)) {
      for (const pair of node.items) {
        const key = String((pair.key as { value?: unknown } | null)?.value)
        const path = prefix ? `${prefix}.${key}` : key
        const range = (pair.key as Node | null)?.range
        if (range) positions.set(path, where(range[0]))
        walk(pair.value, path)
      }
    } else if (isSeq(node)) {
      node.items.forEach((item, i) => {
        const path = `${prefix}.${i}`
        const range = (item as Node | null)?.range
        if (range) positions.set(path, where(range[0]))
        walk(item, path)
      })
    }
  }
  walk(doc.contents, '')

  for (const error of doc.errors)
    issues.push({
      rule: 'malformed-yaml',
      message: error.message.split('\n')[0],
      ...where(error.pos[0]),
    })

  const at = (path: string): Where =>
    positions.get(path) ?? { line: firstLine, column: 1 }

  if (doc.errors.length > 0) return { data: undefined, at }
  if (doc.contents === null) return { data: {}, at }
  if (!isMap(doc.contents)) {
    issues.push({
      rule: 'invalid-value',
      message: 'A krgz block must be a YAML mapping.',
      ...at(''),
    })
    return { data: undefined, at }
  }
  return { data: doc.toJS() as Record<string, unknown>, at }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isStrings = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

const SINGLE = /^\d+$/
const RANGE = /^(\d+)\s*-\s*(\d+)$/

/** `1-7, 13-17` to a `LineSpec`, or `undefined` if it is not that shorthand. */
export const parseLinesShorthand = (text: string): LineSpec | undefined => {
  const parts = text.split(',').map((part) => part.trim())
  const items: (number | [number, number])[] = []
  for (const part of parts) {
    const range = RANGE.exec(part)
    if (SINGLE.test(part)) items.push(Number(part))
    else if (range) items.push([Number(range[1]), Number(range[2])])
    else return undefined
  }
  if (items.length === 1) return items[0]
  // Two plain numbers would read as a `[from, to]` range, so they become one-line ranges.
  if (items.length === 2 && items.every((item) => typeof item === 'number'))
    return items.map((n) => [n, n] as [number, number])
  return items
}

/** Reports a problem at the key or list item with this dotted path. */
export type NoteBlockIssue = (
  rule: BlockRule,
  path: string,
  message: string,
) => void

const checkKeys = (
  data: Record<string, unknown>,
  allowed: string[],
  prefix: string,
  report: NoteBlockIssue,
) => {
  for (const key of Object.keys(data))
    if (!allowed.includes(key))
      report(
        'unknown-key',
        prefix + key,
        `Unknown key "${key}"; expected one of ${allowed.join(', ')}.`,
      )
}

export const readLessonBlock = (
  data: Record<string, unknown>,
  report: NoteBlockIssue,
): Pick<Lesson, 'immutable'> => {
  checkKeys(data, ['immutable'], '', report)
  const out: Pick<Lesson, 'immutable'> = {}
  if ('immutable' in data) {
    if (isStrings(data.immutable)) out.immutable = data.immutable
    else
      report('invalid-value', 'immutable', 'immutable must be a list of paths.')
  }
  return out
}

const readEditor = (
  value: unknown,
  report: NoteBlockIssue,
): EditorDirective | undefined => {
  if (!isRecord(value)) {
    report('invalid-value', 'editor', 'editor must be a mapping.')
    return undefined
  }
  checkKeys(value, ['open', 'close', 'highlight'], 'editor.', report)
  const editor: EditorDirective = {}

  if ('open' in value) {
    const open = value.open
    const valid =
      Array.isArray(open) &&
      open.every(
        (item) =>
          typeof item === 'string' ||
          (isRecord(item) &&
            typeof item.path === 'string' &&
            (item.line === undefined || typeof item.line === 'number')),
      )
    if (valid) editor.open = open as EditorDirective['open']
    else
      report(
        'invalid-value',
        'editor.open',
        'editor.open must be a list of paths or { path, line }.',
      )
  }

  if ('close' in value) {
    if (value.close === 'all' || isStrings(value.close))
      editor.close = value.close
    else
      report(
        'invalid-value',
        'editor.close',
        'editor.close must be "all" or a list of paths.',
      )
  }

  if ('highlight' in value) {
    const items = value.highlight
    if (!Array.isArray(items)) {
      report(
        'invalid-value',
        'editor.highlight',
        'editor.highlight must be a list of { path, lines }.',
      )
    } else {
      const highlight: NonNullable<EditorDirective['highlight']> = []
      items.forEach((item, i) => {
        const base = `editor.highlight.${i}`
        if (!isRecord(item) || typeof item.path !== 'string') {
          report(
            'invalid-value',
            base,
            'Each highlight needs a path and lines.',
          )
          return
        }
        checkKeys(item, ['path', 'lines'], `${base}.`, report)
        let lines = item.lines as LineSpec | string | undefined
        if (typeof lines === 'string') {
          const parsed = parseLinesShorthand(lines)
          if (parsed === undefined) {
            report(
              'invalid-value',
              `${base}.lines`,
              `Cannot read "${lines}" as lines; use a form like 1-7, 13-17.`,
            )
            return
          }
          lines = parsed
        }
        if (lines === undefined) {
          report(
            'invalid-value',
            base,
            'Each highlight needs a path and lines.',
          )
          return
        }
        highlight.push({ path: item.path, lines })
      })
      editor.highlight = highlight
    }
  }
  return editor
}

/** The directives of a step block: `Step` fields, plus `carry`, which only the parser acts on. */
export type StepBlock = Partial<
  Pick<Step, 'removals' | 'locks' | 'editor' | 'preview'>
> & { carry?: string }

export const readStepBlock = (
  data: Record<string, unknown>,
  report: NoteBlockIssue,
): StepBlock => {
  checkKeys(
    data,
    ['removals', 'locks', 'editor', 'preview', 'carry'],
    '',
    report,
  )
  const out: StepBlock = {}
  if ('carry' in data) {
    if (typeof data.carry === 'string' && data.carry !== '')
      out.carry = data.carry
    else report('invalid-value', 'carry', 'carry must be one step reference.')
  }
  for (const key of ['removals', 'locks'] as const) {
    if (!(key in data)) continue
    if (isStrings(data[key])) out[key] = data[key]
    else report('invalid-value', key, `${key} must be a list of paths.`)
  }
  if ('editor' in data) {
    const editor = readEditor(data.editor, report)
    if (editor) out.editor = editor
  }
  if ('preview' in data) {
    const preview = data.preview
    if (isRecord(preview) && typeof preview.url === 'string') {
      checkKeys(preview, ['url'], 'preview.', report)
      out.preview = { url: preview.url }
    } else {
      report('invalid-value', 'preview', 'preview must be { url: <string> }.')
    }
  }
  return out
}
