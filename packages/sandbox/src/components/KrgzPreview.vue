<script setup lang="ts">
import {
  Button,
  LoadingIndicator,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@karagoz/shared'
import { Eye, Logs, RotateCw } from 'lucide-vue-next'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSandbox } from '../composables'
import type { ConsoleLogEntry } from '../types'
import KrgzPreviewConsole from './KrgzPreviewConsole.vue'
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

const showConsole = ref(false)
const consoleLogs = ref<ConsoleLogEntry[]>([])

const onPreviewReady = () => {
  previewReady.value = true
  // A real page load (as opposed to a hash change) supersedes previously logged messages.
  consoleLogs.value = []
}

const onMessage = (message: MessageEvent) => {
  if (message.origin !== sandbox.preview.url.value) return
  // Set current preview frame URL to be displayed in the address bar.
  if (message.data?.type === 'navigation' && message.data?.href) {
    currentUrl.value = message.data.href
  }
  // Collect log messages to be displayed in the console panel.
  if (message.data?.type === 'console') {
    consoleLogs.value = [
      ...consoleLogs.value,
      { args: message.data.args ?? [], level: message.data.level ?? 'log' },
    ]
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
    <ResizablePanelGroup
      auto-save-id="krgz-preview"
      class="h-full"
      direction="vertical"
    >
      <ResizablePanel :default-size="showConsole ? 70 : 100">
        <div class="flex flex-col h-full">
          <div
            v-if="!sandbox.preview.suppressAddressBar.value"
            class="bg-muted flex"
          >
            <div
              class="flex-grow self-center overflow-ellipsis overflow-hidden p-2 text-xs whitespace-nowrap"
            >
              <a
                class="text-muted-foreground no-underline"
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
            <Button
              size="sm"
              variant="ghost"
              @click="showConsole = !showConsole"
            >
              <KrgzTabIcon
                class="size-3"
                :icon="Logs"
                :tooltip="t('krgz.sandbox.panel.preview.console')"
              />
            </Button>
          </div>
          <iframe
            ref="previewFrame"
            :src="sandbox.preview.url.value"
            class="flex-grow w-full"
          ></iframe>
        </div>
      </ResizablePanel>
      <template v-if="showConsole">
        <ResizableHandle />
        <ResizablePanel :default-size="30">
          <KrgzPreviewConsole :logs="consoleLogs" @clear="consoleLogs = []" />
        </ResizablePanel>
      </template>
    </ResizablePanelGroup>
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
