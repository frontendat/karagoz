import { flushPromises } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createSSRApp, h, ref } from 'vue'
import { createI18n } from 'vue-i18n'
import { renderToString } from 'vue/server-renderer'

import { en } from '../locales/en'
import type { Lesson, Position } from '../types'
import KrgzHayali from './KrgzHayali.vue'

vi.mock('@karagoz/sandbox', async () => {
  const { defineComponent: dc, ref: r, h: hh } = await import('vue')
  return {
    useSandbox: () => ({
      container: r(null),
      bootstrap: vi.fn(async () => {}),
      setOption: vi.fn(),
      editorTabs: {
        tabs: r([]),
        open: vi.fn(),
        close: vi.fn(),
        closeAll: vi.fn(),
      },
      editorViews: {
        highlightLines: vi.fn(),
        goToLine: vi.fn(),
        clearAllHighlightedLines: vi.fn(),
      },
      preview: { navigate: vi.fn(), path: r('/'), url: r('') },
    }),
    KrgzSandbox: dc({
      setup: () => () => hh('div', { 'data-testid': 'sandbox' }),
    }),
  }
})

const lesson: Lesson = {
  chapters: [
    {
      id: 'c',
      title: 'Chapter',
      steps: [
        { id: 's1', title: 'First step', body: 'Body ONE' },
        { id: 's2', title: 'Second step', body: 'Body TWO' },
      ],
    },
  ],
}

const make = () => {
  const position = ref<Position>({ chapterId: 'c', stepId: 's1' })
  const app = createSSRApp({
    render: () =>
      h(KrgzHayali as never, {
        lesson,
        position: position.value,
        'onUpdate:position': (p: Position) => (position.value = p),
      }),
  })
  app.use(createI18n({ legacy: false, locale: 'en', messages: { en } }))
  return app
}

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('KrgzHayali hydration', () => {
  it('hydrates server HTML without warnings and the toggle flips the active panel', async () => {
    const html = await renderToString(make())
    const el = document.createElement('div')
    el.innerHTML = html
    document.body.append(el)
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})

    make().mount(el)
    await flushPromises()

    const hydrationWarnings = warn.mock.calls.filter((c) =>
      /hydrat/i.test(String(c[0])),
    )
    expect(hydrationWarnings).toEqual([])
    expect(error).not.toHaveBeenCalled()

    const root = el.querySelector('[data-testid="krgz-hayali"]')!
    expect(root.getAttribute('data-panel')).toBe('lesson')
    const tabs = el.querySelectorAll<HTMLElement>('[role="tab"]')
    tabs[1].dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, button: 0 }),
    )
    await flushPromises()
    expect(root.getAttribute('data-panel')).toBe('sandbox')
    expect(el.querySelector('[data-testid="sandbox"]')).not.toBeNull()
    expect(el.querySelector('[data-testid="sandbox-placeholder"]')).toBeNull()
  })
})
