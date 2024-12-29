<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@karagoz/shared'
import { FunctionalComponent } from 'vue'

/**
 * Tab icon.
 *
 * Renders an icon next to the lable of a tab and shows the provided tooltip on hover.
 */
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  /**
   * Icon to show. Should be imported from `lucide-vue-next`.
   */
  icon?: FunctionalComponent
  /**
   * Tooltip to show on hover.
   */
  tooltip?: string
}>()
</script>

<template>
  <TooltipProvider>
    <Tooltip :delay-duration="0">
      <TooltipTrigger as-child>
        <slot>
          <component
            :is="icon"
            v-if="icon"
            v-bind="$attrs"
            :class="$attrs?.class ?? 'h-4 opacity-50 w-4 hover:opacity-100'"
            :aria-label="tooltip"
          ></component>
        </slot>
      </TooltipTrigger>
      <TooltipContent class="text-xs" side="bottom" :side-offset="12">
        <slot name="tooltip">{{ tooltip }}</slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
