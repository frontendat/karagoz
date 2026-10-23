import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const content = join(__dirname, '../../content')

const pagesOf = (locale: string) =>
  (
    readdirSync(join(content, locale, 'hayali'), {
      recursive: true,
    }) as string[]
  )
    .filter((file) => file.endsWith('.md'))
    // Generated API pages only exist in English (reached via Locale Fallback); the hand-written index is translated.
    .filter(
      (file) =>
        !file.startsWith('4.api-reference') ||
        file === '4.api-reference/index.md',
    )
    .sort()

describe('Hayali docs translations', () => {
  const english = pagesOf('en')

  it('has pages to compare', () => {
    expect(english.length).toBeGreaterThan(10)
  })

  it.each(['de', 'ar'])(
    '%s has a page for every English page (except generated API)',
    (locale) => {
      expect(pagesOf(locale)).toEqual(english)
    },
  )
})
