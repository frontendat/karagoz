/**
 * Hayali demos share one sandbox (`useSandbox` is a singleton bound to the WebContainer of whoever created it first)
 * and only one WebContainer can run at a time. Navigating between two pages with a demo mounts the new demo before the
 * old one is gone, so demos take turns: a demo only starts once every earlier demo has released its slot.
 */
let tail: Promise<void> = Promise.resolve()
let pending = 0

export const acquireDemoSlot = () => {
  // The server renders every demo once per request and never tears one down: nothing to take turns over.
  if (typeof window === 'undefined')
    return { immediate: true, ready: Promise.resolve(), release: () => {} }
  const previous = tail
  const immediate = pending === 0
  pending++
  let release!: () => void
  const released = new Promise<void>((resolve) => (release = resolve))
  tail = Promise.all([previous, released]).then(() => {
    pending--
  })
  return {
    /** True when no other demo is alive, which is always the case on the server and on a first visit. */
    immediate,
    /** Resolves once all earlier demos are gone. */
    ready: previous,
    release,
  }
}
