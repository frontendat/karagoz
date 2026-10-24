import { i18nMessages } from '@karagoz/hayali'
import { describe, expect, it } from 'vitest'
import { createSSRApp, h } from 'vue'
import { createI18n } from 'vue-i18n'
import { createMemoryHistory, createRouter } from 'vue-router'
import { renderToString } from 'vue/server-renderer'

import DemoRunner from '../../components/hayali/DemoRunner.vue'
import { createDemoLesson } from '../../lib/hayali-demo'

const render = async (locale: string, url = '/') => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { render: () => null } }],
  })
  const app = createSSRApp({ render: () => h(DemoRunner as never, { locale }) })
  app.use(createI18n({ legacy: false, locale, messages: i18nMessages }))
  app.use(router)
  await router.push(url)
  return renderToString(app)
}

describe('HayaliDemo server render', () => {
  it("has the starting chapter's step text in the server HTML, collapsed or not", async () => {
    const html = await render('en')
    const [first] = createDemoLesson('en').chapters

    for (const step of first.steps) expect(html, step.id).toContain(step.title)
    // The first step is current; the second step's body is collapsed but present.
    expect(html).toContain('Every page starts as HTML.')
    expect(html).toContain('rules for')
    expect(html).toContain(first.title)
  })

  it('renders only a placeholder for the sandbox on the server', async () => {
    const html = await render('en')

    expect(html).toContain('data-testid="sandbox-placeholder"')
  })

  it('shows the localised step list for other locales via fallback', async () => {
    const html = await render('de')

    expect(html).toContain('data-testid="krgz-hayali"')
  })

  it('server-renders the step named by ?step, so a deep link needs no client navigation', async () => {
    const html = await render('en', '/hayali?step=pages/about')

    expect(html).toContain('This step adds')
    expect(html).not.toContain('Every page starts as HTML.')
  })

  it('falls back to the starting step for an unknown ?step', async () => {
    const html = await render('en', '/hayali?step=nope/foo')

    expect(html).toContain('Every page starts as HTML.')
  })
})
