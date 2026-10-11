import Link from 'next/link';
export default function NotFound() { return <section className="page-shell inner-page"><p className="eyebrow">404</p><h1 className="editorial-title">Página não encontrada.</h1><Link href="/obras" className="text-link">Voltar ao acervo →</Link></section>; }
