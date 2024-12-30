import './style.css'

import KrgzEditorTabs from './components/KrgzEditorTabs.vue'
import KrgzExplorer from './components/KrgzExplorerSubdir.vue'
import KrgzPreview from './components/KrgzPreview.vue'
import KrgzProcessTabs from './components/KrgzProcessTabs.vue'
import KrgzSandbox from './components/KrgzSandbox.vue'
import { useSandbox } from './composables'
import { ar, de, en } from './locales'

export * from './typedoc-entry.ts'

const i18nMessages = { ar, de, en }

export {
  i18nMessages,
  KrgzEditorTabs,
  KrgzExplorer,
  KrgzPreview,
  KrgzProcessTabs,
  KrgzSandbox,
  useSandbox,
}
