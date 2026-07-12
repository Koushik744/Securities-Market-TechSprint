export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Very High'
export type AssetType = 'Stock' | 'Mutual Fund' | 'ETF' | 'REIT' | 'InvIT' | 'Corporate Bond' | 'G-Sec' | 'Gold'

export interface Asset {
  id: string
  name: string
  ticker: string
  type: AssetType
  sector: string
  currentValue: number
  purchaseValue: number
  units: number
  currentPrice: number
  purchasePrice: number
  returns: number
  returnsPercent: number
  allocation: number
  risk: RiskLevel
  dividendYield?: number
  maturityDate?: string
  rating?: string
  description?: string
}

export interface Transaction {
  id: string
  date: string
  type: 'Buy' | 'Sell' | 'Dividend' | 'Interest' | 'SIP'
  assetName: string
  assetType: AssetType
  amount: number
  units: number
  price: number
  status: 'Completed' | 'Pending' | 'Failed'
}

export interface MonthlyData {
  month: string
  value: number
  invested: number
  returns: number
}

export interface SectorAllocation {
  sector: string
  value: number
  percent: number
  color: string
}

export interface Goal {
  id: string
  name: string
  icon: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  monthlySIP: number
  expectedReturn: number
  progress: number
  color: string
}

export interface Alert {
  id: string
  type: 'market' | 'portfolio' | 'dividend' | 'goal' | 'ai'
  severity: 'info' | 'warning' | 'success' | 'danger'
  title: string
  message: string
  time: string
  read: boolean
}

export interface LearningModule {
  id: string
  title: string
  description: string
  category: 'Beginner' | 'Intermediate' | 'Advanced'
  topic: string
  duration: string
  difficulty: number
  progress: number
  completed: boolean
  badge?: string
}

