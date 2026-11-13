// Sample data only (demo harness store).
localStorage.removeItem('tw_smart_mem_v1');
localStorage.setItem('tw_smart_mem_v1', JSON.stringify({ visits: 2, seen: { 102: 3, 104: 2 }, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} }));
const p = (...ids) => ids.map((value) => ({ value }));
window.__cfg = {
  'faisal-compare': { config: { products: p(101, 102, 104), specs: [{ label: 'الحجم', v1: '100 مل', v2: '75 مل', v3: '50 مل' }, { label: 'الثبات', v1: '12 ساعة', v2: '8 ساعات', v3: '10 ساعات' }] } },
  'faisal-picker': { config: { limit: 8 } },
  'faisal-duel': { config: { products: p(101, 102) } },
  'faisal-value': { config: { products: p(101, 102, 104, 110, 103), sizes: [{ product: p(102), amount: 75, unit: [{ value: 'ml' }] }, { product: p(104), amount: 50, unit: [{ value: 'ml' }] }, { product: p(110), amount: 30, unit: [{ value: 'ml' }] }] } },
  'faisal-fit': { config: {} },
};
