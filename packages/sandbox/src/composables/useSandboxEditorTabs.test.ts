import { describe, expect, it } from 'vitest'

import type { SandboxOptions } from '../types'
import { useSandboxEditorTabs } from './useSandboxEditorTabs.ts'

const options = { editor: {} } as SandboxOptions

describe('useSandboxEditorTabs', () => {
  it('closes only the given tab with close()', () => {
    const tabs = useSandboxEditorTabs(options)
    tabs.open('./a.js')
    tabs.open('./b.js')

    tabs.close('./a.js')

    expect(tabs.tabs.value.map(({ id }) => id)).toEqual(['./b.js'])
  })

  it('closes every open tab with closeAll()', () => {
    const tabs = useSandboxEditorTabs(options)
    tabs.open('./a.js')
    tabs.open('./b.js')
    tabs.open('./c.js')

    tabs.closeAll()

    expect(tabs.tabs.value).toEqual([])
    expect(tabs.current.value).toBeUndefined()
  })
})
