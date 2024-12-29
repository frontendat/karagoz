<script setup lang="ts">
import { Button, LoadingIndicator } from '@karagoz/shared'
import { Eye, RotateCw } from 'lucide-vue-next'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSandbox } from '../composables'
import KrgzTabIcon from './KrgzTabIcon.vue'

/**
 * Renders the result preview iframe and, if enabled, an address bar showing the current URL of the preview.
 *
 * This component takes no props and emits no events since it gets all it needs to operate by calling `useSandbox()`.
 */
defineOptions({})

const { t } = useI18n()
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
          <a
            class="text-muted-foreground"
            :href="currentUrl"
            dir="ltr"
            target="_blank"
          >
            {{ currentUrlDisplay }}
          </a>
        </div>
        <Button size="sm" variant="ghost" @click="onReloadClick">
          <KrgzTabIcon
            class="size-3"
            :icon="RotateCw"
            :tooltip="t('krgz.sandbox.panel.preview.reload')"
          />
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
      :label="t('krgz.sandbox.loading.preview')"
      variant="secondary"
    >
      <Eye class="size-12" />
    </LoadingIndicator>
  </div>
</template>
