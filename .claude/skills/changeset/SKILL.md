---
name: changeset
description: Guide the changeset release workflow — bump versions and update changelogs. Use when releasing packages.
disable-model-invocation: true
allowed-tools: Bash
---

## Changed packages since last release
- !`git log $(git describe --tags --abbrev=0 2>/dev/null || echo "HEAD~10")..HEAD --oneline 2>/dev/null | head -20`

Changeset release workflow:

1. `pnpm changeset` — select which packages changed and bump type (patch/minor/major).
2. `pnpm changeset version` — apply bumps and update changelogs.
3. Remind to commit the generated changeset files before deploying.

If $ARGUMENTS specifies package names, focus on those packages.
