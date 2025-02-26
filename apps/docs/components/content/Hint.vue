<script setup lang="ts">
import { BookOpenText, TriangleAlert } from 'lucide-vue-next'

import type { AlertVariants } from '~/components/ui/alert'

const IconMap = {
  default: BookOpenText,
  destructive: TriangleAlert,
} as const

const props = withDefaults(
  defineProps<{
    hideIcon?: boolean
    hideTitle?: boolean
    title?: string
    variant?: AlertVariants['variant']
  }>(),
  {
    title: undefined,
    variant: 'default',
  },
)

const { t } = useI18n()

const IconComponent = computed(
  () => (props.variant && IconMap[props.variant]) ?? undefined,
)
</script>

<template>
  <div class="hint">
    <Alert class="not-prose" :variant="variant">
      <IconComponent v-if="IconComponent && !hideIcon" class="size-4" />
      <AlertTitle v-if="!hideTitle">{{
        title ?? t('component.hint.defaultTitle')
      }}</AlertTitle>
      <AlertDescription>
        <slot></slot>
      </AlertDescription>
    </Alert>
  </div>
</template>

<style scoped>
.hint :deep(a) {
  @apply underline;
}

.hint + .hint {
  @apply mt-8;
}
</style>
