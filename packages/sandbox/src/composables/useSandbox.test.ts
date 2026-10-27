import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

import {
  type FakeContainer,
  mountWithContainer,
} from '../test-support/fakeContainer.ts'
import { useSandbox } from './useSandbox.ts'

vi.mock('@webcontainer/api', () => ({
  WebContainer: { boot: vi.fn() },
  reloadPreview: vi.fn(),
}))

const origin = 'https://abc.local-credentialless.webcontainer-api.io'
let container: FakeContainer
let sandbox: ReturnType<typeof useSandbox>
let unmount: () => void

beforeEach(async () => {
  const mounted = mountWithContainer(() => (sandbox = useSandbox()))
  container = mounted.container
  unmount = () => mounted.wrapper.unmount()
  await vi.waitFor(() => expect(sandbox.container.value).toBe(container))
})

afterEach(() => unmount())

const processFor = (command: string) =>
  container.processes.find((process) => process.command === command)

describe('useSandbox()', () => {
  describe('container', () => {
    it('exposes the provided container once it resolves', () => {
      expect(sandbox.container.value).toBe(container)
    })

    it('updates the preview url when the server is ready', async () => {
      expect(sandbox.preview.url.value).toBe('')

      container.serverReady(origin)
      await nextTick()

      expect(sandbox.preview.url.value).toBe(origin)
    })

    it('forgets the previous preview location when a new server is ready', async () => {
      container.serverReady(origin)
      window.dispatchEvent(
        new MessageEvent('message', {
          data: { type: 'navigation', href: `${origin}/a` },
          origin,
        }),
      )
      await nextTick()
      expect(sandbox.preview.path.value).toBe('/a')

      container.serverReady(origin)
      await nextTick()

      expect(sandbox.preview.path.value).toBe('')
    })
  })

  describe('options', () => {
    it('has npm commands by default', () => {
      expect(sandbox.options.process.packageManager).toBe('npm')
      expect(sandbox.options.process.commands.install).toBe('npm install')
      expect(sandbox.options.process.commands.devServer).toBe('npm start')
    })

    it('sets an option from a value or a setter', () => {
      sandbox.setOption('terminal', { maxCount: 1 })
      expect(sandbox.options.terminal.maxCount).toBe(1)

      sandbox.setOption('terminal', (old) => ({ maxCount: old.maxCount! + 4 }))
      expect(sandbox.options.terminal.maxCount).toBe(5)
    })

    it.each([
      ['pnpm', 'pnpm install', 'pnpm start'],
      ['yarn', 'yarn', 'yarn start'],
      ['npm', 'npm install', 'npm start'],
    ] as const)(
      'switches the predefined commands for %s',
      (pm, install, devServer) => {
        // Start from a different package manager, otherwise switching to npm is a no-op.
        sandbox.setPackageManager('pnpm')
        sandbox.setPackageManager(pm)

        expect(sandbox.options.process.packageManager).toBe(pm)
        expect(sandbox.options.process.commands.install).toBe(install)
        expect(sandbox.options.process.commands.devServer).toBe(devServer)
      },
    )

    it('keeps custom commands when the package manager does not change', () => {
      sandbox.setOption('process', (process) => ({
        ...process,
        commands: { ...process.commands, install: 'custom install' },
      }))

      sandbox.setPackageManager('npm')

      expect(sandbox.options.process.commands.install).toBe('custom install')
    })
  })

  describe('panels', () => {
    it('toggles the explorer', () => {
      expect(sandbox.explorer.shown.value).toBe(true)
      sandbox.explorer.hide()
      expect(sandbox.explorer.shown.value).toBe(false)
      sandbox.explorer.show()
      expect(sandbox.explorer.shown.value).toBe(true)
      sandbox.explorer.toggle()
      expect(sandbox.explorer.shown.value).toBe(false)
    })

    it('toggles the preview console', () => {
      expect(sandbox.preview.consoleShown.value).toBe(false)
      sandbox.preview.showConsole()
      expect(sandbox.preview.consoleShown.value).toBe(true)
      sandbox.preview.hideConsole()
      expect(sandbox.preview.consoleShown.value).toBe(false)
    })

    it('reflects the preview suppression options', () => {
      sandbox.setOption('preview', {
        suppressAddressBar: true,
        suppressConsole: true,
      })

      expect(sandbox.preview.suppressAddressBar.value).toBe(true)
      expect(sandbox.preview.suppressConsole.value).toBe(true)
    })
  })

  describe('bootstrap()', () => {
    const settle = () => new Promise((resolve) => setTimeout(resolve, 0))

    it('installs, then starts the dev server once installation exits', async () => {
      const bootstrapped = sandbox.bootstrap()
      await vi.waitFor(() => expect(processFor('npm')).toBeDefined())

      expect(container.setPreviewScript).toHaveBeenCalledTimes(1)
      expect(
        container.processes.map(({ command, args }) => [command, args]),
      ).toEqual([
        ['jsh', []],
        ['npm', ['install']],
      ])

      // The dev server waits for the installation.
      await settle()
      expect(container.processes).toHaveLength(2)

      container.processes[1].finish(0)
      await bootstrapped

      expect(container.processes.map(({ args }) => args)).toEqual([
        [],
        ['install'],
        ['start'],
      ])
    })

    it('opens the install, dev server and terminal tabs', async () => {
      const bootstrapped = sandbox.bootstrap()
      await vi.waitFor(() => expect(container.processes).toHaveLength(2))
      container.processes[1].finish(0)
      await bootstrapped

      expect(
        sandbox.processTabs.tabs.value.map(({ id, label }) => [id, label]),
      ).toEqual([
        ['jsh-1', 'Terminal'],
        ['npm install', 'Install'],
        ['npm start', 'Dev Server'],
      ])
    })

    it('uses the commands of the selected package manager', async () => {
      sandbox.setPackageManager('pnpm')

      const bootstrapped = sandbox.bootstrap()
      await vi.waitFor(() => expect(container.processes).toHaveLength(2))
      container.processes[1].finish(0)
      await bootstrapped

      expect(container.processes.map(({ command }) => command)).toEqual([
        'jsh',
        'pnpm',
        'pnpm',
      ])
    })

    it('does not open a terminal when none are allowed', async () => {
      sandbox.setOption('terminal', { maxCount: 0 })

      const bootstrapped = sandbox.bootstrap()
      await vi.waitFor(() => expect(container.processes).toHaveLength(1))
      container.processes[0].finish(0)
      await bootstrapped

      expect(container.processes.map(({ command }) => command)).not.toContain(
        'jsh',
      )
    })

    it('watches the working directory for changes', async () => {
      const bootstrapped = sandbox.bootstrap()
      await vi.waitFor(() => expect(container.processes).toHaveLength(2))
      container.processes[1].finish(0)
      await bootstrapped

      expect(container.fs.watch).toHaveBeenCalledWith(
        '.',
        { recursive: true },
        expect.any(Function),
      )
    })

    describe('after the first run', () => {
      beforeEach(async () => {
        const bootstrapped = sandbox.bootstrap()
        await vi.waitFor(() => expect(container.processes).toHaveLength(2))
        container.processes[1].finish(0)
        await bootstrapped
      })

      it('re-bootstraps when a reinstall file changes', async () => {
        await container.fs.writeFile('package.json', '{}')
        await container.fs.writeFile('package.json', '{"a":1}')

        await vi.waitFor(() => expect(container.processes).toHaveLength(4))
        // Previous dev server and install are killed, install runs again, terminal and preview script are kept.
        expect(container.processes[2].kill).toHaveBeenCalled()
        expect(container.processes[3].args).toEqual(['install'])
        expect(container.setPreviewScript).toHaveBeenCalledTimes(1)
        expect(container.fs.watch).toHaveBeenCalledTimes(1)
      })

      it('ignores changes to other files', async () => {
        await container.fs.writeFile('src/index.js', 'a')
        await container.fs.writeFile('src/index.js', 'b')
        await settle()

        expect(container.processes).toHaveLength(3)
      })
    })
  })
})
