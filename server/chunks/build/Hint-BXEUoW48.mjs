import { Alert as _sfc_main$2, AlertTitle as _sfc_main$1, AlertDescription as _sfc_main$1$1 } from './index-CFZTAvM-.mjs';
import { useSSRContext, defineComponent, computed, mergeProps, withCtx, unref, createTextVNode, toDisplayString, renderSlot, openBlock, createBlock, createCommentVNode, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { BookOpenText, TriangleAlert } from 'lucide-vue-next';
import { u as useI18n } from './vue-i18n-Ci15wrpe.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'class-variance-authority';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Hint",
  __ssrInlineRender: true,
  props: {
    hideIcon: { type: Boolean },
    hideTitle: { type: Boolean },
    title: { default: void 0 },
    variant: { default: "default" }
  },
  setup(__props) {
    const IconMap = {
      default: BookOpenText,
      destructive: TriangleAlert
    };
    const props = __props;
    const { t } = useI18n();
    const IconComponent = computed(
      () => {
        var _a;
        return (_a = props.variant && IconMap[props.variant]) != null ? _a : void 0;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Alert = _sfc_main$2;
      const _component_AlertTitle = _sfc_main$1;
      const _component_AlertDescription = _sfc_main$1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hint" }, _attrs))} data-v-6603523f>`);
      _push(ssrRenderComponent(_component_Alert, {
        class: "not-prose",
        variant: _ctx.variant
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(IconComponent) && !_ctx.hideIcon) {
              _push2(ssrRenderComponent(unref(IconComponent), { class: "size-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (!_ctx.hideTitle) {
              _push2(ssrRenderComponent(_component_AlertTitle, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a, _b;
                  if (_push3) {
                    _push3(`${ssrInterpolate((_a = _ctx.title) != null ? _a : unref(t)("component.hint.defaultTitle"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString((_b = _ctx.title) != null ? _b : unref(t)("component.hint.defaultTitle")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_AlertDescription, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              unref(IconComponent) && !_ctx.hideIcon ? (openBlock(), createBlock(unref(IconComponent), {
                key: 0,
                class: "size-4"
              })) : createCommentVNode("", true),
              !_ctx.hideTitle ? (openBlock(), createBlock(_component_AlertTitle, { key: 1 }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createTextVNode(toDisplayString((_a = _ctx.title) != null ? _a : unref(t)("component.hint.defaultTitle")), 1)
                  ];
                }),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_AlertDescription, null, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/content/Hint.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Hint = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6603523f"]]);

export { Hint as default };
//# sourceMappingURL=Hint-BXEUoW48.mjs.map
