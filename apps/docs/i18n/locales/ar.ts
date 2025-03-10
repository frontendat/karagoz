export default defineI18nLocale(async () => {
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
      tocButton: 'في هذه الصفحة',
      tocTitle: 'في هذه الصفحة:',
      default: {
        topBar: {
          nav: {
            sandbox: 'Sandbox',
            sandboxTeaser:
              'ادعم عروضك البرمجية التفاعلية مع ميزات WebContainers.',
            sandboxSetup: 'التنصيب',
            sandboxGettingStarted: 'الإعداد لأول مرة',
            sandboxHandbook: 'دليل الاستخدام',
            sandboxApiReference: 'مرجع الواجهة البرمجية',
            blog: 'المدونة',
          },
          extras: {
            switchToDarkTheme: 'تبديل إلى الوضع المظلم',
            switchToLightTheme: 'تبديل إلى الوضع المضيئ',
            github: 'رابط GitHub',
          },
        },
        footer: {
          licenseText: 'المحتوى يخضع إلى {0}',
          licenseName: 'رخصة MIT',
          copyright: 'حقوق النشر © 2024-{year} محمود الدعاس',
          privacyPolicy: 'سياسة الخصوصوية',
        },
      },
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
        handbook: {
          title: 'دليل الاستخدام',
        },
      },
    },
  }
})
