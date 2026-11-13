import { LitElement as U, nothing as q, html as d, css as O } from "lit";
import { property as Y, state as K } from "lit/decorators.js";
const x = () => window.salla ?? window.Salla, D = async () => {
  var t, r;
  try {
    await ((r = (t = x()) == null ? void 0 : t.onReady) == null ? void 0 : r.call(t));
  } catch {
  }
}, P = () => {
  var t, r, a, n, e;
  try {
    const s = ((r = (t = x()) == null ? void 0 : t.lang) == null ? void 0 : r.locale) ?? ((e = (n = (a = x()) == null ? void 0 : a.config) == null ? void 0 : n.get) == null ? void 0 : e.call(n, "user.language_code"));
    if (typeof s == "string" && s) return s.slice(0, 2);
  } catch {
  }
  return (document.documentElement.lang || "ar").slice(0, 2);
}, V = () => P() === "en", l = (t, r) => V() ? r : t, m = (t, r = "") => {
  if (t == null) return r;
  if (typeof t == "string") {
    const a = t.trim();
    if (a.startsWith("{") && a.endsWith("}"))
      try {
        return m(JSON.parse(a), r);
      } catch {
      }
    return a || r;
  }
  if (typeof t == "number" || typeof t == "boolean") return String(t);
  if (typeof t == "object") {
    const a = t, n = a[P()] ?? a.ar ?? a.en ?? Object.values(a).find((e) => typeof e == "string" && e);
    return typeof n == "string" && n.trim() ? n : r;
  }
  return r;
}, w = (t, r = "") => {
  const a = Array.isArray(t) ? t[0] : t, n = typeof a == "object" && a ? a.value : a;
  return n == null || n === "" ? r : String(n);
}, v = (t, r = 0) => {
  const a = Number(t);
  return t === "" || t == null || !Number.isFinite(a) ? r : a;
}, y = (t, r = !1) => t == null || t === "" ? r : t === !0 || t === "true" || t === 1 || t === "1", X = (t) => Array.isArray(t) ? t : [], $ = (t) => {
  const r = typeof t == "object" && t ? t.amount : t, a = Number(r);
  return Number.isFinite(a) ? a : 0;
}, Q = (t) => {
  if (!t) return null;
  const r = typeof t == "number" ? t < 1e12 ? t * 1e3 : t : Date.parse(String(t).replace(" ", "T"));
  return Number.isFinite(r) && r > Date.now() ? r : null;
};
function T(t) {
  var c, f, u, g, p, _, A, o, b;
  const r = $(t == null ? void 0 : t.sale_price), a = $((t == null ? void 0 : t.regular_price) ?? (t == null ? void 0 : t.price)), n = r && r < a ? r : $(t == null ? void 0 : t.price) || a, e = Math.max($(t == null ? void 0 : t.regular_price), $(t == null ? void 0 : t.price), n), s = (Array.isArray(t == null ? void 0 : t.images) ? t.images : []).map((h) => String((h == null ? void 0 : h.url) ?? h ?? "")).filter(Boolean), i = (t == null ? void 0 : t.sold_quantity) ?? (t == null ? void 0 : t.sold);
  return {
    id: Number(t == null ? void 0 : t.id),
    name: String((t == null ? void 0 : t.name) ?? ""),
    url: String((t == null ? void 0 : t.url) ?? "#"),
    image: String(((c = t == null ? void 0 : t.image) == null ? void 0 : c.url) ?? (t == null ? void 0 : t.main_image) ?? (t == null ? void 0 : t.thumbnail) ?? s[0] ?? ""),
    images: s,
    price: n,
    regular: e,
    discount: e > n ? Math.round((1 - n / e) * 100) : 0,
    rating: $(((f = t == null ? void 0 : t.rating) == null ? void 0 : f.stars) ?? ((u = t == null ? void 0 : t.rating) == null ? void 0 : u.rate) ?? (t == null ? void 0 : t.rating)),
    ratingCount: $((g = t == null ? void 0 : t.rating) == null ? void 0 : g.count),
    qty: (t == null ? void 0 : t.quantity) == null || t != null && t.unlimited_quantity ? null : $(t == null ? void 0 : t.quantity),
    available: (t == null ? void 0 : t.is_available) !== !1 && (t == null ? void 0 : t.status) !== "out" && !((t == null ? void 0 : t.quantity) === 0 && !(t != null && t.unlimited_quantity)),
    sold: i == null || i === "" || !Number.isFinite(Number(i)) ? null : Number(i),
    endsAt: Q((t == null ? void 0 : t.discount_ends) ?? (t == null ? void 0 : t.sale_end) ?? (t == null ? void 0 : t.discount_end)),
    category: String(((p = t == null ? void 0 : t.category) == null ? void 0 : p.name) ?? ((A = (_ = t == null ? void 0 : t.categories) == null ? void 0 : _[0]) == null ? void 0 : A.name) ?? ""),
    brand: String(((o = t == null ? void 0 : t.brand) == null ? void 0 : o.name) ?? ""),
    promo: String(((b = t == null ? void 0 : t.promotion) == null ? void 0 : b.title) ?? (t == null ? void 0 : t.promotion_title) ?? "")
  };
}
const Z = (t) => (Array.isArray(t) ? t : []).map((r) => Number(typeof r == "object" && r ? r.value : r)).filter((r) => Number.isFinite(r) && r > 0), C = /* @__PURE__ */ new Map();
async function tt(t) {
  var n, e, s;
  const r = (n = x()) == null ? void 0 : n.product;
  if (!r) return null;
  const a = r.getDetails ? r.getDetails.bind(r) : (s = (e = r.api) == null ? void 0 : e.getDetails) == null ? void 0 : s.bind(r.api);
  if (!a) return null;
  try {
    const i = await a(t, ["images", "sold_quantity", "category"]), c = T((i == null ? void 0 : i.data) ?? i);
    return c.name ? c : null;
  } catch {
    return null;
  }
}
async function rt(t) {
  await D();
  const r = "ids:" + t.join(",");
  return C.has(r) || C.set(r, Promise.all(t.map(tt)).then((a) => a.filter((n) => !!n))), C.get(r);
}
async function I(t, r = [], a = 12) {
  await D();
  const n = `src:${t}:${r.join(",")}:${a}`;
  return C.has(n) || C.set(n, (async () => {
    var i, c, f, u;
    const e = (i = x()) == null ? void 0 : i.product, s = e != null && e.fetch ? e.fetch.bind(e) : (f = (c = e == null ? void 0 : e.api) == null ? void 0 : c.fetch) == null ? void 0 : f.bind(e.api);
    if (!s) return [];
    try {
      const g = { source: t, per_page: a };
      r.length && (g.source_value = r);
      const p = await s(g);
      return (Array.isArray(p == null ? void 0 : p.data) ? p.data : Array.isArray(p) ? p : ((u = p == null ? void 0 : p.data) == null ? void 0 : u.products) ?? []).map(T).filter((A) => A.name).slice(0, a);
    } catch {
      return [];
    }
  })()), C.get(n);
}
async function at(t, r = "best_selling", a = 12) {
  const n = Z(t);
  if (n.length) return { items: (await rt(n)).slice(0, a), auto: !1 };
  let e = await I(r, [], a);
  return !e.length && r !== "latest" && (e = await I("latest", [], a)), { items: e, auto: !0 };
}
const k = (t) => {
  var r, a;
  try {
    const n = (a = (r = x()) == null ? void 0 : r.money) == null ? void 0 : a.call(r, t);
    if (n) return String(n);
  } catch {
  }
  return `${Math.round(t * 100) / 100} ${l("ر.س", "SAR")}`;
};
async function et(t, r = 1, a) {
  var n, e, s;
  await D();
  try {
    return await ((s = (e = (n = x()) == null ? void 0 : n.cart) == null ? void 0 : e.addItem) == null ? void 0 : s.call(e, a ? { id: t, quantity: r, notes: a } : { id: t, quantity: r })), !0;
  } catch {
    return !1;
  }
}
function nt(t, r = !0) {
  var a, n, e;
  try {
    (e = r ? (a = x()) == null ? void 0 : a.success : (n = x()) == null ? void 0 : n.error) == null || e(t);
  } catch {
  }
}
const it = (t, r) => {
  var a, n, e;
  try {
    (e = (n = (a = x()) == null ? void 0 : a.event) == null ? void 0 : n.on) == null || e.call(n, t, r);
  } catch {
  }
}, z = "tw_smart_mem_v1", F = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
function W() {
  try {
    return { ...F(), ...JSON.parse(localStorage.getItem(z) || "{}") };
  } catch {
    return F();
  }
}
function st(t) {
  try {
    localStorage.setItem(z, JSON.stringify(t));
  } catch {
  }
}
function G(t) {
  const r = W();
  return t(r), st(r), r;
}
function ot() {
  let t = !1;
  try {
    t = !sessionStorage.getItem(z), sessionStorage.setItem(z, "1");
  } catch {
  }
  return t ? G((r) => {
    r.visits += 1, r.last = Date.now();
  }) : W();
}
const E = (t, r = 1) => G((a) => {
  a.seen[t.id] = (a.seen[t.id] || 0) + r, a.prices = [...a.prices.slice(-29), t.price], t.category && (a.tags[t.category] = (a.tags[t.category] || 0) + r);
});
let B = !1;
function ct() {
  B || (B = !0, it("cart::item.added", (t) => {
    var a;
    const r = Number(((a = t == null ? void 0 : t.data) == null ? void 0 : a.product_id) ?? 0);
    r && G((n) => {
      n.carted.includes(r) || (n.carted = [...n.carted.slice(-40), r]);
    });
  }));
}
const lt = () => {
  const t = innerWidth, r = navigator.userAgent;
  return /iPad|Tablet/i.test(r) || t >= 700 && t < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(r) || t < 700 ? "mobile" : "desktop";
}, dt = () => {
  try {
    return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
  } catch {
    return !0;
  }
};
var gt = Object.defineProperty, ut = (t, r, a, n) => {
  for (var e = void 0, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (e = i(r, a, e) || e);
  return e && gt(r, a, e), e;
};
const ft = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" }, L = /* @__PURE__ */ new Set();
function bt(t) {
  const r = ft[t];
  if (!r || L.has(r)) return r;
  L.add(r);
  const a = document.createElement("link");
  return a.rel = "stylesheet", a.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(r)}:wght@400;500;700;800&display=swap`, document.head.appendChild(a), r;
}
const pt = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" }, ht = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"], M = class M extends U {
  get c() {
    return this.config ?? {};
  }
  connectedCallback() {
    super.connectedCallback(), ct(), ot();
  }
  firstUpdated() {
    if (!("IntersectionObserver" in window)) {
      this.setAttribute("in", "");
      return;
    }
    this.io = new IntersectionObserver((r) => {
      var a;
      r.some((n) => n.isIntersecting) && (this.setAttribute("in", ""), (a = this.io) == null || a.disconnect());
    }, { threshold: 0.12 }), this.io.observe(this);
  }
  disconnectedCallback() {
    var r;
    super.disconnectedCallback(), (r = this.io) == null || r.disconnect();
  }
  /** Hidden by the merchant's schedule or device rule? */
  hiddenNow() {
    const r = this.c, a = Date.now(), n = Date.parse(String(r.s_from || "")), e = Date.parse(String(r.s_to || ""));
    if (Number.isFinite(n) && a < n || Number.isFinite(e) && a > e) return !0;
    const s = lt();
    return !!(y(r.s_hide_mobile) && s === "mobile" || y(r.s_hide_desktop) && s !== "mobile");
  }
  vars(r = "") {
    const a = this.c, n = [], e = (i, c) => {
      c !== "" && c != null && n.push(`${i}:${c}`);
    };
    e("--a", a.s_accent || ""), e("--a2", a.s_accent2 || ""), e("--bgc", a.s_bg || ""), e("--fgc", a.s_text || ""), e("--cardc", a.s_card || ""), e("--r", `${v(a.s_radius, 22)}px`), e("--gap", `${v(a.s_gap, 18)}px`), e("--ts", `${v(a.s_title_size, 38)}px`), e("--fs", `${v(a.s_text_size, 16)}px`), e("--pt", `${v(a.s_pad_top, 56)}px`), e("--pb", `${v(a.s_pad_bottom, 56)}px`), e("--maxw", pt[w(a.s_width, "normal")] ?? "1240px"), e("--sh", ht[Math.max(0, Math.min(5, v(a.s_shadow, 2)))]), e("--ms", `${v(a.s_anim_ms, 700)}ms`), e("--ov", String(v(a.s_overlay, 45) / 100)), a.s_bg_image && e("--bgimg", `url("${String(a.s_bg_image)}")`);
    const s = bt(w(a.s_font, "inherit"));
    return s && e("font-family", `'${s}', inherit`), n.join(";") + (r ? ";" + r : "");
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
      y(r.s_border) ? "bordered" : "",
      y(r.s_stagger, !0) ? "stagger" : "",
      r.s_bg_image ? "has-img" : ""
    ].join(" ");
  }
  /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
  shell(r, a = {}, n = "", e = "", s = !0) {
    if (this.hiddenNow()) return q;
    const i = this.c, c = m(i.eyebrow, a.eyebrow ?? ""), f = m(i.title, a.title ?? ""), u = m(i.subtitle, a.sub ?? ""), g = s && y(i.s_show_head, !0) && (c || f || u);
    return d`<section class="${this.cls()} ${n}" style=${this.vars(e)} id=${String(i.s_anchor || "") || q}>
      <div class="wrap">${g ? d`<header class="head">${c ? d`<span class="eyebrow">${c}</span>` : ""}${f ? d`<h2 class="title">${f}</h2>` : ""}${u ? d`<p class="sub">${u}</p>` : ""}</header>` : ""}
      ${r}</div></section>`;
  }
  /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
  hints(r) {
    const a = r.filter(Boolean);
    return !a.length || !dt() || !y(this.c.s_hints, !0) ? "" : d`<aside class="hints" role="note"><b>💡 ${l("مساعد الإعداد (يظهر لك فقط)", "Setup assistant (only you see this)")}</b><ul>${a.map((n) => d`<li>${n}</li>`)}</ul></aside>`;
  }
  card(r, a = {}) {
    var n;
    return d`<article class="pc ${r.available ? "" : "oos"}">
      <a class="ph" href=${r.url} @click=${() => E(r)}><img src=${r.image} alt=${r.name} loading="lazy" />${(n = a.badges) != null && n.length ? d`<span class="badges">${a.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${r.url} @click=${() => E(r)}>${r.name}</a>
        <div class="pr"><b>${k(r.price)}</b>${r.regular > r.price ? d`<s>${k(r.regular)}</s>` : ""}</div>
        ${a.rating !== !1 && r.rating > 0 ? d`<div class="rt">★ ${r.rating.toFixed(1)}${r.ratingCount ? d` <small>(${r.ratingCount})</small>` : ""}</div>` : ""}
        ${a.extra ?? ""}
        ${a.quick !== !1 ? d`<button class="btn sm" ?disabled=${!r.available} @click=${() => this.add(r)}>${r.available ? l("أضف للسلة", "Add to cart") : l("نفدت الكمية", "Sold out")}</button>` : ""}
      </div></article>`;
  }
  async add(r, a = 1, n) {
    E(r, 3), await et(r.id, a, n) ? nt(l("تمت الإضافة للسلة", "Added to cart")) : location.href = r.url;
  }
};
M.base = O`
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
let S = M;
ut([
  Y({ type: Object })
], S.prototype, "config");
const j = ["price", "rating", "discount", "popular", "reviews", "stock"], mt = (t) => ({ price: l("السعر", "Price"), rating: l("التقييم", "Rating"), discount: l("الخصم", "Discount"), stock: l("التوفر", "Availability"), popular: l("الطلب عليه", "Popularity"), reviews: l("عدد المراجعات", "Reviews") })[t], xt = (t, r) => r === "price" ? t.price : r === "rating" ? t.rating || null : r === "discount" ? t.discount : r === "stock" ? t.available ? t.qty == null ? 100 : Math.min(100, t.qty) : 0 : r === "popular" ? t.sold : t.ratingCount || null;
function vt(t, r) {
  const a = t.map((i) => xt(i, r)), n = a.filter((i) => i != null);
  if (n.length < 2) return a.map((i) => i == null ? null : 1);
  const e = Math.min(...n), s = Math.max(...n);
  return s === e ? a.map((i) => i == null ? null : 1) : a.map((i) => i == null ? null : r === "price" ? (s - i) / (s - e) : (i - e) / (s - e));
}
function wt(t, r) {
  const a = Object.fromEntries(j.map((n) => [n, vt(t, n)]));
  return t.map((n, e) => {
    let s = 0, i = 0;
    const c = {};
    for (const f of j) {
      const u = a[f][e];
      c[f] = u;
      const g = r[f] ?? 0;
      u != null && g > 0 && (s += u * g, i += g);
    }
    return { p: n, score: i ? Math.round(s / i * 100) : 0, parts: c };
  }).sort((n, e) => e.score - n.score);
}
var yt = Object.defineProperty, $t = (t, r, a, n) => {
  for (var e = void 0, s = t.length - 1, i; s >= 0; s--)
    (i = t[s]) && (e = i(r, a, e) || e);
  return e && yt(r, a, e), e;
};
const R = class R extends S {
  constructor() {
    super(...arguments), this.ab = [], this.seq = 0;
  }
  willUpdate(r) {
    if (!r.has("config")) return;
    const a = ++this.seq, n = this.c;
    (async () => {
      let e = (await at(n.products, w(n.auto_source, "best_selling"), 6)).items;
      if (e.length === 1 || y(n.same_category, !0) && e.length > 1 && e[0].category && e[1].category !== e[0].category) {
        const s = await I(w(n.auto_source, "best_selling"), [], 12), i = s.find((c) => c.id !== e[0].id && (!e[0].category || c.category === e[0].category)) ?? s.find((c) => c.id !== e[0].id);
        i && (e = [e[0], i]);
      }
      a === this.seq && (this.ab = e.slice(0, 2));
    })();
  }
  render() {
    const r = this.c;
    if (this.ab.length < 2) return this.shell(d`<div class="skel"></div>`);
    const [a, n] = this.ab, e = j.filter((o) => y(r[`m_${o}`], o !== "stock")), s = Object.fromEntries(e.map((o) => [o, 1])), i = wt([a, n], s), c = i.find((o) => o.p.id === a.id), f = i.find((o) => o.p.id === n.id), u = (o, b) => b === "price" ? k(o.price) : b === "rating" ? o.rating ? `${o.rating.toFixed(1)}★` : "—" : b === "discount" ? o.discount ? `${o.discount}%` : "—" : b === "popular" ? o.sold ?? "—" : b === "reviews" ? o.ratingCount || "—" : o.available ? "✓" : "✕", g = a.price <= n.price ? a : n, _ = (g === a ? n : a).price - g.price, A = X(r.rows);
    return this.shell(d`<div class="panel">
      <div class="vs"><div><img src=${a.image} alt="" /><div class="nm">${a.name}</div><div class="pr">${k(a.price)}</div></div><div class="x">${m(r.vs_label, "VS")}</div><div><img src=${n.image} alt="" /><div class="nm">${n.name}</div><div class="pr">${k(n.price)}</div></div></div>
      <div class="rows">${e.map((o) => {
      const b = c.parts[o], h = f.parts[o];
      if (b == null && h == null) return "";
      const H = Math.round(((b ?? 0) * 0.8 + 0.2) * 100), J = Math.round(((h ?? 0) * 0.8 + 0.2) * 100);
      return d`<div class="row"><span class="l ${b != null && b >= (h ?? -1) ? "won" : ""}">${u(a, o)}</span><div class="tr a"><i style=${`width:${H}%`}></i></div><span class="m">${mt(o)}</span><div class="tr b"><i style=${`width:${J}%`}></i></div><span class=${h != null && h >= (b ?? -1) ? "won" : ""}>${u(n, o)}</span></div>`;
    })}
        ${A.map((o) => d`<div class="row"><span class="l">${m(o.a)}</span><span></span><span class="m">${m(o.label)}</span><span></span><span>${m(o.b)}</span></div>`)}</div>
      ${y(r.show_verdict, !0) ? d`<div class="gap">
        <div><b>💰 ${m(r.saver_label, l("إذا يهمك التوفير", "If saving matters"))}</b>${g.name}${_ > 0 ? l(` — توفر ${k(_)}`, ` — you save ${k(_)}`) : ""}<br /><button class="btn sm" style="margin-top:10px" ?disabled=${!g.available} @click=${() => this.add(g)}>${l("أضف للسلة", "Add to cart")}</button></div>
        <div><b>⭐ ${m(r.best_label, l("إذا تبي الأفضل إجمالاً", "If you want the overall best"))}</b>${i[0].p.name} — ${l(`تفوّق في ${e.filter((o) => (i[0].parts[o] ?? -1) > (i[1].parts[o] ?? -1)).length} من ${e.length}`, `wins ${e.filter((o) => (i[0].parts[o] ?? -1) > (i[1].parts[o] ?? -1)).length} of ${e.length}`)}<br /><button class="btn sm" style="margin-top:10px" ?disabled=${!i[0].p.available} @click=${() => this.add(i[0].p)}>${l("أضف للسلة", "Add to cart")}</button></div></div>` : ""}
    </div>`, { eyebrow: l("وجهاً لوجه", "Head to head"), title: l("أيهما يناسبك؟", "Which one suits you?") });
  }
};
R.styles = [S.base, O`
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
let N = R;
$t([
  K()
], N.prototype, "ab");
typeof N < "u" && N.registerSallaComponent("salla-faisal-duel");
export {
  N as default
};
