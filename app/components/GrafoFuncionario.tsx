'use client'

import { useEffect, useRef } from 'react'

interface Nodo {
  id: number
  label: string
  title: string
  color: string
  size: number
}

interface Arista {
  from: number
  to: number
  label: string
  value: number
  color: string
}

interface GrafoProps {
  nodos: Nodo[]
  aristas: Arista[]
  funcionarioId: number
}

export function GrafoFuncionario({ nodos, aristas, funcionarioId }: GrafoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current || nodos.length === 0) return

    // Dynamic import to avoid SSR issues with vis-network
    import('vis-network').then(({ Network }) => {
      import('vis-data').then(({ DataSet }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nodesData = new DataSet(nodos as any)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const edgesData = new DataSet(aristas as any)

        const options = {
          physics: {
            enabled: true,
            stabilization: { iterations: 200, fit: true },
            forceAtlas2Based: {
              gravitationalConstant: -26,
              centralGravity: 0.005,
              springLength: 200,
              springConstant: 0.08,
            },
            maxVelocity: 50,
            timestep: 0.35,
          },
          nodes: {
            font: { size: 14, color: '#e5e7eb' },
            borderWidth: 2,
            borderWidthSelected: 4,
          },
          edges: {
            arrows: { to: { enabled: true, scaleFactor: 0.5 } },
            font: { size: 10, color: '#94a3b8', align: 'middle' },
            smooth: { enabled: true, type: 'continuous', roundness: 0.5 },
          },
          interaction: {
            hover: true,
            navigationButtons: true,
            keyboard: true,
          },
        }

        networkRef.current = new Network(
          containerRef.current!,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          { nodes: nodesData as any, edges: edgesData as any },
          options
        )
      })
    })

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy()
        networkRef.current = null
      }
    }
  }, [nodos, aristas])

  return (
    <div
      ref={containerRef}
      className="w-full bg-slate-900 border border-slate-800 rounded"
      style={{ height: '500px' }}
    />
  )
}
