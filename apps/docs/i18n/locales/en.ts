export default defineI18nLocale(async (locale) => {
  return {
    ...(await import('@karagoz/sandbox')).i18nMessages.en,
    component: {
      demoRunner: {
        clickToStart: 'Click to start demo',
      },
      hint: {
        defaultTitle: 'Heads up!',
      },
    },
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
