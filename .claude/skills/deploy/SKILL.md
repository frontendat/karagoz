---
name: deploy
description: Build the full package chain and deploy apps/docs to Cloudflare Pages via NuxthHub. Use when asked to deploy.
disable-model-invocation: true
allowed-tools: Bash
---

## Dist status
- !`ls packages/shared/dist packages/sandbox/dist packages/puppeteer/dist 2>&1 | grep -E "(dist|No such)"`

Deploy pipeline:

1. Build any missing upstream packages in order: shared → sandbox → puppeteer.
2. `pnpm @docs build`
3. `pnpm @docs deploy`

Report the deploy URL on success.
