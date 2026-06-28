# Almanaque Alternativo

Plataforma editorial em Astro para publicar conteudos recorrentes sobre arquetipos,
simbolos, figuras, velas, estudos alternativos e artigos de biblioteca.

## Estrutura do projeto

```text
/
├── public/
├── src/
│   ├── components/
│   │   ├── ContentList.astro
│   │   ├── NewsletterSignup.astro
│   │   └── SectionCard.astro
│   ├── content/
│   │   ├── arquetipos/
│   │   ├── artigos/
│   │   ├── figuras/
│   │   └── simbolos/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── arquetipos/
│   │   ├── biblioteca/
│   │   ├── figuras/
│   │   ├── simbolos/
│   │   └── index.astro
│   └── content.config.ts
└── package.json
```

## Como adicionar conteudo

Crie um arquivo `.md` dentro da colecao desejada:

```text
src/content/arquetipos/meu-arquetipo.md
src/content/simbolos/meu-simbolo.md
src/content/figuras/minha-figura.md
src/content/artigos/meu-artigo.md
```

Use este frontmatter como base:

```md
---
title: "Titulo do conteudo"
description: "Resumo curto para cards e SEO."
date: 2026-06-25
category: "Dinheiro e prosperidade"
tags:
  - exemplo
  - estudo
---

Texto do artigo em Markdown.
```

Para esconder um rascunho da listagem e das paginas finais, adicione:

```md
draft: true
```

O campo `category` define em qual pagina tematica o conteudo aparece. As paginas iniciais sao:
`Dinheiro e prosperidade`, `Relacionamentos` e `Trabalho`. A colecao escolhida define a secao
interna da pagina: `arquetipos`, `simbolos` ou `figuras`.

## Como adicionar produtos

Crie um arquivo `.md` em `src/content/produtos/`:

```md
---
title: "Quadro Arquétipo da Águia"
description: "Resumo curto do produto."
price: "R$ 97,00"
image: "/aguia-relacionamentos.png"
checkoutUrl: "https://wa.me/seu_numero_ou_link_do_mercado_pago"
category: "Quadros de arquétipos"
tags:
  - águia
  - foco
---
```

O campo `checkoutUrl` pode apontar para WhatsApp, Mercado Pago ou outro checkout externo.

## Comandos

All commands are run from the root of the project, from a terminal:

| Command | Action |
| :-- | :-- |
| `npm install` | Instala dependencias |
| `npm run dev` | Inicia o servidor local em `localhost:4321` |
| `npm run build` | Gera a build de producao em `./dist/` |
| `npm run preview` | Visualiza a build localmente |

## Newsletter com Beehiiv

O formulario da newsletter e proprio da plataforma e envia inscricoes para o Beehiiv pela rota
serverless `src/pages/api/newsletter.ts`.

Para rodar localmente com Cloudflare, copie o exemplo:

```sh
cp .dev.vars.example .dev.vars
```

Depois preencha:

```text
BEEHIIV_API_KEY=sua_api_key_do_beehiiv
BEEHIIV_PUBLICATION_ID=pub_seu_id_da_publicacao
```

No Cloudflare Pages, cadastre essas mesmas variaveis em `Settings > Environment variables`.
Nao coloque a API key em arquivos versionados.

## Proximas fases sugeridas

- Definir modelo de conteudos gratuitos e exclusivos.
- Escolher autenticacao e pagamentos recorrentes.
- Criar taxonomias por tags, trilhas e referencias bibliograficas.
