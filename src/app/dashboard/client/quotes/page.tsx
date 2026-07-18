'use client'

import { useState } from 'react'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  FileText, Check, X, Clock, CheckCircle, XCircle,
  AlertCircle, ArrowLeftRight, Calendar, User,
} from 'lucide-react'

interface Quote {
  id: string
  provider: string
  service: string
  description: string
  amount: number
  validUntil: string
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  createdAt: string
}

const MOCK_QUOTES: Quote[] = [
  {
    id: 'QT-001',
    provider: 'BoreMaster Drilling',
    service: 'Borehole Drilling - 60m',
    description: 'Complete borehole drilling service including PVC casing installation, gravel pack, and well development. Includes initial yield test.',
    amount: 45000,
    validUntil: '2026-08-01',
    status: 'pending',
    createdAt: '2026-07-10',
  },
  {
    id: 'QT-002',
    provider: 'AquaDrill Solutions',
    service: 'Borehole Drilling - 60m',
    description: 'Drilling with steel casing and gravel pack. Includes geological assessment, drilling, casing, and 24-hour pump test.',
    amount: 52000,
    validUntil: '2026-07-25',
    status: 'pending',
    createdAt: '2026-07-11',
  },
  {
    id: 'QT-003',
    provider: 'PumpTech SA',
    service: 'Pump Installation',
    description: 'Submersible pump installation with controller, pressure switch, and electrical wiring. Grundfos 1.5kW pump included.',
    amount: 12500,
    validUntil: '2026-08-10',
    status: 'accepted',
    createdAt: '2026-07-05',
  },
  {
    id: 'QT-004',
    provider: 'GeoSurvey Pro',
    service: 'Geophysics Survey',
    description: 'Underground water detection survey using electrical resistivity method. Report with recommended drill points included.',
    amount: 8500,
    validUntil: '2026-07-15',
    status: 'expired',
    createdAt: '2026-06-20',
  },
]

const statusConfig: Record<string, { variant: 'default' | 'success' | 'warning' | 'error'; icon: React.ReactNode; label: string }> = {
  pending: { variant: 'warning', icon: <Clock className="h-3.5 w-3.5" />, label: 'Pending' },
  accepted: { variant: 'success', icon: <CheckCircle className="h-3.5 w-3.5" />, label: 'Accepted' },
  rejected: { variant: 'error', icon: <XCircle className="h-3.5 w-3.5" />, label: 'Rejected' },
  expired: { variant: 'default', icon: <AlertCircle className="h-3.5 w-3.5" />, label: 'Expired' },
}

