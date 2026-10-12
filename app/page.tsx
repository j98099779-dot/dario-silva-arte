import Link from 'next/link';
import { getArtwork, canDisplayImage } from '@/data/artworks';
import { artist, artistBiography } from '@/data/artist';
import { curation } from '@/data/curation';
import { ArtistImage } from '@/components/artist-image';
import { ArtworkImage } from '@/components/artwork-image';
import { Gallery } from '@/components/gallery';

export default function Home() {
  const heroPortrait = {
    ...artist.portraits[0],
    src: '/images/Captura de tela 2026-10-11 201437.png',
    alt: 'Registro de jornal com fotografia de Dário Silva de terno e óculos diante de pinturas, com texto impresso abaixo.',
    width: 1097,
    height: 957,
    source: 'https://github.com/j98099779-dot/dario-silva-arte/blob/7e3e8a29ed2e31822d375e2a7b69c4a4959a95de/public/images/Captura%20de%20tela%202026-10-11%20201437.png',
  };
  const studioImage = {
    src: '/images/Captura de tela 2026-10-11 201831.png',
    alt: 'Ateliê de Dário Silva com cavaletes, pinturas, pincéis, esculturas e uma cadeira branca entre as obras.',
    width: 992,
    height: 657,
    source: 'https://github.com/j98099779-dot/dario-silva-arte/blob/7e3e8a29ed2e31822d375e2a7b69c4a4959a95de/public/images/Captura%20de%20tela%202026-10-11%20201831.png',
    permission: artist.portraits[0].permission,
  };
  const selected = curation.selected.flatMap(slug => { const artwork = getArtwork(slug); return artwork ? [artwork] : []; });
  const editorialArtwork = getArtwork('obra-01');
  return (
    <>
      <section className="hero page-shell">
        <div className="hero-top"><p className="eyebrow">{artist.subtitle}</p><span className="edition">SOLARTE / Acervo & trajetória</span></div>
        <div className="hero-heading"><h1>DÁRIO SILVA</h1><p>A pintura pede tempo.<br />O olhar, espaço.</p></div>
        <div className="hero-composition">
          <div className="hero-art">
            <figure>
              <ArtistImage image={heroPortrait} label="Dário Silva diante de pinturas" priority />
              <figcaption><span>Dário Silva</span><span>Artista Plástico Brasileiro</span></figcaption>
            </figure>
          </div>
        </div>
        <div className="hero-bottom"><p>Um encontro com a obra e seu autor.</p><a href="#selecao" className="text-link">Explorar o acervo <span>↓</span></a></div>
      </section>
      <section className="hero-editorial page-shell" aria-labelledby="life-title">
        <div className="hero-editorial-copy">
          <p className="eyebrow">SOLARTE — DÁRIO SILVA</p>
          <h2 id="life-title">Uma vida<br /> dedicada à arte</h2>
          <span className="hero-fine-line" aria-hidden="true" />
          <Link href="/o-artista" className="text-link">Conheça o artista <svg aria-hidden="true" viewBox="0 0 12 12"><path d="M2 10 10 2M3 2h7v7" /></svg></Link>
        </div>
        {editorialArtwork && <figure className="hero-editorial-art">
          <ArtworkImage artwork={editorialArtwork} sizes="(max-width: 700px) 86vw, 42vw" />
        </figure>}
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
            <Link className="text-link trajectory-link" href="/trajetoria">Conhecer sua trajetória ↗</Link>
          </div>
        </div>
      </section>
      <section className="studio page-shell">
        <div className="section-heading"><div><p className="eyebrow">03 / Ambiente de criação</p><h2>O Ateliê</h2></div><p>O espaço da pintura.</p></div>
        <figure><ArtistImage image={studioImage} label="O ateliê de Dário Silva" format="landscape" /><figcaption><span>Ambiente de criação</span><span>{studioImage ? 'Registro do ateliê' : 'Fotografia pendente'}</span></figcaption></figure>
      </section>
      <section className="archive-invitation page-shell">
        <p className="eyebrow">Continuar o olhar</p>
        <div><h2>Conheça o<br /><em>acervo completo.</em></h2><Link className="text-link" href="/obras">Percorrer as obras ↗</Link></div>
      </section>
    </>
  );
}
