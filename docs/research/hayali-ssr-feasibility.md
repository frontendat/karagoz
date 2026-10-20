# SSR feasibility of Hayali, Sandbox and Shared in Nuxt and Astro

Research for #87 (part of #81). Branch `research/hayali-ssr-feasibility`, based on `hayali-2`. No source code was modified.

## Verdict

**The lesson content of `KrgzHayali` already server-renders today.** In a Node (no `window`/`document`/`localStorage`) SSR run of the *built* packages, the whole component rendered: toolbar, TOC trigger, step list, the current step's markdown body with callouts, the radix resizable split, and a "Booting Web Container..." placeholder in the sandbox pane. Hydration in jsdom produced zero mismatch warnings.

What stops it being "SSR-ready" is not crashes, it is three behaviours:

1. **Only `WebContainer.boot()` (via `useSandboxBoot`) breaks on the server.** It rejects with `window is not defined`, and because the promise is never `.catch`ed in `useSandboxBoot`, that is an unhandled rejection that kills a plain Node process (exit 1). Consumers must boot on the client only.
2. **Server HTML is always the desktop (split) layout**, even for `fullLayoutFrom="none"` and narrow containers, because the layout flag is read from a CSS container query by a `ResizeObserver` that only exists in the browser. Narrow viewers get a layout swap after hydration.
3. **`<ClientOnly>` defeats the point.** Nuxt tree-shakes the `<ClientOnly>` slot out of the server build, so the documented Nuxt guidance (wrap `KrgzSandbox` in `<ClientOnly>`) yields no lesson HTML. SSR of the lesson needs Hayali rendered normally on the server with only the boot gated to the client.

Astro works with `client:load` / `client:visible` (SSR + hydrate) given a per-island i18n setup via `appEntrypoint`; `client:only="vue"` also works but gives up the SSR content. Details below.

## How this was checked

- Read source in `packages/{hayali,sandbox,shared}` and the installed `@webcontainer/api@1.6.4`, `radix-vue@1.9.17`, `@vueuse/shared@14.3.0`, `vue@3.5.39`.
- Ran throwaway vitest probes (deleted afterwards; not committed) with `environment: 'node'`, using `renderToString` from `vue/server-renderer` against `src/` of Hayali and the **built `dist/` of `@karagoz/sandbox` and `@karagoz/shared`** (what consumers install). One probe used `environment: 'jsdom'` to render on the server then hydrate with `createSSRApp().mount()` while spying on `console.warn`.
- Plain `node -e "import(...)"` for native ESM import of each `dist`.
- Primary docs fetched from `raw.githubusercontent.com` (Astro docs/source, Nuxt docs). `docs.astro.build`, `webcontainers.io` and the npm registry were blocked from the sandbox, so Astro behaviour is from Astro's docs and integration source, **not from running an Astro project**. Nuxt behaviour is from docs and the existing `apps/docs` setup, **not from a fresh Nuxt run**.

## What already works

