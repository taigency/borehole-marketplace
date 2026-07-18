'use client'

import { useState } from 'react'
import { Plus, Edit2, MapPin, DollarSign, Eye, EyeOff, X, Check, Wrench } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SERVICE_CATEGORIES, PROVINCES } from '@/lib/constants'

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
  { id: '1', title: 'Professional Borehole Drilling', category: 'drilling', priceType: 'per_meter', priceRange: { min: 350, max: 600 }, coverageAreas: ['Gauteng', 'Mpumalanga', 'Limpopo'], description: 'Complete borehole drilling services for residential, commercial, and agricultural applications up to 200m depth.', available: true },
  { id: '2', title: 'Borehole Deepening & Rehabilitation', category: 'maintenance', priceType: 'quote', priceRange: { min: 5000, max: 25000 }, coverageAreas: ['Gauteng', 'North West'], description: 'Deepening of existing boreholes and rehabilitation of clogged or damaged boreholes.', available: true },
  { id: '3', title: 'Geophysical Water Survey', category: 'geophysics', priceType: 'fixed', priceRange: { min: 8000, max: 18000 }, coverageAreas: ['Gauteng', 'Free State', 'North West', 'Limpopo'], description: 'Resistivity and electromagnetic surveys to identify optimal drilling points.', available: true },
  { id: '4', title: 'Pump Installation & Commissioning', category: 'pump_installation', priceType: 'quote', priceRange: { min: 3500, max: 15000 }, coverageAreas: ['Gauteng'], description: 'Expert installation of submersible pumps including electrical connections and testing.', available: false },
]

const EMPTY_FORM = { title: '', category: '', priceType: 'quote', priceMin: '', priceMax: '', coverageAreas: [] as string[], description: '' }

export default function ProviderServicesPage() {
  const [services, setServices] = useState(INITIAL_SERVICES)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const openAddForm = () => {
    setForm(EMPTY_FORM)
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
      coverageAreas: service.coverageAreas,
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
        coverageAreas: form.coverageAreas,
        description: form.description,
      } : s))
    } else {
      const newService: ProviderService = {
        id: String(Date.now()),
        title: form.title,
        category: form.category,
        priceType: form.priceType,
        priceRange: { min: Number(form.priceMin) || 0, max: Number(form.priceMax) || 0 },
        coverageAreas: form.coverageAreas,
        description: form.description,
        available: true,
      }
      setServices(prev => [...prev, newService])
    }
    setShowForm(false)
    setForm(EMPTY_FORM)
    setEditId(null)
  }

  const toggleCoverage = (prov: string) => {
    setForm(f => ({
      ...f,
      coverageAreas: f.coverageAreas.includes(prov)
        ? f.coverageAreas.filter(p => p !== prov)
        : [...f.coverageAreas, prov]
    }))
  }

  const getCategoryLabel = (id: string) => SERVICE_CATEGORIES.find(c => c.id === id)?.label || id

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
          <p className="text-gray-600 mt-1">{services.length} services listed</p>
        </div>
        <Button onClick={openAddForm}>
          <Plus className="h-4 w-4 mr-2" /> Add Service
        </Button>
      </div>

      {/* Service Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowForm(false)} />
          <Card className="relative z-10 w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">{editId ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={() => setShowForm(false)}><X className="h-5 w-5 text-gray-400" /></button>
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="e.g., Professional Borehole Drilling"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                >
                  <option value="">Select category</option>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Describe your service..."
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pricing Type</label>
                  <select
                    value={form.priceType}
                    onChange={(e) => setForm(f => ({ ...f, priceType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
                  >
                    <option value="quote">Get Quote</option>
                    <option value="fixed">Fixed</option>
                    <option value="per_meter">Per Meter</option>
                    <option value="hourly">Hourly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price (ZAR)</label>
                  <input
                    type="number"
                    value={form.priceMin}
                    onChange={(e) => setForm(f => ({ ...f, priceMin: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
                    placeholder="e.g., 350"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price (ZAR)</label>
                  <input
                    type="number"
                    value={form.priceMax}
                    onChange={(e) => setForm(f => ({ ...f, priceMax: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
                    placeholder="e.g., 600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Areas</label>
                <div className="flex flex-wrap gap-2">
                  {PROVINCES.map((prov) => (
                    <button
                      key={prov}
                      type="button"
                      onClick={() => toggleCoverage(prov)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        form.coverageAreas.includes(prov)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={!form.title || !form.category}>
                <Check className="h-4 w-4 mr-2" /> {editId ? 'Save Changes' : 'Add Service'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id} hover>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Wrench className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary">{getCategoryLabel(service.category)}</Badge>
                </div>
                <Badge variant={service.available ? 'success' : 'warning'}>
                  {service.available ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {service.priceType === 'quote' ? 'Get Quote' : service.priceType === 'per_meter' ? `R${service.priceRange.min} - R${service.priceRange.max}/m` : `R${service.priceRange.min} - R${service.priceRange.max}`}
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {service.coverageAreas.map((area) => (
                  <span key={area} className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    <MapPin className="h-3 w-3" /> {area}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-50 flex items-center justify-between">
              <Button variant="outline" size="sm" onClick={() => openEditForm(service)}>
                <Edit2 className="h-3.5 w-3.5 mr-1.5" /> Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => toggleAvailability(service.id)}>
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