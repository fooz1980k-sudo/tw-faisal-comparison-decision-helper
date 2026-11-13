import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, list, t, smart, money, type Prod } from '../../shared/salla';
import { METRICS, mLabel, score, reason, type Metric } from '../../shared/decide';
import { answer, mem } from '../../shared/memory';

type R = Record<string, unknown>;
/** Comparison that listens: the shopper moves priority sliders (price, rating, discount, popularity…) and the «best for you» pick and its reason update live from real product data; merchant spec rows sit under it. */
export default class FaisalCompare extends Smart {
  @state() private items: Prod[] = [];
  @state() private w: Partial<Record<Metric, number>> = {};
  private seq = 0;
  static styles = [Smart.base, css`
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
  willUpdate(ch: Map<string, unknown>) {
    if (!ch.has('config')) return; const n = ++this.seq; const c = this.c;
    const saved = bool(c.remember, true) ? mem().answers.faisal_w : ''; let w: Partial<Record<Metric, number>> = {};
    try { w = saved ? JSON.parse(saved) : {}; } catch { /* ignore */ }
    this.w = Object.fromEntries(METRICS.map((m) => [m, w[m] ?? num(c[`w_${m}`], m === 'price' || m === 'rating' ? 3 : 2)]));
    smart(c.products, opt(c.auto_source, 'best_selling'), num(c.limit, 3)).then((r) => { if (n === this.seq) this.items = r.items.slice(0, num(c.limit, 3)); });
  }
  private set(m: Metric, v: number) { this.w = { ...this.w, [m]: v }; if (bool(this.c.remember, true)) answer('faisal_w', JSON.stringify(this.w)); }
  render() {
    const c = this.c; const L_ = this.items; if (L_.length < 2) return this.shell(html`${this.hints([t('اختر منتجين على الأقل أو اترك الحقل فارغاً للاختيار التلقائي.', 'Pick at least two products.')])}<div class="skel"></div>`);
    const active = METRICS.filter((m) => bool(c[`m_${m}`], m !== 'reviews' && m !== 'stock' ? true : false));
    const sc = score(L_, Object.fromEntries(active.map((m) => [m, this.w[m] ?? 0])));
    const win = sc[0]; const byId = new Map(sc.map((s) => [s.p.id, s]));
    const specs = list<R>(c.specs);
    const best = (m: Metric) => Math.max(...L_.map((p) => byId.get(p.id)!.parts[m] ?? -1));
    const val = (p: Prod, m: Metric) => m === 'price' ? money(p.price) : m === 'rating' ? (p.rating ? `${p.rating.toFixed(1)}★` : '—') : m === 'discount' ? (p.discount ? `${p.discount}%` : '—') : m === 'popular' ? (p.sold != null ? t(`بيع ${p.sold}`, `${p.sold} sold`) : '—') : m === 'reviews' ? (p.ratingCount || '—') : (p.available ? (p.qty != null ? t(`متوفر ${p.qty}`, `${p.qty} in stock`) : t('متوفر', 'In stock')) : t('نفد', 'Sold out'));
    return this.shell(html`
      ${bool(c.sliders, true) ? html`<div class="panel pri">${active.map((m) => html`<label>${mLabel(m)} <input type="range" min="0" max="5" .value=${String(this.w[m] ?? 0)} @input=${(e: Event) => this.set(m, +(e.target as HTMLInputElement).value)} /></label>`)}</div>` : ''}
      <div class="panel tbl"><table><thead><tr><th>${L(c.corner_label, t('أولوياتك تقرر', 'Your priorities decide'))}</th>${L_.map((p) => html`<th class=${p.id === win.p.id ? 'win' : ''}>${p.id === win.p.id ? html`<span class="crown">👑 ${L(c.win_label, t('الأنسب لك', 'Best for you'))}</span>` : html`<span class="crown" style="visibility:hidden">.</span>`}<img class="pimg" src=${p.image} alt="" loading="lazy" /><a class="n" href=${p.url}>${p.name}</a></th>`)}</tr></thead>
        <tbody>${bool(c.show_score, true) ? html`<tr><td>${t('التطابق مع أولوياتك', 'Match to your priorities')}</td>${L_.map((p) => { const s = byId.get(p.id)!; return html`<td class=${p.id === win.p.id ? 'win' : ''}><span class="sc">${s.score}%</span><div class="bar"><i style=${`width:${s.score}%`}></i></div></td>`; })}</tr>` : ''}
          ${active.map((m) => html`<tr><td>${mLabel(m)}</td>${L_.map((p) => { const x = byId.get(p.id)!.parts[m]; return html`<td class="${p.id === win.p.id ? 'win' : ''} ${x != null && x === best(m) && bool(c.highlight, true) ? 'best' : ''}">${val(p, m)}</td>`; })}</tr>`)}
          ${specs.map((s) => html`<tr><td>${L(s.label)}</td>${L_.map((p, i) => html`<td class=${p.id === win.p.id ? 'win' : ''}>${L(s[`v${i + 1}`]) || '—'}</td>`)}</tr>`)}
          <tr><td></td>${L_.map((p) => html`<td class=${p.id === win.p.id ? 'win' : ''}><button class="btn sm" ?disabled=${!p.available} @click=${() => this.add(p)}>${t('أضف للسلة', 'Add to cart')}</button></td>`)}</tr></tbody></table></div>
      ${bool(c.show_reason, true) ? html`<p class="why">💡 ${win.p.name}: ${reason(win, sc.slice(1), Object.fromEntries(active.map((m) => [m, this.w[m] ?? 0])))}</p>` : ''}`,
      { eyebrow: t('فيصل يقارن', 'Compare'), title: t('حرّك أولوياتك… ونقول لك الأنسب', 'Move your priorities, we pick the best') });
  }
}
