import { Badge } from '@/components/ui/badge'

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'success' | 'warning' | 'error' }> = {
  pending: { label: 'Pending', variant: 'warning' },
  confirmed: { label: 'Confirmed', variant: 'default' },
  processing: { label: 'Processing', variant: 'default' },
  shipped: { label: 'Shipped', variant: 'default' },
  delivered: { label: 'Delivered', variant: 'success' },
  completed: { label: 'Completed', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'error' },
  refunded: { label: 'Refunded', variant: 'error' },
  paid: { label: 'Paid', variant: 'success' },
  active: { label: 'Active', variant: 'success' },
  inactive: { label: 'Inactive', variant: 'secondary' },
  new: { label: 'New', variant: 'default' },
  qualified: { label: 'Qualified', variant: 'default' },
  assigned: { label: 'Assigned', variant: 'default' },
  quoted: { label: 'Quoted', variant: 'warning' },
  won: { label: 'Won', variant: 'success' },
  lost: { label: 'Lost', variant: 'error' },
  accepted: { label: 'Accepted', variant: 'success' },
  rejected: { label: 'Rejected', variant: 'error' },
  expired: { label: 'Expired', variant: 'secondary' },
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, variant: 'secondary' as const }
  return <Badge variant={config.variant} className={className}>{config.label}</Badge>
}