'use client'

import { useState } from 'react'
import {
  Search, MapPin, DollarSign, UserCheck, Phone,
  Mail, Tag, Clock, Target,
  ArrowRight, XCircle, FileText, Send,
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type LeadStatus = 'all' | 'new' | 'qualified' | 'quoted' | 'converted' | 'lost'

const TABS: { label: string; value: LeadStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Quoted', value: 'quoted' },
  { label: 'Converted', value: 'converted' },
  { label: 'Lost', value: 'lost' },
]

interface Lead {
  id: string
  customer: { name: string; email: string; phone: string }
  service: string
  location: string
  budget: string
  status: Exclude<LeadStatus, 'all'>
  score: number
  date: string
  source: string
  description: string
}

const MOCK_LEADS: Lead[] = [
  {
    id: 'LEAD-001',
    customer: { name: 'Lungelo Ndlovu', email: 'lungelo@nprojects.co.za', phone: '+27 82 111 2233' },
    service: 'Borehole Drilling',
    location: 'Pretoria, Gauteng',
    budget: 'R50,000 - R80,000',
    status: 'new',
    score: 85,
    date: '2026-07-18',
    source: 'Website',
    description: 'Need a borehole drilled for a new residential development. Approximately 60m depth required. Municipal water backup needed.',
  },
  {
    id: 'LEAD-002',
    customer: { name: 'Marlene Oosthuizen', email: 'marlene@oostfarms.co.za', phone: '+27 76 333 4455' },
    service: 'Pump Installation',
    location: 'Stellenbosch, Western Cape',
    budget: 'R15,000 - R25,000',
    status: 'quoted',
    score: 72,
    date: '2026-07-17',
    source: 'Referral',
    description: 'Existing borehole needs new submersible pump. Current pump failed after 8 years of service.',
  },
  {
    id: 'LEAD-003',
    customer: { name: 'Sipho Mthembu', email: 'sipho@waterwise.co.za', phone: '+27 83 555 6677' },
    service: 'Water Quality Testing',
    location: 'Durban, KwaZulu-Natal',
    budget: 'R5,000 - R10,000',
    status: 'new',
    score: 60,
    date: '2026-07-17',
    source: 'Google Ads',
    description: 'Water quality test required for commercial property borehole. Need SANS 241 compliance certificate.',
  },
  {
    id: 'LEAD-004',
    customer: { name: 'Annetjie van der Merwe', email: 'annetjie@gfarms.co.za', phone: '+27 71 888 9900' },
    service: 'Geophysics Survey',
    location: 'George, Western Cape',
    budget: 'R20,000 - R35,000',
    status: 'qualified',
    score: 91,
    date: '2026-07-16',
    source: 'Website',
    description: 'Geophysical survey for agricultural borehole. 200 hectare farm, need to identify best drilling points.',
  },
  {
    id: 'LEAD-005',
    customer: { name: 'David Motaung', email: 'david@buildit.co.za', phone: '+27 84 222 3344' },
    service: 'Borehole Drilling',
    location: 'Johannesburg, Gauteng',
    budget: 'R60,000 - R100,000',
    status: 'converted',
    score: 95,
    date: '2026-07-15',
    source: 'Trade Show',
    description: 'Twin borehole project for industrial water supply. Converted to ORD-003.',
  },
  {
    id: 'LEAD-006',
    customer: { name: 'Fatima Patel', email: 'fatima@patelfoods.co.za', phone: '+27 79 999 0011' },
    service: 'Water Treatment',
    location: 'Cape Town, Western Cape',
    budget: 'R12,000 - R20,000',
    status: 'new',
    score: 68,
    date: '2026-07-12',
    source: 'Referral',
    description: 'Iron removal system needed for food processing borehole water. High iron content detected.',
  },
]

const statusConfig = {
  new: { label: 'New', variant: 'default' as const, color: 'bg-[#0c4a6e]' },
  qualified: { label: 'Qualified', variant: 'success' as const, color: 'bg-emerald-500' },
  quoted: { label: 'Quoted', variant: 'warning' as const, color: 'bg-amber-500' },
  converted: { label: 'Converted', variant: 'success' as const, color: 'bg-emerald-600' },
  lost: { label: 'Lost', variant: 'error' as const, color: 'bg-red-500' },
}

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState<LeadStatus>('all')
  const [search, setSearch] = useState('')

  const filtered = MOCK_LEADS.filter((lead) => {
    const matchesTab = activeTab === 'all' || lead.status === activeTab
    const matchesSearch = lead.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.service.toLowerCase().includes(search.toLowerCase()) ||
      lead.location.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const tabCounts = MOCK_LEADS.reduce(
    (acc, lead) => {
      acc[lead.status]++
      acc.all++
      return acc
    },
    { all: 0, new: 0, qualified: 0, quoted: 0, converted: 0, lost: 0 } as Record<LeadStatus, number>
  )

  const getScoreColor = (score: number) => {
    if (score >= 80) return { bar: 'bg-emerald-500', text: 'text-emerald-600', label: 'Hot', bg: 'bg-emerald-50' }
    if (score >= 60) return { bar: 'bg-amber-500', text: 'text-amber-600', label: 'Warm', bg: 'bg-amber-50' }
    return { bar: 'bg-red-500', text: 'text-red-600', label: 'Cold', bg: 'bg-red-50' }
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Leads</h1>
        <p className="text-gray-500 mt-1 text-[14px]">Track and convert potential customers</p>
      </div>

      <div className="flex gap-1 p-1 bg-gray-100/80 rounded-xl mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-[13px] font-medium rounded-lg transition-all whitespace-nowrap',
              activeTab === tab.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {tab.label}
            <span className={cn(
              'px-1.5 py-0.5 rounded-md text-[11px] font-semibold',
              activeTab === tab.value ? 'bg-[#0c4a6e]/10 text-[#0c4a6e]' : 'bg-gray-200/60 text-gray-500'
            )}>
              {tabCounts[tab.value]}
            </span>
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, service, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40 focus:bg-white transition-all"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((lead) => {
          const config = statusConfig[lead.status]
          const scoreInfo = getScoreColor(lead.score)

          return (
            <Card key={lead.id} hover className="group">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
                      {lead.customer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-gray-900">{lead.customer.name}</p>
                      <p className="text-[11px] text-gray-400">{lead.id} · {lead.source}</p>
                    </div>
                  </div>
                  <Badge variant={config.variant} className="text-[10px]">{config.label}</Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-[13px] text-gray-700">
                    <Tag className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                    <span className="font-medium">{lead.service}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-gray-500">
                    <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                    {lead.location}
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-gray-500">
                    <DollarSign className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                    {lead.budget}
                  </div>
                </div>

                <p className="text-[12px] text-gray-500 mb-4 line-clamp-2 leading-relaxed">{lead.description}</p>

                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                  <Target className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-medium text-gray-500">Lead Score</span>
                      <div className="flex items-center gap-1.5">
                        <span className={cn('text-[12px] font-bold', scoreInfo.text)}>{lead.score}%</span>
                        <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-md', scoreInfo.text, scoreInfo.bg)}>
                          {scoreInfo.label}
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', scoreInfo.bar)}
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{lead.customer.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{lead.customer.phone}</span>
                </div>

                {lead.status !== 'converted' && lead.status !== 'lost' && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {(lead.status === 'new' || lead.status === 'qualified') && (
                      <Button variant="outline" size="sm" className="h-8 text-[12px]">
                        <FileText className="h-3.5 w-3.5 mr-1.5" />
                        Send Quote
                      </Button>
                    )}
                    {lead.status === 'quoted' && (
                      <Button size="sm" className="h-8 text-[12px]"
                        style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
                        <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
                        Convert to Order
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="h-8 text-[12px]">
                      <Send className="h-3.5 w-3.5 mr-1.5" />
                      Contact
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-[12px] text-red-500 hover:text-red-600 hover:bg-red-50">
                      <XCircle className="h-3.5 w-3.5 mr-1.5" />
                      Mark Lost
                    </Button>
                  </div>
                )}

                {(lead.status === 'converted' || lead.status === 'lost') && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className={cn('text-[13px] font-medium', lead.status === 'converted' ? 'text-emerald-600' : 'text-gray-400')}>
                      {lead.status === 'converted' ? '✓ Successfully converted to order' : 'Lead marked as lost'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}

        {filtered.length === 0 && (
          <Card className="lg:col-span-2">
            <CardContent className="text-center py-16">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-7 w-7 text-gray-300" />
              </div>
              <p className="text-[14px] font-medium text-gray-500">No leads found</p>
              <p className="text-[12px] text-gray-400 mt-1">Try adjusting your search or filter</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
