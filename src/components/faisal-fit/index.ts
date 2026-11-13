import { css, html } from 'lit';
import { state } from 'lit/decorators.js';
import { Smart } from '../../shared/ui';
import { L, opt, num, bool, list, ids, t, smart, byIds, money, csv, type Prod } from '../../shared/salla';
import { mem, answer } from '../../shared/memory';

type R = Record<string, unknown>;
interface Persona { key: string; icon: string; title: string; desc: string; p: Prod; why: string; pros: string[]; cons: string[] }
/** «أنت من أي نوع؟»: shopper picks the persona that describes them (saver, quality-first, gift giver…) and gets one product with honest pros and cons. Personas are built automatically from real store data, or written by the merchant. */
export default class FaisalFit extends Smart {
  @state() private ps: Persona[] = [];
  @state() private cur = '';
  private seq = 0;
  static styles = [Smart.base, css`
    .chips { justify-content: center; margin-bottom: 20px; } .chip.on { background: var(--A); color: #fff; border-color: var(--A); }
    .res { display: grid; grid-template-columns: minmax(200px, 340px) 1fr; gap: 26px; align-items: center; } .res img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 24px; box-shadow: var(--sh); }
    .ttl { font-size: 1.5em; font-weight: 900; margin: 6px 0; } .why { font-weight: 700; color: var(--A); } .pr { font-size: 1.3em; font-weight: 900; margin: 8px 0 12px; }
    ul { list-style: none; padding: 0; margin: 0 0 12px; display: grid; gap: 6px; } li::before { margin-inline-end: 8px; } .pros li::before { content: '✓'; color: #15803d; font-weight: 900; } .cons li::before { content: '•'; color: #b45309; font-weight: 900; }
    .ico { font-size: 34px; } @media (max-width: 720px) { .res { grid-template-columns: 1fr; } }
  `];
  willUpdate(ch: Map<string, unknown>) {
    if (!ch.has('config')) return; const n = ++this.seq; const c = this.c;
    (async () => { const custom = list<R>(c.personas); let out: Persona[] = [];
      if (custom.length) { const prods = await byIds(custom.flatMap((x) => ids(x.product)));
        out = custom.map((x, i) => { const p = prods.find((q) => q.id === ids(x.product)[0]); return p ? { key: `c${i}`, icon: L(x.icon, '✨'), title: L(x.title), desc: L(x.desc), p, why: L(x.why), pros: csv(x.pros), cons: csv(x.cons) } : null; }).filter((x): x is Persona => !!x); }
      if (!out.length || bool(c.mix_auto)) { const pool = (await smart(null, opt(c.auto_source, 'best_selling'), num(c.pool, 16))).items.filter((p) => p.available); if (pool.length) out = [...out, ...this.auto(pool)]; }
      if (n !== this.seq) return; this.ps = out.slice(0, num(c.max_personas, 5)); const last = mem().answers.faisal_fit; this.cur = this.ps.some((p) => p.key === last) ? last : this.ps[0]?.key ?? ''; })();
  }
  private auto(pool: Prod[]): Persona[] { const c = this.c; const by = (f: (p: Prod) => number) => [...pool].sort((a, b) => f(b) - f(a))[0]; const out: Persona[] = []; const used = new Set<number>();
    const add = (key: string, on: boolean, icon: string, title: string, desc: string, p: Prod | undefined, why: string, pros: string[], cons: string[]) => { if (!on || !p) return; if (used.has(p.id) && bool(c.unique, true)) { const alt = pool.find((q) => !used.has(q.id)); if (!alt) return; } used.add(p.id); out.push({ key, icon, title, desc, p, why, pros: pros.filter(Boolean), cons: cons.filter(Boolean) }); };
    const cheap = by((p) => -p.price), top = pool.filter((p) => p.ratingCount >= num(c.min_reviews, 3)).sort((a, b) => b.rating - a.rating)[0], pop = pool.filter((p) => p.sold != null).sort((a, b) => (b.sold ?? 0) - (a.sold ?? 0))[0], deal = pool.filter((p) => p.discount > 0).sort((a, b) => b.discount - a.discount)[0], lux = by((p) => p.price);
    const avg = pool.reduce((s, p) => s + p.price, 0) / pool.length;
    add('saver', bool(c.p_saver, true), '💰', t('أبي الأوفر', 'I want the best price'), t('ميزانيتك أهم شي', 'Budget comes first'), cheap, t(`الأقل سعراً بين ${pool.length} منتج`, `Lowest price of ${pool.length}`), [avg > cheap.price ? t(`أقل من متوسط الأسعار بـ ${Math.round((1 - cheap.price / avg) * 100)}%`, `${Math.round((1 - cheap.price / avg) * 100)}% below the average price`) : '', cheap.rating ? `${cheap.rating.toFixed(1)}★` : ''], [cheap.price < avg * 0.6 ? t('خيارات أقل فخامة', 'Less premium') : '']);
    add('quality', bool(c.p_quality, true), '⭐', t('أبي الأعلى تقييماً', 'I want top quality'), t('رأي العملاء يهمك', 'You trust reviews'), top, top ? t(`${top.rating.toFixed(1)}★ من ${top.ratingCount} تقييم حقيقي`, `${top.rating.toFixed(1)}★ from ${top.ratingCount} real reviews`) : '', top ? [t(`${top.ratingCount} تقييم`, `${top.ratingCount} reviews`)] : [], top && top.price > avg ? [t('أعلى من متوسط السعر', 'Above average price')] : []);
    add('popular', bool(c.p_popular, true), '🔥', t('أبي اللي يطلبه الكل', 'What everyone buys'), t('تحب الخيار المضمون', 'You like the safe choice'), pop, pop ? t(`بيع منه ${pop.sold} حتى الآن`, `${pop.sold} sold so far`) : '', [], []);
    add('deal', bool(c.p_deal, true), '🏷️', t('أبي أقوى عرض', 'I want the best deal'), t('تقتنص الخصومات', 'You hunt discounts'), deal, deal ? t(`خصم ${deal.discount}% — وفّر ${money(deal.regular - deal.price)}`, `${deal.discount}% off — save ${money(deal.regular - deal.price)}`) : '', [], deal?.endsAt ? [t('العرض لفترة محدودة', 'Limited time')] : []);
    add('gift', bool(c.p_gift, true), '🎁', t('أبي هدية تبيّض الوجه', 'A gift that impresses'), t('للمناسبات والإهداء', 'For gifting'), lux, t('الأفخم في التشكيلة', 'The most premium pick'), [lux.rating ? `${lux.rating.toFixed(1)}★` : ''], [t('الأعلى سعراً', 'Highest price')]);
    return out; }
  render() {
    const c = this.c; if (!this.ps.length) return this.shell(html`<div class="skel"></div>`);
    const p = this.ps.find((x) => x.key === this.cur) ?? this.ps[0];
    return this.shell(html`
      <div class="chips">${this.ps.map((x) => html`<button class="chip ${x.key === p.key ? 'on' : ''}" @click=${() => { this.cur = x.key; answer('faisal_fit', x.key); }}>${x.icon} ${x.title}</button>`)}</div>
      <div class="panel res"><img src=${p.p.image} alt="" /><div><span class="ico">${p.icon}</span><div class="sub">${p.desc}</div><div class="ttl">${p.p.name}</div>${p.why ? html`<div class="why">${p.why}</div>` : ''}<div class="pr">${money(p.p.price)}</div>
        ${bool(c.show_pros, true) && p.pros.length ? html`<ul class="pros">${p.pros.map((x) => html`<li>${x}</li>`)}</ul>` : ''}
        ${bool(c.show_cons, true) && p.cons.length ? html`<ul class="cons">${p.cons.map((x) => html`<li>${x}</li>`)}</ul>` : ''}
        <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn" ?disabled=${!p.p.available} @click=${() => this.add(p.p)}>${L(c.cta, t('أضف للسلة', 'Add to cart'))}</button><a class="btn ghost" href=${p.p.url}>${t('التفاصيل', 'Details')}</a></div></div></div>`,
      { eyebrow: t('أنت من أي نوع؟', 'Which shopper are you?'), title: t('اختر وصفك… ونختار لك', 'Pick your style, we pick for you') });
  }
}