| Concern | Result | Evidence |
|---|---|---|
| Import `@webcontainer/api` on the server | Works, no import-time side effects. Exports `WebContainer`, `auth`, `reloadPreview`, etc. | `node -e "import('@webcontainer/api')"` OK. `window`/`document` appear only inside `WebContainer.boot()` and the preview iframe helpers (`node_modules/@webcontainer/api/dist/index.js` ~L211, L421, L466-490). |
| Import `@karagoz/shared`, `@karagoz/sandbox`, `@karagoz/hayali` dists in plain Node ESM | Works | Native `import()` of all three dists succeeds. `localStorage` references in the bundles are inside `typeof localStorage` guards (VueUse). |
| CodeMirror / xterm / lucide imports | Work in Node | `import()` OK for `codemirror`, `vue-codemirror`, `@xterm/xterm`, `lucide-vue-next`, `radix-vue`, `@vueuse/core`, `vue-markdown-render`. `KrgzProcess.vue` already lazy-imports xterm in `onMounted` ("needed to avoid errors in Nuxt"). |
| `vue-markdown-render` + callout plugin under SSR | Works | `StepBody` SSR output contains `<div ... role="alert" data-callout="tip"><h5>Nice</h5>...` with Alert variant classes. Unregistered `:::bogus` is left as a paragraph. `calloutPlugin` is pure (markdown-it + `@karagoz/shared` class strings), no DOM. |
| Full `KrgzHayali` SSR | Works | 7.7 kB of HTML in the probe. Current step body rendered; upcoming steps render titles only. Sandbox pane renders `LoadingIndicator` ("Booting Web Container...") because `ready` is false without a container. |
| `KrgzSandbox` chrome with `:booting="false"` | Renders (21 kB) | Panel toggles, Code/Result, Solve, Full screen, Theme buttons all render. The editor/terminal content needs a container and a browser. |
| Resizable / radix-vue primitives | Render on the server | Panel group and panels emit `data-panel*` attributes and `flex-grow:30.0` / `70.0` from `default-size`, so the desktop first paint has no size jump. |
| Hydration mismatches | None observed | jsdom hydrate of server HTML: 0 warnings for `fullLayoutFrom="3xl"` and `"none"`. radix-vue ids use Vue's `useId()` when available (`radix-vue/dist/index.js` ~L1345-1348: `No.useId ? ...`), so ids are deterministic across server and client on Vue 3.5. |
| `vue-i18n` | Works when the app installs it | Probe built a fresh `createI18n` per render with merged sandbox+hayali messages; `de` rendered `Zurück`, `Weiter`, `Inhaltsverzeichnis`, `Schritte`. The library entry `src/index.ts` exports `i18nMessages` only. The `localStorage.getItem('locale')` call is in `src/i18n.ts`, which is **not exported** (dev harness only, used by `main.ts`), so the library is safe. Same pattern in `packages/sandbox/src/i18n.ts`. |
| `useSandbox()` across requests | No cross-request state leak | `createSharedComposable` returns the raw composable when `!isClient` (`@vueuse/shared/dist/index.js` L542-543), so each server call gets a fresh instance. |
| Missing `provideWebContainer` on server | Not fatal | Renders anyway; `injectWebContainer()`'s fallback Proxy `console.error`s inside the `asyncComputed` (noise in server logs, no throw). Provide a never-resolving promise to silence it. |

## What breaks or needs care

### 1. `useSandboxBoot()` boots at setup time (breaks on server)
`packages/sandbox/src/composables/useSandboxBoot.ts` calls `WebContainer.boot(options)` synchronously in the composable body. On the server `boot()` rejects with `ReferenceError: window is not defined` (`dist/index.js` L211). Nothing attaches a handler, so in Node it is an unhandled rejection: `node -e "...WebContainer.boot().then(()=>{})"` exits with code 1. Also `boot()` itself needs cross-origin isolation (COOP/COEP) in the browser, which is already set in `apps/docs/nuxt.config.ts` (`routeRules` and the dev hook).

Impact: any consumer using the documented `useSandboxBoot()` + `provideWebContainer(boot)` in a component that is server-rendered will crash or log a fatal rejection. The `packages/hayali/src/App.vue` harness does exactly this (SPA only, fine there).

Consumer workaround today: `if (import.meta.client) provideWebContainer(useSandboxBoot().boot) else provideWebContainer(new Promise(() => {}))` (Nuxt) or equivalent `typeof window` guard (Astro, which has no `import.meta.client` equivalent but supports `typeof window`). Library fix (out of scope here): make boot lazy (`onMounted`) and SSR-safe.

### 2. Layout flag cannot be known on the server
`useFullLayout.ts` initialises `fullLayout = ref(true)` and only updates it from `getComputedStyle(el).getPropertyValue('--full-layout') === '1'` inside a `ResizeObserver` callback (VueUse `useResizeObserver`, client only). Consequences:
- Server and first client render are both the desktop split layout, so no hydration mismatch (confirmed), but a narrow container flips to the Tabs layout after mount. That is a visible re-layout: `ResizablePanelGroup` is unmounted and `Tabs` mounted, and the toolbar jumps from top to bottom.
- `fullLayoutFrom="none"` (documented as "always single panel") also SSRs the **desktop** layout. Verified: `none` HTML contains `data-panel-group` and no `layout-toggle`.
- `KrgzSandbox` has the same pattern: `const multiPanel = ref(true)` plus `useResizeObserver(panelControl, ...)` in `KrgzSandbox.vue`. Not visible on the server today because the pane is the loading placeholder, but it will matter once the sandbox pane is ever server-rendered.

