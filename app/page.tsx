import Link from 'next/link';
import { getArtwork, canDisplayImage } from '@/data/artworks';
import { artist, artistBiography } from '@/data/artist';
import { curation } from '@/data/curation';
import { ArtistImage } from '@/components/artist-image';
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
  return (
    <>
      <section className="hero page-shell">
        <div className="hero-top"><p className="eyebrow">{artist.subtitle}</p><span className="edition">SOLARTE / Acervo & trajetória</span></div>
        <div className="hero-heading"><h1>DÁRIO SILVA</h1><p>A pintura pede tempo.<br />O olhar, espaço.</p></div>
        <div className="hero-composition">
          <div className="hero-editorial">
            <svg className="hero-geometric" viewBox="0 0 320 300" aria-hidden="true" focusable="false">
              <path d="M40 235 118 38 272 97 237 257Z" fill="#ded5c6" fillOpacity=".45" />
              <path d="m64 67 218 15-109 172Z" fill="#e2dbcf" fillOpacity=".65" />
              <g fill="none" stroke="#9c9180" strokeWidth="1">
                <path d="M40 235 118 38 272 97 237 257Z" />
                <path d="m64 67 218 15-109 172Z" />
                <path d="m118 38 55 216 99-157M40 235l242-153" />
              </g>
            </svg>
            <div className="hero-editorial-copy">
              <span className="hero-fine-line" aria-hidden="true" />
              <p>Uma vida<br /> dedicada à arte</p>
              <Link href="/o-artista" className="text-link">Conheça o artista ↗</Link>
            </div>
          </div>
          <div className="hero-art">
            <figure>
              <ArtistImage image={heroPortrait} label="Dário Silva diante de pinturas" priority />
              <figcaption><span>Dário Silva</span><span>Artista Plástico Brasileiro</span></figcaption>
            </figure>
          </div>
        </div>
        <div className="hero-bottom"><p>Um encontro com a obra e seu autor.</p><a href="#selecao" className="text-link">Explorar o acervo <span>↓</span></a></div>
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
