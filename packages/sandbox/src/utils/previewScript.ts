/**
 * This code gets injected into every preview. It emits the current URL to the parent window (on load, hashchange,
 * popstate and history.pushState / replaceState) to be shown in the address bar of the preview panel and to back
 * `useSandbox().preview.path`, and forwards console output to the parent window to be shown in the console panel.
 */
export const previewScript = `
  window.parent.postMessage({ type: 'navigation', href: window.location.href, initial: true}, '*');
  (function () {
    const reportNavigation = () => {
      window.parent.postMessage({ type: 'navigation', href: window.location.href}, '*');
    };
    window.addEventListener('hashchange', reportNavigation);
    window.addEventListener('popstate', reportNavigation);
    ['pushState', 'replaceState'].forEach((method) => {
      const original = history[method];
      history[method] = function (...args) {
        const result = original.apply(this, args);
        reportNavigation();
        return result;
      };
    });
  })();
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
