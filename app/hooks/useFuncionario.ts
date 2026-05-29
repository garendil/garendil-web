import { useState, useCallback } from 'react'
import axios from 'axios'

interface Funcionario {
  id: number
  dni: string
  nombre_completo: string
  cargo_actual: string
  institucion: string
  score_ier: number
  activo: boolean
}

interface SearchResponse {
  resultados: Funcionario[]
  total: number
  skip: number
  limit: number
}

export function useFuncionario() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (dni: string): Promise<Funcionario | null> => {
    setLoading(true)
    setError(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await axios.get<SearchResponse>(`${apiUrl}/api/search?dni=${dni}`)

      if (response.data.resultados.length > 0) {
        return response.data.resultados[0]
      }
      return null
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || 'Error al buscar funcionario'
      setError(errorMsg)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { search, loading, error }
}
