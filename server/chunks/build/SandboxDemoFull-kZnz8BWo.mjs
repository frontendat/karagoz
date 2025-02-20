import { defineComponent, withAsyncContext, unref, mergeProps, useSSRContext, computed, toValue, reactive } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { useSandboxBoot as ug, provideWebContainer as ig, useSandbox as gt, KrgzSandbox as cg } from './karagoz-sandbox-Btgvnhh6.mjs';
import { aj as hash, ap as fetchDefaults, aq as useRequestFetch } from './server.mjs';
import { a as useAsyncData } from './useLocalisedCollection-DK-aRPq5.mjs';
import '@webcontainer/api';
import '@codemirror/language';
import '@codemirror/language-data';
import 'codemirror';
import '@codemirror/state';
import '@codemirror/view';
import '@codemirror/commands';
import '@codemirror/theme-one-dark';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../nitro/nitro.mjs';
import 'zod';
import 'better-sqlite3';
import 'unhead';
import 'vue-router';
import './vue-i18n-Ci15wrpe.mjs';

function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const _key = opts.key || hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    watch,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller, new DOMException("Request aborted as another request to the same endpoint was initiated.", "AbortError"));
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort(new DOMException("Request aborted due to timeout.", "AbortError")), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  return segments;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SandboxDemoFull",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { boot, isBooting } = ug();
    ig(boot);
    const sandbox = gt();
    [__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/snapshot/express",
      {
        headers: { Accept: "application/octet-stream" },
        responseType: "blob"
      },
      "$YLlzGi1upW"
    )), __temp = await __temp, __restore();
    const { data: solveSnapshot, execute: fetchSolveSnapshot } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/snapshot/express-solve", {
      headers: { Accept: "application/octet-stream" },
      immediate: false,
      responseType: "blob"
    }, "$2v8bCbXQYz")), __temp = await __temp, __restore(), __temp);
    const onSolveClick = async () => {
      var _a;
      await fetchSolveSnapshot();
      if (!solveSnapshot.value) return;
      (_a = sandbox.container.value) == null ? void 0 : _a.mount(await solveSnapshot.value.arrayBuffer());
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(cg), mergeProps({
        booting: unref(isBooting),
        "shown-panels": ["code", "processes", "result", "terminal"],
        onSolve: ($event) => onSolveClick()
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/sandbox/demo/SandboxDemoFull.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SandboxDemoFull-kZnz8BWo.mjs.map
