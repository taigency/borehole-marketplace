'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  UserCheck,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  ChevronDown,
  Store,
} from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard/supplier', icon: LayoutDashboard },
  { label: 'Products', href: '/dashboard/supplier/products', icon: Package },
  { label: 'Orders', href: '/dashboard/supplier/orders', icon: ShoppingCart },
  { label: 'Leads', href: '/dashboard/supplier/leads', icon: UserCheck },
  { label: 'Analytics', href: '/dashboard/supplier/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/dashboard/supplier/settings', icon: Settings },
]

export default function SupplierDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/dashboard/supplier') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <Link href="/dashboard/supplier" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Store className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Supplier</span>
            </Link>
            <button
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="px-3 py-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">BM</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">BoreMaster Drilling</p>
                <p className="text-xs text-gray-500 truncate">supplier@boremaster.co.za</p>
              </div>
              <button className="p-1 rounded-md hover:bg-gray-100">
                <LogOut className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 rounded-md hover:bg-gray-100">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">BM</span>
              </div>
              <span className="text-sm font-medium text-gray-700">BoreMaster</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main>{children}</main>
      </div>
    </div>
  )
}