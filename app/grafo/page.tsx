import Link from 'next/link'
import { Navbar } from '../components/Navbar'
import { Network } from 'lucide-react'

export const metadata = {
  title: 'Grafo Global — Garendil',
  description: 'Explorador de red de funcionarios, empresas e instituciones del Estado peruano.',
}

export default function GrafoPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-glow)] text-[var(--color-primary)] flex items-center justify-center mb-6">
          <Network size={32} aria-hidden />
        </div>
        <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4">Grafo Global</h1>
        <p className="text-[var(--color-text-subtle)] max-w-md leading-relaxed mb-8">
          Explorador de red tipo Obsidian — todos los funcionarios, empresas e instituciones indexados
          como nodos navegables. Filtros por institución, score IER y tipo de conexión.
        </p>
        <div className="card p-6 text-sm text-[var(--color-text-muted)] mb-8">
          🚧 En desarrollo — disponible en v0.8 · Requiere Neo4j con datos reales indexados.
        </div>
        <Link
          href="/"
          className="text-sm text-[var(--color-primary)] hover:underline"
        >
          ← Volver al inicio
        </Link>
      </main>
    </>
  )
}
