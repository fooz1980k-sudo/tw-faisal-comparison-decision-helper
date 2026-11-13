import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, list, t, smart, fromSource, money, type Prod } from '../../shared/salla';
import { METRICS, mLabel, score, type Metric } from '../../shared/decide';

type R = Record<string, unknown>;
/** «وجهاً لوجه»: two products, tug-of-war bars per metric, the price gap explained, and a verdict for two kinds of shopper. Auto-picks a rival from the same category when only one product is set. */
export default class FaisalDuel extends Smart {
  @state() private ab: Prod[] = [];
  private seq = 0;
  static styles = [Smart.base, css`
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
  willUpdate(ch: Map<string, unknown>) {
    if (!ch.has('config')) return; const n = ++this.seq; const c = this.c;
    (async () => { let r = (await smart(c.products, opt(c.auto_source, 'best_selling'), 6)).items;
      if (r.length === 1 || (bool(c.same_category, true) && r.length > 1 && r[0].category && r[1].category !== r[0].category)) { const pool = await fromSource(opt(c.auto_source, 'best_selling'), [], 12); const rival = pool.find((p) => p.id !== r[0].id && (!r[0].category || p.category === r[0].category)) ?? pool.find((p) => p.id !== r[0].id); if (rival) r = [r[0], rival]; }
      if (n === this.seq) this.ab = r.slice(0, 2); })();
  }
  render() {
    const c = this.c; if (this.ab.length < 2) return this.shell(html`<div class="skel"></div>`);
    const [A, B] = this.ab; const ms = METRICS.filter((m) => bool(c[`m_${m}`], m !== 'stock'));
    const w = Object.fromEntries(ms.map((m) => [m, 1])) as Partial<Record<Metric, number>>; const sc = score([A, B], w); const sa = sc.find((s) => s.p.id === A.id)!, sb = sc.find((s) => s.p.id === B.id)!;
    const v = (p: Prod, m: Metric) => m === 'price' ? money(p.price) : m === 'rating' ? (p.rating ? `${p.rating.toFixed(1)}★` : '—') : m === 'discount' ? (p.discount ? `${p.discount}%` : '—') : m === 'popular' ? (p.sold ?? '—') : m === 'reviews' ? (p.ratingCount || '—') : (p.available ? '✓' : '✕');
    const cheap = A.price <= B.price ? A : B, dear = cheap === A ? B : A; const diff = dear.price - cheap.price;
    const extra = list<R>(c.rows);
    return this.shell(html`<div class="panel">
      <div class="vs"><div><img src=${A.image} alt="" /><div class="nm">${A.name}</div><div class="pr">${money(A.price)}</div></div><div class="x">${L(c.vs_label, 'VS')}</div><div><img src=${B.image} alt="" /><div class="nm">${B.name}</div><div class="pr">${money(B.price)}</div></div></div>
      <div class="rows">${ms.map((m) => { const a = sa.parts[m], b = sb.parts[m]; if (a == null && b == null) return ''; const aw = Math.round(((a ?? 0) * 0.8 + 0.2) * 100), bw = Math.round(((b ?? 0) * 0.8 + 0.2) * 100);
        return html`<div class="row"><span class="l ${a != null && a >= (b ?? -1) ? 'won' : ''}">${v(A, m)}</span><div class="tr a"><i style=${`width:${aw}%`}></i></div><span class="m">${mLabel(m)}</span><div class="tr b"><i style=${`width:${bw}%`}></i></div><span class=${b != null && b >= (a ?? -1) ? 'won' : ''}>${v(B, m)}</span></div>`; })}
        ${extra.map((r) => html`<div class="row"><span class="l">${L(r.a)}</span><span></span><span class="m">${L(r.label)}</span><span></span><span>${L(r.b)}</span></div>`)}</div>
      ${bool(c.show_verdict, true) ? html`<div class="gap">
        <div><b>💰 ${L(c.saver_label, t('إذا يهمك التوفير', 'If saving matters'))}</b>${cheap.name}${diff > 0 ? t(` — توفر ${money(diff)}`, ` — you save ${money(diff)}`) : ''}<br /><button class="btn sm" style="margin-top:10px" ?disabled=${!cheap.available} @click=${() => this.add(cheap)}>${t('أضف للسلة', 'Add to cart')}</button></div>
        <div><b>⭐ ${L(c.best_label, t('إذا تبي الأفضل إجمالاً', 'If you want the overall best'))}</b>${sc[0].p.name} — ${t(`تفوّق في ${ms.filter((m) => (sc[0].parts[m] ?? -1) > (sc[1].parts[m] ?? -1)).length} من ${ms.length}`, `wins ${ms.filter((m) => (sc[0].parts[m] ?? -1) > (sc[1].parts[m] ?? -1)).length} of ${ms.length}`)}<br /><button class="btn sm" style="margin-top:10px" ?disabled=${!sc[0].p.available} @click=${() => this.add(sc[0].p)}>${t('أضف للسلة', 'Add to cart')}</button></div></div>` : ''}
    </div>`, { eyebrow: t('وجهاً لوجه', 'Head to head'), title: t('أيهما يناسبك؟', 'Which one suits you?') });
  }
}
