import { createEventHook, type EventHook } from '@vueuse/core'
import { WebContainer } from '@webcontainer/api'

import type {
  KaragozSandboxErrorListenerParams,
  KaragozSandboxFileTreeChangeListenerParams,
  KaragozSandboxInitListenerParams,
  KaragozSandboxPortListenerParams,
  KaragozSandEventListener,
  KaragozSandEventListenerParams,
  KaragozSandEventReg,
  KaragozSandServerReadyListenerParams,
} from '../types'

export const useKaragozSandboxEvents = () => {
  const bus: {
    init: EventHook<KaragozSandboxInitListenerParams>
    port: EventHook<KaragozSandboxPortListenerParams>
    fileTreeChange: EventHook<KaragozSandboxFileTreeChangeListenerParams>
    serverReady: EventHook<KaragozSandServerReadyListenerParams>
    error: EventHook<KaragozSandboxErrorListenerParams>
  } = {
    error: createEventHook<KaragozSandboxErrorListenerParams>(),
    init: createEventHook<KaragozSandboxInitListenerParams>(),
    fileTreeChange:
      createEventHook<KaragozSandboxFileTreeChangeListenerParams>(),
    port: createEventHook<KaragozSandboxPortListenerParams>(),
    serverReady: createEventHook<KaragozSandServerReadyListenerParams>(),
  }

  const off = ((event, listener: KaragozSandEventListener) =>
    bus[event].off(listener)) as KaragozSandEventReg

  const on = ((event, listener: KaragozSandEventListener) =>
    bus[event].on(listener)) as KaragozSandEventReg

  const once = ((event, listener: KaragozSandEventListener) => {
    const onceListener = (params: KaragozSandEventListenerParams) => {
      listener(params)
      bus[event].off(onceListener)
    }
    bus[event].on(onceListener)
  }) as KaragozSandEventReg

  const bootstrap = (container: WebContainer) => {
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

  return {
    bootstrap,
    bus,
    off,
    on,
    once,
  }
}
