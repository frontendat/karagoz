import {
  WCErrorListenerParams,
  WCFileTreeChangeListenerParams,
  WCInitListenerParams,
  WCPortListenerParams,
  WCServerReadyListenerParams,
} from './Events.ts'

declare function eventReg(
  event: 'error',
  listener: (params: WCErrorListenerParams) => void,
): void
declare function eventReg(
  event: 'fileTreeChange',
  listener: (params: WCFileTreeChangeListenerParams) => void,
): void
declare function eventReg(
  event: 'init',
  listener: (params: WCInitListenerParams) => void,
): void
declare function eventReg(
  event: 'port',
  listener: (params: WCPortListenerParams) => void,
): void
declare function eventReg(
  event: 'serverReady',
  listener: (params: WCServerReadyListenerParams) => void,
): void

export type WCEventReg = typeof eventReg
