import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { inEditor } from '../../shared/context';
import { L, opt, num, bool, list, ids, t, smart, money, type Prod } from '../../shared/salla';

type R = Record<string, unknown>;
const UNITS: [RegExp, string, number][] = [[/(\d+(?:[.,]\d+)?)\s*(مل|ml|ملل)(?!\p{L})/iu, 'ml', 1], [/(\d+(?:[.,]\d+)?)\s*(لتر|l|liter|litre)(?!\p{L})/iu, 'ml', 1000], [/(\d+(?:[.,]\d+)?)\s*(جرام|جم|غرام|غ|g|gm)(?!\p{L})/iu, 'g', 1], [/(\d+(?:[.,]\d+)?)\s*(كيلو|كجم|kg)(?!\p{L})/iu, 'g', 1000], [/(\d+)\s*(حبة|حبات|قطعة|قطع|pcs|pieces|كبسولة|tablets?)(?!\p{L})/iu, 'pc', 1]];
/** Reads the size from the product name (100 مل، 1 كجم، 30 حبة) or from the merchant's table and ranks by real price per unit. Products with no known size are simply left out — nothing is guessed. */
function unitOf(name: string): { amt: number; unit: string } | null { const s = name.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d))); for (const [re, u, k] of UNITS) { const m = s.match(re); if (m) return { amt: parseFloat(m[1].replace(',', '.')) * k, unit: u }; } return null; }
export default class FaisalValue extends Smart {
  @state() private rows: { p: Prod; amt: number; unit: string; per: number }[] = [];
  @state() private loaded = false;
  private seq = 0;
  static styles = [Smart.base, css`
    .v { display: grid; gap: 10px; } .it { display: grid; grid-template-columns: 34px 64px 1fr auto auto; gap: 14px; align-items: center; padding: 12px 14px; border-radius: 18px; background: var(--CARD); box-shadow: var(--sh); }
    .it img { width: 64px; height: 64px; border-radius: 14px; object-fit: cover; } .rk { font-weight: 900; font-size: 20px; color: var(--A); text-align: center; }
    .nm { font-weight: 800; } .sub { font-size: 13px; opacity: .7; } .per { font-weight: 900; text-align: end; } .per small { display: block; font-weight: 600; opacity: .7; font-size: 12px; }
    .best { outline: 2px solid var(--A); } .tag { display: inline-block; font-size: 12px; font-weight: 800; padding: 3px 9px; border-radius: 999px; background: var(--A); color: #fff; margin-inline-start: 6px; }
    .save { color: #15803d; font-weight: 800; font-size: 13px; } .bar { height: 6px; border-radius: 9px; background: var(--LINE); margin-top: 6px; overflow: hidden; } .bar i { display: block; height: 100%; background: var(--A); }
    @media (max-width: 640px) { .it { grid-template-columns: 26px 52px 1fr; } .it img { width: 52px; height: 52px; } .per { grid-column: 2 / 4; text-align: start; } .it .btn { grid-column: 2 / 4; } }
  `];
  willUpdate(ch: Map<string, unknown>) {
    if (!ch.has('config')) return; const n = ++this.seq; const c = this.c;
    smart(c.products, opt(c.auto_source, 'best_selling'), num(c.limit, 12)).then((r) => { if (n !== this.seq) return;
      const man = new Map(list<R>(c.sizes).map((s) => [ids(s.product)[0], { amt: num(s.amount), unit: opt(s.unit, 'ml') }]));
      const per = num(c.per, 100); const want = opt(c.unit_filter, 'auto');
      let rows = r.items.map((p) => { const u = man.get(p.id) ?? unitOf(p.name); return u && u.amt > 0 ? { p, ...u, per: (p.price / u.amt) * (u.unit === 'pc' ? 1 : per) } : null; }).filter((x): x is NonNullable<typeof x> => !!x);
      const unit = want !== 'auto' ? want : (Object.entries(rows.reduce<Record<string, number>>((a, x) => ((a[x.unit] = (a[x.unit] || 0) + 1), a), {})).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'ml');
      rows = rows.filter((x) => x.unit === unit && (bool(c.include_oos) || x.p.available)).sort((a, b) => a.per - b.per).slice(0, num(c.show, 6));
      this.rows = rows; this.loaded = true; });
  }
  private uLabel(u: string) { const per = num(this.c.per, 100); return u === 'pc' ? t('للحبة', 'per piece') : u === 'g' ? t(`لكل ${per} جم`, `per ${per} g`) : t(`لكل ${per} مل`, `per ${per} ml`); }
  render() {
    const c = this.c; if (!this.loaded) return this.shell(html`<div class="skel"></div>`);
    if (this.rows.length < 2) return inEditor() ? this.shell(html`${this.hints([t('لم نجد حجماً في أسماء المنتجات (مثل 100 مل أو 1 كجم). أضف الأحجام في جدول «أحجام المنتجات».', 'No sizes found in product names. Add them in the sizes table.')])}`) : html``;
    const worst = this.rows[this.rows.length - 1].per, best = this.rows[0].per;
    return this.shell(html`<div class="v">${this.rows.map((x, i) => html`<div class="it ${i === 0 ? 'best' : ''}">
      <span class="rk">${i + 1}</span><img src=${x.p.image} alt="" loading="lazy" />
      <div><div class="nm">${x.p.name}${i === 0 ? html`<span class="tag">${L(c.best_label, t('الأوفر قيمة', 'Best value'))}</span>` : ''}</div><div class="sub">${money(x.p.price)} · ${x.unit === 'pc' ? `${x.amt} ${t('حبة', 'pcs')}` : x.unit === 'g' ? `${x.amt} ${t('جم', 'g')}` : `${x.amt} ${t('مل', 'ml')}`}</div>
        ${bool(c.show_bar, true) ? html`<div class="bar"><i style=${`width:${Math.round((best / x.per) * 100)}%`}></i></div>` : ''}
        ${i === 0 && bool(c.show_saving, true) && worst > best ? html`<div class="save">${t(`أرخص بـ ${Math.round((1 - best / worst) * 100)}% للوحدة من ${this.rows[this.rows.length - 1].p.name}`, `${Math.round((1 - best / worst) * 100)}% cheaper per unit than ${this.rows[this.rows.length - 1].p.name}`)}</div>` : ''}</div>
      <div class="per">${money(Math.round(x.per * 100) / 100)}<small>${this.uLabel(x.unit)}</small></div>
      <button class="btn sm" ?disabled=${!x.p.available} @click=${() => this.add(x.p)}>${t('أضف', 'Add')}</button></div>`)}</div>`,
      { eyebrow: t('حاسبة القيمة', 'Value calculator'), title: t('مين أوفر فعلاً؟ السعر لكل وحدة', 'Who is really cheaper? Price per unit') });
  }
}
