import type { AdjustmentsTree } from '../types'
import type { ParseIssue, ParseIssueRule } from './types'
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
  /** Normalized paths in the step's `removals`. */
  removals?: string[]
  /** The step's `carry:` as written, with the 0-based position of the key. */
  carry?: { ref: string; line: number; column: number }
  /** Set while resolving, once `carry` names a real step and forms no cycle. */
  carryTarget?: Scope
}

export type Report = (
  rule: ParseIssueRule,
  line: number,
  message: string,
  extra?: Partial<
    Pick<ParseIssue, 'chapterId' | 'stepId' | 'path' | 'column' | 'severity'>
  >,
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

  const findScope = (
    from: Scope,
    ref: string,
    allowBase = true,
  ): Scope | undefined => {
    if (ref === 'base' && allowBase) return base
    const parts = ref.split('/')
    if (parts.length === 2) return byStep.get(ref)
    if (parts.length === 1 && from.chapterId !== undefined)
      return byStep.get(`${from.chapterId}/${ref}`)
    return undefined
  }

  const carryWhere = (scope: Scope) => ({
    chapterId: scope.chapterId,
    stepId: scope.stepId,
    column: scope.carry?.column,
  })

  for (const scope of steps) {
    if (!scope.carry) continue
    const target = findScope(scope, scope.carry.ref, false)
    if (target) scope.carryTarget = target
    else
      report(
        'carry-unknown-step',
        scope.carry.line,
        `No step "${scope.carry.ref}" to carry.`,
        carryWhere(scope),
      )
  }

  const settled = new Set<Scope>()
  for (const start of steps) {
    const walked: Scope[] = []
    let current: Scope | undefined = start
    while (current && !settled.has(current)) {
      if (walked.includes(current)) {
        report(
          'carry-cycle',
          current.carry?.line ?? 0,
          `Carrying "${current.carry?.ref}" leads back to this step.`,
          carryWhere(current),
        )
        current.carryTarget = undefined
        break
      }
      walked.push(current)
      current = current.carryTarget
    }
    for (const scope of walked) settled.add(scope)
  }

  for (const scope of steps) {
    const target = scope.carryTarget
    if (!target) continue
    const kept = new Set(scope.removals)
    const dropped = (target.removals ?? []).filter((path) => !kept.has(path))
    if (dropped.length > 0)
      report(
        'carry-drops-removals',
        scope.carry?.line ?? 0,
        `"${scope.carry?.ref}" removes ${dropped.join(', ')}, which this step carries back in.`,
        { ...carryWhere(scope), severity: 'warning' },
      )
  }

  /** The step's own entry for a path, or the one it gets through its carry. */
  const lookup = (
    scope: Scope,
    path: string,
  ): { scope: Scope; entry: FileEntry } | undefined => {
    const own = scope.entries.get(path)
    if (own) return { scope, entry: own }
    return scope.carryTarget ? lookup(scope.carryTarget, path) : undefined
  }

  const pathsOf = (scope: Scope): string[] => [
    ...new Set([
      ...(scope.carryTarget ? pathsOf(scope.carryTarget) : []),
      ...scope.entries.keys(),
    ]),
  ]

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
      const next = target && lookup(target, entry.path)
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
      else record.value = resolveEntry(next.scope, next.entry)
    }
    record.done = true
    return record.value
  }

  const trees = new Map<Scope, AdjustmentsTree>()
  for (const scope of [base, ...steps]) {
    for (const path of pathsOf(scope)) {
      const hit = lookup(scope, path)
      const contents = hit && resolveEntry(hit.scope, hit.entry)
      if (contents === undefined) continue
      let tree = trees.get(scope)
      if (!tree) trees.set(scope, (tree = {}))
      setFile(tree, path, contents)
    }
  }
  return trees
}
