// PROTOTYPE (throwaway): server HTML + hydration checks for the single-structure layout.
import { renderToString } from 'vue/server-renderer'
import { createSSRApp, nextTick, ref } from 'vue'
import { createI18n } from 'vue-i18n'
import { describe, expect, it, vi } from 'vitest'

import { en } from '../locales'
import type { Lesson, Position } from '../types'
import PrototypeHayali from './PrototypeHayali.vue'

class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', RO)

const lesson: Lesson = {
  chapters: [
    {
      id: 'c',
      title: 'Chapter',
      steps: [
        { id: 's1', title: 'First step', body: 'Body ONE-MARKER' },
        { id: 's2', title: 'Second step', body: 'Body TWO-MARKER' },
      ],
    },
  ],
}

const make = (fullLayoutFrom?: string) => {
  const position = ref<Position>({ chapterId: 'c', stepId: 's1' })
  const app = createSSRApp({
    render: () =>
      h(PrototypeHayali as never, {
        lesson,
        fullLayoutFrom,
        position: position.value,
        'onUpdate:position': (p: Position) => (position.value = p),
      }),
  })
  app.use(
    createI18n({ locale: 'en', messages: { en: { krgz: en.krgz } } }),
  )
  return app
}
import { h } from 'vue'

describe('prototype css layout', () => {
  it('server HTML has one structure and every lesson string once', async () => {
    const html = await renderToString(make())
    const count = (s: string) => html.split(s).length - 1
    expect(count('data-hf-pane="lesson"')).toBe(1)
    expect(count('data-hf-pane="sandbox"')).toBe(1)
    expect(count('data-testid="toolbar"')).toBe(1)
    expect(count('First step')).toBe(1)
    expect(count('Second step')).toBe(1)
    expect(count('layout-toggle')).toBe(1)
    console.log(html)
  })

  it('hydrates without warnings and the toggle flips data-panel', async () => {
    const html = await renderToString(make())
    const el = document.createElement('div')
    el.innerHTML = html
    document.body.appendChild(el)
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const err = vi.spyOn(console, 'error').mockImplementation(() => {})
    make().mount(el)
    await nextTick()
    expect(warn.mock.calls.filter((c) => String(c[0]).includes('ydrat'))).toEqual([])
    expect(err).not.toHaveBeenCalled()
    const root = el.querySelector('[data-testid="krgz-hayali"]')!
    expect(root.getAttribute('data-panel')).toBe('lesson')
    el.querySelectorAll<HTMLElement>('[role="tab"]')[1].dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, button: 0 }),
    )
    await nextTick()
    expect(root.getAttribute('data-panel')).toBe('sandbox')
    console.log('other warnings:', warn.mock.calls.map((c) => String(c[0]).slice(0, 120)))
  })
})
