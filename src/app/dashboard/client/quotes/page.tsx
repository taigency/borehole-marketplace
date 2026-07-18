'use client'

import { useState } from 'react'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeftRight,
  Calendar,
  DollarSign,
  User,
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
    description: 'Complete borehole drilling service including casing installation',
    amount: 45000,
    validUntil: '2026-08-01',
    status: 'pending',
    createdAt: '2026-07-10',
  },
  {
    id: 'QT-002',
    provider: 'AquaDrill Solutions',
    service: 'Borehole Drilling - 60m',
    description: 'Drilling with steel casing and gravel pack',
    amount: 52000,
    validUntil: '2026-07-25',
    status: 'pending',
    createdAt: '2026-07-11',
  },
  {
    id: 'QT-003',
    provider: 'PumpTech SA',
    service: 'Pump Installation',
    description: 'Submersible pump installation with controller and wiring',
    amount: 12500,
    validUntil: '2026-08-10',
    status: 'accepted',
    createdAt: '2026-07-05',
  },
  {
    id: 'QT-004',
    provider: 'GeoSurvey Pro',
    service: 'Geophysics Survey',
    description: 'Underground water detection survey using resistivity method',
    amount: 8500,
    validUntil: '2026-07-15',
    status: 'expired',
    createdAt: '2026-06-20',
  },
  {
    id: 'QT-005',
    provider: 'WaterWorks Engineering',
    service: 'Water Quality Testing',
    description: 'Full chemical and bacteriological water analysis',
    amount: 3200,
    validUntil: '2026-07-20',
    status: 'rejected',
    createdAt: '2026-07-01',
  },
  {
    id: 'QT-006',
    provider: 'DrillPro Equipment',
    service: 'Borehole Drilling - 45m',
    description: 'PVC casing drilling with yield testing included',
    amount: 38000,
    validUntil: '2026-08-05',
    status: 'pending',
    createdAt: '2026-07-14',
  },
]

const statusConfig: Record<string, { variant: 'default' | 'success' | 'warning' | 'error'; icon: React.ReactNode; label: string }> = {
  pending: { variant: 'warning', icon: <Clock className="h-4 w-4" />, label: 'Pending' },
  accepted: { variant: 'success', icon: <CheckCircle className="h-4 w-4" />, label: 'Accepted' },
  rejected: { variant: 'error', icon: <XCircle className="h-4 w-4" />, label: 'Rejected' },
  expired: { variant: 'default', icon: <AlertCircle className="h-4 w-4" />, label: 'Expired' },
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Quotes</h1>
          <p className="text-gray-600 mt-2">Review and manage quotes from service providers</p>
        </div>
        {pendingQuotes.length >= 2 && (
          <Button
            variant={compareMode ? 'primary' : 'outline'}
            onClick={() => {
              setCompareMode(!compareMode)
              if (compareMode) setSelectedForCompare([])
            }}
          >
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            {compareMode ? 'Exit Compare' : 'Compare Quotes'}
          </Button>
        )}
      </div>

      {compareMode && (
        <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm text-primary font-medium">
            Select up to 3 quotes to compare side by side ({selectedForCompare.length}/3 selected)
          </p>
        </div>
      )}

      {compareMode && selectedForCompare.length >= 2 && (
        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-lg font-semibold">Quote Comparison</h2>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Provider</th>
                    {compareQuotes.map((q) => (
                      <th key={q.id} className="text-left py-3 px-4 font-medium text-gray-900">
                        {q.provider}
                      </th>
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
                        <span className="text-lg font-bold text-gray-900">{formatCurrency(q.amount)}</span>
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
                        <Button size="sm" onClick={() => handleAccept(q.id)}>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Quotes</h2>
          <div className="space-y-4">
            {pendingQuotes.map((quote) => (
              <Card key={quote.id} hover>
                <CardContent className="p-6">
                  {compareMode && (
                    <div className="mb-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedForCompare.includes(quote.id)}
                          onChange={() => toggleCompare(quote.id)}
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-gray-600">Select for comparison</span>
                      </label>
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{quote.service}</h3>
                        <Badge variant="warning">Pending</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {quote.provider}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Valid until {formatDate(quote.validUntil)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{quote.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(quote.amount)}</p>
                      <p className="text-xs text-gray-500 mt-1">Quoted {formatDate(quote.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    <Button size="sm" onClick={() => handleAccept(quote.id)}>
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleReject(quote.id)}>
                      <X className="h-4 w-4 mr-1" />
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quote History</h2>
          <div className="space-y-4">
            {otherQuotes.map((quote) => {
              const config = statusConfig[quote.status]
              return (
                <Card key={quote.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{quote.service}</h3>
                          <Badge variant={config?.variant ?? 'default'}>
                            <span className="flex items-center gap-1">
                              {config?.icon}
                              {config?.label}
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{quote.provider}</p>
                        <p className="text-sm text-gray-500">{quote.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">{formatCurrency(quote.amount)}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Valid until {formatDate(quote.validUntil)}
                        </p>
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
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No quotes yet.</p>
          <p className="text-sm text-gray-400 mb-4">Post a requirement to receive quotes from suppliers.</p>
          <Button>Post Requirement</Button>
        </div>
      )}
    </div>
  )
}