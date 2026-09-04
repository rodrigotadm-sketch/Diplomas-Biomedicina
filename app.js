
const FALLBACK={
 versao:"3.0",atualizacao:"04/09/2026",siga:"https://sistemas.ufpr.br/",taxa_rvdd:"R$ 75,00",
 processo_sei:"23075.054060/2026-11",memorando:"Memorando nº 201/2026/UFPR/R/PROGRAP/COPAP/UDIP",
 assunto_memorando:"Implementação do módulo de solicitação de impressão da RVDD via SIGA / Portal do Egresso (Acesso Externo)",
 retirada:"Setor de Atendimento da PROGRAP",pagamento_rvdd:"https://intranet.ufpr.br/arrecadacao/public/index.jsf",tutorial_url:"",
 nota_tutorial:"O tutorial oficial poderá ser vinculado aqui após sua publicação no WordPress da Biomedicina."
};
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
async function loadData(){try{const r=await fetch("dados.json",{cache:"no-store"});if(!r.ok)throw new Error();return {...FALLBACK,...await r.json()}}catch(e){return FALLBACK}}
function render(d){
 const tutorial=d.tutorial_url?`<a class="btn sec" href="${esc(d.tutorial_url)}" target="_blank" rel="noopener">Tutorial oficial da PROGRAP</a>`:`<p class="alerta"><strong>Tutorial oficial:</strong> ${esc(d.nota_tutorial)}</p>`;
 document.querySelector("#app").innerHTML=`
 <header class="hero"><h1>Diplomas — Biomedicina UFPR</h1><p>Orientações para egressos sobre Diploma Digital, impressão da RVDD, correção de dados e segunda via de diplomas originalmente físicos.</p></header>
 <aside class="atualizacao">
 <p>A solicitação de impressão da Representação Visual do Diploma Digital (RVDD) passou a ser realizada diretamente pelo egresso por meio do <strong>SIGA – Portal do Egresso (Acesso Externo)</strong>.</p>
 <p><strong>Processo SEI nº ${esc(d.processo_sei)}</strong></p>
 </aside>
 <nav class="acessos" aria-label="Acessos rápidos">
  <a class="card-link" href="#diploma-digital">🎓 Diploma Digital</a><a class="card-link" href="#rvdd">🖨️ RVDD impressa</a>
  <a class="card-link" href="#correcao">✏️ Correção de dados</a><a class="card-link" href="#segunda-via">📜 2ª via física</a>
 </nav>
 <section id="diploma-digital"><h2>Diploma Digital e Portal do Egresso</h2>
 <p>Pelo <strong>Acesso Externo – SIGA</strong>, o egresso pode acessar os serviços relacionados ao diploma. Conforme a orientação da Unidade de Diplomas, estão disponíveis o XML do Diploma Digital, a RVDD em PDF/A, o Histórico Escolar e a solicitação da impressão oficial da RVDD.</p>
 <a class="btn" href="${esc(d.siga)}" target="_blank" rel="noopener">Acessar SIGA – Portal do Egresso</a></section>
 <section id="rvdd"><h2>Novo procedimento — RVDD via SIGA</h2>
 <p>A RVDD é a representação visual do Diploma Digital. A impressão oficial em papel e acabamento especial possui taxa de <strong>${esc(d.taxa_rvdd)}</strong>.</p>
 <div class="passos">
  <div class="passo"><strong>Acesse o Portal de Sistemas.</strong><br>Entre em <strong>Acesso Externo – SIGA</strong> e faça login com CPF e a senha anteriormente utilizada no Portal do Aluno.</div>
  <div class="passo"><strong>Abra “Impressão Diploma”.</strong><br>No menu lateral, escolha <strong>Impressão Diploma → Solicitar Impressão</strong>.</div>
  <div class="passo"><strong>Realize o pagamento.</strong><br>A taxa informada é de <strong>${esc(d.taxa_rvdd)}</strong>. Você pode acessar o Portal de Arrecadação da UFPR pelo botão abaixo. Durante a solicitação, confira também as orientações exibidas no próprio SIGA.<br><a class="btn sec" href="${esc(d.pagamento_rvdd)}" target="_blank" rel="noopener">Pagar taxa da RVDD – R$ 75,00</a></div>
  <div class="passo"><strong>Faça o upload do comprovante.</strong><br>Anexe o comprovante de pagamento no próprio SIGA.</div>
  <div class="passo"><strong>Conclua a solicitação.</strong><br>Após anexar o comprovante, clique em <strong>Solicitar Impressão</strong>.</div>
  <div class="passo"><strong>Acompanhe pelo sistema.</strong><br>A disponibilidade para retirada poderá ser acompanhada no próprio SIGA. A entrega física ocorre no <strong>${esc(d.retirada)}</strong>.</div>
 </div>
 <p class="alerta"><strong>Atenção:</strong> a opção para solicitar a impressão somente estará disponível após a conclusão integral do trâmite do Diploma Digital.</p>
 <a class="btn" href="${esc(d.siga)}" target="_blank" rel="noopener">Solicitar RVDD no SIGA</a>${tutorial}
 <p class="ref"><strong>Referência administrativa:</strong> Processo SEI nº ${esc(d.processo_sei)} · ${esc(d.memorando)}.</p></section>
 <section id="correcao"><h2>Correção de dados do Diploma Digital</h2>
 <p>Quando houver necessidade de alteração de dados de um Diploma Digital já emitido, o procedimento envolve análise administrativa e, quando cabível, revogação do diploma anterior e emissão de novo documento. Entre em contato com a Coordenação do Curso para orientação sobre a documentação necessária.</p></section>
 <section id="segunda-via"><h2>2ª via de diploma originalmente físico</h2>
 <p>Esta situação é distinta da impressão da RVDD. O procedimento de segunda via permanece destinado aos diplomas cuja primeira via foi emitida em formato físico. Em caso de dúvida, procure a Coordenação antes de realizar o pagamento ou abrir solicitação.</p></section>
 <footer>Coordenação do Curso de Biomedicina – UFPR · Página atualizada em ${esc(d.atualizacao)} · Versão ${esc(d.versao)}</footer>`;
}
loadData().then(render);
