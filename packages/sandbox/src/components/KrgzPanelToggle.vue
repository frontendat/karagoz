<script setup lang="ts">
import {
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@karagoz/shared'
import { TooltipContentProps } from 'radix-vue'

defineProps<{
  pressed?: boolean
  label: string
  side?: TooltipContentProps['side']
}>()

defineEmits<{
  (e: 'press'): void
}>()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Toggle
          :aria-label="label"
          :pressed="pressed || undefined"
          @update:pressed="$emit('press')"
        >
          <slot />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent :side="side ?? 'right'" :side-offset="5">
        {{ label }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
