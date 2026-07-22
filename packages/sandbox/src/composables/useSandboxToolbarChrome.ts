import { useDark, useFullscreen, useToggle } from '@vueuse/core'

/**
 * Shared fullscreen and dark-mode toggle wiring for the sandbox's toolbar chrome, used by both
 * the desktop (`KrgzSandboxPanelToggles`) and mobile (`KrgzSandboxMobileToolbar`) layouts.
 */
export function useSandboxToolbarChrome(
  target: Parameters<typeof useFullscreen>[0],
) {
  const fullscreen = useFullscreen(target)
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  return { fullscreen, isDark, toggleDark }
}
