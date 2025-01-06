export default defineI18nLocale(async (locale) => {
  return {
    ...(await import('@karagoz/sandbox')).i18nMessages.de,
    component: {
      demoRunner: {
        clickToStart: 'Demo starten',
      },
      hint: {
        defaultTitle: 'Achtung!',
      },
    },
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
