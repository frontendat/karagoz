import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { afterEach, describe, expect, it } from 'vitest'

import type { SandboxOptions } from '../types'
import { highlightExtension } from '../utils/codemirrorHighlight.ts'
import { useSandboxEditorTabs } from './useSandboxEditorTabs.ts'
import { useSandboxEditorViews } from './useSandboxEditorViews.ts'

const doc = ['one', 'two', 'three', 'four'].join('\n')
const mounted: EditorView[] = []

const setup = () => {
  const tabs = useSandboxEditorTabs({ editor: {} } as SandboxOptions)
  const views = useSandboxEditorViews(tabs)
  const createView = () => {
    const view = new EditorView({
      state: EditorState.create({ doc, extensions: [highlightExtension] }),
      parent: document.body,
    })
    mounted.push(view)
    return view
  }
  return { tabs, views, createView }
}

const highlightedLines = (view: EditorView) =>
  Array.from(view.dom.querySelectorAll('.krgz-cm-highlight-line')).map(
    (el) => el.textContent,
  )

afterEach(() => {
  mounted.splice(0).forEach((view) => view.destroy())
})

describe('useSandboxEditorViews', () => {
  describe('highlightLines', () => {
    it('opens the file and highlights once the view is registered by default', async () => {
      const { tabs, views, createView } = setup()
      const pending = views.highlightLines(2, './a.js')
      expect(tabs.current.value?.id).toBe('./a.js')

      views.registerView('./a.js', createView())
      await pending

      const view = mounted[0]
      expect(highlightedLines(view)).toEqual(['two'])
    })

    it('with open:false stores the range without opening a tab or waiting for the view', async () => {
      const { tabs, views } = setup()

      await views.highlightLines(2, './a.js', { open: false })

      expect(tabs.tabs.value).toEqual([])
    })

    it('with open:false re-applies the stored range when the file is opened later', async () => {
      const { views, createView } = setup()
      await views.highlightLines([2, 3], './a.js', { open: false })

      const view = createView()
      views.registerView('./a.js', view)

      expect(highlightedLines(view)).toEqual(['two', 'three'])
    })
  })

  describe('goToLine', () => {
    it('with focus:false moves the cursor without moving DOM focus', async () => {
      const { views, createView } = setup()
      const view = createView()
      views.registerView('./a.js', view)
      const other = document.createElement('input')
      document.body.append(other)
      other.focus()

      await views.goToLine(3, './a.js', { focus: false })

      expect(view.state.selection.main.head).toBe(doc.indexOf('three'))
      expect(document.activeElement).toBe(other)
      other.remove()
    })

    it('focuses the editor by default', async () => {
      const { views, createView } = setup()
      const view = createView()
      views.registerView('./a.js', view)
      const other = document.createElement('input')
      document.body.append(other)
      other.focus()

      await views.goToLine(3, './a.js')

      expect(document.activeElement).toBe(view.contentDOM)
      other.remove()
    })
  })
})
