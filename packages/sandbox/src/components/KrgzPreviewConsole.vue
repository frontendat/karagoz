<script setup lang="ts">
import { Button } from '@karagoz/shared'
import { Minus, Trash2 } from 'lucide-vue-next'
import { nextTick, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import type { ConsoleLogEntry } from '../types'
import KrgzTabIcon from './KrgzTabIcon.vue'

/**
 * Renders log messages forwarded from the preview iframe (`console.log/info/warn/error/debug` and
 * uncaught errors).
 */
defineOptions({})

const props = defineProps<{
  /**
   * Log entries to render.
   */
  logs: ConsoleLogEntry[]
}>()

defineEmits<{
  /**
   * Emitted when the clear button is clicked.
   */
  (e: 'clear'): void
  /**
   * Emitted when the close button is clicked.
   */
  (e: 'close'): void
}>()

const { t } = useI18n()
const logList = useTemplateRef<HTMLDivElement>('logList')

const levelClass: Record<ConsoleLogEntry['level'], string> = {
  debug: 'text-muted-foreground',
  error: 'text-destructive',
  info: 'text-foreground',
  log: 'text-foreground',
  warn: 'text-yellow-600 dark:text-yellow-500',
}

watch(
  () => props.logs.length,
  async () => {
    await nextTick()
    logList.value?.scrollTo({ top: logList.value.scrollHeight })
  },
)
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="bg-muted flex items-center">
      <div class="flex-grow p-2 text-xs">
        {{ t('krgz.sandbox.panel.preview.console') }}
      </div>
      <Button size="sm" variant="ghost" @click="$emit('clear')">
        <KrgzTabIcon
          class="size-3"
          :icon="Trash2"
          :tooltip="t('krgz.sandbox.panel.preview.clearConsole')"
        />
      </Button>
      <Button size="sm" variant="ghost" @click="$emit('close')">
        <KrgzTabIcon
          class="size-3"
          :icon="Minus"
          :tooltip="t('krgz.sandbox.general.close')"
        />
      </Button>
    </div>
    <div ref="logList" class="flex-grow h-0 overflow-auto">
      <div
        v-for="(entry, index) in logs"
        :key="index"
        class="border-b border-border font-mono px-2 py-1 text-xs break-all whitespace-pre-wrap last:border-0"
        :class="levelClass[entry.level]"
      >
        {{ entry.args.join(' ') }}
      </div>
    </div>
  </div>
</template>
