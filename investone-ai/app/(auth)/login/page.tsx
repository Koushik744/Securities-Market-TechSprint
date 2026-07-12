"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, Zap, ArrowRight, TrendingUp, Shield, PieChart } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#0B6EFD] via-[#0B6EFD] to-[#00B894] p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-[#F4B400] blur-3xl" />
        </div>
        <div className="relative">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">InvestOne AI</span>
          </Link>
        </div>
        <div className="relative">
          <h2 className="text-4xl font-extrabold leading-tight mb-6">
            Your complete<br />investment universe,<br />in one place.
          </h2>
          <div className="space-y-4">
            {[
              { icon: PieChart, text: "Unified portfolio across all brokers & depositories" },
              { icon: TrendingUp, text: "Real-time AI portfolio health analysis" },
              { icon: Shield, text: "SEBI compliant, bank-grade security" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-blue-100">
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-blue-200 text-xs">
          © 2025 InvestOne AI · SEBI Compliant · AA Framework Powered
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0B6EFD] to-[#00B894] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[var(--fg)]">InvestOne AI</span>
          </div>

          <h1 className="text-2xl font-extrabold text-[var(--fg)] mb-1">Welcome back</h1>
          <p className="text-[var(--muted-fg)] text-sm mb-8">Sign in to your account to continue</p>

          {/* Google OAuth */}
          <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-[var(--card-border)] rounded-xl bg-white dark:bg-gray-900 text-[var(--fg)] font-medium text-sm hover:shadow-md transition-all mb-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[var(--card-border)]" />
            <span className="text-xs text-[var(--muted-fg)]">or with email</span>
            <div className="flex-1 h-px bg-[var(--card-border)]" />
          </div>

          <form className="space-y-4" onSubmit={e => { e.preventDefault(); window.location.href = '/dashboard' }}>
            <div>
              <label className="block text-sm font-medium text-[var(--fg)] mb-1.5">Email address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full px-3 py-2.5 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl text-sm text-[var(--fg)] placeholder:text-[var(--muted-fg)] outline-none focus:border-[#0B6EFD] focus:shadow-[0_0_0_3px_rgba(11,110,253,0.1)] transition-all"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-[var(--fg)]">Password</label>
                <a href="#" className="text-xs text-[#0B6EFD] hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full px-3 py-2.5 pr-10 bg-[var(--input-bg)] border border-[var(--card-border)] rounded-xl text-sm text-[var(--fg)] placeholder:text-[var(--muted-fg)] outline-none focus:border-[#0B6EFD] focus:shadow-[0_0_0_3px_rgba(11,110,253,0.1)] transition-all"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-fg)] hover:text-[var(--fg)]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 accent-[#0B6EFD]" />
              <label htmlFor="remember" className="text-sm text-[var(--muted-fg)]">Remember me for 30 days</label>
            </div>
            <button type="submit" className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-[var(--muted-fg)] mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#0B6EFD] font-semibold hover:underline">Create free account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
