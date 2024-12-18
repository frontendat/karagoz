<script setup lang="ts">
import {
  LoadingIndicator,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  useControlledModel,
} from '@karagoz/shared'
import { Binary, Eye, FileCode, Play, TerminalSquare } from 'lucide-vue-next'
import { computed } from 'vue'

import KrgzEditorTabs from './KrgzEditorTabs.vue'
import KrgzExplorer from './KrgzExplorer.vue'
import KrgzPanelToggle from './KrgzPanelToggle.vue'
import KrgzPreview from './KrgzPreview.vue'
import KrgzProcessTabs from './KrgzProcessTabs.vue'

const panels = ['code', 'processes', 'result', 'terminal'] as const

type Panel = (typeof panels)[number]

defineProps<{
  booting?: boolean
}>()

const availablePanels = defineModel<Panel[]>('availablePanels', {
  default: ['code', 'processes', 'result', 'terminal'],
})
const shownPanelsModel = defineModel<Panel[] | undefined>('shownPanels')

const [shownPanels, setShownPanels] = useControlledModel<Panel[]>(
  shownPanelsModel,
  ['code', 'processes', 'result'],
)

const togglePanel = (panel: Panel) => {
  setShownPanels(
    shownPanels.value.includes(panel)
      ? shownPanels.value.filter((p) => p !== panel)
      : [...shownPanels.value, panel],
  )
}

const isAvailable = computed(
  () =>
    Object.fromEntries(
      panels.map((panel) => [panel, availablePanels.value.includes(panel)]),
    ) as Record<Panel, boolean>,
)

const isShown = computed(
  () =>
    Object.fromEntries(
      panels.map((panel) => [panel, shownPanels.value.includes(panel)]),
    ) as Record<Panel, boolean>,
)

const isRowDividerShown = computed(() => {
  const f = isShown.value
  return (f.code || f.terminal) && (f.processes || f.result)
})
</script>

<template>
  <LoadingIndicator
    v-if="booting"
    label="Booting Web Container..."
    variant="secondary"
  >
    <Binary class="size-12" />
  </LoadingIndicator>
  <section v-else class="grid h-screen w-full sandbox-grid">
    <aside
      v-if="isAvailable.code || isAvailable.result"
      class="flex h-full flex-col border-r"
    >
      <nav v-if="isAvailable.code" class="grid gap-1 p-2">
        <KrgzPanelToggle
          v-if="availablePanels.includes('code')"
          label="Code"
          :pressed="shownPanels.includes('code')"
          @press="togglePanel('code')"
        >
          <FileCode class="size-5" />
        </KrgzPanelToggle>
      </nav>
      <nav v-if="isAvailable.result" class="mt-auto grid gap-1 p-2">
        <KrgzPanelToggle
          v-if="availablePanels.includes('result')"
          label="Preview"
          :pressed="shownPanels.includes('result')"
          @press="togglePanel('result')"
        >
          <Eye class="size-5" />
        </KrgzPanelToggle>
      </nav>
    </aside>
    <div class="flex flex-col">
      <ResizablePanelGroup
        auto-save-id="krgz-sandbox"
        direction="vertical"
        class="max-w"
      >
        <ResizablePanel
          v-if="isShown.code || isShown.terminal"
          :default-size="50"
        >
          <ResizablePanelGroup
            auto-save-id="krgz-sandbox-input-row"
            direction="horizontal"
          >
            <template v-if="isShown.code">
              <ResizablePanel :default-size="50">
                <ResizablePanelGroup
                  auto-save-id="krgz-sandbox-editor"
                  direction="horizontal"
                >
                  <ResizablePanel :default-size="30">
                    <slot name="explorer">
                      <ScrollArea class="h-full overflow-auto">
                        <KrgzExplorer />
                      </ScrollArea>
                    </slot>
                  </ResizablePanel>
                  <ResizableHandle with-handle />
                  <ResizablePanel :default-size="70">
                    <slot name="editor">
                      <KrgzEditorTabs />
                    </slot>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </template>
            <ResizableHandle
              v-if="isShown.code && isShown.terminal"
              with-handle
            />
            <ResizablePanel v-if="isShown.terminal" :default-size="50">
              <slot name="terminal">
                <KrgzProcessTabs mode="terminal" />
              </slot>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle v-if="isRowDividerShown" with-handle />
        <ResizablePanel
          v-if="isShown.processes || isShown.result"
          :default-size="50"
        >
          <ResizablePanelGroup
            auto-save-id="krgz-sandbox-ouptut-row"
            direction="horizontal"
          >
            <ResizablePanel v-if="isShown.result" :default-size="50">
              <slot name="preview">
                <KrgzPreview />
              </slot>
            </ResizablePanel>
            <ResizableHandle
              v-if="isShown.processes && isShown.result"
              with-handle
            />
            <ResizablePanel v-if="isShown.processes" :default-size="50">
              <slot name="processes">
                <KrgzProcessTabs mode="process" />
              </slot>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
    <aside
      v-if="isAvailable.processes || isAvailable.terminal"
      class="flex h-full flex-col border-l"
    >
      <nav v-if="isAvailable.terminal" class="grid gap-1 p-2">
        <KrgzPanelToggle
          v-if="availablePanels.includes('terminal')"
          label="Terminal"
          :pressed="shownPanels.includes('terminal')"
          @press="togglePanel('terminal')"
        >
          <TerminalSquare class="size-5" />
        </KrgzPanelToggle>
      </nav>
      <nav v-if="isAvailable.processes" class="mt-auto grid gap-1 p-2">
        <KrgzPanelToggle
          v-if="availablePanels.includes('processes')"
          label="Processes"
          :pressed="shownPanels.includes('processes')"
          @press="togglePanel('processes')"
        >
          <Play class="size-5" />
        </KrgzPanelToggle>
      </nav>
    </aside>
  </section>
</template>

<style scoped>
.sandbox-grid:has(> aside:first-child) {
  grid-template-columns: 60px minmax(calc(100% - 60px), 1fr);
}
.sandbox-grid:has(> aside:last-child) {
  grid-template-columns: minmax(calc(100% - 60px), 1fr) 60px;
}

.sandbox-grid:has(> aside:first-child):has(> aside:last-child) {
  grid-template-columns: 60px minmax(calc(100% - 120px), 1fr) 60px;
}
</style>
