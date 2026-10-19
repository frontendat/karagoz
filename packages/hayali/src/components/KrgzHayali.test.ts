import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, ref } from 'vue'
import { createI18n } from 'vue-i18n'

import { en } from '../locales'
import KrgzHayali from './KrgzHayali.vue'
import type { Lesson, Position } from '../types'

type Listener = (event: string, filename: string) => void
const hoisted = vi.hoisted(() => ({
  listener: undefined as undefined | ((e: string, f: string) => void),
  fs: {} as Record<string, ReturnType<typeof vi.fn>>,
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
    useSandbox: () => ({ container, bootstrap: vi.fn(async () => {}) }),
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
        { id: 's2', title: 'Two', body: 'Body two' },
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

  it('passes multiPanelFrom to the default sandbox, md by default', () => {
    expect(
      wrapper
        .find('[data-testid="sandbox"]')
        .attributes('data-multi-panel-from'),
    ).toBe('md')
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

  it('uses the desktop split with no Lesson/Sandbox toggle by default', () => {
    expect(wrapper.find('[data-testid="layout-toggle"]').exists()).toBe(false)
    expect(
      wrapper.find('[data-testid="krgz-hayali"] > div').classes(),
    ).toContain('@3xl/hayali:[--full-layout:1]')
    expect(wrapper.find('[data-testid="toolbar"]').exists()).toBe(true)
  })
})

describe('KrgzHayali below fullLayoutFrom', () => {
  let wrapper: ReturnType<typeof mount>
  beforeEach(async () => {
    // Below the container-query threshold `--full-layout` is unset.
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(private cb: ResizeObserverCallback) {}
        observe(target: Element) {
          this.cb(
            [{ target } as ResizeObserverEntry],
            this as unknown as ResizeObserver,
          )
        }
        disconnect() {}
      },
    )
    wrapper = mount(Host, {
      global: { plugins: [i18n] },
      attachTo: document.body,
    })
    await flushPromises()
  })
  afterEach(() => {
    wrapper.unmount()
    vi.unstubAllGlobals()
  })

  const visible = (id: string) =>
    wrapper.find(`[data-testid="${id}"]`).isVisible()

  it('shows a single panel, switched by the Lesson/Sandbox toggle', async () => {
    const tabs = wrapper.findAll('[data-testid="layout-toggle"] [role="tab"]')
    expect(tabs.map((t) => t.text())).toEqual(['Lesson', 'Sandbox'])
    expect(visible('step-body')).toBe(true)
    expect(visible('sandbox')).toBe(false)

    await tabs[1].trigger('mousedown', { button: 0 })
    expect(visible('step-body')).toBe(false)
    expect(visible('sandbox')).toBe(true)

    await tabs[0].trigger('mousedown', { button: 0 })
    expect(visible('step-body')).toBe(true)
  })

  it('places the nav bar after the content and navigates from it', async () => {
    const root = wrapper.find('[data-testid="krgz-hayali"]').element
    const toolbar = wrapper.find('[data-testid="toolbar"]').element
    const toggle = wrapper.find('[data-testid="layout-toggle"]').element
    expect(root.lastElementChild?.contains(toolbar)).toBe(true)
    expect(
      toggle.compareDocumentPosition(toolbar) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()

    await wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('c1/s2')
  })

  it('keeps the selected panel across step navigation', async () => {
    const tabs = wrapper.findAll('[data-testid="layout-toggle"] [role="tab"]')
    await tabs[1].trigger('mousedown', { button: 0 })
    await wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()
    expect(visible('sandbox')).toBe(true)
  })
})
