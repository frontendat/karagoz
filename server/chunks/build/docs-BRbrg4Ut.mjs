import _sfc_main$2 from './SideBar-CqgC7P-P.mjs';
import _sfc_main$3 from './Breadcrumb-DUvRAyTD.mjs';
import _sfc_main$4 from './TOCResponsive-DkvCXZ5s.mjs';
import { useSSRContext, defineComponent, withAsyncContext, computed, withCtx, unref, createVNode, openBlock, createBlock, createCommentVNode, renderSlot } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { x as xs } from './karagoz-shared-BIF6lT4t.mjs';
import _sfc_main$1 from './default-DEIxdBVX.mjs';
import { _ as _export_sfc, u as useRouter } from './server.mjs';
import { u as useLocalisedCollection, a as useAsyncData } from './useLocalisedCollection-DK-aRPq5.mjs';
import './SideBarLevel-DZMLZpiz.mjs';
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
import './vue-i18n-Ci15wrpe.mjs';
import './BreadcrumbSeparator.vue-DYkofup8.mjs';
import './utils-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import 'radix-vue';
import 'lucide-vue-next';
import './TOC-9YNNhhu1.mjs';
import './index-D7MaWH6O.mjs';
import './components-BVZYWBfw.mjs';
import './TopBar-DMkDlwHh.mjs';
import './index-PSgpDirs.mjs';
import 'class-variance-authority';
import './LanguageSwitcher-DWMjmyCE.mjs';
import './GitHub-B0nG0xJM.mjs';
import './client-only-CkMuatfh.mjs';
import './server-placeholder-BiVZCzBa.mjs';
import '@vueuse/core';
import './Footer-D5i1hnPw.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "docs",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRouter().currentRoute;
    const queryLocalisedCollection = useLocalisedCollection();
    const { data: page } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      route.value.path,
      () => queryLocalisedCollection(
        (builder) => builder.path(route.value.path).first()
      ),
      { watch: [() => route.value.path] }
    )), __temp = await __temp, __restore(), __temp);
    const hideToc = computed(() => !page.value || page.value.hideToc);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_DocsSideBar = _sfc_main$2;
      const _component_DocsBreadcrumb = _sfc_main$3;
      const _component_DocsTOCResponsive = _sfc_main$4;
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="border-b" data-v-c10a4a61${_scopeId}><div class="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10" data-v-c10a4a61${_scopeId}><aside class="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-hidden" data-v-c10a4a61${_scopeId}>`);
            _push2(ssrRenderComponent(unref(xs), {
              type: "auto",
              class: "h-full"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_DocsSideBar, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_DocsSideBar)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</aside><main class="gap-6 grid py-6 lg:py-8 relative" data-v-c10a4a61${_scopeId}><div class="overflow-hidden order-2 xl:order-1" data-v-c10a4a61${_scopeId}>`);
            if (!unref(page) || !((_a = unref(page)) == null ? void 0 : _a.hideBreadcrumb)) {
              _push2(`<div class="mb-4" data-v-c10a4a61${_scopeId}>`);
              _push2(ssrRenderComponent(_component_DocsBreadcrumb, null, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="max-w-none min-w-0 w-full prose dark:prose-invert" data-v-c10a4a61${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div>`);
            if (!unref(hideToc)) {
              _push2(ssrRenderComponent(_component_DocsTOCResponsive, { class: "toc order-1 xl:order-2" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</main></div></div>`);
          } else {
            return [
              createVNode("div", { class: "border-b" }, [
                createVNode("div", { class: "container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10" }, [
                  createVNode("aside", { class: "fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-hidden" }, [
                    createVNode(unref(xs), {
                      type: "auto",
                      class: "h-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_DocsSideBar)
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("main", { class: "gap-6 grid py-6 lg:py-8 relative" }, [
                    createVNode("div", { class: "overflow-hidden order-2 xl:order-1" }, [
                      !unref(page) || !((_b = unref(page)) == null ? void 0 : _b.hideBreadcrumb) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-4"
                      }, [
                        createVNode(_component_DocsBreadcrumb)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "max-w-none min-w-0 w-full prose dark:prose-invert" }, [
                        renderSlot(_ctx.$slots, "default", {}, void 0, true)
                      ])
                    ]),
                    !unref(hideToc) ? (openBlock(), createBlock(_component_DocsTOCResponsive, {
                      key: 0,
                      class: "toc order-1 xl:order-2"
                    })) : createCommentVNode("", true)
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/docs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const docs = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c10a4a61"]]);

export { docs as default };
//# sourceMappingURL=docs-BRbrg4Ut.mjs.map
