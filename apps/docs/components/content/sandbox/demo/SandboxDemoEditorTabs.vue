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
  sandbox.editorTabs.open('./public/index.html')
})

onBeforeUnmount(() => sandbox.container.value?.teardown())

const showDialog = (message: number | string) => alert(message)
</script>

<template>
  <div class="flex flex-col h-full">
    <div v-show="!isBooting" class="border-b flex flex-wrap gap-2 p-2">
      <Button
        size="xs"
        variant="secondary"
        @click="sandbox.editorTabs.open('./public/style.css')"
        >Open style.css</Button
      >
      <Button
        size="xs"
        variant="secondary"
        @click="sandbox.editorTabs.close('./public/style.css')"
        >Close style.css</Button
      >
      <Button
        size="xs"
        variant="secondary"
        @click="sandbox.editorTabs.open('./server.js', 'SERVER FILE')"
        >Open server.js with label</Button
      >
      <Button
        size="xs"
        variant="secondary"
        @click="
          sandbox.editorTabs.open('./package-lock.json', undefined, {
            suppressClose: true,
          })
        "
        >Open non-closable lock-file</Button
      >
      <Button
        size="xs"
        variant="secondary"
        @click="showDialog(sandbox.editorTabs.tabs.value.length)"
        >Alert number of tabs</Button
      >
      <Button
        size="xs"
        variant="secondary"
        @click="showDialog(sandbox.editorTabs.current.value?.id ?? 'n/a')"
        >Alert current tab path</Button
      >
      <Button
        size="xs"
        variant="secondary"
        @click="
          showDialog(
            sandbox.editorTabs.findTab('./package.json')
              ? 'package.json is open'
              : 'package.json is not open',
          )
        "
        >Alert whether package.json is open</Button
      >
    </div>
    <div class="flex-grow">
      <KrgzSandbox :booting="isBooting" hide-solve-button></KrgzSandbox>
    </div>
  </div>
</template>
