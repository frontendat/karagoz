// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useSandboxBoot } from './useSandboxBoot.ts'

const boot = vi.hoisted(() => vi.fn())
vi.mock('@webcontainer/api', () => ({ WebContainer: { boot } }))

const unhandled: unknown[] = []
const onUnhandled = (reason: unknown) => unhandled.push(reason)

afterEach(() => {
  boot.mockReset()
  process.off('unhandledRejection', onUnhandled)
  unhandled.length = 0
})

describe('useSandboxBoot on the server (plain Node)', () => {
  it('does not boot the web container outside a mounted component', async () => {
    process.on('unhandledRejection', onUnhandled)

    const { isBooting } = useSandboxBoot()
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(boot).not.toHaveBeenCalled()
    expect(isBooting.value).toBe(true)
    expect(unhandled).toEqual([])
  })
})
