<script setup lang="ts">
import '@xterm/xterm/css/xterm.css'

import { FitAddon } from '@xterm/addon-fit'
import { Terminal } from '@xterm/xterm'
import { computed, nextTick, ref, watch } from 'vue'

import { ProcessTabContext, Tab } from '../types'

const props = defineProps<{
  tab: Tab<ProcessTabContext>
}>()

const terminalEl = ref()

const process = computed(() => props.tab.context?.process)

watch(
  process,
  async () => {
    await nextTick()
    if (!process.value) return

    const fitAddon = new FitAddon()
    const terminal = new Terminal({
      convertEol: true,
    })
    terminal.loadAddon(fitAddon)
    terminal.open(terminalEl.value)
    fitAddon.fit()

    process.value?.output.pipeTo(
      new WritableStream({
        write(data) {
          terminal.write(data)
        },
      }),
    )

    if (props.tab.context?.isTerminal) {
      const input = process.value.input.getWriter()
      terminal.onData((data) => {
        input.write(data)
      })
    }

    const onWindowResize = (): void => {
      fitAddon.fit()
      process.value?.resize({
        cols: terminal.cols,
        rows: terminal.rows,
      })
    }

    window.addEventListener('resize', onWindowResize)

    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div ref="terminalEl"></div>
</template>
