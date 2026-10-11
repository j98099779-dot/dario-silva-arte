export type Artwork = {
  slug: string;
  title: string;
  year: string | null;
  technique: string | null;
  dimensions: string | null;
  image: { src: string; alt: string; width: number; height: number } | null;
  source: string | null;
  permission: string | null;
  format: 'portrait' | 'landscape' | 'square';
};

// Slots curatoriais, não obras atribuídas ao artista. Substitua pelos dados confirmados.
export const artworks: Artwork[] = [
  { slug: 'obra-01', title: 'Obra a catalogar — 01', format: 'landscape' },
  { slug: 'obra-02', title: 'Obra a catalogar — 02', format: 'portrait' },
  { slug: 'obra-03', title: 'Obra a catalogar — 03', format: 'square' },
  { slug: 'obra-04', title: 'Obra a catalogar — 04', format: 'portrait' },
  { slug: 'obra-05', title: 'Obra a catalogar — 05', format: 'landscape' },
  { slug: 'obra-06', title: 'Obra a catalogar — 06', format: 'square' },
].map(item => ({ ...item, format: item.format as Artwork['format'], year: null, technique: null, dimensions: null, image: null, source: null, permission: null }));

export function getArtwork(slug: string) { return artworks.find(artwork => artwork.slug === slug); }
export function canDisplayImage(artwork: Artwork) { return Boolean(artwork.image && artwork.source && artwork.permission); }
