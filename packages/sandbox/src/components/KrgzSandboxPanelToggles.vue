<script setup lang="ts">
import { useDark, useFullscreen, useToggle } from '@vueuse/core'
import {
  Eye,
  FileCode,
  Lightbulb,
  Maximize,
  Minimize,
  MoonStar,
  Play,
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
 * This component wraps the sandbox panels and renders the available panel toggles and additional functionality buttons.
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
</script>

<template>
  <section
    ref="$el"
    class="grid h-full w-full krgz-sandbox-grid"
    :class="{ 'is-fullscreen': fullscreen.isFullscreen.value }"
  >
    <aside
      v-if="isAvailable.code || isAvailable.result"
      class="border-e flex flex-col h-full"
    >
      <nav v-if="isAvailable.code" class="grid gap-2 p-2">
        <KrgzPanelToggle
          v-if="availablePanels.includes('code')"
          :label="t('krgz.sandbox.toggle.code')"
          :pressed="shownPanels.includes('code')"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          @press="$emit('toggle', 'code')"
        >
          <FileCode class="size-5" />
        </KrgzPanelToggle>

        <div class="border-t"></div>

        <KrgzPanelToggle
          v-if="!hideFullScreenToggle"
          as-button
          :label="t('krgz.sandbox.toggle.fullscreen')"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          @press="fullscreen.toggle"
        >
          <Minimize v-if="fullscreen.isFullscreen.value" class="size-5" />
          <Maximize v-else class="size-5" />
        </KrgzPanelToggle>

        <KrgzPanelToggle
          v-if="!hideSolveButton"
          as-button
          :label="t('krgz.sandbox.toggle.solve')"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          @press="$emit('solve')"
        >
          <Lightbulb class="size-5" />
        </KrgzPanelToggle>

        <KrgzPanelToggle
          v-if="!hideThemeToggle"
          as-button
          :label="t('krgz.sandbox.toggle.theme')"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          @press="toggleDark()"
        >
          <Sun v-if="isDark" class="size-5" />
          <MoonStar v-else class="size-5" />
        </KrgzPanelToggle>
      </nav>
      <nav v-if="isAvailable.result" class="mt-auto grid gap-2 p-2">
        <KrgzPanelToggle
          v-if="availablePanels.includes('result')"
          :label="t('krgz.sandbox.toggle.result')"
          :pressed="shownPanels.includes('result')"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          @press="$emit('toggle', 'result')"
        >
          <Eye class="size-5" />
        </KrgzPanelToggle>
      </nav>
    </aside>
    <div class="flex flex-col">
      <slot></slot>
    </div>
    <aside
      v-if="isAvailable.processes || isAvailable.terminal"
      class="border-s flex flex-col h-full"
    >
      <nav v-if="isAvailable.terminal" class="grid gap-2 p-2">
        <KrgzPanelToggle
          v-if="availablePanels.includes('terminal')"
          :label="t('krgz.sandbox.toggle.terminal')"
          :pressed="shownPanels.includes('terminal')"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          @press="$emit('toggle', 'terminal')"
        >
          <TerminalSquare class="size-5" />
        </KrgzPanelToggle>
      </nav>
      <nav v-if="isAvailable.processes" class="mt-auto grid gap-2 p-2">
        <KrgzPanelToggle
          v-if="availablePanels.includes('processes')"
          :label="t('krgz.sandbox.toggle.processes')"
          :pressed="shownPanels.includes('processes')"
          :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
          @press="$emit('toggle', 'processes')"
        >
          <Play class="size-5" />
        </KrgzPanelToggle>
      </nav>
    </aside>
  </section>
</template>

<style>
.krgz-sandbox-grid.is-fullscreen {
  background-color: hsl(var(--background));
}

.krgz-sandbox-grid:has(> aside:first-child) {
  grid-template-columns: 60px minmax(calc(100% - 60px), 1fr);
}

.krgz-sandbox-grid:has(> aside:last-child) {
  grid-template-columns: minmax(calc(100% - 60px), 1fr) 60px;
}

.krgz-sandbox-grid:has(> aside:first-child):has(> aside:last-child) {
  grid-template-columns: 60px minmax(calc(100% - 120px), 1fr) 60px;
}
</style>
