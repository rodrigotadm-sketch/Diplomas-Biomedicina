# Diplomas | Biomedicina UFPR — V4 Completo

Página responsiva para publicação via GitHub Pages e incorporação em iframe no WordPress da Coordenação do Curso de Biomedicina da UFPR.

## Estrutura

- `index.html` — estrutura da página e carregamento dos arquivos externos.
- `styles.css` — identidade visual, responsividade, cards, FAQ e botões.
- `app.js` — leitura do JSON e renderização dinâmica da página.
- `diplomas.json` — conteúdo administrativo editável: textos, links, taxa, etapas, FAQ, botões e rodapé.
- `iframe.html` — exemplo de código para incorporar a página no WordPress.
- `.nojekyll` — evita processamento desnecessário do GitHub Pages/Jekyll.

## Como atualizar o conteúdo

Edite apenas `diplomas.json` sempre que possível. Alterações no valor da taxa, links, e-mail, textos, FAQ ou etapas não exigem edição do HTML, CSS ou JavaScript.

## Publicação no GitHub Pages

1. Envie todos os arquivos desta pasta para a raiz do repositório.
2. Ative o GitHub Pages para a branch publicada.
3. Use a URL gerada pelo GitHub Pages no `src` do iframe do WordPress.

## Teste local

Como a página carrega `diplomas.json` via `fetch`, abrir `index.html` diretamente pelo protocolo `file://` pode bloquear o JSON no navegador. Para teste local, use um servidor HTTP simples, por exemplo:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000/`.

## Versão

V4 Completo — base JSON V3 reorganizada em arquivos independentes.
