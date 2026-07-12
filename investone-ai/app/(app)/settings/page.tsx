"use client"
import { useState } from "react"
import { Bell, Moon, Globe, Shield, Trash2, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [twoFA, setTwoFA] = useState(false)
  const [notifs, setNotifs] = useState({ email: true, push: true, sms: false, weekly: true })
  const [privacy, setPrivacy] = useState({ analytics: true, personalization: true })

  const toggle = (key: keyof typeof notifs) => setNotifs(p => ({ ...p, [key]: !p[key] }))

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account preferences and security</p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Moon className="w-4 h-4" />Appearance</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p><p className="text-xs text-gray-400">Switch to dark theme</p></div>
            <Switch checked={darkMode} onCheckedChange={(v) => { setDarkMode(v); document.documentElement.classList.toggle('dark', v) }} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-900 dark:text-white">Language</p><p className="text-xs text-gray-400">Select your preferred language</p></div>
            <Select defaultValue="en"><SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="hi">हिंदी</SelectItem><SelectItem value="ta">தமிழ்</SelectItem></SelectContent></Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Bell className="w-4 h-4" />Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {([
            { key: 'email', label: 'Email Notifications', desc: 'Alerts and reports via email' },
            { key: 'push', label: 'Push Notifications', desc: 'Real-time alerts on your device' },
            { key: 'sms', label: 'SMS Alerts', desc: 'Critical alerts via SMS' },
            { key: 'weekly', label: 'Weekly Portfolio Digest', desc: 'Sunday portfolio summary email' },
          ] as const).map(n => (
            <div key={n.key} className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-gray-900 dark:text-white">{n.label}</p><p className="text-xs text-gray-400">{n.desc}</p></div>
              <Switch checked={notifs[n.key]} onCheckedChange={() => toggle(n.key)} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Shield className="w-4 h-4" />Security</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p><p className="text-xs text-gray-400">Add extra security with TOTP or SMS OTP</p></div>
            <Switch checked={twoFA} onCheckedChange={setTwoFA} />
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Change Password</p>
            <div className="space-y-3">
              <Input type="password" placeholder="Current password" className="h-9" />
              <Input type="password" placeholder="New password" className="h-9" />
              <Input type="password" placeholder="Confirm new password" className="h-9" />
              <Button size="sm" className="w-full"><Lock className="w-3.5 h-3.5" />Update Password</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Globe className="w-4 h-4" />Privacy</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-900 dark:text-white">Usage Analytics</p><p className="text-xs text-gray-400">Help us improve by sharing anonymized usage data</p></div>
            <Switch checked={privacy.analytics} onCheckedChange={v => setPrivacy(p => ({ ...p, analytics: v }))} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-900 dark:text-white">AI Personalization</p><p className="text-xs text-gray-400">Allow AI to use your portfolio data for recommendations</p></div>
            <Switch checked={privacy.personalization} onCheckedChange={v => setPrivacy(p => ({ ...p, personalization: v }))} />
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-red-100 dark:border-red-900/30">
        <CardHeader><CardTitle className="text-base text-red-600 flex items-center gap-2"><Trash2 className="w-4 h-4" />Danger Zone</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-900 dark:text-white">Clear All Data</p><p className="text-xs text-gray-400">Remove all your investment data from InvestOne</p></div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Clear Data</Button>
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-gray-900 dark:text-white">Delete Account</p><p className="text-xs text-gray-400">Permanently delete your account and all data</p></div>
            <Button variant="danger" size="sm">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
