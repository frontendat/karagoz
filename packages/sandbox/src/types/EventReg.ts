import {
  KaragozSandboxErrorListenerParams,
  KaragozSandboxFileTreeChangeListenerParams,
  KaragozSandboxInitListenerParams,
  KaragozSandboxPortListenerParams,
  KaragozSandServerReadyListenerParams,
} from './Events.ts'

declare function eventReg(
  event: 'error',
  listener: (params: KaragozSandboxErrorListenerParams) => void,
): void
declare function eventReg(
  event: 'fileTreeChange',
  listener: (params: KaragozSandboxFileTreeChangeListenerParams) => void,
): void
declare function eventReg(
  event: 'init',
  listener: (params: KaragozSandboxInitListenerParams) => void,
): void
declare function eventReg(
  event: 'port',
  listener: (params: KaragozSandboxPortListenerParams) => void,
): void
declare function eventReg(
  event: 'serverReady',
  listener: (params: KaragozSandServerReadyListenerParams) => void,
): void

export type KaragozSandEventReg = typeof eventReg
