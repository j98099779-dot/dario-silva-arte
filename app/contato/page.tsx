import { artist } from '@/data/artist';
import { ArrowIcon } from '@/components/arrow';

export const metadata = { title: 'Contato' };

export default function Contact() {
  return (
    <section className="page-shell inner-page contact-page">
      <header className="page-heading contact-heading">
        <p className="eyebrow">SOLARTE · Dário Silva</p>
        <h1>Contato</h1>
      </header>

      <div className="contact-layout">
        <p>Para conhecer o trabalho, conversar sobre uma obra ou propor um encontro.</p>
        <div className="contact-links">
          {artist.email && (
            <a className="contact-link" href={`mailto:${artist.email}`}>
              <span>{artist.email} <ArrowIcon direction="up-right" /></span>
            </a>
          )}
          <a className="contact-link" href={artist.instagram} target="_blank" rel="noopener noreferrer">
            <span>Instagram <ArrowIcon direction="up-right" /></span>
            <small>@dario_solarte</small>
          </a>
          <a className="contact-link" href={artist.facebook} target="_blank" rel="noopener noreferrer">
            <span>Facebook <ArrowIcon direction="up-right" /></span>
            <small>Dário Silva</small>
          </a>
        </div>
      </div>
    </section>
  );
}
