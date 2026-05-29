'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { GrafoFuncionario } from '../../components/GrafoFuncionario'

interface Funcionario {
  id: number
  dni: string
  nombre_completo: string
  cargo_actual: string
  institucion: string
  score_ier: number
  score_competencia: number
  score_adecuacion: number
}

interface Contrato {
  id: number
  titulo: string
  monto: number
  fecha_publicacion: string
  empresa_nueva: boolean
  monto_anomalo: boolean
  proceso_exonerado: boolean
}

interface PerfilData {
  funcionario: Funcionario
  contratos: Contrato[]
  procesos: any[]
  conexiones: any[]
}

interface ScoresData {
  dni: string
  layer1_score: number
  layer2_score: number
  ier_combined: number
  riesgo_nivel: string
}

export default function PerfilPage() {
  const params = useParams()
  const dni = params.dni as string
  const [data, setData] = useState<PerfilData | null>(null)
  const [scores, setScores] = useState<ScoresData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [exportando, setExportando] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

        const [perfilRes, scoresRes] = await Promise.all([
          axios.get<PerfilData>(`${apiUrl}/api/perfil/${dni}`),
          axios.get<ScoresData>(`${apiUrl}/api/perfil/${dni}/scores`),
        ])

        setData(perfilRes.data)
        setScores(scoresRes.data)
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Error al cargar el perfil')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dni])

  const handleExportarMD = async () => {
    if (!data || !scores) return
    setExportando(true)
    try {
      const md = generarMarkdown(data, scores)
      descargarArchivo(md, `perfil_${dni}.md`)
    } finally {
      setExportando(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-teal-400">Cargando perfil...</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-red-400">{error || 'Error al cargar el perfil'}</div>
      </div>
    )
  }

  const { funcionario, contratos } = data

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-red-500'
    if (score >= 50) return 'text-yellow-500'
    return 'text-green-500'
  }

  const nodos = [
    {
      id: funcionario.id,
      label: funcionario.nombre_completo,
      title: `DNI: ${funcionario.dni}`,
      color: scores?.riesgo_nivel === 'CRÍTICO' ? '#ef4444' : '#14b8a6',
      size: 40,
    },
    ...(contratos?.slice(0, 5).map((c, i) => ({
      id: 1000 + i,
      label: `Empresa ${i + 1}`,
      title: `Monto: S/. ${c.monto.toLocaleString()}`,
      color: c.empresa_nueva ? '#f59e0b' : '#6b7280',
      size: 30,
    })) || []),
  ]

  const aristas =
    contratos?.slice(0, 5).map((c, i) => ({
      from: funcionario.id,
      to: 1000 + i,
      label: `S/. ${(c.monto / 1_000_000).toFixed(1)}M`,
      value: Math.min(c.monto / 1_000_000, 5),
      color: c.empresa_nueva ? '#f59e0b' : '#6b7280',
    })) || []

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <nav className="flex justify-between items-center px-8 py-4 border-b border-slate-800">
        <Link href="/" className="text-2xl font-bold text-teal-400">
          Garendil
        </Link>
        <div className="space-x-4">
          <button
            onClick={handleExportarMD}
            disabled={exportando}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm disabled:opacity-50"
          >
            {exportando ? 'Exportando...' : 'Exportar .md'}
          </button>
          <Link href="/" className="px-4 py-2 text-slate-300 hover:text-teal-400">
            Volver
          </Link>
        </div>
      </nav>

      <div className="border-b border-slate-800 px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">{funcionario.nombre_completo}</h1>
          <p className="text-slate-400 mb-8">
            {funcionario.cargo_actual} • {funcionario.institucion}
          </p>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded p-6">
              <div className={`text-5xl font-bold mb-2 ${getScoreColor(scores?.ier_combined || 0)}`}>
                {Math.round(scores?.ier_combined || 0)}
              </div>
              <div className="text-slate-400 text-sm">IER Combined</div>
              <div className="text-xs text-slate-500 mt-2">{scores?.riesgo_nivel}</div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded p-6">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(scores?.layer1_score || 0)}`}>
                {Math.round(scores?.layer1_score || 0)}
              </div>
              <div className="text-slate-400 text-sm">Layer 1</div>
              <div className="text-xs text-slate-500 mt-2">Reglas explícitas</div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded p-6">
              <div
                className={`text-4xl font-bold mb-2 ${getScoreColor(
                  scores?.layer2_score ? scores.layer2_score * 100 : 0
                )}`}
              >
                {Math.round((scores?.layer2_score || 0) * 100)}
              </div>
              <div className="text-slate-400 text-sm">Layer 2</div>
              <div className="text-xs text-slate-500 mt-2">Anomalías</div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded p-6">
              <div className="text-4xl font-bold mb-2 text-teal-400">{contratos.length}</div>
              <div className="text-slate-400 text-sm">Contratos</div>
              <div className="text-xs text-slate-500 mt-2">En histórico</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Grafo de Conexiones</h2>
          <GrafoFuncionario nodos={nodos} aristas={aristas} funcionarioId={funcionario.id} />
        </div>
      </div>

      <div className="px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Historial de Contratos ({contratos.length})
          </h2>
          {contratos.length > 0 ? (
            <div className="space-y-4">
              {contratos.map((contrato) => (
                <div
                  key={contrato.id}
                  className={`bg-slate-900/50 border rounded p-4 ${
                    contrato.empresa_nueva || contrato.monto_anomalo || contrato.proceso_exonerado
                      ? 'border-yellow-600'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-semibold">{contrato.titulo}</h3>
                    <span className="font-mono text-teal-400">
                      S/. {contrato.monto.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-2">
                    {new Date(contrato.fecha_publicacion).toLocaleDateString('es-PE')}
                  </p>
                  <div className="flex gap-2 text-xs">
                    {contrato.empresa_nueva && (
                      <span className="px-2 py-1 bg-orange-900 text-orange-200 rounded">
                        Empresa nueva
                      </span>
                    )}
                    {contrato.monto_anomalo && (
                      <span className="px-2 py-1 bg-red-900 text-red-200 rounded">
                        Monto anómalo
                      </span>
                    )}
                    {contrato.proceso_exonerado && (
                      <span className="px-2 py-1 bg-yellow-900 text-yellow-200 rounded">
                        Exoneración
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">No hay contratos registrados</p>
          )}
        </div>
      </div>
    </main>
  )
}

function generarMarkdown(data: PerfilData, scores: ScoresData): string {
  const { funcionario, contratos } = data

  const flags = contratos
    .map(
      (c) => `### ${c.titulo}
- **Monto:** S/. ${c.monto.toLocaleString()}
- **Fecha:** ${new Date(c.fecha_publicacion).toLocaleDateString('es-PE')}
- **Señales de riesgo:** ${
        [
          c.empresa_nueva && 'Empresa nueva',
          c.monto_anomalo && 'Monto anómalo',
          c.proceso_exonerado && 'Exoneración',
        ]
          .filter(Boolean)
          .join(', ') || 'Sin alertas'
      }`
    )
    .join('\n\n')

  return `---
dni: "${funcionario.dni}"
nombre: "${funcionario.nombre_completo}"
cargo: "${funcionario.cargo_actual}"
institucion: "${funcionario.institucion}"
score_ier: ${scores.ier_combined}
nivel_riesgo: "${scores.riesgo_nivel}"
fecha_generacion: "${new Date().toISOString()}"
---

# Perfil: ${funcionario.nombre_completo}

## Score IER: ${Math.round(scores.ier_combined)}/100 — ${scores.riesgo_nivel}

### Desglose de Scores
- **Layer 1 (Reglas explícitas):** ${Math.round(scores.layer1_score)}/100
- **Layer 2 (Anomalías):** ${Math.round(scores.layer2_score * 100)}/100
- **Combinado:** ${Math.round(scores.ier_combined)}/100

## Historial de Contratos (${contratos.length})

${flags}

---

**Generado por Garendil — Sistema de scoring de señales de riesgo**
`
}

function descargarArchivo(contenido: string, nombre: string) {
  const blob = new Blob([contenido], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = nombre
  link.click()
  URL.revokeObjectURL(url)
}
