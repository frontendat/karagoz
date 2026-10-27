import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'

import { injectWebContainer, provideWebContainer } from './WebContainer.ts'

vi.mock('@webcontainer/api', () => ({ WebContainer: { boot: vi.fn() } }))

describe('WebContainer provide / inject', () => {
  it('injects what was provided', () => {
    const promise = Promise.resolve({ id: 'container' } as never)
    let injected: unknown
    mount(
      defineComponent({
        setup() {
          provideWebContainer(promise)
          injected = injectWebContainer()
          return () => h('div')
        },
      }),
    )

    expect(injected).toBe(promise)
  })

  it('throws a helpful error when nothing was provided', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    let injected!: Promise<unknown>
    mount(
      defineComponent({
        setup() {
          injected = injectWebContainer()
          return () => h('div')
        },
      }),
    )

    expect(() => injected.then(() => {})).toThrow(
      'WebContainer instance not provided',
    )
    expect(error).toHaveBeenCalled()
    error.mockRestore()
  })
})
