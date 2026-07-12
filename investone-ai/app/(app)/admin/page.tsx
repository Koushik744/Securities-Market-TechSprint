"use client"
import { motion } from "framer-motion"
import { Users, TrendingUp, DollarSign, Activity, CheckCircle, AlertCircle } from "lucide-react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { adminStats, userGrowthData, recentSignups, assetTypeAllocation } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

const systemHealth = [
  { name: 'API Gateway', status: 'Operational', uptime: '99.99%', color: 'success' },
  { name: 'Database Cluster', status: 'Operational', uptime: '99.97%', color: 'success' },
  { name: 'AI Engine', status: 'Degraded', uptime: '98.20%', color: 'warning' },
  { name: 'AA Framework', status: 'Operational', uptime: '99.95%', color: 'success' },
]

const statCards = [
  { label: 'Total Users', value: adminStats.totalUsers.toLocaleString('en-IN'), icon: Users, color: '#0B6EFD', bg: '#EFF6FF', sub: '+3,842 this month' },
  { label: 'Active Today', value: adminStats.activeToday.toLocaleString('en-IN'), icon: Activity, color: '#00B894', bg: '#ECFDF5', sub: '6.8% of total users' },
  { label: 'Total AUM', value: formatCurrency(adminStats.totalAUM), icon: TrendingUp, color: '#6366F1', bg: '#EEF2FF', sub: '+12.4% MoM' },
  { label: 'Revenue (MoM)', value: formatCurrency(adminStats.revenue), icon: DollarSign, color: '#F4B400', bg: '#FFFBEB', sub: '+8.2% vs last month' },
]

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Platform overview and system health</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                      <Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{card.value}</p>
                  <p className="text-xs text-emerald-600 mt-1 font-medium">{card.sub}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader><CardTitle className="text-base">User Growth (Last 6 Months)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <Tooltip formatter={(v) => [(v as number).toLocaleString('en-IN'), 'Users']} />
                <Line type="monotone" dataKey="users" stroke="#0B6EFD" strokeWidth={3} dot={{ fill: '#0B6EFD', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">AUM by Asset Class</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={assetTypeAllocation.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip formatter={(v) => [`${v}%`, 'Allocation']} />
                <Bar dataKey="percent" radius={[4, 4, 0, 0]}>
                  {assetTypeAllocation.slice(0, 6).map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader><CardTitle className="text-base">Recent Signups</CardTitle></CardHeader>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 dark:border-gray-800">
                  {['Name', 'Plan', 'KYC', 'Date'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {recentSignups.map((u, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="px-5 py-3"><p className="font-medium text-xs text-gray-900 dark:text-white">{u.name}</p><p className="text-[10px] text-gray-400">{u.email}</p></td>
                    <td className="px-5 py-3"><Badge variant={u.plan === 'Premium' ? 'primary' : u.plan === 'Pro' ? 'default' : 'neutral'} className="text-[10px]">{u.plan}</Badge></td>
                    <td className="px-5 py-3"><Badge variant={u.kyc === 'Verified' ? 'success' : u.kyc === 'Pending' ? 'warning' : 'danger'} className="text-[10px]">{u.kyc}</Badge></td>
                    <td className="px-5 py-3 text-xs text-gray-400">{u.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">System Health</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {systemHealth.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-3">
                  {s.color === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{s.name}</p>
                    <p className="text-xs text-gray-400">Uptime: {s.uptime}</p>
                  </div>
                </div>
                <Badge variant={s.color as 'success' | 'warning'}>{s.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
