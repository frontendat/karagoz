import { createEventHook, type EventHook } from '@vueuse/core'
import { WebContainer } from '@webcontainer/api'

import type {
  ErrorListenerParams,
  EventListener,
  EventListenerParams,
  EventReg,
  FileTreeChangeListenerParams,
  InitListenerParams,
  PortListenerParams,
  ServerReadyListenerParams,
} from '../types'

export const useKaragozSandboxEvents = () => {
  const bus: {
    init: EventHook<InitListenerParams>
    port: EventHook<PortListenerParams>
    fileTreeChange: EventHook<FileTreeChangeListenerParams>
    serverReady: EventHook<ServerReadyListenerParams>
    error: EventHook<ErrorListenerParams>
  } = {
    error: createEventHook<ErrorListenerParams>(),
    init: createEventHook<InitListenerParams>(),
    fileTreeChange: createEventHook<FileTreeChangeListenerParams>(),
    port: createEventHook<PortListenerParams>(),
    serverReady: createEventHook<ServerReadyListenerParams>(),
  }

  const off = ((event, listener: EventListener) =>
    bus[event].off(listener)) as EventReg

  const on = ((event, listener: EventListener) =>
    bus[event].on(listener)) as EventReg

  const once = ((event, listener: EventListener) => {
    const onceListener = (params: EventListenerParams) => {
      listener(params)
      bus[event].off(onceListener)
    }
    bus[event].on(onceListener)
  }) as EventReg

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
