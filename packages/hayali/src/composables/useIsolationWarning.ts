let warned = false

/**
 * Logs one dev-mode warning when the page isn't cross-origin isolated: WebContainer needs it, and without it the
 * sandbox can't boot. Call from a mounted hook (never on the server).
 */
export const warnIfNotIsolated = () => {
  if (warned || !import.meta.env.DEV || globalThis.crossOriginIsolated) return
  warned = true
  console.warn(
    '[hayali] This page is not cross-origin isolated, so the sandbox (WebContainer) cannot boot. ' +
      'Serve it with "Cross-Origin-Opener-Policy: same-origin" and "Cross-Origin-Embedder-Policy: require-corp" (or "credentialless").',
  )
}
