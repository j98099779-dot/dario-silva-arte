'use client';
import Link from 'next/link';
import { useRef, useState, type KeyboardEvent } from 'react';
import { Artwork } from '@/data/artworks';
import { ArtworkImage } from './artwork-image';
import { ArrowIcon } from './arrow';

export function Gallery({ artworks }: { artworks: Artwork[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState<Artwork | undefined>(artworks[0]);

  function open(artwork: Artwork, trigger: HTMLButtonElement) {
    opener.current = trigger;
    setSelected(artwork);
    dialog.current?.showModal();
    closeButton.current?.focus();
  }

  function keepFocusWithinDialog(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  if (!selected) return <p className="catalog-note">O acervo está em preparação.</p>;

  return (
    <>
      <div className="gallery-grid">
        {artworks.map((artwork, index) => (
          <figure key={artwork.slug} className={`gallery-work work-${index % 6}`}>
            <button className="image-button" onClick={event => open(artwork, event.currentTarget)} aria-label={`Ampliar ${artwork.title}`}>
              <ArtworkImage artwork={artwork} sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 43vw, 28vw" />
              <span className="expand-icon" aria-hidden="true"><ArrowIcon direction="up-right" /></span>
            </button>
            <figcaption><Link href={`/obras/${artwork.slug}`}>{artwork.title}</Link><span>{artwork.year ?? 'Catalogação pendente'}</span></figcaption>
          </figure>
        ))}
      </div>
      <dialog ref={dialog} className="lightbox" aria-labelledby="lightbox-title" onKeyDown={keepFocusWithinDialog}
        onClose={() => opener.current?.focus()}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
            event.currentTarget.close();
          }
        }}>
        <div className="lightbox-content">
          <button ref={closeButton} className="lightbox-close" onClick={() => dialog.current?.close()} aria-label="Fechar ampliação">Fechar ×</button>
          <ArtworkImage artwork={selected} sizes="90vw" />
          <div className="lightbox-caption">
            <h2 id="lightbox-title">{selected.title}</h2>
            <Link href={`/obras/${selected.slug}`} onClick={() => dialog.current?.close()}>Ver ficha da obra <ArrowIcon /></Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
