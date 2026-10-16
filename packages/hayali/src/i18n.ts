import { i18nMessages as sandboxMessages } from '@karagoz/sandbox'
import { createI18n } from 'vue-i18n'

import { ar, de, en } from './locales'

export const i18n = createI18n({
  fallbackLocale: 'en',
  locale: localStorage.getItem('locale') || 'en',
  messages: {
    ar: { krgz: { ...sandboxMessages.ar.krgz, ...ar.krgz } },
    de: { krgz: { ...sandboxMessages.de.krgz, ...de.krgz } },
    en: { krgz: { ...sandboxMessages.en.krgz, ...en.krgz } },
  },
  supportedLocales: ['ar', 'de', 'en'],
})
