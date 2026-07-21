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
 * Percentage size for the drawer panel while collapsed, measured from the toolbar's actual
 * height so the collapsed panel hugs it exactly instead of leaving an empty gap below it.
 */
const drawerCollapsedSize = ref(10)

const updateDrawerCollapsedSize = () => {
  const groupHeight = drawerGroupEl.value?.clientHeight
  const toolbarHeight = drawerToolbarEl.value?.clientHeight
  if (!groupHeight || !toolbarHeight) return
  drawerCollapsedSize.value = Math.min(50, (toolbarHeight / groupHeight) * 100)
}

useResizeObserver(drawerGroupEl, updateDrawerCollapsedSize)
useResizeObserver(drawerToolbarEl, updateDrawerCollapsedSize)

// `shownPanels` (surfaced here as `isDrawerShown`) is the single source of truth for whether the
// drawer is open; the underlying resizable-panel-group library's own auto-save/restore of layout
// from localStorage, and its re-layout whenever the collapsed panel's constraints change (e.g. our
// `drawerCollapsedSize` ResizeObserver), both fight for the same panel size and can silently leave
// it open-but-empty or collapsed against our wishes. Rather than race those internal recomputes
// with a one-off imperative call, `enforceDrawerState` re-asserts the desired expand/collapse state
// every time the panel's actual size changes for any reason (wired via `@resize` below), so
// `shownPanels` always wins regardless of what triggered the mismatch. `expand()`/`collapse()` are
// no-ops when already in the desired state, so this can't loop.
const enforceDrawerState = () => {
  const panel = drawerPanel.value
  if (!panel) return
  if (isDrawerShown.value) panel.expand()
  else panel.collapse()
}

// The `drawerPanel` template ref isn't bound yet when this runs, so initial enforcement happens
// via the `drawerPanel` watch below instead; this one only needs to react to later prop changes.
watch(isDrawerShown, enforceDrawerState)
watch(drawerPanel, (panel) => panel && enforceDrawerState())
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
        <ResizableHandle v-if="isDrawerShown" />
        <ResizablePanel
          ref="drawerPanel"
          :collapsed-size="drawerCollapsedSize"
          collapsible
          :default-size="30"
          :min-size="Math.max(20, drawerCollapsedSize + 10)"
          @resize="enforceDrawerState"
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
