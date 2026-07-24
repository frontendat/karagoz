<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
} from '@karagoz/shared'

import { useSandbox } from '../composables'
import KrgzEditorTabs from './KrgzEditorTabs.vue'
import KrgzExplorer from './KrgzExplorer.vue'

/**
 * File explorer + editor tabs, side by side. Shared by the desktop (`KrgzSandboxPanelToggles`,
 * nested inside the Code/Result split) and mobile (`KrgzSandboxMobileToolbar`, shown on its own)
 * layouts in `KrgzSandbox`.
 */
defineOptions({})

defineProps<{
  /**
   * Hide file explorer (e.g. to only show a specific set of editor tabs).
   */
  hideExplorer?: boolean
}>()

const { explorer } = useSandbox()
</script>

<template>
  <ResizablePanelGroup
    auto-save-id="krgz-sandbox-editor"
    class="h-full"
    direction="horizontal"
  >
    <ResizablePanel
      v-show="!hideExplorer && explorer.shown.value"
      :default-size="30"
    >
      <!-- @slot slot to render file explorer -->
      <slot name="explorer">
        <ScrollArea class="h-full overflow-auto">
          <KrgzExplorer />
        </ScrollArea>
      </slot>
    </ResizablePanel>
    <ResizableHandle v-show="!hideExplorer && explorer.shown.value" />
    <ResizablePanel :default-size="70">
      <!-- @slot slot to render file editor tabs and code editor -->
      <slot name="editor">
        <KrgzEditorTabs :hide-explorer-toggle="hideExplorer" />
      </slot>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
