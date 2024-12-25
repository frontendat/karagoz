import { Extension } from '@codemirror/state'
import { ITheme } from '@xterm/xterm'

export const sandboxKnownProcesses = {
  install: 'npm install',
  devServer: 'npm start',
  terminal: 'jsh',
} as const

export type SandboxOptions = {
  editor: {
    suppressClose?: boolean
    theme?: {
      // Using callbacks to avoid "Type instantiation is excessively deep and possibly infinite."
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
    starters?: {
      install?: () => Promise<void>
      devServer?: () => Promise<void>
      terminal?: () => Promise<void>
    }
  }
  terminal: {
    maxCount?: number
    theme?: {
      dark?: () => ITheme
      light?: () => ITheme
    }
  }
}