export default function ClientQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>(MOCK_QUOTES)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([])

  const handleAccept = (id: string) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: 'accepted' as const } : q)))
  }

  const handleReject = (id: string) => {
    setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: 'rejected' as const } : q)))
  }

  const toggleCompare = (id: string) => {
    setSelectedForCompare((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 3 ? [...prev, id] : prev
    )
  }

  const pendingQuotes = quotes.filter((q) => q.status === 'pending')
  const otherQuotes = quotes.filter((q) => q.status !== 'pending')
  const compareQuotes = quotes.filter((q) => selectedForCompare.includes(q.id))

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Quotes</h1>
          <p className="text-gray-500 mt-1 text-[14px]">Review and manage quotes from service providers</p>
        </div>
        {pendingQuotes.length >= 2 && (
          <Button
            variant={compareMode ? 'primary' : 'outline'}
            size="sm"
            className="h-9 text-[13px]"
            onClick={() => {
              setCompareMode(!compareMode)
              if (compareMode) setSelectedForCompare([])
            }}
            style={compareMode ? { background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' } : undefined}
          >
            <ArrowLeftRight className="h-3.5 w-3.5 mr-1.5" />
            {compareMode ? 'Exit Compare' : 'Compare Quotes'}
          </Button>
        )}
      </div>

      {compareMode && (
        <div className="mb-4 p-3 bg-[#0c4a6e]/5 border border-[#0c4a6e]/10 rounded-xl">
          <p className="text-[13px] text-[#0c4a6e] font-medium">
            Select up to 3 quotes to compare side by side ({selectedForCompare.length}/3 selected)
          </p>
        </div>
      )}

      {compareMode && selectedForCompare.length >= 2 && (
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-[15px] font-semibold">Quote Comparison</h2>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-500 text-[11px] uppercase tracking-wider">Provider</th>
                    {compareQuotes.map((q) => (
                      <th key={q.id} className="text-left py-3 px-4 font-semibold text-gray-900">{q.provider}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4 text-gray-500">Service</td>
                    {compareQuotes.map((q) => (
                      <td key={q.id} className="py-3 px-4 font-medium">{q.service}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-500">Amount</td>
                    {compareQuotes.map((q) => (
                      <td key={q.id} className="py-3 px-4">
                        <span className="text-[18px] font-bold text-gray-900">{formatCurrency(q.amount)}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-500">Valid Until</td>
                    {compareQuotes.map((q) => (
                      <td key={q.id} className="py-3 px-4">{formatDate(q.validUntil)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-500">Description</td>
                    {compareQuotes.map((q) => (
                      <td key={q.id} className="py-3 px-4 text-gray-600">{q.description}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-500">Action</td>
                    {compareQuotes.map((q) => (
                      <td key={q.id} className="py-3 px-4">
                        <Button size="sm" className="h-8 text-[12px]"
                          style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}
                          onClick={() => handleAccept(q.id)}>
                          Accept
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {pendingQuotes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-[15px] font-semibold text-gray-900 mb-4">Pending Quotes</h2>
          <div className="space-y-3">
            {pendingQuotes.map((quote) => (
              <Card key={quote.id} hover>
                <CardContent className="p-5">
                  {compareMode && (
                    <div className="mb-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedForCompare.includes(quote.id)}
                          onChange={() => toggleCompare(quote.id)}
                          className="w-4 h-4 rounded border-gray-300 text-[#0c4a6e] focus:ring-[#0c4a6e]"
                        />
                        <span className="text-[12px] text-gray-500">Select for comparison</span>
                      </label>
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-2">
                        <h3 className="text-[14px] font-semibold text-gray-900">{quote.service}</h3>
                        <Badge variant="warning" className="text-[10px]">Pending</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[12px] text-gray-500 mb-2">
                        <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{quote.provider}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Valid until {formatDate(quote.validUntil)}</span>
                      </div>
                      <p className="text-[12px] text-gray-500 leading-relaxed">{quote.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[22px] font-bold text-gray-900">{formatCurrency(quote.amount)}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Quoted {formatDate(quote.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    <Button size="sm" className="h-8 text-[12px]"
                      style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}
                      onClick={() => handleAccept(quote.id)}>
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      Accept
                    </Button>
                    <Button variant="danger" size="sm" className="h-8 text-[12px]"
                      onClick={() => handleReject(quote.id)}>
                      <X className="h-3.5 w-3.5 mr-1.5" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {otherQuotes.length > 0 && (
        <div>
          <h2 className="text-[15px] font-semibold text-gray-900 mb-4">Quote History</h2>
          <div className="space-y-3">
            {otherQuotes.map((quote) => {
              const config = statusConfig[quote.status]
              return (
                <Card key={quote.id}>
                  <CardContent className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5 mb-2">
                          <h3 className="text-[14px] font-semibold text-gray-900">{quote.service}</h3>
                          <Badge variant={config?.variant ?? 'default'} className="text-[10px]">
                            <span className="flex items-center gap-1">{config?.icon}{config?.label}</span>
                          </Badge>
                        </div>
                        <p className="text-[13px] text-gray-600 font-medium">{quote.provider}</p>
                        <p className="text-[12px] text-gray-400 mt-0.5">{quote.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[18px] font-bold text-gray-900">{formatCurrency(quote.amount)}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Valid until {formatDate(quote.validUntil)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {quotes.length === 0 && (
        <div className="text-center py-16">
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileText className="h-7 w-7 text-gray-300" />
          </div>
          <p className="text-[14px] font-medium text-gray-500">No quotes yet</p>
          <p className="text-[12px] text-gray-400 mt-1 mb-4">Post a requirement to receive quotes from suppliers.</p>
          <Button size="sm" className="h-9 text-[13px]"
            style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
            Post Requirement
          </Button>
        </div>
      )}
    </div>
  )
}
