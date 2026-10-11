import Image from 'next/image';
import { Artwork, canDisplayImage } from '@/data/artworks';
export function ArtworkImage({ artwork, priority = false, sizes = '(max-width: 700px) 90vw, 60vw' }: { artwork: Artwork; priority?: boolean; sizes?: string }) {
  if (canDisplayImage(artwork) && artwork.image) return <Image src={artwork.image.src} alt={artwork.image.alt} width={artwork.image.width} height={artwork.image.height} sizes={sizes} quality={95} priority={priority} className="painting" />;
  return <div className={`placeholder ${artwork.format}`} role="img" aria-label="Espaço reservado para imagem de obra, ainda não disponibilizada"><span>Imagem a integrar</span><small>Acervo em preparação</small></div>;
}
