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
    KrgzSandbox: dc({ render: () => h('div', { 'data-testid': 'sandbox' }) }),
  }
})

const lesson: Lesson = {
  title: 'Demo lesson',
  chapters: [
    {
      id: 'c1',
      title: 'Chapter',
      steps: [
        { id: 's1', title: 'One', body: 'Body one' },
        { id: 's2', title: 'Two', body: 'Body two' },
        { id: 's3', title: 'Three', body: 'Body three' },
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
    '<KrgzHayali :lesson="lesson" v-model:position="position" /><i data-testid="pos">{{ position.stepId }}</i>',
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
    expect(wrapper.find('[data-testid="lesson-title"]').text()).toBe(
      'Demo lesson',
    )
  })

  it('navigates without confirm when clean', async () => {
    await wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('s2')
    expect(q('confirm-continue')).toBeNull()
    expect(
      wrapper
        .findAll('[data-testid="step-item"]')
        .map((i) => i.attributes('data-status')),
    ).toEqual(['done', 'current', 'upcoming'])
    await wrapper.find('[data-testid="prev"]').trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('s1')
  })

  it('navigates by clicking a step in the list', async () => {
    const links = wrapper.findAll('[data-testid="step-link"]')
    expect(links).toHaveLength(2)
    await links[1].trigger('click')
    await flushPromises()
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('s3')
  })

  it('cancel aborts with no state change when dirty', async () => {
    hoisted.listener?.('change', 'user.txt')
    hoisted.fs.mount.mockClear()
    await wrapper.find('[data-testid="next"]').trigger('click')
    await flushPromises()
    expect(q('confirm-continue')).not.toBeNull()
    q('confirm-cancel')!.click()
    await flushPromises()
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('s1')
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
    expect(wrapper.find('[data-testid="pos"]').text()).toBe('s2')
    expect(hoisted.fs.rm).toHaveBeenCalledWith('user.txt', {
      recursive: true,
      force: true,
    })
    expect(hoisted.fs.mount).toHaveBeenCalled()
  })
})
