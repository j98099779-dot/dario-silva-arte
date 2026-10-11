# SOLARTE — disponibilidade dos anexos

## Resultado desta atualização

O único arquivo recebido no ambiente foi `Texto colado.txt`, que contém o pedido e a transcrição biográfica. Foram conferidos os anexos da conversa e os diretórios de arquivos fornecidos em `/workspace/attachments`, `/workspace/shared/downloads` e `/workspace/library-files`. Não há arquivos de imagem disponíveis para integrar. Nenhuma fotografia ou pintura foi simulada.

**Total solicitado: 13 imagens. Total recebido e integrado: 0. Total indisponível: 13.**

O pedido identifica visualmente os seguintes arquivos pendentes, mas não fornece seus nomes:

| Imagem/papel identificado pelo pedido | Destino preparado | Situação |
| --- | --- | --- |
| Retrato pintado da mulher de cabelos castanhos | Hero; registro `obra-01` reservado | Arquivo não recebido |
| Pinturas geométricas e figurativas | Obras selecionadas, acervo, lightbox e fichas | Arquivos não recebidos; quantidade e nomes individuais não informados |
| Artista sorrindo, com boina e óculos | Home, O Artista | Arquivo não recebido |
| Fotografia do ateliê | Home, O Ateliê | Arquivo não recebido |
| Artista sorrindo de camisa branca, acompanhada de biografia | O Artista, retrato principal | Novo arquivo não recebido |
| Retrato formal, com óculos e vestimenta escura | O Artista, retrato complementar | Arquivo não recebido |
| Demais imagens do conjunto de 12 anexos anteriores | Destino a definir após identificação | Arquivos não recebidos; descrições individuais não fornecidas |

Não se presume que a soma das categorias descritas determine uma contagem precisa de pinturas: o texto não enumera as 12 imagens anteriores individualmente. O conjunto completo de 13 imagens precisa ser anexado novamente para uma identificação exata por nome de arquivo.

## Preparação para a integração real

1. Salvar os originais recebidos em `public/images/`, com nomes descritivos, sem recorte, filtros ou alteração das cores. Se o retrato de camisa branca vier em composição com texto, conservar esse original e pedir um retrato separado autorizado em vez de recortar silenciosamente.
2. Registrar fonte e autorização fornecida pela família nos dados, além de dimensões reais em pixels e texto alternativo. A autorização não é presumida a partir de disponibilidade pública.
3. Em `data/artworks.ts`, substituir os registros provisórios e acrescentar todas as pinturas; usar `null` para título/ano/técnica/dimensões desconhecidos segundo o esquema do campo, sem inventar metadados. Atualmente `title` usa uma descrição explícita de catalogação pendente.
4. Em `data/curation.ts`, escolher a obra do hero e as obras selecionadas por slug.
5. Em `data/artist.ts`, configurar os retratos e a fotografia do ateliê nos papéis indicados. As páginas usam Next Image e proporções intrínsecas; o original permanece intacto.
6. Revisar a transcrição com a família antes de remover o aviso de conteúdo provisório ou liberar indexação.

A pesquisa anterior das fontes públicas permanece documentada em `docs/image-research.md`; suas imagens não foram usadas para substituir os anexos ausentes.
