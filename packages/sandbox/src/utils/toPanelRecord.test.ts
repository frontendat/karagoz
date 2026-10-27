import { describe, expect, it } from 'vitest'

import { toPanelRecord } from './toPanelRecord.ts'

describe('toPanelRecord', () => {
  it('flags the shown panels and only those', () => {
    expect(toPanelRecord(['code', 'terminal'])).toEqual({
      code: true,
      processes: false,
      result: false,
      terminal: true,
    })
  })

  it('has every panel set to false when none is shown', () => {
    expect(Object.values(toPanelRecord([]))).toEqual([
      false,
      false,
      false,
      false,
    ])
  })
})
