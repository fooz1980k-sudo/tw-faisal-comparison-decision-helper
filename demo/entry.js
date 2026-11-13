import { LitElement } from 'lit';
LitElement.registerSallaComponent = function (n) { if (!customElements.get(n)) customElements.define(n, this); };
await import('../dist/faisal-compare.js');
await import('../dist/faisal-duel.js');
await import('../dist/faisal-fit.js');
await import('../dist/faisal-picker.js');
await import('../dist/faisal-value.js');
window.__ready = true;
