import Link from 'next/link';
import { ArrowIcon } from '@/components/arrow';
import { artist, artistBiography, artistTraining } from '@/data/artist';

export const metadata = {
  title: 'Trajetória',
  description: 'A formação de Dário Silva e os mestres citados na biografia fornecida pela família, em transcrição provisória.',
};

export default function Trajectory() {
  return (
    <article className="page-shell inner-page trajectory-page">
      <header className="page-heading trajectory-heading">
        <p className="eyebrow">Memória · Percurso</p>
        <h1>Trajetória</h1>
        <p className="page-description">A formação, os mestres, a expressão.</p>
      </header>

      <div className="trajectory-intro biography-copy">
        <p>As informações desta página vêm da biografia fornecida pela família. A transcrição é provisória e ainda não foi verificada em documentos independentes.</p>
        <p className="source-note">{artistBiography.sourceNote}</p>
      </div>

      <section className="trajectory" aria-label="Formação e percurso artístico">
        {artist.milestones.map(item => (
          <div className="milestone" key={item.year}>
            <h2>{item.year}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section className="formation-section biography-section" aria-labelledby="mestres-titulo">
        <div>
          <p className="eyebrow">Na biografia familiar</p>
          <h2 id="mestres-titulo">Mestres e estudos</h2>
        </div>
        <div className="biography-copy">
          <dl className="training-list">
            {artistTraining.map(({ master, study }) => (
              <div key={master}>
                <dt>{master}</dt>
                <dd>{study}</dd>
              </div>
            ))}
          </dl>
          <p>{artistBiography.trainingClosing}</p>
        </div>
      </section>

      <section className="languages-section biography-section" aria-labelledby="expressao-titulo">
        <div>
          <p className="eyebrow">A expressão</p>
          <h2 id="expressao-titulo">Linguagens da pintura</h2>
        </div>
        <div className="biography-copy">
          {artistBiography.languages.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <Link href="/o-artista" className="text-link">Leia a biografia <ArrowIcon /></Link>
        </div>
      </section>
    </article>
  );
}
