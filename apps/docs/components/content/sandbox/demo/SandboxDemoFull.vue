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

const { data: initialSnapshot } = await useFetch<FileSystemTree>(
  '/api/snapshot/express',
)

const { data: solveSnapshot, execute: fetchSolveSnapshot } =
  await useFetch<FileSystemTree>('/api/snapshot/express-solve', {
    immediate: false,
  })

onMounted(async () => {
  if (!initialSnapshot.value) return
  // Ensure injected promise has been resolved
  const container = await boot
  // Continue initialisation
  await container.mount(await initialSnapshot.value)
  await sandbox.bootstrap()
  sandbox.editorTabs.open('./public/index.html')
})

onBeforeUnmount(() => sandbox.container.value?.teardown())

const onSolveClick = async () => {
  await fetchSolveSnapshot()
  if (!solveSnapshot.value) return
  sandbox.container.value?.mount(await solveSnapshot.value)
}
</script>

<template>
  <KrgzSandbox
    :booting="isBooting"
    :shown-panels="['code', 'processes', 'result', 'terminal']"
    @solve="onSolveClick()"
  ></KrgzSandbox>
</template>
