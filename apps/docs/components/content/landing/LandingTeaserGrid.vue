<script setup lang="ts">
defineProps<{
  count: number
}>()
</script>

<template>
  <div
    class="grid gap-8 justify-stretch items-stretch mx-auto max-w-[760px] pb-8 md:pb-12 lg:pb-24"
    :style="{ '--teaser-count': count }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  @screen md {
    grid-template-columns: repeat(var(--teaser-count, 2), minmax(0, 1fr));
  }
}
</style>
