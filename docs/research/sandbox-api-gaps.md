# Sandbox API gaps: closing tabs and navigating the preview

Research for #88 (part of #81). Scope: what `@karagoz/sandbox` already supports, what is missing, and WebContainer limits. Source read at branch `hayali-2`; `@webcontainer/api` 1.6.4 (installed; `package.json` range `^1.5.1`).

## Summary

| Capability | Status | Where |
|---|---|---|
| Close one editor tab | Supported | `sandbox.editorTabs.close(id)` |
| Close all editor tabs | Missing (loop workaround works) | - |
| Navigate preview to a URL path | Missing (only `reload`) | - |
| Check a path exists (file in container) | Partial: no `stat`/`exists`; use `fs.readdir`/`readFile` | `container.fs` |
| Check a path exists (preview route) | Missing; not verifiable from API | - |
| Read current preview path | Missing from public API (state is private to `KrgzPreview.vue`) | - |

## 1. Closing editor tabs

- `useSandbox()` returns `editorTabs` = `useSandboxEditorTabs(options)` (`packages/sandbox/src/composables/useSandbox.ts`, `editorTabs` in the return object).
- `useSandboxEditorTabs` spreads the generic `useSandboxTabs()` (`.../useSandboxTabs.ts`), so it exposes `close(id)`, `current`, `findTab`, `findTabIndex`, `open`, `tabs`, `updateContext`.
- `close(id)` finds the tab by id (file path, e.g. `./public/index.html`) and splices it; unknown id is a silent no-op. Closing does NOT check `context.suppressClose`; that flag only hides the close button in `KrgzEditorTabs.vue`. So programmatic close works on "unclosable" tabs too.
- Focus after close: `current` is the tab with the highest `order`, so closing the focused tab focuses the next-most-recently-focused one automatically.
- Side effect: the editor component calls `unregisterView` on close; `useSandboxEditorViews` keeps highlight ranges and re-applies them if the file is reopened (`useSandboxEditorViews.ts`).
- **Gap: no `closeAll()`.** Workaround today: `editorTabs.tabs.value.map(t => t.id).forEach(editorTabs.close)` (copy ids first because `close` mutates the array; `tabs` is a computed wrapper over the same array). A `closeAll` (optionally `closeOthers(id)`) belongs in `useSandboxTabs` so process tabs get it too.
- Note: `KrgzSandbox.vue` watches `editorTabs.tabs.value.length`; closing all tabs is already a handled state (`KrgzEditorTabs` renders only `v-if tabs.length`).

## 2. Navigating the preview to a path

- Public preview API (`useSandbox().preview`): `consoleShown`, `frame` (iframe ref), `hideConsole`, `reload`, `showConsole`, `suppressAddressBar`, `suppressConsole`, `url` (computed).
- `preview.url` is the **origin only**: set from the WebContainer `server-ready` event (`c.on('server-ready', (_, url) => previewUrl.value = url)`) and bound as the iframe `src` in `KrgzPreview.vue`. It is not updated on in-iframe navigation.
- `preview.reload()` calls `reloadPreview(frame)` from `@webcontainer/api` (posts `LOCALSERVICE_RELOAD_WINDOW` to the iframe; falls back to re-assigning `iframe.src` after a 200 ms default timeout).
- **Gap: no `navigate(path)`.** Nothing sets the iframe to `origin + path`. Note `KrgzPreview.vue` itself does `frame.src = 'about:blank'` then `frame.src = currentUrl` for its reload button, so setting `iframe.src` directly is an established pattern, and `sandbox.preview.frame` is already public. A `navigate(path)` could be: `frame.value.src = new URL(path, previewUrl.value).href`.
- Caveats:
  - Setting `src` to the same URL as the current one does not reload in some browsers when only the hash differs; hash-only changes can be done by `contentWindow.location.hash` only if same-origin (it is not: preview is on `*.webcontainer-api.io`, parent is not). Use `src` assignment.
  - `previewUrl` is unset until the dev server emits `server-ready`; `navigate` must wait for it (also handle re-bootstrap, which restarts the dev server and may change the URL/port).
  - `KrgzPreview` shows a loading overlay until the iframe `load` event (`previewReady`); it is set once and never reset, so a navigate will not re-show loading.

