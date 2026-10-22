import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'

import { useSandboxBoot } from './useSandboxBoot.ts'

const boot = vi.hoisted(() => vi.fn())
vi.mock('@webcontainer/api', () => ({ WebContainer: { boot } }))

const unhandled: unknown[] = []
const onUnhandled = (event: PromiseRejectionEvent) => {
  unhandled.push(event.reason)
}

afterEach(() => {
  boot.mockReset()
  window.removeEventListener('unhandledrejection', onUnhandled)
  unhandled.length = 0
})

const mountBoot = () => {
  let result!: ReturnType<typeof useSandboxBoot>
  const wrapper = mount(
    defineComponent({
      setup() {
        result = useSandboxBoot()
        return () => h('div')
      },
    }),
  )
  return { wrapper, result }
}

describe('useSandboxBoot', () => {
  it('boots the web container on mount, not during setup', async () => {
    const container = { id: 'container' }
    boot.mockResolvedValue(container)
    let bootCallsDuringSetup = -1
    let result!: ReturnType<typeof useSandboxBoot>
    mount(
      defineComponent({
        setup() {
          result = useSandboxBoot()
          bootCallsDuringSetup = boot.mock.calls.length
          return () => h('div')
        },
      }),
    )

    expect(bootCallsDuringSetup).toBe(0)
    expect(boot).toHaveBeenCalledTimes(1)
    await expect(result.boot).resolves.toBe(container)
    expect(result.isBooting.value).toBe(false)
  })

  it('passes boot options through', () => {
    boot.mockResolvedValue({})
    mount(
      defineComponent({
        setup() {
          useSandboxBoot({ coep: 'credentialless' })
          return () => h('div')
        },
      }),
    )

    expect(boot).toHaveBeenCalledWith({ coep: 'credentialless' })
  })

  it('catches a boot rejection so nothing is left unhandled', async () => {
    window.addEventListener('unhandledrejection', onUnhandled)
    boot.mockRejectedValue(new Error('boot failed'))

    const { result } = mountBoot()
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(unhandled).toEqual([])
    await expect(result.boot).rejects.toThrow('boot failed')
  })
})
