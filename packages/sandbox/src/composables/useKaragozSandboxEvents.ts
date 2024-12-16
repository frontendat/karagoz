import { createEventHook, type EventHook } from '@vueuse/core'
import { WebContainer } from '@webcontainer/api'

import type { EventReg, Events } from '../types'

export const useKaragozSandboxEvents = () => {
  const bus: {
    init: EventHook<Events.InitListenerParams>
    port: EventHook<Events.PortListenerParams>
    fileTreeChange: EventHook<Events.FileTreeChangeListenerParams>
    serverReady: EventHook<Events.ServerReadyListenerParams>
    error: EventHook<Events.ErrorListenerParams>
  } = {
    error: createEventHook<Events.ErrorListenerParams>(),
    init: createEventHook<Events.InitListenerParams>(),
    fileTreeChange: createEventHook<Events.FileTreeChangeListenerParams>(),
    port: createEventHook<Events.PortListenerParams>(),
    serverReady: createEventHook<Events.ServerReadyListenerParams>(),
  }

  const off = ((event, listener: Events.EventListener) =>
    bus[event].off(listener)) as EventReg

  const on = ((event, listener: Events.EventListener) =>
    bus[event].on(listener)) as EventReg

  const once = ((event, listener: Events.EventListener) => {
    const onceListener = (params: Events.EventListenerParams) => {
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