Options (not decided here): CSS-only layout switching that renders both layouts and hides one with the same `@container` query; render a neutral skeleton until mounted; or accept the swap and document it.

### 3. `<ClientOnly>` and the docs guidance
`apps/docs/content/*/sandbox/2.getting-started.md` L193 says to put `<KrgzSandbox />` in `<ClientOnly />` in Nuxt. Nuxt's docs state the `<ClientOnly>` default slot "will be tree-shaken out of the server build" and that CSS in it may not be inlined (`nuxt/nuxt` `docs/4.api/1.components/1.client-only.md`). Fine for the standalone sandbox, wrong for Hayali if the lesson text must be in the HTML. For Hayali the gating belongs around boot, not around the component. `DemoRunner.vue` in `apps/docs` already follows the click-to-run `ClientOnly` pattern for sandbox demos.

### 4. Server-side first paint differences that are expected
- Sandbox pane is always the booting placeholder in server HTML.
- `useDark()` (editor, terminal, toolbar chrome) is `false` on the server, so dark mode styling of the sandbox applies after hydration. Hayali's own surface uses Tailwind `dark:` classes driven by the page's `.dark` class and is unaffected.
- `AlertDialogPortal` (step-lock confirm) is closed, so no teleport output is needed.
- `TocDropdown.vue` uses `document.activeElement` only in a keyboard handler, not at render.

### 5. Packaging
- `@karagoz/sandbox` and `@webcontainer/api` are ESM-only: `require('@karagoz/sandbox')` fails with `ERR_PACKAGE_PATH_NOT_EXPORTED` from `@webcontainer/api`. Fine for Nuxt/Nitro and Astro (ESM), but note it for any CJS-based server.
- Hayali's `dist/karagoz-hayali.js` imports `@karagoz/shared`, `@karagoz/sandbox`, `radix-vue`, `vue`, `vue-i18n` as externals. Under Nuxt/Vite SSR, workspace packages that ship `.vue`-compiled JS are externalised or inlined by Nitro; I did not run a Nuxt build, so any `ssr.noExternal` need is **unverified**.
- CSS is shipped as separate files (`@karagoz/*/dist/*.css`, `style.css`); consumers must include them in SSR output so the first paint is styled.

## Nuxt

- `apps/docs` already has `ssr: true`, `@nuxtjs/i18n`, `nitro.prerender` and COOP/COEP `routeRules`, and prerenders content pages.
- Server render of Hayali needs: `vue-i18n` from `@nuxtjs/i18n` (per request) with sandbox+hayali messages merged under `krgz.*` (the `i18nMessages` exports), and a `provideWebContainer` that is a pending promise on the server and the real boot on the client.
- Per-request i18n: always create the i18n instance per app/request. Do not import a module-level instance; `src/i18n.ts` in both packages is exactly that anti-pattern but is dev-only.
- Not verified: an actual Nuxt build/prerender with Hayali in a page (no consumer page exists yet).

## Astro

Findings from Astro's docs and `@astrojs/vue` source (not run here):

- `client:load`, `client:idle`, `client:visible`, `client:media` all **server-render first** and then hydrate. `client:only="vue"` skips server rendering entirely and requires the framework name (`withastro/docs` `framework-components.mdx` L53; `directives-reference.mdx` "client:only").
- **Each island is its own Vue app.** `@astrojs/vue`'s `client.ts` does `createSSRApp` (or `createApp` for `client:only`) per element and sets `app.config.idPrefix` from the element's `prefix` attribute, then `await setup(app)`. So:
  - `provide/inject` and Vue plugins do not cross islands. `provideWebContainer`, `useSandbox`'s injection, and `vue-i18n` must all be inside **one** island. Hayali already composes sandbox + lesson in one component, so a single `<KrgzHayali client:... />` island is the natural unit; splitting lesson and sandbox into separate islands is not possible with the current design (they share state through a client singleton `useSandbox` plus provide/inject, and `injectLocal` falls back to Vue `inject` in the island's own app).
  - `vue-i18n` is installed per island through `vue({ appEntrypoint: '/src/pages/_app' })`, whose default export receives each `app` (`integrations-guide/vue.mdx` "appEntrypoint"). The function must create a **new** i18n each call. It has no request object; the locale must come from a prop or global (e.g. `Astro.currentLocale` passed down), not `localStorage`.
  - `idPrefix` per island prevents `useId` (radix-vue) collisions between islands.
