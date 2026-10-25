// @vitest-environment node
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const dir = dirname(fileURLToPath(import.meta.url))
const srcRoot = resolve(dir, '..')

const sources = readdirSync(dir)
  .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
  .map((f) => join(dir, f))

const specifiers = (file: string): string[] =>
  [
    ...readFileSync(file, 'utf8').matchAll(
      /(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g,
    ),
  ].map((m) => m[1])

describe('parse entry stays browser-safe', () => {
  it('finds the parser sources', () => {
    expect(sources.length).toBeGreaterThan(0)
  })

  it.each(sources)('%s imports nothing Vue, Node or root-level', (file) => {
    for (const spec of specifiers(file)) {
      expect(spec, `${file} imports ${spec}`).not.toMatch(
        /^(vue|node:|@karagoz\/)/,
      )
      if (!spec.startsWith('.')) continue
      const target = resolve(dirname(file), spec)
      // Inside src/parse, or the pure `types` module; never the package root or components.
      const allowed =
        target.startsWith(dir) || target === join(srcRoot, 'types')
      expect(allowed, `${file} reaches ${spec}`).toBe(true)
    }
  })
})
