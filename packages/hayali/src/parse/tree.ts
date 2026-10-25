import type { AdjustmentsTree } from '../types'

/** Defines an own property so a `__proto__` path segment cannot reach the prototype. */
const define = <T>(target: Record<string, T>, key: string, value: T) =>
  Object.defineProperty(target, key, {
    value,
    enumerable: true,
    writable: true,
    configurable: true,
  })

/** Splits a root-relative path into its segments, dropping empty and `.` ones. */
export const segments = (path: string): string[] =>
  path.split('/').filter((part) => part !== '' && part !== '.')

/** Normalizes a path to `a/b/c`, or `''` when nothing is left. */
export const normalizePath = (path: string): string => segments(path).join('/')

/** Whether `path` or one of its parent directories is already a file in `taken`, or it is a directory of one. */
export const conflicts = (taken: Iterable<string>, path: string): boolean => {
  for (const other of taken) {
    if (other === path) return true
    if (other.startsWith(`${path}/`) || path.startsWith(`${other}/`))
      return true
  }
  return false
}

/** Puts a file into the tree, creating directories on the way. The path must not `conflict` with existing ones. */
export const setFile = (
  tree: AdjustmentsTree,
  path: string,
  contents: string,
): void => {
  const parts = segments(path)
  const name = parts.pop()
  if (name === undefined) return
  let level = tree
  for (const dir of parts) {
    const existing = Object.getOwnPropertyDescriptor(level, dir)?.value as
      | { directory: AdjustmentsTree }
      | undefined
    if (existing && 'directory' in existing) {
      level = existing.directory
      continue
    }
    const created: AdjustmentsTree = {}
    define(level, dir, { directory: created })
    level = created
  }
  define(level, name, { file: { contents } })
}

/** A `src=` path as a clean relative POSIX path, or `undefined` if it is empty, absolute or escapes the lesson folder. */
export const normalizeSrcPath = (raw: string): string | undefined => {
  if (raw === '' || raw.startsWith('/') || raw.includes('\\')) return undefined
  if (/^[A-Za-z]:/.test(raw)) return undefined
  const kept: string[] = []
  for (const part of raw.split('/')) {
    if (part === '' || part === '.') continue
    if (part === '..') {
      if (kept.pop() === undefined) return undefined
    } else {
      kept.push(part)
    }
  }
  return kept.length > 0 ? kept.join('/') : undefined
}