- Props to a hydrated island must be serialisable; functions are unsupported (`framework-components.mdx` L127-132). `lesson` (plain objects/strings) is fine. The `v-model:position` update handler and the `#sandbox` scoped slot cannot be passed from an `.astro` file. Wrap `KrgzHayali` in a small Vue component that owns `position` (and can implement the slot) and hand it plain props.
- Slots from `.astro` become static HTML (`StaticHtml`), so they are not reactive/scoped.
- Directive choice for Hayali: `client:visible` is attractive (defers the sandbox + CodeMirror + xterm + WebContainer bundle until scrolled into view while the server HTML shows the lesson). But the boot must still be gated behind the client and, ideally, a user action (see #1), since `client:visible` hydrates automatically. `client:load` hydrates immediately. `client:only="vue"` avoids the server-render issues but gives up lesson text in HTML and shows nothing until JS runs. A cross-origin-isolation header (COOP/COEP) must be set by whatever serves the Astro pages; Astro has no built-in for this (host config/middleware).

## Other open points

- First-paint layout (see #2) is the main design decision needed before promising SSR.
- Cloudflare Pages COOP/COEP: Hayali pages need those headers (already in `routeRules` for Nuxt); `require-corp` also constrains any cross-origin assets in lesson content.
- Nothing here measured performance or SEO value; "SSR works" means correct, hydratable HTML.

## Appendix: probe sketch (not committed)

```ts
// vitest, environment: 'node'
const app = createSSRApp({
  setup() {
    provideWebContainer(new Promise(() => {})) // never boots on server
    return () => h(KrgzHayali, { lesson, position })
  },
})
app.use(createI18n({ legacy: false, locale: 'en', messages: merged }))
await renderToString(app) // OK
// hydrate check: // @vitest-environment jsdom, innerHTML = html, createSSRApp(...).mount(el), spy on console.warn => 0 calls
```

## Sources

- Astro: Framework components (client directives, serialisable props): https://github.com/withastro/docs/blob/main/src/content/docs/en/guides/framework-components.mdx
- Astro: Template directives reference: https://github.com/withastro/docs/blob/main/src/content/docs/en/reference/directives-reference.mdx
- Astro: `@astrojs/vue` guide (`appEntrypoint`): https://github.com/withastro/docs/blob/main/src/content/docs/en/guides/integrations-guide/vue.mdx
- Astro: `@astrojs/vue` client source (per-island `createSSRApp`, `idPrefix`): https://github.com/withastro/astro/blob/main/packages/integrations/vue/src/client.ts
- Astro: Islands (isolation) / sharing state: https://github.com/withastro/docs/blob/main/src/content/docs/en/concepts/islands.mdx
- Nuxt: `<ClientOnly>`: https://github.com/nuxt/nuxt/blob/main/docs/4.api/1.components/1.client-only.md
- `@webcontainer/api@1.6.4` `dist/index.js` (installed copy under `packages/sandbox/node_modules`)
- `@vueuse/shared@14.3.0` `createSharedComposable`, `injectLocal` (installed copy)
- `radix-vue@1.9.17` `dist/index.js` `useId` (installed copy)
- In-repo: `packages/hayali/src/{composables/useFullLayout.ts,components/KrgzHayali.vue,components/StepBody.vue,callouts.ts,i18n.ts,index.ts}`, `packages/sandbox/src/{composables/useSandboxBoot.ts,composables/useSandbox.ts,utils/WebContainer.ts,components/KrgzSandbox.vue,components/KrgzProcess.vue}`, `apps/docs/nuxt.config.ts`, `apps/docs/components/content/DemoRunner.vue`, `apps/docs/content/en/sandbox/2.getting-started.md`.
