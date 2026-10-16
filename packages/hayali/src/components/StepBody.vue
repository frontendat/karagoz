<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render'

import { calloutPlugin, createCalloutRegistry } from '../callouts'

defineProps<{
  /** Step markdown body. */
  body: string
}>()

const plugins = [calloutPlugin(createCalloutRegistry())]
</script>

<template>
  <VueMarkdown
    class="prose dark:prose-invert"
    data-testid="step-body"
    :plugins="plugins"
    :source="body"
  />
</template>
