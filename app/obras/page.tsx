import { Gallery } from '@/components/gallery';
import { artworks } from '@/data/artworks';
export const metadata = { title: 'Obras' };
export default function Works() { return <section className="page-shell inner-page"><p className="eyebrow">Acervo / Dário Silva</p><div className="page-intro"><h1>Obras<span className="name-period">.</span></h1><p>Um espaço para contemplar.<br />Uma obra de cada vez.</p></div><p className="catalog-note">Acervo em preparação. Imagens e fichas aguardam autorização e confirmação. Toque em uma imagem para ampliar ou no título para abrir a ficha.</p><Gallery artworks={artworks} /></section>; }
