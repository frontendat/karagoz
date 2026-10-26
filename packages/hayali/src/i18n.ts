import { createI18n } from 'vue-i18n'

import { i18nMessages } from './locales'

export const i18n = createI18n({
  fallbackLocale: 'en',
  locale: localStorage.getItem('locale') || 'en',
  messages: i18nMessages,
  supportedLocales: ['ar', 'de', 'en'],
})
