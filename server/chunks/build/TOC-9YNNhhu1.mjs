import { useSSRContext, defineComponent, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useI18n } from './vue-i18n-Ci15wrpe.mjs';
import './server.mjs';
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
  __name: "TOC",
  __ssrInlineRender: true,
  props: {
    noTitle: { type: Boolean },
    toc: {}
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))}>`);
      if (!_ctx.noTitle) {
        _push(`<p class="font-medium">${ssrInterpolate(unref(t)("layouts.tocTitle"))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.toc && _ctx.toc.links) {
        _push(`<ul class="m-0 list-none"><!--[-->`);
        ssrRenderList(_ctx.toc.links, (link) => {
          var _a;
          _push(`<li class="pt-2"><a${ssrRenderAttr("href", `#${link.id}`)} class="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">${ssrInterpolate(link.text)}</a>`);
          if ((_a = link.children) == null ? void 0 : _a.length) {
            _push(`<ul class="m-0 list-none pl-4"><!--[-->`);
            ssrRenderList(link.children, (sublink) => {
              _push(`<li class="pt-2"><a${ssrRenderAttr("href", `#${sublink.id}`)} class="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">${ssrInterpolate(sublink.text)}</a></li>`);
            });
            _push(`<!--]--></ul>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/toc/TOC.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=TOC-9YNNhhu1.mjs.map
