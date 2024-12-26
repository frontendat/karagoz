import type { MessageSchema } from '../types/vue-i18n'

export const de: MessageSchema = {
  krgz: {
    dir: 'ltr',
    sandbox: {
      general: {
        close: 'Schließen',
        restart: 'Neustart',
        stop: 'Stoppen',
      },
      loading: {
        booting: 'Web Container wird gestartet...',
        editor: 'Eine Datei öffnen und bearbeiten',
        files: 'Dateien werden geladen...',
        preview: 'Vorschau wird geladen...',
        processes: 'Es gibt keine verfügbaren Prozesse',
        terminals: 'Es gibt keine verfügbaren Kommandozeilen',
      },
      panel: {
        editor: {
          readonly: 'Schreibgeschützte Datei',
        },
        preview: {
          reload: 'Neuladen',
        },
        terminals: {
          new: 'Neue Kommandozeile',
          open: 'Kommandozeile öffnen',
        },
      },
      toggle: {
        code: 'Kode',
        result: 'Ergebnis',
        processes: 'Prozesse',
        solve: 'Lösen',
        theme: 'Design umschalten',
        terminal: 'Kommandozeile',
      },
    },
  },
}
