import Link from 'next/link'
import { Navbar } from './components/Navbar'
import { DniSearchForm } from './components/DniSearchForm'
import { StatsCounter } from './components/StatsCounter'
import { RecentProfileCard } from './components/RecentProfileCard'
import { Logo } from './components/Logo'
import {
  Database,
  Network,
  BarChart3,
  ShieldCheck,
  Github,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'

/* ─── Placeholder recent profiles ──────────────────────────────────── */
const RECENT_PROFILES = [
  { nombre: 'Juan Pérez García',    cargo: 'Alcalde · Municipalidad de Lima',    dni: '12345678', score: 74 },
  { nombre: 'María Quispe Torres',  cargo: 'Directora · MINEDU',                 dni: '87654321', score: 31 },
  { nombre: 'Carlos Ramos Huanca',  cargo: 'Gerente · Gobierno Regional Cusco',  dni: '45678901', score: 58 },
  { nombre: 'Ana Flores Mendoza',   cargo: 'Subprefecta · Región Arequipa',      dni: '23456789', score: 19 },
  { nombre: 'Roberto Silva Chávez', cargo: 'Director · Contraloría General',      dni: '67890123', score: 82 },
]

/* ─── How it works steps ────────────────────────────────────────────── */
const HOW_STEPS = [
  {
    n: '01',
    title: 'Ingresa el DNI',
    body: 'El DNI es el identificador primario de un funcionario peruano. 8 dígitos numéricos.',
    icon: <Database size={22} />,
  },
  {
    n: '02',
    title: 'Analizamos las fuentes',
    body: 'Cruzamos OSCE/SEACE, Portal MEF Transparencia, SERVIR, JNE y Contraloría en tiempo real.',
    icon: <Network size={22} />,
  },
  {
    n: '03',
    title: 'Obtienes el perfil',
    body: 'Un índice IER de 0 a 100, grafo de conexiones, contratos públicos y señales de riesgo auditables.',
    icon: <BarChart3 size={22} />,
  },
]

/* ─── Methodology pillars ───────────────────────────────────────────── */
const METHOD_POINTS = [
  {
    title: 'Fuentes abiertas del Estado',
    body: 'Solo datos que el propio Estado publica: OSCE, MEF Transparencia, JNE, Contraloría y SERVIR.',
  },
  {
    title: 'Modelo de 3 capas',
    body: 'Reglas explícitas auditables → Detección de anomalías (Isolation Forest) → ML supervisado (en desarrollo).',
  },
  {
    title: 'Señales de riesgo, no acusaciones',
    body: 'El IER es un índice estadístico. No constituye imputación legal ni dictamen judicial.',
  },
]

/* ─────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section
          id="buscar"
          className="hero-bg relative flex flex-col items-center text-center px-6 pt-24 pb-20"
          aria-labelledby="hero-heading"
        >
          {/* Logo mark */}
          <div className="mb-8 text-[var(--color-primary)] animate-fade-up">
            <Logo size={64} />
          </div>

          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--color-text)] max-w-3xl animate-fade-up"
          >
            Transparencia basada en datos.{' '}
            <span className="text-[var(--color-primary)]">Riesgo cuantificado.</span>
          </h1>

          <p className="mt-5 text-lg text-[var(--color-text-subtle)] max-w-xl animate-fade-up">
            Garendil cruza datos abiertos del Estado peruano y expone señales de riesgo de forma
            auditable. Sin acusaciones. Sin especulación.
          </p>

          <div className="mt-10 w-full max-w-xl animate-fade-up">
            <DniSearchForm />
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-16" aria-label="Estadísticas del sistema">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] text-center mb-8">
            Estado del sistema
          </h2>
          <StatsCounter />
        </section>

        {/* ── WHAT IS GARENDIL ─────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-[var(--color-border)]">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-text)] mb-5">
                ¿Qué es Garendil?
              </h2>
              <p className="text-[var(--color-text-subtle)] leading-relaxed mb-8">
                Garendil es un sistema público de índice de exposición al riesgo (IER) para
                funcionarios del Estado peruano. No acusa ni condena — cruza datos de fuentes
                abiertas y expone señales estadísticas de forma auditable.
              </p>
              <div className="space-y-4">
                {METHOD_POINTS.map((p) => (
                  <div key={p.title} className="flex gap-3">
                    <ShieldCheck
                      size={20}
                      className="text-[var(--color-primary)] flex-shrink-0 mt-0.5"
                      aria-hidden
                    />
                    <div>
                      <p className="font-semibold text-[var(--color-text)] text-sm">{p.title}</p>
                      <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual score preview */}
            <div className="card p-8 flex flex-col items-center gap-4" aria-hidden>
              <div className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]">
                Índice IER — ejemplo
              </div>
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg viewBox="0 0 160 160" className="absolute inset-0 -rotate-90 w-full h-full">
                  <circle cx="80" cy="80" r="64" fill="none" stroke="var(--color-border)" strokeWidth="12" />
                  <circle
                    cx="80" cy="80" r="64" fill="none"
                    stroke="var(--color-risk-high)" strokeWidth="12"
                    strokeDasharray={`${(74 / 100) * 402} 402`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="relative text-center">
                  <span className="text-5xl font-bold font-mono score-high">74</span>
                  <div className="text-xs text-[var(--color-text-muted)] mt-1">/ 100</div>
                </div>
              </div>
              <div className="text-center">
                <p className="font-semibold text-[var(--color-text)]">Señal de Riesgo Alta</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  Layer 1 · Layer 2 · IER combinado
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
        <section className="bg-[var(--color-surface)] py-16 border-y border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-[var(--color-text)] mb-12">
              Cómo funciona
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {HOW_STEPS.map((step, i) => (
                <div key={step.n} className="flex flex-col items-start gap-4 animate-fade-up">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-glow)] text-[var(--color-primary)] flex items-center justify-center">
                      {step.icon}
                    </div>
                    {i < HOW_STEPS.length - 1 && (
                      <ArrowRight
                        size={16}
                        className="text-[var(--color-border-bright)] hidden md:block ml-auto"
                        aria-hidden
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[var(--color-primary)] mb-1">{step.n}</div>
                    <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">{step.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RECENT PROFILES ──────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[var(--color-text)]">
              Últimos perfiles consultados
            </h2>
            <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-surface)] px-3 py-1 rounded-full border border-[var(--color-border)]">
              Ejemplo — datos sintéticos
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RECENT_PROFILES.map((p) => (
              <RecentProfileCard key={p.dni} {...p} />
            ))}
          </div>
        </section>

        {/* ── TRANSPARENCY ─────────────────────────────────────────── */}
        <section className="bg-[var(--color-surface)] py-16 border-y border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Transparencia</h2>
            <p className="text-[var(--color-text-subtle)] mb-8 max-w-xl mx-auto">
              El código fuente de Garendil es público. Audita el modelo, reporta errores o contribuye
              al proyecto.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/rodhandev/garendil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text-subtle)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
              >
                <Github size={18} aria-hidden />
                Ver repositorio
                <ChevronRight size={14} aria-hidden />
              </a>
              <Link
                href="/metodologia"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold hover:bg-[var(--color-primary-dim)] transition-colors"
              >
                Leer metodología
                <ChevronRight size={14} aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2">
              <Logo size={20} className="text-[var(--color-primary)]" />
              <span className="font-semibold text-[var(--color-text-subtle)]">Garendil</span>
              <span>· Datos abiertos del Estado Peruano</span>
            </div>
            <div className="flex gap-6">
              <Link href="/metodologia" className="hover:text-[var(--color-text)] transition-colors">
                Metodología
              </Link>
              <Link href="/grafo" className="hover:text-[var(--color-text)] transition-colors">
                Grafo global
              </Link>
              <a
                href="https://github.com/rodhandev/garendil"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-text)] transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
          <p className="text-center text-xs text-[var(--color-text-muted)] mt-8 max-w-2xl mx-auto leading-relaxed">
            Garendil no acusa ni condena. El IER es un índice estadístico basado exclusivamente en
            datos de fuentes abiertas del Estado. No constituye imputación legal, dictamen judicial
            ni opinión médica. Marco legal: Ley N°27806 · Ley N°29733.
          </p>
        </footer>
      </main>
    </>
  )
}
