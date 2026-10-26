// @vitest-environment node
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import type { FullLayoutFrom } from './breakpoints'
import { layoutCss } from './layoutCss'

const supported: Exclude<FullLayoutFrom, 'none'>[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
]

describe('layoutCss', () => {
  const css = layoutCss()

  it('has exactly one @container block per supported fullLayoutFrom value', () => {
    for (const from of supported)
      expect(css.split(`[data-from='${from}']`).length - 1, from).toBe(1)
    expect(css.match(/@container hayali/g)).toHaveLength(supported.length)
  })

  it('has no block for "none", which always uses the single-panel layout', () => {
    expect(css).not.toContain("[data-from='none']")
  })

  it('uses the Tailwind container breakpoints', () => {
    expect(css).toContain('@container hayali (min-width: 48rem)')
    expect(css).toContain("[data-from='3xl']")
  })

  it('matches the committed src/layout.css (run `pnpm gen:layout` after changing the generator)', () => {
    const committed = readFileSync(
      new URL('../layout.css', import.meta.url),
      'utf-8',
    )
    expect(committed).toBe(css)
  })
})
