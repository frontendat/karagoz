import type { Frame } from '@playwright/test'

import { previewScript } from '../../../../packages/sandbox/src/utils/previewScript.ts'
import { expect, test } from '../fixtures'

// A standalone harness, not a docs-UI test: the sandbox only accepts preview messages from the preview origin, which
// exists after a boot. Two made-up origins stand in for the sandbox page and the preview, served by Playwright routing.
const parentOrigin = 'http://sandbox-page.test'
const previewOrigin = 'http://preview.test'

type Message = { origin: string; data: Record<string, unknown> }

test.beforeEach(async ({ page }) => {
  await page.route(`${parentOrigin}/`, (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: `<!doctype html><title>parent</title>
        <script>
          window.messages = []
          window.addEventListener('message', (event) =>
            window.messages.push({ origin: event.origin, data: event.data }))
        </script>
        <iframe src="${previewOrigin}/start?x=1"></iframe>`,
    }),
  )
  await page.route(`${previewOrigin}/**`, (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: `<!doctype html><title>preview</title><script>${previewScript}</script>`,
    }),
  )
  await page.goto(`${parentOrigin}/`)
})

const messages = (page: import('@playwright/test').Page) =>
  page.evaluate(() => (window as unknown as { messages: Message[] }).messages)

const previewFrame = (page: import('@playwright/test').Page): Frame =>
  page.frames().find((frame) => frame.url().startsWith(previewOrigin))!

test.describe('previewScript in a cross-origin iframe', () => {
  test('the preview is genuinely cross-origin to its parent', async ({
    page,
  }) => {
    expect(await page.evaluate(() => location.origin)).toBe(parentOrigin)
    expect(await previewFrame(page).evaluate(() => location.origin)).toBe(
      previewOrigin,
    )
    // The parent cannot reach into the frame.
    expect(
      await page.evaluate(() => {
        try {
          return !!document.querySelector('iframe')!.contentDocument
        } catch {
          return false
        }
      }),
    ).toBe(false)
  })

  test('reports the initial navigation with the preview origin', async ({
    page,
  }) => {
    await expect
      .poll(() => messages(page))
      .toEqual([
        {
          origin: previewOrigin,
          data: {
            type: 'navigation',
            href: `${previewOrigin}/start?x=1`,
            initial: true,
          },
        },
      ])
  })

  test('reports pushState and replaceState', async ({ page }) => {
    await expect.poll(async () => (await messages(page)).length).toBe(1)

    await previewFrame(page).evaluate(() => history.pushState({}, '', '/a?b=2'))
    await previewFrame(page).evaluate(() => history.replaceState({}, '', '/c'))

    await expect
      .poll(async () =>
        (await messages(page))
          .slice(1)
          .map(({ origin, data }) => [origin, data.href]),
      )
      .toEqual([
        [previewOrigin, `${previewOrigin}/a?b=2`],
        [previewOrigin, `${previewOrigin}/c`],
      ])
  })

  test('reports hashchange', async ({ page }) => {
    await expect.poll(async () => (await messages(page)).length).toBe(1)

    await previewFrame(page).evaluate(() => (location.hash = '#section'))

    await expect
      .poll(async () => (await messages(page)).at(-1)?.data.href)
      .toBe(`${previewOrigin}/start?x=1#section`)
    expect((await messages(page)).at(-1)?.origin).toBe(previewOrigin)
  })

  test('reports popstate when navigating back', async ({ page }) => {
    await previewFrame(page).evaluate(() => history.pushState({}, '', '/next'))
    await expect.poll(async () => (await messages(page)).length).toBe(2)

    await previewFrame(page).evaluate(() => history.back())

    await expect
      .poll(async () => (await messages(page)).at(-1)?.data)
      .toEqual({ type: 'navigation', href: `${previewOrigin}/start?x=1` })
  })

  test('forwards console output with serialized arguments', async ({
    page,
  }) => {
    await expect.poll(async () => (await messages(page)).length).toBe(1)

    await previewFrame(page).evaluate(() => {
      console.log('hello', { a: 1 }, 2)
      console.warn('careful')
      console.error(new Error('boom'))
    })

    await expect
      .poll(async () =>
        (await messages(page))
          .slice(1)
          .map(({ origin, data }) => [origin, data.type, data.level]),
      )
      .toEqual([
        [previewOrigin, 'console', 'log'],
        [previewOrigin, 'console', 'warn'],
        [previewOrigin, 'console', 'error'],
      ])
    const [log, , error] = (await messages(page)).slice(1)
    expect(log.data.args).toEqual(['hello', '{"a":1}', '2'])
    expect((error.data.args as string[])[0]).toContain('boom')
  })

  test('forwards uncaught errors', async ({ page }) => {
    await expect.poll(async () => (await messages(page)).length).toBe(1)

    await previewFrame(page).evaluate(() =>
      setTimeout(() => {
        throw new Error('uncaught')
      }),
    )

    await expect
      .poll(async () => (await messages(page)).at(-1)?.data)
      .toEqual({
        type: 'console',
        level: 'error',
        args: [expect.stringContaining('uncaught')],
      })
  })
})
