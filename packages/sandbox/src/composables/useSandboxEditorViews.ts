import { EditorView } from '@codemirror/view'
import { until } from '@vueuse/core'
import { nextTick, shallowReactive } from 'vue'

import {
  addHighlightRange,
  clearHighlightRanges,
} from '../utils/codemirrorHighlight.ts'
import { useSandboxEditorTabs } from './useSandboxEditorTabs.ts'
import { HighlightLines } from '../types'

/**
 * Registry of live CodeMirror `EditorView` instances, keyed by file path, plus methods to
 * highlight and scroll to lines in those editors. An editor tab can be mounted (and thus
 * registered here) without being the currently focused tab, since `KrgzEditorTabs` keeps all open
 * editors alive and toggles their visibility.
 */
export const useSandboxEditorViews = (
  editorTabs: ReturnType<typeof useSandboxEditorTabs>,
) => {
  const views: Map<string, EditorView> = shallowReactive(new Map())

  /**
   * Register a file path's `EditorView` instance. Called internally by `KrgzEditor` once
   * CodeMirror is ready.
   * @param path
   * @param view
   */
  const registerView = (path: string, view: EditorView) => {
    views.set(path, view)
  }

  /**
   * Unregister a file path's `EditorView` instance. Called internally by `KrgzEditor` when the
   * editor tab is closed.
   * @param path
   */
  const unregisterView = (path: string) => {
    views.delete(path)
  }

  const resolveTargetPath = (path?: string) => {
    if (path) {
      editorTabs.open(path)
      return path
    }
    return editorTabs.current.value?.id
  }

  const getReadyView = async (path: string) => {
    await until(() => views.has(path)).toBe(true)
    // Let the tab's `v-show` toggle settle before CodeMirror measures the viewport.
    await nextTick()
    return views.get(path)
  }

  const lineRange = (
    doc: EditorView['state']['doc'],
    lines: HighlightLines,
  ) => {
    const [start, end] = Array.isArray(lines) ? lines : [lines, lines]
    const clamp = (line: number) => Math.min(Math.max(line, 1), doc.lines)
    return {
      from: doc.line(clamp(start)).from,
      to: doc.line(clamp(end)).to,
    }
  }

  /**
   * Highlight one or more lines in an editor. Repeated calls are additive, so multiple disjoint
   * ranges can be highlighted at the same time. If `path` refers to a file that isn't open yet,
   * it is opened and focused first.
   * @param lines a single line number, or a `[from, to]` inclusive range.
   * @param path file path of the editor to highlight in. Defaults to the currently focused tab.
   */
  const highlightLines = async (lines: HighlightLines, path?: string) => {
    const targetPath = resolveTargetPath(path)
    if (!targetPath) return
    const view = await getReadyView(targetPath)
    if (!view) return
    view.dispatch({
      effects: addHighlightRange.of(lineRange(view.state.doc, lines)),
    })
  }

  /**
   * Scroll a line into view, centering it vertically. If `path` refers to a file that isn't open
   * yet, it is opened and focused first.
   * @param line line number to scroll into view.
   * @param path file path of the editor to scroll. Defaults to the currently focused tab.
   */
  const scrollToLine = async (line: number, path?: string) => {
    const targetPath = resolveTargetPath(path)
    if (!targetPath) return
    const view = await getReadyView(targetPath)
    if (!view) return
    const { from } = lineRange(view.state.doc, line)
    view.dispatch({ effects: EditorView.scrollIntoView(from, { y: 'center' }) })
  }

  /**
   * Clear all highlighted lines in one editor. No-op if `path` isn't currently open.
   * @param path file path of the editor to clear. Defaults to the currently focused tab.
   */
  const clearHighlightedLines = (path?: string) => {
    const targetPath = path ?? editorTabs.current.value?.id
    const view = targetPath ? views.get(targetPath) : undefined
    view?.dispatch({ effects: clearHighlightRanges.of(null) })
  }

  /**
   * Clear highlighted lines across every open editor, not just one path.
   */
  const clearAllHighlightedLines = () => {
    for (const view of views.values()) {
      view.dispatch({ effects: clearHighlightRanges.of(null) })
    }
  }

  return {
    registerView,
    unregisterView,
    highlightLines,
    scrollToLine,
    clearHighlightedLines,
    clearAllHighlightedLines,
  }
}
