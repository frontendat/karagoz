import type { useSandbox } from '@karagoz/sandbox'
import { describe, expect, it } from 'vitest'

import type { StepEntrySandbox } from './useStepEntry'

describe('useStepEntry wiring', () => {
  it('is satisfied by the real useSandbox() surface (checked by vue-tsc)', () => {
    // Compile-time check: if the sandbox API drifts from what Hayali calls, `vue-tsc --noEmit` fails here.
    const satisfies = (sandbox: ReturnType<typeof useSandbox>) =>
      sandbox satisfies StepEntrySandbox
    expect(satisfies).toBeTypeOf('function')
  })
})
