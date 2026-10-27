import { describe, expect, it } from 'vitest'

import { useSandboxTabs } from './useSandboxTabs.ts'

const ids = (tabs: { tabs: { value: { id: string }[] } }) =>
  tabs.tabs.value.map(({ id }) => id)

describe('useSandboxTabs', () => {
  describe('open', () => {
    it('starts without tabs or a current tab', () => {
      const tabs = useSandboxTabs()

      expect(tabs.tabs.value).toEqual([])
      expect(tabs.current.value).toBeUndefined()
    })

    it('adds and focuses a new tab, labelled with its id by default', () => {
      const tabs = useSandboxTabs()

      tabs.open('a')
      tabs.open('b', 'Bee')

      expect(tabs.tabs.value.map(({ label }) => label)).toEqual(['a', 'Bee'])
      expect(tabs.current.value?.id).toBe('b')
    })

    it('keeps the context of a new tab', () => {
      const tabs = useSandboxTabs<{ n: number }>()

      tabs.open('a', 'A', { n: 1 })

      expect(tabs.findTab('a')?.context).toEqual({ n: 1 })
    })

    it('gives each newly focused tab a higher order', () => {
      const tabs = useSandboxTabs()

      tabs.open('a')
      tabs.open('b')
      tabs.open('c')

      expect(tabs.tabs.value.map(({ order }) => order)).toEqual([1, 2, 3])
    })

    it('focuses an existing tab instead of duplicating it', () => {
      const tabs = useSandboxTabs()
      tabs.open('a')
      tabs.open('b')

      tabs.open('a', 'ignored label')

      expect(ids(tabs)).toEqual(['a', 'b'])
      expect(tabs.current.value?.id).toBe('a')
      expect(tabs.findTab('a')?.label).toBe('a')
    })

    it('leaves the order alone when the tab is already focused', () => {
      const tabs = useSandboxTabs()
      tabs.open('a')
      tabs.open('b')

      tabs.open('b')

      expect(tabs.findTab('b')?.order).toBe(2)
    })
  })

  describe('close', () => {
    it('removes the tab', () => {
      const tabs = useSandboxTabs()
      tabs.open('a')
      tabs.open('b')

      tabs.close('a')

      expect(ids(tabs)).toEqual(['b'])
    })

    it('focuses the tab with the highest remaining order', () => {
      const tabs = useSandboxTabs()
      tabs.open('a')
      tabs.open('b')
      tabs.open('c')
      tabs.open('a') // order: b=2, c=3, a=4

      tabs.close('a')

      expect(tabs.current.value?.id).toBe('c')
    })

    it('ignores an unknown id', () => {
      const tabs = useSandboxTabs()
      tabs.open('a')

      tabs.close('nope')

      expect(ids(tabs)).toEqual(['a'])
    })

    it('has no current tab after closing the last one', () => {
      const tabs = useSandboxTabs()
      tabs.open('a')

      tabs.close('a')

      expect(tabs.current.value).toBeUndefined()
    })

    it('restarts ordering after all tabs are closed', () => {
      const tabs = useSandboxTabs()
      tabs.open('a')
      tabs.open('b')

      tabs.closeAll()
      tabs.open('c')

      expect(tabs.tabs.value).toHaveLength(1)
      expect(tabs.findTab('c')?.order).toBe(1)
    })
  })

  describe('find', () => {
    it('finds tabs and their index by id', () => {
      const tabs = useSandboxTabs()
      tabs.open('a')
      tabs.open('b')

      expect(tabs.findTabIndex('b')).toBe(1)
      expect(tabs.findTab('b')?.id).toBe('b')
      expect(tabs.findTabIndex('nope')).toBe(-1)
      expect(tabs.findTab('nope')).toBeUndefined()
    })
  })

  describe('updateContext', () => {
    it('replaces the context with what the setter returns', () => {
      const tabs = useSandboxTabs<{ n: number }>()
      tabs.open('a', 'A', { n: 1 })

      tabs.updateContext('a', (ctx) => ({ n: ctx.n + 1 }))

      expect(tabs.findTab('a')?.context).toEqual({ n: 2 })
    })

    it('does nothing for an unknown tab or a tab without context', () => {
      const tabs = useSandboxTabs<{ n: number }>()
      tabs.open('a')

      tabs.updateContext('a', () => ({ n: 1 }))
      tabs.updateContext('nope', () => ({ n: 1 }))

      expect(tabs.findTab('a')?.context).toBeUndefined()
      expect(ids(tabs)).toEqual(['a'])
    })
  })
})
