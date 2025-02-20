import '@karagoz/shared/dist/karagoz-shared.css'
import '@karagoz/sandbox/dist/karagoz-sandbox.css'
import './style.css'

import { createApp, h, Suspense } from 'vue'

import App from './App.vue'

createApp({
  render: () =>
    h(Suspense, null, {
      default: h(App),
      fallback: h('div', 'Initialising Web Container...'),
    }),
}).mount('#app')
