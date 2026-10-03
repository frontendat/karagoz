<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  NavigationMenuViewport,
  type NavigationMenuViewportProps,
  useForwardProps,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<
    NavigationMenuViewportProps & {
      align?: 'start' | 'end'
      class?: HTMLAttributes['class']
    }
  >(),
  { align: 'start' },
)

const delegatedProps = computed(() => {
  const { align: _align, class: _, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <div
    :class="[
      'absolute top-full flex justify-center',
      align === 'end' ? 'end-0' : 'start-0',
    ]"
  >
    <NavigationMenuViewport
      v-bind="forwardedProps"
      :class="
        cn(
          'origin-top-center relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-(--radix-navigation-menu-viewport-width)',
          props.class,
        )
      "
    />
  </div>
</template>
