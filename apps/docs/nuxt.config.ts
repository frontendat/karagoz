import fs from 'fs'
import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', href: '/karagoz-logo.svg', type: 'image/svg+xml' }],
    },
  },

  compatibilityDate: '2025-01-29',

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'monokai',
        },
      },
    },
  },

  devtools: { enabled: true },

  devServer: {
    https: import.meta.dev
      ? {
          key: fs.readFileSync(
            path.resolve(__dirname, 'localhost.key'),
            'utf-8',
          ),
          cert: fs.readFileSync(
            path.resolve(__dirname, 'localhost.crt'),
            'utf-8',
          ),
        }
      : undefined,
  },

  experimental: {
    scanPageMeta: true,
  },

  hooks: {
    // This helped enable crossOriginIsolated for the WebContainer API and get Nuxt DevTools working simultaneously
    'vite:serverCreated': (server) => {
      server.middlewares.use((_req, res, next) => {
        res.setHeader('Cross-Origin-Resource-Policy', 'same-origin')
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
        res.setHeader('Access-Control-Allow-Origin', 'https://localhost:3000')
        next()
      })
    },
  },

  i18n: {
    baseUrl: 'https://karagoz.dev',
    defaultLocale: 'en',
    // currently only English in production
    detectBrowserLanguage: import.meta.dev
      ? {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          fallbackLocale: 'en',
        }
      : false,
    lazy: true,
    locales: [
      { code: 'ar', dir: 'rtl', file: 'ar.ts', iso: 'ar-SY', name: 'العربية' },
      { code: 'de', dir: 'ltr', file: 'de.ts', iso: 'de-DE', name: 'Deutsch' },
      { code: 'en', dir: 'ltr', file: 'en.ts', iso: 'en-UK', name: 'English' },
    ],
    strategy: 'prefix_and_default',
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
  ],

  nitro: {
    routeRules: {
      '/*': {
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      },
    },
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },

  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config',
  },
})
