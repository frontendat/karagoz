import { describe, expect, it } from 'vitest'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('starts at the initial value and increments', () => {
    const { count, increment } = useCounter(2)

    expect(count.value).toBe(2)
    increment()
    expect(count.value).toBe(3)
  })
})
