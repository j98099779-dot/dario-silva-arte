import Link from 'next/link';
import { notFound } from 'next/navigation';
import { artworks, getArtwork, canDisplayImage } from '@/data/artworks';
import { ArtworkImage } from '@/components/artwork-image';
import { ExpandableImage } from '@/components/expandable-image';

export function generateStaticParams() { return artworks.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const artwork = getArtwork((await params).slug);
  return { title: artwork?.title ?? 'Obra não encontrada' };
}

export default async function ArtworkPage({ params }: { params: Promise<{ slug: string }> }) {
  const artwork = getArtwork((await params).slug);
  if (!artwork) notFound();
  const index = artworks.indexOf(artwork);
  const next = artworks[(index + 1) % artworks.length];
  return (
    <section className="page-shell inner-page">
      <Link href="/obras" className="text-link">← Voltar ao acervo</Link>
      <div className="artwork-detail">
        <ArtworkImage artwork={artwork} priority />
        <div className="artwork-info">
          <p className="eyebrow">Dário Silva / Acervo</p>
          <h1>{artwork.title}</h1>
          <p className="catalog-note">Identificação de catálogo. O título da obra ainda não foi informado.</p>
          <dl>{[['Ano', artwork.year], ['Técnica', artwork.technique], ['Dimensões', artwork.dimensions]].map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value ?? 'A confirmar'}</dd></div>
          ))}</dl>
          {canDisplayImage(artwork) && <p className="catalog-note">Imagem fornecida para o acervo SOLARTE. <a href={artwork.source!} target="_blank" rel="noopener noreferrer">Procedência ↗</a></p>}
          {artwork.image && <a href={artwork.image.src} className="text-link original-image-link" target="_blank" rel="noopener noreferrer">Abrir arquivo original ↗</a>}
        </div>
      </div>
      {artwork.details?.map(detail => (
        <section key={detail.src} className="artwork-detail-image" aria-labelledby="detalhe-titulo">
          <div><p className="eyebrow">Um olhar próximo</p><h2 id="detalhe-titulo">Detalhe da obra</h2>
            <p>Registro de um detalhe de {artwork.title}. Pertence à mesma pintura apresentada acima.</p></div>
          <figure><ExpandableImage image={detail} title={`Detalhe de ${artwork.title}`} actionLabel="Ampliar detalhe da obra" />
            <figcaption><span>{artwork.title} · detalhe</span><a href={detail.source} target="_blank" rel="noopener noreferrer">Procedência ↗</a></figcaption></figure>
        </section>
      ))}
      <div className="next-work"><span>Continuar o olhar</span><Link href={`/obras/${next.slug}`}>{next.title} →</Link></div>
    </section>
  );
}
