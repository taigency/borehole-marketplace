'use client'

import Link from 'next/link'
import { cn, formatCurrency } from '@/lib/utils'
import {
  Package, ShoppingCart, UserCheck, TrendingUp,
  ArrowUpRight, Eye, Clock, MapPin,
  MoreHorizontal, ArrowRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const STATS = [
  { label: 'Total Products', value: '89', change: '+12', trend: 'up' as const, icon: Package, color: '#0c4a6e', bg: 'bg-[#0c4a6e]' },
  { label: 'Active Orders', value: '12', change: '+5', trend: 'up' as const, icon: ShoppingCart, color: '#0d9488', bg: 'bg-[#0d9488]' },
  { label: 'New Leads', value: '8', change: '+3', trend: 'up' as const, icon: UserCheck, color: '#7c3aed', bg: 'bg-violet-500' },
  { label: 'Revenue (MTD)', value: 'R124,500', change: '+18.2%', trend: 'up' as const, icon: TrendingUp, color: '#ea580c', bg: 'bg-orange-500' },
]

const RECENT_ORDERS = [
  { id: 'ORD-001', customer: 'Thabo Molefe', items: 3, total: 45600, status: 'pending', date: '2026-07-18' },
  { id: 'ORD-002', customer: 'Sarah van Zyl', items: 1, total: 12500, status: 'processing', date: '2026-07-17' },
  { id: 'ORD-003', customer: 'James Khumalo', items: 5, total: 89200, status: 'shipped', date: '2026-07-16' },
  { id: 'ORD-004', customer: 'Nomsa Dlamini', items: 2, total: 23800, status: 'delivered', date: '2026-07-15' },
  { id: 'ORD-005', customer: 'Pieter Botha', items: 1, total: 8900, status: 'delivered', date: '2026-07-14' },
]

const RECENT_LEADS = [
  { id: 'LEAD-1021', name: 'Lungelo Ndlovu', service: 'Borehole Drilling', location: 'Pretoria, Gauteng', budget: 'R50,000 - R80,000', status: 'new', score: 85 },
  { id: 'LEAD-1020', name: 'Marlene Oosthuizen', service: 'Pump Installation', location: 'Stellenbosch, WC', budget: 'R15,000 - R25,000', status: 'quoted', score: 72 },
  { id: 'LEAD-1019', name: 'Sipho Mthembu', service: 'Water Quality Testing', location: 'Durban, KZN', budget: 'R5,000 - R10,000', status: 'new', score: 60 },
  { id: 'LEAD-1018', name: 'Annetjie van der Merwe', service: 'Geophysics Survey', location: 'George, WC', budget: 'R20,000 - R35,000', status: 'qualified', score: 91 },
]

const REVENUE_DATA = [
  { month: 'Feb', value: 78000 },
  { month: 'Mar', value: 95000 },
  { month: 'Apr', value: 82000 },
  { month: 'May', value: 110000 },
  { month: 'Jun', value: 98000 },
  { month: 'Jul', value: 124500 },
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

const getScoreColor = (score: number) => {
  if (score >= 80) return { bar: 'bg-emerald-500', text: 'text-emerald-600', label: 'Hot' }
  if (score >= 60) return { bar: 'bg-amber-500', text: 'text-amber-600', label: 'Warm' }
  return { bar: 'bg-red-500', text: 'text-red-600', label: 'Cold' }
}

export default function SupplierOverviewPage() {
  const maxRevenue = Math.max(...REVENUE_DATA.map(d => d.value))

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back, Johan!</h1>
          <p className="text-gray-500 mt-1 text-[15px]">Here&apos;s what&apos;s happening with your business today.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/supplier/products">
            <Button variant="outline" size="sm" className="h-9 text-[13px]">
              <Package className="h-3.5 w-3.5 mr-1.5" />
              Add Product
            </Button>
          </Link>
          <Link href="/dashboard/supplier/analytics">
            <Button size="sm" className="h-9 text-[13px]"
              style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
              <Eye className="h-3.5 w-3.5 mr-1.5" />
              View Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden group hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-[28px] font-bold text-gray-900 mt-1 tracking-tight">{stat.value}</p>
                </div>
                <div className={cn('p-2.5 rounded-xl', stat.bg)}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-50 rounded-md">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  <span className="text-[12px] font-semibold text-emerald-600">{stat.change}</span>
                </div>
                <span className="text-[12px] text-gray-400">this month</span>
              </div>
            </CardContent>
            <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <stat.icon className="w-full h-full" />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900">Revenue Overview</h2>
              <p className="text-[12px] text-gray-400 mt-0.5">Last 6 months performance</p>
            </div>
            <Link href="/dashboard/supplier/analytics">
              <Button variant="ghost" size="sm" className="h-8 text-[12px] text-[#0c4a6e]">
                View Details <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-end gap-3 h-[200px] px-2">
              {REVENUE_DATA.map((item, i) => {
                const height = (item.value / maxRevenue) * 100
                const isCurrent = i === REVENUE_DATA.length - 1
                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full flex flex-col items-center">
                      <span className="text-[11px] font-semibold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                        {(item.value / 1000).toFixed(0)}k
                      </span>
                      <div className="w-full max-w-[40px] mx-auto relative">
                        <div
                          className={cn(
                            'w-full rounded-t-lg transition-all duration-500',
                            isCurrent
                              ? 'shadow-lg'
                              : 'hover:opacity-80'
                          )}
                          style={{
                            height: `${height * 1.5}px`,
                            background: isCurrent
                              ? 'linear-gradient(180deg, #0d9488, #0c4a6e)'
                              : 'linear-gradient(180deg, #0c4a6e40, #0c4a6e20)',
                          }}
                        />
                      </div>
                    </div>
                    <span className={cn(
                      'text-[11px] font-medium',
                      isCurrent ? 'text-[#0c4a6e]' : 'text-gray-400'
                    )}>
                      {item.month}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <h2 className="text-[15px] font-semibold text-gray-900">New Leads</h2>
              <p className="text-[12px] text-gray-400 mt-0.5">Potential customers</p>
            </div>
            <Link href="/dashboard/supplier/leads">
              <Button variant="ghost" size="sm" className="h-8 text-[12px] text-[#0c4a6e]">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-3">
              {RECENT_LEADS.map((lead) => {
                const scoreInfo = getScoreColor(lead.score)
                return (
                  <div key={lead.id} className="p-3.5 bg-gray-50/80 rounded-xl hover:bg-gray-100/80 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-[13px] font-semibold text-gray-900">{lead.name}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{lead.service}</p>
                      </div>
                      <Badge variant={leadStatusVariant(lead.status)} className="text-[10px]">{lead.status}</Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-2.5">
                      <MapPin className="h-3 w-3" />
                      <span>{lead.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full transition-all', scoreInfo.bar)}
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className={cn('text-[11px] font-bold', scoreInfo.text)}>{lead.score}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <h2 className="text-[15px] font-semibold text-gray-900">Recent Orders</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">Latest incoming orders</p>
          </div>
          <Link href="/dashboard/supplier/orders">
            <Button variant="ghost" size="sm" className="h-8 text-[12px] text-[#0c4a6e]">
              View All <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0 pt-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Order</th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Customer</th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Items</th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5">
                      <span className="text-[13px] font-mono font-semibold text-[#0c4a6e]">{order.id}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-[13px] font-medium text-gray-900">{order.customer}</span>
                    </td>
                    <td className="px-6 py-3.5 hidden sm:table-cell">
                      <span className="text-[13px] text-gray-500">{order.items} item{order.items > 1 ? 's' : ''}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge variant={statusVariant(order.status)} className="text-[11px]">{order.status}</Badge>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span className="text-[13px] font-semibold text-gray-900">{formatCurrency(order.total)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
