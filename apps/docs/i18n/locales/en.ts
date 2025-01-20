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
      tocButton: 'On this page',
      tocTitle: 'On this page:',
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
