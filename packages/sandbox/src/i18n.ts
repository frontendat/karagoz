import { createI18n } from 'vue-i18n'

import { ar, de, en } from './locales'

export const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'en',
  locale: localStorage.getItem('locale') || 'en',
  messages: { ar, de, en },
  supportedLocales: ['ar', 'de', 'en'],
})
