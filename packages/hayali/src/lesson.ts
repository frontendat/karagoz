import type { AdjustmentsTree, Lesson, Position, Step } from './types'

/** Strips a leading `./` or `/` so lesson paths are root-relative. */
export const normalize = (path: string) => path.replace(/^\.?\/+/, '')

export const findStep = (lesson: Lesson, p: Position): Step | undefined =>
  lesson.chapters
    .find((c) => c.id === p.chapterId)
    ?.steps.find((s) => s.id === p.stepId)

/** Flat map of root-relative file path to contents. */
export type FlatTree = Map<string, string>

export const flatten = (tree: AdjustmentsTree = {}, prefix = ''): FlatTree => {
  const out: FlatTree = new Map()
  for (const [name, node] of Object.entries(tree)) {
    const path = `${prefix}${name}`
    if ('file' in node) out.set(path, node.file.contents)
    else for (const [p, c] of flatten(node.directory, `${path}/`)) out.set(p, c)
  }
  return out
}

/** A step's file tree: lesson base files overlaid with the step's adjustments, minus its removals. Not cumulative. */
export const resolveStepTree = (
  lesson: Lesson,
  step: Step | undefined,
): FlatTree => {
  const tree = new Map([
    ...flatten(lesson.files),
    ...flatten(step?.adjustments),
  ])
  for (const removed of step?.removals ?? []) tree.delete(normalize(removed))
  return tree
}