## 3. Reading the current preview path

- The injected preview script (`useSandbox.ts`, `bootstrap`, via `container.setPreviewScript`) posts `{type:'navigation', href, initial:true}` on page load and `{type:'navigation', href}` on `hashchange` only.
- `KrgzPreview.vue` handles it in `onMessage` (filtered by `message.origin === sandbox.preview.url.value`) and stores `href` in a **component-local** `currentUrl` ref. It is not exposed through `useSandbox()`, so consumers (e.g. hayali) cannot read it.
- Gaps:
  1. Move the current href into shared state (e.g. `preview.currentUrl` / `preview.path` computed in `useSandbox`), updated from the same message listener, or move the listener into the composable.
  2. Script only listens to `hashchange`. SPA navigation via `history.pushState`/`replaceState` and `popstate` is not reported, so the address bar and any "current path" go stale for History-API routers. Fix is in the injected script: wrap `pushState`/`replaceState` and add `popstate`.
  3. `currentUrl` shown in the address bar is the full webcontainer origin (display regex masks the subdomain); a path getter should derive `pathname + search + hash` from `new URL(href)`.
- `setPreviewScript` caveat (WebContainer docs, `index.d.ts`): the script applies to previews loaded after the call; existing previews must be reloaded. The code calls it only on first `bootstrap`, before the dev server starts, so this is fine today.

## 4. Checking whether a path exists

Two different meanings:

- **File in the container FS.** `container.fs` (`FileSystemAPI`, `index.d.ts`) offers `readdir`, `readFile`, `writeFile`, `mkdir`, `rm`, `rename`, `watch`. There is **no `stat`/`exists`**. Idiom: `readFile(path)` or `readdir(parent)` and catch the rejection (or `readdir(parent, {withFileTypes:true})` and look for the name). The sandbox already has `utils/readDirEnts.ts` and `useSandboxReadDir` (reactive, with watch). `useSandbox().container` is exposed, so consumers can do this today; a thin `fileExists(path)` helper in sandbox would be convenience only. Paths are relative to the container workdir (`container.workdir`).
- **Route served by the preview** (e.g. does `/about` return a page?). Nothing in the WebContainer API exposes this. Options, none verified here: (a) `fetch(previewOrigin + path)` from the parent: the preview origin is cross-origin, so success depends on the dev server sending CORS headers, and the COEP `require-corp` the site uses (`nuxt.config.ts`) may block no-cors responses; (b) ask the page itself through the injected script (postMessage request/response), which can only answer about the document that is loaded; (c) check the underlying file instead (for static sites the route maps to a file, so case 1 applies). Recommend (c) for lesson content, since hayali lessons control the files.

## 5. WebContainer API limits relevant here

- No navigation or URL API: the only preview helpers are `reloadPreview`, `setPreviewScript`, and the `server-ready`/`port`/`preview-message` events (`index.d.ts`). `preview-message` carries only `PREVIEW_UNCAUGHT_EXCEPTION`, `PREVIEW_UNHANDLED_REJECTION`, `PREVIEW_CONSOLE_ERROR` (`preview-message-types.d.ts`), not navigation.
- Preview iframe is cross-origin: parent cannot read `contentWindow.location`; all reads must go via postMessage from the injected script (as done today). The existing listener only trusts `message.origin === previewUrl`; keep that for any new messages.
- `server-ready` gives one URL per port; with multiple servers the sandbox uses the last one emitted.
- No `fs.stat`/`exists`, as above.

## Suggested additions (not implemented; no source changed)

1. `editorTabs.closeAll()` in `useSandboxTabs` (small, spec-trivial).
2. `preview.navigate(path)` in `useSandbox`, gated on `previewUrl`, setting `frame.src`.
3. `preview.currentUrl` / `preview.path` shared state; extend injected script with `pushState`/`replaceState`/`popstate`.
4. Optional `fileExists(path)` helper using `fs.readdir`/`readFile`; skip route-existence checks.

## Open questions

- Does the dev server used by lessons send CORS headers permitting parent `fetch` to the preview origin under the site's COEP? (Would need a runtime test in a browser; not checked.)
- Should `navigate` to the current URL force a reload?
