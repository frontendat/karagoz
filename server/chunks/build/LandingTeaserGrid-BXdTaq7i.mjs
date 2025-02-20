import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "LandingTeaserGrid",
  __ssrInlineRender: true,
  props: {
    count: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "grid gap-8 justify-stretch items-stretch mx-auto max-w-[760px] pb-8 md:pb-12 lg:pb-24",
        style: { "--teaser-count": _ctx.count }
      }, _attrs))} data-v-401f7b88>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/landing/LandingTeaserGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LandingTeaserGrid = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-401f7b88"]]);

export { LandingTeaserGrid as default };
//# sourceMappingURL=LandingTeaserGrid-BXdTaq7i.mjs.map
