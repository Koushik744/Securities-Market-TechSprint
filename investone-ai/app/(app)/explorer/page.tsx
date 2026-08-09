"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { explorerAssets } from "@/lib/mock-data"

const categories = ['All', 'ETF', 'REIT', 'InvIT', 'Mutual Fund', 'G-Sec', 'Corporate Bond', 'Gold']
const riskColor: Record<string, 'success' | 'warning' | 'danger'> = { Low: 'success', Moderate: 'warning', High: 'danger' }
const typeColor: Record<string, string> = { ETF: '#0B6EFD', REIT: '#6366F1', InvIT: '#EC4899', 'Mutual Fund': '#00B894', 'G-Sec': '#8B5CF6', 'Corporate Bond': '#14B8A6', Gold: '#F4B400' }
type Asset = typeof explorerAssets[0]

export default function ExplorerPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState<Asset | null>(null)
  const filtered = explorerAssets.filter(a => {
    const matchCat = category === 'All' || a.type === category
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Explorer</h1>
        <p className="text-sm text-gray-500 mt-1">Discover and compare investment products across all asset classes</p>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Search assets..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${category === cat ? 'bg-[#0B6EFD] text-white shadow-md shadow-blue-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="flex gap-5">
        <div className="flex-1">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((asset, i) => (
              <motion.div key={asset.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ y: -4 }}>
                <Card className="cursor-pointer hover:shadow-xl transition-all duration-200 border-2"
                  style={{ borderColor: selected?.id === asset.id ? (typeColor[asset.type] || '#0B6EFD') : 'transparent' }}
                  onClick={() => setSelected(selected?.id === asset.id ? null : asset)}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold text-white mb-2" style={{ background: typeColor[asset.type] || '#0B6EFD' }}>
                          {asset.type}
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{asset.name}</h3>
                      </div>
                      <Badge variant={riskColor[asset.risk]}>{asset.risk}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 leading-relaxed line-clamp-2">{asset.description}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                      {[{ label: '1Y', val: `+${asset.return1Y}%`, color: '#00B894' }, { label: '3Y', val: `+${asset.return3Y}%`, color: '#0B6EFD' }, { label: 'Min.', val: `₹${asset.minInvestment/1000}K`, color: '#64748B' }].map((m, j) => (
                        <div key={j} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 text-center">
                          <p className="text-gray-400 text-[10px] mb-0.5">{m.label}</p>
                          <p className="font-bold" style={{ color: m.color }}>{m.val}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 truncate">{asset.suitableFor}</span>
                      <Button size="sm" className="h-7 text-xs px-3 shrink-0">Explore</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0, x: 50, width: 0 }} animate={{ opacity: 1, x: 0, width: 320 }} exit={{ opacity: 0, x: 50, width: 0 }} className="shrink-0 overflow-hidden">
              <Card className="h-full sticky top-20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold text-white" style={{ background: typeColor[selected.type] || '#0B6EFD' }}>{selected.type}</div>
                    <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                  </div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">{selected.name}</h2>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{selected.description}</p>
                  <div className="space-y-3 mb-4 text-xs">
                    <div className="flex justify-between"><span className="text-gray-400">1Y / 3Y Returns</span><span className="font-bold text-emerald-600">+{selected.return1Y}% / +{selected.return3Y}%</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Liquidity</span><span className="font-medium">{selected.liquidity}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Risk</span><Badge variant={riskColor[selected.risk]}>{selected.risk}</Badge></div>
                    <div className="flex justify-between"><span className="text-gray-400">Min. Investment</span><span className="font-medium">₹{selected.minInvestment.toLocaleString('en-IN')}</span></div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 mb-4">
                    <p className="text-xs text-blue-600 font-semibold mb-1">Tax Treatment</p>
                    <p className="text-xs text-gray-700 dark:text-gray-300">{selected.tax}</p>
                  </div>
                  <Button className="w-full"><ExternalLink className="w-4 h-4" /> Invest Now</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
