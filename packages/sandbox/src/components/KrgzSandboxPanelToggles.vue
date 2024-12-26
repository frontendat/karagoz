<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import {
  Eye,
  FileCode,
  Lightbulb,
  MoonStar,
  Play,
  Sun,
  TerminalSquare,
} from 'lucide-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { Panel, panels } from '../types/Panel.ts'
import KrgzPanelToggle from './KrgzPanelToggle.vue'

const props = defineProps<{
  availablePanels: Panel[]
  hideSolveButton?: boolean
  hideThemeToggle?: boolean
  shownPanels: Panel[]
}>()

defineEmits<{
  (e: 'solve'): void
  (e: 'toggle', panel: Panel): void
}>()

const { t } = useI18n()
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
  <section class="grid h-screen w-full krgz-sandbox-grid">
    <aside
      v-if="isAvailable.code || isAvailable.result"
      class="flex h-full flex-col border-e border-e-border"
    >
      <nav v-if="isAvailable.code" class="grid gap-2 p-2">
        <KrgzPanelToggle
          v-if="availablePanels.includes('code')"
          :label="t('krgz.sandbox.toggle.code')"
          :pressed="shownPanels.includes('code')"
          @press="$emit('toggle', 'code')"
        >
          <FileCode class="size-5" />
        </KrgzPanelToggle>

        <div class="border-t border-t-border"></div>

        <KrgzPanelToggle
          v-if="!hideSolveButton"
          as-button
          :label="t('krgz.sandbox.toggle.solve')"
          :pressed="undefined"
          @press="$emit('solve')"
        >
          <Lightbulb class="size-5" />
        </KrgzPanelToggle>

        <KrgzPanelToggle
          v-if="!hideThemeToggle"
          as-button
          :label="t('krgz.sandbox.toggle.theme')"
          :pressed="undefined"
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
      class="flex h-full flex-col border-s border-s-border"
    >
      <nav v-if="isAvailable.terminal" class="grid gap-2 p-2">
        <KrgzPanelToggle
          v-if="availablePanels.includes('terminal')"
          :label="t('krgz.sandbox.toggle.terminal')"
          :pressed="shownPanels.includes('terminal')"
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
          @press="$emit('toggle', 'processes')"
        >
          <Play class="size-5" />
        </KrgzPanelToggle>
      </nav>
    </aside>
  </section>
</template>

<style scoped>
@layer krgz {
  .krgz-sandbox-grid:has(> aside:first-child) {
    grid-template-columns: 60px minmax(calc(100% - 60px), 1fr);
  }
  .krgz-sandbox-grid:has(> aside:last-child) {
    grid-template-columns: minmax(calc(100% - 60px), 1fr) 60px;
  }

  .krgz-sandbox-grid:has(> aside:first-child):has(> aside:last-child) {
    grid-template-columns: 60px minmax(calc(100% - 120px), 1fr) 60px;
  }
}
</style>
