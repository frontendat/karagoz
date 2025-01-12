export default defineI18nLocale(async (locale) => {
  return {
    ...(await import('@karagoz/sandbox')).i18nMessages.ar,
    component: {
      demoRunner: {
        clickToStart: 'اضغط لعرض المثال',
      },
      hint: {
        defaultTitle: 'تنويه!',
      },
    },
    layouts: {
      siteName: 'Karagöz',
      title: 'مكونات برمجية تفاعلية - Karagöz قره كوز',
    },
    pages: {
      notFound: {
        title: 'غير موجود',
        content: 'ألق نظرة على الصفحات التالية:',
        noContent: 'لا شيئ للاطلاع عليه هنا!',
      },
      sandbox: {
        apiReference: {
          components: {
            title: 'المكونات',
          },
          functions: {
            title: 'التوابع',
          },
          typeAliases: {
            title: 'الأنواع',
          },
          variables: {
            title: 'المتغيرات',
          },
        },
        demos: {
          defaults: {
            title: 'مثال بالإعدادات الافتراضية',
          },
        },
      },
    },
  }
})
