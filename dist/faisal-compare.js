import { LitElement as U, nothing as F, html as d, css as T } from "lit";
import { property as K, state as J } from "lit/decorators.js";
const f = () => window.salla ?? window.Salla, j = async () => {
  var t, r;
  try {
    await ((r = (t = f()) == null ? void 0 : t.onReady) == null ? void 0 : r.call(t));
  } catch {
  }
}, W = () => {
  var t, r, e, i, a;
  try {
    const o = ((r = (t = f()) == null ? void 0 : t.lang) == null ? void 0 : r.locale) ?? ((a = (i = (e = f()) == null ? void 0 : e.config) == null ? void 0 : i.get) == null ? void 0 : a.call(i, "user.language_code"));
    if (typeof o == "string" && o) return o.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, X = () => W() === "en", l = (t, r) => X() ? r : t, v = (t, r = "") => {
  if (t == null) return r;
  if (typeof t == "string") {
    const e = t.trim();
    if (e.startsWith("{") && e.endsWith("}"))
      try {
        return v(JSON.parse(e), r);
      } catch {
      }
    return e || r;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const e = t, i = e[W()] ?? e.ar ?? e.en ?? Object.values(e).find((a) => typeof a == "string" && a);
    return typeof i == "string" && i.trim() ? i : r;
  }
  return r;
}, w = (t, r = "") => {
  const e = Array.isArray(t) ? t[0] : t, i = typeof e == "object" && e ? e.value : e;
  return i == null || i === "" ? r : String(i);
}, p = (t, r = 0) => {
  const e = Number(t);
  return t === "" || t == null || !Number.isFinite(e) ? r : e;
}, b = (t, r = !1) => t == null || t === "" ? r : t === !0 || t === "true" || t === 1 || t === "1", Q = (t) => Array.isArray(t) ? t : [], x = (t) => {
  const r = typeof t == "object" && t ? t.amount : t, e = Number(r);
  return Number.isFinite(e) ? e : 0;
}, V = (t) => {
  if (!t) return null;
  const r = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(r) && r > Date.now() ? r : null;
};
function Y(t) {
  var u, g, h, s, c, m, C, q, G;
  const r = x(t == null ? void 0 : t.sale_price), e = x((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), i = r && r < e ? r : x(t == null ? void 0 : t.price) || e, a = Math.max(x(t == null ? void 0 : t.regular_price), x(t == null ? void 0 : t.price), i), o = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((S) => String((S == null ? void 0 : S.url) ?? S ?? "")).filter(Boolean), n = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((u = t == null ? void 0 : t.image) == null ? void 0 : u.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? o[0] ?? ""),
    images: o,
    price: i,
    regular: a,
    discount: a > i ? Math.round((1 - i / a) * 100) : 0,
    rating: x(((g = t == null ? void 0 : t.rating) == null ? void 0 : g.stars) ?? ((h = t == null ? void 0 : t.rating) == null ? void 0 : h.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: x((s = t == null ? void 0 : t.rating) == null ? void 0 : s.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : x(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: n == null || n === "" || !Number.isFinite(Number(n)) ? null : Number(n),
    endsAt: V((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((c = t == null ? void 0 : t.category) == null ? void 0 : c.name) ?? ((C = (m = t == null ? void 0 : t.categories) == null ? void 0 : m[0]) == null ? void 0 : C.name) ?? ""),
    brand: String(((q = t == null ? void 0 : t.brand) == null ? void 0 : q.name) ?? ""),
    promo: String(((G = t == null ? void 0 : t.promotion) == null ? void 0 : G.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const Z = (t) => (Array.isArray(t) ? t : []).map((r) => Number(typeof r == "object" && r ? r.value : r)).filter((r) => Number.isFinite(r) && r > 0), y = /* @__PURE__ */ new Map();
async function tt(t) {
  var i, a, o;
  const r = (i = f()) == null ? void 0 : i.product;
  if (!r) return null;
  const e = r.getDetails ? r.getDetails.bind(r) : (o = (a = r.api) == null ? void 0 : a.getDetails) == null ? void 0 : o.bind(r.api);
  if (!e) return null;
  try {
    const n = await e(t, ["images", "sold_quantity", "category"]), u = Y((n == null ? void 0 : n.data) ?? n);
    return u.name ? u : null;
  } catch {
    return null;
  }
}
async function rt(t) {
  await j();
  const r = "ids:" + t.join(",");
  return y.has(r) || y.set(r, Promise.all(t.map(tt)).then((e) => e.filter((i) => !!i))), y.get(r);
}
async function R(t, r = [], e = 12) {
  await j();
  const i = `src:${t}:${r.join(",")}:${e}`;
  return y.has(i) || y.set(i, (async () => {
    var n, u, g, h;
    const a = (n = f()) == null ? void 0 : n.product, o = a != null && a.fetch ? a.fetch.bind(a) : (g = (u = a == null ? void 0 : a.api) == null ? void 0 : u.fetch) == null ? void 0 : g.bind(a.api);
    if (!o) return [];
    try {
      const s = { source: t, per_page: e };
      r.length && (s.source_value = r);
      const c = await o(s);
      return (Array.isArray(c == null ? void 0 : c.data) ? c.data : Array.isArray(c) ? c : ((h = c == null ? void 0 : c.data) == null ? void 0 : h.products) ?? []).map(Y).filter((C) => C.name).slice(0, e);
    } catch {
      return [];
    }
  })()), y.get(i);
}
async function et(t, r = "best_selling", e = 12) {
  const i = Z(t);
  if (i.length) return { items: (await rt(i)).slice(0, e), auto: !1 };
  let a = await R(r, [], e);
  return !a.length && r !== "latest" && (a = await R("latest", [], e)), { items: a, auto: !0 };
}
const _ = (t) => {
  var r, e;
  try {
    const i = (e = (r = f()) == null ? void 0 : r.money) == null ? void 0 : e.call(r, t);
    if (i) return String(i);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${l("ر.س", "SAR")}`;
};
async function at(t, r = 1, e) {
  var i, a, o;
  await j();
  try {
    return await ((o = (a = (i = f()) == null ? void 0 : i.cart) == null ? void 0 : a.addItem) == null ? void 0 : o.call(a, e ? { id: t, quantity: r, notes: e } : { id: t, quantity: r })), !0;
  } catch {
    return !1;
  }
}
function it(t, r = !0) {
  var e, i, a;
  try {
    (a = r ? (e = f()) == null ? void 0 : e.success : (i = f()) == null ? void 0 : i.error) == null || a(t);
  } catch {
  }
}
const nt = (t, r) => {
  var e, i, a;
  try {
    (a = (i = (e = f()) == null ? void 0 : e.event) == null ? void 0 : i.on) == null || a.call(i, t, r);
  } catch {
  }
}, N = "tw_smart_mem_v1", B = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function I() {
  try {
    return { ...B(), ...JSON.parse(localStorage.getItem(N) || "{}") };
  } catch {
    return B();
  }
}
function st(t) {
  try {
    localStorage.setItem(N, JSON.stringify(t));
  } catch {
  }
}
function z(t) {
  const r = I();
  return t(r), st(r), r;
}
function ot() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(N), sessionStorage.setItem(N, "1");
  } catch {
  }
  return t ? z((r) => {
    r.visits += 1, r.last = Date.now();
  }) : I();
}
const E = (t, r = 1) => z((e) => {
  e.seen[t.id] = (e.seen[t.id] || 0) + r, e.prices = [...e.prices.slice(-29), t.price], t.category && (e.tags[t.category] = (e.tags[t.category] || 0) + r);
}), ct = (t, r) => z((e) => {
  e.answers[t] = r;
});
let O = !1;
function lt() {
  O || (O = !0, nt("cart::item.added", (t) => {
    var e;
    const r = Number(((e = t == null ? void 0 : t.data) == null ? void 0 : e.product_id) ?? 0);
    r && z((i) => {
      i.carted.includes(r) || (i.carted = [...i.carted.slice(-40), r]);
    });
  }));
}
const dt = () => {
  const t = innerWidth, r = navigator.userAgent;
  return /iPad|Tablet/i.test(r) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(r) || t < 700 ? "mobile" : "desktop";
}, ut = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var gt = Object.defineProperty, ht = (t, r, e, i) => {
  for (var a = void 0, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (a = n(r, e, a) || a);
  return a && gt(r, e, a), a;
};
const bt = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, L = /* @__PURE__ */ new Set();
function pt(t) {
  const r = bt[t];
  if (!r || L.has(r)) return r;
  L.add(r);
  const e = document.createElement("link");
  return e.rel = "stylesheet", e.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(r)}:wght@400;500;700;800&display=swap`, document.head.appendChild(e), r;
}
const ft = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, mt = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], D = class D extends U {
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
    this.io = new IntersectionObserver((r) => {
      var e;
      r.some((i) => i.isIntersecting) && (this.setAttribute("in", ""), (e = this.io) == null || e.disconnect());
    }, { threshold: 0.12 }), this.io.observe(this);
  }
  disconnectedCallback() {
    var r;
    super.disconnectedCallback(), (r = this.io) == null || r.disconnect();
  }
  /** Hidden by the merchant's schedule or device rule? */
  hiddenNow() {
    const r = this.c, e = Date.now(), i = Date.parse(String(r.s_from || "")), a = Date.parse(String(r.s_to || ""));
    if (Number.isFinite(i) && e < i || Number.isFinite(a) && e > a) return !0;
    const o = dt();
    return !!(b(r.s_hide_mobile) && o === "mobile" || b(r.s_hide_desktop) && o !== "mobile");
  }
  vars(r = "") {
    const e = this.c, i = [], a = (n, u) => {
      u !== "" && u != null && i.push(`${n}:${u}`);
    };
    a("--a", e.s_accent || ""), a("--a2", e.s_accent2 || ""), a("--bgc", e.s_bg || ""), a("--fgc", e.s_text || ""), a("--cardc", e.s_card || ""), a("--r", `${p(e.s_radius, 22)}px`), a("--gap", `${p(e.s_gap, 18)}px`), a("--ts", `${p(e.s_title_size, 38)}px`), a("--fs", `${p(e.s_text_size, 16)}px`), a("--pt", `${p(e.s_pad_top, 56)}px`), a("--pb", `${p(e.s_pad_bottom, 56)}px`), a("--maxw", ft[w(e.s_width, "normal")] ?? "1240px"), a("--sh", mt[Math.max(0, Math.min(5, p(e.s_shadow, 2)))]), a("--ms", `${p(e.s_anim_ms, 700)}ms`), a("--ov", String(p(e.s_overlay, 45) / 100)), e.s_bg_image && a("--bgimg", `url("${String(e.s_bg_image)}")`);
    const o = pt(w(e.s_font, "inherit"));
    return o && a("font-family", `'${o}', inherit`), i.join(";") + (r ? ";" + r : "");
  }
  cls() {
    const r = this.c;
    return [
      "sec",
      `th-${w(r.s_theme, "auto")}`,
      `al-${w(r.s_align, "start")}`,
      `an-${w(r.s_anim, "rise")}`,
      `pt-${w(r.s_pattern, "none")}`,
      `bs-${w(r.s_btn_style, "pill")}`,
      b(r.s_border) ? "bordered" : "",
      b(r.s_stagger, !0) ? "stagger" : "",
      r.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(r, e = {}, i = "", a = "", o = !0) {
    if (this.hiddenNow()) return F;
    const n = this.c, u = v(n.eyebrow, e.eyebrow ?? ""), g = v(n.title, e.title ?? ""), h = v(n.subtitle, e.sub ?? ""), s = o && b(n.s_show_head, !0) && (u || g || h);
    return d`<section class="${this.cls()} ${i}" style=${this.vars(a)} id=${String(n.s_anchor || "") || F}>
      <div class="wrap">${s ? d`<header class="head">${u ? d`<span class="eyebrow">${u}</span>` : ""}${g ? d`<h2 class="title">${g}</h2>` : ""}${h ? d`<p class="sub">${h}</p>` : ""}</header>` : ""}
      ${r}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(r) {
    const e = r.filter(Boolean);
    return !e.length || !ut() || !b(this.c.s_hints, !0) ? "" : d`<aside class="hints" role="note"><b>💡 ${l("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${e.map((i) => d`<li>${i}</li>`)}</ul></aside>`;
  }
  card(r, e = {}) {
    var i;
    return d`<article class="pc ${r.available ? "" : "oos"}">
      <a class="ph" href=${r.url} @click=${() => E(r)}><img src=${r.image} alt=${r.name} loading="lazy" />${(i = e.badges) != null && i.length ? d`<span class="badges">${e.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${r.url} @click=${() => E(r)}>${r.name}</a>
        <div class="pr"><b>${_(r.price)}</b>${r.regular > r.price ? d`<s>${_(r.regular)}</s>` : ""}</div>
        ${e.rating !== !1 && r.rating > 0 ? d`<div class="rt">★ ${r.rating.toFixed(1)}${r.ratingCount ? d` <small>(${r.ratingCount})</small>` : ""}</div>` : ""}
        ${e.extra ?? ""}
        ${e.quick !== !1 ? d`<button class="btn sm" ?disabled=${!r.available} @click=${() => this.add(r)}>${r.available ? l("أضف للسلة", "Add to cart") : l("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(r, e = 1, i) {
    E(r, 3), await at(r.id, e, i) ? it(l("تمت الإضافة للسلة", "Added to cart")) : location.href = r.url;
  }
};
D.base = T`
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
let k = D;
ht([
  K({ type: Object })
], k.prototype, "config");
const A = ["price", "rating", "discount", "popular", "reviews", "stock"], P = (t) => ({ price: l("السعر", "Price"), rating: l("التقييم", "Rating"), discount: l("الخصم", "Discount"), stock: l("التوفر", "Availability"), popular: l("الطلب عليه", "Popularity"), reviews: l("عدد المراجعات", "Reviews") })[t], xt = (t, r) => r === "price" ? t.price : r === "rating" ? t.rating || null : r === "discount" ? t.discount : r === "stock" ? t.available ? t.qty == null ? 100 : Math.min(100, t.qty) : 0 : r === "popular" ? t.sold : t.ratingCount || null;
function wt(t, r) {
  const e = t.map((n) => xt(n, r)), i = e.filter((n) => n != null);
  if (i.length < 2) return e.map((n) => n == null ? null : 1);
  const a = Math.min(...i), o = Math.max(...i);
  return o === a ? e.map((n) => n == null ? null : 1) : e.map((n) => n == null ? null : r === "price" ? (o - n) / (o - a) : (n - a) / (o - a));
}
function vt(t, r) {
  const e = Object.fromEntries(A.map((i) => [i, wt(t, i)]));
  return t.map((i, a) => {
    let o = 0, n = 0;
    const u = {};
    for (const g of A) {
      const h = e[g][a];
      u[g] = h;
      const s = r[g] ?? 0;
      h != null && s > 0 && (o += h * s, n += s);
    }
    return { p: i, score: n ? Math.round(o / n * 100) : 0, parts: u };
  }).sort((i, a) => a.score - i.score);
}
function yt(t, r, e) {
  const i = A.filter((n) => (e[n] ?? 0) > 0 && t.parts[n] != null).map((n) => ({ m: n, d: (t.parts[n] ?? 0) - Math.max(0, ...r.map((u) => u.parts[n] ?? 0)), wt: e[n] ?? 0 })).filter((n) => n.d >= 0).sort((n, u) => u.d * u.wt - n.d * n.wt).slice(0, 2), a = t.p, o = i.map(({ m: n }) => n === "price" ? l(`الأقل سعراً (${_(a.price)})`, `lowest price (${_(a.price)})`) : n === "rating" ? l(`الأعلى تقييماً (${a.rating.toFixed(1)}★)`, `highest rated (${a.rating.toFixed(1)}★)`) : n === "discount" ? l(`أكبر خصم (${a.discount}%)`, `biggest discount (${a.discount}%)`) : n === "popular" ? l("الأكثر طلباً", "most ordered") : n === "reviews" ? l(`الأكثر مراجعات (${a.ratingCount})`, `most reviewed (${a.ratingCount})`) : l("متوفر بكمية أكبر", "better availability"));
  return o.length ? l(`لأنه ${o.join(" و")} حسب أولوياتك`, `Because it has the ${o.join(" and ")} for your priorities`) : l("الأقرب لأولوياتك", "Closest to your priorities");
}
var $t = Object.defineProperty, H = (t, r, e, i) => {
  for (var a = void 0, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (a = n(r, e, a) || a);
  return a && $t(r, e, a), a;
};
const M = class M extends k {
  constructor() {
    super(...arguments), this.items = [], this.w = {}, this.seq = 0;
  }
  willUpdate(r) {
    if (!r.has("config")) return;
    const e = ++this.seq, i = this.c, a = b(i.remember, !0) ? I().answers.faisal_w : "";
    let o = {};
    try {
      o = a ? JSON.parse(a) : {};
    } catch {
    }
    this.w = Object.fromEntries(A.map((n) => [n, o[n] ?? p(i[`w_${n}`], n === "price" || n === "rating" ? 3 : 2)])), et(i.products, w(i.auto_source, "best_selling"), p(i.limit, 3)).then((n) => {
      e === this.seq && (this.items = n.items.slice(0, p(i.limit, 3)));
    });
  }
  set(r, e) {
    this.w = { ...this.w, [r]: e }, b(this.c.remember, !0) && ct("faisal_w", JSON.stringify(this.w));
  }
  render() {
    const r = this.c, e = this.items;
    if (e.length < 2) return this.shell(d`${this.hints([l("اختر منتجين على الأقل أو اترك الحقل فارغاً للاختيار التلقائي.", "Pick at least two products.")])}<div class="skel"></div>`);
    const i = A.filter((s) => b(r[`m_${s}`], s !== "reviews" && s !== "stock")), a = vt(e, Object.fromEntries(i.map((s) => [s, this.w[s] ?? 0]))), o = a[0], n = new Map(a.map((s) => [s.p.id, s])), u = Q(r.specs), g = (s) => Math.max(...e.map((c) => n.get(c.id).parts[s] ?? -1)), h = (s, c) => c === "price" ? _(s.price) : c === "rating" ? s.rating ? `${s.rating.toFixed(1)}★` : "—" : c === "discount" ? s.discount ? `${s.discount}%` : "—" : c === "popular" ? s.sold != null ? l(`بيع ${s.sold}`, `${s.sold} sold`) : "—" : c === "reviews" ? s.ratingCount || "—" : s.available ? s.qty != null ? l(`متوفر ${s.qty}`, `${s.qty} in stock`) : l("متوفر", "In stock") : l("نفد", "Sold out");
    return this.shell(
      d`
      ${b(r.sliders, !0) ? d`<div class="panel pri">${i.map((s) => d`<label>${P(s)} <input type="range" min="0" max="5" .value=${String(this.w[s] ?? 0)} @input=${(c) => this.set(s, +c.target.value)} /></label>`)}</div>` : ""}
      <div class="panel tbl"><table><thead><tr><th>${v(r.corner_label, l("أولوياتك تقرر", "Your priorities decide"))}</th>${e.map((s) => d`<th class=${s.id === o.p.id ? "win" : ""}>${s.id === o.p.id ? d`<span class="crown">👑 ${v(r.win_label, l("الأنسب لك", "Best for you"))}</span>` : d`<span class="crown" style="visibility:hidden">.</span>`}<img class="pimg" src=${s.image} alt="" loading="lazy" /><a class="n" href=${s.url}>${s.name}</a></th>`)}</tr></thead>
        <tbody>${b(r.show_score, !0) ? d`<tr><td>${l("التطابق مع أولوياتك", "Match to your priorities")}</td>${e.map((s) => {
        const c = n.get(s.id);
        return d`<td class=${s.id === o.p.id ? "win" : ""}><span class="sc">${c.score}%</span><div class="bar"><i style=${`width:${c.score}%`}></i></div></td>`;
      })}</tr>` : ""}
          ${i.map((s) => d`<tr><td>${P(s)}</td>${e.map((c) => {
        const m = n.get(c.id).parts[s];
        return d`<td class="${c.id === o.p.id ? "win" : ""} ${m != null && m === g(s) && b(r.highlight, !0) ? "best" : ""}">${h(c, s)}</td>`;
      })}</tr>`)}
          ${u.map((s) => d`<tr><td>${v(s.label)}</td>${e.map((c, m) => d`<td class=${c.id === o.p.id ? "win" : ""}>${v(s[`v${m + 1}`]) || "—"}</td>`)}</tr>`)}
          <tr><td></td>${e.map((s) => d`<td class=${s.id === o.p.id ? "win" : ""}><button class="btn sm" ?disabled=${!s.available} @click=${() => this.add(s)}>${l("أضف للسلة", "Add to cart")}</button></td>`)}</tr></tbody></table></div>
      ${b(r.show_reason, !0) ? d`<p class="why">💡 ${o.p.name}: ${yt(o, a.slice(1), Object.fromEntries(i.map((s) => [s, this.w[s] ?? 0])))}</p>` : ""}`,
      { eyebrow: l("فيصل يقارن", "Compare"), title: l("حرّك أولوياتك… ونقول لك الأنسب", "Move your priorities, we pick the best") }
    );
  }
};
M.styles = [k.base, T`
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
let $ = M;
H([
  J()
], $.prototype, "items");
H([
  J()
], $.prototype, "w");
typeof $ < "u" && $.registerSallaComponent("salla-faisal-compare");
export {
  $ as default
};
