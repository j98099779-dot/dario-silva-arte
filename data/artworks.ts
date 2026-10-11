import inventory from './image-inventory.json';

export type ArtworkImageData = { src: string; alt: string; width: number; height: number };
export type ArtworkDetail = ArtworkImageData & { source: string; permission: string };
export type Artwork = {
  slug: string;
  // Identificador de catálogo, nunca apresentado como título artístico confirmado.
  title: string;
  year: string | null;
  technique: string | null;
  dimensions: string | null;
  image: ArtworkImageData | null;
  source: string | null;
  permission: string | null;
  format: 'portrait' | 'landscape' | 'square';
  details?: ArtworkDetail[];
};

export const imagePermission = 'Integração ao site SOLARTE solicitada pelo usuário ao fornecer os arquivos do artista nesta conversa.';
export function getProvidedImage(filename: string, alt: string): ArtworkDetail {
  const item = inventory.images.find(image => image.filename === filename);
  if (!item) throw new Error(`Imagem não registrada: ${filename}`);
  return {
    src: `/images/${filename}`, alt, width: item.width, height: item.height,
    source: `https://github.com/j98099779-dot/dario-silva-arte/blob/${inventory.uploadCommit}/public/images/${encodeURIComponent(item.originalFilename)}`,
    permission: imagePermission,
  };
}

const records = [
  ['obra-01', 'Obra 01', 'pintura-retrato-mulher-cabelos-castanhos.png', 'Retrato pintado de uma mulher de cabelos castanhos, em tons quentes e fundo escuro.'],
  ['obra-02', 'Obra 02', 'pintura-composicao-rostos.png', 'Pintura com rostos e formas angulosas em azul, verde, ocre e preto.'],
  ['obra-03', 'Obra 03', 'pintura-composicao-geometrica-figura.png', 'Pintura de uma figura entre formas geométricas multicoloridas e linhas marcadas.'],
  ['obra-04', 'Obra 04', 'pintura-composicao-figuras-crianca.png', 'Pintura de figuras reunidas em torno de uma criança, com planos geométricos em tons claros.'],
  ['obra-05', 'Obra 05', 'pintura-composicao-religiosa.png', 'Pintura de uma cena religiosa com mulher, criança e outras figuras; a assinatura Dário Silva aparece na parte inferior.'],
  ['obra-06', 'Obra 06', 'pintura-retrato-homem-oculos.png', 'Retrato pintado de um homem de óculos, barba branca e roupa cinza, em fundo escuro.'],
  ['obra-07', 'Obra 07', 'pintura-crucificacao.png', 'Pintura de uma crucificação com figuras e planos angulosos em tons suaves de verde, cinza e ocre.'],
  ['obra-08', 'Obra 08', 'pintura-paisagem-maritima.png', 'Pintura de barcos à vela e pequenas embarcações em uma paisagem marítima sob céu com nuvens.'],
];

export const artworks: Artwork[] = records.map(([slug, title, filename, alt]) => {
  const supplied = getProvidedImage(filename, alt);
  return {
    slug, title, year: null, technique: null, dimensions: null,
    image: { src: supplied.src, alt: supplied.alt, width: supplied.width, height: supplied.height },
    source: supplied.source, permission: supplied.permission,
    format: supplied.width > supplied.height ? 'landscape' : 'portrait',
    ...(slug === 'obra-05' ? {
      details: [getProvidedImage('detalhe-composicao-religiosa.png', 'Detalhe da Obra 05: a mulher com a criança ao colo, preservando o enquadramento do arquivo fornecido.')],
    } : {}),
  };
});

export function getArtwork(slug: string) { return artworks.find(artwork => artwork.slug === slug); }
export function canDisplayImage(artwork: Artwork) { return Boolean(artwork.image && artwork.source && artwork.permission); }
