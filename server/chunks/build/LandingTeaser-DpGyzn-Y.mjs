import { useSSRContext, defineComponent, unref, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, renderSlot, openBlock, createBlock } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { h as hs } from './karagoz-shared-BIF6lT4t.mjs';
import { _ as _sfc_main$4, a as _sfc_main$3, b as _sfc_main$2, c as _sfc_main$1, d as _sfc_main$5 } from './CardTitle.vue-v7UlQyoi.mjs';
import { ab as useLocalePath } from './server.mjs';
import NuxtLink from './nuxt-link-C3CduanY.mjs';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
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

const _sfc_setup$5 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/Card.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_setup$4 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/CardContent.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_setup$3 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/CardFooter.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_setup$2 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/CardHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_setup$1 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/card/CardTitle.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LandingTeaser",
  __ssrInlineRender: true,
  props: {
    headline: {},
    buttonText: {},
    buttonLink: {}
  },
  setup(__props) {
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$4), mergeProps({
        class: ["grid", { "opacity-50": !_ctx.buttonLink }]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(_ctx.headline)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(_ctx.headline), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$5), { class: "text-center" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.headline), 1)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), { class: "text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "self-end" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (_ctx.buttonLink) {
                    _push3(ssrRenderComponent(unref(hs), {
                      as: unref(NuxtLink),
                      to: unref(localePath)(_ctx.buttonLink),
                      class: "w-full"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(_ctx.buttonText)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(_ctx.buttonText), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(hs), {
                      disabled: "",
                      class: "w-full"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(_ctx.buttonText)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(_ctx.buttonText), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    _ctx.buttonLink ? (openBlock(), createBlock(unref(hs), {
                      key: 0,
                      as: unref(NuxtLink),
                      to: unref(localePath)(_ctx.buttonLink),
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.buttonText), 1)
                      ]),
                      _: 1
                    }, 8, ["as", "to"])) : (openBlock(), createBlock(unref(hs), {
                      key: 1,
                      disabled: "",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.buttonText), 1)
                      ]),
                      _: 1
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$5), { class: "text-center" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.headline), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$3), { class: "text-center" }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }),
              createVNode(unref(_sfc_main$2), { class: "self-end" }, {
                default: withCtx(() => [
                  _ctx.buttonLink ? (openBlock(), createBlock(unref(hs), {
                    key: 0,
                    as: unref(NuxtLink),
                    to: unref(localePath)(_ctx.buttonLink),
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.buttonText), 1)
                    ]),
                    _: 1
                  }, 8, ["as", "to"])) : (openBlock(), createBlock(unref(hs), {
                    key: 1,
                    disabled: "",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.buttonText), 1)
                    ]),
                    _: 1
                  }))
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/landing/LandingTeaser.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LandingTeaser-DpGyzn-Y.mjs.map
