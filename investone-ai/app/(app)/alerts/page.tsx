"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, CheckCircle, AlertTriangle, Info, TrendingUp, Bot, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { alerts } from "@/lib/mock-data"
import type { Alert } from "@/lib/mock-data"

const tabMap: Record<string, string> = { all: 'all', market: 'market', portfolio: 'portfolio', dividend: 'dividend', goal: 'goal', ai: 'ai' }

const iconMap: Record<string, React.FC<{className?: string}>> = {
  market: TrendingUp, portfolio: TrendingUp, dividend: CheckCircle, goal: Target, ai: Bot,
}

const severityStyles: Record<string, { icon: string; className: string }> = {
  info: { icon: '💡', className: 'border-l-blue-400 bg-blue-50/50 dark:bg-blue-900/10' },
  success: { icon: '✅', className: 'border-l-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/10' },
  warning: { icon: '⚠️', className: 'border-l-amber-400 bg-amber-50/50 dark:bg-amber-900/10' },
  danger: { icon: '🔴', className: 'border-l-red-400 bg-red-50/50 dark:bg-red-900/10' },
}

const notificationSettings = [
  { label: 'Market Movement Alerts', desc: 'NIFTY & portfolio price alerts', enabled: true },
  { label: 'Dividend & Distribution', desc: 'When you receive dividends or distributions', enabled: true },
  { label: 'Portfolio Concentration', desc: 'When any asset exceeds 15% of portfolio', enabled: true },
  { label: 'Goal Reminders', desc: 'Monthly goal progress updates', enabled: false },
  { label: 'AI Suggestions', desc: 'Portfolio optimization recommendations', enabled: true },
  { label: 'Bond Maturity Alerts', desc: '30 days before bond/NCD maturity', enabled: false },
]

export default function AlertsPage() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState('all')
  const [settings, setSettings] = useState(notificationSettings)

  const visible = alerts.filter(a => !dismissed.has(a.id) && (activeTab === 'all' || a.type === tabMap[activeTab]))
  const unreadCount = alerts.filter(a => !a.read && !dismissed.has(a.id)).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Smart Alerts
            {unreadCount > 0 && <span className="text-sm font-normal bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{unreadCount} new</span>}
          </h1>
          <p className="text-sm text-gray-500 mt-1">AI-powered alerts to keep you informed and on track</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="overflow-x-auto pb-1">
              <TabsList className="w-max">
                {['all', 'market', 'portfolio', 'dividend', 'goal', 'ai'].map(t => (
                  <TabsTrigger key={t} value={t} className="text-xs capitalize">{t === 'ai' ? 'AI Tips' : t}</TabsTrigger>
                ))}
              </TabsList>
            </div>
            {['all', 'market', 'portfolio', 'dividend', 'goal', 'ai'].map(t => (
              <TabsContent key={t} value={t}>
                {visible.length === 0 ? (
                  <div className="text-center py-16">
                    <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                    <p className="font-semibold text-gray-600 dark:text-gray-300">All caught up!</p>
                    <p className="text-sm text-gray-400 mt-1">No alerts in this category</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <AnimatePresence>
                      {visible.map((alert) => {
                        const style = severityStyles[alert.severity]
                        return (
                          <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20, height: 0 }} layout>
                            <div className={`border border-gray-100 dark:border-gray-700 border-l-4 rounded-xl p-4 flex items-start gap-3 ${style.className} ${!alert.read ? 'shadow-sm' : ''}`}>
                              <span className="text-lg shrink-0 mt-0.5">{style.icon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{alert.title}</p>
                                    {!alert.read && <span className="inline-block w-1.5 h-1.5 bg-[#0B6EFD] rounded-full mb-1" />}
                                  </div>
                                  <button onClick={() => setDismissed(prev => new Set([...prev, alert.id]))} className="text-gray-300 hover:text-gray-500 transition-colors shrink-0">
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-0.5">{alert.message}</p>
                                <p className="text-[10px] text-gray-400 mt-2">{alert.time}</p>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <Card className="h-fit">
          <CardHeader><CardTitle className="text-sm">Notification Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {settings.map((s, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{s.label}</p>
                  <p className="text-xs text-gray-400 truncate">{s.desc}</p>
                </div>
                <Switch checked={s.enabled} onCheckedChange={(v) => setSettings(prev => prev.map((p, j) => j === i ? { ...p, enabled: v } : p))} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
