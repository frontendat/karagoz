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

// The deployed site is prerendered, so its HTML never sees the query: the server render is always the start step. Nuxt
// also hydrates a prerendered page with the query stripped (from the route and the address bar) and restores it after
// hydration, so a demo that hydrates early (visible on load) only sees the query arrive later.
const hydrate = async (initialUrl: string) => {
  const html = await renderToString((await make('/hayali')).app)
  const root = document.createElement('div')
  root.innerHTML = html
  document.body.appendChild(root)

  const warnings: string[] = []
  const { app, router } = await make(initialUrl)
  app.config.warnHandler = (message) => warnings.push(message)
  app.mount(root)
  await flushPromises()
  const title = () =>
    root.querySelector('[data-testid="chapter-title"]')?.textContent?.trim()
  return { router, warnings, title }
}

describe('HayaliDemo deep link hydration', () => {
  it('moves to the linked step once the router restores the query after an early hydration', async () => {
    const { router, warnings, title } = await hydrate('/hayali')
    expect(title()).toBe('The page')

    await router.replace('/hayali?step=pages/about')
    await flushPromises()

    expect(warnings.filter((w) => /hydrat/i.test(w))).toEqual([])
    expect(title()).toBe('More pages')
    expect(router.currentRoute.value.query.step).toBe('pages/about')
  })

  it('moves to the linked step on mount when the router already has the query (late hydration)', async () => {
    const { warnings, title } = await hydrate('/hayali?step=pages/about')

    expect(warnings.filter((w) => /hydrat/i.test(w))).toEqual([])
    expect(title()).toBe('More pages')
  })

  it('removes an unknown ?step from the URL', async () => {
    const { router } = await hydrate('/hayali')

    await router.replace('/hayali?step=nope/foo')
    await flushPromises()

    expect(router.currentRoute.value.query.step).toBeUndefined()
  })

  it('keeps the hash when it writes the step to the URL', async () => {
    const { router } = await hydrate('/hayali#some-heading')

    await router.replace('/hayali?step=nope/foo#some-heading')
    await flushPromises()

    expect(router.currentRoute.value.query.step).toBeUndefined()
    expect(router.currentRoute.value.hash).toBe('#some-heading')
  })
})
