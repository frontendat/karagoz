import { WebContainerProcess } from '@webcontainer/api'

export type Tab<T = undefined> = {
  id: string
  context?: T
  label: string
  order: number
}

export type ProcessTabContext = {
  args?: string[]
  canClose?: boolean
  canRestart?: boolean
  canStop?: boolean
  command: string
  isHidden?: boolean
  isFinished?: boolean
  isTerminal?: boolean
  process?: WebContainerProcess
}
