'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, ShoppingCart, FileText, CreditCard,
  User, Menu, X, LogOut, Bell, ChevronRight, Droplets,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard/client', icon: LayoutDashboard },
  { label: 'My Orders', href: '/dashboard/client/orders', icon: ShoppingCart },
  { label: 'My Quotes', href: '/dashboard/client/quotes', icon: FileText },
  { label: 'Cart', href: '/dashboard/client/cart', icon: CreditCard },
  { label: 'Profile', href: '/dashboard/client/profile', icon: User },
]

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/dashboard/client') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-gray-200/80 transform transition-all duration-300 ease-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-[72px] px-6 border-b border-gray-100">
            <Link href="/dashboard/client" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-[15px] font-bold text-gray-900 tracking-tight">BoreHub</span>
                <span className="block text-[10px] font-medium text-gray-400 -mt-0.5">Client Portal</span>
              </div>
            </Link>
            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'group flex items-center gap-3 px-3 py-2.5 text-[13px] font-medium rounded-lg transition-all duration-150',
                    active
                      ? 'bg-[#0c4a6e]/5 text-[#0c4a6e]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <div className={cn(
                    'p-1.5 rounded-md transition-colors',
                    active ? 'bg-[#0c4a6e]/10' : 'bg-gray-100/80 group-hover:bg-gray-200/60'
                  )}>
                    <item.icon className={cn('h-4 w-4', active ? 'text-[#0c4a6e]' : 'text-gray-500')} />
                  </div>
                  {item.label}
                  {active && <ChevronRight className="h-3.5 w-3.5 ml-auto text-[#0c4a6e]/50" />}
                </Link>
              )
            })}
          </nav>

          <div className="px-3 py-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-900 truncate">John Doe</p>
                <p className="text-[11px] text-gray-400 truncate">john@example.com</p>
              </div>
              <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                <LogOut className="h-3.5 w-3.5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 h-[72px] bg-white/80 backdrop-blur-md border-b border-gray-200/60 flex items-center justify-between px-4 sm:px-6">
          <button
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-[13px] font-medium text-gray-400">
              {NAV_ITEMS.find(n => isActive(n.href))?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group">
              <Bell className="h-[18px] w-[18px] text-gray-500 group-hover:text-gray-700 transition-colors" />
              <span className="absolute top-1 right-1 flex items-center justify-center w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full ring-2 ring-white">
                3
              </span>
            </button>
            <div className="hidden sm:flex items-center gap-3 pl-3 ml-1 border-l border-gray-200/60">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
                JD
              </div>
              <div>
                <span className="text-[13px] font-semibold text-gray-800 block leading-tight">John Doe</span>
                <span className="text-[11px] text-gray-400">Client</span>
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-72px)]">{children}</main>
      </div>
    </div>
  )
}
