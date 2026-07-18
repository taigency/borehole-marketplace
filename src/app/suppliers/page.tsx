'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Star, Package, ArrowRight, Building2, CheckCircle2, X, ChevronDown, Phone, Mail, ExternalLink, Shield, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PRODUCT_CATEGORIES, PROVINCES } from '@/lib/constants'

const MOCK_SUPPLIERS = [
  {
    id: '1',
    companyName: 'PumpTech SA',
    tagline: 'Leading supplier of submersible pumps, controllers, and water systems',
    description: 'PumpTech SA is South Africa\'s premier supplier of Grundfos, Franklin Electric, and DAB submersible pumps. Serving the borehole industry since 2019 with nationwide delivery and expert technical support.',
    categories: ['pumps', 'controllers'],
    location: 'Gauteng',
    city: 'Johannesburg',
    rating: 4.7,
    reviewCount: 156,
    verified: true,
    productCount: 89,
    responseTime: '< 2 hours',
    yearEstablished: 2019,
    gradient: 'from-blue-500 to-cyan-400',
    initials: 'PT',
    specialties: ['Grundfos Pumps', 'Franklin Motors', 'Solar Pump Systems'],
  },
  {
    id: '2',
    companyName: 'Borehole Supplies Co',
    tagline: 'Complete range of borehole casings, screens, and drilling accessories',
    description: 'Borehole Supplies Co stocks everything you need for borehole construction and completion. From uPVC casings to HDPE pipes, we supply contractors and DIY borehole owners across South Africa.',
    categories: ['casings', 'bits', 'accessories', 'pipes'],
    location: 'Western Cape',
    city: 'Cape Town',
    rating: 4.5,
    reviewCount: 98,
    verified: true,
    productCount: 145,
    responseTime: '< 4 hours',
    yearEstablished: 2017,
    gradient: 'from-emerald-500 to-green-400',
    initials: 'BS',
    specialties: ['uPVC Casings', 'HDPE Pipes', 'Drilling Accessories'],
  },
  {
    id: '3',
    companyName: 'AquaStore Solutions',
    tagline: 'Water storage solutions including tanks, reservoirs, and treatment systems',
    description: 'AquaStore Solutions specialises in JoJo tanks, water treatment systems, and borehole accessories. We help South Africans store and treat their borehole water safely and efficiently.',
    categories: ['tanks', 'filters'],
    location: 'KwaZulu-Natal',
    city: 'Durban',
    rating: 4.8,
    reviewCount: 67,
    verified: true,
    productCount: 52,
    responseTime: '< 1 hour',
    yearEstablished: 2018,
    gradient: 'from-violet-500 to-purple-400',
    initials: 'AS',
    specialties: ['JoJo Tanks', 'Water Treatment', 'Filtration Systems'],
  },
  {
    id: '4',
    companyName: 'DrillPro Equipment',
    tagline: 'Professional drilling equipment, bits, and accessories for all ground conditions',
    description: 'DrillPro Equipment supplies professional-grade drilling equipment to contractors across South Africa. From PDC bits to tricone rollers, we have the right tool for every formation.',
    categories: ['bits', 'accessories'],
    location: 'Mpumalanga',
    city: 'Mbombela',
    rating: 4.4,
    reviewCount: 43,
    verified: false,
    productCount: 78,
    responseTime: '< 6 hours',
    yearEstablished: 2020,
    gradient: 'from-amber-500 to-orange-400',
    initials: 'DP',
    specialties: ['PDC Bits', 'Tricone Bits', 'Drill Rods'],
  },
  {
    id: '5',
    companyName: 'WaterWorks Pro',
    tagline: 'Professional water testing, monitoring equipment, and consulting services',
    description: 'WaterWorks Pro provides water quality testing equipment, level meters, and monitoring solutions. Trusted by hydrogeologists and borehole owners across South Africa.',
    categories: ['accessories', 'filters'],
    location: 'Free State',
    city: 'Bloemfontein',
    rating: 4.6,
    reviewCount: 72,
    verified: true,
    productCount: 63,
    responseTime: '< 3 hours',
    yearEstablished: 2016,
    gradient: 'from-rose-500 to-pink-400',
    initials: 'WW',
    specialties: ['Water Level Meters', 'Testing Kits', 'Monitoring Systems'],
  },
  {
    id: '6',
    companyName: 'BoreParts Direct',
    tagline: 'Affordable borehole parts and accessories delivered nationwide',
    description: 'BoreParts Direct offers affordable borehole parts with fast nationwide delivery. From seal kits to centralizers, we keep your borehole project on budget.',
    categories: ['accessories'],
    location: 'Gauteng',
    city: 'Pretoria',
    rating: 4.3,
    reviewCount: 51,
    verified: false,
    productCount: 91,
    responseTime: '< 4 hours',
    yearEstablished: 2021,
    gradient: 'from-indigo-500 to-blue-400',
    initials: 'BD',
    specialties: ['Seal Kits', 'Centralizers', 'Adapters & Fittings'],
  },
]