// ── Portfolio Holdings ──────────────────────────────────────────────────────
export const portfolioHoldings: Asset[] = [
  // Stocks
  { id: 'r1', name: 'Reliance Industries', ticker: 'RELIANCE', type: 'Stock', sector: 'Energy', currentValue: 245000, purchaseValue: 198000, units: 80, currentPrice: 3062.5, purchasePrice: 2475, returns: 47000, returnsPercent: 23.74, allocation: 8.07, risk: 'Moderate' },
  { id: 't1', name: 'Tata Consultancy Services', ticker: 'TCS', type: 'Stock', sector: 'IT', currentValue: 198000, purchaseValue: 175000, units: 50, currentPrice: 3960, purchasePrice: 3500, returns: 23000, returnsPercent: 13.14, allocation: 6.52, risk: 'Low' },
  { id: 'i1', name: 'Infosys Limited', ticker: 'INFY', type: 'Stock', sector: 'IT', currentValue: 142000, purchaseValue: 128000, units: 100, currentPrice: 1420, purchasePrice: 1280, returns: 14000, returnsPercent: 10.94, allocation: 4.68, risk: 'Low' },
  { id: 'h1', name: 'HDFC Bank', ticker: 'HDFCBANK', type: 'Stock', sector: 'Banking', currentValue: 165000, purchaseValue: 145000, units: 100, currentPrice: 1650, purchasePrice: 1450, returns: 20000, returnsPercent: 13.79, allocation: 5.44, risk: 'Low' },
  { id: 'b1', name: 'Bajaj Finance', ticker: 'BAJFINANCE', type: 'Stock', sector: 'NBFC', currentValue: 125000, purchaseValue: 108000, units: 18, currentPrice: 6944.44, purchasePrice: 6000, returns: 17000, returnsPercent: 15.74, allocation: 4.12, risk: 'High' },
  { id: 'l1', name: 'Larsen & Toubro', ticker: 'LT', type: 'Stock', sector: 'Infrastructure', currentValue: 98000, purchaseValue: 82000, units: 27, currentPrice: 3629.63, purchasePrice: 3037, returns: 16000, returnsPercent: 19.51, allocation: 3.23, risk: 'Moderate' },
  { id: 'a1', name: 'Asian Paints', ticker: 'ASIANPAINT', type: 'Stock', sector: 'Consumer', currentValue: 76000, purchaseValue: 88000, units: 25, currentPrice: 3040, purchasePrice: 3520, returns: -12000, returnsPercent: -13.64, allocation: 2.50, risk: 'Moderate' },
  { id: 'm1', name: 'Maruti Suzuki', ticker: 'MARUTI', type: 'Stock', sector: 'Auto', currentValue: 92000, purchaseValue: 78000, units: 8, currentPrice: 11500, purchasePrice: 9750, returns: 14000, returnsPercent: 17.95, allocation: 3.03, risk: 'Moderate' },
  // Mutual Funds
  { id: 'mf1', name: 'SBI Bluechip Fund Direct Growth', ticker: 'SBI-BLUE', type: 'Mutual Fund', sector: 'Large Cap Equity', currentValue: 285000, purchaseValue: 220000, units: 8450.5, currentPrice: 33.73, purchasePrice: 26.03, returns: 65000, returnsPercent: 29.55, allocation: 9.39, risk: 'Moderate' },
  { id: 'mf2', name: 'Mirae Asset Large Cap Fund Direct', ticker: 'MIRAE-LC', type: 'Mutual Fund', sector: 'Large Cap Equity', currentValue: 195000, purchaseValue: 160000, units: 5200.8, currentPrice: 37.5, purchasePrice: 30.77, returns: 35000, returnsPercent: 21.88, allocation: 6.42, risk: 'Moderate' },
  { id: 'mf3', name: 'Axis Flexi Cap Fund Direct Growth', ticker: 'AXIS-FLEXI', type: 'Mutual Fund', sector: 'Flexi Cap Equity', currentValue: 168000, purchaseValue: 140000, units: 6720, currentPrice: 25.0, purchasePrice: 20.83, returns: 28000, returnsPercent: 20.0, allocation: 5.53, risk: 'High' },
  { id: 'mf4', name: 'HDFC Mid-Cap Opportunities Fund', ticker: 'HDFC-MID', type: 'Mutual Fund', sector: 'Mid Cap Equity', currentValue: 145000, purchaseValue: 110000, units: 3950.5, currentPrice: 36.7, purchasePrice: 27.84, returns: 35000, returnsPercent: 31.82, allocation: 4.78, risk: 'High' },
  { id: 'mf5', name: 'ICICI Pru Short Term Fund Direct', ticker: 'ICICI-SHORT', type: 'Mutual Fund', sector: 'Debt', currentValue: 82000, purchaseValue: 75000, units: 3055.6, currentPrice: 26.84, purchasePrice: 24.55, returns: 7000, returnsPercent: 9.33, allocation: 2.70, risk: 'Low' },
  // ETFs
  { id: 'etf1', name: 'Nippon India ETF Nifty BeES', ticker: 'NIFTYBEES', type: 'ETF', sector: 'Index', currentValue: 95000, purchaseValue: 78000, units: 3800, currentPrice: 25.0, purchasePrice: 20.53, returns: 17000, returnsPercent: 21.79, allocation: 3.13, risk: 'Moderate' },
  { id: 'etf2', name: 'Nippon India ETF Bank BeES', ticker: 'BANKBEES', type: 'ETF', sector: 'Banking Index', currentValue: 48000, purchaseValue: 42000, units: 1600, currentPrice: 30.0, purchasePrice: 26.25, returns: 6000, returnsPercent: 14.29, allocation: 1.58, risk: 'Moderate' },
  { id: 'etf3', name: 'Nippon India ETF Gold BeES', ticker: 'GOLDBEES', type: 'ETF', sector: 'Gold', currentValue: 62000, purchaseValue: 50000, units: 1240, currentPrice: 50.0, purchasePrice: 40.32, returns: 12000, returnsPercent: 24.0, allocation: 2.04, risk: 'Low' },
  // REITs
  { id: 'reit1', name: 'Embassy Office Parks REIT', ticker: 'EMBASSY', type: 'REIT', sector: 'Real Estate', currentValue: 78000, purchaseValue: 68000, units: 200, currentPrice: 390, purchasePrice: 340, returns: 10000, returnsPercent: 14.71, allocation: 2.57, risk: 'Moderate', dividendYield: 6.2 },
  { id: 'reit2', name: 'Mindspace Business Parks REIT', ticker: 'MINDSPACE', type: 'REIT', sector: 'Real Estate', currentValue: 55000, purchaseValue: 48000, units: 160, currentPrice: 343.75, purchasePrice: 300, returns: 7000, returnsPercent: 14.58, allocation: 1.81, risk: 'Moderate', dividendYield: 5.8 },
  { id: 'reit3', name: 'Brookfield India Real Estate Trust', ticker: 'BIRET', type: 'REIT', sector: 'Real Estate', currentValue: 38000, purchaseValue: 35000, units: 130, currentPrice: 292.31, purchasePrice: 269.23, returns: 3000, returnsPercent: 8.57, allocation: 1.25, risk: 'Moderate', dividendYield: 7.1 },
  // InvITs
  { id: 'invit1', name: 'IRB InvIT Fund', ticker: 'IRB-INVIT', type: 'InvIT', sector: 'Infrastructure', currentValue: 45000, purchaseValue: 40000, units: 1500, currentPrice: 30.0, purchasePrice: 26.67, returns: 5000, returnsPercent: 12.5, allocation: 1.48, risk: 'Moderate', dividendYield: 8.5 },
  { id: 'invit2', name: 'Powergrid Infrastructure InvIT', ticker: 'PGINFRA', type: 'InvIT', sector: 'Power', currentValue: 32000, purchaseValue: 28000, units: 2133.3, currentPrice: 15.0, purchasePrice: 13.13, returns: 4000, returnsPercent: 14.29, allocation: 1.05, risk: 'Low', dividendYield: 9.2 },
  // Corporate Bonds
  { id: 'cb1', name: 'HDFC Ltd NCD 8.55% 2026', ticker: 'HDFC-NCD', type: 'Corporate Bond', sector: 'Debt', currentValue: 105000, purchaseValue: 100000, units: 100, currentPrice: 1050, purchasePrice: 1000, returns: 5000, returnsPercent: 5.0, allocation: 3.46, risk: 'Low', rating: 'AAA', maturityDate: '2026-03-15' },
  { id: 'cb2', name: 'Tata Capital NCD 8.75% 2025', ticker: 'TATA-NCD', type: 'Corporate Bond', sector: 'Debt', currentValue: 52000, purchaseValue: 50000, units: 50, currentPrice: 1040, purchasePrice: 1000, returns: 2000, returnsPercent: 4.0, allocation: 1.71, risk: 'Low', rating: 'AA+', maturityDate: '2025-12-20' },
  // G-Sec
  { id: 'gs1', name: 'GOI 7.26% 2029 G-Sec', ticker: 'GOI-2029', type: 'G-Sec', sector: 'Sovereign Debt', currentValue: 125000, purchaseValue: 120000, units: 125, currentPrice: 1000, purchasePrice: 960, returns: 5000, returnsPercent: 4.17, allocation: 4.12, risk: 'Low', rating: 'SOV', maturityDate: '2029-08-22' },
  // Gold
  { id: 'g1', name: 'Sovereign Gold Bond 2024-III', ticker: 'SGB-24III', type: 'Gold', sector: 'Commodity', currentValue: 88000, purchaseValue: 72000, units: 10, currentPrice: 8800, purchasePrice: 7200, returns: 16000, returnsPercent: 22.22, allocation: 2.90, risk: 'Low', maturityDate: '2032-04-10' },
]

