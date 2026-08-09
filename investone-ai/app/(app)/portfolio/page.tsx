"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { portfolioHoldings, portfolioStats } from "@/lib/mock-data"
import { formatCurrency, formatPercent } from "@/lib/utils"

const assetTabs: Array<{ label: string; value: string }> = [
  { label: 'All', value: 'all' },
  { label: 'Stocks', value: 'Stock' },
  { label: 'Mutual Funds', value: 'Mutual Fund' },
  { label: 'ETFs', value: 'ETF' },
  { label: 'REITs', value: 'REIT' },
  { label: 'InvITs', value: 'InvIT' },
  { label: 'Bonds', value: 'Corporate Bond' },
  { label: 'G-Sec', value: 'G-Sec' },
  { label: 'Gold', value: 'Gold' },
]

const riskColors: Record<string, string> = {
  Low: 'success',
  Moderate: 'warning',
  High: 'danger',
  'Very High': 'danger',
}

function AssetCard({ asset, index }: { asset: typeof portfolioHoldings[0]; index: number }) {
  const isPositive = asset.returns >= 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -3 }}
    >
      <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{asset.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-mono">{asset.ticker}</span>
                <Badge variant={riskColors[asset.risk] as 'success' | 'warning' | 'danger'} className="text-[10px]">
                  {asset.risk}
                </Badge>
              </div>
            </div>
            <div className="text-right shrink-0 ml-2">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(asset.currentValue)}</p>
              <div className={`flex items-center justify-end gap-0.5 text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {formatPercent(asset.returnsPercent)}
              </div>
            </div>
          </div>

          {/* Mini sparkline bar */}
          <div className="h-1 bg-gray-100 dark:bg-gray-700 rounded-full mb-3">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(asset.allocation * 2, 100)}%`,
                background: isPositive ? '#00B894' : '#EF4444'
              }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-gray-400">Invested</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300">{formatCurrency(asset.purchaseValue)}</p>
            </div>
            <div>
              <p className="text-gray-400">P&L</p>
              <p className={`font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                {isPositive ? '+' : ''}{formatCurrency(asset.returns)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Weight</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300">{asset.allocation.toFixed(1)}%</p>
            </div>
          </div>

          {asset.dividendYield && (
            <div className="mt-2 pt-2 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
              <span className="text-xs text-gray-400">Yield</span>
              <span className="text-xs font-semibold text-[#0B6EFD]">{asset.dividendYield}% p.a.</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function PortfolioPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filtered = portfolioHoldings.filter(a => {
    const matchType = activeTab === 'all' || a.type === activeTab
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.ticker.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  const totalValue = portfolioHoldings.reduce((s, a) => s + a.currentValue, 0)
  const totalInvested = portfolioHoldings.reduce((s, a) => s + a.purchaseValue, 0)
  const totalReturns = totalValue - totalInvested
  const totalReturnsPercent = (totalReturns / totalInvested) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
          <p className="text-sm text-gray-500 mt-0.5">{portfolioHoldings.length} holdings across 8 asset classes</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Current Value', value: formatCurrency(totalValue), sub: '', color: '#0B6EFD' },
          { label: 'Total Invested', value: formatCurrency(totalInvested), sub: 'Cost basis', color: '#6366F1' },
          { label: 'Total P&L', value: `+${formatCurrency(totalReturns)}`, sub: `+${totalReturnsPercent.toFixed(1)}%`, color: '#00B894' },
          { label: 'Diversification', value: `${portfolioStats.diversificationScore}/100`, sub: '8 asset classes', color: '#F4B400' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm"
          >
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
            {s.sub && <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>}
          </motion.div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search holdings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <Filter className="w-4 h-4" />
          Sort
        </button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto pb-1">
          <TabsList className="w-max">
            {assetTabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
                {tab.label}
                <span className="ml-1 text-[10px] text-gray-400">
                  ({tab.value === 'all' ? portfolioHoldings.length : portfolioHoldings.filter(a => a.type === tab.value).length})
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {assetTabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-lg">No holdings found</p>
                <p className="text-sm mt-1">Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((asset, i) => (
                  <AssetCard key={asset.id} asset={asset} index={i} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
