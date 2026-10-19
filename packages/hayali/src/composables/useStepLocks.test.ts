import type { SandboxOptions } from '@karagoz/sandbox'
import ignore from 'ignore'
import { describe, expect, it } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'

import type { Lesson, Position } from '../types'
import {
  type SetExplorerOption,
  toSandboxPattern,
  useStepLocks,
} from './useStepLocks'

const lesson: Lesson = {
  immutable: ['package.json'],
  chapters: [
    {
      id: 'c1',
      title: 'One',
      steps: [
        { id: 's1', title: 'A', body: '', locks: ['server.js'] },
        { id: 's2', title: 'B', body: '', locks: ['public/*.css'] },
        { id: 's3', title: 'C', body: '' },
      ],
    },
    {
      id: 'c2',
      title: 'Two',
      // Same step id as in c1, different locks: scoped per step, not per id.
      steps: [{ id: 's1', title: 'D', body: '', locks: ['src/**'] }],
    },
  ],
}

const setup = (initial: Position) => {
  const explorer = ref<SandboxOptions['explorer']>({
    hidden: ['./node_modules/*'],
    readonly: ['*/node_modules'],
    reinstall: ['./package.json'],
  })
  const setOption: SetExplorerOption = (key, setter) => {
    expect(key).toBe('explorer')
    explorer.value = setter(explorer.value)
  }
  const position = ref(initial)
  const scope = effectScope()
  const locks = scope.run(() =>
    useStepLocks({ lesson: () => lesson, position, setOption }),
  )!
  const readonly = (path: string) =>
    ignore({ allowRelativePaths: true })
      .add(explorer.value.readonly ?? [])
      .ignores(path)
  return { explorer, position, locks, readonly, scope }
}

describe('toSandboxPattern', () => {
  it.each([
    ['server.js', '**/server.js'],
    ['node_modules/', '**/node_modules/'],
    ['public/*.css', './public/*.css'],
    ['/public/a.css', './public/a.css'],
    ['./src/**', './src/**'],
    ['!keep.js', '!**/keep.js'],
  ])('%s → %s', (input, output) => {
    expect(toSandboxPattern(input)).toBe(output)
  })
})

describe('useStepLocks', () => {
  it('exposes the current step locks', () => {
    const { locks } = setup({ chapterId: 'c1', stepId: 's1' })
    expect(locks.value).toEqual(['server.js'])
  })

  it('marks current step locks and immutable paths readonly, keeping sandbox defaults', () => {
    const { readonly, explorer } = setup({ chapterId: 'c1', stepId: 's1' })
    expect(readonly('./server.js')).toBe(true)
    expect(readonly('./package.json')).toBe(true)
    expect(readonly('./node_modules')).toBe(true)
    expect(readonly('./public/style.css')).toBe(false)
    expect(explorer.value.hidden).toEqual(['./node_modules/*'])
    expect(explorer.value.reinstall).toEqual(['./package.json'])
  })

  it('swaps locks reactively on step change', async () => {
    const { readonly, position, locks } = setup({
      chapterId: 'c1',
      stepId: 's1',
    })
    position.value = { chapterId: 'c1', stepId: 's2' }
    await nextTick()
    expect(locks.value).toEqual(['public/*.css'])
    expect(readonly('./server.js')).toBe(false)
    expect(readonly('./public/style.css')).toBe(true)
    expect(readonly('./node_modules')).toBe(true)

    position.value = { chapterId: 'c1', stepId: 's3' }
    await nextTick()
    expect(locks.value).toEqual([])
    expect(readonly('./public/style.css')).toBe(false)
    expect(readonly('./package.json')).toBe(true)
  })

  it('scopes locks to the step within its chapter', async () => {
    const { readonly, position } = setup({ chapterId: 'c1', stepId: 's1' })
    position.value = { chapterId: 'c2', stepId: 's1' }
    await nextTick()
    expect(readonly('./server.js')).toBe(false)
    expect(readonly('./src/main.js')).toBe(true)
  })

  it('removes its patterns on dispose, keeping sandbox defaults', () => {
    const { explorer, scope } = setup({ chapterId: 'c1', stepId: 's1' })
    scope.stop()
    expect(explorer.value.readonly).toEqual(['*/node_modules'])
  })
})
