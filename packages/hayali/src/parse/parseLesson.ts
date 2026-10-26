import MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'

import type { Chapter, Lesson, Step } from '../types'
import { sliceBody, type LineRange } from './body'
import {
  BLOCK_PREFIX,
  LESSON_BLOCK,
  STEP_BLOCK,
  parseYamlBlock,
  readLessonBlock,
  readStepBlock,
  type BlockIssue,
  type NoteBlockIssue,
} from './blocks'
import { parseFenceInfo } from './fenceInfo'
import { readFileSource } from './fileSource'
import { resolveFiles, type Scope } from './resolve'
import { conflicts, normalizePath } from './tree'
import type {
  ParseIssue,
  ParseIssueRule,
  ParseLessonOptions,
  ParseLessonResult,
} from './types'

const md = new MarkdownIt()

const ID = /^[A-Za-z0-9_-]+$/
const HEADING_ID = /^(.*?)\s*\{#([^{}]*)\}\s*$/

/** A closing fence is only the marker, at least as long as the opening one. Quote prefixes are stripped. */
const closesFence = (line: string, markup: string): boolean => {
  const bare = line.replace(/^(\s*>)*\s*/, '').trimEnd()
  const marker = markup[0]
  return (
    bare.length >= markup.length && [...bare].every((char) => char === marker)
  )
}

interface Heading {
  level: 1 | 2
  /** 0-based first line of the heading. */
  line: number
  text: string
}

/** A built chapter, or a built step with its chapter. */
interface Owner {
  chapter: Chapter
  step?: Step
}

type Placement = Owner | 'base' | 'rejected'

const isHeading = (token: Token): boolean =>
  token.type === 'heading_open' &&
  token.level === 0 &&
  (token.tag === 'h1' || token.tag === 'h2')

const compile = (
  source: string,
  { resolveSrc }: ParseLessonOptions = {},
): ParseLessonResult => {
  const issues: ParseIssue[] = []
  const srcPaths: string[] = []
  const report = (
    rule: ParseIssueRule,
    line: number,
    message: string,
    extra: Partial<ParseIssue> = {},
  ) =>
    issues.push({ rule, severity: 'error', message, line: line + 1, ...extra })

  const lines = source.split(/\r\n|\r|\n/)
  let tokens: Token[] = []
  try {
    tokens = md.parse(source, {})
  } catch {
    tokens = []
  }

  for (const token of tokens) {
    if (token.type !== 'fence' || !token.map) continue
    const [start, end] = token.map
    if (end - start < 2 || !closesFence(lines[end - 1] ?? '', token.markup))
      report('unclosed-fence', start, 'Code fence is never closed.')
  }

  const headings: Heading[] = []
  tokens.forEach((token, i) => {
    if (!isHeading(token) || !token.map) return
    headings.push({
      level: token.tag === 'h1' ? 1 : 2,
      line: token.map[0],
      text: tokens[i + 1]?.content ?? '',
    })
  })

  const chapters: Chapter[] = []
  // `undefined` after a chapter that could not be built, so its steps are dropped quietly.
  let chapter: Chapter | undefined
  let chapterSkipped = false
  const stepLines = new Map<Step, { start: number; end: number }>()
  const chapterLines = new Map<Chapter, number>()
  const stepScopes = new Map<Step, Scope>()
  const headingOwners = new Map<Heading, Owner>()

  headings.forEach((heading, index) => {
    const next = headings[index + 1]
    const kind = heading.level === 1 ? 'Chapter' : 'Step'
    const match = HEADING_ID.exec(heading.text)
    const where =
      chapter && heading.level === 2 ? { chapterId: chapter.id } : {}

    let id: string | undefined
    if (!match) {
      report(
        'missing-id',
        heading.line,
        `${kind} heading needs an {#id}.`,
        where,
      )
    } else if (!ID.test(match[2])) {
      report(
        'invalid-id',
        heading.line,
        `${kind} id "${match[2]}" must match [A-Za-z0-9_-]+.`,
        where,
      )
    } else {
      id = match[2]
    }

    if (heading.level === 1) {
      chapterSkipped = id === undefined
      chapter = undefined
      if (id === undefined) return
      if (chapters.some((c) => c.id === id)) {
        chapterSkipped = true
        report(
          'duplicate-id',
          heading.line,
          `Chapter id "${id}" is used twice.`,
          {
            chapterId: id,
          },
        )
        return
      }
      chapter = { id, title: match![1], steps: [] }
      chapters.push(chapter)
      chapterLines.set(chapter, heading.line)
      headingOwners.set(heading, { chapter })
      return
    }

    if (!chapter) {
      if (!chapterSkipped)
        report(
          'step-outside-chapter',
          heading.line,
          'Step heading comes before any chapter heading.',
        )
      return
    }
    if (id === undefined) return
    if (chapter.steps.some((s) => s.id === id)) {
      report('duplicate-id', heading.line, `Step id "${id}" is used twice.`, {
        chapterId: chapter.id,
        stepId: id,
      })
      return
    }
    const step: Step = { id, title: match![1], body: '' }
    chapter.steps.push(step)
    // Body runs from after the heading line to the next H1/H2 (or the end of the file).
    headingOwners.set(heading, { step, chapter })
    stepScopes.set(step, {
      chapterId: chapter.id,
      stepId: step.id,
      entries: new Map(),
    })
    stepLines.set(step, {
      start: heading.line + 1,
      end: next?.line ?? lines.length,
    })
  })

  /** What the lines after a heading belong to: the base tree, a built chapter or step, or a rejected heading. */
  const placementOf = (line: number): Placement => {
    let placement: Placement = 'base'
    for (const heading of headings) {
      if (heading.line > line) break
      placement = headingOwners.get(heading) ?? 'rejected'
    }
    return placement
  }

  const baseScope: Scope = { entries: new Map() }
  const cuts = new Map<Step, LineRange[]>()
  const cut = (step: Step | undefined, range: LineRange) => {
    if (!step) return
    const ranges = cuts.get(step) ?? []
    ranges.push(range)
    cuts.set(step, ranges)
  }
  let lessonBlockSeen = false
  const stepBlockSeen = new Set<Step>()
  let lessonConfig: Pick<Lesson, 'immutable'> = {}

  const readBlock = (
    token: Token,
    name: string,
    placement: Owner | 'base',
    where: Partial<ParseIssue>,
  ) => {
    const line = token.map![0]
    const step = placement === 'base' ? undefined : placement.step
    if (name !== LESSON_BLOCK && name !== STEP_BLOCK) {
      report('unknown-fence', line, `Unknown fence "${name}".`, where)
      return
    }
    if (name === LESSON_BLOCK) {
      if (placement !== 'base') {
        report(
          'misplaced-lesson-block',
          line,
          `${LESSON_BLOCK} must come before the first chapter heading.`,
          where,
        )
        return
      }
      if (lessonBlockSeen) {
        report(
          'duplicate-lesson-block',
          line,
          `Only one ${LESSON_BLOCK} block is allowed.`,
        )
        return
      }
      lessonBlockSeen = true
    } else {
      if (!step) {
        report(
          'misplaced-step-block',
          line,
          `${STEP_BLOCK} must sit inside a step.`,
          where,
        )
        return
      }
      if (stepBlockSeen.has(step)) {
        report(
          'duplicate-step-block',
          line,
          `Only one ${STEP_BLOCK} block is allowed per step.`,
          where,
        )
        return
      }
      stepBlockSeen.add(step)
    }

    const blockIssues: BlockIssue[] = []
    const block = parseYamlBlock(token.content, line + 1, blockIssues)
    const note: NoteBlockIssue = (rule, path, message) =>
      blockIssues.push({ rule, message, ...block.at(path) })
    if (block.data) {
      if (step) {
        const { carry, ...directives } = readStepBlock(block.data, note)
        Object.assign(step, directives)
        const scope = stepScopes.get(step)
        if (scope) {
          scope.removals = (directives.removals ?? []).map(normalizePath)
          if (carry) scope.carry = { ref: carry, ...block.at('carry') }
        }
      } else {
        lessonConfig = readLessonBlock(block.data, note)
      }
    }
    for (const issue of blockIssues)
      issues.push({
        rule: issue.rule,
        severity: 'error',
        message: issue.message,
        line: issue.line + 1,
        column: issue.column,
        ...where,
      })
  }

  const readFile = (
    token: Token,
    attrs: Map<string, string>,
    placement: Owner | 'base',
    where: Partial<ParseIssue>,
  ) => {
    const line = token.map![0]
    const step = placement === 'base' ? undefined : placement.step
    if (placement !== 'base' && !step) {
      report(
        'file-outside-step',
        line,
        'A file fence must sit inside a step or before the first chapter.',
        where,
      )
      return
    }
    const path = normalizePath(attrs.get('file') ?? '')
    if (path === '') {
      report('missing-file-path', line, 'File fence needs file=<path>.', where)
      return
    }
    const fail = (rule: ParseIssueRule, message: string) =>
      report(rule, line, message, { ...where, path })
    const scope = (step && stepScopes.get(step)) || baseScope
    if (conflicts(scope.entries.keys(), path)) {
      fail('duplicate-file', `File "${path}" is defined twice.`)
      return
    }
    const source = readFileSource(
      { attrs, content: token.content, path },
      { fail, resolveSrc, srcPaths },
    )
    if (source) scope.entries.set(path, { path, line, source })
  }

  for (const token of tokens) {
    if (token.type !== 'fence' || token.level !== 0 || !token.map) continue
    const { words, attrs } = parseFenceInfo(token.info)
    const blockName = words.find((word) => word.startsWith(BLOCK_PREFIX))
    if (!blockName && !attrs.has('file')) continue
    const placement = placementOf(token.map[0])
    // The heading was already reported; its fences add nothing but noise.
    if (placement === 'rejected') continue
    const step = placement === 'base' ? undefined : placement.step
    const where =
      placement === 'base'
        ? {}
        : { chapterId: placement.chapter.id, stepId: step?.id }

    // Block and file fences are authoring syntax, not body text.
    cut(step, [token.map[0], token.map[1]])
    if (blockName) readBlock(token, blockName, placement, where)
    else readFile(token, attrs, placement, where)
  }

  const trees = resolveFiles(baseScope, [...stepScopes.values()], report)

  for (const [step, { start, end }] of stepLines) {
    step.body = sliceBody(lines, start, end, cuts.get(step) ?? [])
    const tree = trees.get(stepScopes.get(step) as Scope)
    if (tree) step.adjustments = tree
  }

  for (const c of chapters) {
    if (c.steps.length > 0) continue
    report(
      'empty-chapter',
      chapterLines.get(c) ?? 0,
      `Chapter "${c.id}" has no steps.`,
      {
        chapterId: c.id,
      },
    )
  }

  const lesson: Lesson = { chapters, ...lessonConfig }
  const baseTree = trees.get(baseScope)
  if (baseTree) lesson.files = baseTree
  return {
    lesson,
    issues: issues.sort((a, b) => a.line - b.line),
    srcPaths,
    locate: ({ chapterId, stepId, path }) => {
      const found = chapters.find((c) => c.id === chapterId)
      if (!found) return undefined
      const chapterLine = (chapterLines.get(found) ?? 0) + 1
      if (stepId === undefined) {
        const fence = path && baseScope.entries.get(normalizePath(path))
        return fence ? fence.line + 1 : chapterLine
      }
      const step = found.steps.find((x) => x.id === stepId)
      const range = step && stepLines.get(step)
      if (!step || !range) return undefined
      const fence =
        path && stepScopes.get(step)?.entries.get(normalizePath(path))
      // A heading is the line before the start of its body.
      return fence ? fence.line + 1 : range.start
    },
  }
}

/** Never throws: if compiling fails on pathological input, the result is an empty lesson with one issue. */
export const parseLesson = (
  source: string,
  options: ParseLessonOptions = {},
): ParseLessonResult => {
  try {
    return compile(source, options)
  } catch (error) {
    return {
      lesson: { chapters: [] },
      issues: [
        {
          rule: 'parser-failure',
          severity: 'error',
          message: `The lesson file could not be parsed: ${String(error)}`,
          line: 1,
        },
      ],
      srcPaths: [],
      locate: () => undefined,
    }
  }
}
