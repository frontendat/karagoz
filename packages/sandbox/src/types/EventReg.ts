import type {
  ErrorListenerParams,
  InitListenerParams,
  PortListenerParams,
  ServerReadyListenerParams,
} from './Events.ts'

declare function eventReg(
  event: 'error',
  listener: (params: ErrorListenerParams) => void,
): void
declare function eventReg(
  event: 'init',
  listener: (params: InitListenerParams) => void,
): void
declare function eventReg(
  event: 'port',
  listener: (params: PortListenerParams) => void,
): void
declare function eventReg(
  event: 'serverReady',
  listener: (params: ServerReadyListenerParams) => void,
): void

export type EventReg = typeof eventReg
