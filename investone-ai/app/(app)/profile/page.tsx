"use client"
import { useState } from "react"
import { Edit2, CheckCircle, Link, User, Building } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const brokers = [
  { name: 'Zerodha', logo: '🟢', connected: true, accounts: 1, lastSync: '12 Jul 2024' },
  { name: 'HDFC Securities', logo: '🔵', connected: true, accounts: 1, lastSync: '12 Jul 2024' },
  { name: 'Groww', logo: '🟣', connected: false, accounts: 0, lastSync: '' },
  { name: 'Angel One', logo: '🟠', connected: false, accounts: 0, lastSync: '' },
]

const dematAccounts = [
  { dp: 'NSDL', dpId: 'IN300126', clientId: '18745623', broker: 'Zerodha', status: 'Active' },
  { dp: 'CDSL', dpId: '12056000', clientId: '45892130', broker: 'HDFC Securities', status: 'Active' },
]

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: 'Koushik N', email: 'koushik.n@gmail.com', mobile: '+91 98765 43210',
    pan: 'ABCPK1234D', dob: '1995-03-22', city: 'Bengaluru', state: 'Karnataka'
  })

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your personal information and linked accounts</p>
      </div>

      {/* Profile card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-5">
            <div className="relative">
              <Avatar className="w-20 h-20 text-2xl">
                <AvatarFallback className="text-xl">NK</AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#0B6EFD] rounded-full flex items-center justify-center shadow-md">
                <Edit2 className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{form.name}</h2>
                  <p className="text-sm text-gray-500">{form.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="success" className="text-xs"><CheckCircle className="w-3 h-3 mr-1" />KYC Verified</Badge>
                    <Badge variant="default" className="text-xs">Pro Plan</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
                  <Edit2 className="w-3.5 h-3.5" />
                  {editing ? 'Save' : 'Edit Profile'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><User className="w-4 h-4" />Personal Information</CardTitle></CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Full Name', key: 'name' }, { label: 'Email Address', key: 'email' },
              { label: 'Mobile Number', key: 'mobile' }, { label: 'PAN Number', key: 'pan' },
              { label: 'Date of Birth', key: 'dob' }, { label: 'City', key: 'city' },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">{f.label}</label>
                {editing ? (
                  <Input value={form[f.key as keyof typeof form]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} className="h-9" />
                ) : (
                  <p className="text-sm font-medium text-gray-900 dark:text-white py-1.5">{form[f.key as keyof typeof form]}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Linked Brokers */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Link className="w-4 h-4" />Linked Brokers & Accounts</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brokers.map((b, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{b.logo}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{b.name}</p>
                    <p className="text-xs text-gray-400">{b.connected ? `${b.accounts} account linked · Last sync: ${b.lastSync}` : 'Not connected'}</p>
                  </div>
                </div>
                <Button variant={b.connected ? 'outline' : 'default'} size="sm" className="h-8 text-xs">
                  {b.connected ? 'Manage' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demat Accounts */}
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Building className="w-4 h-4" />Demat Accounts</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dematAccounts.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={d.dp === 'NSDL' ? 'primary' : 'secondary'}>{d.dp}</Badge>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{d.broker}</span>
                  </div>
                  <p className="text-xs text-gray-400">DP ID: {d.dpId} · Client ID: {d.clientId}</p>
                </div>
                <Badge variant="success">{d.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
