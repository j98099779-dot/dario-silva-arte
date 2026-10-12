import Link from 'next/link';
import { getArtwork, canDisplayImage } from '@/data/artworks';
import { artist, artistBiography } from '@/data/artist';
import { curation } from '@/data/curation';
import { ArtistImage } from '@/components/artist-image';
import { Gallery } from '@/components/gallery';
import { ArrowIcon } from '@/components/arrow';

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
  const selected = curation.selected.flatMap(slug => {
    const artwork = getArtwork(slug);
    return artwork ? [artwork] : [];
  });

  return (
    <>
      <section className="hero page-shell" aria-labelledby="home-title">
        <div className="hero-copy">
          <p className="eyebrow">Artista plástico brasileiro</p>
          <h1 id="home-title">Dário Silva</h1>
          <Link href="/trajetoria" className="text-link">Conheça sua trajetória <ArrowIcon /></Link>
        </div>
        <div className="hero-art">
          <figure>
            <ArtistImage image={heroPortrait} label="Dário Silva diante de pinturas" sizes="(max-width: 700px) calc(100vw - 40px), 48vw" priority />
            <figcaption><span>Dário Silva</span><span>Registro de imprensa</span></figcaption>
          </figure>
        </div>
      </section>

      <section id="selecao" className="selection page-shell" aria-labelledby="selection-title">
        <div className="section-heading">
          <div><p className="eyebrow">Acervo</p><h2 id="selection-title">Obras selecionadas</h2></div>
          <Link className="text-link" href="/obras">Todas as obras <ArrowIcon /></Link>
        </div>
        {selected.some(artwork => !canDisplayImage(artwork)) && <p className="catalog-note">Acervo em preparação. Os espaços abaixo aguardam os arquivos das pinturas e suas informações de catalogação.</p>}
        <Gallery artworks={selected} />
      </section>

      <section className="biography home-artist page-shell" aria-labelledby="artist-title">
        <div className="home-artist-layout">
          <figure>
            <ArtistImage image={artist.homePortrait} label="Dário Silva · retrato com boina" sizes="(max-width: 700px) 74vw, 390px" />
            <figcaption><span>Dário Silva</span><span>Acervo familiar</span></figcaption>
          </figure>
          <div className="home-artist-copy">
            <p className="eyebrow">O artista</p>
            <h2 id="artist-title">Uma vida dedicada à arte</h2>
            <p>{artistBiography.summary}</p>
            <Link className="text-link" href="/o-artista">Leia a biografia <ArrowIcon /></Link>
            <p className="source-note">Biografia fornecida pela família. Texto provisório, sujeito à revisão.</p>
          </div>
        </div>
      </section>

      <section className="studio page-shell" aria-labelledby="studio-title">
        <div className="studio-copy">
          <p className="eyebrow">Ambiente de criação</p>
          <h2 id="studio-title">O Ateliê</h2>
          <p>Cavaletes, pinturas, pincéis e esculturas compõem o espaço de criação do artista.</p>
        </div>
        <figure>
          <ArtistImage image={studioImage} label="O ateliê de Dário Silva" format="landscape" sizes="(max-width: 700px) calc(100vw - 40px), 60vw" />
          <figcaption><span>Ateliê de Dário Silva</span><span>Registro do ateliê</span></figcaption>
        </figure>
      </section>
    </>
  );
}
