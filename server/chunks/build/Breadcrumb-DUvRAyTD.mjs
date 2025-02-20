import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$4, d as _sfc_main$4$1 } from './BreadcrumbSeparator.vue-DYkofup8.mjs';
import { useSSRContext, defineComponent, withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useI18n } from './vue-i18n-Ci15wrpe.mjs';
import { u as useRouter } from './server.mjs';
import { u as useLocalisedCollection, a as useAsyncData, c as kebabCaseToCamelCase } from './useLocalisedCollection-DK-aRPq5.mjs';
import NuxtLink from './nuxt-link-C3CduanY.mjs';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'radix-vue';
import 'lucide-vue-next';
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

const _sfc_setup$4 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/breadcrumb/BreadcrumbItem.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_setup$3 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/breadcrumb/BreadcrumbLink.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_setup$2 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/breadcrumb/BreadcrumbList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_setup$1 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/breadcrumb/BreadcrumbSeparator.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Breadcrumb",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const route = useRouter().currentRoute;
    const queryLocalisedCollection = useLocalisedCollection();
    const fetchBreadcrumb = () => {
      return Promise.all(
        route.value.path.split("/").map((_, idx, parts) => parts.slice(0, idx + 1).join("/")).filter((stepPath) => stepPath).map(
          (stepPath) => queryLocalisedCollection(
            (builder) => builder.path(stepPath).select("path", "title").first().then((item) => {
              var _a, _b;
              return {
                path: (_a = item == null ? void 0 : item.path) != null ? _a : stepPath,
                title: (_b = item == null ? void 0 : item.title) != null ? _b : t(
                  `pages${kebabCaseToCamelCase(stepPath.split("/").join("."))}.title`,
                  t("pages.notFound.title")
                )
              };
            })
          )
        )
      );
    };
    const { data: breadcrumb } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(fetchBreadcrumb, {
      watch: [() => route.value.path]
    }, "$rGXtkArH7H")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Breadcrumb = _sfc_main$4$1;
      if ((_a = unref(breadcrumb)) == null ? void 0 : _a.length) {
        _push(ssrRenderComponent(_component_Breadcrumb, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$1), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(breadcrumb), (step, index) => {
                      _push3(`<!--[-->`);
                      if (index) {
                        _push3(ssrRenderComponent(unref(_sfc_main$4), null, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(ssrRenderComponent(unref(_sfc_main$3), null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(_sfc_main$2), {
                              as: unref(NuxtLink),
                              to: step.path
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(step.title)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(step.title), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(_sfc_main$2), {
                                as: unref(NuxtLink),
                                to: step.path
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(step.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["as", "to"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<!--]-->`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(breadcrumb), (step, index) => {
                        return openBlock(), createBlock(Fragment, {
                          key: step.path
                        }, [
                          index ? (openBlock(), createBlock(unref(_sfc_main$4), { key: 0 })) : createCommentVNode("", true),
                          createVNode(unref(_sfc_main$3), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$2), {
                                as: unref(NuxtLink),
                                to: step.path
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(step.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["as", "to"])
                            ]),
                            _: 2
                          }, 1024)
                        ], 64);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$1), null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(breadcrumb), (step, index) => {
                      return openBlock(), createBlock(Fragment, {
                        key: step.path
                      }, [
                        index ? (openBlock(), createBlock(unref(_sfc_main$4), { key: 0 })) : createCommentVNode("", true),
                        createVNode(unref(_sfc_main$3), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$2), {
                              as: unref(NuxtLink),
                              to: step.path
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(step.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["as", "to"])
                          ]),
                          _: 2
                        }, 1024)
                      ], 64);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/breadcrumb/Breadcrumb.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Breadcrumb-DUvRAyTD.mjs.map
