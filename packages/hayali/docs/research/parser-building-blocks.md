# Research: parser building blocks for the single-file lesson format

Ticket: frontendat/karagoz#117 (child of map #115; format shape agreed in #116).
Throwaway branch `research/parser-building-blocks`, never merged, no PR. Date: 2026-10-25.

## Method and trust

- Behaviour claims marked **[verified]** were run against the installed packages in this repo
  (`markdown-it@14.2.0`, `markdown-it-container@4.0.0`; transitive `yaml@2.9.0`, `js-yaml@4.3.0`),
  Node 22.22.1, scripts outside the repo. Sizes are esbuild 0.28.1 `--bundle --minify --platform=browser --format=esm`, gzip -9.
- The npm registry was **not reachable** from the sandbox (HTTP 407), so plugins that are not installed
  (`markdown-it-attrs`, `markdown-it-anchor`, `markdown-it-front-matter`, `gray-matter`) were **not** inspected.
  Statements about them below are marked **[unverified]** and must be re-checked against their source before adoption.
- Primary sources are the installed package sources and behaviour; no secondary write-ups were used.

## Recommendation (short)

1. Use markdown-it's **block tokenizer only** (`md.parse`, never `render`), with **no plugin**.
   `{#id}` is a 1-line regex on the heading's `inline` token content; fence attributes are a ~10-line tokenizer on `token.info`.
   Both are hand-rolled; no candidate plugin fits the "never throws, report issues with line numbers" contract better than that.
2. Frontmatter: **split by hand before `md.parse`** and pad with blank lines (or keep an offset) so line numbers stay true to the file.
   Do not rely on markdown-it to skip it: it does not (see below).
3. YAML: **`yaml@2.9.0`** if lines/columns inside the YAML are wanted in issues (`parseDocument` returns errors with `linePos`, never throws, `DUPLICATE_KEY` reported, alias-bomb guard);
   **`js-yaml@4.3.0`** if size matters most (3x smaller gzip, but throws, and only gives a mark for the first error).
   Neither is a direct dep of `@karagoz/hayali` today; one must be added.
4. Source line maps come free from markdown-it (`token.map`, 0-based `[start, end)`); add 1 and the frontmatter offset.

## 1. markdown-it as the block tokenizer

### What `md.parse(src, env)` gives **[verified]**

- Returns a flat token array without rendering; no DOM, no `window`/`document`, no Node built-ins used (`index.mjs` + `lib/`, pure ESM and CJS builds shipped). Browser/SSR safe.
- Block tokens carry `map: [startLine, endLine)`, **0-based, end exclusive**, on `heading_open`, `inline`, `fence`, `paragraph_open`, `html_block`, etc. Close tokens have `map: null`.
- `token.level` is nesting depth. Headings inside a blockquote or list item have `level > 0`
  (`> # In quote {#q}` is `h1`, level 1). The parser must filter `level === 0` or it will treat quoted headings as chapters.
