import '@karagoz/shared/dist/style.css'
import './style.css'

import { LoadingIndicator } from '@karagoz/shared'
import { Binary } from 'lucide-vue-next'
import { createApp, h, Suspense } from 'vue'

import App from './App.vue'

createApp({
  render: () =>
    h(Suspense, null, {
      default: () => h(App),
      fallback: () =>
        h(
          LoadingIndicator,
          {
            label: 'Booting Web Container...',
            variant: 'secondary',
          },
          h(Binary, { class: 'size-32' }),
        ),
    }),
}).mount('#app')
