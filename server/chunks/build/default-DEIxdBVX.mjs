import { Html, Head, Title, Link, Meta, Body } from './components-BVZYWBfw.mjs';
import _sfc_main$1 from './TopBar-DMkDlwHh.mjs';
import _sfc_main$2 from './Footer-D5i1hnPw.mjs';
import { defineComponent, computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { af as useRoute, ag as useLocaleHead } from './server.mjs';
import { u as useI18n } from './vue-i18n-Ci15wrpe.mjs';
import './nuxt-link-C3CduanY.mjs';
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
import './index-PSgpDirs.mjs';
import 'class-variance-authority';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'radix-vue';
import 'lucide-vue-next';
import './LanguageSwitcher-DWMjmyCE.mjs';
import './GitHub-B0nG0xJM.mjs';
import './client-only-CkMuatfh.mjs';
import './server-placeholder-BiVZCzBa.mjs';
import './karagoz-shared-BIF6lT4t.mjs';
import '@vueuse/core';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { t } = useI18n();
    const head = useLocaleHead();
    const title = computed(
      () => {
        var _a2;
        var _a;
        return route.meta.title ? t((_a2 = (_a = route.meta.title) == null ? void 0 : _a.toString()) != null ? _a2 : "TBD", t("layouts.title")) : t("layouts.title");
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Html = Html;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_Link = Link;
      const _component_Meta = Meta;
      const _component_Body = Body;
      const _component_DocsTopBar = _sfc_main$1;
      const _component_DocsFooter = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Html, {
        lang: (_a = unref(head).htmlAttrs) == null ? void 0 : _a.lang,
        dir: (_b = unref(head).htmlAttrs) == null ? void 0 : _b.dir
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Head, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Title, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(title))} | ${ssrInterpolate(unref(t)("layouts.siteName"))}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(title)) + " | " + toDisplayString(unref(t)("layouts.siteName")), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(head).link, (link) => {
                    _push3(ssrRenderComponent(_component_Link, {
                      id: link.hid,
                      rel: link.rel,
                      href: link.href,
                      hreflang: link.hreflang
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--><!--[-->`);
                  ssrRenderList(unref(head).meta, (meta) => {
                    _push3(ssrRenderComponent(_component_Meta, {
                      id: meta.hid,
                      property: meta.property,
                      content: meta.content
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    createVNode(_component_Title, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(title)) + " | " + toDisplayString(unref(t)("layouts.siteName")), 1)
                      ]),
                      _: 1
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(head).link, (link) => {
                      return openBlock(), createBlock(_component_Link, {
                        key: link.hid,
                        id: link.hid,
                        rel: link.rel,
                        href: link.href,
                        hreflang: link.hreflang
                      }, null, 8, ["id", "rel", "href", "hreflang"]);
                    }), 128)),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(head).meta, (meta) => {
                      return openBlock(), createBlock(_component_Meta, {
                        key: meta.hid,
                        id: meta.hid,
                        property: meta.property,
                        content: meta.content
                      }, null, 8, ["id", "property", "content"]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Body, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex min-h-screen flex-col bg-background"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_DocsTopBar, null, null, _parent3, _scopeId2));
                  _push3(`<div class="flex-1 bg-background"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_DocsFooter, null, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex min-h-screen flex-col bg-background" }, [
                      createVNode(_component_DocsTopBar),
                      createVNode("div", { class: "flex-1 bg-background" }, [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      createVNode(_component_DocsFooter)
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Head, null, {
                default: withCtx(() => [
                  createVNode(_component_Title, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(title)) + " | " + toDisplayString(unref(t)("layouts.siteName")), 1)
                    ]),
                    _: 1
                  }),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(head).link, (link) => {
                    return openBlock(), createBlock(_component_Link, {
                      key: link.hid,
                      id: link.hid,
                      rel: link.rel,
                      href: link.href,
                      hreflang: link.hreflang
                    }, null, 8, ["id", "rel", "href", "hreflang"]);
                  }), 128)),
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(head).meta, (meta) => {
                    return openBlock(), createBlock(_component_Meta, {
                      key: meta.hid,
                      id: meta.hid,
                      property: meta.property,
                      content: meta.content
                    }, null, 8, ["id", "property", "content"]);
                  }), 128))
                ]),
                _: 1
              }),
              createVNode(_component_Body, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex min-h-screen flex-col bg-background" }, [
                    createVNode(_component_DocsTopBar),
                    createVNode("div", { class: "flex-1 bg-background" }, [
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    createVNode(_component_DocsFooter)
                  ])
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-DEIxdBVX.mjs.map
