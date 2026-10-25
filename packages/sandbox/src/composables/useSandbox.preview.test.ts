import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'

import { provideWebContainer } from '../utils/WebContainer.ts'
import { useSandbox } from './useSandbox.ts'

vi.mock('@webcontainer/api', () => ({
  WebContainer: { boot: vi.fn() },
  reloadPreview: vi.fn(),
}))

const origin = 'https://abc.local-credentialless.webcontainer-api.io'
let serverReady: (port: number, url: string) => void
let wrapper: ReturnType<typeof mount>
let sandbox: ReturnType<typeof useSandbox>

const fakeContainer = () => ({
  on: vi.fn((event: string, cb: typeof serverReady) => {
    if (event === 'server-ready') serverReady = cb
  }),
  setPreviewScript: vi.fn(),
  fs: { watch: vi.fn() },
})

const postFromPreview = (data: unknown, from = origin) =>
  window.dispatchEvent(new MessageEvent('message', { data, origin: from }))

beforeEach(async () => {
  wrapper = mount(
    defineComponent({
      setup() {
        provideWebContainer(Promise.resolve(fakeContainer() as never))
        sandbox = useSandbox()
        return () => h('div')
      },
    }),
  )
  await vi.waitFor(() => expect(serverReady).toBeTypeOf('function'))
  serverReady(3111, origin)
  await nextTick()
})

afterEach(() => wrapper.unmount())

describe('useSandbox().preview', () => {
  describe('navigate', () => {
    it('sets the frame source relative to the preview origin', async () => {
      const frame = { src: '' } as HTMLIFrameElement
      sandbox.preview.frame.value = frame

      sandbox.preview.navigate('/about.html?x=1#top')
      await nextTick()

      expect(frame.src).toBe(`${origin}/about.html?x=1#top`)
    })

    it('does nothing without a frame', () => {
      expect(() => sandbox.preview.navigate('/about.html')).not.toThrow()
    })

    it('applies a navigation requested before the frame existed once the frame mounts', async () => {
      sandbox.preview.navigate('/about.html')

      const frame = { src: origin } as HTMLIFrameElement
      sandbox.preview.frame.value = frame
      await nextTick()

      expect(frame.src).toBe(`${origin}/about.html`)
    })

    it('applies a pending navigation only once', async () => {
      sandbox.preview.navigate('/about.html')
      sandbox.preview.frame.value = { src: origin } as HTMLIFrameElement
      await nextTick()

      const remounted = { src: origin } as HTMLIFrameElement
      sandbox.preview.frame.value = remounted
      await nextTick()

      expect(remounted.src).toBe(origin)
    })
  })

  describe('reload', () => {
    it('drops a navigation that was still waiting for the frame', async () => {
      sandbox.preview.navigate('/about.html')

      await sandbox.preview.reload()
      const frame = { src: origin } as HTMLIFrameElement
      sandbox.preview.frame.value = frame
      await nextTick()

      expect(frame.src).toBe(origin)
    })
  })

  describe('path', () => {
    it('is empty before the preview reports a location', () => {
      expect(sandbox.preview.path.value).toBe('')
    })

    it('follows navigation messages from the preview, including query and hash', async () => {
      postFromPreview({ type: 'navigation', href: `${origin}/a/b?q=1#h` })
      await nextTick()

      expect(sandbox.preview.path.value).toBe('/a/b?q=1#h')
    })

    it('ignores a malformed href', async () => {
      postFromPreview({ type: 'navigation', href: 'not a url' })
      await nextTick()

      expect(sandbox.preview.path.value).toBe('')
    })

    it('ignores messages from other origins', async () => {
      postFromPreview(
        { type: 'navigation', href: 'https://evil.test/x' },
        'https://evil.test',
      )
      await nextTick()

      expect(sandbox.preview.path.value).toBe('')
    })
  })
})
