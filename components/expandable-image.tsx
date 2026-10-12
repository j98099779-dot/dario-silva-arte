'use client';
import Image from 'next/image';
import { useRef, type KeyboardEvent } from 'react';
import type { ArtistImage } from '@/data/artist';
import { ArrowIcon } from './arrow';

/** Amplia reproduções e registros do arquivo sem alterar os arquivos originais. */
export function ExpandableImage({ image, title, actionLabel }: {
  image: ArtistImage;
  title: string;
  actionLabel: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  function keepFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return;
    const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  return (
    <>
      <button className="image-button archive-image-button" ref={trigger} aria-label={actionLabel} onClick={() => {
        dialog.current?.showModal(); close.current?.focus();
      }}>
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} quality={95}
          sizes="(max-width: 700px) 86vw, 45vw" className="painting" />
        <span className="expand-icon" aria-hidden="true"><ArrowIcon direction="up-right" /></span>
      </button>
      <dialog ref={dialog} className="lightbox record-lightbox" aria-label={title} onKeyDown={keepFocus}
        onClose={() => trigger.current?.focus()}
        onClick={event => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
        }}>
        <div className="lightbox-content">
          <button ref={close} className="lightbox-close" aria-label="Fechar ampliação" onClick={() => dialog.current?.close()}>Fechar ×</button>
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} quality={95} sizes="90vw" className="painting" />
          <div className="lightbox-caption"><h2>{title}</h2><a href={image.src} target="_blank" rel="noopener noreferrer">Abrir arquivo original <ArrowIcon direction="up-right" /></a></div>
        </div>
      </dialog>
    </>
  );
}
