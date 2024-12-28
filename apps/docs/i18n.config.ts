import { i18nMessages } from '@karagoz/sandbox'

export default defineI18nConfig(() => ({
  availableLocales: ['ar', 'de', 'en'],
  defaultLocale: 'en',
  fallbackLocale: 'en',
  legacy: false,
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
