'use client'

import { useState } from 'react'
import { Package, Truck, CheckCircle, Clock, XCircle, Eye } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ORDER_STATUSES } from '@/lib/constants'

const MOCK_ORDERS = [
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
  },
  {
    id: 'ORD-002',
    supplier: 'Borehole Supplies Co',
    items: [
      { name: 'PVC Casing 160mm x 6m', quantity: 5, price: 1200 },
    ],
    status: 'processing',
    total: 6000,
    createdAt: '2026-07-14',
    trackingNumber: null,
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
  },
]

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  confirmed: <CheckCircle className="h-4 w-4" />,
  processing: <Package className="h-4 w-4" />,
  shipped: <Truck className="h-4 w-4" />,
  delivered: <CheckCircle className="h-4 w-4" />,
  completed: <CheckCircle className="h-4 w-4" />,
  cancelled: <XCircle className="h-4 w-4" />,
}

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('')

  const filteredOrders = selectedStatus
    ? MOCK_ORDERS.filter(order => order.status === selectedStatus)
    : MOCK_ORDERS

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-600 mt-2">Track and manage your orders</p>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={selectedStatus === '' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setSelectedStatus('')}
        >
          All Orders
        </Button>
        {ORDER_STATUSES.map((status) => (
          <Button
            key={status.id}
            variant={selectedStatus === status.id ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setSelectedStatus(status.id)}
          >
            {status.label}
          </Button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const statusConfig = ORDER_STATUSES.find(s => s.id === order.status)
          return (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{order.id}</h3>
                      <Badge className={statusConfig?.color}>
                        <span className="flex items-center gap-1">
                          {statusIcons[order.status]}
                          {statusConfig?.label}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      From: <span className="font-medium">{order.supplier}</span>
                    </p>
                    <div className="text-sm text-gray-500">
                      {order.items.map((item, i) => (
                        <span key={i}>
                          {item.quantity}x {item.name}
                          {i < order.items.length - 1 && ' • '}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      R{order.total.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Ordered: {new Date(order.createdAt).toLocaleDateString('en-ZA')}
                    </p>
                    {order.trackingNumber && (
                      <p className="text-sm text-primary mt-1">
                        Tracking: {order.trackingNumber}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  {order.status === 'delivered' && (
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Confirm Receipt
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No orders found.</p>
        </div>
      )}
    </div>
  )
}
