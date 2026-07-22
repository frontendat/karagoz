<script setup lang="ts">
import {
  DropdownMenuItem,
  type DropdownMenuItemEmits,
  type DropdownMenuItemProps,
  useForwardPropsEmits,
} from 'radix-vue'
import { cn } from '@/utils'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  DropdownMenuItemProps & { class?: HTMLAttributes['class'] }
>()

const emits = defineEmits<DropdownMenuItemEmits>()

const delegatedProps = computed(() => {
  const { class: _class, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DropdownMenuItem
    v-bind="forwarded"
    :class="
      cn(
        'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuItem>
</template>
