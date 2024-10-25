import './style.css'

import { createApp, h, Suspense } from 'vue'

import App from './App.vue'

createApp({
  render: () =>
    h(Suspense, null, {
      default: () => h(App),
      fallback: () => h('div', 'Initialising Web Container...'),
    }),
}).mount('#app')
