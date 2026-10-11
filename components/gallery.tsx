'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Artwork } from '@/data/artworks';
import { ArtworkImage } from './artwork-image';
export function Gallery({ artworks }: { artworks: Artwork[] }) {
 const dialog = useRef<HTMLDialogElement>(null); const closeButton = useRef<HTMLButtonElement>(null); const [selected, setSelected] = useState<Artwork>(artworks[0]);
 function open(artwork: Artwork) { setSelected(artwork); dialog.current?.showModal(); closeButton.current?.focus(); }
 return <><div className="gallery-grid">{artworks.map((artwork, index) => <figure key={artwork.slug} className={`gallery-work work-${index % 6}`}><button className="image-button" onClick={() => open(artwork)} aria-label={`Ampliar ${artwork.title}`}><ArtworkImage artwork={artwork} sizes="(max-width: 700px) 90vw, 45vw" /><span className="expand-icon" aria-hidden="true">↗</span></button><figcaption><Link href={`/obras/${artwork.slug}`}>{artwork.title}</Link><span>{artwork.year ?? 'Catalogação pendente'}</span></figcaption></figure>)}</div><dialog ref={dialog} className="lightbox" aria-labelledby="lightbox-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}><div className="lightbox-content"><button ref={closeButton} className="lightbox-close" onClick={() => dialog.current?.close()} aria-label="Fechar ampliação">Fechar ×</button><ArtworkImage artwork={selected} sizes="90vw" /><div className="lightbox-caption"><h2 id="lightbox-title">{selected.title}</h2><Link href={`/obras/${selected.slug}`} onClick={() => dialog.current?.close()}>Ver ficha da obra ↗</Link></div></div></dialog></>;
}
