/**
 * Script to be injected into every preview through `WebContainer.setPreviewScript()`.
 *
 * Forwards `console.log`/`info`/`warn`/`error`/`debug` calls and uncaught errors from the preview to the parent
 * window via `postMessage()` (as `{ type: 'console', level, args }`), to be collected and shown in the sandbox's
 * console panel.
 */
export const handleWebContainerError = `
  (function () {
    const serialize = (arg) => {
      if (typeof arg === 'string') return arg;
      if (arg instanceof Error) return arg.stack || arg.message;
      try {
        return JSON.stringify(arg);
      } catch (e) {
        return String(arg);
      }
    };
    ['log', 'info', 'warn', 'error', 'debug'].forEach((level) => {
      const original = console[level];
      console[level] = function (...args) {
        try {
          window.parent.postMessage({
            type: 'console',
            level,
            args: args.map(serialize),
          }, '*');
        } catch (e) {}
        original.apply(console, args);
      };
    });
    window.addEventListener('error', (event) => {
      window.parent.postMessage({ type: 'console', level: 'error', args: [event.message] }, '*');
    });
  })();
`
