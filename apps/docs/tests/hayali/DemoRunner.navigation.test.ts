// @vitest-environment jsdom
import { i18nMessages } from '@karagoz/hayali'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { createSSRApp, h, ref } from 'vue'
import { createI18n } from 'vue-i18n'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'

import DemoRunner from '../../components/hayali/DemoRunner.vue'

// jsdom has a `window`, so the server render would take the demo slot the hydrating app needs.
vi.mock('../../utils/demoSlot', () => ({
  acquireDemoSlot: () => ({
    immediate: true,
    ready: Promise.resolve(),
    release: () => {},
  }),
}))
// A sandbox that boots: the learner can only navigate once it has.
vi.mock('@karagoz/sandbox', async (importOriginal) => {
  const { defineComponent, ref: r, h: hh } = await import('vue')
  const fs = {
    mount: vi.fn(async () => {}),
    watch: vi.fn(() => ({ close() {} })),
    rm: vi.fn(async () => {}),
  }
  const container = r<unknown>(null)
  setTimeout(
    () => (container.value = { fs, mount: fs.mount, teardown() {} }),
    20,
  )
  return {
    ...(await importOriginal<object>()),
    useSandboxBoot: () => ({ boot: new Promise(() => {}) }),
    provideWebContainer: () => {},
    useSandbox: () => ({
      container,
      bootstrap: vi.fn(async () => {}),
      setOption: vi.fn(),
      editorTabs: {
        tabs: r([]),
        open: vi.fn(),
        close: vi.fn(),
        closeAll: vi.fn(),
      },
      editorViews: {
        highlightLines: vi.fn(),
        goToLine: vi.fn(),
        clearAllHighlightedLines: vi.fn(),
      },
      preview: { navigate: vi.fn(), reload: vi.fn(), path: r('/'), url: r('') },
    }),
    KrgzSandbox: defineComponent({
      setup: () => () => hh('div', { 'data-testid': 'sandbox' }),
    }),
  }
})

const make = async (url: string) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { render: () => null } }],
  })
  const app = createSSRApp({
    render: () => h(DemoRunner as never, { locale: 'en', key: ref(0).value }),
  })
  app.use(createI18n({ legacy: false, locale: 'en', messages: i18nMessages }))
  app.use(router)
  await router.push(url)
  return { app, router }
}

describe('HayaliDemo URL sync after the learner navigates', () => {
  it('ignores later route changes once the learner has moved on', async () => {
    const html = await renderToString((await make('/hayali')).app)
    const root = document.createElement('div')
    root.innerHTML = html
    document.body.appendChild(root)
    const { app, router } = await make('/hayali')
    app.mount(root)
    await new Promise((resolve) => setTimeout(resolve, 100))
    await flushPromises()

    root.querySelector<HTMLButtonElement>('[data-testid="next"]')!.click()
    await new Promise((resolve) => setTimeout(resolve, 100))
    await flushPromises()
    expect(router.currentRoute.value.query.step).toBe('basics/style')

    // Something other than the learner changes the URL (here: a link to another step).
    await router.replace('/hayali?step=pages/about')
    await flushPromises()

    expect(
      root.querySelector('[data-testid="chapter-title"]')?.textContent?.trim(),
    ).toBe('The page')
  })
})
