import { beforeAll, describe, expect, it } from 'vitest'

import { docsNavSections } from '../utils/docsNav'

// The locale files use Nuxt's auto-imported `defineI18nLocale`, which is the identity at runtime.
beforeAll(() => {
  ;(globalThis as Record<string, unknown>).defineI18nLocale = (fn: unknown) =>
    fn
})

const get = (messages: Record<string, unknown>, key: string) =>
  key
    .split('.')
    .reduce<unknown>(
      (node, part) => (node as Record<string, unknown> | undefined)?.[part],
      messages,
    )

describe('docsNavSections', () => {
  it('has the Sandbox and Hayali sections, each pointing into its own section', () => {
    expect(docsNavSections.map((s) => s.id)).toEqual(['sandbox', 'hayali'])
    for (const section of docsNavSections)
      for (const link of section.links)
        expect(link.path.startsWith(section.base)).toBe(true)
  })

  it.each(['en', 'de', 'ar'])(
    '%s has a translation for every label the navigation uses',
    async (locale) => {
      const load = (await import(`../i18n/locales/${locale}.ts`))
        .default as () => Promise<Record<string, unknown>>
      const messages = await load()
      const keys = [
        ...docsNavSections.flatMap((s) => [
          s.label,
          s.teaser,
          ...s.links.map((l) => l.label),
        ]),
        'layouts.default.topBar.nav.menu',
        'layouts.default.topBar.nav.closeMenu',
      ]

      for (const key of keys)
        expect(get(messages, key), `${locale}: ${key}`).toEqual(
          expect.any(String),
        )
    },
  )
})
