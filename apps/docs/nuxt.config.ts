import fs from 'fs'
import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', href: '/karagoz-logo.svg', type: 'image/svg+xml' }],
    },
  },
  devtools: { enabled: true },
  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key'), 'utf-8'),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'), 'utf-8'),
    },
  },
  i18n: {
    baseUrl: 'https://karagoz.dev',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      fallbackLocale: 'en',
    },
    lazy: true,
    locales: [
      { code: 'ar', dir: 'rtl', file: 'ar.ts', iso: 'ar-SY', name: 'العربية' },
      { code: 'de', dir: 'ltr', file: 'de.ts', iso: 'de-DE', name: 'Deutsch' },
      { code: 'en', dir: 'ltr', file: 'en.ts', iso: 'en-UK', name: 'English' },
    ],
    strategy: 'prefix_and_default',
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  nitro: {
    routeRules: {
      '**': {
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
