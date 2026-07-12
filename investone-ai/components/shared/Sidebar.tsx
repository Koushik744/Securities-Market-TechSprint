"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, PieChart, TrendingUp, Shield, Compass,
  Bot, BookOpen, Target, Bell, User, Settings, ChevronLeft,
  ChevronRight, Zap, LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portfolio', label: 'Portfolio', icon: PieChart },
  { href: '/risk-analysis', label: 'Risk Analysis', icon: Shield },
  { href: '/health-score', label: 'Health Score', icon: TrendingUp },
  { href: '/explorer', label: 'Explorer', icon: Compass },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Bot },
  { href: '/learning', label: 'Learning Hub', icon: BookOpen },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/alerts', label: 'Alerts', icon: Bell },
]

const bottomNavItems = [
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/admin', label: 'Admin', icon: LayoutDashboard },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-full z-40 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B6EFD] to-[#00B894] flex items-center justify-center shrink-0 shadow-md">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden"
              >
                <div className="font-bold text-gray-900 dark:text-white text-sm leading-tight whitespace-nowrap">InvestOne AI</div>
                <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap">TechSprint 2024</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto overflow-x-hidden space-y-0.5">
        {!collapsed && (
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Main Menu</p>
        )}
        {navItems.map((item, i) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <motion.div key={item.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-blue-50 text-[#0B6EFD] dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive ? "text-[#0B6EFD]" : "")} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0B6EFD]"
                  />
                )}
              </Link>
            </motion.div>
          )
        })}

        <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
          {!collapsed && (
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Account</p>
          )}
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-blue-50 text-[#0B6EFD] dark:bg-blue-900/20"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User profile */}
      <div className="border-t border-gray-100 dark:border-gray-800 p-3">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <Avatar className="w-9 h-9 shrink-0">
            <AvatarFallback>NK</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Koushik N</p>
                <p className="text-xs text-gray-400 truncate">Pro Plan</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <button className="text-gray-400 hover:text-gray-600 transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3 text-gray-500" /> : <ChevronLeft className="w-3 h-3 text-gray-500" />}
      </button>
    </motion.aside>
  )
}
