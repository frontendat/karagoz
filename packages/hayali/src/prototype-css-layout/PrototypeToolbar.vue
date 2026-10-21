<script setup lang="ts">
// PROTOTYPE (throwaway): LessonToolbar with placement driven by CSS vars instead of a `placement` prop.
import { Button } from '@karagoz/shared'
import { useI18n } from 'vue-i18n'

import type { StepGroup } from '../composables/useLessonPosition'
import type { Position } from '../types'
import TocDropdown from '../components/TocDropdown.vue'

defineProps<{
  prev?: Position
  next?: Position
  groups: StepGroup[]
  current: Position
  chapterTitle?: string
  disabled?: boolean
}>()
defineEmits<{ navigate: [position: Position] }>()
const { t } = useI18n()
</script>

<template>
  <div
    data-testid="toolbar"
    class="bg-background sticky bottom-0 z-10 flex h-14 min-h-14 items-center gap-1 border-solid px-[var(--hf-tb-px,0.75rem)] [border-width:var(--hf-tb-bw,1px_0_0_0)] [order:var(--hf-tb-order,1)]"
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
      ←
    </Button>
    <Button
      data-testid="next"
      variant="ghost"
      size="icon"
      class="size-7 [margin-inline-end:var(--hf-next-me,-0.375rem)] [order:var(--hf-next-order,9)]"
      :title="t('krgz.hayali.next')"
      :aria-label="t('krgz.hayali.next')"
      :disabled="disabled || !next"
      @click="next && $emit('navigate', next)"
    >
      →
    </Button>
    <div
      class="flex min-w-0 items-center gap-1 [flex:var(--hf-toc-flex,1_1_0%)] [justify-content:var(--hf-toc-justify,center)]"
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
