import { createEventHook } from '@vueuse/core'
import {
  FileSystemTree,
  WebContainer,
  WebContainerProcess,
} from '@webcontainer/api'
import { computed, ref, toRef } from 'vue'

import type {
  UseWebContainerOptions,
  WCErrorListenerParams,
  WCEventListener,
  WCEventListenerParams,
  WCFileTreeChangeListenerParams,
  WCInitListenerParams,
  WCPortListenerParams,
  WCServerReadyListenerParams,
} from '../types'
import { WCEventReg } from '../types/EventReg.ts'

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
  const previewUrl = ref<string>()
  const bus = {
    error: createEventHook<WCErrorListenerParams>(),
    init: createEventHook<WCInitListenerParams>(),
    fileTreeChange: createEventHook<WCFileTreeChangeListenerParams>(),
    port: createEventHook<WCPortListenerParams>(),
    serverReady: createEventHook<WCServerReadyListenerParams>(),
  }

  // event handling

  const on = ((event, listener: WCEventListener) =>
    bus[event].on(listener)) as WCEventReg

  const off = ((event, listener: WCEventListener) =>
    bus[event].off(listener)) as WCEventReg

  const once = ((event, listener: WCEventListener) => {
    const onceListener = (params: WCEventListenerParams) => {
      listener(params)
      bus[event].off(onceListener)
    }
    bus[event].on(onceListener)
  }) as WCEventReg

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
      if (options?.shouldReinstall) {
        runningProcesses.get(processKeys.install)?.kill()
        runningProcesses.get(processKeys.devServer)?.kill()
        await installDeps().then(console.log)
        await startDevServer()
      } else if (options?.shouldRestart) {
        runningProcesses.get(processKeys.devServer)?.kill()
        await startDevServer()
      }
      await bus.fileTreeChange.trigger({
        container,
      })
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

  return {
    boot,
    ensureInstance,
    installDeps,
    mount,
    off,
    on,
    once,
    previewUrl: toRef(computed(() => previewUrl.value ?? '')),
    startDevServer,
  }
}
