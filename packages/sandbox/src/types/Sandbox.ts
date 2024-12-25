import { Extension } from '@codemirror/state'
import { ITheme } from '@xterm/xterm'

export type SandboxOptions = {
  editor: {
    suppressClose?: boolean
    theme?: {
      // Using callbacks to overcome the readonly nature of the options returned by useSandbox().
      // Also to avoid "Type instantiation is excessively deep and possibly infinite."
      // The callbacks return an array to allow passing multiple themes (e.g. base theme and a theme for overrides).
      dark?: () => Extension[]
      light?: () => Extension[]
    }
  }
  explorer: {
    hidden?: string[]
    readonly?: string[]
    reinstall?: string[]
  }
  process: {
    commands: {
      install: string
      devServer: string
      terminal: string
    }
    packageManager: 'npm' | 'pnpm' | 'yarn'
    starters?: {
      install?: () => Promise<void>
      devServer?: () => Promise<void>
      terminal?: () => Promise<void>
    }
  }
  terminal: {
    maxCount?: number
    theme?: {
      // Using callbacks to overcome the readonly nature of the options returned by useSandbox().
      dark?: () => ITheme
      light?: () => ITheme
    }
  }
}
