import { createSharedComposable } from '@vueuse/core'
import {
  FileSystemTree,
  reloadPreview as wcReloadPreview,
  WebContainerProcess,
} from '@webcontainer/api'
import { computed, ref, toRef } from 'vue'

import type { KaragozSandFileListenerParams } from '../types'
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

  const { bus, off, on, once } = useKaragozSandboxEvents()

  const { tabs, latestTab, handleFileEvent } = useKaragozSandboxTabs()
  on('file', handleFileEvent)

  // instance handling

  const bindDefaultEvents = () => {
    // bind event handlers
    container.on('error', (error) =>
      bus.error.trigger({
        container,
        error,
      }),
    )
    container.on('port', (port, type, url) =>
      bus.port.trigger({
        container,
        port,
        type,
        url,
      }),
    )
    container.on('server-ready', (port, url) => {
      console.log(url)
      previewUrl.value = url
      bus.serverReady.trigger({
        container,
        url,
        port,
      })
    })
    // trigger init event
    bus.init.trigger({
      container,
    })
  }
  bindDefaultEvents()

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

  const triggerFileOperation =
    (operation: KaragozSandFileListenerParams['operation']) => (path: string) =>
      bus.file.trigger({
        container,
        operation,
        path,
      })

  return {
    container: () => container,
    fileClose: triggerFileOperation('close'),
    fileOpen: triggerFileOperation('open'),
    installDeps,
    latestTab,
    mount,
    off,
    on,
    once,
    previewFrame,
    previewUrl: toRef(computed(() => previewUrl.value ?? '')),
    reloadPreview,
    startDevServer,
    tabs,
  }
}

export const useKaragozSandbox = createSharedComposable(
  useKaragozSandboxInternal,
)
