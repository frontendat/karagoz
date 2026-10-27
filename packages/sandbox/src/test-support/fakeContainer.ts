import type { WebContainer } from '@webcontainer/api'
import { vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'

import { provideWebContainer } from '../utils/WebContainer.ts'

type WatchListener = (event: 'rename' | 'change', filename: string) => void

/**
 * A fake process as returned by `FakeContainer.spawn()`. Drive it with `write()` and `finish()`.
 */
export type FakeProcess = ReturnType<typeof createFakeProcess>

const createFakeProcess = (command: string, args: string[]) => {
  let controller!: ReadableStreamDefaultController<string>
  let resolveExit!: (code: number) => void
  let rejectExit!: (reason: unknown) => void
  const exit = new Promise<number>((resolve, reject) => {
    resolveExit = resolve
    rejectExit = reject
  })
  // Nobody may be awaiting `exit` (e.g. when a test tears the container down): keep it from being reported.
  exit.catch(() => {})
  const received: string[] = []
  let settled = false
  const output = new ReadableStream<string>({
    start: (c) => void (controller = c),
  })
  const input = new WritableStream<string>({
    write: (data) => void received.push(data),
  })

  const finish = (code = 0) => {
    if (settled) return
    settled = true
    controller.close()
    resolveExit(code)
  }

  return {
    command,
    args,
    /** Everything written to the process' input. */
    received,
    exit,
    input,
    output,
    kill: vi.fn(() => finish(137)),
    resize: vi.fn(),
    /** Emit a chunk of output. */
    write: (data: string) => controller.enqueue(data),
    /** Exit the process with the given code and end its output. */
    finish,
    /** Reject `exit` the way the container does when it is torn down while the process runs. */
    abort: () => {
      if (settled) return
      settled = true
      rejectExit(new Error('Process aborted'))
    },
  }
}

/**
 * Create a fake container: an in-memory stand-in for the WebContainer.
 *
 * It offers a file system (read, write, read-dir, watch), process spawning with an output stream and an exit promise,
 * the `server-ready` event and teardown. Tests supply it to composables through `mountWithContainer()` (which uses the
 * sandbox's `provideWebContainer()`), so no production seam is needed.
 *
 * @param files initial files, `{ 'path/to/file': 'contents' }`. Parent directories are created implicitly.
 */
export const createFakeContainer = (files: Record<string, string> = {}) => {
  const fileContents = new Map<string, string>()
  const watchers = new Set<{ path: string; listener: WatchListener }>()
  const listeners = new Map<string, Set<(...args: never[]) => void>>()
  const processes: FakeProcess[] = []

  const normalize = (path: string) =>
    path.replace(/^\.?\/*/, '').replace(/\/+$/, '')

  const notify = (event: 'rename' | 'change', path: string) => {
    for (const watcher of watchers) {
      const dir = normalize(watcher.path)
      if (dir === '' || path === dir || path.startsWith(`${dir}/`)) {
        watcher.listener(event, dir === '' ? path : path.slice(dir.length + 1))
      }
    }
  }

  const dirEnt = (name: string, isDir: boolean) => ({
    name,
    isDirectory: () => isDir,
    isFile: () => !isDir,
  })

  const fs = {
    readFile: vi.fn(async (path: string) => {
      const contents = fileContents.get(normalize(path))
      if (contents === undefined) throw new Error(`ENOENT: ${path}`)
      return contents
    }),
    writeFile: vi.fn(async (path: string, contents: string) => {
      const key = normalize(path)
      const existed = fileContents.has(key)
      fileContents.set(key, contents)
      notify(existed ? 'change' : 'rename', key)
    }),
    readdir: vi.fn(async (path: string, _options?: unknown) => {
      const dir = normalize(path)
      const prefix = dir === '' ? '' : `${dir}/`
      const entries = new Map<string, boolean>()
      for (const file of fileContents.keys()) {
        if (!file.startsWith(prefix)) continue
        const [name, ...rest] = file.slice(prefix.length).split('/')
        entries.set(name, entries.get(name) || rest.length > 0)
      }
      return [...entries].map(([name, isDir]) => dirEnt(name, isDir))
    }),
    watch: vi.fn(
      (path: string, optionsOrListener: unknown, maybeListener?: unknown) => {
        const listener = (maybeListener ?? optionsOrListener) as WatchListener
        const watcher = { path, listener }
        watchers.add(watcher)
        return { close: vi.fn(() => void watchers.delete(watcher)) }
      },
    ),
  }

  for (const [path, contents] of Object.entries(files)) {
    fileContents.set(normalize(path), contents)
  }

  const container = {
    fs,
    on: vi.fn((event: string, listener: (...args: never[]) => void) => {
      if (!listeners.has(event)) listeners.set(event, new Set())
      listeners.get(event)!.add(listener)
      return () => void listeners.get(event)?.delete(listener)
    }),
    setPreviewScript: vi.fn(async () => {}),
    spawn: vi.fn(async (command: string, args: string[] = []) => {
      const process = createFakeProcess(command, args)
      processes.push(process)
      return process
    }),
    teardown: vi.fn(() => {
      for (const process of processes) process.abort()
      watchers.clear()
    }),
  }

  return Object.assign(container, {
    /** Spawned processes, in spawn order. */
    processes,
    /** Contents of the in-memory file system, keyed by normalized path. */
    files: fileContents,
    /** Active file system watchers. */
    watchers,
    /** Emit the container's `server-ready` event. */
    serverReady: (url: string, port = 3000) => {
      for (const listener of listeners.get('server-ready') ?? []) {
        ;(listener as (port: number, url: string) => void)(port, url)
      }
    },
  })
}

export type FakeContainer = ReturnType<typeof createFakeContainer>

/**
 * Mount a host component that provides the (fake) container the way the sandbox does, then runs `setup` inside it.
 * Returns whatever `setup` returned, plus the wrapper (unmount it to dispose of the composables).
 *
 * @param container the container to provide; defaults to a new empty fake container.
 * @param setup runs in the host component's setup, after the container is provided.
 */
export const mountWithContainer = <T>(
  setup: () => T,
  container: FakeContainer = createFakeContainer(),
) => {
  let result!: T
  const wrapper = mount(
    defineComponent({
      setup() {
        provideWebContainer(Promise.resolve(container as never as WebContainer))
        result = setup()
        return () => h('div')
      },
    }),
  )
  return { container, result, wrapper }
}
