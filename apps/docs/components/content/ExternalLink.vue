<script setup lang="ts">
defineProps<{
  href: string
  content?: string
}>()
</script>

<template>
  <a
    class="external"
    :href="href"
    rel="nofollow noopener noreferrer"
    target="_blank"
  >
    <slot>{{ content }}</slot>
  </a>
</template>
