import type { WebContainer } from '@webcontainer/api'

export namespace Events {
  export type EventType =
    | 'error'
    | 'fileTreeChange'
    | 'init'
    | 'port'
    | 'serverReady'

  export type ErrorListenerParams = {
    container?: WebContainer
    error: { message: string }
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
}
