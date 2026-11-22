'use strict';
(function (root) {
  const validRivers = ['bookmarks', 'tabs', 'history'];
  function selectRiver(id) { return validRivers.includes(id) ? id : 'tabs'; }
  function advance(index, length, step) {
    if (!Number.isInteger(length) || length <= 0) return -1;
    return ((index + step) % length + length) % length;
  }
  function searchable(s) { return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR'); }
  function filterItems(items, search) {
    const q = searchable(search).trim();
    return q ? items.filter(x => searchable(x.title + ' ' + (x.url || '')).includes(q)) : items;
  }
  function safeUrl(url) {
    try { const u = new URL(url); return ['http:', 'https:'].includes(u.protocol); }
    catch (_) { return false; }
  }
  const api = { validRivers, selectRiver, advance, filterItems, safeUrl };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.ArndCore = api;
})(typeof window === 'undefined' ? globalThis : window);
