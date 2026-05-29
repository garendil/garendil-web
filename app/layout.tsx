import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Garendil — Transparencia Basada en Datos',
  description:
    'Sistema público de scoring de riesgo para funcionarios del Estado peruano. Datos abiertos, metodología auditable.',
  openGraph: {
    title: 'Garendil',
    description: 'Transparencia basada en datos. Riesgo cuantificado.',
    type: 'website',
    locale: 'es_PE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Garendil — Transparencia Basada en Datos',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
