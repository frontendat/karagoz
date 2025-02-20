import { _ as _sfc_main$1, a as _sfc_main$2 } from './NotFound-DypIAyNL.mjs';
import { defineComponent, withAsyncContext, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { af as useRoute } from './server.mjs';
import { u as useLocalisedCollection, a as useAsyncData } from './useLocalisedCollection-DK-aRPq5.mjs';
import './nuxt-link-C3CduanY.mjs';
import './vue-i18n-Ci15wrpe.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[...slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const queryLocalisedCollection = useLocalisedCollection();
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(route.path, () => {
      return queryLocalisedCollection((builder) => builder.path(route.path).first());
    }, "$aROEKgqrzL")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ContentRenderer = _sfc_main$1;
      const _component_DocsNotFound = _sfc_main$2;
      if (unref(page)) {
        _push(ssrRenderComponent(_component_ContentRenderer, mergeProps({ value: unref(page) }, _attrs), null, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}><div class="mx-auto py-6 lg:py-8 prose dark:prose-invert">`);
        _push(ssrRenderComponent(_component_DocsNotFound, null, null, _parent));
        _push(`</div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-DzSkxk1h.mjs.map
