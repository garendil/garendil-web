'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  components: Record<string, string>
}

const statusColor = (s: string) => {
  if (s === 'ok' || s === 'healthy') return 'text-green-400'
  if (s === 'degraded') return 'text-yellow-400'
  return 'text-red-400'
}

const statusBg = (s: string) => {
  if (s === 'ok' || s === 'healthy') return 'bg-green-950'
  if (s === 'degraded') return 'bg-yellow-950'
  return 'bg-red-950'
}

export default function StatusPage() {
  const [health, setHealth] = useState<HealthStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastCheck, setLastCheck] = useState<Date | null>(null)

  const checkHealth = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    try {
      const { data } = await axios.get<HealthStatus>(`${apiUrl}/api/health/full`)
      setHealth(data)
    } catch {
      setHealth({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        components: { api: 'unreachable' },
      })
    } finally {
      setLoading(false)
      setLastCheck(new Date())
    }
  }

  useEffect(() => {
    checkHealth()
    const id = setInterval(checkHealth, 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">System Status</h1>

      {loading ? (
        <p className="text-slate-400">Checking health…</p>
      ) : health ? (
        <>
          <div className={`${statusBg(health.status)} border border-slate-700 rounded p-6`}>
            <div className="flex items-center gap-4">
              <span className={`text-2xl font-bold ${statusColor(health.status)}`}>
                {health.status.toUpperCase()}
              </span>
              <span className="text-slate-400 text-sm">
                {new Date(health.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-4">Components</h2>
            <div className="space-y-2">
              {Object.entries(health.components).map(([name, status]) => (
                <div
                  key={name}
                  className="flex justify-between items-center p-4 bg-slate-900 border border-slate-800 rounded"
                >
                  <span className="text-white capitalize">{name}</span>
                  <span className={`font-semibold ${statusColor(status)}`}>{status}</span>
                </div>
              ))}
            </div>
          </div>

          {lastCheck && (
            <p className="text-slate-400 text-sm">
              Last refresh: {lastCheck.toLocaleTimeString()}
            </p>
          )}
        </>
      ) : (
        <p className="text-red-400">Failed to check health</p>
      )}
    </div>
  )
}
