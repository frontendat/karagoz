import { asyncComputed, createSharedComposable } from '@vueuse/core'
import { reloadPreview as wcReloadPreview } from '@webcontainer/api'
import { computed, ref, toRef } from 'vue'

import { injectWebContainer } from '../utils/WebContainer.ts'
import { useSandboxProcessTabs } from './useSandboxProcessTabs.ts'
import { useSandboxTabs } from './useSandboxTabs.ts'

function useSandboxInternal() {
  const container = asyncComputed(async () => {
    const c = await injectWebContainer()
    c.on('server-ready', (_, url) => (previewUrl.value = url))
    return c
  }, null)
  const previewFrame = ref<HTMLIFrameElement>()
  const previewUrl = ref<string>()

  const editorTabs = useSandboxTabs()
  const processTabs = useSandboxProcessTabs()

  // instance handling

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
    container: computed(() => container.value),
    editorTabs,
    installDeps,
    previewFrame,
    previewUrl: toRef(computed(() => previewUrl.value ?? '')),
    processTabs,
    reloadPreview,
    startDevServer,
  }
}

export const useSandbox = createSharedComposable(useSandboxInternal)
