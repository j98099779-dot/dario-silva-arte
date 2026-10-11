# Dário Silva — Arte & Legado

SOLARTE | Dário Silva · Artista Plástico

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
npm run lint
npx playwright install chromium
npx playwright test
```

Se o ambiente já tiver Chromium instalado, use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npx playwright test` sem baixar outro navegador.

O Playwright inicia o servidor de produção automaticamente e testa navegação, mobile, ampliação por teclado, fichas, 404 e largura das páginas em 375, 768, 1024, 1440 e 1920 pixels. Para executar manualmente em produção: `npm run start`.

## Editar o conteúdo

- `data/artworks.ts`: títulos, slugs, ano, técnica, dimensões, proporção, imagem, procedência e autorização. Adicione objetos ao array: acervo, fichas e navegação são gerados automaticamente. Slugs devem ser únicos.
- `data/artist.ts`: biografia fornecida pela família (provisória), formação, retratos, ateliê, e-mail e redes sociais.
- `data/curation.ts`: slugs do hero e das obras selecionadas.
- `components/brand.tsx` e `app/icon.svg`: assinatura tipográfica SOLARTE e favicon.
- Coloque os originais autorizados em `public/images/` e use caminhos como `/images/nome.webp`. Não recorte assinaturas nem aplique filtros. Informe largura e altura originais e descrição acessível. As imagens usam `next/image`, carregamento adaptativo e proporções preservadas, sem filtros ou recortes.
- A imagem de uma obra só aparece quando `image`, `source` e `permission` estão preenchidos. Em `permission`, registre a autorização e sua referência, sem dados pessoais sensíveis. Retratos devem ter os mesmos registros preenchidos antes de entrar no array.
- Não há painel CMS nesta versão: os campos são editáveis nos arquivos TypeScript. Alterações passam pelo build e Git.

Nenhuma das 13 imagens citadas na atualização SOLARTE foi recebida neste ambiente. Os seis registros continuam sendo espaços de catalogação, com dados desconhecidos explicitamente marcados. A lista de arquivos ausentes e os destinos preparados estão em `docs/image-integration.md`; a pesquisa anterior está em `docs/image-research.md`. A biografia é a transcrição fornecida pela família, com aviso de conteúdo provisório devido à imagem original parcialmente cortada. A formação e os mestres são atribuídos a essa fonte, sem inventar exposições, premiações ou datas.

## Publicação e SEO

Metadados por página, HTML semântico e idioma pt-BR estão configurados. A indexação está desabilitada enquanto o conteúdo for provisório. Antes de lançar publicamente, revise conteúdo e autorizações, configure domínio canônico/metadataBase, sitemap e altere `robots` em `app/layout.tsx` para permitir indexação. Nenhuma credencial ou serviço externo é necessário para desenvolver e testar.

## Registros visuais

Com o servidor em execução, use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run screenshots` para capturar a Home e O Artista em desktop/mobile. As capturas ficam em `docs/screenshots/` e documentam a versão com imagens pendentes.
