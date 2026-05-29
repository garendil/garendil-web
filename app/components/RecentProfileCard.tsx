import Link from 'next/link'
import { AlertTriangle, CheckCircle, Minus } from 'lucide-react'

interface ProfileCardProps {
  nombre: string
  cargo: string
  dni: string
  score: number
}

function RiskBadge({ score }: { score: number }) {
  if (score >= 75) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-950 text-red-400 border border-red-900">
        <AlertTriangle size={12} aria-hidden />
        Señal Alta
      </span>
    )
  }
  if (score >= 40) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950 text-amber-400 border border-amber-900">
        <Minus size={12} aria-hidden />
        Señal Media
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-950 text-green-400 border border-green-900">
      <CheckCircle size={12} aria-hidden />
      Señal Baja
    </span>
  )
}

function scoreColor(score: number) {
  if (score >= 75) return 'score-high'
  if (score >= 40) return 'score-mid'
  return 'score-low'
}

export function RecentProfileCard({ nombre, cargo, dni, score }: ProfileCardProps) {
  return (
    <Link
      href={`/perfil/${dni}`}
      className="card card-hover p-5 flex items-center gap-4 group"
      aria-label={`Ver perfil de ${nombre}`}
    >
      {/* Avatar placeholder */}
      <div
        className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold text-[var(--color-bg)] bg-[var(--color-primary)]"
        aria-hidden
      >
        {nombre.charAt(0)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[var(--color-text)] truncate group-hover:text-[var(--color-primary)] transition-colors">
          {nombre}
        </p>
        <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">{cargo}</p>
        <div className="mt-2">
          <RiskBadge score={score} />
        </div>
      </div>

      {/* Score */}
      <div className="text-right flex-shrink-0">
        <div className={`text-2xl font-bold font-mono ${scoreColor(score)}`}>{score}</div>
        <div className="text-xs text-[var(--color-text-muted)]">IER</div>
      </div>
    </Link>
  )
}
