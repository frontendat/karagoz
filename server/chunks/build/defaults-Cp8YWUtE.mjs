import __nuxt_component_0 from './client-only-CkMuatfh.mjs';
import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import './server-placeholder-BiVZCzBa.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "defaults",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<!--[--><p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias asperiores aut dicta fugit hic iure iusto neque nihil obcaecati perferendis perspiciatis, reiciendis tempora. Ab aperiam corporis distinctio odio porro. </p>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/sandbox/demos/defaults.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=defaults-Cp8YWUtE.mjs.map
