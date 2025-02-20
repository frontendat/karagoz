import NuxtLink from './nuxt-link-C3CduanY.mjs';
import { useSSRContext, defineComponent, computed, unref, mergeProps, withCtx, createTextVNode, toDisplayString } from 'vue';
import { _ as _export_sfc } from './server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "SideBarLevel",
  __ssrInlineRender: true,
  props: {
    items: {},
    initLevel: { default: 0 },
    level: { default: 0 },
    maxLevel: { default: Infinity },
    title: {}
  },
  setup(__props) {
    const props = __props;
    const levelItems = computed(() => {
      var _a;
      if (props.level) return props.items;
      let items = props.items;
      for (let i = 0; i < props.initLevel; i++) {
        items = (_a = items == null ? void 0 : items.at(0)) == null ? void 0 : _a.children;
      }
      return items != null ? items : [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = NuxtLink;
      const _component_DocsSideBarLevel = __nuxt_component_0;
      if (unref(levelItems).length) {
        _push(`<ul${ssrRenderAttrs(mergeProps({
          style: { "--sidebar-level": _ctx.level }
        }, _attrs))} data-v-a79545bd>`);
        if (_ctx.title) {
          _push(`<li data-v-a79545bd><div class="block font-bold px-2 py-1" data-v-a79545bd>${ssrInterpolate(_ctx.title)}</div></li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(levelItems), (item) => {
          _push(`<li data-v-a79545bd><div class="item" data-v-a79545bd>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            class: "block px-2 py-1 hover:underline text-muted-foreground",
            to: item.path
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
          if (item.children && _ctx.level < _ctx.maxLevel - 1) {
            _push(ssrRenderComponent(_component_DocsSideBarLevel, {
              items: item.children,
              level: _ctx.level + 1,
              "max-level": _ctx.maxLevel
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/side-bar/SideBarLevel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a79545bd"]]);

export { __nuxt_component_0 as default };
//# sourceMappingURL=SideBarLevel-DZMLZpiz.mjs.map
