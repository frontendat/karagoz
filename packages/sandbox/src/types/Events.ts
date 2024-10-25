import type { WebContainer } from '@webcontainer/api'

export type KaragozSandboxEvents =
  | 'error'
  | 'file'
  | 'fileTreeChange'
  | 'init'
  | 'port'
  | 'serverReady'

export type KaragozSandErrorListenerParams = {
  container?: WebContainer
  error: { message: string }
}

export type KaragozSandFileListenerParams = {
  container?: WebContainer
  operation: 'open' | 'close'
  path: string
}

export type KaragozSandInitListenerParams = {
  container: WebContainer
}

export type KaragozSandFileTreeChangeListenerParams = {
  container: WebContainer
}

export type KaragozSandPortListenerParams = {
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
  | KaragozSandErrorListenerParams
  | KaragozSandFileListenerParams
  | KaragozSandFileTreeChangeListenerParams
  | KaragozSandInitListenerParams
  | KaragozSandPortListenerParams
  | KaragozSandServerReadyListenerParams

export type KaragozSandEventListener = (
  params: KaragozSandEventListenerParams,
) => void
