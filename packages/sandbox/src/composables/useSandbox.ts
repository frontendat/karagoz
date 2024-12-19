import { asyncComputed, createSharedComposable } from '@vueuse/core'
import { reloadPreview as wcReloadPreview } from '@webcontainer/api'
import { computed, reactive, ref } from 'vue'

import { sandboxKnownProcesses, SandboxOptions } from '../types/Sandbox.ts'
import { strToCmd } from '../utils/strToCmd.ts'
import { injectWebContainer } from '../utils/WebContainer.ts'
import { useSandboxProcessTabs } from './useSandboxProcessTabs.ts'
import { useSandboxTabs } from './useSandboxTabs.ts'

function useSandboxInternal() {
  const container = asyncComputed(async () => {
    const c = await injectWebContainer()
    // Hook into the server-ready event to update the previewUrl
    c.on('server-ready', (_, url) => (previewUrl.value = url))
    return c
  }, null)
  const previewFrame = ref<HTMLIFrameElement>()
  const previewUrl = ref<string>()

  const editorTabs = useSandboxTabs()
  const processTabs = useSandboxProcessTabs()

  const options = reactive<SandboxOptions>({
    processStarters: {
      install: () =>
        processTabs.open(
          sandboxKnownProcesses.install,
          'Install',
          strToCmd(sandboxKnownProcesses.install),
        ),
      devServer: () =>
        processTabs.open(
          sandboxKnownProcesses.devServer,
          'Dev Server',
          strToCmd(sandboxKnownProcesses.devServer),
        ),
      terminal: () => {
        const terminalNr =
          processTabs.tabs.value.filter(
            ({ context }) => !context?.isHidden && context?.isTerminal,
          ).length + 1
        return processTabs.open(
          `${sandboxKnownProcesses.terminal}-${terminalNr}`,
          `Terminal (${terminalNr})`,
          {
            ...strToCmd(sandboxKnownProcesses.terminal),
            isTerminal: true,
          },
        )
      },
    },
  })

  const setOption = <
    K extends keyof SandboxOptions,
    T extends SandboxOptions[K],
  >(
    key: K,
    newValueOrSetter: T | ((oldValue: T) => T),
  ) => {
    if (typeof newValueOrSetter === 'function') {
      options[key] = newValueOrSetter(options[key] as T)
    } else {
      options[key] = newValueOrSetter
    }
  }

  const bootstrap = async () => {
    await options.processStarters.install?.()
    await processTabs.findTab(sandboxKnownProcesses.install)?.context?.process
      ?.exit
    await options.processStarters.devServer?.()
    await options.processStarters.terminal?.()
  }

  const reloadPreview = () => {
    if (previewFrame.value) {
      wcReloadPreview(previewFrame.value)
    }
  }

  return {
    bootstrap,
    container: computed(() => container.value),
    editorTabs,
    previewFrame,
    previewUrl: computed(() => previewUrl.value ?? ''),
    processTabs,
    reloadPreview,
    setOption,
  }
}

export const useSandbox = createSharedComposable(useSandboxInternal)
