import { createSharedComposable } from '@vueuse/core'
import {
  FileSystemTree,
  reloadPreview as wcReloadPreview,
  WebContainerProcess,
} from '@webcontainer/api'
import { computed, ref, toRef } from 'vue'

import { injectWebContainer } from '../utils/WebContainer.ts'
import { useKaragozSandboxEvents } from './useKaragozSandboxEvents.ts'
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

  // instance handling

  bootstrap(container)

  on('serverReady', ({ url }) => (previewUrl.value = url))

  const installDeps = async () => {
    const installProcess = await container.spawn('npm', ['install'])
    if (!installProcess) {
      bus.error.trigger({
        container,
        error: { message: 'Install process did not start.' },
      })
      return -1
    }
    runningProcesses.set(processKeys.install, installProcess)
    installProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data)
        },
      }),
    )
    return installProcess.exit
  }

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

  const startDevServer = async () => {
    const devServerProcess = await container.spawn('npm', ['run', 'start'])
    if (!devServerProcess) {
      return
    }
    runningProcesses.set(processKeys.devServer, devServerProcess)
    devServerProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data)
        },
      }),
    )
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
    reloadPreview,
    startDevServer,
  }
}

export const useKaragozSandbox = createSharedComposable(
  useKaragozSandboxInternal,
)
