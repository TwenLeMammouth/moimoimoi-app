'use client'

import Link from 'next/link'

const footerLinks = {
  App: [
    { href: '/', label: 'Accueil' },
    { href: '/chat', label: 'Chat' },
    { href: '/ui-preview', label: 'UI Preview' },
  ],
  Tests: [
    { href: '/tests', label: 'Liste des Tests' },
    { href: '/products', label: 'Produits' },
    { href: '/success', label: 'Succès' },
    { href: '/cancel', label: 'Annulation' },
  ],
  Compte: [
    { href: '/login', label: 'Login' },
    { href: '/profile-setup', label: 'Profil' },
  ],
  Infos: [
    { href: '/about', label: 'À propos (à créer)' },
    { href: '/privacy', label: 'RGPD (à créer)' },
    { href: '/terms', label: 'CGU (à créer)' },
    { href: '/legal', label: 'Mentions légales (à créer)' },
    { href: '/faq', label: 'FAQ (à créer)' },
    { href: '/contact', label: 'Contact (à créer)' },
  ],
}

export default function FooterDev() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white text-xs px-4 py-2 shadow-inner">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between gap-4">
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group} className="min-w-[120px]">
            <div className="font-bold mb-1">{group}</div>
            <ul className="space-y-1">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:underline underline-offset-2">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}
