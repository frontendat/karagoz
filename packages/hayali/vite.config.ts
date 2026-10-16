import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
    dts({ bundleTypes: true }),
  ],
  server: {
    // Listen on all interfaces so a published sandbox port is reachable from the host.
    host: '0.0.0.0',
    // WebContainers need cross-origin isolation.
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  build: {
    lib: {
      // src/index.ts is where we have exported the component(s)
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KaragozHayali',
      // the name of the output files when the build is run
      fileName: 'karagoz-hayali',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['@karagoz/sandbox', '@karagoz/shared', 'vue', 'vue-i18n'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
