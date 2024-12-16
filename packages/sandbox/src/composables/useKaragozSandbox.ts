import { createSharedComposable } from '@vueuse/core'
import {
  FileSystemTree,
  reloadPreview as wcReloadPreview,
  WebContainerProcess,
} from '@webcontainer/api'
import { computed, ref, toRef } from 'vue'

import { injectWebContainer } from '../utils/WebContainer.ts'
import { useKaragozSandboxEvents } from './useKaragozSandboxEvents.ts'
import { useKaragozSandboxProcessTabs } from './useKaragozSandboxProcessTabs.ts'
import { useKaragozSandboxTabs } from './useKaragozSandboxTabs.ts'

function useKaragozSandboxInternal() {
  const container = injectWebContainer()
  const processKeys = {
    install: 'install',
    devServer: 'devServer',
  } as const
  const runningProcesses = new Map<
    keyof typeof processKeys,
    WebContainerProcess
  >()
  const previewFrame = ref<HTMLIFrameElement>()
  const previewUrl = ref<string>()

  const { bootstrap, bus, off, on, once } = useKaragozSandboxEvents()
  const editorTabs = useKaragozSandboxTabs()
  const processTabs = useKaragozSandboxProcessTabs(container)

  // instance handling

  bootstrap(container)

  on('serverReady', ({ url }) => (previewUrl.value = url))

  const installDeps = () =>
    processTabs.open('npm install', 'Install', {
      command: 'npm',
      args: ['install'],
    })

  const startDevServer = async () =>
    processTabs.open('npm run start', 'Dev Server', {
      command: 'npm',
      args: ['start'],
    })

  const mount = async (
    snapshotOrTree: FileSystemTree | Uint8Array | ArrayBuffer,
    options?: {
      mountPoint?: string
      shouldReinstall?: boolean
      shouldRestart?: boolean
    },
  ) => {
    await container.mount(snapshotOrTree, options)
    // watch entire directory to emit fileTreeChange events
    container.fs.watch('.', { recursive: true }, () =>
      bus.fileTreeChange.trigger({
        container,
      }),
    )
    if (options?.shouldReinstall) {
      runningProcesses.get(processKeys.install)?.kill()
      runningProcesses.get(processKeys.devServer)?.kill()
      await installDeps().then(console.log)
      await startDevServer()
    } else if (options?.shouldRestart) {
      runningProcesses.get(processKeys.devServer)?.kill()
      await startDevServer()
    }
  }

  const reloadPreview = () => {
    if (previewFrame.value) {
      wcReloadPreview(previewFrame.value)
    }
  }

  return {
    container: () => container,
    editorTabs,
    installDeps,
    mount,
    off,
    on,
    once,
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
