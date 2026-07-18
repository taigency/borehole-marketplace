'use client'

import Link from 'next/link'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ShoppingCart, FileText, TrendingUp, Search,
  ClipboardList, Truck, ChevronRight, ArrowRight, Package,
} from 'lucide-react'

const STATS = [
  { label: 'Active Orders', value: '3', icon: ShoppingCart, color: '#0c4a6e', bg: 'bg-[#0c4a6e]' },
  { label: 'Pending Quotes', value: '2', icon: FileText, color: '#d97706', bg: 'bg-amber-500' },
  { label: 'Total Spent', value: 'R45,200', icon: TrendingUp, color: '#0d9488', bg: 'bg-[#0d9488]' },
]

const RECENT_ORDERS = [
  {
    id: 'ORD-001',
    supplier: 'BoreMaster Drilling',
    items: 'Submersible Pump 1.5kW, Pump Controller',
    total: 10700,
    status: 'delivered',
    date: '2026-07-10',
  },
  {
    id: 'ORD-002',
    supplier: 'AquaStore Solutions',
    items: 'PVC Casing 160mm x 6m (5 units)',
    total: 6000,
    status: 'processing',
    date: '2026-07-14',
  },
  {
    id: 'ORD-003',
    supplier: 'PumpTech SA',
    items: 'Water Tank 2500L, Tank Stand',
    total: 6300,
    status: 'pending',
    date: '2026-07-16',
  },
]

const QUICK_ACTIONS = [
  { label: 'Browse Products', description: 'Find borehole equipment and supplies', href: '/services', icon: Search },
  { label: 'Post Requirement', description: 'Submit a new requirement for suppliers', href: '/leads', icon: ClipboardList },
  { label: 'Track Order', description: 'Check the status of your active orders', href: '/dashboard/client/orders', icon: Truck },
]

const statusVariant: Record<string, 'success' | 'warning' | 'default' | 'error'> = {
  delivered: 'success',
  processing: 'warning',
  pending: 'default',
  confirmed: 'default',
  cancelled: 'error',
}

export default function ClientDashboardPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back, John!</h1>
        <p className="text-gray-500 mt-1 text-[15px]">Here&apos;s your account overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {STATS.map((stat) => (
          <Card key={stat.label} className="group hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className={cn('p-3 rounded-xl', stat.bg)}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-[12px] text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-[26px] font-bold text-gray-900 mt-0.5 tracking-tight">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <h2 className="text-[15px] font-semibold text-gray-900">Recent Orders</h2>
                <p className="text-[12px] text-gray-400 mt-0.5">Your latest orders</p>
              </div>
              <Link href="/dashboard/client/orders">
                <Button variant="ghost" size="sm" className="h-8 text-[12px] text-[#0c4a6e]">
                  View All <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                {RECENT_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-colors cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="font-mono font-semibold text-[13px] text-[#0c4a6e]">{order.id}</span>
                        <Badge variant={statusVariant[order.status] ?? 'default'} className="text-[10px]">
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-[13px] text-gray-600 font-medium">{order.supplier}</p>
                      <p className="text-[12px] text-gray-400 truncate mt-0.5">{order.items}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-[14px] font-bold text-gray-900">{formatCurrency(order.total)}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{formatDate(order.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-2">
              <h2 className="text-[15px] font-semibold text-gray-900">Quick Actions</h2>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                {QUICK_ACTIONS.map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-gray-50/80 transition-colors cursor-pointer group">
                      <div className="p-2 bg-[#0c4a6e]/5 rounded-lg group-hover:bg-[#0c4a6e]/10 transition-colors">
                        <action.icon className="h-4 w-4 text-[#0c4a6e]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[13px] font-semibold text-gray-900">{action.label}</p>
                        <p className="text-[11px] text-gray-400">{action.description}</p>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-[#0c4a6e] transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
