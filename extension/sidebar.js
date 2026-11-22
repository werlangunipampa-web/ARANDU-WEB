'use strict';
const $ = id => document.getElementById(id);
const labels = {bookmarks: 'Favoritos', tabs: 'Abas abertas', history: 'Histórico recente'};
const descriptions = {
  bookmarks: 'Sites salvos nos seus favoritos.',
  tabs: 'Selecione uma aba para continuar navegando.',
  history: 'Páginas visitadas recentemente.'
};
const state = {river: 'tabs', expanded: true, items: [], shown: [], selected: 0, request: 0};
function notify(message) { $('status').textContent = message; }
function flattenBookmarks(nodes, output) {
  for (const n of nodes) {
    if (n.url && ArndCore.safeUrl(n.url)) output.push({id: n.id, title: n.title || n.url, url: n.url, kind: 'bookmark'});
    if (n.children) flattenBookmarks(n.children, output);
  }
}
async function loadRiver() {
  const request = ++state.request;
  let items = [];
  try {
    if (state.river === 'tabs') {
      const tabs = await browser.tabs.query({currentWindow: true});
      items = tabs.filter(t => t.url && (ArndCore.safeUrl(t.url) || t.url.startsWith('about:'))).map(t => ({id:t.id, title:t.title || 'Nova aba',url:t.url,kind:'tab',active:t.active}));
    } else if (state.river === 'bookmarks') {
      flattenBookmarks(await browser.bookmarks.getTree(), items);
    } else {
      const visited = await browser.history.search({text:'',startTime:Date.now()-90*86400000,maxResults:150});
      items = visited.filter(x=>ArndCore.safeUrl(x.url)).map(x=>({id:x.id,title:x.title||x.url,url:x.url,kind:'history'}));
    }
    if(request !== state.request) return;
    state.items = items;
    state.selected = 0;
    redraw();
  } catch(error) {
    if(request !== state.request) return;
    state.items = [];
    redraw();
    notify('Não foi possível carregar este rio. Verifica as permissões da extensão.');
    console.error(error);
  }
}
function redraw() {
  document.querySelectorAll('[data-river]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.river === state.river)));
  $('river-title').textContent = labels[state.river];
  $('description').textContent = descriptions[state.river];
  state.shown = ArndCore.filterItems(state.items, $('search').value);
  if(state.selected >= state.shown.length) state.selected = Math.max(0, state.shown.length-1);
  $('count').textContent = String(state.shown.length);
  $('empty').hidden = state.shown.length > 0;
  $('items').replaceChildren();
  const frag = document.createDocumentFragment();
  state.shown.slice(0,200).forEach((item,i) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type='button'; button.className='item';
    button.dataset.index = String(i);
    button.setAttribute('aria-current',String(i === state.selected));
    if(item.active) button.classList.add('active-tab');
    const marker = document.createElement('span'); marker.className='medallion'; marker.textContent = item.kind === 'tab'?'◈':item.kind==='bookmark'?'✦':'◌'; marker.setAttribute('aria-hidden','true');
    const words = document.createElement('span'); words.className='item-words';
    const title = document.createElement('strong'); title.textContent = item.title;
    const url = document.createElement('small'); url.textContent = item.url;
    words.append(title,url);button.append(marker,words);
    button.addEventListener('click',()=>{state.selected=i; activate();});
    li.append(button);frag.append(li);
  });
  $('items').append(frag);
  paintSelection();
}
function paintSelection(focus = false) {
  const buttons = $('items').querySelectorAll('.item');
  buttons.forEach((b,i)=>b.setAttribute('aria-current',String(i===state.selected)));
  if(buttons[state.selected]) { buttons[state.selected].scrollIntoView({block:'nearest'}); if (focus) buttons[state.selected].focus({preventScroll:true}); }
}
async function activate() {
  const item=state.shown[state.selected];
  if (!item) return;
  try {
    if(item.kind==='tab') { await browser.tabs.update(item.id,{active:true}); notify('Aba selecionada: '+item.title); }
    else if(ArndCore.safeUrl(item.url)) { await browser.tabs.create({url:item.url}); notify('Site aberto: '+item.title); }
  }catch(err){notify('Não foi possível abrir este item.');console.error(err);}
}
function chooseRiver(river) {
  state.river=ArndCore.selectRiver(river);state.expanded=true;
  $('results-section').hidden=false;$('seed').setAttribute('aria-expanded','true');$('seed').setAttribute('aria-label','Recolher caminhos');
  $('search').value='';notify('Rio '+labels[state.river]+' selecionado');loadRiver();
}
function toggleSeed() {
  state.expanded=!state.expanded;
  $('results-section').hidden=!state.expanded;
  $('seed').setAttribute('aria-expanded',String(state.expanded));
  $('seed').setAttribute('aria-label',state.expanded?'Recolher caminhos':'Expandir caminhos');
  notify(state.expanded?'Caminhos expandidos':'Caminhos recolhidos');
}
function toggleHelp(show) { $('help-panel').hidden=!show; if(show) $('help-close').focus(); }
document.querySelectorAll('[data-river]').forEach(b=>b.addEventListener('click',()=>chooseRiver(b.dataset.river)));
$('seed').addEventListener('click',toggleSeed);
$('search').addEventListener('input',()=>{state.selected=0;redraw();});
$('help').addEventListener('click',()=>toggleHelp($('help-panel').hidden));
$('help-close').addEventListener('click',()=>toggleHelp(false));
document.addEventListener('keydown',e=>{
  const typing=e.target instanceof HTMLInputElement;
  if(e.key==='F1'){e.preventDefault();toggleHelp(true);return;}
  if(e.key==='Escape'){
    if(!$('help-panel').hidden){toggleHelp(false);$('help').focus();}
    else if(typing){$('search').value='';$('search').blur();redraw();}
    return;
  }
  if(e.altKey && /^[123]$/.test(e.key)) {e.preventDefault();chooseRiver(['bookmarks','tabs','history'][Number(e.key)-1]);return;}
  if(typing || !$('help-panel').hidden || !state.expanded) return;
  if(e.key==='/' && !e.ctrlKey && !e.altKey){e.preventDefault();$('search').focus();return;}
  if(e.key==='ArrowDown' || e.key==='ArrowUp') {
    e.preventDefault();state.selected=ArndCore.advance(state.selected,state.shown.length,e.key==='ArrowDown'?1:-1);paintSelection(true);
    if(state.selected>=0)notify('Selecionado: '+state.shown[state.selected].title);
    return;
  }
  if(e.key==='Enter' && !e.ctrlKey && !e.altKey && !e.metaKey){
    if(['BUTTON','A'].includes(e.target.tagName)) return; // controles nativos continuam operando normalmente
    e.preventDefault();activate();
  }
});
// Atualiza abas somente quando esse rio estiver ativo, evitando estado obsoleto.
browser.tabs.onCreated.addListener(()=>{if(state.river==='tabs')loadRiver();});
browser.tabs.onRemoved.addListener(()=>{if(state.river==='tabs')loadRiver();});
browser.tabs.onUpdated.addListener(()=>{if(state.river==='tabs')loadRiver();});
browser.tabs.onActivated.addListener(()=>{if(state.river==='tabs')loadRiver();});
loadRiver();
