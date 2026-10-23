import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { previewScript } from './previewScript.ts'

type Navigation = { type: string; href: string; initial?: boolean }

const originalConsole = { ...console }
const originalHistory = {
  pushState: history.pushState,
  replaceState: history.replaceState,
}
let post: ReturnType<typeof vi.spyOn>
let listen: ReturnType<typeof vi.spyOn>

const navigations = () =>
  post.mock.calls
    .map(([message]: [Navigation]) => message)
    .filter((message: Navigation) => message.type === 'navigation')

beforeEach(() => {
  post = vi.spyOn(window, 'postMessage').mockImplementation(() => {})
  listen = vi.spyOn(window, 'addEventListener')
  new Function(previewScript)()
})

afterEach(() => {
  Object.assign(console, originalConsole)
  Object.assign(history, originalHistory)
  // The script registers window listeners; remove them so tests don't see each other's.
  for (const [type, handler] of listen.mock.calls) {
    window.removeEventListener(type, handler)
  }
  listen.mockRestore()
  post.mockRestore()
})

describe('previewScript', () => {
  it('reports the initial URL on load', () => {
    expect(navigations()).toEqual([
      { type: 'navigation', href: location.href, initial: true },
    ])
  })

  it('reports hashchange', () => {
    window.dispatchEvent(new Event('hashchange'))

    expect(navigations()).toHaveLength(2)
  })

  it('reports pushState with the new URL', () => {
    history.pushState({}, '', '/pushed?a=1')

    expect(navigations().at(-1)?.href).toBe(`${location.origin}/pushed?a=1`)
  })

  it('reports replaceState with the new URL', () => {
    history.replaceState({}, '', '/replaced')

    expect(navigations().at(-1)?.href).toBe(`${location.origin}/replaced`)
  })

  it('reports popstate with the current URL', () => {
    history.pushState({}, '', '/before-pop')
    post.mockClear()

    window.dispatchEvent(new PopStateEvent('popstate'))

    expect(navigations()).toEqual([
      { type: 'navigation', href: `${location.origin}/before-pop` },
    ])
  })
})
