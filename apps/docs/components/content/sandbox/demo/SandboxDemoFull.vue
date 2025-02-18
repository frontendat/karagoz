<script setup lang="ts">
import {
  KrgzSandbox,
  provideWebContainer,
  useSandbox,
  useSandboxBoot,
} from '@karagoz/sandbox'
import { onBeforeUnmount, onMounted } from 'vue'

const { boot, isBooting } = useSandboxBoot()
provideWebContainer(boot)

const sandbox = useSandbox()

const { data: initialSnapshot } = await useFetch<Response>(
  '/api/snapshot/express',
  {
    headers: { Accept: 'application/octet-stream' },
    responseType: 'blob',
  },
)

const { data: solveSnapshot, execute: fetchSolveSnapshot } =
  await useFetch<Response>('/api/snapshot/express-solve', {
    headers: { Accept: 'application/octet-stream' },
    immediate: false,
    responseType: 'blob',
  })

onMounted(async () => {
  if (!initialSnapshot.value) return
  // Ensure injected promise has been resolved
  const container = await boot
  // Continue initialisation
  await container.mount(await initialSnapshot.value.arrayBuffer())
  await sandbox.bootstrap()
  sandbox.editorTabs.open('./public/index.html')
})

onBeforeUnmount(() => sandbox.container.value?.teardown())

const onSolveClick = async () => {
  await fetchSolveSnapshot()
  if (!solveSnapshot.value) return
  sandbox.container.value?.mount(await solveSnapshot.value.arrayBuffer())
}
</script>

<template>
  <KrgzSandbox
    :booting="isBooting"
    :shown-panels="['code', 'processes', 'result', 'terminal']"
    @solve="onSolveClick()"
  ></KrgzSandbox>
</template>
