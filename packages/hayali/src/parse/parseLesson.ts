import MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'

import type { AdjustmentsTree, Chapter, Lesson, Step } from '../types'
import { parseFenceInfo } from './fenceInfo'
import { conflicts, normalizePath, setFile } from './tree'
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

const isHeading = (token: Token): boolean =>
  token.type === 'heading_open' &&
  token.level === 0 &&
  (token.tag === 'h1' || token.tag === 'h2')

/** Never throws: a parser failure on pathological input yields an empty lesson. */
export const parseLesson = (
  source: string,
  // Consumed by the `src=` support.
  _options: ParseLessonOptions = {},
): ParseLessonResult => {
  const issues: ParseIssue[] = []
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
  const headingOwners = new Map<Heading, { step?: Step; chapter?: Chapter }>()

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
    stepLines.set(step, {
      start: heading.line + 1,
      end: next?.line ?? lines.length,
    })
  })

  // Which built step (if any) owns the lines after each heading; fences before every heading are base files.
  const ownerOf = (
    line: number,
  ): { step?: Step; chapter?: Chapter } | 'base' => {
    let owner: { step?: Step; chapter?: Chapter } | 'base' = 'base'
    for (const heading of headings) {
      if (heading.line > line) break
      owner = headingOwners.get(heading) ?? {}
    }
    return owner
  }

  const baseFiles: AdjustmentsTree = {}
  const baseTaken = new Set<string>()
  const stepFiles = new Map<
    Step,
    { tree: AdjustmentsTree; taken: Set<string> }
  >()
  const cuts = new Map<Step, [number, number][]>()

  for (const token of tokens) {
    if (token.type !== 'fence' || token.level !== 0 || !token.map) continue
    const { attrs } = parseFenceInfo(token.info)
    if (!attrs.has('file')) continue
    const line = token.map[0]
    const owner = ownerOf(line)
    const step = owner === 'base' ? undefined : owner.step
    if (owner !== 'base' && !step) continue
    const where = step
      ? {
          chapterId: owner !== 'base' ? owner.chapter?.id : undefined,
          stepId: step.id,
        }
      : {}
    if (step)
      (cuts.get(step) ?? cuts.set(step, []).get(step)!).push([
        line,
        token.map[1],
      ])

    const path = normalizePath(attrs.get('file') ?? '')
    if (path === '') {
      report('missing-file-path', line, 'File fence needs file=<path>.', where)
      continue
    }
    let files = baseFiles
    let taken = baseTaken
    if (step) {
      const entry = stepFiles.get(step) ?? {
        tree: {},
        taken: new Set<string>(),
      }
      stepFiles.set(step, entry)
      ;({ tree: files, taken } = entry)
    }
    if (conflicts(taken, path)) {
      report('duplicate-file', line, `File "${path}" is defined twice.`, {
        ...where,
        path,
      })
      continue
    }
    taken.add(path)
    setFile(files, path, token.content)
  }

  for (const [step, { start, end }] of stepLines) {
    const out: string[] = []
    let skipBlank = true
    let cursor = start
    const copy = (to: number) => {
      for (; cursor < to; cursor++) {
        const text = lines[cursor]
        if (skipBlank && text.trim() === '') continue
        skipBlank = false
        out.push(text)
      }
    }
    for (const [from, to] of (cuts.get(step) ?? []).sort(
      (x, y) => x[0] - y[0],
    )) {
      copy(from)
      cursor = to
      // A removed fence between two blank lines must not leave a double gap.
      skipBlank = out.length === 0 || out[out.length - 1].trim() === ''
    }
    copy(end)
    step.body = out.join('\n').trim()
    const files = stepFiles.get(step)
    if (files) step.adjustments = files.tree
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

  const lesson: Lesson = { chapters }
  if (baseTaken.size > 0) lesson.files = baseFiles
  return {
    lesson,
    issues: issues.sort((a, b) => a.line - b.line),
    srcPaths: [],
    locate: () => undefined,
  }
}
