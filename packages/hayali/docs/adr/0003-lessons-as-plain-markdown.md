# Author lessons as plain Markdown with headings and fences, not MDX, frontmatter or JSON

A lesson is one Markdown file: `# Title {#id}` is a chapter, `## Title {#id}` a step, `file=` fences are the files, and `krgz-lesson` / `krgz-step` YAML fences carry the directives. A pure `parseLesson` (`@karagoz/hayali/parse`) compiles it to the existing `Lesson` schema, which stays unchanged. This is hard to reverse once lessons are written, and surprising in that fences act as directives, so the reasons are recorded here.

## Considered options

- **Frontmatter for lesson and step config**: rejected. It needs special-cased parsing, and renderers that do not know it print the config as body text. Fences render as ordinary code anywhere.
- **MDX, or a Nuxt Content dependency**: rejected for the same reason as ADR 0001: `@karagoz/hayali` has zero Nuxt coupling and must work in any Vue app, an Astro site or a plain build script.
- **JSON/TypeScript only (the status quo)**: rejected. Prose, code and directives live in three places, code is escaped into strings, and authors who do not write TypeScript cannot reuse files between steps.

## Consequences

- Authors write code in real fences, with highlighting and formatting, and read a lesson top to bottom.
- Ids are explicit in headings and never derived from titles (ADR 0002), which also gives an outline in the IDE.
- The format is parse-only: there is no `Lesson` to Markdown serializer, and it is single-language.
- Typos stay loud: unknown keys and unknown `krgz-*` fences are errors.
- The parser depends on `markdown-it` and `yaml`, and must not import Vue or `node:*`; a boundary test enforces it.
