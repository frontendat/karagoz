<script setup lang="ts">
import {
  LoadingIndicator,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@karagoz/shared'
import { useResizeObserver } from '@vueuse/core'
import { Binary } from 'lucide-vue-next'
import { computed, ref, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSandbox, useSandboxPanels } from '../composables'
import { type Panel } from '../types'
import KrgzPreview from './KrgzPreview.vue'
import KrgzProcessTabs from './KrgzProcessTabs.vue'
import KrgzSandboxCodePanel from './KrgzSandboxCodePanel.vue'
import KrgzSandboxMobileToolbar from './KrgzSandboxMobileToolbar.vue'
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
  default: () => ['code', 'processes', 'result', 'terminal'] as Panel[],
})
const shownPanels = defineModel<Panel[]>('shownPanels', {
  default: () => ['code', 'result'] as Panel[],
})

const { t } = useI18n()
const { editorTabs, explorer } = useSandbox()
const panelControl = useTemplateRef<HTMLDivElement>('panelControl')
const multiPanel = ref(true)

/**
 * When the last editor tab is closed, the editor area falls back to an empty state. Automatically
 * re-show the file explorer at that point so the user isn't left with two empty panels, unless
 * `hideExplorer` forces it off entirely.
 */
watch(
  () => editorTabs.tabs.value.length,
  (length) => {
    if (length === 0 && !props.hideExplorer) explorer.show()
  },
)

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

const { actualShownPanels, isShown, togglePanel, toggleDrawer } =
  useSandboxPanels(availablePanels, shownPanels, multiPanel)
</script>

<template>
  <LoadingIndicator
    v-if="booting"
    :label="t('krgz.sandbox.loading.booting')"
    variant="secondary"
  >
    <Binary class="size-12" />
  </LoadingIndicator>
  <div v-else class="krgz-sandbox @container/sandbox h-full">
    <div ref="panelControl" class="h-full" :class="multiPanelCss">
      <KrgzSandboxPanelToggles
        v-if="multiPanel"
        :available-panels="availablePanels"
        :hide-full-screen-toggle="hideFullScreenToggle"
        :hide-solve-button="hideSolveButton"
        :hide-theme-toggle="hideThemeToggle"
        :shown-panels="actualShownPanels"
        @toggle-drawer="toggleDrawer"
        @solve="$emit('solve')"
        @toggle="togglePanel($event)"
      >
        <ResizablePanelGroup
          auto-save-id="krgz-sandbox-main-panels"
          class="h-full"
          direction="horizontal"
        >
          <template v-if="isShown.code">
            <ResizablePanel :default-size="50">
              <KrgzSandboxCodePanel :hide-explorer="hideExplorer">
                <template v-if="$slots.explorer" #explorer>
                  <slot name="explorer" />
                </template>
                <template v-if="$slots.editor" #editor>
                  <slot name="editor" />
                </template>
              </KrgzSandboxCodePanel>
            </ResizablePanel>
          </template>
          <ResizableHandle v-if="isShown.code && isShown.result" />
          <ResizablePanel v-if="isShown.result" :default-size="50">
            <!-- @slot slot to render result preview iframe -->
            <slot name="preview">
              <KrgzPreview />
            </slot>
          </ResizablePanel>
        </ResizablePanelGroup>

        <template #drawer>
          <slot v-if="isShown.terminal" name="terminal">
            <KrgzProcessTabs mode="terminal" />
          </slot>
          <slot v-else-if="isShown.processes" name="processes">
            <KrgzProcessTabs mode="process" />
          </slot>
        </template>
      </KrgzSandboxPanelToggles>
      <KrgzSandboxMobileToolbar
        v-else
        :available-panels="availablePanels"
        :hide-full-screen-toggle="hideFullScreenToggle"
        :hide-solve-button="hideSolveButton"
        :hide-theme-toggle="hideThemeToggle"
        :shown-panels="actualShownPanels"
        @solve="$emit('solve')"
        @toggle="togglePanel($event)"
      >
        <template v-if="isShown.code">
          <KrgzSandboxCodePanel :hide-explorer="hideExplorer">
            <template v-if="$slots.explorer" #explorer>
              <slot name="explorer" />
            </template>
            <template v-if="$slots.editor" #editor>
              <slot name="editor" />
            </template>
          </KrgzSandboxCodePanel>
        </template>
        <slot v-else-if="isShown.result" name="preview">
          <KrgzPreview />
        </slot>
        <slot v-else-if="isShown.terminal" name="terminal">
          <KrgzProcessTabs mode="terminal" />
        </slot>
        <slot v-else-if="isShown.processes" name="processes">
          <KrgzProcessTabs mode="process" />
        </slot>
      </KrgzSandboxMobileToolbar>
    </div>
  </div>
</template>
