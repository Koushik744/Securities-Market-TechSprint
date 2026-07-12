"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Play, CheckCircle, Lock, Star, Trophy, Zap, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { learningModules } from "@/lib/mock-data"

const badges = [
  { icon: '🏆', name: 'First Steps', desc: 'Complete your first module', earned: true },
  { icon: '⭐', name: 'Market Explorer', desc: 'Learn about stock market indices', earned: true },
  { icon: '📈', name: 'SIP Master', desc: 'Complete SIP vs Lump Sum module', earned: false },
  { icon: '🏠', name: 'REIT Expert', desc: 'Master the REIT module', earned: false },
  { icon: '⚡', name: 'Bond Scholar', desc: 'Understand bonds & G-Secs', earned: false },
  { icon: '💰', name: 'Tax Wizard', desc: 'Complete the tax module', earned: false },
]

function ModuleCard({ mod, index }: { mod: typeof learningModules[0]; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }} whileHover={{ y: -3 }}>
      <Card className="hover:shadow-lg transition-all duration-200">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${mod.completed ? 'bg-emerald-100' : 'bg-blue-50'}`}>
              {mod.completed
                ? <CheckCircle className="w-6 h-6 text-emerald-600" />
                : <BookOpen className="w-6 h-6 text-[#0B6EFD]" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{mod.title}</h3>
                {mod.badge && <span className="text-base shrink-0">{mod.badge}</span>}
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{mod.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="neutral" className="text-[10px]">{mod.topic}</Badge>
                <span className="text-xs text-gray-400">{mod.duration}</span>
                <div className="flex ml-auto">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < mod.difficulty ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
              </div>
              {mod.progress > 0 && (
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{mod.progress}%</span>
                  </div>
                  <Progress value={mod.progress} color={mod.completed ? '#00B894' : '#0B6EFD'} className="h-1.5" />
                </div>
              )}
              <Button size="sm" className="mt-3 h-7 text-xs" variant={mod.completed ? 'outline' : 'default'}>
                <Play className="w-3 h-3" />
                {mod.completed ? 'Review' : mod.progress > 0 ? 'Continue' : 'Start'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function LearningPage() {
  const completedCount = learningModules.filter(m => m.completed).length
  const totalCount = learningModules.length
  const earnedBadges = badges.filter(b => b.earned).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Hub</h1>
          <p className="text-sm text-gray-500 mt-1">Master every investment instrument at your own pace</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Completed', value: `${completedCount}/${totalCount}`, icon: CheckCircle, color: '#00B894', bg: '#ECFDF5' },
          { label: 'Badges Earned', value: `${earnedBadges}/${badges.length}`, icon: Trophy, color: '#F4B400', bg: '#FFFBEB' },
          { label: 'Learning Streak', value: '5 days', icon: Zap, color: '#0B6EFD', bg: '#EFF6FF' },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: s.bg }}>
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <p className="font-bold text-lg text-gray-900 dark:text-white">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="Beginner">
        <TabsList>
          {['Beginner', 'Intermediate', 'Advanced'].map(cat => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
              <span className="ml-1 text-[10px] text-gray-400">({learningModules.filter(m => m.category === cat).length})</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {['Beginner', 'Intermediate', 'Advanced'].map(cat => (
          <TabsContent key={cat} value={cat}>
            <div className="space-y-4">
              {learningModules.filter(m => m.category === cat).map((mod, i) => (
                <ModuleCard key={mod.id} mod={mod} index={i} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Badges */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Achievements</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {badges.map((b, i) => (
            <motion.div key={i} whileHover={b.earned ? { scale: 1.05 } : {}}
              className={`rounded-2xl p-4 text-center border-2 transition-all ${b.earned ? 'bg-white dark:bg-gray-800 border-amber-200 shadow-md shadow-amber-100' : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 opacity-50'}`}
            >
              <div className="text-3xl mb-2">{b.earned ? b.icon : '🔒'}</div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{b.name}</p>
              <p className="text-[10px] text-gray-400 mt-1">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
