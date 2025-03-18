<script setup lang="ts">
import {
  KrgzSandbox,
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
  await sandbox.bootstrap()
  sandbox.editorTabs.open('./public/index.html')
})

onBeforeUnmount(() => sandbox.container.value?.teardown())
</script>

<template>
  <KrgzSandbox :booting="isBooting" hide-solve-button>
    <template #explorer>
      <div class="p-1 text-sm">
        Your files:
        <ul class="list-disc list-inside">
          <li>
            <a
              href="#"
              @click.prevent="sandbox.editorTabs.open('./public/index.html')"
              >HTML</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="sandbox.editorTabs.open('./public/script.js')"
              >JS</a
            >
          </li>
          <li>
            <a
              href="#"
              @click.prevent="sandbox.editorTabs.open('./public/style.css')"
              >CSS</a
            >
          </li>
        </ul>
      </div>
    </template>
  </KrgzSandbox>
</template>
