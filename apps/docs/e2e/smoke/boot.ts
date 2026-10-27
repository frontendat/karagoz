import { expect, type Page } from '@playwright/test'

import { gotoDemo } from '../fixtures'

const bootTimeout = 45_000

/**
 * Open the demo lesson and wait for the real WebContainer to boot. Cross-origin isolation is asserted first: without
 * it the container can never boot, and failing there says so instead of timing out. The toolbar is enabled once the
 * lesson's files are mounted in the container, which is when the boot is done.
 */
export const bootDemo = async (page: Page, path = '/hayali') => {
  await gotoDemo(page, path)
  expect(
    await page.evaluate(() => crossOriginIsolated),
    'the page is not cross-origin isolated, so the WebContainer cannot boot',
  ).toBe(true)
  await expect(
    page.getByTestId('next'),
    `the WebContainer did not boot within ${bootTimeout / 1000}s (are the StackBlitz hosts reachable?)`,
  ).toBeEnabled({ timeout: bootTimeout })
}
