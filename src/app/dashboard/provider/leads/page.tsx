'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, DollarSign, Clock, Send, Filter, Search } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  qualified: 'bg-yellow-100 text-yellow-800',
  quoted: 'bg-purple-100 text-purple-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
}

const MOCK_LEADS = [
  { id: 'L-001', name: 'James Khumalo', email: 'james.k@email.com', phone: '+27 82 111 2233', service: 'Borehole Drilling', location: 'Pretoria, Gauteng', budget: 45000, description: 'Need a 60m borehole drilled on our smallholding. Municipal water is unreliable. We have an existing pump that needs connecting after drilling.', status: 'new', time: '2 hours ago' },
  { id: 'L-002', name: 'Sarah Naidoo', email: 'sarah.n@email.com', phone: '+27 83 444 5566', service: 'Pump Installation', location: 'Durban North, KZN', budget: 15000, description: 'Existing borehole (45m) needs a new submersible pump. The old one burned out. Need someone to pull old pump and install a new one.', status: 'new', time: '5 hours ago' },
  { id: 'L-003', name: 'Willem Botha', email: 'willem@farm.co.za', phone: '+27 84 777 8899', service: 'Borehole Drilling', location: 'Stellenbosch, WC', budget: 55000, description: 'Agricultural borehole for vineyard irrigation. Need high-yield borehole. Soil is mainly sandstone. Two boreholes possibly required.', status: 'quoted', time: '1 day ago' },
  { id: 'L-004', name: 'Nomsa Mthembu', email: 'nomsa.m@email.com', phone: '+27 72 333 4455', service: 'Maintenance & Repair', location: 'Bloemfontein, FS', budget: 8000, description: 'Borehole water has become very murky and yield has dropped significantly. Think it may need rehabilitation or re-screening.', status: 'new', time: '1 day ago' },
  { id: 'L-005', name: 'Pieter van Zyl', email: 'pieter@vanzyl.co.za', phone: '+27 82 555 6677', service: 'Geophysics Survey', location: 'Potchefstroom, NW', budget: 12000, description: 'Need a geophysical survey done before drilling on our new property. Previous boreholes in the area hit water at varying depths.', status: 'qualified', time: '2 days ago' },
]

export default function ProviderLeadsPage() {
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')

  const filtered = MOCK_LEADS.filter((lead) => {
    const matchStatus = !statusFilter || lead.status === statusFilter
    const matchSearch = !search || lead.name.toLowerCase().includes(search.toLowerCase()) || lead.service.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-1">{filtered.length} leads in your service area</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            {['', 'new', 'qualified', 'quoted', 'won', 'lost'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  'px-3 py-2 text-sm rounded-lg font-medium transition-colors',
                  statusFilter === s ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Cards */}
      <div className="space-y-4">
        {filtered.map((lead) => (
          <Card key={lead.id} hover>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                    <Badge className={STATUS_STYLES[lead.status]}>{lead.status}</Badge>
                    <span className="text-xs text-gray-400 ml-auto flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {lead.time}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-primary mb-2">{lead.service}</p>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lead.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {lead.location}</span>
                    <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {lead.phone}</span>
                    <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {lead.email}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 lg:min-w-[180px]">
                  <div className="flex items-center gap-1 text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-lg font-bold text-gray-900">R{lead.budget.toLocaleString()}</span>
                  </div>
                  {lead.status === 'new' && (
                    <Button size="sm" className="w-full lg:w-auto">
                      <Send className="h-3.5 w-3.5 mr-1.5" /> Send Quote
                    </Button>
                  )}
                  {lead.status === 'qualified' && (
                    <Button size="sm" variant="outline" className="w-full lg:w-auto">
                      <Send className="h-3.5 w-3.5 mr-1.5" /> Send Quote
                    </Button>
                  )}
                  {lead.status === 'quoted' && (
                    <Badge variant="warning" className="text-sm">Quote Sent</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No leads found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}