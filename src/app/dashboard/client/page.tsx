'use client'

import Link from 'next/link'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ShoppingCart,
  FileText,
  TrendingUp,
  ArrowUpRight,
  Search,
  ClipboardList,
  Truck,
  ChevronRight,
} from 'lucide-react'

const STATS = [
  {
    label: 'Active Orders',
    value: '3',
    icon: ShoppingCart,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    label: 'Pending Quotes',
    value: '5',
    icon: FileText,
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    label: 'Total Spent',
    value: 'R42,850',
    icon: TrendingUp,
    color: 'bg-green-100 text-green-600',
  },
]

const RECENT_ORDERS = [
  {
    id: 'ORD-001',
    supplier: 'PumpTech SA',
    items: 'Submersible Pump 1.5kW, Pump Controller',
    total: 10700,
    status: 'delivered',
    date: '2026-07-10',
  },
  {
    id: 'ORD-002',
    supplier: 'Borehole Supplies Co',
    items: 'PVC Casing 160mm x 6m',
    total: 6000,
    status: 'processing',
    date: '2026-07-14',
  },
  {
    id: 'ORD-003',
    supplier: 'AquaStore Solutions',
    items: 'Water Tank 2500L, Tank Stand',
    total: 6300,
    status: 'pending',
    date: '2026-07-16',
  },
]

const QUICK_ACTIONS = [
  {
    label: 'Browse Services',
    description: 'Find borehole drilling and related services',
    href: '/services',
    icon: Search,
  },
  {
    label: 'Post Requirement',
    description: 'Submit a new requirement for suppliers',
    href: '/leads',
    icon: ClipboardList,
  },
  {
    label: 'Track Order',
    description: 'Check the status of your active orders',
    href: '/dashboard/client/orders',
    icon: Truck,
  },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, John! Here&apos;s your overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <Link href="/dashboard/client/orders">
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RECENT_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <Badge variant={statusVariant[order.status] ?? 'default'}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{order.supplier}</p>
                      <p className="text-sm text-gray-500 truncate">{order.items}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(order.total)}
                      </p>
                      <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {QUICK_ACTIONS.map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <action.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{action.label}</p>
                        <p className="text-xs text-gray-500">{action.description}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
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