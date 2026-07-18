'use client'

import {
  TrendingUp, TrendingDown, DollarSign, Package,
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
  { month: 'Jan', value: 42000, height: 42 },
  { month: 'Feb', value: 38000, height: 38 },
  { month: 'Mar', value: 55000, height: 55 },
  { month: 'Apr', value: 47000, height: 47 },
  { month: 'May', value: 62000, height: 62 },
  { month: 'Jun', value: 58000, height: 58 },
  { month: 'Jul', value: 87000, height: 87 },
  { month: 'Aug', value: 72000, height: 72 },
  { month: 'Sep', value: 68000, height: 68 },
  { month: 'Oct', value: 75000, height: 75 },
  { month: 'Nov', value: 82000, height: 82 },
  { month: 'Dec', value: 94000, height: 94 },
]

const TOP_PRODUCTS = [
  { name: 'DTH Hammer 8"', category: 'Drilling Equipment', unitsSold: 24, revenue: 300000, trend: 12 },
  { name: 'Submersible Pump 1HP', category: 'Pumps & Motors', unitsSold: 18, revenue: 160200, trend: 8 },
  { name: 'Drill Rod 3m (Set of 10)', category: 'Drilling Equipment', unitsSold: 31, revenue: 241800, trend: -3 },
  { name: 'PVC Casing Pipe 110mm (6m)', category: 'Pipes & Fittings', unitsSold: 156, revenue: 187200, trend: 22 },
  { name: 'Water Filter System 5-Stage', category: 'Water Treatment', unitsSold: 42, revenue: 176400, trend: 15 },
]

const ORDERS_BY_STATUS = [
  { status: 'Delivered', count: 98, percentage: 69, color: 'bg-green-500' },
  { status: 'Shipped', count: 18, percentage: 13, color: 'bg-blue-500' },
  { status: 'Processing', count: 14, percentage: 10, color: 'bg-yellow-500' },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your business performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 12 Months
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-2.5 bg-primary/10 rounded-lg">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span className={cn('text-sm font-medium', stat.trend === 'up' ? 'text-green-600' : 'text-red-600')}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500">vs last year</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Monthly Revenue</h2>
            <p className="text-sm text-gray-500">Revenue trends over the past 12 months</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2 px-2">
              {MONTHLY_REVENUE.map((month) => {
                const barHeight = (month.value / maxRevenue) * 100
                const isCurrent = month.month === 'Jul'

                return (
                  <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative group">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {formatCurrency(month.value)}
                      </div>
                      <div
                        className={cn(
                          'w-full rounded-t-md transition-all hover:opacity-80',
                          isCurrent ? 'bg-primary' : 'bg-primary/30'
                        )}
                        style={{ height: `${barHeight * 2}px` }}
                      />
                    </div>
                    <span className={cn('text-xs font-medium', isCurrent ? 'text-primary' : 'text-gray-500')}>
                      {month.month}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Orders by Status */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Orders by Status</h2>
            <p className="text-sm text-gray-500">Current order distribution</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ORDERS_BY_STATUS.map((item) => (
                <div key={item.status}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{item.status}</span>
                    <span className="text-sm text-gray-500">{item.count} ({item.percentage}%)</span>
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

            {/* Visual ring */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-6">
                {ORDERS_BY_STATUS.map((item) => (
                  <div key={item.status} className="text-center">
                    <div className={cn('w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-1', item.color)}>
                      <span className="text-white text-sm font-bold">{item.count}</span>
                    </div>
                    <span className="text-xs text-gray-500">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            <p className="text-sm text-gray-500">Best performing products by revenue</p>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">#</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Product</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Units</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Revenue</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Trend</th>
                </tr>
              </thead>
              <tbody>
                {TOP_PRODUCTS.map((product, i) => (
                  <tr key={product.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-500">{i + 1}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </td>
                    <td className="px-6 py-4 text-right hidden sm:table-cell">
                      <span className="text-sm text-gray-600">{product.unitsSold}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-semibold text-gray-900">{formatCurrency(product.revenue)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {product.trend >= 0 ? (
                          <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3.5 w-3.5 text-red-500" />
                        )}
                        <span className={cn('text-xs font-medium', product.trend >= 0 ? 'text-green-600' : 'text-red-600')}>
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

        {/* Lead Sources */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Lead Sources</h2>
            <p className="text-sm text-gray-500">Where your leads are coming from</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {LEAD_SOURCES.map((item) => (
                <div key={item.source}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{item.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{item.count} leads</span>
                      <Badge variant="secondary">{item.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">275</p>
                <p className="text-sm text-gray-500 mt-1">Total leads this year</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Monthly Trends</h2>
          <p className="text-sm text-gray-500">Orders, leads, and conversions over time</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Month</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Orders</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Leads</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Converted</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Conv. Rate</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3 hidden sm:table-cell">Visual</th>
                </tr>
              </thead>
              <tbody>
                {MONTHLY_TRENDS.map((month) => {
                  const convRate = Math.round((month.converted / month.leads) * 100)
                  const maxOrders = Math.max(...MONTHLY_TRENDS.map(m => m.orders))
                  const barWidth = (month.orders / maxOrders) * 100

                  return (
                    <tr key={month.month} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{month.month} 2026</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm text-gray-900">{month.orders}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm text-gray-600">{month.leads}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-medium text-green-600">{month.converted}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Badge variant={convRate >= 20 ? 'success' : convRate >= 15 ? 'warning' : 'secondary'}>
                          {convRate}%
                        </Badge>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <div className="w-full max-w-[120px]">
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${barWidth}%` }}
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