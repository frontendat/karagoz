<script setup lang="ts">
import {
  KrgzSandbox,
  provideWebContainer,
  useSandbox,
  useSandboxBoot,
} from '@karagoz/sandbox'
import { Button } from '@karagoz/shared'
import type { FileSystemTree } from '@webcontainer/api'
import { onBeforeUnmount, onMounted } from 'vue'

const { boot, isBooting } = useSandboxBoot()
provideWebContainer(boot)

const sandbox = useSandbox()
const buttonsDisabled = ref(true)

const { data: snapshot } = await useFetch<FileSystemTree>(
  '/api/snapshot/express',
)

onMounted(async () => {
  if (!snapshot.value) return
  // Ensure injected promise has been resolved
  const container = await boot
  // Continue initialisation
  await container.mount(await snapshot.value)
  await sandbox.bootstrap()
  sandbox.editorTabs.open('./server.js')
  buttonsDisabled.value = false
})

onBeforeUnmount(() => sandbox.container.value?.teardown())
</script>

<template>
  <div class="flex flex-col h-full">
    <div v-show="!isBooting" class="border-b flex flex-wrap gap-2 p-2">
      <Button
        :disabled="buttonsDisabled"
        size="xs"
        variant="secondary"
        @click="sandbox.editorViews.highlightLines(6)"
        >Highlight line 6</Button
      >
      <Button
        :disabled="buttonsDisabled"
        size="xs"
        variant="secondary"
        @click="sandbox.editorViews.highlightLines([11, 13])"
        >Highlight lines 11-13</Button
      >
      <Button
        :disabled="buttonsDisabled"
        size="xs"
        variant="secondary"
        @click="
          sandbox.editorViews.highlightLines([5, 7], './public/style.css')
        "
        >Highlight style.css lines 5-7</Button
      >
      <Button
        :disabled="buttonsDisabled"
        size="xs"
        variant="secondary"
        @click="sandbox.editorViews.scrollToLine(11)"
        >Scroll to line 11</Button
      >
      <Button
        :disabled="buttonsDisabled"
        size="xs"
        variant="secondary"
        @click="sandbox.editorViews.clearHighlightedLines()"
        >Clear current tab's highlights</Button
      >
      <Button
        :disabled="buttonsDisabled"
        size="xs"
        variant="secondary"
        @click="sandbox.editorViews.clearAllHighlightedLines()"
        >Clear all highlights</Button
      >
    </div>
    <div class="flex-grow">
      <KrgzSandbox
        :booting="isBooting"
        hide-solve-button
        multi-panel-from="xl"
      ></KrgzSandbox>
    </div>
  </div>
</template>
