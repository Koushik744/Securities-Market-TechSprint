import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatCurrencyFull(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function getRiskColor(risk: string): string {
  switch (risk.toLowerCase()) {
    case 'low': return 'text-green-600 bg-green-50'
    case 'moderate': return 'text-yellow-600 bg-yellow-50'
    case 'high': return 'text-red-600 bg-red-50'
    case 'very high': return 'text-red-700 bg-red-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

export function getReturnColor(value: number): string {
  return value >= 0 ? 'text-emerald-600' : 'text-red-500'
}
