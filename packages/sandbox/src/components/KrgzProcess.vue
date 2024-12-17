<script setup lang="ts">
import '@xterm/xterm/css/xterm.css'

import { FitAddon } from '@xterm/addon-fit'
import { Terminal } from '@xterm/xterm'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import { useKaragozSandbox } from '../composables/useKaragozSandbox.ts'
import { ProcessTabContext, Tab } from '../types'

const props = defineProps<{
  tab: Tab<ProcessTabContext>
}>()

const { processTabs } = useKaragozSandbox()
const process = computed(() => props.tab.context?.process)
const fitAddon = ref<FitAddon>()
const terminal = ref<Terminal>()
const terminalEl = ref()

onMounted(async () => {
  await nextTick()

  // Create instances.
  fitAddon.value = new FitAddon()
  terminal.value = new Terminal({
    convertEol: true,
  })

  // Bind add-on and open terminal.
  terminal.value.loadAddon(fitAddon.value)
  terminal.value.open(terminalEl.value)
  fitAddon.value.fit()

  // Render old logs if they exist.
  props.tab.context?.logs?.map((data) => terminal.value?.write(data))

  // Set `processOutputHandler` to access new logs and pass them to terminal.
  processTabs.updateContext(props.tab.id, (ctx) => ({
    ...ctx,
    processOutputHandler: (data) => terminal.value?.write(data),
  }))

  // Handle user input.
  terminal.value.onData((data) => {
    props.tab?.context?.processInputHandler?.(data)
  })

  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})

const onWindowResize = (): void => {
  fitAddon.value?.fit()
  process.value?.resize({
    cols: terminal.value?.cols ?? 80,
    rows: terminal.value?.rows ?? 20,
  })
}
</script>

<template>
  <div ref="terminalEl" class="h-full"></div>
</template>
