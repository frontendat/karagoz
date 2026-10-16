<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/utils'

import { alertTitleClass } from '.'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h5 :class="cn(alertTitleClass, props.class)">
    <slot />
  </h5>
</template>
