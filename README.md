# Dário Silva — Arte & Legado

DÁRIO SILVA — Artista Plástico

Site editorial de artista em Next.js App Router, TypeScript e Tailwind CSS. Papel branco quente, tipografia serifada editorial e composições assimétricas. Layouts distintos para desktop e mobile; sem carrosséis ou pinturas artificiais.

## Desenvolvimento

Node.js 24 e npm 11 foram usados na validação. Utilize o checkout existente: tarefas na nuvem já são isoladas, não é necessário criar worktrees.

```sh
npm ci
npm run dev
```

## Verificação

```sh
npm run test
npm run build
npm run typecheck
npx playwright install chromium
npx playwright test
```

Se o ambiente já tiver Chromium instalado, use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npx playwright test` sem baixar outro navegador.

O Playwright inicia o servidor de produção automaticamente e testa navegação, mobile, ampliação por teclado, fichas, 404 e largura das páginas. Para executar manualmente em produção: `npm run start`.

## Editar o conteúdo

- `data/artworks.ts`: títulos, slugs, ano, técnica, dimensões, proporção, imagem, procedência e autorização. Adicione objetos ao array: acervo, fichas e navegação são gerados automaticamente. Slugs devem ser únicos.
- `data/artist.ts`: biografia confirmada, até dois retratos, trajetória, e-mail e redes sociais.
- Coloque arquivos autorizados em `public/obras/` ou `public/retratos/` e use caminhos como `/obras/nome.webp`. Informe largura e altura originais e descrição acessível. As imagens usam `next/image`, carregamento adaptativo e proporções preservadas, sem filtros ou recortes.
- A imagem de uma obra só aparece quando `image`, `source` e `permission` estão preenchidos. Em `permission`, registre a autorização e sua referência, sem dados pessoais sensíveis. Retratos devem ter os mesmos registros preenchidos antes de entrar no array.
- Não há painel CMS nesta versão: os campos são editáveis nos arquivos TypeScript. Alterações passam pelo build e Git.

Não há pinturas ou fotografias reais nesta entrega. Os seis registros são espaços de catalogação, com dados desconhecidos explicitamente marcados. A pesquisa e suas limitações estão em `docs/image-research.md`. Biografia e exposições não foram inventadas.

## Publicação e SEO

Metadados por página, HTML semântico e idioma pt-BR estão configurados. A indexação está desabilitada enquanto o conteúdo for provisório. Antes de lançar publicamente, revise conteúdo e autorizações, configure domínio canônico/metadataBase, sitemap e altere `robots` em `app/layout.tsx` para permitir indexação. Nenhuma credencial ou serviço externo é necessário para desenvolver e testar.
