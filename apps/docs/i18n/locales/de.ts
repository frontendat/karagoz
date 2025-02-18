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
      default: {
        topBar: {
          nav: {
            sandbox: 'Sandbox',
            sandboxTeaser:
              'Optimiere deine interaktiven Code-Demos mit der Leistung von WebContainern.',
            sandboxSetup: 'Installation',
            sandboxGettingStarted: 'Erste Schritte',
            sandboxHandbook: 'Handbuch',
            sandboxApiReference: 'API Referenz',
            blog: 'Blog',
          },
          extras: {
            switchToDarkTheme: 'Zum Dunkelmodus wechseln',
            switchToLightTheme: 'Zum Lichtmodus wechseln',
            github: 'Code auf GitHub',
          },
        },
        footer: {
          licenseText: 'Veröffentlicht unter {0}.',
          licenseName: 'MIT-Lizenz',
          copyright: 'Copyright © 2024-{year} Mahmoud Aldaas.',
        },
      },
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
