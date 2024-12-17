import './style.css'

import KrgzEditor from './components/KrgzEditor.vue'
import KrgzEditorTabs from './components/KrgzEditorTabs.vue'
import KrgzExplorer from './components/KrgzExplorer.vue'
import KrgzExplorerEntity from './components/KrgzExplorerEntity.vue'
import KrgzPreview from './components/KrgzPreview.vue'
import KrgzProcess from './components/KrgzProcess.vue'
import KrgzProcessTabs from './components/KrgzProcessTabs.vue'
import KrgzSandbox from './components/KrgzSandbox.vue'
import { useKaragozSandbox } from './composables/useKaragozSandbox.ts'
import {
  injectWebContainer,
  provideWebContainer,
} from './utils/WebContainer.ts'

export * from './types/index'

export {
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
  useKaragozSandbox,
}
