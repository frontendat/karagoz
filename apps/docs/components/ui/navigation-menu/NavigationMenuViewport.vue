<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  NavigationMenuViewport,
  type NavigationMenuViewportProps,
  useForwardProps,
} from 'radix-vue'
import { useMutationObserver } from '@vueuse/core'
import { computed, ref, watch, type HTMLAttributes } from 'vue'

const props = defineProps<NavigationMenuViewportProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

const wrapperRef = ref<HTMLElement | null>(null)
const contentWidth = ref<number | undefined>(undefined)
const contentHeight = ref<number | undefined>(undefined)

let resizeObserver: ResizeObserver | null = null

function trackContent(wrapper: HTMLElement) {
  resizeObserver?.disconnect()
  resizeObserver = null

  const openItem = wrapper.querySelector('[data-state=open]')
  const content = openItem?.children[0] as HTMLElement | undefined

  if (content) {
    contentWidth.value = content.offsetWidth
    contentHeight.value = content.offsetHeight
    resizeObserver = new ResizeObserver(() => {
      contentWidth.value = content.offsetWidth
      contentHeight.value = content.offsetHeight
    })
    resizeObserver.observe(content)
  } else {
    contentWidth.value = undefined
    contentHeight.value = undefined
  }
}

useMutationObserver(
  wrapperRef,
  () => {
    if (wrapperRef.value) trackContent(wrapperRef.value)
  },
  { childList: true, subtree: true, attributes: true, attributeFilter: ['data-state'] },
)

watch(wrapperRef, (el) => {
  if (el) trackContent(el)
})

const viewportStyle = computed(() => {
  const style: Record<string, string> = {}
  if (contentWidth.value !== undefined) style.width = `${contentWidth.value}px`
  if (contentHeight.value !== undefined) style.height = `${contentHeight.value}px`
  return style
})
</script>

<template>
  <div ref="wrapperRef" class="absolute left-0 top-full flex justify-center">
    <NavigationMenuViewport
      v-bind="forwardedProps"
      :style="viewportStyle"
      :class="
        cn(
          'origin-top-center relative mt-1.5 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90',
          props.class,
        )
      "
    />
  </div>
</template>
