<script setup lang="ts">
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@karagoz/shared'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { StepGroup } from '../composables/useLessonPosition'
import type { Position } from '../types'

defineProps<{
  groups: StepGroup[]
  current: Position
  disabled?: boolean
}>()
const emit = defineEmits<{ select: [position: Position] }>()

const { t } = useI18n()
const open = ref(false)

const isCurrent = (p: Position, current: Position) =>
  p.chapterId === current.chapterId && p.stepId === current.stepId

// Plain buttons, not DropdownMenuItem: this is a navigation list, not an action menu.
const select = (p: Position) => {
  open.value = false
  emit('select', p)
}
</script>

<template>
  <DropdownMenu v-model:open="open">
    <DropdownMenuTrigger as-child :disabled="disabled">
      <Button
        data-testid="toc-trigger"
        variant="ghost"
        size="icon"
        class="size-7"
        :title="t('krgz.hayali.toc')"
        :aria-label="t('krgz.hayali.toc')"
      >
        <svg
          class="size-[15px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M3 12h.01" />
          <path d="M3 18h.01" />
          <path d="M3 6h.01" />
          <path d="M8 12h13" />
          <path d="M8 18h13" />
          <path d="M8 6h13" />
        </svg>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="start"
      class="max-h-[min(420px,var(--radix-dropdown-menu-content-available-height))] w-64 overflow-auto"
    >
      <nav :aria-label="t('krgz.hayali.toc')">
        <section
          v-for="group in groups"
          :key="group.chapterId"
          class="not-first:mt-1 not-first:border-t not-first:pt-1"
        >
          <div
            v-if="group.title"
            data-testid="toc-chapter"
            class="text-muted-foreground px-2 pb-1 pt-1.5 text-xs font-semibold uppercase tracking-wide"
          >
            {{ group.title }}
          </div>
          <ol>
            <li v-for="s in group.steps" :key="s.position.stepId">
              <button
                type="button"
                data-testid="toc-step"
                class="hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent w-full rounded-sm px-2 py-1.5 text-start text-sm outline-none"
                :class="{ 'font-semibold': isCurrent(s.position, current) }"
                :aria-current="
                  isCurrent(s.position, current) ? 'step' : undefined
                "
                @click="select(s.position)"
              >
                {{ s.title }}
              </button>
            </li>
          </ol>
        </section>
      </nav>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
