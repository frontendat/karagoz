export default defineI18nLocale(async (locale) => {
  return {
    ...(await import('@karagoz/sandbox')).i18nMessages.ar,
    layouts: {
      siteName: 'Karagöz',
      title: 'مكونات برمجية تفاعلية - Karagöz قره كوز',
    },
    pages: {
      sandbox: {
        demos: {
          defaults: {
            title: 'مثال بالإعدادات الافتراضية',
          },
        },
      },
    },
  }
})
