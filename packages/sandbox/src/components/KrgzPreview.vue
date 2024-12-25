<script setup lang="ts">
import { Button, LoadingIndicator } from '@karagoz/shared'
import { Eye, RefreshCw } from 'lucide-vue-next'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import { useSandbox } from '../composables'

const sandbox = useSandbox()
const previewFrame = sandbox.preview.frame
const previewReady = ref(false)
const currentUrl = ref<string>()
const currentUrlDisplay = computed(
  () =>
    currentUrl.value?.replace(
      /(https:\/\/)(.+)(.webcontainer-api.io)/,
      '$1..$3',
    ) ?? '',
)

const onPreviewReady = () => (previewReady.value = true)

const onMessage = (message: MessageEvent) => {
  if (message.origin !== sandbox.preview.url.value) return
  // Set current preview frame URL to be displayed in the address bar.
  if (message.data?.type === 'navigation' && message.data?.href) {
    currentUrl.value = message.data.href
  }
}

const onReloadClick = () => {
  if (previewFrame.value && currentUrl.value) {
    previewFrame.value.src = 'about:blank'
    previewFrame.value.src = currentUrl.value
  }
}

onMounted(async () => {
  await nextTick()
  previewFrame.value?.addEventListener('load', onPreviewReady)
  window.addEventListener('message', onMessage)
})

onBeforeUnmount(() => {
  previewFrame.value?.removeEventListener('load', onPreviewReady)
  window.removeEventListener('message', onMessage)
})
</script>

<template>
  <div class="h-full relative w-full">
    <div class="flex flex-col h-full">
      <div
        v-if="!sandbox.preview.suppressAddressBar.value"
        class="bg-muted flex"
      >
        <div
          class="flex-grow self-center overflow-ellipsis overflow-hidden p-2 text-xs whitespace-nowrap"
        >
          <a class="text-muted-foreground" :href="currentUrl" target="_blank">
            {{ currentUrlDisplay }}
          </a>
        </div>
        <Button size="sm" variant="ghost" @click="onReloadClick">
          <RefreshCw class="size-3" />
        </Button>
      </div>
      <iframe
        ref="previewFrame"
        :src="sandbox.preview.url.value"
        class="flex-grow w-full"
      ></iframe>
    </div>
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
