import ignore from 'ignore'
import { computed } from 'vue'

import { SandboxOptions } from '../types/Sandbox.ts'

export const useSandboxExplorer = (options: SandboxOptions) => {
  const hidden = computed(() =>
    ignore({ allowRelativePaths: true }).add(options.explorer.hidden ?? []),
  )
  const readonly = computed(() =>
    ignore({ allowRelativePaths: true }).add(options.explorer.readonly ?? []),
  )

  return {
    hidden,
    readonly,
  }
}
