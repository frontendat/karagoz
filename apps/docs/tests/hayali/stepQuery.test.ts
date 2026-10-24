import { describe, expect, it } from 'vitest'

import { demoStart } from '../../lib/hayali-demo'
import {
  formatStepQuery,
  parseStepQuery,
} from '../../lib/hayali-demo/stepQuery'

describe('step query', () => {
  it('round-trips a position', () => {
    const position = { chapterId: 'pages', stepId: 'about' }
    expect(parseStepQuery(formatStepQuery(position))).toEqual(position)
  })

  it('formats as chapter ID and step ID joined by a slash', () => {
    expect(formatStepQuery({ chapterId: 'basics', stepId: 'style' })).toBe(
      'basics/style',
    )
  })

  it.each([undefined, null, '', 'basics', '/style', 'basics/', ['a/b', 'c/d']])(
    'is undefined for the malformed value %j',
    (value) => {
      expect(parseStepQuery(value)).toBeUndefined()
    },
  )

  it('leaves unknown IDs to the component, which falls back', () => {
    expect(parseStepQuery('nope/foo')).toEqual({
      chapterId: 'nope',
      stepId: 'foo',
    })
  })

  it('has no query for the start position, keeping default URLs clean', () => {
    expect(formatStepQuery(demoStart)).toBeUndefined()
  })
})
