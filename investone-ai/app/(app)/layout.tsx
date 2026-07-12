"use client"
import { Sidebar } from "@/components/shared/Sidebar"
import { TopBar } from "@/components/shared/TopBar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-[240px] transition-all duration-250">
        <TopBar />
        <main className="flex-1 p-6 mt-16 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
