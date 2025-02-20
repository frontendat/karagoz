import { useSSRContext, defineComponent, resolveComponent, mergeProps, withCtx, unref, createVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "py-6 md:px-8 md:py-0" }, _attrs))}><div class="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row"><div class="text-center text-sm leading-loose text-muted-foreground">`);
      _push(ssrRenderComponent(_component_i18n_t, {
        keypath: "layouts.default.footer.licenseText",
        tag: "span"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a class="underline" href="https://opensource.org/licenses/MIT" target="_blank"${_scopeId}>${ssrInterpolate(unref(t)("layouts.default.footer.licenseName"))}</a>`);
          } else {
            return [
              createVNode("a", {
                class: "underline",
                href: "https://opensource.org/licenses/MIT",
                target: "_blank"
              }, toDisplayString(unref(t)("layouts.default.footer.licenseName")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<br><span>${ssrInterpolate(unref(t)("layouts.default.footer.copyright", { year: unref(year) }))}</span></div></div></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/footer/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Footer-D5i1hnPw.mjs.map
