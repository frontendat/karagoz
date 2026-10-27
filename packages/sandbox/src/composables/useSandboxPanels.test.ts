import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

import type { Panel } from '../types'
import { useSandboxPanels } from './useSandboxPanels.ts'

const setup = ({
  available = ['code', 'processes', 'result', 'terminal'],
  shown = ['code', 'result'],
  multi = true,
}: {
  available?: Panel[]
  shown?: Panel[]
  multi?: boolean
} = {}) => {
  const availablePanels = ref<Panel[]>(available)
  const shownPanels = ref<Panel[]>(shown)
  const multiPanel = ref(multi)
  const panels = useSandboxPanels(availablePanels, shownPanels, multiPanel)
  return { ...panels, availablePanels, shownPanels, multiPanel }
}

describe('useSandboxPanels', () => {
  describe('initial state', () => {
    it('keeps a valid selection as is', () => {
      const { shownPanels } = setup({ shown: ['result', 'terminal'] })

      expect(shownPanels.value).toEqual(['result', 'terminal'])
    })

    it('keeps only one drawer panel, the last one listed', () => {
      const { shownPanels } = setup({
        shown: ['code', 'terminal', 'processes'],
      })

      expect(shownPanels.value).toEqual(['code', 'processes'])
    })

    it('force-shows code when no main panel is shown', () => {
      const { shownPanels } = setup({ shown: ['terminal'] })

      expect(shownPanels.value).toEqual(['terminal', 'code'])
    })

    it('drops panels that are not available', () => {
      const { shownPanels } = setup({
        available: ['code', 'result'],
        shown: ['code', 'terminal'],
      })

      expect(shownPanels.value).toEqual(['code'])
    })
  })

  describe('availablePanels changes', () => {
    it('hides panels that stop being available', () => {
      const { availablePanels, shownPanels, isShown } = setup()

      availablePanels.value = ['code', 'terminal']
      return Promise.resolve().then(() => {
        expect(shownPanels.value).toEqual(['code'])
        expect(isShown.value.result).toBe(false)
      })
    })
  })

  describe('isShown / actualShownPanels', () => {
    it('is a record of every panel', () => {
      const { isShown } = setup({ shown: ['code', 'terminal'] })

      expect(isShown.value).toEqual({
        code: true,
        processes: false,
        result: false,
        terminal: true,
      })
    })

    it('shows only the first panel when not in multi-panel mode', () => {
      const { actualShownPanels, isShown } = setup({
        shown: ['result', 'code'],
        multi: false,
      })

      expect(actualShownPanels.value).toEqual(['result'])
      expect(isShown.value.code).toBe(false)
    })

    it('switches between one and several panels with multiPanel', () => {
      const { actualShownPanels, multiPanel } = setup()
      expect(actualShownPanels.value).toEqual(['code', 'result'])

      multiPanel.value = false

      expect(actualShownPanels.value).toEqual(['code'])
    })
  })

  describe('togglePanel, multi-panel', () => {
    it('adds a hidden main panel and removes a shown one', () => {
      const { togglePanel, shownPanels } = setup({ shown: ['code'] })

      togglePanel('result')
      expect(shownPanels.value).toEqual(['code', 'result'])

      togglePanel('code')
      expect(shownPanels.value).toEqual(['result'])
    })

    it('never hides the only shown main panel', () => {
      const { togglePanel, shownPanels } = setup({ shown: ['code'] })

      togglePanel('code')

      expect(shownPanels.value).toEqual(['code'])
    })

    it('shows a drawer panel next to the main panels', () => {
      const { togglePanel, shownPanels } = setup()

      togglePanel('terminal')

      expect(shownPanels.value).toEqual(['code', 'result', 'terminal'])
    })

    it('replaces the open drawer panel with the toggled one', () => {
      const { togglePanel, shownPanels } = setup({
        shown: ['code', 'terminal'],
      })

      togglePanel('processes')

      expect(shownPanels.value).toEqual(['code', 'processes'])
    })

    it('closes the drawer when its shown panel is toggled', () => {
      const { togglePanel, shownPanels } = setup({
        shown: ['code', 'terminal'],
      })

      togglePanel('terminal')

      expect(shownPanels.value).toEqual(['code'])
    })
  })

  describe('togglePanel, single panel', () => {
    it('brings the toggled panel to the front', () => {
      const { togglePanel, shownPanels, actualShownPanels } = setup({
        multi: false,
      })

      togglePanel('result')

      expect(shownPanels.value).toEqual(['result', 'code'])
      expect(actualShownPanels.value).toEqual(['result'])
    })

    it('drops the other drawer panel when toggling a drawer panel', () => {
      const { togglePanel, shownPanels } = setup({
        shown: ['code', 'terminal'],
        multi: false,
      })

      togglePanel('processes')

      expect(shownPanels.value).toEqual(['processes', 'code'])
    })
  })

  describe('toggleDrawer', () => {
    it('does nothing when no drawer panel was ever shown', () => {
      const { toggleDrawer, shownPanels } = setup()

      toggleDrawer()

      expect(shownPanels.value).toEqual(['code', 'result'])
    })

    it('collapses a shown drawer and reopens the same panel', () => {
      const { toggleDrawer, shownPanels } = setup({
        shown: ['code', 'processes'],
      })

      toggleDrawer()
      expect(shownPanels.value).toEqual(['code'])

      toggleDrawer()
      expect(shownPanels.value).toEqual(['code', 'processes'])
    })

    it('reopens the drawer panel that was shown last', () => {
      const { togglePanel, toggleDrawer, shownPanels } = setup()
      togglePanel('terminal')
      togglePanel('processes')

      toggleDrawer()
      toggleDrawer()

      expect(shownPanels.value).toEqual(['code', 'result', 'processes'])
    })
  })
})
