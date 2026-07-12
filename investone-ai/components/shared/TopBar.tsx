"use client"

import { useState } from "react"
import { Bell, Search, Moon, Sun, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface TopBarProps {
  collapsed: boolean
}

export function TopBar({ collapsed }: TopBarProps) {
  const [isDark, setIsDark] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const toggleDark = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header
      className="fixed top-0 right-0 z-30 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 flex items-center gap-4 px-6 transition-all duration-[250ms]"
      style={{ left: collapsed ? 72 : 240 }}
    >
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search stocks, funds, assets..."
          className="pl-9 h-9 text-sm bg-gray-50 border-gray-200"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Market ticker */}
        <div className="hidden md:flex items-center gap-4 text-xs font-medium">
          <span className="text-gray-500">NIFTY 50</span>
          <span className="text-emerald-600 font-semibold">24,502 <span className="text-emerald-500">+0.42%</span></span>
          <span className="text-gray-500">SENSEX</span>
          <span className="text-emerald-600 font-semibold">80,684 <span className="text-emerald-500">+0.38%</span></span>
        </div>

        {/* Dark mode */}
        <button
          onClick={toggleDark}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-11 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Notifications</h3>
                  <Badge variant="danger" className="text-xs">3 new</Badge>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-gray-800">
                  {[
                    { title: 'Portfolio Rebalancing Suggested', time: '2h ago', type: 'ai' },
                    { title: 'Embassy REIT Dividend: ₹3,200', time: '5h ago', type: 'dividend' },
                    { title: 'NIFTY Down 1.2% Today', time: '8h ago', type: 'market' },
                  ].map((n, i) => (
                    <div key={i} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
                <Link href="/alerts" className="block p-3 text-center text-sm text-[#0B6EFD] font-medium hover:bg-blue-50 transition-colors" onClick={() => setShowNotifications(false)}>
                  View all alerts →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User menu */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">NK</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-gray-900 dark:text-white leading-none">Koushik N</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Pro Plan</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </div>
      </div>
    </header>
  )
}
