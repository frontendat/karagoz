import { defineComponent, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { useSandboxBoot as ug, provideWebContainer as ig, useSandbox as gt, KrgzSandbox as cg } from './karagoz-sandbox-Btgvnhh6.mjs';
import '@webcontainer/api';
import '@codemirror/language';
import '@codemirror/language-data';
import 'codemirror';
import '@codemirror/state';
import '@codemirror/view';
import '@codemirror/commands';
import '@codemirror/theme-one-dark';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SandboxDemoDefaults",
  __ssrInlineRender: true,
  setup(__props) {
    const { boot, isBooting } = ug();
    ig(boot);
    gt();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(cg), mergeProps({
        booting: unref(isBooting),
        "hide-solve-button": ""
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/sandbox/demo/SandboxDemoDefaults.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SandboxDemoDefaults-CpxBuiXc.mjs.map
