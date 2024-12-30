import { EditorTabContext, SandboxOptions } from '../types'
import { useSandboxTabs } from './useSandboxTabs.ts'

/**
 * Editor tabs manager. Responsible for opening, focusing and closing editor tabs.
 */
export const useSandboxEditorTabs = (options: SandboxOptions) => {
  const editorTabs = useSandboxTabs<EditorTabContext>()

  /**
   * Open an editor tab for a file. If the file is already open it is re-focused.
   * @param id file path, used as an ID as well
   * @param label
   * @param context
   */
  const open = (id: string, label?: string, context?: EditorTabContext) => {
    const index = editorTabs.findTabIndex(id)
    if (index === -1) {
      editorTabs.open(id, label, {
        suppressClose: options.editor.suppressClose,
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
