## Plans

- Make the plan extermely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.

## Project Overview

**Karagöz** is an interactive code education platform — a monorepo with reusable Vue component libraries consumed by a Nuxt 4 documentation/learning site deployed to Cloudflare Pages.

## Monorepo Structure

pnpm workspaces. Dependency order: `shared` → `sandbox` → `puppeteer` → `docs`

- `apps/docs` — Nuxt 4 app, main site at karagoz.dev
- `packages/shared` — Base UI components, no internal deps
- `packages/sandbox` — WebContainer-powered code sandbox, depends on shared
- `packages/puppeteer` — Explanation/walkthrough components, depends on sandbox + shared

Workspace filter shorthand: `pnpm @docs dev`, `pnpm @shared build`, etc.

## Architecture Notes

### WebContainer requirements
Dev server runs with HTTPS (local certs) because `@webcontainer/api` requires a secure cross-origin isolated context. `nuxt.config.ts` sets required `COOP` and `COEP` headers.

### Content routing in docs
`apps/docs/pages/[...slug].vue` handles all dynamic content routes, driven by files under `apps/docs/content/{en,de,ar}/`. i18n uses URL prefix strategy (`/de/...`, `/ar/...`).

### Composable-driven sandbox
The sandbox UI is thin — all logic lives in composables under `packages/sandbox/src/composables/` (`useSandbox`, `useSandboxBoot`, `useSandboxEditorTabs`, `useSandboxExplorer`, `useSandboxProcessTabs`, etc.).

## Deployment

Cloudflare Pages via NuxthHub. Deploy with `pnpm @docs deploy`.
