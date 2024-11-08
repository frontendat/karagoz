<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render'

defineProps<{
  explanation: string
}>()
</script>

<template>
  <VueMarkdown
    class="prose dark:prose-invert"
    :source="explanation"
  ></VueMarkdown>
</template>
