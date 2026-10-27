import { afterEach, describe, expect, it, vi } from 'vitest'
import { reactive, toRaw } from 'vue'

import { mountWithContainer } from '../test-support/fakeContainer.ts'
import type { SandboxOptions } from '../types'
import { useSandboxProcessTabs } from './useSandboxProcessTabs.ts'

vi.mock('@webcontainer/api', () => ({ WebContainer: { boot: vi.fn() } }))

const setup = (maxCount = 3) => {
  const options = reactive({
    terminal: { maxCount },
  }) as unknown as SandboxOptions
  const mounted = mountWithContainer(() => useSandboxProcessTabs(options))
  return { ...mounted, tabs: mounted.result }
}

let wrapper: { unmount: () => void } | undefined
afterEach(() => wrapper?.unmount())

const ready = async (maxCount?: number) => {
  const mounted = setup(maxCount)
  wrapper = mounted.wrapper
  // The container resolves asynchronously.
  await vi.waitFor(async () => {
    await mounted.tabs.open('probe', 'Probe', { command: 'probe' })
    expect(mounted.container.processes.length).toBeGreaterThan(0)
  })
  mounted.tabs.close('probe')
  mounted.container.processes.length = 0
  mounted.container.spawn.mockClear()
  return mounted
}

describe('useSandboxProcessTabs', () => {
  describe('open', () => {
    it('spawns the command with its arguments and opens a focused tab', async () => {
      const { tabs, container } = await ready()

      await tabs.open('npm install', 'Install', {
        command: 'npm',
        args: ['install'],
      })

      expect(container.spawn).toHaveBeenCalledWith('npm', ['install'])
      expect(tabs.tabs.value.map(({ id, label }) => [id, label])).toEqual([
        ['npm install', 'Install'],
      ])
      expect(tabs.current.value?.id).toBe('npm install')
      expect(toRaw(tabs.current.value?.context?.process)).toBe(
        container.processes[0],
      )
    })

    it('spawns without arguments when none are given', async () => {
      const { tabs, container } = await ready()

      await tabs.open('jsh', 'Terminal', { command: 'jsh' })

      expect(container.spawn).toHaveBeenCalledWith('jsh', [])
    })

    it('refocuses an existing tab instead of spawning again', async () => {
      const { tabs, container } = await ready()
      await tabs.open('a', 'A', { command: 'a' })
      await tabs.open('b', 'B', { command: 'b' })
      expect(tabs.current.value?.id).toBe('b')

      await tabs.open('a')

      expect(tabs.current.value?.id).toBe('a')
      expect(container.spawn).toHaveBeenCalledTimes(2)
    })

    it('rejects when the container is missing', async () => {
      // Opened right after mounting, before the container promise resolved.
      const { tabs, wrapper: w } = setup()
      wrapper = w

      await expect(tabs.open('a', 'A', { command: 'a' })).rejects.toThrow(
        'Container is missing',
      )
      expect(tabs.tabs.value).toEqual([])
    })
  })

  describe('exit code', () => {
    it('is recorded when the process exits', async () => {
      const { tabs, container } = await ready()
      await tabs.open('a', 'A', { command: 'a' })
      expect(tabs.findTab('a')?.context?.exitCode).toBeUndefined()

      container.processes[0].finish(3)

      await vi.waitFor(() =>
        expect(tabs.findTab('a')?.context?.exitCode).toBe(3),
      )
    })

    it('stays unset and does not throw when the container is torn down while the process runs', async () => {
      const { tabs, container } = await ready()
      await tabs.open('a', 'A', { command: 'a' })

      container.teardown()
      await new Promise((resolve) => setTimeout(resolve, 0))

      expect(tabs.findTab('a')?.context?.exitCode).toBeUndefined()
    })
  })

  describe('output', () => {
    it('persists the logs on the tab context', async () => {
      const { tabs, container } = await ready()
      await tabs.open('a', 'A', { command: 'a' })

      container.processes[0].write('one')
      container.processes[0].write('two')

      await vi.waitFor(() =>
        expect(tabs.findTab('a')?.context?.logs).toEqual(['one', 'two']),
      )
    })

    it('forwards output to the output handler of the tab', async () => {
      const { tabs, container } = await ready()
      await tabs.open('a', 'A', { command: 'a' })
      const handler = vi.fn()
      tabs.updateContext('a', (ctx) => ({
        ...ctx,
        processOutputHandler: handler,
      }))

      container.processes[0].write('hello')

      await vi.waitFor(() => expect(handler).toHaveBeenCalledWith('hello'))
    })

    it('sends input through the input handler', async () => {
      const { tabs, container } = await ready()
      await tabs.open('a', 'A', { command: 'a' })

      await tabs.findTab('a')?.context?.processInputHandler?.('ls\n')

      expect(container.processes[0].received).toEqual(['ls\n'])
    })
  })

  describe('close and kill', () => {
    it('kills a running process and removes its tab on close', async () => {
      const { tabs, container } = await ready()
      await tabs.open('a', 'A', { command: 'a' })

      tabs.close('a')

      expect(container.processes[0].kill).toHaveBeenCalledTimes(1)
      expect(tabs.findTab('a')).toBeUndefined()
    })

    it('does not kill a process that has already exited', async () => {
      const { tabs, container } = await ready()
      await tabs.open('a', 'A', { command: 'a' })
      container.processes[0].finish(0)
      await vi.waitFor(() =>
        expect(tabs.findTab('a')?.context?.exitCode).toBe(0),
      )

      tabs.close('a')

      expect(container.processes[0].kill).not.toHaveBeenCalled()
    })

    it('ignores unknown ids', async () => {
      const { tabs } = await ready()

      expect(() => tabs.close('nope')).not.toThrow()
      expect(() => tabs.kill('nope')).not.toThrow()
    })
  })

  describe('restart', () => {
    it('kills the process and starts the same command in a fresh tab state', async () => {
      const { tabs, container } = await ready()
      await tabs.open('a', 'A', { command: 'a', args: ['--x'] })
      container.processes[0].write('old output')
      await vi.waitFor(() =>
        expect(tabs.findTab('a')?.context?.logs).toHaveLength(1),
      )

      await tabs.restart('a')

      expect(container.processes[0].kill).toHaveBeenCalled()
      expect(container.processes).toHaveLength(2)
      expect(container.spawn).toHaveBeenLastCalledWith('a', ['--x'])
      const context = tabs.findTab('a')?.context
      expect(toRaw(context?.process)).toBe(container.processes[1])
      expect(context?.exitCode).toBeUndefined()
      expect(context?.logs).toEqual([])
      expect(tabs.findTab('a')?.label).toBe('A')
    })

    it('does nothing for an unknown id', async () => {
      const { tabs, container } = await ready()

      await tabs.restart('nope')

      expect(container.spawn).not.toHaveBeenCalled()
    })
  })

  describe('availableTerminals', () => {
    it('counts the visible terminals against the maximum', async () => {
      const { tabs } = await ready(2)
      expect(tabs.availableTerminals.value).toBe(2)

      await tabs.open('t1', 'Terminal', { command: 'jsh', isTerminal: true })
      expect(tabs.availableTerminals.value).toBe(1)

      await tabs.open('h', 'Hidden', {
        command: 'jsh',
        isTerminal: true,
        isHidden: true,
      })
      await tabs.open('p', 'Process', { command: 'p' })
      expect(tabs.availableTerminals.value).toBe(1)
    })
  })
})
