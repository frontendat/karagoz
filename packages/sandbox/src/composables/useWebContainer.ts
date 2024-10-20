import {
  FileSystemTree,
  reloadPreview as wcReloadPreview,
  WebContainer,
  WebContainerProcess,
} from '@webcontainer/api'
import { computed, ref, toRef } from 'vue'

import type { UseWebContainerOptions, WCFileListenerParams } from '../types'
import { useWebContainerEvents } from './useWebContainerEvents.ts'
import { useWebContainerTabs } from './useWebContainerTabs.ts'

export function useWebContainer(options?: UseWebContainerOptions) {
  const instance = ref<WebContainer>()
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

  const { bus, off, on, once } = useWebContainerEvents()

  const { tabs, latestTab, handleFileEvent } = useWebContainerTabs()
  on('file', handleFileEvent)

  // instance handling

  const boot = async (restart?: boolean) => {
    // if instance exists: restart if requested, otherwise return
    if (instance.value) {
      if (restart) {
        instance.value?.teardown()
      } else {
        return
      }
    }
    // instantiate
    const container = await WebContainer.boot()
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
    // set instance
    instance.value = container
    // trigger init event
    await bus.init.trigger({
      container,
    })
  }

  const ensureInstance = (): Promise<WebContainer> =>
    new Promise((resolve) => {
      if (instance.value) {
        resolve(instance.value)
      } else {
        once('init', ({ container }) => resolve(container))
        if (!options?.manualBoot) {
          boot()
        }
      }
    })

  const installDeps = async () => {
    const container = await ensureInstance()
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

  const mount = (
    snapshotOrTree: FileSystemTree | Uint8Array | ArrayBuffer,
    options?: {
      mountPoint?: string
      shouldReinstall?: boolean
      shouldRestart?: boolean
    },
  ) =>
    ensureInstance().then(async (container) => {
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
    })

  const startDevServer = () =>
    ensureInstance().then(async (container) => {
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
    })

  const reloadPreview = () => {
    if (previewFrame.value) {
      wcReloadPreview(previewFrame.value)
    }
  }

  const triggerFileOperation =
    (operation: WCFileListenerParams['operation']) => (path: string) =>
      ensureInstance().then(async (container) =>
        bus.file.trigger({
          container,
          operation,
          path,
        }),
      )

  return {
    boot,
    ensureInstance,
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
