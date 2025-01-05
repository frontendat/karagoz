<script setup lang="ts">
import {
  LoadingIndicator,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  useControlledModel,
} from '@karagoz/shared'
import { Binary } from 'lucide-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { type Panel, panels } from '../types/Panel.ts'
import KrgzEditorTabs from './KrgzEditorTabs.vue'
import KrgzExplorer from './KrgzExplorer.vue'
import KrgzPreview from './KrgzPreview.vue'
import KrgzProcessTabs from './KrgzProcessTabs.vue'
import KrgzSandboxPanelToggles from './KrgzSandboxPanelToggles.vue'

/**
 * Main sandbox component.
 *
 * This component provides the default layout, renders shown panels, available panel toggles and additional buttons.
 *
 * It renders the provided panels in slots to allow exchanging them for more flexibility.
 *
 * The panels usually get all they need through `useSandbox()`, but this component takes a few props due to its
 * presentational nature.
 *
 * ## Models
 *
 * | Prop name       | Description        | Type  | Values                            | Default                           |
 * | --------------- | ------------------ | ----- | --------------------------------- | --------------------------------- |
 * | availablePanels | Toggles to render  | Array | code, processes, result, terminal | code, processes, result, terminal |
 * | shownPanels     | Shown panels       | Array | code, processes, result, terminal | code, result                      |
 */
defineOptions({})

defineProps<{
  /**
   * Show loading indicator. Important to pass it to not render panels before the web container is ready.
   */
  booting?: boolean
  /**
   * Hide file explorer (e.g. to only show a specific set of editor tabs).
   */
  hideExplorer?: boolean
  /**
   * Hide fullscreen toggle.
   */
  hideFullScreenToggle?: boolean
  /**
   * Hide the solve button if it is not needed.
   */
  hideSolveButton?: boolean
  /**
   * Hide the dark/light theme toggle.
   */
  hideThemeToggle?: boolean
}>()

defineEmits<{
  /**
   * Emitted when the solve button is clicked.
   */
  (e: 'solve'): void
}>()

const availablePanels = defineModel<Panel[]>('availablePanels', {
  default: ['code', 'processes', 'result', 'terminal'],
})
const shownPanelsModel = defineModel<Panel[] | undefined>('shownPanels')

const [shownPanels, setShownPanels] = useControlledModel<Panel[]>(
  shownPanelsModel,
  ['code', 'result'],
)

const { t } = useI18n()

const togglePanel = (panel: Panel) => {
  setShownPanels(
    shownPanels.value.includes(panel)
      ? shownPanels.value.filter((p) => p !== panel)
      : [...shownPanels.value, panel],
  )
}

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
    :label="t('krgz.sandbox.loading.booting')"
    variant="secondary"
  >
    <Binary class="size-12" />
  </LoadingIndicator>
  <KrgzSandboxPanelToggles
    v-else
    :available-panels="availablePanels"
    :hide-full-screen-toggle="hideFullScreenToggle"
    :hide-solve-button="hideSolveButton"
    :hide-theme-toggle="hideThemeToggle"
    :shown-panels="shownPanels"
    @solve="$emit('solve')"
    @toggle="togglePanel($event)"
  >
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
                <template v-if="!hideExplorer">
                  <ResizablePanel :default-size="30">
                    <!-- @slot slot to render file explorer -->
                    <slot name="explorer">
                      <ScrollArea class="h-full overflow-auto">
                        <KrgzExplorer />
                      </ScrollArea>
                    </slot>
                  </ResizablePanel>
                  <ResizableHandle />
                </template>
                <ResizablePanel :default-size="70">
                  <!-- @slot slot to render file editor tabs and code editor -->
                  <slot name="editor">
                    <KrgzEditorTabs />
                  </slot>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </template>
          <ResizableHandle v-if="isShown.code && isShown.terminal" />
          <ResizablePanel v-if="isShown.terminal" :default-size="50">
            <!-- @slot slot to render open terminal tabs -->
            <slot name="terminal">
              <KrgzProcessTabs mode="terminal" />
            </slot>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle v-if="isRowDividerShown" />
      <ResizablePanel
        v-if="isShown.processes || isShown.result"
        :default-size="50"
      >
        <ResizablePanelGroup
          auto-save-id="krgz-sandbox-ouptut-row"
          direction="horizontal"
        >
          <ResizablePanel v-if="isShown.result" :default-size="50">
            <!-- @slot slot to render result preview iframe -->
            <slot name="preview">
              <KrgzPreview />
            </slot>
          </ResizablePanel>
          <ResizableHandle v-if="isShown.processes && isShown.result" />
          <ResizablePanel v-if="isShown.processes" :default-size="50">
            <!-- @slot slot to render running process tabs -->
            <slot name="processes">
              <KrgzProcessTabs mode="process" />
            </slot>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  </KrgzSandboxPanelToggles>
</template>
