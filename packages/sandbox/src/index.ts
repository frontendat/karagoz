import './style.css'

import KrgzEditorTabs from './components/KrgzEditorTabs.vue'
import KrgzExplorer from './components/KrgzExplorerSubdir.vue'
import KrgzPreview from './components/KrgzPreview.vue'
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
  KrgzEditorTabs,
  KrgzExplorer,
  KrgzPreview,
  KrgzProcessTabs,
  KrgzSandbox,
  provideWebContainer,
  useSandbox,
  useSandboxBoot,
}
