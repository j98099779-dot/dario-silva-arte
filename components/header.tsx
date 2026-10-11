'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Brand } from './brand';

const links = [['/obras', 'Obras'], ['/o-artista', 'O Artista'], ['/trajetoria', 'Trajetória'], ['/contato', 'Contato']];
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link href="/" className="brand-link" aria-label="SOLARTE — Dário Silva, início" onClick={() => setOpen(false)}><Brand /></Link>
      <button className="menu-button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
        {open ? 'Fechar' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <nav id="main-nav" aria-label="Navegação principal" className={open ? 'navigation open' : 'navigation'}>
        {links.map(([href, label]) => (
          <Link key={href} href={href} aria-current={pathname.startsWith(href) ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
