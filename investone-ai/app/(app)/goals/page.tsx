"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Target, Calendar, TrendingUp } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { goals } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

const timelineData = [
  { year: '2024', retirement: 3037620, house: 2200000, emergency: 480000 },
  { year: '2025', retirement: 4500000, house: 3100000, emergency: 580000 },
  { year: '2026', retirement: 6200000, house: 4200000, emergency: 600000 },
  { year: '2027', retirement: 8400000, house: 5500000, emergency: 600000 },
  { year: '2028', retirement: 11000000, house: 7200000, emergency: 600000 },
  { year: '2029', retirement: 14200000, house: 8000000, emergency: 600000 },
]

export default function GoalsPage() {
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Goal Planner</h1>
          <p className="text-sm text-gray-500 mt-1">Track and achieve your financial goals with AI guidance</p>
        </div>
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4" />Add Goal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Financial Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-gray-700 block mb-1.5">Goal Name</label><Input placeholder="e.g. Buy a Car" /></div>
              <div><label className="text-sm font-medium text-gray-700 block mb-1.5">Target Amount (₹)</label><Input placeholder="5,00,000" type="number" /></div>
              <div><label className="text-sm font-medium text-gray-700 block mb-1.5">Target Date</label><Input type="date" /></div>
              <div><label className="text-sm font-medium text-gray-700 block mb-1.5">Monthly SIP (₹)</label><Input placeholder="10,000" type="number" /></div>
              <Button className="w-full" onClick={() => setShowAdd(false)}>Create Goal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {goals.map((goal, i) => (
          <motion.div key={goal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}>
            <Card className="hover:shadow-xl transition-all duration-200 overflow-hidden">
              <div className="h-1.5" style={{ background: goal.color }} />
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{goal.icon}</span>
                      <h3 className="font-bold text-gray-900 dark:text-white">{goal.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>Target: {new Date(goal.targetDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-extrabold" style={{ color: goal.color }}>{goal.progress.toFixed(0)}%</div>
                    <div className="text-xs text-gray-400">complete</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-500">Current: <span className="font-semibold text-gray-800 dark:text-white">{formatCurrency(goal.currentAmount)}</span></span>
                    <span className="text-gray-500">Target: <span className="font-semibold text-gray-800 dark:text-white">{formatCurrency(goal.targetAmount)}</span></span>
                  </div>
                  <Progress value={goal.progress} color={goal.color} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1.5 text-right">
                    ₹{((goal.targetAmount - goal.currentAmount) / 100000).toFixed(1)}L remaining
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <div className="flex items-center gap-1 text-gray-400 mb-1">
                      <Target className="w-3 h-3" />
                      <span>Monthly SIP</span>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(goal.monthlySIP)}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <div className="flex items-center gap-1 text-gray-400 mb-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Expected Return</span>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">{goal.expectedReturn}% p.a.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Goal Progress Timeline</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} />
              <Tooltip formatter={(v) => formatCurrency(v as number)} />
              <Line type="monotone" dataKey="retirement" name="Retirement" stroke="#0B6EFD" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="house" name="Dream House" stroke="#00B894" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="emergency" name="Emergency Fund" stroke="#F4B400" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
