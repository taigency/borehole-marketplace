import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'ZAR') {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
