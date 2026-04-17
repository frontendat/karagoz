<script setup lang="ts">
import { Button } from '@karagoz/shared'

import { NuxtLink } from '#components'

defineProps<{
  headline: string
  buttonText: string
  buttonLink?: string
}>()

const localePath = useLocalePath()
</script>

<template>
  <UiCard class="grid border-border" :class="{ 'opacity-50': !buttonLink }">
    <UiCardHeader>
      <UiCardTitle class="text-center">{{ headline }}</UiCardTitle>
    </UiCardHeader>
    <UiCardContent class="text-center">
      <slot></slot>
    </UiCardContent>
    <UiCardFooter class="self-end">
      <Button
        v-if="buttonLink"
        :as="NuxtLink"
        :to="localePath(buttonLink)"
        class="w-full"
      >
        {{ buttonText }}
      </Button>
      <Button v-else disabled class="w-full">
        {{ buttonText }}
      </Button>
    </UiCardFooter>
  </UiCard>
</template>
