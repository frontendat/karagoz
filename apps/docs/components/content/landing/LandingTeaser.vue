<script setup lang="ts">
import { Button } from '@karagoz/shared'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { NuxtLink } from '#components'

defineProps<{
  headline: string
  buttonText: string
  buttonLink?: string
}>()

const localePath = useLocalePath()
</script>

<template>
  <Card class="grid" :class="{ 'opacity-50': !buttonLink }">
    <CardHeader>
      <CardTitle class="text-center">{{ headline }}</CardTitle>
    </CardHeader>
    <CardContent class="text-center">
      <slot></slot>
    </CardContent>
    <CardFooter class="self-end">
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
    </CardFooter>
  </Card>
</template>
