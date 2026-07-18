'use client'

import { useState } from 'react'
import { DollarSign, Calendar, FileText, User, MapPin, Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const STATUS_CONFIG: Record<string, { variant: 'default' | 'success' | 'warning' | 'error' | 'secondary'; label: string }> = {
  pending: { variant: 'default', label: 'Pending' },
  accepted: { variant: 'success', label: 'Accepted' },
  rejected: { variant: 'error', label: 'Rejected' },
  expired: { variant: 'secondary', label: 'Expired' },
}

const MOCK_QUOTES = [
  { id: 'Q-001', customer: 'Willem Botha', service: 'Borehole Drilling', location: 'Stellenbosch, WC', amount: 48000, description: '60m borehole drilling including casing installation. Price includes geological assessment and initial yield test. PVC casing (110mm) to be provided.', validUntil: '2026-02-15', status: 'pending', sentDate: '2026-01-18' },
  { id: 'Q-002', customer: 'James Khumalo', service: 'Borehole Drilling', location: 'Pretoria, Gauteng', amount: 42000, description: '50m drilling with steel casing. Includes site assessment, drilling, casing, and well development. Does not include pump installation.', validUntil: '2026-02-10', status: 'accepted', sentDate: '2026-01-12' },
  { id: 'Q-003', customer: 'Sarah Naidoo', service: 'Pump Installation', location: 'Durban North, KZN', amount: 12500, description: 'Supply and install Grundfos 1.5kW submersible pump. Includes electrical connection, pressure switch, and commissioning. Existing borehole.', validUntil: '2026-02-05', status: 'pending', sentDate: '2026-01-15' },
  { id: 'Q-004', customer: 'Pieter van Zyl', service: 'Geophysics Survey', location: 'Potchefstroom, NW', amount: 11000, description: 'Electrical resistivity survey covering 1km² area with 50m electrode spacing. Report with recommended drill points and expected depth.', validUntil: '2026-01-20', status: 'expired', sentDate: '2025-12-20' },
  { id: 'Q-005', customer: 'David Motaung', service: 'Borehole Drilling', location: 'Polokwane, Limpopo', amount: 38000, description: '40m borehole including casing and well development. Budget-friendly option using uPVC casing.', validUntil: '2026-01-25', status: 'rejected', sentDate: '2026-01-08' },
  { id: 'Q-006', customer: 'Nomsa Mthembu', service: 'Maintenance & Repair', location: 'Bloemfontein, FS', amount: 6500, description: 'Borehole rehabilitation: surging, bailing, brushing of screen. Chemical treatment if needed. Includes assessment report.', validUntil: '2026-02-20', status: 'pending', sentDate: '2026-01-17' },
]

export default function ProviderQuotesPage() {
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')

  const filtered = MOCK_QUOTES.filter((q) => {
    const matchStatus = !statusFilter || q.status === statusFilter
    const matchSearch = !search || q.customer.toLowerCase().includes(search.toLowerCase()) || q.service.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const counts = {
    all: MOCK_QUOTES.length,
    pending: MOCK_QUOTES.filter(q => q.status === 'pending').length,
    accepted: MOCK_QUOTES.filter(q => q.status === 'accepted').length,
    rejected: MOCK_QUOTES.filter(q => q.status === 'rejected').length,
    expired: MOCK_QUOTES.filter(q => q.status === 'expired').length,
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Quotes</h1>
        <p className="text-gray-600 mt-1">Manage your sent quotes</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {(['pending', 'accepted', 'rejected', 'expired'] as const).map((status) => (
          <Card key={status}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{counts[status]}</p>
              <Badge variant={STATUS_CONFIG[status].variant} className="mt-1">
                {STATUS_CONFIG[status].label}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search quotes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: '', label: 'All' },
              { value: 'pending', label: 'Pending' },
              { value: 'accepted', label: 'Accepted' },
              { value: 'rejected', label: 'Rejected' },
              { value: 'expired', label: 'Expired' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={cn(
                  'px-3 py-2 text-sm rounded-lg font-medium transition-colors',
                  statusFilter === value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Cards */}
      <div className="space-y-4">
        {filtered.map((quote) => {
          const config = STATUS_CONFIG[quote.status]
          return (
            <Card key={quote.id} hover>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-gray-500">{quote.id}</span>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-gray-400" />
                      <h3 className="font-semibold text-gray-900">{quote.customer}</h3>
                    </div>
                    <p className="text-sm font-medium text-primary mb-1">{quote.service}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                      <MapPin className="h-3.5 w-3.5" /> {quote.location}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{quote.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Sent: {quote.sentDate}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Valid until: {quote.validUntil}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 lg:min-w-[160px]">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-2xl font-bold text-gray-900">R{quote.amount.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-gray-400">incl. VAT</div>
                    {quote.status === 'accepted' && (
                      <Button size="sm" className="w-full lg:w-auto">
                        <FileText className="h-3.5 w-3.5 mr-1.5" /> Create Job
                      </Button>
                    )}
                    {quote.status === 'pending' && (
                      <Button size="sm" variant="outline" className="w-full lg:w-auto">
                        Edit Quote
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No quotes found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}