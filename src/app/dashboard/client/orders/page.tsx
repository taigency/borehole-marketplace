'use client'

import { useState } from 'react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  MapPin,
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
    supplier: 'PumpTech SA',
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
    supplier: 'Borehole Supplies Co',
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
    supplier: 'AquaStore Solutions',
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
    supplier: 'PumpTech SA',
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
  pending: <Clock className="h-4 w-4" />,
  confirmed: <CheckCircle className="h-4 w-4" />,
  processing: <Package className="h-4 w-4" />,
  shipped: <Truck className="h-4 w-4" />,
  delivered: <CheckCircle className="h-4 w-4" />,
  cancelled: <XCircle className="h-4 w-4" />,
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">Track and manage your orders</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={selectedStatus === '' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSelectedStatus('')}
        >
          All
        </Button>
        {STATUSES.map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <Badge variant={statusVariant[order.status] ?? 'default'}>
                      <span className="flex items-center gap-1">
                        {statusIcons[order.status]}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    From: <span className="font-medium">{order.supplier}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.items.map((item, i) => (
                      <span key={i}>
                        {item.quantity}x {item.name}
                        {i < order.items.length - 1 && ' · '}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(order.total)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(order.createdAt)}
                  </p>
                  {order.trackingNumber && (
                    <p className="text-sm text-primary mt-1">
                      Tracking: {order.trackingNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setExpandedOrder(expandedOrder === order.id ? null : order.id)
                  }
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Track Order
                  {expandedOrder === order.id ? (
                    <ChevronUp className="h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reorder
                </Button>
              </div>

              {expandedOrder === order.id && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">Order Status Timeline</h4>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                    <div className="space-y-4">
                      {order.timeline.map((step, index) => (
                        <div key={index} className="flex items-center gap-4 relative">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                              step.completed
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                              {step.step}
                            </p>
                            {step.date && (
                              <p className="text-xs text-gray-500">{formatDate(step.date)}</p>
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
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No orders found for this status.</p>
        </div>
      )}
    </div>
  )
}