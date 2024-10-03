import type { WebContainer } from '@webcontainer/api'

export type WCEvents =
  | 'error'
  | 'fileTreeChange'
  | 'init'
  | 'port'
  | 'serverReady'

export type WCErrorListenerParams = {
  container?: WebContainer
  error: { message: string }
}

export type WCInitListenerParams = {
  container: WebContainer
}

export type WCFileTreeChangeListenerParams = {
  container: WebContainer
}

export type WCPortListenerParams = {
  container: WebContainer
  port: number
  type: 'open' | 'close'
  url: string
}

export type WCServerReadyListenerParams = {
  container: WebContainer
  port: number
  url: string
}

export type WCEventListenerParams =
  | WCErrorListenerParams
  | WCInitListenerParams
  | WCFileTreeChangeListenerParams
  | WCPortListenerParams
  | WCServerReadyListenerParams

export type WCEventListener = (params: WCEventListenerParams) => void
