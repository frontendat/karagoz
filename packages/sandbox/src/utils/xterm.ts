import { ITheme } from '@xterm/xterm'

/**
 * Default dark and light xterm themes
 */
const xtermDarkTheme: ITheme = {
  background: '#0a0a0a',
  foreground: '#cdd6f4',
  cursor: '#f5e0dc',
  selectionBackground: '#585b70',
  black: '#1e1e2e',
  red: '#f38ba8',
  green: '#a6e3a1',
  yellow: '#f9e2af',
  blue: '#89b4fa',
  magenta: '#cba6f7',
  cyan: '#94e2d5',
  white: '#bac2de',
  brightBlack: '#45475a',
  brightRed: '#f38ba8',
  brightGreen: '#a6e3a1',
  brightYellow: '#f9e2af',
  brightBlue: '#89b4fa',
  brightMagenta: '#cba6f7',
  brightCyan: '#94e2d5',
  brightWhite: '#a6adc8',
}

const xtermLightTheme: ITheme = {
  background: '#ffffff',
  foreground: '#24292e',
  cursor: '#6a737d',
  selectionBackground: '#dbe2e6',
  black: '#24292e',
  red: '#d73a49',
  green: '#22863a',
  yellow: '#b08800',
  blue: '#005cc5',
  magenta: '#6f42c1',
  cyan: '#1b7c83',
  white: '#f6f8fa',
  brightBlack: '#959da5',
  brightRed: '#cb2431',
  brightGreen: '#28a745',
  brightYellow: '#dbab09',
  brightBlue: '#0366d6',
  brightMagenta: '#6f42c1',
  brightCyan: '#1b7c83',
  brightWhite: '#fafbfc',
}

export const xtermDefaultTheme = {
  dark: xtermDarkTheme,
  light: xtermLightTheme,
}
