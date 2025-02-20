import __nuxt_component_0 from './SideBarLevel-DZMLZpiz.mjs';
import { useSSRContext, defineComponent, computed, withAsyncContext, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useLocalisedCollection, b as useLocalisedCollectionNavigation, a as useAsyncData, f as fallbackTitleKey } from './useLocalisedCollection-DK-aRPq5.mjs';
import { u as useI18n } from './vue-i18n-Ci15wrpe.mjs';
import { u as useRouter } from './server.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SideBar",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const route = useRouter().currentRoute;
    const queryLocalisedCollection = useLocalisedCollection();
    const queryLocalisedCollectionNavigation = useLocalisedCollectionNavigation();
    const pathParts = computed(() => route.value.path.split("/").slice(0, 3));
    const topPath = computed(
      () => 2 <= pathParts.value.length ? pathParts.value.slice(0, 2).join("/") : void 0
    );
    const bottomPath = computed(
      () => 3 === pathParts.value.length ? pathParts.value.join("/") : void 0
    );
    const { data: topNav } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `sidebar-top-${topPath.value}`,
      () => topPath.value ? queryLocalisedCollectionNavigation(
        (builder) => builder.where("path", "LIKE", `${topPath.value}%`)
      ) : Promise.resolve(null),
      {
        watch: [topPath]
      }
    )), __temp = await __temp, __restore(), __temp);
    const { data: bottomNav } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `sidebar-bottom-${bottomPath.value}`,
      () => bottomPath.value ? queryLocalisedCollectionNavigation(
        (builder) => builder.where("path", "LIKE", `${bottomPath.value}%`).where("id", "NOT LIKE", "%index.md")
      ) : Promise.resolve(null),
      {
        watch: [bottomPath]
      }
    )), __temp = await __temp, __restore(), __temp);
    const getTitle = async (path) => {
      var _a2;
      var _a, _b;
      if (!path) return "...";
      const content = await queryLocalisedCollection(
        (builder) => builder.path(path).first()
      );
      return [
        typeof (content == null ? void 0 : content.navigation) === "object" ? (_a2 = (_a = content == null ? void 0 : content.navigation) == null ? void 0 : _a.sidebarTitle) != null ? _a2 : (_b = content == null ? void 0 : content.navigation) == null ? void 0 : _b.title : void 0,
        content == null ? void 0 : content.title,
        t(fallbackTitleKey(path), "...")
      ].find((title) => !!title);
    };
    const { data: topTitle } = useAsyncData(
      `sidebar-top-title-${topPath.value}`,
      () => getTitle(topPath.value),
      {
        watch: [topPath]
      }
    );
    const { data: bottomTitle } = useAsyncData(
      `sidebar-bottom-title-${bottomPath.value}`,
      () => getTitle(bottomPath.value),
      {
        watch: [bottomPath]
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2;
      var _a, _b;
      const _component_DocsSideBarLevel = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "pe-6 py-8 text-sm" }, _attrs))}>`);
      if ((_a = unref(topNav)) == null ? void 0 : _a.length) {
        _push(ssrRenderComponent(_component_DocsSideBarLevel, {
          key: unref(pathParts).slice(0, 2).join("/"),
          items: (_a2 = unref(topNav)) != null ? _a2 : [],
          "init-level": 1,
          "max-level": 1,
          title: unref(topTitle)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ((_b = unref(bottomNav)) == null ? void 0 : _b.length) {
        _push(ssrRenderComponent(_component_DocsSideBarLevel, {
          key: unref(pathParts).join("/"),
          class: "border-t mt-4 pt-4",
          "init-level": 2,
          items: (_b2 = unref(bottomNav)) != null ? _b2 : [],
          title: unref(bottomTitle)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</nav>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/docs/side-bar/SideBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SideBar-CqgC7P-P.mjs.map