const SORT_OPTIONS = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'products', label: 'Most Products' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'name', label: 'Name A-Z' },
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

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState('rating')

  const filtered = MOCK_SUPPLIERS.filter((supplier) => {
    const matchesSearch = supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.tagline.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || supplier.categories.includes(selectedCategory)
    const matchesProvince = !selectedProvince || supplier.location === selectedProvince
    const matchesVerified = !verifiedOnly || supplier.verified
    return matchesSearch && matchesCategory && matchesProvince && matchesVerified
  }).sort((a, b) => {
    switch (sortBy) {
      case 'products': return b.productCount - a.productCount
      case 'reviews': return b.reviewCount - a.reviewCount
      case 'name': return a.companyName.localeCompare(b.companyName)
      default: return b.rating - a.rating
    }
  })

  const hasFilters = searchTerm || selectedCategory || selectedProvince || verifiedOnly

  const clearFilters = () => {
    setSearchTerm(''); setSelectedCategory(''); setSelectedProvince(''); setVerifiedOnly(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <p className="text-emerald-200 text-sm font-medium mb-2">Trusted Borehole Equipment Suppliers</p>
            <h1 className="text-4xl font-bold mb-3">Supplier Directory</h1>
            <p className="text-emerald-100 text-lg">Find verified suppliers for borehole equipment and parts across South Africa</p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search suppliers by name, specialty, or location..."
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
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Building2, label: 'Total Suppliers', value: MOCK_SUPPLIERS.length, color: 'text-blue-600 bg-blue-50' },
            { icon: Shield, label: 'Verified', value: MOCK_SUPPLIERS.filter(s => s.verified).length, color: 'text-green-600 bg-green-50' },
            { icon: Package, label: 'Total Products', value: MOCK_SUPPLIERS.reduce((sum, s) => sum + s.productCount, 0), color: 'text-purple-600 bg-purple-50' },
            { icon: Users, label: 'Total Reviews', value: MOCK_SUPPLIERS.reduce((sum, s) => sum + s.reviewCount, 0), color: 'text-amber-600 bg-amber-50' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', color)}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="">All Categories</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-10 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="">All Provinces</option>
              {PROVINCES.map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={cn(
              'px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2',
              verifiedOnly
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-600'
            )}
          >
            <Shield className="h-4 w-4" />
            Verified Only
          </button>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-1"
            >
              <X className="h-4 w-4" /> Clear Filters
            </button>
          )}

          <span className="ml-auto text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{filtered.length}</span> suppliers
          </span>
        </div>

        {/* Supplier Cards */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-900 font-semibold mb-1">No suppliers found</p>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((supplier) => (
              <div
                key={supplier.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden"
              >
                {/* Header with gradient */}
                <div className={cn('bg-gradient-to-r p-6 text-white', supplier.gradient)}>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0">
                      {supplier.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-xl flex items-center gap-2">
                            {supplier.companyName}
                            {supplier.verified && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                                <CheckCircle2 className="h-3 w-3" /> Verified
                              </span>
                            )}
                          </h3>
                          <p className="text-white/80 text-sm mt-0.5">{supplier.tagline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-1">
                          <StarRating rating={supplier.rating} />
                          <span className="text-sm font-semibold">{supplier.rating}</span>
                        </div>
                        <span className="text-white/60 text-sm">({supplier.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{supplier.description}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {supplier.specialties.map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-gray-50 text-xs text-gray-600 rounded-lg font-medium">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-lg font-bold text-gray-900">{supplier.productCount}</p>
                      <p className="text-xs text-gray-500">Products</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-lg font-bold text-gray-900">{supplier.responseTime}</p>
                      <p className="text-xs text-gray-500">Response</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-lg font-bold text-gray-900">{supplier.yearEstablished}</p>
                      <p className="text-xs text-gray-500">Established</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {supplier.city}, {supplier.location}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                  <Link href={`/products?supplier=${supplier.id}`}>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 rounded-xl">
                      View Products <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Are You a Borehole Supplier?</h2>
          <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
            Join BoreHub and reach thousands of customers looking for borehole equipment and services. List your products for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg rounded-xl px-8">
              <Building2 className="h-4 w-4 mr-2" /> Register as Supplier
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8">
              Learn More <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
