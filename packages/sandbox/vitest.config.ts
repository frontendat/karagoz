import { mergeConfig } from 'vitest/config'
import shared from '../../vitest.shared'

export default mergeConfig(shared, {
  test: {
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'json-summary'],
      // Logic only: composables and utils. Components are left to the end-to-end suite.
      include: ['src/composables/**/*.ts', 'src/utils/**/*.ts'],
      exclude: [
        '**/*.test.ts',
        'src/**/index.ts',
        'src/**/*.d.ts',
        // Third-party wiring (terminal and code editor): left to Playwright.
        'src/utils/xterm.ts',
        'src/utils/codemirror.ts',
        'src/utils/codemirrorHighlight.ts',
      ],
      // Global, no ratchet and no per-file thresholds.
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 75,
      },
    },
  },
})
