# Render callouts with a portable markdown-it registry, not @nuxt/content/MDC

Step bodies are plain markdown rendered via `vue-markdown-render`; callouts are authored inline as `:::tip` / `:::warning` / `:::note` and swapped for the shared `Alert` components by a small callout-kind registry. We rejected `@nuxt/content`/MDC because `@karagoz/hayali`, like `@karagoz/sandbox` and `@karagoz/puppeteer`, has zero Nuxt coupling and must work in any Vue app; the docs app doesn't use MDC component syntax today either.

## Considered options

- **`@nuxt/content` / MDC components**: richer, but ties the package to Nuxt and would make lessons unrenderable outside `apps/docs`.
- **A separate `alert` field on the step**: what the original mockup had (one optional "Heads up!" per step); rejected because authors need several callouts anywhere in the body.
- **One generic `:::alert{variant=...}`**: rejected in favour of distinct named markers per kind, which read like ordinary markdown.

## Consequences

- Lesson content authored with `:::` syntax is hard to migrate once written, so the syntax is effectively locked.
- `Alert`'s variants had to grow beyond `default`/`destructive` to cover the callout kinds.
- The registry is shaped so other block kinds could be added later; v1 registers only callout kinds. "Container" stays reserved for the WebContainer instance, hence "callout" in the domain language (the upstream plugin name `markdown-it-container` is an implementation detail).
