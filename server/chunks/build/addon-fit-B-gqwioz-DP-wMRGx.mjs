function f(n, s) {
  for (var i = 0; i < s.length; i++) {
    const t = s[i];
    if (typeof t != "string" && !Array.isArray(t)) {
      for (const e in t)
        if (e !== "default" && !(e in n)) {
          const r = Object.getOwnPropertyDescriptor(t, e);
          r && Object.defineProperty(n, e, r.get ? r : {
            enumerable: true,
            get: () => t[e]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var a = { exports: {} }, d;
function g() {
  return d || (d = 1, function(n, s) {
    (function(i, t) {
      n.exports = t();
    })(self, () => (() => {
      var i = {};
      return (() => {
        var t = i;
        Object.defineProperty(t, "__esModule", { value: true }), t.FitAddon = void 0, t.FitAddon = class {
          activate(e) {
            this._terminal = e;
          }
          dispose() {
          }
          fit() {
            const e = this.proposeDimensions();
            if (!e || !this._terminal || isNaN(e.cols) || isNaN(e.rows)) return;
            const r = this._terminal._core;
            this._terminal.rows === e.rows && this._terminal.cols === e.cols || (r._renderService.clear(), this._terminal.resize(e.cols, e.rows));
          }
          proposeDimensions() {
            if (!this._terminal || !this._terminal.element || !this._terminal.element.parentElement) return;
            const e = this._terminal._core, r = e._renderService.dimensions;
            if (r.css.cell.width === 0 || r.css.cell.height === 0) return;
            const p = this._terminal.options.scrollback === 0 ? 0 : e.viewport.scrollBarWidth, l = (void 0).getComputedStyle(this._terminal.element.parentElement), c = parseInt(l.getPropertyValue("height")), h = Math.max(0, parseInt(l.getPropertyValue("width"))), o = (void 0).getComputedStyle(this._terminal.element), m = c - (parseInt(o.getPropertyValue("padding-top")) + parseInt(o.getPropertyValue("padding-bottom"))), u = h - (parseInt(o.getPropertyValue("padding-right")) + parseInt(o.getPropertyValue("padding-left"))) - p;
            return { cols: Math.max(2, Math.floor(u / r.css.cell.width)), rows: Math.max(1, Math.floor(m / r.css.cell.height)) };
          }
        };
      })(), i;
    })());
  }(a)), a.exports;
}
var _ = g();
const y = /* @__PURE__ */ f({
  __proto__: null
}, [_]);

export { y as a };
//# sourceMappingURL=addon-fit-B-gqwioz-DP-wMRGx.mjs.map
