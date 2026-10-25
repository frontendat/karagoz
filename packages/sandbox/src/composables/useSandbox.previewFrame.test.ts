import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick, watch } from 'vue'

import { provideWebContainer } from '../utils/WebContainer.ts'
import { useSandbox } from './useSandbox.ts'

vi.mock('@webcontainer/api', () => ({
  WebContainer: { boot: vi.fn() },
  reloadPreview: vi.fn(),
}))

const origin = 'https://abc.local-credentialless.webcontainer-api.io'
let serverReady: (port: number, url: string) => void
let wrapper: ReturnType<typeof mount>

const fakeContainer = () => ({
  on: vi.fn((event: string, cb: typeof serverReady) => {
    if (event === 'server-ready') serverReady = cb
  }),
  setPreviewScript: vi.fn(),
  fs: { watch: vi.fn() },
})

// The frame is bound the way KrgzPreview binds it: `:src` follows the preview URL.
const Frame = defineComponent({
  setup() {
    const { preview } = useSandbox()
    // What a consumer such as Hayali does: react to the server becoming ready by navigating, before Vue renders.
    watch(preview.url, () => preview.navigate('/about.html'))
    return () => h('iframe', { ref: preview.frame, src: preview.url.value })
  },
})

beforeEach(async () => {
  wrapper = mount(
    defineComponent({
      setup() {
        provideWebContainer(Promise.resolve(fakeContainer() as never))
        return () => h(Frame)
      },
    }),
    { attachTo: document.body },
  )
  await vi.waitFor(() => expect(serverReady).toBeTypeOf('function'))
})

afterEach(() => wrapper.unmount())

describe('useSandbox().preview with a bound frame', () => {
  it('keeps a navigation requested the moment the server becomes ready, instead of the binding resetting it to /', async () => {
    serverReady(3111, origin)
    await nextTick()
    await nextTick()

    expect(wrapper.find('iframe').element.src).toBe(`${origin}/about.html`)
  })
})
