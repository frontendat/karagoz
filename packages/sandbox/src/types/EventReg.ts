import type { Events } from './Events.ts'

declare function eventReg(
  event: 'error',
  listener: (params: Events.ErrorListenerParams) => void,
): void
declare function eventReg(
  event: 'fileTreeChange',
  listener: (params: Events.FileTreeChangeListenerParams) => void,
): void
declare function eventReg(
  event: 'init',
  listener: (params: Events.InitListenerParams) => void,
): void
declare function eventReg(
  event: 'port',
  listener: (params: Events.PortListenerParams) => void,
): void
declare function eventReg(
  event: 'serverReady',
  listener: (params: Events.ServerReadyListenerParams) => void,
): void

export type EventReg = typeof eventReg
