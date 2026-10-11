import Image from 'next/image';
import type { ArtistImage as ArtistImageData } from '@/data/artist';

export function ArtistImage({ image, label, format = 'portrait', priority = false }: {
  image: ArtistImageData | null;
  label: string;
  format?: 'portrait' | 'landscape';
  priority?: boolean;
}) {
  if (image && image.source && image.permission) {
    return <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
      priority={priority} sizes="(max-width: 700px) 86vw, 45vw" className="painting" />;
  }
  return (
    <div className={`placeholder photo-placeholder ${format}`} role="img" aria-label={`${label}: fotografia ainda não disponível`}>
      <span>{label}</span>
      <small>Fotografia a integrar</small>
    </div>
  );
}
