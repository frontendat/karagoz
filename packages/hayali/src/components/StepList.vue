<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { PathPattern, Step } from '../types'
import StepBody from './StepBody.vue'
import StepLockAlert from './StepLockAlert.vue'

const props = defineProps<{
  steps: Step[]
  currentStepId: string
  /** Lock patterns of the current step. */
  locks: PathPattern[]
  disabled?: boolean
}>()
defineEmits<{ select: [stepId: string] }>()

const { t } = useI18n()

const currentIndex = computed(() =>
  props.steps.findIndex((s) => s.id === props.currentStepId),
)
const statusOf = (i: number) =>
  i < currentIndex.value
    ? 'done'
    : i === currentIndex.value
      ? 'current'
      : 'upcoming'
</script>

<template>
  <nav :aria-label="t('krgz.hayali.steps')" class="px-[22px] py-5">
    <ol>
      <li
        v-for="(s, i) in steps"
        :key="s.id"
        data-testid="step-item"
        :data-status="statusOf(i)"
        :aria-current="statusOf(i) === 'current' ? 'step' : undefined"
        class="relative flex gap-3"
      >
        <div
          v-if="i < steps.length - 1"
          aria-hidden="true"
          class="bg-border absolute start-[11px] top-[26px] -bottom-3.5 w-px"
        />
        <div
          aria-hidden="true"
          class="mt-px flex size-[23px] flex-none items-center justify-center rounded-full"
          :class="{
            'bg-foreground text-background': statusOf(i) === 'done',
            'border-foreground bg-background border-2':
              statusOf(i) === 'current',
            'bg-muted border': statusOf(i) === 'upcoming',
          }"
        >
          <svg
            v-if="statusOf(i) === 'done'"
            class="size-[11px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <div
            v-else-if="statusOf(i) === 'current'"
            class="bg-foreground size-[7px] rounded-full"
          />
        </div>
        <div class="min-w-0 flex-1 pb-5">
          <div
            v-if="statusOf(i) === 'current'"
            class="pt-0.5 text-[13.5px] font-semibold"
          >
            {{ s.title }}
          </div>
          <button
            v-else
            type="button"
            data-testid="step-link"
            class="text-muted-foreground block pt-0.5 text-start text-[13.5px] hover:text-foreground"
            :class="statusOf(i) === 'done' ? 'font-medium' : 'font-semibold'"
            :disabled="disabled"
            @click="$emit('select', s.id)"
          >
            {{ s.title }}
          </button>
          <span class="sr-only">
            {{ t(`krgz.hayali.${statusOf(i)}`) }}
          </span>
          <StepLockAlert
            v-if="statusOf(i) === 'current'"
            class="mt-2.5"
            :locks="locks"
          />
          <!-- Every body is in the server HTML (SEO, no JS); only the current one is expanded. -->
          <StepBody
            v-show="statusOf(i) === 'current'"
            class="mt-2.5 text-[13.5px]"
            :body="s.body"
          />
        </div>
      </li>
    </ol>
  </nav>
</template>
