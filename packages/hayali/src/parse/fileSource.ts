import type { FileSource } from './resolve'
import { normalizeSrcPath } from './tree'
import type { ParseIssueRule } from './types'

export interface FileSourceContext {
  /** Reports an issue on the fence being read. */
  fail: (rule: ParseIssueRule, message: string) => void
  resolveSrc?: (path: string) => string | undefined
  /** Collects the normalized `src=` paths asked of `resolveSrc`, once each. */
  srcPaths: string[]
}

/**
 * Where a file fence gets its content: its body, `from=` or `src=`, never more than one. Reports why and returns
 * `undefined` when the fence cannot be used.
 */
export const readFileSource = (
  fence: { attrs: Map<string, string>; content: string; path: string },
  { fail, resolveSrc, srcPaths }: FileSourceContext,
): FileSource | undefined => {
  const { attrs, content, path } = fence
  const from = attrs.get('from')
  const src = attrs.get('src')
  const hasBody = content.trim() !== ''

  if (from !== undefined && src !== undefined) {
    fail(
      'conflicting-file-source',
      `"${path}" cannot take its content from both from= and src=.`,
    )
    return undefined
  }
  if (from !== undefined) {
    if (!hasBody) return { kind: 'from', ref: from }
    fail(
      'ref-with-body',
      `"${path}" reuses another step's file, so its fence must be empty.`,
    )
    return undefined
  }
  if (src === undefined) return { kind: 'literal', contents: content }

  if (hasBody) {
    fail(
      'src-with-body',
      `"${path}" takes its content from src=, so its fence must be empty.`,
    )
    return undefined
  }
  const srcPath = normalizeSrcPath(src)
  if (srcPath === undefined) {
    fail(
      'invalid-src',
      `src="${src}" must be a relative path inside the lesson's folder.`,
    )
    return undefined
  }
  let contents: unknown
  if (resolveSrc) {
    if (!srcPaths.includes(srcPath)) srcPaths.push(srcPath)
    try {
      contents = resolveSrc(srcPath)
    } catch {
      contents = undefined
    }
  }
  if (typeof contents !== 'string') {
    fail('unresolved-src', `Could not read src="${srcPath}" for "${path}".`)
    return undefined
  }
  return { kind: 'literal', contents }
}
