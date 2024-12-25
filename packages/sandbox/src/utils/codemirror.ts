import { EditorView } from 'codemirror'
import { oneDark } from '@codemirror/theme-one-dark'

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
