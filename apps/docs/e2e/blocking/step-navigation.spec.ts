import { expect, gotoDemo, test } from '../fixtures'

test.use({ viewport: { width: 1440, height: 900 } })

const current = (page: import('@playwright/test').Page) =>
  page.locator('[data-testid="step-item"][data-status="current"]')

// Without a booted container (the blocking tier never boots one) the toolbar stays disabled, so moving between steps
// by clicking is covered by the smoke tier. What is observable here is where the lesson starts: the first step, or
// the one the URL names once the page has mounted.
test.describe('step navigation', () => {
  test('starts on the first step with the toolbar waiting for the sandbox', async ({
    page,
  }) => {
    await gotoDemo(page)

    await expect(current(page)).toContainText('Markup')
    await expect(page.getByTestId('toolbar')).toBeVisible()
    await expect(page.getByTestId('prev')).toBeDisabled()
    await expect(page.getByTestId('next')).toBeDisabled()
    await expect(page.getByTestId('toc-trigger')).toBeDisabled()
  })

  test('applies ?step= after mount', async ({ page }) => {
    await gotoDemo(page, '/hayali?step=basics/style')

    await expect(current(page)).toContainText('Style')
    await expect(page).toHaveURL(/step=basics(%2F|\/)style/)
  })

  test('applies a step in a later chapter', async ({ page }) => {
    await gotoDemo(page, '/hayali?step=pages/about')

    await expect(current(page)).toContainText('A second page')
  })

  test('falls back to the first step for an unknown ?step=', async ({
    page,
  }) => {
    await gotoDemo(page, '/hayali?step=nope/nothing')

    await expect(current(page)).toContainText('Markup')
  })
})
