'use client'

import { useState } from 'react'
import { DollarSign, Calendar, FileText, User, MapPin, Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const STATUS_CONFIG: Record<string, { variant: 'default' | 'success' | 'warning' | 'error' | 'secondary'; label: string }> = {
  pending: { variant: 'warning', label: 'Pending' },
  accepted: { variant: 'success', label: 'Accepted' },
  rejected: { variant: 'error', label: 'Rejected' },
  expired: { variant: 'secondary', label: 'Expired' },
}

const MOCK_QUOTES = [
  { id: 'Q-001', customer: 'Willem Botha', service: 'Borehole Drilling', location: 'Stellenbosch, WC', amount: 48000, description: '60m borehole drilling including casing installation. Price includes geological assessment and initial yield test.', validUntil: '2026-08-15', status: 'pending', sentDate: '2026-07-18' },
  { id: 'Q-002', customer: 'James Khumalo', service: 'Borehole Drilling', location: 'Pretoria, Gauteng', amount: 42000, description: '50m drilling with steel casing. Includes site assessment, drilling, casing, and well development.', validUntil: '2026-08-10', status: 'accepted', sentDate: '2026-07-12' },
  { id: 'Q-003', customer: 'Sarah Naidoo', service: 'Pump Installation', location: 'Durban North, KZN', amount: 12500, description: 'Supply and install Grundfos 1.5kW submersible pump. Includes electrical connection, pressure switch, and commissioning.', validUntil: '2026-08-05', status: 'pending', sentDate: '2026-07-15' },
  { id: 'Q-004', customer: 'Pieter van Zyl', service: 'Geophysics Survey', location: 'Potchefstroom, NW', amount: 11000, description: 'Electrical resistivity survey covering 1km² area with 50m electrode spacing. Report with recommended drill points.', validUntil: '2026-07-20', status: 'expired', sentDate: '2026-06-20' },
  { id: 'Q-005', customer: 'David Motaung', service: 'Borehole Drilling', location: 'Polokwane, Limpopo', amount: 38000, description: '40m borehole including casing and well development. Budget-friendly option using uPVC casing.', validUntil: '2026-07-25', status: 'rejected', sentDate: '2026-07-08' },
  { id: 'Q-006', customer: 'Nomsa Mthembu', service: 'Maintenance & Repair', location: 'Bloemfontein, FS', amount: 6500, description: 'Borehole rehabilitation: surging, bailing, brushing of screen. Chemical treatment if needed. Includes assessment report.', validUntil: '2026-08-20', status: 'pending', sentDate: '2026-07-17' },
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
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Quotes</h1>
        <p className="text-gray-500 mt-1 text-[14px]">Manage your sent quotes</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {(['pending', 'accepted', 'rejected', 'expired'] as const).map((status) => (
          <Card key={status} className="group hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <p className="text-[24px] font-bold text-gray-900">{counts[status]}</p>
              <Badge variant={STATUS_CONFIG[status].variant} className="mt-1 text-[10px]">
                {STATUS_CONFIG[status].label}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search quotes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40 focus:bg-white transition-all"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
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
                    'px-3 py-2 text-[12px] font-medium rounded-lg transition-all',
                    statusFilter === value
                      ? 'bg-[#0c4a6e] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filtered.map((quote) => {
          const config = STATUS_CONFIG[quote.status]
          return (
            <Card key={quote.id} hover className="group">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-[12px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{quote.id}</span>
                      <Badge variant={config.variant} className="text-[10px]">{config.label}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-3.5 w-3.5 text-gray-400" />
                      <h3 className="text-[14px] font-semibold text-gray-900">{quote.customer}</h3>
                    </div>
                    <p className="text-[13px] font-medium text-[#0c4a6e] mb-1">{quote.service}</p>
                    <div className="flex items-center gap-1 text-[12px] text-gray-400 mb-2">
                      <MapPin className="h-3 w-3" /> {quote.location}
                    </div>
                    <p className="text-[12px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">{quote.description}</p>
                    <div className="flex items-center gap-4 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Sent: {quote.sentDate}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Valid until: {quote.validUntil}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 lg:min-w-[160px]">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-[22px] font-bold text-gray-900">R{quote.amount.toLocaleString()}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium">incl. VAT</div>
                    {quote.status === 'accepted' && (
                      <Button size="sm" className="w-full lg:w-auto h-8 text-[12px]"
                        style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
                        <FileText className="h-3.5 w-3.5 mr-1.5" /> Create Job
                      </Button>
                    )}
                    {quote.status === 'pending' && (
                      <Button size="sm" variant="outline" className="w-full lg:w-auto h-8 text-[12px]">
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
        <div className="text-center py-16">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="h-7 w-7 text-gray-300" />
          </div>
          <p className="text-[14px] font-medium text-gray-500">No quotes found</p>
          <p className="text-[12px] text-gray-400 mt-1">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  )
}
