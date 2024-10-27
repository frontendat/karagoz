<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
} from '@karagoz/shared'

import KrgzEditorTabs from './KrgzEditorTabs.vue'
import KrgzExplorer from './KrgzExplorer.vue'
import KrgzPreview from './KrgzPreview.vue'
</script>

<template>
  <ResizablePanelGroup
    auto-save-id="krgz-sandbox"
    direction="vertical"
    class="max-w"
  >
    <ResizablePanel :default-size="50">
      <ResizablePanelGroup
        auto-save-id="krgz-sandbox-editor"
        direction="horizontal"
      >
        <ResizablePanel :default-size="25">
          <slot name="explorer">
            <ScrollArea class="h-full overflow-auto">
              <KrgzExplorer />
            </ScrollArea>
          </slot>
        </ResizablePanel>
        <ResizableHandle with-handle />
        <ResizablePanel :default-size="75">
          <slot name="editor">
            <KrgzEditorTabs />
          </slot>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel :default-size="50">
      <slot name="preview">
        <KrgzPreview />
      </slot>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
