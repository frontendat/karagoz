export default defineI18nLocale(async (locale) => {
  return {
    ...(await import('@karagoz/sandbox')).i18nMessages.de,
    layouts: {
      siteName: 'Karagöz',
      title: 'Karagöz - interaktive Programmierkomponenten',
    },
    pages: {
      sandbox: {
        demos: {
          defaults: {
            title: 'Standarddemo',
          },
        },
      },
    },
  }
})
