<script setup lang="ts">
import { useKaragozSandbox } from '../composables/useKaragozSandbox.ts'

const sandbox = useKaragozSandbox()
const previewFrame = sandbox.previewFrame
</script>

<template>
  <iframe
    v-if="sandbox.previewUrl.value"
    ref="previewFrame"
    :src="sandbox.previewUrl.value"
    class="h-full w-full"
  ></iframe>
  <div v-else>Initialising...</div>
</template>
