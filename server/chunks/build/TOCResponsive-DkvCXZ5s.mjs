import _sfc_main$1 from './TOC-9YNNhhu1.mjs';
import { Collapsible as _sfc_main$2, CollapsibleTrigger as _sfc_main$3, CollapsibleContent as _sfc_main$1$1 } from './index-D7MaWH6O.mjs';
import { useSSRContext, defineComponent, withAsyncContext, computed, ref, unref, mergeProps, withCtx, createVNode, isRef, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { x as xs, h as hs } from './karagoz-shared-BIF6lT4t.mjs';
import { u as useRouter } from './server.mjs';
import { u as useI18n } from './vue-i18n-Ci15wrpe.mjs';
import { u as useLocalisedCollection, a as useAsyncData } from './useLocalisedCollection-DK-aRPq5.mjs';
import 'radix-vue';
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
  __name: "TOCResponsive",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRouter().currentRoute;
    const { t } = useI18n();
    const queryLocalisedCollection = useLocalisedCollection();
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      route.value.path,
      () => queryLocalisedCollection(
        (builder) => builder.path(route.value.path).first()
      ),
      { watch: [() => route.value.path] }
    )), __temp = await __temp, __restore(), __temp);
    const toc = computed(() => {
      var _a;
      return (_a = page.value) == null ? void 0 : _a.body.toc;
    });
    const tocIsOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_DocsTOC = _sfc_main$1;
      const _component_Collapsible = _sfc_main$2;
      const _component_CollapsibleTrigger = _sfc_main$3;
      const _component_CollapsibleContent = _sfc_main$1$1;
      if ((_b = (_a = unref(toc)) == null ? void 0 : _a.links) == null ? void 0 : _b.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-sm" }, _attrs))}><div class="hidden sticky top-24 xl:block"><div class="h-[calc(100vh-7rem)] overflow-hidden w-full z-30">`);
        _push(ssrRenderComponent(unref(xs), {
          type: "auto",
          class: "h-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_DocsTOC, { toc: unref(toc) }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_DocsTOC, { toc: unref(toc) }, null, 8, ["toc"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="block xl:hidden">`);
        _push(ssrRenderComponent(_component_Collapsible, {
          open: unref(tocIsOpen),
          "onUpdate:open": ($event) => isRef(tocIsOpen) ? tocIsOpen.value = $event : null
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_CollapsibleTrigger, { "as-child": "" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(hs), { variant: "outline" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(t)("layouts.tocButton"))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(t)("layouts.tocButton")), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(hs), { variant: "outline" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)("layouts.tocButton")), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CollapsibleContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="border-s ps-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_DocsTOC, {
                      class: "mt-4",
                      "no-title": "",
                      toc: unref(toc)
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "border-s ps-4" }, [
                        createVNode(_component_DocsTOC, {
                          class: "mt-4",
                          "no-title": "",
                          toc: unref(toc)
                        }, null, 8, ["toc"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_CollapsibleTrigger, { "as-child": "" }, {
                  default: withCtx(() => [
                    createVNode(unref(hs), { variant: "outline" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)("layouts.tocButton")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CollapsibleContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "border-s ps-4" }, [
                      createVNode(_component_DocsTOC, {
                        class: "mt-4",
                        "no-title": "",
                        toc: unref(toc)
                      }, null, 8, ["toc"])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/toc/TOCResponsive.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=TOCResponsive-DkvCXZ5s.mjs.map
