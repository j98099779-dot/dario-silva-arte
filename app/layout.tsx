import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Brand } from '@/components/brand';
import { artist } from '@/data/artist';
import './globals.css';

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
          <Link href="/" className="brand-link" aria-label="SOLARTE — Dário Silva, início"><Brand /></Link>
          <span>Arte, presença e memória.</span>
          <div>
            <a href={artist.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <a href={artist.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>
          </div>
          <small>© {new Date().getFullYear()} Dário Silva · SOLARTE</small>
        </footer>
      </body>
    </html>
  );
}
