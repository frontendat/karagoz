import { expect, test } from '@playwright/test'

import { bootDemo } from './boot'

test.describe('boot and preview', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('replaces the placeholder and shows the first step in the preview', async ({
    page,
  }) => {
    await bootDemo(page)

    await expect(page.getByTestId('sandbox-placeholder')).toHaveCount(0)
    const preview = page.getByTestId('sandbox-pane').locator('iframe')
    await expect(preview).toBeVisible()
    await expect(
      page
        .frameLocator('[data-testid="sandbox-pane"] iframe')
        .getByRole('heading', { name: 'A tiny counter page' }),
    ).toBeVisible({ timeout: 30_000 })
    // The address bar is filled by the messages of the injected preview script.
    await expect(
      page
        .getByTestId('sandbox-pane')
        .getByRole('link', { name: /webcontainer/ }),
    ).toHaveText(/\//)
  })
})

test.describe('go to a line with the sandbox pane hidden', () => {
  test.use({ viewport: { width: 600, height: 900 } })

  test('applies the line once the learner switches to the sandbox', async ({
    page,
  }) => {
    await bootDemo(page)
    await expect(page.getByTestId('lesson-pane')).toBeVisible()
    await expect(page.getByTestId('sandbox-pane')).toBeHidden()

    // "Behaviour" opens app.js at line 6.
    await page.getByTestId('next').click()
    await expect(page.getByTestId('next')).toBeEnabled()
    await page.getByTestId('next').click()
    await expect(
      page.locator('[data-testid="step-item"][data-status="current"]'),
    ).toContainText('Behaviour')

    await page.getByTestId('layout-toggle').getByRole('tab').nth(1).click()

    await expect(page.getByTestId('sandbox-pane')).toBeVisible()
    await expect(
      page.getByTestId('sandbox-pane').locator('.cm-activeLine'),
    ).toContainText('button.addEventListener')
  })
})
