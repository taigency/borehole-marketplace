'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Package, ShoppingCart, UserCheck, TrendingUp,
  ArrowUpRight, ArrowDownRight, Eye, Clock,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'

const STATS = [
  {
    label: 'Total Products',
    value: '24',
    change: '+3',
    trend: 'up' as const,
    icon: Package,
    color: 'bg-blue-500',
  },
  {
    label: 'Active Orders',
    value: '12',
    change: '+5',
    trend: 'up' as const,
    icon: ShoppingCart,
    color: 'bg-green-500',
  },
  {
    label: 'New Leads',
    value: '38',
    change: '+12',
    trend: 'up' as const,
    icon: UserCheck,
    color: 'bg-purple-500',
  },
  {
    label: 'Revenue (MTD)',
    value: 'R187,450',
    change: '+18.2%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'bg-orange-500',
  },
]

const RECENT_ORDERS = [
  { id: 'ORD-2847', customer: 'Thabo Molefe', items: 3, total: 45600, status: 'pending', date: '2026-07-18' },
  { id: 'ORD-2846', customer: 'Sarah van Zyl', items: 1, total: 12500, status: 'processing', date: '2026-07-17' },
  { id: 'ORD-2845', customer: 'James Khumalo', items: 5, total: 89200, status: 'shipped', date: '2026-07-16' },
  { id: 'ORD-2844', customer: 'Nomsa Dlamini', items: 2, total: 23800, status: 'delivered', date: '2026-07-15' },
  { id: 'ORD-2843', customer: 'Pieter Botha', items: 1, total: 8900, status: 'delivered', date: '2026-07-14' },
]

const RECENT_LEADS = [
  { id: 'LEAD-1021', name: 'Lungelo Ndlovu', service: 'Borehole Drilling', location: 'Pretoria, Gauteng', budget: 'R50,000 - R80,000', status: 'new', score: 85 },
  { id: 'LEAD-1020', name: 'Marlene Oosthuizen', service: 'Pump Installation', location: 'Stellenbosch, WC', budget: 'R15,000 - R25,000', status: 'quoted', score: 72 },
  { id: 'LEAD-1019', name: 'Sipho Mthembu', service: 'Water Quality Testing', location: 'Durban, KZN', budget: 'R5,000 - R10,000', status: 'new', score: 60 },
  { id: 'LEAD-1018', name: 'Annetjie van der Merwe', service: 'Geophysics Survey', location: 'George, WC', budget: 'R20,000 - R35,000', status: 'qualified', score: 91 },
]

const statusVariant = (status: string) => {
  switch (status) {
    case 'delivered': return 'success' as const
    case 'shipped': return 'default' as const
    case 'processing': return 'warning' as const
    case 'pending': return 'secondary' as const
    default: return 'secondary' as const
  }
}

const leadStatusVariant = (status: string) => {
  switch (status) {
    case 'new': return 'default' as const
    case 'qualified': return 'success' as const
    case 'quoted': return 'warning' as const
    default: return 'secondary' as const
  }
}

export default function SupplierOverviewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back, BoreMaster Drilling</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/supplier/products">
            <Button variant="outline" size="sm">
              <Package className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
          <Link href="/dashboard/supplier/analytics">
            <Button size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={cn('p-2.5 rounded-lg', stat.color)}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500">this month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <p className="text-sm text-gray-500 mt-0.5">Latest incoming orders</p>
            </div>
            <Link href="/dashboard/supplier/orders">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Order</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Customer</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Items</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map((order) => (
                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-mono font-medium text-gray-900">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{order.customer}</span>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-sm text-gray-600">{order.items} item{order.items > 1 ? 's' : ''}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-gray-900">{formatCurrency(order.total)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">New Leads</h2>
              <p className="text-sm text-gray-500 mt-0.5">Potential customers</p>
            </div>
            <Link href="/dashboard/supplier/leads">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_LEADS.map((lead) => (
                <div key={lead.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{lead.service}</p>
                    </div>
                    <Badge variant={leadStatusVariant(lead.status)}>{lead.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{lead.location}</span>
                    <span className="text-gray-300">|</span>
                    <span>{lead.budget}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          lead.score >= 80 ? 'bg-green-500' : lead.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        )}
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className={cn(
                      'text-xs font-medium',
                      lead.score >= 80 ? 'text-green-600' : lead.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                    )}>
                      {lead.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

