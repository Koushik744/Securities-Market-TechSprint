"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Zap, TrendingUp, Shield, Bot, BookOpen, Bell, Compass,
  PieChart, Check, ChevronDown, ChevronUp, ArrowRight,
  Star, BarChart3, Target, Lock, Smartphone, Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedNumber } from "@/components/shared/AnimatedNumber"

const features = [
  { icon: PieChart, title: 'Unified Portfolio', desc: 'See all your investments across brokers and depositories in one place. No more juggling multiple apps.', color: '#0B6EFD', bg: '#EFF6FF' },
  { icon: Bot, title: 'AI-Powered Insights', desc: 'Gemini-powered AI analyzes your portfolio, suggests rebalancing, explains complex instruments in simple words.', color: '#00B894', bg: '#ECFDF5' },
  { icon: Shield, title: 'Risk Profiling', desc: 'Intelligent questionnaire determines your risk appetite and recommends an optimal asset allocation strategy.', color: '#6366F1', bg: '#EEF2FF' },
  { icon: BookOpen, title: 'Investment Education', desc: 'Structured learning paths from basics to advanced. Understand REITs, InvITs, bonds, derivatives and more.', color: '#F4B400', bg: '#FFFBEB' },
  { icon: Bell, title: 'Smart Alerts', desc: 'Never miss a market move. Get AI-curated alerts on price movements, dividends, bond maturities and goal progress.', color: '#EC4899', bg: '#FDF2F8' },
  { icon: Compass, title: 'Multi-Asset Explorer', desc: 'Discover and compare 500+ investment products across 8 asset classes with detailed risk, return and tax analysis.', color: '#14B8A6', bg: '#F0FDFA' },
]

const stats = [
  { label: 'Assets Managed', value: 2500, prefix: '₹', suffix: 'Cr+', decimals: 0 },
  { label: 'Investors Onboarded', value: 50000, prefix: '', suffix: '+', decimals: 0 },
  { label: 'Asset Classes', value: 12, prefix: '', suffix: '+', decimals: 0 },
  { label: 'Platform Uptime', value: 99.9, prefix: '', suffix: '%', decimals: 1 },
]

const steps = [
  { step: '01', title: 'Connect Your Accounts', desc: 'Link your demat accounts, mutual fund folios, and other investment accounts securely via Account Aggregator.', icon: Link },
  { step: '02', title: 'Get Your Full Picture', desc: 'InvestOne AI automatically consolidates all your holdings and gives you a unified dashboard in under 60 seconds.', icon: BarChart3 },
  { step: '03', title: 'Invest Smarter', desc: 'Use AI insights, risk analysis, and the investment explorer to make better decisions and grow your wealth faster.', icon: TrendingUp },
]

const testimonials = [
  { name: 'Priya Sharma', role: 'Software Engineer, Bengaluru', text: "Finally I can see all my investments — Zerodha stocks, SBI mutual funds, and my EPF — in one place. The AI suggestions helped me save ₹45,000 in taxes last year!", rating: 5, initials: 'PS' },
  { name: 'Rajesh Kumar', role: 'CA, Mumbai', text: "The REIT and InvIT education modules are brilliant. I never understood these instruments before. Now I've allocated 12% of my portfolio there and earning 8% yield.", rating: 5, initials: 'RK' },
  { name: 'Ananya Iyer', role: 'Doctor, Chennai', text: "As a busy professional, I had no time to track 6 different investment accounts. InvestOne AI does it all automatically. My portfolio health score went from 58 to 81 in 3 months!", rating: 5, initials: 'AI' },
  { name: 'Sameer Joshi', role: 'Startup Founder, Pune', text: "The goal planner helped me structure my investments for my daughter's education. The AI figured out I needed ₹10K SIP increase to stay on track. Game changer.", rating: 5, initials: 'SJ' },
]

const pricing = [
  {
    name: 'Starter', price: 0, period: 'Forever Free', color: '#64748B',
    features: ['Portfolio tracking (up to 3 accounts)', 'Basic charts & analytics', 'Investment Explorer (read-only)', 'Weekly portfolio digest', '5 Smart Alerts/month'],
    cta: 'Get Started Free',
  },
  {
    name: 'Pro', price: 299, period: '/month', color: '#0B6EFD', popular: true,
    features: ['Unlimited portfolio accounts', 'AI-powered insights & rebalancing', 'Full Investment Explorer + Compare', 'Unlimited Smart Alerts', 'Goal Planner', 'Risk Profiling', 'Priority support'],
    cta: 'Start Pro Trial',
  },
  {
    name: 'Premium', price: 999, period: '/month', color: '#00B894',
    features: ['Everything in Pro', 'Personalized AI investment advisor', 'Tax optimization reports', 'Family portfolio management', 'Advanced portfolio analytics', 'API access', 'Dedicated relationship manager'],
    cta: 'Go Premium',
  },
]

