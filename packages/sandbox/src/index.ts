import './style.css'

import KrgzEditor from './components/KrgzEditor.vue'
import KrgzEditorTabs from './components/KrgzEditorTabs.vue'
import KrgzExplorerEntity from './components/KrgzExplorerEntity.vue'
import KrgzExplorer from './components/KrgzExplorerSubdir.vue'
import KrgzPreview from './components/KrgzPreview.vue'
import KrgzProcess from './components/KrgzProcess.vue'
import KrgzProcessTabs from './components/KrgzProcessTabs.vue'
import KrgzSandbox from './components/KrgzSandbox.vue'
import { useSandbox, useSandboxBoot } from './composables'
import { ar, de, en } from './locales'
import {
  injectWebContainer,
  provideWebContainer,
} from './utils/WebContainer.ts'

export * from './types/index'

const i18nMessages = { ar, de, en }

export {
  i18nMessages,
  injectWebContainer,
  KrgzEditor,
  KrgzEditorTabs,
  KrgzExplorer,
  KrgzExplorerEntity,
  KrgzPreview,
  KrgzProcess,
  KrgzProcessTabs,
  KrgzSandbox,
  provideWebContainer,
  useSandbox,
  useSandboxBoot,
}
