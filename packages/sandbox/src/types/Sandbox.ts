export const sandboxKnownProcesses = {
  install: 'npm install',
  devServer: 'npm start',
  terminal: 'jsh',
} as const

export type SandboxOptions = {
  editorTabs: {
    suppressClose?: boolean
  }
  explorer: {
    hidden?: string[]
    readonly?: string[]
    reinstall?: string[]
  }
  processStarters: {
    install?: () => Promise<void>
    devServer?: () => Promise<void>
    terminal?: () => Promise<void>
  }
  terminal: {
    maxCount?: number
  }
}
