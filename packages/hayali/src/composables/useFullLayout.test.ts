import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, ref, useTemplateRef } from 'vue'

import { type FullLayoutFrom, useFullLayout } from './useFullLayout'

let observed: undefined | ResizeObserverCallback
let flag = ''

beforeEach(() => {
  observed = undefined
  flag = ''
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(cb: ResizeObserverCallback) {
        observed = cb
      }
      observe() {}
      disconnect() {}
    },
  )
  vi.spyOn(window, 'getComputedStyle').mockImplementation(
    () =>
      ({
        getPropertyValue: (name: string) =>
          name === '--full-layout' ? flag : '',
      }) as CSSStyleDeclaration,
  )
})
afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

const setup = (from: FullLayoutFrom) => {
  const from_ = ref(from)
  let api!: ReturnType<typeof useFullLayout>
  const wrapper = mount(
    defineComponent({
      setup() {
        const el = useTemplateRef<HTMLElement>('el')
        api = useFullLayout(el, () => from_.value)
        return () => h('div', { ref: 'el' })
      },
    }),
  )
  const resize = async (value: string) => {
    flag = value
    observed?.(
      [{ target: wrapper.element } as unknown as ResizeObserverEntry],
      {} as ResizeObserver,
    )
    await nextTick()
  }
  return { api, from: from_, resize }
}

describe('useFullLayout', () => {
  it('maps each threshold to a hayali container-query flag class', () => {
    const { api, from } = setup('md')
    expect(api.fullLayoutClass.value).toBe('@md/hayali:[--full-layout:1]')
    from.value = 'xs'
    expect(api.fullLayoutClass.value).toBe('@xs/hayali:[--full-layout:1]')
    from.value = '7xl'
    expect(api.fullLayoutClass.value).toBe('@7xl/hayali:[--full-layout:1]')
  })

  it('never sets the flag for none', () => {
    const { api } = setup('none')
    expect(api.fullLayoutClass.value).toBeUndefined()
  })

  it('follows the flag read from the observed element on resize', async () => {
    const { api, resize } = setup('md')
    expect(api.fullLayout.value).toBe(true)
    await resize('')
    expect(api.fullLayout.value).toBe(false)
    await resize('1')
    expect(api.fullLayout.value).toBe(true)
  })
})
