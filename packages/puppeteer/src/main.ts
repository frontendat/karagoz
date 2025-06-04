import '@karagoz/shared/dist/karagoz-shared.css'
import '@karagoz/sandbox/dist/karagoz-sandbox.css'
import './style.css'

import { createApp, h, Suspense } from 'vue'

import App from './App.vue'
import { i18n } from './i18n.ts'

createApp({
  render: () =>
    h(Suspense, null, {
      default: h(App),
      fallback: h('div', 'Initialising Web Container...'),
    }),
})
  .use(i18n)
  .mount('#app')
