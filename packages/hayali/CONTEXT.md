# Hayali

The lesson-widget card (`KrgzHayali`): a resizable split of step-by-step lesson content and a live Karagöz Sandbox, with protection against silently losing in-progress edits. Named after the Hayalî, the puppeteer/narrator of Karagöz shadow theatre.

## Language

### Lesson structure

**Lesson**:
The whole declarative piece of teaching content passed to the component: chapters, their steps, and the lesson-wide base file tree.
_Avoid_: Story, course, tutorial

**Chapter**:
A named group of steps within a lesson. Visible only in the table of contents.
_Avoid_: Topic, section, module

**Step**:
One unit of a lesson: a markdown body plus the file changes that put the sandbox into that step's state.
_Avoid_: Slide, page

**Position**:
The learner's current step, identified by a chapter id and a step id together.
_Avoid_: Cursor, index, current slide

**Id**:
An author-supplied, stable identifier for a chapter or step, independent of any localized title. Step ids are unique only within their chapter.
_Avoid_: Slug, key, index

### Content

**Callout**:
A visually distinct aside (tip, warning, note) authored inline within a step's markdown body.
_Avoid_: Alert block, admonition, container

**Callout Kind**:
The named type of a callout (`tip`, `warning`, `note`) that decides how it is rendered.
_Avoid_: Callout type, variant

### Sandbox state

**Container**:
Reserved for the WebContainer instance. Never used for callouts.

**Immutable File**:
A file mounted once at boot and never reset or tracked for edits, e.g. `package.json`.
_Avoid_: Frozen file, static file

**Resettable File**:
Any file that is not immutable; tracked for edits and restored on step navigation.
_Avoid_: Mutable file, user file

**Adjustments**:
The files a step adds or changes on top of the lesson's base tree.
_Avoid_: Patch, diff, overlay

**Removals**:
The paths a step deletes when entered.
_Avoid_: Deletions

**Lock**:
A per-step, UI-only restriction making a file read-only for that step. Orthogonal to immutability: a locked resettable file still resets.
_Avoid_: Readonly (as a lesson-author term), freeze

**Dirty**:
The state where the learner has edited a resettable file since the last reset or step entry; the component's own writes never count.
_Avoid_: Modified, changed

**Reset**:
Restoring all resettable files to the target step's baseline when navigating.
_Avoid_: Revert, restore

**Navigation Confirm**:
The warning modal shown before a reset, only when the sandbox is dirty.
_Avoid_: Discard dialog
