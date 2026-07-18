'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, DollarSign, Clock, Send, Search, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MOCK_LEADS = [
  { id: 'L-001', name: 'James Khumalo', email: 'james.k@email.com', phone: '+27 82 111 2233', service: 'Borehole Drilling', location: 'Pretoria, Gauteng', budget: 45000, description: 'Need a 60m borehole drilled on our smallholding. Municipal water is unreliable. We have an existing pump that needs connecting after drilling.', status: 'new', time: '2 hours ago', score: 88 },
  { id: 'L-002', name: 'Sarah Naidoo', email: 'sarah.n@email.com', phone: '+27 83 444 5566', service: 'Pump Installation', location: 'Durban North, KZN', budget: 15000, description: 'Existing borehole (45m) needs a new submersible pump. The old one burned out. Need someone to pull old pump and install a new one.', status: 'new', time: '5 hours ago', score: 75 },
  { id: 'L-003', name: 'Willem Botha', email: 'willem@farm.co.za', phone: '+27 84 777 8899', service: 'Borehole Drilling', location: 'Stellenbosch, WC', budget: 55000, description: 'Agricultural borehole for vineyard irrigation. Need high-yield borehole. Soil is mainly sandstone. Two boreholes possibly required.', status: 'quoted', time: '1 day ago', score: 92 },
  { id: 'L-004', name: 'Nomsa Mthembu', email: 'nomsa.m@email.com', phone: '+27 72 333 4455', service: 'Maintenance & Repair', location: 'Bloemfontein, FS', budget: 8000, description: 'Borehole water has become very murky and yield has dropped significantly. Think it may need rehabilitation or re-screening.', status: 'new', time: '1 day ago', score: 62 },
  { id: 'L-005', name: 'Pieter van Zyl', email: 'pieter@vanzyl.co.za', phone: '+27 82 555 6677', service: 'Geophysics Survey', location: 'Potchefstroom, NW', budget: 12000, description: 'Need a geophysical survey done before drilling on our new property. Previous boreholes in the area hit water at varying depths.', status: 'qualified', time: '2 days ago', score: 70 },
  { id: 'L-006', name: 'Fatima Patel', email: 'fatima@patelfoods.co.za', phone: '+27 79 999 0011', service: 'Water Treatment', location: 'Cape Town, WC', budget: 18000, description: 'Iron removal system needed for food processing borehole water. High iron content detected. Need SANS 241 compliant solution.', status: 'new', time: '3 days ago', score: 68 },
]

const getScoreColor = (score: number) => {
  if (score >= 80) return { bar: 'bg-emerald-500', text: 'text-emerald-600', label: 'Hot', bg: 'bg-emerald-50' }
  if (score >= 60) return { bar: 'bg-amber-500', text: 'text-amber-600', label: 'Warm', bg: 'bg-amber-50' }
  return { bar: 'bg-red-500', text: 'text-red-600', label: 'Cold', bg: 'bg-red-50' }
}

export default function ProviderLeadsPage() {
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')

  const filtered = MOCK_LEADS.filter((lead) => {
    const matchStatus = !statusFilter || lead.status === statusFilter
    const matchSearch = !search || lead.name.toLowerCase().includes(search.toLowerCase()) || lead.service.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Leads</h1>
        <p className="text-gray-500 mt-1 text-[14px]">{filtered.length} leads in your service area</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40 focus:bg-white transition-all"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {['', 'new', 'qualified', 'quoted', 'won', 'lost'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    'px-3 py-2 text-[12px] font-medium rounded-lg transition-all',
                    statusFilter === s
                      ? 'bg-[#0c4a6e] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  )}
                >
                  {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filtered.map((lead) => {
          const scoreInfo = getScoreColor(lead.score)
          return (
            <Card key={lead.id} hover className="group">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-2">
                      <h3 className="text-[14px] font-semibold text-gray-900">{lead.name}</h3>
                      <Badge variant={lead.status === 'new' ? 'default' : lead.status === 'qualified' ? 'success' : lead.status === 'quoted' ? 'warning' : 'secondary'} className="text-[10px]">
                        {lead.status}
                      </Badge>
                      <span className="text-[11px] text-gray-400 ml-auto flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {lead.time}
                      </span>
                    </div>
                    <p className="text-[13px] font-medium text-[#0c4a6e] mb-2">{lead.service}</p>
                    <p className="text-[12px] text-gray-500 mb-3 line-clamp-2 leading-relaxed">{lead.description}</p>

                    <div className="flex items-center gap-3 mb-3 p-2.5 bg-gray-50 rounded-lg max-w-[280px]">
                      <Target className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-medium text-gray-500">Lead Score</span>
                          <div className="flex items-center gap-1">
                            <span className={cn('text-[11px] font-bold', scoreInfo.text)}>{lead.score}%</span>
                            <span className={cn('text-[9px] font-semibold px-1 py-0.5 rounded', scoreInfo.text, scoreInfo.bg)}>{scoreInfo.label}</span>
                          </div>
                        </div>
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className={cn('h-full rounded-full transition-all', scoreInfo.bar)} style={{ width: `${lead.score}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {lead.location}</span>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {lead.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {lead.email}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 lg:min-w-[180px]">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span className="text-[18px] font-bold text-gray-900">R{lead.budget.toLocaleString()}</span>
                    </div>
                    {(lead.status === 'new' || lead.status === 'qualified') && (
                      <Button size="sm" className="w-full lg:w-auto h-8 text-[12px]"
                        style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
                        <Send className="h-3.5 w-3.5 mr-1.5" /> Send Quote
                      </Button>
                    )}
                    {lead.status === 'quoted' && (
                      <Badge variant="warning" className="text-[11px]">Quote Sent</Badge>
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
            <Search className="h-7 w-7 text-gray-300" />
          </div>
          <p className="text-[14px] font-medium text-gray-500">No leads found</p>
          <p className="text-[12px] text-gray-400 mt-1">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  )
}
