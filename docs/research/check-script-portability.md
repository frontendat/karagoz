# Can the lesson-check script run outside the monorepo?

Research for #160 (map #159). Verified 2026-10-28 against `@karagoz/hayali@1.0.0` (npm registry and the built `dist/` in this repo, Node 22).

## Recommendation

Ship the check script as a plain `.mjs` file in the skill folder. It gets its dependency from npm: `@karagoz/hayali@^1` plus its peers `vue` and `vue-i18n`. No tsx, no build step.

```sh
npm i -D @karagoz/hayali@^1 vue vue-i18n
```

The one wrinkle: `validateLesson` is not on the `./parse` subpath. Only `parseLesson` is. Importing `validateLesson` pulls in the whole component entry (Vue, vue-i18n, radix-vue, `@karagoz/sandbox`). It works in plain Node, but it is a heavy install for a lint script. Cleaner fix, as a follow-up in this repo: export `validateLesson` (and `LessonIssue` types) from `src/parse/index.ts`. `validateLesson.ts` only imports `./lesson` and type-only `./types`, both pure, so the move is safe. Then the script needs only `@karagoz/hayali` and no Vue peers. Until that ships, the spec should document the peer install.

## Findings

1. **Published, importable without Vue/DOM?**
   - Yes: `@karagoz/hayali@1.0.0` is on npm (`latest`, published 2026-10-28; earlier: 0.6.0, 0.6.1). Source: `https://registry.npmjs.org/@karagoz/hayali`.
   - `exports["./parse"]` has `import -> ./dist/parse.js` (ESM) and `require -> ./dist/parse.cjs` (CJS), with types at `./dist/src/parse/index.d.ts` (registry manifest for 1.0.0; `packages/hayali/package.json`).
   - The parse bundle imports only `markdown-it` and `yaml` (externals in `packages/hayali/vite.parse.config.ts`; confirmed by the `import` lines at the top of `dist/parse.js`). Both are regular `dependencies`, so they install with the package.
   - `parse.cjs` exports exactly `['parseLesson']` (checked with `require`). Package is `"type": "module"`.
   - Caveat: `validateLesson` is only exported from `"."` (`packages/hayali/src/index.ts`). That entry imports `./style.css`, Vue components, `vue-i18n`, `@karagoz/sandbox`. In this repo, `import { validateLesson } from '.../dist/karagoz-hayali.js'` ran in plain Node 22 with no DOM and returned issues. In a fresh project, Vue and vue-i18n must be installed (npm 7+ installs peers automatically, pnpm/yarn may not).

2. **Signatures** (`packages/hayali/src/parse/parseLesson.ts`, `types.ts`, `src/validateLesson.ts`):
   ```ts
   import { parseLesson } from '@karagoz/hayali/parse'
   import { validateLesson } from '@karagoz/hayali' // not on ./parse today
   parseLesson(source: string, options?: { resolveSrc?: (path: string) => string | undefined }): ParseLessonResult
   validateLesson(lesson: Lesson): LessonIssue[]
   ```
   - `ParseLessonResult = { lesson: Lesson; issues: ParseIssue[]; srcPaths: string[]; locate(...) }`. `lesson` is best-effort even when `issues` has errors. `parseLesson` never throws (wraps failures into a `parser-failure` issue).
   - `ParseIssue = { rule, severity: 'error'|'warning', message, line (1-based), column?, chapterId?, stepId?, path? }`. These already have lines; print them directly.
   - `validateLesson(result.lesson)` consumes only the `lesson` field. Returns `LessonIssue { rule, chapterId, stepId, path?, message }` with no line number. An empty array means valid. It has no severity field: treat all as errors.

3. **Node `resolveSrc`:** the parser normalizes `src=` to a relative path inside the lesson's folder (`invalid-src` otherwise; `normalizeSrcPath` in `src/parse/tree.ts`) and calls `resolveSrc(normalizedPath)`. It must return the file contents as a string; undefined, a non-string or a throw becomes an `unresolved-src` issue (`src/parse/fileSource.ts`). So:
   ```js
   const dir = path.dirname(lessonFile)
   const resolveSrc = (p) => { try { return fs.readFileSync(path.join(dir, p), 'utf8') } catch {} }
   ```
   Path traversal is already rejected by the parser. `srcPaths` lists what was requested (useful only for watchers).

4. **`locate()`:** `result.locate({ chapterId, stepId?, path? })` returns the 1-based line, or `undefined`. `LessonIssue` has exactly those three fields, so `result.locate(issue)` works directly (verified: an issue for a missing `open:` file in step `s1` located to the step heading line). Behaviour: with `path` and a matching file fence in that step (or base tree when no `stepId`), the fence line; otherwise the step heading, or chapter heading when no `stepId`. Fall back to line 1 when `undefined`. Issues about editor directives (e.g. `missing-file`) land on the step heading, not the `krgz-step` block.

5. **Runtime:** plain `.mjs`, no TypeScript. Both entries ship compiled JS. Types are optional via `// @ts-check` + JSDoc. CI here uses Node 22; the script can assume current LTS (the deps `markdown-it@14` and `yaml@2` need Node >= 18 by their own docs; not independently verified). Use ESM `import` (package is ESM-first); a `.cjs` script could use `require('@karagoz/hayali/parse')` but would need dynamic `import()` for the main entry's ESM-only features, so prefer `.mjs`.

## Script sketch

```js
import fs from 'node:fs'; import path from 'node:path'
import { parseLesson } from '@karagoz/hayali/parse'
import { validateLesson } from '@karagoz/hayali'
let failed = false
for (const file of process.argv.slice(2)) {
  const dir = path.dirname(file)
  const r = parseLesson(fs.readFileSync(file, 'utf8'), {
    resolveSrc: (p) => { try { return fs.readFileSync(path.join(dir, p), 'utf8') } catch {} },
  })
  const out = [
    ...r.issues.map((i) => ({ line: i.line, rule: i.rule, message: i.message, error: i.severity === 'error' })),
    ...validateLesson(r.lesson).map((i) => ({ line: r.locate(i) ?? 1, rule: i.rule, message: i.message, error: true })),
  ].sort((a, b) => a.line - b.line)
  for (const i of out) console.log(`${file}:${i.line} ${i.rule} ${i.message}`)
  failed ||= out.some((i) => i.error)
}
process.exit(failed ? 1 : 0)
```

(Sketch only, not run end to end; the individual calls were each verified.)

## Open questions

- Is it acceptable to add the `validateLesson` export to `./parse` (small non-breaking change) before the skill ships?
- Should `validateLesson` run when `parseLesson` already reported errors? The lesson is best-effort, so it may produce follow-on noise. Spec decision.
