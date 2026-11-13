var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js
var t, e, s, o, n, r, i, S, c;
var init_css_tag = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js"() {
    t = globalThis;
    e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
    s = Symbol();
    o = /* @__PURE__ */ new WeakMap();
    n = class {
      constructor(t3, e5, o7) {
        if (this._$cssResult$ = true, o7 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t3, this.t = e5;
      }
      get styleSheet() {
        let t3 = this.o;
        const s4 = this.t;
        if (e && void 0 === t3) {
          const e5 = void 0 !== s4 && 1 === s4.length;
          e5 && (t3 = o.get(s4)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e5 && o.set(s4, t3));
        }
        return t3;
      }
      toString() {
        return this.cssText;
      }
    };
    r = (t3) => new n("string" == typeof t3 ? t3 : t3 + "", void 0, s);
    i = (t3, ...e5) => {
      const o7 = 1 === t3.length ? t3[0] : e5.reduce((e6, s4, o8) => e6 + ((t4) => {
        if (true === t4._$cssResult$) return t4.cssText;
        if ("number" == typeof t4) return t4;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      })(s4) + t3[o8 + 1], t3[0]);
      return new n(o7, t3, s);
    };
    S = (s4, o7) => {
      if (e) s4.adoptedStyleSheets = o7.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
      else for (const e5 of o7) {
        const o8 = document.createElement("style"), n5 = t.litNonce;
        void 0 !== n5 && o8.setAttribute("nonce", n5), o8.textContent = e5.cssText, s4.appendChild(o8);
      }
    };
    c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
      let e5 = "";
      for (const s4 of t4.cssRules) e5 += s4.cssText;
      return r(e5);
    })(t3) : t3;
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js
var i2, e2, h, r2, o2, n2, a, c2, l, p, d, u, f, b, y;
var init_reactive_element = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js"() {
    init_css_tag();
    init_css_tag();
    ({ is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object);
    a = globalThis;
    c2 = a.trustedTypes;
    l = c2 ? c2.emptyScript : "";
    p = a.reactiveElementPolyfillSupport;
    d = (t3, s4) => t3;
    u = { toAttribute(t3, s4) {
      switch (s4) {
        case Boolean:
          t3 = t3 ? l : null;
          break;
        case Object:
        case Array:
          t3 = null == t3 ? t3 : JSON.stringify(t3);
      }
      return t3;
    }, fromAttribute(t3, s4) {
      let i5 = t3;
      switch (s4) {
        case Boolean:
          i5 = null !== t3;
          break;
        case Number:
          i5 = null === t3 ? null : Number(t3);
          break;
        case Object:
        case Array:
          try {
            i5 = JSON.parse(t3);
          } catch (t4) {
            i5 = null;
          }
      }
      return i5;
    } };
    f = (t3, s4) => !i2(t3, s4);
    b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
    Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
    y = class extends HTMLElement {
      static addInitializer(t3) {
        this._$Ei(), (this.l ??= []).push(t3);
      }
      static get observedAttributes() {
        return this.finalize(), this._$Eh && [...this._$Eh.keys()];
      }
      static createProperty(t3, s4 = b) {
        if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t3) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t3, s4), !s4.noAccessor) {
          const i5 = Symbol(), h4 = this.getPropertyDescriptor(t3, i5, s4);
          void 0 !== h4 && e2(this.prototype, t3, h4);
        }
      }
      static getPropertyDescriptor(t3, s4, i5) {
        const { get: e5, set: r6 } = h(this.prototype, t3) ?? { get() {
          return this[s4];
        }, set(t4) {
          this[s4] = t4;
        } };
        return { get: e5, set(s5) {
          const h4 = e5?.call(this);
          r6?.call(this, s5), this.requestUpdate(t3, h4, i5);
        }, configurable: true, enumerable: true };
      }
      static getPropertyOptions(t3) {
        return this.elementProperties.get(t3) ?? b;
      }
      static _$Ei() {
        if (this.hasOwnProperty(d("elementProperties"))) return;
        const t3 = n2(this);
        t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
      }
      static finalize() {
        if (this.hasOwnProperty(d("finalized"))) return;
        if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
          const t4 = this.properties, s4 = [...r2(t4), ...o2(t4)];
          for (const i5 of s4) this.createProperty(i5, t4[i5]);
        }
        const t3 = this[Symbol.metadata];
        if (null !== t3) {
          const s4 = litPropertyMetadata.get(t3);
          if (void 0 !== s4) for (const [t4, i5] of s4) this.elementProperties.set(t4, i5);
        }
        this._$Eh = /* @__PURE__ */ new Map();
        for (const [t4, s4] of this.elementProperties) {
          const i5 = this._$Eu(t4, s4);
          void 0 !== i5 && this._$Eh.set(i5, t4);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
      }
      static finalizeStyles(s4) {
        const i5 = [];
        if (Array.isArray(s4)) {
          const e5 = new Set(s4.flat(1 / 0).reverse());
          for (const s5 of e5) i5.unshift(c(s5));
        } else void 0 !== s4 && i5.push(c(s4));
        return i5;
      }
      static _$Eu(t3, s4) {
        const i5 = s4.attribute;
        return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
      }
      constructor() {
        super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
      }
      _$Ev() {
        this._$ES = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t3) => t3(this));
      }
      addController(t3) {
        (this._$EO ??= /* @__PURE__ */ new Set()).add(t3), void 0 !== this.renderRoot && this.isConnected && t3.hostConnected?.();
      }
      removeController(t3) {
        this._$EO?.delete(t3);
      }
      _$E_() {
        const t3 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
        for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t3.set(i5, this[i5]), delete this[i5]);
        t3.size > 0 && (this._$Ep = t3);
      }
      createRenderRoot() {
        const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return S(t3, this.constructor.elementStyles), t3;
      }
      connectedCallback() {
        this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t3) => t3.hostConnected?.());
      }
      enableUpdating(t3) {
      }
      disconnectedCallback() {
        this._$EO?.forEach((t3) => t3.hostDisconnected?.());
      }
      attributeChangedCallback(t3, s4, i5) {
        this._$AK(t3, i5);
      }
      _$ET(t3, s4) {
        const i5 = this.constructor.elementProperties.get(t3), e5 = this.constructor._$Eu(t3, i5);
        if (void 0 !== e5 && true === i5.reflect) {
          const h4 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
          this._$Em = t3, null == h4 ? this.removeAttribute(e5) : this.setAttribute(e5, h4), this._$Em = null;
        }
      }
      _$AK(t3, s4) {
        const i5 = this.constructor, e5 = i5._$Eh.get(t3);
        if (void 0 !== e5 && this._$Em !== e5) {
          const t4 = i5.getPropertyOptions(e5), h4 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== t4.converter?.fromAttribute ? t4.converter : u;
          this._$Em = e5;
          const r6 = h4.fromAttribute(s4, t4.type);
          this[e5] = r6 ?? this._$Ej?.get(e5) ?? r6, this._$Em = null;
        }
      }
      requestUpdate(t3, s4, i5, e5 = false, h4) {
        if (void 0 !== t3) {
          const r6 = this.constructor;
          if (false === e5 && (h4 = this[t3]), i5 ??= r6.getPropertyOptions(t3), !((i5.hasChanged ?? f)(h4, s4) || i5.useDefault && i5.reflect && h4 === this._$Ej?.get(t3) && !this.hasAttribute(r6._$Eu(t3, i5)))) return;
          this.C(t3, s4, i5);
        }
        false === this.isUpdatePending && (this._$ES = this._$EP());
      }
      C(t3, s4, { useDefault: i5, reflect: e5, wrapped: h4 }, r6) {
        i5 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t3) && (this._$Ej.set(t3, r6 ?? s4 ?? this[t3]), true !== h4 || void 0 !== r6) || (this._$AL.has(t3) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t3, s4)), true === e5 && this._$Em !== t3 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t3));
      }
      async _$EP() {
        this.isUpdatePending = true;
        try {
          await this._$ES;
        } catch (t4) {
          Promise.reject(t4);
        }
        const t3 = this.scheduleUpdate();
        return null != t3 && await t3, !this.isUpdatePending;
      }
      scheduleUpdate() {
        return this.performUpdate();
      }
      performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
          if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
            for (const [t5, s5] of this._$Ep) this[t5] = s5;
            this._$Ep = void 0;
          }
          const t4 = this.constructor.elementProperties;
          if (t4.size > 0) for (const [s5, i5] of t4) {
            const { wrapped: t5 } = i5, e5 = this[s5];
            true !== t5 || this._$AL.has(s5) || void 0 === e5 || this.C(s5, void 0, i5, e5);
          }
        }
        let t3 = false;
        const s4 = this._$AL;
        try {
          t3 = this.shouldUpdate(s4), t3 ? (this.willUpdate(s4), this._$EO?.forEach((t4) => t4.hostUpdate?.()), this.update(s4)) : this._$EM();
        } catch (s5) {
          throw t3 = false, this._$EM(), s5;
        }
        t3 && this._$AE(s4);
      }
      willUpdate(t3) {
      }
      _$AE(t3) {
        this._$EO?.forEach((t4) => t4.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
      }
      _$EM() {
        this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
      }
      get updateComplete() {
        return this.getUpdateComplete();
      }
      getUpdateComplete() {
        return this._$ES;
      }
      shouldUpdate(t3) {
        return true;
      }
      update(t3) {
        this._$Eq &&= this._$Eq.forEach((t4) => this._$ET(t4, this[t4])), this._$EM();
      }
      updated(t3) {
      }
      firstUpdated(t3) {
      }
    };
    y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");
  }
});

// ../_kit/node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js
function V(t3, i5) {
  if (!u2(t3) || !t3.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i5) : i5;
}
function M(t3, i5, s4 = t3, e5) {
  if (i5 === E) return i5;
  let h4 = void 0 !== e5 ? s4._$Co?.[e5] : s4._$Cl;
  const o7 = a2(i5) ? void 0 : i5._$litDirective$;
  return h4?.constructor !== o7 && (h4?._$AO?.(false), void 0 === o7 ? h4 = void 0 : (h4 = new o7(t3), h4._$AT(t3, s4, e5)), void 0 !== e5 ? (s4._$Co ??= [])[e5] = h4 : s4._$Cl = h4), void 0 !== h4 && (i5 = M(t3, h4._$AS(t3, i5.values), h4, e5)), i5;
}
var t2, i3, s2, e3, h2, o3, n3, r3, l2, c3, a2, u2, d2, f2, v, _, m, p2, g, $, y2, x, b2, w, T, E, A, C, P, N, S2, R, k, H, I, L, z, Z, B, D;
var init_lit_html = __esm({
  "../_kit/node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js"() {
    t2 = globalThis;
    i3 = (t3) => t3;
    s2 = t2.trustedTypes;
    e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
    h2 = "$lit$";
    o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
    n3 = "?" + o3;
    r3 = `<${n3}>`;
    l2 = document;
    c3 = () => l2.createComment("");
    a2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
    u2 = Array.isArray;
    d2 = (t3) => u2(t3) || "function" == typeof t3?.[Symbol.iterator];
    f2 = "[ 	\n\f\r]";
    v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
    _ = /-->/g;
    m = />/g;
    p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
    g = /'/g;
    $ = /"/g;
    y2 = /^(?:script|style|textarea|title)$/i;
    x = (t3) => (i5, ...s4) => ({ _$litType$: t3, strings: i5, values: s4 });
    b2 = x(1);
    w = x(2);
    T = x(3);
    E = Symbol.for("lit-noChange");
    A = Symbol.for("lit-nothing");
    C = /* @__PURE__ */ new WeakMap();
    P = l2.createTreeWalker(l2, 129);
    N = (t3, i5) => {
      const s4 = t3.length - 1, e5 = [];
      let n5, l6 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = v;
      for (let i6 = 0; i6 < s4; i6++) {
        const s5 = t3[i6];
        let a3, u3, d4 = -1, f5 = 0;
        for (; f5 < s5.length && (c4.lastIndex = f5, u3 = c4.exec(s5), null !== u3); ) f5 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n5 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n5 ?? v, d4 = -1) : void 0 === u3[1] ? d4 = -2 : (d4 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
        const x6 = c4 === p2 && t3[i6 + 1].startsWith("/>") ? " " : "";
        l6 += c4 === v ? s5 + r3 : d4 >= 0 ? (e5.push(a3), s5.slice(0, d4) + h2 + s5.slice(d4) + o3 + x6) : s5 + o3 + (-2 === d4 ? i6 : x6);
      }
      return [V(t3, l6 + (t3[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e5];
    };
    S2 = class _S {
      constructor({ strings: t3, _$litType$: i5 }, e5) {
        let r6;
        this.parts = [];
        let l6 = 0, a3 = 0;
        const u3 = t3.length - 1, d4 = this.parts, [f5, v7] = N(t3, i5);
        if (this.el = _S.createElement(f5, e5), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
          const t4 = this.el.content.firstChild;
          t4.replaceWith(...t4.childNodes);
        }
        for (; null !== (r6 = P.nextNode()) && d4.length < u3; ) {
          if (1 === r6.nodeType) {
            if (r6.hasAttributes()) for (const t4 of r6.getAttributeNames()) if (t4.endsWith(h2)) {
              const i6 = v7[a3++], s4 = r6.getAttribute(t4).split(o3), e6 = /([.?@])?(.*)/.exec(i6);
              d4.push({ type: 1, index: l6, name: e6[2], strings: s4, ctor: "." === e6[1] ? I : "?" === e6[1] ? L : "@" === e6[1] ? z : H }), r6.removeAttribute(t4);
            } else t4.startsWith(o3) && (d4.push({ type: 6, index: l6 }), r6.removeAttribute(t4));
            if (y2.test(r6.tagName)) {
              const t4 = r6.textContent.split(o3), i6 = t4.length - 1;
              if (i6 > 0) {
                r6.textContent = s2 ? s2.emptyScript : "";
                for (let s4 = 0; s4 < i6; s4++) r6.append(t4[s4], c3()), P.nextNode(), d4.push({ type: 2, index: ++l6 });
                r6.append(t4[i6], c3());
              }
            }
          } else if (8 === r6.nodeType) if (r6.data === n3) d4.push({ type: 2, index: l6 });
          else {
            let t4 = -1;
            for (; -1 !== (t4 = r6.data.indexOf(o3, t4 + 1)); ) d4.push({ type: 7, index: l6 }), t4 += o3.length - 1;
          }
          l6++;
        }
      }
      static createElement(t3, i5) {
        const s4 = l2.createElement("template");
        return s4.innerHTML = t3, s4;
      }
    };
    R = class {
      constructor(t3, i5) {
        this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i5;
      }
      get parentNode() {
        return this._$AM.parentNode;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      u(t3) {
        const { el: { content: i5 }, parts: s4 } = this._$AD, e5 = (t3?.creationScope ?? l2).importNode(i5, true);
        P.currentNode = e5;
        let h4 = P.nextNode(), o7 = 0, n5 = 0, r6 = s4[0];
        for (; void 0 !== r6; ) {
          if (o7 === r6.index) {
            let i6;
            2 === r6.type ? i6 = new k(h4, h4.nextSibling, this, t3) : 1 === r6.type ? i6 = new r6.ctor(h4, r6.name, r6.strings, this, t3) : 6 === r6.type && (i6 = new Z(h4, this, t3)), this._$AV.push(i6), r6 = s4[++n5];
          }
          o7 !== r6?.index && (h4 = P.nextNode(), o7++);
        }
        return P.currentNode = l2, e5;
      }
      p(t3) {
        let i5 = 0;
        for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t3, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t3[i5])), i5++;
      }
    };
    k = class _k {
      get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
      }
      constructor(t3, i5, s4, e5) {
        this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i5, this._$AM = s4, this.options = e5, this._$Cv = e5?.isConnected ?? true;
      }
      get parentNode() {
        let t3 = this._$AA.parentNode;
        const i5 = this._$AM;
        return void 0 !== i5 && 11 === t3?.nodeType && (t3 = i5.parentNode), t3;
      }
      get startNode() {
        return this._$AA;
      }
      get endNode() {
        return this._$AB;
      }
      _$AI(t3, i5 = this) {
        t3 = M(this, t3, i5), a2(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== E && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : d2(t3) ? this.k(t3) : this._(t3);
      }
      O(t3) {
        return this._$AA.parentNode.insertBefore(t3, this._$AB);
      }
      T(t3) {
        this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
      }
      _(t3) {
        this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(l2.createTextNode(t3)), this._$AH = t3;
      }
      $(t3) {
        const { values: i5, _$litType$: s4 } = t3, e5 = "number" == typeof s4 ? this._$AC(t3) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
        if (this._$AH?._$AD === e5) this._$AH.p(i5);
        else {
          const t4 = new R(e5, this), s5 = t4.u(this.options);
          t4.p(i5), this.T(s5), this._$AH = t4;
        }
      }
      _$AC(t3) {
        let i5 = C.get(t3.strings);
        return void 0 === i5 && C.set(t3.strings, i5 = new S2(t3)), i5;
      }
      k(t3) {
        u2(this._$AH) || (this._$AH = [], this._$AR());
        const i5 = this._$AH;
        let s4, e5 = 0;
        for (const h4 of t3) e5 === i5.length ? i5.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i5[e5], s4._$AI(h4), e5++;
        e5 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e5), i5.length = e5);
      }
      _$AR(t3 = this._$AA.nextSibling, s4) {
        for (this._$AP?.(false, true, s4); t3 !== this._$AB; ) {
          const s5 = i3(t3).nextSibling;
          i3(t3).remove(), t3 = s5;
        }
      }
      setConnected(t3) {
        void 0 === this._$AM && (this._$Cv = t3, this._$AP?.(t3));
      }
    };
    H = class {
      get tagName() {
        return this.element.tagName;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      constructor(t3, i5, s4, e5, h4) {
        this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i5, this._$AM = e5, this.options = h4, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
      }
      _$AI(t3, i5 = this, s4, e5) {
        const h4 = this.strings;
        let o7 = false;
        if (void 0 === h4) t3 = M(this, t3, i5, 0), o7 = !a2(t3) || t3 !== this._$AH && t3 !== E, o7 && (this._$AH = t3);
        else {
          const e6 = t3;
          let n5, r6;
          for (t3 = h4[0], n5 = 0; n5 < h4.length - 1; n5++) r6 = M(this, e6[s4 + n5], i5, n5), r6 === E && (r6 = this._$AH[n5]), o7 ||= !a2(r6) || r6 !== this._$AH[n5], r6 === A ? t3 = A : t3 !== A && (t3 += (r6 ?? "") + h4[n5 + 1]), this._$AH[n5] = r6;
        }
        o7 && !e5 && this.j(t3);
      }
      j(t3) {
        t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
      }
    };
    I = class extends H {
      constructor() {
        super(...arguments), this.type = 3;
      }
      j(t3) {
        this.element[this.name] = t3 === A ? void 0 : t3;
      }
    };
    L = class extends H {
      constructor() {
        super(...arguments), this.type = 4;
      }
      j(t3) {
        this.element.toggleAttribute(this.name, !!t3 && t3 !== A);
      }
    };
    z = class extends H {
      constructor(t3, i5, s4, e5, h4) {
        super(t3, i5, s4, e5, h4), this.type = 5;
      }
      _$AI(t3, i5 = this) {
        if ((t3 = M(this, t3, i5, 0) ?? A) === E) return;
        const s4 = this._$AH, e5 = t3 === A && s4 !== A || t3.capture !== s4.capture || t3.once !== s4.once || t3.passive !== s4.passive, h4 = t3 !== A && (s4 === A || e5);
        e5 && this.element.removeEventListener(this.name, this, s4), h4 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
      }
      handleEvent(t3) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t3) : this._$AH.handleEvent(t3);
      }
    };
    Z = class {
      constructor(t3, i5, s4) {
        this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AI(t3) {
        M(this, t3);
      }
    };
    B = t2.litHtmlPolyfillSupport;
    B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.3");
    D = (t3, i5, s4) => {
      const e5 = s4?.renderBefore ?? i5;
      let h4 = e5._$litPart$;
      if (void 0 === h4) {
        const t4 = s4?.renderBefore ?? null;
        e5._$litPart$ = h4 = new k(i5.insertBefore(c3(), t4), t4, void 0, s4 ?? {});
      }
      return h4._$AI(t3), h4;
    };
  }
});

// ../_kit/node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js
var s3, i4, o4;
var init_lit_element = __esm({
  "../_kit/node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js"() {
    init_reactive_element();
    init_reactive_element();
    init_lit_html();
    init_lit_html();
    s3 = globalThis;
    i4 = class extends y {
      constructor() {
        super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
      }
      createRenderRoot() {
        const t3 = super.createRenderRoot();
        return this.renderOptions.renderBefore ??= t3.firstChild, t3;
      }
      update(t3) {
        const r6 = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(r6, this.renderRoot, this.renderOptions);
      }
      connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(true);
      }
      disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(false);
      }
      render() {
        return E;
      }
    };
    i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
    o4 = s3.litElementPolyfillSupport;
    o4?.({ LitElement: i4 });
    (s3.litElementVersions ??= []).push("4.2.2");
  }
});

// ../_kit/node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/is-server.js
var init_is_server = __esm({
  "../_kit/node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/is-server.js"() {
  }
});

// ../_kit/node_modules/.pnpm/lit@3.3.3/node_modules/lit/index.js
var init_lit = __esm({
  "../_kit/node_modules/.pnpm/lit@3.3.3/node_modules/lit/index.js"() {
    init_reactive_element();
    init_lit_html();
    init_lit_element();
    init_is_server();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/custom-element.js
var init_custom_element = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/custom-element.js"() {
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js
function n4(t3) {
  return (e5, o7) => "object" == typeof o7 ? r4(t3, e5, o7) : ((t4, e6, o8) => {
    const r6 = e6.hasOwnProperty(o8);
    return e6.constructor.createProperty(o8, t4), r6 ? Object.getOwnPropertyDescriptor(e6, o8) : void 0;
  })(t3, e5, o7);
}
var o5, r4;
var init_property = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js"() {
    init_reactive_element();
    o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
    r4 = (t3 = o5, e5, r6) => {
      const { kind: n5, metadata: i5 } = r6;
      let s4 = globalThis.litPropertyMetadata.get(i5);
      if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t3 = Object.create(t3)).wrapped = true), s4.set(r6.name, t3), "accessor" === n5) {
        const { name: o7 } = r6;
        return { set(r7) {
          const n6 = e5.get.call(this);
          e5.set.call(this, r7), this.requestUpdate(o7, n6, t3, true, r7);
        }, init(e6) {
          return void 0 !== e6 && this.C(o7, void 0, t3, e6), e6;
        } };
      }
      if ("setter" === n5) {
        const { name: o7 } = r6;
        return function(r7) {
          const n6 = this[o7];
          e5.call(this, r7), this.requestUpdate(o7, n6, t3, true, r7);
        };
      }
      throw Error("Unsupported decorator location: " + n5);
    };
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
}
var init_state = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js"() {
    init_property();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/event-options.js
var init_event_options = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/event-options.js"() {
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/base.js
var init_base = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/base.js"() {
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query.js
var init_query = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-all.js
var init_query_all = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-all.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-async.js
var init_query_async = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-async.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var init_query_assigned_elements = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-assigned-elements.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
var init_query_assigned_nodes = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/lit@3.3.3/node_modules/lit/decorators.js
var init_decorators = __esm({
  "../_kit/node_modules/.pnpm/lit@3.3.3/node_modules/lit/decorators.js"() {
    init_custom_element();
    init_property();
    init_state();
    init_event_options();
    init_query();
    init_query_all();
    init_query_async();
    init_query_assigned_elements();
    init_query_assigned_nodes();
  }
});

