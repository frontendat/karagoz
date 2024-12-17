<script setup lang="ts">
import { RefreshCw } from 'lucide-vue-next'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

import { cn } from '@/utils'

import { type LoadingIndicatorVariants, loadingIndicatorVariants } from '.'

interface Props extends PrimitiveProps {
  variant?: LoadingIndicatorVariants['variant']
  size?: LoadingIndicatorVariants['size']
  class?: HTMLAttributes['class']
  label?: string
  suppressSpinner?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(loadingIndicatorVariants({ variant, size }), props.class)"
  >
    <slot />
    <div class="flex gap-2 items-center">
      <RefreshCw v-if="!suppressSpinner" class="animate-spin size-3" />
      <span v-if="label">
        {{ label }}
      </span>
    </div>
  </Primitive>
</template>
