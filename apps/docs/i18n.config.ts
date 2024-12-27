import { i18nMessages } from '@karagoz/sandbox'

export default defineI18nConfig(() => ({
  availableLocales: ['ar', 'de', 'en'],
  fallbackLocale: 'en',
  legacy: false,
  locale: 'en',
  messages: {
    ar: {
      ...i18nMessages.ar,
    },
    de: {
      ...i18nMessages.de,
    },
    en: {
      ...i18nMessages.en,
    },
  },
}))
