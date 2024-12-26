<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@karagoz/shared'
import { FunctionalComponent } from 'vue'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  icon?: FunctionalComponent
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
