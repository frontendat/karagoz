import { defineComponent, withCtx, createVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import _sfc_main$1 from './default-DEIxdBVX.mjs';
import './components-BVZYWBfw.mjs';
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
import './TopBar-DMkDlwHh.mjs';
import './nuxt-link-C3CduanY.mjs';
import './index-PSgpDirs.mjs';
import 'class-variance-authority';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'radix-vue';
import 'lucide-vue-next';
import './LanguageSwitcher-DWMjmyCE.mjs';
import './vue-i18n-Ci15wrpe.mjs';
import './GitHub-B0nG0xJM.mjs';
import './client-only-CkMuatfh.mjs';
import './server-placeholder-BiVZCzBa.mjs';
import './karagoz-shared-BIF6lT4t.mjs';
import '@vueuse/core';
import './Footer-D5i1hnPw.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "landing",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="container"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</main>`);
          } else {
            return [
              createVNode("main", { class: "container" }, [
                renderSlot(_ctx.$slots, "default")
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/landing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=landing-D8oVy1_K.mjs.map