// ── Total Portfolio Stats ────────────────────────────────────────────────────
export const portfolioStats = {
  totalInvestment: 2485000,
  currentValue: 3037620,
  totalReturns: 552620,
  totalReturnsPercent: 22.24,
  todayGain: 12450,
  todayGainPercent: 0.41,
  diversificationScore: 82,
  riskLevel: 'Moderate',
  healthScore: 78,
  // Aliases for pre-existing dashboard page
  overallReturn: 22.24,
  todaysGain: 12450,
  todaysGainPct: 0.41,
}

// ── Monthly Growth Data ──────────────────────────────────────────────────────
export const monthlyGrowthData: MonthlyData[] = [
  { month: 'Aug 23', value: 2280000, invested: 2100000, returns: 180000 },
  { month: 'Sep 23', value: 2310000, invested: 2150000, returns: 160000 },
  { month: 'Oct 23', value: 2390000, invested: 2200000, returns: 190000 },
  { month: 'Nov 23', value: 2510000, invested: 2250000, returns: 260000 },
  { month: 'Dec 23', value: 2620000, invested: 2300000, returns: 320000 },
  { month: 'Jan 24', value: 2580000, invested: 2320000, returns: 260000 },
  { month: 'Feb 24', value: 2640000, invested: 2360000, returns: 280000 },
  { month: 'Mar 24', value: 2720000, invested: 2390000, returns: 330000 },
  { month: 'Apr 24', value: 2810000, invested: 2420000, returns: 390000 },
  { month: 'May 24', value: 2890000, invested: 2445000, returns: 445000 },
  { month: 'Jun 24', value: 2940000, invested: 2465000, returns: 475000 },
  { month: 'Jul 24', value: 3037620, invested: 2485000, returns: 552620 },
]

// ── Sector Allocation ────────────────────────────────────────────────────────
export const sectorAllocation: (SectorAllocation & { allocation: number })[] = [
  { sector: 'IT', value: 340000, percent: 11.2, allocation: 11.2, color: '#0B6EFD' },
  { sector: 'Banking & NBFC', value: 290000, percent: 9.55, allocation: 9.55, color: '#00B894' },
  { sector: 'Equity MF', value: 793000, percent: 26.1, allocation: 26.1, color: '#F4B400' },
  { sector: 'Debt & Bonds', value: 484000, percent: 15.93, allocation: 15.93, color: '#6366F1' },
  { sector: 'Real Estate', value: 248000, percent: 8.17, allocation: 8.17, color: '#EC4899' },
  { sector: 'Infrastructure', value: 175000, percent: 5.76, allocation: 5.76, color: '#14B8A6' },
  { sector: 'Gold', value: 150000, percent: 4.94, allocation: 4.94, color: '#F59E0B' },
  { sector: 'Energy & Auto', value: 337000, percent: 11.1, allocation: 11.1, color: '#8B5CF6' },
  { sector: 'Consumer', value: 220620, percent: 7.26, allocation: 7.26, color: '#EF4444' },
]

