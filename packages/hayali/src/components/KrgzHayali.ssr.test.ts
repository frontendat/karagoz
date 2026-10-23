// @vitest-environment node
import { provideWebContainer, useSandboxBoot } from '@karagoz/sandbox'
import { describe, expect, it } from 'vitest'
import { createSSRApp, defineComponent, h } from 'vue'
import { createI18n } from 'vue-i18n'
import { renderToString } from 'vue/server-renderer'

import { i18nMessages } from '../locales'
import type { Lesson, Position } from '../types'
import KrgzHayali from './KrgzHayali.vue'

const lesson: Lesson = {
  chapters: [
    {
      id: 'c1',
      title: 'Basics',
      steps: [
        { id: 's1', title: 'First step', body: 'Body ONE-MARKER' },
        { id: 's2', title: 'Second step', body: 'Body TWO-MARKER' },
      ],
    },
    {
      id: 'c2',
      title: 'More',
      steps: [{ id: 's1', title: 'Third step', body: 'Body THREE-MARKER' }],
    },
  ],
}

const render = (position?: Position, locale = 'en') => {
  const app = createSSRApp(
    defineComponent({
      setup() {
        // Booting is mount-only, so on the server this promise simply stays pending.
        provideWebContainer(useSandboxBoot().boot)
        return () =>
          h(KrgzHayali as never, { lesson, position, fullLayoutFrom: '3xl' })
      },
    }),
  )
  app.use(createI18n({ legacy: false, locale, messages: i18nMessages }))
  return renderToString(app)
}

const count = (html: string, needle: string) => html.split(needle).length - 1

describe('KrgzHayali server render (plain Node)', () => {
  it('does not crash and leaves no unhandled rejection', async () => {
    const unhandled: unknown[] = []
    const on = (reason: unknown) => unhandled.push(reason)
    process.on('unhandledRejection', on)

    await expect(render({ chapterId: 'c1', stepId: 's1' })).resolves.toEqual(
      expect.any(String),
    )
    await new Promise((resolve) => setTimeout(resolve, 0))

    process.off('unhandledRejection', on)
    expect(unhandled).toEqual([])
  })

  it('renders one of each pane and every step body of the chapter exactly once', async () => {
    const html = await render({ chapterId: 'c1', stepId: 's1' })

    expect(count(html, 'data-hf-pane="lesson"')).toBe(1)
    expect(count(html, 'data-hf-pane="sandbox"')).toBe(1)
    expect(count(html, 'data-testid="toolbar"')).toBe(1)
    expect(count(html, 'data-testid="layout-toggle"')).toBe(1)
    expect(count(html, 'ONE-MARKER')).toBe(1)
    expect(count(html, 'TWO-MARKER')).toBe(1)
  })

  it('renders only a placeholder for the sandbox on the server', async () => {
    const html = await render({ chapterId: 'c1', stepId: 's1' })

    expect(count(html, 'data-testid="sandbox-placeholder"')).toBe(1)
    expect(html).not.toContain('krgz-sandbox')
  })

  it('collapses non-current step bodies but keeps them in the HTML', async () => {
    const html = await render({ chapterId: 'c1', stepId: 's1' })
    const doc = html.slice(
      html.indexOf('TWO-MARKER') - 400,
      html.indexOf('TWO-MARKER'),
    )

    expect(doc).toMatch(/hidden|display:\s*none/)
  })

  it('uses the consumer-supplied position', async () => {
    const html = await render({ chapterId: 'c1', stepId: 's2' })

    expect(html).toMatch(
      /data-status="current"[^>]*>(?:(?!data-status)[\s\S])*Second step/,
    )
  })

  it('falls back to the first step of the first chapter without a position', async () => {
    const html = await render(undefined)

    expect(html).toMatch(
      /data-status="current"[^>]*>(?:(?!data-status)[\s\S])*First step/,
    )
  })

  it('does not touch localStorage', async () => {
    // Node has no localStorage; reaching for it would throw a ReferenceError.
    await expect(
      render({ chapterId: 'c1', stepId: 's1' }),
    ).resolves.toBeTruthy()
  })
})
