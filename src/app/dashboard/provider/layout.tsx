'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wrench, Users, FileText, DollarSign, User, LayoutDashboard, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const NAV_ITEMS = [
  { href: '/dashboard/provider', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/provider/services', label: 'My Services', icon: Wrench },
  { href: '/dashboard/provider/leads', label: 'Leads', icon: Users },
  { href: '/dashboard/provider/quotes', label: 'Quotes', icon: FileText },
]

export default function ProviderDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Mobile sidebar toggle */}
        <button
          className="lg:hidden fixed bottom-4 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          </div>
        )}
        <aside className={cn(
          'fixed lg:sticky lg:top-24 inset-y-0 left-0 z-50 lg:z-auto w-64 bg-white border border-gray-200 rounded-xl p-4 shrink-0 h-fit transition-transform lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}>
          <div className="p-4 mb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">AquaDrill Solutions</p>
                <p className="text-xs text-gray-500">Service Provider</p>
              </div>
            </div>
          </div>
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}