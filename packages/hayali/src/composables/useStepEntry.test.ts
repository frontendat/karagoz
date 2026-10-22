import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'

import type { AdjustmentsTree, Lesson, Position, Step } from '../types'
import { type StepEntrySandbox, useStepEntry } from './useStepEntry'

const file = (contents: string) => ({ file: { contents } })
const base: AdjustmentsTree = {
  'a.js': file('1\n2\n3\n4\n5'),
  'b.js': file('1\n2\n3'),
  'c.css': file('x'),
}

const pos = (stepId: string): Position => ({ chapterId: 'c', stepId })

const lessonOf = (steps: Record<string, Partial<Step>>): Lesson => ({
  files: base,
  chapters: [
    {
      id: 'c',
      title: 'C',
      steps: Object.entries(steps).map(([id, step]) => ({
        id,
        title: id,
        body: '',
        ...step,
      })),
    },
  ],
})

const deferred = <T = void>() => {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((r) => (resolve = r))
  return { promise, resolve }
}

const flush = async () => {
  for (let i = 0; i < 10; i++) await Promise.resolve()
  await nextTick()
}

const setup = (
  steps: Record<string, Partial<Step>>,
  { visible = true, ready = true, start = 's1' } = {},
) => {
  const log: string[] = []
  const tabs = ref<{ id: string }[]>([])
  const previewPath = ref('/')
  const previewUrl = ref(ready ? 'https://x.test' : '')
  const dirty = ref(false)
  const sandboxVisible = ref(visible)
  const position = ref<Position>(pos(start))

  const sandbox = {
    editorTabs: {
      tabs,
      open: vi.fn((id: string) => {
        log.push(`open ${id}`)
        if (!tabs.value.some((t) => t.id === id)) tabs.value.push({ id })
      }),
      close: vi.fn((id: string) => {
        log.push(`close ${id}`)
        tabs.value = tabs.value.filter((t) => t.id !== id)
      }),
      closeAll: vi.fn(() => {
        log.push('closeAll')
        tabs.value = []
      }),
    },
    editorViews: {
      highlightLines: vi.fn(async (lines: unknown, path: string) => {
        log.push(`highlight ${path} ${JSON.stringify(lines)}`)
      }),
      goToLine: vi.fn(async (line: number, path: string) => {
        log.push(`goTo ${path}:${line}`)
      }),
      clearAllHighlightedLines: vi.fn(() => log.push('clear')),
    },
    preview: {
      navigate: vi.fn((path: string) => log.push(`preview ${path}`)),
      path: previewPath,
      url: previewUrl,
    },
  } satisfies StepEntrySandbox

  const reset = {
    dirty,
    navigate: vi.fn(async (_to: Position, _confirm: () => Promise<boolean>) => {
      log.push('reset')
      return true
    }),
  }
  const goTo = vi.fn((p: Position) => {
    log.push('position')
    position.value = p
  })

  const entry = useStepEntry({
    lesson: () => lessonOf(steps),
    position,
    goTo,
    reset,
    confirm: async () => true,
    sandbox,
    sandboxVisible,
    viewTimeoutMs: 3000,
  })

  return {
    entry,
    log,
    tabs,
    sandbox,
    reset,
    goTo,
    dirty,
    previewPath,
    previewUrl,
    sandboxVisible,
    position,
  }
}

const go = async (t: ReturnType<typeof setup>, to: string) => {
  await t.entry.navigate(pos(to))
  await flush()
}

let warn: ReturnType<typeof vi.spyOn>
beforeEach(() => {
  warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
})
afterEach(() => {
  warn.mockRestore()
  vi.useRealTimers()
})

