'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, LogOut, type LucideIcon } from 'lucide-react'

export interface SidebarItem {
  href: string
  label: string
  icon: LucideIcon
}

interface SidebarProps {
  items: SidebarItem[]
  title: string
  user?: { name: string; email: string } | null
  onLogout?: () => void
}

export function Sidebar({ items, title, user, onLogout }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true)

  return (
    <>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-white border border-gray-200 shadow-sm"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto',
          collapsed ? '-translate-x-full' : 'translate-x-0'
        )}
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setCollapsed(true)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {user && (
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </aside>

      {!collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  )
}