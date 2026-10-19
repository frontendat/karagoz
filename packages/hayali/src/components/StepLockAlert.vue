<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@karagoz/shared'
import { computed } from 'vue'
import { Translation, useI18n } from 'vue-i18n'

import type { PathPattern } from '../types'

const props = defineProps<{
  /** Lock patterns of the current step. */
  locks: PathPattern[]
}>()

const { t } = useI18n()

// Negated patterns carve exceptions out of a lock; they are not locked themselves.
const shown = computed(() => props.locks.filter((l) => !l.startsWith('!')))
</script>

<template>
  <Alert v-if="shown.length" data-testid="step-locks" variant="warning">
    <svg
      aria-hidden="true"
      class="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
    <AlertTitle>{{ t('krgz.hayali.locks.title') }}</AlertTitle>
    <AlertDescription>
      <Translation
        keypath="krgz.hayali.locks.description"
        :plural="shown.length"
        tag="p"
      >
        <template #files>
          <template v-for="(lock, i) in shown" :key="lock">
            <template v-if="i">, </template>
            <code>{{ lock }}</code>
          </template>
        </template>
      </Translation>
    </AlertDescription>
  </Alert>
</template>
