import { asyncComputed, createSharedComposable } from '@vueuse/core'
import { type IFSWatcher, reloadPreview } from '@webcontainer/api'
import { computed, reactive, readonly, ref } from 'vue'

import type { SandboxOptions } from '../types/Sandbox.ts'
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
  const options: SandboxOptions = reactive({
    editor: {
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
    preview: {},
    process: {
      commands: {
        install: 'npm install',
        devServer: 'npm start',
        terminal: 'jsh',
      },
      packageManager: 'npm',
      starters: {
        install: () =>
          processTabs.open(options.process.commands.install, 'Install', {
            ...strToCmd(options.process.commands.install),
            suppressClose: true,
          }),
        devServer: () =>
          processTabs.open(options.process.commands.devServer, 'Dev Server', {
            ...strToCmd(options.process.commands.devServer),
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
            `${options.process.commands.terminal}-${terminalNr}`,
            'Terminal',
            {
              ...strToCmd(options.process.commands.terminal),
              isTerminal: true,
            },
          )
        },
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

  const setPackageManager = (
    pm: SandboxOptions['process']['packageManager'],
  ) => {
    if (pm === options.process.packageManager) return
    options.process.packageManager = pm
    switch (pm) {
      case 'npm':
        options.process.commands.install = 'npm install'
        options.process.commands.devServer = 'npm start'
        break
      case 'pnpm':
        options.process.commands.install = 'pnpm install'
        options.process.commands.devServer = 'pnpm start'
        break
      case 'yarn':
        options.process.commands.install = 'yarn'
        options.process.commands.devServer = 'yarn start'
        break
    }
  }

  const bootstrap = async () => {
    // Kill already running processes (need for reinstall).
    processTabs.close(options.process.commands.devServer)
    processTabs.close(options.process.commands.install)
    if (!watchers.value.reinstall) {
      // This code gets injected into every preview and helps emit the current URL to the parent window
      // to be shown in the address bar of the preview panel.
      await container.value?.setPreviewScript(`
        window.parent.postMessage({ type: 'navigation', href: window.location.href}, '*');
        window.addEventListener('hashchange', () => {
          window.parent.postMessage({ type: 'navigation', href: window.location.href}, '*');
        })
      `)
      // Open terminal first to avoid waiting for other processes.
      await options.process.starters?.terminal?.()
    }
    // Install dependencies.
    await options.process.starters?.install?.()
    // Wait for installation to finish.
    await processTabs.findTab(options.process.commands.install)?.context
      ?.process?.exit
    // Run dev-server.
    await options.process.starters?.devServer?.()
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

  return {
    bootstrap,
    container: computed(() => container.value),
    editorTabs,
    explorer,
    options: readonly(options),
    preview: {
      frame: previewFrame,
      reload: async () => {
        if (previewFrame.value) {
          await reloadPreview(previewFrame.value)
        }
      },
      suppressAddressBar: computed(() => options.preview.suppressAddressBar),
      url: computed(() => previewUrl.value ?? ''),
    },
    processTabs,
    setOption,
    setPackageManager,
  }
}

export const useSandbox = createSharedComposable(useSandboxInternal)
