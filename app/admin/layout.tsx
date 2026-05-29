'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-slate-950">
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col`}
      >
        <div className="p-4">
          <Link href="/admin" className="text-teal-400 font-bold text-lg">
            {sidebarOpen ? 'Garendil Admin' : 'G'}
          </Link>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <NavLink href="/admin" label="Dashboard" icon="D" open={sidebarOpen} />
          <NavLink href="/admin/funcionarios" label="Funcionarios" icon="F" open={sidebarOpen} />
          <NavLink href="/admin/alertas" label="Alertas" icon="A" open={sidebarOpen} />
          <NavLink href="/admin/reportes" label="Reportes" icon="R" open={sidebarOpen} />
          <NavLink href="/admin/configuracion" label="Config" icon="C" open={sidebarOpen} />
        </nav>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="m-4 p-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-400 text-sm"
        >
          {sidebarOpen ? '<<' : '>>'}
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <header className="bg-slate-900 border-b border-slate-800 px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Panel Administrativo</h1>
            <Link
              href="/"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-sm"
            >
              Volver al sitio
            </Link>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}

function NavLink({
  href,
  label,
  icon,
  open,
}: {
  href: string
  label: string
  icon: string
  open: boolean
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-4 py-2 rounded hover:bg-slate-800 text-slate-300 hover:text-teal-400 transition"
    >
      <span className="text-sm font-mono w-4 text-center">{icon}</span>
      {open && <span>{label}</span>}
    </Link>
  )
}
