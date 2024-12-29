<script setup lang="ts">
import '@xterm/xterm/css/xterm.css'

import { useDark } from '@vueuse/core'
import type { FitAddon } from '@xterm/addon-fit'
import type { Terminal } from '@xterm/xterm'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useSandbox } from '../composables'
import { ProcessTabContext, Tab } from '../types'
import { xtermDefaultTheme } from '../utils/xterm.ts'

/**
 * Renders the output of a process / terminal using `xterm` and, if enabled, allows input into it.
 */
defineOptions({})

const props = defineProps<{
  /**
   * Tab to render.
   */
  tab: Tab<ProcessTabContext>
}>()

const { options, processTabs } = useSandbox()
const context = computed(() => props.tab.context)
const process = computed(() => context.value?.process)
const fitAddon = ref<FitAddon>()
const terminal = ref<Terminal>()
const terminalEl = ref()
const isDark = useDark()
const themeKey = computed(() => (isDark.value ? 'dark' : 'light'))
const theme = computed(
  () =>
    options.terminal.theme?.[themeKey.value]?.() ??
    xtermDefaultTheme[themeKey.value],
)

watch(theme, () => {
  if (terminal.value?.options) {
    terminal.value.options.theme = theme.value
  }
})

watch(
  () => props.tab?.context?.exitCode,
  (code) => {
    if (code !== undefined) {
      terminal.value?.write(`\n\nExit code: ${code}`)
    }
  },
)

onMounted(async () => {
  await nextTick()

  // Create instances.
  // Async imports needed to avoid errors in Nuxt.
  fitAddon.value = new (await import('@xterm/addon-fit')).FitAddon()
  terminal.value = new (await import('@xterm/xterm')).Terminal({
    convertEol: true,
    theme: theme.value,
  })

  // Bind add-on and open terminal.
  terminal.value.loadAddon(fitAddon.value)
  terminal.value.open(terminalEl.value)
  fitAddon.value.fit()

  // Render old logs if they exist.
  context.value?.logs?.map((data) => terminal.value?.write(data))

  // Set `processOutputHandler` to access new logs and pass them to terminal.
  processTabs.updateContext(props.tab.id, (ctx) => ({
    ...ctx,
    processOutputHandler: (data) => terminal.value?.write(data),
  }))

  // Handle user input.
  terminal.value.onData((data) => {
    if (context.value?.suppressInput) return
    context.value?.processInputHandler?.(data)
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
