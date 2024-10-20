import { createEventHook, type EventHook } from '@vueuse/core'

import type {
  WCErrorListenerParams,
  WCEventListener,
  WCEventListenerParams,
  WCEventReg,
  WCFileListenerParams,
  WCFileTreeChangeListenerParams,
  WCInitListenerParams,
  WCPortListenerParams,
  WCServerReadyListenerParams,
} from '../types'

export const useWebContainerEvents = () => {
  const bus: {
    init: EventHook<WCInitListenerParams>
    file: EventHook<WCFileListenerParams>
    port: EventHook<WCPortListenerParams>
    fileTreeChange: EventHook<WCFileTreeChangeListenerParams>
    serverReady: EventHook<WCServerReadyListenerParams>
    error: EventHook<WCErrorListenerParams>
  } = {
    error: createEventHook<WCErrorListenerParams>(),
    file: createEventHook<WCFileListenerParams>(),
    init: createEventHook<WCInitListenerParams>(),
    fileTreeChange: createEventHook<WCFileTreeChangeListenerParams>(),
    port: createEventHook<WCPortListenerParams>(),
    serverReady: createEventHook<WCServerReadyListenerParams>(),
  }

  const off = ((event, listener: WCEventListener) =>
    bus[event].off(listener)) as WCEventReg

  const on = ((event, listener: WCEventListener) =>
    bus[event].on(listener)) as WCEventReg

  const once = ((event, listener: WCEventListener) => {
    const onceListener = (params: WCEventListenerParams) => {
      listener(params)
      bus[event].off(onceListener)
    }
    bus[event].on(onceListener)
  }) as WCEventReg

  return {
    bus,
    off,
    on,
    once,
  }
}
