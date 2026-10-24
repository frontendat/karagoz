import type { Lesson } from '@karagoz/hayali'

import { baseFiles, behaving, styled, withAbout } from './files'

/**
 * The structural half of the demo lesson: files, adjustments, removals, locks and directives keyed by step ID, with
 * no prose. Titles and bodies live in `prose/<locale>.ts` and are merged in by `createDemoLesson()`.
 *
 * Every step is built from the base files plus its own adjustments, so steps that build on each other repeat the
 * earlier adjustments.
 */
export const demoStructure = {
  files: baseFiles,
  immutable: ['package.json', 'server.js'],
  chapters: [
    {
      id: 'basics',
      steps: [
        {
          id: 'markup',
          editor: { open: ['index.html'] },
        },
        {
          id: 'style',
          adjustments: styled,
          locks: ['index.html'],
          editor: {
            open: ['style.css'],
            highlight: [
              {
                path: 'style.css',
                lines: [
                  [1, 7],
                  [13, 17],
                ],
              },
            ],
          },
        },
        {
          id: 'behaviour',
          adjustments: behaving,
          editor: {
            close: ['style.css'],
            open: [{ path: 'app.js', line: 6 }],
          },
        },
      ],
    },
    {
      id: 'pages',
      steps: [
        {
          id: 'about',
          adjustments: withAbout,
          editor: { open: ['about.html'] },
          preview: { url: '/about.html' },
        },
        {
          id: 'cleanup',
          adjustments: behaving,
          removals: ['about.html'],
          editor: { close: 'all', open: ['index.html'] },
        },
      ],
    },
  ],
} satisfies {
  files: NonNullable<Lesson['files']>
  immutable: string[]
  chapters: {
    id: string
    steps: Omit<Lesson['chapters'][number]['steps'][number], 'title' | 'body'>[]
  }[]
}
