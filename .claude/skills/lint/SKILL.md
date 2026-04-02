---
name: lint
description: Run ESLint on a file, a workspace package, or all packages. Use when asked to lint or check code style.
disable-model-invocation: true
allowed-tools: Bash
---

Lint target from $ARGUMENTS:

- File path → `pnpm eslint [--fix] <file>`
- Package name (`@shared` / `@sandbox` / `@puppeteer` / `@docs`) → `pnpm --filter <pkg> lint`
- No argument → `pnpm -r lint`

Use `--fix` unless $ARGUMENTS contains "check". Report errors and auto-fixed files.
