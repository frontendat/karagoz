import { resolve } from 'path'
import { defineConfig } from 'vite'

// The parser is pure: no Vue, no CSS. Built apart from the component bundle so it ships as its own browser-safe entry.
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/parse/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'parse',
    },
    rollupOptions: { external: [/^markdown-it/, 'yaml'] },
  },
})
