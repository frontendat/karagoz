import { expect, test } from '../fixtures'

test.use({ viewport: { width: 1440, height: 900 } })

test.describe('wide layout', () => {
  test('the page is cross-origin isolated', async ({ page }) => {
    await page.goto('/hayali')

    expect(await page.evaluate(() => crossOriginIsolated)).toBe(true)
  })

  test('shows the lesson and sandbox panes side by side without the layout toggle', async ({
    page,
  }) => {
    await page.goto('/hayali')

    const lesson = page.getByTestId('lesson-pane')
    const sandbox = page.getByTestId('sandbox-pane')
    await expect(lesson).toBeVisible()
    await expect(sandbox).toBeVisible()
    await expect(page.getByTestId('layout-toggle')).toBeHidden()

    const [lessonBox, sandboxBox] = await Promise.all([
      lesson.boundingBox(),
      sandbox.boundingBox(),
    ])
    expect(lessonBox!.x + lessonBox!.width).toBeLessThanOrEqual(sandboxBox!.x)
  })
})
