# @karagoz/sandbox

## 0.6.0

#### @karagoz/hayali (new)

- **KrgzHayali lesson player:** desktop and mobile layouts, chapter-scoped step list, TOC dropdown, per-step file locks, sandbox slot, SSR-safe first paint, and Tailwind-free `lib.css`.
- **Lesson authoring:** callouts, editor and step-entry directives, preview redirect, `validateLesson` schema, `krgz` lang pack, and multi-range highlights. An unknown position falls back to the first
  step.
- **Markdown lesson format:** parses chapters, steps and files, compiles `file=` fences, and supports `krgz-lesson` and `krgz-step` blocks, `from=` references, files carried over from earlier steps, and `src=`
  with `resolveSrc`. The demo lesson round-trips through the parser, and ADR and glossary entries are added.

#### @karagoz/sandbox

- **Hayali additions:** preview navigation and preview-frame support.
- Fixed preview navigation races (before the frame exists, during `reload()`, and with the `src` binding) and fixed boot and container teardown.

#### @karagoz/shared

- Alert components moved here.

#### @karagoz/docs

- Hayali docs (en, de, ar): API reference, handbook, and a live demo on the intro page with an RTL toggle.
- The demo step deep-links via `?step` (hydration-safe). Demos take turns so the sandbox keeps working across pages.
- Fixed the reset dialog, preview reload, container teardown, and mobile nav.

#### Removed

- @karagoz/puppeteer.

## 0.5.0

### Minor Changes

- New sandbox layout for desktop and mobile.

### Patch Changes

- Updated dependencies
  - @karagoz/shared@0.5.0

## 0.4.0

### Minor Changes

- Added sandbox console subpanel

### Patch Changes

- Updated dependencies
  - @karagoz/shared@0.4.0

## 0.3.0

### Minor Changes

- Sweeping dependency updates, bug fixes and new features under editorViews.

### Patch Changes

- Updated dependencies
  - @karagoz/shared@0.3.0

## 0.2.1

### Patch Changes

- Update dependencies to solve CVE-2024-12905
- Updated dependencies
  - @karagoz/shared@0.2.1

## 0.2.0

### Minor Changes

- Switching between rendering only one or multiple sandbox panels based on container width

### Patch Changes

- Updated dependencies
  - @karagoz/shared@0.2.0

## 0.1.1

### Patch Changes

- fix path of karagoz-shared.css
- Updated dependencies
  - @karagoz/shared@0.1.1

## 0.1.0

### Minor Changes

- First minor release of @karagoz/shared and @karagoz/sandbox

### Patch Changes

- Updated dependencies
  - @karagoz/shared@0.1.0
