"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, Zap, ArrowRight, Check } from "lucide-react"

const steps = ["Personal Info", "Mobile Verify", "Set Password"]

export default function SignupPage() {
  const [step, setStep] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "", confirm: "", otp: "" })

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B6EFD] to-[#00B894] flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[var(--fg)] text-lg">InvestOne AI</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-[var(--fg)] mb-1">Create your account</h1>
          <p className="text-[var(--muted-fg)] text-sm">Start investing smarter in 2 minutes</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-[var(--card-border)] z-0" />
          <div className="absolute top-4 left-0 h-0.5 bg-[#0B6EFD] z-0 transition-all duration-500" style={{ width: `${step * 50}%` }} />
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5 relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? 'bg-[#0B6EFD] text-white' : i === step ? 'bg-[#0B6EFD] text-white' : 'bg-[var(--card-bg)] border-2 border-[var(--card-border)] text-[var(--muted-fg)]'}`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className="text-[10px] text-[var(--muted-fg)] font-medium">{s}</span>
            </div>
          ))}
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--fg)] mb-1.5">Full Name</label>
                <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Koushik N" className="w-full px-3 py-2.5 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl text-sm outline-none focus:border-[#0B6EFD] focus:shadow-[0_0_0_3px_rgba(11,110,253,0.1)] transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--fg)] mb-1.5">Email Address</label>
                <input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@example.com" className="w-full px-3 py-2.5 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl text-sm outline-none focus:border-[#0B6EFD] focus:shadow-[0_0_0_3px_rgba(11,110,253,0.1)] transition-all" />
              </div>
              <button onClick={() => setStep(1)} className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2 text-sm mt-2">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--fg)] mb-1.5">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="px-3 py-2.5 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl text-sm text-[var(--fg)] font-medium">+91</div>
                  <input value={form.mobile} onChange={e => update("mobile", e.target.value)} placeholder="9876543210" maxLength={10} className="flex-1 px-3 py-2.5 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl text-sm outline-none focus:border-[#0B6EFD] focus:shadow-[0_0_0_3px_rgba(11,110,253,0.1)] transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--fg)] mb-1.5">Enter OTP</label>
                <input value={form.otp} onChange={e => update("otp", e.target.value)} placeholder="6-digit OTP" maxLength={6} className="w-full px-3 py-2.5 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl text-sm outline-none focus:border-[#0B6EFD] focus:shadow-[0_0_0_3px_rgba(11,110,253,0.1)] transition-all" />
                <p className="text-xs text-[var(--muted-fg)] mt-1.5">OTP sent to +91 {form.mobile || "XXXXXXXXXX"} · <button className="text-[#0B6EFD]">Resend</button></p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="flex-1 border border-[var(--card-border)] py-2.5 rounded-xl text-sm font-medium text-[var(--fg)] hover:bg-[var(--input-bg)] transition-colors">Back</button>
                <button onClick={() => setStep(2)} className="flex-1 btn-primary py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">Verify <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--fg)] mb-1.5">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={form.password} onChange={e => update("password", e.target.value)} placeholder="Min 8 characters" className="w-full pr-10 px-3 py-2.5 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl text-sm outline-none focus:border-[#0B6EFD] focus:shadow-[0_0_0_3px_rgba(11,110,253,0.1)] transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-fg)]">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--fg)] mb-1.5">Confirm Password</label>
                <input type="password" value={form.confirm} onChange={e => update("confirm", e.target.value)} placeholder="Re-enter password" className="w-full px-3 py-2.5 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl text-sm outline-none focus:border-[#0B6EFD] focus:shadow-[0_0_0_3px_rgba(11,110,253,0.1)] transition-all" />
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="tnc" className="mt-0.5 w-4 h-4 accent-[#0B6EFD]" />
                <label htmlFor="tnc" className="text-xs text-[var(--muted-fg)] leading-relaxed">I agree to the <a href="#" className="text-[#0B6EFD]">Terms of Service</a> and <a href="#" className="text-[#0B6EFD]">Privacy Policy</a>. I understand that InvestOne AI is a read-only aggregation platform.</label>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-[var(--card-border)] py-2.5 rounded-xl text-sm font-medium text-[var(--fg)] hover:bg-[var(--input-bg)] transition-colors">Back</button>
                <button onClick={() => window.location.href = '/dashboard'} className="flex-1 btn-primary py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">Create Account <ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          )}
        </div>
        <p className="text-center text-sm text-[var(--muted-fg)] mt-6">
          Already have an account? <Link href="/login" className="text-[#0B6EFD] font-semibold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  )
}
