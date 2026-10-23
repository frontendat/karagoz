import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let warn: ReturnType<typeof vi.spyOn>
beforeEach(() => {
  vi.resetModules()
  warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
})
afterEach(() => {
  warn.mockRestore()
  vi.unstubAllGlobals()
})

const load = async () =>
  (await import('./useIsolationWarning')).warnIfNotIsolated

describe('warnIfNotIsolated', () => {
  it('warns once when the page is not cross-origin isolated', async () => {
    vi.stubGlobal('crossOriginIsolated', false)
    const warnIfNotIsolated = await load()

    warnIfNotIsolated()
    warnIfNotIsolated()

    expect(warn).toHaveBeenCalledTimes(1)
    expect(String(warn.mock.calls[0][0])).toMatch(/cross-origin isolated/i)
  })

  it('does not warn when the page is cross-origin isolated', async () => {
    vi.stubGlobal('crossOriginIsolated', true)
    const warnIfNotIsolated = await load()

    warnIfNotIsolated()

    expect(warn).not.toHaveBeenCalled()
  })
})
