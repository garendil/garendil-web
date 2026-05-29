'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const DNI_REGEX = /^\d{8}$/

export function DniSearchForm() {
  const router = useRouter()
  const [dni, setDni]       = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const validate = (value: string) => {
    if (!value) return 'Ingresa un DNI'
    if (!/^\d+$/.test(value)) return 'Solo dígitos numéricos'
    if (value.length !== 8) return `DNI debe tener 8 dígitos (tienes ${value.length})`
    return ''
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const err = validate(dni)
    if (err) { setError(err); return }
    setError('')
    setLoading(true)
    router.push(`/perfil/${dni}`)
  }

  const handleChange = (v: string) => {
    const clean = v.replace(/\D/g, '').slice(0, 8)
    setDni(clean)
    if (error) setError(validate(clean))
  }

  const isValid = DNI_REGEX.test(dni)

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl" role="search">
      <div className="relative flex items-center">
        <Search
          size={20}
          className="absolute left-4 text-[var(--color-text-muted)] pointer-events-none"
          aria-hidden
        />
        <input
          id="dni-input"
          type="text"
          inputMode="numeric"
          value={dni}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Ingresa el DNI del funcionario..."
          className="
            w-full pl-11 pr-36 py-4 rounded-xl text-base
            bg-[var(--color-surface)] border border-[var(--color-border)]
            text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]
            font-mono tracking-wider
            focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-glow)]
            transition-colors
          "
          aria-label="DNI del funcionario"
          aria-describedby={error ? 'dni-error' : undefined}
          aria-invalid={!!error}
          maxLength={8}
          disabled={loading}
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={loading || !isValid}
          className="
            absolute right-2 px-5 py-2.5 rounded-lg text-sm font-semibold
            bg-[var(--color-primary)] text-[var(--color-bg)]
            hover:bg-[var(--color-primary-dim)] transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed
            min-w-[5rem]
          "
          aria-busy={loading}
        >
          {loading ? 'Cargando…' : 'Analizar'}
        </button>
      </div>

      {error && (
        <p id="dni-error" role="alert" className="mt-2 text-sm text-[var(--color-risk-high)]">
          {error}
        </p>
      )}

      <p className="mt-3 text-xs text-[var(--color-text-muted)] text-center">
        Solo 8 dígitos numéricos · Solo datos de fuentes abiertas del Estado Peruano
      </p>
    </form>
  )
}
