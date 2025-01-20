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
      tocButton: 'In dieser Seite',
      tocTitle: 'In dieser Seite:',
    },
    pages: {
      notFound: {
        title: 'Nicht gefunden',
        content: 'Schau dir folgende Seiten:',
        noContent: 'Nichts zu sehen!',
      },
      sandbox: {
        apiReference: {
          components: {
            title: 'Komponenten',
          },
          functions: {
            title: 'Funktionen',
          },
          typeAliases: {
            title: 'Typ-Aliase',
          },
          variables: {
            title: 'Variablen',
          },
        },
        handbook: {
          title: 'Handbuch',
        },
      },
    },
  }
})
