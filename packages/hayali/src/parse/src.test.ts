// @vitest-environment node
import { describe, expect, it } from 'vitest'

import { parseLesson } from './index'

const fence = (path: string, src: string, body = '') =>
  `\`\`\`js file=${path} src=${src}\n${body}\`\`\`\n`

const files: Record<string, string> = {
  'files/server.js': 'server\n',
  'other.js': 'other\n',
}
const resolveSrc = (path: string) => files[path]

const withStep = (fences: string) => `# A {#a}\n## One {#one}\n${fences}`

describe('src= content', () => {
  it('pulls a step file from the resolver', () => {
    const { lesson, issues } = parseLesson(
      withStep(fence('server.js', './files/server.js')),
      { resolveSrc },
    )
    expect(issues).toEqual([])
    expect(lesson.chapters[0].steps[0].adjustments).toEqual({
      'server.js': { file: { contents: 'server\n' } },
    })
  })

  it('pulls a base file from the resolver', () => {
    const { lesson, issues } = parseLesson(
      `${fence('server.js', 'files/server.js')}# A {#a}\n## One {#one}\n`,
      { resolveSrc },
    )
    expect(issues).toEqual([])
    expect(lesson.files).toEqual({
      'server.js': { file: { contents: 'server\n' } },
    })
  })

  it('removes the fence from the body', () => {
    const { lesson } = parseLesson(
      withStep(`Prose.\n\n${fence('server.js', 'files/server.js')}`),
      { resolveSrc },
    )
    expect(lesson.chapters[0].steps[0].body).toBe('Prose.')
  })

  it('asks the resolver for normalized paths and lists them once', () => {
    const asked: string[] = []
    const { srcPaths } = parseLesson(
      withStep(
        fence('a.js', './files//server.js') +
          fence('b.js', 'files/server.js') +
          fence('c.js', 'a/../other.js'),
      ),
      {
        resolveSrc: (path) => {
          asked.push(path)
          return files[path]
        },
      },
    )
    expect(asked).toEqual(['files/server.js', 'files/server.js', 'other.js'])
    expect(srcPaths).toEqual(['files/server.js', 'other.js'])
  })

  it('lists paths the resolver could not find', () => {
    const { srcPaths } = parseLesson(withStep(fence('a.js', 'missing.js')), {
      resolveSrc,
    })
    expect(srcPaths).toEqual(['missing.js'])
  })
})

describe('src rules', () => {
  const cases = [
    {
      rule: 'unresolved-src',
      failing: withStep(fence('a.js', 'missing.js')),
      line: 3,
      passing: withStep(fence('a.js', 'other.js')),
    },
    {
      rule: 'invalid-src',
      failing: withStep(fence('a.js', '/etc/passwd')),
      line: 3,
      passing: withStep(fence('a.js', 'other.js')),
    },
    {
      rule: 'invalid-src',
      failing: withStep(fence('a.js', '../secret.js')),
      line: 3,
      passing: withStep(fence('a.js', 'files/../other.js')),
    },
    {
      rule: 'invalid-src',
      failing: withStep(fence('a.js', '""')),
      line: 3,
      passing: withStep(fence('a.js', 'other.js')),
    },
    {
      rule: 'invalid-src',
      failing: withStep(fence('a.js', 'C:/secret.js')),
      line: 3,
      passing: withStep(fence('a.js', 'other.js')),
    },
    {
      rule: 'src-with-body',
      failing: withStep(fence('a.js', 'other.js', 'inline\n')),
      line: 3,
      passing: withStep(fence('a.js', 'other.js')),
    },
  ]

  it.each(cases)('$rule fires on line $line', ({ rule, failing, line }) => {
    expect(parseLesson(failing, { resolveSrc }).issues).toContainEqual(
      expect.objectContaining({
        rule,
        severity: 'error',
        line,
        chapterId: 'a',
        stepId: 'one',
        path: 'a.js',
      }),
    )
  })

  it.each(cases)('$rule stays quiet on valid input', ({ rule, passing }) => {
    expect(
      parseLesson(passing, { resolveSrc }).issues.map((i) => i.rule),
    ).not.toContain(rule)
  })

  it('is unresolved without a resolver and does not ask for paths', () => {
    const { issues, srcPaths } = parseLesson(
      withStep(fence('a.js', 'other.js')),
    )
    expect(issues.map((i) => i.rule)).toEqual(['unresolved-src'])
    expect(srcPaths).toEqual([])
  })

  it('is unresolved when the resolver throws', () => {
    const { issues } = parseLesson(withStep(fence('a.js', 'other.js')), {
      resolveSrc: () => {
        throw new Error('disk on fire')
      },
    })
    expect(issues.map((i) => i.rule)).toEqual(['unresolved-src'])
  })

  it('does not ask the resolver about an invalid path', () => {
    let called = false
    parseLesson(withStep(fence('a.js', '../x.js')), {
      resolveSrc: () => ((called = true), 'x'),
    })
    expect(called).toBe(false)
  })

  it('skips the unresolved file but still compiles the step', () => {
    const { lesson } = parseLesson(
      withStep(
        `Prose.\n${fence('a.js', 'missing.js')}${fence('b.js', 'other.js')}`,
      ),
      { resolveSrc },
    )
    const step = lesson.chapters[0].steps[0]
    expect(step.body).toBe('Prose.')
    expect(step.adjustments).toEqual({
      'b.js': { file: { contents: 'other\n' } },
    })
  })

  it('lets from= reuse a file that came from src=', () => {
    const { lesson, issues } = parseLesson(
      `# A {#a}\n## One {#one}\n${fence('a.js', 'other.js')}## Two {#two}\n\`\`\`js file=a.js from=one\n\`\`\`\n`,
      { resolveSrc },
    )
    expect(issues).toEqual([])
    expect(lesson.chapters[0].steps[1].adjustments).toEqual({
      'a.js': { file: { contents: 'other\n' } },
    })
  })
})
