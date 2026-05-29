'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Resumen {
  total_funcionarios: number
  funcionarios_riesgo_alto: number
  total_contratos: number
  monto_total_contratos: number
  total_procesos: number
  pct_riesgo: number
}

interface TopFuncionario {
  dni: string
  nombre: string
  score_ier: number
  institucion: string
  cargo: string
}

interface Tendencia {
  mes: number
  contratos: number
  monto_promedio: number
}

export default function AdminDashboard() {
  const [resumen, setResumen] = useState<Resumen | null>(null)
  const [topRiesgo, setTopRiesgo] = useState<TopFuncionario[]>([])
  const [tendencias, setTendencias] = useState<Tendencia[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [resumenRes, topRes, tendenciasRes] = await Promise.all([
          axios.get<Resumen>(`${API_URL}/api/dashboard/resumen`),
          axios.get<TopFuncionario[]>(`${API_URL}/api/dashboard/riesgo-top?limit=10`),
          axios.get<{ tendencias: Tendencia[] }>(`${API_URL}/api/dashboard/tendencias`),
        ])
        setResumen(resumenRes.data)
        setTopRiesgo(topRes.data)
        setTendencias(tendenciasRes.data.tendencias)
      } catch (err) {
        console.error('Error cargando dashboard:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [])

  if (loading) {
    return <div className="text-teal-400">Cargando...</div>
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Resumen Ejecutivo</h2>

      {resumen && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPICard label="Funcionarios" value={resumen.total_funcionarios} color="text-blue-400" />
            <KPICard
              label="Riesgo Alto (IER >= 50)"
              value={resumen.funcionarios_riesgo_alto}
              color="text-red-400"
            />
            <KPICard label="Contratos" value={resumen.total_contratos} color="text-teal-400" />
            <KPICard label="Procesos" value={resumen.total_procesos} color="text-yellow-400" />
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded p-6">
            <div className="text-slate-400 text-sm mb-2">Monto Total Contratado</div>
            <div className="text-4xl font-bold text-teal-400">
              S/. {(resumen.monto_total_contratos / 1e6).toFixed(1)}M
            </div>
            <div className="text-slate-500 text-xs mt-2">
              Señales de riesgo en cartera: {resumen.pct_riesgo.toFixed(1)}%
            </div>
          </div>
        </>
      )}

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Top 10 Mayor IER</h3>
        <div className="bg-slate-900/50 border border-slate-800 rounded overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-slate-700">
              <tr className="text-left text-slate-400 text-sm">
                <th className="p-4">DNI</th>
                <th className="p-4">Nombre</th>
                <th className="p-4">Score IER</th>
                <th className="p-4">Institución</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {topRiesgo.map((f) => (
                <tr key={f.dni} className="hover:bg-slate-800/50 transition">
                  <td className="p-4 text-white font-mono text-sm">{f.dni}</td>
                  <td className="p-4 text-white">{f.nombre}</td>
                  <td
                    className={`p-4 font-bold ${
                      f.score_ier >= 75
                        ? 'text-red-400'
                        : f.score_ier >= 50
                        ? 'text-yellow-400'
                        : 'text-green-400'
                    }`}
                  >
                    {Math.round(f.score_ier)}
                  </td>
                  <td className="p-4 text-slate-400 text-sm">{f.institucion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {tendencias.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Tendencias por Mes</h3>
          <div className="bg-slate-900/50 border border-slate-800 rounded overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-slate-700">
                <tr className="text-left text-slate-400 text-sm">
                  <th className="p-4">Mes</th>
                  <th className="p-4">Contratos</th>
                  <th className="p-4">Monto Promedio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {tendencias.map((t, i) => (
                  <tr key={i} className="hover:bg-slate-800/50 transition">
                    <td className="p-4 text-white">Mes {t.mes}</td>
                    <td className="p-4 text-teal-400 font-semibold">{t.contratos}</td>
                    <td className="p-4 text-slate-400">S/. {(t.monto_promedio / 1e6).toFixed(2)}M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function KPICard({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded p-6">
      <div className="text-slate-400 text-sm">{label}</div>
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
    </div>
  )
}
