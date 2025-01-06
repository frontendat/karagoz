import { createEventHook, createSharedComposable } from '@vueuse/core'

const useDemoRunnerInternal = () => {
  const kill = createEventHook<void>()

  return {
    killRunning: () => kill.trigger(),
    onKillRunning: (handler: () => void) => kill.on(handler),
  }
}

export const useDemoRunner = createSharedComposable(useDemoRunnerInternal)
