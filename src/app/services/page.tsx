'use client'

import { useState } from 'react'
import { Search, Filter, MapPin, Star, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SERVICE_CATEGORIES, PROVINCES } from '@/lib/constants'

const MOCK_SERVICES = [
  {
    id: '1',
    title: 'Professional Borehole Drilling',
    provider: 'AquaDrill Solutions',
    category: 'drilling',
    location: 'Gauteng',
    rating: 4.8,
    reviewCount: 124,
    priceType: 'per_meter',
    priceRange: { min: 350, max: 600 },
    description: 'Complete borehole drilling services for residential, commercial, and agricultural needs.',
    availability: true,
  },
  {
    id: '2',
    title: 'Pump Installation & Maintenance',
    provider: 'WaterPro Services',
    category: 'pump_installation',
    location: 'Western Cape',
    rating: 4.6,
    reviewCount: 89,
    priceType: 'quote',
    priceRange: { min: 2500, max: 15000 },
    description: 'Expert installation and maintenance of submersible and jet pumps.',
    availability: true,
  },
  {
    id: '3',
    title: 'Geophysical Survey',
    provider: 'GeoScan Africa',
    category: 'geophysics',
    location: 'KwaZulu-Natal',
    rating: 4.9,
    reviewCount: 56,
    priceType: 'fixed',
    priceRange: { min: 8000, max: 25000 },
    description: 'Professional geophysical surveys to identify optimal borehole locations.',
    availability: true,
  },
  {
    id: '4',
    title: 'Borehole Rehabilitation',
    provider: 'BoreFix Contractors',
    category: 'maintenance',
    location: 'Free State',
    rating: 4.5,
    reviewCount: 67,
    priceType: 'quote',
    priceRange: { min: 5000, max: 20000 },
    description: 'Rehabilitation and deepening of existing boreholes.',
    availability: true,
  },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')

  const filteredServices = MOCK_SERVICES.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || service.category === selectedCategory
    const matchesProvince = !selectedProvince || service.location === selectedProvince
    return matchesSearch && matchesCategory && matchesProvince
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Borehole Services</h1>
        <p className="text-gray-600 mt-2">Find trusted service providers for your project</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="">All Categories</option>
            {SERVICE_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
          >
            <option value="">All Provinces</option>
            {PROVINCES.map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
          <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory(''); setSelectedProvince('') }}>
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} hover>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant={service.availability ? 'success' : 'secondary'}>
                  {service.availability ? 'Available' : 'Unavailable'}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{service.rating}</span>
                  <span className="text-sm text-gray-500">({service.reviewCount})</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
              <p className="text-sm text-primary font-medium mb-2">{service.provider}</p>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {service.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {service.priceType === 'per_meter' ? 'Per meter' : service.priceType === 'fixed' ? 'Fixed price' : 'Get quote'}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-50 flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-gray-900">
                  R{service.priceRange.min.toLocaleString()}
                </span>
                {service.priceType !== 'fixed' && (
                  <span className="text-sm text-gray-500"> - R{service.priceRange.max.toLocaleString()}</span>
                )}
              </div>
              <Button size="sm">
                Get Quote <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No services found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
