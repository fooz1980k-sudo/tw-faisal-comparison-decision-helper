import { LitElement as Y, nothing as L, html as c, css as q } from "lit";
import { property as K, state as O } from "lit/decorators.js";
const m = () => window.salla ?? window.Salla, N = async () => {
  var t, r;
  try {
    await ((r = (t = m()) == null ? void 0 : t.onReady) == null ? void 0 : r.call(t));
  } catch {
  }
}, P = () => {
  var t, r, e, i, a;
  try {
    const n = ((r = (t = m()) == null ? void 0 : t.lang) == null ? void 0 : r.locale) ?? ((a = (i = (e = m()) == null ? void 0 : e.config) == null ? void 0 : i.get) == null ? void 0 : a.call(i, "user.language_code"));
    if (typeof n == "string" && n) return n.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, X = () => P() === "en", d = (t, r) => X() ? r : t, $ = (t, r = "") => {
  if (t == null) return r;
  if (typeof t == "string") {
    const e = t.trim();
    if (e.startsWith("{") && e.endsWith("}"))
      try {
        return $(JSON.parse(e), r);
      } catch {
      }
    return e || r;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const e = t, i = e[P()] ?? e.ar ?? e.en ?? Object.values(e).find((a) => typeof a == "string" && a);
    return typeof i == "string" && i.trim() ? i : r;
  }
  return r;
}, b = (t, r = "") => {
  const e = Array.isArray(t) ? t[0] : t, i = typeof e == "object" && e ? e.value : e;
  return i == null || i === "" ? r : String(i);
}, h = (t, r = 0) => {
  const e = Number(t);
  return t === "" || t == null || !Number.isFinite(e) ? r : e;
}, x = (t, r = !1) => t == null || t === "" ? r : t === !0 || t === "true" || t === 1 || t === "1", Q = (t) => Array.isArray(t) ? t : [], v = (t) => {
  const r = typeof t == "object" && t ? t.amount : t, e = Number(r);
  return Number.isFinite(e) ? e : 0;
}, Z = (t) => {
  if (!t) return null;
  const r = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(r) && r > Date.now() ? r : null;
};
function T(t) {
  var l, g, f, p, s, u, k, E, j;
  const r = v(t == null ? void 0 : t.sale_price), e = v((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), i = r && r < e ? r : v(t == null ? void 0 : t.price) || e, a = Math.max(v(t == null ? void 0 : t.regular_price), v(t == null ? void 0 : t.price), i), n = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((A) => String((A == null ? void 0 : A.url) ?? A ?? "")).filter(Boolean), o = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((l = t == null ? void 0 : t.image) == null ? void 0 : l.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? n[0] ?? ""),
    images: n,
    price: i,
    regular: a,
    discount: a > i ? Math.round((1 - i / a) * 100) : 0,
    rating: v(((g = t == null ? void 0 : t.rating) == null ? void 0 : g.stars) ?? ((f = t == null ? void 0 : t.rating) == null ? void 0 : f.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: v((p = t == null ? void 0 : t.rating) == null ? void 0 : p.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : v(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: o == null || o === "" || !Number.isFinite(Number(o)) ? null : Number(o),
    endsAt: Z((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((s = t == null ? void 0 : t.category) == null ? void 0 : s.name) ?? ((k = (u = t == null ? void 0 : t.categories) == null ? void 0 : u[0]) == null ? void 0 : k.name) ?? ""),
    brand: String(((E = t == null ? void 0 : t.brand) == null ? void 0 : E.name) ?? ""),
    promo: String(((j = t == null ? void 0 : t.promotion) == null ? void 0 : j.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const W = (t) => (Array.isArray(t) ? t : []).map((r) => Number(typeof r == "object" && r ? r.value : r)).filter((r) => Number.isFinite(r) && r > 0), w = /* @__PURE__ */ new Map();
async function V(t) {
  var i, a, n;
  const r = (i = m()) == null ? void 0 : i.product;
  if (!r) return null;
  const e = r.getDetails ? r.getDetails.bind(r) : (n = (a = r.api) == null ? void 0 : a.getDetails) == null ? void 0 : n.bind(r.api);
  if (!e) return null;
  try {
    const o = await e(t, ["images", "sold_quantity", "category"]), l = T((o == null ? void 0 : o.data) ?? o);
    return l.name ? l : null;
  } catch {
    return null;
  }
}
async function tt(t) {
  await N();
  const r = "ids:" + t.join(",");
  return w.has(r) || w.set(r, Promise.all(t.map(V)).then((e) => e.filter((i) => !!i))), w.get(r);
}
async function F(t, r = [], e = 12) {
  await N();
  const i = `src:${t}:${r.join(",")}:${e}`;
  return w.has(i) || w.set(i, (async () => {
    var o, l, g, f;
    const a = (o = m()) == null ? void 0 : o.product, n = a != null && a.fetch ? a.fetch.bind(a) : (g = (l = a == null ? void 0 : a.api) == null ? void 0 : l.fetch) == null ? void 0 : g.bind(a.api);
    if (!n) return [];
    try {
      const p = { source: t, per_page: e };
      r.length && (p.source_value = r);
      const s = await n(p);
      return (Array.isArray(s == null ? void 0 : s.data) ? s.data : Array.isArray(s) ? s : ((f = s == null ? void 0 : s.data) == null ? void 0 : f.products) ?? []).map(T).filter((k) => k.name).slice(0, e);
    } catch {
      return [];
    }
  })()), w.get(i);
}
async function rt(t, r = "best_selling", e = 12) {
  const i = W(t);
  if (i.length) return { items: (await tt(i)).slice(0, e), auto: !1 };
  let a = await F(r, [], e);
  return !a.length && r !== "latest" && (a = await F("latest", [], e)), { items: a, auto: !0 };
}
const C = (t) => {
  var r, e;
  try {
    const i = (e = (r = m()) == null ? void 0 : r.money) == null ? void 0 : e.call(r, t);
    if (i) return String(i);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${d("ر.س", "SAR")}`;
};
async function et(t, r = 1, e) {
  var i, a, n;
  await N();
  try {
    return await ((n = (a = (i = m()) == null ? void 0 : i.cart) == null ? void 0 : a.addItem) == null ? void 0 : n.call(a, e ? { id: t, quantity: r, notes: e } : { id: t, quantity: r })), !0;
  } catch {
    return !1;
  }
}
function at(t, r = !0) {
  var e, i, a;
  try {
    (a = r ? (e = m()) == null ? void 0 : e.success : (i = m()) == null ? void 0 : i.error) == null || a(t);
  } catch {
  }
}
const it = (t, r) => {
  var e, i, a;
  try {
    (a = (i = (e = m()) == null ? void 0 : e.event) == null ? void 0 : i.on) == null || a.call(i, t, r);
  } catch {
  }
}, S = "tw_smart_mem_v1", B = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function U() {
  try {
    return { ...B(), ...JSON.parse(localStorage.getItem(S) || "{}") };
  } catch {
    return B();
  }
}
function nt(t) {
  try {
    localStorage.setItem(S, JSON.stringify(t));
  } catch {
  }
}
function D(t) {
  const r = U();
  return t(r), nt(r), r;
}
function st() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(S), sessionStorage.setItem(S, "1");
  } catch {
  }
  return t ? D((r) => {
    r.visits += 1, r.last = Date.now();
  }) : U();
}
const z = (t, r = 1) => D((e) => {
  e.seen[t.id] = (e.seen[t.id] || 0) + r, e.prices = [...e.prices.slice(-29), t.price], t.category && (e.tags[t.category] = (e.tags[t.category] || 0) + r);
});
let M = !1;
function ot() {
  M || (M = !0, it("cart::item.added", (t) => {
    var e;
    const r = Number(((e = t == null ? void 0 : t.data) == null ? void 0 : e.product_id) ?? 0);
    r && D((i) => {
      i.carted.includes(r) || (i.carted = [...i.carted.slice(-40), r]);
    });
  }));
}
const ct = () => {
  const t = innerWidth, r = navigator.userAgent;
  return /iPad|Tablet/i.test(r) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(r) || t < 700 ? "mobile" : "desktop";
}, H = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var lt = Object.defineProperty, dt = (t, r, e, i) => {
  for (var a = void 0, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (a = o(r, e, a) || a);
  return a && lt(r, e, a), a;
};
const ut = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, R = /* @__PURE__ */ new Set();
function gt(t) {
  const r = ut[t];
  if (!r || R.has(r)) return r;
  R.add(r);
  const e = document.createElement("link");
  return e.rel = "stylesheet", e.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(r)}:wght@400;500;700;800&display=swap`, document.head.appendChild(e), r;
}
const ht = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, ft = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], G = class G extends Y {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), ot(), st();
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
    const n = ct();
    return !!(x(r.s_hide_mobile) && n === "mobile" || x(r.s_hide_desktop) && n !== "mobile");
  }
  vars(r = "") {
    const e = this.c, i = [], a = (o, l) => {
      l !== "" && l != null && i.push(`${o}:${l}`);
    };
    a("--a", e.s_accent || ""), a("--a2", e.s_accent2 || ""), a("--bgc", e.s_bg || ""), a("--fgc", e.s_text || ""), a("--cardc", e.s_card || ""), a("--r", `${h(e.s_radius, 22)}px`), a("--gap", `${h(e.s_gap, 18)}px`), a("--ts", `${h(e.s_title_size, 38)}px`), a("--fs", `${h(e.s_text_size, 16)}px`), a("--pt", `${h(e.s_pad_top, 56)}px`), a("--pb", `${h(e.s_pad_bottom, 56)}px`), a("--maxw", ht[b(e.s_width, "normal")] ?? "1240px"), a("--sh", ft[Math.max(0, Math.min(5, h(e.s_shadow, 2)))]), a("--ms", `${h(e.s_anim_ms, 700)}ms`), a("--ov", String(h(e.s_overlay, 45) / 100)), e.s_bg_image && a("--bgimg", `url("${String(e.s_bg_image)}")`);
    const n = gt(b(e.s_font, "inherit"));
    return n && a("font-family", `'${n}', inherit`), i.join(";") + (r ? ";" + r : "");
  }
  cls() {
    const r = this.c;
    return [
      "sec",
      `th-${b(r.s_theme, "auto")}`,
      `al-${b(r.s_align, "start")}`,
      `an-${b(r.s_anim, "rise")}`,
      `pt-${b(r.s_pattern, "none")}`,
      `bs-${b(r.s_btn_style, "pill")}`,
      x(r.s_border) ? "bordered" : "",
      x(r.s_stagger, !0) ? "stagger" : "",
      r.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(r, e = {}, i = "", a = "", n = !0) {
    if (this.hiddenNow()) return L;
    const o = this.c, l = $(o.eyebrow, e.eyebrow ?? ""), g = $(o.title, e.title ?? ""), f = $(o.subtitle, e.sub ?? ""), p = n && x(o.s_show_head, !0) && (l || g || f);
    return c`<section class="${this.cls()} ${i}" style=${this.vars(a)} id=${String(o.s_anchor || "") || L}>
      <div class="wrap">${p ? c`<header class="head">${l ? c`<span class="eyebrow">${l}</span>` : ""}${g ? c`<h2 class="title">${g}</h2>` : ""}${f ? c`<p class="sub">${f}</p>` : ""}</header>` : ""}
      ${r}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(r) {
    const e = r.filter(Boolean);
    return !e.length || !H() || !x(this.c.s_hints, !0) ? "" : c`<aside class="hints" role="note"><b>💡 ${d("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${e.map((i) => c`<li>${i}</li>`)}</ul></aside>`;
  }
  card(r, e = {}) {
    var i;
    return c`<article class="pc ${r.available ? "" : "oos"}">
      <a class="ph" href=${r.url} @click=${() => z(r)}><img src=${r.image} alt=${r.name} loading="lazy" />${(i = e.badges) != null && i.length ? c`<span class="badges">${e.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${r.url} @click=${() => z(r)}>${r.name}</a>
        <div class="pr"><b>${C(r.price)}</b>${r.regular > r.price ? c`<s>${C(r.regular)}</s>` : ""}</div>
        ${e.rating !== !1 && r.rating > 0 ? c`<div class="rt">★ ${r.rating.toFixed(1)}${r.ratingCount ? c` <small>(${r.ratingCount})</small>` : ""}</div>` : ""}
        ${e.extra ?? ""}
        ${e.quick !== !1 ? c`<button class="btn sm" ?disabled=${!r.available} @click=${() => this.add(r)}>${r.available ? d("أضف للسلة", "Add to cart") : d("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(r, e = 1, i) {
    z(r, 3), await et(r.id, e, i) ? at(d("تمت الإضافة للسلة", "Added to cart")) : location.href = r.url;
  }
};
G.base = q`
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
let _ = G;
dt([
  K({ type: Object })
], _.prototype, "config");
var pt = Object.defineProperty, J = (t, r, e, i) => {
  for (var a = void 0, n = t.length - 1, o; n >= 0; n--)
    (o = t[n]) && (a = o(r, e, a) || a);
  return a && pt(r, e, a), a;
};
const bt = [[new RegExp("(\\d+(?:[.,]\\d+)?)\\s*(مل|ml|ملل)(?!\\p{L})", "iu"), "ml", 1], [new RegExp("(\\d+(?:[.,]\\d+)?)\\s*(لتر|l|liter|litre)(?!\\p{L})", "iu"), "ml", 1e3], [new RegExp("(\\d+(?:[.,]\\d+)?)\\s*(جرام|جم|غرام|غ|g|gm)(?!\\p{L})", "iu"), "g", 1], [new RegExp("(\\d+(?:[.,]\\d+)?)\\s*(كيلو|كجم|kg)(?!\\p{L})", "iu"), "g", 1e3], [new RegExp("(\\d+)\\s*(حبة|حبات|قطعة|قطع|pcs|pieces|كبسولة|tablets?)(?!\\p{L})", "iu"), "pc", 1]];
function mt(t) {
  const r = t.replace(/[٠-٩]/g, (e) => String("٠١٢٣٤٥٦٧٨٩".indexOf(e)));
  for (const [e, i, a] of bt) {
    const n = r.match(e);
    if (n) return { amt: parseFloat(n[1].replace(",", ".")) * a, unit: i };
  }
  return null;
}
const I = class I extends _ {
  constructor() {
    super(...arguments), this.rows = [], this.loaded = !1, this.seq = 0;
  }
  willUpdate(r) {
    if (!r.has("config")) return;
    const e = ++this.seq, i = this.c;
    rt(i.products, b(i.auto_source, "best_selling"), h(i.limit, 12)).then((a) => {
      var p;
      if (e !== this.seq) return;
      const n = new Map(Q(i.sizes).map((s) => [W(s.product)[0], { amt: h(s.amount), unit: b(s.unit, "ml") }])), o = h(i.per, 100), l = b(i.unit_filter, "auto");
      let g = a.items.map((s) => {
        const u = n.get(s.id) ?? mt(s.name);
        return u && u.amt > 0 ? { p: s, ...u, per: s.price / u.amt * (u.unit === "pc" ? 1 : o) } : null;
      }).filter((s) => !!s);
      const f = l !== "auto" ? l : ((p = Object.entries(g.reduce((s, u) => (s[u.unit] = (s[u.unit] || 0) + 1, s), {})).sort((s, u) => u[1] - s[1])[0]) == null ? void 0 : p[0]) ?? "ml";
      g = g.filter((s) => s.unit === f && (x(i.include_oos) || s.p.available)).sort((s, u) => s.per - u.per).slice(0, h(i.show, 6)), this.rows = g, this.loaded = !0;
    });
  }
  uLabel(r) {
    const e = h(this.c.per, 100);
    return r === "pc" ? d("للحبة", "per piece") : r === "g" ? d(`لكل ${e} جم`, `per ${e} g`) : d(`لكل ${e} مل`, `per ${e} ml`);
  }
  render() {
    const r = this.c;
    if (!this.loaded) return this.shell(c`<div class="skel"></div>`);
    if (this.rows.length < 2) return H() ? this.shell(c`${this.hints([d("لم نجد حجماً في أسماء المنتجات (مثل 100 مل أو 1 كجم). أضف الأحجام في جدول «أحجام المنتجات».", "No sizes found in product names. Add them in the sizes table.")])}`) : c``;
    const e = this.rows[this.rows.length - 1].per, i = this.rows[0].per;
    return this.shell(
      c`<div class="v">${this.rows.map((a, n) => c`<div class="it ${n === 0 ? "best" : ""}">
      <span class="rk">${n + 1}</span><img src=${a.p.image} alt="" loading="lazy" />
      <div><div class="nm">${a.p.name}${n === 0 ? c`<span class="tag">${$(r.best_label, d("الأوفر قيمة", "Best value"))}</span>` : ""}</div><div class="sub">${C(a.p.price)} · ${a.unit === "pc" ? `${a.amt} ${d("حبة", "pcs")}` : a.unit === "g" ? `${a.amt} ${d("جم", "g")}` : `${a.amt} ${d("مل", "ml")}`}</div>
        ${x(r.show_bar, !0) ? c`<div class="bar"><i style=${`width:${Math.round(i / a.per * 100)}%`}></i></div>` : ""}
        ${n === 0 && x(r.show_saving, !0) && e > i ? c`<div class="save">${d(`أرخص بـ ${Math.round((1 - i / e) * 100)}% للوحدة من ${this.rows[this.rows.length - 1].p.name}`, `${Math.round((1 - i / e) * 100)}% cheaper per unit than ${this.rows[this.rows.length - 1].p.name}`)}</div>` : ""}</div>
      <div class="per">${C(Math.round(a.per * 100) / 100)}<small>${this.uLabel(a.unit)}</small></div>
      <button class="btn sm" ?disabled=${!a.p.available} @click=${() => this.add(a.p)}>${d("أضف", "Add")}</button></div>`)}</div>`,
      { eyebrow: d("حاسبة القيمة", "Value calculator"), title: d("مين أوفر فعلاً؟ السعر لكل وحدة", "Who is really cheaper? Price per unit") }
    );
  }
};
I.styles = [_.base, q`
    .v { display: grid; gap: 10px; } .it { display: grid; grid-template-columns: 34px 64px 1fr auto auto; gap: 14px; align-items: center; padding: 12px 14px; border-radius: 18px; background: var(--CARD); box-shadow: var(--sh); }
    .it img { width: 64px; height: 64px; border-radius: 14px; object-fit: cover; } .rk { font-weight: 900; font-size: 20px; color: var(--A); text-align: center; }
    .nm { font-weight: 800; } .sub { font-size: 13px; opacity: .7; } .per { font-weight: 900; text-align: end; } .per small { display: block; font-weight: 600; opacity: .7; font-size: 12px; }
    .best { outline: 2px solid var(--A); } .tag { display: inline-block; font-size: 12px; font-weight: 800; padding: 3px 9px; border-radius: 999px; background: var(--A); color: #fff; margin-inline-start: 6px; }
    .save { color: #15803d; font-weight: 800; font-size: 13px; } .bar { height: 6px; border-radius: 9px; background: var(--LINE); margin-top: 6px; overflow: hidden; } .bar i { display: block; height: 100%; background: var(--A); }
    @media (max-width: 640px) { .it { grid-template-columns: 26px 52px 1fr; } .it img { width: 52px; height: 52px; } .per { grid-column: 2 / 4; text-align: start; } .it .btn { grid-column: 2 / 4; } }
  `];
let y = I;
J([
  O()
], y.prototype, "rows");
J([
  O()
], y.prototype, "loaded");
typeof y < "u" && y.registerSallaComponent("salla-faisal-value");
export {
  y as default
};
