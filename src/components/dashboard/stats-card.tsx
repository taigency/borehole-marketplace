import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  trend?: 'up' | 'down'
  icon: LucideIcon
  className?: string
}

export function StatsCard({ title, value, change, trend, icon: Icon, className }: StatsCardProps) {
  return (
    <Card className={cn(className)}>
      <CardContent className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && trend && (
            <div className="flex items-center gap-1">
              {trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span
                className={cn(
                  'text-sm font-medium',
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                )}
              >
                {change > 0 ? '+' : ''}
                {change}%
              </span>
            </div>
          )}
        </div>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  )
}