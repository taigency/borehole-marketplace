'use client'

import { useState } from 'react'
import {
  Search, ChevronDown, ChevronUp, Package,
  Truck, CheckCircle, Clock,
  MapPin, Phone, Mail,
} from 'lucide-react'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type OrderStatus = 'all' | 'pending' | 'processing' | 'shipped' | 'delivered'

const TABS: { label: string; value: OrderStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
]

interface OrderItem {
  name: string
  qty: number
  price: number
}

interface Order {
  id: string
  customer: { name: string; email: string; phone: string; location: string }
  items: OrderItem[]
  total: number
  status: Exclude<OrderStatus, 'all'>
  date: string
  notes?: string
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    customer: { name: 'Thabo Molefe', email: 'thabo@email.co.za', phone: '+27 82 456 7890', location: 'Pretoria, Gauteng' },
    items: [
      { name: 'Rotary Drill Bit 6"', qty: 2, price: 4500 },
      { name: 'Bentonite Drilling Mud 25kg', qty: 10, price: 350 },
    ],
    total: 12500,
    status: 'pending',
    date: '2026-07-18',
    notes: 'Urgent delivery requested',
  },
  {
    id: 'ORD-002',
    customer: { name: 'Sarah van Zyl', email: 'sarah@vanfarms.co.za', phone: '+27 76 234 5678', location: 'Stellenbosch, WC' },
    items: [
      { name: 'Submersible Pump 1HP', qty: 1, price: 8900 },
      { name: 'Pressure Tank 100L', qty: 1, price: 3800 },
    ],
    total: 12700,
    status: 'processing',
    date: '2026-07-17',
  },
  {
    id: 'ORD-003',
    customer: { name: 'James Khumalo', email: 'james@khumaloeng.co.za', phone: '+27 83 567 8901', location: 'Durban, KZN' },
    items: [
      { name: 'DTH Hammer 8"', qty: 1, price: 12500 },
      { name: 'Drill Rod 3m (Set of 10)', qty: 3, price: 7800 },
      { name: 'PVC Casing Pipe 110mm (6m)', qty: 20, price: 1200 },
    ],
    total: 60300,
    status: 'shipped',
    date: '2026-07-16',
  },
  {
    id: 'ORD-004',
    customer: { name: 'Nomsa Dlamini', email: 'nomsa@waterwise.co.za', phone: '+27 72 345 6789', location: 'Johannesburg, GP' },
    items: [
      { name: 'Water Filter System 5-Stage', qty: 2, price: 4200 },
      { name: 'HDPE Pipe 50mm (100m Roll)', qty: 1, price: 2800 },
    ],
    total: 11200,
    status: 'delivered',
    date: '2026-07-15',
  },
  {
    id: 'ORD-005',
    customer: { name: 'Pieter Botha', email: 'pieter@bothabore.co.za', phone: '+27 84 678 9012', location: 'George, WC' },
    items: [
      { name: 'Solar Pump Controller', qty: 1, price: 6700 },
    ],
    total: 6700,
    status: 'delivered',
    date: '2026-07-14',
  },
  {
    id: 'ORD-006',
    customer: { name: 'Lerato Mokoena', email: 'lerato@mmprojects.co.za', phone: '+27 79 012 3456', location: 'Bloemfontein, FS' },
    items: [
      { name: 'Well Head Assembly Standard', qty: 4, price: 3200 },
      { name: 'PVC Casing Pipe 110mm (6m)', qty: 30, price: 1200 },
    ],
    total: 48800,
    status: 'pending',
    date: '2026-07-13',
  },
  {
    id: 'ORD-007',
    customer: { name: 'Annetjie van der Merwe', email: 'annetjie@gfarms.co.za', phone: '+27 71 890 1234', location: 'Oudtshoorn, WC' },
    items: [
      { name: 'Borehole Chlorination Kit', qty: 5, price: 650 },
    ],
    total: 3250,
    status: 'processing',
    date: '2026-07-12',
  },
  {
    id: 'ORD-008',
    customer: { name: 'David Motaung', email: 'david@buildit.co.za', phone: '+27 85 234 5678', location: 'Johannesburg, GP' },
    items: [
      { name: 'Drill Rod 3m (Set of 10)', qty: 5, price: 7800 },
      { name: 'Rotary Drill Bit 6"', qty: 3, price: 4500 },
    ],
    total: 52500,
    status: 'shipped',
    date: '2026-07-11',
  },
]

