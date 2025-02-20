import * as kn$1 from 'vue';
import { defineComponent, shallowRef, inject, computed, toRaw, onMounted, watch, onBeforeUnmount, h as h$1, Comment, mergeProps, cloneVNode, toRefs, ref, getCurrentInstance, reactive, watchEffect, markRaw, effectScope, Fragment, nextTick, onUnmounted, provide, unref, mergeModels, useModel, openBlock, createBlock, withCtx, createVNode, createCommentVNode, createElementBlock, renderSlot, normalizeStyle, normalizeClass, createElementVNode, toDisplayString, renderList, withModifiers, withDirectives, vShow, createTextVNode, useTemplateRef, normalizeProps, guardReactiveProps, getCurrentScope, onScopeDispose, isRef, readonly, resolveDynamicComponent, toValue, toHandlerKey, camelize, toRef, withKeys, toHandlers, customRef, Teleport, useSlots, Text, mergeDefaults, watchPostEffect, shallowReadonly } from 'vue';
import { WebContainer, reloadPreview } from '@webcontainer/api';
import { indentUnit, LanguageDescription } from '@codemirror/language';
import { languages } from '@codemirror/language-data';
import { basicSetup, EditorView as EditorView$1 } from 'codemirror';
import { EditorState, Compartment, StateEffect } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';

/*!
* VueCodemirror v6.1.1
* Copyright (c) Surmon. All rights reserved.
* Released under the MIT License.
* Surmon
*/
var h=Object.freeze({autofocus:!1,disabled:!1,indentWithTab:!0,tabSize:2,placeholder:"",autoDestroy:!0,extensions:[basicSetup]}),y=Symbol("vue-codemirror-global-config");var O,j=function(e){var t=e.onUpdate,n=e.onChange,o=e.onFocus,r=e.onBlur,u=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(n[o[r]]=e[o[r]]);}return n}(e,["onUpdate","onChange","onFocus","onBlur"]);return EditorState.create({doc:u.doc,selection:u.selection,extensions:(Array.isArray(u.extensions)?u.extensions:[u.extensions]).concat([EditorView.updateListener.of((function(e){t(e),e.docChanged&&n(e.state.doc.toString(),e),e.focusChanged&&(e.view.hasFocus?o(e):r(e));}))])})},S=function(e){var t=new Compartment;return {compartment:t,run:function(n){t.get(e.state)?e.dispatch({effects:t.reconfigure(n)}):e.dispatch({effects:StateEffect.appendConfig.of(t.of(n))});}}},x=function(e,t){var n=S(e),o=n.compartment,r=n.run;return function(n){var u=o.get(e.state);r((null!=n?n:u!==t)?t:[]);}},C={type:Boolean,default:void 0},D={autofocus:C,disabled:C,indentWithTab:C,tabSize:Number,placeholder:String,style:Object,autoDestroy:C,phrases:Object,root:Object,extensions:Array,selection:Object},U={modelValue:{type:String,default:""}},w=Object.assign(Object.assign({},D),U);!function(e){e.Change="change",e.Update="update",e.Focus="focus",e.Blur="blur",e.Ready="ready",e.ModelUpdate="update:modelValue";}(O||(O={}));var z={};z[O.Change]=function(e,t){return !0},z[O.Update]=function(e){return !0},z[O.Focus]=function(e){return !0},z[O.Blur]=function(e){return !0},z[O.Ready]=function(e){return !0};var B={};B[O.ModelUpdate]=z[O.Change];var F=Object.assign(Object.assign({},z),B),P=defineComponent({name:"VueCodemirror",props:Object.assign({},w),emits:Object.assign({},F),setup:function(t,s){var f=shallowRef(),d=shallowRef(),C=shallowRef(),D=Object.assign(Object.assign({},h),inject(y,{})),U=computed((function(){var e={};return Object.keys(toRaw(t)).forEach((function(n){var o;"modelValue"!==n&&(e[n]=null!==(o=t[n])&&void 0!==o?o:D[n]);})),e}));return onMounted((function(){var e;d.value=j({doc:t.modelValue,selection:U.value.selection,extensions:null!==(e=D.extensions)&&void 0!==e?e:[],onFocus:function(e){return s.emit(O.Focus,e)},onBlur:function(e){return s.emit(O.Blur,e)},onUpdate:function(e){return s.emit(O.Update,e)},onChange:function(e,n){e!==t.modelValue&&(s.emit(O.Change,e,n),s.emit(O.ModelUpdate,e,n));}}),C.value=function(e){return new EditorView(Object.assign({},e))}({state:d.value,parent:f.value,root:U.value.root});var n=function(e){var t=function(){return e.state.doc.toString()},n=S(e).run,o=x(e,[EditorView.editable.of(!1),EditorState.readOnly.of(!0)]),r=x(e,keymap.of([indentWithTab])),u=S(e).run,a=S(e).run,i=S(e).run,c=S(e).run;return {focus:function(){return e.focus()},getDoc:t,setDoc:function(n){n!==t()&&e.dispatch({changes:{from:0,to:e.state.doc.length,insert:n}});},reExtensions:n,toggleDisabled:o,toggleIndentWithTab:r,setTabSize:function(e){u([EditorState.tabSize.of(e),indentUnit.of(" ".repeat(e))]);},setPhrases:function(e){a([EditorState.phrases.of(e)]);},setPlaceholder:function(e){i(placeholder(e));},setStyle:function(e){void 0===e&&(e={}),c(EditorView.theme({"&":Object.assign({},e)}));}}}(C.value);watch((function(){return t.modelValue}),(function(e){e!==n.getDoc()&&n.setDoc(e);})),watch((function(){return t.extensions}),(function(e){return n.reExtensions(e||[])}),{immediate:!0}),watch((function(){return U.value.disabled}),(function(e){return n.toggleDisabled(e)}),{immediate:!0}),watch((function(){return U.value.indentWithTab}),(function(e){return n.toggleIndentWithTab(e)}),{immediate:!0}),watch((function(){return U.value.tabSize}),(function(e){return n.setTabSize(e)}),{immediate:!0}),watch((function(){return U.value.phrases}),(function(e){return n.setPhrases(e||{})}),{immediate:!0}),watch((function(){return U.value.placeholder}),(function(e){return n.setPlaceholder(e)}),{immediate:!0}),watch((function(){return U.value.style}),(function(e){return n.setStyle(e)}),{immediate:!0}),U.value.autofocus&&n.focus(),s.emit(O.Ready,{state:d.value,view:C.value,container:f.value});})),onBeforeUnmount((function(){U.value.autoDestroy&&C.value&&function(e){e.destroy();}(C.value);})),function(){return h$1("div",{class:"v-codemirror",style:{display:"contents"},ref:f})}}}),T=P;

