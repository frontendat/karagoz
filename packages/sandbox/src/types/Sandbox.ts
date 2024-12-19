export const sandboxKnownProcesses = {
  install: 'npm install',
  devServer: 'npm start',
  terminal: 'jsh',
} as const

export type SandboxOptions = {
  processStarters: {
    install?: () => Promise<void>
    devServer?: () => Promise<void>
    terminal?: () => Promise<void>
  }
}
