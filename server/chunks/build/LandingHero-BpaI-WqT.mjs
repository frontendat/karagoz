import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { p as ps } from './karagoz-shared-BIF6lT4t.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LandingHero",
  __ssrInlineRender: true,
  props: {
    headline: {},
    subline: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 page-header page-header pb-8 prose dark:prose-dark" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(ps), { class: "fill-primary size-[170px]" }, null, _parent));
      _push(`<h1 class="mb-0">${ssrInterpolate(_ctx.headline)}</h1><p class="mt-0 text-center text-xl">${ssrInterpolate(_ctx.subline)}</p></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/landing/LandingHero.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LandingHero-BpaI-WqT.mjs.map
