'use client'

import { useState } from 'react'
import {
  Plus, Edit2, MapPin, DollarSign, Eye, EyeOff, X, Check, Wrench,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface ProviderService {
  id: string
  title: string
  category: string
  priceType: string
  priceRange: { min: number; max: number }
  coverageAreas: string[]
  description: string
  available: boolean
}

const INITIAL_SERVICES: ProviderService[] = [
  {
    id: '1',
    title: 'Professional Borehole Drilling',
    category: 'Drilling',
    priceType: 'per_meter',
    priceRange: { min: 350, max: 600 },
    coverageAreas: ['Gauteng', 'Mpumalanga', 'Limpopo'],
    description: 'Complete borehole drilling services for residential, commercial, and agricultural applications up to 200m depth.',
    available: true,
  },
  {
    id: '2',
    title: 'Borehole Deepening & Rehabilitation',
    category: 'Maintenance',
    priceType: 'quote',
    priceRange: { min: 5000, max: 25000 },
    coverageAreas: ['Gauteng', 'North West'],
    description: 'Deepening of existing boreholes and rehabilitation of clogged or damaged boreholes.',
    available: true,
  },
  {
    id: '3',
    title: 'Geophysical Water Survey',
    category: 'Geophysics',
    priceType: 'fixed',
    priceRange: { min: 8000, max: 18000 },
    coverageAreas: ['Gauteng', 'Free State', 'North West', 'Limpopo'],
    description: 'Resistivity and electromagnetic surveys to identify optimal drilling points.',
    available: true,
  },
  {
    id: '4',
    title: 'Pump Installation & Commissioning',
    category: 'Pump Installation',
    priceType: 'quote',
    priceRange: { min: 3500, max: 15000 },
    coverageAreas: ['Gauteng'],
    description: 'Expert installation of submersible pumps including electrical connections and testing.',
    available: false,
  },
]

export default function ProviderServicesPage() {
  const [services, setServices] = useState(INITIAL_SERVICES)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({
    title: '', category: '', priceType: 'quote',
    priceMin: '', priceMax: '', description: '',
  })

  const openAddForm = () => {
    setForm({ title: '', category: '', priceType: 'quote', priceMin: '', priceMax: '', description: '' })
    setEditId(null)
    setShowForm(true)
  }

  const openEditForm = (service: ProviderService) => {
    setForm({
      title: service.title,
      category: service.category,
      priceType: service.priceType,
      priceMin: String(service.priceRange.min),
      priceMax: String(service.priceRange.max),
      description: service.description,
    })
    setEditId(service.id)
    setShowForm(true)
  }

  const toggleAvailability = (id: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, available: !s.available } : s))
  }

  const handleSave = () => {
    if (!form.title || !form.category) return
    if (editId) {
      setServices(prev => prev.map(s => s.id === editId ? {
        ...s,
        title: form.title,
        category: form.category,
        priceType: form.priceType,
        priceRange: { min: Number(form.priceMin) || 0, max: Number(form.priceMax) || 0 },
        description: form.description,
      } : s))
    } else {
      const newService: ProviderService = {
        id: String(Date.now()),
        title: form.title,
        category: form.category,
        priceType: form.priceType,
        priceRange: { min: Number(form.priceMin) || 0, max: Number(form.priceMax) || 0 },
        description: form.description,
        available: true,
        coverageAreas: ['Gauteng'],
      }
      setServices(prev => [...prev, newService])
    }
    setShowForm(false)
    setForm({ title: '', category: '', priceType: 'quote', priceMin: '', priceMax: '', description: '' })
    setEditId(null)
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Services</h1>
          <p className="text-gray-500 mt-1 text-[14px]">{services.length} services listed</p>
        </div>
        <Button onClick={openAddForm} className="h-9 text-[13px]"
          style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
          <Plus className="h-4 w-4 mr-1.5" /> Add Service
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <Card className="relative z-10 w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto rounded-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-[16px] font-semibold text-gray-900">{editId ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Service Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40"
                  placeholder="e.g., Professional Borehole Drilling"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40"
                >
                  <option value="">Select category</option>
                  {['Drilling', 'Maintenance', 'Geophysics', 'Pump Installation', 'Water Treatment'].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40 resize-none"
                  placeholder="Describe your service..."
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Pricing</label>
                  <select
                    value={form.priceType}
                    onChange={(e) => setForm(f => ({ ...f, priceType: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40"
                  >
                    <option value="quote">Get Quote</option>
                    <option value="fixed">Fixed</option>
                    <option value="per_meter">Per Meter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Min (ZAR)</label>
                  <input
                    type="number"
                    value={form.priceMin}
                    onChange={(e) => setForm(f => ({ ...f, priceMin: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40"
                    placeholder="350"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Max (ZAR)</label>
                  <input
                    type="number"
                    value={form.priceMax}
                    onChange={(e) => setForm(f => ({ ...f, priceMax: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40"
                    placeholder="600"
                  />
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
              <Button variant="outline" size="sm" onClick={() => setShowForm(false)} className="h-9 text-[13px]">Cancel</Button>
              <Button size="sm" onClick={handleSave} disabled={!form.title || !form.category} className="h-9 text-[13px]"
                style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
                <Check className="h-4 w-4 mr-1.5" /> {editId ? 'Save Changes' : 'Add Service'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map((service) => (
          <Card key={service.id} hover className="group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#0c4a6e]/5 rounded-lg">
                    <Wrench className="h-4 w-4 text-[#0c4a6e]" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{service.category}</Badge>
                </div>
                <Badge variant={service.available ? 'success' : 'warning'} className="text-[10px]">
                  {service.available ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-[12px] text-gray-500 mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
              <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mb-3">
                <DollarSign className="h-3.5 w-3.5" />
                {service.priceType === 'quote' ? 'Get Quote' : service.priceType === 'per_meter' ? `R${service.priceRange.min} - R${service.priceRange.max}/m` : `R${service.priceRange.min} - R${service.priceRange.max}`}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {service.coverageAreas.map((area) => (
                  <span key={area} className="flex items-center gap-1 text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                    <MapPin className="h-3 w-3" /> {area}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-50/50 flex items-center justify-between border-t border-gray-100">
              <Button variant="outline" size="sm" className="h-8 text-[12px]" onClick={() => openEditForm(service)}>
                <Edit2 className="h-3.5 w-3.5 mr-1.5" /> Edit
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-[12px]" onClick={() => toggleAvailability(service.id)}>
                {service.available ? (
                  <><EyeOff className="h-3.5 w-3.5 mr-1.5" /> Set Unavailable</>
                ) : (
                  <><Eye className="h-3.5 w-3.5 mr-1.5" /> Set Available</>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
