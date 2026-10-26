export interface FenceInfo {
  /** Bare words in order, e.g. `['css']` or `['yaml', 'krgz-step']`. */
  words: string[]
  /** `key=value` pairs; a bare `file` counts as `file=` with an empty value. Later keys win. */
  attrs: Map<string, string>
}

const KNOWN_KEYS = new Set(['file', 'from', 'src'])

/** Splits a fence info string into words, with `key=value` pairs where the value may be quoted. */
export const parseFenceInfo = (info: string): FenceInfo => {
  const words: string[] = []
  const attrs = new Map<string, string>()
  const token = /([^\s=]+)(?:=(?:"([^"]*)"|'([^']*)'|(\S*)))?/g
  for (const match of info.matchAll(token)) {
    const [, key, doubleQuoted, singleQuoted, bare] = match
    const hasValue = match[0].includes('=')
    if (hasValue) attrs.set(key, doubleQuoted ?? singleQuoted ?? bare ?? '')
    else if (KNOWN_KEYS.has(key)) attrs.set(key, '')
    else words.push(key)
  }
  return { words, attrs }
}
