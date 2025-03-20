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
const installationCompleted = ref(false)

const { data: snapshot } = await useFetch<FileSystemTree>(
  '/api/snapshot/express',
)

onMounted(async () => {
  if (!snapshot.value) return
  // Ensure injected promise has been resolved
  const container = await boot
  // Continue initialisation
  await container.mount(await snapshot.value)
  sandbox.editorTabs.open('./public/index.html')
  buttonsDisabled.value = false
})

onBeforeUnmount(() => sandbox.container.value?.teardown())

const installDeps = async () => {
  await sandbox.processTabs.open('npm install', 'Install Dependencies', {
    command: 'npm',
    args: ['install'],
    suppressClose: true,
    suppressInput: true,
  })
  // we await to correctly set installationCompleted flag
  await sandbox.processTabs.findTab('npm install')?.context?.process?.exit
  installationCompleted.value = true
}

const startDevServer = () => {
  sandbox.processTabs.close('npm install')
  // No need to await here because nothing depends on finishing this process
  sandbox.processTabs.open('npm start', 'Dev Server', {
    command: 'npm',
    args: ['start'],
    canRestart: true,
    canStop: true,
    suppressInput: true,
  })
}

const openTerminal = () => {
  sandbox.processTabs.open('terminal', 'Terminal', {
    command: 'jsh',
    isTerminal: true,
  })
}

const closeTerminal = () => {
  sandbox.processTabs.close('terminal')
}
</script>

<template>
  <div class="flex flex-col h-full">
    <div v-show="!isBooting" class="border-b flex flex-wrap gap-2 p-2">
      <Button
        :disabled="buttonsDisabled"
        size="xs"
        variant="secondary"
        @click="installDeps"
        >Install dependencies</Button
      >
      <Button
        :disabled="buttonsDisabled || !installationCompleted"
        size="xs"
        variant="secondary"
        @click="startDevServer"
        >Start dev server</Button
      >
      <Button
        :disabled="buttonsDisabled"
        size="xs"
        variant="secondary"
        @click="openTerminal"
        >Open terminal</Button
      >
      <Button
        :disabled="buttonsDisabled"
        size="xs"
        variant="secondary"
        @click="closeTerminal"
        >Close terminal</Button
      >
    </div>
    <div class="flex-grow">
      <KrgzSandbox
        :booting="isBooting"
        hide-solve-button
        :shown-panels="['code', 'processes', 'result', 'terminal']"
      ></KrgzSandbox>
    </div>
  </div>
</template>
