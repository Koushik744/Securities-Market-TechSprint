"use client"
import { useState } from "react"
import { Sidebar } from "@/components/shared/Sidebar"
import { TopBar } from "@/components/shared/TopBar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <div
        className="flex-1 flex flex-col transition-all duration-[250ms]"
        style={{ marginLeft: collapsed ? 72 : 240 }}
      >
        <TopBar collapsed={collapsed} />
        <main className="flex-1 p-6 mt-16 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
