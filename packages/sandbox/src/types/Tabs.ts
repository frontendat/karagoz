import { WebContainerProcess } from '@webcontainer/api'

/**
 * Generic tab definition.
 */
export type Tab<T = undefined> = {
  /**
   * Unique tab ID
   */
  id: string
  /**
   * Additional context information.
   */
  context?: T
  /**
   * Label to be shown in the tab list.
   */
  label: string
  /**
   * Order of the tab. When a tab is opened or focused it gets a new order = `[current max order] + 1`.
   */
  order: number
}

/**
 * Context information for an editor tab.
 */
export type EditorTabContext = {
  /**
   * When true, the close icon next to the tab label will be omitted.
   */
  suppressClose?: boolean
}

/**
 * Context information for a process / terminal tab.
 */
export type ProcessTabContext = {
  /**
   * Arguments to be passed to `WebContainer.spawn()`.
   */
  args?: string[]
  /**
   * When true, a restart icon will appear next to the label and the process can be restarted.
   * Ignored when `isTerminal: true`.
   */
  canRestart?: boolean
  /**
   * When true, a restart icon will appear next to the label and the process can be stopped.
   * Ignored when `isTerminal: true`.
   */
  canStop?: boolean
  /**
   * Command to be passed to `WebContainer.spawn()`.
   */
  command: string
  /**
   * Exit code of the finished / terminated process.
   */
  exitCode?: number
  /**
   * When true, the process will run in the background and will not be shown in the tab list.
   */
  isHidden?: boolean
  /**
   * When true, the process is treated as a terminal: some flags are ignored and the tab will be shown in the
   * terminals panel and not in the processes panel.
   */
  isTerminal?: boolean
  /**
   * Used to persist the logs and re-fill xterm when the tab is closed and re-opened.
   */
  logs?: string[]
  /**
   * The process instance.
   */
  process?: WebContainerProcess
  /**
   * Input handler, needed to accept input in xterm and pass it to the process in the web container.
   * @param chunk
   */
  processInputHandler?: (chunk?: string | undefined) => Promise<void>
  /**
   * Output handler, needed to read and store the logs to be displayed by xterm.
   * @param data
   */
  processOutputHandler?: (data: string) => void
  /**
   * When true, the close icon next to the tab label will be omitted.
   */
  suppressClose?: boolean
  /**
   * When true, xterm will not accept user input.
   */
  suppressInput?: boolean
}
