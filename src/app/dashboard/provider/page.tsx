'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  Wrench, Users, FileText, DollarSign, ArrowUpRight,
  MapPin, Phone, Clock, ArrowRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const STATS = [
  { label: 'Active Services', value: '4', change: '+1', icon: Wrench, bg: 'bg-[#0c4a6e]' },
  { label: 'New Leads', value: '6', change: '+3', icon: Users, bg: 'bg-[#0d9488]' },
  { label: 'Quotes Sent', value: '12', change: '+4', icon: FileText, bg: 'bg-violet-500' },
  { label: 'Earnings (MTD)', value: 'R85,000', change: '+22%', icon: DollarSign, bg: 'bg-orange-500' },
]

const RECENT_LEADS = [
  { id: 'L-001', name: 'James Khumalo', service: 'Borehole Drilling', location: 'Pretoria, Gauteng', budget: 45000, phone: '+27 82 111 2233', time: '2 hours ago', status: 'new' },
  { id: 'L-002', name: 'Sarah Naidoo', service: 'Pump Installation', location: 'Durban North, KZN', budget: 15000, phone: '+27 83 444 5566', time: '5 hours ago', status: 'new' },
  { id: 'L-003', name: 'Willem Botha', service: 'Borehole Drilling', location: 'Stellenbosch, WC', budget: 55000, phone: '+27 84 777 8899', time: '1 day ago', status: 'quoted' },
  { id: 'L-004', name: 'Nomsa Mthembu', service: 'Maintenance & Repair', location: 'Bloemfontein, FS', budget: 8000, phone: '+27 72 333 4455', time: '1 day ago', status: 'new' },
]

export default function ProviderOverviewPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome back!</h1>
          <p className="text-gray-500 mt-1 text-[15px]">Here&apos;s your business overview.</p>
        </div>
        <Link href="/dashboard/provider/services">
          <Button size="sm" className="h-9 text-[13px]"
            style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
            <Wrench className="h-3.5 w-3.5 mr-1.5" /> Manage Services
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <Card key={stat.label} className="group hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</p>
                  <p className="text-[28px] font-bold text-gray-900 mt-1 tracking-tight">{stat.value}</p>
                </div>
                <div className={cn('p-2.5 rounded-xl', stat.bg)}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-50 rounded-md">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  <span className="text-[12px] font-semibold text-emerald-600">{stat.change}</span>
                </div>
                <span className="text-[12px] text-gray-400">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <h2 className="text-[15px] font-semibold text-gray-900">Recent Leads</h2>
            <p className="text-[12px] text-gray-400 mt-0.5">New customer inquiries</p>
          </div>
          <Link href="/dashboard/provider/leads">
            <Button variant="ghost" size="sm" className="h-8 text-[12px] text-[#0c4a6e]">
              View All <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-3">
            {RECENT_LEADS.map((lead) => (
              <div key={lead.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50/80 rounded-xl gap-3 hover:bg-gray-100/80 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1">
                    <p className="text-[14px] font-semibold text-gray-900">{lead.name}</p>
                    <Badge variant={lead.status === 'new' ? 'default' : lead.status === 'quoted' ? 'warning' : 'success'} className="text-[10px]">
                      {lead.status}
                    </Badge>
                  </div>
                  <p className="text-[13px] text-gray-600">{lead.service}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {lead.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {lead.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[14px] font-bold text-gray-900">R{lead.budget.toLocaleString()}</p>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400"><Phone className="h-3 w-3" /> {lead.phone}</span>
                  </div>
                  {lead.status === 'new' && (
                    <Link href="/dashboard/provider/quotes">
                      <Button size="sm" className="h-8 text-[12px]"
                        style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
                        Send Quote
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