export const assetTypeAllocation = [
  { name: 'Stocks', value: 941000, percent: 30.98, color: '#0B6EFD' },
  { name: 'Mutual Funds', value: 875000, percent: 28.81, color: '#00B894' },
  { name: 'ETFs', value: 205000, percent: 6.75, color: '#F4B400' },
  { name: 'REITs', value: 171000, percent: 5.63, color: '#6366F1' },
  { name: 'InvITs', value: 77000, percent: 2.54, color: '#EC4899' },
  { name: 'Corporate Bonds', value: 157000, percent: 5.17, color: '#14B8A6' },
  { name: 'G-Sec', value: 125000, percent: 4.12, color: '#8B5CF6' },
  { name: 'Gold', value: 150000, percent: 4.94, color: '#F59E0B' },
  { name: 'Cash', value: 336620, percent: 11.08, color: '#94A3B8' },
]

// ── Transactions ─────────────────────────────────────────────────────────────
export const recentTransactions: (Transaction & { asset: string })[] = [
  { id: 'tx1', date: '2024-07-12', type: 'SIP', assetName: 'SBI Bluechip Fund', asset: 'SBI Bluechip Fund', assetType: 'Mutual Fund', amount: 5000, units: 148.28, price: 33.72, status: 'Completed' },
  { id: 'tx2', date: '2024-07-11', type: 'Buy', assetName: 'HDFC Bank', asset: 'HDFC Bank', assetType: 'Stock', amount: 16500, units: 10, price: 1650, status: 'Completed' },
  { id: 'tx3', date: '2024-07-10', type: 'Dividend', assetName: 'Embassy Office Parks REIT', asset: 'Embassy Office Parks REIT', assetType: 'REIT', amount: 3200, units: 0, price: 0, status: 'Completed' },
  { id: 'tx4', date: '2024-07-09', type: 'Buy', assetName: 'Nifty BeES ETF', asset: 'Nifty BeES ETF', assetType: 'ETF', amount: 12500, units: 500, price: 25.0, status: 'Completed' },
  { id: 'tx5', date: '2024-07-08', type: 'Interest', assetName: 'HDFC NCD 8.55%', asset: 'HDFC NCD 8.55%', assetType: 'Corporate Bond', amount: 2138, units: 0, price: 0, status: 'Completed' },
  { id: 'tx6', date: '2024-07-07', type: 'SIP', assetName: 'Axis Flexi Cap Fund', asset: 'Axis Flexi Cap Fund', assetType: 'Mutual Fund', amount: 3000, units: 120.0, price: 25.0, status: 'Completed' },
  { id: 'tx7', date: '2024-07-05', type: 'Sell', assetName: 'Asian Paints', asset: 'Asian Paints', assetType: 'Stock', amount: 15200, units: 5, price: 3040, status: 'Completed' },
  { id: 'tx8', date: '2024-07-03', type: 'Buy', assetName: 'Reliance Industries', asset: 'Reliance Industries', assetType: 'Stock', amount: 30625, units: 10, price: 3062.5, status: 'Completed' },
  { id: 'tx9', date: '2024-07-01', type: 'SIP', assetName: 'HDFC Mid-Cap Fund', asset: 'HDFC Mid-Cap Fund', assetType: 'Mutual Fund', amount: 2000, units: 54.5, price: 36.7, status: 'Completed' },
  { id: 'tx10', date: '2024-06-28', type: 'Dividend', assetName: 'Powergrid InvIT', asset: 'Powergrid InvIT', assetType: 'InvIT', amount: 1475, units: 0, price: 0, status: 'Completed' },
]

// ── Goals ────────────────────────────────────────────────────────────────────
export const goals: Goal[] = [
  { id: 'g1', name: 'Retirement Fund', icon: '🏖️', targetAmount: 30000000, currentAmount: 3037620, targetDate: '2045-01-01', monthlySIP: 25000, expectedReturn: 12, progress: 10.1, color: '#0B6EFD' },
  { id: 'g2', name: 'Dream House', icon: '🏠', targetAmount: 8000000, currentAmount: 2200000, targetDate: '2029-06-01', monthlySIP: 40000, expectedReturn: 10, progress: 27.5, color: '#00B894' },
  { id: 'g3', name: 'Emergency Fund', icon: '🛡️', targetAmount: 600000, currentAmount: 480000, targetDate: '2024-12-31', monthlySIP: 20000, expectedReturn: 6, progress: 80.0, color: '#F4B400' },
  { id: 'g4', name: 'Europe Vacation', icon: '✈️', targetAmount: 350000, currentAmount: 125000, targetDate: '2025-06-01', monthlySIP: 15000, expectedReturn: 8, progress: 35.7, color: '#6366F1' },
  { id: 'g5', name: "Child's Education", icon: '🎓', targetAmount: 5000000, currentAmount: 750000, targetDate: '2035-06-01', monthlySIP: 10000, expectedReturn: 12, progress: 15.0, color: '#EC4899' },
]

