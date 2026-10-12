import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Brand } from '@/components/brand';
import { ArrowIcon } from '@/components/arrow';
import { artist } from '@/data/artist';
import '@fontsource/libre-caslon-text/latin-400.css';
import '@fontsource/libre-caslon-text/latin-400-italic.css';
import '@fontsource-variable/inter';
import './globals.css';

const footerLinks = [['/', 'Início'], ['/obras', 'Obras'], ['/o-artista', 'O Artista'], ['/trajetoria', 'Trajetória'], ['/contato', 'Contato']];

export const metadata: Metadata = {
  title: { default: 'SOLARTE | Dário Silva — Artista Plástico', template: '%s — SOLARTE | Dário Silva' },
  description: 'SOLARTE, espaço dedicado à obra e à formação de Dário Silva, artista plástico brasileiro. Pinturas e fotografias cedidas para o acervo, com biografia fornecida pela família, em revisão.',
  icons: { icon: '/icon.svg' },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a href="#conteudo" className="skip-link">Ir para o conteúdo</a>
        <Header />
        <main id="conteudo">{children}</main>
        <footer className="site-footer">
          <div className="footer-identity">
            <Link href="/" className="brand-link" aria-label="SOLARTE — Dário Silva, início"><Brand /></Link>
            <p>Arte, presença e memória.</p>
          </div>
          <nav className="footer-navigation" aria-label="Navegação do rodapé">
            {footerLinks.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <div className="footer-socials">
            <a href={artist.instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowIcon direction="up-right" className="link-arrow" /></a>
            <a href={artist.facebook} target="_blank" rel="noopener noreferrer">Facebook <ArrowIcon direction="up-right" className="link-arrow" /></a>
          </div>
          <small className="footer-copyright">© {new Date().getFullYear()} Dário Silva · SOLARTE</small>
        </footer>
      </body>
    </html>
  );
}
