export default defineI18nLocale(async () => {
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
      tocButton: 'On this page',
      tocTitle: 'On this page:',
      default: {
        topBar: {
          nav: {
            sandbox: 'Sandbox',
            sandboxTeaser:
              'Boost your interactive code demos with the power of WebContainers.',
            sandboxSetup: 'Setup',
            sandboxGettingStarted: 'Getting Started',
            sandboxHandbook: 'Handbook',
            sandboxApiReference: 'API Reference',
            blog: 'Blog',
          },
          extras: {
            switchToDarkTheme: 'Switch to Dark Theme',
            switchToLightTheme: 'Switch to Light Theme',
            github: 'Code on GitHub',
          },
        },
        footer: {
          licenseText: 'Released under {0}',
          licenseName: 'MIT License',
          copyright: 'Copyright © 2024-{year} Mahmoud Aldaas',
          privacyPolicy: 'Privacy Policy',
        },
      },
    },
    pages: {
      notFound: {
        title: 'Not Found',
        content: 'Check out these pages:',
        noContent: 'Nothing to see here!',
      },
      sandbox: {
        apiReference: {
          components: {
            title: 'Components',
          },
          functions: {
            title: 'Functions',
          },
          typeAliases: {
            title: 'Type Aliases',
          },
          variables: {
            title: 'Variables',
          },
        },
        handbook: {
          title: 'Handbook',
        },
      },
    },
  }
})
