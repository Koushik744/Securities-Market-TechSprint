"use client"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { healthScoreFactors, historicalHealthScores, aiSuggestions, portfolioStats } from "@/lib/mock-data"
import { Bot, TrendingUp, Lightbulb } from "lucide-react"

function CircularGauge({ score }: { score: number }) {
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference
  const color = score >= 80 ? "#00B894" : score >= 60 ? "#F4B400" : "#EF4444"
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg className="w-48 h-48 -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="var(--card-border)" strokeWidth="16" />
          <motion.circle
            cx="100" cy="100" r={radius} fill="none"
            stroke={color} strokeWidth="16"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-4xl font-extrabold" style={{ color }}>{score}</motion.span>
          <span className="text-xs text-[var(--muted-fg)] font-medium">out of 100</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <span className="text-sm font-bold" style={{ color }}>
          {score >= 80 ? "Excellent" : score >= 70 ? "Good" : score >= 60 ? "Fair" : "Needs Work"}
        </span>
        <p className="text-xs text-[var(--muted-fg)]">Portfolio Health</p>
      </div>
    </div>
  )
}

export default function HealthScorePage() {
  const score = portfolioStats.healthScore
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--fg)]">Portfolio Health Score</h1>
        <p className="text-sm text-[var(--muted-fg)] mt-0.5">AI-powered analysis of your portfolio&apos;s strength across 5 factors</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gauge */}
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 flex items-center justify-center">
          <CircularGauge score={score} />
        </div>

        {/* Factor breakdown */}
        <div className="lg:col-span-2 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6">
          <h3 className="font-bold text-[var(--fg)] mb-5">Score Breakdown</h3>
          <div className="space-y-5">
            {healthScoreFactors.map((factor, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{factor.icon}</span>
                    <span className="text-sm font-semibold text-[var(--fg)]">{factor.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[var(--fg)]">{factor.score}/100</span>
                  </div>
                </div>
                <div className="progress-track">
                  <motion.div
                    className="progress-fill"
                    style={{ background: factor.score >= 80 ? 'linear-gradient(90deg,#00B894,#00D4A8)' : factor.score >= 65 ? 'linear-gradient(90deg,#F4B400,#FFCA28)' : 'linear-gradient(90deg,#EF4444,#F87171)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.score}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
                <p className="text-xs text-[var(--muted-fg)] mt-1">{factor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical trend */}
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#0B6EFD]" />
          <h3 className="font-bold text-[var(--fg)]">Score Trend (Last 6 months)</h3>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={historicalHealthScores}>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={35} />
            <Tooltip formatter={(v) => [`${v}/100`, "Health Score"]} />
            <Line type="monotone" dataKey="score" stroke="#0B6EFD" strokeWidth={3} dot={{ fill: "#0B6EFD", r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Suggestions */}
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0B6EFD] to-[#00B894] flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--fg)]">AI Suggestions</h3>
            <p className="text-xs text-[var(--muted-fg)]">Personalised to improve your score</p>
          </div>
        </div>
        <div className="space-y-3">
          {aiSuggestions.map((suggestion, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-3.5 bg-[rgba(11,110,253,0.04)] rounded-xl border border-[rgba(11,110,253,0.08)]">
              <Lightbulb className="w-4 h-4 text-[#F4B400] shrink-0 mt-0.5" />
              <p className="text-sm text-[var(--fg)]">{suggestion}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
