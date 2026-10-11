import Link from 'next/link';
import { ArtistImage } from '@/components/artist-image';
import { ArtworkImage } from '@/components/artwork-image';
import { artist, artistBiography, artistTraining } from '@/data/artist';
import { artworks, canDisplayImage } from '@/data/artworks';

export const metadata = {
  title: 'O Artista',
  description: 'A biografia de Dário Silva fornecida pela família, sua formação artística e suas linguagens de expressão.',
};

export default function Artist() {
  const closingArtwork = artworks.find(canDisplayImage) ?? artworks[0];

  return (
    <article className="page-shell inner-page artist-page">
      <header className="artist-heading">
        <p className="eyebrow">O Artista / Dário Silva</p>
        <h1>{artistBiography.title}</h1>
        <p className="source-note">{artistBiography.sourceNote}</p>
      </header>

      <section className="artist-layout" aria-label="Biografia do artista">
        <figure>
          <ArtistImage
            image={artist.portraits[0] ?? null}
            label="Fotografia de Dário Silva com camisa branca"
            format="portrait"
            priority
          />
          <figcaption>
            <span>Dário Silva</span>
            <span>{artist.portraits[0] ? 'Retrato do artista' : 'Fotografia de camisa branca a integrar'}</span>
          </figcaption>
        </figure>
        <div className="editorial-copy biography-copy">
          <p className="eyebrow">Artista Plástico Brasileiro</p>
          <h2>O olhar,<br /><em>a expressão.</em></h2>
          {artistBiography.introduction.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="formation-section biography-section" aria-labelledby="formacao-titulo">
        <div>
          <p className="eyebrow">Formação</p>
          <h2 id="formacao-titulo">Formação<br /><em>e trajetória</em></h2>
        </div>
        <div className="biography-copy">
          <p>{artistBiography.trainingIntro}</p>
          <dl className="training-list">
            {artistTraining.map(({ master, study }) => (
              <div key={master}>
                <dt>{master}</dt>
                <dd>{study}</dd>
              </div>
            ))}
          </dl>
          <p>{artistBiography.trainingClosing}</p>
          <Link href="/trajetoria" className="text-link">Conheça a trajetória ↗</Link>
        </div>
      </section>

      <section className="languages-section biography-section" aria-labelledby="linguagens-titulo">
        <div>
          <p className="eyebrow">A expressão</p>
          <h2 id="linguagens-titulo">Linguagens<br /><em>artísticas</em></h2>
        </div>
        <div className="biography-copy">
          {artistBiography.languages.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="complementary-portraits" aria-label="Retratos e memória do artista">
        <figure>
          <ArtistImage
            image={artist.portraits[1] ?? null}
            label="Fotografia formal de Dário Silva com óculos e vestimenta escura"
            format="portrait"
          />
          <figcaption>
            <span>O artista</span>
            <span>{artist.portraits[1] ? 'Retrato do acervo familiar' : 'Fotografia formal a integrar'}</span>
          </figcaption>
        </figure>
        <div className="biography-copy">
          <p className="eyebrow">Do retrato à pintura</p>
          <p>Desenhista e retratista, eclético por opção.</p>
          <Link href="/obras" className="text-link">Percorrer o acervo ↗</Link>
        </div>
      </section>

      {closingArtwork && (
        <figure className="closing-painting">
          <ArtworkImage artwork={closingArtwork} sizes="(max-width: 700px) 86vw, 65vw" />
          <figcaption>
            <span>{canDisplayImage(closingArtwork) ? closingArtwork.title : 'A pintura no acervo'}</span>
            <Link href={`/obras/${closingArtwork.slug}`}>
              {canDisplayImage(closingArtwork) ? 'Conheça a obra ↗' : 'Ver ficha do acervo ↗'}
            </Link>
          </figcaption>
        </figure>
      )}
    </article>
  );
}