- CRLF is normalised before tokenising; fence `content` is LF-only with a trailing `\n`.
- Fences inside lists/blockquotes are real `fence` tokens (`level` 2 / 1), so `file=` fences nested in a list are still extractable; decide whether the spec allows or reports them.
- Fence nesting works per CommonMark: a four-backtick fence containing a three-backtick fence is a single `fence` token (`info` = text after the opening marker). Tildes work too (`~~~js file=...`).
- An **unterminated fence runs to end of input** and is silently accepted; `token.map` ends at the last line. Detecting it needs a check of the last source line (compare to `token.markup`), because no flag is set. Worth an issue rule.
- A four-space-indented fence is an indented `code_block`, not a `fence` (so it will not be extracted; rule candidate: warn on `code_block` that looks like a fence).
- Default `html: false` turns raw HTML into text; with `html: true` raw HTML becomes `html_block`/`html_inline` and `<!-- comment -->` has a map. Recommendation: keep `html: false` for parsing (the parse is for structure; rendering is the consumer's concern).

### Performance **[verified, indicative]**

500 steps (~297 KB source, 500 fences): ~11 ms per full `md.parse` with the default preset, ~4 ms with only block rules enabled. Not a concern; no incremental parsing needed.

### Size **[verified]**

| package | min | gzip |
|---|---|---|
| markdown-it 14.2.0 (full ESM entry) | 148 KB | 52 KB |
| markdown-it-container 4.0.0 | 1.3 KB | 0.7 KB |

Both are already dependencies of `@karagoz/hayali`, so the parser adds no new markdown cost. Note the future `@karagoz/hayali/parse` subpath
should not drag Vue or `vue-markdown-render`; markdown-it itself is the only heavy part. A `zero` preset with block rules enabled does not shrink the bundle (tree-shaking cannot drop rules registered by the preset import) but is faster.

### Reuse of existing callouts plugin

`packages/hayali/src/callouts.ts` uses `markdown-it-container` for `:::tip` blocks (ADR 0001). The step **body** is stored as Markdown string for the consumer to render,
so the parser does not need the container plugin; but note that a `:::tip` block containing a `file=` fence (or `# heading`) is tokenised as ordinary nested tokens only if the plugin is registered.
Without the plugin, `:::` lines are paragraph text and a fence inside them is still found at level 0 (it is not nested). Decide consistently: parse without the plugin and treat all level-0 fences as format fences.

## 2. Frontmatter

### markdown-it does not understand it **[verified]**

Input `---\nimmutable: true\nfoo: 1\n---\n\n# T` tokenises as `hr`, then an **`h2` (setext heading) whose text is `immutable: true\nfoo: 1`**, then `h1`.
So the file would appear to contain an H2 step. Frontmatter must be removed before `md.parse`.

### Options

| option | notes |
|---|---|
| Hand-roll (recommended) | If line 1 is exactly `---`, find the next line that is exactly `---` (or `...`); slice YAML; replace those lines with blank lines (keeps `token.map` aligned with the file) or record `offset = closingLine + 1`. ~10 lines, never throws, trivially reports "unterminated frontmatter" with a line. |
| `markdown-it-front-matter` | **[unverified]** plugin that only captures the raw block via a callback and parses nothing; adds a dependency for what the hand-rolled version does in one function. |
| `gray-matter` | **[unverified]** bundles `js-yaml` 3.x and uses Node `fs`/`Buffer` paths and `eval` for JS/other engines; typically a poor fit for a browser-free pure parser. Not recommended. |

Edge cases to put in the rule catalogue: BOM at start of file; frontmatter not on line 1 (then `---` is just an `hr`/setext underline); empty frontmatter; frontmatter that is a YAML scalar/array rather than a mapping.

## 3. `{#id}` on headings

### Hand-rolled on the inline token **[verified]**

The heading's `inline` token has `content` equal to the raw heading text with the closing `#`s already stripped
(`# A {#a} #` gives `A {#a}`). Regex used: `/\s*\{#([A-Za-z][\w-]*)\}\s*$/`.

| heading | content | id |
|---|---|---|
| `# A {#a}` | `A {#a}` | `a` |
| `# *em* {#a}` | `*em* {#a}` | `a` |
| `# {#only}` | `{#only}` | `only` (empty title: rule candidate) |
| `# A {#a b}` | `A {#a b}` | none (rule: malformed id) |
| `# A {.cls #a}` | `A {.cls #a}` | none (attrs not supported) |
| ``# A `x {#a}` `` | ``A `x {#a}` `` | none (inside code span, correctly ignored because the text ends with a backtick) |
| `# A {#a} trailing` | | none (id must be last) |
| `# A \{#a}` | `A \\{#a}` | **matches**: the regex needs a guard `(?<!\\)` if escaping should be honoured |

Title = `content` with the match removed and trimmed. Inline markup in the title (`*em*`, code) stays raw Markdown in `content`; the Lesson schema's title is presumably plain text, so decide whether to strip inline markup (`inline.children` text/code nodes joined gives plain text).
Setext headings (`Title\n====`) also yield `h1`/`h2` with the same inline content, so the `{#id}` rule works for them; the spec may want to forbid setext (check `heading_open.markup` is `=`/`-`, not `#`).
Duplicate-id and id-charset rules need only a `Set` in the parser.

### Plugin candidates

- `markdown-it-attrs` **[unverified]**: general `{#id .class key=val}` attributes on many elements, including fences. It mutates token `attrs` and, per its README, removes the `{...}` text from the output; supporting arbitrary attrs is more than the format wants, and its behaviour on malformed input is to silently leave text, so the parser would still have to re-detect problems for issues. Worth only if the format later wants classes/attrs everywhere.
- `markdown-it-anchor` **[unverified]**: generates ids **from titles** (slugify) and adds permalink anchors; the opposite of the agreed "ids required, never derived" (#116). Not applicable; it can read an existing id attribute via other plugins but is a rendering-side tool.

Conclusion: hand-rolled. It is smaller than any plugin's integration code, gives exact line numbers from `heading_open.map`, and fits "never throws".

## 4. Fence info-string attributes

markdown-it exposes the whole info string as `token.info` (`html file=index.html name="Main page" use=ch-1`); core markdown-it does **not** parse it (its renderer only takes the first word as the language class) **[verified]**. Info strings of backtick fences cannot contain backticks (CommonMark), tilde fences can.

Hand-rolled tokenizer **[verified on sample inputs]**: `/([A-Za-z_][\w-]*)=(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|(\S+))|(\S+)/g` yields, in order, bare words and `key=value` pairs:

- `js file="src/a b.js"` gives `file=src/a b.js` (quoted values allow spaces).
- `yaml krgz` gives bare `yaml`, `krgz` (the directive block is recognised as lang `yaml` + bare word `krgz`).
- `js file=a.js file=b.js` gives two `file` entries (rule: duplicate attribute).
- `js file=` gives a bare `file=` (rule: empty value).
- `js {1,3} file=a.js` gives bare `{1,3}` (ignored line-highlight syntax; decide whether to report unknown bare words).

Per-fence line numbers come from `fence.map` (`[open, close+1)`); the content starts at `map[0] + 1`, which matters for issues inside file content or YAML (add `map[0] + 1` to the YAML-relative line).

Existing ecosystem: Nuxt Content/Shiki use `{1,3}` and `[filename]` conventions that markdown-it core ignores; a plugin is not needed since parsing is on `token.info` and no rendering happens.

## 5. YAML libraries

Needed for: one `yaml krgz` directive block per step, plus optional lesson frontmatter (`immutable`). Both are small flat mappings.

| | `yaml` 2.9.0 | `js-yaml` 4.3.0 |
|---|---|---|
| min / gzip (browser entry) **[verified]** | 103 KB / 32 KB | 44 KB / 14.6 KB |
| Browser/SSR safe | yes, has a `browser` entry (pure JS) | yes, pure JS ESM |
| Never-throws API | `parseDocument(src)` returns `doc.errors[]` / `doc.warnings[]`; `parse()` throws | `load()` throws `YAMLException` only; no multi-error mode |
| Error position **[verified]** | each error has `linePos` (1-based line/col) and `code` (`BAD_INDENT`, `DUPLICATE_KEY`, ...); `LineCounter` also maps any node's `range` to line/col, so unknown-key issues can point at the exact YAML line | `e.mark.line` (0-based) / `column`, first error only; node positions of valid values not available |
| Multiple errors in one pass **[verified]** | yes (two reported for the sample) | no, first only |
| Duplicate key | reported as `DUPLICATE_KEY` error (not thrown from `parseDocument`) | throws "duplicated mapping key" |
| Alias bomb **[verified]** | rejected by default ("Excessive alias count"; `maxAliasCount` configurable) | **expanded** (5-level bomb produced 282 KB, no guard) |
| Unsafe tags **[verified]** | custom tags unresolved produce a warning/ error, no code execution | `!!js/function` rejected as unknown tag (v4 removed unsafe types) |
| YAML version / quirks **[verified]** | 1.2 core schema: `no` stays string, `010` gives 10, `1_000` string | same on the sample |
| Empty input | `null` | `undefined` (must normalise both to `{}`) |
| Direct dep of hayali | no (transitive only) | no (transitive only) |

Notes:
- Both return non-mapping roots for odd input (`hello` gives a string); parser must check `isPlainObject` and report an issue.
- Always create a fresh `LineCounter` per document; reusing it across documents accumulates offsets **[verified: lines drifted]**.
- `yaml` also supports `doc.getIn(['locks'], true)` / `YAMLMap.items[i].key.range` to attach an issue to the exact key, which is the main reason to prefer it for a "report issues with source line numbers" contract.
- Recommendation: `yaml` (32 KB gzip) unless the parse subpath size budget is tight; the 17 KB gzip saving of `js-yaml` costs per-key line precision, multi-error reporting and the alias guard. Re-evaluate once a size budget for `@karagoz/hayali/parse` exists (the parse subpath is tree-shaken separately from Vue code, so only parse consumers pay).

## 6. Alternatives to markdown-it considered

`unified`/`remark-parse`/`mdast-util-from-markdown`/`micromark` are present transitively (via Nuxt Content in `apps/docs`) **[verified present in lockfile store, not size-measured here]**.
Their mdast nodes carry full `position` (line, column, offset) which is richer than markdown-it's line-only `map`, but they are a second Markdown engine to ship in `@karagoz/hayali`, which already depends on markdown-it for step rendering and callouts (ADR 0001). Column offsets are not needed for the agreed issue shape ("source line numbers"). Not recommended.

## 7. Browser/SSR safety summary

- markdown-it, markdown-it-container, yaml (browser entry), js-yaml: pure JS, no Node-only imports, no globals at import time **[verified by bundling with `--platform=browser` without errors]**.
- Avoid: `gray-matter` (Node fs/Buffer paths, **[unverified]**), anything using `eval`/`new Function` for engines.
- Parser must not import from the package root (`src/index.ts` pulls Vue components); keep `@karagoz/hayali/parse` as its own entry in `package.json` `exports` and its own Vite lib entry.

## 8. Findings that feed the rule catalogue (inputs for the later ticket)

- Frontmatter missing close, not on line 1, BOM, non-mapping, unknown keys.
- Heading at level > 0 (inside list/quote) ignored vs reported; setext headings; heading without `{#id}`; malformed id; empty title; duplicate ids; H1/H2 ordering (H2 before any H1, content between H1 and first H2).
- Fence without closing marker (silent in markdown-it); indented code that looks like a fence; duplicate/empty/unknown attributes; `file=` duplicated in the same step; `yaml krgz` more than once per step; `yaml krgz` before first chapter (base tree has no directive).
- YAML: parse errors with line, duplicate key, unknown directive field, wrong value type, non-mapping root.
- Unsupported constructs inside steps that markdown-it parses fine (raw HTML if `html: false`).

## Open items for the spec

- Strip inline markup from titles or keep raw?
- Allow `file=` fences inside lists/blockquotes/callouts or report?
- Choice of `yaml` vs `js-yaml` once a size budget exists.
- Re-verify the unverified plugin claims if any plugin is reconsidered (registry access was unavailable).
