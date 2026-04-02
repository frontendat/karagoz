---
name: build
description: Build workspace packages in dependency order (shared → sandbox → puppeteer → docs). Use when asked to build a package or before deploying.
disable-model-invocation: true
allowed-tools: Bash
---

## Dist status
- !`ls packages/shared/dist packages/sandbox/dist packages/puppeteer/dist apps/docs/.output 2>&1 | grep -E "(dist|\.output|No such)"` 

Build target from $ARGUMENTS (or all if blank).

Package map: `packages/shared` → `@shared`, `packages/sandbox` → `@sandbox`, `packages/puppeteer` → `@puppeteer`, `apps/docs` → `@docs`.

Dependency order: @sandbox needs @shared first; @puppeteer needs @shared + @sandbox; @docs needs all three.

Build any missing upstream deps in order before the target, then run `pnpm --filter <pkg> build`.

Report what was built and any errors.
