import { expect, test } from '../fixtures'

// With JavaScript off, only the server HTML is there: the SEO contract of the lesson.
test.use({ javaScriptEnabled: false })

test.describe('first paint without JavaScript', () => {
  test('renders the lesson text and only a placeholder for the sandbox', async ({
    page,
  }) => {
    await page.goto('/hayali')

    await expect(page.getByTestId('krgz-hayali')).toBeVisible()
    await expect(page.getByTestId('toolbar')).toBeVisible()
    await expect(page.getByTestId('step-body').first()).toContainText(
      'Every page starts as HTML.',
    )
    await expect(page.getByTestId('sandbox-placeholder')).toHaveCount(1)
  })
})