// ── Alerts ────────────────────────────────────────────────────────────────────
export const alerts: Alert[] = [
  { id: 'a1', type: 'ai', severity: 'info', title: 'Portfolio Rebalancing Suggested', message: 'Your IT sector exposure is at 18.2%, exceeding the recommended 15%. Consider rebalancing by moving ₹75,000 to debt instruments.', time: '2 hours ago', read: false },
  { id: 'a2', type: 'dividend', severity: 'success', title: 'Dividend Received', message: 'Embassy Office Parks REIT credited ₹3,200 dividend to your account.', time: '5 hours ago', read: false },
  { id: 'a3', type: 'market', severity: 'warning', title: 'NIFTY 50 Down 1.2%', message: 'Markets opened lower today. Your portfolio is down ₹36,451 (1.2%) intraday.', time: '8 hours ago', read: false },
  { id: 'a4', type: 'portfolio', severity: 'danger', title: 'Asian Paints Stop Loss Near', message: 'ASIANPAINT is trading near your stop-loss of ₹3,000. Current price: ₹3,040.', time: '1 day ago', read: true },
  { id: 'a5', type: 'goal', severity: 'info', title: 'Emergency Fund - 80% Complete!', message: 'Your Emergency Fund goal is 80% complete. Just ₹1,20,000 more to reach your target!', time: '2 days ago', read: true },
  { id: 'a6', type: 'ai', severity: 'info', title: 'SIP Date Reminder', message: 'Your SIP for SBI Bluechip Fund (₹5,000) will be debited tomorrow, 13 July 2024.', time: '2 days ago', read: true },
  { id: 'a7', type: 'portfolio', severity: 'success', title: 'Bajaj Finance Up 3.5%', message: 'BAJFINANCE is up 3.5% today. Your unrealized gain on this stock is now ₹17,000.', time: '3 days ago', read: true },
  { id: 'a8', type: 'market', severity: 'info', title: 'RBI Policy - Repo Rate Unchanged', message: "RBI MPC kept repo rate unchanged at 6.5%. This positively impacts your bond holdings.", time: '5 days ago', read: true },
  { id: 'a9', type: 'dividend', severity: 'success', title: 'IRB InvIT Distribution', message: 'IRB InvIT credited ₹1,475 distribution to your registered bank account.', time: '6 days ago', read: true },
  { id: 'a10', type: 'ai', severity: 'warning', title: 'High Cash Allocation', message: 'You have ₹3.37L (11%) in cash. Consider investing in a liquid fund for better returns.', time: '1 week ago', read: true },
]

// ── Learning Modules ──────────────────────────────────────────────────────────
export const learningModules: LearningModule[] = [
  { id: 'l1', title: 'What is a Demat Account?', description: 'Learn how demat accounts work, how to open one, and how securities are held digitally.', category: 'Beginner', topic: 'Basics', duration: '8 min', difficulty: 1, progress: 100, completed: true, badge: '🏆' },
  { id: 'l2', title: 'Understanding NIFTY & SENSEX', description: 'Demystify market indices and understand what drives Indian stock market benchmarks.', category: 'Beginner', topic: 'Markets', duration: '10 min', difficulty: 1, progress: 100, completed: true, badge: '⭐' },
  { id: 'l3', title: 'SIP vs Lump Sum Investing', description: 'Compare systematic investment plans with lump sum investments and choose the right strategy for your goals.', category: 'Beginner', topic: 'Mutual Funds', duration: '12 min', difficulty: 2, progress: 75, completed: false },
  { id: 'l4', title: 'How Mutual Funds Work', description: 'Understand NAV, expense ratio, fund categories, and how to pick the right mutual fund.', category: 'Beginner', topic: 'Mutual Funds', duration: '15 min', difficulty: 2, progress: 50, completed: false },
  { id: 'l5', title: 'Introduction to REITs', description: 'Real Estate Investment Trusts explained — how they work, income sources, taxation, and how to invest.', category: 'Intermediate', topic: 'REITs', duration: '18 min', difficulty: 3, progress: 30, completed: false },
  { id: 'l6', title: 'Understanding InvITs', description: 'Infrastructure Investment Trusts — investing in toll roads, power transmission, and infrastructure assets.', category: 'Intermediate', topic: 'InvITs', duration: '16 min', difficulty: 3, progress: 0, completed: false },
  { id: 'l7', title: 'Corporate Bonds vs G-Secs', description: 'Compare corporate bonds and government securities on risk, returns, liquidity, and tax treatment.', category: 'Intermediate', topic: 'Bonds', duration: '20 min', difficulty: 3, progress: 0, completed: false },
  { id: 'l8', title: 'Portfolio Diversification Strategies', description: 'Advanced techniques to diversify across asset classes, geographies, and time horizons.', category: 'Intermediate', topic: 'Strategy', duration: '22 min', difficulty: 4, progress: 0, completed: false },
  { id: 'l9', title: 'Options & Derivatives Basics', description: 'Introduction to F&O, understanding calls, puts, Greeks, and risk management with derivatives.', category: 'Advanced', topic: 'Derivatives', duration: '35 min', difficulty: 5, progress: 0, completed: false },
  { id: 'l10', title: 'Tax Optimization for Investors', description: 'LTCG, STCG, dividend taxation, HUF strategies, and tax-loss harvesting for Indian investors.', category: 'Advanced', topic: 'Taxation', duration: '28 min', difficulty: 5, progress: 0, completed: false },
  { id: 'l11', title: 'International Investing for Indians', description: 'Liberalized Remittance Scheme (LRS), US stocks, global ETFs, currency risk management.', category: 'Advanced', topic: 'Global', duration: '30 min', difficulty: 5, progress: 0, completed: false },
]

