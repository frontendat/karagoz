<script setup lang="ts">
import {
  LoadingIndicator,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
} from '@karagoz/shared'
import { useResizeObserver } from '@vueuse/core'
import { Binary } from 'lucide-vue-next'
import { computed, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

import { type Panel, panels } from '../types'
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

const props = defineProps<{
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
  /**
   * Forces only 1 panel to be shown at a time depending on container width.
   * The value determines the minimum container width to allow showing multiple panels, for that
   * [tailwindcss-container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries?tab=readme-ov-file#configuration) is used.
   * The additional value `none` enforces only 1 panel regardless of container width.
   * If no value is provided, then showing multiple panels is always allowed.
   * In single-panel mode the first panel from `shown-panels` is initially shown.
   * **Available values:** none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl
   */
  multiPanelFrom?:
    | 'none'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
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
const shownPanels = defineModel<Panel[]>('shownPanels', {
  default: ['code', 'result'],
})

const { t } = useI18n()
const panelControl = useTemplateRef<HTMLDivElement>('panelControl')
const multiPanel = ref(true)

const multiPanelCss = computed(() => {
  // DO NOT use string concatenation as that would break the resulting CSS.
  switch (props.multiPanelFrom) {
    case 'none':
      return undefined
    case 'xs':
      return '@xs/sandbox:[--multi-panel:1]'
    case 'sm':
      return '@sm/sandbox:[--multi-panel:1]'
    case 'md':
      return '@md/sandbox:[--multi-panel:1]'
    case 'lg':
      return '@lg/sandbox:[--multi-panel:1]'
    case 'xl':
      return '@xl/sandbox:[--multi-panel:1]'
    case '2xl':
      return '@2xl/sandbox:[--multi-panel:1]'
    case '3xl':
      return '@3xl/sandbox:[--multi-panel:1]'
    case '4xl':
      return '@4xl/sandbox:[--multi-panel:1]'
    case '5xl':
      return '@5xl/sandbox:[--multi-panel:1]'
    case '6xl':
      return '@6xl/sandbox:[--multi-panel:1]'
    case '7xl':
      return '@7xl/sandbox:[--multi-panel:1]'
    default:
      return '[--multi-panel:1]'
  }
})

useResizeObserver(panelControl, (entries) => {
  multiPanel.value =
    getComputedStyle(entries[0].target).getPropertyValue('--multi-panel') ===
    '1'
})

const actualShownPanels = computed(() =>
  multiPanel.value ? shownPanels.value : shownPanels.value.slice(0, 1),
)

const togglePanel = (panel: Panel) => {
  const filtered = shownPanels.value.filter((p) => p !== panel)
  shownPanels.value =
    shownPanels.value.includes(panel) && multiPanel.value
      ? filtered
      : [panel, ...filtered]
}

const isShown = computed(
  () =>
    Object.fromEntries(
      panels.map((panel) => [panel, actualShownPanels.value.includes(panel)]),
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
  <div v-else class="@container/sandbox h-full">
    <div ref="panelControl" class="h-full" :class="multiPanelCss">
      <KrgzSandboxPanelToggles
        :available-panels="availablePanels"
        :hide-full-screen-toggle="hideFullScreenToggle"
        :hide-solve-button="hideSolveButton"
        :hide-theme-toggle="hideThemeToggle"
        :shown-panels="actualShownPanels"
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
    </div>
  </div>
</template>
