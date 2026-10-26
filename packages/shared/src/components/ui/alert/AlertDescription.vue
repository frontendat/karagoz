<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/utils'

import { alertDescriptionClass } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn(alertDescriptionClass, props.class)">
    <slot />
  </div>
</template>