// ── Explorer Assets ───────────────────────────────────────────────────────────
export const explorerAssets = [
  { id: 'ex1', name: 'NIFTY 50 Index Fund', type: 'ETF', description: 'Tracks the top 50 companies on NSE by market cap. Ideal for passive, long-term wealth creation.', risk: 'Moderate', return1Y: 18.4, return3Y: 15.2, return5Y: 14.8, liquidity: 'High', tax: 'LTCG 10% (>1yr)', suitableFor: 'Long-term investors', minInvestment: 500 },
  { id: 'ex2', name: 'Embassy Office Parks REIT', type: 'REIT', description: 'India\'s largest REIT owning premium office parks across Bengaluru, Mumbai, Pune, and NCR.', risk: 'Moderate', return1Y: 14.7, return3Y: 12.1, return5Y: 11.5, liquidity: 'Medium', tax: 'Dividend: 30% / Capital Gains', suitableFor: 'Income + growth investors', minInvestment: 15000 },
  { id: 'ex3', name: 'IRB InvIT Fund', type: 'InvIT', description: 'Invests in operational toll road assets across India. Regular distribution income from toll revenues.', risk: 'Moderate', return1Y: 12.5, return3Y: 10.8, return5Y: 0, liquidity: 'Medium', tax: 'Distribution: varies', suitableFor: 'Income-seeking investors', minInvestment: 10000 },
  { id: 'ex4', name: 'HDFC Short Duration Debt Fund', type: 'Mutual Fund', description: 'Invests in debt instruments with maturity 1-3 years. Good alternative to FDs with better post-tax returns.', risk: 'Low', return1Y: 7.8, return3Y: 6.9, return5Y: 7.2, liquidity: 'High', tax: 'LTCG 20% with indexation (>3yr)', suitableFor: 'Conservative investors', minInvestment: 1000 },
  { id: 'ex5', name: 'GOI 7.26% 2029 G-Sec', type: 'G-Sec', description: 'Sovereign-backed government bond with guaranteed 7.26% annual coupon. Zero credit risk.', risk: 'Low', return1Y: 7.26, return3Y: 7.26, return5Y: 7.26, liquidity: 'Medium', tax: 'Interest taxable; Capital gains apply', suitableFor: 'Safety-first investors', minInvestment: 10000 },
  { id: 'ex6', name: 'Sovereign Gold Bond 2024', type: 'Gold', description: 'RBI-issued bonds linked to gold price with 2.5% additional annual interest. Tax-free on maturity.', risk: 'Low', return1Y: 18.2, return3Y: 14.5, return5Y: 12.8, liquidity: 'Low', tax: 'Capital gains tax-free on maturity', suitableFor: 'Inflation hedge investors', minInvestment: 5000 },
  { id: 'ex7', name: 'Bajaj Finance NCD 8.75%', type: 'Corporate Bond', description: 'AAA-rated NCD from Bajaj Finance. Fixed coupon of 8.75% p.a. with quarterly interest payout.', risk: 'Low', return1Y: 8.75, return3Y: 8.75, return5Y: 0, liquidity: 'Low', tax: 'Interest taxable as income', suitableFor: 'Fixed income investors', minInvestment: 10000 },
  { id: 'ex8', name: 'Mirae Asset Emerging Bluechip', type: 'Mutual Fund', description: 'Large & mid cap fund investing in emerging bluechip companies. Strong long-term track record.', risk: 'High', return1Y: 22.1, return3Y: 18.4, return5Y: 17.9, liquidity: 'High', tax: 'LTCG 10% (>1yr)', suitableFor: 'Aggressive long-term investors', minInvestment: 1000 },
]

// ── Admin Stats ───────────────────────────────────────────────────────────────
export const adminStats = {
  totalUsers: 124532,
  activeToday: 8432,
  totalAUM: 245000000000,
  revenue: 1240000,
  newUsersThisMonth: 3842,
  totalTransactions: 892341,
}

export const userGrowthData = [
  { month: 'Feb', users: 89000 },
  { month: 'Mar', users: 95200 },
  { month: 'Apr', users: 103400 },
  { month: 'May', users: 110800 },
  { month: 'Jun', users: 118200 },
  { month: 'Jul', users: 124532 },
]

