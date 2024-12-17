<script setup lang="ts">
import { LoadingIndicator } from '@karagoz/shared'
import { Eye } from 'lucide-vue-next'
import { nextTick, onMounted, ref } from 'vue'

import { useKaragozSandbox } from '../composables/useKaragozSandbox.ts'

const sandbox = useKaragozSandbox()
const previewFrame = sandbox.previewFrame
const previewReady = ref(false)

onMounted(async () => {
  await nextTick()
  previewFrame.value?.addEventListener(
    'load',
    () => (previewReady.value = true),
  )
})
</script>

<template>
  <div class="h-full relative w-full">
    <iframe
      ref="previewFrame"
      :src="sandbox.previewUrl.value"
      class="h-full w-full"
    ></iframe>
    <LoadingIndicator
      v-if="!previewReady"
      class="absolute inset-0"
      label="Preview loading..."
      variant="secondary"
    >
      <Eye class="size-12" />
    </LoadingIndicator>
  </div>
</template>