const statusConfig = {
  pending: { label: 'Pending', variant: 'warning' as const, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  processing: { label: 'Processing', variant: 'default' as const, icon: Package, color: 'text-[#0c4a6e]', bg: 'bg-[#0c4a6e]/5' },
  shipped: { label: 'Shipped', variant: 'default' as const, icon: Truck, color: 'text-violet-600', bg: 'bg-violet-50' },
  delivered: { label: 'Delivered', variant: 'success' as const, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>('all')
  const [search, setSearch] = useState('')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const filtered = MOCK_ORDERS.filter((o) => {
    const matchesTab = activeTab === 'all' || o.status === activeTab
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const tabCounts = MOCK_ORDERS.reduce(
    (acc, order) => {
      acc[order.status]++
      acc.all++
      return acc
    },
    { all: 0, pending: 0, processing: 0, shipped: 0, delivered: 0 } as Record<OrderStatus, number>
  )

  const getNextAction = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return { label: 'Confirm Order', icon: CheckCircle }
      case 'processing': return { label: 'Mark as Shipped', icon: Truck }
      case 'shipped': return { label: 'Mark Delivered', icon: CheckCircle }
      default: return null
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Orders</h1>
        <p className="text-gray-500 mt-1 text-[14px]">Manage and track your orders</p>
      </div>

      <div className="flex gap-1 p-1 bg-gray-100/80 rounded-xl mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-[13px] font-medium rounded-lg transition-all whitespace-nowrap',
              activeTab === tab.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
            <span className={cn(
              'px-1.5 py-0.5 rounded-md text-[11px] font-semibold',
              activeTab === tab.value ? 'bg-[#0c4a6e]/10 text-[#0c4a6e]' : 'bg-gray-200/60 text-gray-500'
            )}>
              {tabCounts[tab.value]}
            </span>
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by order number or customer name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40 focus:bg-white transition-all"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((order) => {
          const config = statusConfig[order.status]
          const isExpanded = expandedOrder === order.id
          const nextAction = getNextAction(order.status)

          return (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div
                  className="p-5 cursor-pointer hover:bg-gray-50/50 transition-colors"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={cn('p-2.5 rounded-xl', config.bg)}>
                        <config.icon className={cn('h-5 w-5', config.color)} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-semibold text-[14px] text-[#0c4a6e]">{order.id}</span>
                          <Badge variant={config.variant} className="text-[11px]">{config.label}</Badge>
                        </div>
                        <p className="text-[13px] text-gray-500 mt-0.5">{order.customer.name} · {order.customer.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[16px] font-bold text-gray-900">{formatCurrency(order.total)}</p>
                        <p className="text-[11px] text-gray-400">{formatDate(order.date)}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-100">
                    <div className="p-5 bg-gray-50/30">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                          <h4 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Order Items</h4>
                          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b border-gray-100">
                                  <th className="text-left text-[11px] font-semibold text-gray-500 px-4 py-2.5">Product</th>
                                  <th className="text-right text-[11px] font-semibold text-gray-500 px-4 py-2.5">Qty</th>
                                  <th className="text-right text-[11px] font-semibold text-gray-500 px-4 py-2.5">Unit Price</th>
                                  <th className="text-right text-[11px] font-semibold text-gray-500 px-4 py-2.5">Subtotal</th>
                                </tr>
                              </thead>
                              <tbody>
                                {order.items.map((item, i) => (
                                  <tr key={i} className="border-b border-gray-50 last:border-0">
                                    <td className="text-[13px] text-gray-900 px-4 py-2.5">{item.name}</td>
                                    <td className="text-[13px] text-gray-500 text-right px-4 py-2.5">{item.qty}</td>
                                    <td className="text-[13px] text-gray-500 text-right px-4 py-2.5">{formatCurrency(item.price)}</td>
                                    <td className="text-[13px] font-semibold text-gray-900 text-right px-4 py-2.5">{formatCurrency(item.price * item.qty)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-3">Customer Details</h4>
                          <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                                style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
                                {order.customer.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="text-[13px] font-semibold text-gray-900">{order.customer.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[12px] text-gray-500">
                              <Mail className="h-3.5 w-3.5 text-gray-400" />
                              {order.customer.email}
                            </div>
                            <div className="flex items-center gap-2 text-[12px] text-gray-500">
                              <Phone className="h-3.5 w-3.5 text-gray-400" />
                              {order.customer.phone}
                            </div>
                            <div className="flex items-center gap-2 text-[12px] text-gray-500">
                              <MapPin className="h-3.5 w-3.5 text-gray-400" />
                              {order.customer.location}
                            </div>
                          </div>

                          {order.notes && (
                            <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-3">
                              <p className="text-[12px] font-medium text-amber-800">{order.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {nextAction && (
                        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-gray-200/60">
                          <Button variant="outline" size="sm" className="h-8 text-[12px]">
                            <Phone className="h-3.5 w-3.5 mr-1.5" />
                            Contact Customer
                          </Button>
                          <Button size="sm" className="h-8 text-[12px]"
                            style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
                            <nextAction.icon className="h-3.5 w-3.5 mr-1.5" />
                            {nextAction.label}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}

        {filtered.length === 0 && (
          <Card>
            <CardContent className="text-center py-16">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="h-7 w-7 text-gray-300" />
              </div>
              <p className="text-[14px] font-medium text-gray-500">No orders found</p>
              <p className="text-[12px] text-gray-400 mt-1">Try adjusting your search or filter</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
