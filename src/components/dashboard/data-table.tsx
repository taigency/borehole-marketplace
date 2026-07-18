'use client'

import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
  className?: string
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortedData = useMemo(() => {
    if (!sortKey) return data
    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal
      }
      const cmp = String(aVal).localeCompare(String(bVal))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [data, sortKey, sortDir])

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                  col.sortable && 'cursor-pointer select-none hover:text-gray-700',
                  col.className
                )}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && (
                    sortKey === col.key ? (
                      sortDir === 'asc' ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )
                    ) : (
                      <ArrowUpDown className="h-3 w-3 opacity-40" />
                    )
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sortedData.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(row)}
              className={cn(
                'transition-colors',
                onRowClick && 'cursor-pointer hover:bg-gray-50'
              )}
            >
              {columns.map((col) => (
                <td key={col.key} className={cn('px-4 py-3 text-sm text-gray-700', col.className)}>
                  {col.render
                    ? col.render(row[col.key] as T[keyof T], row)
                    : (row[col.key] as React.ReactNode) ?? '—'}
                </td>
              ))}
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}