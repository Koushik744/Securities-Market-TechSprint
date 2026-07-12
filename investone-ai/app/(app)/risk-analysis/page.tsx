"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"
import { ChevronRight, ChevronLeft, Check } from "lucide-react"

const questions = [
  {
    id: 1, question: "What is your age?",
    options: [{ label: "Below 25", value: 4 }, { label: "25-35", value: 3 }, { label: "36-50", value: 2 }, { label: "Above 50", value: 1 }]
  },
  {
    id: 2, question: "What is your annual income?",
    options: [{ label: "Below ₹3L", value: 1 }, { label: "₹3L – ₹10L", value: 2 }, { label: "₹10L – ₹25L", value: 3 }, { label: "Above ₹25L", value: 4 }]
  },
  {
    id: 3, question: "What is your investment horizon?",
    options: [{ label: "Less than 1 year", value: 1 }, { label: "1–3 years", value: 2 }, { label: "3–7 years", value: 3 }, { label: "7+ years", value: 4 }]
  },
  {
    id: 4, question: "What is your primary investment goal?",
    options: [{ label: "Capital preservation", value: 1 }, { label: "Regular income", value: 2 }, { label: "Balanced growth", value: 3 }, { label: "Maximum growth", value: 4 }]
  },
  {
    id: 5, question: "How comfortable are you with short-term losses?",
    options: [{ label: "Very uncomfortable", value: 1 }, { label: "Somewhat uncomfortable", value: 2 }, { label: "Comfortable", value: 3 }, { label: "Very comfortable", value: 4 }]
  },
]

const profiles = {
  Conservative: { color: "#00B894", radarData: [{ subject: "Safety", A: 95 }, { subject: "Income", A: 70 }, { subject: "Growth", A: 30 }, { subject: "Liquidity", A: 85 }, { subject: "Diversification", A: 60 }], allocation: [{ label: "Debt/Bonds", pct: 60 }, { label: "Equity", pct: 20 }, { label: "Gold", pct: 10 }, { label: "Liquid/FD", pct: 10 }], desc: "You prioritise capital preservation. Your portfolio should focus on fixed income instruments, AAA-rated bonds, and government securities." },
  Moderate: { color: "#F4B400", radarData: [{ subject: "Safety", A: 60 }, { subject: "Income", A: 55 }, { subject: "Growth", A: 65 }, { subject: "Liquidity", A: 70 }, { subject: "Diversification", A: 75 }], allocation: [{ label: "Equity", pct: 50 }, { label: "Debt", pct: 30 }, { label: "REITs/InvITs", pct: 10 }, { label: "Gold", pct: 10 }], desc: "You balance growth with stability. A diversified mix of equity, debt, and alternative assets suits your profile." },
  Aggressive: { color: "#EF4444", radarData: [{ subject: "Safety", A: 25 }, { subject: "Income", A: 40 }, { subject: "Growth", A: 95 }, { subject: "Liquidity", A: 50 }, { subject: "Diversification", A: 65 }], allocation: [{ label: "Equity", pct: 70 }, { label: "Mid/Small Cap", pct: 15 }, { label: "REITs", pct: 10 }, { label: "Debt", pct: 5 }], desc: "You seek maximum long-term growth and can weather market volatility. Focus on equity-heavy portfolios with a 7+ year horizon." },
}

export default function RiskAnalysisPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [result, setResult] = useState<string | null>(null)

  const answer = (val: number) => {
    const newAnswers = [...answers.slice(0, step), val]
    setAnswers(newAnswers)
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300)
    } else {
      const total = newAnswers.reduce((a, b) => a + b, 0)
      const avg = total / questions.length
      setResult(avg <= 2 ? "Conservative" : avg <= 3 ? "Moderate" : "Aggressive")
    }
  }

  const profile = result ? profiles[result as keyof typeof profiles] : null

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--fg)]">Risk Profiling</h1>
        <p className="text-sm text-[var(--muted-fg)] mt-0.5">Answer 5 questions to discover your investor profile</p>
      </div>

      {!result ? (
        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-[var(--muted-fg)] mb-2">
              <span>Question {step + 1} of {questions.length}</span>
              <span>{Math.round(((step) / questions.length) * 100)}% complete</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}>
              <h2 className="text-xl font-bold text-[var(--fg)] mb-6">{questions[step].question}</h2>
              <div className="grid grid-cols-2 gap-3">
                {questions[step].options.map((opt, i) => (
                  <button key={i} onClick={() => answer(opt.value)}
                    className={`p-4 rounded-xl border-2 text-sm font-semibold text-left transition-all hover:border-[#0B6EFD] hover:bg-[rgba(11,110,253,0.04)] ${answers[step] === opt.value ? 'border-[#0B6EFD] bg-[rgba(11,110,253,0.06)]' : 'border-[var(--card-border)]'}`}>
                    <span className="text-[var(--fg)]">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            <button onClick={() => { setStep(Math.max(0, step - 1)) }} disabled={step === 0}
              className="flex items-center gap-2 text-sm text-[var(--muted-fg)] disabled:opacity-40 hover:text-[var(--fg)] transition-colors">
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <div className="flex gap-1.5">
              {questions.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < step ? 'bg-[#0B6EFD]' : i === step ? 'bg-[#0B6EFD]' : 'bg-[var(--card-border)]'}`} />
              ))}
            </div>
            <button onClick={() => answer(0)} className="flex items-center gap-2 text-sm text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors">
              Skip <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Result card */}
          <div className="bg-[var(--card-bg)] border-2 rounded-2xl p-8" style={{ borderColor: profile!.color }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${profile!.color}20` }}>
                {result === "Conservative" ? "🛡️" : result === "Moderate" ? "⚖️" : "🚀"}
              </div>
              <div>
                <p className="text-xs text-[var(--muted-fg)] font-medium">Your Risk Profile</p>
                <h2 className="text-3xl font-extrabold" style={{ color: profile!.color }}>{result}</h2>
              </div>
              <div className="ml-auto">
                <button onClick={() => { setStep(0); setAnswers([]); setResult(null) }}
                  className="text-sm text-[#0B6EFD] border border-[#0B6EFD] px-3 py-1.5 rounded-xl hover:bg-[rgba(11,110,253,0.06)] transition-colors">
                  Retake
                </button>
              </div>
            </div>
            <p className="text-sm text-[var(--muted-fg)] leading-relaxed">{profile!.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Radar */}
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6">
              <h3 className="font-bold text-[var(--fg)] mb-4">Risk Dimensions</h3>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={profile!.radarData}>
                  <PolarGrid stroke="var(--card-border)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#64748B" }} />
                  <Radar dataKey="A" stroke={profile!.color} fill={profile!.color} fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Recommended allocation */}
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6">
              <h3 className="font-bold text-[var(--fg)] mb-4">Recommended Allocation</h3>
              <div className="space-y-3">
                {profile!.allocation.map((a, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[var(--fg)]">{a.label}</span>
                      <span className="font-bold" style={{ color: profile!.color }}>{a.pct}%</span>
                    </div>
                    <div className="progress-track">
                      <motion.div className="h-full rounded-full" style={{ background: profile!.color }}
                        initial={{ width: 0 }} animate={{ width: `${a.pct}%` }} transition={{ delay: i * 0.1, duration: 0.8 }} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 btn-primary py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Apply to Portfolio
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
