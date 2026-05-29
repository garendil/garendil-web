'use client'

import { useEffect, useState } from 'react'
import { Users, GitBranch, FileText, Clock } from 'lucide-react'

interface Stats {
  funcionarios: number
  conexiones: number
  contratos: number
  ultima_actualizacion: string
}

interface StatItem {
  icon: React.ReactNode
  label: string
  value: string
  sublabel?: string
}

function useAnimatedNumber(target: number, duration = 1200) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (target === 0) return
    const start = Date.now()
    const startVal = 0

    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(startVal + (target - startVal) * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return current
}

function Counter({ item }: { item: StatItem }) {
  const raw = parseInt(item.value.replace(/\D/g, ''), 10) || 0
  const animated = useAnimatedNumber(raw)
  const formatted = isNaN(raw) ? item.value : animated.toLocaleString('es-PE')

  return (
    <div className="card p-6 flex flex-col gap-3 animate-fade-up">
      <div className="text-[var(--color-primary)] w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-primary-glow)]">
        {item.icon}
      </div>
      <div>
        <div className="text-3xl font-bold font-mono counter-value text-[var(--color-text)]">
          {isNaN(raw) ? item.value : formatted}
        </div>
        <div className="text-sm text-[var(--color-text-subtle)] mt-1">{item.label}</div>
        {item.sublabel && (
          <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{item.sublabel}</div>
        )}
      </div>
    </div>
  )
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('es-PE', {
      day: '2-digit', month: 'short', year: 'numeric',
    })
  } catch {
    return iso
  }
}

const FALLBACK_STATS: Stats = {
  funcionarios: 0,
  conexiones: 0,
  contratos: 0,
  ultima_actualizacion: new Date().toISOString(),
}

export function StatsCounter() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    fetch(`${apiUrl}/api/stats`)
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => setStats(FALLBACK_STATS))
  }, [])

  const s = stats || FALLBACK_STATS

  const items: StatItem[] = [
    {
      icon: <Users size={20} />,
      label: 'Funcionarios analizados',
      value: String(s.funcionarios),
    },
    {
      icon: <GitBranch size={20} />,
      label: 'Conexiones mapeadas',
      value: String(s.conexiones),
    },
    {
      icon: <FileText size={20} />,
      label: 'Contratos indexados',
      value: String(s.contratos),
    },
    {
      icon: <Clock size={20} />,
      label: 'Última actualización',
      value: formatDate(s.ultima_actualizacion),
      sublabel: 'Datos del Estado Peruano',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <Counter key={item.label} item={item} />
      ))}
    </div>
  )
}
