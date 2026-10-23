import { i18nMessages as sandboxMessages } from '@karagoz/sandbox'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'

import { i18nMessages } from './index'

const locales = ['en', 'de', 'ar'] as const

/** Dotted paths of every leaf message, e.g. `krgz.hayali.locks.title`. */
const keyPaths = (node: unknown, prefix = ''): string[] =>
  typeof node === 'object' && node !== null
    ? Object.entries(node).flatMap(([k, v]) =>
        keyPaths(v, prefix ? `${prefix}.${k}` : k),
      )
    : [prefix]

describe('i18nMessages', () => {
  it('has exactly the en, de and ar locales', () => {
    expect(Object.keys(i18nMessages).sort()).toEqual(['ar', 'de', 'en'])
  })

  it.each(locales)('%s: is one krgz root with dir, sandbox and hayali', (l) => {
    expect(Object.keys(i18nMessages[l])).toEqual(['krgz'])
    expect(Object.keys(i18nMessages[l].krgz).sort()).toEqual([
      'dir',
      'hayali',
      'sandbox',
    ])
  })

  it.each(locales)('%s: re-exports the sandbox messages unchanged', (l) => {
    expect(i18nMessages[l].krgz.sandbox).toEqual(
      sandboxMessages[l].krgz.sandbox,
    )
    expect(i18nMessages[l].krgz.dir).toBe(sandboxMessages[l].krgz.dir)
  })

  it('uses the right direction per locale', () => {
    expect(i18nMessages.en.krgz.dir).toBe('ltr')
    expect(i18nMessages.de.krgz.dir).toBe('ltr')
    expect(i18nMessages.ar.krgz.dir).toBe('rtl')
  })

  it.each(['de', 'ar'] as const)('%s has the same keys as en', (l) => {
    expect(keyPaths(i18nMessages[l]).sort()).toEqual(
      keyPaths(i18nMessages.en).sort(),
    )
  })

  it.each(locales)(
    '%s: merging only this pack renders hayali and sandbox UI',
    (l) => {
      const i18n = createI18n({
        legacy: false,
        locale: l,
        fallbackLocale: undefined,
        missingWarn: false,
        messages: { [l]: i18nMessages[l] },
      })
      const { t, te } = i18n.global

      for (const key of [
        'krgz.hayali.next',
        'krgz.sandbox.general.close',
        'krgz.dir',
      ])
        expect(te(key), key).toBe(true)
      expect(t('krgz.hayali.next')).toBe(i18nMessages[l].krgz.hayali.next)
      expect(t('krgz.sandbox.general.close')).toBe(
        i18nMessages[l].krgz.sandbox.general.close,
      )
    },
  )
})
