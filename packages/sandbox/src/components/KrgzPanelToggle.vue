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

/**
 * Renders a panel toggle.
 *
 * This component is used to render panel toggles and additional functionality buttons
 * in the default layout component `KrgzSandbox`.
 */
defineOptions({})

defineProps<{
  /**
   * Render as a button and not a toggle.
   */
  asButton?: boolean
  /**
   * Initial status of the toggle.
   */
  pressed?: boolean
  /**
   * Label to be used as aria-label and tooltip content.
   */
  label: string
  /**
   * Which side the tooltip should be shown on.
   */
  side?: TooltipContentProps['side']
}>()

defineEmits<{
  /**
   * Emitted when the toggle / button is clicked.
   */
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
      <TooltipContent class="text-xs" :side="side ?? 'right'" :side-offset="5">
        {{ label }}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
