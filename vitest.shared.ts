import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

// Shared by every package's own vitest.config.ts.
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
  },
})
