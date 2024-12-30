import ignore from 'ignore'
import { computed } from 'vue'

import { SandboxOptions } from '../types'

export const useSandboxExplorer = (options: SandboxOptions) => {
  const hidden = computed(() =>
    ignore({ allowRelativePaths: true }).add(options.explorer.hidden ?? []),
  )

  const readonly = computed(() =>
    ignore({ allowRelativePaths: true }).add(options.explorer.readonly ?? []),
  )

  const reinstall = computed(() =>
    ignore({ allowRelativePaths: true }).add(options.explorer.reinstall ?? []),
  )

  return {
    /**
     * Computed ref containing a function to determine whether an entity (directory or file) should be
     * hidden in the file explorer.
     */
    hidden,
    /**
     * Computed ref containing a function to determine whether an entity (directory or file) should be
     * marked as readonly in the file explorer and editor tabs.
     */
    readonly,
    /**
     * Computed ref containing a function to determine whether changing an entity (directory or file) should
     * trigger the re-installation of dependencies and re-bootstrapping.
     */
    reinstall,
  }
}
