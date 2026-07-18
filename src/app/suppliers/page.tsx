'use client'

import { useState } from 'react'
import { Search, MapPin, Star, Package, ArrowRight, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PRODUCT_CATEGORIES, PROVINCES } from '@/lib/constants'

const MOCK_SUPPLIERS = [
  {
    id: '1',
    companyName: 'PumpTech SA',
    description: 'Leading supplier of submersible pumps, controllers, and water systems.',
    categories: ['pumps', 'controllers'],
    location: 'Gauteng',
    rating: 4.7,
    reviewCount: 156,
    verified: true,
    productCount: 89,
  },
  {
    id: '2',
    companyName: 'Borehole Supplies Co',
    description: 'Complete range of borehole casings, screens, and drilling accessories.',
    categories: ['casings', 'bits', 'accessories'],
    location: 'Western Cape',
    rating: 4.5,
    reviewCount: 98,
    verified: true,
    productCount: 145,
  },
  {
    id: '3',
    companyName: 'AquaStore Solutions',
    description: 'Water storage solutions including tanks, reservoirs, and treatment systems.',
    categories: ['tanks', 'filters'],
    location: 'KwaZulu-Natal',
    rating: 4.8,
    reviewCount: 67,
    verified: true,
    productCount: 52,
  },
  {
    id: '4',
    companyName: 'DrillPro Equipment',
    description: 'Professional drilling equipment, bits, and accessories for all ground conditions.',
    categories: ['bits', 'accessories'],
    location: 'Mpumalanga',
    rating: 4.4,
    reviewCount: 43,
    verified: false,
    productCount: 78,
  },
]

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')

  const filteredSuppliers = MOCK_SUPPLIERS.filter((supplier) => {
    const matchesSearch = supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || supplier.categories.includes(selectedCategory)
    const matchesProvince = !selectedProvince || supplier.location === selectedProvince
    return matchesSearch && matchesCategory && matchesProvince
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Suppliers Directory</h1>
        <p className="text-gray-600 mt-2">Find verified suppliers for borehole equipment and parts</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
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
            {PRODUCT_CATEGORIES.map((cat) => (
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} hover>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {supplier.companyName}
                        {supplier.verified && (
                          <Badge variant="success">Verified</Badge>
                        )}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <MapPin className="h-3 w-3" />
                        {supplier.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{supplier.rating}</span>
                      <span className="text-sm text-gray-500">({supplier.reviewCount})</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{supplier.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {supplier.categories.map((cat) => (
                      <Badge key={cat} variant="secondary">
                        {PRODUCT_CATEGORIES.find(c => c.id === cat)?.label || cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Package className="h-4 w-4" />
                {supplier.productCount} products
              </div>
              <Button size="sm">
                View Products <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No suppliers found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
