<script setup lang="ts">
import { Button } from '@karagoz/shared'
import { useI18n } from 'vue-i18n'

import type { StepGroup } from '../composables/useLessonPosition'
import type { Position } from '../types'
import TocDropdown from './TocDropdown.vue'

defineProps<{
  prev?: Position
  next?: Position
  groups: StepGroup[]
  current: Position
  chapterTitle?: string
  disabled?: boolean
  /** `bottom` is the mobile sticky nav: Prev/Next pinned to either edge. */
  placement: 'top' | 'bottom'
}>()
defineEmits<{ navigate: [position: Position] }>()

const { t } = useI18n()
</script>

<template>
  <div
    data-testid="toolbar"
    class="bg-background flex h-14 min-h-14 items-center gap-1"
    :class="
      placement === 'top'
        ? 'border-b px-7'
        : 'sticky bottom-0 z-10 border-t px-3'
    "
  >
    <Button
      data-testid="prev"
      variant="ghost"
      size="icon"
      class="-ms-1.5 size-7"
      :title="t('krgz.hayali.prev')"
      :aria-label="t('krgz.hayali.prev')"
      :disabled="disabled || !prev"
      @click="prev && $emit('navigate', prev)"
    >
      <svg
        class="size-[15px] rtl:-scale-x-100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
    </Button>
    <Button
      data-testid="next"
      variant="ghost"
      size="icon"
      class="size-7"
      :class="{ '-me-1.5 order-last': placement === 'bottom' }"
      :title="t('krgz.hayali.next')"
      :aria-label="t('krgz.hayali.next')"
      :disabled="disabled || !next"
      @click="next && $emit('navigate', next)"
    >
      <svg
        class="size-[15px] rtl:-scale-x-100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </Button>
    <div
      class="flex min-w-0 items-center gap-1"
      :class="{ 'flex-1 justify-center': placement === 'bottom' }"
    >
      <TocDropdown
        :groups="groups"
        :current="current"
        :disabled="disabled"
        @select="$emit('navigate', $event)"
      />
      <span
        v-if="chapterTitle"
        data-testid="chapter-title"
        class="ms-2 truncate text-sm font-semibold"
      >
        {{ chapterTitle }}
      </span>
    </div>
  </div>
</template>
