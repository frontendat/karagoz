import { expect, type Page, test as base } from '@playwright/test'

// The WebContainer is booted from these hosts. Blocking tests abort the requests so nothing depends on boot.
const webContainerHosts = ['**/*.webcontainer.io/**', '**/*.stackblitz.com/**']

export const test = base.extend({
  page: async ({ page }, use) => {
    for (const host of webContainerHosts) {
      await page.route(host, (route) => route.abort())
    }
    await use(page)
  },
})

export { expect }

/**
 * Open the demo lesson and wait until it has hydrated. The demo hydrates while it is scrolled into view
 * (`hydrate-on-visible`) and replaces the sandbox placeholder on mount, so the placeholder going away marks the end.
 * Layout shifts while the page itself hydrates can push the demo out of view again, hence the repeated scrolling.
 */
export const gotoDemo = async (page: Page, path = '/hayali') => {
  await page.goto(path)
  await expect(async () => {
    await page.getByTestId('krgz-hayali').scrollIntoViewIfNeeded()
    await expect(page.getByTestId('sandbox-placeholder')).toHaveCount(0, {
      timeout: 1000,
    })
  }).toPass({ timeout: 20_000 })
}
