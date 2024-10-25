import {
  KaragozSandErrorListenerParams,
  KaragozSandFileListenerParams,
  KaragozSandFileTreeChangeListenerParams,
  KaragozSandInitListenerParams,
  KaragozSandPortListenerParams,
  KaragozSandServerReadyListenerParams,
} from './Events.ts'

declare function eventReg(
  event: 'error',
  listener: (params: KaragozSandErrorListenerParams) => void,
): void
declare function eventReg(
  event: 'file',
  listener: (params: KaragozSandFileListenerParams) => void,
): void
declare function eventReg(
  event: 'fileTreeChange',
  listener: (params: KaragozSandFileTreeChangeListenerParams) => void,
): void
declare function eventReg(
  event: 'init',
  listener: (params: KaragozSandInitListenerParams) => void,
): void
declare function eventReg(
  event: 'port',
  listener: (params: KaragozSandPortListenerParams) => void,
): void
declare function eventReg(
  event: 'serverReady',
  listener: (params: KaragozSandServerReadyListenerParams) => void,
): void

export type KaragozSandEventReg = typeof eventReg
