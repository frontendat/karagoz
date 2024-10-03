import { createEventHook } from '@vueuse/core'
import {
  FileSystemTree,
  WebContainer,
  WebContainerProcess,
} from '@webcontainer/api'
import { computed, Ref, ref, toRef } from 'vue'

type UseWebContainerOptions = {
  manualBoot?: boolean
}

type WebContainerEvents =
  | 'error'
  | 'fileTreeChange'
  | 'init'
  | 'port'
  | 'serverReady'

type ErrorListenerParams = {
  container?: WebContainer
  error: { message: string }
}

type InitListenerParams = {
  container: WebContainer
}

type FileTreeChangeListenerParams = {
  container: WebContainer
}

type PortListenerParams = {
  container: WebContainer
  port: number
  type: 'open' | 'close'
  url: string
}

type ServerReadyListenerParams = {
  container: WebContainer
  port: number
  url: string
}

type WebContainerEventListenerParams =
  | ErrorListenerParams
  | InitListenerParams
  | FileTreeChangeListenerParams
  | PortListenerParams
  | ServerReadyListenerParams

export type UseWebContainerReturn = {
  boot(restart?: boolean): Promise<void>
  ensureInstance(): Promise<WebContainer>
  installDeps(): Promise<number>
  mount(
    snapshotOrTree: FileSystemTree | Uint8Array | ArrayBuffer,
    options?: {
      mountPoint?: string
      shouldReinstall?: boolean
      shouldRestart?: boolean
    },
  ): Promise<void>
  previewUrl: Ref<string | undefined>
  startDevServer(): Promise<void>

  // Event handling - on
  on(event: 'error', listener: (params: ErrorListenerParams) => void): void
  on(
    event: 'fileTreeChange',
    listener: (params: FileTreeChangeListenerParams) => void,
  ): void
  on(event: 'init', listener: (params: InitListenerParams) => void): void
  on(event: 'port', listener: (params: PortListenerParams) => void): void
  on(
    event: 'serverReady',
    listener: (params: ServerReadyListenerParams) => void,
  ): void

  // Event handling - once
  once(event: 'error', listener: (params: ErrorListenerParams) => void): void
  once(
    event: 'fileTreeChange',
    listener: (params: FileTreeChangeListenerParams) => void,
  ): void
  once(event: 'init', listener: (params: InitListenerParams) => void): void
  once(event: 'port', listener: (params: PortListenerParams) => void): void
  once(
    event: 'serverReady',
    listener: (params: ServerReadyListenerParams) => void,
  ): void

  // Event handling - off
  off(event: 'error', listener: (params: ErrorListenerParams) => void): void
  off(
    event: 'fileTreeChange',
    listener: (params: FileTreeChangeListenerParams) => void,
  ): void
  off(event: 'init', listener: (params: InitListenerParams) => void): void
  off(event: 'port', listener: (params: PortListenerParams) => void): void
  off(
    event: 'serverReady',
    listener: (params: ServerReadyListenerParams) => void,
  ): void
}

export function useWebContainer(
  options?: UseWebContainerOptions,
): UseWebContainerReturn {
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
    error: createEventHook<ErrorListenerParams>(),
    init: createEventHook<InitListenerParams>(),
    fileTreeChange: createEventHook<FileTreeChangeListenerParams>(),
    port: createEventHook<PortListenerParams>(),
    serverReady: createEventHook<ServerReadyListenerParams>(),
  }

  // event handling

  const on = ((
    event: WebContainerEvents,
    listener: (params: WebContainerEventListenerParams) => void,
  ) => {
    bus[event].on((params) => {
      listener(params)
    })
  }) as UseWebContainerReturn['on']

  const off = ((
    event: WebContainerEvents,
    listener: (params: WebContainerEventListenerParams) => void,
  ) => {
    bus[event].off((params) => {
      listener(params)
    })
  }) as UseWebContainerReturn['off']

  const once = ((
    event: WebContainerEvents,
    listener: (params: WebContainerEventListenerParams) => void,
  ) => {
    const onceListener = (params: WebContainerEventListenerParams) => {
      listener(params)
      bus[event].off(onceListener)
    }
    bus[event].on(onceListener)
  }) as UseWebContainerReturn['once']

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
