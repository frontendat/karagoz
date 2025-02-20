import { defineComponent, Comment, mergeProps, cloneVNode, h, toRefs, ref, getCurrentInstance, reactive, watch, watchEffect, markRaw, computed, openBlock, createBlock, unref, withCtx, createVNode, renderSlot, effectScope, Fragment, nextTick, onUnmounted, normalizeStyle, onMounted, createElementBlock, createElementVNode, createTextVNode, createCommentVNode, normalizeClass, inject, provide, getCurrentScope, onScopeDispose, toDisplayString } from 'vue';

const xr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, Cr = {}, Sr = {
  viewBox: "0 0 400 400",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg"
};
function Er(e, t) {
  return openBlock(), createElementBlock("svg", Sr, t[0] || (t[0] = [
    createElementVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M164.22 23.0852C164.22 23.2558 164.218 23.426 164.214 23.5956C199.364 29.81 233.576 68.2513 267.054 121.722L325.817 81.1481C334.075 119.745 325.447 140.724 285.942 176.987C217.022 175.247 181.982 185.602 126.444 225.955L116.65 221.758C107.606 253.131 101.537 268.717 88.6682 292.413L39 270.727L80.2736 195.175C67.8749 182.104 62.0939 173.509 55.0897 154.601L100.561 157.399L108.955 135.713C105.232 83.6511 109.682 61.1494 123.667 38.1791C120.167 34.132 118.049 28.8559 118.049 23.0852C118.049 10.3356 128.385 0 141.135 0C153.884 0 164.22 10.3356 164.22 23.0852ZM161.422 261.633C155.053 346.716 260.474 438.249 361.494 382.655C311.624 365.154 286.717 350.084 276.148 309.902C297.835 307.803 283.843 246.243 220.184 290.314C196.035 293.459 181.37 279.198 171.488 269.588C167.437 265.648 164.19 262.49 161.422 261.633ZM268.144 209.285C244.007 198.479 228.455 213.151 223.697 221.839C226.319 220.463 231.702 218.019 238.179 215.854C238.157 216.088 238.162 216.323 238.196 216.556C238.652 219.657 244.049 221.432 250.25 220.52C256.451 219.609 261.109 216.356 260.653 213.255C260.611 212.966 260.525 212.688 260.4 212.423C265.375 212.89 270.577 213.9 274.428 214.648L274.428 214.648C282.222 216.161 284.485 216.601 268.144 209.285Z"
    }, null, -1)
  ]));
}
const ps = /* @__PURE__ */ xr(Cr, [["render", Er]]);
function lo(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (n = lo(e[t])) && (o && (o += " "), o += n);
  else for (t in e) e[t] && (o && (o += " "), o += t);
  return o;
}
function Ar() {
  for (var e, t, n = 0, o = ""; n < arguments.length; ) (e = arguments[n++]) && (t = lo(e)) && (o && (o += " "), o += t);
  return o;
}
const On = (e) => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e, Rn = Ar, an = (e, t) => (n) => {
  var o;
  if ((t == null ? void 0 : t.variants) == null) return Rn(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: r, defaultVariants: a } = t, l = Object.keys(r).map((u) => {
    const c = n == null ? void 0 : n[u], d = a == null ? void 0 : a[u];
    if (c === null) return null;
    const f = On(c) || On(d);
    return r[u][f];
  }), i = n && Object.entries(n).reduce((u, c) => {
    let [d, f] = c;
    return f === void 0 || (u[d] = f), u;
  }, {}), s = t == null || (o = t.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((u, c) => {
    let { class: d, className: f, ...p } = c;
    return Object.entries(p).every((m) => {
      let [b, h2] = m;
      return Array.isArray(h2) ? h2.includes({
        ...a,
        ...i
      }[b]) : {
        ...a,
        ...i
      }[b] === h2;
    }) ? [
      ...u,
      d,
      f
    ] : u;
  }, []);
  return Rn(e, l, s, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
};
function ue(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, o = Symbol(n);
  return [(r) => {
    const a = inject(o, r);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${o.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (r) => (provide(o, r), r)];
}
function ha(e, t = Number.NEGATIVE_INFINITY, n = Number.POSITIVE_INFINITY) {
  return Math.min(Math.max(e, t), n);
}
function bt(e) {
  return getCurrentScope() ? (onScopeDispose(e), true) : false;
}
function xa(e) {
  let t = false, n;
  const o = effectScope(true);
  return (...r) => (t || (n = o.run(() => e(...r)), t = true), n);
}
function Ce(e) {
  return typeof e == "function" ? e() : unref(e);
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const en = () => {
};
function Aa(e, t) {
  function n(...o) {
    return new Promise((r, a) => {
      Promise.resolve(e(() => t.apply(this, o), { fn: t, thisArg: this, args: o })).then(r).catch(a);
    });
  }
  return n;
}
function za(e, t = {}) {
  let n, o, r = en;
  const a = (l) => {
    clearTimeout(l), r(), r = en;
  };
  return (l) => {
    const i = Ce(e), s = Ce(t.maxWait);
    return n && a(n), i <= 0 || s !== void 0 && s <= 0 ? (o && (a(o), o = null), Promise.resolve(l())) : new Promise((u, c) => {
      r = t.rejectOnCancel ? c : u, s && !o && (o = setTimeout(() => {
        n && a(n), o = null, u(l());
      }, s)), n = setTimeout(() => {
        o && a(o), o = null, u(l());
      }, i);
    });
  };
}
function go(e, t = 200, n = {}) {
  return Aa(
    za(t, n),
    e
  );
}
function Ta(e, t, n) {
  const o = watch(e, (...r) => (nextTick(() => o()), t(...r)), n);
  return o;
}
function Me(e) {
  var t;
  const n = Ce(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const vn = void 0;
function bo() {
  const e = ref(false), t = getCurrentInstance();
  return t && onMounted(() => {
    e.value = true;
  }, t), e;
}
function Oa(e) {
  const t = bo();
  return computed(() => (t.value, !!e()));
}
function Ue(e, t, n = {}) {
  const { window: o = vn, ...r } = n;
  let a;
  const l = Oa(() => o && "ResizeObserver" in o), i = () => {
    a && (a.disconnect(), a = void 0);
  }, s = computed(() => Array.isArray(e) ? e.map((d) => Me(d)) : [Me(e)]), u = watch(
    s,
    (d) => {
      if (i(), l.value && o) {
        a = new ResizeObserver(t);
        for (const f of d)
          f && a.observe(f, r);
      }
    },
    { immediate: true, flush: "post" }
  ), c = () => {
    i(), u();
  };
  return bt(c), {
    isSupported: l,
    stop: c
  };
}
function mn(e) {
  return e ? e.flatMap((t) => t.type === Fragment ? mn(t.children) : [t]) : [];
}
const [gn, vs] = ue("ConfigProvider");
function Lt(e) {
  const t = gn({
    dir: ref("ltr")
  });
  return computed(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.dir) == null ? void 0 : n.value) || "ltr";
  });
}
function W() {
  const e = getCurrentInstance(), t = ref(), n = computed(() => {
    var l, i;
    return ["#text", "#comment"].includes((l = t.value) == null ? void 0 : l.$el.nodeName) ? (i = t.value) == null ? void 0 : i.$el.nextElementSibling : Me(t);
  }), o = Object.assign({}, e.exposed), r = {};
  for (const l in e.props)
    Object.defineProperty(r, l, {
      enumerable: true,
      configurable: true,
      get: () => e.props[l]
    });
  if (Object.keys(o).length > 0)
    for (const l in o)
      Object.defineProperty(r, l, {
        enumerable: true,
        configurable: true,
        get: () => o[l]
      });
  Object.defineProperty(r, "$el", {
    enumerable: true,
    configurable: true,
    get: () => e.vnode.el
  }), e.exposed = r;
  function a(l) {
    t.value = l, !(l instanceof Element || !l) && (Object.defineProperty(r, "$el", {
      enumerable: true,
      configurable: true,
      get: () => l.$el
    }), e.exposed = r);
  }
  return { forwardRef: a, currentRef: t, currentElement: n };
}
function yo(e, t) {
  const n = ref(e);
  function o(r) {
    var _a;
    return (_a = t[n.value][r]) != null ? _a : n.value;
  }
  return {
    state: n,
    dispatch: (r) => {
      n.value = o(r);
    }
  };
}
const bn = defineComponent({
  name: "PrimitiveSlot",
  inheritAttrs: false,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var o, r;
      if (!n.default)
        return null;
      const a = mn(n.default()), l = a.findIndex((c) => c.type !== Comment);
      if (l === -1)
        return a;
      const i = a[l];
      (o = i.props) == null || delete o.ref;
      const s = i.props ? mergeProps(t, i.props) : t;
      t.class && (r = i.props) != null && r.class && delete i.props.class;
      const u = cloneVNode(i, s);
      for (const c in s)
        c.startsWith("on") && (u.props || (u.props = {}), u.props[c] = s[c]);
      return a.length === 1 ? u : (a[l] = u, a);
    };
  }
}), J = defineComponent({
  name: "Primitive",
  inheritAttrs: false,
  props: {
    asChild: {
      type: Boolean,
      default: false
    },
    as: {
      type: [String, Object],
      default: "div"
    }
  },
  setup(e, { attrs: t, slots: n }) {
    const o = e.asChild ? "template" : e.as;
    return typeof o == "string" && ["area", "img", "input"].includes(o) ? () => h(o, t) : o !== "template" ? () => h(e.as, t, { default: n.default }) : () => h(bn, t, { default: n.default });
  }
});
function yn() {
  const e = ref(), t = computed(() => {
    var n, o;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (o = e.value) == null ? void 0 : o.$el.nextElementSibling : Me(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function Wa(e, t) {
  const n = ref({}), o = ref("none"), r = e.value ? "mounted" : "unmounted", { state: a, dispatch: l } = yo(r, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  }), i = (f) => {
  };
  watch(
    e,
    async (f, p) => {
      var m;
      const b = p !== f;
      if (await nextTick(), b) {
        const h2 = o.value, g = Ct(t.value);
        f ? (l("MOUNT"), g === "none" && i()) : g === "none" || ((m = n.value) == null ? void 0 : m.display) === "none" ? (l("UNMOUNT"), i()) : p && h2 !== g ? (l("ANIMATION_OUT"), i()) : (l("UNMOUNT"), i());
      }
    },
    { immediate: true }
  );
  const s = (f) => {
    const p = Ct(t.value), m = p.includes(
      f.animationName
    );
    a.value === "mounted" ? "enter" : "leave";
    f.target === t.value && m && l("ANIMATION_END"), f.target === t.value && p === "none" && l("ANIMATION_END");
  }, u = (f) => {
    f.target === t.value && (o.value = Ct(t.value));
  }, c = watch(
    t,
    (f, p) => {
      f ? (n.value = getComputedStyle(f), f.addEventListener("animationstart", u), f.addEventListener("animationcancel", s), f.addEventListener("animationend", s)) : (l("ANIMATION_END"), p == null || p.removeEventListener("animationstart", u), p == null || p.removeEventListener("animationcancel", s), p == null || p.removeEventListener("animationend", s));
    },
    { immediate: true }
  ), d = watch(a, () => {
    const f = Ct(t.value);
    o.value = a.value === "mounted" ? f : "none";
  });
  return onUnmounted(() => {
    c(), d();
  }), {
    isPresent: computed(
      () => ["mounted", "unmountSuspended"].includes(a.value)
    )
  };
}
function Ct(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const wt = defineComponent({
  name: "Presence",
  props: {
    present: {
      type: Boolean,
      required: true
    },
    forceMount: {
      type: Boolean
    }
  },
  slots: {},
  setup(e, { slots: t, expose: n }) {
    var o;
    const { present: r, forceMount: a } = toRefs(e), l = ref(), { isPresent: i } = Wa(r, l);
    n({ present: i });
    let s = t.default({ present: i });
    s = mn(s || []);
    const u = getCurrentInstance();
    if (s && (s == null ? void 0 : s.length) > 1) {
      const c = (o = u == null ? void 0 : u.parent) != null && o.type.name ? `<${u.parent.type.name} />` : "component";
      throw new Error(
        [
          `Detected an invalid children for \`${c}\` for  \`Presence\` component.`,
          "",
          "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
          "You can apply a few solutions:",
          [
            "Provide a single child element so that `presence` directive attach correctly.",
            "Ensure the first child is an actual element instead of a raw text node or comment node."
          ].map((d) => `  - ${d}`).join(`
`)
        ].join(`
`)
      );
    }
    return () => a.value || r.value || i.value ? h(t.default({ present: i })[0], {
      ref: (c) => {
        const d = Me(c);
        return typeof (d == null ? void 0 : d.hasAttribute) > "u" || (d != null && d.hasAttribute("data-radix-popper-content-wrapper") ? l.value = d.firstElementChild : l.value = d), d;
      }
    }) : null;
  }
});
reactive({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
xa(() => ref([]));
const [wn, ll] = ue("CollectionProvider");
defineComponent({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = wn(), { primitiveElement: o, currentElement: r } = yn();
    return watch(r, () => {
      n.collectionRef.value = r.value;
    }), () => h(bn, { ref: o }, t);
  }
});
defineComponent({
  name: "CollectionItem",
  inheritAttrs: false,
  props: {
    value: {
      // It accepts any value
      validator: () => true
    }
  },
  setup(e, { slots: t, attrs: n }) {
    const o = wn(), { primitiveElement: r, currentElement: a } = yn();
    return watchEffect((l) => {
      if (a.value) {
        const i = markRaw(a.value);
        o.itemMap.value.set(i, { ref: a.value, value: e.value }), l(() => o.itemMap.value.delete(i));
      }
    }), () => h(bn, { ...n, [o.attrName]: "", ref: r }, t);
  }
});
function ul(e) {
  const t = gn({
    nonce: ref()
  });
  return computed(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.nonce) == null ? void 0 : n.value);
  });
}
const [de, xl] = ue("ScrollAreaRoot"), Cl = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaRoot",
  props: {
    type: { default: "hover" },
    dir: {},
    scrollHideDelay: { default: 600 },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e, { expose: t }) {
    const n = e, o = ref(0), r = ref(0), a = ref(), l = ref(), i = ref(), s = ref(), u = ref(false), c = ref(false), { type: d, dir: f, scrollHideDelay: p } = toRefs(n), m = Lt(f);
    function b() {
      var y;
      (y = a.value) == null || y.scrollTo({
        top: 0
      });
    }
    function h2() {
      var y;
      (y = a.value) == null || y.scrollTo({
        top: 0,
        left: 0
      });
    }
    t({
      /** Viewport element within ScrollArea */
      viewport: a,
      /** Scroll viewport to top */
      scrollTop: b,
      /** Scroll viewport to top-left */
      scrollTopLeft: h2
    });
    const { forwardRef: g, currentElement: w } = W();
    return xl({
      type: d,
      dir: m,
      scrollHideDelay: p,
      scrollArea: w,
      viewport: a,
      onViewportChange: (y) => {
        a.value = y || void 0;
      },
      content: l,
      onContentChange: (y) => {
        l.value = y;
      },
      scrollbarX: i,
      scrollbarXEnabled: u,
      scrollbarY: s,
      scrollbarYEnabled: c,
      onScrollbarXChange: (y) => {
        i.value = y || void 0;
      },
      onScrollbarYChange: (y) => {
        s.value = y || void 0;
      },
      onScrollbarXEnabledChange: (y) => {
        u.value = y;
      },
      onScrollbarYEnabledChange: (y) => {
        c.value = y;
      },
      onCornerWidthChange: (y) => {
        o.value = y;
      },
      onCornerHeightChange: (y) => {
        r.value = y;
      }
    }), (y, E) => (openBlock(), createBlock(unref(J), {
      ref: unref(g),
      "as-child": n.asChild,
      as: y.as,
      dir: unref(m),
      style: normalizeStyle({
        position: "relative",
        // Pass corner sizes as CSS vars to reduce re-renders of context consumers
        "--radix-scroll-area-corner-width": `${o.value}px`,
        "--radix-scroll-area-corner-height": `${r.value}px`
      })
    }, {
      default: withCtx(() => [
        renderSlot(y.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "dir", "style"]));
  }
}), Sl = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "ScrollAreaViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e, { expose: t }) {
    const n = e, { nonce: o } = toRefs(n), r = ul(o), a = de(), l = ref();
    onMounted(() => {
      a.onViewportChange(l.value), a.onContentChange(s.value);
    }), t({
      viewportElement: l
    });
    const { forwardRef: i, currentElement: s } = W();
    return (u, c) => (openBlock(), createElementBlock(Fragment, null, [
      createElementVNode("div", mergeProps({
        ref_key: "viewportElement",
        ref: l,
        "data-radix-scroll-area-viewport": "",
        style: {
          /**
           * We don't support `visible` because the intention is to have at least one scrollbar
           * if this component is used and `visible` will behave like `auto` in that case
           * https://developer.mozilla.org/en-US/docs/Web/CSS/overflowed#description
           *
           * We don't handle `auto` because the intention is for the native implementation
           * to be hidden if using this component. We just want to ensure the node is scrollable
           * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
           * the browser from having to work out whether to render native scrollbars or not,
           * we tell it to with the intention of hiding them in CSS.
           */
          overflowX: unref(a).scrollbarXEnabled.value ? "scroll" : "hidden",
          overflowY: unref(a).scrollbarYEnabled.value ? "scroll" : "hidden"
        }
      }, u.$attrs, { tabindex: 0 }), [
        createVNode(unref(J), {
          ref: unref(i),
          style: normalizeStyle({
            /**
             * When horizontal scrollbar is visible: this element should be at least
             * as wide as its children for size calculations to work correctly.
             *
             * When horizontal scrollbar is NOT visible: this element's width should
             * be constrained by the parent container to enable `text-overflow: ellipsis`
             */
            minWidth: unref(a).scrollbarXEnabled.value ? "fit-content" : void 0
          }),
          "as-child": n.asChild,
          as: u.as
        }, {
          default: withCtx(() => [
            renderSlot(u.$slots, "default")
          ]),
          _: 3
        }, 8, ["style", "as-child", "as"])
      ], 16),
      createVNode(unref(J), {
        as: "style",
        nonce: unref(r)
      }, {
        default: withCtx(() => [
          createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-radix-scroll-area-viewport] { scrollbar-width:none; -ms-overflow-style:none; -webkit-overflow-scrolling:touch; } [data-radix-scroll-area-viewport]::-webkit-scrollbar { display:none; } ")
        ]),
        _: 1
      }, 8, ["nonce"])
    ], 64));
  }
});
function Eo(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1])
      return t[0];
    const o = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + o * (n - e[0]);
  };
}
function Bt(e) {
  const t = Ao(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, o = (e.scrollbar.size - n) * t;
  return Math.max(o, 18);
}
function Ao(e, t) {
  const n = e / t;
  return Number.isNaN(n) ? 0 : n;
}
function El(e, t = () => {
}) {
  let n = { left: e.scrollLeft, top: e.scrollTop }, o = 0;
  return function r() {
    const a = { left: e.scrollLeft, top: e.scrollTop }, l = n.left !== a.left, i = n.top !== a.top;
    (l || i) && t(), n = a, o = (void 0).requestAnimationFrame(r);
  }(), () => (void 0).cancelAnimationFrame(o);
}
function Fn(e, t, n = "ltr") {
  const o = Bt(t), r = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - r, l = t.content - t.viewport, i = a - o, s = n === "ltr" ? [0, l] : [l * -1, 0], u = ha(
    e,
    s[0],
    s[1]
  );
  return Eo([0, l], [0, i])(u);
}
function St(e) {
  return e ? Number.parseInt(e, 10) : 0;
}
function Al(e, t, n, o = "ltr") {
  const r = Bt(n), a = r / 2, l = t || a, i = r - l, s = n.scrollbar.paddingStart + l, u = n.scrollbar.size - n.scrollbar.paddingEnd - i, c = n.content - n.viewport, d = o === "ltr" ? [0, c] : [c * -1, 0];
  return Eo(
    [s, u],
    d
  )(e);
}
function Hn(e, t) {
  return e > 0 && e < t;
}
const zo = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarImpl",
  props: {
    isHorizontal: { type: Boolean }
  },
  emits: ["onDragScroll", "onWheelScroll", "onThumbPointerDown"],
  setup(e, { emit: t }) {
    const n = e, o = t, r = de(), a = Mt(), l = Nt(), { forwardRef: i, currentElement: s } = W(), u = ref(""), c = ref();
    function d(g) {
      var w, y;
      if (c.value) {
        const E = g.clientX - ((w = c.value) == null ? void 0 : w.left), x = g.clientY - ((y = c.value) == null ? void 0 : y.top);
        o("onDragScroll", { x: E, y: x });
      }
    }
    function f(g) {
      g.button === 0 && (g.target.setPointerCapture(g.pointerId), c.value = s.value.getBoundingClientRect(), u.value = (void 0).body.style.webkitUserSelect, (void 0).body.style.webkitUserSelect = "none", r.viewport && (r.viewport.value.style.scrollBehavior = "auto"), d(g));
    }
    function p(g) {
      d(g);
    }
    function m(g) {
      const w = g.target;
      w.hasPointerCapture(g.pointerId) && w.releasePointerCapture(g.pointerId), (void 0).body.style.webkitUserSelect = u.value, r.viewport && (r.viewport.value.style.scrollBehavior = ""), c.value = void 0;
    }
    function b(g) {
      var w;
      const y = g.target, E = (w = s.value) == null ? void 0 : w.contains(y), x = a.sizes.value.content - a.sizes.value.viewport;
      E && a.handleWheelScroll(g, x);
    }
    onMounted(() => {
      (void 0).addEventListener("wheel", b, { passive: false });
    }), onUnmounted(() => {
      (void 0).removeEventListener("wheel", b);
    });
    function h2() {
      var _a, _b, _c, _d, _e, _f;
      var g, w, y, E, x;
      s.value && (n.isHorizontal ? a.handleSizeChange({
        content: (_a = (g = r.viewport.value) == null ? void 0 : g.scrollWidth) != null ? _a : 0,
        viewport: (_b = (w = r.viewport.value) == null ? void 0 : w.offsetWidth) != null ? _b : 0,
        scrollbar: {
          size: (_c = s.value.clientWidth) != null ? _c : 0,
          paddingStart: St(getComputedStyle(s.value).paddingLeft),
          paddingEnd: St(getComputedStyle(s.value).paddingRight)
        }
      }) : a.handleSizeChange({
        content: (_d = (y = r.viewport.value) == null ? void 0 : y.scrollHeight) != null ? _d : 0,
        viewport: (_e = (E = r.viewport.value) == null ? void 0 : E.offsetHeight) != null ? _e : 0,
        scrollbar: {
          size: (_f = (x = s.value) == null ? void 0 : x.clientHeight) != null ? _f : 0,
          paddingStart: St(getComputedStyle(s.value).paddingLeft),
          paddingEnd: St(getComputedStyle(s.value).paddingRight)
        }
      }));
    }
    return Ue(s, h2), Ue(r.content, h2), (g, w) => (openBlock(), createBlock(unref(J), {
      ref: unref(i),
      style: { position: "absolute" },
      "data-scrollbarimpl": "",
      as: unref(l).as.value,
      "as-child": unref(l).asChild.value,
      onPointerdown: f,
      onPointermove: p,
      onPointerup: m
    }, {
      default: withCtx(() => [
        renderSlot(g.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), zl = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarX",
  setup(e) {
    const t = de(), n = Mt(), { forwardRef: o, currentElement: r } = W();
    onMounted(() => {
      r.value && t.onScrollbarXChange(r.value);
    });
    const a = computed(() => n.sizes.value);
    return (l, i) => (openBlock(), createBlock(zo, {
      ref: unref(o),
      "is-horizontal": true,
      "data-orientation": "horizontal",
      style: normalizeStyle({
        bottom: 0,
        left: unref(t).dir.value === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: unref(t).dir.value === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": a.value ? `${unref(Bt)(a.value)}px` : void 0
      }),
      onOnDragScroll: i[0] || (i[0] = (s) => unref(n).onDragScroll(s.x))
    }, {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }, 8, ["style"]));
  }
}), _l = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarY",
  setup(e) {
    const t = de(), n = Mt(), { forwardRef: o, currentElement: r } = W();
    onMounted(() => {
      r.value && t.onScrollbarYChange(r.value);
    });
    const a = computed(() => n.sizes.value);
    return (l, i) => (openBlock(), createBlock(zo, {
      ref: unref(o),
      "is-horizontal": false,
      "data-orientation": "vertical",
      style: normalizeStyle({
        top: 0,
        right: unref(t).dir.value === "ltr" ? 0 : void 0,
        left: unref(t).dir.value === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": a.value ? `${unref(Bt)(a.value)}px` : void 0
      }),
      onOnDragScroll: i[0] || (i[0] = (s) => unref(n).onDragScroll(s.y))
    }, {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }, 8, ["style"]));
  }
}), [Mt, Tl] = ue("ScrollAreaScrollbarVisible"), xn = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarVisible",
  setup(e) {
    const t = de(), n = Nt(), { forwardRef: o } = W(), r = ref({
      content: 0,
      viewport: 0,
      scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
    }), a = computed(() => {
      const g = Ao(r.value.viewport, r.value.content);
      return g > 0 && g < 1;
    }), l = ref(), i = ref(0);
    function s(g, w) {
      if (p.value) {
        const y = t.viewport.value.scrollLeft + g.deltaY;
        t.viewport.value.scrollLeft = y, Hn(y, w) && g.preventDefault();
      } else {
        const y = t.viewport.value.scrollTop + g.deltaY;
        t.viewport.value.scrollTop = y, Hn(y, w) && g.preventDefault();
      }
    }
    function u(g, w) {
      p.value ? i.value = w.x : i.value = w.y;
    }
    function c(g) {
      i.value = 0;
    }
    function d(g) {
      r.value = g;
    }
    function f(g, w) {
      return Al(
        g,
        i.value,
        r.value,
        w
      );
    }
    const p = computed(
      () => n.isHorizontal.value
    );
    function m(g) {
      p.value ? t.viewport.value.scrollLeft = f(
        g,
        t.dir.value
      ) : t.viewport.value.scrollTop = f(g);
    }
    function b() {
      if (p.value) {
        if (t.viewport.value && l.value) {
          const g = t.viewport.value.scrollLeft, w = Fn(
            g,
            r.value,
            t.dir.value
          );
          l.value.style.transform = `translate3d(${w}px, 0, 0)`;
        }
      } else if (t.viewport.value && l.value) {
        const g = t.viewport.value.scrollTop, w = Fn(g, r.value);
        l.value.style.transform = `translate3d(0, ${w}px, 0)`;
      }
    }
    function h2(g) {
      l.value = g;
    }
    return Tl({
      sizes: r,
      hasThumb: a,
      handleWheelScroll: s,
      handleThumbDown: u,
      handleThumbUp: c,
      handleSizeChange: d,
      onThumbPositionChange: b,
      onThumbChange: h2,
      onDragScroll: m
    }), (g, w) => p.value ? (openBlock(), createBlock(zl, mergeProps({ key: 0 }, g.$attrs, { ref: unref(o) }), {
      default: withCtx(() => [
        renderSlot(g.$slots, "default")
      ]),
      _: 3
    }, 16)) : (openBlock(), createBlock(_l, mergeProps({ key: 1 }, g.$attrs, { ref: unref(o) }), {
      default: withCtx(() => [
        renderSlot(g.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), _o = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarAuto",
  props: {
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = de(), n = Nt(), { forwardRef: o } = W(), r = ref(false), a = go(() => {
      if (t.viewport.value) {
        const l = t.viewport.value.offsetWidth < t.viewport.value.scrollWidth, i = t.viewport.value.offsetHeight < t.viewport.value.scrollHeight;
        r.value = n.isHorizontal.value ? l : i;
      }
    }, 10);
    return onMounted(() => a()), Ue(t.viewport, a), Ue(t.content, a), (l, i) => (openBlock(), createBlock(unref(wt), {
      present: l.forceMount || r.value
    }, {
      default: withCtx(() => [
        createVNode(xn, mergeProps(l.$attrs, {
          ref: unref(o),
          "data-state": r.value ? "visible" : "hidden"
        }), {
          default: withCtx(() => [
            renderSlot(l.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), Pl = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "ScrollAreaScrollbarHover",
  props: {
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = de(), { forwardRef: n } = W();
    let o;
    const r = ref(false);
    function a() {
      (void 0).clearTimeout(o), r.value = true;
    }
    function l() {
      o = (void 0).setTimeout(() => {
        r.value = false;
      }, t.scrollHideDelay.value);
    }
    return onMounted(() => {
      const i = t.scrollArea.value;
      i && (i.addEventListener("pointerenter", a), i.addEventListener("pointerleave", l));
    }), onUnmounted(() => {
      const i = t.scrollArea.value;
      i && ((void 0).clearTimeout(o), i.removeEventListener("pointerenter", a), i.removeEventListener("pointerleave", l));
    }), (i, s) => (openBlock(), createBlock(unref(wt), {
      present: i.forceMount || r.value
    }, {
      default: withCtx(() => [
        createVNode(_o, mergeProps(i.$attrs, {
          ref: unref(n),
          "data-state": r.value ? "visible" : "hidden"
        }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), kl = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarScroll",
  props: {
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = de(), n = Nt(), { forwardRef: o } = W(), { state: r, dispatch: a } = yo("hidden", {
      hidden: {
        SCROLL: "scrolling"
      },
      scrolling: {
        SCROLL_END: "idle",
        POINTER_ENTER: "interacting"
      },
      interacting: {
        SCROLL: "interacting",
        POINTER_LEAVE: "idle"
      },
      idle: {
        HIDE: "hidden",
        SCROLL: "scrolling",
        POINTER_ENTER: "interacting"
      }
    });
    watchEffect((i) => {
      if (r.value === "idle") {
        const s = (void 0).setTimeout(
          () => a("HIDE"),
          t.scrollHideDelay.value
        );
        i(() => {
          (void 0).clearTimeout(s);
        });
      }
    });
    const l = go(() => a("SCROLL_END"), 100);
    return watchEffect((i) => {
      const s = t.viewport.value, u = n.isHorizontal.value ? "scrollLeft" : "scrollTop";
      if (s) {
        let c = s[u];
        const d = () => {
          const f = s[u];
          c !== f && (a("SCROLL"), l()), c = f;
        };
        s.addEventListener("scroll", d), i(() => {
          s.removeEventListener("scroll", d);
        });
      }
    }), (i, s) => (openBlock(), createBlock(unref(wt), {
      present: i.forceMount || unref(r) !== "hidden"
    }, {
      default: withCtx(() => [
        createVNode(xn, mergeProps(i.$attrs, { ref: unref(o) }), {
          default: withCtx(() => [
            renderSlot(i.$slots, "default")
          ]),
          _: 3
        }, 16)
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), [Nt, Ol] = ue("ScrollAreaScrollbar"), Rl = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "ScrollAreaScrollbar",
  props: {
    orientation: { default: "vertical" },
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(e) {
    const t = e, { forwardRef: n } = W(), o = de(), r = computed(() => t.orientation === "horizontal");
    watch(
      r,
      () => {
        r.value ? o.onScrollbarXEnabledChange(true) : o.onScrollbarYEnabledChange(true);
      },
      { immediate: true }
    ), onUnmounted(() => {
      o.onScrollbarXEnabledChange(false), o.onScrollbarYEnabledChange(false);
    });
    const { orientation: a, forceMount: l, asChild: i, as: s } = toRefs(t);
    return Ol({
      orientation: a,
      forceMount: l,
      isHorizontal: r,
      as: s,
      asChild: i
    }), (u, c) => unref(o).type.value === "hover" ? (openBlock(), createBlock(Pl, mergeProps({ key: 0 }, u.$attrs, {
      ref: unref(n),
      "force-mount": unref(l)
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["force-mount"])) : unref(o).type.value === "scroll" ? (openBlock(), createBlock(kl, mergeProps({ key: 1 }, u.$attrs, {
      ref: unref(n),
      "force-mount": unref(l)
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["force-mount"])) : unref(o).type.value === "auto" ? (openBlock(), createBlock(_o, mergeProps({ key: 2 }, u.$attrs, {
      ref: unref(n),
      "force-mount": unref(l)
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["force-mount"])) : unref(o).type.value === "always" ? (openBlock(), createBlock(xn, mergeProps({ key: 3 }, u.$attrs, {
      ref: unref(n),
      "data-state": "visible"
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16)) : createCommentVNode("", true);
  }
}), Il = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaThumb",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, n = de(), o = Mt();
    function r(f) {
      const p = f.target.getBoundingClientRect(), m = f.clientX - p.left, b = f.clientY - p.top;
      o.handleThumbDown(f, { x: m, y: b });
    }
    function a(f) {
      o.handleThumbUp(f);
    }
    const { forwardRef: l, currentElement: i } = W(), s = ref(), u = computed(() => n.viewport.value);
    function c() {
      if (!s.value) {
        const f = El(
          u.value,
          o.onThumbPositionChange
        );
        s.value = f, o.onThumbPositionChange();
      }
    }
    const d = computed(() => o.sizes.value);
    return Ta(d, () => {
      o.onThumbChange(i.value), u.value && (o.onThumbPositionChange(), u.value.addEventListener("scroll", c));
    }), onUnmounted(() => {
      var f;
      u.value.removeEventListener("scroll", c), (f = n.viewport.value) == null || f.removeEventListener("scroll", c);
    }), (f, p) => (openBlock(), createBlock(unref(J), {
      ref: unref(l),
      "data-state": unref(o).hasThumb ? "visible" : "hidden",
      style: {
        width: "var(--radix-scroll-area-thumb-width)",
        height: "var(--radix-scroll-area-thumb-height)"
      },
      "as-child": t.asChild,
      as: f.as,
      onPointerdown: r,
      onPointerup: a
    }, {
      default: withCtx(() => [
        renderSlot(f.$slots, "default")
      ]),
      _: 3
    }, 8, ["data-state", "as-child", "as"]));
  }
}), $l = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaCornerImpl",
  setup(e) {
    const t = de(), n = ref(0), o = ref(0), r = computed(() => !!n.value && !!o.value);
    function a() {
      var i;
      const s = ((i = t.scrollbarX.value) == null ? void 0 : i.offsetHeight) || 0;
      t.onCornerHeightChange(s), o.value = s;
    }
    function l() {
      var i;
      const s = ((i = t.scrollbarY.value) == null ? void 0 : i.offsetWidth) || 0;
      t.onCornerWidthChange(s), n.value = s;
    }
    return Ue(t.scrollbarX.value, a), Ue(t.scrollbarY.value, l), watch(() => t.scrollbarX.value, a), watch(() => t.scrollbarY.value, l), (i, s) => {
      var u;
      return r.value ? (openBlock(), createBlock(unref(J), mergeProps({
        key: 0,
        style: {
          width: `${n.value}px`,
          height: `${o.value}px`,
          position: "absolute",
          right: unref(t).dir.value === "ltr" ? 0 : void 0,
          left: unref(t).dir.value === "rtl" ? 0 : void 0,
          bottom: 0
        }
      }, (u = i.$parent) == null ? void 0 : u.$props), {
        default: withCtx(() => [
          renderSlot(i.$slots, "default")
        ]),
        _: 3
      }, 16, ["style"])) : createCommentVNode("", true);
    };
  }
}), Dl = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaCorner",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { forwardRef: n } = W(), o = de(), r = computed(
      () => !!o.scrollbarX.value && !!o.scrollbarY.value
    ), a = computed(
      () => o.type.value !== "scroll" && r.value
    );
    return (l, i) => a.value ? (openBlock(), createBlock($l, mergeProps({ key: 0 }, t, { ref: unref(n) }), {
      default: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      _: 3
    }, 16)) : createCommentVNode("", true);
  }
});
function Wl() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
Wl() === "coarse";
function Jo(e) {
  var t, n, o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (n = Jo(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function xi() {
  for (var e, t, n = 0, o = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (t = Jo(e)) && (o && (o += " "), o += t);
  return o;
}
const _n = "-", Ci = (e) => {
  const t = Ei(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: o
  } = e;
  return {
    getClassGroupId: (l) => {
      const i = l.split(_n);
      return i[0] === "" && i.length !== 1 && i.shift(), Zo(i, t) || Si(l);
    },
    getConflictingClassGroupIds: (l, i) => {
      const s = n[l] || [];
      return i && o[l] ? [...s, ...o[l]] : s;
    }
  };
}, Zo = (e, t) => {
  var l;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], o = t.nextPart.get(n), r = o ? Zo(e.slice(1), o) : void 0;
  if (r)
    return r;
  if (t.validators.length === 0)
    return;
  const a = e.join(_n);
  return (l = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : l.classGroupId;
}, Yn = /^\[(.+)\]$/, Si = (e) => {
  if (Yn.test(e)) {
    const t = Yn.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Ei = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, o = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return zi(Object.entries(e.classGroups), n).forEach(([a, l]) => {
    rn(l, o, a, t);
  }), o;
}, rn = (e, t, n, o) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const a = r === "" ? t : Xn(t, r);
      a.classGroupId = n;
      return;
    }
    if (typeof r == "function") {
      if (Ai(r)) {
        rn(r(o), t, n, o);
        return;
      }
      t.validators.push({
        validator: r,
        classGroupId: n
      });
      return;
    }
    Object.entries(r).forEach(([a, l]) => {
      rn(l, Xn(t, a), n, o);
    });
  });
}, Xn = (e, t) => {
  let n = e;
  return t.split(_n).forEach((o) => {
    n.nextPart.has(o) || n.nextPart.set(o, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(o);
  }), n;
}, Ai = (e) => e.isThemeGetter, zi = (e, t) => t ? e.map(([n, o]) => {
  const r = o.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([l, i]) => [t + l, i])) : a);
  return [n, r];
}) : e, _i = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  const r = (a, l) => {
    n.set(a, l), t++, t > e && (t = 0, o = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let l = n.get(a);
      if (l !== void 0)
        return l;
      if ((l = o.get(a)) !== void 0)
        return r(a, l), l;
    },
    set(a, l) {
      n.has(a) ? n.set(a, l) : r(a, l);
    }
  };
}, qo = "!", Ti = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, o = t.length === 1, r = t[0], a = t.length, l = (i) => {
    const s = [];
    let u = 0, c = 0, d;
    for (let h2 = 0; h2 < i.length; h2++) {
      let g = i[h2];
      if (u === 0) {
        if (g === r && (o || i.slice(h2, h2 + a) === t)) {
          s.push(i.slice(c, h2)), c = h2 + a;
          continue;
        }
        if (g === "/") {
          d = h2;
          continue;
        }
      }
      g === "[" ? u++ : g === "]" && u--;
    }
    const f = s.length === 0 ? i : i.substring(c), p = f.startsWith(qo), m = p ? f.substring(1) : f, b = d && d > c ? d - c : void 0;
    return {
      modifiers: s,
      hasImportantModifier: p,
      baseClassName: m,
      maybePostfixModifierPosition: b
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: l
  }) : l;
}, Pi = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((o) => {
    o[0] === "[" ? (t.push(...n.sort(), o), n = []) : n.push(o);
  }), t.push(...n.sort()), t;
}, ki = (e) => ({
  cache: _i(e.cacheSize),
  parseClassName: Ti(e),
  ...Ci(e)
}), Oi = /\s+/, Ri = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: o,
    getConflictingClassGroupIds: r
  } = t, a = [], l = e.trim().split(Oi);
  let i = "";
  for (let s = l.length - 1; s >= 0; s -= 1) {
    const u = l[s], {
      modifiers: c,
      hasImportantModifier: d,
      baseClassName: f,
      maybePostfixModifierPosition: p
    } = n(u);
    let m = !!p, b = o(m ? f.substring(0, p) : f);
    if (!b) {
      if (!m) {
        i = u + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (b = o(f), !b) {
        i = u + (i.length > 0 ? " " + i : i);
        continue;
      }
      m = false;
    }
    const h2 = Pi(c).join(":"), g = d ? h2 + qo : h2, w = g + b;
    if (a.includes(w))
      continue;
    a.push(w);
    const y = r(b, m);
    for (let E = 0; E < y.length; ++E) {
      const x = y[E];
      a.push(g + x);
    }
    i = u + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function Ii() {
  let e = 0, t, n, o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Qo(t)) && (o && (o += " "), o += n);
  return o;
}
const Qo = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = Qo(e[o])) && (n && (n += " "), n += t);
  return n;
};
function $i(e, ...t) {
  let n, o, r, a = l;
  function l(s) {
    const u = t.reduce((c, d) => d(c), e());
    return n = ki(u), o = n.cache.get, r = n.cache.set, a = i, i(s);
  }
  function i(s) {
    const u = o(s);
    if (u)
      return u;
    const c = Ri(s, n);
    return r(s, c), c;
  }
  return function() {
    return a(Ii.apply(null, arguments));
  };
}
const X = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = true, t;
}, er = /^\[(?:([a-z-]+):)?(.+)\]$/i, Di = /^\d+\/\d+$/, Li = /* @__PURE__ */ new Set(["px", "full", "screen"]), Bi = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Mi = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ni = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Vi = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Fi = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, we = (e) => Ye(e) || Li.has(e) || Di.test(e), Te = (e) => ot(e, "length", Ui), Ye = (e) => !!e && !Number.isNaN(Number(e)), Xt = (e) => ot(e, "number", Ye), lt = (e) => !!e && Number.isInteger(Number(e)), Hi = (e) => e.endsWith("%") && Ye(e.slice(0, -1)), M = (e) => er.test(e), Pe = (e) => Bi.test(e), Wi = /* @__PURE__ */ new Set(["length", "size", "percentage"]), ji = (e) => ot(e, Wi, tr), Gi = (e) => ot(e, "position", tr), Ki = /* @__PURE__ */ new Set(["image", "url"]), Yi = (e) => ot(e, Ki, Zi), Xi = (e) => ot(e, "", Ji), it = () => true, ot = (e, t, n) => {
  const o = er.exec(e);
  return o ? o[1] ? typeof t == "string" ? o[1] === t : t.has(o[1]) : n(o[2]) : false;
}, Ui = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Mi.test(e) && !Ni.test(e)
), tr = () => false, Ji = (e) => Vi.test(e), Zi = (e) => Fi.test(e), qi = () => {
  const e = X("colors"), t = X("spacing"), n = X("blur"), o = X("brightness"), r = X("borderColor"), a = X("borderRadius"), l = X("borderSpacing"), i = X("borderWidth"), s = X("contrast"), u = X("grayscale"), c = X("hueRotate"), d = X("invert"), f = X("gap"), p = X("gradientColorStops"), m = X("gradientColorStopPositions"), b = X("inset"), h2 = X("margin"), g = X("opacity"), w = X("padding"), y = X("saturate"), E = X("scale"), x = X("sepia"), I = X("skew"), $ = X("space"), H = X("translate"), K = () => ["auto", "contain", "none"], F = () => ["auto", "hidden", "clip", "visible", "scroll"], re = () => ["auto", M, t], L = () => [M, t], oe = () => ["", we, Te], Y = () => ["auto", Ye, M], U = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], j = () => ["solid", "dashed", "dotted", "double", "none"], S = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], k = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], P = () => ["", "0", M], D = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], B = () => [Ye, M];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [it],
      spacing: [we, Te],
      blur: ["none", "", Pe, M],
      brightness: B(),
      borderColor: [e],
      borderRadius: ["none", "", "full", Pe, M],
      borderSpacing: L(),
      borderWidth: oe(),
      contrast: B(),
      grayscale: P(),
      hueRotate: B(),
      invert: P(),
      gap: L(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Hi, Te],
      inset: re(),
      margin: re(),
      opacity: B(),
      padding: L(),
      saturate: B(),
      scale: B(),
      sepia: P(),
      skew: B(),
      space: L(),
      translate: L()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", M]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Pe]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": D()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": D()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...U(), M]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: F()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": F()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": F()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: K()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": K()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": K()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [b]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [b]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [b]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [b]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [b]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [b]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [b]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [b]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [b]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", lt, M]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: re()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", M]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: P()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: P()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", lt, M]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [it]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", lt, M]
        }, M]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": Y()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Y()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [it]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [lt, M]
        }, M]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": Y()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Y()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", M]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", M]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [f]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [f]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [f]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...k()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...k(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...k(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [w]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [w]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [w]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [w]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [w]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [w]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [w]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [w]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [w]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [h2]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [h2]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [h2]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [h2]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [h2]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [h2]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [h2]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [h2]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [h2]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [$]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [$]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", M, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [M, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [M, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [Pe]
        }, Pe]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [M, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [M, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [M, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [M, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", Pe, Te]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Xt]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [it]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", M]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Ye, Xt]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", we, M]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", M]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", M]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [g]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [g]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...j(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", we, Te]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", we, M]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: L()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", M]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", M]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [g]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...U(), Gi]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", ji]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Yi]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [m]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [m]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [m]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [p]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [p]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [p]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [a]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [a]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [a]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [a]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [a]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [a]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [a]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [a]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [a]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [a]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [a]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [a]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [a]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [a]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [a]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [i]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [i]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [i]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [i]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [i]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [i]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [i]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [i]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [i]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [g]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...j(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [i]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [i]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [g]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: j()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [r]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [r]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [r]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [r]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [r]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [r]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [r]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [r]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [r]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [r]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...j()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [we, M]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [we, Te]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: oe()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [g]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [we, Te]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", Pe, Xi]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [it]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [g]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...S(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": S()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [o]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [s]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", Pe, M]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [u]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [c]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [d]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [y]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [x]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [o]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [s]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [u]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [c]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [d]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [g]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [y]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [x]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [l]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [l]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [l]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", M]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: B()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", M]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: B()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", M]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [E]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [E]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [E]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [lt, M]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [H]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [H]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [I]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [I]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", M]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", M]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": L()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": L()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": L()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": L()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": L()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": L()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": L()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": L()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": L()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": L()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": L()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": L()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": L()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": L()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": L()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": L()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": L()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": L()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", M]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [we, Te, Xt]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Qi = /* @__PURE__ */ $i(qi);
function ve(...e) {
  return Qi(xi(e));
}
const hs = /* @__PURE__ */ defineComponent({
  __name: "Button",
  props: {
    variant: {},
    size: {},
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e;
    return (n, o) => (openBlock(), createBlock(unref(J), {
      as: n.as,
      "as-child": n.asChild,
      class: normalizeClass(unref(ve)(unref(es)({ variant: n.variant, size: n.size }), t.class))
    }, {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "class"]));
  }
}), es = an(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 rounded px-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ts = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var zt = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ns = ({ size: e, strokeWidth: t = 2, absoluteStrokeWidth: n, color: o, iconNode: r, name: a, class: l, ...i }, { slots: s }) => h(
  "svg",
  {
    ...zt,
    width: e || zt.width,
    height: e || zt.height,
    stroke: o || zt.stroke,
    "stroke-width": n ? Number(t) * 24 / Number(e) : t,
    class: ["lucide", `lucide-${ts(a != null ? a : "icon")}`],
    ...i
  },
  [...r.map((u) => h(...u)), ...s.default ? [s.default()] : []]
);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nr = (e, t) => (n, { slots: o }) => h(
  ns,
  {
    ...n,
    iconNode: t,
    name: e
  },
  o
);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rs = nr("RefreshCwIcon", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]), as = { class: "flex gap-2 items-center" }, ls = { key: 1 }, bs = /* @__PURE__ */ defineComponent({
  __name: "LoadingIndicator",
  props: {
    variant: {},
    size: {},
    class: {},
    label: {},
    suppressSpinner: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(e) {
    const t = e;
    return (n, o) => (openBlock(), createBlock(unref(J), {
      as: n.as,
      "as-child": n.asChild,
      class: normalizeClass(unref(ve)(unref(is)({ variant: n.variant, size: n.size }), t.class))
    }, {
      default: withCtx(() => [
        renderSlot(n.$slots, "default"),
        createElementVNode("div", as, [
          n.suppressSpinner ? createCommentVNode("", true) : (openBlock(), createBlock(unref(rs), {
            key: 0,
            class: "animate-spin size-3"
          })),
          n.label ? (openBlock(), createElementBlock("span", ls, toDisplayString(n.label), 1)) : createCommentVNode("", true)
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child", "class"]));
  }
}), is = an(
  "flex flex-col gap-4 h-full items-center justify-center text-xs font-medium",
  {
    variants: {
      variant: {
        default: "text-primary",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground"
      },
      size: {
        default: "px-4 py-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), cs = /* @__PURE__ */ defineComponent({
  __name: "ScrollBar",
  props: {
    orientation: { default: "vertical" },
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e, n = computed(() => {
      const { class: o, ...r } = t;
      return r;
    });
    return (o, r) => (openBlock(), createBlock(unref(Rl), mergeProps(n.value, {
      class: unref(ve)(
        "flex touch-none select-none transition-colors",
        o.orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
        o.orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px",
        t.class
      )
    }), {
      default: withCtx(() => [
        createVNode(unref(Il), { class: "relative flex-1 rounded-full bg-border" })
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), xs = /* @__PURE__ */ defineComponent({
  __name: "ScrollArea",
  props: {
    type: {},
    dir: {},
    scrollHideDelay: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e, n = computed(() => {
      const { class: o, ...r } = t;
      return r;
    });
    return (o, r) => (openBlock(), createBlock(unref(Cl), mergeProps(n.value, {
      class: unref(ve)("relative overflow-hidden", t.class)
    }), {
      default: withCtx(() => [
        createVNode(unref(Sl), { class: "h-full w-full rounded-[inherit]" }, {
          default: withCtx(() => [
            renderSlot(o.$slots, "default")
          ]),
          _: 3
        }),
        createVNode(cs),
        createVNode(unref(Dl))
      ]),
      _: 3
    }, 16, ["class"]));
  }
});

export { bs as b, hs as h, ps as p, xs as x };
//# sourceMappingURL=karagoz-shared-BIF6lT4t.mjs.map