const faqs = [
  { q: 'Is my financial data safe on InvestOne AI?', a: 'Yes. We use bank-grade 256-bit AES encryption, are fully SEBI-compliant, and use the AA (Account Aggregator) framework for data access. We never store your login credentials.' },
  { q: 'Which brokers and depositories are supported?', a: 'We support all major Indian brokers (Zerodha, Groww, Angel One, HDFC Securities, ICICI Direct, Upstox and 40+ more) and both depositories (NSDL and CDSL) via the AA framework.' },
  { q: 'What asset classes can I track?', a: 'Stocks, Mutual Funds, ETFs, REITs, InvITs, Corporate Bonds, Government Securities, Sovereign Gold Bonds, FDs, EPF, and more — all in one dashboard.' },
  { q: 'How does the AI investment advisor work?', a: 'Our AI (powered by Google Gemini) analyzes your portfolio composition, risk profile, market conditions, and financial goals to generate personalized, actionable insights and recommendations.' },
  { q: 'Is there a free plan available?', a: 'Yes! Our Starter plan is completely free forever. It includes portfolio tracking for up to 3 accounts, basic analytics, and 5 smart alerts per month.' },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0B6EFD] to-[#00B894] flex items-center justify-center shadow-md">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-lg">InvestOne AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            <a href="#features" className="hover:text-[#0B6EFD] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#0B6EFD] transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-[#0B6EFD] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#0B6EFD] transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/(auth)/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full px-4 py-1.5 text-sm text-[#0B6EFD] font-medium mb-6"
            >
              <span className="w-2 h-2 bg-[#0B6EFD] rounded-full animate-pulse" />
              SEBI Securities Market TechSprint 2024
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              One Platform.
              <br />
              <span className="gradient-text">Every Investment.</span>
              <br />
              Smarter Decisions.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10"
            >
              India's first unified multi-asset investment super app. Consolidate stocks, mutual funds, ETFs, REITs, InvITs, bonds, and gold — powered by AI to make you a smarter investor.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-4"
            >
              <Link href="/dashboard">
                <Button size="xl" className="shadow-xl">
                  Start Investing Smarter
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                Watch Demo
                <span className="ml-1">▶</span>
              </Button>
            </motion.div>
            <p className="text-xs text-gray-400">No credit card required · Free forever plan · SEBI compliant</p>
          </div>

          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden">
              {/* Mock topbar */}
              <div className="h-10 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="flex-1 mx-4 h-5 bg-gray-200 dark:bg-gray-700 rounded-md" />
              </div>
              {/* Mock dashboard content */}
              <div className="flex" style={{ height: '380px' }}>
                {/* Sidebar */}
                <div className="w-48 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-700 p-3 space-y-1">
                  {['Dashboard', 'Portfolio', 'Risk', 'Health Score', 'Explorer', 'AI Assistant'].map((item, i) => (
                    <div key={i} className={`h-7 rounded-lg flex items-center px-3 gap-2 ${i === 0 ? 'bg-blue-50 text-blue-600' : ''}`}>
                      <div className={`w-3 h-3 rounded ${i === 0 ? 'bg-[#0B6EFD]' : 'bg-gray-200'}`} />
                      <div className={`h-2 rounded flex-1 ${i === 0 ? 'bg-blue-200' : 'bg-gray-100'}`} />
                    </div>
                  ))}
                </div>
                {/* Main content */}
                <div className="flex-1 p-4 bg-[#F8FAFC] dark:bg-gray-950 overflow-hidden">
                  {/* Stat cards */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: 'Portfolio Value', value: '₹30.4L', change: '+22.2%', color: '#0B6EFD' },
                      { label: "Today's Gain", value: '+₹12,450', change: '+0.41%', color: '#00B894' },
                      { label: 'Health Score', value: '78/100', change: 'Good', color: '#F4B400' },
                    ].map((card, i) => (
                      <div key={i} className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-700 shadow-sm">
                        <p className="text-xs text-gray-400 mb-1">{card.label}</p>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{card.value}</p>
                        <p className="text-xs font-semibold mt-0.5" style={{ color: card.color }}>{card.change}</p>
                      </div>
                    ))}
                  </div>
                  {/* Charts area */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-400 mb-2">Portfolio Growth</p>
                      <svg viewBox="0 0 200 80" className="w-full">
                        <defs>
                          <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0B6EFD" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#0B6EFD" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M0,70 L20,65 L40,62 L60,55 L80,50 L100,48 L120,45 L140,38 L160,32 L180,28 L200,22 L200,80 L0,80 Z" fill="url(#heroGrad)" />
                        <path d="M0,70 L20,65 L40,62 L60,55 L80,50 L100,48 L120,45 L140,38 L160,32 L180,28 L200,22" fill="none" stroke="#0B6EFD" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-400 mb-2">Asset Allocation</p>
                      <div className="flex items-center gap-3">
                        <svg viewBox="0 0 80 80" className="w-20 h-20">
                          <circle cx="40" cy="40" r="32" fill="none" stroke="#EFF6FF" strokeWidth="12" />
                          <circle cx="40" cy="40" r="32" fill="none" stroke="#0B6EFD" strokeWidth="12" strokeDasharray="60 140" strokeDashoffset="40" />
                          <circle cx="40" cy="40" r="32" fill="none" stroke="#00B894" strokeWidth="12" strokeDasharray="40 160" strokeDashoffset="-20" />
                          <circle cx="40" cy="40" r="32" fill="none" stroke="#F4B400" strokeWidth="12" strokeDasharray="25 175" strokeDashoffset="-60" />
                        </svg>
                        <div className="space-y-1 text-xs">
                          {[['Stocks', '#0B6EFD'], ['MF', '#00B894'], ['Others', '#F4B400']].map(([l, c]) => (
                            <div key={l} className="flex items-center gap-1.5">
                              <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                              <span className="text-gray-500">{l}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-[#0B6EFD] to-[#00B894]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="text-4xl font-bold mb-1">
                  <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <p className="text-white/80 text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-[#F8FAFC] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0B6EFD] font-semibold text-sm uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything you need to invest better</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Built for India's retail investors who deserve institutional-grade tools and insights.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: f.bg }}>
                    <Icon className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0B6EFD] font-semibold text-sm uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get started in 3 simple steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0B6EFD] to-[#00B894] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-200">
                  <span className="text-white text-xl font-bold">{s.step}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#F8FAFC] dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0B6EFD] font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Loved by 50,000+ Indian investors</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B6EFD] to-[#00B894] flex items-center justify-center text-white text-xs font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0B6EFD] font-semibold text-sm uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-gray-500">Start free, upgrade when ready. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {pricing.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-6 border ${p.popular ? 'border-[#0B6EFD] shadow-2xl shadow-blue-100 dark:shadow-blue-900/20 relative' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm'}`}
                style={p.popular ? { background: 'linear-gradient(135deg, #0B6EFD08, #00B89408)' } : {}}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0B6EFD] text-white text-xs font-bold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-4xl font-bold" style={{ color: p.color }}>
                    {p.price === 0 ? 'Free' : `₹${p.price}`}
                  </span>
                  <span className="text-gray-400 text-sm">{p.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Check className="w-4 h-4 shrink-0" style={{ color: p.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard">
                  <Button
                    className="w-full"
                    variant={p.popular ? 'default' : 'outline'}
                    style={p.popular ? {} : { borderColor: p.color, color: p.color }}
                  >
                    {p.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-[#F8FAFC] dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#0B6EFD] font-semibold text-sm uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-gray-900 dark:text-white text-sm">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="px-5 pb-5"
                  >
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0B6EFD] to-[#00B894]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to invest smarter?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Join 50,000+ investors who have consolidated their portfolio and are making better investment decisions with InvestOne AI.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button variant="glass" size="xl" className="text-gray-900 font-bold">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 text-white/70 text-sm">
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Bank-grade security</span>
              <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5" /> Mobile friendly</span>
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> SEBI compliant</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0B6EFD] to-[#00B894] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-white">InvestOne AI</span>
              </div>
              <p className="text-sm leading-relaxed">India's unified multi-asset investment super app for retail investors.</p>
              <p className="text-xs mt-3 text-gray-500">Built for SEBI Securities Market TechSprint 2024</p>
            </div>
            {[
              { title: 'Product', links: ['Dashboard', 'Portfolio', 'AI Assistant', 'Learning Hub', 'Investment Explorer'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press', 'Contact'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Security', 'SEBI Disclosure', 'Cookie Policy'] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-white text-sm mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}><a href="#" className="text-sm hover:text-white transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs">© 2024 InvestOne AI. All rights reserved. SEBI Registered.</p>
            <p className="text-xs text-gray-500">Investments are subject to market risks. Read all scheme-related documents carefully.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
