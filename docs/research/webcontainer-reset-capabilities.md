# Research: WebContainer file-change detection / reset capabilities

- Wayfinder ticket: [frontendat/karagoz#50](https://github.com/frontendat/karagoz/issues/50) (child of map [#49](https://github.com/frontendat/karagoz/issues/49))
- Package researched: `@webcontainer/api` (installed version in this repo: **1.6.4**, resolved via `pnpm`)
- Primary sources used:
  - `node_modules/.pnpm/@webcontainer+api@1.6.4/node_modules/@webcontainer/api/dist/index.d.ts` (type definitions for `WebContainer`, `mount`, `FileSystemAPI`, `watch`)
  - `node_modules/.pnpm/@webcontainer+api@1.6.4/node_modules/@webcontainer/api/dist/entities.d.ts` (`FileSystemTree` etc.)
  - `node_modules/.pnpm/@webcontainer+api@1.6.4/node_modules/@webcontainer/api/README.md`
  - `node_modules/.pnpm/@webcontainer+api@1.6.4/node_modules/@webcontainer/api/api_reference.json` (typedoc-generated reference, same source comments as the `.d.ts`)
  - StackBlitz official docs source, fetched via the public `stackblitz/webcontainer-docs` GitHub repo: `docs/guides/working-with-the-file-system.md` and `docs/changelog.md`
  - StackBlitz issue tracker: `stackblitz/webcontainer-core`, issue [#1113 "Backup and restore entire filesystem"](https://github.com/stackblitz/webcontainer-core/issues/1113) (maintainer comment)
  - This repo's own usage: `packages/sandbox/src/composables/useSandbox.ts`, `packages/puppeteer/src/components/KrgzPuppeteer.vue`

## TL;DR

`@webcontainer/api` has **no dirty-check, diff, or snapshot/restore API**. `mount()` is a one-way, unconditional overlay write with no signal about what changed. `fs.watch()` exists and can observe `change`/`rename` events recursively, but it only reports "a path changed," not whether the new content differs from any prior baseline. Any "has this step's mounted files been edited, and can we discard those edits" logic — which is what the Hayalî confirm-nav modal needs — has to be built entirely in this codebase (e.g. hashing/snapshotting the tree we mount per step, and comparing on `fs.watch` events or before mounting the next step's tree).

## 1. Does `WebContainer.fs` or `.mount()` expose diff/dirty-check capability?

No. The full public surface of `WebContainer` relevant to files is:

```ts
export declare class WebContainer {
  fs: FileSystemAPI;
  mount(snapshotOrTree: FileSystemTree | Uint8Array | ArrayBuffer, options?: LoadFilesOptions): Promise<void>;
  export(path: string): Promise<FileSystemTree>;
  // ...spawn, on(), setPreviewScript, teardown, boot
}
```
— `dist/index.d.ts`

`FileSystemAPI` (the `fs` object) is, per its own doc comment, "Modeled after `fs.promises` in Node," and its method list is exactly:

```ts
export interface FileSystemAPI {
  readdir(...): Promise<...>;
  readFile(...): Promise<...>;
  writeFile(...): Promise<void>;
  mkdir(...): Promise<...>;
  rm(...): Promise<void>;
  rename(oldPath, newPath): Promise<void>;
  watch(filename, options?, listener?): IFSWatcher;
}
```
— `dist/utils/file-system.d.ts` types re-exported through `dist/index.d.ts`

There is no `diff`, `stat`-with-hash/mtime-comparison helper, `isDirty`, checksum, or any other change-detection primitive. `mount()`'s only options type is:

```ts
export interface LoadFilesOptions {
  /** Specifies a nested path where the tree should be mounted. */
  mountPoint?: string;
}
```

No flags around merge behavior, overwrite policy, or "only write if changed." `mount()` just writes; it does not tell the caller what it changed or whether anything was already different.

## 2. Is there a supported "snapshot and restore" pattern?

No built-in one. Two related capabilities exist but neither is a dirty-aware restore:

- **`export(path, options?)`** can serialize the current in-memory FS (or a subtree) back out as a `FileSystemTree` (JSON) or a binary/zip blob (`ExportOptions.format: 'json' | 'binary' | 'zip'`, `dist/entities.d.ts`). This lets a caller *capture* the current state, but it's just a read — WebContainer doesn't track this as a restore point, and there's no companion `restore()` that reverts to a captured export while diffing against the live tree.
- **`mount()` also accepts a binary "snapshot"** (`Uint8Array | ArrayBuffer`) produced by the *separate* `@webcontainer/snapshot` npm package (not installed in this repo). This is purely a **faster loading format** for a static tree (used for e.g. pre-baked `node_modules`), not a change-tracking/undo mechanism. Per the docs: "The `mount()` method not only accepts the tree-like format... but a binary snapshot format that can be automatically generated, using the `@webcontainer/snapshot` package" (`docs/guides/working-with-the-file-system.md`, "Generating snapshots" section) — this is about mount performance, unrelated to detecting or discarding edits.

Direct confirmation from a StackBlitz maintainer that no backup/restore facility exists: in [stackblitz/webcontainer-core#1113](https://github.com/stackblitz/webcontainer-core/issues/1113), a user asked for "more utilities around `fs` for backing up and restoring/mounting data." StackBlitz contributor `jrvidal` replied (2023-06-27):

> "We don't expose any 'backup' functionality and that is something we could explore."

That issue remains open with no resolution, and the current (1.6.4) type surface still has nothing beyond `export`/`mount` as described above — consistent with "not implemented."

**Conclusion**: per-step reset in Hayalî must be implemented by this codebase: keep our own baseline (e.g. the `FileSystemTree` object already authored per step/slide — which is exactly what `KrgzPuppeteer.vue` already holds as `selectedSlide.value.tree`) and either (a) just always re-`mount()` that baseline tree on confirmed navigation (cheap, and is already what the code does today), or (b) use `export()` right before navigating to compare against the step's original tree/hash to decide whether to even show the confirm modal.

## 3. What does `mount()` do to existing files not present in the new tree — removed or left behind?

**Left behind.** `mount()` is additive/overlay, not a sync-and-delete. Evidence:

- The type signature and its doc comment describe it purely as loading/adding: "Mounts a tree of files into the filesystem" (`dist/index.d.ts`, also verbatim in `api_reference.json`'s typedoc comment for the `mount` signature). Nothing about removing paths absent from the argument.
- The official guide (`docs/guides/working-with-the-file-system.md`, "Loading files" / "Mounting to a different path" sections) walks through mounting single files, multiple files, and folders, and separately documents `fs.rm` as *the* way to delete something ("Deletes a file or a directory..."). Deletion is presented as a distinct, explicit `fs` operation — never as a side effect of `mount()`.
- `writeFile` is explicitly documented as "If the file exists, it will overwrite the file" (content-level overwrite of a path you name), which is the only "overwrite" semantics documented anywhere in this API surface — and it's scoped to a single path you pass, not a tree-wide reconciliation.

So: calling `mount(newTree)` after `mount(oldTree)` will overwrite any paths that exist in both trees, add any new paths in `newTree`, and **leave untouched any file that was in `oldTree` (or written by the user/dev-server, e.g. `node_modules`, build output, or an edit to a file the new tree doesn't mention) that isn't present in `newTree`.** This matches current behavior in `KrgzPuppeteer.vue` (`sandbox.container.value?.mount(selectedSlide.value.tree)` on every step) — it already relies on this overlay semantics and never calls `fs.rm` to clear prior step files. If a step's design assumes the file tree is fully reset to only that step's files, that reset is **not** something `mount()` gives you automatically — stale files from a previous step (added or edited) will persist unless the caller explicitly diffs and `rm`s them.

## 4. Is there a watcher/event API that could detect "user edited files since this step was mounted"?

Yes, `fs.watch()` — already used in this codebase — but it is a raw path-level notifier, not a dirty-vs-baseline check:

```ts
watch(filename: string, options?: FSWatchOptions, listener?: FSWatchCallback): IFSWatcher;
watch(filename: string, listener?: FSWatchCallback): IFSWatcher;
// ...
export type FSWatchOptions = { encoding?: BufferEncoding | null; persistent?: boolean; recursive?: boolean } | string | null;
export type FSWatchCallback = (event: 'rename' | 'change', filename: string | Uint8Array) => void;
export interface IFSWatcher { close(): void; }
```
— `dist/index.d.ts`

Added in API version **1.1.8** per the official changelog ("Add `fs.watch`.", `docs/changelog.md`) — no diff/dirty capability was added alongside it, before or since, per the rest of that changelog.

This repo already uses it in `packages/sandbox/src/composables/useSandbox.ts` (lines ~214–227) to watch the whole tree recursively and re-bootstrap when `package.json` changes:

```ts
watchers.value.reinstall = container.value?.fs.watch(
  '.',
  { recursive: true },
  async (event, filename) => {
    if (event === 'change' && typeof filename === 'string') {
      if (explorer.reinstall.value.ignores(`./${filename}`)) {
        await bootstrap()
      }
    }
  },
)
```

This proves the exact mechanism Hayalî would need is available: `fs.watch('.', { recursive: true }, cb)` fires `'change'`/`'rename'` events with the changed path any time a file is written (by the user in the editor, by a running process, or by our own `mount()`/`writeFile` calls). It could be adapted to flip an `isDirty` flag from the moment a step's tree is mounted until either (a) the user confirms navigation and we remount the next step's baseline, or (b) we explicitly diff the changed path's content against the step's original tree. Caveats to flag for implementation:

- The callback only gives a **filename**, not old/new content or a boolean "differs from baseline" — the caller still has to compare against its own stored baseline (e.g. the step's `FileSystemTree`) if it wants a true dirty-check rather than a coarse "anything touched this path" signal.
- Our own `mount()` calls (e.g. mounting the next step) will also fire `change`/`rename` events, so an `isDirty` watcher needs to be paused/ignored around programmatic mounts, the same way the existing `reinstall` watcher has to reason about which changes matter (it filters through `explorer.reinstall.value.ignores(...)`).
- `recursive: true` is supported per `FSWatchOptions`, confirmed already used in this codebase.

## Summary answer for the map decision

There is no free lunch from `@webcontainer/api`: no dirty-check, no snapshot/restore, and `mount()` never deletes stale files on its own. The Hayalî "changes will be reset" confirm-nav flow needs the app to (1) keep a per-step baseline tree (already effectively available as `selectedSlide.value.tree`), (2) use `fs.watch(..., { recursive: true })` — the same primitive `useSandbox.ts` already uses for reinstall detection — to flag edits since that baseline was mounted, and (3) explicitly `fs.rm` anything not in the next step's tree if a true reset (not just an overlay) is required, since `mount()` alone will not remove it.
