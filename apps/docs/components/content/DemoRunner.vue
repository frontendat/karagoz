<script setup lang="ts">
import { Button, LoadingIndicator } from '@karagoz/shared'
import { PlayCircle } from 'lucide-vue-next'

import { useDemoRunner } from '~/composables/useDemoRunner'

withDefaults(
  defineProps<{
    heightClass?: string
  }>(),
  {
    heightClass: 'h-[600px]',
  },
)

const { t } = useI18n()
const demoRunner = useDemoRunner()
const isRunning = ref(false)

demoRunner.onKillRunning(() => (isRunning.value = false))

const onRunClick = async () => {
  await demoRunner.killRunning()
  await nextTick()
  isRunning.value = true
}
</script>

<template>
  <div class="border border-border my-12 not-prose" :class="heightClass">
    <ClientOnly v-if="isRunning">
      <slot></slot>
    </ClientOnly>
    <LoadingIndicator v-else suppress-spinner variant="secondary">
      <PlayCircle class="size-12" />
      <Button size="xs" variant="link" @click="onRunClick">
        {{ t('component.demoRunner.clickToStart') }}
      </Button>
    </LoadingIndicator>
  </div>
</template>
