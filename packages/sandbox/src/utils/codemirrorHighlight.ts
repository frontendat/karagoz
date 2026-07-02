import { StateEffect, StateField } from '@codemirror/state'
import { Decoration, DecorationSet, EditorView } from '@codemirror/view'

/**
 * Character range (document positions, not line numbers) to be highlighted.
 */
export type HighlightRange = {
  from: number
  to: number
}

/**
 * Adds a highlighted range. Dispatching this effect multiple times accumulates ranges, allowing
 * multiple disjoint highlighted regions to be visible at once.
 */
export const addHighlightRange = StateEffect.define<HighlightRange>()

/**
 * Removes all highlighted ranges from the editor.
 */
export const clearHighlightRanges = StateEffect.define()

const highlightLineMark = Decoration.line({ class: 'krgz-cm-highlight-line' })

const decorateRange = (
  doc: EditorView['state']['doc'],
  range: HighlightRange,
) => {
  const decorations = []
  let pos = range.from
  while (pos <= range.to) {
    const line = doc.lineAt(pos)
    decorations.push(highlightLineMark.range(line.from))
    pos = line.to + 1
  }
  return decorations
}

/**
 * State field tracking the set of currently highlighted line decorations. Populated via the
 * `addHighlightRange` / `clearHighlightRanges` effects.
 */
export const highlightField = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(decorations, tr) {
    let value = decorations.map(tr.changes)
    for (const effect of tr.effects) {
      if (effect.is(addHighlightRange)) {
        value = value.update({
          add: decorateRange(tr.state.doc, effect.value),
          sort: true,
        })
      } else if (effect.is(clearHighlightRanges)) {
        value = Decoration.none
      }
    }
    return value
  },
  provide: (field) => EditorView.decorations.from(field),
})

const highlightTheme = EditorView.baseTheme({
  '.krgz-cm-highlight-line': {
    backgroundColor: 'hsl(var(--accent) / 40%)',
  },
})

/**
 * CodeMirror extension enabling line highlighting. Add this to an editor's `extensions` to allow
 * dispatching `addHighlightRange` / `clearHighlightRanges` effects against its `EditorView`.
 */
export const highlightExtension = [highlightField, highlightTheme]
