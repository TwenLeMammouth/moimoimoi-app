'use client'

import Link from 'next/link'
import Logo from './Logo'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-900/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-4">
        <Logo size={60}/>
        <Link href="/" className="font-semibold tracking-tight text-xl">
          MoiMoiMoi <span className="opacity-50 text-xs uppercase">beta</span>
        </Link>
        <nav className="ml-auto flex items-center gap-3 text-sm">
          <Link className="opacity-80 hover:opacity-100" href="/fr/tests">Tests</Link>
          <Link className="opacity-80 hover:opacity-100" href="/fr/products">Produits</Link>
          <Link className="opacity-80 hover:opacity-100" href="/fr/profile">Profil</Link>
        </nav>
      </div>
    </header>
  )
}
