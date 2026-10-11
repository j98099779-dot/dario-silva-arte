import Link from 'next/link';
import { artworks, getArtwork, canDisplayImage } from '@/data/artworks';
import { artist, artistBiography } from '@/data/artist';
import { curation } from '@/data/curation';
import { ArtworkImage } from '@/components/artwork-image';
import { ArtistImage } from '@/components/artist-image';
import { Gallery } from '@/components/gallery';

export default function Home() {
  const heroArtwork = getArtwork(curation.hero) ?? artworks[0];
  const selected = curation.selected.flatMap(slug => { const artwork = getArtwork(slug); return artwork ? [artwork] : []; });
  return (
    <>
      <section className="hero page-shell">
        <div className="hero-top"><p className="eyebrow">{artist.subtitle}</p><span className="edition">SOLARTE / Acervo & trajetória</span></div>
        <div className="hero-heading"><h1>DÁRIO SILVA</h1><p>A pintura pede tempo.<br />O olhar, espaço.</p></div>
        <div className="hero-art">
          <span className="vertical-note">UM ESPAÇO PARA A PINTURA</span>
          <figure>
            <ArtworkImage artwork={heroArtwork} priority sizes="(max-width: 700px) 86vw, 76vw" />
            <figcaption><span>{canDisplayImage(heroArtwork) ? heroArtwork.title : 'Obra em destaque · imagem pendente'}</span><span>{canDisplayImage(heroArtwork) ? heroArtwork.year : 'Acervo em preparação'}</span></figcaption>
          </figure>
        </div>
        <div className="hero-bottom"><p>Um encontro com a obra e seu autor.</p><a href="#selecao" className="text-link">Percorrer o acervo <span>↓</span></a></div>
      </section>
      <section id="selecao" className="selection page-shell">
        <div className="section-heading"><div><p className="eyebrow">01 / Acervo</p><h2>Obras<br /><em>selecionadas</em></h2></div><Link className="text-link" href="/obras">Todas as obras ↗</Link></div>
        {selected.some(artwork => !canDisplayImage(artwork)) && <p className="catalog-note">Acervo em preparação. Os espaços abaixo aguardam os arquivos das pinturas e suas informações de catalogação.</p>}
        <Gallery artworks={selected} />
      </section>
      <section className="biography home-artist page-shell">
        <p className="eyebrow">02 / O Artista</p>
        <div className="home-artist-layout">
          <figure><ArtistImage image={artist.homePortrait} label="Dário Silva · retrato com boina" /><figcaption>Um encontro com o artista</figcaption></figure>
          <div className="home-artist-copy">
            <h2>O artista,<br /><em>seu olhar.</em></h2>
            <p>{artistBiography.summary}</p>
            <p className="source-note">Biografia fornecida pela família. Texto provisório, sujeito à revisão.</p>
            <Link className="text-link" href="/o-artista">Conheça o artista ↗</Link>
          </div>
        </div>
      </section>
      <section className="studio page-shell">
        <div className="section-heading"><div><p className="eyebrow">03 / Ambiente de criação</p><h2>O Ateliê</h2></div><p>O espaço da pintura.</p></div>
        <figure><ArtistImage image={artist.studio} label="O ateliê de Dário Silva" format="landscape" /><figcaption><span>Ambiente de criação</span><span>{artist.studio ? 'Registro do ateliê' : 'Fotografia pendente'}</span></figcaption></figure>
      </section>
      <section className="archive-invitation page-shell">
        <p className="eyebrow">Continuar o olhar</p>
        <div><h2>Conheça o<br /><em>acervo completo.</em></h2><Link className="text-link" href="/obras">Percorrer as obras ↗</Link></div>
      </section>
    </>
  );
}
