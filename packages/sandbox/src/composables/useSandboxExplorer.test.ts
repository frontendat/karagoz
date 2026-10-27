import { describe, expect, it } from 'vitest'
import { reactive } from 'vue'

import type { SandboxOptions } from '../types'
import { useSandboxExplorer } from './useSandboxExplorer.ts'

const setup = (explorer: SandboxOptions['explorer']) => {
  const options = reactive({ explorer }) as unknown as SandboxOptions
  return { options, explorer: useSandboxExplorer(options) }
}

describe('useSandboxExplorer', () => {
  it('hides what matches the hidden patterns', () => {
    const { explorer } = setup({ hidden: ['./node_modules/*'] })

    expect(explorer.hidden.value.ignores('./node_modules/vue')).toBe(true)
    expect(explorer.hidden.value.ignores('./src/index.js')).toBe(false)
  })

  it('marks what matches the readonly patterns', () => {
    const { explorer } = setup({
      readonly: ['*/node_modules', '*/package-lock.json'],
    })

    expect(explorer.readonly.value.ignores('./package-lock.json')).toBe(true)
    expect(explorer.readonly.value.ignores('./package.json')).toBe(false)
  })

  it('matches the files that trigger a reinstall', () => {
    const { explorer } = setup({ reinstall: ['./package.json'] })

    expect(explorer.reinstall.value.ignores('./package.json')).toBe(true)
    expect(explorer.reinstall.value.ignores('./src/package.json')).toBe(false)
  })

  it('matches nothing when no patterns are configured', () => {
    const { explorer } = setup({})

    expect(explorer.hidden.value.ignores('./anything')).toBe(false)
    expect(explorer.readonly.value.ignores('./anything')).toBe(false)
    expect(explorer.reinstall.value.ignores('./anything')).toBe(false)
  })

  it('follows changes to the patterns', () => {
    const { options, explorer } = setup({ hidden: [] })
    expect(explorer.hidden.value.ignores('./secret')).toBe(false)

    options.explorer.hidden = ['./secret']

    expect(explorer.hidden.value.ignores('./secret')).toBe(true)
  })
})
