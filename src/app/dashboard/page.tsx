'use client'

import { useState } from 'react'
import { 
  BarChart3, Users, Package, ShoppingCart, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle 
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const STATS = [
  {
    label: 'Total Revenue',
    value: 'R124,500',
    change: '+12.5%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    label: 'Active Orders',
    value: '38',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
  },
  {
    label: 'New Leads',
    value: '156',
    change: '+23.1%',
    trend: 'up',
    icon: Users,
  },
  {
    label: 'Products Listed',
    value: '892',
    change: '-2.4%',
    trend: 'down',
    icon: Package,
  },
]

const RECENT_ORDERS = [
  { id: 'ORD-001', customer: 'John Smith', amount: 10700, status: 'delivered' },
  { id: 'ORD-002', customer: 'Sarah Johnson', amount: 6000, status: 'processing' },
  { id: 'ORD-003', customer: 'Mike Williams', amount: 6300, status: 'pending' },
  { id: 'ORD-004', customer: 'Lisa Brown', amount: 15200, status: 'confirmed' },
]

const RECENT_LEADS = [
  { id: 'LEAD-001', name: 'Peter Nkosi', service: 'Borehole Drilling', location: 'Gauteng', status: 'new' },
  { id: 'LEAD-002', name: 'Anna van der Merwe', service: 'Pump Installation', location: 'Western Cape', status: 'qualified' },
  { id: 'LEAD-003', name: 'David Motaung', service: 'Geophysics Survey', location: 'KwaZulu-Natal', status: 'assigned' },
]

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s your overview.</p>
        </div>
        <Button>
          <BarChart3 className="h-4 w-4 mr-2" />
          View Reports
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </CardContent>
        </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_ORDERS.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">R{order.amount.toLocaleString()}</p>
                    <Badge variant={order.status === 'delivered' ? 'success' : order.status === 'pending' ? 'warning' : 'default'}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Leads</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_LEADS.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.service} • {lead.location}</p>
                  </div>
                  <Badge variant={
                    lead.status === 'new' ? 'default' :
                    lead.status === 'qualified' ? 'warning' :
                    'success'
                  }>
                    {lead.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
