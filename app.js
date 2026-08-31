const esc = (v='') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const rich = (v='') => String(v); // conteúdo institucional controlado no JSON; permite <strong> e links simples
const attrs = (link) => link?.externo ? ' target="_blank" rel="noopener"' : '';
function render(data) {
  document.title = data.meta?.tituloPagina || 'Diplomas | Biomedicina UFPR';
  const heroBtns = (data.hero?.botoes || []).map(b => `<a class="btn ${b.estilo==='ghost'?'btn-ghost':'btn-primary'}" href="${esc(b.url)}"${attrs(b)}>${esc(b.rotulo)}</a>`).join('');
  const cards = (data.comparacao?.cards || []).map((c,i) => `<article class="card ${c.tipo==='rvdd'?'rvdd-card':''}">
    <div class="card-title"><div class="icon" aria-hidden="true">${esc(c.icone)}</div><h3>${esc(c.titulo)}</h3></div>
    <span class="badge">${esc(c.selo)}</span><p>${rich(c.descricao)}</p>
    <ul class="checklist">${(c.itens||[]).map(x=>`<li>${rich(x)}</li>`).join('')}</ul></article>`).join('');
  const steps = (data.rvdd?.etapas || []).map(s => `<article class="step"><h3>${esc(s.titulo)}</h3><p>${rich(s.texto)}</p>${s.complemento?`<p class="small">${rich(s.complemento)}</p>`:''}</article>`).join('');
  const quick = (data.acessos?.itens || []).map(a => `<a href="${esc(a.url)}"${attrs(a)}><div class="qicon" aria-hidden="true">${esc(a.icone)}</div><strong>${esc(a.titulo)}</strong><span>${esc(a.descricao)}</span></a>`).join('');
  const faq = (data.faq?.itens || []).map(f => `<details><summary>${esc(f.pergunta)}</summary><p>${rich(f.resposta)}</p></details>`).join('');
  document.getElementById('app').innerHTML = `
  <header class="hero"><div class="wrap"><div class="eyebrow">${esc(data.hero?.eyebrow)}</div><h1>${esc(data.hero?.titulo)}</h1><p>${rich(data.hero?.subtitulo)}</p><div class="hero-actions">${heroBtns}</div></div></header>
  <main><div class="wrap">
    <section class="section" aria-labelledby="entenda"><h2 id="entenda">${esc(data.comparacao?.titulo)}</h2><p class="section-lead">${esc(data.comparacao?.lead)}</p><div class="compare">${cards}</div><div class="notice">${rich(data.comparacao?.resumo)}</div></section>
    <section class="section" id="rvdd" aria-labelledby="solicitar"><h2 id="solicitar">${esc(data.rvdd?.titulo)}</h2><p class="section-lead">${esc(data.rvdd?.lead)}</p><div class="steps">${steps}</div><div class="payment-box">${rich(data.rvdd?.pagamentoNota)}</div></section>
    <section class="section" aria-labelledby="acessos"><h2 id="acessos">${esc(data.acessos?.titulo)}</h2><p class="section-lead">${esc(data.acessos?.lead)}</p><div class="quick">${quick}</div></section>
    <section class="section" aria-labelledby="faq"><h2 id="faq">${esc(data.faq?.titulo)}</h2><p class="section-lead">${esc(data.faq?.lead)}</p><div class="faq">${faq}</div></section>
    <div class="footer-note">${rich(data.rodape?.texto)}</div>
  </div></main>`;
}
fetch('diplomas.json', {cache:'no-store'})
  .then(r => { if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
  .then(render)
  .catch(err => { console.error(err); document.getElementById('app').innerHTML = '<div class="wrap"><div class="error-box"><strong>Não foi possível carregar o conteúdo.</strong><br>Verifique se o arquivo <code>diplomas.json</code> está publicado na mesma pasta do <code>index.html</code>.</div></div>'; });
