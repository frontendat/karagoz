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

**Lesson Validation**:
A pure, browser-free check (`validateLesson`) of a lesson's directives against each step's resolved tree (base files + that step's adjustments − its removals; never cumulative). Reports issues, never throws.
_Avoid_: Lint, schema check

### Editor directives

**Editor Directive**:
A per-step instruction about the editor (open, close, highlight, go to a line) or the preview, applied on every entry to the step. Derived from the step alone, never inherited from the previous step.
_Avoid_: Editor command, editor action

**Line Spec**:
How an author names lines to highlight: a single line, an inclusive range, or a list of either. Lines are 1-based.
_Avoid_: Line range, line selector

**Highlight**:
Visual emphasis on lines of a file, set by a step's directives. Cleared when leaving the step and on the learner's first edit.
_Avoid_: Marker, annotation

**Step Entry**:
The phase that runs on every arrival at a step (forward, back, or initial load) after the reset: clear highlights, close/open tabs, highlight, go to a line, then the preview. Derived from the step alone.
_Avoid_: Step change, step transition

**Entry Token**:
A monotonically increasing number that identifies the current Step Entry; async directives drop themselves when it has moved on.
_Avoid_: Generation, request id

**Navigating**:
The single-flight state covering confirm, reset and position change. Further navigate calls are ignored while it is set; directive application does not hold it.
_Avoid_: Loading, busy

### Layout

**Active Panel**:
Which of Lesson or Sandbox the toggle shows when the container is narrower than `fullLayoutFrom`. The only layout state JS owns; the split-vs-single switch itself is CSS (container queries), so first paint needs no JS.
_Avoid_: Mobile tab, view mode

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
