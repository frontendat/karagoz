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

onMounted(async () => {
  // Ensure injected promise has been resolved
  const container = await boot

  // Mount shell script to perform extra steps before bootstrapping
  await container.mount({
    'prepare.sh': {
      file: {
        contents: [
          'mv ./my-react-app/* ./my-react-app/.* ./',
          'rmdir ./my-react-app',
          'rm prepare.sh',
        ].join('\n'),
      },
    },
  })

  // Set start script
  sandbox.setOption('process', (old) => ({
    ...old,
    commands: {
      ...old.commands,
      devServer: 'npm run dev',
    },
  }))

  // Generate react app
  await sandbox.processTabs.open('npm create', 'Generating React App', {
    command: 'npm',
    args: 'create vite@latest my-react-app -y -- --template react'.split(' '),
    suppressClose: true,
    suppressInput: true,
  })
  await sandbox.processTabs.findTab('npm create')?.context?.process?.exit
  sandbox.processTabs.close('npm create')

  // Perform remaining steps before bootstrapping
  await sandbox.processTabs.open('prepare', 'Prepare', {
    command: 'jsh',
    args: ['prepare.sh'],
    isHidden: true,
  })

  // Hand over to bootstrap()
  await sandbox.bootstrap()

  sandbox.editorTabs.open('./src/App.jsx')
})

onBeforeUnmount(() => sandbox.container.value?.teardown())
</script>

<template>
  <KrgzSandbox
    :booting="isBooting"
    hide-solve-button
    :shown-panels="['code', 'processes', 'result']"
  ></KrgzSandbox>
</template>
