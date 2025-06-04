import { i18nMessages } from '@karagoz/sandbox'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  fallbackLocale: 'en',
  locale: localStorage.getItem('locale') || 'en',
  messages: { ...i18nMessages },
  supportedLocales: ['ar', 'de', 'en'],
})
