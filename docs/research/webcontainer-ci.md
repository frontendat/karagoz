# Can WebContainer boot in GitHub-hosted CI? (issue #140, part of #137)

Status: desk research only. No boot was attempted from a runner. Recommendation at the bottom is a hypothesis to verify with a spike.

Source limitation: `webcontainers.io` and `playwright.dev` were blocked by the research sandbox's network policy. Claims below come from (a) the installed `@webcontainer/api@1.6.4` package source and README (first-party), (b) StackBlitz's `webcontainer-core` issue tracker (first-party, maintainers replying), (c) Playwright docs source in `microsoft/playwright` (`docs/src/*.md`, the same files that render playwright.dev), (d) GitHub Docs. Anything not traceable to these is marked UNVERIFIED.

## Short answer

Probably yes, with caveats. Nothing in `@webcontainer/api` is browser-vendor-specific beyond needing cross-origin isolation, and headless Chromium on `ubuntu-latest` satisfies that for a page served from `localhost`. The real risks are external: boot depends on a live StackBlitz-hosted service, and the dependency install step depends on network and registry. Run it as a non-blocking (or retried, separately-reported) job, not a required PR gate, until a spike shows the flake rate.

## What boot actually does (package source, v1.6.4)

- `WebContainer.boot()` creates a hidden `<iframe>` pointing at `https://stackblitz.com/headless?version=1.6.4` (plus `coep`, `client_id` if set), with `allow="cross-origin-isolated"`, and waits for an `init` postMessage from that origin. (`dist/index.js` `serverFactory`; `dist/internal/iframe-url.js`; `dist/internal/constants.js` `DEFAULT_EDITOR_ORIGIN = 'https://stackblitz.com'`.)
- There is no timeout in `boot()`: if the iframe never posts `init`, the promise hangs forever. The caller must add its own timeout.
- Only one instance at a time; second `boot()` throws `Only a single WebContainer instance can be booted` unless `teardown()` ran. Playwright retries use a fresh page, so this is fine per attempt; do not boot twice in one page.
- Calling `boot()` again after the first iframe exists reuses the cached iframe; changing `coep` afterward warns and is ignored.
- Boot is documented as "an expensive operation" (JSDoc on `boot`).

## Network hosts

