import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, ref } from 'vue'
import { createI18n } from 'vue-i18n'

import { en } from '../locales/en'
import KrgzHayali from './KrgzHayali.vue'
import type { Lesson, Position } from '../types'

type Listener = (event: string, filename: string) => void
const hoisted = vi.hoisted(() => ({
  listener: undefined as undefined | ((e: string, f: string) => void),
  fs: {} as Record<string, ReturnType<typeof vi.fn>>,
  explorer: { readonly: ['*/node_modules'] } as { readonly?: string[] },
}))

vi.mock('@karagoz/sandbox', async () => {
  const { defineComponent: dc, ref: r, h } = await import('vue')
  hoisted.fs = {
    mount: vi.fn(async () => {}),
    watch: vi.fn((_p: string, _o: unknown, l: Listener) => {
      hoisted.listener = l
      return { close: vi.fn() }
    }),
    rm: vi.fn(async () => {}),
  }
  const container = r({ fs: hoisted.fs, mount: hoisted.fs.mount })
  return {
    useSandbox: () => ({
      container,
      bootstrap: vi.fn(async () => {}),
      editorTabs: {
        tabs: r([]),
        open: vi.fn(),
        close: vi.fn(),
        closeAll: vi.fn(),
      },
      editorViews: {
        highlightLines: vi.fn(async () => {}),
        goToLine: vi.fn(async () => {}),
        clearAllHighlightedLines: vi.fn(),
      },
      preview: {
        navigate: vi.fn(),
        reload: vi.fn(),
        path: r('/'),
        url: r('https://x.test'),
      },
      setOption: (
        _key: 'explorer',
        setter: (old: typeof hoisted.explorer) => typeof hoisted.explorer,
      ) => (hoisted.explorer = setter(hoisted.explorer)),
    }),
    KrgzSandbox: dc({
      props: ['booting', 'multiPanelFrom'],
      setup: (props: { multiPanelFrom?: string }) => () =>
        h('div', {
          'data-testid': 'sandbox',
          'data-multi-panel-from': props.multiPanelFrom,
        }),
    }),
  }
})

const lesson: Lesson = {
  chapters: [
    {
      id: 'c1',
      title: 'Basics',
      steps: [
        { id: 's1', title: 'One', body: 'Body one' },
        { id: 's2', title: 'Two', body: 'Body two', locks: ['a.txt'] },
        { id: 's3', title: 'Three', body: 'Body three' },
      ],
    },
    {
      id: 'c2',
      title: 'Advanced',
      steps: [
        { id: 's1', title: 'Four', body: 'Body four' },
        { id: 's2', title: 'Five', body: 'Body five' },
      ],
    },
  ],
  files: { 'a.txt': { file: { contents: 'a' } } },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: { en },
})

const Host = defineComponent({
  components: { KrgzHayali },
  setup: () => ({
    lesson,
    position: ref<Position>({ chapterId: 'c1', stepId: 's1' }),
  }),
  template:
    '<KrgzHayali :lesson="lesson" v-model:position="position" /><i data-testid="pos">{{ position.chapterId }}/{{ position.stepId }}</i>',
})

const body = () => document.body
const q = (id: string) =>
  body().querySelector<HTMLElement>(`[data-testid="${id}"]`)

