import type { WebContainer } from '@webcontainer/api'

export type EventType =
  | 'error'
  | 'fileTreeChange'
  | 'init'
  | 'port'
  | 'serverReady'

export type ErrorListenerParams = {
  container?: WebContainer
  error: { message: string; context?: unknown }
}

export type InitListenerParams = {
  container: WebContainer
}

export type FileTreeChangeListenerParams = {
  container: WebContainer
}

export type PortListenerParams = {
  container: WebContainer
  port: number
  type: 'open' | 'close'
  url: string
}

export type ServerReadyListenerParams = {
  container: WebContainer
  port: number
  url: string
}

export type EventListenerParams =
  | ErrorListenerParams
  | FileTreeChangeListenerParams
  | InitListenerParams
  | PortListenerParams
  | ServerReadyListenerParams

export type EventListener = (params: EventListenerParams) => void
