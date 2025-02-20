const requestIdleCallback = () => {
};
function Se(se, le) {
  for (var te = 0; te < le.length; te++) {
    const Y = le[te];
    if (typeof Y != "string" && !Array.isArray(Y)) {
      for (const G in Y)
        if (G !== "default" && !(G in se)) {
          const ie = Object.getOwnPropertyDescriptor(Y, G);
          ie && Object.defineProperty(se, G, ie.get ? ie : {
            enumerable: true,
            get: () => Y[G]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(se, Symbol.toStringTag, { value: "Module" }));
}
var ve = { exports: {} }, pe;
function Ce() {
  return pe || (pe = 1, function(se, le) {
    (function(te, Y) {
      se.exports = Y();
    })(globalThis, () => (() => {
      var te = { 4567: function(O, r, a) {
        var l = this && this.__decorate || function(e, t, o, u) {
          var _, p = arguments.length, c = p < 3 ? t : u === null ? u = Object.getOwnPropertyDescriptor(t, o) : u;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") c = Reflect.decorate(e, t, o, u);
          else for (var m = e.length - 1; m >= 0; m--) (_ = e[m]) && (c = (p < 3 ? _(c) : p > 3 ? _(t, o, c) : _(t, o)) || c);
          return p > 3 && c && Object.defineProperty(t, o, c), c;
        }, f = this && this.__param || function(e, t) {
          return function(o, u) {
            t(o, u, e);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.AccessibilityManager = void 0;
        const n = a(9042), d = a(9924), v = a(844), g = a(4725), h = a(2585), i = a(3656);
        let s = r.AccessibilityManager = class extends v.Disposable {
          constructor(e, t, o, u) {
            super(), this._terminal = e, this._coreBrowserService = o, this._renderService = u, this._rowColumns = /* @__PURE__ */ new WeakMap(), this._liveRegionLineCount = 0, this._charsToConsume = [], this._charsToAnnounce = "", this._accessibilityContainer = this._coreBrowserService.mainDocument.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = this._coreBrowserService.mainDocument.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
            for (let _ = 0; _ < this._terminal.rows; _++) this._rowElements[_] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[_]);
            if (this._topBoundaryFocusListener = (_) => this._handleBoundaryFocus(_, 0), this._bottomBoundaryFocusListener = (_) => this._handleBoundaryFocus(_, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions(), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = this._coreBrowserService.mainDocument.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this.register(new d.TimeBasedDebouncer(this._renderRows.bind(this))), !this._terminal.element) throw new Error("Cannot enable accessibility before Terminal.open");
            this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this.register(this._terminal.onResize((_) => this._handleResize(_.rows))), this.register(this._terminal.onRender((_) => this._refreshRows(_.start, _.end))), this.register(this._terminal.onScroll(() => this._refreshRows())), this.register(this._terminal.onA11yChar((_) => this._handleChar(_))), this.register(this._terminal.onLineFeed(() => this._handleChar(`
`))), this.register(this._terminal.onA11yTab((_) => this._handleTab(_))), this.register(this._terminal.onKey((_) => this._handleKey(_.key))), this.register(this._terminal.onBlur(() => this._clearLiveRegion())), this.register(this._renderService.onDimensionsChange(() => this._refreshRowsDimensions())), this.register((0, i.addDisposableDomListener)(void 0, "selectionchange", () => this._handleSelectionChange())), this.register(this._coreBrowserService.onDprChange(() => this._refreshRowsDimensions())), this._refreshRows(), this.register((0, v.toDisposable)(() => {
              this._accessibilityContainer.remove(), this._rowElements.length = 0;
            }));
          }
          _handleTab(e) {
            for (let t = 0; t < e; t++) this._handleChar(" ");
          }
          _handleChar(e) {
            this._liveRegionLineCount < 21 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e && (this._charsToAnnounce += e) : this._charsToAnnounce += e, e === `
` && (this._liveRegionLineCount++, this._liveRegionLineCount === 21 && (this._liveRegion.textContent += n.tooMuchOutput)));
          }
          _clearLiveRegion() {
            this._liveRegion.textContent = "", this._liveRegionLineCount = 0;
          }
          _handleKey(e) {
            this._clearLiveRegion(), new RegExp("\\p{Control}", "u").test(e) || this._charsToConsume.push(e);
          }
          _refreshRows(e, t) {
            this._liveRegionDebouncer.refresh(e, t, this._terminal.rows);
          }
          _renderRows(e, t) {
            const o = this._terminal.buffer, u = o.lines.length.toString();
            for (let _ = e; _ <= t; _++) {
              const p = o.lines.get(o.ydisp + _), c = [], m = (p == null ? void 0 : p.translateToString(true, void 0, void 0, c)) || "", y = (o.ydisp + _ + 1).toString(), k = this._rowElements[_];
              k && (m.length === 0 ? (k.innerText = "\xA0", this._rowColumns.set(k, [0, 1])) : (k.textContent = m, this._rowColumns.set(k, c)), k.setAttribute("aria-posinset", y), k.setAttribute("aria-setsize", u));
            }
            this._announceCharacters();
          }
          _announceCharacters() {
            this._charsToAnnounce.length !== 0 && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
          }
          _handleBoundaryFocus(e, t) {
            const o = e.target, u = this._rowElements[t === 0 ? 1 : this._rowElements.length - 2];
            if (o.getAttribute("aria-posinset") === (t === 0 ? "1" : `${this._terminal.buffer.lines.length}`) || e.relatedTarget !== u) return;
            let _, p;
            if (t === 0 ? (_ = o, p = this._rowElements.pop(), this._rowContainer.removeChild(p)) : (_ = this._rowElements.shift(), p = o, this._rowContainer.removeChild(_)), _.removeEventListener("focus", this._topBoundaryFocusListener), p.removeEventListener("focus", this._bottomBoundaryFocusListener), t === 0) {
              const c = this._createAccessibilityTreeNode();
              this._rowElements.unshift(c), this._rowContainer.insertAdjacentElement("afterbegin", c);
            } else {
              const c = this._createAccessibilityTreeNode();
              this._rowElements.push(c), this._rowContainer.appendChild(c);
            }
            this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(t === 0 ? -1 : 1), this._rowElements[t === 0 ? 1 : this._rowElements.length - 2].focus(), e.preventDefault(), e.stopImmediatePropagation();
          }
          _handleSelectionChange() {
            var _a;
            var m;
            if (this._rowElements.length === 0) return;
            const e = (void 0).getSelection();
            if (!e) return;
            if (e.isCollapsed) return void (this._rowContainer.contains(e.anchorNode) && this._terminal.clearSelection());
            if (!e.anchorNode || !e.focusNode) return void console.error("anchorNode and/or focusNode are null");
            let t = { node: e.anchorNode, offset: e.anchorOffset }, o = { node: e.focusNode, offset: e.focusOffset };
            if ((t.node.compareDocumentPosition(o.node) & Node.DOCUMENT_POSITION_PRECEDING || t.node === o.node && t.offset > o.offset) && ([t, o] = [o, t]), t.node.compareDocumentPosition(this._rowElements[0]) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING) && (t = { node: this._rowElements[0].childNodes[0], offset: 0 }), !this._rowContainer.contains(t.node)) return;
            const u = this._rowElements.slice(-1)[0];
            if (o.node.compareDocumentPosition(u) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_PRECEDING) && (o = { node: u, offset: (_a = (m = u.textContent) == null ? void 0 : m.length) != null ? _a : 0 }), !this._rowContainer.contains(o.node)) return;
            const _ = ({ node: y, offset: k }) => {
              const L = y instanceof Text ? y.parentNode : y;
              let w = parseInt(L == null ? void 0 : L.getAttribute("aria-posinset"), 10) - 1;
              if (isNaN(w)) return console.warn("row is invalid. Race condition?"), null;
              const x = this._rowColumns.get(L);
              if (!x) return console.warn("columns is null. Race condition?"), null;
              let B = k < x.length ? x[k] : x.slice(-1)[0] + 1;
              return B >= this._terminal.cols && (++w, B = 0), { row: w, column: B };
            }, p = _(t), c = _(o);
            if (p && c) {
              if (p.row > c.row || p.row === c.row && p.column >= c.column) throw new Error("invalid range");
              this._terminal.select(p.column, p.row, (c.row - p.row) * this._terminal.cols - p.column + c.column);
            }
          }
          _handleResize(e) {
            this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
            for (let t = this._rowContainer.children.length; t < this._terminal.rows; t++) this._rowElements[t] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[t]);
            for (; this._rowElements.length > e; ) this._rowContainer.removeChild(this._rowElements.pop());
            this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
          }
          _createAccessibilityTreeNode() {
            const e = this._coreBrowserService.mainDocument.createElement("div");
            return e.setAttribute("role", "listitem"), e.tabIndex = -1, this._refreshRowDimensions(e), e;
          }
          _refreshRowsDimensions() {
            if (this._renderService.dimensions.css.cell.height) {
              this._accessibilityContainer.style.width = `${this._renderService.dimensions.css.canvas.width}px`, this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
              for (let e = 0; e < this._terminal.rows; e++) this._refreshRowDimensions(this._rowElements[e]);
            }
          }
          _refreshRowDimensions(e) {
            e.style.height = `${this._renderService.dimensions.css.cell.height}px`;
          }
        };
        r.AccessibilityManager = s = l([f(1, h.IInstantiationService), f(2, g.ICoreBrowserService), f(3, g.IRenderService)], s);
      }, 3614: (O, r) => {
        function a(d) {
          return d.replace(/\r?\n/g, "\r");
        }
        function l(d, v) {
          return v ? "\x1B[200~" + d + "\x1B[201~" : d;
        }
        function f(d, v, g, h) {
          d = l(d = a(d), g.decPrivateModes.bracketedPasteMode && h.rawOptions.ignoreBracketedPasteMode !== true), g.triggerDataEvent(d, true), v.value = "";
        }
        function n(d, v, g) {
          const h = g.getBoundingClientRect(), i = d.clientX - h.left - 10, s = d.clientY - h.top - 10;
          v.style.width = "20px", v.style.height = "20px", v.style.left = `${i}px`, v.style.top = `${s}px`, v.style.zIndex = "1000", v.focus();
        }
        Object.defineProperty(r, "__esModule", { value: true }), r.rightClickHandler = r.moveTextAreaUnderMouseCursor = r.paste = r.handlePasteEvent = r.copyHandler = r.bracketTextForPaste = r.prepareTextForTerminal = void 0, r.prepareTextForTerminal = a, r.bracketTextForPaste = l, r.copyHandler = function(d, v) {
          d.clipboardData && d.clipboardData.setData("text/plain", v.selectionText), d.preventDefault();
        }, r.handlePasteEvent = function(d, v, g, h) {
          d.stopPropagation(), d.clipboardData && f(d.clipboardData.getData("text/plain"), v, g, h);
        }, r.paste = f, r.moveTextAreaUnderMouseCursor = n, r.rightClickHandler = function(d, v, g, h, i) {
          n(d, v, g), i && h.rightClickSelect(d), v.value = h.selectionText, v.select();
        };
      }, 7239: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.ColorContrastCache = void 0;
        const l = a(1505);
        r.ColorContrastCache = class {
          constructor() {
            this._color = new l.TwoKeyMap(), this._css = new l.TwoKeyMap();
          }
          setCss(f, n, d) {
            this._css.set(f, n, d);
          }
          getCss(f, n) {
            return this._css.get(f, n);
          }
          setColor(f, n, d) {
            this._color.set(f, n, d);
          }
          getColor(f, n) {
            return this._color.get(f, n);
          }
          clear() {
            this._color.clear(), this._css.clear();
          }
        };
      }, 3656: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.addDisposableDomListener = void 0, r.addDisposableDomListener = function(a, l, f, n) {
          a.addEventListener(l, f, n);
          let d = false;
          return { dispose: () => {
            d || (d = true, a.removeEventListener(l, f, n));
          } };
        };
      }, 3551: function(O, r, a) {
        var l = this && this.__decorate || function(s, e, t, o) {
          var u, _ = arguments.length, p = _ < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, t) : o;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") p = Reflect.decorate(s, e, t, o);
          else for (var c = s.length - 1; c >= 0; c--) (u = s[c]) && (p = (_ < 3 ? u(p) : _ > 3 ? u(e, t, p) : u(e, t)) || p);
          return _ > 3 && p && Object.defineProperty(e, t, p), p;
        }, f = this && this.__param || function(s, e) {
          return function(t, o) {
            e(t, o, s);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.Linkifier = void 0;
        const n = a(3656), d = a(8460), v = a(844), g = a(2585), h = a(4725);
        let i = r.Linkifier = class extends v.Disposable {
          get currentLink() {
            return this._currentLink;
          }
          constructor(s, e, t, o, u) {
            super(), this._element = s, this._mouseService = e, this._renderService = t, this._bufferService = o, this._linkProviderService = u, this._linkCacheDisposables = [], this._isMouseOut = true, this._wasResized = false, this._activeLine = -1, this._onShowLinkUnderline = this.register(new d.EventEmitter()), this.onShowLinkUnderline = this._onShowLinkUnderline.event, this._onHideLinkUnderline = this.register(new d.EventEmitter()), this.onHideLinkUnderline = this._onHideLinkUnderline.event, this.register((0, v.getDisposeArrayDisposable)(this._linkCacheDisposables)), this.register((0, v.toDisposable)(() => {
              var _;
              this._lastMouseEvent = void 0, (_ = this._activeProviderReplies) == null || _.clear();
            })), this.register(this._bufferService.onResize(() => {
              this._clearCurrentLink(), this._wasResized = true;
            })), this.register((0, n.addDisposableDomListener)(this._element, "mouseleave", () => {
              this._isMouseOut = true, this._clearCurrentLink();
            })), this.register((0, n.addDisposableDomListener)(this._element, "mousemove", this._handleMouseMove.bind(this))), this.register((0, n.addDisposableDomListener)(this._element, "mousedown", this._handleMouseDown.bind(this))), this.register((0, n.addDisposableDomListener)(this._element, "mouseup", this._handleMouseUp.bind(this)));
          }
          _handleMouseMove(s) {
            this._lastMouseEvent = s;
            const e = this._positionFromMouseEvent(s, this._element, this._mouseService);
            if (!e) return;
            this._isMouseOut = false;
            const t = s.composedPath();
            for (let o = 0; o < t.length; o++) {
              const u = t[o];
              if (u.classList.contains("xterm")) break;
              if (u.classList.contains("xterm-hover")) return;
            }
            this._lastBufferCell && e.x === this._lastBufferCell.x && e.y === this._lastBufferCell.y || (this._handleHover(e), this._lastBufferCell = e);
          }
          _handleHover(s) {
            if (this._activeLine !== s.y || this._wasResized) return this._clearCurrentLink(), this._askForLink(s, false), void (this._wasResized = false);
            this._currentLink && this._linkAtPosition(this._currentLink.link, s) || (this._clearCurrentLink(), this._askForLink(s, true));
          }
          _askForLink(s, e) {
            var o, u;
            this._activeProviderReplies && e || ((o = this._activeProviderReplies) == null || o.forEach((_) => {
              _ == null || _.forEach((p) => {
                p.link.dispose && p.link.dispose();
              });
            }), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = s.y);
            let t = false;
            for (const [_, p] of this._linkProviderService.linkProviders.entries()) e ? (u = this._activeProviderReplies) != null && u.get(_) && (t = this._checkLinkProviderResult(_, s, t)) : p.provideLinks(s.y, (c) => {
              var y, k;
              if (this._isMouseOut) return;
              const m = c == null ? void 0 : c.map((L) => ({ link: L }));
              (y = this._activeProviderReplies) == null || y.set(_, m), t = this._checkLinkProviderResult(_, s, t), ((k = this._activeProviderReplies) == null ? void 0 : k.size) === this._linkProviderService.linkProviders.length && this._removeIntersectingLinks(s.y, this._activeProviderReplies);
            });
          }
          _removeIntersectingLinks(s, e) {
            const t = /* @__PURE__ */ new Set();
            for (let o = 0; o < e.size; o++) {
              const u = e.get(o);
              if (u) for (let _ = 0; _ < u.length; _++) {
                const p = u[_], c = p.link.range.start.y < s ? 0 : p.link.range.start.x, m = p.link.range.end.y > s ? this._bufferService.cols : p.link.range.end.x;
                for (let y = c; y <= m; y++) {
                  if (t.has(y)) {
                    u.splice(_--, 1);
                    break;
                  }
                  t.add(y);
                }
              }
            }
          }
          _checkLinkProviderResult(s, e, t) {
            var _;
            if (!this._activeProviderReplies) return t;
            const o = this._activeProviderReplies.get(s);
            let u = false;
            for (let p = 0; p < s; p++) this._activeProviderReplies.has(p) && !this._activeProviderReplies.get(p) || (u = true);
            if (!u && o) {
              const p = o.find((c) => this._linkAtPosition(c.link, e));
              p && (t = true, this._handleNewLink(p));
            }
            if (this._activeProviderReplies.size === this._linkProviderService.linkProviders.length && !t) for (let p = 0; p < this._activeProviderReplies.size; p++) {
              const c = (_ = this._activeProviderReplies.get(p)) == null ? void 0 : _.find((m) => this._linkAtPosition(m.link, e));
              if (c) {
                t = true, this._handleNewLink(c);
                break;
              }
            }
            return t;
          }
          _handleMouseDown() {
            this._mouseDownLink = this._currentLink;
          }
          _handleMouseUp(s) {
            if (!this._currentLink) return;
            const e = this._positionFromMouseEvent(s, this._element, this._mouseService);
            e && this._mouseDownLink === this._currentLink && this._linkAtPosition(this._currentLink.link, e) && this._currentLink.link.activate(s, this._currentLink.link.text);
          }
          _clearCurrentLink(s, e) {
            this._currentLink && this._lastMouseEvent && (!s || !e || this._currentLink.link.range.start.y >= s && this._currentLink.link.range.end.y <= e) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, (0, v.disposeArray)(this._linkCacheDisposables));
          }
          _handleNewLink(s) {
            if (!this._lastMouseEvent) return;
            const e = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
            e && this._linkAtPosition(s.link, e) && (this._currentLink = s, this._currentLink.state = { decorations: { underline: s.link.decorations === void 0 || s.link.decorations.underline, pointerCursor: s.link.decorations === void 0 || s.link.decorations.pointerCursor }, isHovered: true }, this._linkHover(this._element, s.link, this._lastMouseEvent), s.link.decorations = {}, Object.defineProperties(s.link.decorations, { pointerCursor: { get: () => {
              var t, o;
              return (o = (t = this._currentLink) == null ? void 0 : t.state) == null ? void 0 : o.decorations.pointerCursor;
            }, set: (t) => {
              var o;
              (o = this._currentLink) != null && o.state && this._currentLink.state.decorations.pointerCursor !== t && (this._currentLink.state.decorations.pointerCursor = t, this._currentLink.state.isHovered && this._element.classList.toggle("xterm-cursor-pointer", t));
            } }, underline: { get: () => {
              var t, o;
              return (o = (t = this._currentLink) == null ? void 0 : t.state) == null ? void 0 : o.decorations.underline;
            }, set: (t) => {
              var o, u, _;
              (o = this._currentLink) != null && o.state && ((_ = (u = this._currentLink) == null ? void 0 : u.state) == null ? void 0 : _.decorations.underline) !== t && (this._currentLink.state.decorations.underline = t, this._currentLink.state.isHovered && this._fireUnderlineEvent(s.link, t));
            } } }), this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((t) => {
              if (!this._currentLink) return;
              const o = t.start === 0 ? 0 : t.start + 1 + this._bufferService.buffer.ydisp, u = this._bufferService.buffer.ydisp + 1 + t.end;
              if (this._currentLink.link.range.start.y >= o && this._currentLink.link.range.end.y <= u && (this._clearCurrentLink(o, u), this._lastMouseEvent)) {
                const _ = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
                _ && this._askForLink(_, false);
              }
            })));
          }
          _linkHover(s, e, t) {
            var o;
            (o = this._currentLink) != null && o.state && (this._currentLink.state.isHovered = true, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(e, true), this._currentLink.state.decorations.pointerCursor && s.classList.add("xterm-cursor-pointer")), e.hover && e.hover(t, e.text);
          }
          _fireUnderlineEvent(s, e) {
            const t = s.range, o = this._bufferService.buffer.ydisp, u = this._createLinkUnderlineEvent(t.start.x - 1, t.start.y - o - 1, t.end.x, t.end.y - o - 1, void 0);
            (e ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(u);
          }
          _linkLeave(s, e, t) {
            var o;
            (o = this._currentLink) != null && o.state && (this._currentLink.state.isHovered = false, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(e, false), this._currentLink.state.decorations.pointerCursor && s.classList.remove("xterm-cursor-pointer")), e.leave && e.leave(t, e.text);
          }
          _linkAtPosition(s, e) {
            const t = s.range.start.y * this._bufferService.cols + s.range.start.x, o = s.range.end.y * this._bufferService.cols + s.range.end.x, u = e.y * this._bufferService.cols + e.x;
            return t <= u && u <= o;
          }
          _positionFromMouseEvent(s, e, t) {
            const o = t.getCoords(s, e, this._bufferService.cols, this._bufferService.rows);
            if (o) return { x: o[0], y: o[1] + this._bufferService.buffer.ydisp };
          }
          _createLinkUnderlineEvent(s, e, t, o, u) {
            return { x1: s, y1: e, x2: t, y2: o, cols: this._bufferService.cols, fg: u };
          }
        };
        r.Linkifier = i = l([f(1, h.IMouseService), f(2, h.IRenderService), f(3, g.IBufferService), f(4, h.ILinkProviderService)], i);
      }, 9042: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.tooMuchOutput = r.promptLabel = void 0, r.promptLabel = "Terminal input", r.tooMuchOutput = "Too much output to announce, navigate to rows manually to read";
      }, 3730: function(O, r, a) {
        var l = this && this.__decorate || function(h, i, s, e) {
          var t, o = arguments.length, u = o < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") u = Reflect.decorate(h, i, s, e);
          else for (var _ = h.length - 1; _ >= 0; _--) (t = h[_]) && (u = (o < 3 ? t(u) : o > 3 ? t(i, s, u) : t(i, s)) || u);
          return o > 3 && u && Object.defineProperty(i, s, u), u;
        }, f = this && this.__param || function(h, i) {
          return function(s, e) {
            i(s, e, h);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.OscLinkProvider = void 0;
        const n = a(511), d = a(2585);
        let v = r.OscLinkProvider = class {
          constructor(h, i, s) {
            this._bufferService = h, this._optionsService = i, this._oscLinkService = s;
          }
          provideLinks(h, i) {
            var m;
            const s = this._bufferService.buffer.lines.get(h - 1);
            if (!s) return void i(void 0);
            const e = [], t = this._optionsService.rawOptions.linkHandler, o = new n.CellData(), u = s.getTrimmedLength();
            let _ = -1, p = -1, c = false;
            for (let y = 0; y < u; y++) if (p !== -1 || s.hasContent(y)) {
              if (s.loadCell(y, o), o.hasExtendedAttrs() && o.extended.urlId) {
                if (p === -1) {
                  p = y, _ = o.extended.urlId;
                  continue;
                }
                c = o.extended.urlId !== _;
              } else p !== -1 && (c = true);
              if (c || p !== -1 && y === u - 1) {
                const k = (m = this._oscLinkService.getLinkData(_)) == null ? void 0 : m.uri;
                if (k) {
                  const L = { start: { x: p + 1, y: h }, end: { x: y + (c || y !== u - 1 ? 0 : 1), y: h } };
                  let w = false;
                  if (!(t != null && t.allowNonHttpProtocols)) try {
                    const x = new URL(k);
                    ["http:", "https:"].includes(x.protocol) || (w = true);
                  } catch {
                    w = true;
                  }
                  w || e.push({ text: k, range: L, activate: (x, B) => t ? t.activate(x, B, L) : g(0, B), hover: (x, B) => {
                    var P;
                    return (P = t == null ? void 0 : t.hover) == null ? void 0 : P.call(t, x, B, L);
                  }, leave: (x, B) => {
                    var P;
                    return (P = t == null ? void 0 : t.leave) == null ? void 0 : P.call(t, x, B, L);
                  } });
                }
                c = false, o.hasExtendedAttrs() && o.extended.urlId ? (p = y, _ = o.extended.urlId) : (p = -1, _ = -1);
              }
            }
            i(e);
          }
        };
        function g(h, i) {
          if (confirm(`Do you want to navigate to ${i}?

WARNING: This link could potentially be dangerous`)) {
            const s = (void 0).open();
            if (s) {
              try {
                s.opener = null;
              } catch {
              }
              s.location.href = i;
            } else console.warn("Opening link blocked as opener could not be cleared");
          }
        }
        r.OscLinkProvider = v = l([f(0, d.IBufferService), f(1, d.IOptionsService), f(2, d.IOscLinkService)], v);
      }, 6193: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.RenderDebouncer = void 0, r.RenderDebouncer = class {
          constructor(a, l) {
            this._renderCallback = a, this._coreBrowserService = l, this._refreshCallbacks = [];
          }
          dispose() {
            this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
          }
          addRefreshCallback(a) {
            return this._refreshCallbacks.push(a), this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh())), this._animationFrame;
          }
          refresh(a, l, f) {
            this._rowCount = f, a = a !== void 0 ? a : 0, l = l !== void 0 ? l : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, a) : a, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, l) : l, this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
          }
          _innerRefresh() {
            if (this._animationFrame = void 0, this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) return void this._runRefreshCallbacks();
            const a = Math.max(this._rowStart, 0), l = Math.min(this._rowEnd, this._rowCount - 1);
            this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(a, l), this._runRefreshCallbacks();
          }
          _runRefreshCallbacks() {
            for (const a of this._refreshCallbacks) a(0);
            this._refreshCallbacks = [];
          }
        };
      }, 3236: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.Terminal = void 0;
        const l = a(3614), f = a(3656), n = a(3551), d = a(9042), v = a(3730), g = a(1680), h = a(3107), i = a(5744), s = a(2950), e = a(1296), t = a(428), o = a(4269), u = a(5114), _ = a(8934), p = a(3230), c = a(9312), m = a(4725), y = a(6731), k = a(8055), L = a(8969), w = a(8460), x = a(844), B = a(6114), P = a(8437), U = a(2584), I = a(7399), S = a(5941), b = a(9074), E = a(2585), D = a(5435), T = a(4567), H = a(779);
        class N extends L.CoreTerminal {
          get onFocus() {
            return this._onFocus.event;
          }
          get onBlur() {
            return this._onBlur.event;
          }
          get onA11yChar() {
            return this._onA11yCharEmitter.event;
          }
          get onA11yTab() {
            return this._onA11yTabEmitter.event;
          }
          get onWillOpen() {
            return this._onWillOpen.event;
          }
          constructor(R = {}) {
            super(R), this.browser = B, this._keyDownHandled = false, this._keyDownSeen = false, this._keyPressHandled = false, this._unprocessedDeadKey = false, this._accessibilityManager = this.register(new x.MutableDisposable()), this._onCursorMove = this.register(new w.EventEmitter()), this.onCursorMove = this._onCursorMove.event, this._onKey = this.register(new w.EventEmitter()), this.onKey = this._onKey.event, this._onRender = this.register(new w.EventEmitter()), this.onRender = this._onRender.event, this._onSelectionChange = this.register(new w.EventEmitter()), this.onSelectionChange = this._onSelectionChange.event, this._onTitleChange = this.register(new w.EventEmitter()), this.onTitleChange = this._onTitleChange.event, this._onBell = this.register(new w.EventEmitter()), this.onBell = this._onBell.event, this._onFocus = this.register(new w.EventEmitter()), this._onBlur = this.register(new w.EventEmitter()), this._onA11yCharEmitter = this.register(new w.EventEmitter()), this._onA11yTabEmitter = this.register(new w.EventEmitter()), this._onWillOpen = this.register(new w.EventEmitter()), this._setup(), this._decorationService = this._instantiationService.createInstance(b.DecorationService), this._instantiationService.setService(E.IDecorationService, this._decorationService), this._linkProviderService = this._instantiationService.createInstance(H.LinkProviderService), this._instantiationService.setService(m.ILinkProviderService, this._linkProviderService), this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(v.OscLinkProvider)), this.register(this._inputHandler.onRequestBell(() => this._onBell.fire())), this.register(this._inputHandler.onRequestRefreshRows((C, M) => this.refresh(C, M))), this.register(this._inputHandler.onRequestSendFocus(() => this._reportFocus())), this.register(this._inputHandler.onRequestReset(() => this.reset())), this.register(this._inputHandler.onRequestWindowsOptionsReport((C) => this._reportWindowsOptions(C))), this.register(this._inputHandler.onColor((C) => this._handleColorEvent(C))), this.register((0, w.forwardEvent)(this._inputHandler.onCursorMove, this._onCursorMove)), this.register((0, w.forwardEvent)(this._inputHandler.onTitleChange, this._onTitleChange)), this.register((0, w.forwardEvent)(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this.register((0, w.forwardEvent)(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this.register(this._bufferService.onResize((C) => this._afterResize(C.cols, C.rows))), this.register((0, x.toDisposable)(() => {
              var C, M;
              this._customKeyEventHandler = void 0, (M = (C = this.element) == null ? void 0 : C.parentNode) == null || M.removeChild(this.element);
            }));
          }
          _handleColorEvent(R) {
            if (this._themeService) for (const C of R) {
              let M, A = "";
              switch (C.index) {
                case 256:
                  M = "foreground", A = "10";
                  break;
                case 257:
                  M = "background", A = "11";
                  break;
                case 258:
                  M = "cursor", A = "12";
                  break;
                default:
                  M = "ansi", A = "4;" + C.index;
              }
              switch (C.type) {
                case 0:
                  const W = k.color.toColorRGB(M === "ansi" ? this._themeService.colors.ansi[C.index] : this._themeService.colors[M]);
                  this.coreService.triggerDataEvent(`${U.C0.ESC}]${A};${(0, S.toRgbString)(W)}${U.C1_ESCAPED.ST}`);
                  break;
                case 1:
                  if (M === "ansi") this._themeService.modifyColors((F) => F.ansi[C.index] = k.channels.toColor(...C.color));
                  else {
                    const F = M;
                    this._themeService.modifyColors((z) => z[F] = k.channels.toColor(...C.color));
                  }
                  break;
                case 2:
                  this._themeService.restoreColor(C.index);
              }
            }
          }
          _setup() {
            super._setup(), this._customKeyEventHandler = void 0;
          }
          get buffer() {
            return this.buffers.active;
          }
          focus() {
            this.textarea && this.textarea.focus({ preventScroll: true });
          }
          _handleScreenReaderModeOptionChange(R) {
            R ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(T.AccessibilityManager, this)) : this._accessibilityManager.clear();
          }
          _handleTextAreaFocus(R) {
            this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(U.C0.ESC + "[I"), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
          }
          blur() {
            var R;
            return (R = this.textarea) == null ? void 0 : R.blur();
          }
          _handleTextAreaBlur() {
            this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(U.C0.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
          }
          _syncTextArea() {
            if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) return;
            const R = this.buffer.ybase + this.buffer.y, C = this.buffer.lines.get(R);
            if (!C) return;
            const M = Math.min(this.buffer.x, this.cols - 1), A = this._renderService.dimensions.css.cell.height, W = C.getWidth(M), F = this._renderService.dimensions.css.cell.width * W, z = this.buffer.y * this._renderService.dimensions.css.cell.height, q = M * this._renderService.dimensions.css.cell.width;
            this.textarea.style.left = q + "px", this.textarea.style.top = z + "px", this.textarea.style.width = F + "px", this.textarea.style.height = A + "px", this.textarea.style.lineHeight = A + "px", this.textarea.style.zIndex = "-5";
          }
          _initGlobal() {
            this._bindKeys(), this.register((0, f.addDisposableDomListener)(this.element, "copy", (C) => {
              this.hasSelection() && (0, l.copyHandler)(C, this._selectionService);
            }));
            const R = (C) => (0, l.handlePasteEvent)(C, this.textarea, this.coreService, this.optionsService);
            this.register((0, f.addDisposableDomListener)(this.textarea, "paste", R)), this.register((0, f.addDisposableDomListener)(this.element, "paste", R)), B.isFirefox ? this.register((0, f.addDisposableDomListener)(this.element, "mousedown", (C) => {
              C.button === 2 && (0, l.rightClickHandler)(C, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
            })) : this.register((0, f.addDisposableDomListener)(this.element, "contextmenu", (C) => {
              (0, l.rightClickHandler)(C, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
            })), B.isLinux && this.register((0, f.addDisposableDomListener)(this.element, "auxclick", (C) => {
              C.button === 1 && (0, l.moveTextAreaUnderMouseCursor)(C, this.textarea, this.screenElement);
            }));
          }
          _bindKeys() {
            this.register((0, f.addDisposableDomListener)(this.textarea, "keyup", (R) => this._keyUp(R), true)), this.register((0, f.addDisposableDomListener)(this.textarea, "keydown", (R) => this._keyDown(R), true)), this.register((0, f.addDisposableDomListener)(this.textarea, "keypress", (R) => this._keyPress(R), true)), this.register((0, f.addDisposableDomListener)(this.textarea, "compositionstart", () => this._compositionHelper.compositionstart())), this.register((0, f.addDisposableDomListener)(this.textarea, "compositionupdate", (R) => this._compositionHelper.compositionupdate(R))), this.register((0, f.addDisposableDomListener)(this.textarea, "compositionend", () => this._compositionHelper.compositionend())), this.register((0, f.addDisposableDomListener)(this.textarea, "input", (R) => this._inputEvent(R), true)), this.register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
          }
          open(R) {
            var _a, _b;
            var M;
            if (!R) throw new Error("Terminal requires a parent element.");
            if (R.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), ((M = this.element) == null ? void 0 : M.ownerDocument.defaultView) && this._coreBrowserService) return void (this.element.ownerDocument.defaultView !== this._coreBrowserService.window && (this._coreBrowserService.window = this.element.ownerDocument.defaultView));
            this._document = R.ownerDocument, this.options.documentOverride && this.options.documentOverride instanceof Document && (this._document = this.optionsService.rawOptions.documentOverride), this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), R.appendChild(this.element);
            const C = this._document.createDocumentFragment();
            this._viewportElement = this._document.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), C.appendChild(this._viewportElement), this._viewportScrollArea = this._document.createElement("div"), this._viewportScrollArea.classList.add("xterm-scroll-area"), this._viewportElement.appendChild(this._viewportScrollArea), this.screenElement = this._document.createElement("div"), this.screenElement.classList.add("xterm-screen"), this.register((0, f.addDisposableDomListener)(this.screenElement, "mousemove", (A) => this.updateCursorStyle(A))), this._helperContainer = this._document.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), C.appendChild(this.screenElement), this.textarea = this._document.createElement("textarea"), this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", d.promptLabel), B.isChromeOS || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._coreBrowserService = this.register(this._instantiationService.createInstance(u.CoreBrowserService, this.textarea, (_a = R.ownerDocument.defaultView) != null ? _a : void 0, ((_b = this._document) != null ? _b : "undefined" < "u") ? (void 0).document : null)), this._instantiationService.setService(m.ICoreBrowserService, this._coreBrowserService), this.register((0, f.addDisposableDomListener)(this.textarea, "focus", (A) => this._handleTextAreaFocus(A))), this.register((0, f.addDisposableDomListener)(this.textarea, "blur", () => this._handleTextAreaBlur())), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(t.CharSizeService, this._document, this._helperContainer), this._instantiationService.setService(m.ICharSizeService, this._charSizeService), this._themeService = this._instantiationService.createInstance(y.ThemeService), this._instantiationService.setService(m.IThemeService, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(o.CharacterJoinerService), this._instantiationService.setService(m.ICharacterJoinerService, this._characterJoinerService), this._renderService = this.register(this._instantiationService.createInstance(p.RenderService, this.rows, this.screenElement)), this._instantiationService.setService(m.IRenderService, this._renderService), this.register(this._renderService.onRenderedViewportChange((A) => this._onRender.fire(A))), this.onResize((A) => this._renderService.resize(A.cols, A.rows)), this._compositionView = this._document.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance(s.CompositionHelper, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this._mouseService = this._instantiationService.createInstance(_.MouseService), this._instantiationService.setService(m.IMouseService, this._mouseService), this.linkifier = this.register(this._instantiationService.createInstance(n.Linkifier, this.screenElement)), this.element.appendChild(C);
            try {
              this._onWillOpen.fire(this.element);
            } catch {
            }
            this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this.viewport = this._instantiationService.createInstance(g.Viewport, this._viewportElement, this._viewportScrollArea), this.viewport.onRequestScrollLines((A) => this.scrollLines(A.amount, A.suppressScrollEvent, 1)), this.register(this._inputHandler.onRequestSyncScrollBar(() => this.viewport.syncScrollArea())), this.register(this.viewport), this.register(this.onCursorMove(() => {
              this._renderService.handleCursorMove(), this._syncTextArea();
            })), this.register(this.onResize(() => this._renderService.handleResize(this.cols, this.rows))), this.register(this.onBlur(() => this._renderService.handleBlur())), this.register(this.onFocus(() => this._renderService.handleFocus())), this.register(this._renderService.onDimensionsChange(() => this.viewport.syncScrollArea())), this._selectionService = this.register(this._instantiationService.createInstance(c.SelectionService, this.element, this.screenElement, this.linkifier)), this._instantiationService.setService(m.ISelectionService, this._selectionService), this.register(this._selectionService.onRequestScrollLines((A) => this.scrollLines(A.amount, A.suppressScrollEvent))), this.register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire())), this.register(this._selectionService.onRequestRedraw((A) => this._renderService.handleSelectionChanged(A.start, A.end, A.columnSelectMode))), this.register(this._selectionService.onLinuxMouseSelection((A) => {
              this.textarea.value = A, this.textarea.focus(), this.textarea.select();
            })), this.register(this._onScroll.event((A) => {
              this.viewport.syncScrollArea(), this._selectionService.refresh();
            })), this.register((0, f.addDisposableDomListener)(this._viewportElement, "scroll", () => this._selectionService.refresh())), this.register(this._instantiationService.createInstance(h.BufferDecorationRenderer, this.screenElement)), this.register((0, f.addDisposableDomListener)(this.element, "mousedown", (A) => this._selectionService.handleMouseDown(A))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(T.AccessibilityManager, this)), this.register(this.optionsService.onSpecificOptionChange("screenReaderMode", (A) => this._handleScreenReaderModeOptionChange(A))), this.options.overviewRulerWidth && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(i.OverviewRulerRenderer, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRulerWidth", (A) => {
              !this._overviewRulerRenderer && A && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(i.OverviewRulerRenderer, this._viewportElement, this.screenElement)));
            }), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
          }
          _createRenderer() {
            return this._instantiationService.createInstance(e.DomRenderer, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
          }
          bindMouse() {
            const R = this, C = this.element;
            function M(F) {
              const z = R._mouseService.getMouseReportCoords(F, R.screenElement);
              if (!z) return false;
              let q, V;
              switch (F.overrideType || F.type) {
                case "mousemove":
                  V = 32, F.buttons === void 0 ? (q = 3, F.button !== void 0 && (q = F.button < 3 ? F.button : 3)) : q = 1 & F.buttons ? 0 : 4 & F.buttons ? 1 : 2 & F.buttons ? 2 : 3;
                  break;
                case "mouseup":
                  V = 0, q = F.button < 3 ? F.button : 3;
                  break;
                case "mousedown":
                  V = 1, q = F.button < 3 ? F.button : 3;
                  break;
                case "wheel":
                  if (R._customWheelEventHandler && R._customWheelEventHandler(F) === false || R.viewport.getLinesScrolled(F) === 0) return false;
                  V = F.deltaY < 0 ? 0 : 1, q = 4;
                  break;
                default:
                  return false;
              }
              return !(V === void 0 || q === void 0 || q > 4) && R.coreMouseService.triggerMouseEvent({ col: z.col, row: z.row, x: z.x, y: z.y, button: q, action: V, ctrl: F.ctrlKey, alt: F.altKey, shift: F.shiftKey });
            }
            const A = { mouseup: null, wheel: null, mousedrag: null, mousemove: null }, W = { mouseup: (F) => (M(F), F.buttons || (this._document.removeEventListener("mouseup", A.mouseup), A.mousedrag && this._document.removeEventListener("mousemove", A.mousedrag)), this.cancel(F)), wheel: (F) => (M(F), this.cancel(F, true)), mousedrag: (F) => {
              F.buttons && M(F);
            }, mousemove: (F) => {
              F.buttons || M(F);
            } };
            this.register(this.coreMouseService.onProtocolChange((F) => {
              F ? (this.optionsService.rawOptions.logLevel === "debug" && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(F)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), 8 & F ? A.mousemove || (C.addEventListener("mousemove", W.mousemove), A.mousemove = W.mousemove) : (C.removeEventListener("mousemove", A.mousemove), A.mousemove = null), 16 & F ? A.wheel || (C.addEventListener("wheel", W.wheel, { passive: false }), A.wheel = W.wheel) : (C.removeEventListener("wheel", A.wheel), A.wheel = null), 2 & F ? A.mouseup || (A.mouseup = W.mouseup) : (this._document.removeEventListener("mouseup", A.mouseup), A.mouseup = null), 4 & F ? A.mousedrag || (A.mousedrag = W.mousedrag) : (this._document.removeEventListener("mousemove", A.mousedrag), A.mousedrag = null);
            })), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this.register((0, f.addDisposableDomListener)(C, "mousedown", (F) => {
              if (F.preventDefault(), this.focus(), this.coreMouseService.areMouseEventsActive && !this._selectionService.shouldForceSelection(F)) return M(F), A.mouseup && this._document.addEventListener("mouseup", A.mouseup), A.mousedrag && this._document.addEventListener("mousemove", A.mousedrag), this.cancel(F);
            })), this.register((0, f.addDisposableDomListener)(C, "wheel", (F) => {
              if (!A.wheel) {
                if (this._customWheelEventHandler && this._customWheelEventHandler(F) === false) return false;
                if (!this.buffer.hasScrollback) {
                  const z = this.viewport.getLinesScrolled(F);
                  if (z === 0) return;
                  const q = U.C0.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (F.deltaY < 0 ? "A" : "B");
                  let V = "";
                  for (let X = 0; X < Math.abs(z); X++) V += q;
                  return this.coreService.triggerDataEvent(V, true), this.cancel(F, true);
                }
                return this.viewport.handleWheel(F) ? this.cancel(F) : void 0;
              }
            }, { passive: false })), this.register((0, f.addDisposableDomListener)(C, "touchstart", (F) => {
              if (!this.coreMouseService.areMouseEventsActive) return this.viewport.handleTouchStart(F), this.cancel(F);
            }, { passive: true })), this.register((0, f.addDisposableDomListener)(C, "touchmove", (F) => {
              if (!this.coreMouseService.areMouseEventsActive) return this.viewport.handleTouchMove(F) ? void 0 : this.cancel(F);
            }, { passive: false }));
          }
          refresh(R, C) {
            var M;
            (M = this._renderService) == null || M.refreshRows(R, C);
          }
          updateCursorStyle(R) {
            var C;
            (C = this._selectionService) != null && C.shouldColumnSelect(R) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
          }
          _showCursor() {
            this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = true, this.refresh(this.buffer.y, this.buffer.y));
          }
          scrollLines(R, C, M = 0) {
            var A;
            M === 1 ? (super.scrollLines(R, C, M), this.refresh(0, this.rows - 1)) : (A = this.viewport) == null || A.scrollLines(R);
          }
          paste(R) {
            (0, l.paste)(R, this.textarea, this.coreService, this.optionsService);
          }
          attachCustomKeyEventHandler(R) {
            this._customKeyEventHandler = R;
          }
          attachCustomWheelEventHandler(R) {
            this._customWheelEventHandler = R;
          }
          registerLinkProvider(R) {
            return this._linkProviderService.registerLinkProvider(R);
          }
          registerCharacterJoiner(R) {
            if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
            const C = this._characterJoinerService.register(R);
            return this.refresh(0, this.rows - 1), C;
          }
          deregisterCharacterJoiner(R) {
            if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
            this._characterJoinerService.deregister(R) && this.refresh(0, this.rows - 1);
          }
          get markers() {
            return this.buffer.markers;
          }
          registerMarker(R) {
            return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + R);
          }
          registerDecoration(R) {
            return this._decorationService.registerDecoration(R);
          }
          hasSelection() {
            return !!this._selectionService && this._selectionService.hasSelection;
          }
          select(R, C, M) {
            this._selectionService.setSelection(R, C, M);
          }
          getSelection() {
            return this._selectionService ? this._selectionService.selectionText : "";
          }
          getSelectionPosition() {
            if (this._selectionService && this._selectionService.hasSelection) return { start: { x: this._selectionService.selectionStart[0], y: this._selectionService.selectionStart[1] }, end: { x: this._selectionService.selectionEnd[0], y: this._selectionService.selectionEnd[1] } };
          }
          clearSelection() {
            var R;
            (R = this._selectionService) == null || R.clearSelection();
          }
          selectAll() {
            var R;
            (R = this._selectionService) == null || R.selectAll();
          }
          selectLines(R, C) {
            var M;
            (M = this._selectionService) == null || M.selectLines(R, C);
          }
          _keyDown(R) {
            if (this._keyDownHandled = false, this._keyDownSeen = true, this._customKeyEventHandler && this._customKeyEventHandler(R) === false) return false;
            const C = this.browser.isMac && this.options.macOptionIsMeta && R.altKey;
            if (!C && !this._compositionHelper.keydown(R)) return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(), false;
            C || R.key !== "Dead" && R.key !== "AltGraph" || (this._unprocessedDeadKey = true);
            const M = (0, I.evaluateKeyboardEvent)(R, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
            if (this.updateCursorStyle(R), M.type === 3 || M.type === 2) {
              const A = this.rows - 1;
              return this.scrollLines(M.type === 2 ? -A : A), this.cancel(R, true);
            }
            return M.type === 1 && this.selectAll(), !!this._isThirdLevelShift(this.browser, R) || (M.cancel && this.cancel(R, true), !M.key || !!(R.key && !R.ctrlKey && !R.altKey && !R.metaKey && R.key.length === 1 && R.key.charCodeAt(0) >= 65 && R.key.charCodeAt(0) <= 90) || (this._unprocessedDeadKey ? (this._unprocessedDeadKey = false, true) : (M.key !== U.C0.ETX && M.key !== U.C0.CR || (this.textarea.value = ""), this._onKey.fire({ key: M.key, domEvent: R }), this._showCursor(), this.coreService.triggerDataEvent(M.key, true), !this.optionsService.rawOptions.screenReaderMode || R.altKey || R.ctrlKey ? this.cancel(R, true) : void (this._keyDownHandled = true))));
          }
          _isThirdLevelShift(R, C) {
            const M = R.isMac && !this.options.macOptionIsMeta && C.altKey && !C.ctrlKey && !C.metaKey || R.isWindows && C.altKey && C.ctrlKey && !C.metaKey || R.isWindows && C.getModifierState("AltGraph");
            return C.type === "keypress" ? M : M && (!C.keyCode || C.keyCode > 47);
          }
          _keyUp(R) {
            this._keyDownSeen = false, this._customKeyEventHandler && this._customKeyEventHandler(R) === false || (function(C) {
              return C.keyCode === 16 || C.keyCode === 17 || C.keyCode === 18;
            }(R) || this.focus(), this.updateCursorStyle(R), this._keyPressHandled = false);
          }
          _keyPress(R) {
            let C;
            if (this._keyPressHandled = false, this._keyDownHandled || this._customKeyEventHandler && this._customKeyEventHandler(R) === false) return false;
            if (this.cancel(R), R.charCode) C = R.charCode;
            else if (R.which === null || R.which === void 0) C = R.keyCode;
            else {
              if (R.which === 0 || R.charCode === 0) return false;
              C = R.which;
            }
            return !(!C || (R.altKey || R.ctrlKey || R.metaKey) && !this._isThirdLevelShift(this.browser, R) || (C = String.fromCharCode(C), this._onKey.fire({ key: C, domEvent: R }), this._showCursor(), this.coreService.triggerDataEvent(C, true), this._keyPressHandled = true, this._unprocessedDeadKey = false, 0));
          }
          _inputEvent(R) {
            if (R.data && R.inputType === "insertText" && (!R.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
              if (this._keyPressHandled) return false;
              this._unprocessedDeadKey = false;
              const C = R.data;
              return this.coreService.triggerDataEvent(C, true), this.cancel(R), true;
            }
            return false;
          }
          resize(R, C) {
            R !== this.cols || C !== this.rows ? super.resize(R, C) : this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
          }
          _afterResize(R, C) {
            var M, A;
            (M = this._charSizeService) == null || M.measure(), (A = this.viewport) == null || A.syncScrollArea(true);
          }
          clear() {
            var R;
            if (this.buffer.ybase !== 0 || this.buffer.y !== 0) {
              this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
              for (let C = 1; C < this.rows; C++) this.buffer.lines.push(this.buffer.getBlankLine(P.DEFAULT_ATTR_DATA));
              this._onScroll.fire({ position: this.buffer.ydisp, source: 0 }), (R = this.viewport) == null || R.reset(), this.refresh(0, this.rows - 1);
            }
          }
          reset() {
            var C, M;
            this.options.rows = this.rows, this.options.cols = this.cols;
            const R = this._customKeyEventHandler;
            this._setup(), super.reset(), (C = this._selectionService) == null || C.reset(), this._decorationService.reset(), (M = this.viewport) == null || M.reset(), this._customKeyEventHandler = R, this.refresh(0, this.rows - 1);
          }
          clearTextureAtlas() {
            var R;
            (R = this._renderService) == null || R.clearTextureAtlas();
          }
          _reportFocus() {
            var R;
            (R = this.element) != null && R.classList.contains("focus") ? this.coreService.triggerDataEvent(U.C0.ESC + "[I") : this.coreService.triggerDataEvent(U.C0.ESC + "[O");
          }
          _reportWindowsOptions(R) {
            if (this._renderService) switch (R) {
              case D.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:
                const C = this._renderService.dimensions.css.canvas.width.toFixed(0), M = this._renderService.dimensions.css.canvas.height.toFixed(0);
                this.coreService.triggerDataEvent(`${U.C0.ESC}[4;${M};${C}t`);
                break;
              case D.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:
                const A = this._renderService.dimensions.css.cell.width.toFixed(0), W = this._renderService.dimensions.css.cell.height.toFixed(0);
                this.coreService.triggerDataEvent(`${U.C0.ESC}[6;${W};${A}t`);
            }
          }
          cancel(R, C) {
            if (this.options.cancelEvents || C) return R.preventDefault(), R.stopPropagation(), false;
          }
        }
        r.Terminal = N;
      }, 9924: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.TimeBasedDebouncer = void 0, r.TimeBasedDebouncer = class {
          constructor(a, l = 1e3) {
            this._renderCallback = a, this._debounceThresholdMS = l, this._lastRefreshMs = 0, this._additionalRefreshRequested = false;
          }
          dispose() {
            this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
          }
          refresh(a, l, f) {
            this._rowCount = f, a = a !== void 0 ? a : 0, l = l !== void 0 ? l : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, a) : a, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, l) : l;
            const n = Date.now();
            if (n - this._lastRefreshMs >= this._debounceThresholdMS) this._lastRefreshMs = n, this._innerRefresh();
            else if (!this._additionalRefreshRequested) {
              const d = n - this._lastRefreshMs, v = this._debounceThresholdMS - d;
              this._additionalRefreshRequested = true, this._refreshTimeoutID = (void 0).setTimeout(() => {
                this._lastRefreshMs = Date.now(), this._innerRefresh(), this._additionalRefreshRequested = false, this._refreshTimeoutID = void 0;
              }, v);
            }
          }
          _innerRefresh() {
            if (this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) return;
            const a = Math.max(this._rowStart, 0), l = Math.min(this._rowEnd, this._rowCount - 1);
            this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(a, l);
          }
        };
      }, 1680: function(O, r, a) {
        var l = this && this.__decorate || function(s, e, t, o) {
          var u, _ = arguments.length, p = _ < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, t) : o;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") p = Reflect.decorate(s, e, t, o);
          else for (var c = s.length - 1; c >= 0; c--) (u = s[c]) && (p = (_ < 3 ? u(p) : _ > 3 ? u(e, t, p) : u(e, t)) || p);
          return _ > 3 && p && Object.defineProperty(e, t, p), p;
        }, f = this && this.__param || function(s, e) {
          return function(t, o) {
            e(t, o, s);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.Viewport = void 0;
        const n = a(3656), d = a(4725), v = a(8460), g = a(844), h = a(2585);
        let i = r.Viewport = class extends g.Disposable {
          constructor(s, e, t, o, u, _, p, c) {
            super(), this._viewportElement = s, this._scrollArea = e, this._bufferService = t, this._optionsService = o, this._charSizeService = u, this._renderService = _, this._coreBrowserService = p, this.scrollBarWidth = 0, this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._wheelPartialScroll = 0, this._refreshAnimationFrame = null, this._ignoreNextScrollEvent = false, this._smoothScrollState = { startTime: 0, origin: -1, target: -1 }, this._onRequestScrollLines = this.register(new v.EventEmitter()), this.onRequestScrollLines = this._onRequestScrollLines.event, this.scrollBarWidth = this._viewportElement.offsetWidth - this._scrollArea.offsetWidth || 15, this.register((0, n.addDisposableDomListener)(this._viewportElement, "scroll", this._handleScroll.bind(this))), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate((m) => this._activeBuffer = m.activeBuffer)), this._renderDimensions = this._renderService.dimensions, this.register(this._renderService.onDimensionsChange((m) => this._renderDimensions = m)), this._handleThemeChange(c.colors), this.register(c.onChangeColors((m) => this._handleThemeChange(m))), this.register(this._optionsService.onSpecificOptionChange("scrollback", () => this.syncScrollArea())), setTimeout(() => this.syncScrollArea());
          }
          _handleThemeChange(s) {
            this._viewportElement.style.backgroundColor = s.background.css;
          }
          reset() {
            this._currentRowHeight = 0, this._currentDeviceCellHeight = 0, this._lastRecordedBufferLength = 0, this._lastRecordedViewportHeight = 0, this._lastRecordedBufferHeight = 0, this._lastTouchY = 0, this._lastScrollTop = 0, this._coreBrowserService.window.requestAnimationFrame(() => this.syncScrollArea());
          }
          _refresh(s) {
            if (s) return this._innerRefresh(), void (this._refreshAnimationFrame !== null && this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame));
            this._refreshAnimationFrame === null && (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
          }
          _innerRefresh() {
            if (this._charSizeService.height > 0) {
              this._currentRowHeight = this._renderDimensions.device.cell.height / this._coreBrowserService.dpr, this._currentDeviceCellHeight = this._renderDimensions.device.cell.height, this._lastRecordedViewportHeight = this._viewportElement.offsetHeight;
              const e = Math.round(this._currentRowHeight * this._lastRecordedBufferLength) + (this._lastRecordedViewportHeight - this._renderDimensions.css.canvas.height);
              this._lastRecordedBufferHeight !== e && (this._lastRecordedBufferHeight = e, this._scrollArea.style.height = this._lastRecordedBufferHeight + "px");
            }
            const s = this._bufferService.buffer.ydisp * this._currentRowHeight;
            this._viewportElement.scrollTop !== s && (this._ignoreNextScrollEvent = true, this._viewportElement.scrollTop = s), this._refreshAnimationFrame = null;
          }
          syncScrollArea(s = false) {
            if (this._lastRecordedBufferLength !== this._bufferService.buffer.lines.length) return this._lastRecordedBufferLength = this._bufferService.buffer.lines.length, void this._refresh(s);
            this._lastRecordedViewportHeight === this._renderService.dimensions.css.canvas.height && this._lastScrollTop === this._activeBuffer.ydisp * this._currentRowHeight && this._renderDimensions.device.cell.height === this._currentDeviceCellHeight || this._refresh(s);
          }
          _handleScroll(s) {
            if (this._lastScrollTop = this._viewportElement.scrollTop, !this._viewportElement.offsetParent) return;
            if (this._ignoreNextScrollEvent) return this._ignoreNextScrollEvent = false, void this._onRequestScrollLines.fire({ amount: 0, suppressScrollEvent: true });
            const e = Math.round(this._lastScrollTop / this._currentRowHeight) - this._bufferService.buffer.ydisp;
            this._onRequestScrollLines.fire({ amount: e, suppressScrollEvent: true });
          }
          _smoothScroll() {
            if (this._isDisposed || this._smoothScrollState.origin === -1 || this._smoothScrollState.target === -1) return;
            const s = this._smoothScrollPercent();
            this._viewportElement.scrollTop = this._smoothScrollState.origin + Math.round(s * (this._smoothScrollState.target - this._smoothScrollState.origin)), s < 1 ? this._coreBrowserService.window.requestAnimationFrame(() => this._smoothScroll()) : this._clearSmoothScrollState();
          }
          _smoothScrollPercent() {
            return this._optionsService.rawOptions.smoothScrollDuration && this._smoothScrollState.startTime ? Math.max(Math.min((Date.now() - this._smoothScrollState.startTime) / this._optionsService.rawOptions.smoothScrollDuration, 1), 0) : 1;
          }
          _clearSmoothScrollState() {
            this._smoothScrollState.startTime = 0, this._smoothScrollState.origin = -1, this._smoothScrollState.target = -1;
          }
          _bubbleScroll(s, e) {
            const t = this._viewportElement.scrollTop + this._lastRecordedViewportHeight;
            return !(e < 0 && this._viewportElement.scrollTop !== 0 || e > 0 && t < this._lastRecordedBufferHeight) || (s.cancelable && s.preventDefault(), false);
          }
          handleWheel(s) {
            const e = this._getPixelsScrolled(s);
            return e !== 0 && (this._optionsService.rawOptions.smoothScrollDuration ? (this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, this._smoothScrollState.target === -1 ? this._smoothScrollState.target = this._viewportElement.scrollTop + e : this._smoothScrollState.target += e, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState()) : this._viewportElement.scrollTop += e, this._bubbleScroll(s, e));
          }
          scrollLines(s) {
            if (s !== 0) if (this._optionsService.rawOptions.smoothScrollDuration) {
              const e = s * this._currentRowHeight;
              this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, this._smoothScrollState.target = this._smoothScrollState.origin + e, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState();
            } else this._onRequestScrollLines.fire({ amount: s, suppressScrollEvent: false });
          }
          _getPixelsScrolled(s) {
            if (s.deltaY === 0 || s.shiftKey) return 0;
            let e = this._applyScrollModifier(s.deltaY, s);
            return s.deltaMode === WheelEvent.DOM_DELTA_LINE ? e *= this._currentRowHeight : s.deltaMode === WheelEvent.DOM_DELTA_PAGE && (e *= this._currentRowHeight * this._bufferService.rows), e;
          }
          getBufferElements(s, e) {
            var c;
            let t, o = "";
            const u = [], _ = e != null ? e : this._bufferService.buffer.lines.length, p = this._bufferService.buffer.lines;
            for (let m = s; m < _; m++) {
              const y = p.get(m);
              if (!y) continue;
              const k = (c = p.get(m + 1)) == null ? void 0 : c.isWrapped;
              if (o += y.translateToString(!k), !k || m === p.length - 1) {
                const L = (void 0).createElement("div");
                L.textContent = o, u.push(L), o.length > 0 && (t = L), o = "";
              }
            }
            return { bufferElements: u, cursorElement: t };
          }
          getLinesScrolled(s) {
            if (s.deltaY === 0 || s.shiftKey) return 0;
            let e = this._applyScrollModifier(s.deltaY, s);
            return s.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (e /= this._currentRowHeight + 0, this._wheelPartialScroll += e, e = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : s.deltaMode === WheelEvent.DOM_DELTA_PAGE && (e *= this._bufferService.rows), e;
          }
          _applyScrollModifier(s, e) {
            const t = this._optionsService.rawOptions.fastScrollModifier;
            return t === "alt" && e.altKey || t === "ctrl" && e.ctrlKey || t === "shift" && e.shiftKey ? s * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : s * this._optionsService.rawOptions.scrollSensitivity;
          }
          handleTouchStart(s) {
            this._lastTouchY = s.touches[0].pageY;
          }
          handleTouchMove(s) {
            const e = this._lastTouchY - s.touches[0].pageY;
            return this._lastTouchY = s.touches[0].pageY, e !== 0 && (this._viewportElement.scrollTop += e, this._bubbleScroll(s, e));
          }
        };
        r.Viewport = i = l([f(2, h.IBufferService), f(3, h.IOptionsService), f(4, d.ICharSizeService), f(5, d.IRenderService), f(6, d.ICoreBrowserService), f(7, d.IThemeService)], i);
      }, 3107: function(O, r, a) {
        var l = this && this.__decorate || function(h, i, s, e) {
          var t, o = arguments.length, u = o < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") u = Reflect.decorate(h, i, s, e);
          else for (var _ = h.length - 1; _ >= 0; _--) (t = h[_]) && (u = (o < 3 ? t(u) : o > 3 ? t(i, s, u) : t(i, s)) || u);
          return o > 3 && u && Object.defineProperty(i, s, u), u;
        }, f = this && this.__param || function(h, i) {
          return function(s, e) {
            i(s, e, h);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.BufferDecorationRenderer = void 0;
        const n = a(4725), d = a(844), v = a(2585);
        let g = r.BufferDecorationRenderer = class extends d.Disposable {
          constructor(h, i, s, e, t) {
            super(), this._screenElement = h, this._bufferService = i, this._coreBrowserService = s, this._decorationService = e, this._renderService = t, this._decorationElements = /* @__PURE__ */ new Map(), this._altBufferIsActive = false, this._dimensionsChanged = false, this._container = (void 0).createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this.register(this._renderService.onRenderedViewportChange(() => this._doRefreshDecorations())), this.register(this._renderService.onDimensionsChange(() => {
              this._dimensionsChanged = true, this._queueRefresh();
            })), this.register(this._coreBrowserService.onDprChange(() => this._queueRefresh())), this.register(this._bufferService.buffers.onBufferActivate(() => {
              this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
            })), this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh())), this.register(this._decorationService.onDecorationRemoved((o) => this._removeDecoration(o))), this.register((0, d.toDisposable)(() => {
              this._container.remove(), this._decorationElements.clear();
            }));
          }
          _queueRefresh() {
            this._animationFrame === void 0 && (this._animationFrame = this._renderService.addRefreshCallback(() => {
              this._doRefreshDecorations(), this._animationFrame = void 0;
            }));
          }
          _doRefreshDecorations() {
            for (const h of this._decorationService.decorations) this._renderDecoration(h);
            this._dimensionsChanged = false;
          }
          _renderDecoration(h) {
            this._refreshStyle(h), this._dimensionsChanged && this._refreshXPosition(h);
          }
          _createElement(h) {
            var _a;
            var e;
            const i = this._coreBrowserService.mainDocument.createElement("div");
            i.classList.add("xterm-decoration"), i.classList.toggle("xterm-decoration-top-layer", ((e = h == null ? void 0 : h.options) == null ? void 0 : e.layer) === "top"), i.style.width = `${Math.round((h.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, i.style.height = (h.options.height || 1) * this._renderService.dimensions.css.cell.height + "px", i.style.top = (h.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height + "px", i.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
            const s = (_a = h.options.x) != null ? _a : 0;
            return s && s > this._bufferService.cols && (i.style.display = "none"), this._refreshXPosition(h, i), i;
          }
          _refreshStyle(h) {
            const i = h.marker.line - this._bufferService.buffers.active.ydisp;
            if (i < 0 || i >= this._bufferService.rows) h.element && (h.element.style.display = "none", h.onRenderEmitter.fire(h.element));
            else {
              let s = this._decorationElements.get(h);
              s || (s = this._createElement(h), h.element = s, this._decorationElements.set(h, s), this._container.appendChild(s), h.onDispose(() => {
                this._decorationElements.delete(h), s.remove();
              })), s.style.top = i * this._renderService.dimensions.css.cell.height + "px", s.style.display = this._altBufferIsActive ? "none" : "block", h.onRenderEmitter.fire(s);
            }
          }
          _refreshXPosition(h, i = h.element) {
            var _a;
            if (!i) return;
            const s = (_a = h.options.x) != null ? _a : 0;
            (h.options.anchor || "left") === "right" ? i.style.right = s ? s * this._renderService.dimensions.css.cell.width + "px" : "" : i.style.left = s ? s * this._renderService.dimensions.css.cell.width + "px" : "";
          }
          _removeDecoration(h) {
            var i;
            (i = this._decorationElements.get(h)) == null || i.remove(), this._decorationElements.delete(h), h.dispose();
          }
        };
        r.BufferDecorationRenderer = g = l([f(1, v.IBufferService), f(2, n.ICoreBrowserService), f(3, v.IDecorationService), f(4, n.IRenderService)], g);
      }, 5871: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.ColorZoneStore = void 0, r.ColorZoneStore = class {
          constructor() {
            this._zones = [], this._zonePool = [], this._zonePoolIndex = 0, this._linePadding = { full: 0, left: 0, center: 0, right: 0 };
          }
          get zones() {
            return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
          }
          clear() {
            this._zones.length = 0, this._zonePoolIndex = 0;
          }
          addDecoration(a) {
            if (a.options.overviewRulerOptions) {
              for (const l of this._zones) if (l.color === a.options.overviewRulerOptions.color && l.position === a.options.overviewRulerOptions.position) {
                if (this._lineIntersectsZone(l, a.marker.line)) return;
                if (this._lineAdjacentToZone(l, a.marker.line, a.options.overviewRulerOptions.position)) return void this._addLineToZone(l, a.marker.line);
              }
              if (this._zonePoolIndex < this._zonePool.length) return this._zonePool[this._zonePoolIndex].color = a.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = a.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = a.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = a.marker.line, void this._zones.push(this._zonePool[this._zonePoolIndex++]);
              this._zones.push({ color: a.options.overviewRulerOptions.color, position: a.options.overviewRulerOptions.position, startBufferLine: a.marker.line, endBufferLine: a.marker.line }), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
            }
          }
          setPadding(a) {
            this._linePadding = a;
          }
          _lineIntersectsZone(a, l) {
            return l >= a.startBufferLine && l <= a.endBufferLine;
          }
          _lineAdjacentToZone(a, l, f) {
            return l >= a.startBufferLine - this._linePadding[f || "full"] && l <= a.endBufferLine + this._linePadding[f || "full"];
          }
          _addLineToZone(a, l) {
            a.startBufferLine = Math.min(a.startBufferLine, l), a.endBufferLine = Math.max(a.endBufferLine, l);
          }
        };
      }, 5744: function(O, r, a) {
        var l = this && this.__decorate || function(t, o, u, _) {
          var p, c = arguments.length, m = c < 3 ? o : _ === null ? _ = Object.getOwnPropertyDescriptor(o, u) : _;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") m = Reflect.decorate(t, o, u, _);
          else for (var y = t.length - 1; y >= 0; y--) (p = t[y]) && (m = (c < 3 ? p(m) : c > 3 ? p(o, u, m) : p(o, u)) || m);
          return c > 3 && m && Object.defineProperty(o, u, m), m;
        }, f = this && this.__param || function(t, o) {
          return function(u, _) {
            o(u, _, t);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.OverviewRulerRenderer = void 0;
        const n = a(5871), d = a(4725), v = a(844), g = a(2585), h = { full: 0, left: 0, center: 0, right: 0 }, i = { full: 0, left: 0, center: 0, right: 0 }, s = { full: 0, left: 0, center: 0, right: 0 };
        let e = r.OverviewRulerRenderer = class extends v.Disposable {
          get _width() {
            return this._optionsService.options.overviewRulerWidth || 0;
          }
          constructor(t, o, u, _, p, c, m) {
            var k;
            super(), this._viewportElement = t, this._screenElement = o, this._bufferService = u, this._decorationService = _, this._renderService = p, this._optionsService = c, this._coreBrowserService = m, this._colorZoneStore = new n.ColorZoneStore(), this._shouldUpdateDimensions = true, this._shouldUpdateAnchor = true, this._lastKnownBufferLength = 0, this._canvas = this._coreBrowserService.mainDocument.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), (k = this._viewportElement.parentElement) == null || k.insertBefore(this._canvas, this._viewportElement);
            const y = this._canvas.getContext("2d");
            if (!y) throw new Error("Ctx cannot be null");
            this._ctx = y, this._registerDecorationListeners(), this._registerBufferChangeListeners(), this._registerDimensionChangeListeners(), this.register((0, v.toDisposable)(() => {
              var L;
              (L = this._canvas) == null || L.remove();
            }));
          }
          _registerDecorationListeners() {
            this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(void 0, true))), this.register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(void 0, true)));
          }
          _registerBufferChangeListeners() {
            this.register(this._renderService.onRenderedViewportChange(() => this._queueRefresh())), this.register(this._bufferService.buffers.onBufferActivate(() => {
              this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
            })), this.register(this._bufferService.onScroll(() => {
              this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
            }));
          }
          _registerDimensionChangeListeners() {
            this.register(this._renderService.onRender(() => {
              this._containerHeight && this._containerHeight === this._screenElement.clientHeight || (this._queueRefresh(true), this._containerHeight = this._screenElement.clientHeight);
            })), this.register(this._optionsService.onSpecificOptionChange("overviewRulerWidth", () => this._queueRefresh(true))), this.register(this._coreBrowserService.onDprChange(() => this._queueRefresh(true))), this._queueRefresh(true);
          }
          _refreshDrawConstants() {
            const t = Math.floor(this._canvas.width / 3), o = Math.ceil(this._canvas.width / 3);
            i.full = this._canvas.width, i.left = t, i.center = o, i.right = t, this._refreshDrawHeightConstants(), s.full = 0, s.left = 0, s.center = i.left, s.right = i.left + i.center;
          }
          _refreshDrawHeightConstants() {
            h.full = Math.round(2 * this._coreBrowserService.dpr);
            const t = this._canvas.height / this._bufferService.buffer.lines.length, o = Math.round(Math.max(Math.min(t, 12), 6) * this._coreBrowserService.dpr);
            h.left = o, h.center = o, h.right = o;
          }
          _refreshColorZonePadding() {
            this._colorZoneStore.setPadding({ full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * h.full), left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * h.left), center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * h.center), right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * h.right) }), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
          }
          _refreshCanvasDimensions() {
            this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
          }
          _refreshDecorations() {
            this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
            for (const o of this._decorationService.decorations) this._colorZoneStore.addDecoration(o);
            this._ctx.lineWidth = 1;
            const t = this._colorZoneStore.zones;
            for (const o of t) o.position !== "full" && this._renderColorZone(o);
            for (const o of t) o.position === "full" && this._renderColorZone(o);
            this._shouldUpdateDimensions = false, this._shouldUpdateAnchor = false;
          }
          _renderColorZone(t) {
            this._ctx.fillStyle = t.color, this._ctx.fillRect(s[t.position || "full"], Math.round((this._canvas.height - 1) * (t.startBufferLine / this._bufferService.buffers.active.lines.length) - h[t.position || "full"] / 2), i[t.position || "full"], Math.round((this._canvas.height - 1) * ((t.endBufferLine - t.startBufferLine) / this._bufferService.buffers.active.lines.length) + h[t.position || "full"]));
          }
          _queueRefresh(t, o) {
            this._shouldUpdateDimensions = t || this._shouldUpdateDimensions, this._shouldUpdateAnchor = o || this._shouldUpdateAnchor, this._animationFrame === void 0 && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
              this._refreshDecorations(), this._animationFrame = void 0;
            }));
          }
        };
        r.OverviewRulerRenderer = e = l([f(2, g.IBufferService), f(3, g.IDecorationService), f(4, d.IRenderService), f(5, g.IOptionsService), f(6, d.ICoreBrowserService)], e);
      }, 2950: function(O, r, a) {
        var l = this && this.__decorate || function(h, i, s, e) {
          var t, o = arguments.length, u = o < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") u = Reflect.decorate(h, i, s, e);
          else for (var _ = h.length - 1; _ >= 0; _--) (t = h[_]) && (u = (o < 3 ? t(u) : o > 3 ? t(i, s, u) : t(i, s)) || u);
          return o > 3 && u && Object.defineProperty(i, s, u), u;
        }, f = this && this.__param || function(h, i) {
          return function(s, e) {
            i(s, e, h);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.CompositionHelper = void 0;
        const n = a(4725), d = a(2585), v = a(2584);
        let g = r.CompositionHelper = class {
          get isComposing() {
            return this._isComposing;
          }
          constructor(h, i, s, e, t, o) {
            this._textarea = h, this._compositionView = i, this._bufferService = s, this._optionsService = e, this._coreService = t, this._renderService = o, this._isComposing = false, this._isSendingComposition = false, this._compositionPosition = { start: 0, end: 0 }, this._dataAlreadySent = "";
          }
          compositionstart() {
            this._isComposing = true, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
          }
          compositionupdate(h) {
            this._compositionView.textContent = h.data, this.updateCompositionElements(), setTimeout(() => {
              this._compositionPosition.end = this._textarea.value.length;
            }, 0);
          }
          compositionend() {
            this._finalizeComposition(true);
          }
          keydown(h) {
            if (this._isComposing || this._isSendingComposition) {
              if (h.keyCode === 229 || h.keyCode === 16 || h.keyCode === 17 || h.keyCode === 18) return false;
              this._finalizeComposition(false);
            }
            return h.keyCode !== 229 || (this._handleAnyTextareaChanges(), false);
          }
          _finalizeComposition(h) {
            if (this._compositionView.classList.remove("active"), this._isComposing = false, h) {
              const i = { start: this._compositionPosition.start, end: this._compositionPosition.end };
              this._isSendingComposition = true, setTimeout(() => {
                if (this._isSendingComposition) {
                  let s;
                  this._isSendingComposition = false, i.start += this._dataAlreadySent.length, s = this._isComposing ? this._textarea.value.substring(i.start, i.end) : this._textarea.value.substring(i.start), s.length > 0 && this._coreService.triggerDataEvent(s, true);
                }
              }, 0);
            } else {
              this._isSendingComposition = false;
              const i = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
              this._coreService.triggerDataEvent(i, true);
            }
          }
          _handleAnyTextareaChanges() {
            const h = this._textarea.value;
            setTimeout(() => {
              if (!this._isComposing) {
                const i = this._textarea.value, s = i.replace(h, "");
                this._dataAlreadySent = s, i.length > h.length ? this._coreService.triggerDataEvent(s, true) : i.length < h.length ? this._coreService.triggerDataEvent(`${v.C0.DEL}`, true) : i.length === h.length && i !== h && this._coreService.triggerDataEvent(i, true);
              }
            }, 0);
          }
          updateCompositionElements(h) {
            if (this._isComposing) {
              if (this._bufferService.buffer.isCursorInViewport) {
                const i = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), s = this._renderService.dimensions.css.cell.height, e = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, t = i * this._renderService.dimensions.css.cell.width;
                this._compositionView.style.left = t + "px", this._compositionView.style.top = e + "px", this._compositionView.style.height = s + "px", this._compositionView.style.lineHeight = s + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
                const o = this._compositionView.getBoundingClientRect();
                this._textarea.style.left = t + "px", this._textarea.style.top = e + "px", this._textarea.style.width = Math.max(o.width, 1) + "px", this._textarea.style.height = Math.max(o.height, 1) + "px", this._textarea.style.lineHeight = o.height + "px";
              }
              h || setTimeout(() => this.updateCompositionElements(true), 0);
            }
          }
        };
        r.CompositionHelper = g = l([f(2, d.IBufferService), f(3, d.IOptionsService), f(4, d.ICoreService), f(5, n.IRenderService)], g);
      }, 9806: (O, r) => {
        function a(l, f, n) {
          const d = n.getBoundingClientRect(), v = l.getComputedStyle(n), g = parseInt(v.getPropertyValue("padding-left")), h = parseInt(v.getPropertyValue("padding-top"));
          return [f.clientX - d.left - g, f.clientY - d.top - h];
        }
        Object.defineProperty(r, "__esModule", { value: true }), r.getCoords = r.getCoordsRelativeToElement = void 0, r.getCoordsRelativeToElement = a, r.getCoords = function(l, f, n, d, v, g, h, i, s) {
          if (!g) return;
          const e = a(l, f, n);
          return e ? (e[0] = Math.ceil((e[0] + (s ? h / 2 : 0)) / h), e[1] = Math.ceil(e[1] / i), e[0] = Math.min(Math.max(e[0], 1), d + (s ? 1 : 0)), e[1] = Math.min(Math.max(e[1], 1), v), e) : void 0;
        };
      }, 9504: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.moveToCellSequence = void 0;
        const l = a(2584);
        function f(i, s, e, t) {
          const o = i - n(i, e), u = s - n(s, e), _ = Math.abs(o - u) - function(p, c, m) {
            let y = 0;
            const k = p - n(p, m), L = c - n(c, m);
            for (let w = 0; w < Math.abs(k - L); w++) {
              const x = d(p, c) === "A" ? -1 : 1, B = m.buffer.lines.get(k + x * w);
              B != null && B.isWrapped && y++;
            }
            return y;
          }(i, s, e);
          return h(_, g(d(i, s), t));
        }
        function n(i, s) {
          let e = 0, t = s.buffer.lines.get(i), o = t == null ? void 0 : t.isWrapped;
          for (; o && i >= 0 && i < s.rows; ) e++, t = s.buffer.lines.get(--i), o = t == null ? void 0 : t.isWrapped;
          return e;
        }
        function d(i, s) {
          return i > s ? "A" : "B";
        }
        function v(i, s, e, t, o, u) {
          let _ = i, p = s, c = "";
          for (; _ !== e || p !== t; ) _ += o ? 1 : -1, o && _ > u.cols - 1 ? (c += u.buffer.translateBufferLineToString(p, false, i, _), _ = 0, i = 0, p++) : !o && _ < 0 && (c += u.buffer.translateBufferLineToString(p, false, 0, i + 1), _ = u.cols - 1, i = _, p--);
          return c + u.buffer.translateBufferLineToString(p, false, i, _);
        }
        function g(i, s) {
          const e = s ? "O" : "[";
          return l.C0.ESC + e + i;
        }
        function h(i, s) {
          i = Math.floor(i);
          let e = "";
          for (let t = 0; t < i; t++) e += s;
          return e;
        }
        r.moveToCellSequence = function(i, s, e, t) {
          const o = e.buffer.x, u = e.buffer.y;
          if (!e.buffer.hasScrollback) return function(c, m, y, k, L, w) {
            return f(m, k, L, w).length === 0 ? "" : h(v(c, m, c, m - n(m, L), false, L).length, g("D", w));
          }(o, u, 0, s, e, t) + f(u, s, e, t) + function(c, m, y, k, L, w) {
            let x;
            x = f(m, k, L, w).length > 0 ? k - n(k, L) : m;
            const B = k, P = function(U, I, S, b, E, D) {
              let T;
              return T = f(S, b, E, D).length > 0 ? b - n(b, E) : I, U < S && T <= b || U >= S && T < b ? "C" : "D";
            }(c, m, y, k, L, w);
            return h(v(c, x, y, B, P === "C", L).length, g(P, w));
          }(o, u, i, s, e, t);
          let _;
          if (u === s) return _ = o > i ? "D" : "C", h(Math.abs(o - i), g(_, t));
          _ = u > s ? "D" : "C";
          const p = Math.abs(u - s);
          return h(function(c, m) {
            return m.cols - c;
          }(u > s ? i : o, e) + (p - 1) * e.cols + 1 + ((u > s ? o : i) - 1), g(_, t));
        };
      }, 1296: function(O, r, a) {
        var l = this && this.__decorate || function(w, x, B, P) {
          var U, I = arguments.length, S = I < 3 ? x : P === null ? P = Object.getOwnPropertyDescriptor(x, B) : P;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") S = Reflect.decorate(w, x, B, P);
          else for (var b = w.length - 1; b >= 0; b--) (U = w[b]) && (S = (I < 3 ? U(S) : I > 3 ? U(x, B, S) : U(x, B)) || S);
          return I > 3 && S && Object.defineProperty(x, B, S), S;
        }, f = this && this.__param || function(w, x) {
          return function(B, P) {
            x(B, P, w);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.DomRenderer = void 0;
        const n = a(3787), d = a(2550), v = a(2223), g = a(6171), h = a(6052), i = a(4725), s = a(8055), e = a(8460), t = a(844), o = a(2585), u = "xterm-dom-renderer-owner-", _ = "xterm-rows", p = "xterm-fg-", c = "xterm-bg-", m = "xterm-focus", y = "xterm-selection";
        let k = 1, L = r.DomRenderer = class extends t.Disposable {
          constructor(w, x, B, P, U, I, S, b, E, D, T, H, N) {
            super(), this._terminal = w, this._document = x, this._element = B, this._screenElement = P, this._viewportElement = U, this._helperContainer = I, this._linkifier2 = S, this._charSizeService = E, this._optionsService = D, this._bufferService = T, this._coreBrowserService = H, this._themeService = N, this._terminalClass = k++, this._rowElements = [], this._selectionRenderModel = (0, h.createSelectionRenderModel)(), this.onRequestRedraw = this.register(new e.EventEmitter()).event, this._rowContainer = this._document.createElement("div"), this._rowContainer.classList.add(_), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = this._document.createElement("div"), this._selectionContainer.classList.add(y), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = (0, g.createRenderDimensions)(), this._updateDimensions(), this.register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this.register(this._themeService.onChangeColors(($) => this._injectCss($))), this._injectCss(this._themeService.colors), this._rowFactory = b.createInstance(n.DomRendererRowFactory, void 0), this._element.classList.add(u + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this.register(this._linkifier2.onShowLinkUnderline(($) => this._handleLinkHover($))), this.register(this._linkifier2.onHideLinkUnderline(($) => this._handleLinkLeave($))), this.register((0, t.toDisposable)(() => {
              this._element.classList.remove(u + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
            })), this._widthCache = new d.WidthCache(this._document, this._helperContainer), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
          }
          _updateDimensions() {
            const w = this._coreBrowserService.dpr;
            this.dimensions.device.char.width = this._charSizeService.width * w, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * w), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / w), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / w), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
            for (const B of this._rowElements) B.style.width = `${this.dimensions.css.canvas.width}px`, B.style.height = `${this.dimensions.css.cell.height}px`, B.style.lineHeight = `${this.dimensions.css.cell.height}px`, B.style.overflow = "hidden";
            this._dimensionsStyleElement || (this._dimensionsStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
            const x = `${this._terminalSelector} .${_} span { display: inline-block; height: 100%; vertical-align: top;}`;
            this._dimensionsStyleElement.textContent = x, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
          }
          _injectCss(w) {
            this._themeStyleElement || (this._themeStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
            let x = `${this._terminalSelector} .${_} { color: ${w.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
            x += `${this._terminalSelector} .${_} .xterm-dim { color: ${s.color.multiplyOpacity(w.foreground, 0.5).css};}`, x += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;
            const B = `blink_underline_${this._terminalClass}`, P = `blink_bar_${this._terminalClass}`, U = `blink_block_${this._terminalClass}`;
            x += `@keyframes ${B} { 50% {  border-bottom-style: hidden; }}`, x += `@keyframes ${P} { 50% {  box-shadow: none; }}`, x += `@keyframes ${U} { 0% {  background-color: ${w.cursor.css};  color: ${w.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${w.cursor.css}; }}`, x += `${this._terminalSelector} .${_}.${m} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${B} 1s step-end infinite;}${this._terminalSelector} .${_}.${m} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${P} 1s step-end infinite;}${this._terminalSelector} .${_}.${m} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${U} 1s step-end infinite;}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-block { background-color: ${w.cursor.css}; color: ${w.cursorAccent.css};}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${w.cursor.css} !important; color: ${w.cursorAccent.css} !important;}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${w.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${w.cursor.css} inset;}${this._terminalSelector} .${_} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${w.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, x += `${this._terminalSelector} .${y} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${y} div { position: absolute; background-color: ${w.selectionBackgroundOpaque.css};}${this._terminalSelector} .${y} div { position: absolute; background-color: ${w.selectionInactiveBackgroundOpaque.css};}`;
            for (const [I, S] of w.ansi.entries()) x += `${this._terminalSelector} .${p}${I} { color: ${S.css}; }${this._terminalSelector} .${p}${I}.xterm-dim { color: ${s.color.multiplyOpacity(S, 0.5).css}; }${this._terminalSelector} .${c}${I} { background-color: ${S.css}; }`;
            x += `${this._terminalSelector} .${p}${v.INVERTED_DEFAULT_COLOR} { color: ${s.color.opaque(w.background).css}; }${this._terminalSelector} .${p}${v.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${s.color.multiplyOpacity(s.color.opaque(w.background), 0.5).css}; }${this._terminalSelector} .${c}${v.INVERTED_DEFAULT_COLOR} { background-color: ${w.foreground.css}; }`, this._themeStyleElement.textContent = x;
          }
          _setDefaultSpacing() {
            const w = this.dimensions.css.cell.width - this._widthCache.get("W", false, false);
            this._rowContainer.style.letterSpacing = `${w}px`, this._rowFactory.defaultSpacing = w;
          }
          handleDevicePixelRatioChange() {
            this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
          }
          _refreshRowElements(w, x) {
            for (let B = this._rowElements.length; B <= x; B++) {
              const P = this._document.createElement("div");
              this._rowContainer.appendChild(P), this._rowElements.push(P);
            }
            for (; this._rowElements.length > x; ) this._rowContainer.removeChild(this._rowElements.pop());
          }
          handleResize(w, x) {
            this._refreshRowElements(w, x), this._updateDimensions(), this.handleSelectionChanged(this._selectionRenderModel.selectionStart, this._selectionRenderModel.selectionEnd, this._selectionRenderModel.columnSelectMode);
          }
          handleCharSizeChanged() {
            this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
          }
          handleBlur() {
            this._rowContainer.classList.remove(m), this.renderRows(0, this._bufferService.rows - 1);
          }
          handleFocus() {
            this._rowContainer.classList.add(m), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
          }
          handleSelectionChanged(w, x, B) {
            if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(w, x, B), this.renderRows(0, this._bufferService.rows - 1), !w || !x) return;
            this._selectionRenderModel.update(this._terminal, w, x, B);
            const P = this._selectionRenderModel.viewportStartRow, U = this._selectionRenderModel.viewportEndRow, I = this._selectionRenderModel.viewportCappedStartRow, S = this._selectionRenderModel.viewportCappedEndRow;
            if (I >= this._bufferService.rows || S < 0) return;
            const b = this._document.createDocumentFragment();
            if (B) {
              const E = w[0] > x[0];
              b.appendChild(this._createSelectionElement(I, E ? x[0] : w[0], E ? w[0] : x[0], S - I + 1));
            } else {
              const E = P === I ? w[0] : 0, D = I === U ? x[0] : this._bufferService.cols;
              b.appendChild(this._createSelectionElement(I, E, D));
              const T = S - I - 1;
              if (b.appendChild(this._createSelectionElement(I + 1, 0, this._bufferService.cols, T)), I !== S) {
                const H = U === S ? x[0] : this._bufferService.cols;
                b.appendChild(this._createSelectionElement(S, 0, H));
              }
            }
            this._selectionContainer.appendChild(b);
          }
          _createSelectionElement(w, x, B, P = 1) {
            const U = this._document.createElement("div"), I = x * this.dimensions.css.cell.width;
            let S = this.dimensions.css.cell.width * (B - x);
            return I + S > this.dimensions.css.canvas.width && (S = this.dimensions.css.canvas.width - I), U.style.height = P * this.dimensions.css.cell.height + "px", U.style.top = w * this.dimensions.css.cell.height + "px", U.style.left = `${I}px`, U.style.width = `${S}px`, U;
          }
          handleCursorMove() {
          }
          _handleOptionsChanged() {
            this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
          }
          clear() {
            for (const w of this._rowElements) w.replaceChildren();
          }
          renderRows(w, x) {
            const B = this._bufferService.buffer, P = B.ybase + B.y, U = Math.min(B.x, this._bufferService.cols - 1), I = this._optionsService.rawOptions.cursorBlink, S = this._optionsService.rawOptions.cursorStyle, b = this._optionsService.rawOptions.cursorInactiveStyle;
            for (let E = w; E <= x; E++) {
              const D = E + B.ydisp, T = this._rowElements[E], H = B.lines.get(D);
              if (!T || !H) break;
              T.replaceChildren(...this._rowFactory.createRow(H, D, D === P, S, b, U, I, this.dimensions.css.cell.width, this._widthCache, -1, -1));
            }
          }
          get _terminalSelector() {
            return `.${u}${this._terminalClass}`;
          }
          _handleLinkHover(w) {
            this._setCellUnderline(w.x1, w.x2, w.y1, w.y2, w.cols, true);
          }
          _handleLinkLeave(w) {
            this._setCellUnderline(w.x1, w.x2, w.y1, w.y2, w.cols, false);
          }
          _setCellUnderline(w, x, B, P, U, I) {
            B < 0 && (w = 0), P < 0 && (x = 0);
            const S = this._bufferService.rows - 1;
            B = Math.max(Math.min(B, S), 0), P = Math.max(Math.min(P, S), 0), U = Math.min(U, this._bufferService.cols);
            const b = this._bufferService.buffer, E = b.ybase + b.y, D = Math.min(b.x, U - 1), T = this._optionsService.rawOptions.cursorBlink, H = this._optionsService.rawOptions.cursorStyle, N = this._optionsService.rawOptions.cursorInactiveStyle;
            for (let $ = B; $ <= P; ++$) {
              const R = $ + b.ydisp, C = this._rowElements[$], M = b.lines.get(R);
              if (!C || !M) break;
              C.replaceChildren(...this._rowFactory.createRow(M, R, R === E, H, N, D, T, this.dimensions.css.cell.width, this._widthCache, I ? $ === B ? w : 0 : -1, I ? ($ === P ? x : U) - 1 : -1));
            }
          }
        };
        r.DomRenderer = L = l([f(7, o.IInstantiationService), f(8, i.ICharSizeService), f(9, o.IOptionsService), f(10, o.IBufferService), f(11, i.ICoreBrowserService), f(12, i.IThemeService)], L);
      }, 3787: function(O, r, a) {
        var l = this && this.__decorate || function(_, p, c, m) {
          var y, k = arguments.length, L = k < 3 ? p : m === null ? m = Object.getOwnPropertyDescriptor(p, c) : m;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") L = Reflect.decorate(_, p, c, m);
          else for (var w = _.length - 1; w >= 0; w--) (y = _[w]) && (L = (k < 3 ? y(L) : k > 3 ? y(p, c, L) : y(p, c)) || L);
          return k > 3 && L && Object.defineProperty(p, c, L), L;
        }, f = this && this.__param || function(_, p) {
          return function(c, m) {
            p(c, m, _);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.DomRendererRowFactory = void 0;
        const n = a(2223), d = a(643), v = a(511), g = a(2585), h = a(8055), i = a(4725), s = a(4269), e = a(6171), t = a(3734);
        let o = r.DomRendererRowFactory = class {
          constructor(_, p, c, m, y, k, L) {
            this._document = _, this._characterJoinerService = p, this._optionsService = c, this._coreBrowserService = m, this._coreService = y, this._decorationService = k, this._themeService = L, this._workCell = new v.CellData(), this._columnSelectMode = false, this.defaultSpacing = 0;
          }
          handleSelectionChanged(_, p, c) {
            this._selectionStart = _, this._selectionEnd = p, this._columnSelectMode = c;
          }
          createRow(_, p, c, m, y, k, L, w, x, B, P) {
            const U = [], I = this._characterJoinerService.getJoinedCharacters(p), S = this._themeService.colors;
            let b, E = _.getNoBgTrimmedLength();
            c && E < k + 1 && (E = k + 1);
            let D = 0, T = "", H = 0, N = 0, $ = 0, R = false, C = 0, M = false, A = 0;
            const W = [], F = B !== -1 && P !== -1;
            for (let z = 0; z < E; z++) {
              _.loadCell(z, this._workCell);
              let q = this._workCell.getWidth();
              if (q === 0) continue;
              let V = false, X = z, j = this._workCell;
              if (I.length > 0 && z === I[0][0]) {
                V = true;
                const K = I.shift();
                j = new s.JoinedCellData(this._workCell, _.translateToString(true, K[0], K[1]), K[1] - K[0]), X = K[1] - 1, q = j.getWidth();
              }
              const re = this._isCellInSelection(z, p), de = c && z === k, _e = F && z >= B && z <= P;
              let ue = false;
              this._decorationService.forEachDecorationAtCell(z, p, void 0, (K) => {
                ue = true;
              });
              let he = j.getChars() || d.WHITESPACE_CELL_CHAR;
              if (he === " " && (j.isUnderline() || j.isOverline()) && (he = "\xA0"), A = q * w - x.get(he, j.isBold(), j.isItalic()), b) {
                if (D && (re && M || !re && !M && j.bg === H) && (re && M && S.selectionForeground || j.fg === N) && j.extended.ext === $ && _e === R && A === C && !de && !V && !ue) {
                  j.isInvisible() ? T += d.WHITESPACE_CELL_CHAR : T += he, D++;
                  continue;
                }
                D && (b.textContent = T), b = this._document.createElement("span"), D = 0, T = "";
              } else b = this._document.createElement("span");
              if (H = j.bg, N = j.fg, $ = j.extended.ext, R = _e, C = A, M = re, V && k >= z && k <= X && (k = z), !this._coreService.isCursorHidden && de && this._coreService.isCursorInitialized) {
                if (W.push("xterm-cursor"), this._coreBrowserService.isFocused) L && W.push("xterm-cursor-blink"), W.push(m === "bar" ? "xterm-cursor-bar" : m === "underline" ? "xterm-cursor-underline" : "xterm-cursor-block");
                else if (y) switch (y) {
                  case "outline":
                    W.push("xterm-cursor-outline");
                    break;
                  case "block":
                    W.push("xterm-cursor-block");
                    break;
                  case "bar":
                    W.push("xterm-cursor-bar");
                    break;
                  case "underline":
                    W.push("xterm-cursor-underline");
                }
              }
              if (j.isBold() && W.push("xterm-bold"), j.isItalic() && W.push("xterm-italic"), j.isDim() && W.push("xterm-dim"), T = j.isInvisible() ? d.WHITESPACE_CELL_CHAR : j.getChars() || d.WHITESPACE_CELL_CHAR, j.isUnderline() && (W.push(`xterm-underline-${j.extended.underlineStyle}`), T === " " && (T = "\xA0"), !j.isUnderlineColorDefault())) if (j.isUnderlineColorRGB()) b.style.textDecorationColor = `rgb(${t.AttributeData.toColorRGB(j.getUnderlineColor()).join(",")})`;
              else {
                let K = j.getUnderlineColor();
                this._optionsService.rawOptions.drawBoldTextInBrightColors && j.isBold() && K < 8 && (K += 8), b.style.textDecorationColor = S.ansi[K].css;
              }
              j.isOverline() && (W.push("xterm-overline"), T === " " && (T = "\xA0")), j.isStrikethrough() && W.push("xterm-strikethrough"), _e && (b.style.textDecoration = "underline");
              let J = j.getFgColor(), ne = j.getFgColorMode(), Z = j.getBgColor(), oe = j.getBgColorMode();
              const fe = !!j.isInverse();
              if (fe) {
                const K = J;
                J = Z, Z = K;
                const me = ne;
                ne = oe, oe = me;
              }
              let Q, ce, ee, ae = false;
              switch (this._decorationService.forEachDecorationAtCell(z, p, void 0, (K) => {
                K.options.layer !== "top" && ae || (K.backgroundColorRGB && (oe = 50331648, Z = K.backgroundColorRGB.rgba >> 8 & 16777215, Q = K.backgroundColorRGB), K.foregroundColorRGB && (ne = 50331648, J = K.foregroundColorRGB.rgba >> 8 & 16777215, ce = K.foregroundColorRGB), ae = K.options.layer === "top");
              }), !ae && re && (Q = this._coreBrowserService.isFocused ? S.selectionBackgroundOpaque : S.selectionInactiveBackgroundOpaque, Z = Q.rgba >> 8 & 16777215, oe = 50331648, ae = true, S.selectionForeground && (ne = 50331648, J = S.selectionForeground.rgba >> 8 & 16777215, ce = S.selectionForeground)), ae && W.push("xterm-decoration-top"), oe) {
                case 16777216:
                case 33554432:
                  ee = S.ansi[Z], W.push(`xterm-bg-${Z}`);
                  break;
                case 50331648:
                  ee = h.channels.toColor(Z >> 16, Z >> 8 & 255, 255 & Z), this._addStyle(b, `background-color:#${u((Z >>> 0).toString(16), "0", 6)}`);
                  break;
                default:
                  fe ? (ee = S.foreground, W.push(`xterm-bg-${n.INVERTED_DEFAULT_COLOR}`)) : ee = S.background;
              }
              switch (Q || j.isDim() && (Q = h.color.multiplyOpacity(ee, 0.5)), ne) {
                case 16777216:
                case 33554432:
                  j.isBold() && J < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && (J += 8), this._applyMinimumContrast(b, ee, S.ansi[J], j, Q, void 0) || W.push(`xterm-fg-${J}`);
                  break;
                case 50331648:
                  const K = h.channels.toColor(J >> 16 & 255, J >> 8 & 255, 255 & J);
                  this._applyMinimumContrast(b, ee, K, j, Q, ce) || this._addStyle(b, `color:#${u(J.toString(16), "0", 6)}`);
                  break;
                default:
                  this._applyMinimumContrast(b, ee, S.foreground, j, Q, ce) || fe && W.push(`xterm-fg-${n.INVERTED_DEFAULT_COLOR}`);
              }
              W.length && (b.className = W.join(" "), W.length = 0), de || V || ue ? b.textContent = T : D++, A !== this.defaultSpacing && (b.style.letterSpacing = `${A}px`), U.push(b), z = X;
            }
            return b && D && (b.textContent = T), U;
          }
          _applyMinimumContrast(_, p, c, m, y, k) {
            if (this._optionsService.rawOptions.minimumContrastRatio === 1 || (0, e.treatGlyphAsBackgroundColor)(m.getCode())) return false;
            const L = this._getContrastCache(m);
            let w;
            if (y || k || (w = L.getColor(p.rgba, c.rgba)), w === void 0) {
              const x = this._optionsService.rawOptions.minimumContrastRatio / (m.isDim() ? 2 : 1);
              w = h.color.ensureContrastRatio(y || p, k || c, x), L.setColor((y || p).rgba, (k || c).rgba, w != null ? w : null);
            }
            return !!w && (this._addStyle(_, `color:${w.css}`), true);
          }
          _getContrastCache(_) {
            return _.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
          }
          _addStyle(_, p) {
            _.setAttribute("style", `${_.getAttribute("style") || ""}${p};`);
          }
          _isCellInSelection(_, p) {
            const c = this._selectionStart, m = this._selectionEnd;
            return !(!c || !m) && (this._columnSelectMode ? c[0] <= m[0] ? _ >= c[0] && p >= c[1] && _ < m[0] && p <= m[1] : _ < c[0] && p >= c[1] && _ >= m[0] && p <= m[1] : p > c[1] && p < m[1] || c[1] === m[1] && p === c[1] && _ >= c[0] && _ < m[0] || c[1] < m[1] && p === m[1] && _ < m[0] || c[1] < m[1] && p === c[1] && _ >= c[0]);
          }
        };
        function u(_, p, c) {
          for (; _.length < c; ) _ = p + _;
          return _;
        }
        r.DomRendererRowFactory = o = l([f(1, i.ICharacterJoinerService), f(2, g.IOptionsService), f(3, i.ICoreBrowserService), f(4, g.ICoreService), f(5, g.IDecorationService), f(6, i.IThemeService)], o);
      }, 2550: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.WidthCache = void 0, r.WidthCache = class {
          constructor(a, l) {
            this._flat = new Float32Array(256), this._font = "", this._fontSize = 0, this._weight = "normal", this._weightBold = "bold", this._measureElements = [], this._container = a.createElement("div"), this._container.classList.add("xterm-width-cache-measure-container"), this._container.setAttribute("aria-hidden", "true"), this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
            const f = a.createElement("span");
            f.classList.add("xterm-char-measure-element");
            const n = a.createElement("span");
            n.classList.add("xterm-char-measure-element"), n.style.fontWeight = "bold";
            const d = a.createElement("span");
            d.classList.add("xterm-char-measure-element"), d.style.fontStyle = "italic";
            const v = a.createElement("span");
            v.classList.add("xterm-char-measure-element"), v.style.fontWeight = "bold", v.style.fontStyle = "italic", this._measureElements = [f, n, d, v], this._container.appendChild(f), this._container.appendChild(n), this._container.appendChild(d), this._container.appendChild(v), l.appendChild(this._container), this.clear();
          }
          dispose() {
            this._container.remove(), this._measureElements.length = 0, this._holey = void 0;
          }
          clear() {
            this._flat.fill(-9999), this._holey = /* @__PURE__ */ new Map();
          }
          setFont(a, l, f, n) {
            a === this._font && l === this._fontSize && f === this._weight && n === this._weightBold || (this._font = a, this._fontSize = l, this._weight = f, this._weightBold = n, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${f}`, this._measureElements[1].style.fontWeight = `${n}`, this._measureElements[2].style.fontWeight = `${f}`, this._measureElements[3].style.fontWeight = `${n}`, this.clear());
          }
          get(a, l, f) {
            let n = 0;
            if (!l && !f && a.length === 1 && (n = a.charCodeAt(0)) < 256) {
              if (this._flat[n] !== -9999) return this._flat[n];
              const g = this._measure(a, 0);
              return g > 0 && (this._flat[n] = g), g;
            }
            let d = a;
            l && (d += "B"), f && (d += "I");
            let v = this._holey.get(d);
            if (v === void 0) {
              let g = 0;
              l && (g |= 1), f && (g |= 2), v = this._measure(a, g), v > 0 && this._holey.set(d, v);
            }
            return v;
          }
          _measure(a, l) {
            const f = this._measureElements[l];
            return f.textContent = a.repeat(32), f.offsetWidth / 32;
          }
        };
      }, 2223: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.TEXT_BASELINE = r.DIM_OPACITY = r.INVERTED_DEFAULT_COLOR = void 0;
        const l = a(6114);
        r.INVERTED_DEFAULT_COLOR = 257, r.DIM_OPACITY = 0.5, r.TEXT_BASELINE = l.isFirefox || l.isLegacyEdge ? "bottom" : "ideographic";
      }, 6171: (O, r) => {
        function a(f) {
          return 57508 <= f && f <= 57558;
        }
        function l(f) {
          return f >= 128512 && f <= 128591 || f >= 127744 && f <= 128511 || f >= 128640 && f <= 128767 || f >= 9728 && f <= 9983 || f >= 9984 && f <= 10175 || f >= 65024 && f <= 65039 || f >= 129280 && f <= 129535 || f >= 127462 && f <= 127487;
        }
        Object.defineProperty(r, "__esModule", { value: true }), r.computeNextVariantOffset = r.createRenderDimensions = r.treatGlyphAsBackgroundColor = r.allowRescaling = r.isEmoji = r.isRestrictedPowerlineGlyph = r.isPowerlineGlyph = r.throwIfFalsy = void 0, r.throwIfFalsy = function(f) {
          if (!f) throw new Error("value must not be falsy");
          return f;
        }, r.isPowerlineGlyph = a, r.isRestrictedPowerlineGlyph = function(f) {
          return 57520 <= f && f <= 57527;
        }, r.isEmoji = l, r.allowRescaling = function(f, n, d, v) {
          return n === 1 && d > Math.ceil(1.5 * v) && f !== void 0 && f > 255 && !l(f) && !a(f) && !function(g) {
            return 57344 <= g && g <= 63743;
          }(f);
        }, r.treatGlyphAsBackgroundColor = function(f) {
          return a(f) || function(n) {
            return 9472 <= n && n <= 9631;
          }(f);
        }, r.createRenderDimensions = function() {
          return { css: { canvas: { width: 0, height: 0 }, cell: { width: 0, height: 0 } }, device: { canvas: { width: 0, height: 0 }, cell: { width: 0, height: 0 }, char: { width: 0, height: 0, left: 0, top: 0 } } };
        }, r.computeNextVariantOffset = function(f, n, d = 0) {
          return (f - (2 * Math.round(n) - d)) % (2 * Math.round(n));
        };
      }, 6052: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.createSelectionRenderModel = void 0;
        class a {
          constructor() {
            this.clear();
          }
          clear() {
            this.hasSelection = false, this.columnSelectMode = false, this.viewportStartRow = 0, this.viewportEndRow = 0, this.viewportCappedStartRow = 0, this.viewportCappedEndRow = 0, this.startCol = 0, this.endCol = 0, this.selectionStart = void 0, this.selectionEnd = void 0;
          }
          update(f, n, d, v = false) {
            if (this.selectionStart = n, this.selectionEnd = d, !n || !d || n[0] === d[0] && n[1] === d[1]) return void this.clear();
            const g = f.buffers.active.ydisp, h = n[1] - g, i = d[1] - g, s = Math.max(h, 0), e = Math.min(i, f.rows - 1);
            s >= f.rows || e < 0 ? this.clear() : (this.hasSelection = true, this.columnSelectMode = v, this.viewportStartRow = h, this.viewportEndRow = i, this.viewportCappedStartRow = s, this.viewportCappedEndRow = e, this.startCol = n[0], this.endCol = d[0]);
          }
          isCellSelected(f, n, d) {
            return !!this.hasSelection && (d -= f.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? n >= this.startCol && d >= this.viewportCappedStartRow && n < this.endCol && d <= this.viewportCappedEndRow : n < this.startCol && d >= this.viewportCappedStartRow && n >= this.endCol && d <= this.viewportCappedEndRow : d > this.viewportStartRow && d < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && d === this.viewportStartRow && n >= this.startCol && n < this.endCol || this.viewportStartRow < this.viewportEndRow && d === this.viewportEndRow && n < this.endCol || this.viewportStartRow < this.viewportEndRow && d === this.viewportStartRow && n >= this.startCol);
          }
        }
        r.createSelectionRenderModel = function() {
          return new a();
        };
      }, 456: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.SelectionModel = void 0, r.SelectionModel = class {
          constructor(a) {
            this._bufferService = a, this.isSelectAllActive = false, this.selectionStartLength = 0;
          }
          clearSelection() {
            this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = false, this.selectionStartLength = 0;
          }
          get finalSelectionStart() {
            return this.isSelectAllActive ? [0, 0] : this.selectionEnd && this.selectionStart && this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
          }
          get finalSelectionEnd() {
            if (this.isSelectAllActive) return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
            if (this.selectionStart) {
              if (!this.selectionEnd || this.areSelectionValuesReversed()) {
                const a = this.selectionStart[0] + this.selectionStartLength;
                return a > this._bufferService.cols ? a % this._bufferService.cols == 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(a / this._bufferService.cols) - 1] : [a % this._bufferService.cols, this.selectionStart[1] + Math.floor(a / this._bufferService.cols)] : [a, this.selectionStart[1]];
              }
              if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
                const a = this.selectionStart[0] + this.selectionStartLength;
                return a > this._bufferService.cols ? [a % this._bufferService.cols, this.selectionStart[1] + Math.floor(a / this._bufferService.cols)] : [Math.max(a, this.selectionEnd[0]), this.selectionEnd[1]];
              }
              return this.selectionEnd;
            }
          }
          areSelectionValuesReversed() {
            const a = this.selectionStart, l = this.selectionEnd;
            return !(!a || !l) && (a[1] > l[1] || a[1] === l[1] && a[0] > l[0]);
          }
          handleTrim(a) {
            return this.selectionStart && (this.selectionStart[1] -= a), this.selectionEnd && (this.selectionEnd[1] -= a), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), true) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), false);
          }
        };
      }, 428: function(O, r, a) {
        var l = this && this.__decorate || function(e, t, o, u) {
          var _, p = arguments.length, c = p < 3 ? t : u === null ? u = Object.getOwnPropertyDescriptor(t, o) : u;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") c = Reflect.decorate(e, t, o, u);
          else for (var m = e.length - 1; m >= 0; m--) (_ = e[m]) && (c = (p < 3 ? _(c) : p > 3 ? _(t, o, c) : _(t, o)) || c);
          return p > 3 && c && Object.defineProperty(t, o, c), c;
        }, f = this && this.__param || function(e, t) {
          return function(o, u) {
            t(o, u, e);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.CharSizeService = void 0;
        const n = a(2585), d = a(8460), v = a(844);
        let g = r.CharSizeService = class extends v.Disposable {
          get hasValidSize() {
            return this.width > 0 && this.height > 0;
          }
          constructor(e, t, o) {
            super(), this._optionsService = o, this.width = 0, this.height = 0, this._onCharSizeChange = this.register(new d.EventEmitter()), this.onCharSizeChange = this._onCharSizeChange.event;
            try {
              this._measureStrategy = this.register(new s(this._optionsService));
            } catch {
              this._measureStrategy = this.register(new i(e, t, this._optionsService));
            }
            this.register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], () => this.measure()));
          }
          measure() {
            const e = this._measureStrategy.measure();
            e.width === this.width && e.height === this.height || (this.width = e.width, this.height = e.height, this._onCharSizeChange.fire());
          }
        };
        r.CharSizeService = g = l([f(2, n.IOptionsService)], g);
        class h extends v.Disposable {
          constructor() {
            super(...arguments), this._result = { width: 0, height: 0 };
          }
          _validateAndSet(t, o) {
            t !== void 0 && t > 0 && o !== void 0 && o > 0 && (this._result.width = t, this._result.height = o);
          }
        }
        class i extends h {
          constructor(t, o, u) {
            super(), this._document = t, this._parentElement = o, this._optionsService = u, this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
          }
          measure() {
            return this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`, this._validateAndSet(Number(this._measureElement.offsetWidth) / 32, Number(this._measureElement.offsetHeight)), this._result;
          }
        }
        class s extends h {
          constructor(t) {
            super(), this._optionsService = t, this._canvas = new OffscreenCanvas(100, 100), this._ctx = this._canvas.getContext("2d");
            const o = this._ctx.measureText("W");
            if (!("width" in o && "fontBoundingBoxAscent" in o && "fontBoundingBoxDescent" in o)) throw new Error("Required font metrics not supported");
          }
          measure() {
            this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
            const t = this._ctx.measureText("W");
            return this._validateAndSet(t.width, t.fontBoundingBoxAscent + t.fontBoundingBoxDescent), this._result;
          }
        }
      }, 4269: function(O, r, a) {
        var l = this && this.__decorate || function(s, e, t, o) {
          var u, _ = arguments.length, p = _ < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, t) : o;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") p = Reflect.decorate(s, e, t, o);
          else for (var c = s.length - 1; c >= 0; c--) (u = s[c]) && (p = (_ < 3 ? u(p) : _ > 3 ? u(e, t, p) : u(e, t)) || p);
          return _ > 3 && p && Object.defineProperty(e, t, p), p;
        }, f = this && this.__param || function(s, e) {
          return function(t, o) {
            e(t, o, s);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.CharacterJoinerService = r.JoinedCellData = void 0;
        const n = a(3734), d = a(643), v = a(511), g = a(2585);
        class h extends n.AttributeData {
          constructor(e, t, o) {
            super(), this.content = 0, this.combinedData = "", this.fg = e.fg, this.bg = e.bg, this.combinedData = t, this._width = o;
          }
          isCombined() {
            return 2097152;
          }
          getWidth() {
            return this._width;
          }
          getChars() {
            return this.combinedData;
          }
          getCode() {
            return 2097151;
          }
          setFromCharData(e) {
            throw new Error("not implemented");
          }
          getAsCharData() {
            return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
          }
        }
        r.JoinedCellData = h;
        let i = r.CharacterJoinerService = class ge {
          constructor(e) {
            this._bufferService = e, this._characterJoiners = [], this._nextCharacterJoinerId = 0, this._workCell = new v.CellData();
          }
          register(e) {
            const t = { id: this._nextCharacterJoinerId++, handler: e };
            return this._characterJoiners.push(t), t.id;
          }
          deregister(e) {
            for (let t = 0; t < this._characterJoiners.length; t++) if (this._characterJoiners[t].id === e) return this._characterJoiners.splice(t, 1), true;
            return false;
          }
          getJoinedCharacters(e) {
            if (this._characterJoiners.length === 0) return [];
            const t = this._bufferService.buffer.lines.get(e);
            if (!t || t.length === 0) return [];
            const o = [], u = t.translateToString(true);
            let _ = 0, p = 0, c = 0, m = t.getFg(0), y = t.getBg(0);
            for (let k = 0; k < t.getTrimmedLength(); k++) if (t.loadCell(k, this._workCell), this._workCell.getWidth() !== 0) {
              if (this._workCell.fg !== m || this._workCell.bg !== y) {
                if (k - _ > 1) {
                  const L = this._getJoinedRanges(u, c, p, t, _);
                  for (let w = 0; w < L.length; w++) o.push(L[w]);
                }
                _ = k, c = p, m = this._workCell.fg, y = this._workCell.bg;
              }
              p += this._workCell.getChars().length || d.WHITESPACE_CELL_CHAR.length;
            }
            if (this._bufferService.cols - _ > 1) {
              const k = this._getJoinedRanges(u, c, p, t, _);
              for (let L = 0; L < k.length; L++) o.push(k[L]);
            }
            return o;
          }
          _getJoinedRanges(e, t, o, u, _) {
            const p = e.substring(t, o);
            let c = [];
            try {
              c = this._characterJoiners[0].handler(p);
            } catch (m) {
              console.error(m);
            }
            for (let m = 1; m < this._characterJoiners.length; m++) try {
              const y = this._characterJoiners[m].handler(p);
              for (let k = 0; k < y.length; k++) ge._mergeRanges(c, y[k]);
            } catch (y) {
              console.error(y);
            }
            return this._stringRangesToCellRanges(c, u, _), c;
          }
          _stringRangesToCellRanges(e, t, o) {
            let u = 0, _ = false, p = 0, c = e[u];
            if (c) {
              for (let m = o; m < this._bufferService.cols; m++) {
                const y = t.getWidth(m), k = t.getString(m).length || d.WHITESPACE_CELL_CHAR.length;
                if (y !== 0) {
                  if (!_ && c[0] <= p && (c[0] = m, _ = true), c[1] <= p) {
                    if (c[1] = m, c = e[++u], !c) break;
                    c[0] <= p ? (c[0] = m, _ = true) : _ = false;
                  }
                  p += k;
                }
              }
              c && (c[1] = this._bufferService.cols);
            }
          }
          static _mergeRanges(e, t) {
            let o = false;
            for (let u = 0; u < e.length; u++) {
              const _ = e[u];
              if (o) {
                if (t[1] <= _[0]) return e[u - 1][1] = t[1], e;
                if (t[1] <= _[1]) return e[u - 1][1] = Math.max(t[1], _[1]), e.splice(u, 1), e;
                e.splice(u, 1), u--;
              } else {
                if (t[1] <= _[0]) return e.splice(u, 0, t), e;
                if (t[1] <= _[1]) return _[0] = Math.min(t[0], _[0]), e;
                t[0] < _[1] && (_[0] = Math.min(t[0], _[0]), o = true);
              }
            }
            return o ? e[e.length - 1][1] = t[1] : e.push(t), e;
          }
        };
        r.CharacterJoinerService = i = l([f(0, g.IBufferService)], i);
      }, 5114: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.CoreBrowserService = void 0;
        const l = a(844), f = a(8460), n = a(3656);
        class d extends l.Disposable {
          constructor(h, i, s) {
            super(), this._textarea = h, this._window = i, this.mainDocument = s, this._isFocused = false, this._cachedIsFocused = void 0, this._screenDprMonitor = new v(this._window), this._onDprChange = this.register(new f.EventEmitter()), this.onDprChange = this._onDprChange.event, this._onWindowChange = this.register(new f.EventEmitter()), this.onWindowChange = this._onWindowChange.event, this.register(this.onWindowChange((e) => this._screenDprMonitor.setWindow(e))), this.register((0, f.forwardEvent)(this._screenDprMonitor.onDprChange, this._onDprChange)), this._textarea.addEventListener("focus", () => this._isFocused = true), this._textarea.addEventListener("blur", () => this._isFocused = false);
          }
          get window() {
            return this._window;
          }
          set window(h) {
            this._window !== h && (this._window = h, this._onWindowChange.fire(this._window));
          }
          get dpr() {
            return this.window.devicePixelRatio;
          }
          get isFocused() {
            return this._cachedIsFocused === void 0 && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask(() => this._cachedIsFocused = void 0)), this._cachedIsFocused;
          }
        }
        r.CoreBrowserService = d;
        class v extends l.Disposable {
          constructor(h) {
            super(), this._parentWindow = h, this._windowResizeListener = this.register(new l.MutableDisposable()), this._onDprChange = this.register(new f.EventEmitter()), this.onDprChange = this._onDprChange.event, this._outerListener = () => this._setDprAndFireIfDiffers(), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._updateDpr(), this._setWindowResizeListener(), this.register((0, l.toDisposable)(() => this.clearListener()));
          }
          setWindow(h) {
            this._parentWindow = h, this._setWindowResizeListener(), this._setDprAndFireIfDiffers();
          }
          _setWindowResizeListener() {
            this._windowResizeListener.value = (0, n.addDisposableDomListener)(this._parentWindow, "resize", () => this._setDprAndFireIfDiffers());
          }
          _setDprAndFireIfDiffers() {
            this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio && this._onDprChange.fire(this._parentWindow.devicePixelRatio), this._updateDpr();
          }
          _updateDpr() {
            var h;
            this._outerListener && ((h = this._resolutionMediaMatchList) == null || h.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
          }
          clearListener() {
            this._resolutionMediaMatchList && this._outerListener && (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._outerListener = void 0);
          }
        }
      }, 779: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.LinkProviderService = void 0;
        const l = a(844);
        class f extends l.Disposable {
          constructor() {
            super(), this.linkProviders = [], this.register((0, l.toDisposable)(() => this.linkProviders.length = 0));
          }
          registerLinkProvider(d) {
            return this.linkProviders.push(d), { dispose: () => {
              const v = this.linkProviders.indexOf(d);
              v !== -1 && this.linkProviders.splice(v, 1);
            } };
          }
        }
        r.LinkProviderService = f;
      }, 8934: function(O, r, a) {
        var l = this && this.__decorate || function(g, h, i, s) {
          var e, t = arguments.length, o = t < 3 ? h : s === null ? s = Object.getOwnPropertyDescriptor(h, i) : s;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") o = Reflect.decorate(g, h, i, s);
          else for (var u = g.length - 1; u >= 0; u--) (e = g[u]) && (o = (t < 3 ? e(o) : t > 3 ? e(h, i, o) : e(h, i)) || o);
          return t > 3 && o && Object.defineProperty(h, i, o), o;
        }, f = this && this.__param || function(g, h) {
          return function(i, s) {
            h(i, s, g);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.MouseService = void 0;
        const n = a(4725), d = a(9806);
        let v = r.MouseService = class {
          constructor(g, h) {
            this._renderService = g, this._charSizeService = h;
          }
          getCoords(g, h, i, s, e) {
            return (0, d.getCoords)(void 0, g, h, i, s, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, e);
          }
          getMouseReportCoords(g, h) {
            const i = (0, d.getCoordsRelativeToElement)(void 0, g, h);
            if (this._charSizeService.hasValidSize) return i[0] = Math.min(Math.max(i[0], 0), this._renderService.dimensions.css.canvas.width - 1), i[1] = Math.min(Math.max(i[1], 0), this._renderService.dimensions.css.canvas.height - 1), { col: Math.floor(i[0] / this._renderService.dimensions.css.cell.width), row: Math.floor(i[1] / this._renderService.dimensions.css.cell.height), x: Math.floor(i[0]), y: Math.floor(i[1]) };
          }
        };
        r.MouseService = v = l([f(0, n.IRenderService), f(1, n.ICharSizeService)], v);
      }, 3230: function(O, r, a) {
        var l = this && this.__decorate || function(e, t, o, u) {
          var _, p = arguments.length, c = p < 3 ? t : u === null ? u = Object.getOwnPropertyDescriptor(t, o) : u;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") c = Reflect.decorate(e, t, o, u);
          else for (var m = e.length - 1; m >= 0; m--) (_ = e[m]) && (c = (p < 3 ? _(c) : p > 3 ? _(t, o, c) : _(t, o)) || c);
          return p > 3 && c && Object.defineProperty(t, o, c), c;
        }, f = this && this.__param || function(e, t) {
          return function(o, u) {
            t(o, u, e);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.RenderService = void 0;
        const n = a(6193), d = a(4725), v = a(8460), g = a(844), h = a(7226), i = a(2585);
        let s = r.RenderService = class extends g.Disposable {
          get dimensions() {
            return this._renderer.value.dimensions;
          }
          constructor(e, t, o, u, _, p, c, m) {
            super(), this._rowCount = e, this._charSizeService = u, this._renderer = this.register(new g.MutableDisposable()), this._pausedResizeTask = new h.DebouncedIdleTask(), this._observerDisposable = this.register(new g.MutableDisposable()), this._isPaused = false, this._needsFullRefresh = false, this._isNextRenderRedrawOnly = true, this._needsSelectionRefresh = false, this._canvasWidth = 0, this._canvasHeight = 0, this._selectionState = { start: void 0, end: void 0, columnSelectMode: false }, this._onDimensionsChange = this.register(new v.EventEmitter()), this.onDimensionsChange = this._onDimensionsChange.event, this._onRenderedViewportChange = this.register(new v.EventEmitter()), this.onRenderedViewportChange = this._onRenderedViewportChange.event, this._onRender = this.register(new v.EventEmitter()), this.onRender = this._onRender.event, this._onRefreshRequest = this.register(new v.EventEmitter()), this.onRefreshRequest = this._onRefreshRequest.event, this._renderDebouncer = new n.RenderDebouncer((y, k) => this._renderRows(y, k), c), this.register(this._renderDebouncer), this.register(c.onDprChange(() => this.handleDevicePixelRatioChange())), this.register(p.onResize(() => this._fullRefresh())), this.register(p.buffers.onBufferActivate(() => {
              var y;
              return (y = this._renderer.value) == null ? void 0 : y.clear();
            })), this.register(o.onOptionChange(() => this._handleOptionsChanged())), this.register(this._charSizeService.onCharSizeChange(() => this.handleCharSizeChanged())), this.register(_.onDecorationRegistered(() => this._fullRefresh())), this.register(_.onDecorationRemoved(() => this._fullRefresh())), this.register(o.onMultipleOptionChange(["customGlyphs", "drawBoldTextInBrightColors", "letterSpacing", "lineHeight", "fontFamily", "fontSize", "fontWeight", "fontWeightBold", "minimumContrastRatio", "rescaleOverlappingGlyphs"], () => {
              this.clear(), this.handleResize(p.cols, p.rows), this._fullRefresh();
            })), this.register(o.onMultipleOptionChange(["cursorBlink", "cursorStyle"], () => this.refreshRows(p.buffer.y, p.buffer.y, true))), this.register(m.onChangeColors(() => this._fullRefresh())), this._registerIntersectionObserver(c.window, t), this.register(c.onWindowChange((y) => this._registerIntersectionObserver(y, t)));
          }
          _registerIntersectionObserver(e, t) {
            if ("IntersectionObserver" in e) {
              const o = new e.IntersectionObserver((u) => this._handleIntersectionChange(u[u.length - 1]), { threshold: 0 });
              o.observe(t), this._observerDisposable.value = (0, g.toDisposable)(() => o.disconnect());
            }
          }
          _handleIntersectionChange(e) {
            this._isPaused = e.isIntersecting === void 0 ? e.intersectionRatio === 0 : !e.isIntersecting, this._isPaused || this._charSizeService.hasValidSize || this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = false);
          }
          refreshRows(e, t, o = false) {
            this._isPaused ? this._needsFullRefresh = true : (o || (this._isNextRenderRedrawOnly = false), this._renderDebouncer.refresh(e, t, this._rowCount));
          }
          _renderRows(e, t) {
            this._renderer.value && (e = Math.min(e, this._rowCount - 1), t = Math.min(t, this._rowCount - 1), this._renderer.value.renderRows(e, t), this._needsSelectionRefresh && (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = false), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({ start: e, end: t }), this._onRender.fire({ start: e, end: t }), this._isNextRenderRedrawOnly = true);
          }
          resize(e, t) {
            this._rowCount = t, this._fireOnCanvasResize();
          }
          _handleOptionsChanged() {
            this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
          }
          _fireOnCanvasResize() {
            this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
          }
          hasRenderer() {
            return !!this._renderer.value;
          }
          setRenderer(e) {
            this._renderer.value = e, this._renderer.value && (this._renderer.value.onRequestRedraw((t) => this.refreshRows(t.start, t.end, true)), this._needsSelectionRefresh = true, this._fullRefresh());
          }
          addRefreshCallback(e) {
            return this._renderDebouncer.addRefreshCallback(e);
          }
          _fullRefresh() {
            this._isPaused ? this._needsFullRefresh = true : this.refreshRows(0, this._rowCount - 1);
          }
          clearTextureAtlas() {
            var e, t;
            this._renderer.value && ((t = (e = this._renderer.value).clearTextureAtlas) == null || t.call(e), this._fullRefresh());
          }
          handleDevicePixelRatioChange() {
            this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
          }
          handleResize(e, t) {
            this._renderer.value && (this._isPaused ? this._pausedResizeTask.set(() => {
              var o;
              return (o = this._renderer.value) == null ? void 0 : o.handleResize(e, t);
            }) : this._renderer.value.handleResize(e, t), this._fullRefresh());
          }
          handleCharSizeChanged() {
            var e;
            (e = this._renderer.value) == null || e.handleCharSizeChanged();
          }
          handleBlur() {
            var e;
            (e = this._renderer.value) == null || e.handleBlur();
          }
          handleFocus() {
            var e;
            (e = this._renderer.value) == null || e.handleFocus();
          }
          handleSelectionChanged(e, t, o) {
            var u;
            this._selectionState.start = e, this._selectionState.end = t, this._selectionState.columnSelectMode = o, (u = this._renderer.value) == null || u.handleSelectionChanged(e, t, o);
          }
          handleCursorMove() {
            var e;
            (e = this._renderer.value) == null || e.handleCursorMove();
          }
          clear() {
            var e;
            (e = this._renderer.value) == null || e.clear();
          }
        };
        r.RenderService = s = l([f(2, i.IOptionsService), f(3, d.ICharSizeService), f(4, i.IDecorationService), f(5, i.IBufferService), f(6, d.ICoreBrowserService), f(7, d.IThemeService)], s);
      }, 9312: function(O, r, a) {
        var l = this && this.__decorate || function(c, m, y, k) {
          var L, w = arguments.length, x = w < 3 ? m : k === null ? k = Object.getOwnPropertyDescriptor(m, y) : k;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") x = Reflect.decorate(c, m, y, k);
          else for (var B = c.length - 1; B >= 0; B--) (L = c[B]) && (x = (w < 3 ? L(x) : w > 3 ? L(m, y, x) : L(m, y)) || x);
          return w > 3 && x && Object.defineProperty(m, y, x), x;
        }, f = this && this.__param || function(c, m) {
          return function(y, k) {
            m(y, k, c);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.SelectionService = void 0;
        const n = a(9806), d = a(9504), v = a(456), g = a(4725), h = a(8460), i = a(844), s = a(6114), e = a(4841), t = a(511), o = a(2585), u = "\xA0", _ = new RegExp(u, "g");
        let p = r.SelectionService = class extends i.Disposable {
          constructor(c, m, y, k, L, w, x, B, P) {
            super(), this._element = c, this._screenElement = m, this._linkifier = y, this._bufferService = k, this._coreService = L, this._mouseService = w, this._optionsService = x, this._renderService = B, this._coreBrowserService = P, this._dragScrollAmount = 0, this._enabled = true, this._workCell = new t.CellData(), this._mouseDownTimeStamp = 0, this._oldHasSelection = false, this._oldSelectionStart = void 0, this._oldSelectionEnd = void 0, this._onLinuxMouseSelection = this.register(new h.EventEmitter()), this.onLinuxMouseSelection = this._onLinuxMouseSelection.event, this._onRedrawRequest = this.register(new h.EventEmitter()), this.onRequestRedraw = this._onRedrawRequest.event, this._onSelectionChange = this.register(new h.EventEmitter()), this.onSelectionChange = this._onSelectionChange.event, this._onRequestScrollLines = this.register(new h.EventEmitter()), this.onRequestScrollLines = this._onRequestScrollLines.event, this._mouseMoveListener = (U) => this._handleMouseMove(U), this._mouseUpListener = (U) => this._handleMouseUp(U), this._coreService.onUserInput(() => {
              this.hasSelection && this.clearSelection();
            }), this._trimListener = this._bufferService.buffer.lines.onTrim((U) => this._handleTrim(U)), this.register(this._bufferService.buffers.onBufferActivate((U) => this._handleBufferActivate(U))), this.enable(), this._model = new v.SelectionModel(this._bufferService), this._activeSelectionMode = 0, this.register((0, i.toDisposable)(() => {
              this._removeMouseDownListeners();
            }));
          }
          reset() {
            this.clearSelection();
          }
          disable() {
            this.clearSelection(), this._enabled = false;
          }
          enable() {
            this._enabled = true;
          }
          get selectionStart() {
            return this._model.finalSelectionStart;
          }
          get selectionEnd() {
            return this._model.finalSelectionEnd;
          }
          get hasSelection() {
            const c = this._model.finalSelectionStart, m = this._model.finalSelectionEnd;
            return !(!c || !m || c[0] === m[0] && c[1] === m[1]);
          }
          get selectionText() {
            const c = this._model.finalSelectionStart, m = this._model.finalSelectionEnd;
            if (!c || !m) return "";
            const y = this._bufferService.buffer, k = [];
            if (this._activeSelectionMode === 3) {
              if (c[0] === m[0]) return "";
              const L = c[0] < m[0] ? c[0] : m[0], w = c[0] < m[0] ? m[0] : c[0];
              for (let x = c[1]; x <= m[1]; x++) {
                const B = y.translateBufferLineToString(x, true, L, w);
                k.push(B);
              }
            } else {
              const L = c[1] === m[1] ? m[0] : void 0;
              k.push(y.translateBufferLineToString(c[1], true, c[0], L));
              for (let w = c[1] + 1; w <= m[1] - 1; w++) {
                const x = y.lines.get(w), B = y.translateBufferLineToString(w, true);
                x != null && x.isWrapped ? k[k.length - 1] += B : k.push(B);
              }
              if (c[1] !== m[1]) {
                const w = y.lines.get(m[1]), x = y.translateBufferLineToString(m[1], true, 0, m[0]);
                w && w.isWrapped ? k[k.length - 1] += x : k.push(x);
              }
            }
            return k.map((L) => L.replace(_, " ")).join(s.isWindows ? `\r
` : `
`);
          }
          clearSelection() {
            this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
          }
          refresh(c) {
            this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._refresh())), s.isLinux && c && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
          }
          _refresh() {
            this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({ start: this._model.finalSelectionStart, end: this._model.finalSelectionEnd, columnSelectMode: this._activeSelectionMode === 3 });
          }
          _isClickInSelection(c) {
            const m = this._getMouseBufferCoords(c), y = this._model.finalSelectionStart, k = this._model.finalSelectionEnd;
            return !!(y && k && m) && this._areCoordsInSelection(m, y, k);
          }
          isCellInSelection(c, m) {
            const y = this._model.finalSelectionStart, k = this._model.finalSelectionEnd;
            return !(!y || !k) && this._areCoordsInSelection([c, m], y, k);
          }
          _areCoordsInSelection(c, m, y) {
            return c[1] > m[1] && c[1] < y[1] || m[1] === y[1] && c[1] === m[1] && c[0] >= m[0] && c[0] < y[0] || m[1] < y[1] && c[1] === y[1] && c[0] < y[0] || m[1] < y[1] && c[1] === m[1] && c[0] >= m[0];
          }
          _selectWordAtCursor(c, m) {
            var L, w;
            const y = (w = (L = this._linkifier.currentLink) == null ? void 0 : L.link) == null ? void 0 : w.range;
            if (y) return this._model.selectionStart = [y.start.x - 1, y.start.y - 1], this._model.selectionStartLength = (0, e.getRangeLength)(y, this._bufferService.cols), this._model.selectionEnd = void 0, true;
            const k = this._getMouseBufferCoords(c);
            return !!k && (this._selectWordAt(k, m), this._model.selectionEnd = void 0, true);
          }
          selectAll() {
            this._model.isSelectAllActive = true, this.refresh(), this._onSelectionChange.fire();
          }
          selectLines(c, m) {
            this._model.clearSelection(), c = Math.max(c, 0), m = Math.min(m, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, c], this._model.selectionEnd = [this._bufferService.cols, m], this.refresh(), this._onSelectionChange.fire();
          }
          _handleTrim(c) {
            this._model.handleTrim(c) && this.refresh();
          }
          _getMouseBufferCoords(c) {
            const m = this._mouseService.getCoords(c, this._screenElement, this._bufferService.cols, this._bufferService.rows, true);
            if (m) return m[0]--, m[1]--, m[1] += this._bufferService.buffer.ydisp, m;
          }
          _getMouseEventScrollAmount(c) {
            let m = (0, n.getCoordsRelativeToElement)(this._coreBrowserService.window, c, this._screenElement)[1];
            const y = this._renderService.dimensions.css.canvas.height;
            return m >= 0 && m <= y ? 0 : (m > y && (m -= y), m = Math.min(Math.max(m, -50), 50), m /= 50, m / Math.abs(m) + Math.round(14 * m));
          }
          shouldForceSelection(c) {
            return s.isMac ? c.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : c.shiftKey;
          }
          handleMouseDown(c) {
            if (this._mouseDownTimeStamp = c.timeStamp, (c.button !== 2 || !this.hasSelection) && c.button === 0) {
              if (!this._enabled) {
                if (!this.shouldForceSelection(c)) return;
                c.stopPropagation();
              }
              c.preventDefault(), this._dragScrollAmount = 0, this._enabled && c.shiftKey ? this._handleIncrementalClick(c) : c.detail === 1 ? this._handleSingleClick(c) : c.detail === 2 ? this._handleDoubleClick(c) : c.detail === 3 && this._handleTripleClick(c), this._addMouseDownListeners(), this.refresh(true);
            }
          }
          _addMouseDownListeners() {
            this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(() => this._dragScroll(), 50);
          }
          _removeMouseDownListeners() {
            this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
          }
          _handleIncrementalClick(c) {
            this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(c));
          }
          _handleSingleClick(c) {
            if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = false, this._activeSelectionMode = this.shouldColumnSelect(c) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(c), !this._model.selectionStart) return;
            this._model.selectionEnd = void 0;
            const m = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
            m && m.length !== this._model.selectionStart[0] && m.hasWidth(this._model.selectionStart[0]) === 0 && this._model.selectionStart[0]++;
          }
          _handleDoubleClick(c) {
            this._selectWordAtCursor(c, true) && (this._activeSelectionMode = 1);
          }
          _handleTripleClick(c) {
            const m = this._getMouseBufferCoords(c);
            m && (this._activeSelectionMode = 2, this._selectLineAt(m[1]));
          }
          shouldColumnSelect(c) {
            return c.altKey && !(s.isMac && this._optionsService.rawOptions.macOptionClickForcesSelection);
          }
          _handleMouseMove(c) {
            if (c.stopImmediatePropagation(), !this._model.selectionStart) return;
            const m = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
            if (this._model.selectionEnd = this._getMouseBufferCoords(c), !this._model.selectionEnd) return void this.refresh(true);
            this._activeSelectionMode === 2 ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : this._activeSelectionMode === 1 && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(c), this._activeSelectionMode !== 3 && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
            const y = this._bufferService.buffer;
            if (this._model.selectionEnd[1] < y.lines.length) {
              const k = y.lines.get(this._model.selectionEnd[1]);
              k && k.hasWidth(this._model.selectionEnd[0]) === 0 && this._model.selectionEnd[0] < this._bufferService.cols && this._model.selectionEnd[0]++;
            }
            m && m[0] === this._model.selectionEnd[0] && m[1] === this._model.selectionEnd[1] || this.refresh(true);
          }
          _dragScroll() {
            if (this._model.selectionEnd && this._model.selectionStart && this._dragScrollAmount) {
              this._onRequestScrollLines.fire({ amount: this._dragScrollAmount, suppressScrollEvent: false });
              const c = this._bufferService.buffer;
              this._dragScrollAmount > 0 ? (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(c.ydisp + this._bufferService.rows, c.lines.length - 1)) : (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = c.ydisp), this.refresh();
            }
          }
          _handleMouseUp(c) {
            const m = c.timeStamp - this._mouseDownTimeStamp;
            if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && m < 500 && c.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
              if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
                const y = this._mouseService.getCoords(c, this._element, this._bufferService.cols, this._bufferService.rows, false);
                if (y && y[0] !== void 0 && y[1] !== void 0) {
                  const k = (0, d.moveToCellSequence)(y[0] - 1, y[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
                  this._coreService.triggerDataEvent(k, true);
                }
              }
            } else this._fireEventIfSelectionChanged();
          }
          _fireEventIfSelectionChanged() {
            const c = this._model.finalSelectionStart, m = this._model.finalSelectionEnd, y = !(!c || !m || c[0] === m[0] && c[1] === m[1]);
            y ? c && m && (this._oldSelectionStart && this._oldSelectionEnd && c[0] === this._oldSelectionStart[0] && c[1] === this._oldSelectionStart[1] && m[0] === this._oldSelectionEnd[0] && m[1] === this._oldSelectionEnd[1] || this._fireOnSelectionChange(c, m, y)) : this._oldHasSelection && this._fireOnSelectionChange(c, m, y);
          }
          _fireOnSelectionChange(c, m, y) {
            this._oldSelectionStart = c, this._oldSelectionEnd = m, this._oldHasSelection = y, this._onSelectionChange.fire();
          }
          _handleBufferActivate(c) {
            this.clearSelection(), this._trimListener.dispose(), this._trimListener = c.activeBuffer.lines.onTrim((m) => this._handleTrim(m));
          }
          _convertViewportColToCharacterIndex(c, m) {
            let y = m;
            for (let k = 0; m >= k; k++) {
              const L = c.loadCell(k, this._workCell).getChars().length;
              this._workCell.getWidth() === 0 ? y-- : L > 1 && m !== k && (y += L - 1);
            }
            return y;
          }
          setSelection(c, m, y) {
            this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [c, m], this._model.selectionStartLength = y, this.refresh(), this._fireEventIfSelectionChanged();
          }
          rightClickSelect(c) {
            this._isClickInSelection(c) || (this._selectWordAtCursor(c, false) && this.refresh(true), this._fireEventIfSelectionChanged());
          }
          _getWordAt(c, m, y = true, k = true) {
            if (c[0] >= this._bufferService.cols) return;
            const L = this._bufferService.buffer, w = L.lines.get(c[1]);
            if (!w) return;
            const x = L.translateBufferLineToString(c[1], false);
            let B = this._convertViewportColToCharacterIndex(w, c[0]), P = B;
            const U = c[0] - B;
            let I = 0, S = 0, b = 0, E = 0;
            if (x.charAt(B) === " ") {
              for (; B > 0 && x.charAt(B - 1) === " "; ) B--;
              for (; P < x.length && x.charAt(P + 1) === " "; ) P++;
            } else {
              let H = c[0], N = c[0];
              w.getWidth(H) === 0 && (I++, H--), w.getWidth(N) === 2 && (S++, N++);
              const $ = w.getString(N).length;
              for ($ > 1 && (E += $ - 1, P += $ - 1); H > 0 && B > 0 && !this._isCharWordSeparator(w.loadCell(H - 1, this._workCell)); ) {
                w.loadCell(H - 1, this._workCell);
                const R = this._workCell.getChars().length;
                this._workCell.getWidth() === 0 ? (I++, H--) : R > 1 && (b += R - 1, B -= R - 1), B--, H--;
              }
              for (; N < w.length && P + 1 < x.length && !this._isCharWordSeparator(w.loadCell(N + 1, this._workCell)); ) {
                w.loadCell(N + 1, this._workCell);
                const R = this._workCell.getChars().length;
                this._workCell.getWidth() === 2 ? (S++, N++) : R > 1 && (E += R - 1, P += R - 1), P++, N++;
              }
            }
            P++;
            let D = B + U - I + b, T = Math.min(this._bufferService.cols, P - B + I + S - b - E);
            if (m || x.slice(B, P).trim() !== "") {
              if (y && D === 0 && w.getCodePoint(0) !== 32) {
                const H = L.lines.get(c[1] - 1);
                if (H && w.isWrapped && H.getCodePoint(this._bufferService.cols - 1) !== 32) {
                  const N = this._getWordAt([this._bufferService.cols - 1, c[1] - 1], false, true, false);
                  if (N) {
                    const $ = this._bufferService.cols - N.start;
                    D -= $, T += $;
                  }
                }
              }
              if (k && D + T === this._bufferService.cols && w.getCodePoint(this._bufferService.cols - 1) !== 32) {
                const H = L.lines.get(c[1] + 1);
                if (H != null && H.isWrapped && H.getCodePoint(0) !== 32) {
                  const N = this._getWordAt([0, c[1] + 1], false, false, true);
                  N && (T += N.length);
                }
              }
              return { start: D, length: T };
            }
          }
          _selectWordAt(c, m) {
            const y = this._getWordAt(c, m);
            if (y) {
              for (; y.start < 0; ) y.start += this._bufferService.cols, c[1]--;
              this._model.selectionStart = [y.start, c[1]], this._model.selectionStartLength = y.length;
            }
          }
          _selectToWordAt(c) {
            const m = this._getWordAt(c, true);
            if (m) {
              let y = c[1];
              for (; m.start < 0; ) m.start += this._bufferService.cols, y--;
              if (!this._model.areSelectionValuesReversed()) for (; m.start + m.length > this._bufferService.cols; ) m.length -= this._bufferService.cols, y++;
              this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? m.start : m.start + m.length, y];
            }
          }
          _isCharWordSeparator(c) {
            return c.getWidth() !== 0 && this._optionsService.rawOptions.wordSeparator.indexOf(c.getChars()) >= 0;
          }
          _selectLineAt(c) {
            const m = this._bufferService.buffer.getWrappedRangeForLine(c), y = { start: { x: 0, y: m.first }, end: { x: this._bufferService.cols - 1, y: m.last } };
            this._model.selectionStart = [0, m.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = (0, e.getRangeLength)(y, this._bufferService.cols);
          }
        };
        r.SelectionService = p = l([f(3, o.IBufferService), f(4, o.ICoreService), f(5, g.IMouseService), f(6, o.IOptionsService), f(7, g.IRenderService), f(8, g.ICoreBrowserService)], p);
      }, 4725: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.ILinkProviderService = r.IThemeService = r.ICharacterJoinerService = r.ISelectionService = r.IRenderService = r.IMouseService = r.ICoreBrowserService = r.ICharSizeService = void 0;
        const l = a(8343);
        r.ICharSizeService = (0, l.createDecorator)("CharSizeService"), r.ICoreBrowserService = (0, l.createDecorator)("CoreBrowserService"), r.IMouseService = (0, l.createDecorator)("MouseService"), r.IRenderService = (0, l.createDecorator)("RenderService"), r.ISelectionService = (0, l.createDecorator)("SelectionService"), r.ICharacterJoinerService = (0, l.createDecorator)("CharacterJoinerService"), r.IThemeService = (0, l.createDecorator)("ThemeService"), r.ILinkProviderService = (0, l.createDecorator)("LinkProviderService");
      }, 6731: function(O, r, a) {
        var l = this && this.__decorate || function(p, c, m, y) {
          var k, L = arguments.length, w = L < 3 ? c : y === null ? y = Object.getOwnPropertyDescriptor(c, m) : y;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") w = Reflect.decorate(p, c, m, y);
          else for (var x = p.length - 1; x >= 0; x--) (k = p[x]) && (w = (L < 3 ? k(w) : L > 3 ? k(c, m, w) : k(c, m)) || w);
          return L > 3 && w && Object.defineProperty(c, m, w), w;
        }, f = this && this.__param || function(p, c) {
          return function(m, y) {
            c(m, y, p);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.ThemeService = r.DEFAULT_ANSI_COLORS = void 0;
        const n = a(7239), d = a(8055), v = a(8460), g = a(844), h = a(2585), i = d.css.toColor("#ffffff"), s = d.css.toColor("#000000"), e = d.css.toColor("#ffffff"), t = d.css.toColor("#000000"), o = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967117 };
        r.DEFAULT_ANSI_COLORS = Object.freeze((() => {
          const p = [d.css.toColor("#2e3436"), d.css.toColor("#cc0000"), d.css.toColor("#4e9a06"), d.css.toColor("#c4a000"), d.css.toColor("#3465a4"), d.css.toColor("#75507b"), d.css.toColor("#06989a"), d.css.toColor("#d3d7cf"), d.css.toColor("#555753"), d.css.toColor("#ef2929"), d.css.toColor("#8ae234"), d.css.toColor("#fce94f"), d.css.toColor("#729fcf"), d.css.toColor("#ad7fa8"), d.css.toColor("#34e2e2"), d.css.toColor("#eeeeec")], c = [0, 95, 135, 175, 215, 255];
          for (let m = 0; m < 216; m++) {
            const y = c[m / 36 % 6 | 0], k = c[m / 6 % 6 | 0], L = c[m % 6];
            p.push({ css: d.channels.toCss(y, k, L), rgba: d.channels.toRgba(y, k, L) });
          }
          for (let m = 0; m < 24; m++) {
            const y = 8 + 10 * m;
            p.push({ css: d.channels.toCss(y, y, y), rgba: d.channels.toRgba(y, y, y) });
          }
          return p;
        })());
        let u = r.ThemeService = class extends g.Disposable {
          get colors() {
            return this._colors;
          }
          constructor(p) {
            super(), this._optionsService = p, this._contrastCache = new n.ColorContrastCache(), this._halfContrastCache = new n.ColorContrastCache(), this._onChangeColors = this.register(new v.EventEmitter()), this.onChangeColors = this._onChangeColors.event, this._colors = { foreground: i, background: s, cursor: e, cursorAccent: t, selectionForeground: void 0, selectionBackgroundTransparent: o, selectionBackgroundOpaque: d.color.blend(s, o), selectionInactiveBackgroundTransparent: o, selectionInactiveBackgroundOpaque: d.color.blend(s, o), ansi: r.DEFAULT_ANSI_COLORS.slice(), contrastCache: this._contrastCache, halfContrastCache: this._halfContrastCache }, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this.register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", () => this._contrastCache.clear())), this.register(this._optionsService.onSpecificOptionChange("theme", () => this._setTheme(this._optionsService.rawOptions.theme)));
          }
          _setTheme(p = {}) {
            const c = this._colors;
            if (c.foreground = _(p.foreground, i), c.background = _(p.background, s), c.cursor = _(p.cursor, e), c.cursorAccent = _(p.cursorAccent, t), c.selectionBackgroundTransparent = _(p.selectionBackground, o), c.selectionBackgroundOpaque = d.color.blend(c.background, c.selectionBackgroundTransparent), c.selectionInactiveBackgroundTransparent = _(p.selectionInactiveBackground, c.selectionBackgroundTransparent), c.selectionInactiveBackgroundOpaque = d.color.blend(c.background, c.selectionInactiveBackgroundTransparent), c.selectionForeground = p.selectionForeground ? _(p.selectionForeground, d.NULL_COLOR) : void 0, c.selectionForeground === d.NULL_COLOR && (c.selectionForeground = void 0), d.color.isOpaque(c.selectionBackgroundTransparent) && (c.selectionBackgroundTransparent = d.color.opacity(c.selectionBackgroundTransparent, 0.3)), d.color.isOpaque(c.selectionInactiveBackgroundTransparent) && (c.selectionInactiveBackgroundTransparent = d.color.opacity(c.selectionInactiveBackgroundTransparent, 0.3)), c.ansi = r.DEFAULT_ANSI_COLORS.slice(), c.ansi[0] = _(p.black, r.DEFAULT_ANSI_COLORS[0]), c.ansi[1] = _(p.red, r.DEFAULT_ANSI_COLORS[1]), c.ansi[2] = _(p.green, r.DEFAULT_ANSI_COLORS[2]), c.ansi[3] = _(p.yellow, r.DEFAULT_ANSI_COLORS[3]), c.ansi[4] = _(p.blue, r.DEFAULT_ANSI_COLORS[4]), c.ansi[5] = _(p.magenta, r.DEFAULT_ANSI_COLORS[5]), c.ansi[6] = _(p.cyan, r.DEFAULT_ANSI_COLORS[6]), c.ansi[7] = _(p.white, r.DEFAULT_ANSI_COLORS[7]), c.ansi[8] = _(p.brightBlack, r.DEFAULT_ANSI_COLORS[8]), c.ansi[9] = _(p.brightRed, r.DEFAULT_ANSI_COLORS[9]), c.ansi[10] = _(p.brightGreen, r.DEFAULT_ANSI_COLORS[10]), c.ansi[11] = _(p.brightYellow, r.DEFAULT_ANSI_COLORS[11]), c.ansi[12] = _(p.brightBlue, r.DEFAULT_ANSI_COLORS[12]), c.ansi[13] = _(p.brightMagenta, r.DEFAULT_ANSI_COLORS[13]), c.ansi[14] = _(p.brightCyan, r.DEFAULT_ANSI_COLORS[14]), c.ansi[15] = _(p.brightWhite, r.DEFAULT_ANSI_COLORS[15]), p.extendedAnsi) {
              const m = Math.min(c.ansi.length - 16, p.extendedAnsi.length);
              for (let y = 0; y < m; y++) c.ansi[y + 16] = _(p.extendedAnsi[y], r.DEFAULT_ANSI_COLORS[y + 16]);
            }
            this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
          }
          restoreColor(p) {
            this._restoreColor(p), this._onChangeColors.fire(this.colors);
          }
          _restoreColor(p) {
            if (p !== void 0) switch (p) {
              case 256:
                this._colors.foreground = this._restoreColors.foreground;
                break;
              case 257:
                this._colors.background = this._restoreColors.background;
                break;
              case 258:
                this._colors.cursor = this._restoreColors.cursor;
                break;
              default:
                this._colors.ansi[p] = this._restoreColors.ansi[p];
            }
            else for (let c = 0; c < this._restoreColors.ansi.length; ++c) this._colors.ansi[c] = this._restoreColors.ansi[c];
          }
          modifyColors(p) {
            p(this._colors), this._onChangeColors.fire(this.colors);
          }
          _updateRestoreColors() {
            this._restoreColors = { foreground: this._colors.foreground, background: this._colors.background, cursor: this._colors.cursor, ansi: this._colors.ansi.slice() };
          }
        };
        function _(p, c) {
          if (p !== void 0) try {
            return d.css.toColor(p);
          } catch {
          }
          return c;
        }
        r.ThemeService = u = l([f(0, h.IOptionsService)], u);
      }, 6349: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.CircularList = void 0;
        const l = a(8460), f = a(844);
        class n extends f.Disposable {
          constructor(v) {
            super(), this._maxLength = v, this.onDeleteEmitter = this.register(new l.EventEmitter()), this.onDelete = this.onDeleteEmitter.event, this.onInsertEmitter = this.register(new l.EventEmitter()), this.onInsert = this.onInsertEmitter.event, this.onTrimEmitter = this.register(new l.EventEmitter()), this.onTrim = this.onTrimEmitter.event, this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
          }
          get maxLength() {
            return this._maxLength;
          }
          set maxLength(v) {
            if (this._maxLength === v) return;
            const g = new Array(v);
            for (let h = 0; h < Math.min(v, this.length); h++) g[h] = this._array[this._getCyclicIndex(h)];
            this._array = g, this._maxLength = v, this._startIndex = 0;
          }
          get length() {
            return this._length;
          }
          set length(v) {
            if (v > this._length) for (let g = this._length; g < v; g++) this._array[g] = void 0;
            this._length = v;
          }
          get(v) {
            return this._array[this._getCyclicIndex(v)];
          }
          set(v, g) {
            this._array[this._getCyclicIndex(v)] = g;
          }
          push(v) {
            this._array[this._getCyclicIndex(this._length)] = v, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
          }
          recycle() {
            if (this._length !== this._maxLength) throw new Error("Can only recycle when the buffer is full");
            return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
          }
          get isFull() {
            return this._length === this._maxLength;
          }
          pop() {
            return this._array[this._getCyclicIndex(this._length-- - 1)];
          }
          splice(v, g, ...h) {
            if (g) {
              for (let i = v; i < this._length - g; i++) this._array[this._getCyclicIndex(i)] = this._array[this._getCyclicIndex(i + g)];
              this._length -= g, this.onDeleteEmitter.fire({ index: v, amount: g });
            }
            for (let i = this._length - 1; i >= v; i--) this._array[this._getCyclicIndex(i + h.length)] = this._array[this._getCyclicIndex(i)];
            for (let i = 0; i < h.length; i++) this._array[this._getCyclicIndex(v + i)] = h[i];
            if (h.length && this.onInsertEmitter.fire({ index: v, amount: h.length }), this._length + h.length > this._maxLength) {
              const i = this._length + h.length - this._maxLength;
              this._startIndex += i, this._length = this._maxLength, this.onTrimEmitter.fire(i);
            } else this._length += h.length;
          }
          trimStart(v) {
            v > this._length && (v = this._length), this._startIndex += v, this._length -= v, this.onTrimEmitter.fire(v);
          }
          shiftElements(v, g, h) {
            if (!(g <= 0)) {
              if (v < 0 || v >= this._length) throw new Error("start argument out of range");
              if (v + h < 0) throw new Error("Cannot shift elements in list beyond index 0");
              if (h > 0) {
                for (let s = g - 1; s >= 0; s--) this.set(v + s + h, this.get(v + s));
                const i = v + g + h - this._length;
                if (i > 0) for (this._length += i; this._length > this._maxLength; ) this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
              } else for (let i = 0; i < g; i++) this.set(v + i + h, this.get(v + i));
            }
          }
          _getCyclicIndex(v) {
            return (this._startIndex + v) % this._maxLength;
          }
        }
        r.CircularList = n;
      }, 1439: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.clone = void 0, r.clone = function a(l, f = 5) {
          if (typeof l != "object") return l;
          const n = Array.isArray(l) ? [] : {};
          for (const d in l) n[d] = f <= 1 ? l[d] : l[d] && a(l[d], f - 1);
          return n;
        };
      }, 8055: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.contrastRatio = r.toPaddedHex = r.rgba = r.rgb = r.css = r.color = r.channels = r.NULL_COLOR = void 0;
        let a = 0, l = 0, f = 0, n = 0;
        var d, v, g, h, i;
        function s(t) {
          const o = t.toString(16);
          return o.length < 2 ? "0" + o : o;
        }
        function e(t, o) {
          return t < o ? (o + 0.05) / (t + 0.05) : (t + 0.05) / (o + 0.05);
        }
        r.NULL_COLOR = { css: "#00000000", rgba: 0 }, function(t) {
          t.toCss = function(o, u, _, p) {
            return p !== void 0 ? `#${s(o)}${s(u)}${s(_)}${s(p)}` : `#${s(o)}${s(u)}${s(_)}`;
          }, t.toRgba = function(o, u, _, p = 255) {
            return (o << 24 | u << 16 | _ << 8 | p) >>> 0;
          }, t.toColor = function(o, u, _, p) {
            return { css: t.toCss(o, u, _, p), rgba: t.toRgba(o, u, _, p) };
          };
        }(d || (r.channels = d = {})), function(t) {
          function o(u, _) {
            return n = Math.round(255 * _), [a, l, f] = i.toChannels(u.rgba), { css: d.toCss(a, l, f, n), rgba: d.toRgba(a, l, f, n) };
          }
          t.blend = function(u, _) {
            if (n = (255 & _.rgba) / 255, n === 1) return { css: _.css, rgba: _.rgba };
            const p = _.rgba >> 24 & 255, c = _.rgba >> 16 & 255, m = _.rgba >> 8 & 255, y = u.rgba >> 24 & 255, k = u.rgba >> 16 & 255, L = u.rgba >> 8 & 255;
            return a = y + Math.round((p - y) * n), l = k + Math.round((c - k) * n), f = L + Math.round((m - L) * n), { css: d.toCss(a, l, f), rgba: d.toRgba(a, l, f) };
          }, t.isOpaque = function(u) {
            return (255 & u.rgba) == 255;
          }, t.ensureContrastRatio = function(u, _, p) {
            const c = i.ensureContrastRatio(u.rgba, _.rgba, p);
            if (c) return d.toColor(c >> 24 & 255, c >> 16 & 255, c >> 8 & 255);
          }, t.opaque = function(u) {
            const _ = (255 | u.rgba) >>> 0;
            return [a, l, f] = i.toChannels(_), { css: d.toCss(a, l, f), rgba: _ };
          }, t.opacity = o, t.multiplyOpacity = function(u, _) {
            return n = 255 & u.rgba, o(u, n * _ / 255);
          }, t.toColorRGB = function(u) {
            return [u.rgba >> 24 & 255, u.rgba >> 16 & 255, u.rgba >> 8 & 255];
          };
        }(v || (r.color = v = {})), function(t) {
          let o, u;
          try {
            const _ = (void 0).createElement("canvas");
            _.width = 1, _.height = 1;
            const p = _.getContext("2d", { willReadFrequently: true });
            p && (o = p, o.globalCompositeOperation = "copy", u = o.createLinearGradient(0, 0, 1, 1));
          } catch {
          }
          t.toColor = function(_) {
            if (_.match(/#[\da-f]{3,8}/i)) switch (_.length) {
              case 4:
                return a = parseInt(_.slice(1, 2).repeat(2), 16), l = parseInt(_.slice(2, 3).repeat(2), 16), f = parseInt(_.slice(3, 4).repeat(2), 16), d.toColor(a, l, f);
              case 5:
                return a = parseInt(_.slice(1, 2).repeat(2), 16), l = parseInt(_.slice(2, 3).repeat(2), 16), f = parseInt(_.slice(3, 4).repeat(2), 16), n = parseInt(_.slice(4, 5).repeat(2), 16), d.toColor(a, l, f, n);
              case 7:
                return { css: _, rgba: (parseInt(_.slice(1), 16) << 8 | 255) >>> 0 };
              case 9:
                return { css: _, rgba: parseInt(_.slice(1), 16) >>> 0 };
            }
            const p = _.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
            if (p) return a = parseInt(p[1]), l = parseInt(p[2]), f = parseInt(p[3]), n = Math.round(255 * (p[5] === void 0 ? 1 : parseFloat(p[5]))), d.toColor(a, l, f, n);
            if (!o || !u) throw new Error("css.toColor: Unsupported css format");
            if (o.fillStyle = u, o.fillStyle = _, typeof o.fillStyle != "string") throw new Error("css.toColor: Unsupported css format");
            if (o.fillRect(0, 0, 1, 1), [a, l, f, n] = o.getImageData(0, 0, 1, 1).data, n !== 255) throw new Error("css.toColor: Unsupported css format");
            return { rgba: d.toRgba(a, l, f, n), css: _ };
          };
        }(g || (r.css = g = {})), function(t) {
          function o(u, _, p) {
            const c = u / 255, m = _ / 255, y = p / 255;
            return 0.2126 * (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)) + 0.7152 * (m <= 0.03928 ? m / 12.92 : Math.pow((m + 0.055) / 1.055, 2.4)) + 0.0722 * (y <= 0.03928 ? y / 12.92 : Math.pow((y + 0.055) / 1.055, 2.4));
          }
          t.relativeLuminance = function(u) {
            return o(u >> 16 & 255, u >> 8 & 255, 255 & u);
          }, t.relativeLuminance2 = o;
        }(h || (r.rgb = h = {})), function(t) {
          function o(_, p, c) {
            const m = _ >> 24 & 255, y = _ >> 16 & 255, k = _ >> 8 & 255;
            let L = p >> 24 & 255, w = p >> 16 & 255, x = p >> 8 & 255, B = e(h.relativeLuminance2(L, w, x), h.relativeLuminance2(m, y, k));
            for (; B < c && (L > 0 || w > 0 || x > 0); ) L -= Math.max(0, Math.ceil(0.1 * L)), w -= Math.max(0, Math.ceil(0.1 * w)), x -= Math.max(0, Math.ceil(0.1 * x)), B = e(h.relativeLuminance2(L, w, x), h.relativeLuminance2(m, y, k));
            return (L << 24 | w << 16 | x << 8 | 255) >>> 0;
          }
          function u(_, p, c) {
            const m = _ >> 24 & 255, y = _ >> 16 & 255, k = _ >> 8 & 255;
            let L = p >> 24 & 255, w = p >> 16 & 255, x = p >> 8 & 255, B = e(h.relativeLuminance2(L, w, x), h.relativeLuminance2(m, y, k));
            for (; B < c && (L < 255 || w < 255 || x < 255); ) L = Math.min(255, L + Math.ceil(0.1 * (255 - L))), w = Math.min(255, w + Math.ceil(0.1 * (255 - w))), x = Math.min(255, x + Math.ceil(0.1 * (255 - x))), B = e(h.relativeLuminance2(L, w, x), h.relativeLuminance2(m, y, k));
            return (L << 24 | w << 16 | x << 8 | 255) >>> 0;
          }
          t.blend = function(_, p) {
            if (n = (255 & p) / 255, n === 1) return p;
            const c = p >> 24 & 255, m = p >> 16 & 255, y = p >> 8 & 255, k = _ >> 24 & 255, L = _ >> 16 & 255, w = _ >> 8 & 255;
            return a = k + Math.round((c - k) * n), l = L + Math.round((m - L) * n), f = w + Math.round((y - w) * n), d.toRgba(a, l, f);
          }, t.ensureContrastRatio = function(_, p, c) {
            const m = h.relativeLuminance(_ >> 8), y = h.relativeLuminance(p >> 8);
            if (e(m, y) < c) {
              if (y < m) {
                const w = o(_, p, c), x = e(m, h.relativeLuminance(w >> 8));
                if (x < c) {
                  const B = u(_, p, c);
                  return x > e(m, h.relativeLuminance(B >> 8)) ? w : B;
                }
                return w;
              }
              const k = u(_, p, c), L = e(m, h.relativeLuminance(k >> 8));
              if (L < c) {
                const w = o(_, p, c);
                return L > e(m, h.relativeLuminance(w >> 8)) ? k : w;
              }
              return k;
            }
          }, t.reduceLuminance = o, t.increaseLuminance = u, t.toChannels = function(_) {
            return [_ >> 24 & 255, _ >> 16 & 255, _ >> 8 & 255, 255 & _];
          };
        }(i || (r.rgba = i = {})), r.toPaddedHex = s, r.contrastRatio = e;
      }, 8969: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.CoreTerminal = void 0;
        const l = a(844), f = a(2585), n = a(4348), d = a(7866), v = a(744), g = a(7302), h = a(6975), i = a(8460), s = a(1753), e = a(1480), t = a(7994), o = a(9282), u = a(5435), _ = a(5981), p = a(2660);
        let c = false;
        class m extends l.Disposable {
          get onScroll() {
            return this._onScrollApi || (this._onScrollApi = this.register(new i.EventEmitter()), this._onScroll.event((k) => {
              var L;
              (L = this._onScrollApi) == null || L.fire(k.position);
            })), this._onScrollApi.event;
          }
          get cols() {
            return this._bufferService.cols;
          }
          get rows() {
            return this._bufferService.rows;
          }
          get buffers() {
            return this._bufferService.buffers;
          }
          get options() {
            return this.optionsService.options;
          }
          set options(k) {
            for (const L in k) this.optionsService.options[L] = k[L];
          }
          constructor(k) {
            super(), this._windowsWrappingHeuristics = this.register(new l.MutableDisposable()), this._onBinary = this.register(new i.EventEmitter()), this.onBinary = this._onBinary.event, this._onData = this.register(new i.EventEmitter()), this.onData = this._onData.event, this._onLineFeed = this.register(new i.EventEmitter()), this.onLineFeed = this._onLineFeed.event, this._onResize = this.register(new i.EventEmitter()), this.onResize = this._onResize.event, this._onWriteParsed = this.register(new i.EventEmitter()), this.onWriteParsed = this._onWriteParsed.event, this._onScroll = this.register(new i.EventEmitter()), this._instantiationService = new n.InstantiationService(), this.optionsService = this.register(new g.OptionsService(k)), this._instantiationService.setService(f.IOptionsService, this.optionsService), this._bufferService = this.register(this._instantiationService.createInstance(v.BufferService)), this._instantiationService.setService(f.IBufferService, this._bufferService), this._logService = this.register(this._instantiationService.createInstance(d.LogService)), this._instantiationService.setService(f.ILogService, this._logService), this.coreService = this.register(this._instantiationService.createInstance(h.CoreService)), this._instantiationService.setService(f.ICoreService, this.coreService), this.coreMouseService = this.register(this._instantiationService.createInstance(s.CoreMouseService)), this._instantiationService.setService(f.ICoreMouseService, this.coreMouseService), this.unicodeService = this.register(this._instantiationService.createInstance(e.UnicodeService)), this._instantiationService.setService(f.IUnicodeService, this.unicodeService), this._charsetService = this._instantiationService.createInstance(t.CharsetService), this._instantiationService.setService(f.ICharsetService, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(p.OscLinkService), this._instantiationService.setService(f.IOscLinkService, this._oscLinkService), this._inputHandler = this.register(new u.InputHandler(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this.register((0, i.forwardEvent)(this._inputHandler.onLineFeed, this._onLineFeed)), this.register(this._inputHandler), this.register((0, i.forwardEvent)(this._bufferService.onResize, this._onResize)), this.register((0, i.forwardEvent)(this.coreService.onData, this._onData)), this.register((0, i.forwardEvent)(this.coreService.onBinary, this._onBinary)), this.register(this.coreService.onRequestScrollToBottom(() => this.scrollToBottom())), this.register(this.coreService.onUserInput(() => this._writeBuffer.handleUserInput())), this.register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], () => this._handleWindowsPtyOptionChange())), this.register(this._bufferService.onScroll((L) => {
              this._onScroll.fire({ position: this._bufferService.buffer.ydisp, source: 0 }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
            })), this.register(this._inputHandler.onScroll((L) => {
              this._onScroll.fire({ position: this._bufferService.buffer.ydisp, source: 0 }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
            })), this._writeBuffer = this.register(new _.WriteBuffer((L, w) => this._inputHandler.parse(L, w))), this.register((0, i.forwardEvent)(this._writeBuffer.onWriteParsed, this._onWriteParsed));
          }
          write(k, L) {
            this._writeBuffer.write(k, L);
          }
          writeSync(k, L) {
            this._logService.logLevel <= f.LogLevelEnum.WARN && !c && (this._logService.warn("writeSync is unreliable and will be removed soon."), c = true), this._writeBuffer.writeSync(k, L);
          }
          input(k, L = true) {
            this.coreService.triggerDataEvent(k, L);
          }
          resize(k, L) {
            isNaN(k) || isNaN(L) || (k = Math.max(k, v.MINIMUM_COLS), L = Math.max(L, v.MINIMUM_ROWS), this._bufferService.resize(k, L));
          }
          scroll(k, L = false) {
            this._bufferService.scroll(k, L);
          }
          scrollLines(k, L, w) {
            this._bufferService.scrollLines(k, L, w);
          }
          scrollPages(k) {
            this.scrollLines(k * (this.rows - 1));
          }
          scrollToTop() {
            this.scrollLines(-this._bufferService.buffer.ydisp);
          }
          scrollToBottom() {
            this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
          }
          scrollToLine(k) {
            const L = k - this._bufferService.buffer.ydisp;
            L !== 0 && this.scrollLines(L);
          }
          registerEscHandler(k, L) {
            return this._inputHandler.registerEscHandler(k, L);
          }
          registerDcsHandler(k, L) {
            return this._inputHandler.registerDcsHandler(k, L);
          }
          registerCsiHandler(k, L) {
            return this._inputHandler.registerCsiHandler(k, L);
          }
          registerOscHandler(k, L) {
            return this._inputHandler.registerOscHandler(k, L);
          }
          _setup() {
            this._handleWindowsPtyOptionChange();
          }
          reset() {
            this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
          }
          _handleWindowsPtyOptionChange() {
            let k = false;
            const L = this.optionsService.rawOptions.windowsPty;
            L && L.buildNumber !== void 0 && L.buildNumber !== void 0 ? k = L.backend === "conpty" && L.buildNumber < 21376 : this.optionsService.rawOptions.windowsMode && (k = true), k ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
          }
          _enableWindowsWrappingHeuristics() {
            if (!this._windowsWrappingHeuristics.value) {
              const k = [];
              k.push(this.onLineFeed(o.updateWindowsModeWrappedState.bind(null, this._bufferService))), k.push(this.registerCsiHandler({ final: "H" }, () => ((0, o.updateWindowsModeWrappedState)(this._bufferService), false))), this._windowsWrappingHeuristics.value = (0, l.toDisposable)(() => {
                for (const L of k) L.dispose();
              });
            }
          }
        }
        r.CoreTerminal = m;
      }, 8460: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.runAndSubscribe = r.forwardEvent = r.EventEmitter = void 0, r.EventEmitter = class {
          constructor() {
            this._listeners = [], this._disposed = false;
          }
          get event() {
            return this._event || (this._event = (a) => (this._listeners.push(a), { dispose: () => {
              if (!this._disposed) {
                for (let l = 0; l < this._listeners.length; l++) if (this._listeners[l] === a) return void this._listeners.splice(l, 1);
              }
            } })), this._event;
          }
          fire(a, l) {
            const f = [];
            for (let n = 0; n < this._listeners.length; n++) f.push(this._listeners[n]);
            for (let n = 0; n < f.length; n++) f[n].call(void 0, a, l);
          }
          dispose() {
            this.clearListeners(), this._disposed = true;
          }
          clearListeners() {
            this._listeners && (this._listeners.length = 0);
          }
        }, r.forwardEvent = function(a, l) {
          return a((f) => l.fire(f));
        }, r.runAndSubscribe = function(a, l) {
          return l(void 0), a((f) => l(f));
        };
      }, 5435: function(O, r, a) {
        var l = this && this.__decorate || function(I, S, b, E) {
          var D, T = arguments.length, H = T < 3 ? S : E === null ? E = Object.getOwnPropertyDescriptor(S, b) : E;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") H = Reflect.decorate(I, S, b, E);
          else for (var N = I.length - 1; N >= 0; N--) (D = I[N]) && (H = (T < 3 ? D(H) : T > 3 ? D(S, b, H) : D(S, b)) || H);
          return T > 3 && H && Object.defineProperty(S, b, H), H;
        }, f = this && this.__param || function(I, S) {
          return function(b, E) {
            S(b, E, I);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.InputHandler = r.WindowsOptionsReportType = void 0;
        const n = a(2584), d = a(7116), v = a(2015), g = a(844), h = a(482), i = a(8437), s = a(8460), e = a(643), t = a(511), o = a(3734), u = a(2585), _ = a(1480), p = a(6242), c = a(6351), m = a(5941), y = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 }, k = 131072;
        function L(I, S) {
          if (I > 24) return S.setWinLines || false;
          switch (I) {
            case 1:
              return !!S.restoreWin;
            case 2:
              return !!S.minimizeWin;
            case 3:
              return !!S.setWinPosition;
            case 4:
              return !!S.setWinSizePixels;
            case 5:
              return !!S.raiseWin;
            case 6:
              return !!S.lowerWin;
            case 7:
              return !!S.refreshWin;
            case 8:
              return !!S.setWinSizeChars;
            case 9:
              return !!S.maximizeWin;
            case 10:
              return !!S.fullscreenWin;
            case 11:
              return !!S.getWinState;
            case 13:
              return !!S.getWinPosition;
            case 14:
              return !!S.getWinSizePixels;
            case 15:
              return !!S.getScreenSizePixels;
            case 16:
              return !!S.getCellSizePixels;
            case 18:
              return !!S.getWinSizeChars;
            case 19:
              return !!S.getScreenSizeChars;
            case 20:
              return !!S.getIconTitle;
            case 21:
              return !!S.getWinTitle;
            case 22:
              return !!S.pushTitle;
            case 23:
              return !!S.popTitle;
            case 24:
              return !!S.setWinLines;
          }
          return false;
        }
        var w;
        (function(I) {
          I[I.GET_WIN_SIZE_PIXELS = 0] = "GET_WIN_SIZE_PIXELS", I[I.GET_CELL_SIZE_PIXELS = 1] = "GET_CELL_SIZE_PIXELS";
        })(w || (r.WindowsOptionsReportType = w = {}));
        let x = 0;
        class B extends g.Disposable {
          getAttrData() {
            return this._curAttrData;
          }
          constructor(S, b, E, D, T, H, N, $, R = new v.EscapeSequenceParser()) {
            super(), this._bufferService = S, this._charsetService = b, this._coreService = E, this._logService = D, this._optionsService = T, this._oscLinkService = H, this._coreMouseService = N, this._unicodeService = $, this._parser = R, this._parseBuffer = new Uint32Array(4096), this._stringDecoder = new h.StringToUtf32(), this._utf8Decoder = new h.Utf8ToUtf32(), this._workCell = new t.CellData(), this._windowTitle = "", this._iconName = "", this._windowTitleStack = [], this._iconNameStack = [], this._curAttrData = i.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = i.DEFAULT_ATTR_DATA.clone(), this._onRequestBell = this.register(new s.EventEmitter()), this.onRequestBell = this._onRequestBell.event, this._onRequestRefreshRows = this.register(new s.EventEmitter()), this.onRequestRefreshRows = this._onRequestRefreshRows.event, this._onRequestReset = this.register(new s.EventEmitter()), this.onRequestReset = this._onRequestReset.event, this._onRequestSendFocus = this.register(new s.EventEmitter()), this.onRequestSendFocus = this._onRequestSendFocus.event, this._onRequestSyncScrollBar = this.register(new s.EventEmitter()), this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event, this._onRequestWindowsOptionsReport = this.register(new s.EventEmitter()), this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event, this._onA11yChar = this.register(new s.EventEmitter()), this.onA11yChar = this._onA11yChar.event, this._onA11yTab = this.register(new s.EventEmitter()), this.onA11yTab = this._onA11yTab.event, this._onCursorMove = this.register(new s.EventEmitter()), this.onCursorMove = this._onCursorMove.event, this._onLineFeed = this.register(new s.EventEmitter()), this.onLineFeed = this._onLineFeed.event, this._onScroll = this.register(new s.EventEmitter()), this.onScroll = this._onScroll.event, this._onTitleChange = this.register(new s.EventEmitter()), this.onTitleChange = this._onTitleChange.event, this._onColor = this.register(new s.EventEmitter()), this.onColor = this._onColor.event, this._parseStack = { paused: false, cursorStartX: 0, cursorStartY: 0, decodedLength: 0, position: 0 }, this._specialColors = [256, 257, 258], this.register(this._parser), this._dirtyRowTracker = new P(this._bufferService), this._activeBuffer = this._bufferService.buffer, this.register(this._bufferService.buffers.onBufferActivate((C) => this._activeBuffer = C.activeBuffer)), this._parser.setCsiHandlerFallback((C, M) => {
              this._logService.debug("Unknown CSI code: ", { identifier: this._parser.identToString(C), params: M.toArray() });
            }), this._parser.setEscHandlerFallback((C) => {
              this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(C) });
            }), this._parser.setExecuteHandlerFallback((C) => {
              this._logService.debug("Unknown EXECUTE code: ", { code: C });
            }), this._parser.setOscHandlerFallback((C, M, A) => {
              this._logService.debug("Unknown OSC code: ", { identifier: C, action: M, data: A });
            }), this._parser.setDcsHandlerFallback((C, M, A) => {
              M === "HOOK" && (A = A.toArray()), this._logService.debug("Unknown DCS code: ", { identifier: this._parser.identToString(C), action: M, payload: A });
            }), this._parser.setPrintHandler((C, M, A) => this.print(C, M, A)), this._parser.registerCsiHandler({ final: "@" }, (C) => this.insertChars(C)), this._parser.registerCsiHandler({ intermediates: " ", final: "@" }, (C) => this.scrollLeft(C)), this._parser.registerCsiHandler({ final: "A" }, (C) => this.cursorUp(C)), this._parser.registerCsiHandler({ intermediates: " ", final: "A" }, (C) => this.scrollRight(C)), this._parser.registerCsiHandler({ final: "B" }, (C) => this.cursorDown(C)), this._parser.registerCsiHandler({ final: "C" }, (C) => this.cursorForward(C)), this._parser.registerCsiHandler({ final: "D" }, (C) => this.cursorBackward(C)), this._parser.registerCsiHandler({ final: "E" }, (C) => this.cursorNextLine(C)), this._parser.registerCsiHandler({ final: "F" }, (C) => this.cursorPrecedingLine(C)), this._parser.registerCsiHandler({ final: "G" }, (C) => this.cursorCharAbsolute(C)), this._parser.registerCsiHandler({ final: "H" }, (C) => this.cursorPosition(C)), this._parser.registerCsiHandler({ final: "I" }, (C) => this.cursorForwardTab(C)), this._parser.registerCsiHandler({ final: "J" }, (C) => this.eraseInDisplay(C, false)), this._parser.registerCsiHandler({ prefix: "?", final: "J" }, (C) => this.eraseInDisplay(C, true)), this._parser.registerCsiHandler({ final: "K" }, (C) => this.eraseInLine(C, false)), this._parser.registerCsiHandler({ prefix: "?", final: "K" }, (C) => this.eraseInLine(C, true)), this._parser.registerCsiHandler({ final: "L" }, (C) => this.insertLines(C)), this._parser.registerCsiHandler({ final: "M" }, (C) => this.deleteLines(C)), this._parser.registerCsiHandler({ final: "P" }, (C) => this.deleteChars(C)), this._parser.registerCsiHandler({ final: "S" }, (C) => this.scrollUp(C)), this._parser.registerCsiHandler({ final: "T" }, (C) => this.scrollDown(C)), this._parser.registerCsiHandler({ final: "X" }, (C) => this.eraseChars(C)), this._parser.registerCsiHandler({ final: "Z" }, (C) => this.cursorBackwardTab(C)), this._parser.registerCsiHandler({ final: "`" }, (C) => this.charPosAbsolute(C)), this._parser.registerCsiHandler({ final: "a" }, (C) => this.hPositionRelative(C)), this._parser.registerCsiHandler({ final: "b" }, (C) => this.repeatPrecedingCharacter(C)), this._parser.registerCsiHandler({ final: "c" }, (C) => this.sendDeviceAttributesPrimary(C)), this._parser.registerCsiHandler({ prefix: ">", final: "c" }, (C) => this.sendDeviceAttributesSecondary(C)), this._parser.registerCsiHandler({ final: "d" }, (C) => this.linePosAbsolute(C)), this._parser.registerCsiHandler({ final: "e" }, (C) => this.vPositionRelative(C)), this._parser.registerCsiHandler({ final: "f" }, (C) => this.hVPosition(C)), this._parser.registerCsiHandler({ final: "g" }, (C) => this.tabClear(C)), this._parser.registerCsiHandler({ final: "h" }, (C) => this.setMode(C)), this._parser.registerCsiHandler({ prefix: "?", final: "h" }, (C) => this.setModePrivate(C)), this._parser.registerCsiHandler({ final: "l" }, (C) => this.resetMode(C)), this._parser.registerCsiHandler({ prefix: "?", final: "l" }, (C) => this.resetModePrivate(C)), this._parser.registerCsiHandler({ final: "m" }, (C) => this.charAttributes(C)), this._parser.registerCsiHandler({ final: "n" }, (C) => this.deviceStatus(C)), this._parser.registerCsiHandler({ prefix: "?", final: "n" }, (C) => this.deviceStatusPrivate(C)), this._parser.registerCsiHandler({ intermediates: "!", final: "p" }, (C) => this.softReset(C)), this._parser.registerCsiHandler({ intermediates: " ", final: "q" }, (C) => this.setCursorStyle(C)), this._parser.registerCsiHandler({ final: "r" }, (C) => this.setScrollRegion(C)), this._parser.registerCsiHandler({ final: "s" }, (C) => this.saveCursor(C)), this._parser.registerCsiHandler({ final: "t" }, (C) => this.windowOptions(C)), this._parser.registerCsiHandler({ final: "u" }, (C) => this.restoreCursor(C)), this._parser.registerCsiHandler({ intermediates: "'", final: "}" }, (C) => this.insertColumns(C)), this._parser.registerCsiHandler({ intermediates: "'", final: "~" }, (C) => this.deleteColumns(C)), this._parser.registerCsiHandler({ intermediates: '"', final: "q" }, (C) => this.selectProtected(C)), this._parser.registerCsiHandler({ intermediates: "$", final: "p" }, (C) => this.requestMode(C, true)), this._parser.registerCsiHandler({ prefix: "?", intermediates: "$", final: "p" }, (C) => this.requestMode(C, false)), this._parser.setExecuteHandler(n.C0.BEL, () => this.bell()), this._parser.setExecuteHandler(n.C0.LF, () => this.lineFeed()), this._parser.setExecuteHandler(n.C0.VT, () => this.lineFeed()), this._parser.setExecuteHandler(n.C0.FF, () => this.lineFeed()), this._parser.setExecuteHandler(n.C0.CR, () => this.carriageReturn()), this._parser.setExecuteHandler(n.C0.BS, () => this.backspace()), this._parser.setExecuteHandler(n.C0.HT, () => this.tab()), this._parser.setExecuteHandler(n.C0.SO, () => this.shiftOut()), this._parser.setExecuteHandler(n.C0.SI, () => this.shiftIn()), this._parser.setExecuteHandler(n.C1.IND, () => this.index()), this._parser.setExecuteHandler(n.C1.NEL, () => this.nextLine()), this._parser.setExecuteHandler(n.C1.HTS, () => this.tabSet()), this._parser.registerOscHandler(0, new p.OscHandler((C) => (this.setTitle(C), this.setIconName(C), true))), this._parser.registerOscHandler(1, new p.OscHandler((C) => this.setIconName(C))), this._parser.registerOscHandler(2, new p.OscHandler((C) => this.setTitle(C))), this._parser.registerOscHandler(4, new p.OscHandler((C) => this.setOrReportIndexedColor(C))), this._parser.registerOscHandler(8, new p.OscHandler((C) => this.setHyperlink(C))), this._parser.registerOscHandler(10, new p.OscHandler((C) => this.setOrReportFgColor(C))), this._parser.registerOscHandler(11, new p.OscHandler((C) => this.setOrReportBgColor(C))), this._parser.registerOscHandler(12, new p.OscHandler((C) => this.setOrReportCursorColor(C))), this._parser.registerOscHandler(104, new p.OscHandler((C) => this.restoreIndexedColor(C))), this._parser.registerOscHandler(110, new p.OscHandler((C) => this.restoreFgColor(C))), this._parser.registerOscHandler(111, new p.OscHandler((C) => this.restoreBgColor(C))), this._parser.registerOscHandler(112, new p.OscHandler((C) => this.restoreCursorColor(C))), this._parser.registerEscHandler({ final: "7" }, () => this.saveCursor()), this._parser.registerEscHandler({ final: "8" }, () => this.restoreCursor()), this._parser.registerEscHandler({ final: "D" }, () => this.index()), this._parser.registerEscHandler({ final: "E" }, () => this.nextLine()), this._parser.registerEscHandler({ final: "H" }, () => this.tabSet()), this._parser.registerEscHandler({ final: "M" }, () => this.reverseIndex()), this._parser.registerEscHandler({ final: "=" }, () => this.keypadApplicationMode()), this._parser.registerEscHandler({ final: ">" }, () => this.keypadNumericMode()), this._parser.registerEscHandler({ final: "c" }, () => this.fullReset()), this._parser.registerEscHandler({ final: "n" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "o" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "|" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "}" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "~" }, () => this.setgLevel(1)), this._parser.registerEscHandler({ intermediates: "%", final: "@" }, () => this.selectDefaultCharset()), this._parser.registerEscHandler({ intermediates: "%", final: "G" }, () => this.selectDefaultCharset());
            for (const C in d.CHARSETS) this._parser.registerEscHandler({ intermediates: "(", final: C }, () => this.selectCharset("(" + C)), this._parser.registerEscHandler({ intermediates: ")", final: C }, () => this.selectCharset(")" + C)), this._parser.registerEscHandler({ intermediates: "*", final: C }, () => this.selectCharset("*" + C)), this._parser.registerEscHandler({ intermediates: "+", final: C }, () => this.selectCharset("+" + C)), this._parser.registerEscHandler({ intermediates: "-", final: C }, () => this.selectCharset("-" + C)), this._parser.registerEscHandler({ intermediates: ".", final: C }, () => this.selectCharset("." + C)), this._parser.registerEscHandler({ intermediates: "/", final: C }, () => this.selectCharset("/" + C));
            this._parser.registerEscHandler({ intermediates: "#", final: "8" }, () => this.screenAlignmentPattern()), this._parser.setErrorHandler((C) => (this._logService.error("Parsing error: ", C), C)), this._parser.registerDcsHandler({ intermediates: "$", final: "q" }, new c.DcsHandler((C, M) => this.requestStatusString(C, M)));
          }
          _preserveStack(S, b, E, D) {
            this._parseStack.paused = true, this._parseStack.cursorStartX = S, this._parseStack.cursorStartY = b, this._parseStack.decodedLength = E, this._parseStack.position = D;
          }
          _logSlowResolvingAsync(S) {
            this._logService.logLevel <= u.LogLevelEnum.WARN && Promise.race([S, new Promise((b, E) => setTimeout(() => E("#SLOW_TIMEOUT"), 5e3))]).catch((b) => {
              if (b !== "#SLOW_TIMEOUT") throw b;
              console.warn("async parser handler taking longer than 5000 ms");
            });
          }
          _getCurrentLinkId() {
            return this._curAttrData.extended.urlId;
          }
          parse(S, b) {
            let E, D = this._activeBuffer.x, T = this._activeBuffer.y, H = 0;
            const N = this._parseStack.paused;
            if (N) {
              if (E = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, b)) return this._logSlowResolvingAsync(E), E;
              D = this._parseStack.cursorStartX, T = this._parseStack.cursorStartY, this._parseStack.paused = false, S.length > k && (H = this._parseStack.position + k);
            }
            if (this._logService.logLevel <= u.LogLevelEnum.DEBUG && this._logService.debug("parsing data" + (typeof S == "string" ? ` "${S}"` : ` "${Array.prototype.map.call(S, (C) => String.fromCharCode(C)).join("")}"`), typeof S == "string" ? S.split("").map((C) => C.charCodeAt(0)) : S), this._parseBuffer.length < S.length && this._parseBuffer.length < k && (this._parseBuffer = new Uint32Array(Math.min(S.length, k))), N || this._dirtyRowTracker.clearRange(), S.length > k) for (let C = H; C < S.length; C += k) {
              const M = C + k < S.length ? C + k : S.length, A = typeof S == "string" ? this._stringDecoder.decode(S.substring(C, M), this._parseBuffer) : this._utf8Decoder.decode(S.subarray(C, M), this._parseBuffer);
              if (E = this._parser.parse(this._parseBuffer, A)) return this._preserveStack(D, T, A, C), this._logSlowResolvingAsync(E), E;
            }
            else if (!N) {
              const C = typeof S == "string" ? this._stringDecoder.decode(S, this._parseBuffer) : this._utf8Decoder.decode(S, this._parseBuffer);
              if (E = this._parser.parse(this._parseBuffer, C)) return this._preserveStack(D, T, C, 0), this._logSlowResolvingAsync(E), E;
            }
            this._activeBuffer.x === D && this._activeBuffer.y === T || this._onCursorMove.fire();
            const $ = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp), R = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
            R < this._bufferService.rows && this._onRequestRefreshRows.fire(Math.min(R, this._bufferService.rows - 1), Math.min($, this._bufferService.rows - 1));
          }
          print(S, b, E) {
            let D, T;
            const H = this._charsetService.charset, N = this._optionsService.rawOptions.screenReaderMode, $ = this._bufferService.cols, R = this._coreService.decPrivateModes.wraparound, C = this._coreService.modes.insertMode, M = this._curAttrData;
            let A = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
            this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && E - b > 0 && A.getWidth(this._activeBuffer.x - 1) === 2 && A.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, M);
            let W = this._parser.precedingJoinState;
            for (let F = b; F < E; ++F) {
              if (D = S[F], D < 127 && H) {
                const X = H[String.fromCharCode(D)];
                X && (D = X.charCodeAt(0));
              }
              const z = this._unicodeService.charProperties(D, W);
              T = _.UnicodeService.extractWidth(z);
              const q = _.UnicodeService.extractShouldJoin(z), V = q ? _.UnicodeService.extractWidth(W) : 0;
              if (W = z, N && this._onA11yChar.fire((0, h.stringFromCodePoint)(D)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), this._activeBuffer.x + T - V > $) {
                if (R) {
                  const X = A;
                  let j = this._activeBuffer.x - V;
                  for (this._activeBuffer.x = V, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), true)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = true), A = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y), V > 0 && A instanceof i.BufferLine && A.copyCellsFrom(X, j, 0, V, false); j < $; ) X.setCellFromCodepoint(j++, 0, 1, M);
                } else if (this._activeBuffer.x = $ - 1, T === 2) continue;
              }
              if (q && this._activeBuffer.x) {
                const X = A.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
                A.addCodepointToCell(this._activeBuffer.x - X, D, T);
                for (let j = T - V; --j >= 0; ) A.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, M);
              } else if (C && (A.insertCells(this._activeBuffer.x, T - V, this._activeBuffer.getNullCell(M)), A.getWidth($ - 1) === 2 && A.setCellFromCodepoint($ - 1, e.NULL_CELL_CODE, e.NULL_CELL_WIDTH, M)), A.setCellFromCodepoint(this._activeBuffer.x++, D, T, M), T > 0) for (; --T; ) A.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, M);
            }
            this._parser.precedingJoinState = W, this._activeBuffer.x < $ && E - b > 0 && A.getWidth(this._activeBuffer.x) === 0 && !A.hasContent(this._activeBuffer.x) && A.setCellFromCodepoint(this._activeBuffer.x, 0, 1, M), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
          }
          registerCsiHandler(S, b) {
            return S.final !== "t" || S.prefix || S.intermediates ? this._parser.registerCsiHandler(S, b) : this._parser.registerCsiHandler(S, (E) => !L(E.params[0], this._optionsService.rawOptions.windowOptions) || b(E));
          }
          registerDcsHandler(S, b) {
            return this._parser.registerDcsHandler(S, new c.DcsHandler(b));
          }
          registerEscHandler(S, b) {
            return this._parser.registerEscHandler(S, b);
          }
          registerOscHandler(S, b) {
            return this._parser.registerOscHandler(S, new p.OscHandler(b));
          }
          bell() {
            return this._onRequestBell.fire(), true;
          }
          lineFeed() {
            return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), true;
          }
          carriageReturn() {
            return this._activeBuffer.x = 0, true;
          }
          backspace() {
            var S;
            if (!this._coreService.decPrivateModes.reverseWraparound) return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, true;
            if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0) this._activeBuffer.x--;
            else if (this._activeBuffer.x === 0 && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && ((S = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)) != null && S.isWrapped)) {
              this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
              const b = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
              b.hasWidth(this._activeBuffer.x) && !b.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
            }
            return this._restrictCursor(), true;
          }
          tab() {
            if (this._activeBuffer.x >= this._bufferService.cols) return true;
            const S = this._activeBuffer.x;
            return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - S), true;
          }
          shiftOut() {
            return this._charsetService.setgLevel(1), true;
          }
          shiftIn() {
            return this._charsetService.setgLevel(0), true;
          }
          _restrictCursor(S = this._bufferService.cols - 1) {
            this._activeBuffer.x = Math.min(S, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
          }
          _setCursor(S, b) {
            this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = S, this._activeBuffer.y = this._activeBuffer.scrollTop + b) : (this._activeBuffer.x = S, this._activeBuffer.y = b), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
          }
          _moveCursor(S, b) {
            this._restrictCursor(), this._setCursor(this._activeBuffer.x + S, this._activeBuffer.y + b);
          }
          cursorUp(S) {
            const b = this._activeBuffer.y - this._activeBuffer.scrollTop;
            return b >= 0 ? this._moveCursor(0, -Math.min(b, S.params[0] || 1)) : this._moveCursor(0, -(S.params[0] || 1)), true;
          }
          cursorDown(S) {
            const b = this._activeBuffer.scrollBottom - this._activeBuffer.y;
            return b >= 0 ? this._moveCursor(0, Math.min(b, S.params[0] || 1)) : this._moveCursor(0, S.params[0] || 1), true;
          }
          cursorForward(S) {
            return this._moveCursor(S.params[0] || 1, 0), true;
          }
          cursorBackward(S) {
            return this._moveCursor(-(S.params[0] || 1), 0), true;
          }
          cursorNextLine(S) {
            return this.cursorDown(S), this._activeBuffer.x = 0, true;
          }
          cursorPrecedingLine(S) {
            return this.cursorUp(S), this._activeBuffer.x = 0, true;
          }
          cursorCharAbsolute(S) {
            return this._setCursor((S.params[0] || 1) - 1, this._activeBuffer.y), true;
          }
          cursorPosition(S) {
            return this._setCursor(S.length >= 2 ? (S.params[1] || 1) - 1 : 0, (S.params[0] || 1) - 1), true;
          }
          charPosAbsolute(S) {
            return this._setCursor((S.params[0] || 1) - 1, this._activeBuffer.y), true;
          }
          hPositionRelative(S) {
            return this._moveCursor(S.params[0] || 1, 0), true;
          }
          linePosAbsolute(S) {
            return this._setCursor(this._activeBuffer.x, (S.params[0] || 1) - 1), true;
          }
          vPositionRelative(S) {
            return this._moveCursor(0, S.params[0] || 1), true;
          }
          hVPosition(S) {
            return this.cursorPosition(S), true;
          }
          tabClear(S) {
            const b = S.params[0];
            return b === 0 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : b === 3 && (this._activeBuffer.tabs = {}), true;
          }
          cursorForwardTab(S) {
            if (this._activeBuffer.x >= this._bufferService.cols) return true;
            let b = S.params[0] || 1;
            for (; b--; ) this._activeBuffer.x = this._activeBuffer.nextStop();
            return true;
          }
          cursorBackwardTab(S) {
            if (this._activeBuffer.x >= this._bufferService.cols) return true;
            let b = S.params[0] || 1;
            for (; b--; ) this._activeBuffer.x = this._activeBuffer.prevStop();
            return true;
          }
          selectProtected(S) {
            const b = S.params[0];
            return b === 1 && (this._curAttrData.bg |= 536870912), b !== 2 && b !== 0 || (this._curAttrData.bg &= -536870913), true;
          }
          _eraseInBufferLine(S, b, E, D = false, T = false) {
            const H = this._activeBuffer.lines.get(this._activeBuffer.ybase + S);
            H.replaceCells(b, E, this._activeBuffer.getNullCell(this._eraseAttrData()), T), D && (H.isWrapped = false);
          }
          _resetBufferLine(S, b = false) {
            const E = this._activeBuffer.lines.get(this._activeBuffer.ybase + S);
            E && (E.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), b), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + S), E.isWrapped = false);
          }
          eraseInDisplay(S, b = false) {
            let E;
            switch (this._restrictCursor(this._bufferService.cols), S.params[0]) {
              case 0:
                for (E = this._activeBuffer.y, this._dirtyRowTracker.markDirty(E), this._eraseInBufferLine(E++, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, b); E < this._bufferService.rows; E++) this._resetBufferLine(E, b);
                this._dirtyRowTracker.markDirty(E);
                break;
              case 1:
                for (E = this._activeBuffer.y, this._dirtyRowTracker.markDirty(E), this._eraseInBufferLine(E, 0, this._activeBuffer.x + 1, true, b), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(E + 1).isWrapped = false); E--; ) this._resetBufferLine(E, b);
                this._dirtyRowTracker.markDirty(0);
                break;
              case 2:
                for (E = this._bufferService.rows, this._dirtyRowTracker.markDirty(E - 1); E--; ) this._resetBufferLine(E, b);
                this._dirtyRowTracker.markDirty(0);
                break;
              case 3:
                const D = this._activeBuffer.lines.length - this._bufferService.rows;
                D > 0 && (this._activeBuffer.lines.trimStart(D), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - D, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - D, 0), this._onScroll.fire(0));
            }
            return true;
          }
          eraseInLine(S, b = false) {
            switch (this._restrictCursor(this._bufferService.cols), S.params[0]) {
              case 0:
                this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, b);
                break;
              case 1:
                this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, false, b);
                break;
              case 2:
                this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, true, b);
            }
            return this._dirtyRowTracker.markDirty(this._activeBuffer.y), true;
          }
          insertLines(S) {
            this._restrictCursor();
            let b = S.params[0] || 1;
            if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
            const E = this._activeBuffer.ybase + this._activeBuffer.y, D = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, T = this._bufferService.rows - 1 + this._activeBuffer.ybase - D + 1;
            for (; b--; ) this._activeBuffer.lines.splice(T - 1, 1), this._activeBuffer.lines.splice(E, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
          }
          deleteLines(S) {
            this._restrictCursor();
            let b = S.params[0] || 1;
            if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
            const E = this._activeBuffer.ybase + this._activeBuffer.y;
            let D;
            for (D = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, D = this._bufferService.rows - 1 + this._activeBuffer.ybase - D; b--; ) this._activeBuffer.lines.splice(E, 1), this._activeBuffer.lines.splice(D, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
          }
          insertChars(S) {
            this._restrictCursor();
            const b = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
            return b && (b.insertCells(this._activeBuffer.x, S.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
          }
          deleteChars(S) {
            this._restrictCursor();
            const b = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
            return b && (b.deleteCells(this._activeBuffer.x, S.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
          }
          scrollUp(S) {
            let b = S.params[0] || 1;
            for (; b--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
          }
          scrollDown(S) {
            let b = S.params[0] || 1;
            for (; b--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(i.DEFAULT_ATTR_DATA));
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
          }
          scrollLeft(S) {
            if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
            const b = S.params[0] || 1;
            for (let E = this._activeBuffer.scrollTop; E <= this._activeBuffer.scrollBottom; ++E) {
              const D = this._activeBuffer.lines.get(this._activeBuffer.ybase + E);
              D.deleteCells(0, b, this._activeBuffer.getNullCell(this._eraseAttrData())), D.isWrapped = false;
            }
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
          }
          scrollRight(S) {
            if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
            const b = S.params[0] || 1;
            for (let E = this._activeBuffer.scrollTop; E <= this._activeBuffer.scrollBottom; ++E) {
              const D = this._activeBuffer.lines.get(this._activeBuffer.ybase + E);
              D.insertCells(0, b, this._activeBuffer.getNullCell(this._eraseAttrData())), D.isWrapped = false;
            }
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
          }
          insertColumns(S) {
            if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
            const b = S.params[0] || 1;
            for (let E = this._activeBuffer.scrollTop; E <= this._activeBuffer.scrollBottom; ++E) {
              const D = this._activeBuffer.lines.get(this._activeBuffer.ybase + E);
              D.insertCells(this._activeBuffer.x, b, this._activeBuffer.getNullCell(this._eraseAttrData())), D.isWrapped = false;
            }
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
          }
          deleteColumns(S) {
            if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
            const b = S.params[0] || 1;
            for (let E = this._activeBuffer.scrollTop; E <= this._activeBuffer.scrollBottom; ++E) {
              const D = this._activeBuffer.lines.get(this._activeBuffer.ybase + E);
              D.deleteCells(this._activeBuffer.x, b, this._activeBuffer.getNullCell(this._eraseAttrData())), D.isWrapped = false;
            }
            return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
          }
          eraseChars(S) {
            this._restrictCursor();
            const b = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
            return b && (b.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (S.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
          }
          repeatPrecedingCharacter(S) {
            const b = this._parser.precedingJoinState;
            if (!b) return true;
            const E = S.params[0] || 1, D = _.UnicodeService.extractWidth(b), T = this._activeBuffer.x - D, H = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(T), N = new Uint32Array(H.length * E);
            let $ = 0;
            for (let C = 0; C < H.length; ) {
              const M = H.codePointAt(C) || 0;
              N[$++] = M, C += M > 65535 ? 2 : 1;
            }
            let R = $;
            for (let C = 1; C < E; ++C) N.copyWithin(R, 0, $), R += $;
            return this.print(N, 0, R), true;
          }
          sendDeviceAttributesPrimary(S) {
            return S.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(n.C0.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(n.C0.ESC + "[?6c")), true;
          }
          sendDeviceAttributesSecondary(S) {
            return S.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(n.C0.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(n.C0.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(S.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(n.C0.ESC + "[>83;40003;0c")), true;
          }
          _is(S) {
            return (this._optionsService.rawOptions.termName + "").indexOf(S) === 0;
          }
          setMode(S) {
            for (let b = 0; b < S.length; b++) switch (S.params[b]) {
              case 4:
                this._coreService.modes.insertMode = true;
                break;
              case 20:
                this._optionsService.options.convertEol = true;
            }
            return true;
          }
          setModePrivate(S) {
            for (let b = 0; b < S.length; b++) switch (S.params[b]) {
              case 1:
                this._coreService.decPrivateModes.applicationCursorKeys = true;
                break;
              case 2:
                this._charsetService.setgCharset(0, d.DEFAULT_CHARSET), this._charsetService.setgCharset(1, d.DEFAULT_CHARSET), this._charsetService.setgCharset(2, d.DEFAULT_CHARSET), this._charsetService.setgCharset(3, d.DEFAULT_CHARSET);
                break;
              case 3:
                this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
                break;
              case 6:
                this._coreService.decPrivateModes.origin = true, this._setCursor(0, 0);
                break;
              case 7:
                this._coreService.decPrivateModes.wraparound = true;
                break;
              case 12:
                this._optionsService.options.cursorBlink = true;
                break;
              case 45:
                this._coreService.decPrivateModes.reverseWraparound = true;
                break;
              case 66:
                this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire();
                break;
              case 9:
                this._coreMouseService.activeProtocol = "X10";
                break;
              case 1e3:
                this._coreMouseService.activeProtocol = "VT200";
                break;
              case 1002:
                this._coreMouseService.activeProtocol = "DRAG";
                break;
              case 1003:
                this._coreMouseService.activeProtocol = "ANY";
                break;
              case 1004:
                this._coreService.decPrivateModes.sendFocus = true, this._onRequestSendFocus.fire();
                break;
              case 1005:
                this._logService.debug("DECSET 1005 not supported (see #2507)");
                break;
              case 1006:
                this._coreMouseService.activeEncoding = "SGR";
                break;
              case 1015:
                this._logService.debug("DECSET 1015 not supported (see #2507)");
                break;
              case 1016:
                this._coreMouseService.activeEncoding = "SGR_PIXELS";
                break;
              case 25:
                this._coreService.isCursorHidden = false;
                break;
              case 1048:
                this.saveCursor();
                break;
              case 1049:
                this.saveCursor();
              case 47:
              case 1047:
                this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
                break;
              case 2004:
                this._coreService.decPrivateModes.bracketedPasteMode = true;
            }
            return true;
          }
          resetMode(S) {
            for (let b = 0; b < S.length; b++) switch (S.params[b]) {
              case 4:
                this._coreService.modes.insertMode = false;
                break;
              case 20:
                this._optionsService.options.convertEol = false;
            }
            return true;
          }
          resetModePrivate(S) {
            for (let b = 0; b < S.length; b++) switch (S.params[b]) {
              case 1:
                this._coreService.decPrivateModes.applicationCursorKeys = false;
                break;
              case 3:
                this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
                break;
              case 6:
                this._coreService.decPrivateModes.origin = false, this._setCursor(0, 0);
                break;
              case 7:
                this._coreService.decPrivateModes.wraparound = false;
                break;
              case 12:
                this._optionsService.options.cursorBlink = false;
                break;
              case 45:
                this._coreService.decPrivateModes.reverseWraparound = false;
                break;
              case 66:
                this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire();
                break;
              case 9:
              case 1e3:
              case 1002:
              case 1003:
                this._coreMouseService.activeProtocol = "NONE";
                break;
              case 1004:
                this._coreService.decPrivateModes.sendFocus = false;
                break;
              case 1005:
                this._logService.debug("DECRST 1005 not supported (see #2507)");
                break;
              case 1006:
              case 1016:
                this._coreMouseService.activeEncoding = "DEFAULT";
                break;
              case 1015:
                this._logService.debug("DECRST 1015 not supported (see #2507)");
                break;
              case 25:
                this._coreService.isCursorHidden = true;
                break;
              case 1048:
                this.restoreCursor();
                break;
              case 1049:
              case 47:
              case 1047:
                this._bufferService.buffers.activateNormalBuffer(), S.params[b] === 1049 && this.restoreCursor(), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1), this._onRequestSyncScrollBar.fire();
                break;
              case 2004:
                this._coreService.decPrivateModes.bracketedPasteMode = false;
            }
            return true;
          }
          requestMode(S, b) {
            const E = this._coreService.decPrivateModes, { activeProtocol: D, activeEncoding: T } = this._coreMouseService, H = this._coreService, { buffers: N, cols: $ } = this._bufferService, { active: R, alt: C } = N, M = this._optionsService.rawOptions, A = (q) => q ? 1 : 2, W = S.params[0];
            return F = W, z = b ? W === 2 ? 4 : W === 4 ? A(H.modes.insertMode) : W === 12 ? 3 : W === 20 ? A(M.convertEol) : 0 : W === 1 ? A(E.applicationCursorKeys) : W === 3 ? M.windowOptions.setWinLines ? $ === 80 ? 2 : $ === 132 ? 1 : 0 : 0 : W === 6 ? A(E.origin) : W === 7 ? A(E.wraparound) : W === 8 ? 3 : W === 9 ? A(D === "X10") : W === 12 ? A(M.cursorBlink) : W === 25 ? A(!H.isCursorHidden) : W === 45 ? A(E.reverseWraparound) : W === 66 ? A(E.applicationKeypad) : W === 67 ? 4 : W === 1e3 ? A(D === "VT200") : W === 1002 ? A(D === "DRAG") : W === 1003 ? A(D === "ANY") : W === 1004 ? A(E.sendFocus) : W === 1005 ? 4 : W === 1006 ? A(T === "SGR") : W === 1015 ? 4 : W === 1016 ? A(T === "SGR_PIXELS") : W === 1048 ? 1 : W === 47 || W === 1047 || W === 1049 ? A(R === C) : W === 2004 ? A(E.bracketedPasteMode) : 0, H.triggerDataEvent(`${n.C0.ESC}[${b ? "" : "?"}${F};${z}$y`), true;
            var F, z;
          }
          _updateAttrColor(S, b, E, D, T) {
            return b === 2 ? (S |= 50331648, S &= -16777216, S |= o.AttributeData.fromColorRGB([E, D, T])) : b === 5 && (S &= -50331904, S |= 33554432 | 255 & E), S;
          }
          _extractColor(S, b, E) {
            const D = [0, 0, -1, 0, 0, 0];
            let T = 0, H = 0;
            do {
              if (D[H + T] = S.params[b + H], S.hasSubParams(b + H)) {
                const N = S.getSubParams(b + H);
                let $ = 0;
                do
                  D[1] === 5 && (T = 1), D[H + $ + 1 + T] = N[$];
                while (++$ < N.length && $ + H + 1 + T < D.length);
                break;
              }
              if (D[1] === 5 && H + T >= 2 || D[1] === 2 && H + T >= 5) break;
              D[1] && (T = 1);
            } while (++H + b < S.length && H + T < D.length);
            for (let N = 2; N < D.length; ++N) D[N] === -1 && (D[N] = 0);
            switch (D[0]) {
              case 38:
                E.fg = this._updateAttrColor(E.fg, D[1], D[3], D[4], D[5]);
                break;
              case 48:
                E.bg = this._updateAttrColor(E.bg, D[1], D[3], D[4], D[5]);
                break;
              case 58:
                E.extended = E.extended.clone(), E.extended.underlineColor = this._updateAttrColor(E.extended.underlineColor, D[1], D[3], D[4], D[5]);
            }
            return H;
          }
          _processUnderline(S, b) {
            b.extended = b.extended.clone(), (!~S || S > 5) && (S = 1), b.extended.underlineStyle = S, b.fg |= 268435456, S === 0 && (b.fg &= -268435457), b.updateExtended();
          }
          _processSGR0(S) {
            S.fg = i.DEFAULT_ATTR_DATA.fg, S.bg = i.DEFAULT_ATTR_DATA.bg, S.extended = S.extended.clone(), S.extended.underlineStyle = 0, S.extended.underlineColor &= -67108864, S.updateExtended();
          }
          charAttributes(S) {
            if (S.length === 1 && S.params[0] === 0) return this._processSGR0(this._curAttrData), true;
            const b = S.length;
            let E;
            const D = this._curAttrData;
            for (let T = 0; T < b; T++) E = S.params[T], E >= 30 && E <= 37 ? (D.fg &= -50331904, D.fg |= 16777216 | E - 30) : E >= 40 && E <= 47 ? (D.bg &= -50331904, D.bg |= 16777216 | E - 40) : E >= 90 && E <= 97 ? (D.fg &= -50331904, D.fg |= 16777224 | E - 90) : E >= 100 && E <= 107 ? (D.bg &= -50331904, D.bg |= 16777224 | E - 100) : E === 0 ? this._processSGR0(D) : E === 1 ? D.fg |= 134217728 : E === 3 ? D.bg |= 67108864 : E === 4 ? (D.fg |= 268435456, this._processUnderline(S.hasSubParams(T) ? S.getSubParams(T)[0] : 1, D)) : E === 5 ? D.fg |= 536870912 : E === 7 ? D.fg |= 67108864 : E === 8 ? D.fg |= 1073741824 : E === 9 ? D.fg |= 2147483648 : E === 2 ? D.bg |= 134217728 : E === 21 ? this._processUnderline(2, D) : E === 22 ? (D.fg &= -134217729, D.bg &= -134217729) : E === 23 ? D.bg &= -67108865 : E === 24 ? (D.fg &= -268435457, this._processUnderline(0, D)) : E === 25 ? D.fg &= -536870913 : E === 27 ? D.fg &= -67108865 : E === 28 ? D.fg &= -1073741825 : E === 29 ? D.fg &= 2147483647 : E === 39 ? (D.fg &= -67108864, D.fg |= 16777215 & i.DEFAULT_ATTR_DATA.fg) : E === 49 ? (D.bg &= -67108864, D.bg |= 16777215 & i.DEFAULT_ATTR_DATA.bg) : E === 38 || E === 48 || E === 58 ? T += this._extractColor(S, T, D) : E === 53 ? D.bg |= 1073741824 : E === 55 ? D.bg &= -1073741825 : E === 59 ? (D.extended = D.extended.clone(), D.extended.underlineColor = -1, D.updateExtended()) : E === 100 ? (D.fg &= -67108864, D.fg |= 16777215 & i.DEFAULT_ATTR_DATA.fg, D.bg &= -67108864, D.bg |= 16777215 & i.DEFAULT_ATTR_DATA.bg) : this._logService.debug("Unknown SGR attribute: %d.", E);
            return true;
          }
          deviceStatus(S) {
            switch (S.params[0]) {
              case 5:
                this._coreService.triggerDataEvent(`${n.C0.ESC}[0n`);
                break;
              case 6:
                const b = this._activeBuffer.y + 1, E = this._activeBuffer.x + 1;
                this._coreService.triggerDataEvent(`${n.C0.ESC}[${b};${E}R`);
            }
            return true;
          }
          deviceStatusPrivate(S) {
            if (S.params[0] === 6) {
              const b = this._activeBuffer.y + 1, E = this._activeBuffer.x + 1;
              this._coreService.triggerDataEvent(`${n.C0.ESC}[?${b};${E}R`);
            }
            return true;
          }
          softReset(S) {
            return this._coreService.isCursorHidden = false, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = i.DEFAULT_ATTR_DATA.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = false, true;
          }
          setCursorStyle(S) {
            const b = S.params[0] || 1;
            switch (b) {
              case 1:
              case 2:
                this._optionsService.options.cursorStyle = "block";
                break;
              case 3:
              case 4:
                this._optionsService.options.cursorStyle = "underline";
                break;
              case 5:
              case 6:
                this._optionsService.options.cursorStyle = "bar";
            }
            const E = b % 2 == 1;
            return this._optionsService.options.cursorBlink = E, true;
          }
          setScrollRegion(S) {
            const b = S.params[0] || 1;
            let E;
            return (S.length < 2 || (E = S.params[1]) > this._bufferService.rows || E === 0) && (E = this._bufferService.rows), E > b && (this._activeBuffer.scrollTop = b - 1, this._activeBuffer.scrollBottom = E - 1, this._setCursor(0, 0)), true;
          }
          windowOptions(S) {
            if (!L(S.params[0], this._optionsService.rawOptions.windowOptions)) return true;
            const b = S.length > 1 ? S.params[1] : 0;
            switch (S.params[0]) {
              case 14:
                b !== 2 && this._onRequestWindowsOptionsReport.fire(w.GET_WIN_SIZE_PIXELS);
                break;
              case 16:
                this._onRequestWindowsOptionsReport.fire(w.GET_CELL_SIZE_PIXELS);
                break;
              case 18:
                this._bufferService && this._coreService.triggerDataEvent(`${n.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
                break;
              case 22:
                b !== 0 && b !== 2 || (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > 10 && this._windowTitleStack.shift()), b !== 0 && b !== 1 || (this._iconNameStack.push(this._iconName), this._iconNameStack.length > 10 && this._iconNameStack.shift());
                break;
              case 23:
                b !== 0 && b !== 2 || this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), b !== 0 && b !== 1 || this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
            }
            return true;
          }
          saveCursor(S) {
            return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, true;
          }
          restoreCursor(S) {
            return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), true;
          }
          setTitle(S) {
            return this._windowTitle = S, this._onTitleChange.fire(S), true;
          }
          setIconName(S) {
            return this._iconName = S, true;
          }
          setOrReportIndexedColor(S) {
            const b = [], E = S.split(";");
            for (; E.length > 1; ) {
              const D = E.shift(), T = E.shift();
              if (/^\d+$/.exec(D)) {
                const H = parseInt(D);
                if (U(H)) if (T === "?") b.push({ type: 0, index: H });
                else {
                  const N = (0, m.parseColor)(T);
                  N && b.push({ type: 1, index: H, color: N });
                }
              }
            }
            return b.length && this._onColor.fire(b), true;
          }
          setHyperlink(S) {
            const b = S.split(";");
            return !(b.length < 2) && (b[1] ? this._createHyperlink(b[0], b[1]) : !b[0] && this._finishHyperlink());
          }
          _createHyperlink(S, b) {
            this._getCurrentLinkId() && this._finishHyperlink();
            const E = S.split(":");
            let D;
            const T = E.findIndex((H) => H.startsWith("id="));
            return T !== -1 && (D = E[T].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({ id: D, uri: b }), this._curAttrData.updateExtended(), true;
          }
          _finishHyperlink() {
            return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), true;
          }
          _setOrReportSpecialColor(S, b) {
            const E = S.split(";");
            for (let D = 0; D < E.length && !(b >= this._specialColors.length); ++D, ++b) if (E[D] === "?") this._onColor.fire([{ type: 0, index: this._specialColors[b] }]);
            else {
              const T = (0, m.parseColor)(E[D]);
              T && this._onColor.fire([{ type: 1, index: this._specialColors[b], color: T }]);
            }
            return true;
          }
          setOrReportFgColor(S) {
            return this._setOrReportSpecialColor(S, 0);
          }
          setOrReportBgColor(S) {
            return this._setOrReportSpecialColor(S, 1);
          }
          setOrReportCursorColor(S) {
            return this._setOrReportSpecialColor(S, 2);
          }
          restoreIndexedColor(S) {
            if (!S) return this._onColor.fire([{ type: 2 }]), true;
            const b = [], E = S.split(";");
            for (let D = 0; D < E.length; ++D) if (/^\d+$/.exec(E[D])) {
              const T = parseInt(E[D]);
              U(T) && b.push({ type: 2, index: T });
            }
            return b.length && this._onColor.fire(b), true;
          }
          restoreFgColor(S) {
            return this._onColor.fire([{ type: 2, index: 256 }]), true;
          }
          restoreBgColor(S) {
            return this._onColor.fire([{ type: 2, index: 257 }]), true;
          }
          restoreCursorColor(S) {
            return this._onColor.fire([{ type: 2, index: 258 }]), true;
          }
          nextLine() {
            return this._activeBuffer.x = 0, this.index(), true;
          }
          keypadApplicationMode() {
            return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire(), true;
          }
          keypadNumericMode() {
            return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire(), true;
          }
          selectDefaultCharset() {
            return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, d.DEFAULT_CHARSET), true;
          }
          selectCharset(S) {
            return S.length !== 2 ? (this.selectDefaultCharset(), true) : (S[0] === "/" || this._charsetService.setgCharset(y[S[0]], d.CHARSETS[S[1]] || d.DEFAULT_CHARSET), true);
          }
          index() {
            return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), true;
          }
          tabSet() {
            return this._activeBuffer.tabs[this._activeBuffer.x] = true, true;
          }
          reverseIndex() {
            if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
              const S = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
              this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, S, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
            } else this._activeBuffer.y--, this._restrictCursor();
            return true;
          }
          fullReset() {
            return this._parser.reset(), this._onRequestReset.fire(), true;
          }
          reset() {
            this._curAttrData = i.DEFAULT_ATTR_DATA.clone(), this._eraseAttrDataInternal = i.DEFAULT_ATTR_DATA.clone();
          }
          _eraseAttrData() {
            return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= 67108863 & this._curAttrData.bg, this._eraseAttrDataInternal;
          }
          setgLevel(S) {
            return this._charsetService.setgLevel(S), true;
          }
          screenAlignmentPattern() {
            const S = new t.CellData();
            S.content = 4194373, S.fg = this._curAttrData.fg, S.bg = this._curAttrData.bg, this._setCursor(0, 0);
            for (let b = 0; b < this._bufferService.rows; ++b) {
              const E = this._activeBuffer.ybase + this._activeBuffer.y + b, D = this._activeBuffer.lines.get(E);
              D && (D.fill(S), D.isWrapped = false);
            }
            return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), true;
          }
          requestStatusString(S, b) {
            const E = this._bufferService.buffer, D = this._optionsService.rawOptions;
            return ((T) => (this._coreService.triggerDataEvent(`${n.C0.ESC}${T}${n.C0.ESC}\\`), true))(S === '"q' ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : S === '"p' ? 'P1$r61;1"p' : S === "r" ? `P1$r${E.scrollTop + 1};${E.scrollBottom + 1}r` : S === "m" ? "P1$r0m" : S === " q" ? `P1$r${{ block: 2, underline: 4, bar: 6 }[D.cursorStyle] - (D.cursorBlink ? 1 : 0)} q` : "P0$r");
          }
          markRangeDirty(S, b) {
            this._dirtyRowTracker.markRangeDirty(S, b);
          }
        }
        r.InputHandler = B;
        let P = class {
          constructor(I) {
            this._bufferService = I, this.clearRange();
          }
          clearRange() {
            this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
          }
          markDirty(I) {
            I < this.start ? this.start = I : I > this.end && (this.end = I);
          }
          markRangeDirty(I, S) {
            I > S && (x = I, I = S, S = x), I < this.start && (this.start = I), S > this.end && (this.end = S);
          }
          markAllDirty() {
            this.markRangeDirty(0, this._bufferService.rows - 1);
          }
        };
        function U(I) {
          return 0 <= I && I < 256;
        }
        P = l([f(0, u.IBufferService)], P);
      }, 844: (O, r) => {
        function a(l) {
          for (const f of l) f.dispose();
          l.length = 0;
        }
        Object.defineProperty(r, "__esModule", { value: true }), r.getDisposeArrayDisposable = r.disposeArray = r.toDisposable = r.MutableDisposable = r.Disposable = void 0, r.Disposable = class {
          constructor() {
            this._disposables = [], this._isDisposed = false;
          }
          dispose() {
            this._isDisposed = true;
            for (const l of this._disposables) l.dispose();
            this._disposables.length = 0;
          }
          register(l) {
            return this._disposables.push(l), l;
          }
          unregister(l) {
            const f = this._disposables.indexOf(l);
            f !== -1 && this._disposables.splice(f, 1);
          }
        }, r.MutableDisposable = class {
          constructor() {
            this._isDisposed = false;
          }
          get value() {
            return this._isDisposed ? void 0 : this._value;
          }
          set value(l) {
            var f;
            this._isDisposed || l === this._value || ((f = this._value) == null || f.dispose(), this._value = l);
          }
          clear() {
            this.value = void 0;
          }
          dispose() {
            var l;
            this._isDisposed = true, (l = this._value) == null || l.dispose(), this._value = void 0;
          }
        }, r.toDisposable = function(l) {
          return { dispose: l };
        }, r.disposeArray = a, r.getDisposeArrayDisposable = function(l) {
          return { dispose: () => a(l) };
        };
      }, 1505: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.FourKeyMap = r.TwoKeyMap = void 0;
        class a {
          constructor() {
            this._data = {};
          }
          set(f, n, d) {
            this._data[f] || (this._data[f] = {}), this._data[f][n] = d;
          }
          get(f, n) {
            return this._data[f] ? this._data[f][n] : void 0;
          }
          clear() {
            this._data = {};
          }
        }
        r.TwoKeyMap = a, r.FourKeyMap = class {
          constructor() {
            this._data = new a();
          }
          set(l, f, n, d, v) {
            this._data.get(l, f) || this._data.set(l, f, new a()), this._data.get(l, f).set(n, d, v);
          }
          get(l, f, n, d) {
            var v;
            return (v = this._data.get(l, f)) == null ? void 0 : v.get(n, d);
          }
          clear() {
            this._data.clear();
          }
        };
      }, 6114: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.isChromeOS = r.isLinux = r.isWindows = r.isIphone = r.isIpad = r.isMac = r.getSafariVersion = r.isSafari = r.isLegacyEdge = r.isFirefox = r.isNode = void 0, r.isNode = typeof process < "u" && "title" in process;
        const a = r.isNode ? "node" : (void 0).userAgent, l = r.isNode ? "node" : (void 0).platform;
        r.isFirefox = a.includes("Firefox"), r.isLegacyEdge = a.includes("Edge"), r.isSafari = /^((?!chrome|android).)*safari/i.test(a), r.getSafariVersion = function() {
          if (!r.isSafari) return 0;
          const f = a.match(/Version\/(\d+)/);
          return f === null || f.length < 2 ? 0 : parseInt(f[1]);
        }, r.isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(l), r.isIpad = l === "iPad", r.isIphone = l === "iPhone", r.isWindows = ["Windows", "Win16", "Win32", "WinCE"].includes(l), r.isLinux = l.indexOf("Linux") >= 0, r.isChromeOS = /\bCrOS\b/.test(a);
      }, 6106: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.SortedList = void 0;
        let a = 0;
        r.SortedList = class {
          constructor(l) {
            this._getKey = l, this._array = [];
          }
          clear() {
            this._array.length = 0;
          }
          insert(l) {
            this._array.length !== 0 ? (a = this._search(this._getKey(l)), this._array.splice(a, 0, l)) : this._array.push(l);
          }
          delete(l) {
            if (this._array.length === 0) return false;
            const f = this._getKey(l);
            if (f === void 0 || (a = this._search(f), a === -1) || this._getKey(this._array[a]) !== f) return false;
            do
              if (this._array[a] === l) return this._array.splice(a, 1), true;
            while (++a < this._array.length && this._getKey(this._array[a]) === f);
            return false;
          }
          *getKeyIterator(l) {
            if (this._array.length !== 0 && (a = this._search(l), !(a < 0 || a >= this._array.length) && this._getKey(this._array[a]) === l)) do
              yield this._array[a];
            while (++a < this._array.length && this._getKey(this._array[a]) === l);
          }
          forEachByKey(l, f) {
            if (this._array.length !== 0 && (a = this._search(l), !(a < 0 || a >= this._array.length) && this._getKey(this._array[a]) === l)) do
              f(this._array[a]);
            while (++a < this._array.length && this._getKey(this._array[a]) === l);
          }
          values() {
            return [...this._array].values();
          }
          _search(l) {
            let f = 0, n = this._array.length - 1;
            for (; n >= f; ) {
              let d = f + n >> 1;
              const v = this._getKey(this._array[d]);
              if (v > l) n = d - 1;
              else {
                if (!(v < l)) {
                  for (; d > 0 && this._getKey(this._array[d - 1]) === l; ) d--;
                  return d;
                }
                f = d + 1;
              }
            }
            return f;
          }
        };
      }, 7226: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.DebouncedIdleTask = r.IdleTaskQueue = r.PriorityTaskQueue = void 0;
        const l = a(6114);
        class f {
          constructor() {
            this._tasks = [], this._i = 0;
          }
          enqueue(v) {
            this._tasks.push(v), this._start();
          }
          flush() {
            for (; this._i < this._tasks.length; ) this._tasks[this._i]() || this._i++;
            this.clear();
          }
          clear() {
            this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
          }
          _start() {
            this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
          }
          _process(v) {
            this._idleCallback = void 0;
            let g = 0, h = 0, i = v.timeRemaining(), s = 0;
            for (; this._i < this._tasks.length; ) {
              if (g = Date.now(), this._tasks[this._i]() || this._i++, g = Math.max(1, Date.now() - g), h = Math.max(g, h), s = v.timeRemaining(), 1.5 * h > s) return i - g < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(i - g))}ms`), void this._start();
              i = s;
            }
            this.clear();
          }
        }
        class n extends f {
          _requestCallback(v) {
            return setTimeout(() => v(this._createDeadline(16)));
          }
          _cancelCallback(v) {
            clearTimeout(v);
          }
          _createDeadline(v) {
            const g = Date.now() + v;
            return { timeRemaining: () => Math.max(0, g - Date.now()) };
          }
        }
        r.PriorityTaskQueue = n, r.IdleTaskQueue = !l.isNode && "requestIdleCallback" in void 0 ? class extends f {
          _requestCallback(d) {
            return requestIdleCallback();
          }
          _cancelCallback(d) {
          }
        } : n, r.DebouncedIdleTask = class {
          constructor() {
            this._queue = new r.IdleTaskQueue();
          }
          set(d) {
            this._queue.clear(), this._queue.enqueue(d);
          }
          flush() {
            this._queue.flush();
          }
        };
      }, 9282: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.updateWindowsModeWrappedState = void 0;
        const l = a(643);
        r.updateWindowsModeWrappedState = function(f) {
          const n = f.buffer.lines.get(f.buffer.ybase + f.buffer.y - 1), d = n == null ? void 0 : n.get(f.cols - 1), v = f.buffer.lines.get(f.buffer.ybase + f.buffer.y);
          v && d && (v.isWrapped = d[l.CHAR_DATA_CODE_INDEX] !== l.NULL_CELL_CODE && d[l.CHAR_DATA_CODE_INDEX] !== l.WHITESPACE_CELL_CODE);
        };
      }, 3734: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.ExtendedAttrs = r.AttributeData = void 0;
        class a {
          constructor() {
            this.fg = 0, this.bg = 0, this.extended = new l();
          }
          static toColorRGB(n) {
            return [n >>> 16 & 255, n >>> 8 & 255, 255 & n];
          }
          static fromColorRGB(n) {
            return (255 & n[0]) << 16 | (255 & n[1]) << 8 | 255 & n[2];
          }
          clone() {
            const n = new a();
            return n.fg = this.fg, n.bg = this.bg, n.extended = this.extended.clone(), n;
          }
          isInverse() {
            return 67108864 & this.fg;
          }
          isBold() {
            return 134217728 & this.fg;
          }
          isUnderline() {
            return this.hasExtendedAttrs() && this.extended.underlineStyle !== 0 ? 1 : 268435456 & this.fg;
          }
          isBlink() {
            return 536870912 & this.fg;
          }
          isInvisible() {
            return 1073741824 & this.fg;
          }
          isItalic() {
            return 67108864 & this.bg;
          }
          isDim() {
            return 134217728 & this.bg;
          }
          isStrikethrough() {
            return 2147483648 & this.fg;
          }
          isProtected() {
            return 536870912 & this.bg;
          }
          isOverline() {
            return 1073741824 & this.bg;
          }
          getFgColorMode() {
            return 50331648 & this.fg;
          }
          getBgColorMode() {
            return 50331648 & this.bg;
          }
          isFgRGB() {
            return (50331648 & this.fg) == 50331648;
          }
          isBgRGB() {
            return (50331648 & this.bg) == 50331648;
          }
          isFgPalette() {
            return (50331648 & this.fg) == 16777216 || (50331648 & this.fg) == 33554432;
          }
          isBgPalette() {
            return (50331648 & this.bg) == 16777216 || (50331648 & this.bg) == 33554432;
          }
          isFgDefault() {
            return (50331648 & this.fg) == 0;
          }
          isBgDefault() {
            return (50331648 & this.bg) == 0;
          }
          isAttributeDefault() {
            return this.fg === 0 && this.bg === 0;
          }
          getFgColor() {
            switch (50331648 & this.fg) {
              case 16777216:
              case 33554432:
                return 255 & this.fg;
              case 50331648:
                return 16777215 & this.fg;
              default:
                return -1;
            }
          }
          getBgColor() {
            switch (50331648 & this.bg) {
              case 16777216:
              case 33554432:
                return 255 & this.bg;
              case 50331648:
                return 16777215 & this.bg;
              default:
                return -1;
            }
          }
          hasExtendedAttrs() {
            return 268435456 & this.bg;
          }
          updateExtended() {
            this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
          }
          getUnderlineColor() {
            if (268435456 & this.bg && ~this.extended.underlineColor) switch (50331648 & this.extended.underlineColor) {
              case 16777216:
              case 33554432:
                return 255 & this.extended.underlineColor;
              case 50331648:
                return 16777215 & this.extended.underlineColor;
              default:
                return this.getFgColor();
            }
            return this.getFgColor();
          }
          getUnderlineColorMode() {
            return 268435456 & this.bg && ~this.extended.underlineColor ? 50331648 & this.extended.underlineColor : this.getFgColorMode();
          }
          isUnderlineColorRGB() {
            return 268435456 & this.bg && ~this.extended.underlineColor ? (50331648 & this.extended.underlineColor) == 50331648 : this.isFgRGB();
          }
          isUnderlineColorPalette() {
            return 268435456 & this.bg && ~this.extended.underlineColor ? (50331648 & this.extended.underlineColor) == 16777216 || (50331648 & this.extended.underlineColor) == 33554432 : this.isFgPalette();
          }
          isUnderlineColorDefault() {
            return 268435456 & this.bg && ~this.extended.underlineColor ? (50331648 & this.extended.underlineColor) == 0 : this.isFgDefault();
          }
          getUnderlineStyle() {
            return 268435456 & this.fg ? 268435456 & this.bg ? this.extended.underlineStyle : 1 : 0;
          }
          getUnderlineVariantOffset() {
            return this.extended.underlineVariantOffset;
          }
        }
        r.AttributeData = a;
        class l {
          get ext() {
            return this._urlId ? -469762049 & this._ext | this.underlineStyle << 26 : this._ext;
          }
          set ext(n) {
            this._ext = n;
          }
          get underlineStyle() {
            return this._urlId ? 5 : (469762048 & this._ext) >> 26;
          }
          set underlineStyle(n) {
            this._ext &= -469762049, this._ext |= n << 26 & 469762048;
          }
          get underlineColor() {
            return 67108863 & this._ext;
          }
          set underlineColor(n) {
            this._ext &= -67108864, this._ext |= 67108863 & n;
          }
          get urlId() {
            return this._urlId;
          }
          set urlId(n) {
            this._urlId = n;
          }
          get underlineVariantOffset() {
            const n = (3758096384 & this._ext) >> 29;
            return n < 0 ? 4294967288 ^ n : n;
          }
          set underlineVariantOffset(n) {
            this._ext &= 536870911, this._ext |= n << 29 & 3758096384;
          }
          constructor(n = 0, d = 0) {
            this._ext = 0, this._urlId = 0, this._ext = n, this._urlId = d;
          }
          clone() {
            return new l(this._ext, this._urlId);
          }
          isEmpty() {
            return this.underlineStyle === 0 && this._urlId === 0;
          }
        }
        r.ExtendedAttrs = l;
      }, 9092: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.Buffer = r.MAX_BUFFER_SIZE = void 0;
        const l = a(6349), f = a(7226), n = a(3734), d = a(8437), v = a(4634), g = a(511), h = a(643), i = a(4863), s = a(7116);
        r.MAX_BUFFER_SIZE = 4294967295, r.Buffer = class {
          constructor(e, t, o) {
            this._hasScrollback = e, this._optionsService = t, this._bufferService = o, this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.tabs = {}, this.savedY = 0, this.savedX = 0, this.savedCurAttrData = d.DEFAULT_ATTR_DATA.clone(), this.savedCharset = s.DEFAULT_CHARSET, this.markers = [], this._nullCell = g.CellData.fromCharData([0, h.NULL_CELL_CHAR, h.NULL_CELL_WIDTH, h.NULL_CELL_CODE]), this._whitespaceCell = g.CellData.fromCharData([0, h.WHITESPACE_CELL_CHAR, h.WHITESPACE_CELL_WIDTH, h.WHITESPACE_CELL_CODE]), this._isClearing = false, this._memoryCleanupQueue = new f.IdleTaskQueue(), this._memoryCleanupPosition = 0, this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new l.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
          }
          getNullCell(e) {
            return e ? (this._nullCell.fg = e.fg, this._nullCell.bg = e.bg, this._nullCell.extended = e.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new n.ExtendedAttrs()), this._nullCell;
          }
          getWhitespaceCell(e) {
            return e ? (this._whitespaceCell.fg = e.fg, this._whitespaceCell.bg = e.bg, this._whitespaceCell.extended = e.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new n.ExtendedAttrs()), this._whitespaceCell;
          }
          getBlankLine(e, t) {
            return new d.BufferLine(this._bufferService.cols, this.getNullCell(e), t);
          }
          get hasScrollback() {
            return this._hasScrollback && this.lines.maxLength > this._rows;
          }
          get isCursorInViewport() {
            const e = this.ybase + this.y - this.ydisp;
            return e >= 0 && e < this._rows;
          }
          _getCorrectBufferLength(e) {
            if (!this._hasScrollback) return e;
            const t = e + this._optionsService.rawOptions.scrollback;
            return t > r.MAX_BUFFER_SIZE ? r.MAX_BUFFER_SIZE : t;
          }
          fillViewportRows(e) {
            if (this.lines.length === 0) {
              e === void 0 && (e = d.DEFAULT_ATTR_DATA);
              let t = this._rows;
              for (; t--; ) this.lines.push(this.getBlankLine(e));
            }
          }
          clear() {
            this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new l.CircularList(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
          }
          resize(e, t) {
            const o = this.getNullCell(d.DEFAULT_ATTR_DATA);
            let u = 0;
            const _ = this._getCorrectBufferLength(t);
            if (_ > this.lines.maxLength && (this.lines.maxLength = _), this.lines.length > 0) {
              if (this._cols < e) for (let c = 0; c < this.lines.length; c++) u += +this.lines.get(c).resize(e, o);
              let p = 0;
              if (this._rows < t) for (let c = this._rows; c < t; c++) this.lines.length < t + this.ybase && (this._optionsService.rawOptions.windowsMode || this._optionsService.rawOptions.windowsPty.backend !== void 0 || this._optionsService.rawOptions.windowsPty.buildNumber !== void 0 ? this.lines.push(new d.BufferLine(e, o)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + p + 1 ? (this.ybase--, p++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new d.BufferLine(e, o)));
              else for (let c = this._rows; c > t; c--) this.lines.length > t + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
              if (_ < this.lines.maxLength) {
                const c = this.lines.length - _;
                c > 0 && (this.lines.trimStart(c), this.ybase = Math.max(this.ybase - c, 0), this.ydisp = Math.max(this.ydisp - c, 0), this.savedY = Math.max(this.savedY - c, 0)), this.lines.maxLength = _;
              }
              this.x = Math.min(this.x, e - 1), this.y = Math.min(this.y, t - 1), p && (this.y += p), this.savedX = Math.min(this.savedX, e - 1), this.scrollTop = 0;
            }
            if (this.scrollBottom = t - 1, this._isReflowEnabled && (this._reflow(e, t), this._cols > e)) for (let p = 0; p < this.lines.length; p++) u += +this.lines.get(p).resize(e, o);
            this._cols = e, this._rows = t, this._memoryCleanupQueue.clear(), u > 0.1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue(() => this._batchedMemoryCleanup()));
          }
          _batchedMemoryCleanup() {
            let e = true;
            this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, e = false);
            let t = 0;
            for (; this._memoryCleanupPosition < this.lines.length; ) if (t += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), t > 100) return true;
            return e;
          }
          get _isReflowEnabled() {
            const e = this._optionsService.rawOptions.windowsPty;
            return e && e.buildNumber ? this._hasScrollback && e.backend === "conpty" && e.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
          }
          _reflow(e, t) {
            this._cols !== e && (e > this._cols ? this._reflowLarger(e, t) : this._reflowSmaller(e, t));
          }
          _reflowLarger(e, t) {
            const o = (0, v.reflowLargerGetLinesToRemove)(this.lines, this._cols, e, this.ybase + this.y, this.getNullCell(d.DEFAULT_ATTR_DATA));
            if (o.length > 0) {
              const u = (0, v.reflowLargerCreateNewLayout)(this.lines, o);
              (0, v.reflowLargerApplyNewLayout)(this.lines, u.layout), this._reflowLargerAdjustViewport(e, t, u.countRemoved);
            }
          }
          _reflowLargerAdjustViewport(e, t, o) {
            const u = this.getNullCell(d.DEFAULT_ATTR_DATA);
            let _ = o;
            for (; _-- > 0; ) this.ybase === 0 ? (this.y > 0 && this.y--, this.lines.length < t && this.lines.push(new d.BufferLine(e, u))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
            this.savedY = Math.max(this.savedY - o, 0);
          }
          _reflowSmaller(e, t) {
            const o = this.getNullCell(d.DEFAULT_ATTR_DATA), u = [];
            let _ = 0;
            for (let p = this.lines.length - 1; p >= 0; p--) {
              let c = this.lines.get(p);
              if (!c || !c.isWrapped && c.getTrimmedLength() <= e) continue;
              const m = [c];
              for (; c.isWrapped && p > 0; ) c = this.lines.get(--p), m.unshift(c);
              const y = this.ybase + this.y;
              if (y >= p && y < p + m.length) continue;
              const k = m[m.length - 1].getTrimmedLength(), L = (0, v.reflowSmallerGetNewLineLengths)(m, this._cols, e), w = L.length - m.length;
              let x;
              x = this.ybase === 0 && this.y !== this.lines.length - 1 ? Math.max(0, this.y - this.lines.maxLength + w) : Math.max(0, this.lines.length - this.lines.maxLength + w);
              const B = [];
              for (let E = 0; E < w; E++) {
                const D = this.getBlankLine(d.DEFAULT_ATTR_DATA, true);
                B.push(D);
              }
              B.length > 0 && (u.push({ start: p + m.length + _, newLines: B }), _ += B.length), m.push(...B);
              let P = L.length - 1, U = L[P];
              U === 0 && (P--, U = L[P]);
              let I = m.length - w - 1, S = k;
              for (; I >= 0; ) {
                const E = Math.min(S, U);
                if (m[P] === void 0) break;
                if (m[P].copyCellsFrom(m[I], S - E, U - E, E, true), U -= E, U === 0 && (P--, U = L[P]), S -= E, S === 0) {
                  I--;
                  const D = Math.max(I, 0);
                  S = (0, v.getWrappedLineTrimmedLength)(m, D, this._cols);
                }
              }
              for (let E = 0; E < m.length; E++) L[E] < e && m[E].setCell(L[E], o);
              let b = w - x;
              for (; b-- > 0; ) this.ybase === 0 ? this.y < t - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + _) - t && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
              this.savedY = Math.min(this.savedY + w, this.ybase + t - 1);
            }
            if (u.length > 0) {
              const p = [], c = [];
              for (let P = 0; P < this.lines.length; P++) c.push(this.lines.get(P));
              const m = this.lines.length;
              let y = m - 1, k = 0, L = u[k];
              this.lines.length = Math.min(this.lines.maxLength, this.lines.length + _);
              let w = 0;
              for (let P = Math.min(this.lines.maxLength - 1, m + _ - 1); P >= 0; P--) if (L && L.start > y + w) {
                for (let U = L.newLines.length - 1; U >= 0; U--) this.lines.set(P--, L.newLines[U]);
                P++, p.push({ index: y + 1, amount: L.newLines.length }), w += L.newLines.length, L = u[++k];
              } else this.lines.set(P, c[y--]);
              let x = 0;
              for (let P = p.length - 1; P >= 0; P--) p[P].index += x, this.lines.onInsertEmitter.fire(p[P]), x += p[P].amount;
              const B = Math.max(0, m + _ - this.lines.maxLength);
              B > 0 && this.lines.onTrimEmitter.fire(B);
            }
          }
          translateBufferLineToString(e, t, o = 0, u) {
            const _ = this.lines.get(e);
            return _ ? _.translateToString(t, o, u) : "";
          }
          getWrappedRangeForLine(e) {
            let t = e, o = e;
            for (; t > 0 && this.lines.get(t).isWrapped; ) t--;
            for (; o + 1 < this.lines.length && this.lines.get(o + 1).isWrapped; ) o++;
            return { first: t, last: o };
          }
          setupTabStops(e) {
            for (e != null ? this.tabs[e] || (e = this.prevStop(e)) : (this.tabs = {}, e = 0); e < this._cols; e += this._optionsService.rawOptions.tabStopWidth) this.tabs[e] = true;
          }
          prevStop(e) {
            for (e == null && (e = this.x); !this.tabs[--e] && e > 0; ) ;
            return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e;
          }
          nextStop(e) {
            for (e == null && (e = this.x); !this.tabs[++e] && e < this._cols; ) ;
            return e >= this._cols ? this._cols - 1 : e < 0 ? 0 : e;
          }
          clearMarkers(e) {
            this._isClearing = true;
            for (let t = 0; t < this.markers.length; t++) this.markers[t].line === e && (this.markers[t].dispose(), this.markers.splice(t--, 1));
            this._isClearing = false;
          }
          clearAllMarkers() {
            this._isClearing = true;
            for (let e = 0; e < this.markers.length; e++) this.markers[e].dispose(), this.markers.splice(e--, 1);
            this._isClearing = false;
          }
          addMarker(e) {
            const t = new i.Marker(e);
            return this.markers.push(t), t.register(this.lines.onTrim((o) => {
              t.line -= o, t.line < 0 && t.dispose();
            })), t.register(this.lines.onInsert((o) => {
              t.line >= o.index && (t.line += o.amount);
            })), t.register(this.lines.onDelete((o) => {
              t.line >= o.index && t.line < o.index + o.amount && t.dispose(), t.line > o.index && (t.line -= o.amount);
            })), t.register(t.onDispose(() => this._removeMarker(t))), t;
          }
          _removeMarker(e) {
            this._isClearing || this.markers.splice(this.markers.indexOf(e), 1);
          }
        };
      }, 8437: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.BufferLine = r.DEFAULT_ATTR_DATA = void 0;
        const l = a(3734), f = a(511), n = a(643), d = a(482);
        r.DEFAULT_ATTR_DATA = Object.freeze(new l.AttributeData());
        let v = 0;
        class g {
          constructor(i, s, e = false) {
            this.isWrapped = e, this._combined = {}, this._extendedAttrs = {}, this._data = new Uint32Array(3 * i);
            const t = s || f.CellData.fromCharData([0, n.NULL_CELL_CHAR, n.NULL_CELL_WIDTH, n.NULL_CELL_CODE]);
            for (let o = 0; o < i; ++o) this.setCell(o, t);
            this.length = i;
          }
          get(i) {
            const s = this._data[3 * i + 0], e = 2097151 & s;
            return [this._data[3 * i + 1], 2097152 & s ? this._combined[i] : e ? (0, d.stringFromCodePoint)(e) : "", s >> 22, 2097152 & s ? this._combined[i].charCodeAt(this._combined[i].length - 1) : e];
          }
          set(i, s) {
            this._data[3 * i + 1] = s[n.CHAR_DATA_ATTR_INDEX], s[n.CHAR_DATA_CHAR_INDEX].length > 1 ? (this._combined[i] = s[1], this._data[3 * i + 0] = 2097152 | i | s[n.CHAR_DATA_WIDTH_INDEX] << 22) : this._data[3 * i + 0] = s[n.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | s[n.CHAR_DATA_WIDTH_INDEX] << 22;
          }
          getWidth(i) {
            return this._data[3 * i + 0] >> 22;
          }
          hasWidth(i) {
            return 12582912 & this._data[3 * i + 0];
          }
          getFg(i) {
            return this._data[3 * i + 1];
          }
          getBg(i) {
            return this._data[3 * i + 2];
          }
          hasContent(i) {
            return 4194303 & this._data[3 * i + 0];
          }
          getCodePoint(i) {
            const s = this._data[3 * i + 0];
            return 2097152 & s ? this._combined[i].charCodeAt(this._combined[i].length - 1) : 2097151 & s;
          }
          isCombined(i) {
            return 2097152 & this._data[3 * i + 0];
          }
          getString(i) {
            const s = this._data[3 * i + 0];
            return 2097152 & s ? this._combined[i] : 2097151 & s ? (0, d.stringFromCodePoint)(2097151 & s) : "";
          }
          isProtected(i) {
            return 536870912 & this._data[3 * i + 2];
          }
          loadCell(i, s) {
            return v = 3 * i, s.content = this._data[v + 0], s.fg = this._data[v + 1], s.bg = this._data[v + 2], 2097152 & s.content && (s.combinedData = this._combined[i]), 268435456 & s.bg && (s.extended = this._extendedAttrs[i]), s;
          }
          setCell(i, s) {
            2097152 & s.content && (this._combined[i] = s.combinedData), 268435456 & s.bg && (this._extendedAttrs[i] = s.extended), this._data[3 * i + 0] = s.content, this._data[3 * i + 1] = s.fg, this._data[3 * i + 2] = s.bg;
          }
          setCellFromCodepoint(i, s, e, t) {
            268435456 & t.bg && (this._extendedAttrs[i] = t.extended), this._data[3 * i + 0] = s | e << 22, this._data[3 * i + 1] = t.fg, this._data[3 * i + 2] = t.bg;
          }
          addCodepointToCell(i, s, e) {
            let t = this._data[3 * i + 0];
            2097152 & t ? this._combined[i] += (0, d.stringFromCodePoint)(s) : 2097151 & t ? (this._combined[i] = (0, d.stringFromCodePoint)(2097151 & t) + (0, d.stringFromCodePoint)(s), t &= -2097152, t |= 2097152) : t = s | 4194304, e && (t &= -12582913, t |= e << 22), this._data[3 * i + 0] = t;
          }
          insertCells(i, s, e) {
            if ((i %= this.length) && this.getWidth(i - 1) === 2 && this.setCellFromCodepoint(i - 1, 0, 1, e), s < this.length - i) {
              const t = new f.CellData();
              for (let o = this.length - i - s - 1; o >= 0; --o) this.setCell(i + s + o, this.loadCell(i + o, t));
              for (let o = 0; o < s; ++o) this.setCell(i + o, e);
            } else for (let t = i; t < this.length; ++t) this.setCell(t, e);
            this.getWidth(this.length - 1) === 2 && this.setCellFromCodepoint(this.length - 1, 0, 1, e);
          }
          deleteCells(i, s, e) {
            if (i %= this.length, s < this.length - i) {
              const t = new f.CellData();
              for (let o = 0; o < this.length - i - s; ++o) this.setCell(i + o, this.loadCell(i + s + o, t));
              for (let o = this.length - s; o < this.length; ++o) this.setCell(o, e);
            } else for (let t = i; t < this.length; ++t) this.setCell(t, e);
            i && this.getWidth(i - 1) === 2 && this.setCellFromCodepoint(i - 1, 0, 1, e), this.getWidth(i) !== 0 || this.hasContent(i) || this.setCellFromCodepoint(i, 0, 1, e);
          }
          replaceCells(i, s, e, t = false) {
            if (t) for (i && this.getWidth(i - 1) === 2 && !this.isProtected(i - 1) && this.setCellFromCodepoint(i - 1, 0, 1, e), s < this.length && this.getWidth(s - 1) === 2 && !this.isProtected(s) && this.setCellFromCodepoint(s, 0, 1, e); i < s && i < this.length; ) this.isProtected(i) || this.setCell(i, e), i++;
            else for (i && this.getWidth(i - 1) === 2 && this.setCellFromCodepoint(i - 1, 0, 1, e), s < this.length && this.getWidth(s - 1) === 2 && this.setCellFromCodepoint(s, 0, 1, e); i < s && i < this.length; ) this.setCell(i++, e);
          }
          resize(i, s) {
            if (i === this.length) return 4 * this._data.length * 2 < this._data.buffer.byteLength;
            const e = 3 * i;
            if (i > this.length) {
              if (this._data.buffer.byteLength >= 4 * e) this._data = new Uint32Array(this._data.buffer, 0, e);
              else {
                const t = new Uint32Array(e);
                t.set(this._data), this._data = t;
              }
              for (let t = this.length; t < i; ++t) this.setCell(t, s);
            } else {
              this._data = this._data.subarray(0, e);
              const t = Object.keys(this._combined);
              for (let u = 0; u < t.length; u++) {
                const _ = parseInt(t[u], 10);
                _ >= i && delete this._combined[_];
              }
              const o = Object.keys(this._extendedAttrs);
              for (let u = 0; u < o.length; u++) {
                const _ = parseInt(o[u], 10);
                _ >= i && delete this._extendedAttrs[_];
              }
            }
            return this.length = i, 4 * e * 2 < this._data.buffer.byteLength;
          }
          cleanupMemory() {
            if (4 * this._data.length * 2 < this._data.buffer.byteLength) {
              const i = new Uint32Array(this._data.length);
              return i.set(this._data), this._data = i, 1;
            }
            return 0;
          }
          fill(i, s = false) {
            if (s) for (let e = 0; e < this.length; ++e) this.isProtected(e) || this.setCell(e, i);
            else {
              this._combined = {}, this._extendedAttrs = {};
              for (let e = 0; e < this.length; ++e) this.setCell(e, i);
            }
          }
          copyFrom(i) {
            this.length !== i.length ? this._data = new Uint32Array(i._data) : this._data.set(i._data), this.length = i.length, this._combined = {};
            for (const s in i._combined) this._combined[s] = i._combined[s];
            this._extendedAttrs = {};
            for (const s in i._extendedAttrs) this._extendedAttrs[s] = i._extendedAttrs[s];
            this.isWrapped = i.isWrapped;
          }
          clone() {
            const i = new g(0);
            i._data = new Uint32Array(this._data), i.length = this.length;
            for (const s in this._combined) i._combined[s] = this._combined[s];
            for (const s in this._extendedAttrs) i._extendedAttrs[s] = this._extendedAttrs[s];
            return i.isWrapped = this.isWrapped, i;
          }
          getTrimmedLength() {
            for (let i = this.length - 1; i >= 0; --i) if (4194303 & this._data[3 * i + 0]) return i + (this._data[3 * i + 0] >> 22);
            return 0;
          }
          getNoBgTrimmedLength() {
            for (let i = this.length - 1; i >= 0; --i) if (4194303 & this._data[3 * i + 0] || 50331648 & this._data[3 * i + 2]) return i + (this._data[3 * i + 0] >> 22);
            return 0;
          }
          copyCellsFrom(i, s, e, t, o) {
            const u = i._data;
            if (o) for (let p = t - 1; p >= 0; p--) {
              for (let c = 0; c < 3; c++) this._data[3 * (e + p) + c] = u[3 * (s + p) + c];
              268435456 & u[3 * (s + p) + 2] && (this._extendedAttrs[e + p] = i._extendedAttrs[s + p]);
            }
            else for (let p = 0; p < t; p++) {
              for (let c = 0; c < 3; c++) this._data[3 * (e + p) + c] = u[3 * (s + p) + c];
              268435456 & u[3 * (s + p) + 2] && (this._extendedAttrs[e + p] = i._extendedAttrs[s + p]);
            }
            const _ = Object.keys(i._combined);
            for (let p = 0; p < _.length; p++) {
              const c = parseInt(_[p], 10);
              c >= s && (this._combined[c - s + e] = i._combined[c]);
            }
          }
          translateToString(i, s, e, t) {
            s = s != null ? s : 0, e = e != null ? e : this.length, i && (e = Math.min(e, this.getTrimmedLength())), t && (t.length = 0);
            let o = "";
            for (; s < e; ) {
              const u = this._data[3 * s + 0], _ = 2097151 & u, p = 2097152 & u ? this._combined[s] : _ ? (0, d.stringFromCodePoint)(_) : n.WHITESPACE_CELL_CHAR;
              if (o += p, t) for (let c = 0; c < p.length; ++c) t.push(s);
              s += u >> 22 || 1;
            }
            return t && t.push(s), o;
          }
        }
        r.BufferLine = g;
      }, 4841: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.getRangeLength = void 0, r.getRangeLength = function(a, l) {
          if (a.start.y > a.end.y) throw new Error(`Buffer range end (${a.end.x}, ${a.end.y}) cannot be before start (${a.start.x}, ${a.start.y})`);
          return l * (a.end.y - a.start.y) + (a.end.x - a.start.x + 1);
        };
      }, 4634: (O, r) => {
        function a(l, f, n) {
          if (f === l.length - 1) return l[f].getTrimmedLength();
          const d = !l[f].hasContent(n - 1) && l[f].getWidth(n - 1) === 1, v = l[f + 1].getWidth(0) === 2;
          return d && v ? n - 1 : n;
        }
        Object.defineProperty(r, "__esModule", { value: true }), r.getWrappedLineTrimmedLength = r.reflowSmallerGetNewLineLengths = r.reflowLargerApplyNewLayout = r.reflowLargerCreateNewLayout = r.reflowLargerGetLinesToRemove = void 0, r.reflowLargerGetLinesToRemove = function(l, f, n, d, v) {
          const g = [];
          for (let h = 0; h < l.length - 1; h++) {
            let i = h, s = l.get(++i);
            if (!s.isWrapped) continue;
            const e = [l.get(h)];
            for (; i < l.length && s.isWrapped; ) e.push(s), s = l.get(++i);
            if (d >= h && d < i) {
              h += e.length - 1;
              continue;
            }
            let t = 0, o = a(e, t, f), u = 1, _ = 0;
            for (; u < e.length; ) {
              const c = a(e, u, f), m = c - _, y = n - o, k = Math.min(m, y);
              e[t].copyCellsFrom(e[u], _, o, k, false), o += k, o === n && (t++, o = 0), _ += k, _ === c && (u++, _ = 0), o === 0 && t !== 0 && e[t - 1].getWidth(n - 1) === 2 && (e[t].copyCellsFrom(e[t - 1], n - 1, o++, 1, false), e[t - 1].setCell(n - 1, v));
            }
            e[t].replaceCells(o, n, v);
            let p = 0;
            for (let c = e.length - 1; c > 0 && (c > t || e[c].getTrimmedLength() === 0); c--) p++;
            p > 0 && (g.push(h + e.length - p), g.push(p)), h += e.length - 1;
          }
          return g;
        }, r.reflowLargerCreateNewLayout = function(l, f) {
          const n = [];
          let d = 0, v = f[d], g = 0;
          for (let h = 0; h < l.length; h++) if (v === h) {
            const i = f[++d];
            l.onDeleteEmitter.fire({ index: h - g, amount: i }), h += i - 1, g += i, v = f[++d];
          } else n.push(h);
          return { layout: n, countRemoved: g };
        }, r.reflowLargerApplyNewLayout = function(l, f) {
          const n = [];
          for (let d = 0; d < f.length; d++) n.push(l.get(f[d]));
          for (let d = 0; d < n.length; d++) l.set(d, n[d]);
          l.length = f.length;
        }, r.reflowSmallerGetNewLineLengths = function(l, f, n) {
          const d = [], v = l.map((s, e) => a(l, e, f)).reduce((s, e) => s + e);
          let g = 0, h = 0, i = 0;
          for (; i < v; ) {
            if (v - i < n) {
              d.push(v - i);
              break;
            }
            g += n;
            const s = a(l, h, f);
            g > s && (g -= s, h++);
            const e = l[h].getWidth(g - 1) === 2;
            e && g--;
            const t = e ? n - 1 : n;
            d.push(t), i += t;
          }
          return d;
        }, r.getWrappedLineTrimmedLength = a;
      }, 5295: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.BufferSet = void 0;
        const l = a(8460), f = a(844), n = a(9092);
        class d extends f.Disposable {
          constructor(g, h) {
            super(), this._optionsService = g, this._bufferService = h, this._onBufferActivate = this.register(new l.EventEmitter()), this.onBufferActivate = this._onBufferActivate.event, this.reset(), this.register(this._optionsService.onSpecificOptionChange("scrollback", () => this.resize(this._bufferService.cols, this._bufferService.rows))), this.register(this._optionsService.onSpecificOptionChange("tabStopWidth", () => this.setupTabStops()));
          }
          reset() {
            this._normal = new n.Buffer(true, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new n.Buffer(false, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }), this.setupTabStops();
          }
          get alt() {
            return this._alt;
          }
          get active() {
            return this._activeBuffer;
          }
          get normal() {
            return this._normal;
          }
          activateNormalBuffer() {
            this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }));
          }
          activateAltBuffer(g) {
            this._activeBuffer !== this._alt && (this._alt.fillViewportRows(g), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({ activeBuffer: this._alt, inactiveBuffer: this._normal }));
          }
          resize(g, h) {
            this._normal.resize(g, h), this._alt.resize(g, h), this.setupTabStops(g);
          }
          setupTabStops(g) {
            this._normal.setupTabStops(g), this._alt.setupTabStops(g);
          }
        }
        r.BufferSet = d;
      }, 511: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.CellData = void 0;
        const l = a(482), f = a(643), n = a(3734);
        class d extends n.AttributeData {
          constructor() {
            super(...arguments), this.content = 0, this.fg = 0, this.bg = 0, this.extended = new n.ExtendedAttrs(), this.combinedData = "";
          }
          static fromCharData(g) {
            const h = new d();
            return h.setFromCharData(g), h;
          }
          isCombined() {
            return 2097152 & this.content;
          }
          getWidth() {
            return this.content >> 22;
          }
          getChars() {
            return 2097152 & this.content ? this.combinedData : 2097151 & this.content ? (0, l.stringFromCodePoint)(2097151 & this.content) : "";
          }
          getCode() {
            return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : 2097151 & this.content;
          }
          setFromCharData(g) {
            this.fg = g[f.CHAR_DATA_ATTR_INDEX], this.bg = 0;
            let h = false;
            if (g[f.CHAR_DATA_CHAR_INDEX].length > 2) h = true;
            else if (g[f.CHAR_DATA_CHAR_INDEX].length === 2) {
              const i = g[f.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
              if (55296 <= i && i <= 56319) {
                const s = g[f.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
                56320 <= s && s <= 57343 ? this.content = 1024 * (i - 55296) + s - 56320 + 65536 | g[f.CHAR_DATA_WIDTH_INDEX] << 22 : h = true;
              } else h = true;
            } else this.content = g[f.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | g[f.CHAR_DATA_WIDTH_INDEX] << 22;
            h && (this.combinedData = g[f.CHAR_DATA_CHAR_INDEX], this.content = 2097152 | g[f.CHAR_DATA_WIDTH_INDEX] << 22);
          }
          getAsCharData() {
            return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
          }
        }
        r.CellData = d;
      }, 643: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.WHITESPACE_CELL_CODE = r.WHITESPACE_CELL_WIDTH = r.WHITESPACE_CELL_CHAR = r.NULL_CELL_CODE = r.NULL_CELL_WIDTH = r.NULL_CELL_CHAR = r.CHAR_DATA_CODE_INDEX = r.CHAR_DATA_WIDTH_INDEX = r.CHAR_DATA_CHAR_INDEX = r.CHAR_DATA_ATTR_INDEX = r.DEFAULT_EXT = r.DEFAULT_ATTR = r.DEFAULT_COLOR = void 0, r.DEFAULT_COLOR = 0, r.DEFAULT_ATTR = 256 | r.DEFAULT_COLOR << 9, r.DEFAULT_EXT = 0, r.CHAR_DATA_ATTR_INDEX = 0, r.CHAR_DATA_CHAR_INDEX = 1, r.CHAR_DATA_WIDTH_INDEX = 2, r.CHAR_DATA_CODE_INDEX = 3, r.NULL_CELL_CHAR = "", r.NULL_CELL_WIDTH = 1, r.NULL_CELL_CODE = 0, r.WHITESPACE_CELL_CHAR = " ", r.WHITESPACE_CELL_WIDTH = 1, r.WHITESPACE_CELL_CODE = 32;
      }, 4863: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.Marker = void 0;
        const l = a(8460), f = a(844);
        class n {
          get id() {
            return this._id;
          }
          constructor(v) {
            this.line = v, this.isDisposed = false, this._disposables = [], this._id = n._nextId++, this._onDispose = this.register(new l.EventEmitter()), this.onDispose = this._onDispose.event;
          }
          dispose() {
            this.isDisposed || (this.isDisposed = true, this.line = -1, this._onDispose.fire(), (0, f.disposeArray)(this._disposables), this._disposables.length = 0);
          }
          register(v) {
            return this._disposables.push(v), v;
          }
        }
        r.Marker = n, n._nextId = 1;
      }, 7116: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.DEFAULT_CHARSET = r.CHARSETS = void 0, r.CHARSETS = {}, r.DEFAULT_CHARSET = r.CHARSETS.B, r.CHARSETS[0] = { "`": "\u25C6", a: "\u2592", b: "\u2409", c: "\u240C", d: "\u240D", e: "\u240A", f: "\xB0", g: "\xB1", h: "\u2424", i: "\u240B", j: "\u2518", k: "\u2510", l: "\u250C", m: "\u2514", n: "\u253C", o: "\u23BA", p: "\u23BB", q: "\u2500", r: "\u23BC", s: "\u23BD", t: "\u251C", u: "\u2524", v: "\u2534", w: "\u252C", x: "\u2502", y: "\u2264", z: "\u2265", "{": "\u03C0", "|": "\u2260", "}": "\xA3", "~": "\xB7" }, r.CHARSETS.A = { "#": "\xA3" }, r.CHARSETS.B = void 0, r.CHARSETS[4] = { "#": "\xA3", "@": "\xBE", "[": "ij", "\\": "\xBD", "]": "|", "{": "\xA8", "|": "f", "}": "\xBC", "~": "\xB4" }, r.CHARSETS.C = r.CHARSETS[5] = { "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" }, r.CHARSETS.R = { "#": "\xA3", "@": "\xE0", "[": "\xB0", "\\": "\xE7", "]": "\xA7", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xA8" }, r.CHARSETS.Q = { "@": "\xE0", "[": "\xE2", "\\": "\xE7", "]": "\xEA", "^": "\xEE", "`": "\xF4", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xFB" }, r.CHARSETS.K = { "@": "\xA7", "[": "\xC4", "\\": "\xD6", "]": "\xDC", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xDF" }, r.CHARSETS.Y = { "#": "\xA3", "@": "\xA7", "[": "\xB0", "\\": "\xE7", "]": "\xE9", "`": "\xF9", "{": "\xE0", "|": "\xF2", "}": "\xE8", "~": "\xEC" }, r.CHARSETS.E = r.CHARSETS[6] = { "@": "\xC4", "[": "\xC6", "\\": "\xD8", "]": "\xC5", "^": "\xDC", "`": "\xE4", "{": "\xE6", "|": "\xF8", "}": "\xE5", "~": "\xFC" }, r.CHARSETS.Z = { "#": "\xA3", "@": "\xA7", "[": "\xA1", "\\": "\xD1", "]": "\xBF", "{": "\xB0", "|": "\xF1", "}": "\xE7" }, r.CHARSETS.H = r.CHARSETS[7] = { "@": "\xC9", "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" }, r.CHARSETS["="] = { "#": "\xF9", "@": "\xE0", "[": "\xE9", "\\": "\xE7", "]": "\xEA", "^": "\xEE", _: "\xE8", "`": "\xF4", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xFB" };
      }, 2584: (O, r) => {
        var a, l, f;
        Object.defineProperty(r, "__esModule", { value: true }), r.C1_ESCAPED = r.C1 = r.C0 = void 0, function(n) {
          n.NUL = "\0", n.SOH = "", n.STX = "", n.ETX = "", n.EOT = "", n.ENQ = "", n.ACK = "", n.BEL = "\x07", n.BS = "\b", n.HT = "	", n.LF = `
`, n.VT = "\v", n.FF = "\f", n.CR = "\r", n.SO = "", n.SI = "", n.DLE = "", n.DC1 = "", n.DC2 = "", n.DC3 = "", n.DC4 = "", n.NAK = "", n.SYN = "", n.ETB = "", n.CAN = "", n.EM = "", n.SUB = "", n.ESC = "\x1B", n.FS = "", n.GS = "", n.RS = "", n.US = "", n.SP = " ", n.DEL = "\x7F";
        }(a || (r.C0 = a = {})), function(n) {
          n.PAD = "\x80", n.HOP = "\x81", n.BPH = "\x82", n.NBH = "\x83", n.IND = "\x84", n.NEL = "\x85", n.SSA = "\x86", n.ESA = "\x87", n.HTS = "\x88", n.HTJ = "\x89", n.VTS = "\x8A", n.PLD = "\x8B", n.PLU = "\x8C", n.RI = "\x8D", n.SS2 = "\x8E", n.SS3 = "\x8F", n.DCS = "\x90", n.PU1 = "\x91", n.PU2 = "\x92", n.STS = "\x93", n.CCH = "\x94", n.MW = "\x95", n.SPA = "\x96", n.EPA = "\x97", n.SOS = "\x98", n.SGCI = "\x99", n.SCI = "\x9A", n.CSI = "\x9B", n.ST = "\x9C", n.OSC = "\x9D", n.PM = "\x9E", n.APC = "\x9F";
        }(l || (r.C1 = l = {})), function(n) {
          n.ST = `${a.ESC}\\`;
        }(f || (r.C1_ESCAPED = f = {}));
      }, 7399: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.evaluateKeyboardEvent = void 0;
        const l = a(2584), f = { 48: ["0", ")"], 49: ["1", "!"], 50: ["2", "@"], 51: ["3", "#"], 52: ["4", "$"], 53: ["5", "%"], 54: ["6", "^"], 55: ["7", "&"], 56: ["8", "*"], 57: ["9", "("], 186: [";", ":"], 187: ["=", "+"], 188: [",", "<"], 189: ["-", "_"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"], 219: ["[", "{"], 220: ["\\", "|"], 221: ["]", "}"], 222: ["'", '"'] };
        r.evaluateKeyboardEvent = function(n, d, v, g) {
          const h = { type: 0, cancel: false, key: void 0 }, i = (n.shiftKey ? 1 : 0) | (n.altKey ? 2 : 0) | (n.ctrlKey ? 4 : 0) | (n.metaKey ? 8 : 0);
          switch (n.keyCode) {
            case 0:
              n.key === "UIKeyInputUpArrow" ? h.key = d ? l.C0.ESC + "OA" : l.C0.ESC + "[A" : n.key === "UIKeyInputLeftArrow" ? h.key = d ? l.C0.ESC + "OD" : l.C0.ESC + "[D" : n.key === "UIKeyInputRightArrow" ? h.key = d ? l.C0.ESC + "OC" : l.C0.ESC + "[C" : n.key === "UIKeyInputDownArrow" && (h.key = d ? l.C0.ESC + "OB" : l.C0.ESC + "[B");
              break;
            case 8:
              h.key = n.ctrlKey ? "\b" : l.C0.DEL, n.altKey && (h.key = l.C0.ESC + h.key);
              break;
            case 9:
              if (n.shiftKey) {
                h.key = l.C0.ESC + "[Z";
                break;
              }
              h.key = l.C0.HT, h.cancel = true;
              break;
            case 13:
              h.key = n.altKey ? l.C0.ESC + l.C0.CR : l.C0.CR, h.cancel = true;
              break;
            case 27:
              h.key = l.C0.ESC, n.altKey && (h.key = l.C0.ESC + l.C0.ESC), h.cancel = true;
              break;
            case 37:
              if (n.metaKey) break;
              i ? (h.key = l.C0.ESC + "[1;" + (i + 1) + "D", h.key === l.C0.ESC + "[1;3D" && (h.key = l.C0.ESC + (v ? "b" : "[1;5D"))) : h.key = d ? l.C0.ESC + "OD" : l.C0.ESC + "[D";
              break;
            case 39:
              if (n.metaKey) break;
              i ? (h.key = l.C0.ESC + "[1;" + (i + 1) + "C", h.key === l.C0.ESC + "[1;3C" && (h.key = l.C0.ESC + (v ? "f" : "[1;5C"))) : h.key = d ? l.C0.ESC + "OC" : l.C0.ESC + "[C";
              break;
            case 38:
              if (n.metaKey) break;
              i ? (h.key = l.C0.ESC + "[1;" + (i + 1) + "A", v || h.key !== l.C0.ESC + "[1;3A" || (h.key = l.C0.ESC + "[1;5A")) : h.key = d ? l.C0.ESC + "OA" : l.C0.ESC + "[A";
              break;
            case 40:
              if (n.metaKey) break;
              i ? (h.key = l.C0.ESC + "[1;" + (i + 1) + "B", v || h.key !== l.C0.ESC + "[1;3B" || (h.key = l.C0.ESC + "[1;5B")) : h.key = d ? l.C0.ESC + "OB" : l.C0.ESC + "[B";
              break;
            case 45:
              n.shiftKey || n.ctrlKey || (h.key = l.C0.ESC + "[2~");
              break;
            case 46:
              h.key = i ? l.C0.ESC + "[3;" + (i + 1) + "~" : l.C0.ESC + "[3~";
              break;
            case 36:
              h.key = i ? l.C0.ESC + "[1;" + (i + 1) + "H" : d ? l.C0.ESC + "OH" : l.C0.ESC + "[H";
              break;
            case 35:
              h.key = i ? l.C0.ESC + "[1;" + (i + 1) + "F" : d ? l.C0.ESC + "OF" : l.C0.ESC + "[F";
              break;
            case 33:
              n.shiftKey ? h.type = 2 : n.ctrlKey ? h.key = l.C0.ESC + "[5;" + (i + 1) + "~" : h.key = l.C0.ESC + "[5~";
              break;
            case 34:
              n.shiftKey ? h.type = 3 : n.ctrlKey ? h.key = l.C0.ESC + "[6;" + (i + 1) + "~" : h.key = l.C0.ESC + "[6~";
              break;
            case 112:
              h.key = i ? l.C0.ESC + "[1;" + (i + 1) + "P" : l.C0.ESC + "OP";
              break;
            case 113:
              h.key = i ? l.C0.ESC + "[1;" + (i + 1) + "Q" : l.C0.ESC + "OQ";
              break;
            case 114:
              h.key = i ? l.C0.ESC + "[1;" + (i + 1) + "R" : l.C0.ESC + "OR";
              break;
            case 115:
              h.key = i ? l.C0.ESC + "[1;" + (i + 1) + "S" : l.C0.ESC + "OS";
              break;
            case 116:
              h.key = i ? l.C0.ESC + "[15;" + (i + 1) + "~" : l.C0.ESC + "[15~";
              break;
            case 117:
              h.key = i ? l.C0.ESC + "[17;" + (i + 1) + "~" : l.C0.ESC + "[17~";
              break;
            case 118:
              h.key = i ? l.C0.ESC + "[18;" + (i + 1) + "~" : l.C0.ESC + "[18~";
              break;
            case 119:
              h.key = i ? l.C0.ESC + "[19;" + (i + 1) + "~" : l.C0.ESC + "[19~";
              break;
            case 120:
              h.key = i ? l.C0.ESC + "[20;" + (i + 1) + "~" : l.C0.ESC + "[20~";
              break;
            case 121:
              h.key = i ? l.C0.ESC + "[21;" + (i + 1) + "~" : l.C0.ESC + "[21~";
              break;
            case 122:
              h.key = i ? l.C0.ESC + "[23;" + (i + 1) + "~" : l.C0.ESC + "[23~";
              break;
            case 123:
              h.key = i ? l.C0.ESC + "[24;" + (i + 1) + "~" : l.C0.ESC + "[24~";
              break;
            default:
              if (!n.ctrlKey || n.shiftKey || n.altKey || n.metaKey) if (v && !g || !n.altKey || n.metaKey) !v || n.altKey || n.ctrlKey || n.shiftKey || !n.metaKey ? n.key && !n.ctrlKey && !n.altKey && !n.metaKey && n.keyCode >= 48 && n.key.length === 1 ? h.key = n.key : n.key && n.ctrlKey && (n.key === "_" && (h.key = l.C0.US), n.key === "@" && (h.key = l.C0.NUL)) : n.keyCode === 65 && (h.type = 1);
              else {
                const s = f[n.keyCode], e = s == null ? void 0 : s[n.shiftKey ? 1 : 0];
                if (e) h.key = l.C0.ESC + e;
                else if (n.keyCode >= 65 && n.keyCode <= 90) {
                  const t = n.ctrlKey ? n.keyCode - 64 : n.keyCode + 32;
                  let o = String.fromCharCode(t);
                  n.shiftKey && (o = o.toUpperCase()), h.key = l.C0.ESC + o;
                } else if (n.keyCode === 32) h.key = l.C0.ESC + (n.ctrlKey ? l.C0.NUL : " ");
                else if (n.key === "Dead" && n.code.startsWith("Key")) {
                  let t = n.code.slice(3, 4);
                  n.shiftKey || (t = t.toLowerCase()), h.key = l.C0.ESC + t, h.cancel = true;
                }
              }
              else n.keyCode >= 65 && n.keyCode <= 90 ? h.key = String.fromCharCode(n.keyCode - 64) : n.keyCode === 32 ? h.key = l.C0.NUL : n.keyCode >= 51 && n.keyCode <= 55 ? h.key = String.fromCharCode(n.keyCode - 51 + 27) : n.keyCode === 56 ? h.key = l.C0.DEL : n.keyCode === 219 ? h.key = l.C0.ESC : n.keyCode === 220 ? h.key = l.C0.FS : n.keyCode === 221 && (h.key = l.C0.GS);
          }
          return h;
        };
      }, 482: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.Utf8ToUtf32 = r.StringToUtf32 = r.utf32ToString = r.stringFromCodePoint = void 0, r.stringFromCodePoint = function(a) {
          return a > 65535 ? (a -= 65536, String.fromCharCode(55296 + (a >> 10)) + String.fromCharCode(a % 1024 + 56320)) : String.fromCharCode(a);
        }, r.utf32ToString = function(a, l = 0, f = a.length) {
          let n = "";
          for (let d = l; d < f; ++d) {
            let v = a[d];
            v > 65535 ? (v -= 65536, n += String.fromCharCode(55296 + (v >> 10)) + String.fromCharCode(v % 1024 + 56320)) : n += String.fromCharCode(v);
          }
          return n;
        }, r.StringToUtf32 = class {
          constructor() {
            this._interim = 0;
          }
          clear() {
            this._interim = 0;
          }
          decode(a, l) {
            const f = a.length;
            if (!f) return 0;
            let n = 0, d = 0;
            if (this._interim) {
              const v = a.charCodeAt(d++);
              56320 <= v && v <= 57343 ? l[n++] = 1024 * (this._interim - 55296) + v - 56320 + 65536 : (l[n++] = this._interim, l[n++] = v), this._interim = 0;
            }
            for (let v = d; v < f; ++v) {
              const g = a.charCodeAt(v);
              if (55296 <= g && g <= 56319) {
                if (++v >= f) return this._interim = g, n;
                const h = a.charCodeAt(v);
                56320 <= h && h <= 57343 ? l[n++] = 1024 * (g - 55296) + h - 56320 + 65536 : (l[n++] = g, l[n++] = h);
              } else g !== 65279 && (l[n++] = g);
            }
            return n;
          }
        }, r.Utf8ToUtf32 = class {
          constructor() {
            this.interim = new Uint8Array(3);
          }
          clear() {
            this.interim.fill(0);
          }
          decode(a, l) {
            const f = a.length;
            if (!f) return 0;
            let n, d, v, g, h = 0, i = 0, s = 0;
            if (this.interim[0]) {
              let o = false, u = this.interim[0];
              u &= (224 & u) == 192 ? 31 : (240 & u) == 224 ? 15 : 7;
              let _, p = 0;
              for (; (_ = 63 & this.interim[++p]) && p < 4; ) u <<= 6, u |= _;
              const c = (224 & this.interim[0]) == 192 ? 2 : (240 & this.interim[0]) == 224 ? 3 : 4, m = c - p;
              for (; s < m; ) {
                if (s >= f) return 0;
                if (_ = a[s++], (192 & _) != 128) {
                  s--, o = true;
                  break;
                }
                this.interim[p++] = _, u <<= 6, u |= 63 & _;
              }
              o || (c === 2 ? u < 128 ? s-- : l[h++] = u : c === 3 ? u < 2048 || u >= 55296 && u <= 57343 || u === 65279 || (l[h++] = u) : u < 65536 || u > 1114111 || (l[h++] = u)), this.interim.fill(0);
            }
            const e = f - 4;
            let t = s;
            for (; t < f; ) {
              for (; !(!(t < e) || 128 & (n = a[t]) || 128 & (d = a[t + 1]) || 128 & (v = a[t + 2]) || 128 & (g = a[t + 3])); ) l[h++] = n, l[h++] = d, l[h++] = v, l[h++] = g, t += 4;
              if (n = a[t++], n < 128) l[h++] = n;
              else if ((224 & n) == 192) {
                if (t >= f) return this.interim[0] = n, h;
                if (d = a[t++], (192 & d) != 128) {
                  t--;
                  continue;
                }
                if (i = (31 & n) << 6 | 63 & d, i < 128) {
                  t--;
                  continue;
                }
                l[h++] = i;
              } else if ((240 & n) == 224) {
                if (t >= f) return this.interim[0] = n, h;
                if (d = a[t++], (192 & d) != 128) {
                  t--;
                  continue;
                }
                if (t >= f) return this.interim[0] = n, this.interim[1] = d, h;
                if (v = a[t++], (192 & v) != 128) {
                  t--;
                  continue;
                }
                if (i = (15 & n) << 12 | (63 & d) << 6 | 63 & v, i < 2048 || i >= 55296 && i <= 57343 || i === 65279) continue;
                l[h++] = i;
              } else if ((248 & n) == 240) {
                if (t >= f) return this.interim[0] = n, h;
                if (d = a[t++], (192 & d) != 128) {
                  t--;
                  continue;
                }
                if (t >= f) return this.interim[0] = n, this.interim[1] = d, h;
                if (v = a[t++], (192 & v) != 128) {
                  t--;
                  continue;
                }
                if (t >= f) return this.interim[0] = n, this.interim[1] = d, this.interim[2] = v, h;
                if (g = a[t++], (192 & g) != 128) {
                  t--;
                  continue;
                }
                if (i = (7 & n) << 18 | (63 & d) << 12 | (63 & v) << 6 | 63 & g, i < 65536 || i > 1114111) continue;
                l[h++] = i;
              }
            }
            return h;
          }
        };
      }, 225: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.UnicodeV6 = void 0;
        const l = a(1480), f = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]], n = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
        let d;
        r.UnicodeV6 = class {
          constructor() {
            if (this.version = "6", !d) {
              d = new Uint8Array(65536), d.fill(1), d[0] = 0, d.fill(0, 1, 32), d.fill(0, 127, 160), d.fill(2, 4352, 4448), d[9001] = 2, d[9002] = 2, d.fill(2, 11904, 42192), d[12351] = 1, d.fill(2, 44032, 55204), d.fill(2, 63744, 64256), d.fill(2, 65040, 65050), d.fill(2, 65072, 65136), d.fill(2, 65280, 65377), d.fill(2, 65504, 65511);
              for (let v = 0; v < f.length; ++v) d.fill(0, f[v][0], f[v][1] + 1);
            }
          }
          wcwidth(v) {
            return v < 32 ? 0 : v < 127 ? 1 : v < 65536 ? d[v] : function(g, h) {
              let i, s = 0, e = h.length - 1;
              if (g < h[0][0] || g > h[e][1]) return false;
              for (; e >= s; ) if (i = s + e >> 1, g > h[i][1]) s = i + 1;
              else {
                if (!(g < h[i][0])) return true;
                e = i - 1;
              }
              return false;
            }(v, n) ? 0 : v >= 131072 && v <= 196605 || v >= 196608 && v <= 262141 ? 2 : 1;
          }
          charProperties(v, g) {
            let h = this.wcwidth(v), i = h === 0 && g !== 0;
            if (i) {
              const s = l.UnicodeService.extractWidth(g);
              s === 0 ? i = false : s > h && (h = s);
            }
            return l.UnicodeService.createPropertyValue(0, h, i);
          }
        };
      }, 5981: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.WriteBuffer = void 0;
        const l = a(8460), f = a(844);
        class n extends f.Disposable {
          constructor(v) {
            super(), this._action = v, this._writeBuffer = [], this._callbacks = [], this._pendingData = 0, this._bufferOffset = 0, this._isSyncWriting = false, this._syncCalls = 0, this._didUserInput = false, this._onWriteParsed = this.register(new l.EventEmitter()), this.onWriteParsed = this._onWriteParsed.event;
          }
          handleUserInput() {
            this._didUserInput = true;
          }
          writeSync(v, g) {
            if (g !== void 0 && this._syncCalls > g) return void (this._syncCalls = 0);
            if (this._pendingData += v.length, this._writeBuffer.push(v), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting) return;
            let h;
            for (this._isSyncWriting = true; h = this._writeBuffer.shift(); ) {
              this._action(h);
              const i = this._callbacks.shift();
              i && i();
            }
            this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = false, this._syncCalls = 0;
          }
          write(v, g) {
            if (this._pendingData > 5e7) throw new Error("write data discarded, use flow control to avoid losing data");
            if (!this._writeBuffer.length) {
              if (this._bufferOffset = 0, this._didUserInput) return this._didUserInput = false, this._pendingData += v.length, this._writeBuffer.push(v), this._callbacks.push(g), void this._innerWrite();
              setTimeout(() => this._innerWrite());
            }
            this._pendingData += v.length, this._writeBuffer.push(v), this._callbacks.push(g);
          }
          _innerWrite(v = 0, g = true) {
            const h = v || Date.now();
            for (; this._writeBuffer.length > this._bufferOffset; ) {
              const i = this._writeBuffer[this._bufferOffset], s = this._action(i, g);
              if (s) {
                const t = (o) => Date.now() - h >= 12 ? setTimeout(() => this._innerWrite(0, o)) : this._innerWrite(h, o);
                return void s.catch((o) => (queueMicrotask(() => {
                  throw o;
                }), Promise.resolve(false))).then(t);
              }
              const e = this._callbacks[this._bufferOffset];
              if (e && e(), this._bufferOffset++, this._pendingData -= i.length, Date.now() - h >= 12) break;
            }
            this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > 50 && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout(() => this._innerWrite())) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
          }
        }
        r.WriteBuffer = n;
      }, 5941: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.toRgbString = r.parseColor = void 0;
        const a = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/, l = /^[\da-f]+$/;
        function f(n, d) {
          const v = n.toString(16), g = v.length < 2 ? "0" + v : v;
          switch (d) {
            case 4:
              return v[0];
            case 8:
              return g;
            case 12:
              return (g + g).slice(0, 3);
            default:
              return g + g;
          }
        }
        r.parseColor = function(n) {
          if (!n) return;
          let d = n.toLowerCase();
          if (d.indexOf("rgb:") === 0) {
            d = d.slice(4);
            const v = a.exec(d);
            if (v) {
              const g = v[1] ? 15 : v[4] ? 255 : v[7] ? 4095 : 65535;
              return [Math.round(parseInt(v[1] || v[4] || v[7] || v[10], 16) / g * 255), Math.round(parseInt(v[2] || v[5] || v[8] || v[11], 16) / g * 255), Math.round(parseInt(v[3] || v[6] || v[9] || v[12], 16) / g * 255)];
            }
          } else if (d.indexOf("#") === 0 && (d = d.slice(1), l.exec(d) && [3, 6, 9, 12].includes(d.length))) {
            const v = d.length / 3, g = [0, 0, 0];
            for (let h = 0; h < 3; ++h) {
              const i = parseInt(d.slice(v * h, v * h + v), 16);
              g[h] = v === 1 ? i << 4 : v === 2 ? i : v === 3 ? i >> 4 : i >> 8;
            }
            return g;
          }
        }, r.toRgbString = function(n, d = 16) {
          const [v, g, h] = n;
          return `rgb:${f(v, d)}/${f(g, d)}/${f(h, d)}`;
        };
      }, 5770: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.PAYLOAD_LIMIT = void 0, r.PAYLOAD_LIMIT = 1e7;
      }, 6351: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.DcsHandler = r.DcsParser = void 0;
        const l = a(482), f = a(8742), n = a(5770), d = [];
        r.DcsParser = class {
          constructor() {
            this._handlers = /* @__PURE__ */ Object.create(null), this._active = d, this._ident = 0, this._handlerFb = () => {
            }, this._stack = { paused: false, loopPosition: 0, fallThrough: false };
          }
          dispose() {
            this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
            }, this._active = d;
          }
          registerHandler(g, h) {
            this._handlers[g] === void 0 && (this._handlers[g] = []);
            const i = this._handlers[g];
            return i.push(h), { dispose: () => {
              const s = i.indexOf(h);
              s !== -1 && i.splice(s, 1);
            } };
          }
          clearHandler(g) {
            this._handlers[g] && delete this._handlers[g];
          }
          setHandlerFallback(g) {
            this._handlerFb = g;
          }
          reset() {
            if (this._active.length) for (let g = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; g >= 0; --g) this._active[g].unhook(false);
            this._stack.paused = false, this._active = d, this._ident = 0;
          }
          hook(g, h) {
            if (this.reset(), this._ident = g, this._active = this._handlers[g] || d, this._active.length) for (let i = this._active.length - 1; i >= 0; i--) this._active[i].hook(h);
            else this._handlerFb(this._ident, "HOOK", h);
          }
          put(g, h, i) {
            if (this._active.length) for (let s = this._active.length - 1; s >= 0; s--) this._active[s].put(g, h, i);
            else this._handlerFb(this._ident, "PUT", (0, l.utf32ToString)(g, h, i));
          }
          unhook(g, h = true) {
            if (this._active.length) {
              let i = false, s = this._active.length - 1, e = false;
              if (this._stack.paused && (s = this._stack.loopPosition - 1, i = h, e = this._stack.fallThrough, this._stack.paused = false), !e && i === false) {
                for (; s >= 0 && (i = this._active[s].unhook(g), i !== true); s--) if (i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = s, this._stack.fallThrough = false, i;
                s--;
              }
              for (; s >= 0; s--) if (i = this._active[s].unhook(false), i instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = s, this._stack.fallThrough = true, i;
            } else this._handlerFb(this._ident, "UNHOOK", g);
            this._active = d, this._ident = 0;
          }
        };
        const v = new f.Params();
        v.addParam(0), r.DcsHandler = class {
          constructor(g) {
            this._handler = g, this._data = "", this._params = v, this._hitLimit = false;
          }
          hook(g) {
            this._params = g.length > 1 || g.params[0] ? g.clone() : v, this._data = "", this._hitLimit = false;
          }
          put(g, h, i) {
            this._hitLimit || (this._data += (0, l.utf32ToString)(g, h, i), this._data.length > n.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = true));
          }
          unhook(g) {
            let h = false;
            if (this._hitLimit) h = false;
            else if (g && (h = this._handler(this._data, this._params), h instanceof Promise)) return h.then((i) => (this._params = v, this._data = "", this._hitLimit = false, i));
            return this._params = v, this._data = "", this._hitLimit = false, h;
          }
        };
      }, 2015: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.EscapeSequenceParser = r.VT500_TRANSITION_TABLE = r.TransitionTable = void 0;
        const l = a(844), f = a(8742), n = a(6242), d = a(6351);
        class v {
          constructor(s) {
            this.table = new Uint8Array(s);
          }
          setDefault(s, e) {
            this.table.fill(s << 4 | e);
          }
          add(s, e, t, o) {
            this.table[e << 8 | s] = t << 4 | o;
          }
          addMany(s, e, t, o) {
            for (let u = 0; u < s.length; u++) this.table[e << 8 | s[u]] = t << 4 | o;
          }
        }
        r.TransitionTable = v;
        const g = 160;
        r.VT500_TRANSITION_TABLE = function() {
          const i = new v(4095), s = Array.apply(null, Array(256)).map((p, c) => c), e = (p, c) => s.slice(p, c), t = e(32, 127), o = e(0, 24);
          o.push(25), o.push.apply(o, e(28, 32));
          const u = e(0, 14);
          let _;
          for (_ in i.setDefault(1, 0), i.addMany(t, 0, 2, 0), u) i.addMany([24, 26, 153, 154], _, 3, 0), i.addMany(e(128, 144), _, 3, 0), i.addMany(e(144, 152), _, 3, 0), i.add(156, _, 0, 0), i.add(27, _, 11, 1), i.add(157, _, 4, 8), i.addMany([152, 158, 159], _, 0, 7), i.add(155, _, 11, 3), i.add(144, _, 11, 9);
          return i.addMany(o, 0, 3, 0), i.addMany(o, 1, 3, 1), i.add(127, 1, 0, 1), i.addMany(o, 8, 0, 8), i.addMany(o, 3, 3, 3), i.add(127, 3, 0, 3), i.addMany(o, 4, 3, 4), i.add(127, 4, 0, 4), i.addMany(o, 6, 3, 6), i.addMany(o, 5, 3, 5), i.add(127, 5, 0, 5), i.addMany(o, 2, 3, 2), i.add(127, 2, 0, 2), i.add(93, 1, 4, 8), i.addMany(t, 8, 5, 8), i.add(127, 8, 5, 8), i.addMany([156, 27, 24, 26, 7], 8, 6, 0), i.addMany(e(28, 32), 8, 0, 8), i.addMany([88, 94, 95], 1, 0, 7), i.addMany(t, 7, 0, 7), i.addMany(o, 7, 0, 7), i.add(156, 7, 0, 0), i.add(127, 7, 0, 7), i.add(91, 1, 11, 3), i.addMany(e(64, 127), 3, 7, 0), i.addMany(e(48, 60), 3, 8, 4), i.addMany([60, 61, 62, 63], 3, 9, 4), i.addMany(e(48, 60), 4, 8, 4), i.addMany(e(64, 127), 4, 7, 0), i.addMany([60, 61, 62, 63], 4, 0, 6), i.addMany(e(32, 64), 6, 0, 6), i.add(127, 6, 0, 6), i.addMany(e(64, 127), 6, 0, 0), i.addMany(e(32, 48), 3, 9, 5), i.addMany(e(32, 48), 5, 9, 5), i.addMany(e(48, 64), 5, 0, 6), i.addMany(e(64, 127), 5, 7, 0), i.addMany(e(32, 48), 4, 9, 5), i.addMany(e(32, 48), 1, 9, 2), i.addMany(e(32, 48), 2, 9, 2), i.addMany(e(48, 127), 2, 10, 0), i.addMany(e(48, 80), 1, 10, 0), i.addMany(e(81, 88), 1, 10, 0), i.addMany([89, 90, 92], 1, 10, 0), i.addMany(e(96, 127), 1, 10, 0), i.add(80, 1, 11, 9), i.addMany(o, 9, 0, 9), i.add(127, 9, 0, 9), i.addMany(e(28, 32), 9, 0, 9), i.addMany(e(32, 48), 9, 9, 12), i.addMany(e(48, 60), 9, 8, 10), i.addMany([60, 61, 62, 63], 9, 9, 10), i.addMany(o, 11, 0, 11), i.addMany(e(32, 128), 11, 0, 11), i.addMany(e(28, 32), 11, 0, 11), i.addMany(o, 10, 0, 10), i.add(127, 10, 0, 10), i.addMany(e(28, 32), 10, 0, 10), i.addMany(e(48, 60), 10, 8, 10), i.addMany([60, 61, 62, 63], 10, 0, 11), i.addMany(e(32, 48), 10, 9, 12), i.addMany(o, 12, 0, 12), i.add(127, 12, 0, 12), i.addMany(e(28, 32), 12, 0, 12), i.addMany(e(32, 48), 12, 9, 12), i.addMany(e(48, 64), 12, 0, 11), i.addMany(e(64, 127), 12, 12, 13), i.addMany(e(64, 127), 10, 12, 13), i.addMany(e(64, 127), 9, 12, 13), i.addMany(o, 13, 13, 13), i.addMany(t, 13, 13, 13), i.add(127, 13, 0, 13), i.addMany([27, 156, 24, 26], 13, 14, 0), i.add(g, 0, 2, 0), i.add(g, 8, 5, 8), i.add(g, 6, 0, 6), i.add(g, 11, 0, 11), i.add(g, 13, 13, 13), i;
        }();
        class h extends l.Disposable {
          constructor(s = r.VT500_TRANSITION_TABLE) {
            super(), this._transitions = s, this._parseStack = { state: 0, handlers: [], handlerPos: 0, transition: 0, chunkPos: 0 }, this.initialState = 0, this.currentState = this.initialState, this._params = new f.Params(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._printHandlerFb = (e, t, o) => {
            }, this._executeHandlerFb = (e) => {
            }, this._csiHandlerFb = (e, t) => {
            }, this._escHandlerFb = (e) => {
            }, this._errorHandlerFb = (e) => e, this._printHandler = this._printHandlerFb, this._executeHandlers = /* @__PURE__ */ Object.create(null), this._csiHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null), this.register((0, l.toDisposable)(() => {
              this._csiHandlers = /* @__PURE__ */ Object.create(null), this._executeHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null);
            })), this._oscParser = this.register(new n.OscParser()), this._dcsParser = this.register(new d.DcsParser()), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, () => true);
          }
          _identifier(s, e = [64, 126]) {
            let t = 0;
            if (s.prefix) {
              if (s.prefix.length > 1) throw new Error("only one byte as prefix supported");
              if (t = s.prefix.charCodeAt(0), t && 60 > t || t > 63) throw new Error("prefix must be in range 0x3c .. 0x3f");
            }
            if (s.intermediates) {
              if (s.intermediates.length > 2) throw new Error("only two bytes as intermediates are supported");
              for (let u = 0; u < s.intermediates.length; ++u) {
                const _ = s.intermediates.charCodeAt(u);
                if (32 > _ || _ > 47) throw new Error("intermediate must be in range 0x20 .. 0x2f");
                t <<= 8, t |= _;
              }
            }
            if (s.final.length !== 1) throw new Error("final must be a single byte");
            const o = s.final.charCodeAt(0);
            if (e[0] > o || o > e[1]) throw new Error(`final must be in range ${e[0]} .. ${e[1]}`);
            return t <<= 8, t |= o, t;
          }
          identToString(s) {
            const e = [];
            for (; s; ) e.push(String.fromCharCode(255 & s)), s >>= 8;
            return e.reverse().join("");
          }
          setPrintHandler(s) {
            this._printHandler = s;
          }
          clearPrintHandler() {
            this._printHandler = this._printHandlerFb;
          }
          registerEscHandler(s, e) {
            const t = this._identifier(s, [48, 126]);
            this._escHandlers[t] === void 0 && (this._escHandlers[t] = []);
            const o = this._escHandlers[t];
            return o.push(e), { dispose: () => {
              const u = o.indexOf(e);
              u !== -1 && o.splice(u, 1);
            } };
          }
          clearEscHandler(s) {
            this._escHandlers[this._identifier(s, [48, 126])] && delete this._escHandlers[this._identifier(s, [48, 126])];
          }
          setEscHandlerFallback(s) {
            this._escHandlerFb = s;
          }
          setExecuteHandler(s, e) {
            this._executeHandlers[s.charCodeAt(0)] = e;
          }
          clearExecuteHandler(s) {
            this._executeHandlers[s.charCodeAt(0)] && delete this._executeHandlers[s.charCodeAt(0)];
          }
          setExecuteHandlerFallback(s) {
            this._executeHandlerFb = s;
          }
          registerCsiHandler(s, e) {
            const t = this._identifier(s);
            this._csiHandlers[t] === void 0 && (this._csiHandlers[t] = []);
            const o = this._csiHandlers[t];
            return o.push(e), { dispose: () => {
              const u = o.indexOf(e);
              u !== -1 && o.splice(u, 1);
            } };
          }
          clearCsiHandler(s) {
            this._csiHandlers[this._identifier(s)] && delete this._csiHandlers[this._identifier(s)];
          }
          setCsiHandlerFallback(s) {
            this._csiHandlerFb = s;
          }
          registerDcsHandler(s, e) {
            return this._dcsParser.registerHandler(this._identifier(s), e);
          }
          clearDcsHandler(s) {
            this._dcsParser.clearHandler(this._identifier(s));
          }
          setDcsHandlerFallback(s) {
            this._dcsParser.setHandlerFallback(s);
          }
          registerOscHandler(s, e) {
            return this._oscParser.registerHandler(s, e);
          }
          clearOscHandler(s) {
            this._oscParser.clearHandler(s);
          }
          setOscHandlerFallback(s) {
            this._oscParser.setHandlerFallback(s);
          }
          setErrorHandler(s) {
            this._errorHandler = s;
          }
          clearErrorHandler() {
            this._errorHandler = this._errorHandlerFb;
          }
          reset() {
            this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._parseStack.state !== 0 && (this._parseStack.state = 2, this._parseStack.handlers = []);
          }
          _preserveStack(s, e, t, o, u) {
            this._parseStack.state = s, this._parseStack.handlers = e, this._parseStack.handlerPos = t, this._parseStack.transition = o, this._parseStack.chunkPos = u;
          }
          parse(s, e, t) {
            let o, u = 0, _ = 0, p = 0;
            if (this._parseStack.state) if (this._parseStack.state === 2) this._parseStack.state = 0, p = this._parseStack.chunkPos + 1;
            else {
              if (t === void 0 || this._parseStack.state === 1) throw this._parseStack.state = 1, new Error("improper continuation due to previous async handler, giving up parsing");
              const c = this._parseStack.handlers;
              let m = this._parseStack.handlerPos - 1;
              switch (this._parseStack.state) {
                case 3:
                  if (t === false && m > -1) {
                    for (; m >= 0 && (o = c[m](this._params), o !== true); m--) if (o instanceof Promise) return this._parseStack.handlerPos = m, o;
                  }
                  this._parseStack.handlers = [];
                  break;
                case 4:
                  if (t === false && m > -1) {
                    for (; m >= 0 && (o = c[m](), o !== true); m--) if (o instanceof Promise) return this._parseStack.handlerPos = m, o;
                  }
                  this._parseStack.handlers = [];
                  break;
                case 6:
                  if (u = s[this._parseStack.chunkPos], o = this._dcsParser.unhook(u !== 24 && u !== 26, t), o) return o;
                  u === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
                  break;
                case 5:
                  if (u = s[this._parseStack.chunkPos], o = this._oscParser.end(u !== 24 && u !== 26, t), o) return o;
                  u === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
              }
              this._parseStack.state = 0, p = this._parseStack.chunkPos + 1, this.precedingJoinState = 0, this.currentState = 15 & this._parseStack.transition;
            }
            for (let c = p; c < e; ++c) {
              switch (u = s[c], _ = this._transitions.table[this.currentState << 8 | (u < 160 ? u : g)], _ >> 4) {
                case 2:
                  for (let w = c + 1; ; ++w) {
                    if (w >= e || (u = s[w]) < 32 || u > 126 && u < g) {
                      this._printHandler(s, c, w), c = w - 1;
                      break;
                    }
                    if (++w >= e || (u = s[w]) < 32 || u > 126 && u < g) {
                      this._printHandler(s, c, w), c = w - 1;
                      break;
                    }
                    if (++w >= e || (u = s[w]) < 32 || u > 126 && u < g) {
                      this._printHandler(s, c, w), c = w - 1;
                      break;
                    }
                    if (++w >= e || (u = s[w]) < 32 || u > 126 && u < g) {
                      this._printHandler(s, c, w), c = w - 1;
                      break;
                    }
                  }
                  break;
                case 3:
                  this._executeHandlers[u] ? this._executeHandlers[u]() : this._executeHandlerFb(u), this.precedingJoinState = 0;
                  break;
                case 0:
                  break;
                case 1:
                  if (this._errorHandler({ position: c, code: u, currentState: this.currentState, collect: this._collect, params: this._params, abort: false }).abort) return;
                  break;
                case 7:
                  const m = this._csiHandlers[this._collect << 8 | u];
                  let y = m ? m.length - 1 : -1;
                  for (; y >= 0 && (o = m[y](this._params), o !== true); y--) if (o instanceof Promise) return this._preserveStack(3, m, y, _, c), o;
                  y < 0 && this._csiHandlerFb(this._collect << 8 | u, this._params), this.precedingJoinState = 0;
                  break;
                case 8:
                  do
                    switch (u) {
                      case 59:
                        this._params.addParam(0);
                        break;
                      case 58:
                        this._params.addSubParam(-1);
                        break;
                      default:
                        this._params.addDigit(u - 48);
                    }
                  while (++c < e && (u = s[c]) > 47 && u < 60);
                  c--;
                  break;
                case 9:
                  this._collect <<= 8, this._collect |= u;
                  break;
                case 10:
                  const k = this._escHandlers[this._collect << 8 | u];
                  let L = k ? k.length - 1 : -1;
                  for (; L >= 0 && (o = k[L](), o !== true); L--) if (o instanceof Promise) return this._preserveStack(4, k, L, _, c), o;
                  L < 0 && this._escHandlerFb(this._collect << 8 | u), this.precedingJoinState = 0;
                  break;
                case 11:
                  this._params.reset(), this._params.addParam(0), this._collect = 0;
                  break;
                case 12:
                  this._dcsParser.hook(this._collect << 8 | u, this._params);
                  break;
                case 13:
                  for (let w = c + 1; ; ++w) if (w >= e || (u = s[w]) === 24 || u === 26 || u === 27 || u > 127 && u < g) {
                    this._dcsParser.put(s, c, w), c = w - 1;
                    break;
                  }
                  break;
                case 14:
                  if (o = this._dcsParser.unhook(u !== 24 && u !== 26), o) return this._preserveStack(6, [], 0, _, c), o;
                  u === 27 && (_ |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
                  break;
                case 4:
                  this._oscParser.start();
                  break;
                case 5:
                  for (let w = c + 1; ; w++) if (w >= e || (u = s[w]) < 32 || u > 127 && u < g) {
                    this._oscParser.put(s, c, w), c = w - 1;
                    break;
                  }
                  break;
                case 6:
                  if (o = this._oscParser.end(u !== 24 && u !== 26), o) return this._preserveStack(5, [], 0, _, c), o;
                  u === 27 && (_ |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
              }
              this.currentState = 15 & _;
            }
          }
        }
        r.EscapeSequenceParser = h;
      }, 6242: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.OscHandler = r.OscParser = void 0;
        const l = a(5770), f = a(482), n = [];
        r.OscParser = class {
          constructor() {
            this._state = 0, this._active = n, this._id = -1, this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
            }, this._stack = { paused: false, loopPosition: 0, fallThrough: false };
          }
          registerHandler(d, v) {
            this._handlers[d] === void 0 && (this._handlers[d] = []);
            const g = this._handlers[d];
            return g.push(v), { dispose: () => {
              const h = g.indexOf(v);
              h !== -1 && g.splice(h, 1);
            } };
          }
          clearHandler(d) {
            this._handlers[d] && delete this._handlers[d];
          }
          setHandlerFallback(d) {
            this._handlerFb = d;
          }
          dispose() {
            this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
            }, this._active = n;
          }
          reset() {
            if (this._state === 2) for (let d = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; d >= 0; --d) this._active[d].end(false);
            this._stack.paused = false, this._active = n, this._id = -1, this._state = 0;
          }
          _start() {
            if (this._active = this._handlers[this._id] || n, this._active.length) for (let d = this._active.length - 1; d >= 0; d--) this._active[d].start();
            else this._handlerFb(this._id, "START");
          }
          _put(d, v, g) {
            if (this._active.length) for (let h = this._active.length - 1; h >= 0; h--) this._active[h].put(d, v, g);
            else this._handlerFb(this._id, "PUT", (0, f.utf32ToString)(d, v, g));
          }
          start() {
            this.reset(), this._state = 1;
          }
          put(d, v, g) {
            if (this._state !== 3) {
              if (this._state === 1) for (; v < g; ) {
                const h = d[v++];
                if (h === 59) {
                  this._state = 2, this._start();
                  break;
                }
                if (h < 48 || 57 < h) return void (this._state = 3);
                this._id === -1 && (this._id = 0), this._id = 10 * this._id + h - 48;
              }
              this._state === 2 && g - v > 0 && this._put(d, v, g);
            }
          }
          end(d, v = true) {
            if (this._state !== 0) {
              if (this._state !== 3) if (this._state === 1 && this._start(), this._active.length) {
                let g = false, h = this._active.length - 1, i = false;
                if (this._stack.paused && (h = this._stack.loopPosition - 1, g = v, i = this._stack.fallThrough, this._stack.paused = false), !i && g === false) {
                  for (; h >= 0 && (g = this._active[h].end(d), g !== true); h--) if (g instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = h, this._stack.fallThrough = false, g;
                  h--;
                }
                for (; h >= 0; h--) if (g = this._active[h].end(false), g instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = h, this._stack.fallThrough = true, g;
              } else this._handlerFb(this._id, "END", d);
              this._active = n, this._id = -1, this._state = 0;
            }
          }
        }, r.OscHandler = class {
          constructor(d) {
            this._handler = d, this._data = "", this._hitLimit = false;
          }
          start() {
            this._data = "", this._hitLimit = false;
          }
          put(d, v, g) {
            this._hitLimit || (this._data += (0, f.utf32ToString)(d, v, g), this._data.length > l.PAYLOAD_LIMIT && (this._data = "", this._hitLimit = true));
          }
          end(d) {
            let v = false;
            if (this._hitLimit) v = false;
            else if (d && (v = this._handler(this._data), v instanceof Promise)) return v.then((g) => (this._data = "", this._hitLimit = false, g));
            return this._data = "", this._hitLimit = false, v;
          }
        };
      }, 8742: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.Params = void 0;
        const a = 2147483647;
        class l {
          static fromArray(n) {
            const d = new l();
            if (!n.length) return d;
            for (let v = Array.isArray(n[0]) ? 1 : 0; v < n.length; ++v) {
              const g = n[v];
              if (Array.isArray(g)) for (let h = 0; h < g.length; ++h) d.addSubParam(g[h]);
              else d.addParam(g);
            }
            return d;
          }
          constructor(n = 32, d = 32) {
            if (this.maxLength = n, this.maxSubParamsLength = d, d > 256) throw new Error("maxSubParamsLength must not be greater than 256");
            this.params = new Int32Array(n), this.length = 0, this._subParams = new Int32Array(d), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(n), this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
          }
          clone() {
            const n = new l(this.maxLength, this.maxSubParamsLength);
            return n.params.set(this.params), n.length = this.length, n._subParams.set(this._subParams), n._subParamsLength = this._subParamsLength, n._subParamsIdx.set(this._subParamsIdx), n._rejectDigits = this._rejectDigits, n._rejectSubDigits = this._rejectSubDigits, n._digitIsSub = this._digitIsSub, n;
          }
          toArray() {
            const n = [];
            for (let d = 0; d < this.length; ++d) {
              n.push(this.params[d]);
              const v = this._subParamsIdx[d] >> 8, g = 255 & this._subParamsIdx[d];
              g - v > 0 && n.push(Array.prototype.slice.call(this._subParams, v, g));
            }
            return n;
          }
          reset() {
            this.length = 0, this._subParamsLength = 0, this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
          }
          addParam(n) {
            if (this._digitIsSub = false, this.length >= this.maxLength) this._rejectDigits = true;
            else {
              if (n < -1) throw new Error("values lesser than -1 are not allowed");
              this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = n > a ? a : n;
            }
          }
          addSubParam(n) {
            if (this._digitIsSub = true, this.length) if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) this._rejectSubDigits = true;
            else {
              if (n < -1) throw new Error("values lesser than -1 are not allowed");
              this._subParams[this._subParamsLength++] = n > a ? a : n, this._subParamsIdx[this.length - 1]++;
            }
          }
          hasSubParams(n) {
            return (255 & this._subParamsIdx[n]) - (this._subParamsIdx[n] >> 8) > 0;
          }
          getSubParams(n) {
            const d = this._subParamsIdx[n] >> 8, v = 255 & this._subParamsIdx[n];
            return v - d > 0 ? this._subParams.subarray(d, v) : null;
          }
          getSubParamsAll() {
            const n = {};
            for (let d = 0; d < this.length; ++d) {
              const v = this._subParamsIdx[d] >> 8, g = 255 & this._subParamsIdx[d];
              g - v > 0 && (n[d] = this._subParams.slice(v, g));
            }
            return n;
          }
          addDigit(n) {
            let d;
            if (this._rejectDigits || !(d = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) return;
            const v = this._digitIsSub ? this._subParams : this.params, g = v[d - 1];
            v[d - 1] = ~g ? Math.min(10 * g + n, a) : n;
          }
        }
        r.Params = l;
      }, 5741: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.AddonManager = void 0, r.AddonManager = class {
          constructor() {
            this._addons = [];
          }
          dispose() {
            for (let a = this._addons.length - 1; a >= 0; a--) this._addons[a].instance.dispose();
          }
          loadAddon(a, l) {
            const f = { instance: l, dispose: l.dispose, isDisposed: false };
            this._addons.push(f), l.dispose = () => this._wrappedAddonDispose(f), l.activate(a);
          }
          _wrappedAddonDispose(a) {
            if (a.isDisposed) return;
            let l = -1;
            for (let f = 0; f < this._addons.length; f++) if (this._addons[f] === a) {
              l = f;
              break;
            }
            if (l === -1) throw new Error("Could not dispose an addon that has not been loaded");
            a.isDisposed = true, a.dispose.apply(a.instance), this._addons.splice(l, 1);
          }
        };
      }, 8771: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.BufferApiView = void 0;
        const l = a(3785), f = a(511);
        r.BufferApiView = class {
          constructor(n, d) {
            this._buffer = n, this.type = d;
          }
          init(n) {
            return this._buffer = n, this;
          }
          get cursorY() {
            return this._buffer.y;
          }
          get cursorX() {
            return this._buffer.x;
          }
          get viewportY() {
            return this._buffer.ydisp;
          }
          get baseY() {
            return this._buffer.ybase;
          }
          get length() {
            return this._buffer.lines.length;
          }
          getLine(n) {
            const d = this._buffer.lines.get(n);
            if (d) return new l.BufferLineApiView(d);
          }
          getNullCell() {
            return new f.CellData();
          }
        };
      }, 3785: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.BufferLineApiView = void 0;
        const l = a(511);
        r.BufferLineApiView = class {
          constructor(f) {
            this._line = f;
          }
          get isWrapped() {
            return this._line.isWrapped;
          }
          get length() {
            return this._line.length;
          }
          getCell(f, n) {
            if (!(f < 0 || f >= this._line.length)) return n ? (this._line.loadCell(f, n), n) : this._line.loadCell(f, new l.CellData());
          }
          translateToString(f, n, d) {
            return this._line.translateToString(f, n, d);
          }
        };
      }, 8285: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.BufferNamespaceApi = void 0;
        const l = a(8771), f = a(8460), n = a(844);
        class d extends n.Disposable {
          constructor(g) {
            super(), this._core = g, this._onBufferChange = this.register(new f.EventEmitter()), this.onBufferChange = this._onBufferChange.event, this._normal = new l.BufferApiView(this._core.buffers.normal, "normal"), this._alternate = new l.BufferApiView(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate(() => this._onBufferChange.fire(this.active));
          }
          get active() {
            if (this._core.buffers.active === this._core.buffers.normal) return this.normal;
            if (this._core.buffers.active === this._core.buffers.alt) return this.alternate;
            throw new Error("Active buffer is neither normal nor alternate");
          }
          get normal() {
            return this._normal.init(this._core.buffers.normal);
          }
          get alternate() {
            return this._alternate.init(this._core.buffers.alt);
          }
        }
        r.BufferNamespaceApi = d;
      }, 7975: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.ParserApi = void 0, r.ParserApi = class {
          constructor(a) {
            this._core = a;
          }
          registerCsiHandler(a, l) {
            return this._core.registerCsiHandler(a, (f) => l(f.toArray()));
          }
          addCsiHandler(a, l) {
            return this.registerCsiHandler(a, l);
          }
          registerDcsHandler(a, l) {
            return this._core.registerDcsHandler(a, (f, n) => l(f, n.toArray()));
          }
          addDcsHandler(a, l) {
            return this.registerDcsHandler(a, l);
          }
          registerEscHandler(a, l) {
            return this._core.registerEscHandler(a, l);
          }
          addEscHandler(a, l) {
            return this.registerEscHandler(a, l);
          }
          registerOscHandler(a, l) {
            return this._core.registerOscHandler(a, l);
          }
          addOscHandler(a, l) {
            return this.registerOscHandler(a, l);
          }
        };
      }, 7090: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.UnicodeApi = void 0, r.UnicodeApi = class {
          constructor(a) {
            this._core = a;
          }
          register(a) {
            this._core.unicodeService.register(a);
          }
          get versions() {
            return this._core.unicodeService.versions;
          }
          get activeVersion() {
            return this._core.unicodeService.activeVersion;
          }
          set activeVersion(a) {
            this._core.unicodeService.activeVersion = a;
          }
        };
      }, 744: function(O, r, a) {
        var l = this && this.__decorate || function(i, s, e, t) {
          var o, u = arguments.length, _ = u < 3 ? s : t === null ? t = Object.getOwnPropertyDescriptor(s, e) : t;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") _ = Reflect.decorate(i, s, e, t);
          else for (var p = i.length - 1; p >= 0; p--) (o = i[p]) && (_ = (u < 3 ? o(_) : u > 3 ? o(s, e, _) : o(s, e)) || _);
          return u > 3 && _ && Object.defineProperty(s, e, _), _;
        }, f = this && this.__param || function(i, s) {
          return function(e, t) {
            s(e, t, i);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.BufferService = r.MINIMUM_ROWS = r.MINIMUM_COLS = void 0;
        const n = a(8460), d = a(844), v = a(5295), g = a(2585);
        r.MINIMUM_COLS = 2, r.MINIMUM_ROWS = 1;
        let h = r.BufferService = class extends d.Disposable {
          get buffer() {
            return this.buffers.active;
          }
          constructor(i) {
            super(), this.isUserScrolling = false, this._onResize = this.register(new n.EventEmitter()), this.onResize = this._onResize.event, this._onScroll = this.register(new n.EventEmitter()), this.onScroll = this._onScroll.event, this.cols = Math.max(i.rawOptions.cols || 0, r.MINIMUM_COLS), this.rows = Math.max(i.rawOptions.rows || 0, r.MINIMUM_ROWS), this.buffers = this.register(new v.BufferSet(i, this));
          }
          resize(i, s) {
            this.cols = i, this.rows = s, this.buffers.resize(i, s), this._onResize.fire({ cols: i, rows: s });
          }
          reset() {
            this.buffers.reset(), this.isUserScrolling = false;
          }
          scroll(i, s = false) {
            const e = this.buffer;
            let t;
            t = this._cachedBlankLine, t && t.length === this.cols && t.getFg(0) === i.fg && t.getBg(0) === i.bg || (t = e.getBlankLine(i, s), this._cachedBlankLine = t), t.isWrapped = s;
            const o = e.ybase + e.scrollTop, u = e.ybase + e.scrollBottom;
            if (e.scrollTop === 0) {
              const _ = e.lines.isFull;
              u === e.lines.length - 1 ? _ ? e.lines.recycle().copyFrom(t) : e.lines.push(t.clone()) : e.lines.splice(u + 1, 0, t.clone()), _ ? this.isUserScrolling && (e.ydisp = Math.max(e.ydisp - 1, 0)) : (e.ybase++, this.isUserScrolling || e.ydisp++);
            } else {
              const _ = u - o + 1;
              e.lines.shiftElements(o + 1, _ - 1, -1), e.lines.set(u, t.clone());
            }
            this.isUserScrolling || (e.ydisp = e.ybase), this._onScroll.fire(e.ydisp);
          }
          scrollLines(i, s, e) {
            const t = this.buffer;
            if (i < 0) {
              if (t.ydisp === 0) return;
              this.isUserScrolling = true;
            } else i + t.ydisp >= t.ybase && (this.isUserScrolling = false);
            const o = t.ydisp;
            t.ydisp = Math.max(Math.min(t.ydisp + i, t.ybase), 0), o !== t.ydisp && (s || this._onScroll.fire(t.ydisp));
          }
        };
        r.BufferService = h = l([f(0, g.IOptionsService)], h);
      }, 7994: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.CharsetService = void 0, r.CharsetService = class {
          constructor() {
            this.glevel = 0, this._charsets = [];
          }
          reset() {
            this.charset = void 0, this._charsets = [], this.glevel = 0;
          }
          setgLevel(a) {
            this.glevel = a, this.charset = this._charsets[a];
          }
          setgCharset(a, l) {
            this._charsets[a] = l, this.glevel === a && (this.charset = l);
          }
        };
      }, 1753: function(O, r, a) {
        var l = this && this.__decorate || function(t, o, u, _) {
          var p, c = arguments.length, m = c < 3 ? o : _ === null ? _ = Object.getOwnPropertyDescriptor(o, u) : _;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") m = Reflect.decorate(t, o, u, _);
          else for (var y = t.length - 1; y >= 0; y--) (p = t[y]) && (m = (c < 3 ? p(m) : c > 3 ? p(o, u, m) : p(o, u)) || m);
          return c > 3 && m && Object.defineProperty(o, u, m), m;
        }, f = this && this.__param || function(t, o) {
          return function(u, _) {
            o(u, _, t);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.CoreMouseService = void 0;
        const n = a(2585), d = a(8460), v = a(844), g = { NONE: { events: 0, restrict: () => false }, X10: { events: 1, restrict: (t) => t.button !== 4 && t.action === 1 && (t.ctrl = false, t.alt = false, t.shift = false, true) }, VT200: { events: 19, restrict: (t) => t.action !== 32 }, DRAG: { events: 23, restrict: (t) => t.action !== 32 || t.button !== 3 }, ANY: { events: 31, restrict: (t) => true } };
        function h(t, o) {
          let u = (t.ctrl ? 16 : 0) | (t.shift ? 4 : 0) | (t.alt ? 8 : 0);
          return t.button === 4 ? (u |= 64, u |= t.action) : (u |= 3 & t.button, 4 & t.button && (u |= 64), 8 & t.button && (u |= 128), t.action === 32 ? u |= 32 : t.action !== 0 || o || (u |= 3)), u;
        }
        const i = String.fromCharCode, s = { DEFAULT: (t) => {
          const o = [h(t, false) + 32, t.col + 32, t.row + 32];
          return o[0] > 255 || o[1] > 255 || o[2] > 255 ? "" : `\x1B[M${i(o[0])}${i(o[1])}${i(o[2])}`;
        }, SGR: (t) => {
          const o = t.action === 0 && t.button !== 4 ? "m" : "M";
          return `\x1B[<${h(t, true)};${t.col};${t.row}${o}`;
        }, SGR_PIXELS: (t) => {
          const o = t.action === 0 && t.button !== 4 ? "m" : "M";
          return `\x1B[<${h(t, true)};${t.x};${t.y}${o}`;
        } };
        let e = r.CoreMouseService = class extends v.Disposable {
          constructor(t, o) {
            super(), this._bufferService = t, this._coreService = o, this._protocols = {}, this._encodings = {}, this._activeProtocol = "", this._activeEncoding = "", this._lastEvent = null, this._onProtocolChange = this.register(new d.EventEmitter()), this.onProtocolChange = this._onProtocolChange.event;
            for (const u of Object.keys(g)) this.addProtocol(u, g[u]);
            for (const u of Object.keys(s)) this.addEncoding(u, s[u]);
            this.reset();
          }
          addProtocol(t, o) {
            this._protocols[t] = o;
          }
          addEncoding(t, o) {
            this._encodings[t] = o;
          }
          get activeProtocol() {
            return this._activeProtocol;
          }
          get areMouseEventsActive() {
            return this._protocols[this._activeProtocol].events !== 0;
          }
          set activeProtocol(t) {
            if (!this._protocols[t]) throw new Error(`unknown protocol "${t}"`);
            this._activeProtocol = t, this._onProtocolChange.fire(this._protocols[t].events);
          }
          get activeEncoding() {
            return this._activeEncoding;
          }
          set activeEncoding(t) {
            if (!this._encodings[t]) throw new Error(`unknown encoding "${t}"`);
            this._activeEncoding = t;
          }
          reset() {
            this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null;
          }
          triggerMouseEvent(t) {
            if (t.col < 0 || t.col >= this._bufferService.cols || t.row < 0 || t.row >= this._bufferService.rows || t.button === 4 && t.action === 32 || t.button === 3 && t.action !== 32 || t.button !== 4 && (t.action === 2 || t.action === 3) || (t.col++, t.row++, t.action === 32 && this._lastEvent && this._equalEvents(this._lastEvent, t, this._activeEncoding === "SGR_PIXELS")) || !this._protocols[this._activeProtocol].restrict(t)) return false;
            const o = this._encodings[this._activeEncoding](t);
            return o && (this._activeEncoding === "DEFAULT" ? this._coreService.triggerBinaryEvent(o) : this._coreService.triggerDataEvent(o, true)), this._lastEvent = t, true;
          }
          explainEvents(t) {
            return { down: !!(1 & t), up: !!(2 & t), drag: !!(4 & t), move: !!(8 & t), wheel: !!(16 & t) };
          }
          _equalEvents(t, o, u) {
            if (u) {
              if (t.x !== o.x || t.y !== o.y) return false;
            } else if (t.col !== o.col || t.row !== o.row) return false;
            return t.button === o.button && t.action === o.action && t.ctrl === o.ctrl && t.alt === o.alt && t.shift === o.shift;
          }
        };
        r.CoreMouseService = e = l([f(0, n.IBufferService), f(1, n.ICoreService)], e);
      }, 6975: function(O, r, a) {
        var l = this && this.__decorate || function(e, t, o, u) {
          var _, p = arguments.length, c = p < 3 ? t : u === null ? u = Object.getOwnPropertyDescriptor(t, o) : u;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") c = Reflect.decorate(e, t, o, u);
          else for (var m = e.length - 1; m >= 0; m--) (_ = e[m]) && (c = (p < 3 ? _(c) : p > 3 ? _(t, o, c) : _(t, o)) || c);
          return p > 3 && c && Object.defineProperty(t, o, c), c;
        }, f = this && this.__param || function(e, t) {
          return function(o, u) {
            t(o, u, e);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.CoreService = void 0;
        const n = a(1439), d = a(8460), v = a(844), g = a(2585), h = Object.freeze({ insertMode: false }), i = Object.freeze({ applicationCursorKeys: false, applicationKeypad: false, bracketedPasteMode: false, origin: false, reverseWraparound: false, sendFocus: false, wraparound: true });
        let s = r.CoreService = class extends v.Disposable {
          constructor(e, t, o) {
            super(), this._bufferService = e, this._logService = t, this._optionsService = o, this.isCursorInitialized = false, this.isCursorHidden = false, this._onData = this.register(new d.EventEmitter()), this.onData = this._onData.event, this._onUserInput = this.register(new d.EventEmitter()), this.onUserInput = this._onUserInput.event, this._onBinary = this.register(new d.EventEmitter()), this.onBinary = this._onBinary.event, this._onRequestScrollToBottom = this.register(new d.EventEmitter()), this.onRequestScrollToBottom = this._onRequestScrollToBottom.event, this.modes = (0, n.clone)(h), this.decPrivateModes = (0, n.clone)(i);
          }
          reset() {
            this.modes = (0, n.clone)(h), this.decPrivateModes = (0, n.clone)(i);
          }
          triggerDataEvent(e, t = false) {
            if (this._optionsService.rawOptions.disableStdin) return;
            const o = this._bufferService.buffer;
            t && this._optionsService.rawOptions.scrollOnUserInput && o.ybase !== o.ydisp && this._onRequestScrollToBottom.fire(), t && this._onUserInput.fire(), this._logService.debug(`sending data "${e}"`, () => e.split("").map((u) => u.charCodeAt(0))), this._onData.fire(e);
          }
          triggerBinaryEvent(e) {
            this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e}"`, () => e.split("").map((t) => t.charCodeAt(0))), this._onBinary.fire(e));
          }
        };
        r.CoreService = s = l([f(0, g.IBufferService), f(1, g.ILogService), f(2, g.IOptionsService)], s);
      }, 9074: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.DecorationService = void 0;
        const l = a(8055), f = a(8460), n = a(844), d = a(6106);
        let v = 0, g = 0;
        class h extends n.Disposable {
          get decorations() {
            return this._decorations.values();
          }
          constructor() {
            super(), this._decorations = new d.SortedList((e) => e == null ? void 0 : e.marker.line), this._onDecorationRegistered = this.register(new f.EventEmitter()), this.onDecorationRegistered = this._onDecorationRegistered.event, this._onDecorationRemoved = this.register(new f.EventEmitter()), this.onDecorationRemoved = this._onDecorationRemoved.event, this.register((0, n.toDisposable)(() => this.reset()));
          }
          registerDecoration(e) {
            if (e.marker.isDisposed) return;
            const t = new i(e);
            if (t) {
              const o = t.marker.onDispose(() => t.dispose());
              t.onDispose(() => {
                t && (this._decorations.delete(t) && this._onDecorationRemoved.fire(t), o.dispose());
              }), this._decorations.insert(t), this._onDecorationRegistered.fire(t);
            }
            return t;
          }
          reset() {
            for (const e of this._decorations.values()) e.dispose();
            this._decorations.clear();
          }
          *getDecorationsAtCell(e, t, o) {
            var _a, _b, _c;
            let u = 0, _ = 0;
            for (const p of this._decorations.getKeyIterator(t)) u = (_a = p.options.x) != null ? _a : 0, _ = u + ((_b = p.options.width) != null ? _b : 1), e >= u && e < _ && (!o || ((_c = p.options.layer) != null ? _c : "bottom") === o) && (yield p);
          }
          forEachDecorationAtCell(e, t, o, u) {
            this._decorations.forEachByKey(t, (_) => {
              var _a, _b, _c;
              v = (_a = _.options.x) != null ? _a : 0, g = v + ((_b = _.options.width) != null ? _b : 1), e >= v && e < g && (!o || ((_c = _.options.layer) != null ? _c : "bottom") === o) && u(_);
            });
          }
        }
        r.DecorationService = h;
        class i extends n.Disposable {
          get isDisposed() {
            return this._isDisposed;
          }
          get backgroundColorRGB() {
            return this._cachedBg === null && (this.options.backgroundColor ? this._cachedBg = l.css.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
          }
          get foregroundColorRGB() {
            return this._cachedFg === null && (this.options.foregroundColor ? this._cachedFg = l.css.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
          }
          constructor(e) {
            super(), this.options = e, this.onRenderEmitter = this.register(new f.EventEmitter()), this.onRender = this.onRenderEmitter.event, this._onDispose = this.register(new f.EventEmitter()), this.onDispose = this._onDispose.event, this._cachedBg = null, this._cachedFg = null, this.marker = e.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
          }
          dispose() {
            this._onDispose.fire(), super.dispose();
          }
        }
      }, 4348: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.InstantiationService = r.ServiceCollection = void 0;
        const l = a(2585), f = a(8343);
        class n {
          constructor(...v) {
            this._entries = /* @__PURE__ */ new Map();
            for (const [g, h] of v) this.set(g, h);
          }
          set(v, g) {
            const h = this._entries.get(v);
            return this._entries.set(v, g), h;
          }
          forEach(v) {
            for (const [g, h] of this._entries.entries()) v(g, h);
          }
          has(v) {
            return this._entries.has(v);
          }
          get(v) {
            return this._entries.get(v);
          }
        }
        r.ServiceCollection = n, r.InstantiationService = class {
          constructor() {
            this._services = new n(), this._services.set(l.IInstantiationService, this);
          }
          setService(d, v) {
            this._services.set(d, v);
          }
          getService(d) {
            return this._services.get(d);
          }
          createInstance(d, ...v) {
            const g = (0, f.getServiceDependencies)(d).sort((s, e) => s.index - e.index), h = [];
            for (const s of g) {
              const e = this._services.get(s.id);
              if (!e) throw new Error(`[createInstance] ${d.name} depends on UNKNOWN service ${s.id}.`);
              h.push(e);
            }
            const i = g.length > 0 ? g[0].index : v.length;
            if (v.length !== i) throw new Error(`[createInstance] First service dependency of ${d.name} at position ${i + 1} conflicts with ${v.length} static arguments`);
            return new d(...v, ...h);
          }
        };
      }, 7866: function(O, r, a) {
        var l = this && this.__decorate || function(i, s, e, t) {
          var o, u = arguments.length, _ = u < 3 ? s : t === null ? t = Object.getOwnPropertyDescriptor(s, e) : t;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") _ = Reflect.decorate(i, s, e, t);
          else for (var p = i.length - 1; p >= 0; p--) (o = i[p]) && (_ = (u < 3 ? o(_) : u > 3 ? o(s, e, _) : o(s, e)) || _);
          return u > 3 && _ && Object.defineProperty(s, e, _), _;
        }, f = this && this.__param || function(i, s) {
          return function(e, t) {
            s(e, t, i);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.traceCall = r.setTraceLogger = r.LogService = void 0;
        const n = a(844), d = a(2585), v = { trace: d.LogLevelEnum.TRACE, debug: d.LogLevelEnum.DEBUG, info: d.LogLevelEnum.INFO, warn: d.LogLevelEnum.WARN, error: d.LogLevelEnum.ERROR, off: d.LogLevelEnum.OFF };
        let g, h = r.LogService = class extends n.Disposable {
          get logLevel() {
            return this._logLevel;
          }
          constructor(i) {
            super(), this._optionsService = i, this._logLevel = d.LogLevelEnum.OFF, this._updateLogLevel(), this.register(this._optionsService.onSpecificOptionChange("logLevel", () => this._updateLogLevel())), g = this;
          }
          _updateLogLevel() {
            this._logLevel = v[this._optionsService.rawOptions.logLevel];
          }
          _evalLazyOptionalParams(i) {
            for (let s = 0; s < i.length; s++) typeof i[s] == "function" && (i[s] = i[s]());
          }
          _log(i, s, e) {
            this._evalLazyOptionalParams(e), i.call(console, (this._optionsService.options.logger ? "" : "xterm.js: ") + s, ...e);
          }
          trace(i, ...s) {
            var _a;
            var e;
            this._logLevel <= d.LogLevelEnum.TRACE && this._log((_a = (e = this._optionsService.options.logger) == null ? void 0 : e.trace.bind(this._optionsService.options.logger)) != null ? _a : console.log, i, s);
          }
          debug(i, ...s) {
            var _a;
            var e;
            this._logLevel <= d.LogLevelEnum.DEBUG && this._log((_a = (e = this._optionsService.options.logger) == null ? void 0 : e.debug.bind(this._optionsService.options.logger)) != null ? _a : console.log, i, s);
          }
          info(i, ...s) {
            var _a;
            var e;
            this._logLevel <= d.LogLevelEnum.INFO && this._log((_a = (e = this._optionsService.options.logger) == null ? void 0 : e.info.bind(this._optionsService.options.logger)) != null ? _a : console.info, i, s);
          }
          warn(i, ...s) {
            var _a;
            var e;
            this._logLevel <= d.LogLevelEnum.WARN && this._log((_a = (e = this._optionsService.options.logger) == null ? void 0 : e.warn.bind(this._optionsService.options.logger)) != null ? _a : console.warn, i, s);
          }
          error(i, ...s) {
            var _a;
            var e;
            this._logLevel <= d.LogLevelEnum.ERROR && this._log((_a = (e = this._optionsService.options.logger) == null ? void 0 : e.error.bind(this._optionsService.options.logger)) != null ? _a : console.error, i, s);
          }
        };
        r.LogService = h = l([f(0, d.IOptionsService)], h), r.setTraceLogger = function(i) {
          g = i;
        }, r.traceCall = function(i, s, e) {
          if (typeof e.value != "function") throw new Error("not supported");
          const t = e.value;
          e.value = function(...o) {
            if (g.logLevel !== d.LogLevelEnum.TRACE) return t.apply(this, o);
            g.trace(`GlyphRenderer#${t.name}(${o.map((_) => JSON.stringify(_)).join(", ")})`);
            const u = t.apply(this, o);
            return g.trace(`GlyphRenderer#${t.name} return`, u), u;
          };
        };
      }, 7302: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.OptionsService = r.DEFAULT_OPTIONS = void 0;
        const l = a(8460), f = a(844), n = a(6114);
        r.DEFAULT_OPTIONS = { cols: 80, rows: 24, cursorBlink: false, cursorStyle: "block", cursorWidth: 1, cursorInactiveStyle: "outline", customGlyphs: true, drawBoldTextInBrightColors: true, documentOverride: null, fastScrollModifier: "alt", fastScrollSensitivity: 5, fontFamily: "courier-new, courier, monospace", fontSize: 15, fontWeight: "normal", fontWeightBold: "bold", ignoreBracketedPasteMode: false, lineHeight: 1, letterSpacing: 0, linkHandler: null, logLevel: "info", logger: null, scrollback: 1e3, scrollOnUserInput: true, scrollSensitivity: 1, screenReaderMode: false, smoothScrollDuration: 0, macOptionIsMeta: false, macOptionClickForcesSelection: false, minimumContrastRatio: 1, disableStdin: false, allowProposedApi: false, allowTransparency: false, tabStopWidth: 8, theme: {}, rescaleOverlappingGlyphs: false, rightClickSelectsWord: n.isMac, windowOptions: {}, windowsMode: false, windowsPty: {}, wordSeparator: " ()[]{}',\"`", altClickMovesCursor: true, convertEol: false, termName: "xterm", cancelEvents: false, overviewRulerWidth: 0 };
        const d = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
        class v extends f.Disposable {
          constructor(h) {
            super(), this._onOptionChange = this.register(new l.EventEmitter()), this.onOptionChange = this._onOptionChange.event;
            const i = { ...r.DEFAULT_OPTIONS };
            for (const s in h) if (s in i) try {
              const e = h[s];
              i[s] = this._sanitizeAndValidateOption(s, e);
            } catch (e) {
              console.error(e);
            }
            this.rawOptions = i, this.options = { ...i }, this._setupOptions(), this.register((0, f.toDisposable)(() => {
              this.rawOptions.linkHandler = null, this.rawOptions.documentOverride = null;
            }));
          }
          onSpecificOptionChange(h, i) {
            return this.onOptionChange((s) => {
              s === h && i(this.rawOptions[h]);
            });
          }
          onMultipleOptionChange(h, i) {
            return this.onOptionChange((s) => {
              h.indexOf(s) !== -1 && i();
            });
          }
          _setupOptions() {
            const h = (s) => {
              if (!(s in r.DEFAULT_OPTIONS)) throw new Error(`No option with key "${s}"`);
              return this.rawOptions[s];
            }, i = (s, e) => {
              if (!(s in r.DEFAULT_OPTIONS)) throw new Error(`No option with key "${s}"`);
              e = this._sanitizeAndValidateOption(s, e), this.rawOptions[s] !== e && (this.rawOptions[s] = e, this._onOptionChange.fire(s));
            };
            for (const s in this.rawOptions) {
              const e = { get: h.bind(this, s), set: i.bind(this, s) };
              Object.defineProperty(this.options, s, e);
            }
          }
          _sanitizeAndValidateOption(h, i) {
            switch (h) {
              case "cursorStyle":
                if (i || (i = r.DEFAULT_OPTIONS[h]), !/* @__PURE__ */ function(s) {
                  return s === "block" || s === "underline" || s === "bar";
                }(i)) throw new Error(`"${i}" is not a valid value for ${h}`);
                break;
              case "wordSeparator":
                i || (i = r.DEFAULT_OPTIONS[h]);
                break;
              case "fontWeight":
              case "fontWeightBold":
                if (typeof i == "number" && 1 <= i && i <= 1e3) break;
                i = d.includes(i) ? i : r.DEFAULT_OPTIONS[h];
                break;
              case "cursorWidth":
                i = Math.floor(i);
              case "lineHeight":
              case "tabStopWidth":
                if (i < 1) throw new Error(`${h} cannot be less than 1, value: ${i}`);
                break;
              case "minimumContrastRatio":
                i = Math.max(1, Math.min(21, Math.round(10 * i) / 10));
                break;
              case "scrollback":
                if ((i = Math.min(i, 4294967295)) < 0) throw new Error(`${h} cannot be less than 0, value: ${i}`);
                break;
              case "fastScrollSensitivity":
              case "scrollSensitivity":
                if (i <= 0) throw new Error(`${h} cannot be less than or equal to 0, value: ${i}`);
                break;
              case "rows":
              case "cols":
                if (!i && i !== 0) throw new Error(`${h} must be numeric, value: ${i}`);
                break;
              case "windowsPty":
                i = i != null ? i : {};
            }
            return i;
          }
        }
        r.OptionsService = v;
      }, 2660: function(O, r, a) {
        var l = this && this.__decorate || function(v, g, h, i) {
          var s, e = arguments.length, t = e < 3 ? g : i === null ? i = Object.getOwnPropertyDescriptor(g, h) : i;
          if (typeof Reflect == "object" && typeof Reflect.decorate == "function") t = Reflect.decorate(v, g, h, i);
          else for (var o = v.length - 1; o >= 0; o--) (s = v[o]) && (t = (e < 3 ? s(t) : e > 3 ? s(g, h, t) : s(g, h)) || t);
          return e > 3 && t && Object.defineProperty(g, h, t), t;
        }, f = this && this.__param || function(v, g) {
          return function(h, i) {
            g(h, i, v);
          };
        };
        Object.defineProperty(r, "__esModule", { value: true }), r.OscLinkService = void 0;
        const n = a(2585);
        let d = r.OscLinkService = class {
          constructor(v) {
            this._bufferService = v, this._nextId = 1, this._entriesWithId = /* @__PURE__ */ new Map(), this._dataByLinkId = /* @__PURE__ */ new Map();
          }
          registerLink(v) {
            const g = this._bufferService.buffer;
            if (v.id === void 0) {
              const o = g.addMarker(g.ybase + g.y), u = { data: v, id: this._nextId++, lines: [o] };
              return o.onDispose(() => this._removeMarkerFromLink(u, o)), this._dataByLinkId.set(u.id, u), u.id;
            }
            const h = v, i = this._getEntryIdKey(h), s = this._entriesWithId.get(i);
            if (s) return this.addLineToLink(s.id, g.ybase + g.y), s.id;
            const e = g.addMarker(g.ybase + g.y), t = { id: this._nextId++, key: this._getEntryIdKey(h), data: h, lines: [e] };
            return e.onDispose(() => this._removeMarkerFromLink(t, e)), this._entriesWithId.set(t.key, t), this._dataByLinkId.set(t.id, t), t.id;
          }
          addLineToLink(v, g) {
            const h = this._dataByLinkId.get(v);
            if (h && h.lines.every((i) => i.line !== g)) {
              const i = this._bufferService.buffer.addMarker(g);
              h.lines.push(i), i.onDispose(() => this._removeMarkerFromLink(h, i));
            }
          }
          getLinkData(v) {
            var g;
            return (g = this._dataByLinkId.get(v)) == null ? void 0 : g.data;
          }
          _getEntryIdKey(v) {
            return `${v.id};;${v.uri}`;
          }
          _removeMarkerFromLink(v, g) {
            const h = v.lines.indexOf(g);
            h !== -1 && (v.lines.splice(h, 1), v.lines.length === 0 && (v.data.id !== void 0 && this._entriesWithId.delete(v.key), this._dataByLinkId.delete(v.id)));
          }
        };
        r.OscLinkService = d = l([f(0, n.IBufferService)], d);
      }, 8343: (O, r) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.createDecorator = r.getServiceDependencies = r.serviceRegistry = void 0;
        const a = "di$target", l = "di$dependencies";
        r.serviceRegistry = /* @__PURE__ */ new Map(), r.getServiceDependencies = function(f) {
          return f[l] || [];
        }, r.createDecorator = function(f) {
          if (r.serviceRegistry.has(f)) return r.serviceRegistry.get(f);
          const n = function(d, v, g) {
            if (arguments.length !== 3) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
            (function(h, i, s) {
              i[a] === i ? i[l].push({ id: h, index: s }) : (i[l] = [{ id: h, index: s }], i[a] = i);
            })(n, d, g);
          };
          return n.toString = () => f, r.serviceRegistry.set(f, n), n;
        };
      }, 2585: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.IDecorationService = r.IUnicodeService = r.IOscLinkService = r.IOptionsService = r.ILogService = r.LogLevelEnum = r.IInstantiationService = r.ICharsetService = r.ICoreService = r.ICoreMouseService = r.IBufferService = void 0;
        const l = a(8343);
        var f;
        r.IBufferService = (0, l.createDecorator)("BufferService"), r.ICoreMouseService = (0, l.createDecorator)("CoreMouseService"), r.ICoreService = (0, l.createDecorator)("CoreService"), r.ICharsetService = (0, l.createDecorator)("CharsetService"), r.IInstantiationService = (0, l.createDecorator)("InstantiationService"), function(n) {
          n[n.TRACE = 0] = "TRACE", n[n.DEBUG = 1] = "DEBUG", n[n.INFO = 2] = "INFO", n[n.WARN = 3] = "WARN", n[n.ERROR = 4] = "ERROR", n[n.OFF = 5] = "OFF";
        }(f || (r.LogLevelEnum = f = {})), r.ILogService = (0, l.createDecorator)("LogService"), r.IOptionsService = (0, l.createDecorator)("OptionsService"), r.IOscLinkService = (0, l.createDecorator)("OscLinkService"), r.IUnicodeService = (0, l.createDecorator)("UnicodeService"), r.IDecorationService = (0, l.createDecorator)("DecorationService");
      }, 1480: (O, r, a) => {
        Object.defineProperty(r, "__esModule", { value: true }), r.UnicodeService = void 0;
        const l = a(8460), f = a(225);
        class n {
          static extractShouldJoin(v) {
            return (1 & v) != 0;
          }
          static extractWidth(v) {
            return v >> 1 & 3;
          }
          static extractCharKind(v) {
            return v >> 3;
          }
          static createPropertyValue(v, g, h = false) {
            return (16777215 & v) << 3 | (3 & g) << 1 | (h ? 1 : 0);
          }
          constructor() {
            this._providers = /* @__PURE__ */ Object.create(null), this._active = "", this._onChange = new l.EventEmitter(), this.onChange = this._onChange.event;
            const v = new f.UnicodeV6();
            this.register(v), this._active = v.version, this._activeProvider = v;
          }
          dispose() {
            this._onChange.dispose();
          }
          get versions() {
            return Object.keys(this._providers);
          }
          get activeVersion() {
            return this._active;
          }
          set activeVersion(v) {
            if (!this._providers[v]) throw new Error(`unknown Unicode version "${v}"`);
            this._active = v, this._activeProvider = this._providers[v], this._onChange.fire(v);
          }
          register(v) {
            this._providers[v.version] = v;
          }
          wcwidth(v) {
            return this._activeProvider.wcwidth(v);
          }
          getStringCellWidth(v) {
            let g = 0, h = 0;
            const i = v.length;
            for (let s = 0; s < i; ++s) {
              let e = v.charCodeAt(s);
              if (55296 <= e && e <= 56319) {
                if (++s >= i) return g + this.wcwidth(e);
                const u = v.charCodeAt(s);
                56320 <= u && u <= 57343 ? e = 1024 * (e - 55296) + u - 56320 + 65536 : g += this.wcwidth(u);
              }
              const t = this.charProperties(e, h);
              let o = n.extractWidth(t);
              n.extractShouldJoin(t) && (o -= n.extractWidth(h)), g += o, h = t;
            }
            return g;
          }
          charProperties(v, g) {
            return this._activeProvider.charProperties(v, g);
          }
        }
        r.UnicodeService = n;
      } }, Y = {};
      function G(O) {
        var r = Y[O];
        if (r !== void 0) return r.exports;
        var a = Y[O] = { exports: {} };
        return te[O].call(a.exports, a, a.exports, G), a.exports;
      }
      var ie = {};
      return (() => {
        var O = ie;
        Object.defineProperty(O, "__esModule", { value: true }), O.Terminal = void 0;
        const r = G(9042), a = G(3236), l = G(844), f = G(5741), n = G(8285), d = G(7975), v = G(7090), g = ["cols", "rows"];
        class h extends l.Disposable {
          constructor(s) {
            super(), this._core = this.register(new a.Terminal(s)), this._addonManager = this.register(new f.AddonManager()), this._publicOptions = { ...this._core.options };
            const e = (o) => this._core.options[o], t = (o, u) => {
              this._checkReadonlyOptions(o), this._core.options[o] = u;
            };
            for (const o in this._core.options) {
              const u = { get: e.bind(this, o), set: t.bind(this, o) };
              Object.defineProperty(this._publicOptions, o, u);
            }
          }
          _checkReadonlyOptions(s) {
            if (g.includes(s)) throw new Error(`Option "${s}" can only be set in the constructor`);
          }
          _checkProposedApi() {
            if (!this._core.optionsService.rawOptions.allowProposedApi) throw new Error("You must set the allowProposedApi option to true to use proposed API");
          }
          get onBell() {
            return this._core.onBell;
          }
          get onBinary() {
            return this._core.onBinary;
          }
          get onCursorMove() {
            return this._core.onCursorMove;
          }
          get onData() {
            return this._core.onData;
          }
          get onKey() {
            return this._core.onKey;
          }
          get onLineFeed() {
            return this._core.onLineFeed;
          }
          get onRender() {
            return this._core.onRender;
          }
          get onResize() {
            return this._core.onResize;
          }
          get onScroll() {
            return this._core.onScroll;
          }
          get onSelectionChange() {
            return this._core.onSelectionChange;
          }
          get onTitleChange() {
            return this._core.onTitleChange;
          }
          get onWriteParsed() {
            return this._core.onWriteParsed;
          }
          get element() {
            return this._core.element;
          }
          get parser() {
            return this._parser || (this._parser = new d.ParserApi(this._core)), this._parser;
          }
          get unicode() {
            return this._checkProposedApi(), new v.UnicodeApi(this._core);
          }
          get textarea() {
            return this._core.textarea;
          }
          get rows() {
            return this._core.rows;
          }
          get cols() {
            return this._core.cols;
          }
          get buffer() {
            return this._buffer || (this._buffer = this.register(new n.BufferNamespaceApi(this._core))), this._buffer;
          }
          get markers() {
            return this._checkProposedApi(), this._core.markers;
          }
          get modes() {
            const s = this._core.coreService.decPrivateModes;
            let e = "none";
            switch (this._core.coreMouseService.activeProtocol) {
              case "X10":
                e = "x10";
                break;
              case "VT200":
                e = "vt200";
                break;
              case "DRAG":
                e = "drag";
                break;
              case "ANY":
                e = "any";
            }
            return { applicationCursorKeysMode: s.applicationCursorKeys, applicationKeypadMode: s.applicationKeypad, bracketedPasteMode: s.bracketedPasteMode, insertMode: this._core.coreService.modes.insertMode, mouseTrackingMode: e, originMode: s.origin, reverseWraparoundMode: s.reverseWraparound, sendFocusMode: s.sendFocus, wraparoundMode: s.wraparound };
          }
          get options() {
            return this._publicOptions;
          }
          set options(s) {
            for (const e in s) this._publicOptions[e] = s[e];
          }
          blur() {
            this._core.blur();
          }
          focus() {
            this._core.focus();
          }
          input(s, e = true) {
            this._core.input(s, e);
          }
          resize(s, e) {
            this._verifyIntegers(s, e), this._core.resize(s, e);
          }
          open(s) {
            this._core.open(s);
          }
          attachCustomKeyEventHandler(s) {
            this._core.attachCustomKeyEventHandler(s);
          }
          attachCustomWheelEventHandler(s) {
            this._core.attachCustomWheelEventHandler(s);
          }
          registerLinkProvider(s) {
            return this._core.registerLinkProvider(s);
          }
          registerCharacterJoiner(s) {
            return this._checkProposedApi(), this._core.registerCharacterJoiner(s);
          }
          deregisterCharacterJoiner(s) {
            this._checkProposedApi(), this._core.deregisterCharacterJoiner(s);
          }
          registerMarker(s = 0) {
            return this._verifyIntegers(s), this._core.registerMarker(s);
          }
          registerDecoration(s) {
            var _a, _b, _c;
            return this._checkProposedApi(), this._verifyPositiveIntegers((_a = s.x) != null ? _a : 0, (_b = s.width) != null ? _b : 0, (_c = s.height) != null ? _c : 0), this._core.registerDecoration(s);
          }
          hasSelection() {
            return this._core.hasSelection();
          }
          select(s, e, t) {
            this._verifyIntegers(s, e, t), this._core.select(s, e, t);
          }
          getSelection() {
            return this._core.getSelection();
          }
          getSelectionPosition() {
            return this._core.getSelectionPosition();
          }
          clearSelection() {
            this._core.clearSelection();
          }
          selectAll() {
            this._core.selectAll();
          }
          selectLines(s, e) {
            this._verifyIntegers(s, e), this._core.selectLines(s, e);
          }
          dispose() {
            super.dispose();
          }
          scrollLines(s) {
            this._verifyIntegers(s), this._core.scrollLines(s);
          }
          scrollPages(s) {
            this._verifyIntegers(s), this._core.scrollPages(s);
          }
          scrollToTop() {
            this._core.scrollToTop();
          }
          scrollToBottom() {
            this._core.scrollToBottom();
          }
          scrollToLine(s) {
            this._verifyIntegers(s), this._core.scrollToLine(s);
          }
          clear() {
            this._core.clear();
          }
          write(s, e) {
            this._core.write(s, e);
          }
          writeln(s, e) {
            this._core.write(s), this._core.write(`\r
`, e);
          }
          paste(s) {
            this._core.paste(s);
          }
          refresh(s, e) {
            this._verifyIntegers(s, e), this._core.refresh(s, e);
          }
          reset() {
            this._core.reset();
          }
          clearTextureAtlas() {
            this._core.clearTextureAtlas();
          }
          loadAddon(s) {
            this._addonManager.loadAddon(this, s);
          }
          static get strings() {
            return r;
          }
          _verifyIntegers(...s) {
            for (const e of s) if (e === 1 / 0 || isNaN(e) || e % 1 != 0) throw new Error("This API only accepts integers");
          }
          _verifyPositiveIntegers(...s) {
            for (const e of s) if (e && (e === 1 / 0 || isNaN(e) || e % 1 != 0 || e < 0)) throw new Error("This API only accepts positive integers");
          }
        }
        O.Terminal = h;
      })(), ie;
    })());
  }(ve)), ve.exports;
}
var be = Ce();
const we = /* @__PURE__ */ Se({
  __proto__: null
}, [be]);

export { we as x };
//# sourceMappingURL=xterm-CW1xI9Rk-CVvF4fnj.mjs.map
