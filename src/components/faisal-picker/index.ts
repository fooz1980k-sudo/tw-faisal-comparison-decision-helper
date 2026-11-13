import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, t, smart, money, type Prod } from '../../shared/salla';
import { METRICS, mLabel, score, reason, type Metric } from '../../shared/decide';
import { mem, answer } from '../../shared/memory';

/** «اختر وقارن»: the shopper taps up to N products from a pool, a compare tray appears and builds a side-by-side table with a verdict. Pre-selects the products this shopper already looked at. */
export default class FaisalPicker extends Smart {
  @state() private pool: Prod[] = [];
  @state() private sel: number[] = [];
  @state() private open = false;
  private seq = 0;
  static styles = [Smart.base, css`
    .pick { position: relative; } .pick .tick { position: absolute; top: 10px; inset-inline-start: 10px; z-index: 2; width: 32px; height: 32px; border-radius: 50%; border: 2px solid #fff; background: #0005; color: #fff; display: grid; place-items: center; font-weight: 900; cursor: pointer; backdrop-filter: blur(4px); }
    .pick.on .tick { background: var(--A); } .pick.on .card { outline: 3px solid var(--A); outline-offset: -3px; }
    .tray { position: sticky; bottom: 12px; z-index: 5; margin-top: 18px; display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; padding: 12px 16px; border-radius: 18px; background: var(--CARD); box-shadow: 0 12px 40px #0003; border: 1px solid var(--LINE); }
    .tray .th { display: flex; gap: 8px; } .tray img { width: 46px; height: 46px; border-radius: 12px; object-fit: cover; }
    .res { margin-top: 18px; overflow-x: auto; } table { width: 100%; border-collapse: collapse; min-width: 480px; } td, th { padding: 10px; border-bottom: 1px solid var(--LINE); text-align: center; } td:first-child, th:first-child { text-align: start; opacity: .8; }
    .w { background: color-mix(in srgb, var(--A) 10%, transparent); font-weight: 800; } .ok { color: #15803d; font-weight: 800; }
    .verdict { margin-top: 12px; font-weight: 800; padding: 12px 16px; border-radius: 14px; background: color-mix(in srgb, var(--A) 10%, transparent); }
    .hint { font-size: 13px; opacity: .75; margin: -6px 0 14px; }
  `];
  willUpdate(ch: Map<string, unknown>) {
    if (!ch.has('config')) return; const n = ++this.seq; const c = this.c;
    smart(c.products, opt(c.auto_source, 'best_selling'), num(c.limit, 8)).then((r) => { if (n !== this.seq) return; this.pool = r.items;
      let pre: number[] = []; try { pre = JSON.parse(mem().answers.faisal_pick || '[]'); } catch { /* ignore */ }
      pre = pre.filter((id) => r.items.some((p) => p.id === id));
      if (!pre.length && bool(c.preselect_seen, true)) { const s = mem().seen; pre = r.items.filter((p) => s[p.id]).sort((a, b) => (s[b.id] || 0) - (s[a.id] || 0)).slice(0, 2).map((p) => p.id); }
      this.sel = pre.slice(0, this.max); this.open = bool(c.auto_open, true) && this.sel.length >= 2; });
  }
  private get max() { return Math.max(2, num(this.c.max_pick, 3)); }
  private toggle(p: Prod) { const s = this.sel.includes(p.id) ? this.sel.filter((x) => x !== p.id) : this.sel.length >= this.max ? [...this.sel.slice(1), p.id] : [...this.sel, p.id]; this.sel = s; if (s.length < 2) this.open = false; answer('faisal_pick', JSON.stringify(s)); }
  render() {
    const c = this.c; if (!this.pool.length) return this.shell(html`<div class="skel"></div>`);
    const chosen = this.sel.map((id) => this.pool.find((p) => p.id === id)!).filter(Boolean);
    const ms = METRICS.filter((m) => bool(c[`m_${m}`], m !== 'reviews'));
    const w = Object.fromEntries(ms.map((m) => [m, num(c[`w_${m}`], m === 'price' || m === 'rating' ? 3 : 1)])) as Partial<Record<Metric, number>>;
    const sc = chosen.length >= 2 ? score(chosen, w) : []; const by = new Map(sc.map((s) => [s.p.id, s]));
    const v = (p: Prod, m: Metric) => m === 'price' ? money(p.price) : m === 'rating' ? (p.rating ? `${p.rating.toFixed(1)}★` : '—') : m === 'discount' ? (p.discount ? `${p.discount}%` : '—') : m === 'popular' ? (p.sold ?? '—') : m === 'reviews' ? (p.ratingCount || '—') : (p.available ? '✓' : '✕');
    return this.shell(html`
      <p class="hint">${L(c.hint, t(`اختر حتى ${this.max} منتجات بالضغط على ✓`, `Tap ✓ on up to ${this.max} products`))}${this.sel.length && !this.open && bool(c.preselect_seen, true) ? t(' — اخترنا لك ما شاهدته مؤخراً', ' — we pre-picked what you viewed') : ''}</p>
      <div class="grid">${this.pool.map((p) => html`<div class="pick ${this.sel.includes(p.id) ? 'on' : ''}"><button class="tick" aria-pressed=${this.sel.includes(p.id)} @click=${() => this.toggle(p)}>${this.sel.includes(p.id) ? this.sel.indexOf(p.id) + 1 : '+'}</button>${this.card(p, { quick: bool(c.quick_add, true) })}</div>`)}</div>
      ${this.sel.length ? html`<div class="tray"><div class="th">${chosen.map((p) => html`<img src=${p.image} alt=${p.name} />`)}</div><span>${t(`${chosen.length} من ${this.max}`, `${chosen.length} of ${this.max}`)}</span>
        <button class="btn" ?disabled=${chosen.length < 2} @click=${() => (this.open = !this.open)}>${this.open ? t('إخفاء المقارنة', 'Hide') : L(c.cta, t('قارن الآن', 'Compare now'))}</button></div>` : ''}
      ${this.open && sc.length ? html`<div class="panel res"><table><thead><tr><th></th>${chosen.map((p) => html`<th class=${p.id === sc[0].p.id ? 'w' : ''}>${p.name}</th>`)}</tr></thead><tbody>
        ${ms.map((m) => { const b = Math.max(...chosen.map((p) => by.get(p.id)!.parts[m] ?? -1)); return html`<tr><td>${mLabel(m)}</td>${chosen.map((p) => html`<td class="${p.id === sc[0].p.id ? 'w' : ''} ${by.get(p.id)!.parts[m] === b && b >= 0 ? 'ok' : ''}">${v(p, m)}</td>`)}</tr>`; })}
        ${bool(c.show_score, true) ? html`<tr><td>${t('النتيجة', 'Score')}</td>${chosen.map((p) => html`<td class=${p.id === sc[0].p.id ? 'w' : ''}>${by.get(p.id)!.score}%</td>`)}</tr>` : ''}
        <tr><td></td>${chosen.map((p) => html`<td><button class="btn sm" ?disabled=${!p.available} @click=${() => this.add(p)}>${t('أضف', 'Add')}</button></td>`)}</tr></tbody></table>
        <div class="verdict">🏆 ${sc[0].p.name} — ${reason(sc[0], sc.slice(1), w)}</div></div>` : ''}`,
      { eyebrow: t('اختر وقارن', 'Pick & compare'), title: t('محتار بينهم؟ قارن بنفسك', 'Torn between them? Compare') });
  }
}
