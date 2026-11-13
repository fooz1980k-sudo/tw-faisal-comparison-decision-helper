import { LitElement as U, nothing as B, html as d, css as J } from "lit";
import { property as Y, state as j } from "lit/decorators.js";
const b = () => window.salla ?? window.Salla, I = async () => {
  var t, e;
  try {
    await ((e = (t = b()) == null ? void 0 : t.onReady) == null ? void 0 : e.call(t));
  } catch {
  }
}, H = () => {
  var t, e, r, i, a;
  try {
    const o = ((e = (t = b()) == null ? void 0 : t.lang) == null ? void 0 : e.locale) ?? ((a = (i = (r = b()) == null ? void 0 : r.config) == null ? void 0 : i.get) == null ? void 0 : a.call(i, "user.language_code"));
    if (typeof o == "string" && o) return o.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, K = () => H() === "en", l = (t, e) => K() ? e : t, w = (t, e = "") => {
  if (t == null) return e;
  if (typeof t == "string") {
    const r = t.trim();
    if (r.startsWith("{") && r.endsWith("}"))
      try {
        return w(JSON.parse(r), e);
      } catch {
      }
    return r || e;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const r = t, i = r[H()] ?? r.ar ?? r.en ?? Object.values(r).find((a) => typeof a == "string" && a);
    return typeof i == "string" && i.trim() ? i : e;
  }
  return e;
}, x = (t, e = "") => {
  const r = Array.isArray(t) ? t[0] : t, i = typeof r == "object" && r ? r.value : r;
  return i == null || i === "" ? e : String(i);
}, p = (t, e = 0) => {
  const r = Number(t);
  return t === "" || t == null || !Number.isFinite(r) ? e : r;
}, f = (t, e = !1) => t == null || t === "" ? e : t === !0 || t === "true" || t === 1 || t === "1", m = (t) => {
  const e = typeof t == "object" && t ? t.amount : t, r = Number(e);
  return Number.isFinite(r) ? r : 0;
}, X = (t) => {
  if (!t) return null;
  const e = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(e) && e > Date.now() ? e : null;
};
function W(t) {
  var c, s, u, g, h, D, _, F, R;
  const e = m(t == null ? void 0 : t.sale_price), r = m((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), i = e && e < r ? e : m(t == null ? void 0 : t.price) || r, a = Math.max(m(t == null ? void 0 : t.regular_price), m(t == null ? void 0 : t.price), i), o = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((A) => String((A == null ? void 0 : A.url) ?? A ?? "")).filter(Boolean), n = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((c = t == null ? void 0 : t.image) == null ? void 0 : c.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? o[0] ?? ""),
    images: o,
    price: i,
    regular: a,
    discount: a > i ? Math.round((1 - i / a) * 100) : 0,
    rating: m(((s = t == null ? void 0 : t.rating) == null ? void 0 : s.stars) ?? ((u = t == null ? void 0 : t.rating) == null ? void 0 : u.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: m((g = t == null ? void 0 : t.rating) == null ? void 0 : g.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : m(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: n == null || n === "" || !Number.isFinite(Number(n)) ? null : Number(n),
    endsAt: X((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((h = t == null ? void 0 : t.category) == null ? void 0 : h.name) ?? ((_ = (D = t == null ? void 0 : t.categories) == null ? void 0 : D[0]) == null ? void 0 : _.name) ?? ""),
    brand: String(((F = t == null ? void 0 : t.brand) == null ? void 0 : F.name) ?? ""),
    promo: String(((R = t == null ? void 0 : t.promotion) == null ? void 0 : R.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const Q = (t) => (Array.isArray(t) ? t : []).map((e) => Number(typeof e == "object" && e ? e.value : e)).filter((e) => Number.isFinite(e) && e > 0), y = /* @__PURE__ */ new Map();
async function V(t) {
  var i, a, o;
  const e = (i = b()) == null ? void 0 : i.product;
  if (!e) return null;
  const r = e.getDetails ? e.getDetails.bind(e) : (o = (a = e.api) == null ? void 0 : a.getDetails) == null ? void 0 : o.bind(e.api);
  if (!r) return null;
  try {
    const n = await r(t, ["images", "sold_quantity", "category"]), c = W((n == null ? void 0 : n.data) ?? n);
    return c.name ? c : null;
  } catch {
    return null;
  }
}
async function Z(t) {
  await I();
  const e = "ids:" + t.join(",");
  return y.has(e) || y.set(e, Promise.all(t.map(V)).then((r) => r.filter((i) => !!i))), y.get(e);
}
async function O(t, e = [], r = 12) {
  await I();
  const i = `src:${t}:${e.join(",")}:${r}`;
  return y.has(i) || y.set(i, (async () => {
    var n, c, s, u;
    const a = (n = b()) == null ? void 0 : n.product, o = a != null && a.fetch ? a.fetch.bind(a) : (s = (c = a == null ? void 0 : a.api) == null ? void 0 : c.fetch) == null ? void 0 : s.bind(a.api);
    if (!o) return [];
    try {
      const g = { source: t, per_page: r };
      e.length && (g.source_value = e);
      const h = await o(g);
      return (Array.isArray(h == null ? void 0 : h.data) ? h.data : Array.isArray(h) ? h : ((u = h == null ? void 0 : h.data) == null ? void 0 : u.products) ?? []).map(W).filter((_) => _.name).slice(0, r);
    } catch {
      return [];
    }
  })()), y.get(i);
}
async function tt(t, e = "best_selling", r = 12) {
  const i = Q(t);
  if (i.length) return { items: (await Z(i)).slice(0, r), auto: !1 };
  let a = await O(e, [], r);
  return !a.length && e !== "latest" && (a = await O("latest", [], r)), { items: a, auto: !0 };
}
const $ = (t) => {
  var e, r;
  try {
    const i = (r = (e = b()) == null ? void 0 : e.money) == null ? void 0 : r.call(e, t);
    if (i) return String(i);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${l("ر.س", "SAR")}`;
};
async function et(t, e = 1, r) {
  var i, a, o;
  await I();
  try {
    return await ((o = (a = (i = b()) == null ? void 0 : i.cart) == null ? void 0 : a.addItem) == null ? void 0 : o.call(a, r ? { id: t, quantity: e, notes: r } : { id: t, quantity: e })), !0;
  } catch {
    return !1;
  }
}
function rt(t, e = !0) {
  var r, i, a;
  try {
    (a = e ? (r = b()) == null ? void 0 : r.success : (i = b()) == null ? void 0 : i.error) == null || a(t);
  } catch {
  }
}
const at = (t, e) => {
  var r, i, a;
  try {
    (a = (i = (r = b()) == null ? void 0 : r.event) == null ? void 0 : i.on) == null || a.call(i, t, e);
  } catch {
  }
}, C = "tw_smart_mem_v1", L = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function S() {
  try {
    return { ...L(), ...JSON.parse(localStorage.getItem(C) || "{}") };
  } catch {
    return L();
  }
}
function it(t) {
  try {
    localStorage.setItem(C, JSON.stringify(t));
  } catch {
  }
}
function z(t) {
  const e = S();
  return t(e), it(e), e;
}
function nt() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(C), sessionStorage.setItem(C, "1");
  } catch {
  }
  return t ? z((e) => {
    e.visits += 1, e.last = Date.now();
  }) : S();
}
const E = (t, e = 1) => z((r) => {
  r.seen[t.id] = (r.seen[t.id] || 0) + e, r.prices = [...r.prices.slice(-29), t.price], t.category && (r.tags[t.category] = (r.tags[t.category] || 0) + e);
}), st = (t, e) => z((r) => {
  r.answers[t] = e;
});
let P = !1;
function ot() {
  P || (P = !0, at("cart::item.added", (t) => {
    var r;
    const e = Number(((r = t == null ? void 0 : t.data) == null ? void 0 : r.product_id) ?? 0);
    e && z((i) => {
      i.carted.includes(e) || (i.carted = [...i.carted.slice(-40), e]);
    });
  }));
}
const ct = () => {
  const t = innerWidth, e = navigator.userAgent;
  return /iPad|Tablet/i.test(e) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e) || t < 700 ? "mobile" : "desktop";
}, lt = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var dt = Object.defineProperty, ut = (t, e, r, i) => {
  for (var a = void 0, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (a = n(e, r, a) || a);
  return a && dt(e, r, a), a;
};
const gt = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, T = /* @__PURE__ */ new Set();
function ht(t) {
  const e = gt[t];
  if (!e || T.has(e)) return e;
  T.add(e);
  const r = document.createElement("link");
  return r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e)}:wght@400;500;700;800&display=swap`, document.head.appendChild(r), e;
}
const pt = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, ft = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], M = class M extends U {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), ot(), nt();
  }
  firstUpdated() {
    if (!("IntersectionObserver" in window)) {
      this.setAttribute("in", "");
      return;
    }
    this.io = new IntersectionObserver((e) => {
      var r;
      e.some((i) => i.isIntersecting) && (this.setAttribute("in", ""), (r = this.io) == null || r.disconnect());
    }, { threshold: 0.12 }), this.io.observe(this);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this.io) == null || e.disconnect();
  }
  /** Hidden by the merchant's schedule or device rule? */
  hiddenNow() {
    const e = this.c, r = Date.now(), i = Date.parse(String(e.s_from || "")), a = Date.parse(String(e.s_to || ""));
    if (Number.isFinite(i) && r < i || Number.isFinite(a) && r > a) return !0;
    const o = ct();
    return !!(f(e.s_hide_mobile) && o === "mobile" || f(e.s_hide_desktop) && o !== "mobile");
  }
  vars(e = "") {
    const r = this.c, i = [], a = (n, c) => {
      c !== "" && c != null && i.push(`${n}:${c}`);
    };
    a("--a", r.s_accent || ""), a("--a2", r.s_accent2 || ""), a("--bgc", r.s_bg || ""), a("--fgc", r.s_text || ""), a("--cardc", r.s_card || ""), a("--r", `${p(r.s_radius, 22)}px`), a("--gap", `${p(r.s_gap, 18)}px`), a("--ts", `${p(r.s_title_size, 38)}px`), a("--fs", `${p(r.s_text_size, 16)}px`), a("--pt", `${p(r.s_pad_top, 56)}px`), a("--pb", `${p(r.s_pad_bottom, 56)}px`), a("--maxw", pt[x(r.s_width, "normal")] ?? "1240px"), a("--sh", ft[Math.max(0, Math.min(5, p(r.s_shadow, 2)))]), a("--ms", `${p(r.s_anim_ms, 700)}ms`), a("--ov", String(p(r.s_overlay, 45) / 100)), r.s_bg_image && a("--bgimg", `url("${String(r.s_bg_image)}")`);
    const o = ht(x(r.s_font, "inherit"));
    return o && a("font-family", `'${o}', inherit`), i.join(";") + (e ? ";" + e : "");
  }
  cls() {
    const e = this.c;
    return [
      "sec",
      `th-${x(e.s_theme, "auto")}`,
      `al-${x(e.s_align, "start")}`,
      `an-${x(e.s_anim, "rise")}`,
      `pt-${x(e.s_pattern, "none")}`,
      `bs-${x(e.s_btn_style, "pill")}`,
      f(e.s_border) ? "bordered" : "",
      f(e.s_stagger, !0) ? "stagger" : "",
      e.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(e, r = {}, i = "", a = "", o = !0) {
    if (this.hiddenNow()) return B;
    const n = this.c, c = w(n.eyebrow, r.eyebrow ?? ""), s = w(n.title, r.title ?? ""), u = w(n.subtitle, r.sub ?? ""), g = o && f(n.s_show_head, !0) && (c || s || u);
    return d`<section class="${this.cls()} ${i}" style=${this.vars(a)} id=${String(n.s_anchor || "") || B}>
      <div class="wrap">${g ? d`<header class="head">${c ? d`<span class="eyebrow">${c}</span>` : ""}${s ? d`<h2 class="title">${s}</h2>` : ""}${u ? d`<p class="sub">${u}</p>` : ""}</header>` : ""}
      ${e}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(e) {
    const r = e.filter(Boolean);
    return !r.length || !lt() || !f(this.c.s_hints, !0) ? "" : d`<aside class="hints" role="note"><b>💡 ${l("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${r.map((i) => d`<li>${i}</li>`)}</ul></aside>`;
  }
  card(e, r = {}) {
    var i;
    return d`<article class="pc ${e.available ? "" : "oos"}">
      <a class="ph" href=${e.url} @click=${() => E(e)}><img src=${e.image} alt=${e.name} loading="lazy" />${(i = r.badges) != null && i.length ? d`<span class="badges">${r.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e.url} @click=${() => E(e)}>${e.name}</a>
        <div class="pr"><b>${$(e.price)}</b>${e.regular > e.price ? d`<s>${$(e.regular)}</s>` : ""}</div>
        ${r.rating !== !1 && e.rating > 0 ? d`<div class="rt">★ ${e.rating.toFixed(1)}${e.ratingCount ? d` <small>(${e.ratingCount})</small>` : ""}</div>` : ""}
        ${r.extra ?? ""}
        ${r.quick !== !1 ? d`<button class="btn sm" ?disabled=${!e.available} @click=${() => this.add(e)}>${e.available ? l("أضف للسلة", "Add to cart") : l("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(e, r = 1, i) {
    E(e, 3), await et(e.id, r, i) ? rt(l("تمت الإضافة للسلة", "Added to cart")) : location.href = e.url;
  }
};
M.base = J`
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
let k = M;
ut([
  Y({ type: Object })
], k.prototype, "config");
const N = ["price", "rating", "discount", "popular", "reviews", "stock"], bt = (t) => ({ price: l("السعر", "Price"), rating: l("التقييم", "Rating"), discount: l("الخصم", "Discount"), stock: l("التوفر", "Availability"), popular: l("الطلب عليه", "Popularity"), reviews: l("عدد المراجعات", "Reviews") })[t], mt = (t, e) => e === "price" ? t.price : e === "rating" ? t.rating || null : e === "discount" ? t.discount : e === "stock" ? t.available ? t.qty == null ? 100 : Math.min(100, t.qty) : 0 : e === "popular" ? t.sold : t.ratingCount || null;
function xt(t, e) {
  const r = t.map((n) => mt(n, e)), i = r.filter((n) => n != null);
  if (i.length < 2) return r.map((n) => n == null ? null : 1);
  const a = Math.min(...i), o = Math.max(...i);
  return o === a ? r.map((n) => n == null ? null : 1) : r.map((n) => n == null ? null : e === "price" ? (o - n) / (o - a) : (n - a) / (o - a));
}
function vt(t, e) {
  const r = Object.fromEntries(N.map((i) => [i, xt(t, i)]));
  return t.map((i, a) => {
    let o = 0, n = 0;
    const c = {};
    for (const s of N) {
      const u = r[s][a];
      c[s] = u;
      const g = e[s] ?? 0;
      u != null && g > 0 && (o += u * g, n += g);
    }
    return { p: i, score: n ? Math.round(o / n * 100) : 0, parts: c };
  }).sort((i, a) => a.score - i.score);
}
function wt(t, e, r) {
  const i = N.filter((n) => (r[n] ?? 0) > 0 && t.parts[n] != null).map((n) => ({ m: n, d: (t.parts[n] ?? 0) - Math.max(0, ...e.map((c) => c.parts[n] ?? 0)), wt: r[n] ?? 0 })).filter((n) => n.d >= 0).sort((n, c) => c.d * c.wt - n.d * n.wt).slice(0, 2), a = t.p, o = i.map(({ m: n }) => n === "price" ? l(`الأقل سعراً (${$(a.price)})`, `lowest price (${$(a.price)})`) : n === "rating" ? l(`الأعلى تقييماً (${a.rating.toFixed(1)}★)`, `highest rated (${a.rating.toFixed(1)}★)`) : n === "discount" ? l(`أكبر خصم (${a.discount}%)`, `biggest discount (${a.discount}%)`) : n === "popular" ? l("الأكثر طلباً", "most ordered") : n === "reviews" ? l(`الأكثر مراجعات (${a.ratingCount})`, `most reviewed (${a.ratingCount})`) : l("متوفر بكمية أكبر", "better availability"));
  return o.length ? l(`لأنه ${o.join(" و")} حسب أولوياتك`, `Because it has the ${o.join(" and ")} for your priorities`) : l("الأقرب لأولوياتك", "Closest to your priorities");
}
var yt = Object.defineProperty, G = (t, e, r, i) => {
  for (var a = void 0, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (a = n(e, r, a) || a);
  return a && yt(e, r, a), a;
};
const q = class q extends k {
  constructor() {
    super(...arguments), this.pool = [], this.sel = [], this.open = !1, this.seq = 0;
  }
  willUpdate(e) {
    if (!e.has("config")) return;
    const r = ++this.seq, i = this.c;
    tt(i.products, x(i.auto_source, "best_selling"), p(i.limit, 8)).then((a) => {
      if (r !== this.seq) return;
      this.pool = a.items;
      let o = [];
      try {
        o = JSON.parse(S().answers.faisal_pick || "[]");
      } catch {
      }
      if (o = o.filter((n) => a.items.some((c) => c.id === n)), !o.length && f(i.preselect_seen, !0)) {
        const n = S().seen;
        o = a.items.filter((c) => n[c.id]).sort((c, s) => (n[s.id] || 0) - (n[c.id] || 0)).slice(0, 2).map((c) => c.id);
      }
      this.sel = o.slice(0, this.max), this.open = f(i.auto_open, !0) && this.sel.length >= 2;
    });
  }
  get max() {
    return Math.max(2, p(this.c.max_pick, 3));
  }
  toggle(e) {
    const r = this.sel.includes(e.id) ? this.sel.filter((i) => i !== e.id) : this.sel.length >= this.max ? [...this.sel.slice(1), e.id] : [...this.sel, e.id];
    this.sel = r, r.length < 2 && (this.open = !1), st("faisal_pick", JSON.stringify(r));
  }
  render() {
    const e = this.c;
    if (!this.pool.length) return this.shell(d`<div class="skel"></div>`);
    const r = this.sel.map((s) => this.pool.find((u) => u.id === s)).filter(Boolean), i = N.filter((s) => f(e[`m_${s}`], s !== "reviews")), a = Object.fromEntries(i.map((s) => [s, p(e[`w_${s}`], s === "price" || s === "rating" ? 3 : 1)])), o = r.length >= 2 ? vt(r, a) : [], n = new Map(o.map((s) => [s.p.id, s])), c = (s, u) => u === "price" ? $(s.price) : u === "rating" ? s.rating ? `${s.rating.toFixed(1)}★` : "—" : u === "discount" ? s.discount ? `${s.discount}%` : "—" : u === "popular" ? s.sold ?? "—" : u === "reviews" ? s.ratingCount || "—" : s.available ? "✓" : "✕";
    return this.shell(
      d`
      <p class="hint">${w(e.hint, l(`اختر حتى ${this.max} منتجات بالضغط على ✓`, `Tap ✓ on up to ${this.max} products`))}${this.sel.length && !this.open && f(e.preselect_seen, !0) ? l(" — اخترنا لك ما شاهدته مؤخراً", " — we pre-picked what you viewed") : ""}</p>
      <div class="grid">${this.pool.map((s) => d`<div class="pick ${this.sel.includes(s.id) ? "on" : ""}"><button class="tick" aria-pressed=${this.sel.includes(s.id)} @click=${() => this.toggle(s)}>${this.sel.includes(s.id) ? this.sel.indexOf(s.id) + 1 : "+"}</button>${this.card(s, { quick: f(e.quick_add, !0) })}</div>`)}</div>
      ${this.sel.length ? d`<div class="tray"><div class="th">${r.map((s) => d`<img src=${s.image} alt=${s.name} />`)}</div><span>${l(`${r.length} من ${this.max}`, `${r.length} of ${this.max}`)}</span>
        <button class="btn" ?disabled=${r.length < 2} @click=${() => this.open = !this.open}>${this.open ? l("إخفاء المقارنة", "Hide") : w(e.cta, l("قارن الآن", "Compare now"))}</button></div>` : ""}
      ${this.open && o.length ? d`<div class="panel res"><table><thead><tr><th></th>${r.map((s) => d`<th class=${s.id === o[0].p.id ? "w" : ""}>${s.name}</th>`)}</tr></thead><tbody>
        ${i.map((s) => {
        const u = Math.max(...r.map((g) => n.get(g.id).parts[s] ?? -1));
        return d`<tr><td>${bt(s)}</td>${r.map((g) => d`<td class="${g.id === o[0].p.id ? "w" : ""} ${n.get(g.id).parts[s] === u && u >= 0 ? "ok" : ""}">${c(g, s)}</td>`)}</tr>`;
      })}
        ${f(e.show_score, !0) ? d`<tr><td>${l("النتيجة", "Score")}</td>${r.map((s) => d`<td class=${s.id === o[0].p.id ? "w" : ""}>${n.get(s.id).score}%</td>`)}</tr>` : ""}
        <tr><td></td>${r.map((s) => d`<td><button class="btn sm" ?disabled=${!s.available} @click=${() => this.add(s)}>${l("أضف", "Add")}</button></td>`)}</tr></tbody></table>
        <div class="verdict">🏆 ${o[0].p.name} — ${wt(o[0], o.slice(1), a)}</div></div>` : ""}`,
      { eyebrow: l("اختر وقارن", "Pick & compare"), title: l("محتار بينهم؟ قارن بنفسك", "Torn between them? Compare") }
    );
  }
};
q.styles = [k.base, J`
    .pick { position: relative; } .pick .tick { position: absolute; top: 10px; inset-inline-start: 10px; z-index: 2; width: 32px; height: 32px; border-radius: 50%; border: 2px solid #fff; background: #0005; color: #fff; display: grid; place-items: center; font-weight: 900; cursor: pointer; backdrop-filter: blur(4px); }
    .pick.on .tick { background: var(--A); } .pick.on .card { outline: 3px solid var(--A); outline-offset: -3px; }
    .tray { position: sticky; bottom: 12px; z-index: 5; margin-top: 18px; display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; padding: 12px 16px; border-radius: 18px; background: var(--CARD); box-shadow: 0 12px 40px #0003; border: 1px solid var(--LINE); }
    .tray .th { display: flex; gap: 8px; } .tray img { width: 46px; height: 46px; border-radius: 12px; object-fit: cover; }
    .res { margin-top: 18px; overflow-x: auto; } table { width: 100%; border-collapse: collapse; min-width: 480px; } td, th { padding: 10px; border-bottom: 1px solid var(--LINE); text-align: center; } td:first-child, th:first-child { text-align: start; opacity: .8; }
    .w { background: color-mix(in srgb, var(--A) 10%, transparent); font-weight: 800; } .ok { color: #15803d; font-weight: 800; }
    .verdict { margin-top: 12px; font-weight: 800; padding: 12px 16px; border-radius: 14px; background: color-mix(in srgb, var(--A) 10%, transparent); }
    .hint { font-size: 13px; opacity: .75; margin: -6px 0 14px; }
  `];
let v = q;
G([
  j()
], v.prototype, "pool");
G([
  j()
], v.prototype, "sel");
G([
  j()
], v.prototype, "open");
typeof v < "u" && v.registerSallaComponent("salla-faisal-picker");
export {
  v as default
};
