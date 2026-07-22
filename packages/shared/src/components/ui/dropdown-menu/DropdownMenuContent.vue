<script setup lang="ts">
import {
  DropdownMenuContent,
  type DropdownMenuContentProps,
  DropdownMenuPortal,
  type DropdownMenuPortalProps,
} from 'radix-vue'
import { cn } from '@/utils'
import { computed, type HTMLAttributes } from 'vue'

const props = withDefaults(
  defineProps<
    DropdownMenuContentProps & {
      class?: HTMLAttributes['class']
      portal?: DropdownMenuPortalProps
    }
  >(),
  {
    sideOffset: 4,
  },
)

const delegatedProps = computed(() => {
  const { class: _class, portal: _portal, ...delegated } = props

  return delegated
})
</script>

<template>
  <DropdownMenuPortal v-bind="portal">
    <DropdownMenuContent
      v-bind="delegatedProps"
      :class="
        cn(
          'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
