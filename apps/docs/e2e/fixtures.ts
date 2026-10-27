import { test as base } from '@playwright/test'

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

export { expect } from '@playwright/test'
