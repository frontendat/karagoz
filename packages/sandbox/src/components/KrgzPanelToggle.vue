<script setup lang="ts">
import {
  Button,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@karagoz/shared'
import { TooltipContentProps } from 'radix-vue'

defineProps<{
  asButton?: boolean
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
    <Tooltip :delay-duration="0">
      <TooltipTrigger>
        <Button
          v-if="asButton"
          :aria-label="label"
          class="w-full"
          size="icon"
          variant="outline"
          @click="$emit('press')"
        >
          <slot />
        </Button>
        <Toggle
          v-else
          :aria-label="label"
          :pressed="pressed || undefined"
          variant="outline"
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