function pl(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (n = pl(e[t])) && (r && (r += " "), r += n);
  else for (t in e) e[t] && (r && (r += " "), r += t);
  return r;
}
function _i() {
  for (var e, t, n = 0, r = ""; n < arguments.length; ) (e = arguments[n++]) && (t = pl(e)) && (r && (r += " "), r += t);
  return r;
}
const aa = (e) => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e, la = _i, Eo = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return la(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((u) => {
    const c = n == null ? void 0 : n[u], d = a == null ? void 0 : a[u];
    if (c === null) return null;
    const f = aa(c) || aa(d);
    return o[u][f];
  }), l = n && Object.entries(n).reduce((u, c) => {
    let [d, f] = c;
    return f === void 0 || (u[d] = f), u;
  }, {}), i = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, c) => {
    let { class: d, className: f, ...m } = c;
    return Object.entries(m).every((g) => {
      let [h2, b] = g;
      return Array.isArray(b) ? b.includes({
        ...a,
        ...l
      }[h2]) : {
        ...a,
        ...l
      }[h2] === b;
    }) ? [
      ...u,
      d,
      f
    ] : u;
  }, []);
  return la(e, s, i, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Ei = ["top", "right", "bottom", "left"], Tt = Math.min, $e = Math.max, cr = Math.round, Xn = Math.floor, kt = (e) => ({
  x: e,
  y: e
}), wi = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, xi = {
  start: "end",
  end: "start"
};
function Yr(e, t, n) {
  return $e(e, Tt(t, n));
}
function dt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ft(e) {
  return e.split("-")[0];
}
function gn(e) {
  return e.split("-")[1];
}
function wo(e) {
  return e === "x" ? "y" : "x";
}
function xo(e) {
  return e === "y" ? "height" : "width";
}
function hn(e) {
  return ["top", "bottom"].includes(ft(e)) ? "y" : "x";
}
function Co(e) {
  return wo(hn(e));
}
function Ci(e, t, n) {
  n === void 0 && (n = false);
  const r = gn(e), o = Co(e), a = xo(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = dr(s)), [s, dr(s)];
}
function Ti(e) {
  const t = dr(e);
  return [Xr(e), t, Xr(t)];
}
function Xr(e) {
  return e.replace(/start|end/g, (t) => xi[t]);
}
function ki(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], a = ["top", "bottom"], s = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? a : s;
    default:
      return [];
  }
}
function Ni(e, t, n, r) {
  const o = gn(e);
  let a = ki(ft(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(Xr)))), a;
}
function dr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => wi[t]);
}
function Si(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function ml(e) {
  return typeof e != "number" ? Si(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function fr(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n
  };
}
function sa(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = hn(t), s = Co(t), l = xo(s), i = ft(t), u = a === "y", c = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, f = r[l] / 2 - o[l] / 2;
  let m;
  switch (i) {
    case "top":
      m = {
        x: c,
        y: r.y - o.height
      };
      break;
    case "bottom":
      m = {
        x: c,
        y: r.y + r.height
      };
      break;
    case "right":
      m = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      m = {
        x: r.x - o.width,
        y: d
      };
      break;
    default:
      m = {
        x: r.x,
        y: r.y
      };
  }
  switch (gn(t)) {
    case "start":
      m[s] -= f * (n && u ? -1 : 1);
      break;
    case "end":
      m[s] += f * (n && u ? -1 : 1);
      break;
  }
  return m;
}
const Li = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: s
  } = n, l = a.filter(Boolean), i = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let u = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: c,
    y: d
  } = sa(u, r, i), f = r, m = {}, g = 0;
  for (let h2 = 0; h2 < l.length; h2++) {
    const {
      name: b,
      fn: p
    } = l[h2], {
      x: y,
      y: _,
      data: E,
      reset: C
    } = await p({
      x: c,
      y: d,
      initialPlacement: r,
      placement: f,
      strategy: o,
      middlewareData: m,
      rects: u,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    c = y != null ? y : c, d = _ != null ? _ : d, m = {
      ...m,
      [b]: {
        ...m[b],
        ...E
      }
    }, C && g <= 50 && (g++, typeof C == "object" && (C.placement && (f = C.placement), C.rects && (u = C.rects === true ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : C.rects), {
      x: c,
      y: d
    } = sa(u, f, i)), h2 = -1);
  }
  return {
    x: c,
    y: d,
    placement: f,
    strategy: o,
    middlewareData: m
  };
};
async function An(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: a,
    rects: s,
    elements: l,
    strategy: i
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: c = "viewport",
    elementContext: d = "floating",
    altBoundary: f = false,
    padding: m = 0
  } = dt(t, e), g = ml(m), h2 = l[f ? d === "floating" ? "reference" : "floating" : d], b = fr(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(h2))) == null || n ? h2 : h2.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(l.floating)),
    boundary: u,
    rootBoundary: c,
    strategy: i
  })), p = d === "floating" ? {
    ...s.floating,
    x: r,
    y: o
  } : s.reference, y = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(l.floating)), _ = await (a.isElement == null ? void 0 : a.isElement(y)) ? await (a.getScale == null ? void 0 : a.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = fr(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: l,
    rect: p,
    offsetParent: y,
    strategy: i
  }) : p);
  return {
    top: (b.top - E.top + g.top) / _.y,
    bottom: (E.bottom - b.bottom + g.bottom) / _.y,
    left: (b.left - E.left + g.left) / _.x,
    right: (E.right - b.right + g.right) / _.x
  };
}
const Ai = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: a,
      platform: s,
      elements: l,
      middlewareData: i
    } = t, {
      element: u,
      padding: c = 0
    } = dt(e, t) || {};
    if (u == null)
      return {};
    const d = ml(c), f = {
      x: n,
      y: r
    }, m = Co(o), g = xo(m), h2 = await s.getDimensions(u), b = m === "y", p = b ? "top" : "left", y = b ? "bottom" : "right", _ = b ? "clientHeight" : "clientWidth", E = a.reference[g] + a.reference[m] - f[m] - a.floating[g], C = f[m] - a.reference[m], S = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
    let T = S ? S[_] : 0;
    (!T || !await (s.isElement == null ? void 0 : s.isElement(S))) && (T = l.floating[_] || a.floating[g]);
    const V = E / 2 - C / 2, G = T / 2 - h2[g] / 2 - 1, F = Tt(d[p], G), q = Tt(d[y], G), U = F, ve = T - h2[g] - q, ne = T / 2 - h2[g] / 2 + V, ie = Yr(U, ne, ve), D = !i.arrow && gn(o) != null && ne !== ie && a.reference[g] / 2 - (ne < U ? F : q) - h2[g] / 2 < 0, k = D ? ne < U ? ne - U : ne - ve : 0;
    return {
      [m]: f[m] + k,
      data: {
        [m]: ie,
        centerOffset: ne - ie - k,
        ...D && {
          alignmentOffset: k
        }
      },
      reset: D
    };
  }
}), Oi = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: a,
        rects: s,
        initialPlacement: l,
        platform: i,
        elements: u
      } = t, {
        mainAxis: c = true,
        crossAxis: d = true,
        fallbackPlacements: f,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: h2 = true,
        ...b
      } = dt(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const p = ft(o), y = ft(l) === l, _ = await (i.isRTL == null ? void 0 : i.isRTL(u.floating)), E = f || (y || !h2 ? [dr(l)] : Ti(l));
      !f && g !== "none" && E.push(...Ni(l, h2, g, _));
      const C = [l, ...E], S = await An(t, b), T = [];
      let V = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (c && T.push(S[p]), d) {
        const U = Ci(o, s, _);
        T.push(S[U[0]], S[U[1]]);
      }
      if (V = [...V, {
        placement: o,
        overflows: T
      }], !T.every((U) => U <= 0)) {
        var G, F;
        const U = (((G = a.flip) == null ? void 0 : G.index) || 0) + 1, ve = C[U];
        if (ve)
          return {
            data: {
              index: U,
              overflows: V
            },
            reset: {
              placement: ve
            }
          };
        let ne = (F = V.filter((ie) => ie.overflows[0] <= 0).sort((ie, D) => ie.overflows[1] - D.overflows[1])[0]) == null ? void 0 : F.placement;
        if (!ne)
          switch (m) {
            case "bestFit": {
              var q;
              const ie = (q = V.map((D) => [D.placement, D.overflows.filter((k) => k > 0).reduce((k, I) => k + I, 0)]).sort((D, k) => D[1] - k[1])[0]) == null ? void 0 : q[0];
              ie && (ne = ie);
              break;
            }
            case "initialPlacement":
              ne = l;
              break;
          }
        if (o !== ne)
          return {
            reset: {
              placement: ne
            }
          };
      }
      return {};
    }
  };
};
function ia(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function ua(e) {
  return Ei.some((t) => e[t] >= 0);
}
const Ii = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = dt(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await An(t, {
            ...o,
            elementContext: "reference"
          }), s = ia(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: ua(s)
            }
          };
        }
        case "escaped": {
          const a = await An(t, {
            ...o,
            altBoundary: true
          }), s = ia(a, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: ua(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Pi(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = ft(n), l = gn(n), i = hn(n) === "y", u = ["left", "top"].includes(s) ? -1 : 1, c = a && i ? -1 : 1, d = dt(t, e);
  let {
    mainAxis: f,
    crossAxis: m,
    alignmentAxis: g
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...d
  };
  return l && typeof g == "number" && (m = l === "end" ? g * -1 : g), i ? {
    x: m * c,
    y: f * u
  } : {
    x: f * u,
    y: m * c
  };
}
const Di = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: a,
        placement: s,
        middlewareData: l
      } = t, i = await Pi(t, e);
      return s === ((n = l.offset) == null ? void 0 : n.placement) && (r = l.arrow) != null && r.alignmentOffset ? {} : {
        x: o + i.x,
        y: a + i.y,
        data: {
          ...i,
          placement: s
        }
      };
    }
  };
}, Ri = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: a = true,
        crossAxis: s = false,
        limiter: l = {
          fn: (b) => {
            let {
              x: p,
              y
            } = b;
            return {
              x: p,
              y
            };
          }
        },
        ...i
      } = dt(e, t), u = {
        x: n,
        y: r
      }, c = await An(t, i), d = hn(ft(o)), f = wo(d);
      let m = u[f], g = u[d];
      if (a) {
        const b = f === "y" ? "top" : "left", p = f === "y" ? "bottom" : "right", y = m + c[b], _ = m - c[p];
        m = Yr(y, m, _);
      }
      if (s) {
        const b = d === "y" ? "top" : "left", p = d === "y" ? "bottom" : "right", y = g + c[b], _ = g - c[p];
        g = Yr(y, g, _);
      }
      const h2 = l.fn({
        ...t,
        [f]: m,
        [d]: g
      });
      return {
        ...h2,
        data: {
          x: h2.x - n,
          y: h2.y - r
        }
      };
    }
  };
}, Mi = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: a,
        middlewareData: s
      } = t, {
        offset: l = 0,
        mainAxis: i = true,
        crossAxis: u = true
      } = dt(e, t), c = {
        x: n,
        y: r
      }, d = hn(o), f = wo(d);
      let m = c[f], g = c[d];
      const h2 = dt(l, t), b = typeof h2 == "number" ? {
        mainAxis: h2,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h2
      };
      if (i) {
        const _ = f === "y" ? "height" : "width", E = a.reference[f] - a.floating[_] + b.mainAxis, C = a.reference[f] + a.reference[_] - b.mainAxis;
        m < E ? m = E : m > C && (m = C);
      }
      if (u) {
        var p, y;
        const _ = f === "y" ? "width" : "height", E = ["top", "left"].includes(ft(o)), C = a.reference[d] - a.floating[_] + (E && ((p = s.offset) == null ? void 0 : p[d]) || 0) + (E ? 0 : b.crossAxis), S = a.reference[d] + a.reference[_] + (E ? 0 : ((y = s.offset) == null ? void 0 : y[d]) || 0) - (E ? b.crossAxis : 0);
        g < C ? g = C : g > S && (g = S);
      }
      return {
        [f]: m,
        [d]: g
      };
    }
  };
}, Fi = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: n,
        rects: r,
        platform: o,
        elements: a
      } = t, {
        apply: s = () => {
        },
        ...l
      } = dt(e, t), i = await An(t, l), u = ft(n), c = gn(n), d = hn(n) === "y", {
        width: f,
        height: m
      } = r.floating;
      let g, h2;
      u === "top" || u === "bottom" ? (g = u, h2 = c === (await (o.isRTL == null ? void 0 : o.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h2 = u, g = c === "end" ? "top" : "bottom");
      const b = m - i[g], p = f - i[h2], y = !t.middlewareData.shift;
      let _ = b, E = p;
      if (d) {
        const S = f - i.left - i.right;
        E = c || y ? Tt(p, S) : S;
      } else {
        const S = m - i.top - i.bottom;
        _ = c || y ? Tt(b, S) : S;
      }
      if (y && !c) {
        const S = $e(i.left, 0), T = $e(i.right, 0), V = $e(i.top, 0), G = $e(i.bottom, 0);
        d ? E = f - 2 * (S !== 0 || T !== 0 ? S + T : $e(i.left, i.right)) : _ = m - 2 * (V !== 0 || G !== 0 ? V + G : $e(i.top, i.bottom));
      }
      await s({
        ...t,
        availableWidth: E,
        availableHeight: _
      });
      const C = await o.getDimensions(a.floating);
      return f !== C.width || m !== C.height ? {
        reset: {
          rects: true
        }
      } : {};
    }
  };
};
function Yt(e) {
  return "#document";
}
function Ve(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || void 0;
}
function rt(e) {
  var t;
  return (t = e.document || (void 0).document) == null ? void 0 : t.documentElement;
}
function Xe(e) {
  return false;
}
function et(e) {
  return false;
}
function ca(e) {
  return false;
}
function Un(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = qe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function _r(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return false;
    }
  });
}
function ko(e) {
  const t = No(), n = e;
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : false) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : false) || !t && (n.filter ? n.filter !== "none" : false) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function No() {
  return typeof CSS > "u" || !CSS.supports ? false : CSS.supports("-webkit-backdrop-filter", "none");
}
function un(e) {
  return ["html", "body", "#document"].includes(Yt());
}
function qe(e) {
  return Ve(e).getComputedStyle(e);
}
function Er(e) {
  return {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Nt(e) {
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ca() || // Fallback.
    rt(e)
  );
  return t;
}
function vl(e) {
  const t = Nt(e);
  return un() ? e.ownerDocument ? e.ownerDocument.body : e.body : vl(t);
}
function On(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = true);
  const o = vl(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Ve(o);
  if (a) {
    const l = qr(s);
    return t.concat(s, s.visualViewport || [], Un(o) ? o : [], l && n ? On(l) : []);
  }
  return t.concat(o, On(o, [], n));
}
function qr(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function gl(e) {
  const t = qe(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const a = n, s = r, l = cr(n) !== a || cr(r) !== s;
  return l && (n = a, r = s), {
    width: n,
    height: r,
    $: l
  };
}
function So(e) {
  return e.contextElement;
}
function on(e) {
  So(e);
  return kt(1);
}
const Bi = /* @__PURE__ */ kt(0);
function hl(e) {
  const t = Ve(e);
  return !No() || !t.visualViewport ? Bi : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Vi(e, t, n) {
  return t === void 0 && (t = false), !n || t && n !== Ve(e) ? false : t;
}
function Wt(e, t, n, r) {
  t === void 0 && (t = false), n === void 0 && (n = false);
  const o = e.getBoundingClientRect(), a = So(e);
  let s = kt(1);
  t && (r ? Xe() : s = on(e));
  const l = Vi(a, n, r) ? hl(a) : kt(0);
  let i = (o.left + l.x) / s.x, u = (o.top + l.y) / s.y, c = o.width / s.x, d = o.height / s.y;
  if (a) {
    const f = Ve(a), m = r && Xe() ? Ve(r) : r;
    let g = f, h2 = qr(g);
    for (; h2 && r && m !== g; ) {
      const b = on(h2), p = h2.getBoundingClientRect(), y = qe(h2), _ = p.left + (h2.clientLeft + parseFloat(y.paddingLeft)) * b.x, E = p.top + (h2.clientTop + parseFloat(y.paddingTop)) * b.y;
      i *= b.x, u *= b.y, c *= b.x, d *= b.y, i += _, u += E, g = Ve(h2), h2 = qr(g);
    }
  }
  return fr({
    width: c,
    height: d,
    x: i,
    y: u
  });
}
function Ui(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = rt(r), l = t ? _r(t.floating) : false;
  if (r === s || l && a)
    return n;
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = kt(1);
  const c = kt(0);
  if (!a && (i = Er(r), et())) ;
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - i.scrollLeft * u.x + c.x,
    y: n.y * u.y - i.scrollTop * u.y + c.y
  };
}
function Wi(e) {
  return Array.from(e.getClientRects());
}
function Jr(e, t) {
  const n = Er(e).scrollLeft;
  return t ? t.left + n : Wt(rt(e)).left + n;
}
function Hi(e) {
  const t = rt(e), n = Er(e), r = e.ownerDocument.body, o = $e(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = $e(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + Jr(e);
  const l = -n.scrollTop;
  return qe(r).direction === "rtl" && (s += $e(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: l
  };
}
function ji(e, t) {
  const n = Ve(e), r = rt(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, l = 0, i = 0;
  if (o) {
    a = o.width, s = o.height;
    const u = No();
    (!u || u && t === "fixed") && (l = o.offsetLeft, i = o.offsetTop);
  }
  return {
    width: a,
    height: s,
    x: l,
    y: i
  };
}
function da(e, t, n) {
  let r;
  if (t === "viewport")
    r = ji(e, n);
  else if (t === "document")
    r = Hi(rt(e));
  else {
    const o = hl(e);
    r = {
      ...t,
      x: t.x - o.x,
      y: t.y - o.y
    };
  }
  return fr(r);
}
function bl(e, t) {
  Nt(e);
  return false;
}
function Ki(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = On(e, [], false).filter((l) => Xe()), o = null;
  const a = qe(e).position === "fixed";
  let s = a ? Nt(e) : e;
  for (; Xe(); ) {
    const l = qe(s), i = ko(s);
    !i && l.position === "fixed" && (o = null), (a ? !i && !o : !i && l.position === "static" && o && ["absolute", "fixed"].includes(o.position) || Un(s) && !i && bl(e)) ? r = r.filter((u) => u !== s) : o = l, s = Nt(s);
  }
  return t.set(e, r), r;
}
function Yi(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? _r(t) ? [] : Ki(t, this._c) : [].concat(n), r], s = a[0], l = a.reduce((i, u) => {
    const c = da(t, u, o);
    return i.top = $e(c.top, i.top), i.right = Tt(c.right, i.right), i.bottom = Tt(c.bottom, i.bottom), i.left = $e(c.left, i.left), i;
  }, da(t, s, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Xi(e) {
  const {
    width: t,
    height: n
  } = gl(e);
  return {
    width: t,
    height: n
  };
}
function qi(e, t, n) {
  const r = et(), o = rt(t), a = n === "fixed", s = Wt(e, true, a, t);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const i = kt(0);
  if (!a)
    if (l = Er(t), r) ;
    else o && (i.x = Jr(o));
  let u = 0, c = 0;
  if (o && !r && !a) {
    const m = o.getBoundingClientRect();
    c = m.top + l.scrollTop, u = m.left + l.scrollLeft - // RTL <body> scrollbar.
    Jr(o, m);
  }
  const d = s.left + l.scrollLeft - i.x - u, f = s.top + l.scrollTop - i.y - c;
  return {
    x: d,
    y: f,
    width: s.width,
    height: s.height
  };
}
function yl(e, t) {
  const n = Ve(e);
  if (_r(e))
    return n;
  {
    let o = Nt(e);
    for (; o && !un(); ) {
      o = Nt(o);
    }
    return n;
  }
}
const Ji = async function(e) {
  const t = this.getOffsetParent || yl, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: qi(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Qi(e) {
  return qe(e).direction === "rtl";
}
const Zi = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ui,
  getDocumentElement: rt,
  getClippingRect: Yi,
  getOffsetParent: yl,
  getElementRects: Ji,
  getClientRects: Wi,
  getDimensions: Xi,
  getScale: on,
  isElement: Xe,
  isRTL: Qi
};
function eu(e, t) {
  let n = null, r;
  const o = rt(e);
  function a() {
    var l;
    clearTimeout(r), (l = n) == null || l.disconnect(), n = null;
  }
  function s(l, i) {
    l === void 0 && (l = false), i === void 0 && (i = 1), a();
    const {
      left: u,
      top: c,
      width: d,
      height: f
    } = e.getBoundingClientRect();
    if (l || t(), !d || !f)
      return;
    const m = Xn(c), g = Xn(o.clientWidth - (u + d)), h2 = Xn(o.clientHeight - (c + f)), b = Xn(u), p = {
      rootMargin: -m + "px " + -g + "px " + -h2 + "px " + -b + "px",
      threshold: $e(0, Tt(1, i)) || 1
    };
    let y = true;
    function _(E) {
      const C = E[0].intersectionRatio;
      if (C !== i) {
        if (!y)
          return s();
        C ? s(false, C) : r = setTimeout(() => {
          s(false, 1e-7);
        }, 1e3);
      }
      y = false;
    }
    try {
      n = new IntersectionObserver(_, {
        ...p,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(_, p);
    }
    n.observe(e);
  }
  return s(true), a;
}
function tu(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = true,
    ancestorResize: a = true,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: i = false
  } = r, u = So(e), c = o || a ? [...u ? On(u) : [], ...On(t)] : [];
  c.forEach((p) => {
    o && p.addEventListener("scroll", n, {
      passive: true
    }), a && p.addEventListener("resize", n);
  });
  const d = u && l ? eu(u, n) : null;
  let f = -1, m = null;
  s && (m = new ResizeObserver((p) => {
    let [y] = p;
    y && y.target === u && m && (m.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      var _;
      (_ = m) == null || _.observe(t);
    })), n();
  }), u && !i && m.observe(u), m.observe(t));
  let g, h2 = i ? Wt(e) : null;
  i && b();
  function b() {
    const p = Wt(e);
    h2 && (p.x !== h2.x || p.y !== h2.y || p.width !== h2.width || p.height !== h2.height) && n(), h2 = p, g = requestAnimationFrame(b);
  }
  return n(), () => {
    var p;
    c.forEach((y) => {
      o && y.removeEventListener("scroll", n), a && y.removeEventListener("resize", n);
    }), d == null || d(), (p = m) == null || p.disconnect(), m = null, i && cancelAnimationFrame(g);
  };
}
const nu = Di, ru = Ri, pa = Oi, ou = Fi, au = Ii, lu = Ai, su = Mi, iu = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Zi,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return Li(e, t, {
    ...o,
    platform: a
  });
};
function uu(e) {
  return e != null && typeof e == "object" && "$el" in e;
}
function Qr(e) {
  if (uu(e)) {
    const t = e.$el;
    return t;
  }
  return e;
}
function en(e) {
  return typeof e == "function" ? e() : unref(e);
}
function cu(e) {
  return {
    name: "arrow",
    options: e,
    fn(t) {
      const n = Qr(en(e.element));
      return n == null ? {} : lu({
        element: n,
        padding: e.padding
      }).fn(t);
    }
  };
}
function _l(e) {
  return 1;
}
function ma(e, t) {
  const n = _l();
  return Math.round(t * n) / n;
}
function du(e, t, n) {
  n === void 0 && (n = {});
  const r = n.whileElementsMounted, o = computed(() => {
    var T;
    return (T = en(n.open)) != null ? T : true;
  }), a = computed(() => en(n.middleware)), s = computed(() => {
    var T;
    return (T = en(n.placement)) != null ? T : "bottom";
  }), l = computed(() => {
    var T;
    return (T = en(n.strategy)) != null ? T : "absolute";
  }), i = computed(() => {
    var T;
    return (T = en(n.transform)) != null ? T : true;
  }), u = computed(() => Qr(e.value)), c = computed(() => Qr(t.value)), d = ref(0), f = ref(0), m = ref(l.value), g = ref(s.value), h2 = shallowRef({}), b = ref(false), p = computed(() => {
    const T = {
      position: m.value,
      left: "0",
      top: "0"
    };
    if (!c.value)
      return T;
    const V = ma(c.value, d.value), G = ma(c.value, f.value);
    return i.value ? {
      ...T,
      transform: "translate(" + V + "px, " + G + "px)",
      ..._l(c.value) >= 1.5
    } : {
      position: m.value,
      left: V + "px",
      top: G + "px"
    };
  });
  let y;
  function _() {
    if (u.value == null || c.value == null)
      return;
    const T = o.value;
    iu(u.value, c.value, {
      middleware: a.value,
      placement: s.value,
      strategy: l.value
    }).then((V) => {
      d.value = V.x, f.value = V.y, m.value = V.strategy, g.value = V.placement, h2.value = V.middlewareData, b.value = T !== false;
    });
  }
  function E() {
    typeof y == "function" && (y(), y = void 0);
  }
  function C() {
    if (E(), r === void 0) {
      _();
      return;
    }
    if (u.value != null && c.value != null) {
      y = r(u.value, c.value, _);
      return;
    }
  }
  function S() {
    o.value || (b.value = false);
  }
  return watch([a, s, l, o], _, {
    flush: "sync"
  }), watch([u, c], C, {
    flush: "sync"
  }), watch(o, S, {
    flush: "sync"
  }), getCurrentScope() && onScopeDispose(E), {
    x: shallowReadonly(d),
    y: shallowReadonly(f),
    strategy: shallowReadonly(m),
    placement: shallowReadonly(g),
    middlewareData: shallowReadonly(h2),
    isPositioned: shallowReadonly(b),
    floatingStyles: p,
    update: _
  };
}
function Ge(e, t) {
  const n = typeof e == "string" && !t ? `${e}Context` : t, r = Symbol(n);
  return [(o) => {
    const a = inject(r, o);
    if (a || a === null)
      return a;
    throw new Error(
      `Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(
        ", "
      )}` : `\`${e}\``}`
    );
  }, (o) => (provide(r, o), o)];
}
function fu(e, t = Number.NEGATIVE_INFINITY, n = Number.POSITIVE_INFINITY) {
  return Math.min(Math.max(e, t), n);
}
function pu(e, t) {
  if (e.length !== t.length)
    return false;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return false;
  return true;
}
function mu(e, t) {
  var n;
  const r = shallowRef();
  return watchEffect(() => {
    r.value = e();
  }, {
    ...t,
    flush: (n = void 0) != null ? n : "sync"
  }), readonly(r);
}
function Hn(e) {
  return getCurrentScope() ? (onScopeDispose(e), true) : false;
}
function vu() {
  const e = /* @__PURE__ */ new Set(), t = (n) => {
    e.delete(n);
  };
  return {
    on: (n) => {
      e.add(n);
      const r = () => t(n);
      return Hn(r), {
        off: r
      };
    },
    off: t,
    trigger: (...n) => Promise.all(Array.from(e).map((r) => r(...n)))
  };
}
function gu(e) {
  let t = false, n;
  const r = effectScope(true);
  return (...o) => (t || (n = r.run(() => e(...o)), t = true), n);
}
function ut(e) {
  return typeof e == "function" ? e() : unref(e);
}
const jn = "undefined" < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const hu = (e) => typeof e < "u", bu = Object.prototype.toString, yu = (e) => bu.call(e) === "[object Object]", Zr = () => {
};
function _u(e, t) {
  function n(...r) {
    return new Promise((o, a) => {
      Promise.resolve(e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })).then(o).catch(a);
    });
  }
  return n;
}
function Eu(e, t = {}) {
  let n, r, o = Zr;
  const a = (s) => {
    clearTimeout(s), o(), o = Zr;
  };
  return (s) => {
    const l = ut(e), i = ut(t.maxWait);
    return n && a(n), l <= 0 || i !== void 0 && i <= 0 ? (r && (a(r), r = null), Promise.resolve(s())) : new Promise((u, c) => {
      o = t.rejectOnCancel ? c : u, i && !r && (r = setTimeout(() => {
        n && a(n), r = null, u(s());
      }, i)), n = setTimeout(() => {
        r && a(r), r = null, u(s());
      }, l);
    });
  };
}
function wu(e, t = 1e4) {
  return customRef((n, r) => {
    let o = ut(e), a;
    const s = () => setTimeout(() => {
      o = ut(e), r();
    }, ut(t));
    return Hn(() => {
      clearTimeout(a);
    }), {
      get() {
        return n(), o;
      },
      set(l) {
        o = l, r(), clearTimeout(a), a = s();
      }
    };
  });
}
function wl(e, t = 200, n = {}) {
  return _u(
    Eu(t, n),
    e
  );
}
function xl(e, t, n = {}) {
  const {
    immediate: r = true
  } = n, o = ref(false);
  let a = null;
  function s() {
    a && (clearTimeout(a), a = null);
  }
  function l() {
    o.value = false, s();
  }
  function i(...u) {
    s(), o.value = true, a = setTimeout(() => {
      o.value = false, a = null, e(...u);
    }, ut(t));
  }
  return r && (o.value = true, jn), Hn(l), {
    isPending: readonly(o),
    start: i,
    stop: l
  };
}
function xu(e, t, n) {
  const r = watch(e, (...o) => (nextTick(() => r()), t(...o)), n);
  return r;
}
function Ht(e) {
  var t;
  const n = ut(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Lo = void 0;
function eo(...e) {
  let t, n, r, o;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, r, o] = e, t = Lo) : [t, n, r, o] = e, !t)
    return Zr;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const a = [], s = () => {
    a.forEach((c) => c()), a.length = 0;
  }, l = (c, d, f, m) => (c.addEventListener(d, f, m), () => c.removeEventListener(d, f, m)), i = watch(
    () => [Ht(t), ut(o)],
    ([c, d]) => {
      if (s(), !c)
        return;
      const f = yu(d) ? { ...d } : d;
      a.push(
        ...n.flatMap((m) => r.map((g) => l(c, m, g, f)))
      );
    },
    { immediate: true, flush: "post" }
  ), u = () => {
    i(), s();
  };
  return Hn(u), u;
}
function Cu(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => true;
}
function Tu(...e) {
  let t, n, r = {};
  e.length === 3 ? (t = e[0], n = e[1], r = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = true, n = e[0], r = e[1]) : (t = e[0], n = e[1]) : (t = true, n = e[0]);
  const {
    target: o = Lo,
    eventName: a = "keydown",
    passive: s = false,
    dedupe: l = false
  } = r, i = Cu(t);
  return eo(o, a, (u) => {
    u.repeat && ut(l) || i(u) && n(u);
  }, s);
}
function Cl() {
  const e = ref(false), t = getCurrentInstance();
  return t && onMounted(() => {
    e.value = true;
  }, t), e;
}
function ku(e) {
  const t = Cl();
  return computed(() => (t.value, !!e()));
}
function Nu(e) {
  return JSON.parse(JSON.stringify(e));
}
function cn(e, t, n = {}) {
  const { window: r = Lo, ...o } = n;
  let a;
  const s = ku(() => r && "ResizeObserver" in r), l = () => {
    a && (a.disconnect(), a = void 0);
  }, i = computed(() => Array.isArray(e) ? e.map((d) => Ht(d)) : [Ht(e)]), u = watch(
    i,
    (d) => {
      if (l(), s.value && r) {
        a = new ResizeObserver(t);
        for (const f of d)
          f && a.observe(f, o);
      }
    },
    { immediate: true, flush: "post" }
  ), c = () => {
    l(), u();
  };
  return Hn(c), {
    isSupported: s,
    stop: c
  };
}
function wr(e, t, n, r = {}) {
  var o, a, s;
  const {
    clone: l = false,
    passive: i = false,
    eventName: u,
    deep: c = false,
    defaultValue: d,
    shouldEmit: f
  } = r, m = getCurrentInstance(), g = n || (m == null ? void 0 : m.emit) || ((o = m == null ? void 0 : m.$emit) == null ? void 0 : o.bind(m)) || ((s = (a = m == null ? void 0 : m.proxy) == null ? void 0 : a.$emit) == null ? void 0 : s.bind(m == null ? void 0 : m.proxy));
  let h2 = u;
  t || (t = "modelValue"), h2 = h2 || `update:${t.toString()}`;
  const b = (_) => l ? typeof l == "function" ? l(_) : Nu(_) : _, p = () => hu(e[t]) ? b(e[t]) : d, y = (_) => {
    f ? f(_) && g(h2, _) : g(h2, _);
  };
  if (i) {
    const _ = p(), E = ref(_);
    let C = false;
    return watch(
      () => e[t],
      (S) => {
        C || (C = true, E.value = b(S), nextTick(() => C = false));
      }
    ), watch(
      E,
      (S) => {
        !C && (S !== e[t] || c) && y(S);
      },
      { deep: c }
    ), E;
  } else
    return computed({
      get() {
        return p();
      },
      set(_) {
        y(_);
      }
    });
}
function Ao(e) {
  return e ? e.flatMap((t) => t.type === Fragment ? Ao(t.children) : [t]) : [];
}
const [Oo, lg] = Ge("ConfigProvider");
function xr(e) {
  const t = Oo({
    dir: ref("ltr")
  });
  return computed(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.dir) == null ? void 0 : n.value) || "ltr";
  });
}
function Su(e) {
  const t = getCurrentInstance(), n = t == null ? void 0 : t.type.emits, r = {};
  return n != null && n.length || console.warn(
    `No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`
  ), n == null || n.forEach((o) => {
    r[toHandlerKey(camelize(o))] = (...a) => e(o, ...a);
  }), r;
}
function Io(e) {
  var _a2;
  const t = getCurrentInstance(), n = Object.keys((_a2 = t == null ? void 0 : t.type.props) != null ? _a2 : {}).reduce((o, a) => {
    const s = (t == null ? void 0 : t.type.props[a]).default;
    return s !== void 0 && (o[a] = s), o;
  }, {}), r = toRef(e);
  return computed(() => {
    var _a3;
    const o = {}, a = (_a3 = t == null ? void 0 : t.vnode.props) != null ? _a3 : {};
    return Object.keys(a).forEach((s) => {
      o[camelize(s)] = a[s];
    }), Object.keys({ ...n, ...o }).reduce((s, l) => (r.value[l] !== void 0 && (s[l] = r.value[l]), s), {});
  });
}
function Xt(e, t) {
  const n = Io(e), r = t ? Su(t) : {};
  return computed(() => ({
    ...n.value,
    ...r
  }));
}
function ue() {
  const e = getCurrentInstance(), t = ref(), n = computed(() => {
    var s, l;
    return ["#text", "#comment"].includes((s = t.value) == null ? void 0 : s.$el.nodeName) ? (l = t.value) == null ? void 0 : l.$el.nextElementSibling : Ht(t);
  }), r = Object.assign({}, e.exposed), o = {};
  for (const s in e.props)
    Object.defineProperty(o, s, {
      enumerable: true,
      configurable: true,
      get: () => e.props[s]
    });
  if (Object.keys(r).length > 0)
    for (const s in r)
      Object.defineProperty(o, s, {
        enumerable: true,
        configurable: true,
        get: () => r[s]
      });
  Object.defineProperty(o, "$el", {
    enumerable: true,
    configurable: true,
    get: () => e.vnode.el
  }), e.exposed = o;
  function a(s) {
    t.value = s, !(s instanceof Element || !s) && (Object.defineProperty(o, "$el", {
      enumerable: true,
      configurable: true,
      get: () => s.$el
    }), e.exposed = o);
  }
  return { forwardRef: a, currentRef: t, currentElement: n };
}
function Lu(e, t) {
  const n = wu(false, 300), r = ref(null), o = vu();
  function a() {
    r.value = null, n.value = false;
  }
  function s(l, i) {
    const u = l.currentTarget, c = { x: l.clientX, y: l.clientY }, d = Au(c, u.getBoundingClientRect()), f = Ou(c, d), m = Iu(i.getBoundingClientRect()), g = Du([...f, ...m]);
    r.value = g, n.value = true;
  }
  return watchEffect((l) => {
    if (e.value && t.value) {
      const i = (c) => s(c, t.value), u = (c) => s(c, e.value);
      e.value.addEventListener("pointerleave", i), t.value.addEventListener("pointerleave", u), l(() => {
        var c, d;
        (c = e.value) == null || c.removeEventListener("pointerleave", i), (d = t.value) == null || d.removeEventListener("pointerleave", u);
      });
    }
  }), watchEffect((l) => {
    var i;
    if (r.value) {
      const u = (c) => {
        var d, f;
        if (!r.value)
          return;
        const m = c.target, g = { x: c.clientX, y: c.clientY }, h2 = ((d = e.value) == null ? void 0 : d.contains(m)) || ((f = t.value) == null ? void 0 : f.contains(m)), b = !Pu(g, r.value), p = m.hasAttribute("data-grace-area-trigger");
        h2 ? a() : (b || p) && (a(), o.trigger());
      };
      (i = e.value) == null || i.ownerDocument.addEventListener("pointermove", u), l(() => {
        var c;
        return (c = e.value) == null ? void 0 : c.ownerDocument.removeEventListener("pointermove", u);
      });
    }
  }), {
    isPointerInTransit: n,
    onPointerExit: o.on
  };
}
function Au(e, t) {
  const n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), o = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
  switch (Math.min(n, r, o, a)) {
    case a:
      return "left";
    case o:
      return "right";
    case n:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function Ou(e, t, n = 5) {
  const r = [];
  switch (t) {
    case "top":
      r.push(
        { x: e.x - n, y: e.y + n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "bottom":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x + n, y: e.y - n }
      );
      break;
    case "left":
      r.push(
        { x: e.x + n, y: e.y - n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "right":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x - n, y: e.y + n }
      );
      break;
  }
  return r;
}
function Iu(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function Pu(e, t) {
  const { x: n, y: r } = e;
  let o = false;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const l = t[a].x, i = t[a].y, u = t[s].x, c = t[s].y;
    i > r != c > r && n < (u - l) * (r - i) / (c - i) + l && (o = !o);
  }
  return o;
}
function Du(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Ru(t);
}
function Ru(e) {
  if (e.length <= 1)
    return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (; t.length >= 2; ) {
      const a = t[t.length - 1], s = t[t.length - 2];
      if ((a.x - s.x) * (o.y - s.y) >= (a.y - s.y) * (o.x - s.x))
        t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    for (; n.length >= 2; ) {
      const a = n[n.length - 1], s = n[n.length - 2];
      if ((a.x - s.x) * (o.y - s.y) >= (a.y - s.y) * (o.x - s.x))
        n.pop();
      else break;
    }
    n.push(o);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
let Mu = 0;
function bn(e, t = "radix") {
  if (e)
    return e;
  const n = Oo({ useId: void 0 });
  return kn$1.useId ? `${t}-${kn$1.useId()}` : n.useId ? `${t}-${n.useId()}` : `${t}-${++Mu}`;
}
function Fu(e) {
  const t = ref(), n = computed(() => {
    var _a2;
    var o;
    return (_a2 = (o = t.value) == null ? void 0 : o.width) != null ? _a2 : 0;
  }), r = computed(() => {
    var _a2;
    var o;
    return (_a2 = (o = t.value) == null ? void 0 : o.height) != null ? _a2 : 0;
  });
  return onMounted(() => {
    const o = Ht(e);
    if (o) {
      t.value = { width: o.offsetWidth, height: o.offsetHeight };
      const a = new ResizeObserver((s) => {
        if (!Array.isArray(s) || !s.length)
          return;
        const l = s[0];
        let i, u;
        if ("borderBoxSize" in l) {
          const c = l.borderBoxSize, d = Array.isArray(c) ? c[0] : c;
          i = d.inlineSize, u = d.blockSize;
        } else
          i = o.offsetWidth, u = o.offsetHeight;
        t.value = { width: i, height: u };
      });
      return a.observe(o, { box: "border-box" }), () => a.unobserve(o);
    } else
      t.value = void 0;
  }), {
    width: n,
    height: r
  };
}
function Tl(e, t) {
  const n = ref(e);
  function r(o) {
    var _a2;
    return (_a2 = t[n.value][o]) != null ? _a2 : n.value;
  }
  return {
    state: n,
    dispatch: (o) => {
      n.value = r(o);
    }
  };
}
const Po = defineComponent({
  name: "PrimitiveSlot",
  inheritAttrs: false,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      var r, o;
      if (!n.default)
        return null;
      const a = Ao(n.default()), s = a.findIndex((c) => c.type !== Comment);
      if (s === -1)
        return a;
      const l = a[s];
      (r = l.props) == null || delete r.ref;
      const i = l.props ? mergeProps(t, l.props) : t;
      t.class && (o = l.props) != null && o.class && delete l.props.class;
      const u = cloneVNode(l, i);
      for (const c in i)
        c.startsWith("on") && (u.props || (u.props = {}), u.props[c] = i[c]);
      return a.length === 1 ? u : (a[s] = u, a);
    };
  }
}), be = defineComponent({
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
    const r = e.asChild ? "template" : e.as;
    return typeof r == "string" && ["area", "img", "input"].includes(r) ? () => h$1(r, t) : r !== "template" ? () => h$1(e.as, t, { default: n.default }) : () => h$1(Po, t, { default: n.default });
  }
});
function Do() {
  const e = ref(), t = computed(() => {
    var n, r;
    return ["#text", "#comment"].includes((n = e.value) == null ? void 0 : n.$el.nodeName) ? (r = e.value) == null ? void 0 : r.$el.nextElementSibling : Ht(e);
  });
  return {
    primitiveElement: e,
    currentElement: t
  };
}
function $u(e, t) {
  const n = ref({}), r = ref("none"), o = e.value ? "mounted" : "unmounted", { state: a, dispatch: s } = Tl(o, {
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
  }), l = (f) => {
  };
  watch(
    e,
    async (f, m) => {
      var g;
      const h2 = m !== f;
      if (await nextTick(), h2) {
        const b = r.value, p = qn(t.value);
        f ? (s("MOUNT"), p === "none" && l()) : p === "none" || ((g = n.value) == null ? void 0 : g.display) === "none" ? (s("UNMOUNT"), l()) : m && b !== p ? (s("ANIMATION_OUT"), l()) : (s("UNMOUNT"), l());
      }
    },
    { immediate: true }
  );
  const i = (f) => {
    const m = qn(t.value), g = m.includes(
      f.animationName
    );
    a.value === "mounted" ? "enter" : "leave";
    f.target === t.value && g && s("ANIMATION_END"), f.target === t.value && m === "none" && s("ANIMATION_END");
  }, u = (f) => {
    f.target === t.value && (r.value = qn(t.value));
  }, c = watch(
    t,
    (f, m) => {
      f ? (n.value = getComputedStyle(f), f.addEventListener("animationstart", u), f.addEventListener("animationcancel", i), f.addEventListener("animationend", i)) : (s("ANIMATION_END"), m == null || m.removeEventListener("animationstart", u), m == null || m.removeEventListener("animationcancel", i), m == null || m.removeEventListener("animationend", i));
    },
    { immediate: true }
  ), d = watch(a, () => {
    const f = qn(t.value);
    r.value = a.value === "mounted" ? f : "none";
  });
  return onUnmounted(() => {
    c(), d();
  }), {
    isPresent: computed(
      () => ["mounted", "unmountSuspended"].includes(a.value)
    )
  };
}
function qn(e) {
  return e && getComputedStyle(e).animationName || "none";
}
const Gn = defineComponent({
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
    var r;
    const { present: o, forceMount: a } = toRefs(e), s = ref(), { isPresent: l } = $u(o, s);
    n({ present: l });
    let i = t.default({ present: l });
    i = Ao(i || []);
    const u = getCurrentInstance();
    if (i && (i == null ? void 0 : i.length) > 1) {
      const c = (r = u == null ? void 0 : u.parent) != null && r.type.name ? `<${u.parent.type.name} />` : "component";
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
    return () => a.value || o.value || l.value ? h$1(t.default({ present: l })[0], {
      ref: (c) => {
        const d = Ht(c);
        return typeof (d == null ? void 0 : d.hasAttribute) > "u" || (d != null && d.hasAttribute("data-radix-popper-content-wrapper") ? s.value = d.firstElementChild : s.value = d), d;
      }
    }) : null;
  }
}), zu = /* @__PURE__ */ defineComponent({
  __name: "Teleport",
  props: {
    to: { default: "body" },
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Cl();
    return (n, r) => unref(t) || n.forceMount ? (openBlock(), createBlock(Teleport, {
      key: 0,
      to: n.to,
      disabled: n.disabled
    }, [
      renderSlot(n.$slots, "default")
    ], 8, ["to", "disabled"])) : createCommentVNode("", true);
  }
});
function Uu(e, t) {
  var _a2;
  var n;
  (_a2 = (n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) != null ? _a2 : globalThis == null ? void 0 : globalThis.document;
  const o = ref(false);
  ref(() => {
  });
  return watchEffect((s) => {
    return;
  }), {
    onPointerDownCapture: () => o.value = true
  };
}
function Wu(e, t) {
  var _a2;
  var n;
  (_a2 = (n = t == null ? void 0 : t.value) == null ? void 0 : n.ownerDocument) != null ? _a2 : globalThis == null ? void 0 : globalThis.document;
  const o = ref(false);
  return watchEffect((a) => {
    return;
  }), {
    onFocusCapture: () => o.value = true,
    onBlurCapture: () => o.value = false
  };
}
const at = reactive({
  layersRoot: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Hu = /* @__PURE__ */ defineComponent({
  __name: "DismissableLayer",
  props: {
    disableOutsidePointerEvents: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "dismiss"],
  setup(e, { emit: t }) {
    const n = e, r = t, { forwardRef: o, currentElement: a } = ue(), s = computed(
      () => {
        var _a2;
        var g;
        return (_a2 = (g = a.value) == null ? void 0 : g.ownerDocument) != null ? _a2 : globalThis.document;
      }
    ), l = computed(() => at.layersRoot), i = computed(() => a.value ? Array.from(l.value).indexOf(a.value) : -1), u = computed(() => at.layersWithOutsidePointerEventsDisabled.size > 0), c = computed(() => {
      const g = Array.from(l.value), [h2] = [...at.layersWithOutsidePointerEventsDisabled].slice(-1), b = g.indexOf(h2);
      return i.value >= b;
    }), d = Uu(async (g) => {
      const h2 = [...at.branches].some(
        (b) => b == null ? void 0 : b.contains(g.target)
      );
      !c.value || h2 || (r("pointerDownOutside", g), r("interactOutside", g), await nextTick(), g.defaultPrevented || r("dismiss"));
    }, a), f = Wu((g) => {
      [...at.branches].some(
        (h2) => h2 == null ? void 0 : h2.contains(g.target)
      ) || (r("focusOutside", g), r("interactOutside", g), g.defaultPrevented || r("dismiss"));
    }, a);
    Tu("Escape", (g) => {
      i.value === l.value.size - 1 && (r("escapeKeyDown", g), g.defaultPrevented || r("dismiss"));
    });
    let m;
    return watchEffect((g) => {
      a.value && (n.disableOutsidePointerEvents && (at.layersWithOutsidePointerEventsDisabled.size === 0 && (m = s.value.body.style.pointerEvents, s.value.body.style.pointerEvents = "none"), at.layersWithOutsidePointerEventsDisabled.add(a.value)), l.value.add(a.value), g(() => {
        n.disableOutsidePointerEvents && at.layersWithOutsidePointerEventsDisabled.size === 1 && (s.value.body.style.pointerEvents = m);
      }));
    }), watchEffect((g) => {
      g(() => {
        a.value && (l.value.delete(a.value), at.layersWithOutsidePointerEventsDisabled.delete(a.value));
      });
    }), (g, h2) => (openBlock(), createBlock(unref(be), {
      ref: unref(o),
      "as-child": g.asChild,
      as: g.as,
      "data-dismissable-layer": "",
      style: normalizeStyle({
        pointerEvents: u.value ? c.value ? "auto" : "none" : void 0
      }),
      onFocusCapture: unref(f).onFocusCapture,
      onBlurCapture: unref(f).onBlurCapture,
      onPointerdownCapture: unref(d).onPointerDownCapture
    }, {
      default: withCtx(() => [
        renderSlot(g.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "style", "onFocusCapture", "onBlurCapture", "onPointerdownCapture"]));
  }
});
gu(() => ref([]));
const [Nl, ju] = Ge("PopperRoot"), Gu = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "PopperRoot",
  setup(e) {
    const t = ref();
    return ju({
      anchor: t,
      onAnchorChange: (n) => t.value = n
    }), (n, r) => renderSlot(n.$slots, "default");
  }
}), Ku = /* @__PURE__ */ defineComponent({
  __name: "PopperAnchor",
  props: {
    element: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { forwardRef: n, currentElement: r } = ue(), o = Nl();
    return watchEffect(() => {
      var _a2;
      o.onAnchorChange((_a2 = t.element) != null ? _a2 : r.value);
    }), (a, s) => (openBlock(), createBlock(unref(be), {
      ref: unref(n),
      as: a.as,
      "as-child": a.asChild
    }, {
      default: withCtx(() => [
        renderSlot(a.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
});
function Yu(e) {
  return e !== null;
}
function Xu(e) {
  return {
    name: "transformOrigin",
    options: e,
    fn(t) {
      var _a2, _b;
      var n, r, o;
      const { placement: a, rects: s, middlewareData: l } = t, i = ((n = l.arrow) == null ? void 0 : n.centerOffset) !== 0, u = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [d, f] = to(a), m = { start: "0%", center: "50%", end: "100%" }[f], g = ((_a2 = (r = l.arrow) == null ? void 0 : r.x) != null ? _a2 : 0) + u / 2, h2 = ((_b = (o = l.arrow) == null ? void 0 : o.y) != null ? _b : 0) + c / 2;
      let b = "", p = "";
      return d === "bottom" ? (b = i ? m : `${g}px`, p = `${-c}px`) : d === "top" ? (b = i ? m : `${g}px`, p = `${s.floating.height + c}px`) : d === "right" ? (b = `${-c}px`, p = i ? m : `${h2}px`) : d === "left" && (b = `${s.floating.width + c}px`, p = i ? m : `${h2}px`), { data: { x: b, y: p } };
    }
  };
}
function to(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
const qu = {
  side: "bottom",
  sideOffset: 0,
  align: "center",
  alignOffset: 0,
  arrowPadding: 0,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: "partial",
  hideWhenDetached: false,
  updatePositionStrategy: "optimized",
  prioritizePosition: false
}, [sg, Ju] = Ge("PopperContent"), Qu = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "PopperContent",
  props: /* @__PURE__ */ mergeDefaults({
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    updatePositionStrategy: {},
    prioritizePosition: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  }, {
    ...qu
  }),
  emits: ["placed"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = Nl(), { forwardRef: a, currentElement: s } = ue(), l = ref(), i = ref(), { width: u, height: c } = Fu(i), d = computed(
      () => n.side + (n.align !== "center" ? `-${n.align}` : "")
    ), f = computed(() => typeof n.collisionPadding == "number" ? n.collisionPadding : { top: 0, right: 0, bottom: 0, left: 0, ...n.collisionPadding }), m = computed(() => Array.isArray(n.collisionBoundary) ? n.collisionBoundary : [n.collisionBoundary]), g = computed(() => ({
      padding: f.value,
      boundary: m.value.filter(Yu),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: m.value.length > 0
    })), h2 = mu(() => [
      nu({
        mainAxis: n.sideOffset + c.value,
        alignmentAxis: n.alignOffset
      }),
      n.prioritizePosition && n.avoidCollisions && pa({
        ...g.value
      }),
      n.avoidCollisions && ru({
        mainAxis: true,
        crossAxis: !!n.prioritizePosition,
        limiter: n.sticky === "partial" ? su() : void 0,
        ...g.value
      }),
      !n.prioritizePosition && n.avoidCollisions && pa({
        ...g.value
      }),
      ou({
        ...g.value,
        apply: ({ elements: F, rects: q, availableWidth: U, availableHeight: ve }) => {
          const { width: ne, height: ie } = q.reference, D = F.floating.style;
          D.setProperty(
            "--radix-popper-available-width",
            `${U}px`
          ), D.setProperty(
            "--radix-popper-available-height",
            `${ve}px`
          ), D.setProperty(
            "--radix-popper-anchor-width",
            `${ne}px`
          ), D.setProperty(
            "--radix-popper-anchor-height",
            `${ie}px`
          );
        }
      }),
      i.value && cu({ element: i.value, padding: n.arrowPadding }),
      Xu({
        arrowWidth: u.value,
        arrowHeight: c.value
      }),
      n.hideWhenDetached && au({ strategy: "referenceHidden", ...g.value })
    ]), { floatingStyles: b, placement: p, isPositioned: y, middlewareData: _ } = du(
      o.anchor,
      l,
      {
        strategy: "fixed",
        placement: d,
        whileElementsMounted: (...F) => tu(...F, {
          animationFrame: n.updatePositionStrategy === "always"
        }),
        middleware: h2
      }
    ), E = computed(
      () => to(p.value)[0]
    ), C = computed(
      () => to(p.value)[1]
    );
    watchPostEffect(() => {
      y.value && r("placed");
    });
    const S = computed(
      () => {
        var F;
        return ((F = _.value.arrow) == null ? void 0 : F.centerOffset) !== 0;
      }
    ), T = ref("");
    watchEffect(() => {
      s.value && (T.value = (void 0).getComputedStyle(s.value).zIndex);
    });
    const V = computed(() => {
      var _a2;
      var F;
      return (_a2 = (F = _.value.arrow) == null ? void 0 : F.x) != null ? _a2 : 0;
    }), G = computed(() => {
      var _a2;
      var F;
      return (_a2 = (F = _.value.arrow) == null ? void 0 : F.y) != null ? _a2 : 0;
    });
    return Ju({
      placedSide: E,
      onArrowChange: (F) => i.value = F,
      arrowX: V,
      arrowY: G,
      shouldHideArrow: S
    }), (F, q) => {
      var U, ve, ne;
      return openBlock(), createElementBlock("div", {
        ref_key: "floatingRef",
        ref: l,
        "data-radix-popper-content-wrapper": "",
        style: normalizeStyle({
          ...unref(b),
          transform: unref(y) ? unref(b).transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: T.value,
          "--radix-popper-transform-origin": [
            (U = unref(_).transformOrigin) == null ? void 0 : U.x,
            (ve = unref(_).transformOrigin) == null ? void 0 : ve.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((ne = unref(_).hide) == null ? void 0 : ne.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        })
      }, [
        createVNode(unref(be), mergeProps({ ref: unref(a) }, F.$attrs, {
          "as-child": n.asChild,
          as: F.as,
          "data-side": E.value,
          "data-align": C.value,
          style: {
            // if the PopperContent hasn't been placed yet (not all measurements done)
            // we prevent animations so that users's animation don't kick in too early referring wrong sides
            animation: unref(y) ? void 0 : "none"
          }
        }), {
          default: withCtx(() => [
            renderSlot(F.$slots, "default")
          ]),
          _: 3
        }, 16, ["as-child", "as", "data-side", "data-align", "style"])
      ], 4);
    };
  }
}), Zu = /* @__PURE__ */ defineComponent({
  __name: "VisuallyHidden",
  props: {
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    return ue(), (t, n) => (openBlock(), createBlock(unref(be), {
      as: t.as,
      "as-child": t.asChild,
      style: {
        // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
        position: "absolute",
        border: 0,
        width: "1px",
        display: "inline-block",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
      }
    }, {
      default: withCtx(() => [
        renderSlot(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), ec = "data-radix-vue-collection-item", [Ro, tc] = Ge("CollectionProvider");
function nc(e = ec) {
  const t = ref(/* @__PURE__ */ new Map()), n = ref(), r = tc({
    collectionRef: n,
    itemMap: t,
    attrName: e
  }), { getItems: o } = Sl(r), a = computed(() => Array.from(r.itemMap.value.values())), s = computed(() => r.itemMap.value.size);
  return { getItems: o, reactiveItems: a, itemMapSize: s };
}
const rc = defineComponent({
  name: "CollectionSlot",
  setup(e, { slots: t }) {
    const n = Ro(), { primitiveElement: r, currentElement: o } = Do();
    return watch(o, () => {
      n.collectionRef.value = o.value;
    }), () => h$1(Po, { ref: r }, t);
  }
}), oc = defineComponent({
  name: "CollectionItem",
  inheritAttrs: false,
  props: {
    value: {
      // It accepts any value
      validator: () => true
    }
  },
  setup(e, { slots: t, attrs: n }) {
    const r = Ro(), { primitiveElement: o, currentElement: a } = Do();
    return watchEffect((s) => {
      if (a.value) {
        const l = markRaw(a.value);
        r.itemMap.value.set(l, { ref: a.value, value: e.value }), s(() => r.itemMap.value.delete(l));
      }
    }), () => h$1(Po, { ...n, [r.attrName]: "", ref: o }, t);
  }
});
function Sl(e) {
  const t = e != null ? e : Ro();
  return { getItems: () => {
    const n = t.collectionRef.value;
    if (!n)
      return [];
    const r = Array.from(n.querySelectorAll(`[${t.attrName}]`));
    return Array.from(t.itemMap.value.values()).sort(
      (o, a) => r.indexOf(o.ref) - r.indexOf(a.ref)
    );
  } };
}
function ac(e) {
  const t = Oo({
    nonce: ref()
  });
  return computed(() => {
    var n;
    return (e == null ? void 0 : e.value) || ((n = t.nonce) == null ? void 0 : n.value);
  });
}
const lc = "rovingFocusGroup.onEntryFocus", sc = { bubbles: false, cancelable: true }, ic = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function uc(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function cc(e, t, n) {
  const r = uc(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return ic[r];
}
function Ll(e, t = false, n) {
  var _a2;
  const r = (_a2 = n == null ? void 0 : n.activeElement) != null ? _a2 : (void 0).activeElement;
  for (const o of e)
    if (o === r || (o.focus({ preventScroll: t }), (void 0).activeElement !== r))
      return;
}
function dc(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
const [fc, pc] = Ge("RovingFocusGroup"), mc = /* @__PURE__ */ defineComponent({
  __name: "RovingFocusGroup",
  props: {
    orientation: { default: void 0 },
    dir: {},
    loop: { type: Boolean, default: false },
    currentTabStopId: {},
    defaultCurrentTabStopId: {},
    preventScrollOnEntryFocus: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["entryFocus", "update:currentTabStopId"],
  setup(e, { expose: t, emit: n }) {
    const r = e, o = n, { loop: a, orientation: s, dir: l } = toRefs(r), i = xr(l), u = wr(r, "currentTabStopId", o, {
      defaultValue: r.defaultCurrentTabStopId,
      passive: r.currentTabStopId === void 0
    }), c = ref(false), d = ref(false), f = ref(0), { getItems: m } = nc();
    function g(b) {
      const p = !d.value;
      if (b.currentTarget && b.target === b.currentTarget && p && !c.value) {
        const y = new CustomEvent(lc, sc);
        if (b.currentTarget.dispatchEvent(y), o("entryFocus", y), !y.defaultPrevented) {
          const _ = m().map((T) => T.ref).filter((T) => T.dataset.disabled !== ""), E = _.find((T) => T.getAttribute("data-active") === "true"), C = _.find(
            (T) => T.id === u.value
          ), S = [E, C, ..._].filter(
            Boolean
          );
          Ll(S, r.preventScrollOnEntryFocus);
        }
      }
      d.value = false;
    }
    function h2() {
      setTimeout(() => {
        d.value = false;
      }, 1);
    }
    return t({
      getItems: m
    }), pc({
      loop: a,
      dir: i,
      orientation: s,
      currentTabStopId: u,
      onItemFocus: (b) => {
        u.value = b;
      },
      onItemShiftTab: () => {
        c.value = true;
      },
      onFocusableItemAdd: () => {
        f.value++;
      },
      onFocusableItemRemove: () => {
        f.value--;
      }
    }), (b, p) => (openBlock(), createBlock(unref(rc), null, {
      default: withCtx(() => [
        createVNode(unref(be), {
          tabindex: c.value || f.value === 0 ? -1 : 0,
          "data-orientation": unref(s),
          as: b.as,
          "as-child": b.asChild,
          dir: unref(i),
          style: { outline: "none" },
          onMousedown: p[0] || (p[0] = (y) => d.value = true),
          onMouseup: h2,
          onFocus: g,
          onBlur: p[1] || (p[1] = (y) => c.value = false)
        }, {
          default: withCtx(() => [
            renderSlot(b.$slots, "default")
          ]),
          _: 3
        }, 8, ["tabindex", "data-orientation", "as", "as-child", "dir"])
      ]),
      _: 3
    }));
  }
}), vc = /* @__PURE__ */ defineComponent({
  __name: "RovingFocusItem",
  props: {
    tabStopId: {},
    focusable: { type: Boolean, default: true },
    active: { type: Boolean, default: true },
    allowShiftKey: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "span" }
  },
  setup(e) {
    const t = e, n = fc(), r = computed(() => t.tabStopId || bn()), o = computed(
      () => n.currentTabStopId.value === r.value
    ), { getItems: a } = Sl(), { primitiveElement: s, currentElement: l } = Do(), i = computed(() => {
      var c;
      return (c = l.value) == null ? void 0 : c.getRootNode();
    });
    onMounted(() => {
      t.focusable && n.onFocusableItemAdd();
    }), onUnmounted(() => {
      t.focusable && n.onFocusableItemRemove();
    });
    function u(c) {
      if (c.key === "Tab" && c.shiftKey) {
        n.onItemShiftTab();
        return;
      }
      if (c.target !== c.currentTarget)
        return;
      const d = cc(
        c,
        n.orientation.value,
        n.dir.value
      );
      if (d !== void 0) {
        if (c.metaKey || c.ctrlKey || c.altKey || !t.allowShiftKey && c.shiftKey)
          return;
        c.preventDefault();
        let f = [...a().map((m) => m.ref).filter((m) => m.dataset.disabled !== "")];
        if (d === "last")
          f.reverse();
        else if (d === "prev" || d === "next") {
          d === "prev" && f.reverse();
          const m = f.indexOf(
            c.currentTarget
          );
          f = n.loop.value ? dc(f, m + 1) : f.slice(m + 1);
        }
        nextTick(() => Ll(f, false, i.value));
      }
    }
    return (c, d) => (openBlock(), createBlock(unref(oc), null, {
      default: withCtx(() => [
        createVNode(unref(be), {
          ref_key: "primitiveElement",
          ref: s,
          tabindex: o.value ? 0 : -1,
          "data-orientation": unref(n).orientation.value,
          "data-active": c.active,
          "data-disabled": c.focusable ? void 0 : "",
          as: c.as,
          "as-child": c.asChild,
          onMousedown: d[0] || (d[0] = (f) => {
            c.focusable ? unref(n).onItemFocus(r.value) : f.preventDefault();
          }),
          onFocus: d[1] || (d[1] = (f) => unref(n).onItemFocus(r.value)),
          onKeydown: u
        }, {
          default: withCtx(() => [
            renderSlot(c.$slots, "default")
          ]),
          _: 3
        }, 8, ["tabindex", "data-orientation", "data-active", "data-disabled", "as", "as-child"])
      ]),
      _: 3
    }));
  }
}), [Ke, gc] = Ge("ScrollAreaRoot"), hc = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaRoot",
  props: {
    type: { default: "hover" },
    dir: {},
    scrollHideDelay: { default: 600 },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e, { expose: t }) {
    const n = e, r = ref(0), o = ref(0), a = ref(), s = ref(), l = ref(), i = ref(), u = ref(false), c = ref(false), { type: d, dir: f, scrollHideDelay: m } = toRefs(n), g = xr(f);
    function h2() {
      var _;
      (_ = a.value) == null || _.scrollTo({
        top: 0
      });
    }
    function b() {
      var _;
      (_ = a.value) == null || _.scrollTo({
        top: 0,
        left: 0
      });
    }
    t({
      /** Viewport element within ScrollArea */
      viewport: a,
      /** Scroll viewport to top */
      scrollTop: h2,
      /** Scroll viewport to top-left */
      scrollTopLeft: b
    });
    const { forwardRef: p, currentElement: y } = ue();
    return gc({
      type: d,
      dir: g,
      scrollHideDelay: m,
      scrollArea: y,
      viewport: a,
      onViewportChange: (_) => {
        a.value = _ || void 0;
      },
      content: s,
      onContentChange: (_) => {
        s.value = _;
      },
      scrollbarX: l,
      scrollbarXEnabled: u,
      scrollbarY: i,
      scrollbarYEnabled: c,
      onScrollbarXChange: (_) => {
        l.value = _ || void 0;
      },
      onScrollbarYChange: (_) => {
        i.value = _ || void 0;
      },
      onScrollbarXEnabledChange: (_) => {
        u.value = _;
      },
      onScrollbarYEnabledChange: (_) => {
        c.value = _;
      },
      onCornerWidthChange: (_) => {
        r.value = _;
      },
      onCornerHeightChange: (_) => {
        o.value = _;
      }
    }), (_, E) => (openBlock(), createBlock(unref(be), {
      ref: unref(p),
      "as-child": n.asChild,
      as: _.as,
      dir: unref(g),
      style: normalizeStyle({
        position: "relative",
        // Pass corner sizes as CSS vars to reduce re-renders of context consumers
        "--radix-scroll-area-corner-width": `${r.value}px`,
        "--radix-scroll-area-corner-height": `${o.value}px`
      })
    }, {
      default: withCtx(() => [
        renderSlot(_.$slots, "default")
      ]),
      _: 3
    }, 8, ["as-child", "as", "dir", "style"]));
  }
}), bc = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "ScrollAreaViewport",
  props: {
    nonce: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(e, { expose: t }) {
    const n = e, { nonce: r } = toRefs(n), o = ac(r), a = Ke(), s = ref();
    onMounted(() => {
      a.onViewportChange(s.value), a.onContentChange(i.value);
    }), t({
      viewportElement: s
    });
    const { forwardRef: l, currentElement: i } = ue();
    return (u, c) => (openBlock(), createElementBlock(Fragment, null, [
      createElementVNode("div", mergeProps({
        ref_key: "viewportElement",
        ref: s,
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
        createVNode(unref(be), {
          ref: unref(l),
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
      createVNode(unref(be), {
        as: "style",
        nonce: unref(o)
      }, {
        default: withCtx(() => [
          createTextVNode(" /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-radix-scroll-area-viewport] { scrollbar-width:none; -ms-overflow-style:none; -webkit-overflow-scrolling:touch; } [data-radix-scroll-area-viewport]::-webkit-scrollbar { display:none; } ")
        ]),
        _: 1
      }, 8, ["nonce"])
    ], 64));
  }
});
function Al(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1])
      return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function Cr(e) {
  const t = Ol(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function Ol(e, t) {
  const n = e / t;
  return Number.isNaN(n) ? 0 : n;
}
function yc(e, t = () => {
}) {
  let n = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return function o() {
    const a = { left: e.scrollLeft, top: e.scrollTop }, s = n.left !== a.left, l = n.top !== a.top;
    (s || l) && t(), n = a, r = (void 0).requestAnimationFrame(o);
  }(), () => (void 0).cancelAnimationFrame(r);
}
function va(e, t, n = "ltr") {
  const r = Cr(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - o, s = t.content - t.viewport, l = a - r, i = n === "ltr" ? [0, s] : [s * -1, 0], u = fu(
    e,
    i[0],
    i[1]
  );
  return Al([0, s], [0, l])(u);
}
function Jn(e) {
  return e ? Number.parseInt(e, 10) : 0;
}
function _c(e, t, n, r = "ltr") {
  const o = Cr(n), a = o / 2, s = t || a, l = o - s, i = n.scrollbar.paddingStart + s, u = n.scrollbar.size - n.scrollbar.paddingEnd - l, c = n.content - n.viewport, d = r === "ltr" ? [0, c] : [c * -1, 0];
  return Al(
    [i, u],
    d
  )(e);
}
function ga(e, t) {
  return e > 0 && e < t;
}
const Il = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarImpl",
  props: {
    isHorizontal: { type: Boolean }
  },
  emits: ["onDragScroll", "onWheelScroll", "onThumbPointerDown"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = Ke(), a = Tr(), s = kr(), { forwardRef: l, currentElement: i } = ue(), u = ref(""), c = ref();
    function d(p) {
      var y, _;
      if (c.value) {
        const E = p.clientX - ((y = c.value) == null ? void 0 : y.left), C = p.clientY - ((_ = c.value) == null ? void 0 : _.top);
        r("onDragScroll", { x: E, y: C });
      }
    }
    function f(p) {
      p.button === 0 && (p.target.setPointerCapture(p.pointerId), c.value = i.value.getBoundingClientRect(), u.value = (void 0).body.style.webkitUserSelect, (void 0).body.style.webkitUserSelect = "none", o.viewport && (o.viewport.value.style.scrollBehavior = "auto"), d(p));
    }
    function m(p) {
      d(p);
    }
    function g(p) {
      const y = p.target;
      y.hasPointerCapture(p.pointerId) && y.releasePointerCapture(p.pointerId), (void 0).body.style.webkitUserSelect = u.value, o.viewport && (o.viewport.value.style.scrollBehavior = ""), c.value = void 0;
    }
    function h2(p) {
      var y;
      const _ = p.target, E = (y = i.value) == null ? void 0 : y.contains(_), C = a.sizes.value.content - a.sizes.value.viewport;
      E && a.handleWheelScroll(p, C);
    }
    onMounted(() => {
      (void 0).addEventListener("wheel", h2, { passive: false });
    }), onUnmounted(() => {
      (void 0).removeEventListener("wheel", h2);
    });
    function b() {
      var _a2, _b, _c2, _d2, _e, _f2;
      var p, y, _, E, C;
      i.value && (n.isHorizontal ? a.handleSizeChange({
        content: (_a2 = (p = o.viewport.value) == null ? void 0 : p.scrollWidth) != null ? _a2 : 0,
        viewport: (_b = (y = o.viewport.value) == null ? void 0 : y.offsetWidth) != null ? _b : 0,
        scrollbar: {
          size: (_c2 = i.value.clientWidth) != null ? _c2 : 0,
          paddingStart: Jn(getComputedStyle(i.value).paddingLeft),
          paddingEnd: Jn(getComputedStyle(i.value).paddingRight)
        }
      }) : a.handleSizeChange({
        content: (_d2 = (_ = o.viewport.value) == null ? void 0 : _.scrollHeight) != null ? _d2 : 0,
        viewport: (_e = (E = o.viewport.value) == null ? void 0 : E.offsetHeight) != null ? _e : 0,
        scrollbar: {
          size: (_f2 = (C = i.value) == null ? void 0 : C.clientHeight) != null ? _f2 : 0,
          paddingStart: Jn(getComputedStyle(i.value).paddingLeft),
          paddingEnd: Jn(getComputedStyle(i.value).paddingRight)
        }
      }));
    }
    return cn(i, b), cn(o.content, b), (p, y) => (openBlock(), createBlock(unref(be), {
      ref: unref(l),
      style: { position: "absolute" },
      "data-scrollbarimpl": "",
      as: unref(s).as.value,
      "as-child": unref(s).asChild.value,
      onPointerdown: f,
      onPointermove: m,
      onPointerup: g
    }, {
      default: withCtx(() => [
        renderSlot(p.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child"]));
  }
}), Ec = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarX",
  setup(e) {
    const t = Ke(), n = Tr(), { forwardRef: r, currentElement: o } = ue();
    onMounted(() => {
      o.value && t.onScrollbarXChange(o.value);
    });
    const a = computed(() => n.sizes.value);
    return (s, l) => (openBlock(), createBlock(Il, {
      ref: unref(r),
      "is-horizontal": true,
      "data-orientation": "horizontal",
      style: normalizeStyle({
        bottom: 0,
        left: unref(t).dir.value === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: unref(t).dir.value === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": a.value ? `${unref(Cr)(a.value)}px` : void 0
      }),
      onOnDragScroll: l[0] || (l[0] = (i) => unref(n).onDragScroll(i.x))
    }, {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["style"]));
  }
}), wc = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarY",
  setup(e) {
    const t = Ke(), n = Tr(), { forwardRef: r, currentElement: o } = ue();
    onMounted(() => {
      o.value && t.onScrollbarYChange(o.value);
    });
    const a = computed(() => n.sizes.value);
    return (s, l) => (openBlock(), createBlock(Il, {
      ref: unref(r),
      "is-horizontal": false,
      "data-orientation": "vertical",
      style: normalizeStyle({
        top: 0,
        right: unref(t).dir.value === "ltr" ? 0 : void 0,
        left: unref(t).dir.value === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": a.value ? `${unref(Cr)(a.value)}px` : void 0
      }),
      onOnDragScroll: l[0] || (l[0] = (i) => unref(n).onDragScroll(i.y))
    }, {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["style"]));
  }
}), [Tr, xc] = Ge("ScrollAreaScrollbarVisible"), Mo = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarVisible",
  setup(e) {
    const t = Ke(), n = kr(), { forwardRef: r } = ue(), o = ref({
      content: 0,
      viewport: 0,
      scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
    }), a = computed(() => {
      const p = Ol(o.value.viewport, o.value.content);
      return p > 0 && p < 1;
    }), s = ref(), l = ref(0);
    function i(p, y) {
      if (m.value) {
        const _ = t.viewport.value.scrollLeft + p.deltaY;
        t.viewport.value.scrollLeft = _, ga(_, y) && p.preventDefault();
      } else {
        const _ = t.viewport.value.scrollTop + p.deltaY;
        t.viewport.value.scrollTop = _, ga(_, y) && p.preventDefault();
      }
    }
    function u(p, y) {
      m.value ? l.value = y.x : l.value = y.y;
    }
    function c(p) {
      l.value = 0;
    }
    function d(p) {
      o.value = p;
    }
    function f(p, y) {
      return _c(
        p,
        l.value,
        o.value,
        y
      );
    }
    const m = computed(
      () => n.isHorizontal.value
    );
    function g(p) {
      m.value ? t.viewport.value.scrollLeft = f(
        p,
        t.dir.value
      ) : t.viewport.value.scrollTop = f(p);
    }
    function h2() {
      if (m.value) {
        if (t.viewport.value && s.value) {
          const p = t.viewport.value.scrollLeft, y = va(
            p,
            o.value,
            t.dir.value
          );
          s.value.style.transform = `translate3d(${y}px, 0, 0)`;
        }
      } else if (t.viewport.value && s.value) {
        const p = t.viewport.value.scrollTop, y = va(p, o.value);
        s.value.style.transform = `translate3d(0, ${y}px, 0)`;
      }
    }
    function b(p) {
      s.value = p;
    }
    return xc({
      sizes: o,
      hasThumb: a,
      handleWheelScroll: i,
      handleThumbDown: u,
      handleThumbUp: c,
      handleSizeChange: d,
      onThumbPositionChange: h2,
      onThumbChange: b,
      onDragScroll: g
    }), (p, y) => m.value ? (openBlock(), createBlock(Ec, mergeProps({ key: 0 }, p.$attrs, { ref: unref(r) }), {
      default: withCtx(() => [
        renderSlot(p.$slots, "default")
      ]),
      _: 3
    }, 16)) : (openBlock(), createBlock(wc, mergeProps({ key: 1 }, p.$attrs, { ref: unref(r) }), {
      default: withCtx(() => [
        renderSlot(p.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Pl = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarAuto",
  props: {
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Ke(), n = kr(), { forwardRef: r } = ue(), o = ref(false), a = wl(() => {
      if (t.viewport.value) {
        const s = t.viewport.value.offsetWidth < t.viewport.value.scrollWidth, l = t.viewport.value.offsetHeight < t.viewport.value.scrollHeight;
        o.value = n.isHorizontal.value ? s : l;
      }
    }, 10);
    return onMounted(() => a()), cn(t.viewport, a), cn(t.content, a), (s, l) => (openBlock(), createBlock(unref(Gn), {
      present: s.forceMount || o.value
    }, {
      default: withCtx(() => [
        createVNode(Mo, mergeProps(s.$attrs, {
          ref: unref(r),
          "data-state": o.value ? "visible" : "hidden"
        }), {
          default: withCtx(() => [
            renderSlot(s.$slots, "default")
          ]),
          _: 3
        }, 16, ["data-state"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), Cc = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "ScrollAreaScrollbarHover",
  props: {
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Ke(), { forwardRef: n } = ue();
    let r;
    const o = ref(false);
    function a() {
      (void 0).clearTimeout(r), o.value = true;
    }
    function s() {
      r = (void 0).setTimeout(() => {
        o.value = false;
      }, t.scrollHideDelay.value);
    }
    return onMounted(() => {
      const l = t.scrollArea.value;
      l && (l.addEventListener("pointerenter", a), l.addEventListener("pointerleave", s));
    }), onUnmounted(() => {
      const l = t.scrollArea.value;
      l && ((void 0).clearTimeout(r), l.removeEventListener("pointerenter", a), l.removeEventListener("pointerleave", s));
    }), (l, i) => (openBlock(), createBlock(unref(Gn), {
      present: l.forceMount || o.value
    }, {
      default: withCtx(() => [
        createVNode(Pl, mergeProps(l.$attrs, {
          ref: unref(n),
          "data-state": o.value ? "visible" : "hidden"
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
}), Tc = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaScrollbarScroll",
  props: {
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = Ke(), n = kr(), { forwardRef: r } = ue(), { state: o, dispatch: a } = Tl("hidden", {
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
    watchEffect((l) => {
      if (o.value === "idle") {
        const i = (void 0).setTimeout(
          () => a("HIDE"),
          t.scrollHideDelay.value
        );
        l(() => {
          (void 0).clearTimeout(i);
        });
      }
    });
    const s = wl(() => a("SCROLL_END"), 100);
    return watchEffect((l) => {
      const i = t.viewport.value, u = n.isHorizontal.value ? "scrollLeft" : "scrollTop";
      if (i) {
        let c = i[u];
        const d = () => {
          const f = i[u];
          c !== f && (a("SCROLL"), s()), c = f;
        };
        i.addEventListener("scroll", d), l(() => {
          i.removeEventListener("scroll", d);
        });
      }
    }), (l, i) => (openBlock(), createBlock(unref(Gn), {
      present: l.forceMount || unref(o) !== "hidden"
    }, {
      default: withCtx(() => [
        createVNode(Mo, mergeProps(l.$attrs, { ref: unref(r) }), {
          default: withCtx(() => [
            renderSlot(l.$slots, "default")
          ]),
          _: 3
        }, 16)
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), [kr, kc] = Ge("ScrollAreaScrollbar"), Nc = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "ScrollAreaScrollbar",
  props: {
    orientation: { default: "vertical" },
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: { default: "div" }
  },
  setup(e) {
    const t = e, { forwardRef: n } = ue(), r = Ke(), o = computed(() => t.orientation === "horizontal");
    watch(
      o,
      () => {
        o.value ? r.onScrollbarXEnabledChange(true) : r.onScrollbarYEnabledChange(true);
      },
      { immediate: true }
    ), onUnmounted(() => {
      r.onScrollbarXEnabledChange(false), r.onScrollbarYEnabledChange(false);
    });
    const { orientation: a, forceMount: s, asChild: l, as: i } = toRefs(t);
    return kc({
      orientation: a,
      forceMount: s,
      isHorizontal: o,
      as: i,
      asChild: l
    }), (u, c) => unref(r).type.value === "hover" ? (openBlock(), createBlock(Cc, mergeProps({ key: 0 }, u.$attrs, {
      ref: unref(n),
      "force-mount": unref(s)
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["force-mount"])) : unref(r).type.value === "scroll" ? (openBlock(), createBlock(Tc, mergeProps({ key: 1 }, u.$attrs, {
      ref: unref(n),
      "force-mount": unref(s)
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["force-mount"])) : unref(r).type.value === "auto" ? (openBlock(), createBlock(Pl, mergeProps({ key: 2 }, u.$attrs, {
      ref: unref(n),
      "force-mount": unref(s)
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16, ["force-mount"])) : unref(r).type.value === "always" ? (openBlock(), createBlock(Mo, mergeProps({ key: 3 }, u.$attrs, {
      ref: unref(n),
      "data-state": "visible"
    }), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16)) : createCommentVNode("", true);
  }
}), Sc = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaThumb",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, n = Ke(), r = Tr();
    function o(f) {
      const m = f.target.getBoundingClientRect(), g = f.clientX - m.left, h2 = f.clientY - m.top;
      r.handleThumbDown(f, { x: g, y: h2 });
    }
    function a(f) {
      r.handleThumbUp(f);
    }
    const { forwardRef: s, currentElement: l } = ue(), i = ref(), u = computed(() => n.viewport.value);
    function c() {
      if (!i.value) {
        const f = yc(
          u.value,
          r.onThumbPositionChange
        );
        i.value = f, r.onThumbPositionChange();
      }
    }
    const d = computed(() => r.sizes.value);
    return xu(d, () => {
      r.onThumbChange(l.value), u.value && (r.onThumbPositionChange(), u.value.addEventListener("scroll", c));
    }), onUnmounted(() => {
      var f;
      u.value.removeEventListener("scroll", c), (f = n.viewport.value) == null || f.removeEventListener("scroll", c);
    }), (f, m) => (openBlock(), createBlock(unref(be), {
      ref: unref(s),
      "data-state": unref(r).hasThumb ? "visible" : "hidden",
      style: {
        width: "var(--radix-scroll-area-thumb-width)",
        height: "var(--radix-scroll-area-thumb-height)"
      },
      "as-child": t.asChild,
      as: f.as,
      onPointerdown: o,
      onPointerup: a
    }, {
      default: withCtx(() => [
        renderSlot(f.$slots, "default")
      ]),
      _: 3
    }, 8, ["data-state", "as-child", "as"]));
  }
}), Lc = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaCornerImpl",
  setup(e) {
    const t = Ke(), n = ref(0), r = ref(0), o = computed(() => !!n.value && !!r.value);
    function a() {
      var l;
      const i = ((l = t.scrollbarX.value) == null ? void 0 : l.offsetHeight) || 0;
      t.onCornerHeightChange(i), r.value = i;
    }
    function s() {
      var l;
      const i = ((l = t.scrollbarY.value) == null ? void 0 : l.offsetWidth) || 0;
      t.onCornerWidthChange(i), n.value = i;
    }
    return cn(t.scrollbarX.value, a), cn(t.scrollbarY.value, s), watch(() => t.scrollbarX.value, a), watch(() => t.scrollbarY.value, s), (l, i) => {
      var u;
      return o.value ? (openBlock(), createBlock(unref(be), mergeProps({
        key: 0,
        style: {
          width: `${n.value}px`,
          height: `${r.value}px`,
          position: "absolute",
          right: unref(t).dir.value === "ltr" ? 0 : void 0,
          left: unref(t).dir.value === "rtl" ? 0 : void 0,
          bottom: 0
        }
      }, (u = l.$parent) == null ? void 0 : u.$props), {
        default: withCtx(() => [
          renderSlot(l.$slots, "default")
        ]),
        _: 3
      }, 16, ["style"])) : createCommentVNode("", true);
    };
  }
}), Ac = /* @__PURE__ */ defineComponent({
  __name: "ScrollAreaCorner",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { forwardRef: n } = ue(), r = Ke(), o = computed(
      () => !!r.scrollbarX.value && !!r.scrollbarY.value
    ), a = computed(
      () => r.type.value !== "scroll" && o.value
    );
    return (s, l) => a.value ? (openBlock(), createBlock(Lc, mergeProps({ key: 0 }, t, { ref: unref(n) }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16)) : createCommentVNode("", true);
  }
});
let no = null, zt = null;
function Oc(e, t) {
  if (t) {
    const n = (t & Bl) !== 0, r = (t & Vl) !== 0, o = (t & Ul) !== 0, a = (t & Wl) !== 0;
    if (n)
      return o ? "se-resize" : a ? "ne-resize" : "e-resize";
    if (r)
      return o ? "sw-resize" : a ? "nw-resize" : "w-resize";
    if (o)
      return "s-resize";
    if (a)
      return "n-resize";
  }
  switch (e) {
    case "horizontal":
      return "ew-resize";
    case "intersection":
      return "move";
    case "vertical":
      return "ns-resize";
  }
}
function Dl() {
  zt !== null && ((void 0).head.removeChild(zt), no = null, zt = null);
}
function zr(e, t) {
  const n = Oc(e, t);
  no !== n && (no = n, zt === null && (zt = (void 0).createElement("style"), (void 0).head.appendChild(zt)), zt.innerHTML = `*{cursor: ${n}!important;}`);
}
function Ic({
  defaultSize: e,
  dragState: t,
  layout: n,
  panelData: r,
  panelIndex: o,
  precision: a = 3
}) {
  const s = n[o];
  let l;
  return s == null ? l = e !== void 0 ? e.toPrecision(a) : "1" : r.length === 1 ? l = "1" : l = s.toPrecision(a), {
    flexBasis: 0,
    flexGrow: l,
    flexShrink: 1,
    // Without this, Panel sizes may be unintentionally overridden by their content
    overflow: "hidden",
    // Disable pointer events inside of a panel during resize
    // This avoid edge cases like nested iframes
    pointerEvents: t !== null ? "none" : void 0
  };
}
function Rl(e) {
  return e.type === "keydown";
}
function Ml(e) {
  return e.type.startsWith("mouse");
}
function Fl(e) {
  return e.type.startsWith("touch");
}
function Nr(e) {
  if (Ml(e))
    return {
      x: e.clientX,
      y: e.clientY
    };
  if (Fl(e)) {
    const t = e.touches[0];
    if (t && t.clientX && t.clientY)
      return {
        x: t.clientX,
        y: t.clientY
      };
  }
  return {
    x: Number.POSITIVE_INFINITY,
    y: Number.POSITIVE_INFINITY
  };
}
function $l(e, t) {
  const n = e === "horizontal", { x: r, y: o } = Nr(t);
  return n ? r : o;
}
function Pc(e, t, n) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function te(e, t = "Assertion failed!") {
  if (!e)
    throw console.error(t), new Error(t);
}
function Dc(e, t) {
  if (e === t)
    throw new Error("Cannot compare node with itself");
  const n = {
    a: ya(e),
    b: ya(t)
  };
  let r;
  for (; n.a.at(-1) === n.b.at(-1); )
    e = n.a.pop(), t = n.b.pop(), r = e;
  te(r);
  const o = {
    a: ba(ha(n.a)),
    b: ba(ha(n.b))
  };
  if (o.a === o.b) {
    const a = r.childNodes, s = {
      a: n.a.at(-1),
      b: n.b.at(-1)
    };
    let l = a.length;
    for (; l--; ) {
      const i = a[l];
      if (i === s.a)
        return 1;
      if (i === s.b)
        return -1;
    }
  }
  return Math.sign(o.a - o.b);
}
const Rc = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function Mc(e) {
  const t = getComputedStyle(zl(e)).display;
  return t === "flex" || t === "inline-flex";
}
function Fc(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || Mc(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || Rc.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function ha(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (te(n), Fc(n))
      return n;
  }
  return null;
}
function ba(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function ya(e) {
  const t = [];
  for (; e; )
    t.push(e), e = zl(e);
  return t;
}
function zl(e) {
  var t;
  return e.parentNode instanceof DocumentFragment && ((t = e.parentNode) == null ? void 0 : t.host) || e.parentNode;
}
const Bl = 1, Vl = 2, Ul = 4, Wl = 8;
function $c() {
  if (typeof matchMedia == "function")
    return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
const zc = $c() === "coarse", St = [];
let Sr = false;
const xt = /* @__PURE__ */ new Map(), Lr = /* @__PURE__ */ new Map(), In = /* @__PURE__ */ new Set();
function Bc(e, t, n, r, o) {
  var _a2;
  const { ownerDocument: a } = t, s = {
    direction: n,
    element: t,
    hitAreaMargins: r,
    setResizeHandlerState: o
  }, l = (_a2 = xt.get(a)) != null ? _a2 : 0;
  return xt.set(a, l + 1), In.add(s), pr(), function() {
    var _a3;
    Lr.delete(e), In.delete(s);
    const i = (_a3 = xt.get(a)) != null ? _a3 : 1;
    xt.set(a, i - 1), pr(), Dl(), i === 1 && xt.delete(a);
  };
}
function Qn(e) {
  const { target: t } = e, { x: n, y: r } = Nr(e);
  Sr = true, Fo({ target: t, x: n, y: r }), pr(), St.length > 0 && ($o("down", e), e.preventDefault());
}
function ht(e) {
  const { x: t, y: n } = Nr(e);
  if (!Sr) {
    const { target: r } = e;
    Fo({ target: r, x: t, y: n });
  }
  $o("move", e), Hl(), St.length > 0 && e.preventDefault();
}
function bt(e) {
  const { target: t } = e, { x: n, y: r } = Nr(e);
  Lr.clear(), Sr = false, St.length > 0 && e.preventDefault(), $o("up", e), Fo({ target: t, x: n, y: r }), Hl(), pr();
}
function Fo({
  target: e,
  x: t,
  y: n
}) {
  St.splice(0);
  let r = null;
  e instanceof HTMLElement && (r = e), In.forEach((o) => {
    const { element: a, hitAreaMargins: s } = o, l = a.getBoundingClientRect(), { bottom: i, left: u, right: c, top: d } = l, f = zc ? s.coarse : s.fine;
    if (t >= u - f && t <= c + f && n >= d - f && n <= i + f) {
      if (r !== null && a !== r && !a.contains(r) && !r.contains(a) && Dc(r, a) > 0) {
        let m = r, g = false;
        for (; m && !m.contains(a); ) {
          if (Pc(
            m.getBoundingClientRect(),
            l
          )) {
            g = true;
            break;
          }
          m = m.parentElement;
        }
        if (g)
          return;
      }
      St.push(o);
    }
  });
}
function Br(e, t) {
  Lr.set(e, t);
}
function Hl() {
  let e = false, t = false;
  St.forEach((r) => {
    const { direction: o } = r;
    o.value === "horizontal" ? e = true : t = true;
  });
  let n = 0;
  Lr.forEach((r) => {
    n |= r;
  }), e && t ? zr("intersection", n) : e ? zr("horizontal", n) : t ? zr("vertical", n) : Dl();
}
function pr() {
  xt.forEach((e, t) => {
    const { body: n } = t;
    n.removeEventListener("contextmenu", bt), n.removeEventListener("mousedown", Qn), n.removeEventListener("mouseleave", ht), n.removeEventListener("mousemove", ht), n.removeEventListener("touchmove", ht), n.removeEventListener("touchstart", Qn);
  }), (void 0).removeEventListener("mouseup", bt), (void 0).removeEventListener("touchcancel", bt), (void 0).removeEventListener("touchend", bt), In.size > 0 && (Sr ? (St.length > 0 && xt.forEach((e, t) => {
    const { body: n } = t;
    e > 0 && (n.addEventListener("contextmenu", bt), n.addEventListener("mouseleave", ht), n.addEventListener("mousemove", ht), n.addEventListener("touchmove", ht, {
      passive: false
    }));
  }), (void 0).addEventListener("mouseup", bt), (void 0).addEventListener("touchcancel", bt), (void 0).addEventListener("touchend", bt)) : xt.forEach((e, t) => {
    const { body: n } = t;
    e > 0 && (n.addEventListener("mousedown", Qn), n.addEventListener("mousemove", ht), n.addEventListener("touchmove", ht, {
      passive: false
    }), n.addEventListener("touchstart", Qn));
  }));
}
function $o(e, t) {
  In.forEach((n) => {
    const { setResizeHandlerState: r } = n, o = St.includes(n);
    r(e, o, t);
  });
}
const zo = 10;
function Pn(e, t, n = zo) {
  e = Number.parseFloat(e.toFixed(n)), t = Number.parseFloat(t.toFixed(n));
  const r = e - t;
  return r === 0 ? 0 : r > 0 ? 1 : -1;
}
function Fe(e, t, n) {
  return Pn(e, t, n) === 0;
}
function nn({
  panelConstraints: e,
  panelIndex: t,
  size: n
}) {
  const r = e[t];
  te(r != null);
  const { collapsedSize: o = 0, collapsible: a, maxSize: s = 100, minSize: l = 0 } = r;
  if (Pn(n, l) < 0)
    if (a) {
      const i = (o + l) / 2;
      Pn(n, i) < 0 ? n = o : n = l;
    } else
      n = l;
  return n = Math.min(s, n), n = Number.parseFloat(n.toFixed(zo)), n;
}
function Zn(e, t) {
  if (e.length !== t.length)
    return false;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return false;
  return true;
}
function Sn({
  delta: e,
  layout: t,
  panelConstraints: n,
  pivotIndices: r,
  trigger: o
}) {
  if (Fe(e, 0))
    return t;
  const a = [...t], [s, l] = r;
  te(s != null), te(l != null);
  let i = 0;
  if (o === "keyboard") {
    {
      const c = e < 0 ? l : s, d = n[c];
      if (te(d), d.collapsible) {
        const f = t[c];
        te(f != null);
        const m = n[c];
        te(m);
        const { collapsedSize: g = 0, minSize: h2 = 0 } = m;
        if (Fe(f, g)) {
          const b = h2 - f;
          Pn(b, Math.abs(e)) > 0 && (e = e < 0 ? 0 - b : b);
        }
      }
    }
    {
      const c = e < 0 ? s : l, d = n[c];
      te(d);
      const { collapsible: f } = d;
      if (f) {
        const m = t[c];
        te(m != null);
        const g = n[c];
        te(g);
        const { collapsedSize: h2 = 0, minSize: b = 0 } = g;
        if (Fe(m, b)) {
          const p = m - h2;
          Pn(p, Math.abs(e)) > 0 && (e = e < 0 ? 0 - p : p);
        }
      }
    }
  }
  {
    const c = e < 0 ? 1 : -1;
    let d = e < 0 ? l : s, f = 0;
    for (; ; ) {
      const g = t[d];
      te(g != null);
      const h2 = nn({
        panelConstraints: n,
        panelIndex: d,
        size: 100
      }) - g;
      if (f += h2, d += c, d < 0 || d >= n.length)
        break;
    }
    const m = Math.min(Math.abs(e), Math.abs(f));
    e = e < 0 ? 0 - m : m;
  }
  {
    let c = e < 0 ? s : l;
    for (; c >= 0 && c < n.length; ) {
      const d = Math.abs(e) - Math.abs(i), f = t[c];
      te(f != null);
      const m = f - d, g = nn({
        panelConstraints: n,
        panelIndex: c,
        size: m
      });
      if (!Fe(f, g) && (i += f - g, a[c] = g, i.toPrecision(3).localeCompare(Math.abs(e).toPrecision(3), void 0, {
        numeric: true
      }) >= 0))
        break;
      e < 0 ? c-- : c++;
    }
  }
  if (Fe(i, 0))
    return t;
  {
    const c = e < 0 ? l : s, d = t[c];
    te(d != null);
    const f = d + i, m = nn({
      panelConstraints: n,
      panelIndex: c,
      size: f
    });
    if (a[c] = m, !Fe(m, f)) {
      let g = f - m, h2 = e < 0 ? l : s;
      for (; h2 >= 0 && h2 < n.length; ) {
        const b = a[h2];
        te(b != null);
        const p = b + g, y = nn({
          panelConstraints: n,
          panelIndex: h2,
          size: p
        });
        if (Fe(b, y) || (g -= y - b, a[h2] = y), Fe(g, 0))
          break;
        e > 0 ? h2-- : h2++;
      }
    }
  }
  const u = a.reduce((c, d) => d + c, 0);
  return Fe(u, 100) ? a : t;
}
function jl(e, t = void 0) {
  return null;
}
function Ar(e, t = void 0) {
  return null;
}
function Dn(e, t = void 0) {
  return [];
}
function Vc(e, t, n, r = void 0) {
  var _a2, _b;
  var o, a;
  const i = -1, u = (_a2 = (o = n[i]) == null ? void 0 : o.id) != null ? _a2 : null, c = (_b = (a = n[i + 1]) == null ? void 0 : a.id) != null ? _b : null;
  return [u, c];
}
function Uc(e, t, n, r, o) {
  const a = n === "horizontal", s = Ar(t, o);
  te(s);
  const l = s.getAttribute("data-panel-group-id");
  te(l);
  const { initialCursorPosition: i } = r, u = $l(n, e), c = jl(l, o);
  te(c);
  const d = c.getBoundingClientRect(), f = a ? d.width : d.height;
  return (u - i) / f * 100;
}
function Wc(e, t, n, r, o, a) {
  if (Rl(e)) {
    const s = n === "horizontal";
    let l = 0;
    e.shiftKey ? l = 100 : l = o != null ? o : 10;
    let i = 0;
    switch (e.key) {
      case "ArrowDown":
        i = s ? 0 : l;
        break;
      case "ArrowLeft":
        i = s ? -l : 0;
        break;
      case "ArrowRight":
        i = s ? l : 0;
        break;
      case "ArrowUp":
        i = s ? 0 : -l;
        break;
      case "End":
        i = 100;
        break;
      case "Home":
        i = -100;
        break;
    }
    return i;
  } else
    return r == null ? 0 : Uc(
      e,
      t,
      n,
      r,
      a
    );
}
function Hc({
  layout: e,
  panelsArray: t,
  pivotIndices: n
}) {
  let r = 0, o = 100, a = 0, s = 0;
  const l = n[0];
  te(l != null), t.forEach((d, f) => {
    const { constraints: m } = d, { maxSize: g = 100, minSize: h2 = 0 } = m;
    f === l ? (r = h2, o = g) : (a += h2, s += g);
  });
  const i = Math.min(o, 100 - a), u = Math.max(r, 100 - s), c = e[l];
  return {
    valueMax: i,
    valueMin: u,
    valueNow: c
  };
}
function jc({
  panelDataArray: e
}) {
  const t = Array(e.length), n = e.map(
    (a) => a.constraints
  );
  let r = 0, o = 100;
  for (let a = 0; a < e.length; a++) {
    const s = n[a];
    te(s);
    const { defaultSize: l } = s;
    l != null && (r++, t[a] = l, o -= l);
  }
  for (let a = 0; a < e.length; a++) {
    const s = n[a];
    te(s);
    const { defaultSize: l } = s;
    if (l != null)
      continue;
    const i = e.length - r, u = o / i;
    r++, t[a] = u, o -= u;
  }
  return t;
}
function Cn(e, t, n) {
  t.forEach((r, o) => {
    const a = e[o];
    te(a);
    const { callbacks: s, constraints: l, id: i } = a, { collapsedSize: u = 0, collapsible: c } = l, d = n[i];
    if (d == null || r !== d) {
      n[i] = r;
      const { onCollapse: f, onExpand: m, onResize: g } = s;
      g && g(r, d), c && (f || m) && (m && (d == null || d === u) && r !== u && m(), f && (d == null || d !== u) && r === u && f());
    }
  });
}
function Gc(e, t = 10) {
  let n = null;
  return (...r) => {
    n !== null && clearTimeout(n), n = setTimeout(() => {
      e(...r);
    }, t);
  };
}
function Kl(e, t, n) {
  return [-1, -1];
}
function Kc({
  layout: e,
  panelConstraints: t
}) {
  const n = [...e], r = n.reduce(
    (a, s) => a + s,
    0
  );
  if (n.length !== t.length)
    throw new Error(
      `Invalid ${t.length} panel layout: ${n.map((a) => `${a}%`).join(", ")}`
    );
  if (!Fe(r, 100)) {
    console.warn(
      `WARNING: Invalid layout total size: ${n.map((a) => `${a}%`).join(", ")}. Layout normalization will be applied.`
    );
    for (let a = 0; a < t.length; a++) {
      const s = n[a];
      te(s != null);
      const l = 100 / r * s;
      n[a] = l;
    }
  }
  let o = 0;
  for (let a = 0; a < t.length; a++) {
    const s = n[a];
    te(s != null);
    const l = nn({
      panelConstraints: t,
      panelIndex: a,
      size: s
    });
    s !== l && (o += s - l, n[a] = l);
  }
  if (!Fe(o, 0))
    for (let a = 0; a < t.length; a++) {
      const s = n[a];
      te(s != null);
      const l = s + o, i = nn({
        panelConstraints: t,
        panelIndex: a,
        size: l
      });
      if (s !== i && (o -= i - s, n[a] = i, Fe(o, 0)))
        break;
    }
  return n;
}
function _a(e) {
  try {
    if (typeof localStorage < "u")
      e.getItem = (t) => localStorage.getItem(t), e.setItem = (t, n) => {
        localStorage.setItem(t, n);
      };
    else
      throw new TypeError("localStorage not supported in this environment");
  } catch (t) {
    console.error(t), e.getItem = () => null, e.setItem = () => {
    };
  }
}
function Yl(e) {
  return `radix-vue:${e}`;
}
function Xl(e) {
  return e.map((t) => {
    const { constraints: n, id: r, idIsFromProps: o, order: a } = t;
    return o ? r : a ? `${a}:${JSON.stringify(n)}` : JSON.stringify(n);
  }).sort((t, n) => t.localeCompare(n)).join(",");
}
function ql(e, t) {
  try {
    const n = Yl(e), r = t.getItem(n);
    if (r) {
      const o = JSON.parse(r);
      if (typeof o == "object" && o != null)
        return o;
    }
  } catch {
  }
  return null;
}
function Yc(e, t, n) {
  var _a2, _b;
  const r = (_a2 = ql(e, n)) != null ? _a2 : {}, o = Xl(t);
  return (_b = r[o]) != null ? _b : null;
}
function Xc(e, t, n, r, o) {
  var _a2;
  const a = Yl(e), s = Xl(t), l = (_a2 = ql(e, o)) != null ? _a2 : {};
  l[s] = {
    expandToSizes: Object.fromEntries(n.entries()),
    layout: r
  };
  try {
    o.setItem(a, JSON.stringify(l));
  } catch (i) {
    console.error(i);
  }
}
function qc({
  eagerValuesRef: e,
  groupId: t,
  layout: n,
  panelDataArray: r,
  panelGroupElement: o,
  setLayout: a
}) {
  watchEffect((s) => {
    const l = o.value;
    if (!l)
      return;
    const i = Dn(
      t,
      l
    );
    for (let u = 0; u < r.length - 1; u++) {
      const { valueMax: c, valueMin: d, valueNow: f } = Hc({
        layout: n.value,
        panelsArray: r,
        pivotIndices: [u, u + 1]
      }), m = i[u];
      if (m != null) {
        const g = r[u];
        te(g), m.setAttribute("aria-controls", g.id), m.setAttribute(
          "aria-valuemax",
          `${Math.round(c)}`
        ), m.setAttribute(
          "aria-valuemin",
          `${Math.round(d)}`
        ), m.setAttribute(
          "aria-valuenow",
          f != null ? `${Math.round(f)}` : ""
        );
      }
    }
    s(() => {
      i.forEach((u) => {
        u.removeAttribute("aria-controls"), u.removeAttribute("aria-valuemax"), u.removeAttribute("aria-valuemin"), u.removeAttribute("aria-valuenow");
      });
    });
  }), watchEffect((s) => {
    const l = o.value;
    if (!l)
      return;
    const i = e.value;
    te(i);
    const { panelDataArray: u } = i, c = jl(t, l);
    te(c != null, `No group found for id "${t}"`);
    const d = Dn(t, l);
    te(d);
    const f = d.map((m) => {
      const g = m.getAttribute("data-panel-resize-handle-id");
      te(g);
      const [h2, b] = Vc(
        t,
        g,
        u,
        l
      );
      if (h2 == null || b == null)
        return () => {
        };
      const p = (y) => {
        if (!y.defaultPrevented)
          switch (y.key) {
            case "Enter": {
              y.preventDefault();
              const _ = u.findIndex(
                (E) => E.id === h2
              );
              if (_ >= 0) {
                const E = u[_];
                te(E);
                const C = n.value[_], {
                  collapsedSize: S = 0,
                  collapsible: T,
                  minSize: V = 0
                } = E.constraints;
                if (C != null && T) {
                  const G = Sn({
                    delta: Fe(C, S) ? V - S : S - C,
                    layout: n.value,
                    panelConstraints: u.map(
                      (F) => F.constraints
                    ),
                    pivotIndices: Kl(),
                    trigger: "keyboard"
                  });
                  n.value !== G && a(G);
                }
              }
              break;
            }
          }
      };
      return m.addEventListener("keydown", p), () => {
        m.removeEventListener("keydown", p);
      };
    });
    s(() => {
      f.forEach((m) => m());
    });
  });
}
const Jc = 100, Ln = {
  getItem: (e) => (_a(Ln), Ln.getItem(e)),
  setItem: (e, t) => {
    _a(Ln), Ln.setItem(e, t);
  }
}, [Jl, Qc] = Ge("PanelGroup"), Zc = /* @__PURE__ */ defineComponent({
  __name: "SplitterGroup",
  props: {
    id: {},
    autoSaveId: { default: null },
    direction: {},
    keyboardResizeBy: { default: 10 },
    storage: { default: () => Ln },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["layout"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = {}, { direction: a } = toRefs(n), s = bn(n.id, "radix-vue-splitter-group"), l = xr(), { forwardRef: i, currentElement: u } = ue(), c = ref(null), d = ref([]), f = ref({}), m = ref(/* @__PURE__ */ new Map()), g = ref(0), h2 = computed(() => ({
      autoSaveId: n.autoSaveId,
      direction: n.direction,
      dragState: c.value,
      id: s,
      keyboardResizeBy: n.keyboardResizeBy,
      storage: n.storage
    })), b = ref({
      layout: d.value,
      panelDataArray: [],
      panelDataArrayChanged: false
    }), p = (k) => d.value = k;
    qc({
      eagerValuesRef: b,
      groupId: s,
      layout: d,
      panelDataArray: b.value.panelDataArray,
      setLayout: p,
      panelGroupElement: u
    }), watchEffect(() => {
      const { panelDataArray: k } = b.value, { autoSaveId: I } = n;
      if (I) {
        if (d.value.length === 0 || d.value.length !== k.length)
          return;
        let z = o[I];
        z || (z = Gc(
          Xc,
          Jc
        ), o[I] = z);
        const B = [...k], K = new Map(
          m.value
        );
        z(
          I,
          B,
          K,
          d.value,
          n.storage
        );
      }
    });
    function y(k, I) {
      const { panelDataArray: z } = b.value, B = ie(z, k);
      return Ic({
        defaultSize: I,
        dragState: c.value,
        layout: d.value,
        panelData: z,
        panelIndex: B
      });
    }
    function _(k) {
      const { panelDataArray: I } = b.value;
      I.push(k), I.sort((z, B) => {
        const K = z.order, Z = B.order;
        return K == null && Z == null ? 0 : K == null ? -1 : Z == null ? 1 : K - Z;
      }), b.value.panelDataArrayChanged = true;
    }
    watch(() => b.value.panelDataArrayChanged, () => {
      if (b.value.panelDataArrayChanged) {
        b.value.panelDataArrayChanged = false;
        const { autoSaveId: k, storage: I } = h2.value, { layout: z, panelDataArray: B } = b.value;
        let K = null;
        if (k) {
          const ye = Yc(k, B, I);
          ye && (m.value = new Map(
            Object.entries(ye.expandToSizes)
          ), K = ye.layout);
        }
        K === null && (K = jc({
          panelDataArray: B
        }));
        const Z = Kc({
          layout: K,
          panelConstraints: B.map(
            (ye) => ye.constraints
          )
        });
        pu(z, Z) || (p(Z), b.value.layout = Z, r("layout", Z), Cn(
          B,
          Z,
          f.value
        ));
      }
    });
    function E(k) {
      return function(I) {
        I.preventDefault();
        const z = u.value;
        if (!z)
          return () => null;
        const { direction: B, dragState: K, id: Z, keyboardResizeBy: ye } = h2.value, { layout: Ae, panelDataArray: pe } = b.value, { initialLayout: He } = K != null ? K : {}, Qe = Kl();
        let ge = Wc(
          I,
          k,
          B,
          K,
          ye,
          z
        );
        if (ge === 0)
          return;
        const qt = B === "horizontal";
        l.value === "rtl" && qt && (ge = -ge);
        const En = pe.map((Dt) => Dt.constraints), ot = Sn({
          delta: ge,
          layout: He != null ? He : Ae,
          panelConstraints: En,
          pivotIndices: Qe,
          trigger: Rl(I) ? "keyboard" : "mouse-or-touch"
        }), Jt = !Zn(Ae, ot);
        (Ml(I) || Fl(I)) && g.value !== ge && (g.value = ge, Jt ? Br(k, 0) : qt ? Br(
          k,
          ge < 0 ? Bl : Vl
        ) : Br(
          k,
          ge < 0 ? Ul : Wl
        )), Jt && (p(ot), b.value.layout = ot, r("layout", ot), Cn(
          pe,
          ot,
          f.value
        ));
      };
    }
    function C(k, I) {
      const { layout: z, panelDataArray: B } = b.value, K = B.map((He) => He.constraints), { panelSize: Z, pivotIndices: ye } = D(
        B,
        k,
        z
      );
      te(Z != null);
      const Ae = ie(B, k) === B.length - 1 ? Z - I : I - Z, pe = Sn({
        delta: Ae,
        layout: z,
        panelConstraints: K,
        pivotIndices: ye,
        trigger: "imperative-api"
      });
      Zn(z, pe) || (p(pe), b.value.layout = pe, r("layout", pe), Cn(
        B,
        pe,
        f.value
      ));
    }
    function S(k, I) {
      const { layout: z, panelDataArray: B } = b.value, K = ie(B, k);
      B[K] = k, b.value.panelDataArrayChanged = true;
      const {
        collapsedSize: Z = 0,
        collapsible: ye
      } = I, {
        collapsedSize: Ae = 0,
        collapsible: pe,
        maxSize: He = 100,
        minSize: Qe = 0
      } = k.constraints, { panelSize: ge } = D(
        B,
        k,
        z
      );
      ge !== null && (ye && pe && ge === Z ? Z !== Ae && C(k, Ae) : ge < Qe ? C(k, Qe) : ge > He && C(k, He));
    }
    function T(k, I) {
      const { direction: z } = h2.value, { layout: B } = b.value;
      if (!u.value)
        return;
      const K = Ar(
        k,
        u.value
      );
      te(K);
      const Z = $l(
        z,
        I
      );
      c.value = {
        dragHandleId: k,
        dragHandleRect: K.getBoundingClientRect(),
        initialCursorPosition: Z,
        initialLayout: B
      };
    }
    function V() {
      c.value = null;
    }
    function G(k) {
      const { panelDataArray: I } = b.value, z = ie(I, k);
      z >= 0 && (I.splice(z, 1), delete f.value[k.id], b.value.panelDataArrayChanged = true);
    }
    function F(k) {
      const { layout: I, panelDataArray: z } = b.value;
      if (k.constraints.collapsible) {
        const B = z.map(
          (Ae) => Ae.constraints
        ), {
          collapsedSize: K = 0,
          panelSize: Z,
          pivotIndices: ye
        } = D(z, k, I);
        if (te(
          Z != null,
          `Panel size not found for panel "${k.id}"`
        ), Z !== K) {
          m.value.set(k.id, Z);
          const Ae = ie(z, k) === z.length - 1 ? Z - K : K - Z, pe = Sn({
            delta: Ae,
            layout: I,
            panelConstraints: B,
            pivotIndices: ye,
            trigger: "imperative-api"
          });
          Zn(I, pe) || (p(pe), b.value.layout = pe, r("layout", pe), Cn(
            z,
            pe,
            f.value
          ));
        }
      }
    }
    function q(k) {
      const { layout: I, panelDataArray: z } = b.value;
      if (k.constraints.collapsible) {
        const B = z.map(
          (pe) => pe.constraints
        ), {
          collapsedSize: K = 0,
          panelSize: Z,
          minSize: ye = 0,
          pivotIndices: Ae
        } = D(z, k, I);
        if (Z === K) {
          const pe = m.value.get(
            k.id
          ), He = pe != null && pe >= ye ? pe : ye, Qe = ie(z, k) === z.length - 1 ? Z - He : He - Z, ge = Sn({
            delta: Qe,
            layout: I,
            panelConstraints: B,
            pivotIndices: Ae,
            trigger: "imperative-api"
          });
          Zn(I, ge) || (p(ge), b.value.layout = ge, r("layout", ge), Cn(
            z,
            ge,
            f.value
          ));
        }
      }
    }
    function U(k) {
      const { layout: I, panelDataArray: z } = b.value, { panelSize: B } = D(z, k, I);
      return te(
        B != null,
        `Panel size not found for panel "${k.id}"`
      ), B;
    }
    function ve(k) {
      const { layout: I, panelDataArray: z } = b.value, {
        collapsedSize: B = 0,
        collapsible: K,
        panelSize: Z
      } = D(z, k, I);
      return K === true && Z === B;
    }
    function ne(k) {
      const { layout: I, panelDataArray: z } = b.value, {
        collapsedSize: B = 0,
        collapsible: K,
        panelSize: Z
      } = D(z, k, I);
      return te(
        Z != null,
        `Panel size not found for panel "${k.id}"`
      ), !K || Z > B;
    }
    Qc({
      direction: a,
      dragState: c.value,
      groupId: s,
      reevaluatePanelConstraints: S,
      registerPanel: _,
      registerResizeHandle: E,
      resizePanel: C,
      startDragging: T,
      stopDragging: V,
      unregisterPanel: G,
      panelGroupElement: u,
      collapsePanel: F,
      expandPanel: q,
      isPanelCollapsed: ve,
      isPanelExpanded: ne,
      getPanelSize: U,
      getPanelStyle: y
    });
    function ie(k, I) {
      return k.findIndex(
        (z) => z === I || z.id === I.id
      );
    }
    function D(k, I, z) {
      const B = ie(k, I), K = B === k.length - 1 ? [B - 1, B] : [B, B + 1], Z = z[B];
      return {
        ...I.constraints,
        panelSize: Z,
        pivotIndices: K
      };
    }
    return (k, I) => (openBlock(), createBlock(unref(be), {
      ref: unref(i),
      as: k.as,
      "as-child": k.asChild,
      style: normalizeStyle({
        display: "flex",
        flexDirection: unref(a) === "horizontal" ? "row" : "column",
        height: "100%",
        overflow: "hidden",
        width: "100%"
      }),
      "data-panel-group": "",
      "data-orientation": unref(a),
      "data-panel-group-id": unref(s)
    }, {
      default: withCtx(() => [
        renderSlot(k.$slots, "default", { layout: d.value })
      ]),
      _: 3
    }, 8, ["as", "as-child", "style", "data-orientation", "data-panel-group-id"]));
  }
}), yt = /* @__PURE__ */ defineComponent({
  __name: "SplitterPanel",
  props: {
    collapsedSize: {},
    collapsible: { type: Boolean },
    defaultSize: {},
    id: {},
    maxSize: {},
    minSize: {},
    order: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["collapse", "expand", "resize"],
  setup(e, { expose: t, emit: n }) {
    const r = e, o = n, a = Jl();
    if (a === null)
      throw new Error(
        "SplitterPanel components must be rendered within a SplitterGroup container"
      );
    const { collapsePanel: s, expandPanel: l, getPanelSize: i, getPanelStyle: u, isPanelCollapsed: c, resizePanel: d, groupId: f, reevaluatePanelConstraints: m, registerPanel: g, unregisterPanel: h2 } = a, b = bn(r.id, "radix-vue-splitter-panel"), p = computed(() => ({
      callbacks: {
        onCollapse: () => o("collapse"),
        onExpand: () => o("expand"),
        onResize: (...C) => o("resize", ...C)
      },
      constraints: {
        collapsedSize: r.collapsedSize && Number.parseFloat(r.collapsedSize.toFixed(zo)),
        collapsible: r.collapsible,
        defaultSize: r.defaultSize,
        /** Panel id (unique within group); falls back to useId when not provided */
        /** Panel id (unique within group); falls back to useId when not provided */
        maxSize: r.maxSize,
        minSize: r.minSize
      },
      id: b,
      idIsFromProps: r.id !== void 0,
      order: r.order
    }));
    watch(() => p.value.constraints, (C, S) => {
      (S.collapsedSize !== C.collapsedSize || S.collapsible !== C.collapsible || S.maxSize !== C.maxSize || S.minSize !== C.minSize) && m(p.value, S);
    }, { deep: true }), onMounted(() => {
      const C = p.value;
      g(C), onUnmounted(() => {
        h2(C);
      });
    });
    const y = computed(() => u(p.value, r.defaultSize)), _ = computed(() => c(p.value)), E = computed(() => !_.value);
    return t({
      /** If panel is `collapsible`, collapse it fully. */
      collapse: () => {
        s(p.value);
      },
      /** If panel is currently collapsed, expand it to its most recent size. */
      expand: () => {
        l(p.value);
      },
      /** Gets the current size of the panel as a percentage (1 - 100). */
      getSize() {
        return i(p.value);
      },
      /** Resize panel to the specified percentage (1 - 100). */
      resize: (C) => {
        d(p.value, C);
      },
      /** Returns `true` if the panel is currently collapsed */
      isCollapsed: _,
      /** Returns `true` if the panel is currently not collapsed */
      isExpanded: E
    }), (C, S) => (openBlock(), createBlock(unref(be), {
      id: unref(b),
      style: normalizeStyle(y.value),
      as: C.as,
      "as-child": C.asChild,
      "data-panel": "",
      "data-panel-collapsible": C.collapsible || void 0,
      "data-panel-group-id": unref(f),
      "data-panel-id": unref(b),
      "data-panel-size": Number.parseFloat(`${y.value.flexGrow}`).toFixed(1),
      "data-state": C.collapsible ? _.value ? "collapsed" : "expanded" : void 0
    }, {
      default: withCtx(() => [
        renderSlot(C.$slots, "default", {
          isCollapsed: _.value,
          isExpanded: E.value
        })
      ]),
      _: 3
    }, 8, ["id", "style", "as", "as-child", "data-panel-collapsible", "data-panel-group-id", "data-panel-id", "data-panel-size", "data-state"]));
  }
});
function ed({
  disabled: e,
  handleId: t,
  resizeHandler: n,
  panelGroupElement: r
}) {
  watchEffect((o) => {
    const a = r.value;
    if (e.value || n.value === null || a === null)
      return;
    return;
  });
}
const td = /* @__PURE__ */ defineComponent({
  __name: "SplitterResizeHandle",
  props: {
    id: {},
    hitAreaMargins: {},
    tabindex: { default: 0 },
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["dragging"],
  setup(e, { emit: t }) {
    const n = e, r = t, { forwardRef: o, currentElement: a } = ue(), { disabled: s } = toRefs(n), l = Jl();
    if (l === null)
      throw new Error(
        "PanelResizeHandle components must be rendered within a PanelGroup container"
      );
    const {
      direction: i,
      groupId: u,
      registerResizeHandle: c,
      startDragging: d,
      stopDragging: f,
      panelGroupElement: m
    } = l, g = bn(n.id, "radix-vue-splitter-resize-handle"), h2 = ref("inactive"), b = ref(false), p = ref(null);
    return watch(s, () => {
    }, { immediate: true }), watchEffect((y) => {
      var _a2, _b;
      var _, E;
      if (s.value || p.value === null)
        return;
      const C = a.value;
      if (!C)
        return;
      te(C);
      const S = (T, V, G) => {
        var F;
        if (V)
          switch (T) {
            case "down": {
              h2.value = "drag", d(g, G), r("dragging", true);
              break;
            }
            case "move": {
              h2.value !== "drag" && (h2.value = "hover"), (F = p.value) == null || F.call(p, G);
              break;
            }
            case "up": {
              h2.value = "hover", f(), r("dragging", false);
              break;
            }
          }
        else
          h2.value = "inactive";
      };
      y(Bc(
        g,
        C,
        i,
        {
          // Coarse inputs (e.g. finger/touch)
          coarse: (_a2 = (_ = n.hitAreaMargins) == null ? void 0 : _.coarse) != null ? _a2 : 15,
          // Fine inputs (e.g. mouse)
          fine: (_b = (E = n.hitAreaMargins) == null ? void 0 : E.fine) != null ? _b : 5
        },
        S
      ));
    }), ed({
      disabled: s,
      resizeHandler: p,
      handleId: g,
      panelGroupElement: m
    }), (y, _) => (openBlock(), createBlock(unref(be), {
      id: unref(g),
      ref: unref(o),
      style: {
        touchAction: "none",
        userSelect: "none"
      },
      as: y.as,
      "as-child": y.asChild,
      role: "separator",
      "data-resize-handle": "",
      tabindex: y.tabindex,
      "data-state": h2.value,
      "data-disabled": unref(s) ? "" : void 0,
      "data-orientation": unref(i),
      "data-panel-group-id": unref(u),
      "data-resize-handle-active": h2.value === "drag" ? "pointer" : b.value ? "keyboard" : void 0,
      "data-resize-handle-state": h2.value,
      "data-panel-resize-handle-enabled": !unref(s),
      "data-panel-resize-handle-id": unref(g),
      onBlur: _[0] || (_[0] = (E) => b.value = false),
      onFocus: _[1] || (_[1] = (E) => b.value = false)
    }, {
      default: withCtx(() => [
        renderSlot(y.$slots, "default")
      ]),
      _: 3
    }, 8, ["id", "as", "as-child", "tabindex", "data-state", "data-disabled", "data-orientation", "data-panel-group-id", "data-resize-handle-active", "data-resize-handle-state", "data-panel-resize-handle-enabled", "data-panel-resize-handle-id"]));
  }
}), [Bo, nd] = Ge("TabsRoot"), rd = /* @__PURE__ */ defineComponent({
  __name: "TabsRoot",
  props: {
    defaultValue: {},
    orientation: { default: "horizontal" },
    dir: {},
    activationMode: { default: "automatic" },
    modelValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, r = t, { orientation: o, dir: a } = toRefs(n), s = xr(a);
    ue();
    const l = wr(n, "modelValue", r, {
      defaultValue: n.defaultValue,
      passive: n.modelValue === void 0
    }), i = ref();
    return nd({
      modelValue: l,
      changeModelValue: (u) => {
        l.value = u;
      },
      orientation: o,
      dir: s,
      activationMode: n.activationMode,
      baseId: bn(void 0, "radix-vue-tabs"),
      tabsList: i
    }), (u, c) => (openBlock(), createBlock(unref(be), {
      dir: unref(s),
      "data-orientation": unref(o),
      "as-child": u.asChild,
      as: u.as
    }, {
      default: withCtx(() => [
        renderSlot(u.$slots, "default", { modelValue: unref(l) })
      ]),
      _: 3
    }, 8, ["dir", "data-orientation", "as-child", "as"]));
  }
}), od = /* @__PURE__ */ defineComponent({
  __name: "TabsList",
  props: {
    loop: { type: Boolean, default: true },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { loop: n } = toRefs(t), { forwardRef: r, currentElement: o } = ue(), a = Bo();
    return a.tabsList = o, (s, l) => (openBlock(), createBlock(unref(mc), {
      "as-child": "",
      orientation: unref(a).orientation.value,
      dir: unref(a).dir.value,
      loop: unref(n)
    }, {
      default: withCtx(() => [
        createVNode(unref(be), {
          ref: unref(r),
          role: "tablist",
          "as-child": s.asChild,
          as: s.as,
          "aria-orientation": unref(a).orientation.value
        }, {
          default: withCtx(() => [
            renderSlot(s.$slots, "default")
          ]),
          _: 3
        }, 8, ["as-child", "as", "aria-orientation"])
      ]),
      _: 3
    }, 8, ["orientation", "dir", "loop"]));
  }
});
function Ql(e, t) {
  return `${e}-trigger-${t}`;
}
function Zl(e, t) {
  return `${e}-content-${t}`;
}
const ad = /* @__PURE__ */ defineComponent({
  __name: "TabsContent",
  props: {
    value: {},
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e, { forwardRef: n } = ue(), r = Bo(), o = computed(() => Ql(r.baseId, t.value)), a = computed(() => Zl(r.baseId, t.value)), s = computed(() => t.value === r.modelValue.value), l = ref(s.value);
    return onMounted(() => {
      requestAnimationFrame(() => {
        l.value = false;
      });
    }), (i, u) => (openBlock(), createBlock(unref(Gn), {
      present: s.value,
      "force-mount": ""
    }, {
      default: withCtx(({ present: c }) => [
        createVNode(unref(be), {
          id: a.value,
          ref: unref(n),
          "as-child": i.asChild,
          as: i.as,
          role: "tabpanel",
          "data-state": s.value ? "active" : "inactive",
          "data-orientation": unref(r).orientation.value,
          "aria-labelledby": o.value,
          hidden: !c.value,
          tabindex: "0",
          style: normalizeStyle({
            animationDuration: l.value ? "0s" : void 0
          })
        }, {
          default: withCtx(() => [
            i.forceMount || s.value ? renderSlot(i.$slots, "default", { key: 0 }) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["id", "as-child", "as", "data-state", "data-orientation", "aria-labelledby", "hidden", "style"])
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), ld = /* @__PURE__ */ defineComponent({
  __name: "TabsTrigger",
  props: {
    value: {},
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e, { forwardRef: n } = ue(), r = Bo(), o = computed(() => Ql(r.baseId, t.value)), a = computed(() => Zl(r.baseId, t.value)), s = computed(() => t.value === r.modelValue.value);
    return (l, i) => (openBlock(), createBlock(unref(vc), {
      "as-child": "",
      focusable: !l.disabled,
      active: s.value
    }, {
      default: withCtx(() => [
        createVNode(unref(be), {
          id: o.value,
          ref: unref(n),
          role: "tab",
          type: l.as === "button" ? "button" : void 0,
          as: l.as,
          "as-child": l.asChild,
          "aria-selected": s.value ? "true" : "false",
          "aria-controls": a.value,
          "data-state": s.value ? "active" : "inactive",
          disabled: l.disabled,
          "data-disabled": l.disabled ? "" : void 0,
          "data-orientation": unref(r).orientation.value,
          onMousedown: i[0] || (i[0] = withModifiers((u) => {
            !l.disabled && u.ctrlKey === false ? unref(r).changeModelValue(l.value) : u.preventDefault();
          }, ["left"])),
          onKeydown: i[1] || (i[1] = withKeys((u) => unref(r).changeModelValue(l.value), ["enter", "space"])),
          onFocus: i[2] || (i[2] = () => {
            const u = unref(r).activationMode !== "manual";
            !s.value && !l.disabled && u && unref(r).changeModelValue(l.value);
          })
        }, {
          default: withCtx(() => [
            renderSlot(l.$slots, "default")
          ]),
          _: 3
        }, 8, ["id", "type", "as", "as-child", "aria-selected", "aria-controls", "data-state", "disabled", "data-disabled", "data-orientation"])
      ]),
      _: 3
    }, 8, ["focusable", "active"]));
  }
}), sd = /* @__PURE__ */ defineComponent({
  __name: "Toggle",
  props: {
    defaultValue: { type: Boolean },
    pressed: { type: Boolean, default: void 0 },
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  emits: ["update:pressed"],
  setup(e, { emit: t }) {
    const n = e, r = t;
    ue();
    const o = wr(n, "pressed", r, {
      defaultValue: n.defaultValue,
      passive: n.pressed === void 0
    });
    function a() {
      o.value = !o.value;
    }
    const s = computed(() => o.value ? "on" : "off");
    return (l, i) => (openBlock(), createBlock(unref(be), {
      type: l.as === "button" ? "button" : void 0,
      "as-child": n.asChild,
      as: l.as,
      "aria-pressed": unref(o),
      "data-state": s.value,
      "data-disabled": l.disabled ? "" : void 0,
      disabled: l.disabled,
      onClick: a
    }, {
      default: withCtx(() => [
        renderSlot(l.$slots, "default", { pressed: unref(o) })
      ]),
      _: 3
    }, 8, ["type", "as-child", "as", "aria-pressed", "data-state", "data-disabled", "disabled"]));
  }
}), es = "tooltip.open", [Vo, id] = Ge("TooltipProvider"), ud = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "TooltipProvider",
  props: {
    delayDuration: { default: 700 },
    skipDelayDuration: { default: 300 },
    disableHoverableContent: { type: Boolean, default: false },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean, default: false }
  },
  setup(e) {
    const t = e, { delayDuration: n, skipDelayDuration: r, disableHoverableContent: o, disableClosingTrigger: a, ignoreNonKeyboardFocus: s, disabled: l } = toRefs(t);
    ue();
    const i = ref(true), u = ref(false), { start: c, stop: d } = xl(() => {
      i.value = true;
    }, r, { immediate: false });
    return id({
      isOpenDelayed: i,
      delayDuration: n,
      onOpen() {
        d(), i.value = false;
      },
      onClose() {
        c();
      },
      isPointerInTransitRef: u,
      disableHoverableContent: o,
      disableClosingTrigger: a,
      disabled: l,
      ignoreNonKeyboardFocus: s
    }), (f, m) => renderSlot(f.$slots, "default");
  }
}), [Or, cd] = Ge("TooltipRoot"), dd = /* @__PURE__ */ defineComponent({
  __name: "TooltipRoot",
  props: {
    defaultOpen: { type: Boolean, default: false },
    open: { type: Boolean, default: void 0 },
    delayDuration: { default: void 0 },
    disableHoverableContent: { type: Boolean, default: void 0 },
    disableClosingTrigger: { type: Boolean, default: void 0 },
    disabled: { type: Boolean, default: void 0 },
    ignoreNonKeyboardFocus: { type: Boolean, default: void 0 }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = e, r = t;
    ue();
    const o = Vo(), a = computed(() => {
      var _a2;
      return (_a2 = n.disableHoverableContent) != null ? _a2 : o.disableHoverableContent.value;
    }), s = computed(() => {
      var _a2;
      return (_a2 = n.disableClosingTrigger) != null ? _a2 : o.disableClosingTrigger.value;
    }), l = computed(() => {
      var _a2;
      return (_a2 = n.disabled) != null ? _a2 : o.disabled.value;
    }), i = computed(() => {
      var _a2;
      return (_a2 = n.delayDuration) != null ? _a2 : o.delayDuration.value;
    }), u = computed(() => {
      var _a2;
      return (_a2 = n.ignoreNonKeyboardFocus) != null ? _a2 : o.ignoreNonKeyboardFocus.value;
    }), c = wr(n, "open", r, {
      defaultValue: n.defaultOpen,
      passive: n.open === void 0
    });
    watch(c, (_) => {
      o.onClose && (_ ? (o.onOpen(), (void 0).dispatchEvent(new CustomEvent(es))) : o.onClose());
    });
    const d = ref(false), f = ref(), m = computed(() => c.value ? d.value ? "delayed-open" : "instant-open" : "closed"), { start: g, stop: h2 } = xl(() => {
      d.value = true, c.value = true;
    }, i, { immediate: false });
    function b() {
      h2(), d.value = false, c.value = true;
    }
    function p() {
      h2(), c.value = false;
    }
    function y() {
      g();
    }
    return cd({
      contentId: "",
      open: c,
      stateAttribute: m,
      trigger: f,
      onTriggerChange(_) {
        f.value = _;
      },
      onTriggerEnter() {
        o.isOpenDelayed.value ? y() : b();
      },
      onTriggerLeave() {
        a.value ? p() : h2();
      },
      onOpen: b,
      onClose: p,
      disableHoverableContent: a,
      disableClosingTrigger: s,
      disabled: l,
      ignoreNonKeyboardFocus: u
    }), (_, E) => (openBlock(), createBlock(unref(Gu), null, {
      default: withCtx(() => [
        renderSlot(_.$slots, "default", { open: unref(c) })
      ]),
      _: 3
    }));
  }
}), fd = /* @__PURE__ */ defineComponent({
  __name: "TooltipTrigger",
  props: {
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(e) {
    const t = e, n = Or(), r = Vo();
    n.contentId || (n.contentId = bn(void 0, "radix-vue-tooltip-content"));
    const { forwardRef: o, currentElement: a } = ue(), s = ref(false), l = ref(false), i = computed(() => n.disabled.value ? {} : {
      click: h2,
      focus: m,
      pointermove: d,
      pointerleave: f,
      pointerdown: c,
      blur: g
    });
    onMounted(() => {
      n.onTriggerChange(a.value);
    });
    function u() {
      setTimeout(() => {
        s.value = false;
      }, 1);
    }
    function c() {
      s.value = true, (void 0).addEventListener("pointerup", u, { once: true });
    }
    function d(b) {
      b.pointerType !== "touch" && !l.value && !r.isPointerInTransitRef.value && (n.onTriggerEnter(), l.value = true);
    }
    function f() {
      n.onTriggerLeave(), l.value = false;
    }
    function m(b) {
      var p, y;
      s.value || n.ignoreNonKeyboardFocus.value && !((y = (p = b.target).matches) != null && y.call(p, ":focus-visible")) || n.onOpen();
    }
    function g() {
      n.onClose();
    }
    function h2() {
      n.disableClosingTrigger.value || n.onClose();
    }
    return (b, p) => (openBlock(), createBlock(unref(Ku), { "as-child": "" }, {
      default: withCtx(() => [
        createVNode(unref(be), mergeProps({
          ref: unref(o),
          "aria-describedby": unref(n).open.value ? unref(n).contentId : void 0,
          "data-state": unref(n).stateAttribute.value,
          as: b.as,
          "as-child": t.asChild,
          "data-grace-area-trigger": ""
        }, toHandlers(i.value)), {
          default: withCtx(() => [
            renderSlot(b.$slots, "default")
          ]),
          _: 3
        }, 16, ["aria-describedby", "data-state", "as", "as-child"])
      ]),
      _: 3
    }));
  }
}), ts = /* @__PURE__ */ defineComponent({
  __name: "TooltipContentImpl",
  props: {
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: { default: "top" },
    sideOffset: { default: 0 },
    align: { default: "center" },
    alignOffset: {},
    avoidCollisions: { type: Boolean, default: true },
    collisionBoundary: { default: () => [] },
    collisionPadding: { default: 0 },
    arrowPadding: { default: 0 },
    sticky: { default: "partial" },
    hideWhenDetached: { type: Boolean, default: false }
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = Or(), { forwardRef: a } = ue(), s = useSlots(), l = computed(() => {
      var c;
      return (c = s.default) == null ? void 0 : c.call(s);
    }), i = computed(() => {
      var c;
      if (n.ariaLabel)
        return n.ariaLabel;
      let d = "";
      function f(m) {
        typeof m.children == "string" && m.type !== Comment ? d += m.children : Array.isArray(m.children) && m.children.forEach((g) => f(g));
      }
      return (c = l.value) == null || c.forEach((m) => f(m)), d;
    }), u = computed(() => {
      const { ariaLabel: c, ...d } = n;
      return d;
    });
    return onMounted(() => {
      eo(void 0, "scroll", (c) => {
        const d = c.target;
        d != null && d.contains(o.trigger.value) && o.onClose();
      }), eo(void 0, es, o.onClose);
    }), (c, d) => (openBlock(), createBlock(unref(Hu), {
      "as-child": "",
      "disable-outside-pointer-events": false,
      onEscapeKeyDown: d[0] || (d[0] = (f) => r("escapeKeyDown", f)),
      onPointerDownOutside: d[1] || (d[1] = (f) => {
        var m;
        unref(o).disableClosingTrigger.value && (m = unref(o).trigger.value) != null && m.contains(f.target) && f.preventDefault(), r("pointerDownOutside", f);
      }),
      onFocusOutside: d[2] || (d[2] = withModifiers(() => {
      }, ["prevent"])),
      onDismiss: d[3] || (d[3] = (f) => unref(o).onClose())
    }, {
      default: withCtx(() => [
        createVNode(unref(Qu), mergeProps({
          ref: unref(a),
          "data-state": unref(o).stateAttribute.value
        }, { ...c.$attrs, ...u.value }, { style: {
          "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
          "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
          "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
        } }), {
          default: withCtx(() => [
            renderSlot(c.$slots, "default"),
            createVNode(unref(Zu), {
              id: unref(o).contentId,
              role: "tooltip"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(i.value), 1)
              ]),
              _: 1
            }, 8, ["id"])
          ]),
          _: 3
        }, 16, ["data-state"])
      ]),
      _: 3
    }));
  }
}), pd = /* @__PURE__ */ defineComponent({
  __name: "TooltipContentHoverable",
  props: {
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: {},
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean }
  },
  setup(e) {
    const t = Io(e), { forwardRef: n, currentElement: r } = ue(), { trigger: o, onClose: a } = Or(), s = Vo(), { isPointerInTransit: l, onPointerExit: i } = Lu(o, r);
    return s.isPointerInTransitRef = l, i(() => {
      a();
    }), (u, c) => (openBlock(), createBlock(ts, mergeProps({ ref: unref(n) }, unref(t)), {
      default: withCtx(() => [
        renderSlot(u.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), md = /* @__PURE__ */ defineComponent({
  __name: "TooltipContent",
  props: {
    forceMount: { type: Boolean },
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: { default: "top" },
    sideOffset: {},
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean }
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = Or(), a = Xt(n, r), { forwardRef: s } = ue();
    return (l, i) => (openBlock(), createBlock(unref(Gn), {
      present: l.forceMount || unref(o).open.value
    }, {
      default: withCtx(() => [
        (openBlock(), createBlock(resolveDynamicComponent(unref(o).disableHoverableContent.value ? ts : pd), mergeProps({ ref: unref(s) }, unref(a)), {
          default: withCtx(() => [
            renderSlot(l.$slots, "default")
          ]),
          _: 3
        }, 16))
      ]),
      _: 3
    }, 8, ["present"]));
  }
}), vd = /* @__PURE__ */ defineComponent({
  __name: "TooltipPortal",
  props: {
    to: {},
    disabled: { type: Boolean },
    forceMount: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, r) => (openBlock(), createBlock(unref(zu), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
});
function ns(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = ns(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function gd() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = ns(e)) && (r && (r += " "), r += t);
  return r;
}
const Uo = "-", hd = (e) => {
  const t = yd(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (o) => {
      const a = o.split(Uo);
      return a[0] === "" && a.length !== 1 && a.shift(), rs(a, t) || bd(o);
    },
    getConflictingClassGroupIds: (o, a) => {
      const s = n[o] || [];
      return a && r[o] ? [...s, ...r[o]] : s;
    }
  };
}, rs = (e, t) => {
  var n;
  if (e.length === 0)
    return t.classGroupId;
  const r = e[0], o = t.nextPart.get(r), a = o ? rs(e.slice(1), o) : void 0;
  if (a)
    return a;
  if (t.validators.length === 0)
    return;
  const s = e.join(Uo);
  return (n = t.validators.find(({
    validator: l
  }) => l(s))) == null ? void 0 : n.classGroupId;
}, Ea = /^\[(.+)\]$/, bd = (e) => {
  if (Ea.test(e)) {
    const t = Ea.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, yd = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Ed(Object.entries(e.classGroups), n).forEach(([o, a]) => {
    ro(a, r, o, t);
  }), r;
}, ro = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : wa(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (_d(o)) {
        ro(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      ro(s, wa(t, a), n, r);
    });
  });
}, wa = (e, t) => {
  let n = e;
  return t.split(Uo).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, _d = (e) => e.isThemeGetter, Ed = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([s, l]) => [t + s, l])) : a);
  return [n, o];
}) : e, wd = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (a, s) => {
    n.set(a, s), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let s = n.get(a);
      if (s !== void 0)
        return s;
      if ((s = r.get(a)) !== void 0)
        return o(a, s), s;
    },
    set(a, s) {
      n.has(a) ? n.set(a, s) : o(a, s);
    }
  };
}, os = "!", xd = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], a = t.length, s = (l) => {
    const i = [];
    let u = 0, c = 0, d;
    for (let b = 0; b < l.length; b++) {
      let p = l[b];
      if (u === 0) {
        if (p === o && (r || l.slice(b, b + a) === t)) {
          i.push(l.slice(c, b)), c = b + a;
          continue;
        }
        if (p === "/") {
          d = b;
          continue;
        }
      }
      p === "[" ? u++ : p === "]" && u--;
    }
    const f = i.length === 0 ? l : l.substring(c), m = f.startsWith(os), g = m ? f.substring(1) : f, h2 = d && d > c ? d - c : void 0;
    return {
      modifiers: i,
      hasImportantModifier: m,
      baseClassName: g,
      maybePostfixModifierPosition: h2
    };
  };
  return n ? (l) => n({
    className: l,
    parseClassName: s
  }) : s;
}, Cd = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, Td = (e) => ({
  cache: wd(e.cacheSize),
  parseClassName: xd(e),
  ...hd(e)
}), kd = /\s+/, Nd = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, a = [], s = e.trim().split(kd);
  let l = "";
  for (let i = s.length - 1; i >= 0; i -= 1) {
    const u = s[i], {
      modifiers: c,
      hasImportantModifier: d,
      baseClassName: f,
      maybePostfixModifierPosition: m
    } = n(u);
    let g = !!m, h2 = r(g ? f.substring(0, m) : f);
    if (!h2) {
      if (!g) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      if (h2 = r(f), !h2) {
        l = u + (l.length > 0 ? " " + l : l);
        continue;
      }
      g = false;
    }
    const b = Cd(c).join(":"), p = d ? b + os : b, y = p + h2;
    if (a.includes(y))
      continue;
    a.push(y);
    const _ = o(h2, g);
    for (let E = 0; E < _.length; ++E) {
      const C = _[E];
      a.push(p + C);
    }
    l = u + (l.length > 0 ? " " + l : l);
  }
  return l;
};
function Sd() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = as(t)) && (r && (r += " "), r += n);
  return r;
}
const as = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = as(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Ld(e, ...t) {
  let n, r, o, a = s;
  function s(i) {
    const u = t.reduce((c, d) => d(c), e());
    return n = Td(u), r = n.cache.get, o = n.cache.set, a = l, l(i);
  }
  function l(i) {
    const u = r(i);
    if (u)
      return u;
    const c = Nd(i, n);
    return o(i, c), c;
  }
  return function() {
    return a(Sd.apply(null, arguments));
  };
}
const me = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = true, t;
}, ls = /^\[(?:([a-z-]+):)?(.+)\]$/i, Ad = /^\d+\/\d+$/, Od = /* @__PURE__ */ new Set(["px", "full", "screen"]), Id = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Pd = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Dd = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Rd = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Md = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, lt = (e) => an(e) || Od.has(e) || Ad.test(e), _t = (e) => yn(e, "length", Hd), an = (e) => !!e && !Number.isNaN(Number(e)), Vr = (e) => yn(e, "number", an), Tn = (e) => !!e && Number.isInteger(Number(e)), Fd = (e) => e.endsWith("%") && an(e.slice(0, -1)), ee = (e) => ls.test(e), Et = (e) => Id.test(e), $d = /* @__PURE__ */ new Set(["length", "size", "percentage"]), zd = (e) => yn(e, $d, ss), Bd = (e) => yn(e, "position", ss), Vd = /* @__PURE__ */ new Set(["image", "url"]), Ud = (e) => yn(e, Vd, Gd), Wd = (e) => yn(e, "", jd), kn = () => true, yn = (e, t, n) => {
  const r = ls.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : false;
}, Hd = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Pd.test(e) && !Dd.test(e)
), ss = () => false, jd = (e) => Rd.test(e), Gd = (e) => Md.test(e), Kd = () => {
  const e = me("colors"), t = me("spacing"), n = me("blur"), r = me("brightness"), o = me("borderColor"), a = me("borderRadius"), s = me("borderSpacing"), l = me("borderWidth"), i = me("contrast"), u = me("grayscale"), c = me("hueRotate"), d = me("invert"), f = me("gap"), m = me("gradientColorStops"), g = me("gradientColorStopPositions"), h2 = me("inset"), b = me("margin"), p = me("opacity"), y = me("padding"), _ = me("saturate"), E = me("scale"), C = me("sepia"), S = me("skew"), T = me("space"), V = me("translate"), G = () => ["auto", "contain", "none"], F = () => ["auto", "hidden", "clip", "visible", "scroll"], q = () => ["auto", ee, t], U = () => [ee, t], ve = () => ["", lt, _t], ne = () => ["auto", an, ee], ie = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], D = () => ["solid", "dashed", "dotted", "double", "none"], k = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], I = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], z = () => ["", "0", ee], B = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], K = () => [an, ee];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [kn],
      spacing: [lt, _t],
      blur: ["none", "", Et, ee],
      brightness: K(),
      borderColor: [e],
      borderRadius: ["none", "", "full", Et, ee],
      borderSpacing: U(),
      borderWidth: ve(),
      contrast: K(),
      grayscale: z(),
      hueRotate: K(),
      invert: z(),
      gap: U(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Fd, _t],
      inset: q(),
      margin: q(),
      opacity: K(),
      padding: U(),
      saturate: K(),
      scale: K(),
      sepia: z(),
      skew: K(),
      space: U(),
      translate: U()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", ee]
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
        columns: [Et]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": B()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": B()
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
        object: [...ie(), ee]
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
        overscroll: G()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": G()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": G()
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
        inset: [h2]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [h2]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [h2]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [h2]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [h2]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [h2]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [h2]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [h2]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [h2]
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
        z: ["auto", Tn, ee]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: q()
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
        flex: ["1", "auto", "initial", "none", ee]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: z()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: z()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Tn, ee]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [kn]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Tn, ee]
        }, ee]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": ne()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": ne()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [kn]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Tn, ee]
        }, ee]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": ne()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": ne()
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
        "auto-cols": ["auto", "min", "max", "fr", ee]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", ee]
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
        justify: ["normal", ...I()]
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
        content: ["normal", ...I(), "baseline"]
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
        "place-content": [...I(), "baseline"]
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
        p: [y]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [y]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [y]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [y]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [y]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [y]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [y]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [y]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [y]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [b]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [b]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [b]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [b]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [b]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [b]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [b]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [b]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [b]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [T]
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
        "space-y": [T]
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
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", ee, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [ee, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [ee, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [Et]
        }, Et]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [ee, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [ee, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [ee, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [ee, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", Et, _t]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", Vr]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [kn]
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
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", ee]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", an, Vr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", lt, ee]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", ee]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", ee]
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
        "placeholder-opacity": [p]
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
        "text-opacity": [p]
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
        decoration: [...D(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", lt, _t]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", lt, ee]
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
        indent: U()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ee]
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
        content: ["none", ee]
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
        "bg-opacity": [p]
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
        bg: [...ie(), Bd]
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
        bg: ["auto", "cover", "contain", zd]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Ud]
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
        from: [g]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [g]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [g]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [m]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [m]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [m]
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
        border: [l]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [l]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [l]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [l]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [l]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [l]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [l]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [l]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [l]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [p]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...D(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [l]
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
        "divide-y": [l]
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
        "divide-opacity": [p]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: D()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [o]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [o]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [o]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [o]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [o]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [o]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [o]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [o]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [o]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [o]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...D()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [lt, ee]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [lt, _t]
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
        ring: ve()
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
        "ring-opacity": [p]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [lt, _t]
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
        shadow: ["", "inner", "none", Et, Wd]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [kn]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [p]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...k(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": k()
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
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [i]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", Et, ee]
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
        saturate: [_]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [C]
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
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [i]
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
        "backdrop-opacity": [p]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [_]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [C]
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
        "border-spacing": [s]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [s]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [s]
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
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", ee]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: K()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", ee]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: K()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", ee]
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
        rotate: [Tn, ee]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [V]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [V]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [S]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [S]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", ee]
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ee]
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
        "scroll-m": U()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": U()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": U()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": U()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": U()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": U()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": U()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": U()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": U()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": U()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": U()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": U()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": U()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": U()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": U()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": U()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": U()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": U()
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
        "will-change": ["auto", "scroll", "contents", "transform", ee]
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
        stroke: [lt, _t, Vr]
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
}, Yd = /* @__PURE__ */ Ld(Kd);
function Je(...e) {
  return Yd(gd(e));
}
const Wo = /* @__PURE__ */ defineComponent({
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
    return (n, r) => (openBlock(), createBlock(unref(be), {
      as: n.as,
      "as-child": n.asChild,
      class: normalizeClass(unref(Je)(unref(Xd)({ variant: n.variant, size: n.size }), t.class))
    }, {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "as-child", "class"]));
  }
}), Xd = Eo(
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
const qd = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var er = {
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
const Jd = ({ size: e, strokeWidth: t = 2, absoluteStrokeWidth: n, color: r, iconNode: o, name: a, class: s, ...l }, { slots: i }) => h$1(
  "svg",
  {
    ...er,
    width: e || er.width,
    height: e || er.height,
    stroke: r || er.stroke,
    "stroke-width": n ? Number(t) * 24 / Number(e) : t,
    class: ["lucide", `lucide-${qd(a != null ? a : "icon")}`],
    ...l
  },
  [...o.map((u) => h$1(...u)), ...i.default ? [i.default()] : []]
);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const is = (e, t) => (n, { slots: r }) => h$1(
  Jd,
  {
    ...n,
    iconNode: t,
    name: e
  },
  r
);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qd = is("GripVerticalIcon", [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zd = is("RefreshCwIcon", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]), ef = { class: "flex gap-2 items-center" }, tf = { key: 1 }, Kn = /* @__PURE__ */ defineComponent({
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
    return (n, r) => (openBlock(), createBlock(unref(be), {
      as: n.as,
      "as-child": n.asChild,
      class: normalizeClass(unref(Je)(unref(nf)({ variant: n.variant, size: n.size }), t.class))
    }, {
      default: withCtx(() => [
        renderSlot(n.$slots, "default"),
        createElementVNode("div", ef, [
          n.suppressSpinner ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Zd), {
            key: 0,
            class: "animate-spin size-3"
          })),
          n.label ? (openBlock(), createElementBlock("span", tf, toDisplayString(n.label), 1)) : createCommentVNode("", true)
        ])
      ]),
      _: 3
    }, 8, ["as", "as-child", "class"]));
  }
}), nf = Eo(
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
), rf = {
  key: 0,
  class: "z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border"
}, tr = /* @__PURE__ */ defineComponent({
  __name: "ResizableHandle",
  props: {
    id: {},
    hitAreaMargins: {},
    tabindex: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {},
    withHandle: { type: Boolean }
  },
  emits: ["dragging"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = computed(() => {
      const { class: s, ...l } = n;
      return l;
    }), a = Xt(o, r);
    return (s, l) => (openBlock(), createBlock(unref(td), mergeProps(unref(a), {
      class: unref(Je)("relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&[data-orientation=vertical]]:h-px [&[data-orientation=vertical]]:w-full [&[data-orientation=vertical]]:after:left-0 [&[data-orientation=vertical]]:after:h-1 [&[data-orientation=vertical]]:after:w-full [&[data-orientation=vertical]]:after:-translate-y-1/2 [&[data-orientation=vertical]]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90", n.class)
    }), {
      default: withCtx(() => [
        n.withHandle ? (openBlock(), createElementBlock("div", rf, [
          createVNode(unref(Qd), { class: "h-2.5 w-2.5" })
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), nr = /* @__PURE__ */ defineComponent({
  __name: "ResizablePanelGroup",
  props: {
    id: {},
    autoSaveId: {},
    direction: {},
    keyboardResizeBy: {},
    storage: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["layout"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = computed(() => {
      const { class: s, ...l } = n;
      return l;
    }), a = Xt(o, r);
    return (s, l) => (openBlock(), createBlock(unref(Zc), mergeProps(unref(a), {
      class: unref(Je)(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        n.class
      )
    }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), of = /* @__PURE__ */ defineComponent({
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
      const { class: r, ...o } = t;
      return o;
    });
    return (r, o) => (openBlock(), createBlock(unref(Nc), mergeProps(n.value, {
      class: unref(Je)(
        "flex touch-none select-none transition-colors",
        r.orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-px",
        r.orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-px",
        t.class
      )
    }), {
      default: withCtx(() => [
        createVNode(unref(Sc), { class: "relative flex-1 rounded-full bg-border" })
      ]),
      _: 1
    }, 16, ["class"]));
  }
}), af = /* @__PURE__ */ defineComponent({
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
      const { class: r, ...o } = t;
      return o;
    });
    return (r, o) => (openBlock(), createBlock(unref(hc), mergeProps(n.value, {
      class: unref(Je)("relative overflow-hidden", t.class)
    }), {
      default: withCtx(() => [
        createVNode(unref(bc), { class: "h-full w-full rounded-[inherit]" }, {
          default: withCtx(() => [
            renderSlot(r.$slots, "default")
          ]),
          _: 3
        }),
        createVNode(of),
        createVNode(unref(Ac))
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), us = /* @__PURE__ */ defineComponent({
  __name: "Tabs",
  props: {
    defaultValue: {},
    orientation: {},
    dir: {},
    activationMode: {},
    modelValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = Xt(e, t);
    return (r, o) => (openBlock(), createBlock(unref(rd), normalizeProps(guardReactiveProps(unref(n))), {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), cs = /* @__PURE__ */ defineComponent({
  __name: "TabsContent",
  props: {
    value: {},
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e, n = computed(() => {
      const { class: r, ...o } = t;
      return o;
    });
    return (r, o) => (openBlock(), createBlock(unref(ad), mergeProps({
      class: unref(Je)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", t.class)
    }, n.value), {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), ds = /* @__PURE__ */ defineComponent({
  __name: "TabsList",
  props: {
    loop: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e, n = computed(() => {
      const { class: r, ...o } = t;
      return o;
    });
    return (r, o) => (openBlock(), createBlock(unref(od), mergeProps(n.value, {
      class: unref(Je)(
        "inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        t.class
      )
    }), {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), lf = { class: "truncate" }, oo = /* @__PURE__ */ defineComponent({
  __name: "TabsTrigger",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(e) {
    const t = e, n = computed(() => {
      const { class: o, ...a } = t;
      return a;
    }), r = Io(n);
    return (o, a) => (openBlock(), createBlock(unref(ld), mergeProps(unref(r), {
      class: unref(Je)(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        t.class
      )
    }), {
      default: withCtx(() => [
        createElementVNode("span", lf, [
          renderSlot(o.$slots, "default")
        ])
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), sf = /* @__PURE__ */ defineComponent({
  __name: "Toggle",
  props: {
    defaultValue: { type: Boolean },
    pressed: { type: Boolean },
    disabled: { type: Boolean, default: false },
    asChild: { type: Boolean },
    as: {},
    class: {},
    variant: { default: "default" },
    size: { default: "default" }
  },
  emits: ["update:pressed"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = computed(() => {
      const { class: s, size: l, variant: i, ...u } = n;
      return u;
    }), a = Xt(o, r);
    return (s, l) => (openBlock(), createBlock(unref(sd), mergeProps(unref(a), {
      class: unref(Je)(unref(uf)({ variant: s.variant, size: s.size }), n.class)
    }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), uf = Eo(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), fs = /* @__PURE__ */ defineComponent({
  __name: "Tooltip",
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    delayDuration: {},
    disableHoverableContent: { type: Boolean },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean }
  },
  emits: ["update:open"],
  setup(e, { emit: t }) {
    const n = Xt(e, t);
    return (r, o) => (openBlock(), createBlock(unref(dd), normalizeProps(guardReactiveProps(unref(n))), {
      default: withCtx(() => [
        renderSlot(r.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), ps = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "TooltipContent",
  props: {
    forceMount: { type: Boolean },
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: {},
    sideOffset: { default: 4 },
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    class: {},
    portal: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = computed(() => {
      const { class: s, portal: l, ...i } = n;
      return i;
    }), a = Xt(o, r);
    return (s, l) => (openBlock(), createBlock(unref(vd), normalizeProps(guardReactiveProps(s.portal)), {
      default: withCtx(() => [
        createVNode(unref(md), mergeProps({ ...unref(a), ...s.$attrs }, {
          class: unref(Je)(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            n.class
          )
        }), {
          default: withCtx(() => [
            renderSlot(s.$slots, "default")
          ]),
          _: 3
        }, 16, ["class"])
      ]),
      _: 3
    }, 16));
  }
}), ms = /* @__PURE__ */ defineComponent({
  __name: "TooltipProvider",
  props: {
    delayDuration: {},
    skipDelayDuration: {},
    disableHoverableContent: { type: Boolean },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean }
  },
  setup(e) {
    const t = e;
    return (n, r) => (openBlock(), createBlock(unref(ud), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), vs = /* @__PURE__ */ defineComponent({
  __name: "TooltipTrigger",
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(e) {
    const t = e;
    return (n, r) => (openBlock(), createBlock(unref(fd), normalizeProps(guardReactiveProps(t)), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), cf = (e, t, n = { deep: true }) => {
  const r = ref(t);
  return watch(
    e,
    (o) => {
      o !== void 0 && (r.value = o);
    },
    { deep: n.deep }
  ), [computed(
    () => typeof e.value > "u" ? r.value : e.value
  ), (o) => {
    e.value = o, r.value = o;
  }];
};
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const df = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var rr = {
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
const ff = ({ size: e, strokeWidth: t = 2, absoluteStrokeWidth: n, color: r, iconNode: o, name: a, class: s, ...l }, { slots: i }) => h$1(
  "svg",
  {
    ...rr,
    width: e || rr.width,
    height: e || rr.height,
    stroke: r || rr.stroke,
    "stroke-width": n ? Number(t) * 24 / Number(e) : t,
    class: ["lucide", `lucide-${df(a != null ? a : "icon")}`],
    ...l
  },
  [...o.map((u) => h$1(...u)), ...i.default ? [i.default()] : []]
);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ke = (e, t) => (n, { slots: r }) => h$1(
  ff,
  {
    ...n,
    iconNode: t,
    name: e
  },
  r
);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pf = ke("BinaryIcon", [
  ["rect", { x: "14", y: "14", width: "4", height: "6", rx: "2", key: "p02svl" }],
  ["rect", { x: "6", y: "4", width: "4", height: "6", rx: "2", key: "xm4xkj" }],
  ["path", { d: "M6 20h4", key: "1i6q5t" }],
  ["path", { d: "M14 10h4", key: "ru81e7" }],
  ["path", { d: "M6 14h2v6", key: "16z9wg" }],
  ["path", { d: "M14 4h2v6", key: "1idq9u" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gs = ke("EyeIcon", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hs = ke("FileCodeIcon", [
  ["path", { d: "M10 12.5 8 15l2 2.5", key: "1tg20x" }],
  ["path", { d: "m14 12.5 2 2.5-2 2.5", key: "yinavb" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z", key: "1mlx9k" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mf = ke("FileIcon", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vf = ke("FolderCodeIcon", [
  ["path", { d: "M10 10.5 8 13l2 2.5", key: "m4t9c1" }],
  ["path", { d: "m14 10.5 2 2.5-2 2.5", key: "14w2eb" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z",
      key: "1u1bxd"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gf = ke("FolderOpenIcon", [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hf = ke("FolderIcon", [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bf = ke("LightbulbIcon", [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yf = ke("LockIcon", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _f = ke("MaximizeIcon", [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }],
  ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }],
  ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }],
  ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ef = ke("MinimizeIcon", [
  ["path", { d: "M8 3v3a2 2 0 0 1-2 2H3", key: "hohbtr" }],
  ["path", { d: "M21 8h-3a2 2 0 0 1-2-2V3", key: "5jw1f3" }],
  ["path", { d: "M3 16h3a2 2 0 0 1 2 2v3", key: "198tvr" }],
  ["path", { d: "M16 21v-3a2 2 0 0 1 2-2h3", key: "ph8mxp" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wf = ke("MoonStarIcon", [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9", key: "4ay0iu" }],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bs = ke("PlayIcon", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xf = ke("PlusIcon", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ys = ke("RotateCwIcon", [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _s = ke("SquareTerminalIcon", [
  ["path", { d: "m7 11 2-2-2-2", key: "1lz0vl" }],
  ["path", { d: "M11 13h4", key: "1p7l4v" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cf = ke("SquareXIcon", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tf = ke("SunIcon", [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
]);
/**
 * @license lucide-vue-next v0.453.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Es = ke("XIcon", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
const mt = (e, t = false) => t ? Symbol.for(e) : Symbol(e), Nf = (e, t, n) => Sf({ l: e, k: t, s: n }), Sf = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Ne = (e) => typeof e == "number" && isFinite(e), Lf = (e) => Ho(e) === "[object Date]", mr = (e) => Ho(e) === "[object RegExp]", Pr = (e) => ae(e) && Object.keys(e).length === 0, Se = Object.assign, Af = Object.create, fe = (e = null) => Af(e);
function Ca(e) {
  return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const Of = Object.prototype.hasOwnProperty;
function Ye(e, t) {
  return Of.call(e, t);
}
const Ce = Array.isArray, he = (e) => typeof e == "function", H = (e) => typeof e == "string", xe = (e) => typeof e == "boolean", le = (e) => e !== null && typeof e == "object", If = (e) => le(e) && he(e.then) && he(e.catch), ws = Object.prototype.toString, Ho = (e) => ws.call(e), ae = (e) => Ho(e) === "[object Object]", Pf = (e) => e == null ? "" : Ce(e) || ae(e) && e.toString === ws ? JSON.stringify(e, null, 2) : String(e);
function jo(e, t = "") {
  return e.reduce((n, r, o) => o === 0 ? n + r : n + t + r, "");
}
function Ot(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const or = (e) => !le(e) || Ce(e);
function ur(e, t) {
  if (or(e) || or(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: r, des: o } = n.pop();
    Object.keys(r).forEach((a) => {
      a !== "__proto__" && (le(r[a]) && !le(o[a]) && (o[a] = Array.isArray(r[a]) ? [] : fe()), or(o[a]) || or(r[a]) ? o[a] = r[a] : n.push({ src: r[a], des: o[a] }));
    });
  }
}
/*!
  * message-compiler v11.0.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function Ff(e, t, n) {
  return { line: e, column: t, offset: n };
}
function ao(e, t, n) {
  return { start: e, end: t };
}
const Q = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16
}, $f = 17;
function _n(e, t, n = {}) {
  const { domain: r, messages: o, args: a } = n, s = e, l = new SyntaxError(String(s));
  return l.code = e, t && (l.location = t), l.domain = r, l;
}
function Bf(e) {
  throw e;
}
const st = " ", Wf = "\r", De = `
`, Hf = "\u2028", jf = "\u2029";
function Gf(e) {
  const t = e;
  let n = 0, r = 1, o = 1, a = 0;
  const s = (T) => t[T] === Wf && t[T + 1] === De, l = (T) => t[T] === De, i = (T) => t[T] === jf, u = (T) => t[T] === Hf, c = (T) => s(T) || l(T) || i(T) || u(T), d = () => n, f = () => r, m = () => o, g = () => a, h2 = (T) => s(T) || i(T) || u(T) ? De : t[T], b = () => h2(n), p = () => h2(n + a);
  function y() {
    return a = 0, c(n) && (r++, o = 0), s(n) && n++, n++, o++, t[n];
  }
  function _() {
    return s(n + a) && a++, a++, t[n + a];
  }
  function E() {
    n = 0, r = 1, o = 1, a = 0;
  }
  function C(T = 0) {
    a = T;
  }
  function S() {
    const T = n + a;
    for (; T !== n; )
      y();
    a = 0;
  }
  return {
    index: d,
    line: f,
    column: m,
    peekOffset: g,
    charAt: h2,
    currentChar: b,
    currentPeek: p,
    next: y,
    peek: _,
    reset: E,
    resetPeek: C,
    skipToPeek: S
  };
}
const wt = void 0, Na = "'", Yf = "tokenizer";
function Xf(e, t = {}) {
  const n = t.location !== false, r = Gf(e), o = () => r.index(), a = () => Ff(r.line(), r.column(), r.index()), s = a(), l = o(), i = {
    currentType: 13,
    offset: l,
    startLoc: s,
    endLoc: s,
    lastType: 13,
    lastOffset: l,
    lastStartLoc: s,
    lastEndLoc: s,
    braceNest: 0,
    inLinked: false,
    text: ""
  }, u = () => i, { onError: c } = t;
  function d(w, x, R, ...X) {
    const _e = u();
    if (x.column += R, x.offset += R, c) {
      const Ee = n ? ao(_e.startLoc, x) : null, oe = _n(w, Ee, {
        domain: Yf,
        args: X
      });
      c(oe);
    }
  }
  function f(w, x, R) {
    w.endLoc = a(), w.currentType = x;
    const X = { type: x };
    return n && (X.loc = ao(w.startLoc, w.endLoc)), R != null && (X.value = R), X;
  }
  const m = (w) => f(
    w,
    13
    /* TokenTypes.EOF */
  );
  function g(w, x) {
    return w.currentChar() === x ? (w.next(), x) : (d(Q.EXPECTED_TOKEN, a(), 0, x), "");
  }
  function h2(w) {
    let x = "";
    for (; w.currentPeek() === st || w.currentPeek() === De; )
      x += w.currentPeek(), w.peek();
    return x;
  }
  function b(w) {
    const x = h2(w);
    return w.skipToPeek(), x;
  }
  function p(w) {
    if (w === wt)
      return false;
    const x = w.charCodeAt(0);
    return x >= 97 && x <= 122 || // a-z
    x >= 65 && x <= 90 || // A-Z
    x === 95;
  }
  function y(w) {
    if (w === wt)
      return false;
    const x = w.charCodeAt(0);
    return x >= 48 && x <= 57;
  }
  function _(w, x) {
    const { currentType: R } = x;
    if (R !== 2)
      return false;
    h2(w);
    const X = p(w.currentPeek());
    return w.resetPeek(), X;
  }
  function E(w, x) {
    const { currentType: R } = x;
    if (R !== 2)
      return false;
    h2(w);
    const X = w.currentPeek() === "-" ? w.peek() : w.currentPeek(), _e = y(X);
    return w.resetPeek(), _e;
  }
  function C(w, x) {
    const { currentType: R } = x;
    if (R !== 2)
      return false;
    h2(w);
    const X = w.currentPeek() === Na;
    return w.resetPeek(), X;
  }
  function S(w, x) {
    const { currentType: R } = x;
    if (R !== 7)
      return false;
    h2(w);
    const X = w.currentPeek() === ".";
    return w.resetPeek(), X;
  }
  function T(w, x) {
    const { currentType: R } = x;
    if (R !== 8)
      return false;
    h2(w);
    const X = p(w.currentPeek());
    return w.resetPeek(), X;
  }
  function V(w, x) {
    const { currentType: R } = x;
    if (!(R === 7 || R === 11))
      return false;
    h2(w);
    const X = w.currentPeek() === ":";
    return w.resetPeek(), X;
  }
  function G(w, x) {
    const { currentType: R } = x;
    if (R !== 9)
      return false;
    const X = () => {
      const Ee = w.currentPeek();
      return Ee === "{" ? p(w.peek()) : Ee === "@" || Ee === "|" || Ee === ":" || Ee === "." || Ee === st || !Ee ? false : Ee === De ? (w.peek(), X()) : q(w, false);
    }, _e = X();
    return w.resetPeek(), _e;
  }
  function F(w) {
    h2(w);
    const x = w.currentPeek() === "|";
    return w.resetPeek(), x;
  }
  function q(w, x = true) {
    const R = (_e = false, Ee = "") => {
      const oe = w.currentPeek();
      return oe === "{" || oe === "@" || !oe ? _e : oe === "|" ? !(Ee === st || Ee === De) : oe === st ? (w.peek(), R(true, st)) : oe === De ? (w.peek(), R(true, De)) : true;
    }, X = R();
    return x && w.resetPeek(), X;
  }
  function U(w, x) {
    const R = w.currentChar();
    return R === wt ? wt : x(R) ? (w.next(), R) : null;
  }
  function ve(w) {
    const x = w.charCodeAt(0);
    return x >= 97 && x <= 122 || // a-z
    x >= 65 && x <= 90 || // A-Z
    x >= 48 && x <= 57 || // 0-9
    x === 95 || // _
    x === 36;
  }
  function ne(w) {
    return U(w, ve);
  }
  function ie(w) {
    const x = w.charCodeAt(0);
    return x >= 97 && x <= 122 || // a-z
    x >= 65 && x <= 90 || // A-Z
    x >= 48 && x <= 57 || // 0-9
    x === 95 || // _
    x === 36 || // $
    x === 45;
  }
  function D(w) {
    return U(w, ie);
  }
  function k(w) {
    const x = w.charCodeAt(0);
    return x >= 48 && x <= 57;
  }
  function I(w) {
    return U(w, k);
  }
  function z(w) {
    const x = w.charCodeAt(0);
    return x >= 48 && x <= 57 || // 0-9
    x >= 65 && x <= 70 || // A-F
    x >= 97 && x <= 102;
  }
  function B(w) {
    return U(w, z);
  }
  function K(w) {
    let x = "", R = "";
    for (; x = I(w); )
      R += x;
    return R;
  }
  function Z(w) {
    let x = "";
    for (; ; ) {
      const R = w.currentChar();
      if (R === "{" || R === "}" || R === "@" || R === "|" || !R)
        break;
      if (R === st || R === De)
        if (q(w))
          x += R, w.next();
        else {
          if (F(w))
            break;
          x += R, w.next();
        }
      else
        x += R, w.next();
    }
    return x;
  }
  function ye(w) {
    b(w);
    let x = "", R = "";
    for (; x = D(w); )
      R += x;
    return w.currentChar() === wt && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), R;
  }
  function Ae(w) {
    b(w);
    let x = "";
    return w.currentChar() === "-" ? (w.next(), x += `-${K(w)}`) : x += K(w), w.currentChar() === wt && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), x;
  }
  function pe(w) {
    return w !== Na && w !== De;
  }
  function He(w) {
    b(w), g(w, "'");
    let x = "", R = "";
    for (; x = U(w, pe); )
      x === "\\" ? R += Qe(w) : R += x;
    const X = w.currentChar();
    return X === De || X === wt ? (d(Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, a(), 0), X === De && (w.next(), g(w, "'")), R) : (g(w, "'"), R);
  }
  function Qe(w) {
    const x = w.currentChar();
    switch (x) {
      case "\\":
      case "'":
        return w.next(), `\\${x}`;
      case "u":
        return ge(w, x, 4);
      case "U":
        return ge(w, x, 6);
      default:
        return d(Q.UNKNOWN_ESCAPE_SEQUENCE, a(), 0, x), "";
    }
  }
  function ge(w, x, R) {
    g(w, x);
    let X = "";
    for (let _e = 0; _e < R; _e++) {
      const Ee = B(w);
      if (!Ee) {
        d(Q.INVALID_UNICODE_ESCAPE_SEQUENCE, a(), 0, `\\${x}${X}${w.currentChar()}`);
        break;
      }
      X += Ee;
    }
    return `\\${x}${X}`;
  }
  function qt(w) {
    return w !== "{" && w !== "}" && w !== st && w !== De;
  }
  function En(w) {
    b(w);
    let x = "", R = "";
    for (; x = U(w, qt); )
      R += x;
    return R;
  }
  function ot(w) {
    let x = "", R = "";
    for (; x = ne(w); )
      R += x;
    return R;
  }
  function Jt(w) {
    const x = (R) => {
      const X = w.currentChar();
      return X === "{" || X === "@" || X === "|" || X === "(" || X === ")" || !X || X === st ? R : (R += X, w.next(), x(R));
    };
    return x("");
  }
  function Dt(w) {
    b(w);
    const x = g(
      w,
      "|"
      /* TokenChars.Pipe */
    );
    return b(w), x;
  }
  function wn(w, x) {
    let R = null;
    switch (w.currentChar()) {
      case "{":
        return x.braceNest >= 1 && d(Q.NOT_ALLOW_NEST_PLACEHOLDER, a(), 0), w.next(), R = f(
          x,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), b(w), x.braceNest++, R;
      case "}":
        return x.braceNest > 0 && x.currentType === 2 && d(Q.EMPTY_PLACEHOLDER, a(), 0), w.next(), R = f(
          x,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), x.braceNest--, x.braceNest > 0 && b(w), x.inLinked && x.braceNest === 0 && (x.inLinked = false), R;
      case "@":
        return x.braceNest > 0 && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), R = Rt(w, x) || m(x), x.braceNest = 0, R;
      default: {
        let _e = true, Ee = true, oe = true;
        if (F(w))
          return x.braceNest > 0 && d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), R = f(x, 1, Dt(w)), x.braceNest = 0, x.inLinked = false, R;
        if (x.braceNest > 0 && (x.currentType === 4 || x.currentType === 5 || x.currentType === 6))
          return d(Q.UNTERMINATED_CLOSING_BRACE, a(), 0), x.braceNest = 0, xn(w, x);
        if (_e = _(w, x))
          return R = f(x, 4, ye(w)), b(w), R;
        if (Ee = E(w, x))
          return R = f(x, 5, Ae(w)), b(w), R;
        if (oe = C(w, x))
          return R = f(x, 6, He(w)), b(w), R;
        if (!_e && !Ee && !oe)
          return R = f(x, 12, En(w)), d(Q.INVALID_TOKEN_IN_PLACEHOLDER, a(), 0, R.value), b(w), R;
        break;
      }
    }
    return R;
  }
  function Rt(w, x) {
    const { currentType: R } = x;
    let X = null;
    const _e = w.currentChar();
    switch ((R === 7 || R === 8 || R === 11 || R === 9) && (_e === De || _e === st) && d(Q.INVALID_LINKED_FORMAT, a(), 0), _e) {
      case "@":
        return w.next(), X = f(
          x,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), x.inLinked = true, X;
      case ".":
        return b(w), w.next(), f(
          x,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return b(w), w.next(), f(
          x,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return F(w) ? (X = f(x, 1, Dt(w)), x.braceNest = 0, x.inLinked = false, X) : S(w, x) || V(w, x) ? (b(w), Rt(w, x)) : T(w, x) ? (b(w), f(x, 11, ot(w))) : G(w, x) ? (b(w), _e === "{" ? wn(w, x) || X : f(x, 10, Jt(w))) : (R === 7 && d(Q.INVALID_LINKED_FORMAT, a(), 0), x.braceNest = 0, x.inLinked = false, xn(w, x));
    }
  }
  function xn(w, x) {
    let R = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (x.braceNest > 0)
      return wn(w, x) || m(x);
    if (x.inLinked)
      return Rt(w, x) || m(x);
    switch (w.currentChar()) {
      case "{":
        return wn(w, x) || m(x);
      case "}":
        return d(Q.UNBALANCED_CLOSING_BRACE, a(), 0), w.next(), f(
          x,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Rt(w, x) || m(x);
      default: {
        if (F(w))
          return R = f(x, 1, Dt(w)), x.braceNest = 0, x.inLinked = false, R;
        if (q(w))
          return f(x, 0, Z(w));
        break;
      }
    }
    return R;
  }
  function Fr() {
    const { currentType: w, offset: x, startLoc: R, endLoc: X } = i;
    return i.lastType = w, i.lastOffset = x, i.lastStartLoc = R, i.lastEndLoc = X, i.offset = o(), i.startLoc = a(), r.currentChar() === wt ? f(
      i,
      13
      /* TokenTypes.EOF */
    ) : xn(r, i);
  }
  return {
    nextToken: Fr,
    currentOffset: o,
    currentPosition: a,
    context: u
  };
}
const qf = "parser", Jf = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Qf(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    // eslint-disable-next-line no-useless-escape
    case "\\'":
      return "'";
    default: {
      const r = parseInt(t || n, 16);
      return r <= 55295 || r >= 57344 ? String.fromCodePoint(r) : "\uFFFD";
    }
  }
}
function Zf(e = {}) {
  const t = e.location !== false, { onError: n } = e;
  function r(p, y, _, E, ...C) {
    const S = p.currentPosition();
    if (S.offset += E, S.column += E, n) {
      const T = t ? ao(_, S) : null, V = _n(y, T, {
        domain: qf,
        args: C
      });
      n(V);
    }
  }
  function o(p, y, _) {
    const E = { type: p };
    return t && (E.start = y, E.end = y, E.loc = { start: _, end: _ }), E;
  }
  function a(p, y, _, E) {
    t && (p.end = y, p.loc && (p.loc.end = _));
  }
  function s(p, y) {
    const _ = p.context(), E = o(3, _.offset, _.startLoc);
    return E.value = y, a(E, p.currentOffset(), p.currentPosition()), E;
  }
  function l(p, y) {
    const _ = p.context(), { lastOffset: E, lastStartLoc: C } = _, S = o(5, E, C);
    return S.index = parseInt(y, 10), p.nextToken(), a(S, p.currentOffset(), p.currentPosition()), S;
  }
  function i(p, y) {
    const _ = p.context(), { lastOffset: E, lastStartLoc: C } = _, S = o(4, E, C);
    return S.key = y, p.nextToken(), a(S, p.currentOffset(), p.currentPosition()), S;
  }
  function u(p, y) {
    const _ = p.context(), { lastOffset: E, lastStartLoc: C } = _, S = o(9, E, C);
    return S.value = y.replace(Jf, Qf), p.nextToken(), a(S, p.currentOffset(), p.currentPosition()), S;
  }
  function c(p) {
    const y = p.nextToken(), _ = p.context(), { lastOffset: E, lastStartLoc: C } = _, S = o(8, E, C);
    return y.type !== 11 ? (r(p, Q.UNEXPECTED_EMPTY_LINKED_MODIFIER, _.lastStartLoc, 0), S.value = "", a(S, E, C), {
      nextConsumeToken: y,
      node: S
    }) : (y.value == null && r(p, Q.UNEXPECTED_LEXICAL_ANALYSIS, _.lastStartLoc, 0, Ze(y)), S.value = y.value || "", a(S, p.currentOffset(), p.currentPosition()), {
      node: S
    });
  }
  function d(p, y) {
    const _ = p.context(), E = o(7, _.offset, _.startLoc);
    return E.value = y, a(E, p.currentOffset(), p.currentPosition()), E;
  }
  function f(p) {
    const y = p.context(), _ = o(6, y.offset, y.startLoc);
    let E = p.nextToken();
    if (E.type === 8) {
      const C = c(p);
      _.modifier = C.node, E = C.nextConsumeToken || p.nextToken();
    }
    switch (E.type !== 9 && r(p, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ze(E)), E = p.nextToken(), E.type === 2 && (E = p.nextToken()), E.type) {
      case 10:
        E.value == null && r(p, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ze(E)), _.key = d(p, E.value || "");
        break;
      case 4:
        E.value == null && r(p, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ze(E)), _.key = i(p, E.value || "");
        break;
      case 5:
        E.value == null && r(p, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ze(E)), _.key = l(p, E.value || "");
        break;
      case 6:
        E.value == null && r(p, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ze(E)), _.key = u(p, E.value || "");
        break;
      default: {
        r(p, Q.UNEXPECTED_EMPTY_LINKED_KEY, y.lastStartLoc, 0);
        const C = p.context(), S = o(7, C.offset, C.startLoc);
        return S.value = "", a(S, C.offset, C.startLoc), _.key = S, a(_, C.offset, C.startLoc), {
          nextConsumeToken: E,
          node: _
        };
      }
    }
    return a(_, p.currentOffset(), p.currentPosition()), {
      node: _
    };
  }
  function m(p) {
    const y = p.context(), _ = y.currentType === 1 ? p.currentOffset() : y.offset, E = y.currentType === 1 ? y.endLoc : y.startLoc, C = o(2, _, E);
    C.items = [];
    let S = null;
    do {
      const G = S || p.nextToken();
      switch (S = null, G.type) {
        case 0:
          G.value == null && r(p, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ze(G)), C.items.push(s(p, G.value || ""));
          break;
        case 5:
          G.value == null && r(p, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ze(G)), C.items.push(l(p, G.value || ""));
          break;
        case 4:
          G.value == null && r(p, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ze(G)), C.items.push(i(p, G.value || ""));
          break;
        case 6:
          G.value == null && r(p, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, Ze(G)), C.items.push(u(p, G.value || ""));
          break;
        case 7: {
          const F = f(p);
          C.items.push(F.node), S = F.nextConsumeToken || null;
          break;
        }
      }
    } while (y.currentType !== 13 && y.currentType !== 1);
    const T = y.currentType === 1 ? y.lastOffset : p.currentOffset(), V = y.currentType === 1 ? y.lastEndLoc : p.currentPosition();
    return a(C, T, V), C;
  }
  function g(p, y, _, E) {
    const C = p.context();
    let S = E.items.length === 0;
    const T = o(1, y, _);
    T.cases = [], T.cases.push(E);
    do {
      const V = m(p);
      S || (S = V.items.length === 0), T.cases.push(V);
    } while (C.currentType !== 13);
    return S && r(p, Q.MUST_HAVE_MESSAGES_IN_PLURAL, _, 0), a(T, p.currentOffset(), p.currentPosition()), T;
  }
  function h2(p) {
    const y = p.context(), { offset: _, startLoc: E } = y, C = m(p);
    return y.currentType === 13 ? C : g(p, _, E, C);
  }
  function b(p) {
    const y = Xf(p, Se({}, e)), _ = y.context(), E = o(0, _.offset, _.startLoc);
    return t && E.loc && (E.loc.source = p), E.body = h2(y), e.onCacheKey && (E.cacheKey = e.onCacheKey(p)), _.currentType !== 13 && r(y, Q.UNEXPECTED_LEXICAL_ANALYSIS, _.lastStartLoc, 0, p[_.offset] || ""), a(E, y.currentOffset(), y.currentPosition()), E;
  }
  return { parse: b };
}
function Ze(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "\u2026" : t;
}
function ep(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (a) => (n.helpers.add(a), a) };
}
function Sa(e, t) {
  for (let n = 0; n < e.length; n++)
    Go(e[n], t);
}
function Go(e, t) {
  switch (e.type) {
    case 1:
      Sa(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Sa(e.items, t);
      break;
    case 6: {
      Go(e.key, t), t.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), t.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function tp(e, t = {}) {
  const n = ep(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && Go(e.body, n);
  const r = n.context();
  e.helpers = Array.from(r.helpers);
}
function np(e) {
  const t = e.body;
  return t.type === 2 ? La(t) : t.cases.forEach((n) => La(n)), e;
}
function La(e) {
  if (e.items.length === 1) {
    const t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    const t = [];
    for (let n = 0; n < e.items.length; n++) {
      const r = e.items[n];
      if (!(r.type === 3 || r.type === 9) || r.value == null)
        break;
      t.push(r.value);
    }
    if (t.length === e.items.length) {
      e.static = jo(t);
      for (let n = 0; n < e.items.length; n++) {
        const r = e.items[n];
        (r.type === 3 || r.type === 9) && delete r.value;
      }
    }
  }
}
function tn(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      tn(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let r = 0; r < n.length; r++)
        tn(n[r]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let r = 0; r < n.length; r++)
        tn(n[r]);
      t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const t = e;
      t.value && (t.v = t.value, delete t.value);
      break;
    }
    case 6: {
      const t = e;
      tn(t.key), t.k = t.key, delete t.key, t.modifier && (tn(t.modifier), t.m = t.modifier, delete t.modifier);
      break;
    }
    case 5: {
      const t = e;
      t.i = t.index, delete t.index;
      break;
    }
    case 4: {
      const t = e;
      t.k = t.key, delete t.key;
      break;
    }
  }
  delete e.type;
}
function ap(e, t) {
  const { sourceMap: n, filename: r, breakLineCode: o, needIndent: a } = t, s = t.location !== false, l = {
    filename: r,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: o,
    needIndent: a,
    indentLevel: 0
  };
  s && e.loc && (l.source = e.loc.source);
  const i = () => l;
  function u(b, p) {
    l.code += b;
  }
  function c(b, p = true) {
    const y = p ? o : "";
    u(a ? y + "  ".repeat(b) : y);
  }
  function d(b = true) {
    const p = ++l.indentLevel;
    b && c(p);
  }
  function f(b = true) {
    const p = --l.indentLevel;
    b && c(p);
  }
  function m() {
    c(l.indentLevel);
  }
  return {
    context: i,
    push: u,
    indent: d,
    deindent: f,
    newline: m,
    helper: (b) => `_${b}`,
    needIndent: () => l.needIndent
  };
}
function lp(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), dn(e, t.key), t.modifier ? (e.push(", "), dn(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function sp(e, t) {
  const { helper: n, needIndent: r } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(r());
  const o = t.items.length;
  for (let a = 0; a < o && (dn(e, t.items[a]), a !== o - 1); a++)
    e.push(", ");
  e.deindent(r()), e.push("])");
}
function ip(e, t) {
  const { helper: n, needIndent: r } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(r());
    const o = t.cases.length;
    for (let a = 0; a < o && (dn(e, t.cases[a]), a !== o - 1); a++)
      e.push(", ");
    e.deindent(r()), e.push("])");
  }
}
function up(e, t) {
  t.body ? dn(e, t.body) : e.push("null");
}
function dn(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      up(e, t);
      break;
    case 1:
      ip(e, t);
      break;
    case 2:
      sp(e, t);
      break;
    case 6:
      lp(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "list"
        /* HelperNameMap.LIST */
      )}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
  }
}
const cp = (e, t = {}) => {
  const n = H(t.mode) ? t.mode : "normal", r = H(t.filename) ? t.filename : "message.intl", o = !!t.sourceMap, a = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, s = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], i = ap(e, {
    mode: n,
    filename: r,
    sourceMap: o,
    breakLineCode: a,
    needIndent: s
  });
  i.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), i.indent(s), l.length > 0 && (i.push(`const { ${jo(l.map((d) => `${d}: _${d}`), ", ")} } = ctx`), i.newline()), i.push("return "), dn(i, e), i.deindent(s), i.push("}"), delete e.helpers;
  const { code: u, map: c } = i.context();
  return {
    ast: e,
    code: u,
    map: c ? c.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function dp(e, t = {}) {
  const n = Se({}, t), r = !!n.jit, o = !!n.minify, a = n.optimize == null ? true : n.optimize, l = Zf(n).parse(e);
  return r ? (a && np(l), o && tn(l), { ast: l, code: "" }) : (tp(l, n), cp(l, n));
}
function Ur(e) {
  return (n) => pp(n, e);
}
function pp(e, t) {
  const n = vp(t);
  if (n == null)
    throw Rn(
      0
      /* NodeTypes.Resource */
    );
  if (Ko(n) === 1) {
    const a = hp(n);
    return e.plural(a.reduce((s, l) => [
      ...s,
      Aa(e, l)
    ], []));
  } else
    return Aa(e, n);
}
const mp = ["b", "body"];
function vp(e) {
  return It(e, mp);
}
const gp = ["c", "cases"];
function hp(e) {
  return It(e, gp, []);
}
function Aa(e, t) {
  const n = yp(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const r = Ep(t).reduce((o, a) => [...o, lo(e, a)], []);
    return e.normalize(r);
  }
}
const bp = ["s", "static"];
function yp(e) {
  return It(e, bp);
}
const _p = ["i", "items"];
function Ep(e) {
  return It(e, _p, []);
}
function lo(e, t) {
  const n = Ko(t);
  switch (n) {
    case 3:
      return ar(t, n);
    case 9:
      return ar(t, n);
    case 4: {
      const r = t;
      if (Ye(r, "k") && r.k)
        return e.interpolate(e.named(r.k));
      if (Ye(r, "key") && r.key)
        return e.interpolate(e.named(r.key));
      throw Rn(n);
    }
    case 5: {
      const r = t;
      if (Ye(r, "i") && Ne(r.i))
        return e.interpolate(e.list(r.i));
      if (Ye(r, "index") && Ne(r.index))
        return e.interpolate(e.list(r.index));
      throw Rn(n);
    }
    case 6: {
      const r = t, o = Tp(r), a = Np(r);
      return e.linked(lo(e, a), o ? lo(e, o) : void 0, e.type);
    }
    case 7:
      return ar(t, n);
    case 8:
      return ar(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const wp = ["t", "type"];
function Ko(e) {
  return It(e, wp);
}
const xp = ["v", "value"];
function ar(e, t) {
  const n = It(e, xp);
  if (n)
    return n;
  throw Rn(t);
}
const Cp = ["m", "modifier"];
function Tp(e) {
  return It(e, Cp);
}
const kp = ["k", "key"];
function Np(e) {
  const t = It(e, kp);
  if (t)
    return t;
  throw Rn(
    6
    /* NodeTypes.Linked */
  );
}
function It(e, t, n) {
  for (let r = 0; r < t.length; r++) {
    const o = t[r];
    if (Ye(e, o) && e[o] != null)
      return e[o];
  }
  return n;
}
function Rn(e) {
  return new Error(`unhandled node type: ${e}`);
}
const Ap = (e) => e;
let lr = fe();
function Gt(e) {
  return le(e) && Ko(e) === 0 && (Ye(e, "b") || Ye(e, "body"));
}
function Op(e, t = {}) {
  let n = false;
  const r = t.onError || Bf;
  return t.onError = (o) => {
    n = true, r(o);
  }, { ...dp(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function Ip(e, t) {
  if (H(e)) {
    xe(t.warnHtmlMessage) ? t.warnHtmlMessage : true;
    const o = (t.onCacheKey || Ap)(e), a = lr[o];
    if (a)
      return a;
    const { ast: s, detectError: l } = Op(e, {
      ...t,
      location: false,
      jit: true
    }), i = Ur(s);
    return l ? i : lr[o] = i;
  } else {
    const n = e.cacheKey;
    if (n) {
      const r = lr[n];
      return r || (lr[n] = Ur(e));
    } else
      return Ur(e);
  }
}
const Pe = {
  INVALID_ARGUMENT: $f,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_NON_STRING_MESSAGE: 20,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, Fp = 24;
function it(e) {
  return _n(e, null, void 0);
}
function Yo(e, t) {
  return t.locale != null ? Oa(t.locale) : Oa(e.locale);
}
let Wr;
function Oa(e) {
  if (H(e))
    return e;
  if (he(e)) {
    if (e.resolvedOnce && Wr != null)
      return Wr;
    if (e.constructor.name === "Function") {
      const t = e();
      if (If(t))
        throw it(Pe.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return Wr = t;
    } else
      throw it(Pe.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw it(Pe.NOT_SUPPORT_LOCALE_TYPE);
}
function zp(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Ce(t) ? t : le(t) ? Object.keys(t) : H(t) ? [t] : [n]
  ])];
}
function xs(e, t, n) {
  const r = H(n) ? n : vr, o = e;
  o.__localeChainCache || (o.__localeChainCache = /* @__PURE__ */ new Map());
  let a = o.__localeChainCache.get(r);
  if (!a) {
    a = [];
    let s = [n];
    for (; Ce(s); )
      s = Ia(a, s, t);
    const l = Ce(t) || !ae(t) ? t : t.default ? t.default : null;
    s = H(l) ? [l] : l, Ce(s) && Ia(a, s, false), o.__localeChainCache.set(r, a);
  }
  return a;
}
function Ia(e, t, n) {
  let r = true;
  for (let o = 0; o < t.length && xe(r); o++) {
    const a = t[o];
    H(a) && (r = Bp(e, t[o], n));
  }
  return r;
}
function Bp(e, t, n) {
  let r;
  const o = t.split("-");
  do {
    const a = o.join("-");
    r = Vp(e, a, n), o.splice(-1, 1);
  } while (o.length && r === true);
  return r;
}
function Vp(e, t, n) {
  let r = false;
  if (!e.includes(t) && (r = true, t)) {
    r = t[t.length - 1] !== "!";
    const o = t.replace(/!/g, "");
    e.push(o), (Ce(n) || ae(n)) && n[o] && (r = n[o]);
  }
  return r;
}
const Pt = [];
Pt[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Pt[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  ".": [
    2
    /* States.BEFORE_IDENT */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
Pt[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ]
};
Pt[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  ".": [
    2,
    1
    /* Actions.PUSH */
  ],
  "[": [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
Pt[
  4
  /* States.IN_SUB_PATH */
] = {
  "'": [
    5,
    0
    /* Actions.APPEND */
  ],
  '"': [
    6,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  "]": [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
Pt[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  "'": [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
Pt[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  '"': [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const Up = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Wp(e) {
  return Up.test(e);
}
function Hp(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function jp(e) {
  if (e == null)
    return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    // [
    case 93:
    // ]
    case 46:
    // .
    case 34:
    // "
    case 39:
      return e;
    case 95:
    // _
    case 36:
    // $
    case 45:
      return "i";
    case 9:
    // Tab (HT)
    case 10:
    // Newline (LF)
    case 13:
    // Return (CR)
    case 160:
    // No-break space (NBSP)
    case 65279:
    // Byte Order Mark (BOM)
    case 8232:
    // Line Separator (LS)
    case 8233:
      return "w";
  }
  return "i";
}
function Gp(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? false : Wp(t) ? Hp(t) : "*" + t;
}
function Kp(e) {
  const t = [];
  let n = -1, r = 0, o = 0, a, s, l, i, u, c, d;
  const f = [];
  f[
    0
    /* Actions.APPEND */
  ] = () => {
    s === void 0 ? s = l : s += l;
  }, f[
    1
    /* Actions.PUSH */
  ] = () => {
    s !== void 0 && (t.push(s), s = void 0);
  }, f[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    f[
      0
      /* Actions.APPEND */
    ](), o++;
  }, f[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (o > 0)
      o--, r = 4, f[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (o = 0, s === void 0 || (s = Gp(s), s === false))
        return false;
      f[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function m() {
    const g = e[n + 1];
    if (r === 5 && g === "'" || r === 6 && g === '"')
      return n++, l = "\\" + g, f[
        0
        /* Actions.APPEND */
      ](), true;
  }
  for (; r !== null; )
    if (n++, a = e[n], !(a === "\\" && m())) {
      if (i = jp(a), d = Pt[r], u = d[i] || d.l || 8, u === 8 || (r = u[0], u[1] !== void 0 && (c = f[u[1]], c && (l = a, c() === false))))
        return;
      if (r === 7)
        return t;
    }
}
const Pa = /* @__PURE__ */ new Map();
function Yp(e, t) {
  return le(e) ? e[t] : null;
}
function Xp(e, t) {
  if (!le(e))
    return null;
  let n = Pa.get(t);
  if (n || (n = Kp(t), n && Pa.set(t, n)), !n)
    return null;
  const r = n.length;
  let o = e, a = 0;
  for (; a < r; ) {
    const s = o[n[a]];
    if (s === void 0 || he(o))
      return null;
    o = s, a++;
  }
  return o;
}
const Qp = "11.0.1", Dr = -1, vr = "en-US", gr = "", Da = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Zp() {
  return {
    upper: (e, t) => t === "text" && H(e) ? e.toUpperCase() : t === "vnode" && le(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && H(e) ? e.toLowerCase() : t === "vnode" && le(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && H(e) ? Da(e) : t === "vnode" && le(e) && "__v_isVNode" in e ? Da(e.children) : e
  };
}
let Cs;
function em(e) {
  Cs = e;
}
let Ts;
function tm(e) {
  Ts = e;
}
let ks;
function nm(e) {
  ks = e;
}
let Ss = null;
const Ra = (e) => {
  Ss = e;
}, am = () => Ss;
let Ma = 0;
function lm(e = {}) {
  const t = he(e.onWarn) ? e.onWarn : Ot, n = H(e.version) ? e.version : Qp, r = H(e.locale) || he(e.locale) ? e.locale : vr, o = he(r) ? vr : r, a = Ce(e.fallbackLocale) || ae(e.fallbackLocale) || H(e.fallbackLocale) || e.fallbackLocale === false ? e.fallbackLocale : o, s = ae(e.messages) ? e.messages : Hr(o), l = ae(e.datetimeFormats) ? e.datetimeFormats : Hr(o), i = ae(e.numberFormats) ? e.numberFormats : Hr(o), u = Se(fe(), e.modifiers, Zp()), c = e.pluralRules || fe(), d = he(e.missing) ? e.missing : null, f = xe(e.missingWarn) || mr(e.missingWarn) ? e.missingWarn : true, m = xe(e.fallbackWarn) || mr(e.fallbackWarn) ? e.fallbackWarn : true, g = !!e.fallbackFormat, h2 = !!e.unresolving, b = he(e.postTranslation) ? e.postTranslation : null, p = ae(e.processor) ? e.processor : null, y = xe(e.warnHtmlMessage) ? e.warnHtmlMessage : true, _ = !!e.escapeParameter, E = he(e.messageCompiler) ? e.messageCompiler : Cs;
  const C = he(e.messageResolver) ? e.messageResolver : Ts || Yp, S = he(e.localeFallbacker) ? e.localeFallbacker : ks || zp, T = le(e.fallbackContext) ? e.fallbackContext : void 0, V = e, G = le(V.__datetimeFormatters) ? V.__datetimeFormatters : /* @__PURE__ */ new Map(), F = le(V.__numberFormatters) ? V.__numberFormatters : /* @__PURE__ */ new Map(), q = le(V.__meta) ? V.__meta : {};
  Ma++;
  const U = {
    version: n,
    cid: Ma,
    locale: r,
    fallbackLocale: a,
    messages: s,
    modifiers: u,
    pluralRules: c,
    missing: d,
    missingWarn: f,
    fallbackWarn: m,
    fallbackFormat: g,
    unresolving: h2,
    postTranslation: b,
    processor: p,
    warnHtmlMessage: y,
    escapeParameter: _,
    messageCompiler: E,
    messageResolver: C,
    localeFallbacker: S,
    fallbackContext: T,
    onWarn: t,
    __meta: q
  };
  return U.datetimeFormats = l, U.numberFormats = i, U.__datetimeFormatters = G, U.__numberFormatters = F, U;
}
const Hr = (e) => ({ [e]: fe() });
function Xo(e, t, n, r, o) {
  const { missing: a, onWarn: s } = e;
  if (a !== null) {
    const l = a(e, n, t, o);
    return H(l) ? l : t;
  } else
    return t;
}
function Nn(e, t, n) {
  const r = e;
  r.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function As(e, t) {
  return e === t ? false : e.split("-")[0] === t.split("-")[0];
}
function sm(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return false;
  for (let r = n + 1; r < t.length; r++)
    if (As(e, t[r]))
      return true;
  return false;
}
function $a(e, ...t) {
  const { datetimeFormats: n, unresolving: r, fallbackLocale: o, onWarn: a, localeFallbacker: s } = e, { __datetimeFormatters: l } = e;
  const [i, u, c, d] = so(...t), f = xe(c.missingWarn) ? c.missingWarn : e.missingWarn; xe(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn; const g = !!c.part, h2 = Yo(e, c), b = s(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    h2
  );
  if (!H(i) || i === "")
    return new Intl.DateTimeFormat(h2, d).format(u);
  let p = {}, y, _ = null;
  const S = "datetime format";
  for (let G = 0; G < b.length; G++) {
    if (y = b[G], false) ;
    if (p = n[y] || {}, _ = p[i], ae(_))
      break;
    Xo(e, i, y, f, S);
  }
  if (!ae(_) || !H(y))
    return r ? Dr : i;
  let T = `${y}__${i}`;
  Pr(d) || (T = `${T}__${JSON.stringify(d)}`);
  let V = l.get(T);
  return V || (V = new Intl.DateTimeFormat(y, Se({}, _, d)), l.set(T, V)), g ? V.formatToParts(u) : V.format(u);
}
const Is = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function so(...e) {
  const [t, n, r, o] = e, a = fe();
  let s = fe(), l;
  if (H(t)) {
    const i = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!i)
      throw it(Pe.INVALID_ISO_DATE_ARGUMENT);
    const u = i[3] ? i[3].trim().startsWith("T") ? `${i[1].trim()}${i[3].trim()}` : `${i[1].trim()}T${i[3].trim()}` : i[1].trim();
    l = new Date(u);
    try {
      l.toISOString();
    } catch {
      throw it(Pe.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (Lf(t)) {
    if (isNaN(t.getTime()))
      throw it(Pe.INVALID_DATE_ARGUMENT);
    l = t;
  } else if (Ne(t))
    l = t;
  else
    throw it(Pe.INVALID_ARGUMENT);
  return H(n) ? a.key = n : ae(n) && Object.keys(n).forEach((i) => {
    Is.includes(i) ? s[i] = n[i] : a[i] = n[i];
  }), H(r) ? a.locale = r : ae(r) && (s = r), ae(o) && (s = o), [a.key || "", l, a, s];
}
function za(e, t, n) {
  const r = e;
  for (const o in n) {
    const a = `${t}__${o}`;
    r.__datetimeFormatters.has(a) && r.__datetimeFormatters.delete(a);
  }
}
function Ba(e, ...t) {
  const { numberFormats: n, unresolving: r, fallbackLocale: o, onWarn: a, localeFallbacker: s } = e, { __numberFormatters: l } = e;
  const [i, u, c, d] = io(...t), f = xe(c.missingWarn) ? c.missingWarn : e.missingWarn; xe(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn; const g = !!c.part, h2 = Yo(e, c), b = s(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    o,
    h2
  );
  if (!H(i) || i === "")
    return new Intl.NumberFormat(h2, d).format(u);
  let p = {}, y, _ = null;
  const S = "number format";
  for (let G = 0; G < b.length; G++) {
    if (y = b[G], false) ;
    if (p = n[y] || {}, _ = p[i], ae(_))
      break;
    Xo(e, i, y, f, S);
  }
  if (!ae(_) || !H(y))
    return r ? Dr : i;
  let T = `${y}__${i}`;
  Pr(d) || (T = `${T}__${JSON.stringify(d)}`);
  let V = l.get(T);
  return V || (V = new Intl.NumberFormat(y, Se({}, _, d)), l.set(T, V)), g ? V.formatToParts(u) : V.format(u);
}
const Ps = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function io(...e) {
  const [t, n, r, o] = e, a = fe();
  let s = fe();
  if (!Ne(t))
    throw it(Pe.INVALID_ARGUMENT);
  const l = t;
  return H(n) ? a.key = n : ae(n) && Object.keys(n).forEach((i) => {
    Ps.includes(i) ? s[i] = n[i] : a[i] = n[i];
  }), H(r) ? a.locale = r : ae(r) && (s = r), ae(o) && (s = o), [a.key || "", l, a, s];
}
function Va(e, t, n) {
  const r = e;
  for (const o in n) {
    const a = `${t}__${o}`;
    r.__numberFormatters.has(a) && r.__numberFormatters.delete(a);
  }
}
const im = (e) => e, um = (e) => "", cm = "text", dm = (e) => e.length === 0 ? "" : jo(e), fm = Pf;
function Ua(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function pm(e) {
  const t = Ne(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Ne(e.named.count) || Ne(e.named.n)) ? Ne(e.named.count) ? e.named.count : Ne(e.named.n) ? e.named.n : t : t;
}
function mm(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function vm(e = {}) {
  const t = e.locale, n = pm(e), r = le(e.pluralRules) && H(t) && he(e.pluralRules[t]) ? e.pluralRules[t] : Ua, o = le(e.pluralRules) && H(t) && he(e.pluralRules[t]) ? Ua : void 0, a = (p) => p[r(n, p.length, o)], s = e.list || [], l = (p) => s[p], i = e.named || fe();
  Ne(e.pluralIndex) && mm(n, i);
  const u = (p) => i[p];
  function c(p, y) {
    const _ = he(e.messages) ? e.messages(p, !!y) : le(e.messages) ? e.messages[p] : false;
    return _ || (e.parent ? e.parent.message(p) : um);
  }
  const d = (p) => e.modifiers ? e.modifiers[p] : im, f = ae(e.processor) && he(e.processor.normalize) ? e.processor.normalize : dm, m = ae(e.processor) && he(e.processor.interpolate) ? e.processor.interpolate : fm, g = ae(e.processor) && H(e.processor.type) ? e.processor.type : cm, b = {
    list: l,
    named: u,
    plural: a,
    linked: (p, ...y) => {
      const [_, E] = y;
      let C = "text", S = "";
      y.length === 1 ? le(_) ? (S = _.modifier || S, C = _.type || C) : H(_) && (S = _ || S) : y.length === 2 && (H(_) && (S = _ || S), H(E) && (C = E || C));
      const T = c(p, true)(b), V = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        C === "vnode" && Ce(T) && S ? T[0] : T
      );
      return S ? d(S)(V, C) : V;
    },
    message: c,
    type: g,
    interpolate: m,
    normalize: f,
    values: Se(fe(), s, i)
  };
  return b;
}
const Wa = () => "", je = (e) => he(e);
function Ha(e, ...t) {
  const { fallbackFormat: n, postTranslation: r, unresolving: o, messageCompiler: a, fallbackLocale: s, messages: l } = e, [i, u] = uo(...t), c = xe(u.missingWarn) ? u.missingWarn : e.missingWarn, d = xe(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn, f = xe(u.escapeParameter) ? u.escapeParameter : e.escapeParameter, m = !!u.resolvedMessage, g = H(u.default) || xe(u.default) ? xe(u.default) ? a ? i : () => i : u.default : n ? a ? i : () => i : null, h2 = n || g != null && (H(g) || he(g)), b = Yo(e, u);
  f && gm(u);
  let [p, y, _] = m ? [
    i,
    b,
    l[b] || fe()
  ] : Ds(e, i, b, s, d, c), E = p, C = i;
  if (!m && !(H(E) || Gt(E) || je(E)) && h2 && (E = g, C = E), !m && (!(H(E) || Gt(E) || je(E)) || !H(y)))
    return o ? Dr : i;
  let S = false;
  const T = () => {
    S = true;
  }, V = je(E) ? E : Rs(e, i, y, E, C, T);
  if (S)
    return E;
  const G = _m(e, y, _, u), F = vm(G), q = hm(e, V, F), U = r ? r(q, i) : q;
  return U;
}
function gm(e) {
  Ce(e.list) ? e.list = e.list.map((t) => H(t) ? Ca(t) : t) : le(e.named) && Object.keys(e.named).forEach((t) => {
    H(e.named[t]) && (e.named[t] = Ca(e.named[t]));
  });
}
function Ds(e, t, n, r, o, a) {
  const { messages: s, onWarn: l, messageResolver: i, localeFallbacker: u } = e, c = u(e, r, n);
  let d = fe(), f, m = null;
  const b = "translate";
  for (let p = 0; p < c.length; p++) {
    if (f = c[p], false) ;
    d = s[f] || fe();
    if ((m = i(d, t)) === null && (m = d[t]), false) ;
    if (H(m) || Gt(m) || je(m))
      break;
    if (!sm(f, c)) {
      const C = Xo(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        f,
        a,
        b
      );
      C !== t && (m = C);
    }
  }
  return [m, f, d];
}
function Rs(e, t, n, r, o, a) {
  const { messageCompiler: s, warnHtmlMessage: l } = e;
  if (je(r)) {
    const f = r;
    return f.locale = f.locale || n, f.key = f.key || t, f;
  }
  if (s == null) {
    const f = () => r;
    return f.locale = n, f.key = t, f;
  }
  const d = s(r, bm(e, n, o, r, l, a));
  return d.locale = n, d.key = t, d.source = r, d;
}
function hm(e, t, n) {
  const s = t(n);
  return s;
}
function uo(...e) {
  const [t, n, r] = e, o = fe();
  if (!H(t) && !Ne(t) && !je(t) && !Gt(t))
    throw it(Pe.INVALID_ARGUMENT);
  const a = Ne(t) ? String(t) : t;
  return Ne(n) ? o.plural = n : H(n) ? o.default = n : ae(n) && !Pr(n) ? o.named = n : Ce(n) && (o.list = n), Ne(r) ? o.plural = r : H(r) ? o.default = r : ae(r) && Se(o, r), [a, o];
}
function bm(e, t, n, r, o, a) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: o,
    onError: (s) => {
      if (a && a(s), false) ; else
        throw s;
    },
    onCacheKey: (s) => Nf(t, n, s)
  };
}
function _m(e, t, n, r) {
  const { modifiers: o, pluralRules: a, messageResolver: s, fallbackLocale: l, fallbackWarn: i, missingWarn: u, fallbackContext: c } = e, f = {
    locale: t,
    modifiers: o,
    pluralRules: a,
    messages: (m, g) => {
      let h2 = s(n, m);
      if (h2 == null && (c || g)) {
        const [, , b] = Ds(
          c || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          m,
          t,
          l,
          i,
          u
        );
        h2 = s(b, m);
      }
      if (H(h2) || Gt(h2)) {
        let b = false;
        const y = Rs(e, m, t, h2, m, () => {
          b = true;
        });
        return b ? Wa : y;
      } else return je(h2) ? h2 : Wa;
    }
  };
  return e.processor && (f.processor = e.processor), r.list && (f.list = r.list), r.named && (f.named = r.named), Ne(r.plural) && (f.pluralIndex = r.plural), f;
}
/*!
  * vue-i18n v11.0.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const Em = "11.0.1";
const Oe = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: Fp,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: 30,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32,
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: 33,
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: 34
};
function Fn(e, ...t) {
  return _n(e, null, void 0);
}
const co = /* @__PURE__ */ mt("__translateVNode"), fo = /* @__PURE__ */ mt("__datetimeParts"), po = /* @__PURE__ */ mt("__numberParts"), Cm = mt("__setPluralRules"), Ms = /* @__PURE__ */ mt("__injectWithOption"), go = /* @__PURE__ */ mt("__dispose");
function $n(e) {
  if (!le(e))
    return e;
  for (const t in e)
    if (Ye(e, t))
      if (!t.includes("."))
        le(e[t]) && $n(e[t]);
      else {
        const n = t.split("."), r = n.length - 1;
        let o = e, a = false;
        for (let s = 0; s < r; s++) {
          if (n[s] in o || (o[n[s]] = fe()), !le(o[n[s]])) {
            a = true;
            break;
          }
          o = o[n[s]];
        }
        a || (o[n[r]] = e[t], delete e[t]), le(o[n[r]]) && $n(o[n[r]]);
      }
  return e;
}
function Fs(e, t) {
  const { messages: n, __i18n: r, messageResolver: o, flatJson: a } = t, s = ae(n) ? n : Ce(r) ? fe() : { [e]: fe() };
  if (Ce(r) && r.forEach((l) => {
    if ("locale" in l && "resource" in l) {
      const { locale: i, resource: u } = l;
      i ? (s[i] = s[i] || fe(), ur(u, s[i])) : ur(u, s);
    } else
      H(l) && ur(JSON.parse(l), s);
  }), o == null && a)
    for (const l in s)
      Ye(s, l) && $n(s[l]);
  return s;
}
function $s(e) {
  return e.type;
}
function km(e, t, n) {
  let r = le(t.messages) ? t.messages : fe();
  "__i18nGlobal" in n && (r = Fs(e.locale.value, {
    messages: r,
    __i18n: n.__i18nGlobal
  }));
  const o = Object.keys(r);
  o.length && o.forEach((a) => {
    e.mergeLocaleMessage(a, r[a]);
  });
  {
    if (le(t.datetimeFormats)) {
      const a = Object.keys(t.datetimeFormats);
      a.length && a.forEach((s) => {
        e.mergeDateTimeFormat(s, t.datetimeFormats[s]);
      });
    }
    if (le(t.numberFormats)) {
      const a = Object.keys(t.numberFormats);
      a.length && a.forEach((s) => {
        e.mergeNumberFormat(s, t.numberFormats[s]);
      });
    }
  }
}
function ja(e) {
  return createVNode(Text, null, e, 0);
}
const Ka = () => [], Nm = () => false;
let Ya = 0;
function Xa(e) {
  return (t, n, r, o) => e(n, r, getCurrentInstance() || void 0, o);
}
function Lm(e = {}) {
  const { __root: t, __injectWithOption: n } = e, r = t === void 0, o = e.flatJson, a = shallowRef;
  let s = xe(e.inheritLocale) ? e.inheritLocale : true;
  const l = a(
    // prettier-ignore
    t && s ? t.locale.value : H(e.locale) ? e.locale : vr
  ), i = a(
    // prettier-ignore
    t && s ? t.fallbackLocale.value : H(e.fallbackLocale) || Ce(e.fallbackLocale) || ae(e.fallbackLocale) || e.fallbackLocale === false ? e.fallbackLocale : l.value
  ), u = a(Fs(l.value, e)), c = a(ae(e.datetimeFormats) ? e.datetimeFormats : { [l.value]: {} }), d = a(ae(e.numberFormats) ? e.numberFormats : { [l.value]: {} });
  let f = t ? t.missingWarn : xe(e.missingWarn) || mr(e.missingWarn) ? e.missingWarn : true, m = t ? t.fallbackWarn : xe(e.fallbackWarn) || mr(e.fallbackWarn) ? e.fallbackWarn : true, g = t ? t.fallbackRoot : xe(e.fallbackRoot) ? e.fallbackRoot : true, h2 = !!e.fallbackFormat, b = he(e.missing) ? e.missing : null, p = he(e.missing) ? Xa(e.missing) : null, y = he(e.postTranslation) ? e.postTranslation : null, _ = t ? t.warnHtmlMessage : xe(e.warnHtmlMessage) ? e.warnHtmlMessage : true, E = !!e.escapeParameter;
  const C = t ? t.modifiers : ae(e.modifiers) ? e.modifiers : {};
  let S = e.pluralRules || t && t.pluralRules, T;
  T = (() => {
    r && Ra(null);
    const A = {
      version: Em,
      locale: l.value,
      fallbackLocale: i.value,
      messages: u.value,
      modifiers: C,
      pluralRules: S,
      missing: p === null ? void 0 : p,
      missingWarn: f,
      fallbackWarn: m,
      fallbackFormat: h2,
      unresolving: true,
      postTranslation: y === null ? void 0 : y,
      warnHtmlMessage: _,
      escapeParameter: E,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    A.datetimeFormats = c.value, A.numberFormats = d.value, A.__datetimeFormatters = ae(T) ? T.__datetimeFormatters : void 0, A.__numberFormatters = ae(T) ? T.__numberFormatters : void 0;
    const $ = lm(A);
    return r && Ra($), $;
  })(), Nn(T, l.value, i.value);
  function G() {
    return [
      l.value,
      i.value,
      u.value,
      c.value,
      d.value
    ];
  }
  const F = computed({
    get: () => l.value,
    set: (A) => {
      l.value = A, T.locale = l.value;
    }
  }), q = computed({
    get: () => i.value,
    set: (A) => {
      i.value = A, T.fallbackLocale = i.value, Nn(T, l.value, A);
    }
  }), U = computed(() => u.value), ve = /* @__PURE__ */ computed(() => c.value), ne = /* @__PURE__ */ computed(() => d.value);
  function ie() {
    return he(y) ? y : null;
  }
  function D(A) {
    y = A, T.postTranslation = A;
  }
  function k() {
    return b;
  }
  function I(A) {
    A !== null && (p = Xa(A)), b = A, T.missing = p;
  }
  const B = (A, $, se, we, Mt, Yn) => {
    G();
    let Qt;
    try {
      false, r || (T.fallbackContext = t ? am() : void 0), Qt = A(T);
    } finally {
      r || (T.fallbackContext = void 0);
    }
    if (se !== "translate exists" && // for not `te` (e.g `t`)
    Ne(Qt) && Qt === Dr || se === "translate exists" && !Qt) {
      const [Ft, ei] = $();
      return t && g ? we(t) : Mt(Ft);
    } else {
      if (Yn(Qt))
        return Qt;
      throw Fn(Oe.UNEXPECTED_RETURN_TYPE);
    }
  };
  function K(...A) {
    return B(($) => Reflect.apply(Ha, null, [$, ...A]), () => uo(...A), "translate", ($) => Reflect.apply($.t, $, [...A]), ($) => $, ($) => H($));
  }
  function Z(...A) {
    const [$, se, we] = A;
    if (we && !le(we))
      throw Fn(Oe.INVALID_ARGUMENT);
    return K($, se, Se({ resolvedMessage: true }, we || {}));
  }
  function ye(...A) {
    return B(($) => Reflect.apply($a, null, [$, ...A]), () => so(...A), "datetime format", ($) => Reflect.apply($.d, $, [...A]), () => gr, ($) => H($));
  }
  function Ae(...A) {
    return B(($) => Reflect.apply(Ba, null, [$, ...A]), () => io(...A), "number format", ($) => Reflect.apply($.n, $, [...A]), () => gr, ($) => H($));
  }
  function pe(A) {
    return A.map(($) => H($) || Ne($) || xe($) ? ja(String($)) : $);
  }
  const Qe = {
    normalize: pe,
    interpolate: (A) => A,
    type: "vnode"
  };
  function ge(...A) {
    return B(($) => {
      let se;
      const we = $;
      try {
        we.processor = Qe, se = Reflect.apply(Ha, null, [we, ...A]);
      } finally {
        we.processor = null;
      }
      return se;
    }, () => uo(...A), "translate", ($) => $[co](...A), ($) => [ja($)], ($) => Ce($));
  }
  function qt(...A) {
    return B(($) => Reflect.apply(Ba, null, [$, ...A]), () => io(...A), "number format", ($) => $[po](...A), Ka, ($) => H($) || Ce($));
  }
  function En(...A) {
    return B(($) => Reflect.apply($a, null, [$, ...A]), () => so(...A), "datetime format", ($) => $[fo](...A), Ka, ($) => H($) || Ce($));
  }
  function ot(A) {
    S = A, T.pluralRules = S;
  }
  function Jt(A, $) {
    return B(() => {
      if (!A)
        return false;
      const se = H($) ? $ : l.value, we = Rt(se), Mt = T.messageResolver(we, A);
      return Gt(Mt) || je(Mt) || H(Mt);
    }, () => [A], "translate exists", (se) => Reflect.apply(se.te, se, [A, $]), Nm, (se) => xe(se));
  }
  function Dt(A) {
    let $ = null;
    const se = xs(T, i.value, l.value);
    for (let we = 0; we < se.length; we++) {
      const Mt = u.value[se[we]] || {}, Yn = T.messageResolver(Mt, A);
      if (Yn != null) {
        $ = Yn;
        break;
      }
    }
    return $;
  }
  function wn(A) {
    const $ = Dt(A);
    return $ != null ? $ : t ? t.tm(A) || {} : {};
  }
  function Rt(A) {
    return u.value[A] || {};
  }
  function xn(A, $) {
    if (o) {
      const se = { [A]: $ };
      for (const we in se)
        Ye(se, we) && $n(se[we]);
      $ = se[A];
    }
    u.value[A] = $, T.messages = u.value;
  }
  function Fr(A, $) {
    u.value[A] = u.value[A] || {};
    const se = { [A]: $ };
    if (o)
      for (const we in se)
        Ye(se, we) && $n(se[we]);
    $ = se[A], ur($, u.value[A]), T.messages = u.value;
  }
  function w(A) {
    return c.value[A] || {};
  }
  function x(A, $) {
    c.value[A] = $, T.datetimeFormats = c.value, za(T, A, $);
  }
  function R(A, $) {
    c.value[A] = Se(c.value[A] || {}, $), T.datetimeFormats = c.value, za(T, A, $);
  }
  function X(A) {
    return d.value[A] || {};
  }
  function _e(A, $) {
    d.value[A] = $, T.numberFormats = d.value, Va(T, A, $);
  }
  function Ee(A, $) {
    d.value[A] = Se(d.value[A] || {}, $), T.numberFormats = d.value, Va(T, A, $);
  }
  Ya++;
  const oe = {
    id: Ya,
    locale: F,
    fallbackLocale: q,
    get inheritLocale() {
      return s;
    },
    set inheritLocale(A) {
      s = A, A && t && (l.value = t.locale.value, i.value = t.fallbackLocale.value, Nn(T, l.value, i.value));
    },
    get availableLocales() {
      return Object.keys(u.value).sort();
    },
    messages: U,
    get modifiers() {
      return C;
    },
    get pluralRules() {
      return S || {};
    },
    get isGlobal() {
      return r;
    },
    get missingWarn() {
      return f;
    },
    set missingWarn(A) {
      f = A, T.missingWarn = f;
    },
    get fallbackWarn() {
      return m;
    },
    set fallbackWarn(A) {
      m = A, T.fallbackWarn = m;
    },
    get fallbackRoot() {
      return g;
    },
    set fallbackRoot(A) {
      g = A;
    },
    get fallbackFormat() {
      return h2;
    },
    set fallbackFormat(A) {
      h2 = A, T.fallbackFormat = h2;
    },
    get warnHtmlMessage() {
      return _;
    },
    set warnHtmlMessage(A) {
      _ = A, T.warnHtmlMessage = A;
    },
    get escapeParameter() {
      return E;
    },
    set escapeParameter(A) {
      E = A, T.escapeParameter = A;
    },
    t: K,
    getLocaleMessage: Rt,
    setLocaleMessage: xn,
    mergeLocaleMessage: Fr,
    getPostTranslationHandler: ie,
    setPostTranslationHandler: D,
    getMissingHandler: k,
    setMissingHandler: I,
    [Cm]: ot
  };
  return oe.datetimeFormats = ve, oe.numberFormats = ne, oe.rt = Z, oe.te = Jt, oe.tm = wn, oe.d = ye, oe.n = Ae, oe.getDateTimeFormat = w, oe.setDateTimeFormat = x, oe.mergeDateTimeFormat = R, oe.getNumberFormat = X, oe.setNumberFormat = _e, oe.mergeNumberFormat = Ee, oe[Ms] = n, oe[co] = ge, oe[fo] = En, oe[po] = qt, oe;
}
const Jo = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (e) => e === "parent" || e === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
Se({
  keypath: {
    type: String,
    required: true
  },
  plural: {
    type: [Number, String],
    validator: (e) => Ne(e) || !isNaN(e)
  }
}, Jo);
Se({
  value: {
    type: Number,
    required: true
  },
  format: {
    type: [String, Object]
  }
}, Jo);
const Im = /* @__PURE__ */ mt("global-vue-i18n");
function vt(e = {}) {
  const t = getCurrentInstance();
  if (t == null)
    throw Fn(Oe.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw Fn(Oe.NOT_INSTALLED);
  const n = Pm(t), r = Rm(n), o = $s(t), a = Dm(e, o);
  if (a === "global")
    return km(r, e, o), r;
  if (a === "parent") {
    let i = Mm(n, t, e.__useComponent);
    return i == null && (i = r), i;
  }
  const s = n;
  let l = s.__getInstance(t);
  if (l == null) {
    const i = Se({}, e);
    "__i18n" in o && (i.__i18n = o.__i18n), r && (i.__root = r), l = Lm(i), s.__composerExtend && (l[go] = s.__composerExtend(l)), $m(s, t, l), s.__setInstance(t, l);
  }
  return l;
}
function Pm(e) {
  const t = inject(e.isCE ? Im : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw Fn(e.isCE ? Oe.NOT_INSTALLED_WITH_PROVIDE : Oe.UNEXPECTED_ERROR);
  return t;
}
function Dm(e, t) {
  return Pr(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function Rm(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function Mm(e, t, n = false) {
  let r = null;
  const o = t.root;
  let a = Fm(t, n);
  for (; a != null; ) {
    const s = e;
    if (e.mode === "composition")
      r = s.__getInstance(a);
    if (r != null || o === a)
      break;
    a = a.parent;
  }
  return r;
}
function Fm(e, t = false) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function $m(e, t, n) {
  onMounted(() => {
  }, t), onUnmounted(() => {
    const o = n;
    e.__deleteInstance(t);
    const a = o[go];
    a && (a(), delete o[go]);
  }, t);
}
Se({
  value: {
    type: [Number, Date],
    required: true
  },
  format: {
    type: [String, Object]
  }
}, Jo);
em(Ip);
tm(Xp);
nm(xs);
function Mr(e) {
  return getCurrentScope() ? (onScopeDispose(e), true) : false;
}
const ln = /* @__PURE__ */ new WeakMap(), zm = (e, t) => {
  var n;
  const r = (n = getCurrentInstance()) == null ? void 0 : n.proxy;
  if (r == null)
    throw new Error("provideLocal must be called in setup");
  ln.has(r) || ln.set(r, /* @__PURE__ */ Object.create(null));
  const o = ln.get(r);
  o[e] = t, provide(e, t);
}, Bm = (...e) => {
  var t;
  const n = e[0], r = (t = getCurrentInstance()) == null ? void 0 : t.proxy;
  if (r == null)
    throw new Error("injectLocal must be called in setup");
  return ln.has(r) && n in ln.get(r) ? ln.get(r)[n] : inject(...e);
};
function Vm(e) {
  let t = 0, n, r;
  const o = () => {
    t -= 1, r && t <= 0 && (r.stop(), n = void 0, r = void 0);
  };
  return (...a) => (t += 1, n || (r = effectScope(true), n = r.run(() => e(...a))), Mr(o), n);
}
function Lt(e) {
  return typeof e == "function" ? e() : unref(e);
}
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Um = Object.prototype.toString, Wm = (e) => Um.call(e) === "[object Object]", zn = () => {
};
function Us(e, t) {
  function n(...r) {
    return new Promise((o, a) => {
      Promise.resolve(e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })).then(o).catch(a);
    });
  }
  return n;
}
const Ws = (e) => e();
function Hm(e, t = {}) {
  let n, r, o = zn;
  const a = (l) => {
    clearTimeout(l), o(), o = zn;
  };
  return (l) => {
    const i = Lt(e), u = Lt(t.maxWait);
    return n && a(n), i <= 0 || u !== void 0 && u <= 0 ? (r && (a(r), r = null), Promise.resolve(l())) : new Promise((c, d) => {
      o = t.rejectOnCancel ? d : c, u && !r && (r = setTimeout(() => {
        n && a(n), r = null, c(l());
      }, u)), n = setTimeout(() => {
        r && a(r), r = null, c(l());
      }, i);
    });
  };
}
function jm(e = Ws) {
  const t = ref(true);
  function n() {
    t.value = false;
  }
  function r() {
    t.value = true;
  }
  const o = (...a) => {
    t.value && e(...a);
  };
  return { isActive: readonly(t), pause: n, resume: r, eventFilter: o };
}
function Gm(e) {
  return getCurrentInstance();
}
function Km(...e) {
  if (e.length !== 1)
    return toRef(...e);
  const t = e[0];
  return typeof t == "function" ? readonly(customRef(() => ({ get: t, set: zn }))) : ref(t);
}
function Ym(e, t = 200, n = {}) {
  return Us(
    Hm(t, n),
    e
  );
}
function Xm(e, t, n = {}) {
  const {
    eventFilter: r = Ws,
    ...o
  } = n;
  return watch(
    e,
    Us(
      r,
      t
    ),
    o
  );
}
function qm(e, t, n = {}) {
  const {
    eventFilter: r,
    ...o
  } = n, { eventFilter: a, pause: s, resume: l, isActive: i } = jm(r);
  return { stop: Xm(
    e,
    t,
    {
      ...o,
      eventFilter: a
    }
  ), pause: s, resume: l, isActive: i };
}
function Hs(e, t = true, n) {
  Gm() ? onMounted(e, n) : t ? e() : nextTick(e);
}
function Jm(e = false, t = {}) {
  const {
    truthyValue: n = true,
    falsyValue: r = false
  } = t, o = isRef(e), a = ref(e);
  function s(l) {
    if (arguments.length)
      return a.value = l, a.value;
    {
      const i = Lt(n);
      return a.value = a.value === i ? Lt(r) : i, a.value;
    }
  }
  return o ? s : [a, s];
}
function Qo(e, t, n) {
  let r;
  isRef(n) ? r = {
    evaluating: n
  } : r = {};
  const {
    lazy: o = false,
    evaluating: a = void 0,
    shallow: s = true,
    onError: l = zn
  } = r, i = ref(!o), u = s ? shallowRef(t) : ref(t);
  let c = 0;
  return watchEffect(async (d) => {
    if (!i.value)
      return;
    c++;
    const f = c;
    let m = false;
    a && Promise.resolve().then(() => {
      a.value = true;
    });
    try {
      const g = await e((h2) => {
        d(() => {
          a && (a.value = false), m || h2();
        });
      });
      f === c && (u.value = g);
    } catch (g) {
      l(g);
    } finally {
      a && f === c && (a.value = false), m = true;
    }
  }), o ? computed(() => (i.value = true, u.value)) : u;
}
function hr(e) {
  var t;
  const n = Lt(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const fn = void 0, Qm = void 0;
function br(...e) {
  let t, n, r, o;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, r, o] = e, t = fn) : [t, n, r, o] = e, !t)
    return zn;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const a = [], s = () => {
    a.forEach((c) => c()), a.length = 0;
  }, l = (c, d, f, m) => (c.addEventListener(d, f, m), () => c.removeEventListener(d, f, m)), i = watch(
    () => [hr(t), Lt(o)],
    ([c, d]) => {
      if (s(), !c)
        return;
      const f = Wm(d) ? { ...d } : d;
      a.push(
        ...n.flatMap((m) => r.map((g) => l(c, m, g, f)))
      );
    },
    { immediate: true, flush: "post" }
  ), u = () => {
    i(), s();
  };
  return Mr(u), u;
}
function Zm() {
  const e = ref(false), t = getCurrentInstance();
  return t && onMounted(() => {
    e.value = true;
  }, t), e;
}
function js(e) {
  const t = Zm();
  return computed(() => (t.value, !!e()));
}
function ev(e, t = {}) {
  const { window: n = fn } = t, r = js(() => n && "matchMedia" in n && typeof n.matchMedia == "function");
  let o;
  const a = ref(false), s = (u) => {
    a.value = u.matches;
  }, l = () => {
    o && ("removeEventListener" in o ? o.removeEventListener("change", s) : o.removeListener(s));
  }, i = watchEffect(() => {
    r.value && (l(), o = n.matchMedia(Lt(e)), "addEventListener" in o ? o.addEventListener("change", s) : o.addListener(s), a.value = o.matches);
  });
  return Mr(() => {
    i(), l(), o = void 0;
  }), a;
}
const sr = typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : typeof self < "u" ? self : {}, ir = "__vueuse_ssr_handlers__", tv = /* @__PURE__ */ nv();
function nv() {
  return ir in sr || (sr[ir] = sr[ir] || {}), sr[ir];
}
function Gs(e, t) {
  return tv[e] || t;
}
function rv(e) {
  return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number";
}
const ov = {
  boolean: {
    read: (e) => e === "true",
    write: (e) => String(e)
  },
  object: {
    read: (e) => JSON.parse(e),
    write: (e) => JSON.stringify(e)
  },
  number: {
    read: (e) => Number.parseFloat(e),
    write: (e) => String(e)
  },
  any: {
    read: (e) => e,
    write: (e) => String(e)
  },
  string: {
    read: (e) => e,
    write: (e) => String(e)
  },
  map: {
    read: (e) => new Map(JSON.parse(e)),
    write: (e) => JSON.stringify(Array.from(e.entries()))
  },
  set: {
    read: (e) => new Set(JSON.parse(e)),
    write: (e) => JSON.stringify(Array.from(e))
  },
  date: {
    read: (e) => new Date(e),
    write: (e) => e.toISOString()
  }
}, Ja = "vueuse-storage";
function av(e, t, n, r = {}) {
  var o;
  const {
    flush: a = "pre",
    deep: s = true,
    listenToStorageChanges: l = true,
    writeDefaults: i = true,
    mergeDefaults: u = false,
    shallow: c,
    window: d = fn,
    eventFilter: f,
    onError: m = (F) => {
      console.error(F);
    },
    initOnMounted: g
  } = r, h2 = (c ? shallowRef : ref)(typeof t == "function" ? t() : t);
  if (!n)
    try {
      n = Gs("getDefaultStorage", () => {
        var F;
        return (F = fn) == null ? void 0 : F.localStorage;
      })();
    } catch (F) {
      m(F);
    }
  if (!n)
    return h2;
  const b = Lt(t), p = rv(b), y = (o = r.serializer) != null ? o : ov[p], { pause: _, resume: E } = qm(
    h2,
    () => S(h2.value),
    { flush: a, deep: s, eventFilter: f }
  );
  d && l && Hs(() => {
    br(d, "storage", V), br(d, Ja, G), g && V();
  }), g || V();
  function C(F, q) {
    d && d.dispatchEvent(new CustomEvent(Ja, {
      detail: {
        key: e,
        oldValue: F,
        newValue: q,
        storageArea: n
      }
    }));
  }
  function S(F) {
    try {
      const q = n.getItem(e);
      if (F == null)
        C(q, null), n.removeItem(e);
      else {
        const U = y.write(F);
        q !== U && (n.setItem(e, U), C(q, U));
      }
    } catch (q) {
      m(q);
    }
  }
  function T(F) {
    const q = F ? F.newValue : n.getItem(e);
    if (q == null)
      return i && b != null && n.setItem(e, y.write(b)), b;
    if (!F && u) {
      const U = y.read(q);
      return typeof u == "function" ? u(U, b) : p === "object" && !Array.isArray(U) ? { ...b, ...U } : U;
    } else return typeof q != "string" ? q : y.read(q);
  }
  function V(F) {
    if (!(F && F.storageArea !== n)) {
      if (F && F.key == null) {
        h2.value = b;
        return;
      }
      if (!(F && F.key !== e)) {
        _();
        try {
          (F == null ? void 0 : F.newValue) !== y.write(h2.value) && (h2.value = T(F));
        } catch (q) {
          m(q);
        } finally {
          F ? nextTick(E) : E();
        }
      }
    }
  }
  function G(F) {
    V(F.detail);
  }
  return h2;
}
function Ks(e) {
  return ev("(prefers-color-scheme: dark)", e);
}
function lv(e = {}) {
  const {
    selector: t = "html",
    attribute: n = "class",
    initialValue: r = "auto",
    window: o = fn,
    storage: a,
    storageKey: s = "vueuse-color-scheme",
    listenToStorageChanges: l = true,
    storageRef: i,
    emitAuto: u,
    disableTransition: c = true
  } = e, d = {
    auto: "",
    light: "light",
    dark: "dark",
    ...e.modes || {}
  }, f = Ks({ window: o }), m = computed(() => f.value ? "dark" : "light"), g = i || (s == null ? Km(r) : av(s, r, a, { window: o, listenToStorageChanges: l })), h2 = computed(() => g.value === "auto" ? m.value : g.value), b = Gs(
    "updateHTMLAttrs",
    (E, C, S) => {
      const T = typeof E == "string" ? o == null ? void 0 : o.document.querySelector(E) : hr(E);
      if (!T)
        return;
      let V;
      if (c && (V = o.document.createElement("style"), V.appendChild((void 0).createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), o.document.head.appendChild(V)), C === "class") {
        const G = S.split(/\s/g);
        Object.values(d).flatMap((F) => (F || "").split(/\s/g)).filter(Boolean).forEach((F) => {
          G.includes(F) ? T.classList.add(F) : T.classList.remove(F);
        });
      } else
        T.setAttribute(C, S);
      c && (o.getComputedStyle(V).opacity, (void 0).head.removeChild(V));
    }
  );
  function p(E) {
    var C;
    b(t, n, (C = d[E]) != null ? C : E);
  }
  function y(E) {
    e.onChanged ? e.onChanged(E, p) : p(E);
  }
  watch(h2, y, { flush: "post", immediate: true }), Hs(() => y(h2.value));
  const _ = computed({
    get() {
      return u ? g.value : h2.value;
    },
    set(E) {
      g.value = E;
    }
  });
  try {
    return Object.assign(_, { store: g, system: m, state: h2 });
  } catch {
    return _;
  }
}
function Zo(e = {}) {
  const {
    valueDark: t = "dark",
    valueLight: n = "",
    window: r = fn
  } = e, o = lv({
    ...e,
    onChanged: (l, i) => {
      var u;
      e.onChanged ? (u = e.onChanged) == null || u.call(e, l === "dark", i, l) : i(l);
    },
    modes: {
      dark: t,
      light: n
    }
  }), a = computed(() => o.system ? o.system.value : Ks({ window: r }).value ? "dark" : "light");
  return computed({
    get() {
      return o.value === "dark";
    },
    set(l) {
      const i = l ? "dark" : "light";
      a.value === i ? o.value = "auto" : o.value = i;
    }
  });
}
const Qa = [
  "fullscreenchange",
  "webkitfullscreenchange",
  "webkitendfullscreen",
  "mozfullscreenchange",
  "MSFullscreenChange"
];
function sv(e, t = {}) {
  const {
    document: n = Qm,
    autoExit: r = false
  } = t, o = computed(() => {
    var p;
    return (p = hr(e)) != null ? p : n == null ? void 0 : n.querySelector("html");
  }), a = ref(false), s = computed(() => [
    "requestFullscreen",
    "webkitRequestFullscreen",
    "webkitEnterFullscreen",
    "webkitEnterFullScreen",
    "webkitRequestFullScreen",
    "mozRequestFullScreen",
    "msRequestFullscreen"
  ].find((p) => n && p in n || o.value && p in o.value)), l = computed(() => [
    "exitFullscreen",
    "webkitExitFullscreen",
    "webkitExitFullScreen",
    "webkitCancelFullScreen",
    "mozCancelFullScreen",
    "msExitFullscreen"
  ].find((p) => n && p in n || o.value && p in o.value)), i = computed(() => [
    "fullScreen",
    "webkitIsFullScreen",
    "webkitDisplayingFullscreen",
    "mozFullScreen",
    "msFullscreenElement"
  ].find((p) => n && p in n || o.value && p in o.value)), u = [
    "fullscreenElement",
    "webkitFullscreenElement",
    "mozFullScreenElement",
    "msFullscreenElement"
  ].find((p) => n && p in n), c = js(() => o.value && n && s.value !== void 0 && l.value !== void 0 && i.value !== void 0), d = () => u ? (n == null ? void 0 : n[u]) === o.value : false, f = () => {
    if (i.value) {
      if (n && n[i.value] != null)
        return n[i.value];
      {
        const p = o.value;
        if ((p == null ? void 0 : p[i.value]) != null)
          return !!p[i.value];
      }
    }
    return false;
  };
  async function m() {
    if (!(!c.value || !a.value)) {
      if (l.value)
        if ((n == null ? void 0 : n[l.value]) != null)
          await n[l.value]();
        else {
          const p = o.value;
          (p == null ? void 0 : p[l.value]) != null && await p[l.value]();
        }
      a.value = false;
    }
  }
  async function g() {
    if (!c.value || a.value)
      return;
    f() && await m();
    const p = o.value;
    s.value && (p == null ? void 0 : p[s.value]) != null && (await p[s.value](), a.value = true);
  }
  async function h2() {
    await (a.value ? m() : g());
  }
  const b = () => {
    const p = f();
    (!p || p && d()) && (a.value = p);
  };
  return br(n, Qa, b, false), br(() => hr(o), Qa, b, false), r && Mr(m), {
    isSupported: c,
    isFullscreen: a,
    enter: g,
    exit: m,
    toggle: h2
  };
}
const jr = (e) => {
  const [t, ...n] = e.split(" ");
  return {
    command: t,
    args: n
  };
}, Ys = Symbol("WebContainer"), ig = (e) => zm(Ys, e), Xs = () => Bm(
  Ys,
  new Proxy({}, {
    get: () => {
      const e = new Error(
        "WebContainer instance not provided. Call provideWebContainer() before injectWebContainer()"
      );
      throw console.error(e), e;
    }
  })
), qs = () => {
  const e = ref([]), t = computed(
    () => e.value.length ? Math.max.apply(
      void 0,
      e.value.map(({ order: i }) => i)
    ) : 0
  ), n = computed(
    () => e.value.find(({ order: i }) => i === t.value)
  ), r = (i) => e.value.findIndex((u) => i === u.id), o = (i) => {
    const u = r(i);
    return u === -1 ? void 0 : e.value.at(u);
  }, a = (i) => {
    const u = r(i);
    u !== -1 && e.value.splice(u, 1);
  }, s = (i, u, c) => {
    const d = r(i);
    if (d === -1) {
      const f = {
        id: i,
        label: u != null ? u : i,
        order: t.value + 1,
        context: c
      };
      e.value.push(f);
    } else e.value[d].order !== t.value && (e.value[d].order = t.value + 1);
  }, l = (i, u) => {
    var f;
    const c = r(i), d = (f = e.value[c]) == null ? void 0 : f.context;
    d !== void 0 && (e.value[c].context = u(d));
  };
  return {
    close: a,
    /**
     * Computed ref containing the currently focused tab.
     */
    current: n,
    findTab: o,
    findTabIndex: r,
    open: s,
    /**
     * List of tabs.
     */
    tabs: computed(() => e.value),
    updateContext: l
  };
}, iv = (e) => {
  const t = qs();
  return {
    ...t,
    open: (r, o, a) => {
      t.findTabIndex(r) === -1 ? t.open(r, o, {
        suppressClose: e.editor.suppressClose,
        ...a
      }) : t.open(r);
    }
  };
};
function uv(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Gr, Za;
function cv() {
  if (Za) return Gr;
  Za = 1;
  function e(D) {
    return Array.isArray(D) ? D : [D];
  }
  const t = "", n = " ", r = "\\", o = /^\s+$/, a = /(?:[^\\]|^)\\$/, s = /^\\!/, l = /^\\#/, i = /\r?\n/g, u = /^\.*\/|^\.+$/, c = "/";
  let d = "node-ignore";
  typeof Symbol < "u" && (d = Symbol.for("node-ignore"));
  const f = d, m = (D, k, I) => Object.defineProperty(D, k, { value: I }), g = /([0-z])-([0-z])/g, h2 = () => false, b = (D) => D.replace(
    g,
    (k, I, z) => I.charCodeAt(0) <= z.charCodeAt(0) ? k : t
  ), p = (D) => {
    const { length: k } = D;
    return D.slice(0, k - k % 2);
  }, y = [
    [
      // remove BOM
      // TODO:
      // Other similar zero-width characters?
      /^\uFEFF/,
      () => t
    ],
    // > Trailing spaces are ignored unless they are quoted with backslash ("\")
    [
      // (a\ ) -> (a )
      // (a  ) -> (a)
      // (a ) -> (a)
      // (a \ ) -> (a  )
      /((?:\\\\)*?)(\\?\s+)$/,
      (D, k, I) => k + (I.indexOf("\\") === 0 ? n : t)
    ],
    // replace (\ ) with ' '
    // (\ ) -> ' '
    // (\\ ) -> '\\ '
    // (\\\ ) -> '\\ '
    [
      /(\\+?)\s/g,
      (D, k) => {
        const { length: I } = k;
        return k.slice(0, I - I % 2) + n;
      }
    ],
    // Escape metacharacters
    // which is written down by users but means special for regular expressions.
    // > There are 12 characters with special meanings:
    // > - the backslash \,
    // > - the caret ^,
    // > - the dollar sign $,
    // > - the period or dot .,
    // > - the vertical bar or pipe symbol |,
    // > - the question mark ?,
    // > - the asterisk or star *,
    // > - the plus sign +,
    // > - the opening parenthesis (,
    // > - the closing parenthesis ),
    // > - and the opening square bracket [,
    // > - the opening curly brace {,
    // > These special characters are often called "metacharacters".
    [
      /[\\$.|*+(){^]/g,
      (D) => `\\${D}`
    ],
    [
      // > a question mark (?) matches a single character
      /(?!\\)\?/g,
      () => "[^/]"
    ],
    // leading slash
    [
      // > A leading slash matches the beginning of the pathname.
      // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
      // A leading slash matches the beginning of the pathname
      /^\//,
      () => "^"
    ],
    // replace special metacharacter slash after the leading slash
    [
      /\//g,
      () => "\\/"
    ],
    [
      // > A leading "**" followed by a slash means match in all directories.
      // > For example, "**/foo" matches file or directory "foo" anywhere,
      // > the same as pattern "foo".
      // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
      // >   under directory "foo".
      // Notice that the '*'s have been replaced as '\\*'
      /^\^*\\\*\\\*\\\//,
      // '**/foo' <-> 'foo'
      () => "^(?:.*\\/)?"
    ],
    // starting
    [
      // there will be no leading '/'
      //   (which has been replaced by section "leading slash")
      // If starts with '**', adding a '^' to the regular expression also works
      /^(?=[^^])/,
      function() {
        return /\/(?!$)/.test(this) ? "^" : "(?:^|\\/)";
      }
    ],
    // two globstars
    [
      // Use lookahead assertions so that we could match more than one `'/**'`
      /\\\/\\\*\\\*(?=\\\/|$)/g,
      // Zero, one or several directories
      // should not use '*', or it will be replaced by the next replacer
      // Check if it is not the last `'/**'`
      (D, k, I) => k + 6 < I.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
    ],
    // normal intermediate wildcards
    [
      // Never replace escaped '*'
      // ignore rule '\*' will match the path '*'
      // 'abc.*/' -> go
      // 'abc.*'  -> skip this rule,
      //    coz trailing single wildcard will be handed by [trailing wildcard]
      /(^|[^\\]+)(\\\*)+(?=.+)/g,
      // '*.js' matches '.js'
      // '*.js' doesn't match 'abc'
      (D, k, I) => {
        const z = I.replace(/\\\*/g, "[^\\/]*");
        return k + z;
      }
    ],
    [
      // unescape, revert step 3 except for back slash
      // For example, if a user escape a '\\*',
      // after step 3, the result will be '\\\\\\*'
      /\\\\\\(?=[$.|*+(){^])/g,
      () => r
    ],
    [
      // '\\\\' -> '\\'
      /\\\\/g,
      () => r
    ],
    [
      // > The range notation, e.g. [a-zA-Z],
      // > can be used to match one of the characters in a range.
      // `\` is escaped by step 3
      /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
      (D, k, I, z, B) => k === r ? `\\[${I}${p(z)}${B}` : B === "]" && z.length % 2 === 0 ? `[${b(I)}${z}]` : "[]"
    ],
    // ending
    [
      // 'js' will not match 'js.'
      // 'ab' will not match 'abc'
      /(?:[^*])$/,
      // WTF!
      // https://git-scm.com/docs/gitignore
      // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
      // which re-fixes #24, #38
      // > If there is a separator at the end of the pattern then the pattern
      // > will only match directories, otherwise the pattern can match both
      // > files and directories.
      // 'js*' will not match 'a.js'
      // 'js/' will not match 'a.js'
      // 'js' will match 'a.js' and 'a.js/'
      (D) => /\/$/.test(D) ? `${D}$` : `${D}(?=$|\\/$)`
    ],
    // trailing wildcard
    [
      /(\^|\\\/)?\\\*$/,
      (D, k) => `${k ? `${k}[^/]+` : "[^/]*"}(?=$|\\/$)`
    ]
  ], _ = /* @__PURE__ */ Object.create(null), E = (D, k) => {
    let I = _[D];
    return I || (I = y.reduce(
      (z, [B, K]) => z.replace(B, K.bind(D)),
      D
    ), _[D] = I), k ? new RegExp(I, "i") : new RegExp(I);
  }, C = (D) => typeof D == "string", S = (D) => D && C(D) && !o.test(D) && !a.test(D) && D.indexOf("#") !== 0, T = (D) => D.split(i);
  class V {
    constructor(k, I, z, B) {
      this.origin = k, this.pattern = I, this.negative = z, this.regex = B;
    }
  }
  const G = (D, k) => {
    const I = D;
    let z = false;
    D.indexOf("!") === 0 && (z = true, D = D.substr(1)), D = D.replace(s, "!").replace(l, "#");
    const B = E(D, k);
    return new V(
      I,
      D,
      z,
      B
    );
  }, F = (D, k) => {
    throw new k(D);
  }, q = (D, k, I) => C(D) ? D ? q.isNotRelative(D) ? I(
    `path should be a \`path.relative()\`d string, but got "${k}"`,
    RangeError
  ) : true : I("path must not be empty", TypeError) : I(
    `path must be a string, but got \`${k}\``,
    TypeError
  ), U = (D) => u.test(D);
  q.isNotRelative = U, q.convert = (D) => D;
  class ve {
    constructor({
      ignorecase: k = true,
      ignoreCase: I = k,
      allowRelativePaths: z = false
    } = {}) {
      m(this, f, true), this._rules = [], this._ignoreCase = I, this._allowRelativePaths = z, this._initCache();
    }
    _initCache() {
      this._ignoreCache = /* @__PURE__ */ Object.create(null), this._testCache = /* @__PURE__ */ Object.create(null);
    }
    _addPattern(k) {
      if (k && k[f]) {
        this._rules = this._rules.concat(k._rules), this._added = true;
        return;
      }
      if (S(k)) {
        const I = G(k, this._ignoreCase);
        this._added = true, this._rules.push(I);
      }
    }
    // @param {Array<string> | string | Ignore} pattern
    add(k) {
      return this._added = false, e(
        C(k) ? T(k) : k
      ).forEach(this._addPattern, this), this._added && this._initCache(), this;
    }
    // legacy
    addPattern(k) {
      return this.add(k);
    }
    //          |           ignored : unignored
    // negative |   0:0   |   0:1   |   1:0   |   1:1
    // -------- | ------- | ------- | ------- | --------
    //     0    |  TEST   |  TEST   |  SKIP   |    X
    //     1    |  TESTIF |  SKIP   |  TEST   |    X
    // - SKIP: always skip
    // - TEST: always test
    // - TESTIF: only test if checkUnignored
    // - X: that never happen
    // @param {boolean} whether should check if the path is unignored,
    //   setting `checkUnignored` to `false` could reduce additional
    //   path matching.
    // @returns {TestResult} true if a file is ignored
    _testOne(k, I) {
      let z = false, B = false;
      return this._rules.forEach((K) => {
        const { negative: Z } = K;
        if (B === Z && z !== B || Z && !z && !B && !I)
          return;
        K.regex.test(k) && (z = !Z, B = Z);
      }), {
        ignored: z,
        unignored: B
      };
    }
    // @returns {TestResult}
    _test(k, I, z, B) {
      const K = k && q.convert(k);
      return q(
        K,
        k,
        this._allowRelativePaths ? h2 : F
      ), this._t(K, I, z, B);
    }
    _t(k, I, z, B) {
      if (k in I)
        return I[k];
      if (B || (B = k.split(c)), B.pop(), !B.length)
        return I[k] = this._testOne(k, z);
      const K = this._t(
        B.join(c) + c,
        I,
        z,
        B
      );
      return I[k] = K.ignored ? K : this._testOne(k, z);
    }
    ignores(k) {
      return this._test(k, this._ignoreCache, false).ignored;
    }
    createFilter() {
      return (k) => !this.ignores(k);
    }
    filter(k) {
      return e(k).filter(this.createFilter());
    }
    // @returns {TestResult}
    test(k) {
      return this._test(k, this._testCache, true);
    }
  }
  const ne = (D) => new ve(D), ie = (D) => q(D && q.convert(D), D, h2);
  if (ne.isPathValid = ie, ne.default = ne, Gr = ne, // Detect `process` so that it can run in browsers.
  typeof process < "u" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")) {
    const D = (I) => /^\\\\\?\\/.test(I) || /["<>|\u0000-\u001F]+/u.test(I) ? I : I.replace(/\\/g, "/");
    q.convert = D;
    const k = /^[a-z]:\//i;
    q.isNotRelative = (I) => k.test(I) || U(I);
  }
  return Gr;
}
var dv = cv();
const Kr = /* @__PURE__ */ uv(dv), fv = (e) => {
  const t = computed(
    () => {
      var _a2;
      return Kr({ allowRelativePaths: true }).add((_a2 = e.explorer.hidden) != null ? _a2 : []);
    }
  ), n = computed(
    () => {
      var _a2;
      return Kr({ allowRelativePaths: true }).add((_a2 = e.explorer.readonly) != null ? _a2 : []);
    }
  ), r = computed(
    () => {
      var _a2;
      return Kr({ allowRelativePaths: true }).add((_a2 = e.explorer.reinstall) != null ? _a2 : []);
    }
  );
  return {
    /**
     * Computed ref containing a function to determine whether an entity (directory or file) should be
     * hidden in the file explorer.
     */
    hidden: t,
    /**
     * Computed ref containing a function to determine whether an entity (directory or file) should be
     * marked as readonly in the file explorer and editor tabs.
     */
    readonly: n,
    /**
     * Computed ref containing a function to determine whether changing an entity (directory or file) should
     * trigger the re-installation of dependencies and re-bootstrapping.
     */
    reinstall: r
  };
}, pv = (e) => {
  const t = Qo(Xs, void 0), n = qs(), r = async (u, c) => {
    var _a2;
    const d = await t.value.spawn(
      c.command,
      (_a2 = c.args) != null ? _a2 : []
    );
    d.exit.then((g) => {
      n.updateContext(u, (h2) => ({
        ...h2,
        exitCode: g
      }));
    }), d && !(d != null && d.output.locked) && (d == null || d.output.pipeTo(
      new WritableStream({
        write(g) {
          var h2, b, p;
          n.updateContext(u, (y) => {
            var _a3;
            return {
              ...y,
              logs: [...(_a3 = y.logs) != null ? _a3 : [], g]
            };
          }), (p = (b = (h2 = n.findTab(u)) == null ? void 0 : h2.context) == null ? void 0 : b.processOutputHandler) == null || p.call(b, g);
        }
      })
    ));
    const f = d && !(d != null && d.input.locked) ? d == null ? void 0 : d.input.getWriter() : void 0, m = f == null ? void 0 : f.write.bind(f);
    return {
      ...c,
      process: d,
      processInputHandler: m
    };
  }, o = (u) => {
    var d, f, m, g;
    const c = n.findTab(u);
    ((d = c == null ? void 0 : c.context) == null ? void 0 : d.exitCode) === void 0 && ((g = (m = (f = n.findTab(u)) == null ? void 0 : f.context) == null ? void 0 : m.process) == null || g.kill());
  }, a = async (u, c, d) => {
    n.findTabIndex(u) === -1 && d ? n.open(u, c, await r(u, d)) : n.open(u);
  }, s = async (u) => {
    var f;
    const c = n.findTab(u), d = c == null ? void 0 : c.context;
    d && (l(u), await ((f = d.process) == null ? void 0 : f.exit), await nextTick(), n.open(
      u,
      c == null ? void 0 : c.label,
      await r(u, {
        ...toRaw(d),
        args: toRaw(d.args),
        exitCode: void 0,
        logs: []
      })
    ));
  }, l = (u) => {
    o(u), n.close(u);
  }, i = computed(
    () => {
      var _a2;
      return ((_a2 = e.terminal.maxCount) != null ? _a2 : 0) - n.tabs.value.filter(
        ({ context: u }) => !(u != null && u.isHidden) && (u == null ? void 0 : u.isTerminal)
      ).length;
    }
  );
  return {
    ...n,
    availableTerminals: i,
    close: l,
    kill: o,
    open: a,
    restart: s
  };
};
function mv() {
  const e = Qo(async () => {
    const d = await Xs();
    return d.on("server-ready", (f, m) => n.value = m), d;
  }, null), t = ref(), n = ref(), r = ref({}), o = reactive({
    editor: {
      suppressClose: false
    },
    explorer: {
      hidden: ["./node_modules/*"],
      readonly: [
        "*/node_modules",
        "*/package-lock.json",
        "*/pnpm-lock.yaml",
        "*/yarn.lock"
      ],
      reinstall: ["./package.json"]
    },
    preview: {},
    process: {
      commands: {
        install: "npm install",
        devServer: "npm start",
        terminal: "jsh"
      },
      packageManager: "npm",
      starters: {
        install: () => l.open(o.process.commands.install, "Install", {
          ...jr(o.process.commands.install),
          suppressClose: true
        }),
        devServer: () => l.open(o.process.commands.devServer, "Dev Server", {
          ...jr(o.process.commands.devServer),
          suppressClose: true
        }),
        terminal: () => {
          var _a2;
          const d = l.tabs.value.filter(
            ({ context: m }) => !(m != null && m.isHidden) && (m == null ? void 0 : m.isTerminal)
          );
          if (((_a2 = o.terminal.maxCount) != null ? _a2 : 0) <= d.length)
            return Promise.resolve();
          const f = Math.max(
            0,
            Math.max.apply(
              void 0,
              d.map(({ order: m }) => m)
            )
          ) + 1;
          return l.open(
            `${o.process.commands.terminal}-${f}`,
            "Terminal",
            {
              ...jr(o.process.commands.terminal),
              isTerminal: true
            }
          );
        }
      }
    },
    terminal: {
      maxCount: 3
    }
  }), a = fv(o), s = iv(o), l = pv(o), i = (d, f) => {
    typeof f == "function" ? o[d] = f(o[d]) : o[d] = f;
  }, u = (d) => {
    if (d !== o.process.packageManager)
      switch (o.process.packageManager = d, d) {
        case "npm":
          o.process.commands.install = "npm install", o.process.commands.devServer = "npm start";
          break;
        case "pnpm":
          o.process.commands.install = "pnpm install", o.process.commands.devServer = "pnpm start";
          break;
        case "yarn":
          o.process.commands.install = "yarn", o.process.commands.devServer = "yarn start";
          break;
      }
  }, c = async () => {
    var d, f, m, g, h2, b, p, y, _, E, C;
    l.close(o.process.commands.devServer), l.close(o.process.commands.install), r.value.reinstall || (await ((d = e.value) == null ? void 0 : d.setPreviewScript(`
        window.parent.postMessage({ type: 'navigation', href: window.location.href}, '*');
        window.addEventListener('hashchange', () => {
          window.parent.postMessage({ type: 'navigation', href: window.location.href}, '*');
        })
      `)), await ((m = (f = o.process.starters) == null ? void 0 : f.terminal) == null ? void 0 : m.call(f))), await ((h2 = (g = o.process.starters) == null ? void 0 : g.install) == null ? void 0 : h2.call(g)), await ((y = (p = (b = l.findTab(o.process.commands.install)) == null ? void 0 : b.context) == null ? void 0 : p.process) == null ? void 0 : y.exit), await ((E = (_ = o.process.starters) == null ? void 0 : _.devServer) == null ? void 0 : E.call(_)), r.value.reinstall || (r.value.reinstall = (C = e.value) == null ? void 0 : C.fs.watch(
      ".",
      { recursive: true },
      async (S, T) => {
        S === "change" && typeof T == "string" && a.reinstall.value.ignores(`./${T}`) && await c();
      }
    ));
  };
  return {
    bootstrap: c,
    /**
     * A computed ref that gives access to the web container instance.
     */
    container: computed(() => e.value),
    /**
     * Editor tabs manager. Responsible for opening, focusing and closing editor tabs.
     */
    editorTabs: s,
    /**
     * Provides matchers for different purposes.
     * The matchers use [ignore](https://www.npmjs.com/package/ignore) to determine whether a give path matches one
     * of the patterns specified in the sandbox options.
     */
    explorer: a,
    options: readonly(o),
    preview: {
      /**
       * A reference to the preview iframe element.
       */
      frame: t,
      /**
       * Reload the preview.
       */
      reload: async () => {
        t.value && await reloadPreview(t.value);
      },
      /**
       * Computed ref containing a boolean flag. When true, the address bar in the preview panel will not be shown.
       */
      suppressAddressBar: computed(() => o.preview.suppressAddressBar),
      /**
       * The preview URL.
       */
      url: computed(() => {
        var _a2;
        return (_a2 = n.value) != null ? _a2 : "";
      })
    },
    /**
     * Process tabs manager. Responsible for opening, focusing and closing process and terminal tabs.
     */
    processTabs: l,
    setOption: i,
    setPackageManager: u
  };
}
const gt = Vm(mv), ug = (e) => {
  const t = ref(true);
  return {
    boot: WebContainer.boot(e).then((r) => (t.value = false, r)),
    isBooting: t
  };
}, vv = {
  dark: [
    EditorView$1.theme(
      {
        "&": {
          backgroundColor: "hsl(var(--background))"
          // Your custom background color
        },
        ".cm-gutters": {
          backgroundColor: "hsl(var(--muted))"
        }
      },
      { dark: true }
    ),
    oneDark
  ],
  light: []
}, gv = { class: "h-full overflow-auto text-[13px] w-full" }, hv = /* @__PURE__ */ defineComponent({
  __name: "KrgzEditor",
  props: {
    disabled: { type: Boolean },
    path: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, r = t, o = gt(), a = ref(null), s = Zo();
    watch(
      () => o.container.value ? n.path : void 0,
      async (g) => {
        if (g === void 0) return;
        const h2 = o.container.value;
        a.value = g ? await h2.fs.readFile(g, "utf-8").catch(() => (r("close", g), "")) : "";
        const b = h2.fs.watch(g, async (p) => {
          if (p !== "change") return;
          const y = await h2.fs.readFile(g, "utf-8");
          y !== a.value && (a.value = y);
        });
        return () => b.close();
      },
      { immediate: true }
    );
    const l = Ym((g) => {
      var h2;
      n.path && ((h2 = o.container.value) == null || h2.fs.writeFile(n.path, g, "utf-8"));
    }, 300), i = Qo(
      () => {
        var g;
        return n.path ? (g = LanguageDescription.matchFilename(languages, n.path)) == null ? void 0 : g.load() : void 0;
      }
    ), u = computed(() => s.value ? "dark" : "light"), c = computed(
      () => {
        var _a2;
        var g, h2;
        return (_a2 = (h2 = (g = o.options.editor.theme) == null ? void 0 : g[u.value]) == null ? void 0 : h2.call(g)) != null ? _a2 : vv[u.value];
      }
    ), d = computed(
      () => [i.value, ...c.value].filter((g) => !!g)
    ), f = shallowRef(), m = (g) => {
      f.value = g.view;
    };
    return (g, h2) => (openBlock(), createElementBlock("div", gv, [
      a.value !== null ? (openBlock(), createBlock(unref(T), {
        key: 0,
        "model-value": a.value,
        disabled: g.disabled,
        placeholder: "Code goes here...",
        style: { height: "100%" },
        autofocus: true,
        "indent-with-tab": true,
        "tab-size": 2,
        extensions: d.value,
        onReady: m,
        onChange: unref(l)
      }, null, 8, ["model-value", "disabled", "extensions", "onChange"])) : createCommentVNode("", true)
    ]));
  }
}), Vt = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "KrgzTabIcon",
  props: {
    icon: { type: [Function, Object] },
    tooltip: {}
  },
  setup(e) {
    return (t, n) => (openBlock(), createBlock(unref(ms), null, {
      default: withCtx(() => [
        createVNode(unref(fs), { "delay-duration": 0 }, {
          default: withCtx(() => [
            createVNode(unref(vs), { "as-child": "" }, {
              default: withCtx(() => [
                renderSlot(t.$slots, "default", {}, () => {
                  var _a2;
                  var r;
                  return [
                    t.icon ? (openBlock(), createBlock(resolveDynamicComponent(t.icon), mergeProps({ key: 0 }, t.$attrs, {
                      class: (_a2 = (r = t.$attrs) == null ? void 0 : r.class) != null ? _a2 : "h-4 opacity-50 w-4 hover:opacity-100",
                      "aria-label": t.tooltip
                    }), null, 16, ["class", "aria-label"])) : createCommentVNode("", true)
                  ];
                })
              ]),
              _: 3
            }),
            createVNode(unref(ps), {
              class: "text-xs",
              side: "bottom",
              "side-offset": 12
            }, {
              default: withCtx(() => [
                renderSlot(t.$slots, "tooltip", {}, () => [
                  createTextVNode(toDisplayString(t.tooltip), 1)
                ])
              ]),
              _: 3
            })
          ]),
          _: 3
        })
      ]),
      _: 3
    }));
  }
}), bv = { class: "bg-muted max-w-full min-h-min overflow-x-auto krgz-tabs" }, yv = { class: "flex gap-2 items-center" }, _v = ["title"], Ev = /* @__PURE__ */ defineComponent({
  __name: "KrgzEditorTabs",
  setup(e) {
    const { t } = vt(), { editorTabs: n, explorer: r } = gt(), o = ref(), a = computed(() => r.readonly.value);
    return watch(
      () => n.current.value,
      async () => {
        var s, l, i;
        await nextTick(), (i = (l = (s = o.value) == null ? void 0 : s.$el) == null ? void 0 : l.querySelector('[data-active="true"]')) == null || i.scrollIntoView({ block: "nearest", inline: "start" });
      }
    ), (s, l) => {
      var i;
      return unref(n).tabs.value.length ? (openBlock(), createBlock(unref(us), {
        key: 0,
        class: "h-full flex flex-col",
        dir: unref(t)("krgz.dir"),
        "model-value": (i = unref(n).current.value) == null ? void 0 : i.id,
        "onUpdate:modelValue": l[1] || (l[1] = (u) => unref(n).open(u))
      }, {
        default: withCtx(() => {
          var _a2;
          var u;
          return [
            createElementVNode("div", bv, [
              createVNode(unref(ds), {
                ref_key: "tabList",
                ref: o
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(n).tabs.value, (c) => (openBlock(), createBlock(unref(oo), {
                    key: c.id,
                    class: "text-xs",
                    value: c.id
                  }, {
                    default: withCtx(() => {
                      var d;
                      return [
                        createElementVNode("div", yv, [
                          createElementVNode("span", {
                            class: normalizeClass({ italic: a.value.ignores(c.label) }),
                            title: c.label.substring(1)
                          }, toDisplayString(c.label.split("/").at(-1)), 11, _v),
                          a.value.ignores(c.label) ? (openBlock(), createBlock(Vt, {
                            key: 0,
                            class: "h-4 opacity-50 w-4",
                            icon: unref(yf),
                            tooltip: unref(t)("krgz.sandbox.panel.editor.readonly")
                          }, null, 8, ["icon", "tooltip"])) : createCommentVNode("", true),
                          (d = c.context) != null && d.suppressClose ? createCommentVNode("", true) : (openBlock(), createBlock(Vt, {
                            key: 1,
                            icon: unref(Es),
                            tooltip: unref(t)("krgz.sandbox.general.close"),
                            onClick: withModifiers((f) => unref(n).close(c.id), ["stop"])
                          }, null, 8, ["icon", "tooltip", "onClick"]))
                        ])
                      ];
                    }),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 1
              }, 512)
            ]),
            createVNode(unref(cs), {
              class: "flex-grow max-h-full mt-0 overflow-hidden",
              value: (_a2 = (u = unref(n).current.value) == null ? void 0 : u.id) != null ? _a2 : ""
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(n).tabs.value, (c) => {
                  var d;
                  return withDirectives((openBlock(), createBlock(hv, {
                    key: c.id,
                    dir: "ltr",
                    disabled: a.value.ignores(c.id),
                    path: c.id,
                    onClose: l[0] || (l[0] = (f) => unref(n).close(f))
                  }, null, 8, ["disabled", "path"])), [
                    [vShow, c.id === ((d = unref(n).current.value) == null ? void 0 : d.id)]
                  ]);
                }), 128))
              ]),
              _: 1
            }, 8, ["value"])
          ];
        }),
        _: 1
      }, 8, ["dir", "model-value"])) : (openBlock(), createBlock(unref(Kn), {
        key: 1,
        label: unref(t)("krgz.sandbox.loading.editor"),
        "suppress-spinner": "",
        variant: "secondary"
      }, {
        default: withCtx(() => [
          createVNode(unref(hs), { class: "size-12" })
        ]),
        _: 1
      }, 8, ["label"]));
    };
  }
}), el = async (e, t) => (await e.fs.readdir(t, {
  withFileTypes: true
})).sort((n, r) => n.isDirectory() && r.isFile() ? -1 : 0), Js = (e) => {
  const t = gt(), n = ref([]), r = ref();
  return watch(
    () => t.container.value ? toValue(e) : void 0,
    async (o) => {
      var s;
      if (o === void 0) return;
      const a = t.container.value;
      return (s = r.value) == null || s.close(), r.value = a.fs.watch(
        o,
        async () => n.value = await el(a, o)
      ), n.value = await el(a, o), () => {
        var l;
        return (l = r.value) == null ? void 0 : l.close();
      };
    },
    { immediate: true }
  ), { dirEnts: n };
}, wv = ["title"], Qs = /* @__PURE__ */ defineComponent({
  __name: "KrgzExplorerEntity",
  props: {
    depth: {},
    entity: {},
    path: {}
  },
  emits: ["fileClick"],
  setup(e, { emit: t }) {
    const n = e, r = t, { explorer: o, editorTabs: a } = gt(), s = ref(false), l = ref(false), i = computed(() => `${n.path || "."}/${n.entity.name}`), u = computed(() => o.hidden.value.ignores(i.value)), c = computed(
      () => o.readonly.value.ignores(i.value)
    ), d = computed(
      () => {
        var g;
        return n.entity.isFile() && ((g = a.current.value) == null ? void 0 : g.id) === i.value;
      }
    ), f = watch(
      l,
      (g) => {
        g && (s.value = true, f());
      },
      { immediate: true }
    );
    watch(
      () => {
        var _a2;
        var g;
        return [(_a2 = (g = a.current.value) == null ? void 0 : g.id) != null ? _a2 : "", i.value];
      },
      ([g, h2]) => {
        g.startsWith(h2) && !l.value && n.entity.isDirectory() && m();
      }
    );
    const m = () => {
      n.entity.isFile() ? r("fileClick", `${i.value}`) : l.value = !l.value;
    };
    return (g, h2) => u.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("li", {
      key: 0,
      class: "krgz-explorer-entity",
      style: normalizeStyle({ "--krgz-depth": g.depth })
    }, [
      createElementVNode("a", {
        class: normalizeClass(["krgz-explorer-entity-header no-underline hover:bg-secondary", { "font-bold": d.value }]),
        onClick: m
      }, [
        (openBlock(), createBlock(resolveDynamicComponent(g.entity.isFile() ? unref(mf) : l.value ? unref(gf) : unref(hf)), {
          class: normalizeClass(["krgz-explorer-entity-icon min-w-3.5 size-3.5", { "opacity-50": c.value }])
        }, null, 8, ["class"])),
        createElementVNode("span", {
          class: normalizeClass(["krgz-explorer-entity-name", { "italic opacity-50": c.value }]),
          title: g.entity.name
        }, toDisplayString(g.entity.name), 11, wv)
      ], 2),
      s.value && g.entity.isDirectory() ? withDirectives((openBlock(), createBlock(Cv, {
        key: 0,
        depth: g.depth + 1,
        path: i.value
      }, null, 8, ["depth", "path"])), [
        [vShow, l.value]
      ]) : createCommentVNode("", true)
    ], 4));
  }
}), xv = {
  key: 0,
  class: "select-none m-0 p-0 text-xs"
}, Cv = /* @__PURE__ */ defineComponent({
  __name: "KrgzExplorerSubdir",
  props: {
    depth: { default: 1 },
    path: { default: "" }
  },
  setup(e) {
    const t = e, n = gt(), { dirEnts: r } = Js(t.path);
    return (o, a) => unref(r).length ? (openBlock(), createElementBlock("ul", xv, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(r), (s) => (openBlock(), createBlock(Qs, {
        key: s.name,
        depth: o.depth,
        path: o.path,
        entity: s,
        onFileClick: a[0] || (a[0] = (l) => unref(n).editorTabs.open(l))
      }, null, 8, ["depth", "path", "entity"]))), 128))
    ])) : createCommentVNode("", true);
  }
}), Tv = { class: "h-full relative w-full" }, kv = { class: "flex flex-col h-full" }, Nv = {
  key: 0,
  class: "bg-muted flex"
}, Sv = { class: "flex-grow self-center overflow-ellipsis overflow-hidden p-2 text-xs whitespace-nowrap" }, Lv = ["href"], Av = ["src"], Ov = /* @__PURE__ */ defineComponent({
  __name: "KrgzPreview",
  setup(e) {
    const { t } = vt(), n = gt(), r = n.preview.frame, o = ref(false), a = ref(), s = computed(
      () => {
        var _a2;
        var c;
        return (_a2 = (c = a.value) == null ? void 0 : c.replace(
          /(https:\/\/)(.+)(.webcontainer-api.io)/,
          "$1..$3"
        )) != null ? _a2 : "";
      }
    ), l = () => o.value = true, i = (c) => {
      var d, f;
      c.origin === n.preview.url.value && ((d = c.data) == null ? void 0 : d.type) === "navigation" && (f = c.data) != null && f.href && (a.value = c.data.href);
    }, u = () => {
      r.value && a.value && (r.value.src = "about:blank", r.value.src = a.value);
    };
    return onMounted(async () => {
      var c;
      await nextTick(), (c = r.value) == null || c.addEventListener("load", l), (void 0).addEventListener("message", i);
    }), onBeforeUnmount(() => {
      var c;
      (c = r.value) == null || c.removeEventListener("load", l), (void 0).removeEventListener("message", i);
    }), (c, d) => (openBlock(), createElementBlock("div", Tv, [
      createElementVNode("div", kv, [
        unref(n).preview.suppressAddressBar.value ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Nv, [
          createElementVNode("div", Sv, [
            createElementVNode("a", {
              class: "text-muted-foreground no-underline",
              href: a.value,
              dir: "ltr",
              target: "_blank"
            }, toDisplayString(s.value), 9, Lv)
          ]),
          createVNode(unref(Wo), {
            size: "sm",
            variant: "ghost",
            onClick: u
          }, {
            default: withCtx(() => [
              createVNode(Vt, {
                class: "size-3",
                icon: unref(ys),
                tooltip: unref(t)("krgz.sandbox.panel.preview.reload")
              }, null, 8, ["icon", "tooltip"])
            ]),
            _: 1
          })
        ])),
        createElementVNode("iframe", {
          ref_key: "previewFrame",
          ref: r,
          src: unref(n).preview.url.value,
          class: "flex-grow w-full"
        }, null, 8, Av)
      ]),
      o.value ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Kn), {
        key: 0,
        class: "absolute inset-0",
        label: unref(t)("krgz.sandbox.loading.preview"),
        variant: "secondary"
      }, {
        default: withCtx(() => [
          createVNode(unref(gs), { class: "size-12" })
        ]),
        _: 1
      }, 8, ["label"]))
    ]));
  }
}), Iv = {
  background: "#0a0a0a",
  foreground: "#cdd6f4",
  cursor: "#f5e0dc",
  selectionBackground: "#585b70",
  black: "#1e1e2e",
  red: "#f38ba8",
  green: "#a6e3a1",
  yellow: "#f9e2af",
  blue: "#89b4fa",
  magenta: "#cba6f7",
  cyan: "#94e2d5",
  white: "#bac2de",
  brightBlack: "#45475a",
  brightRed: "#f38ba8",
  brightGreen: "#a6e3a1",
  brightYellow: "#f9e2af",
  brightBlue: "#89b4fa",
  brightMagenta: "#cba6f7",
  brightCyan: "#94e2d5",
  brightWhite: "#a6adc8"
}, Pv = {
  background: "#ffffff",
  foreground: "#24292e",
  cursor: "#6a737d",
  selectionBackground: "#dbe2e6",
  black: "#24292e",
  red: "#d73a49",
  green: "#22863a",
  yellow: "#b08800",
  blue: "#005cc5",
  magenta: "#6f42c1",
  cyan: "#1b7c83",
  white: "#f6f8fa",
  brightBlack: "#959da5",
  brightRed: "#cb2431",
  brightGreen: "#28a745",
  brightYellow: "#dbab09",
  brightBlue: "#0366d6",
  brightMagenta: "#6f42c1",
  brightCyan: "#1b7c83",
  brightWhite: "#fafbfc"
}, Dv = {
  dark: Iv,
  light: Pv
}, Rv = /* @__PURE__ */ defineComponent({
  __name: "KrgzProcess",
  props: {
    tab: {}
  },
  setup(e) {
    const t = e, { options: n, processTabs: r } = gt(), o = computed(() => t.tab.context), a = computed(() => {
      var m;
      return (m = o.value) == null ? void 0 : m.process;
    }), s = ref(), l = ref(), i = ref(), u = Zo(), c = computed(() => u.value ? "dark" : "light"), d = computed(
      () => {
        var _a2;
        var m, g;
        return (_a2 = (g = (m = n.terminal.theme) == null ? void 0 : m[c.value]) == null ? void 0 : g.call(m)) != null ? _a2 : Dv[c.value];
      }
    );
    watch(d, () => {
      var m;
      (m = l.value) != null && m.options && (l.value.options.theme = d.value);
    }), watch(
      () => {
        var m, g;
        return (g = (m = t.tab) == null ? void 0 : m.context) == null ? void 0 : g.exitCode;
      },
      (m) => {
        var g;
        m !== void 0 && ((g = l.value) == null || g.write(`

Exit code: ${m}`));
      }
    ), onMounted(async () => {
      var m, g;
      await nextTick(), s.value = new (await import('./addon-fit-B-gqwioz-DP-wMRGx.mjs').then((h2) => h2.a)).FitAddon(), l.value = new (await import('./xterm-CW1xI9Rk-CVvF4fnj.mjs').then((h2) => h2.x)).Terminal({
        convertEol: true,
        theme: d.value
      }), l.value.loadAddon(s.value), l.value.open(i.value), s.value.fit(), (g = (m = o.value) == null ? void 0 : m.logs) == null || g.map((h2) => {
        var b;
        return (b = l.value) == null ? void 0 : b.write(h2);
      }), r.updateContext(t.tab.id, (h2) => ({
        ...h2,
        processOutputHandler: (b) => {
          var p;
          return (p = l.value) == null ? void 0 : p.write(b);
        }
      })), l.value.onData((h2) => {
        var b, p, y;
        (b = o.value) != null && b.suppressInput || (y = (p = o.value) == null ? void 0 : p.processInputHandler) == null || y.call(p, h2);
      }), (void 0).addEventListener("resize", f);
    }), onBeforeUnmount(() => {
      (void 0).removeEventListener("resize", f);
    });
    const f = () => {
      var _a2, _b;
      var m, g, h2, b;
      (m = s.value) == null || m.fit(), (b = a.value) == null || b.resize({
        cols: (_a2 = (g = l.value) == null ? void 0 : g.cols) != null ? _a2 : 80,
        rows: (_b = (h2 = l.value) == null ? void 0 : h2.rows) != null ? _b : 20
      });
    };
    return (m, g) => (openBlock(), createElementBlock("div", {
      ref_key: "terminalEl",
      ref: i,
      class: "h-full"
    }, null, 512));
  }
}), Mv = { class: "bg-muted max-w-full min-h-min overflow-x-auto krgz-tabs" }, Fv = { class: "flex gap-2 items-center" }, $v = ["title"], tl = /* @__PURE__ */ defineComponent({
  __name: "KrgzProcessTabs",
  props: {
    mode: {}
  },
  setup(e) {
    const t = e, { t: n } = vt(), { options: r, processTabs: o } = gt(), a = computed(() => o.tabs.value), s = ref(), l = computed(
      () => a.value.filter(
        ({ context: d }) => !(d != null && d.isHidden) && (t.mode === "process" && !(d != null && d.isTerminal) || t.mode === "terminal" && (d == null ? void 0 : d.isTerminal))
      )
    ), i = computed(
      () => l.value.length ? Math.max.apply(
        void 0,
        l.value.map(({ order: d }) => d)
      ) : -1
    ), u = computed(
      () => l.value.find(({ order: d }) => d === i.value)
    );
    watch(
      () => o.current.value,
      async () => {
        var d, f, m;
        await nextTick(), (m = (f = (d = s.value) == null ? void 0 : d.$el) == null ? void 0 : f.querySelector('[data-active="true"]')) == null || m.scrollIntoView({ block: "nearest", inline: "start" });
      }
    );
    const c = (d) => {
      var f, m;
      d === "CREATE_NEW_PROCESS" ? (m = (f = r.process.starters) == null ? void 0 : f.terminal) == null || m.call(f) : o.open(d);
    };
    return (d, f) => {
      var m;
      return l.value.length ? (openBlock(), createBlock(unref(us), {
        key: 0,
        class: "h-full flex flex-col",
        dir: unref(n)("krgz.dir"),
        "model-value": (m = u.value) == null ? void 0 : m.id,
        "onUpdate:modelValue": c
      }, {
        default: withCtx(() => {
          var _a2;
          var g;
          return [
            createElementVNode("div", Mv, [
              createVNode(unref(ds), {
                ref_key: "tabList",
                ref: s
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (h2) => (openBlock(), createBlock(unref(oo), {
                    key: h2.id,
                    class: "text-xs",
                    value: h2.id
                  }, {
                    default: withCtx(() => {
                      var b, p, y, _, E, C;
                      return [
                        createElementVNode("div", Fv, [
                          createElementVNode("span", {
                            title: h2.label
                          }, toDisplayString(h2.label), 9, $v),
                          !((b = h2.context) != null && b.isTerminal) && ((p = h2.context) != null && p.canRestart) ? (openBlock(), createBlock(Vt, {
                            key: 0,
                            icon: unref(ys),
                            tooltip: unref(n)("krgz.sandbox.general.restart"),
                            onClick: withModifiers((S) => unref(o).restart(h2.id), ["stop"])
                          }, null, 8, ["icon", "tooltip", "onClick"])) : createCommentVNode("", true),
                          !((y = h2.context) != null && y.isTerminal) && ((_ = h2.context) != null && _.canStop) && ((E = h2.context) == null ? void 0 : E.exitCode) === void 0 ? (openBlock(), createBlock(Vt, {
                            key: 1,
                            icon: unref(Cf),
                            tooltip: unref(n)("krgz.sandbox.general.stop"),
                            onClick: withModifiers((S) => unref(o).kill(h2.id), ["stop"])
                          }, null, 8, ["icon", "tooltip", "onClick"])) : createCommentVNode("", true),
                          (C = h2.context) != null && C.suppressClose ? createCommentVNode("", true) : (openBlock(), createBlock(Vt, {
                            key: 2,
                            icon: unref(Es),
                            tooltip: unref(n)("krgz.sandbox.general.close"),
                            onClick: withModifiers((S) => unref(o).close(h2.id), ["stop"])
                          }, null, 8, ["icon", "tooltip", "onClick"]))
                        ])
                      ];
                    }),
                    _: 2
                  }, 1032, ["value"]))), 128)),
                  t.mode === "terminal" && 0 < unref(o).availableTerminals.value ? (openBlock(), createBlock(unref(oo), {
                    key: 0,
                    class: "text-xs",
                    value: "CREATE_NEW_PROCESS"
                  }, {
                    default: withCtx(() => [
                      createVNode(Vt, {
                        icon: unref(xf),
                        tooltip: unref(n)("krgz.sandbox.panel.terminals.new")
                      }, null, 8, ["icon", "tooltip"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 512)
            ]),
            createVNode(unref(cs), {
              class: "flex-grow max-h-full mt-0 overflow-hidden",
              value: (_a2 = (g = u.value) == null ? void 0 : g.id) != null ? _a2 : ""
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(l.value, (h2) => {
                  var b;
                  return openBlock(), createElementBlock(Fragment, {
                    key: h2.id
                  }, [
                    h2.id === ((b = u.value) == null ? void 0 : b.id) ? (openBlock(), createBlock(Rv, {
                      key: 0,
                      tab: h2
                    }, null, 8, ["tab"])) : createCommentVNode("", true)
                  ], 64);
                }), 128))
              ]),
              _: 1
            }, 8, ["value"])
          ];
        }),
        _: 1
      }, 8, ["dir", "model-value"])) : (openBlock(), createBlock(unref(Kn), {
        key: 1,
        label: d.mode === "process" ? unref(n)("krgz.sandbox.loading.processes") : unref(o).availableTerminals.value ? void 0 : unref(n)("krgz.sandbox.loading.terminals"),
        "suppress-spinner": "",
        variant: "secondary"
      }, {
        default: withCtx(() => [
          d.mode === "process" ? (openBlock(), createBlock(unref(bs), {
            key: 0,
            class: "size-12"
          })) : createCommentVNode("", true),
          d.mode === "terminal" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createVNode(unref(_s), { class: "size-12" }),
            unref(o).availableTerminals.value ? (openBlock(), createBlock(unref(Wo), {
              key: 0,
              size: "xs",
              variant: "link",
              onClick: f[0] || (f[0] = (g) => {
                var h2, b;
                return (b = (h2 = unref(r).process.starters) == null ? void 0 : h2.terminal) == null ? void 0 : b.call(h2);
              })
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(n)("krgz.sandbox.panel.terminals.open")), 1)
              ]),
              _: 1
            })) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["label"]));
    };
  }
}), Zs = ["code", "processes", "result", "terminal"], zv = ["dir"], Bv = {
  key: 0,
  class: "select-none m-0 p-0 text-xs"
}, Vv = /* @__PURE__ */ defineComponent({
  __name: "KrgzExplorer",
  setup(e) {
    const { t } = vt(), n = gt(), { dirEnts: r } = Js("");
    return (o, a) => (openBlock(), createElementBlock("div", {
      dir: unref(t)("krgz.dir")
    }, [
      unref(r).length ? (openBlock(), createElementBlock("ul", Bv, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(r), (s) => (openBlock(), createBlock(Qs, {
          key: s.name,
          path: "",
          depth: 1,
          entity: s,
          onFileClick: a[0] || (a[0] = (l) => unref(n).editorTabs.open(l))
        }, null, 8, ["entity"]))), 128))
      ])) : (openBlock(), createBlock(unref(Kn), {
        key: 1,
        class: "absolute inset-0",
        label: unref(t)("krgz.sandbox.loading.files"),
        variant: "secondary"
      }, {
        default: withCtx(() => [
          createVNode(unref(vf), { class: "size-12" })
        ]),
        _: 1
      }, 8, ["label"]))
    ], 8, zv));
  }
}), $t = /* @__PURE__ */ defineComponent({
  __name: "KrgzPanelToggle",
  props: {
    asButton: { type: Boolean },
    pressed: { type: Boolean },
    label: {},
    side: {}
  },
  emits: ["press"],
  setup(e) {
    return (t, n) => (openBlock(), createBlock(unref(ms), null, {
      default: withCtx(() => [
        createVNode(unref(fs), { "delay-duration": 0 }, {
          default: withCtx(() => {
            var _a2;
            return [
              createVNode(unref(vs), null, {
                default: withCtx(() => [
                  t.asButton ? (openBlock(), createBlock(unref(Wo), {
                    key: 0,
                    "aria-label": t.label,
                    class: "w-full",
                    size: "icon",
                    variant: "outline",
                    onClick: n[0] || (n[0] = (r) => t.$emit("press"))
                  }, {
                    default: withCtx(() => [
                      renderSlot(t.$slots, "default")
                    ]),
                    _: 3
                  }, 8, ["aria-label"])) : (openBlock(), createBlock(unref(sf), {
                    key: 1,
                    "aria-label": t.label,
                    pressed: t.pressed || void 0,
                    variant: "outline",
                    "onUpdate:pressed": n[1] || (n[1] = (r) => t.$emit("press"))
                  }, {
                    default: withCtx(() => [
                      renderSlot(t.$slots, "default")
                    ]),
                    _: 3
                  }, 8, ["aria-label", "pressed"]))
                ]),
                _: 3
              }),
              createVNode(unref(ps), {
                class: "text-xs",
                portal: { disabled: true },
                side: (_a2 = t.side) != null ? _a2 : "right",
                "side-offset": 5
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(t.label), 1)
                ]),
                _: 1
              }, 8, ["side"])
            ];
          }),
          _: 3
        })
      ]),
      _: 3
    }));
  }
}), Uv = {
  key: 0,
  class: "border-e border-e-border flex flex-col h-full"
}, Wv = {
  key: 0,
  class: "grid gap-2 p-2"
}, Hv = {
  key: 1,
  class: "mt-auto grid gap-2 p-2"
}, jv = { class: "flex flex-col" }, Gv = {
  key: 1,
  class: "border-s border-s-border flex flex-col h-full"
}, Kv = {
  key: 0,
  class: "grid gap-2 p-2"
}, Yv = {
  key: 1,
  class: "mt-auto grid gap-2 p-2"
}, Xv = /* @__PURE__ */ defineComponent({
  __name: "KrgzSandboxPanelToggles",
  props: {
    availablePanels: {},
    hideFullScreenToggle: { type: Boolean },
    hideSolveButton: { type: Boolean },
    hideThemeToggle: { type: Boolean },
    shownPanels: {}
  },
  emits: ["solve", "toggle"],
  setup(e) {
    const t = e, { t: n } = vt(), r = useTemplateRef("$el"), o = sv(r), a = Zo(), s = Jm(a), l = computed(
      () => Object.fromEntries(
        Zs.map((i) => [i, t.availablePanels.includes(i)])
      )
    );
    return (i, u) => (openBlock(), createElementBlock("section", {
      ref_key: "$el",
      ref: r,
      class: normalizeClass(["grid h-full w-full krgz-sandbox-grid", { "is-fullscreen": unref(o).isFullscreen.value }])
    }, [
      l.value.code || l.value.result ? (openBlock(), createElementBlock("aside", Uv, [
        l.value.code ? (openBlock(), createElementBlock("nav", Wv, [
          i.availablePanels.includes("code") ? (openBlock(), createBlock($t, {
            key: 0,
            label: unref(n)("krgz.sandbox.toggle.code"),
            pressed: i.shownPanels.includes("code"),
            onPress: u[0] || (u[0] = (c) => i.$emit("toggle", "code"))
          }, {
            default: withCtx(() => [
              createVNode(unref(hs), { class: "size-5" })
            ]),
            _: 1
          }, 8, ["label", "pressed"])) : createCommentVNode("", true),
          u[6] || (u[6] = createElementVNode("div", { class: "border-t border-t-border" }, null, -1)),
          i.hideFullScreenToggle ? createCommentVNode("", true) : (openBlock(), createBlock($t, {
            key: 1,
            "as-button": "",
            label: unref(n)("krgz.sandbox.toggle.fullscreen"),
            onPress: unref(o).toggle
          }, {
            default: withCtx(() => [
              unref(o).isFullscreen.value ? (openBlock(), createBlock(unref(Ef), {
                key: 0,
                class: "size-5"
              })) : (openBlock(), createBlock(unref(_f), {
                key: 1,
                class: "size-5"
              }))
            ]),
            _: 1
          }, 8, ["label", "onPress"])),
          i.hideSolveButton ? createCommentVNode("", true) : (openBlock(), createBlock($t, {
            key: 2,
            "as-button": "",
            label: unref(n)("krgz.sandbox.toggle.solve"),
            onPress: u[1] || (u[1] = (c) => i.$emit("solve"))
          }, {
            default: withCtx(() => [
              createVNode(unref(bf), { class: "size-5" })
            ]),
            _: 1
          }, 8, ["label"])),
          i.hideThemeToggle ? createCommentVNode("", true) : (openBlock(), createBlock($t, {
            key: 3,
            "as-button": "",
            label: unref(n)("krgz.sandbox.toggle.theme"),
            onPress: u[2] || (u[2] = (c) => unref(s)())
          }, {
            default: withCtx(() => [
              unref(a) ? (openBlock(), createBlock(unref(Tf), {
                key: 0,
                class: "size-5"
              })) : (openBlock(), createBlock(unref(wf), {
                key: 1,
                class: "size-5"
              }))
            ]),
            _: 1
          }, 8, ["label"]))
        ])) : createCommentVNode("", true),
        l.value.result ? (openBlock(), createElementBlock("nav", Hv, [
          i.availablePanels.includes("result") ? (openBlock(), createBlock($t, {
            key: 0,
            label: unref(n)("krgz.sandbox.toggle.result"),
            pressed: i.shownPanels.includes("result"),
            onPress: u[3] || (u[3] = (c) => i.$emit("toggle", "result"))
          }, {
            default: withCtx(() => [
              createVNode(unref(gs), { class: "size-5" })
            ]),
            _: 1
          }, 8, ["label", "pressed"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true),
      createElementVNode("div", jv, [
        renderSlot(i.$slots, "default")
      ]),
      l.value.processes || l.value.terminal ? (openBlock(), createElementBlock("aside", Gv, [
        l.value.terminal ? (openBlock(), createElementBlock("nav", Kv, [
          i.availablePanels.includes("terminal") ? (openBlock(), createBlock($t, {
            key: 0,
            label: unref(n)("krgz.sandbox.toggle.terminal"),
            pressed: i.shownPanels.includes("terminal"),
            onPress: u[4] || (u[4] = (c) => i.$emit("toggle", "terminal"))
          }, {
            default: withCtx(() => [
              createVNode(unref(_s), { class: "size-5" })
            ]),
            _: 1
          }, 8, ["label", "pressed"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        l.value.processes ? (openBlock(), createElementBlock("nav", Yv, [
          i.availablePanels.includes("processes") ? (openBlock(), createBlock($t, {
            key: 0,
            label: unref(n)("krgz.sandbox.toggle.processes"),
            pressed: i.shownPanels.includes("processes"),
            onPress: u[5] || (u[5] = (c) => i.$emit("toggle", "processes"))
          }, {
            default: withCtx(() => [
              createVNode(unref(bs), { class: "size-5" })
            ]),
            _: 1
          }, 8, ["label", "pressed"])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true)
    ], 2));
  }
}), cg = /* @__PURE__ */ defineComponent({
  __name: "KrgzSandbox",
  props: /* @__PURE__ */ mergeModels({
    booting: { type: Boolean },
    hideExplorer: { type: Boolean },
    hideFullScreenToggle: { type: Boolean },
    hideSolveButton: { type: Boolean },
    hideThemeToggle: { type: Boolean }
  }, {
    availablePanels: {
      default: ["code", "processes", "result", "terminal"]
    },
    availablePanelsModifiers: {},
    shownPanels: {},
    shownPanelsModifiers: {}
  }),
  emits: /* @__PURE__ */ mergeModels(["solve"], ["update:availablePanels", "update:shownPanels"]),
  setup(e) {
    const t = useModel(e, "availablePanels"), n = useModel(e, "shownPanels"), [r, o] = cf(
      n,
      ["code", "result"]
    ), { t: a } = vt(), s = (u) => {
      o(
        r.value.includes(u) ? r.value.filter((c) => c !== u) : [...r.value, u]
      );
    }, l = computed(
      () => Object.fromEntries(
        Zs.map((u) => [u, r.value.includes(u)])
      )
    ), i = computed(() => {
      const u = l.value;
      return (u.code || u.terminal) && (u.processes || u.result);
    });
    return (u, c) => u.booting ? (openBlock(), createBlock(unref(Kn), {
      key: 0,
      label: unref(a)("krgz.sandbox.loading.booting"),
      variant: "secondary"
    }, {
      default: withCtx(() => [
        createVNode(unref(pf), { class: "size-12" })
      ]),
      _: 1
    }, 8, ["label"])) : (openBlock(), createBlock(Xv, {
      key: 1,
      "available-panels": t.value,
      "hide-full-screen-toggle": u.hideFullScreenToggle,
      "hide-solve-button": u.hideSolveButton,
      "hide-theme-toggle": u.hideThemeToggle,
      "shown-panels": unref(r),
      onSolve: c[0] || (c[0] = (d) => u.$emit("solve")),
      onToggle: c[1] || (c[1] = (d) => s(d))
    }, {
      default: withCtx(() => [
        createVNode(unref(nr), {
          "auto-save-id": "krgz-sandbox",
          direction: "vertical",
          class: "max-w"
        }, {
          default: withCtx(() => [
            l.value.code || l.value.terminal ? (openBlock(), createBlock(unref(yt), {
              key: 0,
              "default-size": 50
            }, {
              default: withCtx(() => [
                createVNode(unref(nr), {
                  "auto-save-id": "krgz-sandbox-input-row",
                  direction: "horizontal"
                }, {
                  default: withCtx(() => [
                    l.value.code ? (openBlock(), createBlock(unref(yt), {
                      key: 0,
                      "default-size": 50
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(nr), {
                          "auto-save-id": "krgz-sandbox-editor",
                          direction: "horizontal"
                        }, {
                          default: withCtx(() => [
                            u.hideExplorer ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                              createVNode(unref(yt), { "default-size": 30 }, {
                                default: withCtx(() => [
                                  renderSlot(u.$slots, "explorer", {}, () => [
                                    createVNode(unref(af), { class: "h-full overflow-auto" }, {
                                      default: withCtx(() => [
                                        createVNode(Vv)
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ]),
                                _: 3
                              }),
                              createVNode(unref(tr))
                            ], 64)),
                            createVNode(unref(yt), { "default-size": 70 }, {
                              default: withCtx(() => [
                                renderSlot(u.$slots, "editor", {}, () => [
                                  createVNode(Ev)
                                ])
                              ]),
                              _: 3
                            })
                          ]),
                          _: 3
                        })
                      ]),
                      _: 3
                    })) : createCommentVNode("", true),
                    l.value.code && l.value.terminal ? (openBlock(), createBlock(unref(tr), { key: 1 })) : createCommentVNode("", true),
                    l.value.terminal ? (openBlock(), createBlock(unref(yt), {
                      key: 2,
                      "default-size": 50
                    }, {
                      default: withCtx(() => [
                        renderSlot(u.$slots, "terminal", {}, () => [
                          createVNode(tl, { mode: "terminal" })
                        ])
                      ]),
                      _: 3
                    })) : createCommentVNode("", true)
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : createCommentVNode("", true),
            i.value ? (openBlock(), createBlock(unref(tr), { key: 1 })) : createCommentVNode("", true),
            l.value.processes || l.value.result ? (openBlock(), createBlock(unref(yt), {
              key: 2,
              "default-size": 50
            }, {
              default: withCtx(() => [
                createVNode(unref(nr), {
                  "auto-save-id": "krgz-sandbox-ouptut-row",
                  direction: "horizontal"
                }, {
                  default: withCtx(() => [
                    l.value.result ? (openBlock(), createBlock(unref(yt), {
                      key: 0,
                      "default-size": 50
                    }, {
                      default: withCtx(() => [
                        renderSlot(u.$slots, "preview", {}, () => [
                          createVNode(Ov)
                        ])
                      ]),
                      _: 3
                    })) : createCommentVNode("", true),
                    l.value.processes && l.value.result ? (openBlock(), createBlock(unref(tr), { key: 1 })) : createCommentVNode("", true),
                    l.value.processes ? (openBlock(), createBlock(unref(yt), {
                      key: 2,
                      "default-size": 50
                    }, {
                      default: withCtx(() => [
                        renderSlot(u.$slots, "processes", {}, () => [
                          createVNode(tl, { mode: "process" })
                        ])
                      ]),
                      _: 3
                    })) : createCommentVNode("", true)
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })) : createCommentVNode("", true)
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["available-panels", "hide-full-screen-toggle", "hide-solve-button", "hide-theme-toggle", "shown-panels"]));
  }
}), qv = {
  krgz: {
    dir: "rtl",
    sandbox: {
      general: {
        close: "\u0625\u063A\u0644\u0627\u0642",
        restart: "\u0625\u0639\u0627\u062F\u0629 \u062A\u0634\u063A\u064A\u0644",
        stop: "\u0625\u064A\u0642\u0627\u0641"
      },
      loading: {
        booting: "\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F Web Container...",
        editor: "\u0627\u0641\u062A\u062D \u0645\u0644\u0641\u0627\u064B \u0644\u062A\u0639\u062F\u064A\u0644\u0647",
        files: "\u062C\u0627\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0645\u0644\u0641\u0627\u062A...",
        preview: "\u062C\u0627\u0631 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0646\u062A\u064A\u062C\u0629...",
        processes: "\u0644\u0627 \u064A\u0648\u062C\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u0642\u064A\u062F \u0627\u0644\u062A\u0634\u063A\u064A\u0644",
        terminals: "\u0644\u0627 \u064A\u0648\u062C\u062F \u0633\u0637\u0648\u0631 \u0623\u0648\u0627\u0645\u0631"
      },
      panel: {
        editor: {
          readonly: "\u0645\u0644\u0641 \u0644\u0644\u0642\u0631\u0627\u0621\u0629 \u0641\u0642\u0637"
        },
        preview: {
          reload: "\u062A\u062D\u062F\u064A\u062B"
        },
        terminals: {
          new: "\u0633\u0637\u0631 \u0623\u0648\u0627\u0645\u0631 \u062C\u062F\u064A\u062F",
          open: "\u0627\u0641\u062A\u062D \u0633\u0637\u0631 \u0623\u0648\u0627\u0645\u0631"
        }
      },
      toggle: {
        code: "\u0627\u0644\u0646\u0635 \u0627\u0644\u0628\u0631\u0645\u062C\u064A",
        fullscreen: "\u0645\u0644\u066B \u0627\u0644\u0634\u0627\u0634\u0629",
        processes: "\u0627\u0644\u0639\u0645\u0644\u064A\u0627\u062A",
        result: "\u0627\u0644\u0646\u062A\u064A\u062C\u0629",
        solve: "\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u062D\u0644",
        theme: "\u062A\u0628\u062F\u064A\u0644 \u0646\u0645\u0637 \u0627\u0644\u0625\u0636\u0627\u0621\u0629",
        terminal: "\u0633\u0637\u0631 \u0627\u0644\u0623\u0648\u0627\u0645\u0631"
      }
    }
  }
}, Jv = {
  krgz: {
    dir: "ltr",
    sandbox: {
      general: {
        close: "Schlie\xDFen",
        restart: "Neustart",
        stop: "Stoppen"
      },
      loading: {
        booting: "Web Container wird gestartet...",
        editor: "Eine Datei \xF6ffnen und bearbeiten",
        files: "Dateien werden geladen...",
        preview: "Vorschau wird geladen...",
        processes: "Es gibt keine verf\xFCgbaren Prozesse",
        terminals: "Es gibt keine verf\xFCgbaren Kommandozeilen"
      },
      panel: {
        editor: {
          readonly: "Schreibgesch\xFCtzte Datei"
        },
        preview: {
          reload: "Neuladen"
        },
        terminals: {
          new: "Neue Kommandozeile",
          open: "Kommandozeile \xF6ffnen"
        }
      },
      toggle: {
        code: "Kode",
        fullscreen: "Vollbild",
        processes: "Prozesse",
        result: "Ergebnis",
        solve: "L\xF6sen",
        theme: "Design umschalten",
        terminal: "Kommandozeile"
      }
    }
  }
}, Qv = {
  krgz: {
    dir: "ltr",
    sandbox: {
      general: {
        close: "Close",
        restart: "Restart",
        stop: "Stop"
      },
      loading: {
        booting: "Booting Web Container...",
        editor: "Open a file to start editing",
        files: "Files loading...",
        preview: "Preview loading...",
        processes: "There are no running processes",
        terminals: "There are no available terminals"
      },
      panel: {
        editor: {
          readonly: "Readonly file"
        },
        preview: {
          reload: "Refresh"
        },
        terminals: {
          new: "New terminal",
          open: "Open a terminal"
        }
      },
      toggle: {
        code: "Code",
        fullscreen: "Full screen",
        processes: "Processes",
        result: "Result",
        solve: "Solve",
        theme: "Toggle theme",
        terminal: "Terminal"
      }
    }
  }
}, dg = { ar: qv, de: Jv, en: Qv };

export { Ev as KrgzEditorTabs, Cv as KrgzExplorer, Ov as KrgzPreview, tl as KrgzProcessTabs, cg as KrgzSandbox, dg as i18nMessages, Zs as panels, ig as provideWebContainer, gt as useSandbox, ug as useSandboxBoot };
//# sourceMappingURL=karagoz-sandbox-Btgvnhh6.mjs.map
