import type { WebContainer } from '@webcontainer/api'

export type KaragozSandboxEvents =
  | 'error'
  | 'fileTreeChange'
  | 'init'
  | 'port'
  | 'serverReady'

export type KaragozSandboxErrorListenerParams = {
  container?: WebContainer
  error: { message: string }
}

export type KaragozSandboxInitListenerParams = {
  container: WebContainer
}

export type KaragozSandboxFileTreeChangeListenerParams = {
  container: WebContainer
}

export type KaragozSandboxPortListenerParams = {
  container: WebContainer
  port: number
  type: 'open' | 'close'
  url: string
}

export type KaragozSandServerReadyListenerParams = {
  container: WebContainer
  port: number
  url: string
}

export type KaragozSandEventListenerParams =
  | KaragozSandboxErrorListenerParams
  | KaragozSandboxFileTreeChangeListenerParams
  | KaragozSandboxInitListenerParams
  | KaragozSandboxPortListenerParams
  | KaragozSandServerReadyListenerParams

export type KaragozSandEventListener = (
  params: KaragozSandEventListenerParams,
) => void