export const recentSignups = [
  { name: 'Priya Sharma', email: 'priya.s@gmail.com', date: '12 Jul 2024', plan: 'Pro', kyc: 'Verified' },
  { name: 'Rahul Mehta', email: 'rahul.m@gmail.com', date: '12 Jul 2024', plan: 'Free', kyc: 'Pending' },
  { name: 'Anjali Singh', email: 'anjali.s@gmail.com', date: '11 Jul 2024', plan: 'Premium', kyc: 'Verified' },
  { name: 'Vikram Patel', email: 'vikram.p@gmail.com', date: '11 Jul 2024', plan: 'Pro', kyc: 'Verified' },
  { name: 'Kavitha Nair', email: 'kavitha.n@gmail.com', date: '10 Jul 2024', plan: 'Free', kyc: 'Rejected' },
]

// ── AI Chat ───────────────────────────────────────────────────────────────────
export const chatMessages = [
  { id: 1, role: 'assistant', content: "Hello! I'm your InvestOne AI assistant. I can help you understand investment instruments, review your portfolio, explain market concepts, and answer questions about REITs, InvITs, bonds, and more. What would you like to know today?", time: '09:00 AM' },
]

export const suggestedQuestions = [
  'Explain REIT',
  'What are InvITs?',
  'Review my portfolio',
  'How to save tax?',
  'Best SIPs for 2024',
  'What is bond yield?',
]

// ── Compatibility aliases (used by pre-existing dashboard page) ──────────────
export const assetAllocation = assetTypeAllocation.map(a => ({ name: a.name, value: a.percent, color: a.color }))
export const monthlyGrowth = monthlyGrowthData.map(m => ({ month: m.month, value: m.value, invested: m.invested }))
export const portfolioStatsCompat = {
  ...portfolioStats,
  todaysGain: portfolioStats.todayGain,
  todaysGainPct: portfolioStats.todayGainPercent,
  overallReturn: portfolioStats.totalReturnsPercent,
  riskLevel: portfolioStats.riskLevel,
  diversificationScore: portfolioStats.diversificationScore,
}

