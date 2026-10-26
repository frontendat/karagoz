import { describe, expect, it } from 'vitest'

import type { AdjustmentsTree, Lesson, Step } from './types'
import { type LessonIssueRule, validateLesson } from './validateLesson'

const file = (contents: string) => ({ file: { contents } })
const files: AdjustmentsTree = {
  'index.js': file('a\nb\nc'),
  'package.json': file('{}'),
  src: { directory: { 'app.js': file('1\n2\n3\n4\n5') } },
}

const lessonOf = (
  step: Partial<Step>,
  base: AdjustmentsTree = files,
): Lesson => ({
  files: base,
  chapters: [
    {
      id: 'c1',
      title: 'C',
      steps: [{ id: 's1', title: 'S', body: '', ...step }],
    },
  ],
})

const rulesOf = (step: Partial<Step>, base?: AdjustmentsTree) =>
  validateLesson(lessonOf(step, base)).map(({ rule }) => rule)

describe('validateLesson', () => {
  it('accepts a v1 lesson with no directives', () => {
    const v1: Lesson = {
      files,
      immutable: ['package.json'],
      chapters: [
        {
          id: 'c1',
          title: 'C',
          steps: [
            { id: 's1', title: 'A', body: 'x', locks: ['index.js'] },
            { id: 's2', title: 'B', body: 'y', removals: ['index.js'] },
          ],
        },
      ],
    }

    expect(validateLesson(v1)).toEqual([])
  })

  it('accepts valid directives, normalizing paths and counting adjustments', () => {
    const step: Partial<Step> = {
      adjustments: { 'new.js': file('x\ny') },
      editor: {
        open: ['./index.js', { path: '/src/app.js', line: 5 }, 'new.js'],
        close: ['index.js'],
        highlight: [
          { path: 'src/app.js', lines: [[1, 2], 4] },
          { path: './new.js', lines: 2 },
        ],
      },
      preview: { url: '/about.html?x=1#top' },
    }

    expect(validateLesson(lessonOf(step))).toEqual([])
  })

  it('accepts a descending pair as a list of two lines', () => {
    expect(
      rulesOf({ editor: { highlight: [{ path: 'index.js', lines: [3, 1] }] } }),
    ).toEqual([])
  })

  it('accepts a literal path containing glob characters when the file exists', () => {
    const base = { pages: { directory: { '[id].vue': file('x') } } }

    expect(rulesOf({ editor: { open: ['pages/[id].vue'] } }, base)).toEqual([])
  })

  it('reports instead of throwing on malformed directive shapes', () => {
    const bad = {
      editor: { open: 'x', highlight: [null], close: 'index.js' },
      preview: {},
    } as never

    expect(() => validateLesson(lessonOf(bad))).not.toThrow()
    expect(rulesOf(bad)).toEqual(
      expect.arrayContaining(['invalid-path', 'invalid-preview-url']),
    )
  })

  it('accepts close: "all"', () => {
    expect(rulesOf({ editor: { close: 'all' } })).toEqual([])
  })

  it('reports issues with their position and offending path', () => {
    const issues = validateLesson(lessonOf({ editor: { open: ['nope.js'] } }))

    expect(issues).toEqual([
      expect.objectContaining({
        rule: 'missing-file',
        chapterId: 'c1',
        stepId: 's1',
        path: 'nope.js',
      }),
    ])
  })

  const cases: [string, Partial<Step>, LessonIssueRule[]][] = [
    [
      'open on a missing file',
      { editor: { open: ['nope.js'] } },
      ['missing-file'],
    ],
    [
      'open with line on a missing file',
      { editor: { open: [{ path: 'nope.js', line: 1 }] } },
      ['missing-file'],
    ],
    [
      'highlight on a missing file',
      { editor: { highlight: [{ path: 'nope.js', lines: 1 }] } },
      ['missing-file'],
    ],
    [
      'open on a path the same step removes',
      { removals: ['index.js'], editor: { open: ['index.js'] } },
      ['removed-path'],
    ],
    [
      'highlight on a path the same step removes',
      {
        removals: ['./index.js'],
        editor: { highlight: [{ path: 'index.js', lines: 1 }] },
      },
      ['removed-path'],
    ],
    [
      'close on a path the same step removes is fine',
      { removals: ['index.js'], editor: { close: ['index.js'] } },
      [],
    ],
    ...[0, -1, 1.5, '2', NaN].map(
      (lines): [string, Partial<Step>, LessonIssueRule[]] => [
        `malformed single line ${String(lines)}`,
        {
          editor: { highlight: [{ path: 'index.js', lines: lines as never }] },
        },
        ['malformed-lines'],
      ],
    ),
    ...(
      [
        [[3, 1]],
        [[1, 2, 3]],
        [1, [2, [3, 4]]],
        [1, 'x'],
        [0, 2],
        [],
      ] as unknown[]
    ).map((lines): [string, Partial<Step>, LessonIssueRule[]] => [
      `malformed range or list ${JSON.stringify(lines)}`,
      {
        editor: { highlight: [{ path: 'index.js', lines: lines as never }] },
      },
      ['malformed-lines'],
    ]),
    [
      'malformed open line',
      { editor: { open: [{ path: 'index.js', line: 0 }] } },
      ['malformed-lines'],
    ],
    [
      'highlight beyond the end of the file',
      { editor: { highlight: [{ path: 'index.js', lines: 4 }] } },
      ['line-out-of-range'],
    ],
    [
      'highlight range ending beyond the file',
      { editor: { highlight: [{ path: 'index.js', lines: [2, 9] }] } },
      ['line-out-of-range'],
    ],
    [
      'open line beyond the end of the file',
      { editor: { open: [{ path: 'index.js', line: 4 }] } },
      ['line-out-of-range'],
    ],
    [
      'lines checked against the step tree (adjustment shortens the file)',
      {
        adjustments: { 'index.js': file('only') },
        editor: { highlight: [{ path: 'index.js', lines: 2 }] },
      },
      ['line-out-of-range'],
    ],
    ['empty path', { editor: { open: [''] } }, ['invalid-path']],
    ['dot-only path', { editor: { open: ['./'] } }, ['invalid-path']],
    [
      'parent segment',
      { editor: { open: ['src/../index.js'] } },
      ['invalid-path'],
    ],
    [
      'leading parent segment',
      { editor: { open: ['../index.js'] } },
      ['invalid-path'],
    ],
    ['glob star', { editor: { open: ['src/*.js'] } }, ['invalid-path']],
    [
      'glob question mark',
      { editor: { open: ['index.j?'] } },
      ['invalid-path'],
    ],
    ['glob brace', { editor: { close: ['{a,b}.js'] } }, ['invalid-path']],
    [
      'directory with trailing slash',
      { editor: { open: ['src/'] } },
      ['invalid-path'],
    ],
    ['directory in the tree', { editor: { open: ['src'] } }, ['invalid-path']],
    ['non-literal path', { editor: { open: [42 as never] } }, ['invalid-path']],
    ['invalid close path', { editor: { close: ['src/*'] } }, ['invalid-path']],
    [
      'preview url without leading slash',
      { preview: { url: 'about.html' } },
      ['invalid-preview-url'],
    ],
    [
      'preview url absolute',
      { preview: { url: 'https://example.com/' } },
      ['invalid-preview-url'],
    ],
    [
      'preview url protocol-relative',
      { preview: { url: '//example.com/' } },
      ['invalid-preview-url'],
    ],
    ['preview url empty', { preview: { url: '' } }, ['invalid-preview-url']],
  ]

  it.each(cases)('%s', (_name, step, expected) => {
    expect(rulesOf(step)).toEqual(expected)
  })

  it('validates every step independently (trees are not cumulative)', () => {
    const lesson: Lesson = {
      files,
      chapters: [
        {
          id: 'c1',
          title: 'C',
          steps: [
            {
              id: 's1',
              title: 'A',
              body: '',
              adjustments: { 'new.js': file('x') },
            },
            { id: 's2', title: 'B', body: '', editor: { open: ['new.js'] } },
          ],
        },
      ],
    }

    expect(validateLesson(lesson)).toEqual([
      expect.objectContaining({ rule: 'missing-file', stepId: 's2' }),
    ])
  })
})
