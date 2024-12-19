import { WebContainerProcess } from '@webcontainer/api'

export type Tab<T = undefined> = {
  id: string
  context?: T
  label: string
  order: number
}

export type EditorTabContext = {
  suppressClose?: boolean
}

export type ProcessTabContext = {
  args?: string[]
  canRestart?: boolean
  canStop?: boolean
  command: string
  exitCode?: number
  isHidden?: boolean
  isTerminal?: boolean
  logs?: string[]
  process?: WebContainerProcess
  processInputHandler?: (chunk?: string | undefined) => Promise<void>
  processOutputHandler?: (data: string) => void
  suppressClose?: boolean
  suppressInput?: boolean
}
