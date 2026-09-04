const $ = (sel) => document.querySelector(sel);
const esc = (s='') => String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const links = (arr=[]) => `<div class="botoes">${arr.map(b=>`<a class="btn ${esc(b.tipo||'secundario')}" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.rotulo)}</a>`).join('')}</div>`;
const lista = (arr=[]) => `<ul class="lista">${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
const passos = (arr=[]) => `<ol class="passos">${arr.map(x=>`<li>${esc(x)}</li>`).join('')}</ol>`;

// Dados de segurança: a página continua funcional mesmo se dados.json não carregar.
const FALLBACK_DATA = {
  "meta": {
    "titulo": "Diplomas — Biomedicina UFPR",
    "subtitulo": "Orientações para egressos sobre Diploma Digital, RVDD, correção de dados e segunda via de diplomas físicos.",
    "versao": "2.1",
    "atualizadoEm": "04/09/2026"
  },
  "avisos": [
    {
      "tipo": "importante",
      "titulo": "Diploma Digital x RVDD",
      "texto": "O Diploma Digital é o documento juridicamente válido. A RVDD é a representação visual do diploma e permite consultar e validar seus dados por QR Code e código de validação."
    }
  ],
  "atalhos": [
    {
      "icone": "🎓",
      "titulo": "Acessar meu Diploma Digital",
      "descricao": "Entenda os documentos digitais e como acompanhar a emissão.",
      "alvo": "#diploma-digital"
    },
    {
      "icone": "🖨️",
      "titulo": "Quero a RVDD impressa",
      "descricao": "Veja taxa, pagamento, documentos e retirada.",
      "alvo": "#rvdd"
    },
    {
      "icone": "✏️",
      "titulo": "Preciso corrigir dados do diploma",
      "descricao": "Saiba como funciona a alteração de dados de um diploma já emitido.",
      "alvo": "#correcao"
    },
    {
      "icone": "📜",
      "titulo": "Preciso de 2ª via de diploma físico",
      "descricao": "Procedimento destinado a diplomas originalmente emitidos em papel.",
      "alvo": "#segunda-via"
    }
  ],
  "diplomaDigital": {
    "titulo": "Diploma Digital",
    "intro": "Na modalidade de Diploma Digital, o diploma não é impresso. Após a conclusão do processo de emissão e registro, os documentos ficam disponíveis em formato digital.",
    "documentos": [
      "XML do Diploma Digital",
      "Representação Visual do Diploma Digital (RVDD)",
      "XML do Histórico Escolar Digital",
      "Representação Visual do Histórico Escolar Digital"
    ],
    "observacao": "A representação visual não substitui o Diploma Digital. Ela serve para exibição e consulta dos dados e contém QR Code e código de validação.",
    "botoes": [
      {
        "rotulo": "Orientações completas da Unidade de Diplomas",
        "url": "./orientacoes-diploma-digital.pdf",
        "tipo": "primario"
      }
    ]
  },
  "rvdd": {
    "titulo": "Impressão da RVDD",
    "descricao": "Se você deseja uma versão impressa da Representação Visual do Diploma Digital, siga as orientações abaixo.",
    "taxa": "R$ 75,00",
    "codigoServico": "11845",
    "numeroReferencia": "1715366206001",
    "formasPagamento": [
      "PIX",
      "Cartão de crédito",
      "GRU tradicional"
    ],
    "passos": [
      "Acesse o sistema de arrecadação da UFPR e efetue o pagamento da taxa.",
      "Encaminhe à Coordenação a solicitação/requerimento e o comprovante de pagamento.",
      "A Coordenação instruirá o processo administrativo para a Unidade de Diplomas.",
      "Após a impressão, o egresso será comunicado para retirada."
    ],
    "retirada": {
      "local": "Atendimento da PROGRAP",
      "endereco": "Praça Santos Andrade, 50 — Centro, Curitiba/PR",
      "horario": "Segunda a sexta-feira, das 9h às 12h e das 14h às 17h",
      "observacao": "A retirada pode ser realizada pelo egresso ou por representante legal, conforme orientação da Unidade de Diplomas."
    },
    "botoes": [
      {
        "rotulo": "Pagar taxa na UFPR",
        "url": "https://intranet.ufpr.br/arrecadacao/public/index.jsf",
        "tipo": "primario"
      },
      {
        "rotulo": "Tutorial de pagamento",
        "url": "./tutorial-pagamento-taxas-rvdd.pdf",
        "tipo": "secundario"
      },
      {
        "rotulo": "Requerimento RVDD",
        "url": "https://bio.ufpr.br/biomedicina/wp-content/uploads/sites/4/2026/08/Requerimento_RVDD.pdf",
        "tipo": "secundario"
      }
    ]
  },
  "correcao": {
    "titulo": "Correção de dados do Diploma Digital",
    "descricao": "Quando é necessária alteração de dados de um Diploma Digital já emitido, o procedimento envolve a revogação do diploma anterior e a emissão de um novo documento com os dados corrigidos.",
    "passos": [
      "Entre em contato com a Coordenação do Curso e descreva o dado que precisa ser corrigido.",
      "Apresente a justificativa e os documentos comprobatórios necessários.",
      "A Coordenação orientará e instruirá o procedimento administrativo junto à Unidade de Diplomas."
    ],
    "alerta": "Não se trata de editar o arquivo já emitido: a alteração exige revogação do diploma anterior e nova emissão.",
    "botoes": [
      {
        "rotulo": "Falar com a Coordenação",
        "url": "mailto:biomedicina@ufpr.br?subject=Orientação%20sobre%20correção%20de%20dados%20do%20Diploma%20Digital",
        "tipo": "primario"
      }
    ]
  },
  "segundaVia": {
    "titulo": "2ª via de diploma físico",
    "descricao": "Este procedimento é destinado aos casos em que a primeira via foi emitida em formato físico. Diplomas emitidos digitalmente seguem o procedimento próprio de correção/revogação e nova emissão.",
    "taxa": "R$ 295,00",
    "codigoServico": "11845",
    "numeroReferencia": "1715366206001",
    "documentos": [
      "Solicitação com identificação do requerente",
      "RG e CPF",
      "Cópia do diploma físico ou dados do registro do diploma",
      "Comprovante de pagamento da taxa"
    ],
    "botoes": [
      {
        "rotulo": "Pagar taxa na UFPR",
        "url": "https://intranet.ufpr.br/arrecadacao/public/index.jsf",
        "tipo": "primario"
      },
      {
        "rotulo": "Consultar orientações completas",
        "url": "./orientacoes-diploma-digital.pdf",
        "tipo": "secundario"
      }
    ]
  },
  "decisor": {
    "titulo": "Não sabe qual opção escolher?",
    "itens": [
      {
        "pergunta": "Meu diploma ainda está sendo emitido",
        "resposta": "Consulte as orientações de Diploma Digital e acompanhe o processo de emissão e registro.",
        "alvo": "#diploma-digital"
      },
      {
        "pergunta": "Já tenho Diploma Digital e quero uma versão impressa",
        "resposta": "Solicite a impressão da RVDD.",
        "alvo": "#rvdd"
      },
      {
        "pergunta": "Há um dado incorreto no meu Diploma Digital",
        "resposta": "Procure a Coordenação para orientação sobre correção e nova emissão.",
        "alvo": "#correcao"
      },
      {
        "pergunta": "Meu diploma antigo era físico e preciso de outro exemplar",
        "resposta": "Consulte o procedimento de 2ª via de diploma físico.",
        "alvo": "#segunda-via"
      }
    ]
  },
  "contato": {
    "titulo": "Coordenação do Curso de Biomedicina",
    "email": "biomedicina@ufpr.br",
    "telefone": "+55 (41) 3361-1744",
    "endereco": "Avenida Coronel Francisco H. dos Santos, nº 100 — Jardim das Américas, Curitiba/PR — CEP 81531-980"
  }
};

function render(d) {
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
}

fetch('./dados.json', {cache:'no-store'})
  .then(r=>{if(!r.ok) throw new Error(`HTTP ${r.status}`); return r.json();})
  .then(render)
  .catch(err=>{
    console.warn('dados.json indisponível; usando dados internos de segurança.', err);
    render(FALLBACK_DATA);
  });
