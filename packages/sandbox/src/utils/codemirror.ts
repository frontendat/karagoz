import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from 'codemirror'

/**
 * Default dark and light codemirror themes
 */
export const codemirrorDefaultTheme = {
  dark: [
    EditorView.theme(
      {
        '&': {
          backgroundColor: 'hsl(var(--background))', // Your custom background color
        },
        '.cm-gutters': {
          backgroundColor: 'hsl(var(--muted))',
        },
      },
      { dark: true },
    ),
    oneDark,
  ],
  light: [],
}
