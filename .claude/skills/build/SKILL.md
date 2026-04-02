---
name: build
description: Build workspace packages in dependency order (shared → sandbox → puppeteer → docs). Use when asked to build a package or before deploying.
disable-model-invocation: true
allowed-tools: Bash
---

## Dist status
- !`ls packages/shared/dist packages/sandbox/dist packages/puppeteer/dist apps/docs/.output 2>&1 | grep -E "(dist|\.output|No such)"` 

Build target from $ARGUMENTS (or all if blank).

Package map: `packages/shared` → `@karagoz/shared`, `packages/sandbox` → `@karagoz/sandbox`, `packages/puppeteer` → `@karagoz/puppeteer`, `apps/docs` → `@karagoz/docs`.

- Single package: `nx run @karagoz/<pkg>:build` — Nx builds upstream deps automatically via `dependsOn`.
- All packages: `nx run-many -t build`

Report what was built and any errors.
