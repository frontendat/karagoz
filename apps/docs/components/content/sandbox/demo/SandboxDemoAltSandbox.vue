<script setup lang="ts">
import {
  KrgzEditorTabs,
  KrgzPreview,
  provideWebContainer,
  useSandbox,
  useSandboxBoot,
} from '@karagoz/sandbox'
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
  sandbox.setOption('editor', { suppressClose: true })
  await sandbox.bootstrap()
  sandbox.editorTabs.open('./public/index.html')
})

onBeforeUnmount(() => sandbox.container.value?.teardown())
</script>

<template>
  <div class="grid grid-cols-2 h-full">
    <div class="border-r">
      <KrgzEditorTabs v-if="!isBooting" />
    </div>
    <div>
      <KrgzPreview v-if="!isBooting" />
    </div>
  </div>
</template>
