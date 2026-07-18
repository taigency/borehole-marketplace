'use client'

import Link from 'next/link'
import { Wrench, Users, FileText, DollarSign, ArrowUpRight, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const STATS = [
  { label: 'Active Services', value: '4', change: '+1', trend: 'up', icon: Wrench },
  { label: 'New Leads', value: '12', change: '+5', trend: 'up', icon: Users },
  { label: 'Quotes Sent', value: '8', change: '+3', trend: 'up', icon: FileText },
  { label: 'Earnings (This Month)', value: 'R42,500', change: '+18%', trend: 'up', icon: DollarSign },
]

const RECENT_LEADS = [
  { id: 'L-001', name: 'James Khumalo', service: 'Borehole Drilling', location: 'Pretoria, Gauteng', budget: 45000, phone: '+27 82 111 2233', time: '2 hours ago', status: 'new' },
  { id: 'L-002', name: 'Sarah Naidoo', service: 'Pump Installation', location: 'Durban North, KZN', budget: 15000, phone: '+27 83 444 5566', time: '5 hours ago', status: 'new' },
  { id: 'L-003', name: 'Willem Botha', service: 'Borehole Drilling', location: 'Stellenbosch, WC', budget: 55000, phone: '+27 84 777 8899', time: '1 day ago', status: 'quoted' },
  { id: 'L-004', name: 'Nomsa Mthembu', service: 'Maintenance & Repair', location: 'Bloemfontein, FS', budget: 8000, phone: '+27 72 333 4455', time: '1 day ago', status: 'new' },
]

export default function ProviderOverviewPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s your overview.</p>
        </div>
        <Link href="/dashboard/provider/services">
          <Button size="sm">
            <Wrench className="h-4 w-4 mr-2" /> Manage Services
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
          <Link href="/dashboard/provider/leads">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {RECENT_LEADS.map((lead) => (
              <div key={lead.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900">{lead.name}</p>
                    <Badge variant={lead.status === 'new' ? 'default' : lead.status === 'quoted' ? 'warning' : 'success'}>
                      {lead.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{lead.service}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {lead.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {lead.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">R{lead.budget.toLocaleString()}</p>
                    <span className="flex items-center gap-1 text-xs text-gray-500"><Phone className="h-3 w-3" /> {lead.phone}</span>
                  </div>
                  {lead.status === 'new' && (
                    <Link href="/dashboard/provider/quotes">
                      <Button size="sm">Send Quote</Button>
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