// dist/faisal-compare.js
var faisal_compare_exports = {};
__export(faisal_compare_exports, {
  default: () => $2
});
function Y(t3) {
  var u3, g2, h4, s4, c4, m6, C6, q4, G6;
  const r6 = x2(t3 == null ? void 0 : t3.sale_price), e5 = x2((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), i5 = r6 && r6 < e5 ? r6 : x2(t3 == null ? void 0 : t3.price) || e5, a3 = Math.max(x2(t3 == null ? void 0 : t3.regular_price), x2(t3 == null ? void 0 : t3.price), i5), o7 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((S7) => String((S7 == null ? void 0 : S7.url) ?? S7 ?? "")).filter(Boolean), n5 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((u3 = t3 == null ? void 0 : t3.image) == null ? void 0 : u3.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? o7[0] ?? ""),
    images: o7,
    price: i5,
    regular: a3,
    discount: a3 > i5 ? Math.round((1 - i5 / a3) * 100) : 0,
    rating: x2(((g2 = t3 == null ? void 0 : t3.rating) == null ? void 0 : g2.stars) ?? ((h4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : h4.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: x2((s4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : s4.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : x2(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: n5 == null || n5 === "" || !Number.isFinite(Number(n5)) ? null : Number(n5),
    endsAt: V2((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((c4 = t3 == null ? void 0 : t3.category) == null ? void 0 : c4.name) ?? ((C6 = (m6 = t3 == null ? void 0 : t3.categories) == null ? void 0 : m6[0]) == null ? void 0 : C6.name) ?? ""),
    brand: String(((q4 = t3 == null ? void 0 : t3.brand) == null ? void 0 : q4.name) ?? ""),
    promo: String(((G6 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : G6.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function tt(t3) {
  var i5, a3, o7;
  const r6 = (i5 = f3()) == null ? void 0 : i5.product;
  if (!r6) return null;
  const e5 = r6.getDetails ? r6.getDetails.bind(r6) : (o7 = (a3 = r6.api) == null ? void 0 : a3.getDetails) == null ? void 0 : o7.bind(r6.api);
  if (!e5) return null;
  try {
    const n5 = await e5(t3, ["images", "sold_quantity", "category"]), u3 = Y((n5 == null ? void 0 : n5.data) ?? n5);
    return u3.name ? u3 : null;
  } catch {
    return null;
  }
}
async function rt(t3) {
  await j();
  const r6 = "ids:" + t3.join(",");
  return y3.has(r6) || y3.set(r6, Promise.all(t3.map(tt)).then((e5) => e5.filter((i5) => !!i5))), y3.get(r6);
}
async function R2(t3, r6 = [], e5 = 12) {
  await j();
  const i5 = `src:${t3}:${r6.join(",")}:${e5}`;
  return y3.has(i5) || y3.set(i5, (async () => {
    var n5, u3, g2, h4;
    const a3 = (n5 = f3()) == null ? void 0 : n5.product, o7 = a3 != null && a3.fetch ? a3.fetch.bind(a3) : (g2 = (u3 = a3 == null ? void 0 : a3.api) == null ? void 0 : u3.fetch) == null ? void 0 : g2.bind(a3.api);
    if (!o7) return [];
    try {
      const s4 = { source: t3, per_page: e5 };
      r6.length && (s4.source_value = r6);
      const c4 = await o7(s4);
      return (Array.isArray(c4 == null ? void 0 : c4.data) ? c4.data : Array.isArray(c4) ? c4 : ((h4 = c4 == null ? void 0 : c4.data) == null ? void 0 : h4.products) ?? []).map(Y).filter((C6) => C6.name).slice(0, e5);
    } catch {
      return [];
    }
  })()), y3.get(i5);
}
async function et(t3, r6 = "best_selling", e5 = 12) {
  const i5 = Z2(t3);
  if (i5.length) return { items: (await rt(i5)).slice(0, e5), auto: false };
  let a3 = await R2(r6, [], e5);
  return !a3.length && r6 !== "latest" && (a3 = await R2("latest", [], e5)), { items: a3, auto: true };
}
async function at(t3, r6 = 1, e5) {
  var i5, a3, o7;
  await j();
  try {
    return await ((o7 = (a3 = (i5 = f3()) == null ? void 0 : i5.cart) == null ? void 0 : a3.addItem) == null ? void 0 : o7.call(a3, e5 ? { id: t3, quantity: r6, notes: e5 } : { id: t3, quantity: r6 })), true;
  } catch {
    return false;
  }
}
function it(t3, r6 = true) {
  var e5, i5, a3;
  try {
    (a3 = r6 ? (e5 = f3()) == null ? void 0 : e5.success : (i5 = f3()) == null ? void 0 : i5.error) == null || a3(t3);
  } catch {
  }
}
function I2() {
  try {
    return { ...B2(), ...JSON.parse(localStorage.getItem(N2) || "{}") };
  } catch {
    return B2();
  }
}
function st(t3) {
  try {
    localStorage.setItem(N2, JSON.stringify(t3));
  } catch {
  }
}
function z2(t3) {
  const r6 = I2();
  return t3(r6), st(r6), r6;
}
function ot() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(N2), sessionStorage.setItem(N2, "1");
  } catch {
  }
  return t3 ? z2((r6) => {
    r6.visits += 1, r6.last = Date.now();
  }) : I2();
}
function lt() {
  O || (O = true, nt("cart::item.added", (t3) => {
    var e5;
    const r6 = Number(((e5 = t3 == null ? void 0 : t3.data) == null ? void 0 : e5.product_id) ?? 0);
    r6 && z2((i5) => {
      i5.carted.includes(r6) || (i5.carted = [...i5.carted.slice(-40), r6]);
    });
  }));
}
function pt(t3) {
  const r6 = bt[t3];
  if (!r6 || L2.has(r6)) return r6;
  L2.add(r6);
  const e5 = document.createElement("link");
  return e5.rel = "stylesheet", e5.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(r6)}:wght@400;500;700;800&display=swap`, document.head.appendChild(e5), r6;
}
function wt(t3, r6) {
  const e5 = t3.map((n5) => xt(n5, r6)), i5 = e5.filter((n5) => n5 != null);
  if (i5.length < 2) return e5.map((n5) => n5 == null ? null : 1);
  const a3 = Math.min(...i5), o7 = Math.max(...i5);
  return o7 === a3 ? e5.map((n5) => n5 == null ? null : 1) : e5.map((n5) => n5 == null ? null : r6 === "price" ? (o7 - n5) / (o7 - a3) : (n5 - a3) / (o7 - a3));
}
function vt(t3, r6) {
  const e5 = Object.fromEntries(A2.map((i5) => [i5, wt(t3, i5)]));
  return t3.map((i5, a3) => {
    let o7 = 0, n5 = 0;
    const u3 = {};
    for (const g2 of A2) {
      const h4 = e5[g2][a3];
      u3[g2] = h4;
      const s4 = r6[g2] ?? 0;
      h4 != null && s4 > 0 && (o7 += h4 * s4, n5 += s4);
    }
    return { p: i5, score: n5 ? Math.round(o7 / n5 * 100) : 0, parts: u3 };
  }).sort((i5, a3) => a3.score - i5.score);
}
function yt(t3, r6, e5) {
  const i5 = A2.filter((n5) => (e5[n5] ?? 0) > 0 && t3.parts[n5] != null).map((n5) => ({ m: n5, d: (t3.parts[n5] ?? 0) - Math.max(0, ...r6.map((u3) => u3.parts[n5] ?? 0)), wt: e5[n5] ?? 0 })).filter((n5) => n5.d >= 0).sort((n5, u3) => u3.d * u3.wt - n5.d * n5.wt).slice(0, 2), a3 = t3.p, o7 = i5.map(({ m: n5 }) => n5 === "price" ? l3(`\u0627\u0644\u0623\u0642\u0644 \u0633\u0639\u0631\u0627\u064B (${_2(a3.price)})`, `lowest price (${_2(a3.price)})`) : n5 === "rating" ? l3(`\u0627\u0644\u0623\u0639\u0644\u0649 \u062A\u0642\u064A\u064A\u0645\u0627\u064B (${a3.rating.toFixed(1)}\u2605)`, `highest rated (${a3.rating.toFixed(1)}\u2605)`) : n5 === "discount" ? l3(`\u0623\u0643\u0628\u0631 \u062E\u0635\u0645 (${a3.discount}%)`, `biggest discount (${a3.discount}%)`) : n5 === "popular" ? l3("\u0627\u0644\u0623\u0643\u062B\u0631 \u0637\u0644\u0628\u0627\u064B", "most ordered") : n5 === "reviews" ? l3(`\u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0631\u0627\u062C\u0639\u0627\u062A (${a3.ratingCount})`, `most reviewed (${a3.ratingCount})`) : l3("\u0645\u062A\u0648\u0641\u0631 \u0628\u0643\u0645\u064A\u0629 \u0623\u0643\u0628\u0631", "better availability"));
  return o7.length ? l3(`\u0644\u0623\u0646\u0647 ${o7.join(" \u0648")} \u062D\u0633\u0628 \u0623\u0648\u0644\u0648\u064A\u0627\u062A\u0643`, `Because it has the ${o7.join(" and ")} for your priorities`) : l3("\u0627\u0644\u0623\u0642\u0631\u0628 \u0644\u0623\u0648\u0644\u0648\u064A\u0627\u062A\u0643", "Closest to your priorities");
}
var f3, j, W, X, l3, v2, w2, p3, b3, Q, x2, V2, Z2, y3, _2, nt, N2, B2, E2, ct, O, dt, ut, gt, ht, bt, L2, ft, mt, D2, k2, A2, P2, xt, $t, H2, M2, $2;
var init_faisal_compare = __esm({
  "dist/faisal-compare.js"() {
    "use strict";
    init_lit();
    init_decorators();
    f3 = () => window.salla ?? window.Salla;
    j = async () => {
      var t3, r6;
      try {
        await ((r6 = (t3 = f3()) == null ? void 0 : t3.onReady) == null ? void 0 : r6.call(t3));
      } catch {
      }
    };
    W = () => {
      var t3, r6, e5, i5, a3;
      try {
        const o7 = ((r6 = (t3 = f3()) == null ? void 0 : t3.lang) == null ? void 0 : r6.locale) ?? ((a3 = (i5 = (e5 = f3()) == null ? void 0 : e5.config) == null ? void 0 : i5.get) == null ? void 0 : a3.call(i5, "user.language_code"));
        if (typeof o7 == "string" && o7) return o7.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    X = () => W() === "en";
    l3 = (t3, r6) => X() ? r6 : t3;
    v2 = (t3, r6 = "") => {
      if (t3 == null) return r6;
      if (typeof t3 == "string") {
        const e5 = t3.trim();
        if (e5.startsWith("{") && e5.endsWith("}"))
          try {
            return v2(JSON.parse(e5), r6);
          } catch {
          }
        return e5 || r6;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const e5 = t3, i5 = e5[W()] ?? e5.ar ?? e5.en ?? Object.values(e5).find((a3) => typeof a3 == "string" && a3);
        return typeof i5 == "string" && i5.trim() ? i5 : r6;
      }
      return r6;
    };
    w2 = (t3, r6 = "") => {
      const e5 = Array.isArray(t3) ? t3[0] : t3, i5 = typeof e5 == "object" && e5 ? e5.value : e5;
      return i5 == null || i5 === "" ? r6 : String(i5);
    };
    p3 = (t3, r6 = 0) => {
      const e5 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(e5) ? r6 : e5;
    };
    b3 = (t3, r6 = false) => t3 == null || t3 === "" ? r6 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    Q = (t3) => Array.isArray(t3) ? t3 : [];
    x2 = (t3) => {
      const r6 = typeof t3 == "object" && t3 ? t3.amount : t3, e5 = Number(r6);
      return Number.isFinite(e5) ? e5 : 0;
    };
    V2 = (t3) => {
      if (!t3) return null;
      const r6 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(r6) && r6 > Date.now() ? r6 : null;
    };
    Z2 = (t3) => (Array.isArray(t3) ? t3 : []).map((r6) => Number(typeof r6 == "object" && r6 ? r6.value : r6)).filter((r6) => Number.isFinite(r6) && r6 > 0);
    y3 = /* @__PURE__ */ new Map();
    _2 = (t3) => {
      var r6, e5;
      try {
        const i5 = (e5 = (r6 = f3()) == null ? void 0 : r6.money) == null ? void 0 : e5.call(r6, t3);
        if (i5) return String(i5);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${l3("\u0631.\u0633", "SAR")}`;
    };
    nt = (t3, r6) => {
      var e5, i5, a3;
      try {
        (a3 = (i5 = (e5 = f3()) == null ? void 0 : e5.event) == null ? void 0 : i5.on) == null || a3.call(i5, t3, r6);
      } catch {
      }
    };
    N2 = "tw_smart_mem_v1";
    B2 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    E2 = (t3, r6 = 1) => z2((e5) => {
      e5.seen[t3.id] = (e5.seen[t3.id] || 0) + r6, e5.prices = [...e5.prices.slice(-29), t3.price], t3.category && (e5.tags[t3.category] = (e5.tags[t3.category] || 0) + r6);
    });
    ct = (t3, r6) => z2((e5) => {
      e5.answers[t3] = r6;
    });
    O = false;
    dt = () => {
      const t3 = innerWidth, r6 = navigator.userAgent;
      return /iPad|Tablet/i.test(r6) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(r6) || t3 < 700 ? "mobile" : "desktop";
    };
    ut = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    gt = Object.defineProperty;
    ht = (t3, r6, e5, i5) => {
      for (var a3 = void 0, o7 = t3.length - 1, n5; o7 >= 0; o7--)
        (n5 = t3[o7]) && (a3 = n5(r6, e5, a3) || a3);
      return a3 && gt(r6, e5, a3), a3;
    };
    bt = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    L2 = /* @__PURE__ */ new Set();
    ft = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    mt = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    D2 = class D3 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), lt(), ot();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((r6) => {
          var e5;
          r6.some((i5) => i5.isIntersecting) && (this.setAttribute("in", ""), (e5 = this.io) == null || e5.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var r6;
        super.disconnectedCallback(), (r6 = this.io) == null || r6.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const r6 = this.c, e5 = Date.now(), i5 = Date.parse(String(r6.s_from || "")), a3 = Date.parse(String(r6.s_to || ""));
        if (Number.isFinite(i5) && e5 < i5 || Number.isFinite(a3) && e5 > a3) return true;
        const o7 = dt();
        return !!(b3(r6.s_hide_mobile) && o7 === "mobile" || b3(r6.s_hide_desktop) && o7 !== "mobile");
      }
      vars(r6 = "") {
        const e5 = this.c, i5 = [], a3 = (n5, u3) => {
          u3 !== "" && u3 != null && i5.push(`${n5}:${u3}`);
        };
        a3("--a", e5.s_accent || ""), a3("--a2", e5.s_accent2 || ""), a3("--bgc", e5.s_bg || ""), a3("--fgc", e5.s_text || ""), a3("--cardc", e5.s_card || ""), a3("--r", `${p3(e5.s_radius, 22)}px`), a3("--gap", `${p3(e5.s_gap, 18)}px`), a3("--ts", `${p3(e5.s_title_size, 38)}px`), a3("--fs", `${p3(e5.s_text_size, 16)}px`), a3("--pt", `${p3(e5.s_pad_top, 56)}px`), a3("--pb", `${p3(e5.s_pad_bottom, 56)}px`), a3("--maxw", ft[w2(e5.s_width, "normal")] ?? "1240px"), a3("--sh", mt[Math.max(0, Math.min(5, p3(e5.s_shadow, 2)))]), a3("--ms", `${p3(e5.s_anim_ms, 700)}ms`), a3("--ov", String(p3(e5.s_overlay, 45) / 100)), e5.s_bg_image && a3("--bgimg", `url("${String(e5.s_bg_image)}")`);
        const o7 = pt(w2(e5.s_font, "inherit"));
        return o7 && a3("font-family", `'${o7}', inherit`), i5.join(";") + (r6 ? ";" + r6 : "");
      }
      cls() {
        const r6 = this.c;
        return [
          "sec",
          `th-${w2(r6.s_theme, "auto")}`,
          `al-${w2(r6.s_align, "start")}`,
          `an-${w2(r6.s_anim, "rise")}`,
          `pt-${w2(r6.s_pattern, "none")}`,
          `bs-${w2(r6.s_btn_style, "pill")}`,
          b3(r6.s_border) ? "bordered" : "",
          b3(r6.s_stagger, true) ? "stagger" : "",
          r6.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(r6, e5 = {}, i5 = "", a3 = "", o7 = true) {
        if (this.hiddenNow()) return A;
        const n5 = this.c, u3 = v2(n5.eyebrow, e5.eyebrow ?? ""), g2 = v2(n5.title, e5.title ?? ""), h4 = v2(n5.subtitle, e5.sub ?? ""), s4 = o7 && b3(n5.s_show_head, true) && (u3 || g2 || h4);
        return b2`<section class="${this.cls()} ${i5}" style=${this.vars(a3)} id=${String(n5.s_anchor || "") || A}>
      <div class="wrap">${s4 ? b2`<header class="head">${u3 ? b2`<span class="eyebrow">${u3}</span>` : ""}${g2 ? b2`<h2 class="title">${g2}</h2>` : ""}${h4 ? b2`<p class="sub">${h4}</p>` : ""}</header>` : ""}
      ${r6}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(r6) {
        const e5 = r6.filter(Boolean);
        return !e5.length || !ut() || !b3(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${l3("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${e5.map((i5) => b2`<li>${i5}</li>`)}</ul></aside>`;
      }
      card(r6, e5 = {}) {
        var i5;
        return b2`<article class="pc ${r6.available ? "" : "oos"}">
      <a class="ph" href=${r6.url} @click=${() => E2(r6)}><img src=${r6.image} alt=${r6.name} loading="lazy" />${(i5 = e5.badges) != null && i5.length ? b2`<span class="badges">${e5.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${r6.url} @click=${() => E2(r6)}>${r6.name}</a>
        <div class="pr"><b>${_2(r6.price)}</b>${r6.regular > r6.price ? b2`<s>${_2(r6.regular)}</s>` : ""}</div>
        ${e5.rating !== false && r6.rating > 0 ? b2`<div class="rt">★ ${r6.rating.toFixed(1)}${r6.ratingCount ? b2` <small>(${r6.ratingCount})</small>` : ""}</div>` : ""}
        ${e5.extra ?? ""}
        ${e5.quick !== false ? b2`<button class="btn sm" ?disabled=${!r6.available} @click=${() => this.add(r6)}>${r6.available ? l3("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : l3("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(r6, e5 = 1, i5) {
        E2(r6, 3), await at(r6.id, e5, i5) ? it(l3("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = r6.url;
      }
    };
    D2.base = i`
  :host { display: block; font-family: inherit; direction: inherit;
    --A: var(--a, var(--color-primary, #b88a44)); --A2: var(--a2, color-mix(in srgb, var(--A) 55%, #000)); --BG: var(--bgc, transparent); --FG: var(--fgc, inherit); --CARD: var(--cardc, #fff); --LINE: color-mix(in srgb, currentColor 14%, transparent); }
  :host([hidden]) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .sec { position: relative; background: var(--BG); color: var(--FG); font-size: var(--fs, 16px); overflow: hidden; isolation: isolate; }
  .sec.has-img::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--bgimg) center/cover no-repeat; }
  .sec.has-img::after { content: ''; position: absolute; inset: 0; z-index: -1; background: #000; opacity: var(--ov, .45); }
  .th-light { --BG: var(--bgc, #fff); --FG: var(--fgc, #17140f); --CARD: var(--cardc, #faf8f4); }
  .th-ivory { --BG: var(--bgc, #f7f2e9); --FG: var(--fgc, #1d160c); --CARD: var(--cardc, #fffdf8); }
  .th-dark { --BG: var(--bgc, #111014); --FG: var(--fgc, #f4efe6); --CARD: var(--cardc, #1c1b22); }
  .th-midnight { --BG: var(--bgc, radial-gradient(900px 500px at 85% -10%, #2c1d55 0, transparent 60%), #0f0c18); --FG: var(--fgc, #f6f1e7); --CARD: var(--cardc, #19142d); }
  .th-glass { --BG: var(--bgc, linear-gradient(135deg, color-mix(in srgb, var(--A) 14%, #fff), #fff 60%)); --FG: var(--fgc, #15130f); --CARD: var(--cardc, rgba(255,255,255,.6)); }
  .th-glass .pc, .th-glass .panel { backdrop-filter: blur(14px); }
  .th-accent { --BG: var(--bgc, linear-gradient(135deg, var(--A), var(--A2))); --FG: var(--fgc, #fff); --CARD: var(--cardc, rgba(255,255,255,.12)); }
  .th-dark, .th-midnight, .th-accent { --LINE: rgba(255,255,255,.14); }
  .pt-dots { background-image: radial-gradient(color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1.4px), var(--BG); background-size: 18px 18px, auto; }
  .pt-grid { background-image: linear-gradient(var(--LINE) 1px, transparent 1px), linear-gradient(90deg, var(--LINE) 1px, transparent 1px), var(--BG); background-size: 36px 36px, 36px 36px, auto; }
  .pt-arabesque { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23999' stroke-opacity='.18'/%3E%3C/svg%3E"), var(--BG); }
  .pt-waves { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10q20-10 40 0t40 0' fill='none' stroke='%23999' stroke-opacity='.2'/%3E%3C/svg%3E"), var(--BG); }
  .wrap { max-width: var(--maxw, 1240px); margin: 0 auto; padding: var(--pt, 56px) clamp(16px, 4vw, 32px) var(--pb, 56px); }
  .head { margin-bottom: calc(var(--gap, 18px) * 1.4); }
  .al-center .head { text-align: center; } .al-center .head .sub { margin-inline: auto; } .al-end .head { text-align: end; }
  .eyebrow { display: inline-block; letter-spacing: .2em; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--A); margin-bottom: 10px; }
  .th-accent .eyebrow { color: inherit; opacity: .85; }
  h2.title { margin: 0 0 8px; font-size: clamp(22px, calc(var(--ts, 38px) * .62 + 1.2vw), var(--ts, 38px)); line-height: 1.25; font-weight: 800; }
  .sub { margin: 0; opacity: .72; line-height: 1.8; max-width: 720px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; text-decoration: none; font: inherit; font-weight: 700;
    padding: 13px 24px; border-radius: 999px; background: var(--A); color: #fff; transition: transform .25s, box-shadow .25s, opacity .2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--A); } .btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn.ghost { background: transparent; color: inherit; border: 1.5px solid currentColor; } .btn.sm { padding: 9px 16px; font-size: 14px; }
  .th-accent .btn:not(.ghost) { background: #fff; color: var(--A2); }
  .bs-rounded .btn { border-radius: 12px; } .bs-square .btn { border-radius: 0; } .bs-outline .btn:not(.ghost) { background: transparent; color: var(--A); border: 1.5px solid var(--A); }
  .bs-underline .btn { background: none; color: var(--A); padding-inline: 0; border-radius: 0; border-bottom: 2px solid var(--A); }
  .bordered .pc, .bordered .panel { border: 1px solid var(--LINE); }
  .panel { background: var(--CARD); border-radius: var(--r, 22px); box-shadow: var(--sh); padding: clamp(16px, 2.4vw, 28px); }
  .grid { display: grid; gap: var(--gap, 18px); grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); }
  @media (max-width: 860px) { .grid { grid-template-columns: repeat(var(--mcols, 2), minmax(0, 1fr)); } }
  .rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(220px, calc((100% - var(--gap) * (var(--cols, 4) - 1)) / var(--cols, 4))); gap: var(--gap, 18px); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; }
  @media (max-width: 860px) { .rail { grid-auto-columns: calc((100% - var(--gap)) / var(--mcols, 2) - 8px); } }
  .rail > * { scroll-snap-align: start; }
  .pc { position: relative; display: flex; flex-direction: column; background: var(--CARD); border-radius: var(--r, 22px); overflow: hidden; box-shadow: var(--sh); transition: transform .35s; color: inherit; }
  .pc:hover { transform: translateY(-4px); } .pc.oos { opacity: .55; }
  .ph { position: relative; display: block; aspect-ratio: var(--ratio, 1); background: color-mix(in srgb, currentColor 6%, transparent); }
  .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badges { position: absolute; inset: 10px 10px auto 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .bdg { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px; background: var(--A); color: #fff; line-height: 1.4; }
  .bdg.alt { background: #111; } .bdg.ok { background: #15803d; } .bdg.warn { background: #b45309; } .bdg.soft { background: #fff; color: #111; }
  .pb { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
  .pn { color: inherit; text-decoration: none; font-weight: 700; line-height: 1.5; font-size: .95em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; } .pr b { color: var(--A); } .th-accent .pr b { color: inherit; } .pr s { opacity: .5; font-size: .85em; }
  .rt { font-size: 13px; color: #d4a017; } .rt small { opacity: .7; color: inherit; }
  .pb .btn { margin-top: auto; width: 100%; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--LINE); background: var(--CARD); color: inherit; font: inherit; font-size: 14px; cursor: pointer; transition: all .25s; }
  .chip:hover { border-color: var(--A); } .chip.on { background: var(--A); border-color: var(--A); color: #fff; }
  .muted { opacity: .65; } .center { text-align: center; }
  .skel { background: linear-gradient(90deg, #8881 0, #8882 50%, #8881 100%); background-size: 200% 100%; animation: sk 1.4s infinite; border-radius: var(--r, 22px); min-height: 220px; }
  @keyframes sk { to { background-position: -200% 0; } }
  .hints { margin: 0 0 18px; padding: 14px 18px; border-radius: 14px; background: #fff8e1; color: #5b4300; border: 1px dashed #e0b84a; font-size: 13px; line-height: 1.8; }
  .hints ul { margin: 6px 0 0; padding-inline-start: 18px; }
  /* reveal motion */
  .sec .wrap > * { transition: opacity var(--ms, .7s) ease, transform var(--ms, .7s) cubic-bezier(.2,.7,.2,1), filter var(--ms, .7s); }
  :host(:not([in])) .an-fade .wrap > * { opacity: 0; }
  :host(:not([in])) .an-rise .wrap > * { opacity: 0; transform: translateY(28px); }
  :host(:not([in])) .an-zoom .wrap > * { opacity: 0; transform: scale(.94); }
  :host(:not([in])) .an-blur .wrap > * { opacity: 0; filter: blur(12px); }
  :host(:not([in])) .an-slide .wrap > * { opacity: 0; transform: translateX(40px); }
  .stagger .wrap > *:nth-child(2) { transition-delay: .08s; } .stagger .wrap > *:nth-child(3) { transition-delay: .16s; } .stagger .wrap > *:nth-child(4) { transition-delay: .24s; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } :host .sec .wrap > * { opacity: 1 !important; transform: none !important; filter: none !important; } }
  `;
    k2 = D2;
    ht([
      n4({ type: Object })
    ], k2.prototype, "config");
    A2 = ["price", "rating", "discount", "popular", "reviews", "stock"];
    P2 = (t3) => ({ price: l3("\u0627\u0644\u0633\u0639\u0631", "Price"), rating: l3("\u0627\u0644\u062A\u0642\u064A\u064A\u0645", "Rating"), discount: l3("\u0627\u0644\u062E\u0635\u0645", "Discount"), stock: l3("\u0627\u0644\u062A\u0648\u0641\u0631", "Availability"), popular: l3("\u0627\u0644\u0637\u0644\u0628 \u0639\u0644\u064A\u0647", "Popularity"), reviews: l3("\u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0627\u062A", "Reviews") })[t3];
    xt = (t3, r6) => r6 === "price" ? t3.price : r6 === "rating" ? t3.rating || null : r6 === "discount" ? t3.discount : r6 === "stock" ? t3.available ? t3.qty == null ? 100 : Math.min(100, t3.qty) : 0 : r6 === "popular" ? t3.sold : t3.ratingCount || null;
    $t = Object.defineProperty;
    H2 = (t3, r6, e5, i5) => {
      for (var a3 = void 0, o7 = t3.length - 1, n5; o7 >= 0; o7--)
        (n5 = t3[o7]) && (a3 = n5(r6, e5, a3) || a3);
      return a3 && $t(r6, e5, a3), a3;
    };
    M2 = class M3 extends k2 {
      constructor() {
        super(...arguments), this.items = [], this.w = {}, this.seq = 0;
      }
      willUpdate(r6) {
        if (!r6.has("config")) return;
        const e5 = ++this.seq, i5 = this.c, a3 = b3(i5.remember, true) ? I2().answers.faisal_w : "";
        let o7 = {};
        try {
          o7 = a3 ? JSON.parse(a3) : {};
        } catch {
        }
        this.w = Object.fromEntries(A2.map((n5) => [n5, o7[n5] ?? p3(i5[`w_${n5}`], n5 === "price" || n5 === "rating" ? 3 : 2)])), et(i5.products, w2(i5.auto_source, "best_selling"), p3(i5.limit, 3)).then((n5) => {
          e5 === this.seq && (this.items = n5.items.slice(0, p3(i5.limit, 3)));
        });
      }
      set(r6, e5) {
        this.w = { ...this.w, [r6]: e5 }, b3(this.c.remember, true) && ct("faisal_w", JSON.stringify(this.w));
      }
      render() {
        const r6 = this.c, e5 = this.items;
        if (e5.length < 2) return this.shell(b2`${this.hints([l3("\u0627\u062E\u062A\u0631 \u0645\u0646\u062A\u062C\u064A\u0646 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644 \u0623\u0648 \u0627\u062A\u0631\u0643 \u0627\u0644\u062D\u0642\u0644 \u0641\u0627\u0631\u063A\u0627\u064B \u0644\u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062A\u0644\u0642\u0627\u0626\u064A.", "Pick at least two products.")])}<div class="skel"></div>`);
        const i5 = A2.filter((s4) => b3(r6[`m_${s4}`], s4 !== "reviews" && s4 !== "stock")), a3 = vt(e5, Object.fromEntries(i5.map((s4) => [s4, this.w[s4] ?? 0]))), o7 = a3[0], n5 = new Map(a3.map((s4) => [s4.p.id, s4])), u3 = Q(r6.specs), g2 = (s4) => Math.max(...e5.map((c4) => n5.get(c4.id).parts[s4] ?? -1)), h4 = (s4, c4) => c4 === "price" ? _2(s4.price) : c4 === "rating" ? s4.rating ? `${s4.rating.toFixed(1)}\u2605` : "\u2014" : c4 === "discount" ? s4.discount ? `${s4.discount}%` : "\u2014" : c4 === "popular" ? s4.sold != null ? l3(`\u0628\u064A\u0639 ${s4.sold}`, `${s4.sold} sold`) : "\u2014" : c4 === "reviews" ? s4.ratingCount || "\u2014" : s4.available ? s4.qty != null ? l3(`\u0645\u062A\u0648\u0641\u0631 ${s4.qty}`, `${s4.qty} in stock`) : l3("\u0645\u062A\u0648\u0641\u0631", "In stock") : l3("\u0646\u0641\u062F", "Sold out");
        return this.shell(
          b2`
      ${b3(r6.sliders, true) ? b2`<div class="panel pri">${i5.map((s4) => b2`<label>${P2(s4)} <input type="range" min="0" max="5" .value=${String(this.w[s4] ?? 0)} @input=${(c4) => this.set(s4, +c4.target.value)} /></label>`)}</div>` : ""}
      <div class="panel tbl"><table><thead><tr><th>${v2(r6.corner_label, l3("\u0623\u0648\u0644\u0648\u064A\u0627\u062A\u0643 \u062A\u0642\u0631\u0631", "Your priorities decide"))}</th>${e5.map((s4) => b2`<th class=${s4.id === o7.p.id ? "win" : ""}>${s4.id === o7.p.id ? b2`<span class="crown">👑 ${v2(r6.win_label, l3("\u0627\u0644\u0623\u0646\u0633\u0628 \u0644\u0643", "Best for you"))}</span>` : b2`<span class="crown" style="visibility:hidden">.</span>`}<img class="pimg" src=${s4.image} alt="" loading="lazy" /><a class="n" href=${s4.url}>${s4.name}</a></th>`)}</tr></thead>
        <tbody>${b3(r6.show_score, true) ? b2`<tr><td>${l3("\u0627\u0644\u062A\u0637\u0627\u0628\u0642 \u0645\u0639 \u0623\u0648\u0644\u0648\u064A\u0627\u062A\u0643", "Match to your priorities")}</td>${e5.map((s4) => {
            const c4 = n5.get(s4.id);
            return b2`<td class=${s4.id === o7.p.id ? "win" : ""}><span class="sc">${c4.score}%</span><div class="bar"><i style=${`width:${c4.score}%`}></i></div></td>`;
          })}</tr>` : ""}
          ${i5.map((s4) => b2`<tr><td>${P2(s4)}</td>${e5.map((c4) => {
            const m6 = n5.get(c4.id).parts[s4];
            return b2`<td class="${c4.id === o7.p.id ? "win" : ""} ${m6 != null && m6 === g2(s4) && b3(r6.highlight, true) ? "best" : ""}">${h4(c4, s4)}</td>`;
          })}</tr>`)}
          ${u3.map((s4) => b2`<tr><td>${v2(s4.label)}</td>${e5.map((c4, m6) => b2`<td class=${c4.id === o7.p.id ? "win" : ""}>${v2(s4[`v${m6 + 1}`]) || "\u2014"}</td>`)}</tr>`)}
          <tr><td></td>${e5.map((s4) => b2`<td class=${s4.id === o7.p.id ? "win" : ""}><button class="btn sm" ?disabled=${!s4.available} @click=${() => this.add(s4)}>${l3("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart")}</button></td>`)}</tr></tbody></table></div>
      ${b3(r6.show_reason, true) ? b2`<p class="why">💡 ${o7.p.name}: ${yt(o7, a3.slice(1), Object.fromEntries(i5.map((s4) => [s4, this.w[s4] ?? 0])))}</p>` : ""}`,
          { eyebrow: l3("\u0641\u064A\u0635\u0644 \u064A\u0642\u0627\u0631\u0646", "Compare"), title: l3("\u062D\u0631\u0651\u0643 \u0623\u0648\u0644\u0648\u064A\u0627\u062A\u0643\u2026 \u0648\u0646\u0642\u0648\u0644 \u0644\u0643 \u0627\u0644\u0623\u0646\u0633\u0628", "Move your priorities, we pick the best") }
        );
      }
    };
    M2.styles = [k2.base, i`
    .pri { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px 20px; margin-bottom: 22px; }
    .pri label { display: grid; gap: 4px; font-size: 13px; font-weight: 700; } .pri input { accent-color: var(--A); width: 100%; }
    .tbl { overflow-x: auto; } table { width: 100%; border-collapse: separate; border-spacing: 0; min-width: 560px; }
    th, td { padding: 12px 10px; text-align: center; border-bottom: 1px solid var(--LINE); vertical-align: middle; } th:first-child, td:first-child { text-align: start; font-weight: 700; opacity: .8; width: 150px; }
    thead th { vertical-align: top; } .pimg { width: 100%; max-width: 150px; aspect-ratio: 1; object-fit: cover; border-radius: 16px; display: block; margin: 0 auto 8px; }
    .win { background: color-mix(in srgb, var(--A) 9%, transparent); } thead .win { border-radius: 18px 18px 0 0; }
    .crown { display: inline-block; margin-bottom: 6px; font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 999px; background: var(--A); color: #fff; }
    .best { color: #15803d; font-weight: 800; } .sc { font-size: 22px; font-weight: 900; color: var(--A); } .bar { height: 6px; border-radius: 9px; background: var(--LINE); overflow: hidden; margin-top: 4px; } .bar i { display: block; height: 100%; background: var(--A); }
    .why { margin: 18px 0 0; padding: 14px 18px; border-radius: 14px; background: color-mix(in srgb, var(--A) 10%, transparent); font-weight: 700; }
    a.n { color: inherit; text-decoration: none; font-weight: 800; }
  `];
    $2 = M2;
    H2([
      r5()
    ], $2.prototype, "items");
    H2([
      r5()
    ], $2.prototype, "w");
    typeof $2 < "u" && $2.registerSallaComponent("salla-faisal-compare");
  }
});

// dist/faisal-duel.js
var faisal_duel_exports = {};
__export(faisal_duel_exports, {
  default: () => N3
});
function T2(t3) {
  var c4, f5, u3, g2, p6, _4, A4, o7, b6;
  const r6 = $3(t3 == null ? void 0 : t3.sale_price), a3 = $3((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), n5 = r6 && r6 < a3 ? r6 : $3(t3 == null ? void 0 : t3.price) || a3, e5 = Math.max($3(t3 == null ? void 0 : t3.regular_price), $3(t3 == null ? void 0 : t3.price), n5), s4 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((h4) => String((h4 == null ? void 0 : h4.url) ?? h4 ?? "")).filter(Boolean), i5 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((c4 = t3 == null ? void 0 : t3.image) == null ? void 0 : c4.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? s4[0] ?? ""),
    images: s4,
    price: n5,
    regular: e5,
    discount: e5 > n5 ? Math.round((1 - n5 / e5) * 100) : 0,
    rating: $3(((f5 = t3 == null ? void 0 : t3.rating) == null ? void 0 : f5.stars) ?? ((u3 = t3 == null ? void 0 : t3.rating) == null ? void 0 : u3.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: $3((g2 = t3 == null ? void 0 : t3.rating) == null ? void 0 : g2.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : $3(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: i5 == null || i5 === "" || !Number.isFinite(Number(i5)) ? null : Number(i5),
    endsAt: Q2((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((p6 = t3 == null ? void 0 : t3.category) == null ? void 0 : p6.name) ?? ((A4 = (_4 = t3 == null ? void 0 : t3.categories) == null ? void 0 : _4[0]) == null ? void 0 : A4.name) ?? ""),
    brand: String(((o7 = t3 == null ? void 0 : t3.brand) == null ? void 0 : o7.name) ?? ""),
    promo: String(((b6 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : b6.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function tt2(t3) {
  var n5, e5, s4;
  const r6 = (n5 = x3()) == null ? void 0 : n5.product;
  if (!r6) return null;
  const a3 = r6.getDetails ? r6.getDetails.bind(r6) : (s4 = (e5 = r6.api) == null ? void 0 : e5.getDetails) == null ? void 0 : s4.bind(r6.api);
  if (!a3) return null;
  try {
    const i5 = await a3(t3, ["images", "sold_quantity", "category"]), c4 = T2((i5 == null ? void 0 : i5.data) ?? i5);
    return c4.name ? c4 : null;
  } catch {
    return null;
  }
}
async function rt2(t3) {
  await D4();
  const r6 = "ids:" + t3.join(",");
  return C2.has(r6) || C2.set(r6, Promise.all(t3.map(tt2)).then((a3) => a3.filter((n5) => !!n5))), C2.get(r6);
}
async function I3(t3, r6 = [], a3 = 12) {
  await D4();
  const n5 = `src:${t3}:${r6.join(",")}:${a3}`;
  return C2.has(n5) || C2.set(n5, (async () => {
    var i5, c4, f5, u3;
    const e5 = (i5 = x3()) == null ? void 0 : i5.product, s4 = e5 != null && e5.fetch ? e5.fetch.bind(e5) : (f5 = (c4 = e5 == null ? void 0 : e5.api) == null ? void 0 : c4.fetch) == null ? void 0 : f5.bind(e5.api);
    if (!s4) return [];
    try {
      const g2 = { source: t3, per_page: a3 };
      r6.length && (g2.source_value = r6);
      const p6 = await s4(g2);
      return (Array.isArray(p6 == null ? void 0 : p6.data) ? p6.data : Array.isArray(p6) ? p6 : ((u3 = p6 == null ? void 0 : p6.data) == null ? void 0 : u3.products) ?? []).map(T2).filter((A4) => A4.name).slice(0, a3);
    } catch {
      return [];
    }
  })()), C2.get(n5);
}
async function at2(t3, r6 = "best_selling", a3 = 12) {
  const n5 = Z3(t3);
  if (n5.length) return { items: (await rt2(n5)).slice(0, a3), auto: false };
  let e5 = await I3(r6, [], a3);
  return !e5.length && r6 !== "latest" && (e5 = await I3("latest", [], a3)), { items: e5, auto: true };
}
async function et2(t3, r6 = 1, a3) {
  var n5, e5, s4;
  await D4();
  try {
    return await ((s4 = (e5 = (n5 = x3()) == null ? void 0 : n5.cart) == null ? void 0 : e5.addItem) == null ? void 0 : s4.call(e5, a3 ? { id: t3, quantity: r6, notes: a3 } : { id: t3, quantity: r6 })), true;
  } catch {
    return false;
  }
}
function nt2(t3, r6 = true) {
  var a3, n5, e5;
  try {
    (e5 = r6 ? (a3 = x3()) == null ? void 0 : a3.success : (n5 = x3()) == null ? void 0 : n5.error) == null || e5(t3);
  } catch {
  }
}
function W2() {
  try {
    return { ...F(), ...JSON.parse(localStorage.getItem(z3) || "{}") };
  } catch {
    return F();
  }
}
function st2(t3) {
  try {
    localStorage.setItem(z3, JSON.stringify(t3));
  } catch {
  }
}
function G(t3) {
  const r6 = W2();
  return t3(r6), st2(r6), r6;
}
function ot2() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(z3), sessionStorage.setItem(z3, "1");
  } catch {
  }
  return t3 ? G((r6) => {
    r6.visits += 1, r6.last = Date.now();
  }) : W2();
}
function ct2() {
  B3 || (B3 = true, it2("cart::item.added", (t3) => {
    var a3;
    const r6 = Number(((a3 = t3 == null ? void 0 : t3.data) == null ? void 0 : a3.product_id) ?? 0);
    r6 && G((n5) => {
      n5.carted.includes(r6) || (n5.carted = [...n5.carted.slice(-40), r6]);
    });
  }));
}
function bt2(t3) {
  const r6 = ft2[t3];
  if (!r6 || L3.has(r6)) return r6;
  L3.add(r6);
  const a3 = document.createElement("link");
  return a3.rel = "stylesheet", a3.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(r6)}:wght@400;500;700;800&display=swap`, document.head.appendChild(a3), r6;
}
function vt2(t3, r6) {
  const a3 = t3.map((i5) => xt2(i5, r6)), n5 = a3.filter((i5) => i5 != null);
  if (n5.length < 2) return a3.map((i5) => i5 == null ? null : 1);
  const e5 = Math.min(...n5), s4 = Math.max(...n5);
  return s4 === e5 ? a3.map((i5) => i5 == null ? null : 1) : a3.map((i5) => i5 == null ? null : r6 === "price" ? (s4 - i5) / (s4 - e5) : (i5 - e5) / (s4 - e5));
}
function wt2(t3, r6) {
  const a3 = Object.fromEntries(j2.map((n5) => [n5, vt2(t3, n5)]));
  return t3.map((n5, e5) => {
    let s4 = 0, i5 = 0;
    const c4 = {};
    for (const f5 of j2) {
      const u3 = a3[f5][e5];
      c4[f5] = u3;
      const g2 = r6[f5] ?? 0;
      u3 != null && g2 > 0 && (s4 += u3 * g2, i5 += g2);
    }
    return { p: n5, score: i5 ? Math.round(s4 / i5 * 100) : 0, parts: c4 };
  }).sort((n5, e5) => e5.score - n5.score);
}
var x3, D4, P3, V3, l4, m2, w3, v3, y4, X2, $3, Q2, Z3, C2, k3, it2, z3, F, E3, B3, lt2, dt2, gt2, ut2, ft2, L3, pt2, ht2, M4, S3, j2, mt2, xt2, yt2, $t2, R3, N3;
var init_faisal_duel = __esm({
  "dist/faisal-duel.js"() {
    "use strict";
    init_lit();
    init_decorators();
    x3 = () => window.salla ?? window.Salla;
    D4 = async () => {
      var t3, r6;
      try {
        await ((r6 = (t3 = x3()) == null ? void 0 : t3.onReady) == null ? void 0 : r6.call(t3));
      } catch {
      }
    };
    P3 = () => {
      var t3, r6, a3, n5, e5;
      try {
        const s4 = ((r6 = (t3 = x3()) == null ? void 0 : t3.lang) == null ? void 0 : r6.locale) ?? ((e5 = (n5 = (a3 = x3()) == null ? void 0 : a3.config) == null ? void 0 : n5.get) == null ? void 0 : e5.call(n5, "user.language_code"));
        if (typeof s4 == "string" && s4) return s4.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    V3 = () => P3() === "en";
    l4 = (t3, r6) => V3() ? r6 : t3;
    m2 = (t3, r6 = "") => {
      if (t3 == null) return r6;
      if (typeof t3 == "string") {
        const a3 = t3.trim();
        if (a3.startsWith("{") && a3.endsWith("}"))
          try {
            return m2(JSON.parse(a3), r6);
          } catch {
          }
        return a3 || r6;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const a3 = t3, n5 = a3[P3()] ?? a3.ar ?? a3.en ?? Object.values(a3).find((e5) => typeof e5 == "string" && e5);
        return typeof n5 == "string" && n5.trim() ? n5 : r6;
      }
      return r6;
    };
    w3 = (t3, r6 = "") => {
      const a3 = Array.isArray(t3) ? t3[0] : t3, n5 = typeof a3 == "object" && a3 ? a3.value : a3;
      return n5 == null || n5 === "" ? r6 : String(n5);
    };
    v3 = (t3, r6 = 0) => {
      const a3 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(a3) ? r6 : a3;
    };
    y4 = (t3, r6 = false) => t3 == null || t3 === "" ? r6 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    X2 = (t3) => Array.isArray(t3) ? t3 : [];
    $3 = (t3) => {
      const r6 = typeof t3 == "object" && t3 ? t3.amount : t3, a3 = Number(r6);
      return Number.isFinite(a3) ? a3 : 0;
    };
    Q2 = (t3) => {
      if (!t3) return null;
      const r6 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(r6) && r6 > Date.now() ? r6 : null;
    };
    Z3 = (t3) => (Array.isArray(t3) ? t3 : []).map((r6) => Number(typeof r6 == "object" && r6 ? r6.value : r6)).filter((r6) => Number.isFinite(r6) && r6 > 0);
    C2 = /* @__PURE__ */ new Map();
    k3 = (t3) => {
      var r6, a3;
      try {
        const n5 = (a3 = (r6 = x3()) == null ? void 0 : r6.money) == null ? void 0 : a3.call(r6, t3);
        if (n5) return String(n5);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${l4("\u0631.\u0633", "SAR")}`;
    };
    it2 = (t3, r6) => {
      var a3, n5, e5;
      try {
        (e5 = (n5 = (a3 = x3()) == null ? void 0 : a3.event) == null ? void 0 : n5.on) == null || e5.call(n5, t3, r6);
      } catch {
      }
    };
    z3 = "tw_smart_mem_v1";
    F = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    E3 = (t3, r6 = 1) => G((a3) => {
      a3.seen[t3.id] = (a3.seen[t3.id] || 0) + r6, a3.prices = [...a3.prices.slice(-29), t3.price], t3.category && (a3.tags[t3.category] = (a3.tags[t3.category] || 0) + r6);
    });
    B3 = false;
    lt2 = () => {
      const t3 = innerWidth, r6 = navigator.userAgent;
      return /iPad|Tablet/i.test(r6) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(r6) || t3 < 700 ? "mobile" : "desktop";
    };
    dt2 = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    gt2 = Object.defineProperty;
    ut2 = (t3, r6, a3, n5) => {
      for (var e5 = void 0, s4 = t3.length - 1, i5; s4 >= 0; s4--)
        (i5 = t3[s4]) && (e5 = i5(r6, a3, e5) || e5);
      return e5 && gt2(r6, a3, e5), e5;
    };
    ft2 = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    L3 = /* @__PURE__ */ new Set();
    pt2 = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    ht2 = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    M4 = class M5 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), ct2(), ot2();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((r6) => {
          var a3;
          r6.some((n5) => n5.isIntersecting) && (this.setAttribute("in", ""), (a3 = this.io) == null || a3.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var r6;
        super.disconnectedCallback(), (r6 = this.io) == null || r6.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const r6 = this.c, a3 = Date.now(), n5 = Date.parse(String(r6.s_from || "")), e5 = Date.parse(String(r6.s_to || ""));
        if (Number.isFinite(n5) && a3 < n5 || Number.isFinite(e5) && a3 > e5) return true;
        const s4 = lt2();
        return !!(y4(r6.s_hide_mobile) && s4 === "mobile" || y4(r6.s_hide_desktop) && s4 !== "mobile");
      }
      vars(r6 = "") {
        const a3 = this.c, n5 = [], e5 = (i5, c4) => {
          c4 !== "" && c4 != null && n5.push(`${i5}:${c4}`);
        };
        e5("--a", a3.s_accent || ""), e5("--a2", a3.s_accent2 || ""), e5("--bgc", a3.s_bg || ""), e5("--fgc", a3.s_text || ""), e5("--cardc", a3.s_card || ""), e5("--r", `${v3(a3.s_radius, 22)}px`), e5("--gap", `${v3(a3.s_gap, 18)}px`), e5("--ts", `${v3(a3.s_title_size, 38)}px`), e5("--fs", `${v3(a3.s_text_size, 16)}px`), e5("--pt", `${v3(a3.s_pad_top, 56)}px`), e5("--pb", `${v3(a3.s_pad_bottom, 56)}px`), e5("--maxw", pt2[w3(a3.s_width, "normal")] ?? "1240px"), e5("--sh", ht2[Math.max(0, Math.min(5, v3(a3.s_shadow, 2)))]), e5("--ms", `${v3(a3.s_anim_ms, 700)}ms`), e5("--ov", String(v3(a3.s_overlay, 45) / 100)), a3.s_bg_image && e5("--bgimg", `url("${String(a3.s_bg_image)}")`);
        const s4 = bt2(w3(a3.s_font, "inherit"));
        return s4 && e5("font-family", `'${s4}', inherit`), n5.join(";") + (r6 ? ";" + r6 : "");
      }
      cls() {
        const r6 = this.c;
        return [
          "sec",
          `th-${w3(r6.s_theme, "auto")}`,
          `al-${w3(r6.s_align, "start")}`,
          `an-${w3(r6.s_anim, "rise")}`,
          `pt-${w3(r6.s_pattern, "none")}`,
          `bs-${w3(r6.s_btn_style, "pill")}`,
          y4(r6.s_border) ? "bordered" : "",
          y4(r6.s_stagger, true) ? "stagger" : "",
          r6.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(r6, a3 = {}, n5 = "", e5 = "", s4 = true) {
        if (this.hiddenNow()) return A;
        const i5 = this.c, c4 = m2(i5.eyebrow, a3.eyebrow ?? ""), f5 = m2(i5.title, a3.title ?? ""), u3 = m2(i5.subtitle, a3.sub ?? ""), g2 = s4 && y4(i5.s_show_head, true) && (c4 || f5 || u3);
        return b2`<section class="${this.cls()} ${n5}" style=${this.vars(e5)} id=${String(i5.s_anchor || "") || A}>
      <div class="wrap">${g2 ? b2`<header class="head">${c4 ? b2`<span class="eyebrow">${c4}</span>` : ""}${f5 ? b2`<h2 class="title">${f5}</h2>` : ""}${u3 ? b2`<p class="sub">${u3}</p>` : ""}</header>` : ""}
      ${r6}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(r6) {
        const a3 = r6.filter(Boolean);
        return !a3.length || !dt2() || !y4(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${l4("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${a3.map((n5) => b2`<li>${n5}</li>`)}</ul></aside>`;
      }
      card(r6, a3 = {}) {
        var n5;
        return b2`<article class="pc ${r6.available ? "" : "oos"}">
      <a class="ph" href=${r6.url} @click=${() => E3(r6)}><img src=${r6.image} alt=${r6.name} loading="lazy" />${(n5 = a3.badges) != null && n5.length ? b2`<span class="badges">${a3.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${r6.url} @click=${() => E3(r6)}>${r6.name}</a>
        <div class="pr"><b>${k3(r6.price)}</b>${r6.regular > r6.price ? b2`<s>${k3(r6.regular)}</s>` : ""}</div>
        ${a3.rating !== false && r6.rating > 0 ? b2`<div class="rt">★ ${r6.rating.toFixed(1)}${r6.ratingCount ? b2` <small>(${r6.ratingCount})</small>` : ""}</div>` : ""}
        ${a3.extra ?? ""}
        ${a3.quick !== false ? b2`<button class="btn sm" ?disabled=${!r6.available} @click=${() => this.add(r6)}>${r6.available ? l4("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : l4("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(r6, a3 = 1, n5) {
        E3(r6, 3), await et2(r6.id, a3, n5) ? nt2(l4("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = r6.url;
      }
    };
    M4.base = i`
  :host { display: block; font-family: inherit; direction: inherit;
    --A: var(--a, var(--color-primary, #b88a44)); --A2: var(--a2, color-mix(in srgb, var(--A) 55%, #000)); --BG: var(--bgc, transparent); --FG: var(--fgc, inherit); --CARD: var(--cardc, #fff); --LINE: color-mix(in srgb, currentColor 14%, transparent); }
  :host([hidden]) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .sec { position: relative; background: var(--BG); color: var(--FG); font-size: var(--fs, 16px); overflow: hidden; isolation: isolate; }
  .sec.has-img::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--bgimg) center/cover no-repeat; }
  .sec.has-img::after { content: ''; position: absolute; inset: 0; z-index: -1; background: #000; opacity: var(--ov, .45); }
  .th-light { --BG: var(--bgc, #fff); --FG: var(--fgc, #17140f); --CARD: var(--cardc, #faf8f4); }
  .th-ivory { --BG: var(--bgc, #f7f2e9); --FG: var(--fgc, #1d160c); --CARD: var(--cardc, #fffdf8); }
  .th-dark { --BG: var(--bgc, #111014); --FG: var(--fgc, #f4efe6); --CARD: var(--cardc, #1c1b22); }
  .th-midnight { --BG: var(--bgc, radial-gradient(900px 500px at 85% -10%, #2c1d55 0, transparent 60%), #0f0c18); --FG: var(--fgc, #f6f1e7); --CARD: var(--cardc, #19142d); }
  .th-glass { --BG: var(--bgc, linear-gradient(135deg, color-mix(in srgb, var(--A) 14%, #fff), #fff 60%)); --FG: var(--fgc, #15130f); --CARD: var(--cardc, rgba(255,255,255,.6)); }
  .th-glass .pc, .th-glass .panel { backdrop-filter: blur(14px); }
  .th-accent { --BG: var(--bgc, linear-gradient(135deg, var(--A), var(--A2))); --FG: var(--fgc, #fff); --CARD: var(--cardc, rgba(255,255,255,.12)); }
  .th-dark, .th-midnight, .th-accent { --LINE: rgba(255,255,255,.14); }
  .pt-dots { background-image: radial-gradient(color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1.4px), var(--BG); background-size: 18px 18px, auto; }
  .pt-grid { background-image: linear-gradient(var(--LINE) 1px, transparent 1px), linear-gradient(90deg, var(--LINE) 1px, transparent 1px), var(--BG); background-size: 36px 36px, 36px 36px, auto; }
  .pt-arabesque { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23999' stroke-opacity='.18'/%3E%3C/svg%3E"), var(--BG); }
  .pt-waves { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10q20-10 40 0t40 0' fill='none' stroke='%23999' stroke-opacity='.2'/%3E%3C/svg%3E"), var(--BG); }
  .wrap { max-width: var(--maxw, 1240px); margin: 0 auto; padding: var(--pt, 56px) clamp(16px, 4vw, 32px) var(--pb, 56px); }
  .head { margin-bottom: calc(var(--gap, 18px) * 1.4); }
  .al-center .head { text-align: center; } .al-center .head .sub { margin-inline: auto; } .al-end .head { text-align: end; }
  .eyebrow { display: inline-block; letter-spacing: .2em; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--A); margin-bottom: 10px; }
  .th-accent .eyebrow { color: inherit; opacity: .85; }
  h2.title { margin: 0 0 8px; font-size: clamp(22px, calc(var(--ts, 38px) * .62 + 1.2vw), var(--ts, 38px)); line-height: 1.25; font-weight: 800; }
  .sub { margin: 0; opacity: .72; line-height: 1.8; max-width: 720px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; text-decoration: none; font: inherit; font-weight: 700;
    padding: 13px 24px; border-radius: 999px; background: var(--A); color: #fff; transition: transform .25s, box-shadow .25s, opacity .2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--A); } .btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn.ghost { background: transparent; color: inherit; border: 1.5px solid currentColor; } .btn.sm { padding: 9px 16px; font-size: 14px; }
  .th-accent .btn:not(.ghost) { background: #fff; color: var(--A2); }
  .bs-rounded .btn { border-radius: 12px; } .bs-square .btn { border-radius: 0; } .bs-outline .btn:not(.ghost) { background: transparent; color: var(--A); border: 1.5px solid var(--A); }
  .bs-underline .btn { background: none; color: var(--A); padding-inline: 0; border-radius: 0; border-bottom: 2px solid var(--A); }
  .bordered .pc, .bordered .panel { border: 1px solid var(--LINE); }
  .panel { background: var(--CARD); border-radius: var(--r, 22px); box-shadow: var(--sh); padding: clamp(16px, 2.4vw, 28px); }
  .grid { display: grid; gap: var(--gap, 18px); grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); }
  @media (max-width: 860px) { .grid { grid-template-columns: repeat(var(--mcols, 2), minmax(0, 1fr)); } }
  .rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(220px, calc((100% - var(--gap) * (var(--cols, 4) - 1)) / var(--cols, 4))); gap: var(--gap, 18px); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; }
  @media (max-width: 860px) { .rail { grid-auto-columns: calc((100% - var(--gap)) / var(--mcols, 2) - 8px); } }
  .rail > * { scroll-snap-align: start; }
  .pc { position: relative; display: flex; flex-direction: column; background: var(--CARD); border-radius: var(--r, 22px); overflow: hidden; box-shadow: var(--sh); transition: transform .35s; color: inherit; }
  .pc:hover { transform: translateY(-4px); } .pc.oos { opacity: .55; }
  .ph { position: relative; display: block; aspect-ratio: var(--ratio, 1); background: color-mix(in srgb, currentColor 6%, transparent); }
  .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badges { position: absolute; inset: 10px 10px auto 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .bdg { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px; background: var(--A); color: #fff; line-height: 1.4; }
  .bdg.alt { background: #111; } .bdg.ok { background: #15803d; } .bdg.warn { background: #b45309; } .bdg.soft { background: #fff; color: #111; }
  .pb { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
  .pn { color: inherit; text-decoration: none; font-weight: 700; line-height: 1.5; font-size: .95em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; } .pr b { color: var(--A); } .th-accent .pr b { color: inherit; } .pr s { opacity: .5; font-size: .85em; }
  .rt { font-size: 13px; color: #d4a017; } .rt small { opacity: .7; color: inherit; }
  .pb .btn { margin-top: auto; width: 100%; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--LINE); background: var(--CARD); color: inherit; font: inherit; font-size: 14px; cursor: pointer; transition: all .25s; }
  .chip:hover { border-color: var(--A); } .chip.on { background: var(--A); border-color: var(--A); color: #fff; }
  .muted { opacity: .65; } .center { text-align: center; }
  .skel { background: linear-gradient(90deg, #8881 0, #8882 50%, #8881 100%); background-size: 200% 100%; animation: sk 1.4s infinite; border-radius: var(--r, 22px); min-height: 220px; }
  @keyframes sk { to { background-position: -200% 0; } }
  .hints { margin: 0 0 18px; padding: 14px 18px; border-radius: 14px; background: #fff8e1; color: #5b4300; border: 1px dashed #e0b84a; font-size: 13px; line-height: 1.8; }
  .hints ul { margin: 6px 0 0; padding-inline-start: 18px; }
  /* reveal motion */
  .sec .wrap > * { transition: opacity var(--ms, .7s) ease, transform var(--ms, .7s) cubic-bezier(.2,.7,.2,1), filter var(--ms, .7s); }
  :host(:not([in])) .an-fade .wrap > * { opacity: 0; }
  :host(:not([in])) .an-rise .wrap > * { opacity: 0; transform: translateY(28px); }
  :host(:not([in])) .an-zoom .wrap > * { opacity: 0; transform: scale(.94); }
  :host(:not([in])) .an-blur .wrap > * { opacity: 0; filter: blur(12px); }
  :host(:not([in])) .an-slide .wrap > * { opacity: 0; transform: translateX(40px); }
  .stagger .wrap > *:nth-child(2) { transition-delay: .08s; } .stagger .wrap > *:nth-child(3) { transition-delay: .16s; } .stagger .wrap > *:nth-child(4) { transition-delay: .24s; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } :host .sec .wrap > * { opacity: 1 !important; transform: none !important; filter: none !important; } }
  `;
    S3 = M4;
    ut2([
      n4({ type: Object })
    ], S3.prototype, "config");
    j2 = ["price", "rating", "discount", "popular", "reviews", "stock"];
    mt2 = (t3) => ({ price: l4("\u0627\u0644\u0633\u0639\u0631", "Price"), rating: l4("\u0627\u0644\u062A\u0642\u064A\u064A\u0645", "Rating"), discount: l4("\u0627\u0644\u062E\u0635\u0645", "Discount"), stock: l4("\u0627\u0644\u062A\u0648\u0641\u0631", "Availability"), popular: l4("\u0627\u0644\u0637\u0644\u0628 \u0639\u0644\u064A\u0647", "Popularity"), reviews: l4("\u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0627\u062A", "Reviews") })[t3];
    xt2 = (t3, r6) => r6 === "price" ? t3.price : r6 === "rating" ? t3.rating || null : r6 === "discount" ? t3.discount : r6 === "stock" ? t3.available ? t3.qty == null ? 100 : Math.min(100, t3.qty) : 0 : r6 === "popular" ? t3.sold : t3.ratingCount || null;
    yt2 = Object.defineProperty;
    $t2 = (t3, r6, a3, n5) => {
      for (var e5 = void 0, s4 = t3.length - 1, i5; s4 >= 0; s4--)
        (i5 = t3[s4]) && (e5 = i5(r6, a3, e5) || e5);
      return e5 && yt2(r6, a3, e5), e5;
    };
    R3 = class R4 extends S3 {
      constructor() {
        super(...arguments), this.ab = [], this.seq = 0;
      }
      willUpdate(r6) {
        if (!r6.has("config")) return;
        const a3 = ++this.seq, n5 = this.c;
        (async () => {
          let e5 = (await at2(n5.products, w3(n5.auto_source, "best_selling"), 6)).items;
          if (e5.length === 1 || y4(n5.same_category, true) && e5.length > 1 && e5[0].category && e5[1].category !== e5[0].category) {
            const s4 = await I3(w3(n5.auto_source, "best_selling"), [], 12), i5 = s4.find((c4) => c4.id !== e5[0].id && (!e5[0].category || c4.category === e5[0].category)) ?? s4.find((c4) => c4.id !== e5[0].id);
            i5 && (e5 = [e5[0], i5]);
          }
          a3 === this.seq && (this.ab = e5.slice(0, 2));
        })();
      }
      render() {
        const r6 = this.c;
        if (this.ab.length < 2) return this.shell(b2`<div class="skel"></div>`);
        const [a3, n5] = this.ab, e5 = j2.filter((o7) => y4(r6[`m_${o7}`], o7 !== "stock")), s4 = Object.fromEntries(e5.map((o7) => [o7, 1])), i5 = wt2([a3, n5], s4), c4 = i5.find((o7) => o7.p.id === a3.id), f5 = i5.find((o7) => o7.p.id === n5.id), u3 = (o7, b6) => b6 === "price" ? k3(o7.price) : b6 === "rating" ? o7.rating ? `${o7.rating.toFixed(1)}\u2605` : "\u2014" : b6 === "discount" ? o7.discount ? `${o7.discount}%` : "\u2014" : b6 === "popular" ? o7.sold ?? "\u2014" : b6 === "reviews" ? o7.ratingCount || "\u2014" : o7.available ? "\u2713" : "\u2715", g2 = a3.price <= n5.price ? a3 : n5, _4 = (g2 === a3 ? n5 : a3).price - g2.price, A4 = X2(r6.rows);
        return this.shell(b2`<div class="panel">
      <div class="vs"><div><img src=${a3.image} alt="" /><div class="nm">${a3.name}</div><div class="pr">${k3(a3.price)}</div></div><div class="x">${m2(r6.vs_label, "VS")}</div><div><img src=${n5.image} alt="" /><div class="nm">${n5.name}</div><div class="pr">${k3(n5.price)}</div></div></div>
      <div class="rows">${e5.map((o7) => {
          const b6 = c4.parts[o7], h4 = f5.parts[o7];
          if (b6 == null && h4 == null) return "";
          const H6 = Math.round(((b6 ?? 0) * 0.8 + 0.2) * 100), J3 = Math.round(((h4 ?? 0) * 0.8 + 0.2) * 100);
          return b2`<div class="row"><span class="l ${b6 != null && b6 >= (h4 ?? -1) ? "won" : ""}">${u3(a3, o7)}</span><div class="tr a"><i style=${`width:${H6}%`}></i></div><span class="m">${mt2(o7)}</span><div class="tr b"><i style=${`width:${J3}%`}></i></div><span class=${h4 != null && h4 >= (b6 ?? -1) ? "won" : ""}>${u3(n5, o7)}</span></div>`;
        })}
        ${A4.map((o7) => b2`<div class="row"><span class="l">${m2(o7.a)}</span><span></span><span class="m">${m2(o7.label)}</span><span></span><span>${m2(o7.b)}</span></div>`)}</div>
      ${y4(r6.show_verdict, true) ? b2`<div class="gap">
        <div><b>💰 ${m2(r6.saver_label, l4("\u0625\u0630\u0627 \u064A\u0647\u0645\u0643 \u0627\u0644\u062A\u0648\u0641\u064A\u0631", "If saving matters"))}</b>${g2.name}${_4 > 0 ? l4(` \u2014 \u062A\u0648\u0641\u0631 ${k3(_4)}`, ` \u2014 you save ${k3(_4)}`) : ""}<br /><button class="btn sm" style="margin-top:10px" ?disabled=${!g2.available} @click=${() => this.add(g2)}>${l4("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart")}</button></div>
        <div><b>⭐ ${m2(r6.best_label, l4("\u0625\u0630\u0627 \u062A\u0628\u064A \u0627\u0644\u0623\u0641\u0636\u0644 \u0625\u062C\u0645\u0627\u0644\u0627\u064B", "If you want the overall best"))}</b>${i5[0].p.name} — ${l4(`\u062A\u0641\u0648\u0651\u0642 \u0641\u064A ${e5.filter((o7) => (i5[0].parts[o7] ?? -1) > (i5[1].parts[o7] ?? -1)).length} \u0645\u0646 ${e5.length}`, `wins ${e5.filter((o7) => (i5[0].parts[o7] ?? -1) > (i5[1].parts[o7] ?? -1)).length} of ${e5.length}`)}<br /><button class="btn sm" style="margin-top:10px" ?disabled=${!i5[0].p.available} @click=${() => this.add(i5[0].p)}>${l4("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart")}</button></div></div>` : ""}
    </div>`, { eyebrow: l4("\u0648\u062C\u0647\u0627\u064B \u0644\u0648\u062C\u0647", "Head to head"), title: l4("\u0623\u064A\u0647\u0645\u0627 \u064A\u0646\u0627\u0633\u0628\u0643\u061F", "Which one suits you?") });
      }
    };
    R3.styles = [S3.base, i`
    .vs { display: grid; grid-template-columns: 1fr auto 1fr; gap: 18px; align-items: center; text-align: center; }
    .vs img { width: 100%; max-width: 230px; aspect-ratio: 1; object-fit: cover; border-radius: 22px; box-shadow: var(--sh); }
    .vs .x { width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; font-weight: 900; font-size: 22px; background: var(--A); color: #fff; box-shadow: 0 0 0 8px color-mix(in srgb, var(--A) 20%, transparent); }
    .nm { font-weight: 800; margin: 10px 0 4px; } .pr { font-weight: 900; color: var(--A); }
    .rows { display: grid; gap: 12px; margin-top: 24px; } .row { display: grid; grid-template-columns: 90px 1fr 120px 1fr 90px; gap: 10px; align-items: center; font-size: 14px; }
    .row .l { text-align: end; font-weight: 700; } .row .m { text-align: center; opacity: .75; font-weight: 700; }
    .tr { height: 12px; border-radius: 9px; background: var(--LINE); overflow: hidden; display: flex; } .tr.a { justify-content: flex-end; } .tr i { display: block; height: 100%; border-radius: 9px; transition: width .8s; }
    .a i { background: var(--A); } .b i { background: var(--A2, #c08a2b); } .won { color: #15803d; }
    .gap { margin-top: 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; } .gap > div { padding: 16px; border-radius: 16px; background: color-mix(in srgb, var(--A) 8%, transparent); }
    .gap b { display: block; margin-bottom: 4px; }
    @media (max-width: 640px) { .row { grid-template-columns: 56px 1fr 74px 1fr 56px; font-size: 12px; } .gap { grid-template-columns: 1fr; } .vs .x { width: 44px; height: 44px; font-size: 16px; } }
  `];
    N3 = R3;
    $t2([
      r5()
    ], N3.prototype, "ab");
    typeof N3 < "u" && N3.registerSallaComponent("salla-faisal-duel");
  }
});

// dist/faisal-fit.js
var faisal_fit_exports = {};
__export(faisal_fit_exports, {
  default: () => C3
});
function J(t3) {
  var d4, c4, l6, g2, h4, x6, u3, b6, _4;
  const e5 = w4(t3 == null ? void 0 : t3.sale_price), r6 = w4((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), a3 = e5 && e5 < r6 ? e5 : w4(t3 == null ? void 0 : t3.price) || r6, i5 = Math.max(w4(t3 == null ? void 0 : t3.regular_price), w4(t3 == null ? void 0 : t3.price), a3), n5 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((k5) => String((k5 == null ? void 0 : k5.url) ?? k5 ?? "")).filter(Boolean), s4 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((d4 = t3 == null ? void 0 : t3.image) == null ? void 0 : d4.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? n5[0] ?? ""),
    images: n5,
    price: a3,
    regular: i5,
    discount: i5 > a3 ? Math.round((1 - a3 / i5) * 100) : 0,
    rating: w4(((c4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : c4.stars) ?? ((l6 = t3 == null ? void 0 : t3.rating) == null ? void 0 : l6.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: w4((g2 = t3 == null ? void 0 : t3.rating) == null ? void 0 : g2.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : w4(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: s4 == null || s4 === "" || !Number.isFinite(Number(s4)) ? null : Number(s4),
    endsAt: nt3((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((h4 = t3 == null ? void 0 : t3.category) == null ? void 0 : h4.name) ?? ((u3 = (x6 = t3 == null ? void 0 : t3.categories) == null ? void 0 : x6[0]) == null ? void 0 : u3.name) ?? ""),
    brand: String(((b6 = t3 == null ? void 0 : t3.brand) == null ? void 0 : b6.name) ?? ""),
    promo: String(((_4 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : _4.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function st3(t3) {
  var a3, i5, n5;
  const e5 = (a3 = y5()) == null ? void 0 : a3.product;
  if (!e5) return null;
  const r6 = e5.getDetails ? e5.getDetails.bind(e5) : (n5 = (i5 = e5.api) == null ? void 0 : i5.getDetails) == null ? void 0 : n5.bind(e5.api);
  if (!r6) return null;
  try {
    const s4 = await r6(t3, ["images", "sold_quantity", "category"]), d4 = J((s4 == null ? void 0 : s4.data) ?? s4);
    return d4.name ? d4 : null;
  } catch {
    return null;
  }
}
async function U(t3) {
  await B4();
  const e5 = "ids:" + t3.join(",");
  return A3.has(e5) || A3.set(e5, Promise.all(t3.map(st3)).then((r6) => r6.filter((a3) => !!a3))), A3.get(e5);
}
async function L4(t3, e5 = [], r6 = 12) {
  await B4();
  const a3 = `src:${t3}:${e5.join(",")}:${r6}`;
  return A3.has(a3) || A3.set(a3, (async () => {
    var s4, d4, c4, l6;
    const i5 = (s4 = y5()) == null ? void 0 : s4.product, n5 = i5 != null && i5.fetch ? i5.fetch.bind(i5) : (c4 = (d4 = i5 == null ? void 0 : i5.api) == null ? void 0 : d4.fetch) == null ? void 0 : c4.bind(i5.api);
    if (!n5) return [];
    try {
      const g2 = { source: t3, per_page: r6 };
      e5.length && (g2.source_value = e5);
      const h4 = await n5(g2);
      return (Array.isArray(h4 == null ? void 0 : h4.data) ? h4.data : Array.isArray(h4) ? h4 : ((l6 = h4 == null ? void 0 : h4.data) == null ? void 0 : l6.products) ?? []).map(J).filter((u3) => u3.name).slice(0, r6);
    } catch {
      return [];
    }
  })()), A3.get(a3);
}
async function ot3(t3, e5 = "best_selling", r6 = 12) {
  const a3 = q(t3);
  if (a3.length) return { items: (await U(a3)).slice(0, r6), auto: false };
  let i5 = await L4(e5, [], r6);
  return !i5.length && e5 !== "latest" && (i5 = await L4("latest", [], r6)), { items: i5, auto: true };
}
async function ct3(t3, e5 = 1, r6) {
  var a3, i5, n5;
  await B4();
  try {
    return await ((n5 = (i5 = (a3 = y5()) == null ? void 0 : a3.cart) == null ? void 0 : i5.addItem) == null ? void 0 : n5.call(i5, r6 ? { id: t3, quantity: e5, notes: r6 } : { id: t3, quantity: e5 })), true;
  } catch {
    return false;
  }
}
function lt3(t3, e5 = true) {
  var r6, a3, i5;
  try {
    (i5 = e5 ? (r6 = y5()) == null ? void 0 : r6.success : (a3 = y5()) == null ? void 0 : a3.error) == null || i5(t3);
  } catch {
  }
}
function F2() {
  try {
    return { ...O2(), ...JSON.parse(localStorage.getItem(D5) || "{}") };
  } catch {
    return O2();
  }
}
function ut3(t3) {
  try {
    localStorage.setItem(D5, JSON.stringify(t3));
  } catch {
  }
}
function I4(t3) {
  const e5 = F2();
  return t3(e5), ut3(e5), e5;
}
function gt3() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(D5), sessionStorage.setItem(D5, "1");
  } catch {
  }
  return t3 ? I4((e5) => {
    e5.visits += 1, e5.last = Date.now();
  }) : F2();
}
function ht3() {
  P4 || (P4 = true, dt3("cart::item.added", (t3) => {
    var r6;
    const e5 = Number(((r6 = t3 == null ? void 0 : t3.data) == null ? void 0 : r6.product_id) ?? 0);
    e5 && I4((a3) => {
      a3.carted.includes(e5) || (a3.carted = [...a3.carted.slice(-40), e5]);
    });
  }));
}
function yt3(t3) {
  const e5 = vt3[t3];
  if (!e5 || T3.has(e5)) return e5;
  T3.add(e5);
  const r6 = document.createElement("link");
  return r6.rel = "stylesheet", r6.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e5)}:wght@400;500;700;800&display=swap`, document.head.appendChild(r6), e5;
}
var y5, B4, H3, at3, o6, v4, $4, m3, p4, it3, M6, w4, nt3, q, A3, S4, dt3, D5, O2, G2, ft3, P4, pt3, bt3, mt3, xt3, vt3, T3, wt3, $t3, j3, N4, _t, K, E4, C3;
var init_faisal_fit = __esm({
  "dist/faisal-fit.js"() {
    "use strict";
    init_lit();
    init_decorators();
    y5 = () => window.salla ?? window.Salla;
    B4 = async () => {
      var t3, e5;
      try {
        await ((e5 = (t3 = y5()) == null ? void 0 : t3.onReady) == null ? void 0 : e5.call(t3));
      } catch {
      }
    };
    H3 = () => {
      var t3, e5, r6, a3, i5;
      try {
        const n5 = ((e5 = (t3 = y5()) == null ? void 0 : t3.lang) == null ? void 0 : e5.locale) ?? ((i5 = (a3 = (r6 = y5()) == null ? void 0 : r6.config) == null ? void 0 : a3.get) == null ? void 0 : i5.call(a3, "user.language_code"));
        if (typeof n5 == "string" && n5) return n5.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    at3 = () => H3() === "en";
    o6 = (t3, e5) => at3() ? e5 : t3;
    v4 = (t3, e5 = "") => {
      if (t3 == null) return e5;
      if (typeof t3 == "string") {
        const r6 = t3.trim();
        if (r6.startsWith("{") && r6.endsWith("}"))
          try {
            return v4(JSON.parse(r6), e5);
          } catch {
          }
        return r6 || e5;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const r6 = t3, a3 = r6[H3()] ?? r6.ar ?? r6.en ?? Object.values(r6).find((i5) => typeof i5 == "string" && i5);
        return typeof a3 == "string" && a3.trim() ? a3 : e5;
      }
      return e5;
    };
    $4 = (t3, e5 = "") => {
      const r6 = Array.isArray(t3) ? t3[0] : t3, a3 = typeof r6 == "object" && r6 ? r6.value : r6;
      return a3 == null || a3 === "" ? e5 : String(a3);
    };
    m3 = (t3, e5 = 0) => {
      const r6 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(r6) ? e5 : r6;
    };
    p4 = (t3, e5 = false) => t3 == null || t3 === "" ? e5 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    it3 = (t3) => Array.isArray(t3) ? t3 : [];
    M6 = (t3) => v4(t3).split(/[,،\n]/).map((e5) => e5.trim()).filter(Boolean);
    w4 = (t3) => {
      const e5 = typeof t3 == "object" && t3 ? t3.amount : t3, r6 = Number(e5);
      return Number.isFinite(r6) ? r6 : 0;
    };
    nt3 = (t3) => {
      if (!t3) return null;
      const e5 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(e5) && e5 > Date.now() ? e5 : null;
    };
    q = (t3) => (Array.isArray(t3) ? t3 : []).map((e5) => Number(typeof e5 == "object" && e5 ? e5.value : e5)).filter((e5) => Number.isFinite(e5) && e5 > 0);
    A3 = /* @__PURE__ */ new Map();
    S4 = (t3) => {
      var e5, r6;
      try {
        const a3 = (r6 = (e5 = y5()) == null ? void 0 : e5.money) == null ? void 0 : r6.call(e5, t3);
        if (a3) return String(a3);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${o6("\u0631.\u0633", "SAR")}`;
    };
    dt3 = (t3, e5) => {
      var r6, a3, i5;
      try {
        (i5 = (a3 = (r6 = y5()) == null ? void 0 : r6.event) == null ? void 0 : a3.on) == null || i5.call(a3, t3, e5);
      } catch {
      }
    };
    D5 = "tw_smart_mem_v1";
    O2 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    G2 = (t3, e5 = 1) => I4((r6) => {
      r6.seen[t3.id] = (r6.seen[t3.id] || 0) + e5, r6.prices = [...r6.prices.slice(-29), t3.price], t3.category && (r6.tags[t3.category] = (r6.tags[t3.category] || 0) + e5);
    });
    ft3 = (t3, e5) => I4((r6) => {
      r6.answers[t3] = e5;
    });
    P4 = false;
    pt3 = () => {
      const t3 = innerWidth, e5 = navigator.userAgent;
      return /iPad|Tablet/i.test(e5) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e5) || t3 < 700 ? "mobile" : "desktop";
    };
    bt3 = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    mt3 = Object.defineProperty;
    xt3 = (t3, e5, r6, a3) => {
      for (var i5 = void 0, n5 = t3.length - 1, s4; n5 >= 0; n5--)
        (s4 = t3[n5]) && (i5 = s4(e5, r6, i5) || i5);
      return i5 && mt3(e5, r6, i5), i5;
    };
    vt3 = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    T3 = /* @__PURE__ */ new Set();
    wt3 = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    $t3 = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    j3 = class j4 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), ht3(), gt3();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((e5) => {
          var r6;
          e5.some((a3) => a3.isIntersecting) && (this.setAttribute("in", ""), (r6 = this.io) == null || r6.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var e5;
        super.disconnectedCallback(), (e5 = this.io) == null || e5.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const e5 = this.c, r6 = Date.now(), a3 = Date.parse(String(e5.s_from || "")), i5 = Date.parse(String(e5.s_to || ""));
        if (Number.isFinite(a3) && r6 < a3 || Number.isFinite(i5) && r6 > i5) return true;
        const n5 = pt3();
        return !!(p4(e5.s_hide_mobile) && n5 === "mobile" || p4(e5.s_hide_desktop) && n5 !== "mobile");
      }
      vars(e5 = "") {
        const r6 = this.c, a3 = [], i5 = (s4, d4) => {
          d4 !== "" && d4 != null && a3.push(`${s4}:${d4}`);
        };
        i5("--a", r6.s_accent || ""), i5("--a2", r6.s_accent2 || ""), i5("--bgc", r6.s_bg || ""), i5("--fgc", r6.s_text || ""), i5("--cardc", r6.s_card || ""), i5("--r", `${m3(r6.s_radius, 22)}px`), i5("--gap", `${m3(r6.s_gap, 18)}px`), i5("--ts", `${m3(r6.s_title_size, 38)}px`), i5("--fs", `${m3(r6.s_text_size, 16)}px`), i5("--pt", `${m3(r6.s_pad_top, 56)}px`), i5("--pb", `${m3(r6.s_pad_bottom, 56)}px`), i5("--maxw", wt3[$4(r6.s_width, "normal")] ?? "1240px"), i5("--sh", $t3[Math.max(0, Math.min(5, m3(r6.s_shadow, 2)))]), i5("--ms", `${m3(r6.s_anim_ms, 700)}ms`), i5("--ov", String(m3(r6.s_overlay, 45) / 100)), r6.s_bg_image && i5("--bgimg", `url("${String(r6.s_bg_image)}")`);
        const n5 = yt3($4(r6.s_font, "inherit"));
        return n5 && i5("font-family", `'${n5}', inherit`), a3.join(";") + (e5 ? ";" + e5 : "");
      }
      cls() {
        const e5 = this.c;
        return [
          "sec",
          `th-${$4(e5.s_theme, "auto")}`,
          `al-${$4(e5.s_align, "start")}`,
          `an-${$4(e5.s_anim, "rise")}`,
          `pt-${$4(e5.s_pattern, "none")}`,
          `bs-${$4(e5.s_btn_style, "pill")}`,
          p4(e5.s_border) ? "bordered" : "",
          p4(e5.s_stagger, true) ? "stagger" : "",
          e5.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(e5, r6 = {}, a3 = "", i5 = "", n5 = true) {
        if (this.hiddenNow()) return A;
        const s4 = this.c, d4 = v4(s4.eyebrow, r6.eyebrow ?? ""), c4 = v4(s4.title, r6.title ?? ""), l6 = v4(s4.subtitle, r6.sub ?? ""), g2 = n5 && p4(s4.s_show_head, true) && (d4 || c4 || l6);
        return b2`<section class="${this.cls()} ${a3}" style=${this.vars(i5)} id=${String(s4.s_anchor || "") || A}>
      <div class="wrap">${g2 ? b2`<header class="head">${d4 ? b2`<span class="eyebrow">${d4}</span>` : ""}${c4 ? b2`<h2 class="title">${c4}</h2>` : ""}${l6 ? b2`<p class="sub">${l6}</p>` : ""}</header>` : ""}
      ${e5}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(e5) {
        const r6 = e5.filter(Boolean);
        return !r6.length || !bt3() || !p4(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${o6("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${r6.map((a3) => b2`<li>${a3}</li>`)}</ul></aside>`;
      }
      card(e5, r6 = {}) {
        var a3;
        return b2`<article class="pc ${e5.available ? "" : "oos"}">
      <a class="ph" href=${e5.url} @click=${() => G2(e5)}><img src=${e5.image} alt=${e5.name} loading="lazy" />${(a3 = r6.badges) != null && a3.length ? b2`<span class="badges">${r6.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e5.url} @click=${() => G2(e5)}>${e5.name}</a>
        <div class="pr"><b>${S4(e5.price)}</b>${e5.regular > e5.price ? b2`<s>${S4(e5.regular)}</s>` : ""}</div>
        ${r6.rating !== false && e5.rating > 0 ? b2`<div class="rt">★ ${e5.rating.toFixed(1)}${e5.ratingCount ? b2` <small>(${e5.ratingCount})</small>` : ""}</div>` : ""}
        ${r6.extra ?? ""}
        ${r6.quick !== false ? b2`<button class="btn sm" ?disabled=${!e5.available} @click=${() => this.add(e5)}>${e5.available ? o6("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : o6("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(e5, r6 = 1, a3) {
        G2(e5, 3), await ct3(e5.id, r6, a3) ? lt3(o6("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = e5.url;
      }
    };
    j3.base = i`
  :host { display: block; font-family: inherit; direction: inherit;
    --A: var(--a, var(--color-primary, #b88a44)); --A2: var(--a2, color-mix(in srgb, var(--A) 55%, #000)); --BG: var(--bgc, transparent); --FG: var(--fgc, inherit); --CARD: var(--cardc, #fff); --LINE: color-mix(in srgb, currentColor 14%, transparent); }
  :host([hidden]) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .sec { position: relative; background: var(--BG); color: var(--FG); font-size: var(--fs, 16px); overflow: hidden; isolation: isolate; }
  .sec.has-img::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--bgimg) center/cover no-repeat; }
  .sec.has-img::after { content: ''; position: absolute; inset: 0; z-index: -1; background: #000; opacity: var(--ov, .45); }
  .th-light { --BG: var(--bgc, #fff); --FG: var(--fgc, #17140f); --CARD: var(--cardc, #faf8f4); }
  .th-ivory { --BG: var(--bgc, #f7f2e9); --FG: var(--fgc, #1d160c); --CARD: var(--cardc, #fffdf8); }
  .th-dark { --BG: var(--bgc, #111014); --FG: var(--fgc, #f4efe6); --CARD: var(--cardc, #1c1b22); }
  .th-midnight { --BG: var(--bgc, radial-gradient(900px 500px at 85% -10%, #2c1d55 0, transparent 60%), #0f0c18); --FG: var(--fgc, #f6f1e7); --CARD: var(--cardc, #19142d); }
  .th-glass { --BG: var(--bgc, linear-gradient(135deg, color-mix(in srgb, var(--A) 14%, #fff), #fff 60%)); --FG: var(--fgc, #15130f); --CARD: var(--cardc, rgba(255,255,255,.6)); }
  .th-glass .pc, .th-glass .panel { backdrop-filter: blur(14px); }
  .th-accent { --BG: var(--bgc, linear-gradient(135deg, var(--A), var(--A2))); --FG: var(--fgc, #fff); --CARD: var(--cardc, rgba(255,255,255,.12)); }
  .th-dark, .th-midnight, .th-accent { --LINE: rgba(255,255,255,.14); }
  .pt-dots { background-image: radial-gradient(color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1.4px), var(--BG); background-size: 18px 18px, auto; }
  .pt-grid { background-image: linear-gradient(var(--LINE) 1px, transparent 1px), linear-gradient(90deg, var(--LINE) 1px, transparent 1px), var(--BG); background-size: 36px 36px, 36px 36px, auto; }
  .pt-arabesque { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23999' stroke-opacity='.18'/%3E%3C/svg%3E"), var(--BG); }
  .pt-waves { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10q20-10 40 0t40 0' fill='none' stroke='%23999' stroke-opacity='.2'/%3E%3C/svg%3E"), var(--BG); }
  .wrap { max-width: var(--maxw, 1240px); margin: 0 auto; padding: var(--pt, 56px) clamp(16px, 4vw, 32px) var(--pb, 56px); }
  .head { margin-bottom: calc(var(--gap, 18px) * 1.4); }
  .al-center .head { text-align: center; } .al-center .head .sub { margin-inline: auto; } .al-end .head { text-align: end; }
  .eyebrow { display: inline-block; letter-spacing: .2em; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--A); margin-bottom: 10px; }
  .th-accent .eyebrow { color: inherit; opacity: .85; }
  h2.title { margin: 0 0 8px; font-size: clamp(22px, calc(var(--ts, 38px) * .62 + 1.2vw), var(--ts, 38px)); line-height: 1.25; font-weight: 800; }
  .sub { margin: 0; opacity: .72; line-height: 1.8; max-width: 720px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; text-decoration: none; font: inherit; font-weight: 700;
    padding: 13px 24px; border-radius: 999px; background: var(--A); color: #fff; transition: transform .25s, box-shadow .25s, opacity .2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--A); } .btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn.ghost { background: transparent; color: inherit; border: 1.5px solid currentColor; } .btn.sm { padding: 9px 16px; font-size: 14px; }
  .th-accent .btn:not(.ghost) { background: #fff; color: var(--A2); }
  .bs-rounded .btn { border-radius: 12px; } .bs-square .btn { border-radius: 0; } .bs-outline .btn:not(.ghost) { background: transparent; color: var(--A); border: 1.5px solid var(--A); }
  .bs-underline .btn { background: none; color: var(--A); padding-inline: 0; border-radius: 0; border-bottom: 2px solid var(--A); }
  .bordered .pc, .bordered .panel { border: 1px solid var(--LINE); }
  .panel { background: var(--CARD); border-radius: var(--r, 22px); box-shadow: var(--sh); padding: clamp(16px, 2.4vw, 28px); }
  .grid { display: grid; gap: var(--gap, 18px); grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); }
  @media (max-width: 860px) { .grid { grid-template-columns: repeat(var(--mcols, 2), minmax(0, 1fr)); } }
  .rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(220px, calc((100% - var(--gap) * (var(--cols, 4) - 1)) / var(--cols, 4))); gap: var(--gap, 18px); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; }
  @media (max-width: 860px) { .rail { grid-auto-columns: calc((100% - var(--gap)) / var(--mcols, 2) - 8px); } }
  .rail > * { scroll-snap-align: start; }
  .pc { position: relative; display: flex; flex-direction: column; background: var(--CARD); border-radius: var(--r, 22px); overflow: hidden; box-shadow: var(--sh); transition: transform .35s; color: inherit; }
  .pc:hover { transform: translateY(-4px); } .pc.oos { opacity: .55; }
  .ph { position: relative; display: block; aspect-ratio: var(--ratio, 1); background: color-mix(in srgb, currentColor 6%, transparent); }
  .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badges { position: absolute; inset: 10px 10px auto 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .bdg { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px; background: var(--A); color: #fff; line-height: 1.4; }
  .bdg.alt { background: #111; } .bdg.ok { background: #15803d; } .bdg.warn { background: #b45309; } .bdg.soft { background: #fff; color: #111; }
  .pb { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
  .pn { color: inherit; text-decoration: none; font-weight: 700; line-height: 1.5; font-size: .95em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; } .pr b { color: var(--A); } .th-accent .pr b { color: inherit; } .pr s { opacity: .5; font-size: .85em; }
  .rt { font-size: 13px; color: #d4a017; } .rt small { opacity: .7; color: inherit; }
  .pb .btn { margin-top: auto; width: 100%; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--LINE); background: var(--CARD); color: inherit; font: inherit; font-size: 14px; cursor: pointer; transition: all .25s; }
  .chip:hover { border-color: var(--A); } .chip.on { background: var(--A); border-color: var(--A); color: #fff; }
  .muted { opacity: .65; } .center { text-align: center; }
  .skel { background: linear-gradient(90deg, #8881 0, #8882 50%, #8881 100%); background-size: 200% 100%; animation: sk 1.4s infinite; border-radius: var(--r, 22px); min-height: 220px; }
  @keyframes sk { to { background-position: -200% 0; } }
  .hints { margin: 0 0 18px; padding: 14px 18px; border-radius: 14px; background: #fff8e1; color: #5b4300; border: 1px dashed #e0b84a; font-size: 13px; line-height: 1.8; }
  .hints ul { margin: 6px 0 0; padding-inline-start: 18px; }
  /* reveal motion */
  .sec .wrap > * { transition: opacity var(--ms, .7s) ease, transform var(--ms, .7s) cubic-bezier(.2,.7,.2,1), filter var(--ms, .7s); }
  :host(:not([in])) .an-fade .wrap > * { opacity: 0; }
  :host(:not([in])) .an-rise .wrap > * { opacity: 0; transform: translateY(28px); }
  :host(:not([in])) .an-zoom .wrap > * { opacity: 0; transform: scale(.94); }
  :host(:not([in])) .an-blur .wrap > * { opacity: 0; filter: blur(12px); }
  :host(:not([in])) .an-slide .wrap > * { opacity: 0; transform: translateX(40px); }
  .stagger .wrap > *:nth-child(2) { transition-delay: .08s; } .stagger .wrap > *:nth-child(3) { transition-delay: .16s; } .stagger .wrap > *:nth-child(4) { transition-delay: .24s; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } :host .sec .wrap > * { opacity: 1 !important; transform: none !important; filter: none !important; } }
  `;
    N4 = j3;
    xt3([
      n4({ type: Object })
    ], N4.prototype, "config");
    _t = Object.defineProperty;
    K = (t3, e5, r6, a3) => {
      for (var i5 = void 0, n5 = t3.length - 1, s4; n5 >= 0; n5--)
        (s4 = t3[n5]) && (i5 = s4(e5, r6, i5) || i5);
      return i5 && _t(e5, r6, i5), i5;
    };
    E4 = class E5 extends N4 {
      constructor() {
        super(...arguments), this.ps = [], this.cur = "", this.seq = 0;
      }
      willUpdate(e5) {
        if (!e5.has("config")) return;
        const r6 = ++this.seq, a3 = this.c;
        (async () => {
          var d4;
          const i5 = it3(a3.personas);
          let n5 = [];
          if (i5.length) {
            const c4 = await U(i5.flatMap((l6) => q(l6.product)));
            n5 = i5.map((l6, g2) => {
              const h4 = c4.find((x6) => x6.id === q(l6.product)[0]);
              return h4 ? { key: `c${g2}`, icon: v4(l6.icon, "\u2728"), title: v4(l6.title), desc: v4(l6.desc), p: h4, why: v4(l6.why), pros: M6(l6.pros), cons: M6(l6.cons) } : null;
            }).filter((l6) => !!l6);
          }
          if (!n5.length || p4(a3.mix_auto)) {
            const c4 = (await ot3(null, $4(a3.auto_source, "best_selling"), m3(a3.pool, 16))).items.filter((l6) => l6.available);
            c4.length && (n5 = [...n5, ...this.auto(c4)]);
          }
          if (r6 !== this.seq) return;
          this.ps = n5.slice(0, m3(a3.max_personas, 5));
          const s4 = F2().answers.faisal_fit;
          this.cur = this.ps.some((c4) => c4.key === s4) ? s4 : ((d4 = this.ps[0]) == null ? void 0 : d4.key) ?? "";
        })();
      }
      auto(e5) {
        const r6 = this.c, a3 = (u3) => [...e5].sort((b6, _4) => u3(_4) - u3(b6))[0], i5 = [], n5 = /* @__PURE__ */ new Set(), s4 = (u3, b6, _4, k5, X5, z6, Q5, V6, Z6) => {
          !b6 || !z6 || n5.has(z6.id) && p4(r6.unique, true) && !e5.find((tt5) => !n5.has(tt5.id)) || (n5.add(z6.id), i5.push({ key: u3, icon: _4, title: k5, desc: X5, p: z6, why: Q5, pros: V6.filter(Boolean), cons: Z6.filter(Boolean) }));
        }, d4 = a3((u3) => -u3.price), c4 = e5.filter((u3) => u3.ratingCount >= m3(r6.min_reviews, 3)).sort((u3, b6) => b6.rating - u3.rating)[0], l6 = e5.filter((u3) => u3.sold != null).sort((u3, b6) => (b6.sold ?? 0) - (u3.sold ?? 0))[0], g2 = e5.filter((u3) => u3.discount > 0).sort((u3, b6) => b6.discount - u3.discount)[0], h4 = a3((u3) => u3.price), x6 = e5.reduce((u3, b6) => u3 + b6.price, 0) / e5.length;
        return s4("saver", p4(r6.p_saver, true), "\u{1F4B0}", o6("\u0623\u0628\u064A \u0627\u0644\u0623\u0648\u0641\u0631", "I want the best price"), o6("\u0645\u064A\u0632\u0627\u0646\u064A\u062A\u0643 \u0623\u0647\u0645 \u0634\u064A", "Budget comes first"), d4, o6(`\u0627\u0644\u0623\u0642\u0644 \u0633\u0639\u0631\u0627\u064B \u0628\u064A\u0646 ${e5.length} \u0645\u0646\u062A\u062C`, `Lowest price of ${e5.length}`), [x6 > d4.price ? o6(`\u0623\u0642\u0644 \u0645\u0646 \u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0628\u0640 ${Math.round((1 - d4.price / x6) * 100)}%`, `${Math.round((1 - d4.price / x6) * 100)}% below the average price`) : "", d4.rating ? `${d4.rating.toFixed(1)}\u2605` : ""], [d4.price < x6 * 0.6 ? o6("\u062E\u064A\u0627\u0631\u0627\u062A \u0623\u0642\u0644 \u0641\u062E\u0627\u0645\u0629", "Less premium") : ""]), s4("quality", p4(r6.p_quality, true), "\u2B50", o6("\u0623\u0628\u064A \u0627\u0644\u0623\u0639\u0644\u0649 \u062A\u0642\u064A\u064A\u0645\u0627\u064B", "I want top quality"), o6("\u0631\u0623\u064A \u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u064A\u0647\u0645\u0643", "You trust reviews"), c4, c4 ? o6(`${c4.rating.toFixed(1)}\u2605 \u0645\u0646 ${c4.ratingCount} \u062A\u0642\u064A\u064A\u0645 \u062D\u0642\u064A\u0642\u064A`, `${c4.rating.toFixed(1)}\u2605 from ${c4.ratingCount} real reviews`) : "", c4 ? [o6(`${c4.ratingCount} \u062A\u0642\u064A\u064A\u0645`, `${c4.ratingCount} reviews`)] : [], c4 && c4.price > x6 ? [o6("\u0623\u0639\u0644\u0649 \u0645\u0646 \u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0633\u0639\u0631", "Above average price")] : []), s4("popular", p4(r6.p_popular, true), "\u{1F525}", o6("\u0623\u0628\u064A \u0627\u0644\u0644\u064A \u064A\u0637\u0644\u0628\u0647 \u0627\u0644\u0643\u0644", "What everyone buys"), o6("\u062A\u062D\u0628 \u0627\u0644\u062E\u064A\u0627\u0631 \u0627\u0644\u0645\u0636\u0645\u0648\u0646", "You like the safe choice"), l6, l6 ? o6(`\u0628\u064A\u0639 \u0645\u0646\u0647 ${l6.sold} \u062D\u062A\u0649 \u0627\u0644\u0622\u0646`, `${l6.sold} sold so far`) : "", [], []), s4("deal", p4(r6.p_deal, true), "\u{1F3F7}\uFE0F", o6("\u0623\u0628\u064A \u0623\u0642\u0648\u0649 \u0639\u0631\u0636", "I want the best deal"), o6("\u062A\u0642\u062A\u0646\u0635 \u0627\u0644\u062E\u0635\u0648\u0645\u0627\u062A", "You hunt discounts"), g2, g2 ? o6(`\u062E\u0635\u0645 ${g2.discount}% \u2014 \u0648\u0641\u0651\u0631 ${S4(g2.regular - g2.price)}`, `${g2.discount}% off \u2014 save ${S4(g2.regular - g2.price)}`) : "", [], g2 != null && g2.endsAt ? [o6("\u0627\u0644\u0639\u0631\u0636 \u0644\u0641\u062A\u0631\u0629 \u0645\u062D\u062F\u0648\u062F\u0629", "Limited time")] : []), s4("gift", p4(r6.p_gift, true), "\u{1F381}", o6("\u0623\u0628\u064A \u0647\u062F\u064A\u0629 \u062A\u0628\u064A\u0651\u0636 \u0627\u0644\u0648\u062C\u0647", "A gift that impresses"), o6("\u0644\u0644\u0645\u0646\u0627\u0633\u0628\u0627\u062A \u0648\u0627\u0644\u0625\u0647\u062F\u0627\u0621", "For gifting"), h4, o6("\u0627\u0644\u0623\u0641\u062E\u0645 \u0641\u064A \u0627\u0644\u062A\u0634\u0643\u064A\u0644\u0629", "The most premium pick"), [h4.rating ? `${h4.rating.toFixed(1)}\u2605` : ""], [o6("\u0627\u0644\u0623\u0639\u0644\u0649 \u0633\u0639\u0631\u0627\u064B", "Highest price")]), i5;
      }
      render() {
        const e5 = this.c;
        if (!this.ps.length) return this.shell(b2`<div class="skel"></div>`);
        const r6 = this.ps.find((a3) => a3.key === this.cur) ?? this.ps[0];
        return this.shell(
          b2`
      <div class="chips">${this.ps.map((a3) => b2`<button class="chip ${a3.key === r6.key ? "on" : ""}" @click=${() => {
            this.cur = a3.key, ft3("faisal_fit", a3.key);
          }}>${a3.icon} ${a3.title}</button>`)}</div>
      <div class="panel res"><img src=${r6.p.image} alt="" /><div><span class="ico">${r6.icon}</span><div class="sub">${r6.desc}</div><div class="ttl">${r6.p.name}</div>${r6.why ? b2`<div class="why">${r6.why}</div>` : ""}<div class="pr">${S4(r6.p.price)}</div>
        ${p4(e5.show_pros, true) && r6.pros.length ? b2`<ul class="pros">${r6.pros.map((a3) => b2`<li>${a3}</li>`)}</ul>` : ""}
        ${p4(e5.show_cons, true) && r6.cons.length ? b2`<ul class="cons">${r6.cons.map((a3) => b2`<li>${a3}</li>`)}</ul>` : ""}
        <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" ?disabled=${!r6.p.available} @click=${() => this.add(r6.p)}>${v4(e5.cta, o6("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart"))}</button><a class="btn ghost" href=${r6.p.url}>${o6("\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644", "Details")}</a></div></div></div>`,
          { eyebrow: o6("\u0623\u0646\u062A \u0645\u0646 \u0623\u064A \u0646\u0648\u0639\u061F", "Which shopper are you?"), title: o6("\u0627\u062E\u062A\u0631 \u0648\u0635\u0641\u0643\u2026 \u0648\u0646\u062E\u062A\u0627\u0631 \u0644\u0643", "Pick your style, we pick for you") }
        );
      }
    };
    E4.styles = [N4.base, i`
    .chips { justify-content: center; margin-bottom: 20px; } .chip.on { background: var(--A); color: #fff; border-color: var(--A); }
    .res { display: grid; grid-template-columns: minmax(200px, 340px) 1fr; gap: 26px; align-items: center; } .res img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 24px; box-shadow: var(--sh); }
    .ttl { font-size: 1.5em; font-weight: 900; margin: 6px 0; } .why { font-weight: 700; color: var(--A); } .pr { font-size: 1.3em; font-weight: 900; margin: 8px 0 12px; }
    ul { list-style: none; padding: 0; margin: 0 0 12px; display: grid; gap: 6px; } li::before { margin-inline-end: 8px; } .pros li::before { content: '✓'; color: #15803d; font-weight: 900; } .cons li::before { content: '•'; color: #b45309; font-weight: 900; }
    .ico { font-size: 34px; } @media (max-width: 720px) { .res { grid-template-columns: 1fr; } }
  `];
    C3 = E4;
    K([
      r5()
    ], C3.prototype, "ps");
    K([
      r5()
    ], C3.prototype, "cur");
    typeof C3 < "u" && C3.registerSallaComponent("salla-faisal-fit");
  }
});

// dist/faisal-picker.js
var faisal_picker_exports = {};
__export(faisal_picker_exports, {
  default: () => v5
});
function W3(t3) {
  var c4, s4, u3, g2, h4, D7, _4, F4, R6;
  const e5 = m4(t3 == null ? void 0 : t3.sale_price), r6 = m4((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), i5 = e5 && e5 < r6 ? e5 : m4(t3 == null ? void 0 : t3.price) || r6, a3 = Math.max(m4(t3 == null ? void 0 : t3.regular_price), m4(t3 == null ? void 0 : t3.price), i5), o7 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((A4) => String((A4 == null ? void 0 : A4.url) ?? A4 ?? "")).filter(Boolean), n5 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((c4 = t3 == null ? void 0 : t3.image) == null ? void 0 : c4.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? o7[0] ?? ""),
    images: o7,
    price: i5,
    regular: a3,
    discount: a3 > i5 ? Math.round((1 - i5 / a3) * 100) : 0,
    rating: m4(((s4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : s4.stars) ?? ((u3 = t3 == null ? void 0 : t3.rating) == null ? void 0 : u3.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: m4((g2 = t3 == null ? void 0 : t3.rating) == null ? void 0 : g2.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : m4(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: n5 == null || n5 === "" || !Number.isFinite(Number(n5)) ? null : Number(n5),
    endsAt: X3((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((h4 = t3 == null ? void 0 : t3.category) == null ? void 0 : h4.name) ?? ((_4 = (D7 = t3 == null ? void 0 : t3.categories) == null ? void 0 : D7[0]) == null ? void 0 : _4.name) ?? ""),
    brand: String(((F4 = t3 == null ? void 0 : t3.brand) == null ? void 0 : F4.name) ?? ""),
    promo: String(((R6 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : R6.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function V4(t3) {
  var i5, a3, o7;
  const e5 = (i5 = b4()) == null ? void 0 : i5.product;
  if (!e5) return null;
  const r6 = e5.getDetails ? e5.getDetails.bind(e5) : (o7 = (a3 = e5.api) == null ? void 0 : a3.getDetails) == null ? void 0 : o7.bind(e5.api);
  if (!r6) return null;
  try {
    const n5 = await r6(t3, ["images", "sold_quantity", "category"]), c4 = W3((n5 == null ? void 0 : n5.data) ?? n5);
    return c4.name ? c4 : null;
  } catch {
    return null;
  }
}
async function Z4(t3) {
  await I5();
  const e5 = "ids:" + t3.join(",");
  return y6.has(e5) || y6.set(e5, Promise.all(t3.map(V4)).then((r6) => r6.filter((i5) => !!i5))), y6.get(e5);
}
async function O3(t3, e5 = [], r6 = 12) {
  await I5();
  const i5 = `src:${t3}:${e5.join(",")}:${r6}`;
  return y6.has(i5) || y6.set(i5, (async () => {
    var n5, c4, s4, u3;
    const a3 = (n5 = b4()) == null ? void 0 : n5.product, o7 = a3 != null && a3.fetch ? a3.fetch.bind(a3) : (s4 = (c4 = a3 == null ? void 0 : a3.api) == null ? void 0 : c4.fetch) == null ? void 0 : s4.bind(a3.api);
    if (!o7) return [];
    try {
      const g2 = { source: t3, per_page: r6 };
      e5.length && (g2.source_value = e5);
      const h4 = await o7(g2);
      return (Array.isArray(h4 == null ? void 0 : h4.data) ? h4.data : Array.isArray(h4) ? h4 : ((u3 = h4 == null ? void 0 : h4.data) == null ? void 0 : u3.products) ?? []).map(W3).filter((_4) => _4.name).slice(0, r6);
    } catch {
      return [];
    }
  })()), y6.get(i5);
}
async function tt3(t3, e5 = "best_selling", r6 = 12) {
  const i5 = Q3(t3);
  if (i5.length) return { items: (await Z4(i5)).slice(0, r6), auto: false };
  let a3 = await O3(e5, [], r6);
  return !a3.length && e5 !== "latest" && (a3 = await O3("latest", [], r6)), { items: a3, auto: true };
}
async function et3(t3, e5 = 1, r6) {
  var i5, a3, o7;
  await I5();
  try {
    return await ((o7 = (a3 = (i5 = b4()) == null ? void 0 : i5.cart) == null ? void 0 : a3.addItem) == null ? void 0 : o7.call(a3, r6 ? { id: t3, quantity: e5, notes: r6 } : { id: t3, quantity: e5 })), true;
  } catch {
    return false;
  }
}
function rt3(t3, e5 = true) {
  var r6, i5, a3;
  try {
    (a3 = e5 ? (r6 = b4()) == null ? void 0 : r6.success : (i5 = b4()) == null ? void 0 : i5.error) == null || a3(t3);
  } catch {
  }
}
function S5() {
  try {
    return { ...L5(), ...JSON.parse(localStorage.getItem(C4) || "{}") };
  } catch {
    return L5();
  }
}
function it4(t3) {
  try {
    localStorage.setItem(C4, JSON.stringify(t3));
  } catch {
  }
}
function z4(t3) {
  const e5 = S5();
  return t3(e5), it4(e5), e5;
}
function nt4() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(C4), sessionStorage.setItem(C4, "1");
  } catch {
  }
  return t3 ? z4((e5) => {
    e5.visits += 1, e5.last = Date.now();
  }) : S5();
}
function ot4() {
  P5 || (P5 = true, at4("cart::item.added", (t3) => {
    var r6;
    const e5 = Number(((r6 = t3 == null ? void 0 : t3.data) == null ? void 0 : r6.product_id) ?? 0);
    e5 && z4((i5) => {
      i5.carted.includes(e5) || (i5.carted = [...i5.carted.slice(-40), e5]);
    });
  }));
}
function ht4(t3) {
  const e5 = gt4[t3];
  if (!e5 || T4.has(e5)) return e5;
  T4.add(e5);
  const r6 = document.createElement("link");
  return r6.rel = "stylesheet", r6.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e5)}:wght@400;500;700;800&display=swap`, document.head.appendChild(r6), e5;
}
function xt4(t3, e5) {
  const r6 = t3.map((n5) => mt4(n5, e5)), i5 = r6.filter((n5) => n5 != null);
  if (i5.length < 2) return r6.map((n5) => n5 == null ? null : 1);
  const a3 = Math.min(...i5), o7 = Math.max(...i5);
  return o7 === a3 ? r6.map((n5) => n5 == null ? null : 1) : r6.map((n5) => n5 == null ? null : e5 === "price" ? (o7 - n5) / (o7 - a3) : (n5 - a3) / (o7 - a3));
}
function vt4(t3, e5) {
  const r6 = Object.fromEntries(N5.map((i5) => [i5, xt4(t3, i5)]));
  return t3.map((i5, a3) => {
    let o7 = 0, n5 = 0;
    const c4 = {};
    for (const s4 of N5) {
      const u3 = r6[s4][a3];
      c4[s4] = u3;
      const g2 = e5[s4] ?? 0;
      u3 != null && g2 > 0 && (o7 += u3 * g2, n5 += g2);
    }
    return { p: i5, score: n5 ? Math.round(o7 / n5 * 100) : 0, parts: c4 };
  }).sort((i5, a3) => a3.score - i5.score);
}
function wt4(t3, e5, r6) {
  const i5 = N5.filter((n5) => (r6[n5] ?? 0) > 0 && t3.parts[n5] != null).map((n5) => ({ m: n5, d: (t3.parts[n5] ?? 0) - Math.max(0, ...e5.map((c4) => c4.parts[n5] ?? 0)), wt: r6[n5] ?? 0 })).filter((n5) => n5.d >= 0).sort((n5, c4) => c4.d * c4.wt - n5.d * n5.wt).slice(0, 2), a3 = t3.p, o7 = i5.map(({ m: n5 }) => n5 === "price" ? l5(`\u0627\u0644\u0623\u0642\u0644 \u0633\u0639\u0631\u0627\u064B (${$5(a3.price)})`, `lowest price (${$5(a3.price)})`) : n5 === "rating" ? l5(`\u0627\u0644\u0623\u0639\u0644\u0649 \u062A\u0642\u064A\u064A\u0645\u0627\u064B (${a3.rating.toFixed(1)}\u2605)`, `highest rated (${a3.rating.toFixed(1)}\u2605)`) : n5 === "discount" ? l5(`\u0623\u0643\u0628\u0631 \u062E\u0635\u0645 (${a3.discount}%)`, `biggest discount (${a3.discount}%)`) : n5 === "popular" ? l5("\u0627\u0644\u0623\u0643\u062B\u0631 \u0637\u0644\u0628\u0627\u064B", "most ordered") : n5 === "reviews" ? l5(`\u0627\u0644\u0623\u0643\u062B\u0631 \u0645\u0631\u0627\u062C\u0639\u0627\u062A (${a3.ratingCount})`, `most reviewed (${a3.ratingCount})`) : l5("\u0645\u062A\u0648\u0641\u0631 \u0628\u0643\u0645\u064A\u0629 \u0623\u0643\u0628\u0631", "better availability"));
  return o7.length ? l5(`\u0644\u0623\u0646\u0647 ${o7.join(" \u0648")} \u062D\u0633\u0628 \u0623\u0648\u0644\u0648\u064A\u0627\u062A\u0643`, `Because it has the ${o7.join(" and ")} for your priorities`) : l5("\u0627\u0644\u0623\u0642\u0631\u0628 \u0644\u0623\u0648\u0644\u0648\u064A\u0627\u062A\u0643", "Closest to your priorities");
}
var b4, I5, H4, K2, l5, w5, x4, p5, f4, m4, X3, Q3, y6, $5, at4, C4, L5, E6, st4, P5, ct4, lt4, dt4, ut4, gt4, T4, pt4, ft4, M7, k4, N5, bt4, mt4, yt4, G3, q2, v5;
var init_faisal_picker = __esm({
  "dist/faisal-picker.js"() {
    "use strict";
    init_lit();
    init_decorators();
    b4 = () => window.salla ?? window.Salla;
    I5 = async () => {
      var t3, e5;
      try {
        await ((e5 = (t3 = b4()) == null ? void 0 : t3.onReady) == null ? void 0 : e5.call(t3));
      } catch {
      }
    };
    H4 = () => {
      var t3, e5, r6, i5, a3;
      try {
        const o7 = ((e5 = (t3 = b4()) == null ? void 0 : t3.lang) == null ? void 0 : e5.locale) ?? ((a3 = (i5 = (r6 = b4()) == null ? void 0 : r6.config) == null ? void 0 : i5.get) == null ? void 0 : a3.call(i5, "user.language_code"));
        if (typeof o7 == "string" && o7) return o7.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    K2 = () => H4() === "en";
    l5 = (t3, e5) => K2() ? e5 : t3;
    w5 = (t3, e5 = "") => {
      if (t3 == null) return e5;
      if (typeof t3 == "string") {
        const r6 = t3.trim();
        if (r6.startsWith("{") && r6.endsWith("}"))
          try {
            return w5(JSON.parse(r6), e5);
          } catch {
          }
        return r6 || e5;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const r6 = t3, i5 = r6[H4()] ?? r6.ar ?? r6.en ?? Object.values(r6).find((a3) => typeof a3 == "string" && a3);
        return typeof i5 == "string" && i5.trim() ? i5 : e5;
      }
      return e5;
    };
    x4 = (t3, e5 = "") => {
      const r6 = Array.isArray(t3) ? t3[0] : t3, i5 = typeof r6 == "object" && r6 ? r6.value : r6;
      return i5 == null || i5 === "" ? e5 : String(i5);
    };
    p5 = (t3, e5 = 0) => {
      const r6 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(r6) ? e5 : r6;
    };
    f4 = (t3, e5 = false) => t3 == null || t3 === "" ? e5 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    m4 = (t3) => {
      const e5 = typeof t3 == "object" && t3 ? t3.amount : t3, r6 = Number(e5);
      return Number.isFinite(r6) ? r6 : 0;
    };
    X3 = (t3) => {
      if (!t3) return null;
      const e5 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(e5) && e5 > Date.now() ? e5 : null;
    };
    Q3 = (t3) => (Array.isArray(t3) ? t3 : []).map((e5) => Number(typeof e5 == "object" && e5 ? e5.value : e5)).filter((e5) => Number.isFinite(e5) && e5 > 0);
    y6 = /* @__PURE__ */ new Map();
    $5 = (t3) => {
      var e5, r6;
      try {
        const i5 = (r6 = (e5 = b4()) == null ? void 0 : e5.money) == null ? void 0 : r6.call(e5, t3);
        if (i5) return String(i5);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${l5("\u0631.\u0633", "SAR")}`;
    };
    at4 = (t3, e5) => {
      var r6, i5, a3;
      try {
        (a3 = (i5 = (r6 = b4()) == null ? void 0 : r6.event) == null ? void 0 : i5.on) == null || a3.call(i5, t3, e5);
      } catch {
      }
    };
    C4 = "tw_smart_mem_v1";
    L5 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    E6 = (t3, e5 = 1) => z4((r6) => {
      r6.seen[t3.id] = (r6.seen[t3.id] || 0) + e5, r6.prices = [...r6.prices.slice(-29), t3.price], t3.category && (r6.tags[t3.category] = (r6.tags[t3.category] || 0) + e5);
    });
    st4 = (t3, e5) => z4((r6) => {
      r6.answers[t3] = e5;
    });
    P5 = false;
    ct4 = () => {
      const t3 = innerWidth, e5 = navigator.userAgent;
      return /iPad|Tablet/i.test(e5) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e5) || t3 < 700 ? "mobile" : "desktop";
    };
    lt4 = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    dt4 = Object.defineProperty;
    ut4 = (t3, e5, r6, i5) => {
      for (var a3 = void 0, o7 = t3.length - 1, n5; o7 >= 0; o7--)
        (n5 = t3[o7]) && (a3 = n5(e5, r6, a3) || a3);
      return a3 && dt4(e5, r6, a3), a3;
    };
    gt4 = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    T4 = /* @__PURE__ */ new Set();
    pt4 = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    ft4 = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    M7 = class M8 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), ot4(), nt4();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((e5) => {
          var r6;
          e5.some((i5) => i5.isIntersecting) && (this.setAttribute("in", ""), (r6 = this.io) == null || r6.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var e5;
        super.disconnectedCallback(), (e5 = this.io) == null || e5.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const e5 = this.c, r6 = Date.now(), i5 = Date.parse(String(e5.s_from || "")), a3 = Date.parse(String(e5.s_to || ""));
        if (Number.isFinite(i5) && r6 < i5 || Number.isFinite(a3) && r6 > a3) return true;
        const o7 = ct4();
        return !!(f4(e5.s_hide_mobile) && o7 === "mobile" || f4(e5.s_hide_desktop) && o7 !== "mobile");
      }
      vars(e5 = "") {
        const r6 = this.c, i5 = [], a3 = (n5, c4) => {
          c4 !== "" && c4 != null && i5.push(`${n5}:${c4}`);
        };
        a3("--a", r6.s_accent || ""), a3("--a2", r6.s_accent2 || ""), a3("--bgc", r6.s_bg || ""), a3("--fgc", r6.s_text || ""), a3("--cardc", r6.s_card || ""), a3("--r", `${p5(r6.s_radius, 22)}px`), a3("--gap", `${p5(r6.s_gap, 18)}px`), a3("--ts", `${p5(r6.s_title_size, 38)}px`), a3("--fs", `${p5(r6.s_text_size, 16)}px`), a3("--pt", `${p5(r6.s_pad_top, 56)}px`), a3("--pb", `${p5(r6.s_pad_bottom, 56)}px`), a3("--maxw", pt4[x4(r6.s_width, "normal")] ?? "1240px"), a3("--sh", ft4[Math.max(0, Math.min(5, p5(r6.s_shadow, 2)))]), a3("--ms", `${p5(r6.s_anim_ms, 700)}ms`), a3("--ov", String(p5(r6.s_overlay, 45) / 100)), r6.s_bg_image && a3("--bgimg", `url("${String(r6.s_bg_image)}")`);
        const o7 = ht4(x4(r6.s_font, "inherit"));
        return o7 && a3("font-family", `'${o7}', inherit`), i5.join(";") + (e5 ? ";" + e5 : "");
      }
      cls() {
        const e5 = this.c;
        return [
          "sec",
          `th-${x4(e5.s_theme, "auto")}`,
          `al-${x4(e5.s_align, "start")}`,
          `an-${x4(e5.s_anim, "rise")}`,
          `pt-${x4(e5.s_pattern, "none")}`,
          `bs-${x4(e5.s_btn_style, "pill")}`,
          f4(e5.s_border) ? "bordered" : "",
          f4(e5.s_stagger, true) ? "stagger" : "",
          e5.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(e5, r6 = {}, i5 = "", a3 = "", o7 = true) {
        if (this.hiddenNow()) return A;
        const n5 = this.c, c4 = w5(n5.eyebrow, r6.eyebrow ?? ""), s4 = w5(n5.title, r6.title ?? ""), u3 = w5(n5.subtitle, r6.sub ?? ""), g2 = o7 && f4(n5.s_show_head, true) && (c4 || s4 || u3);
        return b2`<section class="${this.cls()} ${i5}" style=${this.vars(a3)} id=${String(n5.s_anchor || "") || A}>
      <div class="wrap">${g2 ? b2`<header class="head">${c4 ? b2`<span class="eyebrow">${c4}</span>` : ""}${s4 ? b2`<h2 class="title">${s4}</h2>` : ""}${u3 ? b2`<p class="sub">${u3}</p>` : ""}</header>` : ""}
      ${e5}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(e5) {
        const r6 = e5.filter(Boolean);
        return !r6.length || !lt4() || !f4(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${l5("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${r6.map((i5) => b2`<li>${i5}</li>`)}</ul></aside>`;
      }
      card(e5, r6 = {}) {
        var i5;
        return b2`<article class="pc ${e5.available ? "" : "oos"}">
      <a class="ph" href=${e5.url} @click=${() => E6(e5)}><img src=${e5.image} alt=${e5.name} loading="lazy" />${(i5 = r6.badges) != null && i5.length ? b2`<span class="badges">${r6.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e5.url} @click=${() => E6(e5)}>${e5.name}</a>
        <div class="pr"><b>${$5(e5.price)}</b>${e5.regular > e5.price ? b2`<s>${$5(e5.regular)}</s>` : ""}</div>
        ${r6.rating !== false && e5.rating > 0 ? b2`<div class="rt">★ ${e5.rating.toFixed(1)}${e5.ratingCount ? b2` <small>(${e5.ratingCount})</small>` : ""}</div>` : ""}
        ${r6.extra ?? ""}
        ${r6.quick !== false ? b2`<button class="btn sm" ?disabled=${!e5.available} @click=${() => this.add(e5)}>${e5.available ? l5("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : l5("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(e5, r6 = 1, i5) {
        E6(e5, 3), await et3(e5.id, r6, i5) ? rt3(l5("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = e5.url;
      }
    };
    M7.base = i`
  :host { display: block; font-family: inherit; direction: inherit;
    --A: var(--a, var(--color-primary, #b88a44)); --A2: var(--a2, color-mix(in srgb, var(--A) 55%, #000)); --BG: var(--bgc, transparent); --FG: var(--fgc, inherit); --CARD: var(--cardc, #fff); --LINE: color-mix(in srgb, currentColor 14%, transparent); }
  :host([hidden]) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .sec { position: relative; background: var(--BG); color: var(--FG); font-size: var(--fs, 16px); overflow: hidden; isolation: isolate; }
  .sec.has-img::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--bgimg) center/cover no-repeat; }
  .sec.has-img::after { content: ''; position: absolute; inset: 0; z-index: -1; background: #000; opacity: var(--ov, .45); }
  .th-light { --BG: var(--bgc, #fff); --FG: var(--fgc, #17140f); --CARD: var(--cardc, #faf8f4); }
  .th-ivory { --BG: var(--bgc, #f7f2e9); --FG: var(--fgc, #1d160c); --CARD: var(--cardc, #fffdf8); }
  .th-dark { --BG: var(--bgc, #111014); --FG: var(--fgc, #f4efe6); --CARD: var(--cardc, #1c1b22); }
  .th-midnight { --BG: var(--bgc, radial-gradient(900px 500px at 85% -10%, #2c1d55 0, transparent 60%), #0f0c18); --FG: var(--fgc, #f6f1e7); --CARD: var(--cardc, #19142d); }
  .th-glass { --BG: var(--bgc, linear-gradient(135deg, color-mix(in srgb, var(--A) 14%, #fff), #fff 60%)); --FG: var(--fgc, #15130f); --CARD: var(--cardc, rgba(255,255,255,.6)); }
  .th-glass .pc, .th-glass .panel { backdrop-filter: blur(14px); }
  .th-accent { --BG: var(--bgc, linear-gradient(135deg, var(--A), var(--A2))); --FG: var(--fgc, #fff); --CARD: var(--cardc, rgba(255,255,255,.12)); }
  .th-dark, .th-midnight, .th-accent { --LINE: rgba(255,255,255,.14); }
  .pt-dots { background-image: radial-gradient(color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1.4px), var(--BG); background-size: 18px 18px, auto; }
  .pt-grid { background-image: linear-gradient(var(--LINE) 1px, transparent 1px), linear-gradient(90deg, var(--LINE) 1px, transparent 1px), var(--BG); background-size: 36px 36px, 36px 36px, auto; }
  .pt-arabesque { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23999' stroke-opacity='.18'/%3E%3C/svg%3E"), var(--BG); }
  .pt-waves { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10q20-10 40 0t40 0' fill='none' stroke='%23999' stroke-opacity='.2'/%3E%3C/svg%3E"), var(--BG); }
  .wrap { max-width: var(--maxw, 1240px); margin: 0 auto; padding: var(--pt, 56px) clamp(16px, 4vw, 32px) var(--pb, 56px); }
  .head { margin-bottom: calc(var(--gap, 18px) * 1.4); }
  .al-center .head { text-align: center; } .al-center .head .sub { margin-inline: auto; } .al-end .head { text-align: end; }
  .eyebrow { display: inline-block; letter-spacing: .2em; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--A); margin-bottom: 10px; }
  .th-accent .eyebrow { color: inherit; opacity: .85; }
  h2.title { margin: 0 0 8px; font-size: clamp(22px, calc(var(--ts, 38px) * .62 + 1.2vw), var(--ts, 38px)); line-height: 1.25; font-weight: 800; }
  .sub { margin: 0; opacity: .72; line-height: 1.8; max-width: 720px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; text-decoration: none; font: inherit; font-weight: 700;
    padding: 13px 24px; border-radius: 999px; background: var(--A); color: #fff; transition: transform .25s, box-shadow .25s, opacity .2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--A); } .btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn.ghost { background: transparent; color: inherit; border: 1.5px solid currentColor; } .btn.sm { padding: 9px 16px; font-size: 14px; }
  .th-accent .btn:not(.ghost) { background: #fff; color: var(--A2); }
  .bs-rounded .btn { border-radius: 12px; } .bs-square .btn { border-radius: 0; } .bs-outline .btn:not(.ghost) { background: transparent; color: var(--A); border: 1.5px solid var(--A); }
  .bs-underline .btn { background: none; color: var(--A); padding-inline: 0; border-radius: 0; border-bottom: 2px solid var(--A); }
  .bordered .pc, .bordered .panel { border: 1px solid var(--LINE); }
  .panel { background: var(--CARD); border-radius: var(--r, 22px); box-shadow: var(--sh); padding: clamp(16px, 2.4vw, 28px); }
  .grid { display: grid; gap: var(--gap, 18px); grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); }
  @media (max-width: 860px) { .grid { grid-template-columns: repeat(var(--mcols, 2), minmax(0, 1fr)); } }
  .rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(220px, calc((100% - var(--gap) * (var(--cols, 4) - 1)) / var(--cols, 4))); gap: var(--gap, 18px); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; }
  @media (max-width: 860px) { .rail { grid-auto-columns: calc((100% - var(--gap)) / var(--mcols, 2) - 8px); } }
  .rail > * { scroll-snap-align: start; }
  .pc { position: relative; display: flex; flex-direction: column; background: var(--CARD); border-radius: var(--r, 22px); overflow: hidden; box-shadow: var(--sh); transition: transform .35s; color: inherit; }
  .pc:hover { transform: translateY(-4px); } .pc.oos { opacity: .55; }
  .ph { position: relative; display: block; aspect-ratio: var(--ratio, 1); background: color-mix(in srgb, currentColor 6%, transparent); }
  .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badges { position: absolute; inset: 10px 10px auto 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .bdg { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px; background: var(--A); color: #fff; line-height: 1.4; }
  .bdg.alt { background: #111; } .bdg.ok { background: #15803d; } .bdg.warn { background: #b45309; } .bdg.soft { background: #fff; color: #111; }
  .pb { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
  .pn { color: inherit; text-decoration: none; font-weight: 700; line-height: 1.5; font-size: .95em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; } .pr b { color: var(--A); } .th-accent .pr b { color: inherit; } .pr s { opacity: .5; font-size: .85em; }
  .rt { font-size: 13px; color: #d4a017; } .rt small { opacity: .7; color: inherit; }
  .pb .btn { margin-top: auto; width: 100%; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--LINE); background: var(--CARD); color: inherit; font: inherit; font-size: 14px; cursor: pointer; transition: all .25s; }
  .chip:hover { border-color: var(--A); } .chip.on { background: var(--A); border-color: var(--A); color: #fff; }
  .muted { opacity: .65; } .center { text-align: center; }
  .skel { background: linear-gradient(90deg, #8881 0, #8882 50%, #8881 100%); background-size: 200% 100%; animation: sk 1.4s infinite; border-radius: var(--r, 22px); min-height: 220px; }
  @keyframes sk { to { background-position: -200% 0; } }
  .hints { margin: 0 0 18px; padding: 14px 18px; border-radius: 14px; background: #fff8e1; color: #5b4300; border: 1px dashed #e0b84a; font-size: 13px; line-height: 1.8; }
  .hints ul { margin: 6px 0 0; padding-inline-start: 18px; }
  /* reveal motion */
  .sec .wrap > * { transition: opacity var(--ms, .7s) ease, transform var(--ms, .7s) cubic-bezier(.2,.7,.2,1), filter var(--ms, .7s); }
  :host(:not([in])) .an-fade .wrap > * { opacity: 0; }
  :host(:not([in])) .an-rise .wrap > * { opacity: 0; transform: translateY(28px); }
  :host(:not([in])) .an-zoom .wrap > * { opacity: 0; transform: scale(.94); }
  :host(:not([in])) .an-blur .wrap > * { opacity: 0; filter: blur(12px); }
  :host(:not([in])) .an-slide .wrap > * { opacity: 0; transform: translateX(40px); }
  .stagger .wrap > *:nth-child(2) { transition-delay: .08s; } .stagger .wrap > *:nth-child(3) { transition-delay: .16s; } .stagger .wrap > *:nth-child(4) { transition-delay: .24s; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } :host .sec .wrap > * { opacity: 1 !important; transform: none !important; filter: none !important; } }
  `;
    k4 = M7;
    ut4([
      n4({ type: Object })
    ], k4.prototype, "config");
    N5 = ["price", "rating", "discount", "popular", "reviews", "stock"];
    bt4 = (t3) => ({ price: l5("\u0627\u0644\u0633\u0639\u0631", "Price"), rating: l5("\u0627\u0644\u062A\u0642\u064A\u064A\u0645", "Rating"), discount: l5("\u0627\u0644\u062E\u0635\u0645", "Discount"), stock: l5("\u0627\u0644\u062A\u0648\u0641\u0631", "Availability"), popular: l5("\u0627\u0644\u0637\u0644\u0628 \u0639\u0644\u064A\u0647", "Popularity"), reviews: l5("\u0639\u062F\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0627\u062A", "Reviews") })[t3];
    mt4 = (t3, e5) => e5 === "price" ? t3.price : e5 === "rating" ? t3.rating || null : e5 === "discount" ? t3.discount : e5 === "stock" ? t3.available ? t3.qty == null ? 100 : Math.min(100, t3.qty) : 0 : e5 === "popular" ? t3.sold : t3.ratingCount || null;
    yt4 = Object.defineProperty;
    G3 = (t3, e5, r6, i5) => {
      for (var a3 = void 0, o7 = t3.length - 1, n5; o7 >= 0; o7--)
        (n5 = t3[o7]) && (a3 = n5(e5, r6, a3) || a3);
      return a3 && yt4(e5, r6, a3), a3;
    };
    q2 = class q3 extends k4 {
      constructor() {
        super(...arguments), this.pool = [], this.sel = [], this.open = false, this.seq = 0;
      }
      willUpdate(e5) {
        if (!e5.has("config")) return;
        const r6 = ++this.seq, i5 = this.c;
        tt3(i5.products, x4(i5.auto_source, "best_selling"), p5(i5.limit, 8)).then((a3) => {
          if (r6 !== this.seq) return;
          this.pool = a3.items;
          let o7 = [];
          try {
            o7 = JSON.parse(S5().answers.faisal_pick || "[]");
          } catch {
          }
          if (o7 = o7.filter((n5) => a3.items.some((c4) => c4.id === n5)), !o7.length && f4(i5.preselect_seen, true)) {
            const n5 = S5().seen;
            o7 = a3.items.filter((c4) => n5[c4.id]).sort((c4, s4) => (n5[s4.id] || 0) - (n5[c4.id] || 0)).slice(0, 2).map((c4) => c4.id);
          }
          this.sel = o7.slice(0, this.max), this.open = f4(i5.auto_open, true) && this.sel.length >= 2;
        });
      }
      get max() {
        return Math.max(2, p5(this.c.max_pick, 3));
      }
      toggle(e5) {
        const r6 = this.sel.includes(e5.id) ? this.sel.filter((i5) => i5 !== e5.id) : this.sel.length >= this.max ? [...this.sel.slice(1), e5.id] : [...this.sel, e5.id];
        this.sel = r6, r6.length < 2 && (this.open = false), st4("faisal_pick", JSON.stringify(r6));
      }
      render() {
        const e5 = this.c;
        if (!this.pool.length) return this.shell(b2`<div class="skel"></div>`);
        const r6 = this.sel.map((s4) => this.pool.find((u3) => u3.id === s4)).filter(Boolean), i5 = N5.filter((s4) => f4(e5[`m_${s4}`], s4 !== "reviews")), a3 = Object.fromEntries(i5.map((s4) => [s4, p5(e5[`w_${s4}`], s4 === "price" || s4 === "rating" ? 3 : 1)])), o7 = r6.length >= 2 ? vt4(r6, a3) : [], n5 = new Map(o7.map((s4) => [s4.p.id, s4])), c4 = (s4, u3) => u3 === "price" ? $5(s4.price) : u3 === "rating" ? s4.rating ? `${s4.rating.toFixed(1)}\u2605` : "\u2014" : u3 === "discount" ? s4.discount ? `${s4.discount}%` : "\u2014" : u3 === "popular" ? s4.sold ?? "\u2014" : u3 === "reviews" ? s4.ratingCount || "\u2014" : s4.available ? "\u2713" : "\u2715";
        return this.shell(
          b2`
      <p class="hint">${w5(e5.hint, l5(`\u0627\u062E\u062A\u0631 \u062D\u062A\u0649 ${this.max} \u0645\u0646\u062A\u062C\u0627\u062A \u0628\u0627\u0644\u0636\u063A\u0637 \u0639\u0644\u0649 \u2713`, `Tap \u2713 on up to ${this.max} products`))}${this.sel.length && !this.open && f4(e5.preselect_seen, true) ? l5(" \u2014 \u0627\u062E\u062A\u0631\u0646\u0627 \u0644\u0643 \u0645\u0627 \u0634\u0627\u0647\u062F\u062A\u0647 \u0645\u0624\u062E\u0631\u0627\u064B", " \u2014 we pre-picked what you viewed") : ""}</p>
      <div class="grid">${this.pool.map((s4) => b2`<div class="pick ${this.sel.includes(s4.id) ? "on" : ""}"><button class="tick" aria-pressed=${this.sel.includes(s4.id)} @click=${() => this.toggle(s4)}>${this.sel.includes(s4.id) ? this.sel.indexOf(s4.id) + 1 : "+"}</button>${this.card(s4, { quick: f4(e5.quick_add, true) })}</div>`)}</div>
      ${this.sel.length ? b2`<div class="tray"><div class="th">${r6.map((s4) => b2`<img src=${s4.image} alt=${s4.name} />`)}</div><span>${l5(`${r6.length} \u0645\u0646 ${this.max}`, `${r6.length} of ${this.max}`)}</span>
        <button class="btn" ?disabled=${r6.length < 2} @click=${() => this.open = !this.open}>${this.open ? l5("\u0625\u062E\u0641\u0627\u0621 \u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629", "Hide") : w5(e5.cta, l5("\u0642\u0627\u0631\u0646 \u0627\u0644\u0622\u0646", "Compare now"))}</button></div>` : ""}
      ${this.open && o7.length ? b2`<div class="panel res"><table><thead><tr><th></th>${r6.map((s4) => b2`<th class=${s4.id === o7[0].p.id ? "w" : ""}>${s4.name}</th>`)}</tr></thead><tbody>
        ${i5.map((s4) => {
            const u3 = Math.max(...r6.map((g2) => n5.get(g2.id).parts[s4] ?? -1));
            return b2`<tr><td>${bt4(s4)}</td>${r6.map((g2) => b2`<td class="${g2.id === o7[0].p.id ? "w" : ""} ${n5.get(g2.id).parts[s4] === u3 && u3 >= 0 ? "ok" : ""}">${c4(g2, s4)}</td>`)}</tr>`;
          })}
        ${f4(e5.show_score, true) ? b2`<tr><td>${l5("\u0627\u0644\u0646\u062A\u064A\u062C\u0629", "Score")}</td>${r6.map((s4) => b2`<td class=${s4.id === o7[0].p.id ? "w" : ""}>${n5.get(s4.id).score}%</td>`)}</tr>` : ""}
        <tr><td></td>${r6.map((s4) => b2`<td><button class="btn sm" ?disabled=${!s4.available} @click=${() => this.add(s4)}>${l5("\u0623\u0636\u0641", "Add")}</button></td>`)}</tr></tbody></table>
        <div class="verdict">🏆 ${o7[0].p.name} — ${wt4(o7[0], o7.slice(1), a3)}</div></div>` : ""}`,
          { eyebrow: l5("\u0627\u062E\u062A\u0631 \u0648\u0642\u0627\u0631\u0646", "Pick & compare"), title: l5("\u0645\u062D\u062A\u0627\u0631 \u0628\u064A\u0646\u0647\u0645\u061F \u0642\u0627\u0631\u0646 \u0628\u0646\u0641\u0633\u0643", "Torn between them? Compare") }
        );
      }
    };
    q2.styles = [k4.base, i`
    .pick { position: relative; } .pick .tick { position: absolute; top: 10px; inset-inline-start: 10px; z-index: 2; width: 32px; height: 32px; border-radius: 50%; border: 2px solid #fff; background: #0005; color: #fff; display: grid; place-items: center; font-weight: 900; cursor: pointer; backdrop-filter: blur(4px); }
    .pick.on .tick { background: var(--A); } .pick.on .card { outline: 3px solid var(--A); outline-offset: -3px; }
    .tray { position: sticky; bottom: 12px; z-index: 5; margin-top: 18px; display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; padding: 12px 16px; border-radius: 18px; background: var(--CARD); box-shadow: 0 12px 40px #0003; border: 1px solid var(--LINE); }
    .tray .th { display: flex; gap: 8px; } .tray img { width: 46px; height: 46px; border-radius: 12px; object-fit: cover; }
    .res { margin-top: 18px; overflow-x: auto; } table { width: 100%; border-collapse: collapse; min-width: 480px; } td, th { padding: 10px; border-bottom: 1px solid var(--LINE); text-align: center; } td:first-child, th:first-child { text-align: start; opacity: .8; }
    .w { background: color-mix(in srgb, var(--A) 10%, transparent); font-weight: 800; } .ok { color: #15803d; font-weight: 800; }
    .verdict { margin-top: 12px; font-weight: 800; padding: 12px 16px; border-radius: 14px; background: color-mix(in srgb, var(--A) 10%, transparent); }
    .hint { font-size: 13px; opacity: .75; margin: -6px 0 14px; }
  `];
    v5 = q2;
    G3([
      r5()
    ], v5.prototype, "pool");
    G3([
      r5()
    ], v5.prototype, "sel");
    G3([
      r5()
    ], v5.prototype, "open");
    typeof v5 < "u" && v5.registerSallaComponent("salla-faisal-picker");
  }
});

// dist/faisal-value.js
var faisal_value_exports = {};
__export(faisal_value_exports, {
  default: () => y7
});
function T5(t3) {
  var l6, g2, f5, p6, s4, u3, k5, E7, j5;
  const r6 = v6(t3 == null ? void 0 : t3.sale_price), e5 = v6((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), i5 = r6 && r6 < e5 ? r6 : v6(t3 == null ? void 0 : t3.price) || e5, a3 = Math.max(v6(t3 == null ? void 0 : t3.regular_price), v6(t3 == null ? void 0 : t3.price), i5), n5 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((A4) => String((A4 == null ? void 0 : A4.url) ?? A4 ?? "")).filter(Boolean), o7 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((l6 = t3 == null ? void 0 : t3.image) == null ? void 0 : l6.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? n5[0] ?? ""),
    images: n5,
    price: i5,
    regular: a3,
    discount: a3 > i5 ? Math.round((1 - i5 / a3) * 100) : 0,
    rating: v6(((g2 = t3 == null ? void 0 : t3.rating) == null ? void 0 : g2.stars) ?? ((f5 = t3 == null ? void 0 : t3.rating) == null ? void 0 : f5.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: v6((p6 = t3 == null ? void 0 : t3.rating) == null ? void 0 : p6.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : v6(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: o7 == null || o7 === "" || !Number.isFinite(Number(o7)) ? null : Number(o7),
    endsAt: Z5((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((s4 = t3 == null ? void 0 : t3.category) == null ? void 0 : s4.name) ?? ((k5 = (u3 = t3 == null ? void 0 : t3.categories) == null ? void 0 : u3[0]) == null ? void 0 : k5.name) ?? ""),
    brand: String(((E7 = t3 == null ? void 0 : t3.brand) == null ? void 0 : E7.name) ?? ""),
    promo: String(((j5 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : j5.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function V5(t3) {
  var i5, a3, n5;
  const r6 = (i5 = m5()) == null ? void 0 : i5.product;
  if (!r6) return null;
  const e5 = r6.getDetails ? r6.getDetails.bind(r6) : (n5 = (a3 = r6.api) == null ? void 0 : a3.getDetails) == null ? void 0 : n5.bind(r6.api);
  if (!e5) return null;
  try {
    const o7 = await e5(t3, ["images", "sold_quantity", "category"]), l6 = T5((o7 == null ? void 0 : o7.data) ?? o7);
    return l6.name ? l6 : null;
  } catch {
    return null;
  }
}
async function tt4(t3) {
  await N6();
  const r6 = "ids:" + t3.join(",");
  return w6.has(r6) || w6.set(r6, Promise.all(t3.map(V5)).then((e5) => e5.filter((i5) => !!i5))), w6.get(r6);
}
async function F3(t3, r6 = [], e5 = 12) {
  await N6();
  const i5 = `src:${t3}:${r6.join(",")}:${e5}`;
  return w6.has(i5) || w6.set(i5, (async () => {
    var o7, l6, g2, f5;
    const a3 = (o7 = m5()) == null ? void 0 : o7.product, n5 = a3 != null && a3.fetch ? a3.fetch.bind(a3) : (g2 = (l6 = a3 == null ? void 0 : a3.api) == null ? void 0 : l6.fetch) == null ? void 0 : g2.bind(a3.api);
    if (!n5) return [];
    try {
      const p6 = { source: t3, per_page: e5 };
      r6.length && (p6.source_value = r6);
      const s4 = await n5(p6);
      return (Array.isArray(s4 == null ? void 0 : s4.data) ? s4.data : Array.isArray(s4) ? s4 : ((f5 = s4 == null ? void 0 : s4.data) == null ? void 0 : f5.products) ?? []).map(T5).filter((k5) => k5.name).slice(0, e5);
    } catch {
      return [];
    }
  })()), w6.get(i5);
}
async function rt4(t3, r6 = "best_selling", e5 = 12) {
  const i5 = W4(t3);
  if (i5.length) return { items: (await tt4(i5)).slice(0, e5), auto: false };
  let a3 = await F3(r6, [], e5);
  return !a3.length && r6 !== "latest" && (a3 = await F3("latest", [], e5)), { items: a3, auto: true };
}
async function et4(t3, r6 = 1, e5) {
  var i5, a3, n5;
  await N6();
  try {
    return await ((n5 = (a3 = (i5 = m5()) == null ? void 0 : i5.cart) == null ? void 0 : a3.addItem) == null ? void 0 : n5.call(a3, e5 ? { id: t3, quantity: r6, notes: e5 } : { id: t3, quantity: r6 })), true;
  } catch {
    return false;
  }
}
function at5(t3, r6 = true) {
  var e5, i5, a3;
  try {
    (a3 = r6 ? (e5 = m5()) == null ? void 0 : e5.success : (i5 = m5()) == null ? void 0 : i5.error) == null || a3(t3);
  } catch {
  }
}
function U2() {
  try {
    return { ...B5(), ...JSON.parse(localStorage.getItem(S6) || "{}") };
  } catch {
    return B5();
  }
}
function nt5(t3) {
  try {
    localStorage.setItem(S6, JSON.stringify(t3));
  } catch {
  }
}
function D6(t3) {
  const r6 = U2();
  return t3(r6), nt5(r6), r6;
}
function st5() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(S6), sessionStorage.setItem(S6, "1");
  } catch {
  }
  return t3 ? D6((r6) => {
    r6.visits += 1, r6.last = Date.now();
  }) : U2();
}
function ot5() {
  M9 || (M9 = true, it5("cart::item.added", (t3) => {
    var e5;
    const r6 = Number(((e5 = t3 == null ? void 0 : t3.data) == null ? void 0 : e5.product_id) ?? 0);
    r6 && D6((i5) => {
      i5.carted.includes(r6) || (i5.carted = [...i5.carted.slice(-40), r6]);
    });
  }));
}
function gt5(t3) {
  const r6 = ut5[t3];
  if (!r6 || R5.has(r6)) return r6;
  R5.add(r6);
  const e5 = document.createElement("link");
  return e5.rel = "stylesheet", e5.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(r6)}:wght@400;500;700;800&display=swap`, document.head.appendChild(e5), r6;
}
function mt5(t3) {
  const r6 = t3.replace(/[٠-٩]/g, (e5) => String("\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669".indexOf(e5)));
  for (const [e5, i5, a3] of bt5) {
    const n5 = r6.match(e5);
    if (n5) return { amt: parseFloat(n5[1].replace(",", ".")) * a3, unit: i5 };
  }
  return null;
}
var m5, N6, P6, X4, d3, $6, b5, h3, x5, Q4, v6, Z5, W4, w6, C5, it5, S6, B5, z5, M9, ct5, H5, lt5, dt5, ut5, R5, ht5, ft5, G4, _3, pt5, J2, bt5, I6, y7;
var init_faisal_value = __esm({
  "dist/faisal-value.js"() {
    "use strict";
    init_lit();
    init_decorators();
    m5 = () => window.salla ?? window.Salla;
    N6 = async () => {
      var t3, r6;
      try {
        await ((r6 = (t3 = m5()) == null ? void 0 : t3.onReady) == null ? void 0 : r6.call(t3));
      } catch {
      }
    };
    P6 = () => {
      var t3, r6, e5, i5, a3;
      try {
        const n5 = ((r6 = (t3 = m5()) == null ? void 0 : t3.lang) == null ? void 0 : r6.locale) ?? ((a3 = (i5 = (e5 = m5()) == null ? void 0 : e5.config) == null ? void 0 : i5.get) == null ? void 0 : a3.call(i5, "user.language_code"));
        if (typeof n5 == "string" && n5) return n5.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    X4 = () => P6() === "en";
    d3 = (t3, r6) => X4() ? r6 : t3;
    $6 = (t3, r6 = "") => {
      if (t3 == null) return r6;
      if (typeof t3 == "string") {
        const e5 = t3.trim();
        if (e5.startsWith("{") && e5.endsWith("}"))
          try {
            return $6(JSON.parse(e5), r6);
          } catch {
          }
        return e5 || r6;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const e5 = t3, i5 = e5[P6()] ?? e5.ar ?? e5.en ?? Object.values(e5).find((a3) => typeof a3 == "string" && a3);
        return typeof i5 == "string" && i5.trim() ? i5 : r6;
      }
      return r6;
    };
    b5 = (t3, r6 = "") => {
      const e5 = Array.isArray(t3) ? t3[0] : t3, i5 = typeof e5 == "object" && e5 ? e5.value : e5;
      return i5 == null || i5 === "" ? r6 : String(i5);
    };
    h3 = (t3, r6 = 0) => {
      const e5 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(e5) ? r6 : e5;
    };
    x5 = (t3, r6 = false) => t3 == null || t3 === "" ? r6 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    Q4 = (t3) => Array.isArray(t3) ? t3 : [];
    v6 = (t3) => {
      const r6 = typeof t3 == "object" && t3 ? t3.amount : t3, e5 = Number(r6);
      return Number.isFinite(e5) ? e5 : 0;
    };
    Z5 = (t3) => {
      if (!t3) return null;
      const r6 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(r6) && r6 > Date.now() ? r6 : null;
    };
    W4 = (t3) => (Array.isArray(t3) ? t3 : []).map((r6) => Number(typeof r6 == "object" && r6 ? r6.value : r6)).filter((r6) => Number.isFinite(r6) && r6 > 0);
    w6 = /* @__PURE__ */ new Map();
    C5 = (t3) => {
      var r6, e5;
      try {
        const i5 = (e5 = (r6 = m5()) == null ? void 0 : r6.money) == null ? void 0 : e5.call(r6, t3);
        if (i5) return String(i5);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${d3("\u0631.\u0633", "SAR")}`;
    };
    it5 = (t3, r6) => {
      var e5, i5, a3;
      try {
        (a3 = (i5 = (e5 = m5()) == null ? void 0 : e5.event) == null ? void 0 : i5.on) == null || a3.call(i5, t3, r6);
      } catch {
      }
    };
    S6 = "tw_smart_mem_v1";
    B5 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    z5 = (t3, r6 = 1) => D6((e5) => {
      e5.seen[t3.id] = (e5.seen[t3.id] || 0) + r6, e5.prices = [...e5.prices.slice(-29), t3.price], t3.category && (e5.tags[t3.category] = (e5.tags[t3.category] || 0) + r6);
    });
    M9 = false;
    ct5 = () => {
      const t3 = innerWidth, r6 = navigator.userAgent;
      return /iPad|Tablet/i.test(r6) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(r6) || t3 < 700 ? "mobile" : "desktop";
    };
    H5 = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    lt5 = Object.defineProperty;
    dt5 = (t3, r6, e5, i5) => {
      for (var a3 = void 0, n5 = t3.length - 1, o7; n5 >= 0; n5--)
        (o7 = t3[n5]) && (a3 = o7(r6, e5, a3) || a3);
      return a3 && lt5(r6, e5, a3), a3;
    };
    ut5 = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    R5 = /* @__PURE__ */ new Set();
    ht5 = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    ft5 = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    G4 = class G5 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), ot5(), st5();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((r6) => {
          var e5;
          r6.some((i5) => i5.isIntersecting) && (this.setAttribute("in", ""), (e5 = this.io) == null || e5.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var r6;
        super.disconnectedCallback(), (r6 = this.io) == null || r6.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const r6 = this.c, e5 = Date.now(), i5 = Date.parse(String(r6.s_from || "")), a3 = Date.parse(String(r6.s_to || ""));
        if (Number.isFinite(i5) && e5 < i5 || Number.isFinite(a3) && e5 > a3) return true;
        const n5 = ct5();
        return !!(x5(r6.s_hide_mobile) && n5 === "mobile" || x5(r6.s_hide_desktop) && n5 !== "mobile");
      }
      vars(r6 = "") {
        const e5 = this.c, i5 = [], a3 = (o7, l6) => {
          l6 !== "" && l6 != null && i5.push(`${o7}:${l6}`);
        };
        a3("--a", e5.s_accent || ""), a3("--a2", e5.s_accent2 || ""), a3("--bgc", e5.s_bg || ""), a3("--fgc", e5.s_text || ""), a3("--cardc", e5.s_card || ""), a3("--r", `${h3(e5.s_radius, 22)}px`), a3("--gap", `${h3(e5.s_gap, 18)}px`), a3("--ts", `${h3(e5.s_title_size, 38)}px`), a3("--fs", `${h3(e5.s_text_size, 16)}px`), a3("--pt", `${h3(e5.s_pad_top, 56)}px`), a3("--pb", `${h3(e5.s_pad_bottom, 56)}px`), a3("--maxw", ht5[b5(e5.s_width, "normal")] ?? "1240px"), a3("--sh", ft5[Math.max(0, Math.min(5, h3(e5.s_shadow, 2)))]), a3("--ms", `${h3(e5.s_anim_ms, 700)}ms`), a3("--ov", String(h3(e5.s_overlay, 45) / 100)), e5.s_bg_image && a3("--bgimg", `url("${String(e5.s_bg_image)}")`);
        const n5 = gt5(b5(e5.s_font, "inherit"));
        return n5 && a3("font-family", `'${n5}', inherit`), i5.join(";") + (r6 ? ";" + r6 : "");
      }
      cls() {
        const r6 = this.c;
        return [
          "sec",
          `th-${b5(r6.s_theme, "auto")}`,
          `al-${b5(r6.s_align, "start")}`,
          `an-${b5(r6.s_anim, "rise")}`,
          `pt-${b5(r6.s_pattern, "none")}`,
          `bs-${b5(r6.s_btn_style, "pill")}`,
          x5(r6.s_border) ? "bordered" : "",
          x5(r6.s_stagger, true) ? "stagger" : "",
          r6.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(r6, e5 = {}, i5 = "", a3 = "", n5 = true) {
        if (this.hiddenNow()) return A;
        const o7 = this.c, l6 = $6(o7.eyebrow, e5.eyebrow ?? ""), g2 = $6(o7.title, e5.title ?? ""), f5 = $6(o7.subtitle, e5.sub ?? ""), p6 = n5 && x5(o7.s_show_head, true) && (l6 || g2 || f5);
        return b2`<section class="${this.cls()} ${i5}" style=${this.vars(a3)} id=${String(o7.s_anchor || "") || A}>
      <div class="wrap">${p6 ? b2`<header class="head">${l6 ? b2`<span class="eyebrow">${l6}</span>` : ""}${g2 ? b2`<h2 class="title">${g2}</h2>` : ""}${f5 ? b2`<p class="sub">${f5}</p>` : ""}</header>` : ""}
      ${r6}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(r6) {
        const e5 = r6.filter(Boolean);
        return !e5.length || !H5() || !x5(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${d3("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${e5.map((i5) => b2`<li>${i5}</li>`)}</ul></aside>`;
      }
      card(r6, e5 = {}) {
        var i5;
        return b2`<article class="pc ${r6.available ? "" : "oos"}">
      <a class="ph" href=${r6.url} @click=${() => z5(r6)}><img src=${r6.image} alt=${r6.name} loading="lazy" />${(i5 = e5.badges) != null && i5.length ? b2`<span class="badges">${e5.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${r6.url} @click=${() => z5(r6)}>${r6.name}</a>
        <div class="pr"><b>${C5(r6.price)}</b>${r6.regular > r6.price ? b2`<s>${C5(r6.regular)}</s>` : ""}</div>
        ${e5.rating !== false && r6.rating > 0 ? b2`<div class="rt">★ ${r6.rating.toFixed(1)}${r6.ratingCount ? b2` <small>(${r6.ratingCount})</small>` : ""}</div>` : ""}
        ${e5.extra ?? ""}
        ${e5.quick !== false ? b2`<button class="btn sm" ?disabled=${!r6.available} @click=${() => this.add(r6)}>${r6.available ? d3("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : d3("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(r6, e5 = 1, i5) {
        z5(r6, 3), await et4(r6.id, e5, i5) ? at5(d3("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = r6.url;
      }
    };
    G4.base = i`
  :host { display: block; font-family: inherit; direction: inherit;
    --A: var(--a, var(--color-primary, #b88a44)); --A2: var(--a2, color-mix(in srgb, var(--A) 55%, #000)); --BG: var(--bgc, transparent); --FG: var(--fgc, inherit); --CARD: var(--cardc, #fff); --LINE: color-mix(in srgb, currentColor 14%, transparent); }
  :host([hidden]) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .sec { position: relative; background: var(--BG); color: var(--FG); font-size: var(--fs, 16px); overflow: hidden; isolation: isolate; }
  .sec.has-img::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--bgimg) center/cover no-repeat; }
  .sec.has-img::after { content: ''; position: absolute; inset: 0; z-index: -1; background: #000; opacity: var(--ov, .45); }
  .th-light { --BG: var(--bgc, #fff); --FG: var(--fgc, #17140f); --CARD: var(--cardc, #faf8f4); }
  .th-ivory { --BG: var(--bgc, #f7f2e9); --FG: var(--fgc, #1d160c); --CARD: var(--cardc, #fffdf8); }
  .th-dark { --BG: var(--bgc, #111014); --FG: var(--fgc, #f4efe6); --CARD: var(--cardc, #1c1b22); }
  .th-midnight { --BG: var(--bgc, radial-gradient(900px 500px at 85% -10%, #2c1d55 0, transparent 60%), #0f0c18); --FG: var(--fgc, #f6f1e7); --CARD: var(--cardc, #19142d); }
  .th-glass { --BG: var(--bgc, linear-gradient(135deg, color-mix(in srgb, var(--A) 14%, #fff), #fff 60%)); --FG: var(--fgc, #15130f); --CARD: var(--cardc, rgba(255,255,255,.6)); }
  .th-glass .pc, .th-glass .panel { backdrop-filter: blur(14px); }
  .th-accent { --BG: var(--bgc, linear-gradient(135deg, var(--A), var(--A2))); --FG: var(--fgc, #fff); --CARD: var(--cardc, rgba(255,255,255,.12)); }
  .th-dark, .th-midnight, .th-accent { --LINE: rgba(255,255,255,.14); }
  .pt-dots { background-image: radial-gradient(color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1.4px), var(--BG); background-size: 18px 18px, auto; }
  .pt-grid { background-image: linear-gradient(var(--LINE) 1px, transparent 1px), linear-gradient(90deg, var(--LINE) 1px, transparent 1px), var(--BG); background-size: 36px 36px, 36px 36px, auto; }
  .pt-arabesque { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23999' stroke-opacity='.18'/%3E%3C/svg%3E"), var(--BG); }
  .pt-waves { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10q20-10 40 0t40 0' fill='none' stroke='%23999' stroke-opacity='.2'/%3E%3C/svg%3E"), var(--BG); }
  .wrap { max-width: var(--maxw, 1240px); margin: 0 auto; padding: var(--pt, 56px) clamp(16px, 4vw, 32px) var(--pb, 56px); }
  .head { margin-bottom: calc(var(--gap, 18px) * 1.4); }
  .al-center .head { text-align: center; } .al-center .head .sub { margin-inline: auto; } .al-end .head { text-align: end; }
  .eyebrow { display: inline-block; letter-spacing: .2em; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--A); margin-bottom: 10px; }
  .th-accent .eyebrow { color: inherit; opacity: .85; }
  h2.title { margin: 0 0 8px; font-size: clamp(22px, calc(var(--ts, 38px) * .62 + 1.2vw), var(--ts, 38px)); line-height: 1.25; font-weight: 800; }
  .sub { margin: 0; opacity: .72; line-height: 1.8; max-width: 720px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; text-decoration: none; font: inherit; font-weight: 700;
    padding: 13px 24px; border-radius: 999px; background: var(--A); color: #fff; transition: transform .25s, box-shadow .25s, opacity .2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--A); } .btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn.ghost { background: transparent; color: inherit; border: 1.5px solid currentColor; } .btn.sm { padding: 9px 16px; font-size: 14px; }
  .th-accent .btn:not(.ghost) { background: #fff; color: var(--A2); }
  .bs-rounded .btn { border-radius: 12px; } .bs-square .btn { border-radius: 0; } .bs-outline .btn:not(.ghost) { background: transparent; color: var(--A); border: 1.5px solid var(--A); }
  .bs-underline .btn { background: none; color: var(--A); padding-inline: 0; border-radius: 0; border-bottom: 2px solid var(--A); }
  .bordered .pc, .bordered .panel { border: 1px solid var(--LINE); }
  .panel { background: var(--CARD); border-radius: var(--r, 22px); box-shadow: var(--sh); padding: clamp(16px, 2.4vw, 28px); }
  .grid { display: grid; gap: var(--gap, 18px); grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); }
  @media (max-width: 860px) { .grid { grid-template-columns: repeat(var(--mcols, 2), minmax(0, 1fr)); } }
  .rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(220px, calc((100% - var(--gap) * (var(--cols, 4) - 1)) / var(--cols, 4))); gap: var(--gap, 18px); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; }
  @media (max-width: 860px) { .rail { grid-auto-columns: calc((100% - var(--gap)) / var(--mcols, 2) - 8px); } }
  .rail > * { scroll-snap-align: start; }
  .pc { position: relative; display: flex; flex-direction: column; background: var(--CARD); border-radius: var(--r, 22px); overflow: hidden; box-shadow: var(--sh); transition: transform .35s; color: inherit; }
  .pc:hover { transform: translateY(-4px); } .pc.oos { opacity: .55; }
  .ph { position: relative; display: block; aspect-ratio: var(--ratio, 1); background: color-mix(in srgb, currentColor 6%, transparent); }
  .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badges { position: absolute; inset: 10px 10px auto 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .bdg { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px; background: var(--A); color: #fff; line-height: 1.4; }
  .bdg.alt { background: #111; } .bdg.ok { background: #15803d; } .bdg.warn { background: #b45309; } .bdg.soft { background: #fff; color: #111; }
  .pb { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
  .pn { color: inherit; text-decoration: none; font-weight: 700; line-height: 1.5; font-size: .95em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; } .pr b { color: var(--A); } .th-accent .pr b { color: inherit; } .pr s { opacity: .5; font-size: .85em; }
  .rt { font-size: 13px; color: #d4a017; } .rt small { opacity: .7; color: inherit; }
  .pb .btn { margin-top: auto; width: 100%; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--LINE); background: var(--CARD); color: inherit; font: inherit; font-size: 14px; cursor: pointer; transition: all .25s; }
  .chip:hover { border-color: var(--A); } .chip.on { background: var(--A); border-color: var(--A); color: #fff; }
  .muted { opacity: .65; } .center { text-align: center; }
  .skel { background: linear-gradient(90deg, #8881 0, #8882 50%, #8881 100%); background-size: 200% 100%; animation: sk 1.4s infinite; border-radius: var(--r, 22px); min-height: 220px; }
  @keyframes sk { to { background-position: -200% 0; } }
  .hints { margin: 0 0 18px; padding: 14px 18px; border-radius: 14px; background: #fff8e1; color: #5b4300; border: 1px dashed #e0b84a; font-size: 13px; line-height: 1.8; }
  .hints ul { margin: 6px 0 0; padding-inline-start: 18px; }
  /* reveal motion */
  .sec .wrap > * { transition: opacity var(--ms, .7s) ease, transform var(--ms, .7s) cubic-bezier(.2,.7,.2,1), filter var(--ms, .7s); }
  :host(:not([in])) .an-fade .wrap > * { opacity: 0; }
  :host(:not([in])) .an-rise .wrap > * { opacity: 0; transform: translateY(28px); }
  :host(:not([in])) .an-zoom .wrap > * { opacity: 0; transform: scale(.94); }
  :host(:not([in])) .an-blur .wrap > * { opacity: 0; filter: blur(12px); }
  :host(:not([in])) .an-slide .wrap > * { opacity: 0; transform: translateX(40px); }
  .stagger .wrap > *:nth-child(2) { transition-delay: .08s; } .stagger .wrap > *:nth-child(3) { transition-delay: .16s; } .stagger .wrap > *:nth-child(4) { transition-delay: .24s; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } :host .sec .wrap > * { opacity: 1 !important; transform: none !important; filter: none !important; } }
  `;
    _3 = G4;
    dt5([
      n4({ type: Object })
    ], _3.prototype, "config");
    pt5 = Object.defineProperty;
    J2 = (t3, r6, e5, i5) => {
      for (var a3 = void 0, n5 = t3.length - 1, o7; n5 >= 0; n5--)
        (o7 = t3[n5]) && (a3 = o7(r6, e5, a3) || a3);
      return a3 && pt5(r6, e5, a3), a3;
    };
    bt5 = [[new RegExp("(\\d+(?:[.,]\\d+)?)\\s*(\u0645\u0644|ml|\u0645\u0644\u0644)(?!\\p{L})", "iu"), "ml", 1], [new RegExp("(\\d+(?:[.,]\\d+)?)\\s*(\u0644\u062A\u0631|l|liter|litre)(?!\\p{L})", "iu"), "ml", 1e3], [new RegExp("(\\d+(?:[.,]\\d+)?)\\s*(\u062C\u0631\u0627\u0645|\u062C\u0645|\u063A\u0631\u0627\u0645|\u063A|g|gm)(?!\\p{L})", "iu"), "g", 1], [new RegExp("(\\d+(?:[.,]\\d+)?)\\s*(\u0643\u064A\u0644\u0648|\u0643\u062C\u0645|kg)(?!\\p{L})", "iu"), "g", 1e3], [new RegExp("(\\d+)\\s*(\u062D\u0628\u0629|\u062D\u0628\u0627\u062A|\u0642\u0637\u0639\u0629|\u0642\u0637\u0639|pcs|pieces|\u0643\u0628\u0633\u0648\u0644\u0629|tablets?)(?!\\p{L})", "iu"), "pc", 1]];
    I6 = class I7 extends _3 {
      constructor() {
        super(...arguments), this.rows = [], this.loaded = false, this.seq = 0;
      }
      willUpdate(r6) {
        if (!r6.has("config")) return;
        const e5 = ++this.seq, i5 = this.c;
        rt4(i5.products, b5(i5.auto_source, "best_selling"), h3(i5.limit, 12)).then((a3) => {
          var p6;
          if (e5 !== this.seq) return;
          const n5 = new Map(Q4(i5.sizes).map((s4) => [W4(s4.product)[0], { amt: h3(s4.amount), unit: b5(s4.unit, "ml") }])), o7 = h3(i5.per, 100), l6 = b5(i5.unit_filter, "auto");
          let g2 = a3.items.map((s4) => {
            const u3 = n5.get(s4.id) ?? mt5(s4.name);
            return u3 && u3.amt > 0 ? { p: s4, ...u3, per: s4.price / u3.amt * (u3.unit === "pc" ? 1 : o7) } : null;
          }).filter((s4) => !!s4);
          const f5 = l6 !== "auto" ? l6 : ((p6 = Object.entries(g2.reduce((s4, u3) => (s4[u3.unit] = (s4[u3.unit] || 0) + 1, s4), {})).sort((s4, u3) => u3[1] - s4[1])[0]) == null ? void 0 : p6[0]) ?? "ml";
          g2 = g2.filter((s4) => s4.unit === f5 && (x5(i5.include_oos) || s4.p.available)).sort((s4, u3) => s4.per - u3.per).slice(0, h3(i5.show, 6)), this.rows = g2, this.loaded = true;
        });
      }
      uLabel(r6) {
        const e5 = h3(this.c.per, 100);
        return r6 === "pc" ? d3("\u0644\u0644\u062D\u0628\u0629", "per piece") : r6 === "g" ? d3(`\u0644\u0643\u0644 ${e5} \u062C\u0645`, `per ${e5} g`) : d3(`\u0644\u0643\u0644 ${e5} \u0645\u0644`, `per ${e5} ml`);
      }
      render() {
        const r6 = this.c;
        if (!this.loaded) return this.shell(b2`<div class="skel"></div>`);
        if (this.rows.length < 2) return H5() ? this.shell(b2`${this.hints([d3("\u0644\u0645 \u0646\u062C\u062F \u062D\u062C\u0645\u0627\u064B \u0641\u064A \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A (\u0645\u062B\u0644 100 \u0645\u0644 \u0623\u0648 1 \u0643\u062C\u0645). \u0623\u0636\u0641 \u0627\u0644\u0623\u062D\u062C\u0627\u0645 \u0641\u064A \u062C\u062F\u0648\u0644 \xAB\u0623\u062D\u062C\u0627\u0645 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A\xBB.", "No sizes found in product names. Add them in the sizes table.")])}`) : b2``;
        const e5 = this.rows[this.rows.length - 1].per, i5 = this.rows[0].per;
        return this.shell(
          b2`<div class="v">${this.rows.map((a3, n5) => b2`<div class="it ${n5 === 0 ? "best" : ""}">
      <span class="rk">${n5 + 1}</span><img src=${a3.p.image} alt="" loading="lazy" />
      <div><div class="nm">${a3.p.name}${n5 === 0 ? b2`<span class="tag">${$6(r6.best_label, d3("\u0627\u0644\u0623\u0648\u0641\u0631 \u0642\u064A\u0645\u0629", "Best value"))}</span>` : ""}</div><div class="sub">${C5(a3.p.price)} · ${a3.unit === "pc" ? `${a3.amt} ${d3("\u062D\u0628\u0629", "pcs")}` : a3.unit === "g" ? `${a3.amt} ${d3("\u062C\u0645", "g")}` : `${a3.amt} ${d3("\u0645\u0644", "ml")}`}</div>
        ${x5(r6.show_bar, true) ? b2`<div class="bar"><i style=${`width:${Math.round(i5 / a3.per * 100)}%`}></i></div>` : ""}
        ${n5 === 0 && x5(r6.show_saving, true) && e5 > i5 ? b2`<div class="save">${d3(`\u0623\u0631\u062E\u0635 \u0628\u0640 ${Math.round((1 - i5 / e5) * 100)}% \u0644\u0644\u0648\u062D\u062F\u0629 \u0645\u0646 ${this.rows[this.rows.length - 1].p.name}`, `${Math.round((1 - i5 / e5) * 100)}% cheaper per unit than ${this.rows[this.rows.length - 1].p.name}`)}</div>` : ""}</div>
      <div class="per">${C5(Math.round(a3.per * 100) / 100)}<small>${this.uLabel(a3.unit)}</small></div>
      <button class="btn sm" ?disabled=${!a3.p.available} @click=${() => this.add(a3.p)}>${d3("\u0623\u0636\u0641", "Add")}</button></div>`)}</div>`,
          { eyebrow: d3("\u062D\u0627\u0633\u0628\u0629 \u0627\u0644\u0642\u064A\u0645\u0629", "Value calculator"), title: d3("\u0645\u064A\u0646 \u0623\u0648\u0641\u0631 \u0641\u0639\u0644\u0627\u064B\u061F \u0627\u0644\u0633\u0639\u0631 \u0644\u0643\u0644 \u0648\u062D\u062F\u0629", "Who is really cheaper? Price per unit") }
        );
      }
    };
    I6.styles = [_3.base, i`
    .v { display: grid; gap: 10px; } .it { display: grid; grid-template-columns: 34px 64px 1fr auto auto; gap: 14px; align-items: center; padding: 12px 14px; border-radius: 18px; background: var(--CARD); box-shadow: var(--sh); }
    .it img { width: 64px; height: 64px; border-radius: 14px; object-fit: cover; } .rk { font-weight: 900; font-size: 20px; color: var(--A); text-align: center; }
    .nm { font-weight: 800; } .sub { font-size: 13px; opacity: .7; } .per { font-weight: 900; text-align: end; } .per small { display: block; font-weight: 600; opacity: .7; font-size: 12px; }
    .best { outline: 2px solid var(--A); } .tag { display: inline-block; font-size: 12px; font-weight: 800; padding: 3px 9px; border-radius: 999px; background: var(--A); color: #fff; margin-inline-start: 6px; }
    .save { color: #15803d; font-weight: 800; font-size: 13px; } .bar { height: 6px; border-radius: 9px; background: var(--LINE); margin-top: 6px; overflow: hidden; } .bar i { display: block; height: 100%; background: var(--A); }
    @media (max-width: 640px) { .it { grid-template-columns: 26px 52px 1fr; } .it img { width: 52px; height: 52px; } .per { grid-column: 2 / 4; text-align: start; } .it .btn { grid-column: 2 / 4; } }
  `];
    y7 = I6;
    J2([
      r5()
    ], y7.prototype, "rows");
    J2([
      r5()
    ], y7.prototype, "loaded");
    typeof y7 < "u" && y7.registerSallaComponent("salla-faisal-value");
  }
});

// demo/entry.js
init_lit();
i4.registerSallaComponent = function(n5) {
  if (!customElements.get(n5)) customElements.define(n5, this);
};
await Promise.resolve().then(() => (init_faisal_compare(), faisal_compare_exports));
await Promise.resolve().then(() => (init_faisal_duel(), faisal_duel_exports));
await Promise.resolve().then(() => (init_faisal_fit(), faisal_fit_exports));
await Promise.resolve().then(() => (init_faisal_picker(), faisal_picker_exports));
await Promise.resolve().then(() => (init_faisal_value(), faisal_value_exports));
window.__ready = true;
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
