import { Gallery } from '@/components/gallery';
import { artworks } from '@/data/artworks';

export const metadata = { title: 'Obras' };

export default function Works() {
  return (
    <section className="page-shell inner-page works-page">
      <header className="page-heading works-heading">
        <p className="eyebrow">Acervo · Dário Silva</p>
        <h1>Obras</h1>
        <p className="page-description">Um espaço para contemplar. Uma obra de cada vez.</p>
      </header>
      <p className="catalog-note">Os números identificam os registros do acervo. Títulos, datas, técnicas e dimensões aguardam confirmação. Toque em uma imagem para ampliar ou na identificação para abrir a ficha.</p>
      <Gallery artworks={artworks} />
    </section>
  );
}
