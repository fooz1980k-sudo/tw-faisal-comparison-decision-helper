import { LitElement as et, nothing as R, html as f, css as W } from "lit";
import { property as rt, state as Y } from "lit/decorators.js";
const y = () => window.salla ?? window.Salla, B = async () => {
  var t, e;
  try {
    await ((e = (t = y()) == null ? void 0 : t.onReady) == null ? void 0 : e.call(t));
  } catch {
  }
}, H = () => {
  var t, e, r, a, i;
  try {
    const n = ((e = (t = y()) == null ? void 0 : t.lang) == null ? void 0 : e.locale) ?? ((i = (a = (r = y()) == null ? void 0 : r.config) == null ? void 0 : a.get) == null ? void 0 : i.call(a, "user.language_code"));
    if (typeof n == "string" && n) return n.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, at = () => H() === "en", o = (t, e) => at() ? e : t, v = (t, e = "") => {
  if (t == null) return e;
  if (typeof t == "string") {
    const r = t.trim();
    if (r.startsWith("{") && r.endsWith("}"))
      try {
        return v(JSON.parse(r), e);
      } catch {
      }
    return r || e;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const r = t, a = r[H()] ?? r.ar ?? r.en ?? Object.values(r).find((i) => typeof i == "string" && i);
    return typeof a == "string" && a.trim() ? a : e;
  }
  return e;
}, $ = (t, e = "") => {
  const r = Array.isArray(t) ? t[0] : t, a = typeof r == "object" && r ? r.value : r;
  return a == null || a === "" ? e : String(a);
}, m = (t, e = 0) => {
  const r = Number(t);
  return t === "" || t == null || !Number.isFinite(r) ? e : r;
}, p = (t, e = !1) => t == null || t === "" ? e : t === !0 || t === "true" || t === 1 || t === "1", it = (t) => Array.isArray(t) ? t : [], M = (t) => v(t).split(/[,،\n]/).map((e) => e.trim()).filter(Boolean), w = (t) => {
  const e = typeof t == "object" && t ? t.amount : t, r = Number(e);
  return Number.isFinite(r) ? r : 0;
}, nt = (t) => {
  if (!t) return null;
  const e = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(e) && e > Date.now() ? e : null;
};
function J(t) {
  var d, c, l, g, h, x, u, b, _;
  const e = w(t == null ? void 0 : t.sale_price), r = w((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), a = e && e < r ? e : w(t == null ? void 0 : t.price) || r, i = Math.max(w(t == null ? void 0 : t.regular_price), w(t == null ? void 0 : t.price), a), n = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((k) => String((k == null ? void 0 : k.url) ?? k ?? "")).filter(Boolean), s = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((d = t == null ? void 0 : t.image) == null ? void 0 : d.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? n[0] ?? ""),
    images: n,
    price: a,
    regular: i,
    discount: i > a ? Math.round((1 - a / i) * 100) : 0,
    rating: w(((c = t == null ? void 0 : t.rating) == null ? void 0 : c.stars) ?? ((l = t == null ? void 0 : t.rating) == null ? void 0 : l.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: w((g = t == null ? void 0 : t.rating) == null ? void 0 : g.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : w(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: s == null || s === "" || !Number.isFinite(Number(s)) ? null : Number(s),
    endsAt: nt((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((h = t == null ? void 0 : t.category) == null ? void 0 : h.name) ?? ((u = (x = t == null ? void 0 : t.categories) == null ? void 0 : x[0]) == null ? void 0 : u.name) ?? ""),
    brand: String(((b = t == null ? void 0 : t.brand) == null ? void 0 : b.name) ?? ""),
    promo: String(((_ = t == null ? void 0 : t.promotion) == null ? void 0 : _.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const q = (t) => (Array.isArray(t) ? t : []).map((e) => Number(typeof e == "object" && e ? e.value : e)).filter((e) => Number.isFinite(e) && e > 0), A = /* @__PURE__ */ new Map();
async function st(t) {
  var a, i, n;
  const e = (a = y()) == null ? void 0 : a.product;
  if (!e) return null;
  const r = e.getDetails ? e.getDetails.bind(e) : (n = (i = e.api) == null ? void 0 : i.getDetails) == null ? void 0 : n.bind(e.api);
  if (!r) return null;
  try {
    const s = await r(t, ["images", "sold_quantity", "category"]), d = J((s == null ? void 0 : s.data) ?? s);
    return d.name ? d : null;
  } catch {
    return null;
  }
}
async function U(t) {
  await B();
  const e = "ids:" + t.join(",");
  return A.has(e) || A.set(e, Promise.all(t.map(st)).then((r) => r.filter((a) => !!a))), A.get(e);
}
async function L(t, e = [], r = 12) {
  await B();
  const a = `src:${t}:${e.join(",")}:${r}`;
  return A.has(a) || A.set(a, (async () => {
    var s, d, c, l;
    const i = (s = y()) == null ? void 0 : s.product, n = i != null && i.fetch ? i.fetch.bind(i) : (c = (d = i == null ? void 0 : i.api) == null ? void 0 : d.fetch) == null ? void 0 : c.bind(i.api);
    if (!n) return [];
    try {
      const g = { source: t, per_page: r };
      e.length && (g.source_value = e);
      const h = await n(g);
      return (Array.isArray(h == null ? void 0 : h.data) ? h.data : Array.isArray(h) ? h : ((l = h == null ? void 0 : h.data) == null ? void 0 : l.products) ?? []).map(J).filter((u) => u.name).slice(0, r);
    } catch {
      return [];
    }
  })()), A.get(a);
}
async function ot(t, e = "best_selling", r = 12) {
  const a = q(t);
  if (a.length) return { items: (await U(a)).slice(0, r), auto: !1 };
  let i = await L(e, [], r);
  return !i.length && e !== "latest" && (i = await L("latest", [], r)), { items: i, auto: !0 };
}
const S = (t) => {
  var e, r;
  try {
    const a = (r = (e = y()) == null ? void 0 : e.money) == null ? void 0 : r.call(e, t);
    if (a) return String(a);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${o("ر.س", "SAR")}`;
};
async function ct(t, e = 1, r) {
  var a, i, n;
  await B();
  try {
    return await ((n = (i = (a = y()) == null ? void 0 : a.cart) == null ? void 0 : i.addItem) == null ? void 0 : n.call(i, r ? { id: t, quantity: e, notes: r } : { id: t, quantity: e })), !0;
  } catch {
    return !1;
  }
}
function lt(t, e = !0) {
  var r, a, i;
  try {
    (i = e ? (r = y()) == null ? void 0 : r.success : (a = y()) == null ? void 0 : a.error) == null || i(t);
  } catch {
  }
}
const dt = (t, e) => {
  var r, a, i;
  try {
    (i = (a = (r = y()) == null ? void 0 : r.event) == null ? void 0 : a.on) == null || i.call(a, t, e);
  } catch {
  }
}, D = "tw_smart_mem_v1", O = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function F() {
  try {
    return { ...O(), ...JSON.parse(localStorage.getItem(D) || "{}") };
  } catch {
    return O();
  }
}
function ut(t) {
  try {
    localStorage.setItem(D, JSON.stringify(t));
  } catch {
  }
}
function I(t) {
  const e = F();
  return t(e), ut(e), e;
}
function gt() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(D), sessionStorage.setItem(D, "1");
  } catch {
  }
  return t ? I((e) => {
    e.visits += 1, e.last = Date.now();
  }) : F();
}
const G = (t, e = 1) => I((r) => {
  r.seen[t.id] = (r.seen[t.id] || 0) + e, r.prices = [...r.prices.slice(-29), t.price], t.category && (r.tags[t.category] = (r.tags[t.category] || 0) + e);
}), ft = (t, e) => I((r) => {
  r.answers[t] = e;
});
let P = !1;
function ht() {
  P || (P = !0, dt("cart::item.added", (t) => {
    var r;
    const e = Number(((r = t == null ? void 0 : t.data) == null ? void 0 : r.product_id) ?? 0);
    e && I((a) => {
      a.carted.includes(e) || (a.carted = [...a.carted.slice(-40), e]);
    });
  }));
}
const pt = () => {
  const t = innerWidth, e = navigator.userAgent;
  return /iPad|Tablet/i.test(e) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e) || t < 700 ? "mobile" : "desktop";
}, bt = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var mt = Object.defineProperty, xt = (t, e, r, a) => {
  for (var i = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (i = s(e, r, i) || i);
  return i && mt(e, r, i), i;
};
const vt = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, T = /* @__PURE__ */ new Set();
function yt(t) {
  const e = vt[t];
  if (!e || T.has(e)) return e;
  T.add(e);
  const r = document.createElement("link");
  return r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e)}:wght@400;500;700;800&display=swap`, document.head.appendChild(r), e;
}
const wt = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, $t = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], j = class j extends et {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), ht(), gt();
  }
  firstUpdated() {
    if (!("IntersectionObserver" in window)) {
      this.setAttribute("in", "");
      return;
    }
    this.io = new IntersectionObserver((e) => {
      var r;
      e.some((a) => a.isIntersecting) && (this.setAttribute("in", ""), (r = this.io) == null || r.disconnect());
    }, { threshold: 0.12 }), this.io.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.io) == null || e.disconnect();
  }
  /** Hidden by the merchant's schedule or device rule? */
  hiddenNow() {
    const e = this.c, r = Date.now(), a = Date.parse(String(e.s_from || "")), i = Date.parse(String(e.s_to || ""));
    if (Number.isFinite(a) && r < a || Number.isFinite(i) && r > i) return !0;
    const n = pt();
    return !!(p(e.s_hide_mobile) && n === "mobile" || p(e.s_hide_desktop) && n !== "mobile");
  }
  vars(e = "") {
    const r = this.c, a = [], i = (s, d) => {
      d !== "" && d != null && a.push(`${s}:${d}`);
    };
    i("--a", r.s_accent || ""), i("--a2", r.s_accent2 || ""), i("--bgc", r.s_bg || ""), i("--fgc", r.s_text || ""), i("--cardc", r.s_card || ""), i("--r", `${m(r.s_radius, 22)}px`), i("--gap", `${m(r.s_gap, 18)}px`), i("--ts", `${m(r.s_title_size, 38)}px`), i("--fs", `${m(r.s_text_size, 16)}px`), i("--pt", `${m(r.s_pad_top, 56)}px`), i("--pb", `${m(r.s_pad_bottom, 56)}px`), i("--maxw", wt[$(r.s_width, "normal")] ?? "1240px"), i("--sh", $t[Math.max(0, Math.min(5, m(r.s_shadow, 2)))]), i("--ms", `${m(r.s_anim_ms, 700)}ms`), i("--ov", String(m(r.s_overlay, 45) / 100)), r.s_bg_image && i("--bgimg", `url("${String(r.s_bg_image)}")`);
    const n = yt($(r.s_font, "inherit"));
    return n && i("font-family", `'${n}', inherit`), a.join(";") + (e ? ";" + e : "");
  }
  cls() {
    const e = this.c;
    return [
      "sec",
      `th-${$(e.s_theme, "auto")}`,
      `al-${$(e.s_align, "start")}`,
      `an-${$(e.s_anim, "rise")}`,
      `pt-${$(e.s_pattern, "none")}`,
      `bs-${$(e.s_btn_style, "pill")}`,
      p(e.s_border) ? "bordered" : "",
      p(e.s_stagger, !0) ? "stagger" : "",
      e.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(e, r = {}, a = "", i = "", n = !0) {
    if (this.hiddenNow()) return R;
    const s = this.c, d = v(s.eyebrow, r.eyebrow ?? ""), c = v(s.title, r.title ?? ""), l = v(s.subtitle, r.sub ?? ""), g = n && p(s.s_show_head, !0) && (d || c || l);
    return f`<section class="${this.cls()} ${a}" style=${this.vars(i)} id=${String(s.s_anchor || "") || R}>
      <div class="wrap">${g ? f`<header class="head">${d ? f`<span class="eyebrow">${d}</span>` : ""}${c ? f`<h2 class="title">${c}</h2>` : ""}${l ? f`<p class="sub">${l}</p>` : ""}</header>` : ""}
      ${e}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(e) {
    const r = e.filter(Boolean);
    return !r.length || !bt() || !p(this.c.s_hints, !0) ? "" : f`<aside class="hints" role="note"><b>💡 ${o("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${r.map((a) => f`<li>${a}</li>`)}</ul></aside>`;
  }
  card(e, r = {}) {
    var a;
    return f`<article class="pc ${e.available ? "" : "oos"}">
      <a class="ph" href=${e.url} @click=${() => G(e)}><img src=${e.image} alt=${e.name} loading="lazy" />${(a = r.badges) != null && a.length ? f`<span class="badges">${r.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e.url} @click=${() => G(e)}>${e.name}</a>
        <div class="pr"><b>${S(e.price)}</b>${e.regular > e.price ? f`<s>${S(e.regular)}</s>` : ""}</div>
        ${r.rating !== !1 && e.rating > 0 ? f`<div class="rt">★ ${e.rating.toFixed(1)}${e.ratingCount ? f` <small>(${e.ratingCount})</small>` : ""}</div>` : ""}
        ${r.extra ?? ""}
        ${r.quick !== !1 ? f`<button class="btn sm" ?disabled=${!e.available} @click=${() => this.add(e)}>${e.available ? o("أضف للسلة", "Add to cart") : o("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(e, r = 1, a) {
    G(e, 3), await ct(e.id, r, a) ? lt(o("تمت الإضافة للسلة", "Added to cart")) : location.href = e.url;
  }
};
j.base = W`
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
let N = j;
xt([
  rt({ type: Object })
], N.prototype, "config");
var _t = Object.defineProperty, K = (t, e, r, a) => {
  for (var i = void 0, n = t.length - 1, s; n >= 0; n--)
    (s = t[n]) && (i = s(e, r, i) || i);
  return i && _t(e, r, i), i;
};
const E = class E extends N {
  constructor() {
    super(...arguments), this.ps = [], this.cur = "", this.seq = 0;
  }
  willUpdate(e) {
    if (!e.has("config")) return;
    const r = ++this.seq, a = this.c;
    (async () => {
      var d;
      const i = it(a.personas);
      let n = [];
      if (i.length) {
        const c = await U(i.flatMap((l) => q(l.product)));
        n = i.map((l, g) => {
          const h = c.find((x) => x.id === q(l.product)[0]);
          return h ? { key: `c${g}`, icon: v(l.icon, "✨"), title: v(l.title), desc: v(l.desc), p: h, why: v(l.why), pros: M(l.pros), cons: M(l.cons) } : null;
        }).filter((l) => !!l);
      }
      if (!n.length || p(a.mix_auto)) {
        const c = (await ot(null, $(a.auto_source, "best_selling"), m(a.pool, 16))).items.filter((l) => l.available);
        c.length && (n = [...n, ...this.auto(c)]);
      }
      if (r !== this.seq) return;
      this.ps = n.slice(0, m(a.max_personas, 5));
      const s = F().answers.faisal_fit;
      this.cur = this.ps.some((c) => c.key === s) ? s : ((d = this.ps[0]) == null ? void 0 : d.key) ?? "";
    })();
  }
  auto(e) {
    const r = this.c, a = (u) => [...e].sort((b, _) => u(_) - u(b))[0], i = [], n = /* @__PURE__ */ new Set(), s = (u, b, _, k, X, z, Q, V, Z) => {
      !b || !z || n.has(z.id) && p(r.unique, !0) && !e.find((tt) => !n.has(tt.id)) || (n.add(z.id), i.push({ key: u, icon: _, title: k, desc: X, p: z, why: Q, pros: V.filter(Boolean), cons: Z.filter(Boolean) }));
    }, d = a((u) => -u.price), c = e.filter((u) => u.ratingCount >= m(r.min_reviews, 3)).sort((u, b) => b.rating - u.rating)[0], l = e.filter((u) => u.sold != null).sort((u, b) => (b.sold ?? 0) - (u.sold ?? 0))[0], g = e.filter((u) => u.discount > 0).sort((u, b) => b.discount - u.discount)[0], h = a((u) => u.price), x = e.reduce((u, b) => u + b.price, 0) / e.length;
    return s("saver", p(r.p_saver, !0), "💰", o("أبي الأوفر", "I want the best price"), o("ميزانيتك أهم شي", "Budget comes first"), d, o(`الأقل سعراً بين ${e.length} منتج`, `Lowest price of ${e.length}`), [x > d.price ? o(`أقل من متوسط الأسعار بـ ${Math.round((1 - d.price / x) * 100)}%`, `${Math.round((1 - d.price / x) * 100)}% below the average price`) : "", d.rating ? `${d.rating.toFixed(1)}★` : ""], [d.price < x * 0.6 ? o("خيارات أقل فخامة", "Less premium") : ""]), s("quality", p(r.p_quality, !0), "⭐", o("أبي الأعلى تقييماً", "I want top quality"), o("رأي العملاء يهمك", "You trust reviews"), c, c ? o(`${c.rating.toFixed(1)}★ من ${c.ratingCount} تقييم حقيقي`, `${c.rating.toFixed(1)}★ from ${c.ratingCount} real reviews`) : "", c ? [o(`${c.ratingCount} تقييم`, `${c.ratingCount} reviews`)] : [], c && c.price > x ? [o("أعلى من متوسط السعر", "Above average price")] : []), s("popular", p(r.p_popular, !0), "🔥", o("أبي اللي يطلبه الكل", "What everyone buys"), o("تحب الخيار المضمون", "You like the safe choice"), l, l ? o(`بيع منه ${l.sold} حتى الآن`, `${l.sold} sold so far`) : "", [], []), s("deal", p(r.p_deal, !0), "🏷️", o("أبي أقوى عرض", "I want the best deal"), o("تقتنص الخصومات", "You hunt discounts"), g, g ? o(`خصم ${g.discount}% — وفّر ${S(g.regular - g.price)}`, `${g.discount}% off — save ${S(g.regular - g.price)}`) : "", [], g != null && g.endsAt ? [o("العرض لفترة محدودة", "Limited time")] : []), s("gift", p(r.p_gift, !0), "🎁", o("أبي هدية تبيّض الوجه", "A gift that impresses"), o("للمناسبات والإهداء", "For gifting"), h, o("الأفخم في التشكيلة", "The most premium pick"), [h.rating ? `${h.rating.toFixed(1)}★` : ""], [o("الأعلى سعراً", "Highest price")]), i;
  }
  render() {
    const e = this.c;
    if (!this.ps.length) return this.shell(f`<div class="skel"></div>`);
    const r = this.ps.find((a) => a.key === this.cur) ?? this.ps[0];
    return this.shell(
      f`
      <div class="chips">${this.ps.map((a) => f`<button class="chip ${a.key === r.key ? "on" : ""}" @click=${() => {
        this.cur = a.key, ft("faisal_fit", a.key);
      }}>${a.icon} ${a.title}</button>`)}</div>
      <div class="panel res"><img src=${r.p.image} alt="" /><div><span class="ico">${r.icon}</span><div class="sub">${r.desc}</div><div class="ttl">${r.p.name}</div>${r.why ? f`<div class="why">${r.why}</div>` : ""}<div class="pr">${S(r.p.price)}</div>
        ${p(e.show_pros, !0) && r.pros.length ? f`<ul class="pros">${r.pros.map((a) => f`<li>${a}</li>`)}</ul>` : ""}
        ${p(e.show_cons, !0) && r.cons.length ? f`<ul class="cons">${r.cons.map((a) => f`<li>${a}</li>`)}</ul>` : ""}
        <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" ?disabled=${!r.p.available} @click=${() => this.add(r.p)}>${v(e.cta, o("أضف للسلة", "Add to cart"))}</button><a class="btn ghost" href=${r.p.url}>${o("التفاصيل", "Details")}</a></div></div></div>`,
      { eyebrow: o("أنت من أي نوع؟", "Which shopper are you?"), title: o("اختر وصفك… ونختار لك", "Pick your style, we pick for you") }
    );
  }
};
E.styles = [N.base, W`
    .chips { justify-content: center; margin-bottom: 20px; } .chip.on { background: var(--A); color: #fff; border-color: var(--A); }
    .res { display: grid; grid-template-columns: minmax(200px, 340px) 1fr; gap: 26px; align-items: center; } .res img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 24px; box-shadow: var(--sh); }
    .ttl { font-size: 1.5em; font-weight: 900; margin: 6px 0; } .why { font-weight: 700; color: var(--A); } .pr { font-size: 1.3em; font-weight: 900; margin: 8px 0 12px; }
    ul { list-style: none; padding: 0; margin: 0 0 12px; display: grid; gap: 6px; } li::before { margin-inline-end: 8px; } .pros li::before { content: '✓'; color: #15803d; font-weight: 900; } .cons li::before { content: '•'; color: #b45309; font-weight: 900; }
    .ico { font-size: 34px; } @media (max-width: 720px) { .res { grid-template-columns: 1fr; } }
  `];
let C = E;
K([
  Y()
], C.prototype, "ps");
K([
  Y()
], C.prototype, "cur");
typeof C < "u" && C.registerSallaComponent("salla-faisal-fit");
export {
  C as default
};