describe('useStepEntry', () => {
  describe('entry sequence', () => {
    it('runs reset, position, clear, close, open, highlight, go-to, preview in order', async () => {
      const t = setup({
        s1: {},
        s2: {
          editor: {
            close: ['b.js'],
            open: ['a.js', { path: 'c.css' }, { path: 'a.js', line: 3 }],
            highlight: [{ path: 'a.js', lines: [[1, 2], 4] }],
          },
          preview: { url: '/about.html?x=1#top' },
        },
      })
      t.log.length = 0

      await go(t, 's2')

      expect(t.log).toEqual([
        'reset',
        'position',
        'clear',
        'close ./b.js',
        'open ./a.js',
        'open ./c.css',
        'open ./a.js',
        'highlight ./a.js [[1,2],4]',
        'goTo ./a.js:3',
        'preview /about.html?x=1#top',
      ])
    })

    it('does not go to a line unless the last open entry has one', async () => {
      const t = setup({
        s1: {},
        s2: { editor: { open: [{ path: 'a.js', line: 2 }, 'b.js'] } },
      })

      await go(t, 's2')

      expect(t.sandbox.editorViews.goToLine).not.toHaveBeenCalled()
    })

    it('closes every tab with close: "all" before opening', async () => {
      const t = setup({
        s1: {},
        s2: { editor: { close: 'all', open: ['a.js'] } },
      })
      t.log.length = 0

      await go(t, 's2')

      expect(t.log.slice(-2)).toEqual(['closeAll', 'open ./a.js'])
    })

    it('never inherits directives from the previous step', async () => {
      const t = setup({
        s1: {},
        s2: {
          editor: { open: ['a.js'], highlight: [{ path: 'a.js', lines: 1 }] },
        },
        s3: {},
      })
      await go(t, 's2')
      t.log.length = 0

      await go(t, 's3')

      expect(t.log).toEqual(['reset', 'position', 'clear'])
    })

    it('applies the same directives on back-navigation', async () => {
      const t = setup({ s1: { editor: { open: ['a.js'] } }, s2: {} })
      await go(t, 's2')
      t.log.length = 0

      await go(t, 's1')

      expect(t.log).toContain('open ./a.js')
    })

    it('does not block open, close or highlight on locked files', async () => {
      const t = setup({
        s1: {},
        s2: {
          locks: ['a.js'],
          editor: {
            open: ['a.js'],
            close: ['b.js'],
            highlight: [{ path: 'a.js', lines: 1 }],
          },
        },
      })

      await go(t, 's2')

      expect(t.log).toEqual(
        expect.arrayContaining([
          'open ./a.js',
          'close ./b.js',
          'highlight ./a.js 1',
        ]),
      )
    })
  })

  describe('highlights', () => {
    it("are cleared on the learner's first edit", async () => {
      const t = setup({ s1: {} })
      t.log.length = 0

      t.dirty.value = true
      await nextTick()

      expect(t.log).toEqual(['clear'])
    })

    it('are not cleared again when dirty goes back to false', async () => {
      const t = setup({ s1: {} })
      t.dirty.value = true
      await nextTick()
      t.log.length = 0

      t.dirty.value = false
      await nextTick()

      expect(t.log).toEqual([])
    })
  })

  describe('removals', () => {
    it('auto-closes the tabs of files the step removes, leaving learner tabs', async () => {
      const t = setup({ s1: {}, s2: { removals: ['b.js'] } })
      t.tabs.value = [{ id: './b.js' }, { id: './a.js' }]
      t.log.length = 0

      await go(t, 's2')

      expect(t.log).toContain('close ./b.js')
      expect(t.log).not.toContain('close ./a.js')
    })

    it('closes the tab of a file that was removed and is back-navigated away from', async () => {
      const t = setup({
        s1: { adjustments: { 'new.js': file('x') } },
        s2: {},
      })
      t.tabs.value = [{ id: './new.js' }]

      await go(t, 's2')

      expect(t.log).toContain('close ./new.js')
    })
  })

  describe('single flight', () => {
    it('sets navigating during confirm/reset/goTo and ignores further calls', async () => {
      const t = setup({ s1: {}, s2: {}, s3: {} })
      const gate = deferred<boolean>()
      t.reset.navigate.mockImplementationOnce(() => gate.promise)

      const first = t.entry.navigate(pos('s2'))
      expect(t.entry.navigating.value).toBe(true)
      await t.entry.navigate(pos('s3'))
      expect(t.reset.navigate).toHaveBeenCalledTimes(1)

      gate.resolve(true)
      await first
      await flush()

      expect(t.entry.navigating.value).toBe(false)
      expect(t.position.value).toEqual(pos('s2'))
    })

    it('does not hold the flag while directives run', async () => {
      const t = setup({
        s1: {},
        s2: { editor: { open: [{ path: 'a.js', line: 1 }] } },
      })
      const view = deferred()
      t.sandbox.editorViews.goToLine.mockReturnValueOnce(view.promise)

      await go(t, 's2')

      expect(t.entry.navigating.value).toBe(false)
    })

    it('is a full no-op when the confirm is cancelled', async () => {
      const t = setup({ s1: {}, s2: { editor: { open: ['a.js'] } } })
      t.reset.navigate.mockResolvedValueOnce(false)
      t.log.length = 0

      await go(t, 's2')

      expect(t.goTo).not.toHaveBeenCalled()
      expect(t.log).toEqual([])
      expect(t.entry.navigating.value).toBe(false)
    })

    it('does not cancel in-flight directives of the current step when a confirm is cancelled', async () => {
      const t = setup({
        s1: {},
        s2: {
          editor: { open: [{ path: 'a.js', line: 1 }] },
          preview: { url: '/two' },
        },
        s3: {},
      })
      const view = deferred()
      t.sandbox.editorViews.goToLine.mockReturnValueOnce(view.promise)
      await go(t, 's2')
      t.reset.navigate.mockResolvedValueOnce(false)
      await go(t, 's3')

      view.resolve()
      await flush()

      expect(t.log).toContain('preview /two')
    })
  })

  describe('entry token', () => {
    it('drops the remaining directives of a superseded entry', async () => {
      const t = setup({
        s1: {},
        s2: {
          editor: { open: [{ path: 'a.js', line: 1 }] },
          preview: { url: '/two' },
        },
        s3: {},
      })
      const view = deferred()
      t.sandbox.editorViews.goToLine.mockReturnValueOnce(view.promise)
      await go(t, 's2')

      await go(t, 's3')
      view.resolve()
      await flush()

      expect(t.sandbox.preview.navigate).not.toHaveBeenCalledWith('/two')
    })
  })

  describe('invalid directives', () => {
    it('skips and warns for open on a file outside the step tree', async () => {
      const t = setup({ s1: {}, s2: { editor: { open: ['nope.js', 'a.js'] } } })

      await go(t, 's2')

      expect(warn).toHaveBeenCalledTimes(1)
      expect(t.sandbox.editorTabs.open).toHaveBeenCalledTimes(1)
      expect(t.sandbox.editorTabs.open).toHaveBeenCalledWith('./a.js')
    })

    it('skips and warns for highlight on a file outside the step tree', async () => {
      const t = setup({
        s1: {},
        s2: { editor: { highlight: [{ path: 'nope.js', lines: 1 }] } },
      })

      await go(t, 's2')

      expect(warn).toHaveBeenCalled()
      expect(t.sandbox.editorViews.highlightLines).not.toHaveBeenCalled()
    })

    it('skips a file the same step removes', async () => {
      const t = setup({
        s1: {},
        s2: { removals: ['a.js'], editor: { open: ['a.js'] } },
      })

      await go(t, 's2')

      expect(warn).toHaveBeenCalled()
      expect(t.sandbox.editorTabs.open).not.toHaveBeenCalled()
    })

    it('never throws', async () => {
      const t = setup({ s1: {}, s2: { editor: { open: [42 as never] } } })

      await expect(go(t, 's2')).resolves.not.toThrow()
    })
  })

  describe('editor view timeout', () => {
    it('warns and skips the go-to after ~3 s, then still applies the preview', async () => {
      vi.useFakeTimers()
      const t = setup({
        s1: {},
        s2: {
          editor: { open: [{ path: 'a.js', line: 1 }] },
          preview: { url: '/two' },
        },
      })
      t.sandbox.editorViews.goToLine.mockReturnValueOnce(new Promise(() => {}))
      const nav = t.entry.navigate(pos('s2'))
      await vi.advanceTimersByTimeAsync(0)
      await nav

      await vi.advanceTimersByTimeAsync(2999)
      expect(warn).not.toHaveBeenCalled()
      expect(t.log).not.toContain('preview /two')

      await vi.advanceTimersByTimeAsync(1)
      expect(warn).toHaveBeenCalledTimes(1)
      expect(t.log).toContain('preview /two')
    })
  })

  describe('preview', () => {
    it('applies preview.url on entry', async () => {
      const t = setup({ s1: {}, s2: { preview: { url: '/about.html' } } })

      await go(t, 's2')

      expect(t.sandbox.preview.navigate).toHaveBeenCalledWith('/about.html')
    })

    it('leaves the preview alone when the step has no preview and removes nothing', async () => {
      const t = setup({ s1: {}, s2: {} })
      t.previewPath.value = '/somewhere'

      await go(t, 's2')

      expect(t.sandbox.preview.navigate).not.toHaveBeenCalled()
    })

    it('falls back to / after a step that removed files when the preview is elsewhere', async () => {
      const t = setup({ s1: {}, s2: { removals: ['c.css'] } })
      t.previewPath.value = '/about.html'

      await go(t, 's2')

      expect(t.sandbox.preview.navigate).toHaveBeenCalledWith('/')
    })

    it('does not navigate to / when the preview is already there', async () => {
      const t = setup({ s1: {}, s2: { removals: ['c.css'] } })

      await go(t, 's2')

      expect(t.sandbox.preview.navigate).not.toHaveBeenCalled()
    })

    it('lets an explicit preview.url win over the / fallback', async () => {
      const t = setup({
        s1: {},
        s2: { removals: ['c.css'], preview: { url: '/other' } },
      })
      t.previewPath.value = '/about.html'

      await go(t, 's2')

      expect(t.sandbox.preview.navigate).toHaveBeenCalledTimes(1)
      expect(t.sandbox.preview.navigate).toHaveBeenCalledWith('/other')
    })
  })

  describe('robustness', () => {
    it('holds a non-initial preview.url until the dev server is ready', async () => {
      const t = setup(
        { s1: {}, s2: { preview: { url: '/two' } } },
        { ready: false },
      )

      await go(t, 's2')
      expect(t.sandbox.preview.navigate).not.toHaveBeenCalled()

      t.previewUrl.value = 'https://x.test'
      await flush()
      expect(t.sandbox.preview.navigate).toHaveBeenCalledWith('/two')
    })

    it('warns instead of rejecting when navigation fails', async () => {
      const t = setup({ s1: {}, s2: {} })
      t.reset.navigate.mockRejectedValueOnce(new Error('fs gone'))

      await expect(t.entry.navigate(pos('s2'))).resolves.toBeUndefined()

      expect(warn).toHaveBeenCalled()
      expect(t.entry.navigating.value).toBe(false)
    })

    it('does not highlight or go to a line once the learner has edited', async () => {
      const t = setup({
        s1: {},
        s2: {
          editor: {
            open: [{ path: 'a.js', line: 2 }],
            highlight: [{ path: 'a.js', lines: 1 }],
          },
        },
      })
      t.dirty.value = true

      await go(t, 's2')

      expect(t.sandbox.editorViews.highlightLines).not.toHaveBeenCalled()
      expect(t.sandbox.editorViews.goToLine).not.toHaveBeenCalled()
    })
  })

  describe('initial step', () => {
    it('applies directives without reset, position change or clear', async () => {
      const t = setup({
        s1: {
          editor: { open: ['a.js'], highlight: [{ path: 'a.js', lines: 2 }] },
        },
      })
      t.log.length = 0

      await t.entry.enterInitial()
      await flush()

      expect(t.log).toEqual(['open ./a.js', 'highlight ./a.js 2'])
    })

    it('holds preview.url until the first server-ready and navigates nothing before', async () => {
      const t = setup(
        { s1: { preview: { url: '/about.html' } } },
        { ready: false },
      )

      await t.entry.enterInitial()
      await flush()
      expect(t.sandbox.preview.navigate).not.toHaveBeenCalled()

      t.previewUrl.value = 'https://x.test'
      await flush()
      expect(t.sandbox.preview.navigate).toHaveBeenCalledTimes(1)
      expect(t.sandbox.preview.navigate).toHaveBeenCalledWith('/about.html')
    })

    it('drops a pending initial preview.url when another step is entered first', async () => {
      const t = setup(
        { s1: { preview: { url: '/one' } }, s2: {} },
        { ready: false },
      )
      await t.entry.enterInitial()

      await go(t, 's2')
      t.previewUrl.value = 'https://x.test'
      await flush()

      expect(t.sandbox.preview.navigate).not.toHaveBeenCalled()
    })
  })

  describe('mobile with the Sandbox pane hidden', () => {
    const steps = {
      s1: {},
      s2: {
        editor: {
          close: ['b.js'],
          open: [{ path: 'a.js', line: 4 }],
          highlight: [{ path: 'a.js', lines: 1 }],
        },
        preview: { url: '/two' },
      },
      s3: {},
    }

    it('applies open/close/highlight/preview immediately but defers go-to', async () => {
      const t = setup(steps, { visible: false })

      await go(t, 's2')

      expect(t.log).toEqual(
        expect.arrayContaining([
          'close ./b.js',
          'open ./a.js',
          'highlight ./a.js 1',
          'preview /two',
        ]),
      )
      expect(t.sandbox.editorViews.goToLine).not.toHaveBeenCalled()
    })

    it('runs the pending go-to once when the Sandbox pane becomes visible', async () => {
      const t = setup(steps, { visible: false })
      await go(t, 's2')

      t.sandboxVisible.value = true
      await flush()
      t.sandboxVisible.value = false
      t.sandboxVisible.value = true
      await flush()

      expect(t.sandbox.editorViews.goToLine).toHaveBeenCalledTimes(1)
      expect(t.sandbox.editorViews.goToLine).toHaveBeenCalledWith(4, './a.js', {
        focus: false,
      })
    })

    it('clears the pending go-to on the next entry', async () => {
      const t = setup(steps, { visible: false })
      await go(t, 's2')
      await go(t, 's3')

      t.sandboxVisible.value = true
      await flush()

      expect(t.sandbox.editorViews.goToLine).not.toHaveBeenCalled()
    })

    it('clears the pending go-to on the first edit', async () => {
      const t = setup(steps, { visible: false })
      await go(t, 's2')

      t.dirty.value = true
      await flush()
      t.sandboxVisible.value = true
      await flush()

      expect(t.sandbox.editorViews.goToLine).not.toHaveBeenCalled()
    })
  })

  it('passes focus: false and open: false so Hayali never steals focus or opens tabs', async () => {
    const t = setup({
      s1: {},
      s2: {
        editor: {
          open: [{ path: 'a.js', line: 2 }],
          highlight: [{ path: 'b.js', lines: 1 }],
        },
      },
    })

    await go(t, 's2')

    expect(t.sandbox.editorViews.goToLine).toHaveBeenCalledWith(2, './a.js', {
      focus: false,
    })
    expect(t.sandbox.editorViews.highlightLines).toHaveBeenCalledWith(
      1,
      './b.js',
      { open: false },
    )
  })
})
