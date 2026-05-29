'use client'

import Link from 'next/link'
import { Logo } from './Logo'

const NAV_LINKS = [
  { href: '/grafo',       label: 'Grafo' },
  { href: '/metodologia', label: 'Metodología' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3"
        aria-label="Navegación principal"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--color-primary)] hover:opacity-80 transition-opacity"
          aria-label="Garendil — inicio"
        >
          <Logo size={28} />
          <span className="font-bold text-lg tracking-tight">Garendil</span>
        </Link>

        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 rounded-lg text-sm text-[var(--color-text-subtle)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#buscar"
            className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-primary)] text-[var(--color-bg)] hover:bg-[var(--color-primary-dim)] transition-colors"
          >
            Analizar DNI
          </Link>
        </div>
      </nav>
    </header>
  )
}
