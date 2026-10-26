import { i18nMessages as sandboxMessages } from '@karagoz/sandbox'

import { ar } from './ar'
import { de } from './de'
import { en } from './en'

const hayaliMessages = { ar, de, en }

const pack = <L extends keyof typeof hayaliMessages>(locale: L) => ({
  krgz: {
    // `dir` is defined once, by the sandbox pack.
    ...sandboxMessages[locale].krgz,
    ...hayaliMessages[locale].krgz,
  },
})

/**
 * Complete lang pack under one `krgz` root (`krgz.dir`, `krgz.sandbox.*`, `krgz.hayali.*`) for `en`, `de` and `ar`.
 * Includes the sandbox messages, so consumers merge only this object.
 */
export const i18nMessages = { ar: pack('ar'), de: pack('de'), en: pack('en') }