// ── AI Responses ──────────────────────────────────────────────────────────────
export const aiResponses: Record<string, string> = {
  'Explain REIT': `A **Real Estate Investment Trust (REIT)** is a company that owns income-generating real estate assets like office parks, malls, or warehouses. In India, REITs are regulated by SEBI.\n\n**How REITs work:**\n• They pool money from investors to buy commercial real estate\n• 90% of their distributable income must be paid to investors as distributions\n• Units are listed on stock exchanges (NSE/BSE), so they\'re liquid\n\n**Top Indian REITs:**\n• Embassy Office Parks REIT — ₹32,000 Cr assets\n• Mindspace Business Parks REIT\n• Brookfield India Real Estate Trust\n\n**Why invest in REITs?**\n✅ Regular income (6-8% yield)\n✅ Real estate exposure without buying property\n✅ Professional management\n✅ High liquidity vs physical real estate\n\nYour current REIT allocation is ₹1.71L (5.6% of portfolio) — well within the recommended 5-10% range.`,
  'What are InvITs?': `**Infrastructure Investment Trusts (InvITs)** are SEBI-regulated investment vehicles that own and operate infrastructure assets like highways, power transmission lines, pipelines, and telecom towers.\n\n**Structure:**\nInvITs pool investor money → Buy operational infrastructure assets → Earn toll/usage revenue → Distribute 90%+ to unit holders\n\n**Top Indian InvITs:**\n• IRB InvIT — toll road assets across India\n• Powergrid Infrastructure InvIT — power transmission lines\n• India Grid Trust — electricity transmission\n• Highways Infrastructure Trust\n\n**Key Benefits:**\n✅ Stable, inflation-linked cash flows\n✅ High distribution yields (8-10%)\n✅ Infrastructure assets have long concession periods\n✅ Listed on exchanges for liquidity\n\n**Risk Factors:**\n⚠️ Regulatory/concession risk\n⚠️ Interest rate sensitivity\n⚠️ Lower trading volumes vs stocks\n\nYou currently hold ₹77,000 in InvITs (2.5% of portfolio).`,
  'Review my portfolio': `📊 **Portfolio Review — Koushhik N**\n\n**Total Value:** ₹30,37,620 | **Invested:** ₹24,85,000 | **Returns:** +₹5,52,620 (+22.2%)\n\n**Strengths:**\n✅ Good diversification across 8 asset classes\n✅ Consistent SIP investments in equity MFs\n✅ REIT & InvIT exposure provides income\n✅ Sovereign bonds add stability\n\n**Areas of Improvement:**\n\n1. 🔴 **IT Sector Concentration** — 18.2% in IT (TCS + Infosys). Recommend reducing to 12-15%.\n\n2. 🟡 **Cash Idle** — ₹3.37L (11%) in savings. Move ₹2L to liquid/overnight fund for 6-7% yield.\n\n3. 🟢 **Debt Allocation** — At 22%, debt is well-positioned for the current rate environment.\n\n4. 🔵 **Gold** — 4.9% allocation is ideal as inflation hedge.\n\n**Recommended Actions:**\n• Reduce TCS or INFY position by ₹50,000\n• Increase HDFC Short Duration Fund by ₹1,00,000\n• Add one more REIT to diversify real estate exposure`,
  'How to save tax?': `💰 **Tax Optimization Guide for Indian Investors**\n\n**1. Equity LTCG Exemption (Section 112A)**\n• Up to ₹1 lakh LTCG from equity/equity MFs is tax-free annually\n• Harvest gains strategically each year before exceeding ₹1L\n• Your current unrealized LTCG: ~₹3.2L — consider booking ₹1L now\n\n**2. ELSS Funds (Section 80C)**\n• Invest up to ₹1.5L in ELSS mutual funds\n• 3-year lock-in, but market-linked returns (12-15% historically)\n• Better than PPF/NSC for aggressive investors\n\n**3. NPS (Section 80CCD)**\n• Additional ₹50,000 deduction under 80CCD(1B)\n• Employer NPS contribution exempt under 80CCD(2)\n\n**4. HRA + Home Loan**\n• If you have a home loan, interest up to ₹2L deductible (Section 24)\n\n**5. Debt Fund Indexation (post April 2023)**\n• New debt fund rules: STCG/LTCG at slab rate\n• G-Secs held 3+ years get indexation benefit\n\n**Your estimated annual tax savings potential: ₹52,500** based on current portfolio.`,
  'Best SIPs for 2024': `🚀 **Top SIP Recommendations for 2024**\n\nBased on your risk profile (Moderate) and current portfolio:\n\n**Large Cap (Stability)**\n1. **Mirae Asset Large Cap Fund** — 5-star rated, consistent outperformer\n   → Suggest: ₹5,000/month\n\n2. **SBI Bluechip Fund** *(you already hold this — great choice!)*\n\n**Flexi/Multi Cap (Growth)**\n3. **Parag Parikh Flexi Cap Fund** — International diversification, value-oriented\n   → Suggest: ₹3,000/month\n\n4. **Kotak Flexi Cap Fund** — Strong mid-large mix\n   → Suggest: ₹2,000/month\n\n**Mid Cap (High Growth)**\n5. **Motilal Oswal Midcap Fund** — Top performer, 35%+ last 1 year\n   → Suggest: ₹2,000/month (moderate risk)\n\n**Debt (Stability)**\n6. **HDFC Short Duration Fund** — For emergency fund accumulation\n   → Suggest: ₹5,000/month\n\n**Total suggested monthly SIP: ₹17,000** (in addition to your existing SIPs)`,
  'What is bond yield?': `📈 **Understanding Bond Yield**\n\nBond yield is the return you earn on a bond investment. It's one of the most important concepts in fixed income investing.\n\n**Simple Yield Formula:**\nYield = Annual Coupon ÷ Bond Price × 100\n\n**Example:**\n• You buy a G-Sec with face value ₹1,000, coupon 7.26%\n• If bond price rises to ₹1,050: Yield = 72.6 ÷ 1050 = 6.91%\n• If bond price falls to ₹950: Yield = 72.6 ÷ 950 = 7.64%\n\n**Key Principle: Price and Yield move inversely**\n⬆️ Bond price rises → Yield falls\n⬇️ Bond price falls → Yield rises\n\n**Types of Yield:**\n• **Current Yield** — Annual coupon / Current price\n• **YTM (Yield to Maturity)** — Total return if held to maturity\n• **XIRR** — Used for SIP-style bond investments\n\n**Why it matters:**\nYour GOI 7.26% 2029 G-Sec has a YTM of ~7.1% at current prices. If RBI cuts rates, bond prices will rise and your portfolio will gain.`,
}

// ── Health Score ──────────────────────────────────────────────────────────────
export const healthScoreFactors = [
  { name: "Diversification", score: 85, description: "Spread across 7 asset classes", icon: "🎯" },
  { name: "Liquidity", score: 72, description: "72% in highly liquid assets", icon: "💧" },
  { name: "Risk Balance", score: 78, description: "Well-balanced risk across holdings", icon: "⚖️" },
  { name: "Sector Concentration", score: 65, description: "Financial sector slightly overweight", icon: "🏢" },
  { name: "Volatility", score: 80, description: "Portfolio beta of 0.82", icon: "📊" },
]
export const historicalHealthScores = [
  { month: "Jan '25", score: 68 }, { month: "Feb '25", score: 71 },
  { month: "Mar '25", score: 73 }, { month: "Apr '25", score: 72 },
  { month: "May '25", score: 75 }, { month: "Jun '25", score: 77 },
  { month: "Jul '25", score: 78 },
]
export const aiSuggestions = [
  "Consider reducing Financial sector exposure from 28% to under 20% for better diversification.",
  "Your emergency fund goal is 80% complete — great progress! Consider boosting SIP by ₹5,000/month.",
  "Bajaj Finance (31.5% returns) has outperformed — consider booking partial profits to rebalance.",
  "Adding Sovereign Gold Bonds (SGBs) in current allocation could improve portfolio stability.",
  "Your bond allocation at 7% is below the recommended 15% for a Moderate risk profile.",
]
