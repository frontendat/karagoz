import { expect, gotoDemo, test } from '../fixtures'

test.use({ viewport: { width: 600, height: 900 } })

test.describe('narrow layout', () => {
  test('shows one pane at a time with the layout toggle', async ({ page }) => {
    await gotoDemo(page)

    await expect(page.getByTestId('layout-toggle')).toBeVisible()
    await expect(page.getByTestId('lesson-pane')).toBeVisible()
    await expect(page.getByTestId('sandbox-pane')).toBeHidden()
  })

  test('toggling swaps the panes', async ({ page }) => {
    await gotoDemo(page)
    const toggle = page.getByTestId('layout-toggle')

    await toggle.getByRole('tab').nth(1).click()
    await expect(page.getByTestId('sandbox-pane')).toBeVisible()
    await expect(page.getByTestId('lesson-pane')).toBeHidden()

    await toggle.getByRole('tab').nth(0).click()
    await expect(page.getByTestId('lesson-pane')).toBeVisible()
    await expect(page.getByTestId('sandbox-pane')).toBeHidden()
  })
})
