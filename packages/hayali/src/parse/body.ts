/** A 0-based `[start, end)` range of lines. */
export type LineRange = [start: number, end: number]

/**
 * The Markdown of `lines[start, end)` without the `cuts` (the fences that became files and blocks), trimmed. A cut
 * between two blank lines does not leave a double gap.
 */
export const sliceBody = (
  lines: string[],
  start: number,
  end: number,
  cuts: LineRange[],
): string => {
  const out: string[] = []
  let skipBlank = true
  let cursor = start
  const copyTo = (to: number) => {
    for (; cursor < to; cursor++) {
      const text = lines[cursor]
      if (skipBlank && text.trim() === '') continue
      skipBlank = false
      out.push(text)
    }
  }
  for (const [from, to] of [...cuts].sort((a, b) => a[0] - b[0])) {
    copyTo(from)
    cursor = to
    skipBlank = out.length === 0 || out[out.length - 1].trim() === ''
  }
  copyTo(end)
  return out.join('\n').trim()
}
