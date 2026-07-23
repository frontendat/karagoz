<script setup lang="ts">
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@karagoz/shared'
import {
  Cog,
  Eye,
  FileCode,
  Lightbulb,
  Maximize,
  Minimize,
  MoonStar,
  MoreVertical,
  Sun,
  TerminalSquare,
} from 'lucide-vue-next'
import { computed, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSandboxToolbarChrome } from '../composables'
import { type Panel } from '../types'
import KrgzPanelToggle from './KrgzPanelToggle.vue'
import { toPanelRecord } from '../utils/toPanelRecord.ts'

/**
 * Mobile (single-panel) layout component.
 *
 * Renders a minimal top toolbar (an overflow menu holding Solve/Theme/Fullscreen) above the
 * default slot (the single currently-shown panel's content), and a bottom tab bar to switch which
 * panel is shown.
 */
defineOptions({})

const props = defineProps<{
  /**
   * Panel toggles to render in the bottom tab bar.
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
   * Shown panels. Exactly one entry is shown at a time in this layout.
   */
  shownPanels: Panel[]
}>()

defineEmits<{
  /**
   * Emitted when the solve action is clicked.
   */
  (e: 'solve'): void
  /**
   * Emitted when a bottom-bar tab is clicked.
   * @param {Panel} panel clicked panel. One of: code, processes, result, terminal
   */
  (e: 'toggle', panel: Panel): void
}>()

const { t } = useI18n()
const $el = useTemplateRef<HTMLElement>('$el')
const { fullscreen, isDark, toggleDark } = useSandboxToolbarChrome($el)

const isAvailable = computed(() => toPanelRecord(props.availablePanels))
const isShown = computed(() => toPanelRecord(props.shownPanels))
const contentPortal = computed(() => ({
  disabled: fullscreen.isFullscreen.value,
}))
</script>

<template>
  <section
    ref="$el"
    class="krgz-sandbox-mobile flex flex-col h-full w-full"
    :class="{ 'is-fullscreen': fullscreen.isFullscreen.value }"
  >
    <!-- Top toolbar: overflow menu holding Solve/Theme/Fullscreen -->
    <div class="border-b flex items-center justify-end p-2">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button
            :aria-label="t('krgz.sandbox.toggle.more')"
            size="icon"
            variant="ghost"
          >
            <MoreVertical class="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" :portal="contentPortal">
          <DropdownMenuItem v-if="!hideSolveButton" @select="$emit('solve')">
            <Lightbulb class="size-4" />
            {{ t('krgz.sandbox.toggle.solve') }}
          </DropdownMenuItem>
          <DropdownMenuItem v-if="!hideThemeToggle" @select="toggleDark()">
            <Sun v-if="isDark" class="size-4" />
            <MoonStar v-else class="size-4" />
            {{ t('krgz.sandbox.toggle.theme') }}
          </DropdownMenuItem>
          <DropdownMenuItem
            v-if="!hideFullScreenToggle"
            @select="fullscreen.toggle"
          >
            <Minimize v-if="fullscreen.isFullscreen.value" class="size-4" />
            <Maximize v-else class="size-4" />
            {{ t('krgz.sandbox.toggle.fullscreen') }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- Single currently-shown panel -->
    <div class="flex-1 min-h-0">
      <slot></slot>
    </div>

    <!-- Bottom tab bar: switches which single panel is shown -->
    <div class="border-t flex krgz-sandbox-mobile-tabbar">
      <KrgzPanelToggle
        v-if="isAvailable.code"
        :label="t('krgz.sandbox.toggle.code')"
        :pressed="isShown.code"
        :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
        variant="bottom-bar"
        @press="$emit('toggle', 'code')"
      >
        <FileCode class="size-4" />
      </KrgzPanelToggle>
      <KrgzPanelToggle
        v-if="isAvailable.result"
        :label="t('krgz.sandbox.toggle.result')"
        :pressed="isShown.result"
        :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
        variant="bottom-bar"
        @press="$emit('toggle', 'result')"
      >
        <Eye class="size-4" />
      </KrgzPanelToggle>
      <KrgzPanelToggle
        v-if="isAvailable.terminal"
        :label="t('krgz.sandbox.toggle.terminal')"
        :pressed="isShown.terminal"
        :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
        variant="bottom-bar"
        @press="$emit('toggle', 'terminal')"
      >
        <TerminalSquare class="size-4" />
      </KrgzPanelToggle>
      <KrgzPanelToggle
        v-if="isAvailable.processes"
        :label="t('krgz.sandbox.toggle.processes')"
        :pressed="isShown.processes"
        :tooltip-content-portal-disabled="fullscreen.isFullscreen.value"
        variant="bottom-bar"
        @press="$emit('toggle', 'processes')"
      >
        <Cog class="size-4" />
      </KrgzPanelToggle>
    </div>
  </section>
</template>

<style scoped>
.krgz-sandbox-mobile.is-fullscreen {
  background-color: hsl(var(--background));
}

.krgz-sandbox-mobile-tabbar > * {
  display: flex;
  flex: 1;
}
</style>
