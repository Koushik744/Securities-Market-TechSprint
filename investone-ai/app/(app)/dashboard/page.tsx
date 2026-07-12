"use client"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, PieChart, Wallet, Activity, Shield, ArrowUpRight, RefreshCw } from "lucide-react"
import { AreaChart, Area, PieChart as RechartsPie, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { portfolioStats, assetAllocation, monthlyGrowth, sectorAllocation, recentTransactions } from "@/lib/mock-data"
import { formatCurrency, formatPercent, getReturnColor } from "@/lib/utils"
import { useState, useEffect } from "react"

function AnimatedValue({ value, prefix = "", suffix = "", decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [displayed, setDisplayed] = useState(0)
  useEffect(() => {
    const duration = 1200
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) { setDisplayed(value); clearInterval(timer) }
      else setDisplayed(current)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])
  return <span>{prefix}{decimals > 0 ? displayed.toFixed(decimals) : Math.floor(displayed).toLocaleString("en-IN")}{suffix}</span>
}

const statCards = [
  { title: "Portfolio Value", value: portfolioStats.currentValue, prefix: "₹", icon: Wallet, color: "#0B6EFD", sub: formatPercent(portfolioStats.overallReturn) + " overall", subColor: "text-emerald-600", format: "lakh" },
  { title: "Today's Gain", value: portfolioStats.todaysGain, prefix: "₹", icon: TrendingUp, color: "#00B894", sub: formatPercent(portfolioStats.todaysGainPct) + " today", subColor: "text-emerald-600", format: "normal" },
  { title: "Total Invested", value: portfolioStats.totalInvestment, prefix: "₹", icon: Activity, color: "#8B5CF6", sub: "Cost basis", subColor: "text-[var(--muted-fg)]", format: "lakh" },
  { title: "Overall Returns", value: portfolioStats.overallReturn, prefix: "+", suffix: "%", icon: TrendingUp, color: "#00B894", sub: "Since inception", subColor: "text-emerald-600", format: "decimal" },
  { title: "Diversification", value: portfolioStats.diversificationScore, suffix: "/100", icon: PieChart, color: "#F4B400", sub: "7 asset classes", subColor: "text-[var(--muted-fg)]", format: "integer" },
  { title: "Risk Level", isText: true, text: portfolioStats.riskLevel, icon: Shield, color: "#EF4444", sub: "Profile matched", subColor: "text-orange-500", format: "text" },
]

const RCOLORS = ["#0B6EFD", "#00B894", "#F4B400", "#8B5CF6", "#EF4444", "#F59E0B", "#06B6D4"]

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold">{payload[0].name}</p>
        <p className="text-[#0B6EFD] font-bold">{formatCurrency(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--fg)]">Good morning, Koushik! 👋</h1>
          <p className="text-sm text-[var(--muted-fg)] mt-0.5">Saturday, 12 July 2025 · Markets closed</p>
        </div>
        <button className="flex items-center gap-2 text-sm text-[var(--muted-fg)] hover:text-[var(--fg)] border border-[var(--card-border)] px-3 py-2 rounded-xl bg-[var(--card-bg)] transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Sync Accounts
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="stat-card gradient-border cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[var(--muted-fg)] leading-tight">{card.title}</span>
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${card.color}15` }}>
                <card.icon className="w-4 h-4" style={{ color: card.color }} />
              </div>
            </div>
            <div className="text-lg font-extrabold text-[var(--fg)] mb-1">
              {card.isText ? (
                <span style={{ color: card.color }}>{card.text}</span>
              ) : card.format === "decimal" ? (
                <><span>{card.prefix}</span><AnimatedValue value={card.value ?? 0} decimals={2} /><span>{card.suffix}</span></>
              ) : card.format === "lakh" ? (
                <><span>{card.prefix}</span><AnimatedValue value={(card.value ?? 0) / 100000} decimals={2} /><span>L</span></>
              ) : card.format === "integer" ? (
                <><AnimatedValue value={card.value ?? 0} /><span>{card.suffix}</span></>
              ) : (
                <><span>{card.prefix}</span><AnimatedValue value={card.value ?? 0} /><span>{card.suffix}</span></>
              )}
            </div>
            <p className={`text-xs font-semibold ${card.subColor}`}>{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Growth */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-[var(--fg)]">Portfolio Growth</h3>
              <p className="text-xs text-[var(--muted-fg)]">12-month performance</p>
            </div>
            <span className="text-sm font-bold text-emerald-600 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" /> +43.3%
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyGrowth}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B6EFD" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#0B6EFD" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#0B6EFD" strokeWidth={2.5} fill="url(#grad1)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Asset Allocation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-5">
          <h3 className="font-bold text-[var(--fg)] mb-1">Asset Allocation</h3>
          <p className="text-xs text-[var(--muted-fg)] mb-4">Portfolio breakdown</p>
          <ResponsiveContainer width="100%" height={160}>
            <RechartsPie>
              <Pie data={assetAllocation} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                {assetAllocation.map((_, i) => <Cell key={i} fill={RCOLORS[i % RCOLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, ""]} />
            </RechartsPie>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {assetAllocation.slice(0, 4).map((a, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: RCOLORS[i] }} />
                  <span className="text-[var(--fg)]">{a.name}</span>
                </div>
                <span className="font-semibold text-[var(--fg)]">{a.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sector Allocation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-5">
          <h3 className="font-bold text-[var(--fg)] mb-1">Sector Allocation</h3>
          <p className="text-xs text-[var(--muted-fg)] mb-4">Equity sector distribution</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sectorAllocation} layout="vertical" barSize={14}>
              <XAxis type="number" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <YAxis dataKey="sector" type="category" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} width={60} />
              <Tooltip formatter={(v) => [`${v}%`, "Allocation"]} />
              <Bar dataKey="allocation" radius={[0, 6, 6, 0]}>
                {sectorAllocation.map((_, i) => <Cell key={i} fill={RCOLORS[i % RCOLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[var(--fg)]">Recent Transactions</h3>
            <a href="/portfolio" className="text-xs text-[#0B6EFD] font-semibold hover:underline">View all</a>
          </div>
          <div className="space-y-3">
            {recentTransactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${tx.type === 'BUY' || tx.type === 'SIP' ? 'bg-emerald-50 text-emerald-600' : tx.type === 'SELL' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-[#0B6EFD]'}`}>
                  {tx.type === 'DIVIDEND' ? '₹' : tx.type === 'SIP' ? 'SIP' : tx.type === 'BUY' ? 'B' : 'S'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--fg)] truncate">{tx.asset}</p>
                  <p className="text-[10px] text-[var(--muted-fg)]">{tx.assetType} · {tx.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-xs font-bold ${tx.type === 'SELL' ? 'text-red-500' : 'text-emerald-600'}`}>
                    {tx.type === 'SELL' ? '-' : '+'}₹{tx.amount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
