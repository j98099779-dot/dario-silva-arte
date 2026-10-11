import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { artist } from '@/data/artist';
import './globals.css';
export const metadata: Metadata = { title: { default: 'DÁRIO SILVA — Artista Plástico', template: '%s — DÁRIO SILVA' }, description: 'Espaço dedicado à obra e à trajetória de Dário Silva, artista plástico brasileiro. Acervo em preparação.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="pt-BR"><body><a href="#conteudo" className="skip-link">Ir para o conteúdo</a><Header /><main id="conteudo">{children}</main><footer className="site-footer"><Link href="/" className="wordmark">DÁRIO SILVA</Link><span>Arte, presença e memória.</span><div><a href={artist.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={artist.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a></div><small>© {new Date().getFullYear()} Dário Silva</small></footer></body></html>; }
