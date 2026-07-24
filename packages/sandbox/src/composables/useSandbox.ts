import { asyncComputed, createSharedComposable } from '@vueuse/core'
import { type IFSWatcher, reloadPreview } from '@webcontainer/api'
import { computed, reactive, readonly, ref } from 'vue'

import type { SandboxOptions } from '../types/Sandbox.ts'
import { strToCmd } from '../utils/strToCmd.ts'
import { injectWebContainer } from '../utils/WebContainer.ts'
import { useSandboxEditorTabs } from './useSandboxEditorTabs.ts'
import { useSandboxEditorViews } from './useSandboxEditorViews.ts'
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
  const previewConsoleShown = ref(false)
  const explorerShown = ref(true)
  const watchers = ref<{
    reinstall?: IFSWatcher
  }>({})

  /**
   * Default sandbox options.
   */
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
  const editorViews = useSandboxEditorViews(editorTabs)
  const processTabs = useSandboxProcessTabs(options)

  /**
   * Set an option. Ideally options are set before calling `bootstrap()`.
   *
   * Rather than allowing the direct mutation of the options object, the return of `useSandbox()` exposes a readonly
   * copy of the options and `setOption()` is used to set a specific option's value. This is to make sure that setting
   * options is intentional and not by mistake.
   *
   * @param key
   * @param newValueOrSetter either a new value or a callback that receives the old value to produce the new value.
   */
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

  /**
   * Set the package manager option.
   * This affects only the predefined commands and processes (in `SandboxOptions.process.commands`).
   * @param pm
   */
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

  /**
   * Bootstrap method. Should be called after the web container boots and the first batch of files
   * (most importantly `package.json`) are mounted.
   *
   * Order of execution:
   * - Kill dependency installation and dev server if either of them is running.
   * - On first run: listen to URL change events in the preview iframe to emit the latest URL to the parent window.
   *   This is needed to show the current URL in address bar of the preview.
   * - Open a terminal window if allowed by the sandbox options.
   * - Install dependencies.
   * - Start dev server.
   * - On first run: watch the current working directory to re-bootstrap when a file changes that should trigger
   *   re-install (e.g. `package.json`).
   */
  const bootstrap = async () => {
    // Kill already running processes (need for reinstall).
    processTabs.close(options.process.commands.devServer)
    processTabs.close(options.process.commands.install)
    if (!watchers.value.reinstall) {
      // This code gets injected into every preview and helps emit the current URL to the parent window
      // to be shown in the address bar of the preview panel, and forwards console output to the parent
      // window to be shown in the console panel.
      await container.value?.setPreviewScript(`
        window.parent.postMessage({ type: 'navigation', href: window.location.href, initial: true}, '*');
        window.addEventListener('hashchange', () => {
          window.parent.postMessage({ type: 'navigation', href: window.location.href}, '*');
        });
        (function () {
          const serialize = (arg) => {
            if (typeof arg === 'string') return arg;
            if (arg instanceof Error) return arg.stack || arg.message;
            try {
              return JSON.stringify(arg);
            } catch (e) {
              return String(arg);
            }
          };
          ['log', 'info', 'warn', 'error', 'debug'].forEach((level) => {
            const original = console[level];
            console[level] = function (...args) {
              try {
                window.parent.postMessage({
                  type: 'console',
                  level,
                  args: args.map(serialize),
                }, '*');
              } catch (e) {}
              original.apply(console, args);
            };
          });
          window.addEventListener('error', (event) => {
            window.parent.postMessage({ type: 'console', level: 'error', args: [event.message] }, '*');
          });
        })();
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
    /**
     * A computed ref that gives access to the web container instance.
     */
    container: computed(() => container.value),
    /**
     * Editor tabs manager. Responsible for opening, focusing and closing editor tabs.
     */
    editorTabs,
    /**
     * Highlight and go to lines in the editor. See `highlightLines`, `goToLine`,
     * `clearHighlightedLines` and `clearAllHighlightedLines`.
     */
    editorViews,
    /**
     * Provides matchers for different purposes.
     * The matchers use [ignore](https://www.npmjs.com/package/ignore) to determine whether a give path matches one
     * of the patterns specified in the sandbox options.
     */
    explorer: {
      ...explorer,
      /**
       * Hide the file explorer panel.
       */
      hide: () => (explorerShown.value = false),
      /**
       * Computed ref containing a boolean flag. Whether the file explorer panel is currently shown.
       */
      shown: computed(() => explorerShown.value),
      /**
       * Show the file explorer panel.
       */
      show: () => (explorerShown.value = true),
      /**
       * Toggle the file explorer panel.
       */
      toggle: () => (explorerShown.value = !explorerShown.value),
    },
    options: readonly(options),
    preview: {
      /**
       * Computed ref containing a boolean flag. Whether the console panel is currently shown.
       */
      consoleShown: computed(() => previewConsoleShown.value),
      /**
       * A reference to the preview iframe element.
       */
      frame: previewFrame,
      /**
       * Hide the console panel.
       */
      hideConsole: () => (previewConsoleShown.value = false),
      /**
       * Reload the preview.
       */
      reload: async () => {
        if (previewFrame.value) {
          await reloadPreview(previewFrame.value)
        }
      },
      /**
       * Show the console panel.
       */
      showConsole: () => (previewConsoleShown.value = true),
      /**
       * Computed ref containing a boolean flag. When true, the address bar in the preview panel will not be shown.
       */
      suppressAddressBar: computed(() => options.preview.suppressAddressBar),
      /**
       * Computed ref containing a boolean flag. When true, the console toggle button in the preview panel will
       * not be shown.
       */
      suppressConsole: computed(() => options.preview.suppressConsole),
      /**
       * The preview URL.
       */
      url: computed(() => previewUrl.value ?? ''),
    },
    /**
     * Process tabs manager. Responsible for opening, focusing and closing process and terminal tabs.
     */
    processTabs,
    setOption,
    setPackageManager,
  }
}

/**
 * The main composable of Karagöz Sandbox.
 *
 * Injects and uses the provided web container promise, performs bootstrapping and returns an object that
 * is the central piece in the logic of the sandbox.
 *
 * This composable is created as a shared instance (singleton, if you will) using VueUse's `createSharedComposable()`.
 */
export const useSandbox = createSharedComposable(useSandboxInternal)
