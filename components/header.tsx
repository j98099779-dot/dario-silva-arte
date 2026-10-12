'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Brand } from './brand';

const links = [['/', 'Início'], ['/obras', 'Obras'], ['/o-artista', 'O Artista'], ['/trajetoria', 'Trajetória'], ['/contato', 'Contato']];
export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <Link href="/" className="brand-link" aria-label="SOLARTE — Dário Silva, início" onClick={() => setOpen(false)}><Brand /></Link>
      <button ref={menuButton} type="button" className="menu-button" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>
        {open ? 'Fechar' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <nav id="main-nav" aria-label="Navegação principal" className={open ? 'navigation open' : 'navigation'}>
        {links.map(([href, label]) => (
          <Link key={href} href={href} aria-current={pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)) ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>
        ))}
      </nav>
    </header>
  );
}
