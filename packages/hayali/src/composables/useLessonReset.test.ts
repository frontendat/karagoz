import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import type { Lesson, Position } from '../types'
import { useLessonReset, type LessonFs } from './useLessonReset'

const file = (contents: string) => ({ file: { contents } })

const lesson: Lesson = {
  immutable: ['package.json', 'node_modules/**'],
  files: {
    'package.json': file('{}'),
    'index.js': file('base'),
    src: { directory: { 'util.js': file('util') } },
  },
  chapters: [
    {
      id: 'c',
      title: 'C',
      steps: [
        {
          id: 's1',
          title: '1',
          body: '',
          adjustments: { 'extra.js': file('x1') },
        },
        {
          id: 's2',
          title: '2',
          body: '',
          adjustments: { 'index.js': file('step2') },
          removals: ['src/util.js'],
        },
      ],
    },
  ],
}

const s1: Position = { chapterId: 'c', stepId: 's1' }
const s2: Position = { chapterId: 'c', stepId: 's2' }

type Listener = (event: string, filename: string | Uint8Array | null) => void

const mockFs = () => {
  let listener: Listener | undefined
  const fs = {
    watch: vi.fn((_path: string, _opts: unknown, l: Listener) => {
      listener = l
      return { close: vi.fn() }
    }),
    mount: vi.fn(async () => {}),
    rm: vi.fn(async () => {}),
  } satisfies LessonFs
  return { fs, emit: (name: string) => listener?.('change', name) }
}

const setup = () => {
  const m = mockFs()
  const api = useLessonReset({ fs: m.fs, lesson })
  /** Boot, then deliver the watch echoes of the composable's own tier-B writes. */
  const bootSettled = async (p: Position) => {
    await api.boot(p)
    for (const f of ['index.js', 'src/util.js', 'extra.js']) m.emit(f)
  }
  return { ...m, ...api, bootSettled }
}

describe('useLessonReset', () => {
  it('classifies immutable patterns as tier A, everything else tier B', () => {
    const { tierOf } = setup()
    expect(tierOf('package.json')).toBe('A')
    expect(tierOf('node_modules/x/index.js')).toBe('A')
    expect(tierOf('index.js')).toBe('B')
    expect(tierOf('./src/util.js')).toBe('B')
  })

  it('sets dirty on real tier-B events only', async () => {
    const { bootSettled, emit, dirty } = setup()
    await bootSettled(s1)
    emit('package.json')
    emit('node_modules/a/b.js')
    expect(dirty.value).toBe(false)
    emit('index.js')
    expect(dirty.value).toBe(true)
  })

  it('ignores watch events caused by its own mount', async () => {
    const { boot, emit, dirty } = setup()
    await boot(s1)
    // events echoing boot's own tier-B writes
    emit('index.js')
    emit('src/util.js')
    emit('extra.js')
    expect(dirty.value).toBe(false)
    // a subsequent real edit still counts
    emit('index.js')
    expect(dirty.value).toBe(true)
  })

  it('ignores events for directories containing its own writes', async () => {
    const { boot, emit, dirty } = setup()
    await boot(s1)
    emit('src')
    emit('src')
    expect(dirty.value).toBe(false)
  })

  it('requires confirm if dirty', async () => {
    const { bootSettled, emit, requiresConfirm } = setup()
    await bootSettled(s1)
    expect(requiresConfirm.value).toBe(false)
    emit('index.js')
    await nextTick()
    expect(requiresConfirm.value).toBe(true)
  })

  it('reset removes stale tier-B paths, mounts target, clears dirty', async () => {
    const { bootSettled, reset, emit, dirty, fs } = setup()
    await bootSettled(s1)
    emit('index.js')
    emit('scratch.js') // user-created
    fs.mount.mockClear()

    await reset(s1, s2)

    const removed = fs.rm.mock.calls.map((c) => c[0]).sort()
    expect(removed).toEqual(['extra.js', 'scratch.js', 'src/util.js'])
    expect(fs.mount).toHaveBeenCalledTimes(1)
    const tree = fs.mount.mock.calls[0][0] as Record<string, unknown>
    expect(tree['index.js']).toEqual(file('step2'))
    expect(tree['package.json']).toBeUndefined()
    expect(dirty.value).toBe(false)
  })

  it('does not treat its own reset writes/removals as dirty', async () => {
    const { boot, reset, emit, dirty } = setup()
    await boot(s1)
    await reset(s1, s2)
    emit('extra.js')
    emit('src/util.js')
    emit('index.js')
    expect(dirty.value).toBe(false)
  })

  it('navigate cancel leaves everything untouched', async () => {
    const { bootSettled, navigate, emit, dirty, current, fs } = setup()
    await bootSettled(s1)
    emit('index.js')
    fs.mount.mockClear()
    fs.rm.mockClear()

    const done = await navigate(s2, () => false)

    expect(done).toBe(false)
    expect(dirty.value).toBe(true)
    expect(current.value).toEqual(s1)
    expect(fs.mount).not.toHaveBeenCalled()
    expect(fs.rm).not.toHaveBeenCalled()
  })

  it('navigate skips confirm when clean and advances', async () => {
    const { boot, navigate, current } = setup()
    await boot(s1)
    const confirm = vi.fn(() => false)
    expect(await navigate(s2, confirm)).toBe(true)
    expect(confirm).not.toHaveBeenCalled()
    expect(current.value).toEqual(s2)
  })

  it('navigate resets when confirmed while dirty', async () => {
    const { bootSettled, navigate, emit, dirty, current } = setup()
    await bootSettled(s1)
    emit('index.js')
    expect(await navigate(s2, async () => true)).toBe(true)
    expect(dirty.value).toBe(false)
    expect(current.value).toEqual(s2)
  })

  it('closes the watcher on dispose', async () => {
    const { boot, dispose, fs } = setup()
    await boot(s1)
    const watcher = fs.watch.mock.results[0].value
    dispose()
    expect(watcher.close).toHaveBeenCalled()
  })

  describe('install output', () => {
    // A lesson that never lists node_modules or lockfiles as immutable.
    const bare: Lesson = {
      files: { 'index.js': file('base') },
      chapters: [
        { id: 'c', title: 'C', steps: [{ id: 's1', title: '1', body: '' }] },
      ],
    }

    it.each([
      'node_modules',
      'node_modules/express/index.js',
      'package-lock.json',
      'pnpm-lock.yaml',
      'yarn.lock',
      'src/node_modules/x/y.js',
    ])('treats %s as tier A without being listed as immutable', (path) => {
      const m = mockFs()
      const api = useLessonReset({ fs: m.fs, lesson: bare })

      expect(api.tierOf(path)).toBe('A')
    })

    it('does not become dirty when npm install writes its output after boot', async () => {
      const m = mockFs()
      const api = useLessonReset({ fs: m.fs, lesson: bare })
      await api.boot(s1)
      m.emit('index.js')

      for (const f of [
        'package-lock.json',
        'node_modules',
        'node_modules/.package-lock.json',
      ])
        m.emit(f)

      expect(api.dirty.value).toBe(false)
    })

    it('never removes install output when resetting', async () => {
      const m = mockFs()
      const api = useLessonReset({ fs: m.fs, lesson: bare })
      await api.boot(s1)
      m.emit('index.js')
      m.emit('node_modules/x/index.js')

      await api.reset(s1, s1)

      expect(m.fs.rm).not.toHaveBeenCalledWith(
        expect.stringContaining('node_modules'),
        expect.anything(),
      )
    })
  })
})
