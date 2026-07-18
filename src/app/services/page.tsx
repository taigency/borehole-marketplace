'use client'

import { useState } from 'react'
import { Search, MapPin, Star, Clock, ArrowRight, Wrench, Droplets, Compass, RefreshCw, BookOpen, FlaskConical, X, ChevronDown, Phone, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
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
    priceUnit: '/m',
    description: 'Complete borehole drilling services for residential, commercial, and agricultural needs. Using modern rotary drilling rigs capable of reaching depths of 200m+.',
    availability: true,
    icon: Droplets,
    gradient: 'from-blue-500 to-cyan-400',
    features: ['Residential & Commercial', 'Up to 200m depth', 'All formations'],
  },
  {
    id: '2',
    title: 'Pump Installation & Repair',
    provider: 'WaterPro Services',
    category: 'pump_installation',
    location: 'Western Cape',
    rating: 4.6,
    reviewCount: 89,
    priceType: 'quote',
    priceRange: { min: 2500, max: 15000 },
    priceUnit: '',
    description: 'Expert installation and maintenance of submersible and jet pumps. From sizing to commissioning, we handle the complete pump system installation.',
    availability: true,
    icon: Wrench,
    gradient: 'from-violet-500 to-purple-400',
    features: ['Submersible & Jet Pumps', 'Emergency repairs', 'System sizing'],
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
    priceUnit: '',
    description: 'Professional geophysical surveys to identify optimal borehole locations. Using resistivity and electromagnetic methods for accurate groundwater detection.',
    availability: true,
    icon: Compass,
    gradient: 'from-emerald-500 to-green-400',
    features: ['Resistivity surveys', 'EM methods', 'Detailed reports'],
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
    priceUnit: '',
    description: 'Rehabilitation and deepening of existing boreholes. We restore yield and water quality using proven techniques including surging, acidizing, and redevelopment.',
    availability: true,
    icon: RefreshCw,
    gradient: 'from-amber-500 to-orange-400',
    features: ['Yield restoration', 'Deepening', 'Re-development'],
  },
  {
    id: '5',
    title: 'Hydrogeological Consulting',
    provider: 'AquaConsult SA',
    category: 'consulting',
    location: 'Gauteng',
    rating: 4.7,
    reviewCount: 43,
    priceType: 'per_hour',
    priceRange: { min: 500, max: 500 },
    priceUnit: '/hr',
    description: 'Expert hydrogeological consulting for water resource assessment, borehole siting, and regulatory compliance. SANS 10299 compliant assessments.',
    availability: true,
    icon: BookOpen,
    gradient: 'from-rose-500 to-pink-400',
    features: ['Water resource assessment', 'SANS compliance', 'Report writing'],
  },
  {
    id: '6',
    title: 'Water Quality Testing',
    provider: 'LabWater Africa',
    category: 'consulting',
    location: 'All Provinces',
    rating: 4.8,
    reviewCount: 112,
    priceType: 'fixed',
    priceRange: { min: 1500, max: 3000 },
    priceUnit: '',
    description: 'Comprehensive water quality testing and analysis for borehole water. SANS 241 compliant testing with detailed laboratory reports and recommendations.',
    availability: true,
    icon: FlaskConical,
    gradient: 'from-sky-500 to-blue-400',
    features: ['SANS 241 compliant', 'Full spectrum analysis', 'Fast turnaround'],
  },
]

const SORT_OPTIONS = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'reviews', label: 'Most Reviewed' },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={cn('h-3.5 w-3.5', s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200')} />
      ))}
    </div>
  )
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  const filtered = MOCK_SERVICES.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || service.category === selectedCategory
    const matchesProvince = !selectedProvince || service.location === selectedProvince || service.location === 'All Provinces'
    return matchesSearch && matchesCategory && matchesProvince
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price_asc': return a.priceRange.min - b.priceRange.min
      case 'price_desc': return b.priceRange.min - a.priceRange.min
      case 'reviews': return b.reviewCount - a.reviewCount
      default: return b.rating - a.rating
    }
  })

  const hasFilters = searchTerm || selectedCategory || selectedProvince

  const clearFilters = () => {
    setSearchTerm(''); setSelectedCategory(''); setSelectedProvince('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-700 to-violet-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <p className="text-indigo-200 text-sm font-medium mb-2">Professional Borehole Services</p>
            <h1 className="text-4xl font-bold mb-3">Services Marketplace</h1>
            <p className="text-indigo-100 text-lg">Connect with trusted borehole professionals across South Africa</p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for drilling, pump installation, surveys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 bg-white shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none text-sm"
                />
              </div>
              <div className="relative hidden sm:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3.5 pr-10 rounded-xl text-gray-900 bg-white shadow-lg focus:ring-2 focus:ring-white/50 focus:outline-none text-sm min-w-[180px]"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('')}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              !selectedCategory ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
            )}
          >
            All Services
          </button>
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedCategory === cat.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative">
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            >
              <option value="">All Provinces</option>
              {PROVINCES.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1"
            >
              <X className="h-4 w-4" /> Clear Filters
            </button>
          )}

          <span className="ml-auto text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{filtered.length}</span> services found
          </span>
        </div>

        {/* Service Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-900 font-semibold mb-1">No services found</p>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={cn('w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-lg', service.gradient)}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-sm font-medium text-indigo-600">{service.provider}</p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <StarRating rating={service.rating} />
                            <span className="text-sm font-semibold text-gray-900">{service.rating}</span>
                            <span className="text-xs text-gray-400">({service.reviewCount})</span>
                          </div>
                        </div>

                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{service.description}</p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {service.features.map((f) => (
                            <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 text-xs text-gray-600 rounded-lg">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              {f}
                            </span>
                          ))}
                        </div>

                        {/* Location & Availability */}
                        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {service.location}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-gray-400" />
                            {service.priceType === 'per_meter' ? 'Per meter' : service.priceType === 'per_hour' ? 'Per hour' : service.priceType === 'fixed' ? 'Fixed price' : 'Get quote'}
                          </div>
                          {service.availability && (
                            <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                              Available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        R{service.priceRange.min.toLocaleString('en-ZA')}
                      </span>
                      {service.priceRange.min !== service.priceRange.max && (
                        <span className="text-sm text-gray-500"> - R{service.priceRange.max.toLocaleString('en-ZA')}{service.priceUnit}</span>
                      )}
                      {service.priceType === 'per_meter' && (
                        <span className="text-sm text-gray-500">/m</span>
                      )}
                      {service.priceType === 'per_hour' && (
                        <span className="text-sm text-gray-500">/hr</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 rounded-xl">
                        Get Quote <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Need a Custom Service?</h2>
          <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
            Can&apos;t find what you need? Post your requirement and let verified service providers come to you with competitive quotes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg rounded-xl px-8">
              Post a Requirement
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8">
              <Phone className="h-4 w-4 mr-2" /> Call Us: 0800 BOREHOLE
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
