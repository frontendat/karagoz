<script setup lang="ts">
import { useDark, useFullscreen, useToggle } from '@vueuse/core'
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
import { computed, useTemplateRef } from 'vue'
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
   * Emitted when the drawer toolbar's close icon is clicked.
   */
  (e: 'collapseDrawer'): void
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

const isAvailable = computed(
  () =>
    Object.fromEntries(
      panels.map((panel) => [panel, props.availablePanels.includes(panel)]),
    ) as Record<Panel, boolean>,
)

const isShown = computed(
  () =>
    Object.fromEntries(
      panels.map((panel) => [panel, props.shownPanels.includes(panel)]),
    ) as Record<Panel, boolean>,
)
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

    <!-- Main panels: default slot content (Code/Result) -->
    <div class="flex-1 min-h-0">
      <slot></slot>
    </div>

    <!-- Drawer toolbar: Processes/Terminal toggles + close icon -->
    <div
      v-if="isAvailable.processes || isAvailable.terminal"
      class="border-t flex gap-2 items-center justify-between p-2"
    >
      <div class="flex gap-2">
        <KrgzPanelToggle
          v-if="isAvailable.processes"
          :label="t('krgz.sandbox.toggle.processes')"
          :pressed="isShown.processes"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          variant="tab"
          @press="$emit('toggle', 'processes')"
        >
          <Cog class="size-4" />
        </KrgzPanelToggle>
        <KrgzPanelToggle
          v-if="isAvailable.terminal"
          :label="t('krgz.sandbox.toggle.terminal')"
          :pressed="isShown.terminal"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          variant="tab"
          @press="$emit('toggle', 'terminal')"
        >
          <TerminalSquare class="size-4" />
        </KrgzPanelToggle>
      </div>
      <KrgzPanelToggle
        as-button
        :label="t('krgz.sandbox.general.close')"
        :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
        variant="tab"
        @press="$emit('collapseDrawer')"
      >
        <Minus class="size-4" />
      </KrgzPanelToggle>
    </div>

    <!-- Drawer: `drawer` slot content (Processes or Terminal) -->
    <div v-if="isShown.processes || isShown.terminal" class="h-64 shrink-0">
      <slot name="drawer"></slot>
    </div>
  </section>
</template>

<style>
.krgz-sandbox-grid.is-fullscreen {
  background-color: hsl(var(--background));
}
</style>
