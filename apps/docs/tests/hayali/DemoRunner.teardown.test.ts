// @vitest-environment jsdom
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'

import DemoRunner from '../../components/hayali/DemoRunner.vue'

const hoisted = vi.hoisted(() => ({
  teardown: vi.fn(),
  boot: undefined as undefined | Promise<{ teardown: () => void }>,
  resolveBoot: undefined as undefined | ((c: { teardown: () => void }) => void),
}))

vi.mock('@karagoz/sandbox', () => ({
  provideWebContainer: vi.fn(),
  useSandboxBoot: () => ({ boot: hoisted.boot }),
}))
vi.mock('@karagoz/hayali', () => ({
  KrgzHayali: defineComponent({ template: '<div />' }),
}))

const flush = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve()
}

beforeEach(() => {
  hoisted.teardown.mockClear()
  hoisted.boot = new Promise((resolve) => (hoisted.resolveBoot = resolve))
})

describe('HayaliDemo container lifetime', () => {
  it('tears the WebContainer down when the demo goes away, so revisiting the page can boot a new one', async () => {
    hoisted.resolveBoot!({ teardown: hoisted.teardown })
    const wrapper = mount(DemoRunner, { props: { locale: 'en' } })
    await flush()
    expect(hoisted.teardown).not.toHaveBeenCalled()

    wrapper.unmount()
    await flush()

    expect(hoisted.teardown).toHaveBeenCalledTimes(1)
  })

  it('still tears it down when the demo goes away before the boot has finished', async () => {
    const wrapper = mount(DemoRunner, { props: { locale: 'en' } })

    wrapper.unmount()
    await flush()
    expect(hoisted.teardown).not.toHaveBeenCalled()

    hoisted.resolveBoot!({ teardown: hoisted.teardown })
    await flush()

    expect(hoisted.teardown).toHaveBeenCalledTimes(1)
  })

  it('does not throw when the boot fails', async () => {
    hoisted.boot = Promise.reject(new Error('boot failed'))
    hoisted.boot.catch(() => {})
    const wrapper = mount(DemoRunner, { props: { locale: 'en' } })

    expect(() => wrapper.unmount()).not.toThrow()
    await flush()
  })
})
