export default defineI18nLocale(async (locale) => {
  return {
    ...(await import('@karagoz/sandbox')).i18nMessages.en,
    layouts: {
      siteName: 'Karagöz',
      title: 'Karagöz - interactive coding components',
    },
    pages: {
      sandbox: {
        demos: {
          defaults: {
            title: 'Defaults demo',
          },
        },
      },
    },
  }
})
