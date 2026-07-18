'use client'

import { useState } from 'react'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Package, Truck, CheckCircle, Clock, XCircle,
  Eye, RotateCcw, ChevronDown, ChevronUp,
} from 'lucide-react'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  supplier: string
  items: OrderItem[]
  status: string
  total: number
  createdAt: string
  trackingNumber: string | null
  timeline: { step: string; date: string; completed: boolean }[]
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    supplier: 'BoreMaster Drilling',
    items: [
      { name: 'Submersible Pump 1.5kW', quantity: 1, price: 8500 },
      { name: 'Pump Controller', quantity: 1, price: 2200 },
    ],
    status: 'delivered',
    total: 10700,
    createdAt: '2026-07-10',
    trackingNumber: 'TRK-123456',
    timeline: [
      { step: 'Order Placed', date: '2026-07-10', completed: true },
      { step: 'Confirmed', date: '2026-07-10', completed: true },
      { step: 'Processing', date: '2026-07-11', completed: true },
      { step: 'Shipped', date: '2026-07-13', completed: true },
      { step: 'Delivered', date: '2026-07-15', completed: true },
    ],
  },
  {
    id: 'ORD-002',
    supplier: 'AquaStore Solutions',
    items: [{ name: 'PVC Casing 160mm x 6m', quantity: 5, price: 1200 }],
    status: 'processing',
    total: 6000,
    createdAt: '2026-07-14',
    trackingNumber: null,
    timeline: [
      { step: 'Order Placed', date: '2026-07-14', completed: true },
      { step: 'Confirmed', date: '2026-07-14', completed: true },
      { step: 'Processing', date: '2026-07-15', completed: true },
      { step: 'Shipped', date: '', completed: false },
      { step: 'Delivered', date: '', completed: false },
    ],
  },
  {
    id: 'ORD-003',
    supplier: 'PumpTech SA',
    items: [
      { name: 'Water Tank 2500L', quantity: 1, price: 4500 },
      { name: 'Tank Stand', quantity: 1, price: 1800 },
    ],
    status: 'pending',
    total: 6300,
    createdAt: '2026-07-16',
    trackingNumber: null,
    timeline: [
      { step: 'Order Placed', date: '2026-07-16', completed: true },
      { step: 'Confirmed', date: '', completed: false },
      { step: 'Processing', date: '', completed: false },
      { step: 'Shipped', date: '', completed: false },
      { step: 'Delivered', date: '', completed: false },
    ],
  },
  {
    id: 'ORD-004',
    supplier: 'DrillPro Equipment',
    items: [
      { name: 'Drill Bit 6inch', quantity: 2, price: 3200 },
      { name: 'Drilling Mud 25kg', quantity: 3, price: 850 },
    ],
    status: 'confirmed',
    total: 8950,
    createdAt: '2026-07-17',
    trackingNumber: null,
    timeline: [
      { step: 'Order Placed', date: '2026-07-17', completed: true },
      { step: 'Confirmed', date: '2026-07-17', completed: true },
      { step: 'Processing', date: '', completed: false },
      { step: 'Shipped', date: '', completed: false },
      { step: 'Delivered', date: '', completed: false },
    ],
  },
  {
    id: 'ORD-005',
    supplier: 'BoreMaster Drilling',
    items: [{ name: 'Pressure Switch', quantity: 2, price: 650 }],
    status: 'cancelled',
    total: 1300,
    createdAt: '2026-07-08',
    trackingNumber: null,
    timeline: [
      { step: 'Order Placed', date: '2026-07-08', completed: true },
      { step: 'Cancelled', date: '2026-07-09', completed: true },
    ],
  },
]

const STATUSES = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="h-3.5 w-3.5" />,
  confirmed: <CheckCircle className="h-3.5 w-3.5" />,
  processing: <Package className="h-3.5 w-3.5" />,
  shipped: <Truck className="h-3.5 w-3.5" />,
  delivered: <CheckCircle className="h-3.5 w-3.5" />,
  cancelled: <XCircle className="h-3.5 w-3.5" />,
}

const statusVariant: Record<string, 'success' | 'warning' | 'default' | 'error'> = {
  delivered: 'success',
  processing: 'warning',
  pending: 'default',
  confirmed: 'default',
  shipped: 'warning',
  cancelled: 'error',
}

export default function ClientOrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const filteredOrders = selectedStatus
    ? MOCK_ORDERS.filter((order) => order.status === selectedStatus)
    : MOCK_ORDERS

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Orders</h1>
        <p className="text-gray-500 mt-1 text-[14px]">Track and manage your orders</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedStatus('')}
          className={cn(
            'px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all',
            selectedStatus === ''
              ? 'bg-[#0c4a6e] text-white shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          All
        </button>
        {STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={cn(
              'px-3.5 py-2 text-[13px] font-medium rounded-lg transition-all',
              selectedStatus === status
                ? 'bg-[#0c4a6e] text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="font-mono font-semibold text-[14px] text-[#0c4a6e]">{order.id}</span>
                    <Badge variant={statusVariant[order.status] ?? 'default'} className="text-[10px]">
                      <span className="flex items-center gap-1">
                        {statusIcons[order.status]}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-[13px] text-gray-500 mb-0.5">
                    From: <span className="font-medium text-gray-700">{order.supplier}</span>
                  </p>
                  <p className="text-[12px] text-gray-400">
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.quantity}x {item.name}
                        {i < order.items.length - 1 && ' · '}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[18px] font-bold text-gray-900">{formatCurrency(order.total)}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{formatDate(order.createdAt)}</p>
                  {order.trackingNumber && (
                    <p className="text-[11px] text-[#0c4a6e] font-medium mt-0.5">
                      Tracking: {order.trackingNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-[12px]"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  Track Order
                  {expandedOrder === order.id ? (
                    <ChevronUp className="h-3.5 w-3.5 ml-1.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
                  )}
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-[12px]">
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                  Reorder
                </Button>
              </div>

              {expandedOrder === order.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-4">Order Status Timeline</h4>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                    <div className="space-y-4">
                      {order.timeline.map((step, index) => (
                        <div key={index} className="flex items-center gap-4 relative">
                          <div
                            className={cn(
                              'w-8 h-8 rounded-full flex items-center justify-center z-10',
                              step.completed
                                ? 'text-white'
                                : 'bg-gray-200 text-gray-400'
                            )}
                            style={step.completed ? { background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' } : undefined}
                          >
                            {step.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className={cn('text-[13px] font-medium', step.completed ? 'text-gray-900' : 'text-gray-400')}>
                              {step.step}
                            </p>
                            {step.date && (
                              <p className="text-[11px] text-gray-400">{formatDate(step.date)}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-16">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="h-7 w-7 text-gray-300" />
          </div>
          <p className="text-[14px] font-medium text-gray-500">No orders found</p>
          <p className="text-[12px] text-gray-400 mt-1">Try adjusting your filter</p>
        </div>
      )}
    </div>
  )
}
