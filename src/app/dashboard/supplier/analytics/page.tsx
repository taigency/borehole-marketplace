'use client'

import {
  TrendingUp, TrendingDown, DollarSign,
  ShoppingCart, Users, ArrowUpRight, ArrowDownRight,
  Calendar, BarChart3,
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const STATS = [
  { label: 'Total Revenue', value: 'R584,200', change: '+18.2%', trend: 'up' as const, icon: DollarSign },
  { label: 'Orders Completed', value: '142', change: '+12.5%', trend: 'up' as const, icon: ShoppingCart },
  { label: 'Avg Order Value', value: 'R4,114', change: '-2.1%', trend: 'down' as const, icon: TrendingUp },
  { label: 'Conversion Rate', value: '34%', change: '+5.8%', trend: 'up' as const, icon: Users },
]

const MONTHLY_REVENUE = [
  { month: 'Jan', value: 42000 },
  { month: 'Feb', value: 38000 },
  { month: 'Mar', value: 55000 },
  { month: 'Apr', value: 47000 },
  { month: 'May', value: 62000 },
  { month: 'Jun', value: 58000 },
  { month: 'Jul', value: 87000 },
  { month: 'Aug', value: 72000 },
  { month: 'Sep', value: 68000 },
  { month: 'Oct', value: 75000 },
  { month: 'Nov', value: 82000 },
  { month: 'Dec', value: 94000 },
]

const TOP_PRODUCTS = [
  { name: 'DTH Hammer 8"', category: 'Drilling Equipment', unitsSold: 24, revenue: 300000, trend: 12 },
  { name: 'Submersible Pump 1HP', category: 'Pumps & Motors', unitsSold: 18, revenue: 160200, trend: 8 },
  { name: 'Drill Rod 3m (Set of 10)', category: 'Drilling Equipment', unitsSold: 31, revenue: 241800, trend: -3 },
  { name: 'PVC Casing Pipe 110mm (6m)', category: 'Pipes & Fittings', unitsSold: 156, revenue: 187200, trend: 22 },
  { name: 'Water Filter System 5-Stage', category: 'Water Treatment', unitsSold: 42, revenue: 176400, trend: 15 },
]

const ORDERS_BY_STATUS = [
  { status: 'Delivered', count: 98, percentage: 69, color: 'bg-emerald-500' },
  { status: 'Shipped', count: 18, percentage: 13, color: 'bg-[#0c4a6e]' },
  { status: 'Processing', count: 14, percentage: 10, color: 'bg-amber-500' },
  { status: 'Pending', count: 12, percentage: 8, color: 'bg-orange-500' },
]

const LEAD_SOURCES = [
  { source: 'Website', count: 124, percentage: 45 },
  { source: 'Referral', count: 68, percentage: 25 },
  { source: 'Google Ads', count: 44, percentage: 16 },
  { source: 'Trade Shows', count: 25, percentage: 9 },
  { source: 'Cold Outreach', count: 14, percentage: 5 },
]

const MONTHLY_TRENDS = [
  { month: 'Jan', orders: 12, leads: 28, converted: 4 },
  { month: 'Feb', orders: 10, leads: 22, converted: 3 },
  { month: 'Mar', orders: 15, leads: 35, converted: 6 },
  { month: 'Apr', orders: 13, leads: 30, converted: 5 },
  { month: 'May', orders: 18, leads: 42, converted: 7 },
  { month: 'Jun', orders: 16, leads: 38, converted: 6 },
  { month: 'Jul', orders: 22, leads: 48, converted: 9 },
]

export default function AnalyticsPage() {
  const maxRevenue = Math.max(...MONTHLY_REVENUE.map(m => m.value))

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Analytics</h1>
          <p className="text-gray-500 mt-1 text-[14px]">Track your business performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 text-[13px]">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            Last 12 Months
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-[13px]">
            <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <Card key={stat.label} className="group hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-[26px] font-bold text-gray-900 mt-1 tracking-tight">{stat.value}</p>
                </div>
                <div className="p-2.5 bg-[#0c4a6e]/5 rounded-xl">
                  <stat.icon className="h-5 w-5 text-[#0c4a6e]" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
                {stat.trend === 'up' ? (
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-50 rounded-md">
                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                    <span className="text-[12px] font-semibold text-emerald-600">{stat.change}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-red-50 rounded-md">
                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                    <span className="text-[12px] font-semibold text-red-600">{stat.change}</span>
                  </div>
                )}
                <span className="text-[12px] text-gray-400">vs last year</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <h2 className="text-[15px] font-semibold text-gray-900">Monthly Revenue</h2>
            <p className="text-[12px] text-gray-400">Revenue trends over the past 12 months</p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64 flex items-end gap-2 px-2">
              {MONTHLY_REVENUE.map((month) => {
                const barHeight = (month.value / maxRevenue) * 100
                const isCurrent = month.month === 'Jul'

                return (
                  <div key={month.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full relative">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium shadow-lg">
                        {formatCurrency(month.value)}
                      </div>
                      <div
                        className={cn(
                          'w-full rounded-t-lg transition-all hover:opacity-80',
                          isCurrent ? 'shadow-lg' : ''
                        )}
                        style={{
                          height: `${barHeight * 2}px`,
                          background: isCurrent
                            ? 'linear-gradient(180deg, #0d9488, #0c4a6e)'
                            : 'linear-gradient(180deg, #0c4a6e30, #0c4a6e15)',
                        }}
                      />
                    </div>
                    <span className={cn('text-[11px] font-medium', isCurrent ? 'text-[#0c4a6e]' : 'text-gray-400')}>
                      {month.month}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-[15px] font-semibold text-gray-900">Orders by Status</h2>
            <p className="text-[12px] text-gray-400">Current order distribution</p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {ORDERS_BY_STATUS.map((item) => (
                <div key={item.status}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-gray-700">{item.status}</span>
                    <span className="text-[12px] text-gray-400">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all', item.color)}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-5">
                {ORDERS_BY_STATUS.map((item) => (
                  <div key={item.status} className="text-center">
                    <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-1.5', item.color)}>
                      <span className="text-white text-[13px] font-bold">{item.count}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-[15px] font-semibold text-gray-900">Top Products</h2>
            <p className="text-[12px] text-gray-400">Best performing products by revenue</p>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">#</th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Product</th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Units</th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Revenue</th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Trend</th>
                </tr>
              </thead>
              <tbody>
                {TOP_PRODUCTS.map((product, i) => (
                  <tr key={product.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <span className="text-[12px] font-medium text-gray-400">{i + 1}</span>
                    </td>
                    <td className="px-6 py-3">
                      <p className="text-[13px] font-medium text-gray-900">{product.name}</p>
                      <p className="text-[11px] text-gray-400">{product.category}</p>
                    </td>
                    <td className="px-6 py-3 text-right hidden sm:table-cell">
                      <span className="text-[13px] text-gray-500">{product.unitsSold}</span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className="text-[13px] font-semibold text-gray-900">{formatCurrency(product.revenue)}</span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {product.trend >= 0 ? (
                          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                        )}
                        <span className={cn('text-[11px] font-semibold', product.trend >= 0 ? 'text-emerald-600' : 'text-red-600')}>
                          {product.trend >= 0 ? '+' : ''}{product.trend}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <h2 className="text-[15px] font-semibold text-gray-900">Lead Sources</h2>
            <p className="text-[12px] text-gray-400">Where your leads are coming from</p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {LEAD_SOURCES.map((item) => (
                <div key={item.source}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-gray-700">{item.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-gray-400">{item.count} leads</span>
                      <Badge variant="secondary" className="text-[10px]">{item.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${item.percentage}%`, background: 'linear-gradient(90deg, #0c4a6e, #0d9488)' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-[32px] font-bold text-gray-900 tracking-tight">275</p>
              <p className="text-[12px] text-gray-400 mt-1">Total leads this year</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-[15px] font-semibold text-gray-900">Monthly Trends</h2>
          <p className="text-[12px] text-gray-400">Orders, leads, and conversions over time</p>
        </CardHeader>
        <CardContent className="p-0 pt-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Month</th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Orders</th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Leads</th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Converted</th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Conv. Rate</th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Visual</th>
                </tr>
              </thead>
              <tbody>
                {MONTHLY_TRENDS.map((month) => {
                  const convRate = Math.round((month.converted / month.leads) * 100)
                  const maxOrders = Math.max(...MONTHLY_TRENDS.map(m => m.orders))
                  const barWidth = (month.orders / maxOrders) * 100

                  return (
                    <tr key={month.month} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3">
                        <span className="text-[13px] font-medium text-gray-900">{month.month} 2026</span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className="text-[13px] text-gray-900">{month.orders}</span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className="text-[13px] text-gray-500">{month.leads}</span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <span className="text-[13px] font-semibold text-emerald-600">{month.converted}</span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <Badge variant={convRate >= 20 ? 'success' : convRate >= 15 ? 'warning' : 'secondary'} className="text-[10px]">
                          {convRate}%
                        </Badge>
                      </td>
                      <td className="px-6 py-3 hidden sm:table-cell">
                        <div className="w-full max-w-[120px]">
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${barWidth}%`, background: 'linear-gradient(90deg, #0c4a6e, #0d9488)' }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