Confirmed from package source: `https://stackblitz.com` (the `/headless` document). Confirmed from a maintainer exchange (issue #1408): the headless page loads assets from `w-corp-staticblitz.com` (a maintainer asks for `curl https://w-corp-staticblitz.com/cdn-cgi/trace`); issue #783 shows `w-corp.staticblitz.com` serving `.wasm` files. So allow/expect `stackblitz.com` and `*.staticblitz.com` / `w-corp-staticblitz.com`.
UNVERIFIED: the exact set of hosts and whether `npm install` inside the container goes direct to `registry.npmjs.org` or via a StackBlitz proxy. The README only says the API "relies on hosted proxies and server-side acceleration from StackBlitz". Verify in the spike by logging `page.on('request')` hosts.

GitHub-hosted runners have unrestricted outbound internet by default (self-hosted/enterprise allowlists are the exception); no allowlist is needed on public-repo standard runners. UNVERIFIED against the GitHub Docs page fetched (it only returned the runner spec table); treat as general knowledge.

Runner spec (GitHub Docs, "GitHub-hosted runners"): `ubuntu-latest` is 4 vCPU / 16 GB RAM / 14 GB SSD for public repos; the single-vCPU `ubuntu-slim` is 5 GB RAM, avoid it for this.

## Cross-origin isolation from a locally served page

- README: WebContainer requires `SharedArrayBuffer`, hence a cross-origin-isolated root document: `Cross-Origin-Embedder-Policy: require-corp` and `Cross-Origin-Opener-Policy: same-origin`. HTTPS is required in production but not on `localhost`, which is exempt.
- So CI can serve the built docs app or a minimal fixture page over plain `http://localhost:<port>` provided the server sends both headers. This repo already sets them for all routes in `apps/docs/nuxt.config.ts` (`routeRules`). A `nuxt preview`/static server that keeps those headers works; one that drops them (plain `http-server`, `vite preview` without `server.headers`) would silently produce `crossOriginIsolated === false`.
- The dev server runs HTTPS with local certs (per project CLAUDE.md). In CI prefer plain HTTP on localhost to avoid certificate trust. If HTTPS is kept, set Playwright `use.ignoreHTTPSErrors: true` (documented option) and `webServer.ignoreHTTPSErrors: true`.
- Cheap preflight assertion: `await page.evaluate(() => crossOriginIsolated && typeof SharedArrayBuffer !== 'undefined')` before booting. This separates "our headers are wrong" from "StackBlitz is flaky".
- With `require-corp`, cross-origin subresources must be CORP/CORS-compatible. The `/headless` iframe is first-party-served by StackBlitz and designed for this; `coep: 'credentialless'` is an alternative the API supports (`BootOptions.coep`) and a StackBlitz-reported issue (#2056) used it in Chromium.
- Chrome Local Network Access (Chrome 142+) restrictions affect requests from the WebContainer iframes to private IPs (issue #2007, open, no fix). Relevant if a preview iframe hits `127.0.0.1`. Playwright's bundled Chromium version should be checked; if LNA bites, launch with the relevant Chromium flag or test without preview.

## Production-origin gating (not a localhost problem, but worth knowing)

- Issues #2056 (closed) and #2135 (open, 2026-07) report `/headless` returning 404 on non-localhost origins even with an enabled API key and allowed site; localhost without a key works. For CI against `http://localhost` no API key should be needed (the repo's own `useSandboxBoot` does not call `configureAPIKey`). Do not point CI at the deployed Cloudflare site unless a key is configured, and prefer localhost.

## Known flakiness and timing

- No published SLA. Evidence is anecdotal from the tracker:
  - Issue #1408: first boot ~10 s from one location, <5 s on reload, StackBlitz-side CDN slowness suspected by maintainers; another maintainer observed ~2 s boot.
  - Issue #740: transient `NetworkError when attempting to fetch resource` from network inside the container that succeeded on retry; closed as non-actionable.
  - Several open "StackBlitz server crashed" issues (#1668 etc.) show service-side failures occur.
- Cold CI runner has no browser cache of the wasm assets, so expect the slow-end first-boot path every run.
- Dependency installation inside the container adds multiple seconds (issue #1408: a trivial `lodash` install took >4 s). Keep the smoke test to boot + mount + one trivial command that needs no `npm install`, e.g. `spawn('node', ['-e', 'console.log(1+1)'])`, to minimise network exposure. A second tier test may run `npm install` and be allowed to fail.
- Playwright inside WebContainer itself is not supported (issue #247); irrelevant here because Playwright runs outside, on the runner.

## Playwright settings (from `microsoft/playwright` docs source)

- Defaults: test timeout 30 s, expect timeout 5 s, action/navigation timeout none, no global timeout (`test-timeouts-js.md`). Boot plus mount will not fit in 30 s with margin on a cold runner; raise per test.
- CI guidance: `workers: 1` in CI for stability, set `globalTimeout`, keep job `timeout-minutes` above it (`ci.md`). `retries` is configurable and off by default (`test-retries-js.md`). `reuseExistingServer: !process.env.CI`, `webServer.timeout` default 60 s (`test-webserver-js.md`).
- Chromium: Playwright's default headless mode uses the separate headless shell; the `chromium` channel opts into new headless (the real Chrome) (`browsers.md`). Whether SharedArrayBuffer/cross-origin isolation behaves identically in both is UNVERIFIED; try default first and fall back to `channel: 'chromium'` if `crossOriginIsolated` is false or the boot hangs.
- Install: `npx playwright install --with-deps chromium` (`ci.md`; add `--only-shell` to skip full Chromium if using headless shell).

## Suggested configuration (to validate in a spike)

```ts
// playwright.config.ts (sketch, not committed code)
export default defineConfig({
  timeout: 90_000,              // per attempt: boot ~2-10 s + mount + command, 3-4x headroom
  expect: { timeout: 15_000 },
  retries: process.env.CI ? 2 : 0, // 3 attempts total; boot flakes are service-side and usually clear
  workers: 1,
  globalTimeout: 10 * 60_000,
  use: { actionTimeout: 15_000, navigationTimeout: 30_000, trace: 'retain-on-failure' },
  webServer: { command: '...serve with COOP/COEP...', url: 'http://localhost:3000', timeout: 120_000, reuseExistingServer: !process.env.CI },
})
```

- In the page, wrap `WebContainer.boot()` in `Promise.race` with a 45 s timeout (boot itself never times out) and surface a distinct error, so triage can tell "boot hung" from "assertion failed".
- Preflight `crossOriginIsolated` assertion with no retry on failure (deterministic config bug).
- Workflow: `runs-on: ubuntu-latest`, `timeout-minutes: 15` (above `globalTimeout`), upload trace/report on failure, log all request hosts on failure.
- Gate policy: start as `continue-on-error: true` or a separate scheduled/nightly + label-triggered job, record pass rate for ~2 weeks, promote to required only if flake rate is below an agreed threshold (e.g. under 2% after retries). A hard external dependency on stackblitz.com that is out of our control argues against making it a required PR check by default.

## Open questions for the spike

1. Exact outbound host list during boot and during `npm install` (log requests).
2. Does default headless shell keep `crossOriginIsolated` true for a localhost page with COOP/COEP? Does `channel: 'chromium'` differ?
3. Measured cold boot time and flake rate over ~30 runs on `ubuntu-latest`.
4. Does `/headless` ever require a key for `http://localhost` from a datacenter IP (rate limiting)? No source says so; check empirically.
5. Is the Terms of Service acceptable for automated CI traffic (README links to StackBlitz ToS)? Not reviewed.

## Sources

- `@webcontainer/api@1.6.4` README and `dist/index.js`, `dist/internal/iframe-url.js`, `dist/internal/constants.js` (installed in `node_modules/.pnpm/@webcontainer+api@1.6.4`).
- https://github.com/stackblitz/webcontainer-core/issues/1408, /740, /783, /247, /2007, /2056, /2135
- https://github.com/microsoft/playwright/blob/main/docs/src/ci.md, test-timeouts-js.md, test-retries-js.md, test-webserver-js.md, browsers.md, test-use-options-js.md
- https://docs.github.com/en/actions/reference/runners/github-hosted-runners
