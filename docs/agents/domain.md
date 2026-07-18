# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

This is a multi-context repo: `CONTEXT-MAP.md` at the root points at one `CONTEXT.md` per package/app.

## Before exploring, read these

- **`CONTEXT-MAP.md`** at the repo root — it points at one `CONTEXT.md` per context. Read each one relevant to the topic.
- **`docs/adr/`** at the repo root — system-wide decisions. Also check `packages/<name>/docs/adr/` or `apps/<name>/docs/adr/` for context-scoped decisions.

If any of these files don't exist yet, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and `/improve-codebase-architecture`) creates them lazily when terms or decisions actually get resolved.

## File structure

```
/
├── CONTEXT-MAP.md
├── docs/adr/                          ← system-wide decisions
├── packages/
│   ├── shared/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/                  ← shared-specific decisions
│   ├── sandbox/
│   │   ├── CONTEXT.md
│   │   └── docs/adr/
│   └── puppeteer/
│       ├── CONTEXT.md
│       └── docs/adr/
└── apps/
    └── docs/
        ├── CONTEXT.md
        └── docs/adr/
```

Contexts follow the dependency order: `shared` → `sandbox` → `puppeteer` → `docs`.

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in the relevant `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal — either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders) — but worth reopening because…_
