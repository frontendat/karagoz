import { createEventHook, type EventHook } from '@vueuse/core'

import type {
  KaragozSandErrorListenerParams,
  KaragozSandEventListener,
  KaragozSandEventListenerParams,
  KaragozSandEventReg,
  KaragozSandFileListenerParams,
  KaragozSandFileTreeChangeListenerParams,
  KaragozSandInitListenerParams,
  KaragozSandPortListenerParams,
  KaragozSandServerReadyListenerParams,
} from '../types'

export const useKaragozSandboxEvents = () => {
  const bus: {
    init: EventHook<KaragozSandInitListenerParams>
    file: EventHook<KaragozSandFileListenerParams>
    port: EventHook<KaragozSandPortListenerParams>
    fileTreeChange: EventHook<KaragozSandFileTreeChangeListenerParams>
    serverReady: EventHook<KaragozSandServerReadyListenerParams>
    error: EventHook<KaragozSandErrorListenerParams>
  } = {
    error: createEventHook<KaragozSandErrorListenerParams>(),
    file: createEventHook<KaragozSandFileListenerParams>(),
    init: createEventHook<KaragozSandInitListenerParams>(),
    fileTreeChange: createEventHook<KaragozSandFileTreeChangeListenerParams>(),
    port: createEventHook<KaragozSandPortListenerParams>(),
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

  return {
    bus,
    off,
    on,
    once,
  }
}
