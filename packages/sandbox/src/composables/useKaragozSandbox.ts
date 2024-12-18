import { createSharedComposable } from '@vueuse/core'
import { reloadPreview as wcReloadPreview } from '@webcontainer/api'
import { computed, ref, toRef } from 'vue'

import { injectWebContainer } from '../utils/WebContainer.ts'
import { useKaragozSandboxProcessTabs } from './useKaragozSandboxProcessTabs.ts'
import { useKaragozSandboxTabs } from './useKaragozSandboxTabs.ts'

function useKaragozSandboxInternal() {
  const container = injectWebContainer()
  const previewFrame = ref<HTMLIFrameElement>()
  const previewUrl = ref<string>()

  const editorTabs = useKaragozSandboxTabs()
  const processTabs = useKaragozSandboxProcessTabs(container)

  // instance handling

  container.on('server-ready', (_, url) => (previewUrl.value = url))

  const installDeps = () =>
    processTabs.open('npm install', 'Install', {
      command: 'npm',
      args: ['install'],
    })

  const startDevServer = () =>
    processTabs.open('npm run start', 'Dev Server', {
      command: 'npm',
      args: ['start'],
    })

  const reloadPreview = () => {
    if (previewFrame.value) {
      wcReloadPreview(previewFrame.value)
    }
  }

  return {
    container: () => container,
    editorTabs,
    installDeps,
    previewFrame,
    previewUrl: toRef(computed(() => previewUrl.value ?? '')),
    processTabs,
    reloadPreview,
    startDevServer,
  }
}

export const useKaragozSandbox = createSharedComposable(
  useKaragozSandboxInternal,
)
