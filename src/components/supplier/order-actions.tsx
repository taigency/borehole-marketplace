'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CheckCircle, Truck, Package, XCircle } from 'lucide-react'

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled'

interface OrderActionsProps {
  status: OrderStatus
  onStatusChange: (newStatus: OrderStatus) => void
  className?: string
}

const statusFlow: Record<OrderStatus, { next: OrderStatus | null; cancel: boolean }> = {
  pending: { next: 'confirmed', cancel: true },
  confirmed: { next: 'processing', cancel: true },
  processing: { next: 'shipped', cancel: false },
  shipped: { next: 'delivered', cancel: false },
  delivered: { next: 'completed', cancel: false },
  completed: { next: null, cancel: false },
  cancelled: { next: null, cancel: false },
}

const labelMap: Record<string, string> = {
  confirmed: 'Confirm Order',
  processing: 'Start Processing',
  shipped: 'Mark as Shipped',
  delivered: 'Mark as Delivered',
  completed: 'Mark as Completed',
  cancel: 'Cancel Order',
}

const iconMap: Record<string, React.ReactNode> = {
  confirmed: <CheckCircle className="h-4 w-4" />,
  processing: <Package className="h-4 w-4" />,
  shipped: <Truck className="h-4 w-4" />,
  delivered: <CheckCircle className="h-4 w-4" />,
  completed: <CheckCircle className="h-4 w-4" />,
}

export function OrderActions({ status, onStatusChange, className }: OrderActionsProps) {
  const flow = statusFlow[status]
  if (!flow?.next && !flow?.cancel) return null

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {flow.next && (
        <Button
          size="sm"
          onClick={() => onStatusChange(flow.next!)}
        >
          {iconMap[flow.next]}
          <span className="ml-1.5">{labelMap[flow.next]}</span>
        </Button>
      )}
      {flow.cancel && (
        <Button
          size="sm"
          variant="danger"
          onClick={() => onStatusChange('cancelled')}
        >
          <XCircle className="h-4 w-4" />
          <span className="ml-1.5">{labelMap.cancel}</span>
        </Button>
      )}
    </div>
  )
}