describe('KrgzHayali', () => {
  let wrapper: ReturnType<typeof mount>
  beforeEach(async () => {
    wrapper = mount(Host, {
      global: { plugins: [i18n] },
      attachTo: document.body,
    })
    await flushPromises()
  })
  afterEach(() => wrapper.unmount())

  it('renders step list status, body and sandbox', () => {
    const items = wrapper.findAll('[data-testid="step-item"]')
    expect(items.map((i) => i.attributes('data-status'))).toEqual([
      'current',
      'upcoming',
      'upcoming',
    ])
    expect(wrapper.find('[data-testid="step-body"]').text()).toContain(
      'Body one',
    )
    expect(wrapper.find('[data-testid="sandbox"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="chapter-title"]').text()).toBe('Basics')
  })

  it('lists only the current chapter, without chapter headers', async () => {
    expect(
      wrapper.findAll('[data-testid="step-item"]').map((i) => i.text()),
    ).toEqual([
      expect.stringContaining('One'),
      expect.stringContaining('Two'),
      expect.stringContaining('Three'),
    ])
    expect(wrapper.find('nav h3').exists()).toBe(false)
    for (let i = 0; i < 3; i++) {
      await wrapper.find('[data-testid="next"]').trigger('click')
      await flushPromises()
    }
    const items = wrapper.findAll('[data-testid="step-item"]')
    expect(items.map((i) => i.attributes('data-status'))).toEqual([
      'current',
      'upcoming',
    ])
    expect(items[0].text()).toContain('Four')
    expect(wrapper.find('[data-testid="chapter-title"]').text()).toBe(
      'Advanced',
    )
  })

  it('navigates without confirm when clean', async () => {
    await wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('c1/s2')
    expect(q('confirm-continue')).toBeNull()
    expect(
      wrapper
        .findAll('[data-testid="step-item"]')
        .map((i) => i.attributes('data-status')),
    ).toEqual(['done', 'current', 'upcoming'])
    await wrapper.find('[data-testid="prev"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('c1/s1')
  })

  it('navigates by clicking a step in the list', async () => {
    const links = wrapper.findAll('[data-testid="step-link"]')
    expect(links).toHaveLength(2)
    await links[1].trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('c1/s3')
  })

  it('TOC click jumps via the confirm-nav flow', async () => {
    await wrapper.find('[data-testid="toc-trigger"]').trigger('keydown', {
      key: 'Enter',
    })
    await flushPromises()
    hoisted.listener?.('change', 'user.txt')
    body().querySelectorAll<HTMLElement>('[data-testid="toc-step"]')[2].click()
    await flushPromises()
    expect(q('confirm-continue')).not.toBeNull()
    q('confirm-continue')!.click()
    await flushPromises()
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('c1/s3')
  })

  it('cancel aborts with no state change when dirty', async () => {
    hoisted.listener?.('change', 'user.txt')
    hoisted.fs.mount.mockClear()
    await wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()
    expect(q('confirm-continue')).not.toBeNull()
    q('confirm-cancel')!.click()
    await flushPromises()
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('c1/s1')
    expect(hoisted.fs.mount).not.toHaveBeenCalled()
    expect(hoisted.fs.rm).not.toHaveBeenCalled()
  })

  it('continue resets and navigates when dirty', async () => {
    hoisted.listener?.('change', 'user.txt')
    hoisted.fs.mount.mockClear()
    await wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()
    q('confirm-continue')!.click()
    await flushPromises()
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('c1/s2')
    expect(hoisted.fs.rm).toHaveBeenCalledWith('user.txt', {
      recursive: true,
      force: true,
    })
    expect(hoisted.fs.mount).toHaveBeenCalled()
  })

  it('alerts and marks readonly the current step locks only', async () => {
    expect(wrapper.find('[data-testid="step-locks"]').exists()).toBe(false)
    expect(hoisted.explorer.readonly).toEqual(['*/node_modules'])

    await wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()
    const alert = wrapper.find('[data-testid="step-locks"]')
    expect(alert.text()).toContain('Heads up!')
    expect(alert.text()).toContain('a.txt is locked for this step.')
    expect(hoisted.explorer.readonly).toEqual(['*/node_modules', '**/a.txt'])

    await wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="step-locks"]').exists()).toBe(false)
    expect(hoisted.explorer.readonly).toEqual(['*/node_modules'])
  })

  it('still treats edits to locked files as dirty', async () => {
    await wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()
    // The first event is the echo of our own mount (the mock mount emits none).
    hoisted.listener?.('change', 'a.txt')
    hoisted.listener?.('change', 'a.txt')
    await wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()
    expect(q('confirm-continue')).not.toBeNull()
    q('confirm-cancel')!.click()
    await flushPromises()
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('c1/s2')
  })

  it('passes multiPanelFrom to the default sandbox, 3xl by default', () => {
    expect(
      wrapper
        .find('[data-testid="sandbox"]')
        .attributes('data-multi-panel-from'),
    ).toBe('3xl')
  })

  it('exposes ready and multiPanelFrom on the sandbox slot', async () => {
    const custom = mount(
      defineComponent({
        components: { KrgzHayali },
        setup: () => ({
          lesson,
          position: ref<Position>({ chapterId: 'c1', stepId: 's1' }),
        }),
        template: `<KrgzHayali :lesson="lesson" v-model:position="position" multi-panel-from="lg">
            <template #sandbox="{ ready, multiPanelFrom }">
              <i data-testid="slot">{{ ready }}/{{ multiPanelFrom }}</i>
            </template>
          </KrgzHayali>`,
      }),
      { global: { plugins: [i18n] } },
    )
    await flushPromises()
    expect(custom.find('[data-testid="slot"]').text()).toBe('true/lg')
    custom.unmount()
  })

  it('renders one structure with the layout chosen by CSS (fullLayoutFrom), not JS', () => {
    const root = wrapper.find('[data-testid="krgz-hayali"]')
    expect(root.attributes('data-panel')).toBe('lesson')
    expect(root.find('.hf-root').attributes('data-from')).toBe('3xl')
    expect(wrapper.findAll('[data-testid="toolbar"]')).toHaveLength(1)
    expect(wrapper.findAll('[data-testid="layout-toggle"]')).toHaveLength(1)
    expect(wrapper.findAll('[data-hf-pane]')).toHaveLength(2)
  })

  it('switches the active panel with the Lesson/Sandbox toggle', async () => {
    const tabs = wrapper.findAll('[data-testid="layout-toggle"] [role="tab"]')
    expect(tabs.map((t) => t.text())).toEqual(['Lesson', 'Sandbox'])
    const root = wrapper.find('[data-testid="krgz-hayali"]')

    await tabs[1].trigger('mousedown', { button: 0 })
    expect(root.attributes('data-panel')).toBe('sandbox')

    await tabs[0].trigger('mousedown', { button: 0 })
    expect(root.attributes('data-panel')).toBe('lesson')
  })

  it('navigates from the toolbar and keeps the selected panel', async () => {
    const tabs = wrapper.findAll('[data-testid="layout-toggle"] [role="tab"]')
    await tabs[1].trigger('mousedown', { button: 0 })

    await wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()

    expect(wrapper.find('[data-testid="pos"]').text()).toBe('c1/s2')
    expect(
      wrapper.find('[data-testid="krgz-hayali"]').attributes('data-panel'),
    ).toBe('sandbox')
  })

  it('mirrors the prev/next icons in RTL', () => {
    for (const id of ['prev', 'next'])
      expect(wrapper.find(`[data-testid="${id}"] svg`).classes()).toContain(
        'rtl:-scale-x-100',
      )
  })

  it('falls back to the first step, writes it back and warns when position is unknown', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const bad = mount(Host, {
      global: { plugins: [i18n] },
      attachTo: document.body,
    })
    bad.vm.position = { chapterId: 'c1', stepId: 'foo' }
    await flushPromises()
    expect(bad.find('[data-testid="pos"]').text()).toBe('c1/s1')
    expect(
      warn.mock.calls.filter((c) => /foo/.test(String(c[0]))),
    ).toHaveLength(1)
    warn.mockRestore()
    bad.unmount()
  })

  it('warns once, in dev, when the page is not cross-origin isolated', async () => {
    vi.resetModules()
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { warnIfNotIsolated } =
      await import('../composables/useIsolationWarning')
    warnIfNotIsolated()
    warnIfNotIsolated()
    expect(
      warn.mock.calls.filter((c) =>
        /cross-origin isolated/i.test(String(c[0])),
      ),
    ).toHaveLength(1)
    warn.mockRestore()
  })
})
