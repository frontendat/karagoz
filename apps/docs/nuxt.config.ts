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
  i18n: {
    vueI18n: './i18n.config.ts', // if you are using custom path, default
  },
  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss'],
  devServer: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key'), 'utf-8'),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'), 'utf-8'),
    },
  },
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
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config',
  },
  vite: {
    server: {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
        cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),
      },
    },
  },
})
