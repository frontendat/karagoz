import { asyncComputed, createSharedComposable } from '@vueuse/core'
import { IFSWatcher, reloadPreview as wcReloadPreview } from '@webcontainer/api'
import { computed, reactive, ref, toRefs } from 'vue'

import { sandboxKnownProcesses, SandboxOptions } from '../types/Sandbox.ts'
import { strToCmd } from '../utils/strToCmd.ts'
import { injectWebContainer } from '../utils/WebContainer.ts'
import { useSandboxEditorTabs } from './useSandboxEditorTabs.ts'
import { useSandboxExplorer } from './useSandboxExplorer.ts'
import { useSandboxProcessTabs } from './useSandboxProcessTabs.ts'

function useSandboxInternal() {
  const container = asyncComputed(async () => {
    const c = await injectWebContainer()
    // Hook into the server-ready event to update the previewUrl
    c.on('server-ready', (_, url) => (previewUrl.value = url))
    return c
  }, null)
  const previewFrame = ref<HTMLIFrameElement>()
  const previewUrl = ref<string>()
  const watchers = ref<{
    reinstall?: IFSWatcher
  }>({})

  // Default options
  const options = reactive<SandboxOptions>({
    editorTabs: {
      suppressClose: false,
    },
    explorer: {
      hidden: ['./node_modules/*'],
      readonly: [
        '*/node_modules',
        '*/package-lock.json',
        '*/pnpm-lock.yaml',
        '*/yarn.lock',
      ],
      reinstall: ['./package.json'],
    },
    processStarters: {
      install: () =>
        processTabs.open(sandboxKnownProcesses.install, 'Install', {
          ...strToCmd(sandboxKnownProcesses.install),
          suppressClose: true,
        }),
      devServer: () =>
        processTabs.open(sandboxKnownProcesses.devServer, 'Dev Server', {
          ...strToCmd(sandboxKnownProcesses.devServer),
          suppressClose: true,
        }),
      terminal: () => {
        const terminals = processTabs.tabs.value.filter(
          ({ context }) => !context?.isHidden && context?.isTerminal,
        )
        if ((options.terminal.maxCount ?? 0) <= terminals.length)
          return Promise.resolve()
        const terminalNr =
          Math.max(
            0,
            Math.max.apply(
              undefined,
              terminals.map(({ order }) => order),
            ),
          ) + 1
        return processTabs.open(
          `${sandboxKnownProcesses.terminal}-${terminalNr}`,
          'Terminal',
          {
            ...strToCmd(sandboxKnownProcesses.terminal),
            isTerminal: true,
          },
        )
      },
    },
    terminal: {
      maxCount: 3,
    },
  })

  const explorer = useSandboxExplorer(options)
  const editorTabs = useSandboxEditorTabs(options)
  const processTabs = useSandboxProcessTabs(options)

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
    // Kill already running processes (need for reinstall).
    processTabs.close(sandboxKnownProcesses.devServer)
    processTabs.close(sandboxKnownProcesses.install)
    // Open terminal first to avoid waiting for other processes.
    if (!watchers.value.reinstall) {
      await options.processStarters.terminal?.()
    }
    // Install dependencies.
    await options.processStarters.install?.()
    // Wait for installation to finish.
    await processTabs.findTab(sandboxKnownProcesses.install)?.context?.process
      ?.exit
    // Run dev-server.
    await options.processStarters.devServer?.()
    // Setup reinstall watcher.
    if (!watchers.value.reinstall) {
      watchers.value.reinstall = container.value?.fs.watch(
        '.',
        { recursive: true },
        async (event, filename) => {
          if (event === 'change' && typeof filename === 'string') {
            if (explorer.reinstall.value.ignores(`./${filename}`)) {
              await bootstrap()
            }
          }
        },
      )
    }
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
    explorer,
    options: toRefs(options),
    previewFrame,
    previewUrl: computed(() => previewUrl.value ?? ''),
    processTabs,
    reloadPreview,
    setOption,
  }
}

export const useSandbox = createSharedComposable(useSandboxInternal)
