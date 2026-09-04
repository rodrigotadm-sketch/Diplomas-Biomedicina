const $ = (sel) => document.querySelector(sel);
const esc = (s='') => String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const links = (arr=[]) => `<div class="botoes">${arr.map(b=>`<a class="btn ${esc(b.tipo||'secundario')}" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.rotulo)}</a>`).join('')}</div>`;
const lista = (arr=[]) => `<ul class="lista">${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
const passos = (arr=[]) => `<ol class="passos">${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`;

fetch('dados.json', {cache:'no-store'})
 .then(r=>{if(!r.ok) throw new Error('Não foi possível carregar dados.json'); return r.json();})
 .then(d=>{
  const avisos=(d.avisos||[]).map(a=>`<div class="alerta"><strong>${esc(a.titulo)}</strong>${esc(a.texto)}</div>`).join('');
  const atalhos=(d.atalhos||[]).map(a=>`<a class="atalho" href="${esc(a.alvo)}"><div class="icone">${esc(a.icone)}</div><h2>${esc(a.titulo)}</h2><p>${esc(a.descricao)}</p></a>`).join('');
  const dd=d.diplomaDigital, r=d.rvdd, c=d.correcao, s=d.segundaVia;
  $('#app').innerHTML=`
    <header class="hero"><h1>${esc(d.meta.titulo)}</h1><p>${esc(d.meta.subtitulo)}</p><div class="meta">Versão ${esc(d.meta.versao)} · Atualizado em ${esc(d.meta.atualizadoEm)}</div></header>
    ${avisos}
    <nav class="grid-atalhos" aria-label="Acessos rápidos">${atalhos}</nav>

    <section class="secao" id="diploma-digital"><h2>${esc(dd.titulo)}</h2><p class="intro">${esc(dd.intro)}</p><h3>Documentos disponibilizados</h3>${lista(dd.documentos)}<div class="nota"><strong>Importante:</strong> ${esc(dd.observacao)}</div>${links(dd.botoes)}</section>

    <section class="secao" id="rvdd"><h2>${esc(r.titulo)}</h2><p class="intro">${esc(r.descricao)}</p>
      <div class="facts"><div class="fact"><span>Taxa</span><strong>${esc(r.taxa)}</strong></div><div class="fact"><span>Código do serviço</span><strong>${esc(r.codigoServico)}</strong></div><div class="fact"><span>Número de referência</span><strong>${esc(r.numeroReferencia)}</strong></div></div>
      <h3>Como solicitar</h3>${passos(r.passos)}<h3>Formas de pagamento</h3>${lista(r.formasPagamento)}
      <div class="local"><strong>${esc(r.retirada.local)}</strong><br>${esc(r.retirada.endereco)}<br>${esc(r.retirada.horario)}<br><small>${esc(r.retirada.observacao)}</small></div>${links(r.botoes)}</section>

    <section class="secao" id="correcao"><h2>${esc(c.titulo)}</h2><p class="intro">${esc(c.descricao)}</p>${passos(c.passos)}<div class="alerta"><strong>Atenção</strong>${esc(c.alerta)}</div>${links(c.botoes)}</section>

    <section class="secao" id="segunda-via"><h2>${esc(s.titulo)}</h2><p class="intro">${esc(s.descricao)}</p>
      <div class="facts"><div class="fact"><span>Taxa</span><strong>${esc(s.taxa)}</strong></div><div class="fact"><span>Código do serviço</span><strong>${esc(s.codigoServico)}</strong></div><div class="fact"><span>Número de referência</span><strong>${esc(s.numeroReferencia)}</strong></div></div>
      <h3>Documentos necessários</h3>${lista(s.documentos)}${links(s.botoes)}</section>

    <section class="secao"><h2>${esc(d.decisor.titulo)}</h2><div class="decisor-grid">${d.decisor.itens.map(x=>`<div class="decisor-item"><strong>${esc(x.pergunta)}</strong><span>${esc(x.resposta)}</span><br><a href="${esc(x.alvo)}">Ir para a orientação →</a></div>`).join('')}</div></section>

    <section class="secao contato"><h2>${esc(d.contato.titulo)}</h2><p><strong>E-mail:</strong> <a href="mailto:${esc(d.contato.email)}">${esc(d.contato.email)}</a><br><strong>Telefone:</strong> ${esc(d.contato.telefone)}<br><strong>Endereço:</strong> ${esc(d.contato.endereco)}</p></section>
    <footer class="rodape">Coordenação do Curso de Biomedicina · Universidade Federal do Paraná</footer>`;
 })
 .catch(err=>{$('#app').innerHTML=`<div class="alerta"><strong>Erro ao carregar a página.</strong>${esc(err.message)}</div>`; console.error(err);});
