import { EditorTabContext } from '../types'
import { SandboxOptions } from '../types/Sandbox.ts'
import { useSandboxTabs } from './useSandboxTabs.ts'

export const useSandboxEditorTabs = (options: SandboxOptions) => {
  const editorTabs = useSandboxTabs<EditorTabContext>()

  const open = (id: string, label?: string, context?: EditorTabContext) => {
    const index = editorTabs.findTabIndex(id)
    if (index === -1) {
      editorTabs.open(id, label, {
        suppressClose: options.editorTabs.suppressClose,
        ...context,
      })
    } else {
      editorTabs.open(id)
    }
  }

  return {
    ...editorTabs,
    open,
  }
}
