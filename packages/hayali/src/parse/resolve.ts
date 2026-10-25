import type { AdjustmentsTree } from '../types'
import type { ParseIssueRule } from './types'
import { setFile } from './tree'

export type FileSource =
  | { kind: 'literal'; contents: string }
  | { kind: 'from'; ref: string }

export interface FileEntry {
  path: string
  /** 0-based line of the fence. */
  line: number
  source: FileSource
}

/** The files declared for the base tree or for one step, by normalized path. */
export interface Scope {
  chapterId?: string
  stepId?: string
  entries: Map<string, FileEntry>
}

export type Report = (
  rule: ParseIssueRule,
  line: number,
  message: string,
  extra?: { chapterId?: string; stepId?: string; path?: string },
) => void

/**
 * Expands every `from=` reference and builds each scope's tree. A file that cannot be resolved is reported and left
 * out. Only scopes with at least one resolved file appear in the result.
 */
export const resolveFiles = (
  base: Scope,
  steps: Scope[],
  report: Report,
): Map<Scope, AdjustmentsTree> => {
  const byStep = new Map<string, Scope>()
  for (const scope of steps)
    byStep.set(`${scope.chapterId}/${scope.stepId}`, scope)

  const findScope = (from: Scope, ref: string): Scope | undefined => {
    if (ref === 'base') return base
    const parts = ref.split('/')
    if (parts.length === 2) return byStep.get(ref)
    if (parts.length === 1 && from.chapterId !== undefined)
      return byStep.get(`${from.chapterId}/${ref}`)
    return undefined
  }

  const state = new Map<FileEntry, { done: boolean; value?: string }>()

  const resolveEntry = (scope: Scope, entry: FileEntry): string | undefined => {
    const where = {
      chapterId: scope.chapterId,
      stepId: scope.stepId,
      path: entry.path,
    }
    const known = state.get(entry)
    if (known) {
      if (!known.done)
        report(
          'ref-cycle',
          entry.line,
          `"${entry.path}" refers back to itself.`,
          where,
        )
      return known.value
    }
    const record: { done: boolean; value?: string } = { done: false }
    state.set(entry, record)

    if (entry.source.kind === 'literal') {
      record.value = entry.source.contents
    } else {
      const target = findScope(scope, entry.source.ref)
      const next = target?.entries.get(entry.path)
      if (!target)
        report(
          'ref-unknown-step',
          entry.line,
          `No step "${entry.source.ref}" to reuse "${entry.path}" from.`,
          where,
        )
      else if (!next)
        report(
          'ref-missing-path',
          entry.line,
          `"${entry.source.ref}" has no "${entry.path}" of its own to reuse.`,
          where,
        )
      else record.value = resolveEntry(target, next)
    }
    record.done = true
    return record.value
  }

  const trees = new Map<Scope, AdjustmentsTree>()
  for (const scope of [base, ...steps]) {
    for (const entry of scope.entries.values()) {
      const contents = resolveEntry(scope, entry)
      if (contents === undefined) continue
      let tree = trees.get(scope)
      if (!tree) trees.set(scope, (tree = {}))
      setFile(tree, entry.path, contents)
    }
  }
  return trees
}
