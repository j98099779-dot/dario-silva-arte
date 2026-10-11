# SOLARTE — integração das imagens reais

## Arquivos recebidos e identificação

O checkout foi sincronizado com `origin/main`. As imagens chegaram pelo upload ao repositório `j98099779-dot/dario-silva-arte`, commit `04edafd`, em `public/images/`. Todas foram inspecionadas visualmente antes da integração.

**Foram encontrados 14 arquivos PNG, correspondentes a 13 imagens únicas.** O `README.md` não entra na contagem. O conjunto contém:

- 8 pinturas distintas;
- 1 imagem de detalhe de uma dessas pinturas;
- 3 fotografias do artista;
- 1 fotografia do ateliê;
- 1 cópia exata do detalhe, preservada como arquivo sem criar outro registro de obra.

O retrato de homem com óculos é uma pintura. As três fotografias do artista foram identificadas separadamente: camisa branca, retrato formal e boina com óculos. O retrato da mulher de cabelos castanhos é a pintura usada no hero.

## Inventário e distribuição

Todos os nomes originais abaixo começam com `Captura de tela 2026-10-11 `. Os nomes descritivos são identificadores de arquivos, não títulos atribuídos às obras.

| Nome original (PNG) | Arquivo descritivo | Pixels originais | Identificação e uso |
| --- | --- | --- | --- |
| `182854.png` | `pintura-retrato-mulher-cabelos-castanhos.png` | 762 × 1007 | Pintura figurativa: hero, acervo, ficha e lightbox |
| `182907.png` | `pintura-composicao-rostos.png` | 561 × 956 | Pintura com rostos em composição expressiva: acervo, ficha e lightbox |
| `182930.png` | `dario-silva-sorrindo-boina-oculos.png` | 767 × 1022 | Fotografia do artista: Home e O Artista |
| `182946.png` | `dario-silva-retrato-formal.png` | 530 × 727 | Fotografia formal do artista: O Artista |
| `182958.png` | `pintura-composicao-geometrica-figura.png` | 580 × 908 | Pintura figurativa geométrica: acervo, ficha e lightbox |
| `183021.png` | `pintura-composicao-figuras-crianca.png` | 685 × 971 | Pintura figurativa de cores suaves: acervo, ficha e lightbox |
| `183038.png` | `atelie-dario-silva.png` | 1252 × 797 | Fotografia do ambiente de criação: seção O Ateliê na Home |
| `183055.png` | `pintura-composicao-religiosa.png` | 517 × 768 | Pintura religiosa completa: acervo, ficha e lightbox |
| `183130.png` | `pintura-retrato-homem-oculos.png` | 338 × 542 | Retrato pintado; identidade do retratado não presumida: acervo, ficha e lightbox |
| `183151 - Copia.png` | `pintura-crucificacao.png` | 567 × 972 | Pintura religiosa em composição figurativa: acervo, ficha e lightbox |
| `183206.png` | `pintura-paisagem-maritima.png` | 1280 × 882 | Pintura de paisagem marítima: acervo, ficha e lightbox |
| `183411.png` | `detalhe-composicao-religiosa.png` | 575 × 1012 | Detalhe da pintura `183055.png`: ligado à ficha da obra, com ampliação |
| `183411 - Copia.png` | `detalhe-composicao-religiosa-copia.png` | 575 × 1012 | Cópia idêntica do detalhe anterior; preservada, sem duplicar a obra ou a exibição |
| `184215.png` | `dario-silva-camisa-branca.png` | 390 × 526 | Fotografia independente do artista: retrato principal em O Artista |

A curadoria de obras selecionadas da Home está em `data/curation.ts`. As pinturas alternam cores mais intensas com tons suaves e formatos distintos. Todas as pinturas têm fichas próprias; o detalhe religioso está associado à pintura completa em vez de ser catalogado como uma nona obra.

## Procedência, autorização e preservação

A fonte de cada imagem é o upload fornecido pelo usuário no repositório. A autorização registrada corresponde à instrução explícita do usuário para integrar esses arquivos ao site SOLARTE. Isso não atribui licença pública de redistribuição nem presume direitos por disponibilidade nas redes sociais. Não foram utilizadas imagens de sites externos ou de artistas homônimos.

Os arquivos foram apenas renomeados: conteúdo, enquadramento, assinaturas, cores e dimensões originais permanecem preservados. O inventário `data/image-inventory.json` registra nomes de origem, nomes finais, dimensões e hashes SHA-256 para conferir a identidade dos arquivos. A cópia exata do detalhe permanece no diretório e é identificada como duplicata no inventário.

O site usa `next/image` com as dimensões intrínsecas e variantes otimizadas sem modificar os originais. Pinturas não recebem recortes, filtros ou deformações. Títulos, datas, técnicas e dimensões físicas desconhecidos permanecem sem informação; descrições visuais servem apenas à identificação e à acessibilidade.

## Biografia e documento histórico

A biografia textual anteriormente fornecida pela família permanece em HTML, com a nota de transcrição provisória já existente.

**Nenhum dos 13 conteúdos únicos recebidos contém uma página impressa com fotografia e biografia.** `184215.png` contém somente o retrato de camisa branca. Portanto, não há documento biográfico histórico disponível neste upload para preservar ou ampliar, e nenhuma fotografia foi apresentada como esse documento. O arquivo documental original poderá ser acrescentado quando estiver disponível, mantendo o texto HTML da biografia.

A pesquisa anterior de fontes públicas continua registrada em `docs/image-research.md`; ela não foi usada como substituta do material enviado.
