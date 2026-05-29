import Link from 'next/link'
import { Navbar } from '../components/Navbar'
import { ShieldCheck, Database, BarChart3, Brain, Github, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Metodología — Garendil',
  description: 'Cómo funciona el Índice de Exposición al Riesgo (IER): fuentes, modelo y limitaciones.',
}

const LAYERS = [
  {
    icon: <ShieldCheck size={20} />,
    label: 'Capa 1 — Reglas explícitas',
    body: 'Cuatro reglas auditables: vínculos empresariales, discrepancia patrimonial, historial Contraloría, concentración de contratos. Peso: 70%.',
    status: '✅ Activa',
  },
  {
    icon: <BarChart3 size={20} />,
    label: 'Capa 2 — Anomaly Detection',
    body: 'Isolation Forest con 7 features sobre histórico de contratos. Detecta patrones raros sin datos etiquetados. Peso: 30%.',
    status: '✅ Activa',
  },
  {
    icon: <Brain size={20} />,
    label: 'Capa 3 — ML Supervisado',
    body: 'Random Forest sobre features etiquetadas del Poder Judicial. Requiere ≥50 samples etiquetados. Peso: 0% (pendiente datos reales).',
    status: '🔜 En desarrollo',
  },
]

const SOURCES = [
  { name: 'OSCE/SEACE', content: 'Licitaciones y contratos públicos', freq: 'Diaria' },
  { name: 'Portal MEF Transparencia', content: 'Patrimonio declarado, planillas', freq: 'Mensual' },
  { name: 'JNE', content: 'Declaraciones de bienes y rentas', freq: 'Por proceso electoral' },
  { name: 'Contraloría General', content: 'Auditorías, observaciones, sanciones', freq: 'Semanal' },
  { name: 'SERVIR', content: 'Historial académico y cargos', freq: 'Mensual' },
  { name: 'INFObras (MEF)', content: 'Avance y costo de obras públicas', freq: 'Diaria' },
]

const LIMITATIONS = [
  'No detecta corrupción fuera de fuentes públicas del Estado.',
  'La Capa 3 está deshabilitada hasta tener datos etiquetados reales del Poder Judicial.',
  'Los datos del Poder Judicial requieren scraping manual — pueden tener latencia de semanas.',
  'El IER no reemplaza una investigación judicial ni periodística.',
  'Personas con el mismo nombre pueden causar falsos positivos si el DNI no está disponible.',
]

export default function MetodologiaPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4">Metodología</h1>
        <p className="text-[var(--color-text-subtle)] leading-relaxed mb-12">
          El <strong>IER (Índice de Exposición al Riesgo)</strong> es un score de 0 a 100 que agrega
          señales de riesgo de fuentes abiertas del Estado peruano. No es un dictamen legal ni un
          diagnóstico — es una herramienta de análisis estadístico.
        </p>

        {/* Model */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-2">
            <BarChart3 size={20} className="text-[var(--color-primary)]" aria-hidden />
            Modelo de 3 capas
          </h2>
          <div className="space-y-4">
            {LAYERS.map((l) => (
              <div key={l.label} className="card p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-[var(--color-primary)]">
                    {l.icon}
                    <span className="font-semibold text-[var(--color-text)] text-sm">{l.label}</span>
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] whitespace-nowrap">{l.status}</span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{l.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6 flex items-center gap-2">
            <Database size={20} className="text-[var(--color-primary)]" aria-hidden />
            Fuentes de datos
          </h2>
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-left">
                  <th className="px-4 py-3 text-[var(--color-text-muted)] font-medium">Fuente</th>
                  <th className="px-4 py-3 text-[var(--color-text-muted)] font-medium">Contenido</th>
                  <th className="px-4 py-3 text-[var(--color-text-muted)] font-medium">Frecuencia</th>
                </tr>
              </thead>
              <tbody>
                {SOURCES.map((s, i) => (
                  <tr
                    key={s.name}
                    className={i < SOURCES.length - 1 ? 'border-b border-[var(--color-border)]' : ''}
                  >
                    <td className="px-4 py-3 font-semibold text-[var(--color-text)]">{s.name}</td>
                    <td className="px-4 py-3 text-[var(--color-text-subtle)]">{s.content}</td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)] font-mono text-xs">{s.freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Limitaciones conocidas</h2>
          <ul className="space-y-2">
            {LIMITATIONS.map((l) => (
              <li key={l} className="flex gap-3 text-sm text-[var(--color-text-subtle)]">
                <span className="text-[var(--color-risk-mid)] flex-shrink-0 mt-0.5">⚠</span>
                {l}
              </li>
            ))}
          </ul>
        </section>

        {/* Legal disclaimer */}
        <div
          className="border border-[var(--color-border-bright)] rounded-xl p-5 bg-[var(--color-surface-2)] mb-12"
          role="note"
          aria-label="Aviso legal"
        >
          <p className="text-sm text-[var(--color-text-subtle)] leading-relaxed">
            <strong className="text-[var(--color-text)]">Aviso legal:</strong> Garendil opera bajo
            la Ley N°27806 de Transparencia y Acceso a la Información Pública y la Ley N°29733 de
            Protección de Datos Personales. El IER no constituye imputación legal, dictamen judicial
            ni diagnóstico clínico. Solo se procesan datos de fuentes abiertas del Estado.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/rodhandev/garendil"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--color-border)] text-sm text-[var(--color-text-subtle)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
          >
            <Github size={16} aria-hidden />
            Ver código fuente
            <ChevronRight size={14} aria-hidden />
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-bg)] text-sm font-semibold hover:bg-[var(--color-primary-dim)] transition-colors"
          >
            Analizar un funcionario
            <ChevronRight size={14} aria-hidden />
          </Link>
        </div>
      </main>
    </>
  )
}
