<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@karagoz/shared'
import {
  useDark,
  useFullscreen,
  useResizeObserver,
  useToggle,
} from '@vueuse/core'
import {
  Cog,
  Eye,
  FileCode,
  Lightbulb,
  Maximize,
  Minimize,
  Minus,
  MoonStar,
  Sun,
  TerminalSquare,
} from 'lucide-vue-next'
import { computed, ref, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { Panel, panels } from '../types'
import KrgzPanelToggle from './KrgzPanelToggle.vue'

/**
 * Layout component.
 *
 * Renders the main toolbar (Code/Result toggles + Solve/Fullscreen/Theme buttons) above the
 * default slot (main panels content), and, whenever a Processes/Terminal panel is available, the
 * drawer toolbar (Processes/Terminal toggles + close icon) above the `drawer` slot (drawer
 * content, only rendered while a drawer panel is shown).
 */
defineOptions({})

const props = defineProps<{
  /**
   * Panel toggles to show.
   */
  availablePanels: Panel[]
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
   * Shown panels
   */
  shownPanels: Panel[]
}>()

defineEmits<{
  /**
   * Emitted when the drawer toolbar's close/open icon is clicked.
   */
  (e: 'toggleDrawer'): void
  /**
   * Emitted when the solve button is clicked.
   */
  (e: 'solve'): void
  /**
   * Emitted when a panel toggle is clicked.
   * @param {Panel} panel clicked panel toggle. One of: code, processes, result, terminal
   */
  (e: 'toggle', panel: Panel): void
}>()

const { t } = useI18n()
const $el = useTemplateRef<HTMLElement>('$el')
const fullscreen = useFullscreen($el)
const isDark = useDark()
const toggleDark = useToggle(isDark)

const toPanelRecord = (shown: Panel[]) =>
  Object.fromEntries(
    panels.map((panel) => [panel, shown.includes(panel)]),
  ) as Record<Panel, boolean>

const isAvailable = computed(() => toPanelRecord(props.availablePanels))
const isShown = computed(() => toPanelRecord(props.shownPanels))
const isDrawerShown = computed(
  () => isShown.value.processes || isShown.value.terminal,
)

const drawerGroupEl = useTemplateRef<HTMLDivElement>('drawerGroupEl')
const drawerToolbarEl = useTemplateRef<HTMLDivElement>('drawerToolbarEl')
const drawerPanel = useTemplateRef('drawerPanel')

/**
 * Initial size (%) of the drawer panel while expanded.
 */
const DRAWER_DEFAULT_SIZE = 30

/**
 * Percentage size for the drawer panel while collapsed, measured from the toolbar's actual
 * height so the collapsed panel hugs it exactly instead of leaving an empty gap below it.
 */
const drawerCollapsedSize = ref(10)

// A tall toolbar in a short group can push `collapsedSize` close to its 50% cap; keep the
// derived min-size at or below `DRAWER_DEFAULT_SIZE` so the two constraints never conflict.
const drawerMinSize = computed(() =>
  Math.min(DRAWER_DEFAULT_SIZE, Math.max(20, drawerCollapsedSize.value + 10)),
)

const updateDrawerCollapsedSize = () => {
  const groupHeight = drawerGroupEl.value?.clientHeight
  const toolbarHeight = drawerToolbarEl.value?.clientHeight
  if (!groupHeight || !toolbarHeight) return
  drawerCollapsedSize.value = Math.min(50, (toolbarHeight / groupHeight) * 100)
}

useResizeObserver(drawerGroupEl, updateDrawerCollapsedSize)
useResizeObserver(drawerToolbarEl, updateDrawerCollapsedSize)

// The drawer panel's own collapse state is the source of truth for its size; mirror the
// externally-controlled open/closed state onto it imperatively.
watch(isDrawerShown, (shown) => {
  if (shown) drawerPanel.value?.expand()
  else drawerPanel.value?.collapse()
})

// A freshly (re)mounted panel starts neither collapsed nor expanded by our doing, so if it mounts
// already meant to be shown (initial render, or `availablePanels` toggling processes/terminal
// on later), the watcher above never fires (nothing changed) and it's left un-expanded.
watch(drawerPanel, (panel) => {
  if (panel && isDrawerShown.value) panel.expand()
})
</script>

<template>
  <section
    ref="$el"
    class="flex flex-col h-full w-full krgz-sandbox-grid"
    :class="{ 'is-fullscreen': fullscreen.isFullscreen.value }"
  >
    <!-- Main toolbar: Code/Result toggles + Solve/Fullscreen/Theme buttons -->
    <div
      v-if="isAvailable.code || isAvailable.result"
      class="border-b flex gap-2 items-center justify-between p-2"
    >
      <div class="flex gap-2">
        <KrgzPanelToggle
          v-if="isAvailable.code"
          :label="t('krgz.sandbox.toggle.code')"
          :pressed="isShown.code"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          variant="tab"
          @press="$emit('toggle', 'code')"
        >
          <FileCode class="size-4" />
        </KrgzPanelToggle>
        <KrgzPanelToggle
          v-if="isAvailable.result"
          :label="t('krgz.sandbox.toggle.result')"
          :pressed="isShown.result"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          variant="tab"
          @press="$emit('toggle', 'result')"
        >
          <Eye class="size-4" />
        </KrgzPanelToggle>
      </div>
      <div class="flex gap-2">
        <KrgzPanelToggle
          v-if="!hideSolveButton"
          as-button
          :label="t('krgz.sandbox.toggle.solve')"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          variant="tab"
          @press="$emit('solve')"
        >
          <Lightbulb class="size-4" />
        </KrgzPanelToggle>
        <KrgzPanelToggle
          v-if="!hideFullScreenToggle"
          as-button
          :label="t('krgz.sandbox.toggle.fullscreen')"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          variant="tab"
          @press="fullscreen.toggle"
        >
          <Minimize v-if="fullscreen.isFullscreen.value" class="size-4" />
          <Maximize v-else class="size-4" />
        </KrgzPanelToggle>
        <KrgzPanelToggle
          v-if="!hideThemeToggle"
          as-button
          :label="t('krgz.sandbox.toggle.theme')"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          variant="tab"
          @press="toggleDark()"
        >
          <Sun v-if="isDark" class="size-4" />
          <MoonStar v-else class="size-4" />
        </KrgzPanelToggle>
      </div>
    </div>

    <!-- Main panels (default slot) + drawer (Processes/Terminal); resizable when a drawer panel is open -->
    <div
      v-if="isAvailable.processes || isAvailable.terminal"
      ref="drawerGroupEl"
      class="flex-1 min-h-0"
    >
      <ResizablePanelGroup
        auto-save-id="krgz-sandbox-drawer"
        class="h-full"
        direction="vertical"
      >
        <ResizablePanel :default-size="70" :min-size="20">
          <slot></slot>
        </ResizablePanel>
        <ResizableHandle v-if="isDrawerShown" with-handle />
        <ResizablePanel
          ref="drawerPanel"
          :collapsed-size="drawerCollapsedSize"
          collapsible
          :default-size="DRAWER_DEFAULT_SIZE"
          :min-size="drawerMinSize"
        >
          <div class="flex flex-col h-full">
            <!-- Drawer toolbar: Processes/Terminal toggles + close icon -->
            <div
              ref="drawerToolbarEl"
              class="border-t flex gap-2 items-center justify-between p-2"
            >
              <div class="flex gap-2">
                <KrgzPanelToggle
                  v-if="isAvailable.processes"
                  :label="t('krgz.sandbox.toggle.processes')"
                  :pressed="isShown.processes"
                  :tooltip-content-portal-disabled="
                    fullscreen.isFullscreen.value
                  "
                  variant="tab"
                  @press="$emit('toggle', 'processes')"
                >
                  <Cog class="size-4" />
                </KrgzPanelToggle>
                <KrgzPanelToggle
                  v-if="isAvailable.terminal"
                  :label="t('krgz.sandbox.toggle.terminal')"
                  :pressed="isShown.terminal"
                  :tooltip-content-portal-disabled="
                    fullscreen.isFullscreen.value
                  "
                  variant="tab"
                  @press="$emit('toggle', 'terminal')"
                >
                  <TerminalSquare class="size-4" />
                </KrgzPanelToggle>
              </div>
              <KrgzPanelToggle
                as-button
                :label="
                  isDrawerShown
                    ? t('krgz.sandbox.general.close')
                    : t('krgz.sandbox.general.open')
                "
                :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
                variant="tab"
                @press="$emit('toggleDrawer')"
              >
                <Minus class="size-4" />
              </KrgzPanelToggle>
            </div>

            <!-- Drawer: `drawer` slot content (Processes or Terminal) -->
            <div v-if="isDrawerShown" class="flex-1 min-h-0">
              <slot name="drawer"></slot>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
    <!-- Main panels only: no Processes/Terminal available -->
    <div v-else class="flex-1 min-h-0">
      <slot></slot>
    </div>
  </section>
</template>

<style>
.krgz-sandbox-grid.is-fullscreen {
  background-color: hsl(var(--background));
}
</style>
