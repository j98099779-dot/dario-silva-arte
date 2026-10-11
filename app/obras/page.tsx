import { Gallery } from '@/components/gallery';
import { artworks } from '@/data/artworks';
export const metadata = { title: 'Obras' };
export default function Works() { return <section className="page-shell inner-page"><p className="eyebrow">Acervo / Dário Silva</p><div className="page-intro"><h1>Obras<span className="name-period">.</span></h1><p>Um espaço para contemplar.<br />Uma obra de cada vez.</p></div><p className="catalog-note">Os números identificam os registros do acervo. Títulos, datas, técnicas e dimensões aguardam confirmação. Toque em uma imagem para ampliar ou na identificação para abrir a ficha.</p><Gallery artworks={artworks} /></section>; }
