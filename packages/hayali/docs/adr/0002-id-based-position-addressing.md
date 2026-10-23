# Address the current position by ids in a single composite v-model

`KrgzHayali` exposes one `v-model="position"` of `{ chapterId, stepId }`, using author-supplied string ids, rather than two bindings (`v-model:chapter` + `v-model:step`) or indexes. Deep links are the reason `v-model` exists, and an index silently points a shared link at the wrong content once chapters or steps are reordered or inserted. Ids are never derived from titles because titles are localized (`ar`/`de`/`en`) and editable.

## Considered options

- **Dual `v-model:chapter` + `v-model:step`**: rejected because a step only makes sense within its chapter, and two bindings can be transiently out of sync (the old `KrgzPuppeteer` (removed with `@karagoz/puppeteer` in Hayali v2; see git history) needed a "reset slide index when topic changes" hack for exactly this).
- **Index-based addressing**: simpler and the precedent of the old `KrgzPuppeteer` (removed in Hayali v2), but breaks under reordering.
- **Ids derived from heading text**: rejected as locale-specific and fragile to edits.

## Consequences

- Every chapter and step needs an explicit, required `id`. `chapter.id` is unique within the lesson; `step.id` only within its chapter, since `position` always carries both.
- `position` is a plain object; serializing it into a URL is the consumer's (future docs integration) job.
- Changing the shape later breaks every consumer that wired up `v-model` and every published deep link.
