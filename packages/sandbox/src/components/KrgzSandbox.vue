<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
} from '@karagoz/shared'

import { useKaragozSandbox } from '../composables/useKaragozSandbox.ts'
import KrgzEditor from './KrgzEditor.vue'
import KrgzExplorer from './KrgzExplorer.vue'

const sandbox = useKaragozSandbox()
const previewFrame = sandbox.previewFrame
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
            <KrgzEditor></KrgzEditor>
          </slot>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel :default-size="50">
      <div class="krgz-result">
        <iframe
          v-if="sandbox.previewUrl.value"
          ref="previewFrame"
          :src="sandbox.previewUrl.value"
          class="krgz-result-frame"
        ></iframe>
        <div v-else>Initialising...</div>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
