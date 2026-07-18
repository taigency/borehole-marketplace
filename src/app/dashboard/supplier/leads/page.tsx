'use client'

import { useState } from 'react'
import {
  Search, MapPin, DollarSign, UserCheck, Phone,
  Mail, ChevronDown, Tag, Clock, Target,
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
    id: 'LEAD-1021',
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
    id: 'LEAD-1020',
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
    id: 'LEAD-1019',
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
    id: 'LEAD-1018',
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
    id: 'LEAD-1017',
    customer: { name: 'David Motaung', email: 'david@buildit.co.za', phone: '+27 84 222 3344' },
    service: 'Borehole Drilling',
    location: 'Johannesburg, Gauteng',
    budget: 'R60,000 - R100,000',
    status: 'converted',
    score: 95,
    date: '2026-07-15',
    source: 'Trade Show',
    description: 'Twin borehole project for industrial water supply. Converted to ORD-2845.',
  },
  {
    id: 'LEAD-1016',
    customer: { name: 'Nomsa Dlamini', email: 'nomsa@ecoestate.co.za', phone: '+27 72 444 5566' },
    service: 'Pump Installation',
    location: 'Mpumalanga',
    budget: 'R10,000 - R18,000',
    status: 'lost',
    score: 25,
    date: '2026-07-14',
    source: 'Cold Call',
    description: 'Budget constraints, went with another provider.',
  },
  {
    id: 'LEAD-1015',
    customer: { name: 'Johan Erasmus', email: 'jo@erasmusmining.co.za', phone: '+27 85 666 7788' },
    service: 'Borehole Rehabilitation',
    location: 'Limpopo',
    budget: 'R30,000 - R50,000',
    status: 'qualified',
    score: 78,
    date: '2026-07-13',
    source: 'Website',
    description: 'Rehabilitation of 3 old boreholes at mining site. Need re-development and new pump installation.',
  },
  {
    id: 'LEAD-1014',
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
  new: { label: 'New', variant: 'default' as const, color: 'bg-blue-500' },
  qualified: { label: 'Qualified', variant: 'success' as const, color: 'bg-green-500' },
  quoted: { label: 'Quoted', variant: 'warning' as const, color: 'bg-yellow-500' },
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
    if (score >= 80) return { bar: 'bg-green-500', text: 'text-green-600', label: 'Hot' }
    if (score >= 60) return { bar: 'bg-yellow-500', text: 'text-yellow-600', label: 'Warm' }
    return { bar: 'bg-red-500', text: 'text-red-600', label: 'Cold' }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="text-gray-600 mt-1">Track and convert potential customers</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg mb-6 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
              activeTab === tab.value
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            {tab.label}
            <span className={cn(
              'px-1.5 py-0.5 rounded-full text-xs font-medium',
              activeTab === tab.value ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-600'
            )}>
              {tabCounts[tab.value]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, service, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        />
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((lead) => {
          const config = statusConfig[lead.status]
          const scoreInfo = getScoreColor(lead.score)

          return (
            <Card key={lead.id} hover>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {lead.customer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{lead.customer.name}</p>
                      <p className="text-xs text-gray-500">{lead.id} • {lead.source}</p>
                    </div>
                  </div>
                  <Badge variant={config.variant}>{config.label}</Badge>
                </div>

                {/* Service & Location */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Tag className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="font-medium">{lead.service}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    {lead.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    {lead.budget}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    {formatDate(lead.date)}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{lead.description}</p>

                {/* Lead Score */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <Target className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600">Lead Score</span>
                      <div className="flex items-center gap-1">
                        <span className={cn('text-xs font-bold', scoreInfo.text)}>{lead.score}%</span>
                        <span className={cn('text-xs font-medium px-1.5 py-0.5 rounded', scoreInfo.text, lead.score >= 80 ? 'bg-green-100' : lead.score >= 60 ? 'bg-yellow-100' : 'bg-red-100')}>
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

                {/* Contact */}
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{lead.customer.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{lead.customer.phone}</span>
                </div>

                {/* Actions */}
                {lead.status !== 'converted' && lead.status !== 'lost' && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    {lead.status === 'new' && (
                      <Button variant="outline" size="sm">
                        <UserCheck className="h-3.5 w-3.5 mr-1.5" />
                        Assign
                      </Button>
                    )}
                    {(lead.status === 'new' || lead.status === 'qualified') && (
                      <Button variant="outline" size="sm">
                        <FileText className="h-3.5 w-3.5 mr-1.5" />
                        Send Quote
                      </Button>
                    )}
                    {lead.status === 'quoted' && (
                      <Button size="sm">
                        <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
                        Convert to Order
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Send className="h-3.5 w-3.5 mr-1.5" />
                      Contact
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                      <XCircle className="h-3.5 w-3.5 mr-1.5" />
                      Mark Lost
                    </Button>
                  </div>
                )}

                {(lead.status === 'converted' || lead.status === 'lost') && (
                  <div className="pt-4 border-t border-gray-100">
                    <p className={cn('text-sm font-medium', lead.status === 'converted' ? 'text-green-600' : 'text-gray-500')}>
                      {lead.status === 'converted' ? 'Successfully converted to order' : 'Lead marked as lost'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}

        {filtered.length === 0 && (
          <Card className="lg:col-span-2">
            <CardContent className="text-center py-12">
              <UserCheck className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No leads found</p>
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}