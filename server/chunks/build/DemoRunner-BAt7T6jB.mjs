import __nuxt_component_0 from './client-only-CkMuatfh.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext, nextTick } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { b as bs, h as hs } from './karagoz-shared-BIF6lT4t.mjs';
import { PlayCircle } from 'lucide-vue-next';
import { createSharedComposable, createEventHook } from '@vueuse/core';
import { u as useI18n } from './vue-i18n-Ci15wrpe.mjs';
import './server-placeholder-BiVZCzBa.mjs';
import './server.mjs';
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

const useDemoRunnerInternal = () => {
  const kill = createEventHook();
  return {
    killRunning: () => kill.trigger(),
    onKillRunning: (handler) => kill.on(handler)
  };
};
const useDemoRunner = createSharedComposable(useDemoRunnerInternal);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DemoRunner",
  __ssrInlineRender: true,
  props: {
    heightClass: { default: "h-[600px]" }
  },
  setup(__props) {
    const { t } = useI18n();
    const demoRunner = useDemoRunner();
    const isRunning = ref(false);
    demoRunner.onKillRunning(() => isRunning.value = false);
    const onRunClick = async () => {
      await demoRunner.killRunning();
      await nextTick();
      isRunning.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["border border-border my-12 not-prose", _ctx.heightClass]
      }, _attrs))}>`);
      if (unref(isRunning)) {
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      } else {
        _push(ssrRenderComponent(unref(bs), {
          "suppress-spinner": "",
          variant: "secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(PlayCircle), { class: "size-12" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(hs), {
                size: "xs",
                variant: "link",
                onClick: onRunClick
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("component.demoRunner.clickToStart"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("component.demoRunner.clickToStart")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(PlayCircle), { class: "size-12" }),
                createVNode(unref(hs), {
                  size: "xs",
                  variant: "link",
                  onClick: onRunClick
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("component.demoRunner.clickToStart")), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/DemoRunner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DemoRunner-BAt7T6jB.mjs.map
