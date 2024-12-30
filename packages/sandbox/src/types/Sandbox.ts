import { Extension } from '@codemirror/state'
import { ITheme } from '@xterm/xterm'

export type SandboxOptions = {
  /**
   * Editor related options.
   */
  editor: {
    /**
     * Default value to be used when creating editor tabs.
     */
    suppressClose?: boolean
    /**
     * Themes to be used by codemirror.
     *
     * Using callbacks to overcome the readonly nature of the options returned by `useSandbox()`.
     *
     * It is also to avoid the "Type instantiation is excessively deep and possibly infinite." error.
     *
     * The callbacks return an array to allow passing multiple themes (e.g. base theme and a theme for overrides).
     */
    theme?: {
      /**
       * Callback that returns a list of dark codemirror themes.
       */
      dark?: () => Extension[]
      /**
       * Callback that returns a list of light codemirror themes.
       */
      light?: () => Extension[]
    }
  }
  /**
   * Path patterns to be used for matching.
   * The matchers use .gitignore-style matching through [ignore](https://www.npmjs.com/package/ignore) to determine
   * whether a give path matches one of the patterns.
   */
  explorer: {
    /**
     * List of patterns to determine whether an entity (directory or file) should be hidden in the file explorer.
     */
    hidden?: string[]
    /**
     * List of patterns to determine whether an entity (directory or file) should be marked as readonly in the file
     * explorer and editor tabs.
     */
    readonly?: string[]
    /**
     * List of patterns to determine whether changing an entity (directory or file) should trigger the re-installation
     * of dependencies and re-bootstrapping.
     */
    reinstall?: string[]
  }
  /**
   * Preview related options.
   */
  preview: {
    /**
     * When true, the address bar in the preview panel will not be shown.
     */
    suppressAddressBar?: boolean
  }
  /**
   * Preview / terminal related options.
   */
  process: {
    /**
     * Predefined commands.
     */
    commands: {
      /**
       * Dependency installation command.
       * @default npm install
       */
      install: string
      /**
       * Command to start dev server.
       * @default npm start
       */
      devServer: string
      /**
       * Command to start a terminal.
       * @default jsh
       */
      terminal: string
    }
    /**
     * Package manager. Setting this option adjusts the predefined commands accordingly.
     */
    packageManager: 'npm' | 'pnpm' | 'yarn'
    /**
     * Callbacks to spawn the processes of the predefined commands.
     * Implemented as a sensible default and do some opinionated stuff.
     *
     * If more control is needed, a process can be started using `useSandbox().processTabs.open()`.
     */
    starters?: {
      /**
       * Dependency installation process starter.
       */
      install?: () => Promise<void>
      /**
       * Dev server process starter.
       */
      devServer?: () => Promise<void>
      /**
       * Terminal process starter.
       */
      terminal?: () => Promise<void>
    }
  }
  /**
   * Terminal related options.
   */
  terminal: {
    /**
     * Maximum number of terminal tabs to be opened simultaneously.
     * @default 3
     */
    maxCount?: number
    /**
     * Theme to be used by xterm to output process and terminal logs.
     *
     * Using callbacks to overcome the readonly nature of the options returned by useSandbox().
     */
    theme?: {
      /**
       * Callback to return dark xterm theme.
       */
      dark?: () => ITheme
      /**
       * Callback to return light xterm theme.
       */
      light?: () => ITheme
    }
  }
}
