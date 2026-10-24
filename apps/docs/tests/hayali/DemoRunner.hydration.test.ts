// @vitest-environment jsdom
import { i18nMessages } from '@karagoz/hayali'
import { flushPromises } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { createSSRApp, h } from 'vue'
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

const make = async (url: string) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { render: () => null } }],
  })
  const app = createSSRApp({
    render: () => h(DemoRunner as never, { locale: 'en' }),
  })
  app.use(createI18n({ legacy: false, locale: 'en', messages: i18nMessages }))
  app.use(router)
  await router.push(url)
  return { app, router }
}

// The deployed site is prerendered, so its HTML never sees the query: the server render is always the start step.
describe('HayaliDemo deep link hydration', () => {
  it('hydrates over the static start-step HTML without mismatches, then moves to the linked step', async () => {
    const html = await renderToString((await make('/hayali')).app)
    const root = document.createElement('div')
    root.innerHTML = html
    document.body.appendChild(root)

    const warnings: string[] = []
    const { app, router } = await make('/hayali?step=pages/about')
    app.config.warnHandler = (message) => warnings.push(message)
    app.mount(root)
    await flushPromises()

    expect(warnings.filter((w) => /hydrat/i.test(w))).toEqual([])
    expect(
      root.querySelector('[data-testid="chapter-title"]')?.textContent?.trim(),
    ).toBe('More pages')
    expect(router.currentRoute.value.query.step).toBe('pages/about')
  })

  it('heals an unknown ?step to the start step', async () => {
    const html = await renderToString((await make('/hayali')).app)
    const root = document.createElement('div')
    root.innerHTML = html
    document.body.appendChild(root)

    const { app, router } = await make('/hayali?step=nope/foo')
    app.mount(root)
    await flushPromises()

    expect(router.currentRoute.value.query.step).toBeUndefined()
  })
})
