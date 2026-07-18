'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, Star, ShoppingCart, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { PRODUCT_CATEGORIES, PROVINCES } from '@/lib/constants'

const MOCK_PRODUCTS = [
  { id: '1', name: 'Grundfos SP 30-8 Submersible Pump', supplier: 'PumpTech SA', category: 'pumps', price: 18500, rating: 4.8, reviews: 42, location: 'Gauteng', image: null, inStock: true },
  { id: '2', name: '110mm uPVC Borehole Casing (6m)', supplier: 'Borehole Supplies Co', category: 'casings', price: 890, rating: 4.6, reviews: 31, location: 'Western Cape', image: null, inStock: true },
  { id: '3', name: 'PDC Drag Bit 152mm', supplier: 'DrillPro Equipment', category: 'bits', price: 4200, rating: 4.4, reviews: 18, location: 'Mpumalanga', image: null, inStock: true },
  { id: '4', name: '5000L JoJo Water Tank', supplier: 'AquaStore Solutions', category: 'tanks', price: 6750, rating: 4.9, reviews: 87, location: 'KwaZulu-Natal', image: null, inStock: true },
  { id: '5', name: '50mm HDPE Pipe (100m Roll)', supplier: 'Borehole Supplies Co', category: 'pipes', price: 2340, rating: 4.5, reviews: 24, location: 'Western Cape', image: null, inStock: true },
  { id: '6', name: 'Stainless Steel Screen 150mm', supplier: 'AquaStore Solutions', category: 'filters', price: 3100, rating: 4.7, reviews: 15, location: 'KwaZulu-Natal', image: null, inStock: false },
  { id: '7', name: 'Franklin Electric Submersible Motor 1.5kW', supplier: 'PumpTech SA', category: 'pumps', price: 9800, rating: 4.7, reviews: 38, location: 'Gauteng', image: null, inStock: true },
  { id: '8', name: '200mm PVC Casing (3m)', supplier: 'Borehole Supplies Co', category: 'casings', price: 1450, rating: 4.3, reviews: 12, location: 'Western Cape', image: null, inStock: true },
  { id: '9', name: 'Tricone Roller Bit 200mm', supplier: 'DrillPro Equipment', category: 'bits', price: 8900, rating: 4.6, reviews: 9, location: 'Mpumalanga', image: null, inStock: true },
  { id: '10', name: '10000L Slimline Tank', supplier: 'AquaStore Solutions', category: 'tanks', price: 12500, rating: 4.8, reviews: 53, location: 'KwaZulu-Natal', image: null, inStock: true },
  { id: '11', name: 'Differential Pressure Switch', supplier: 'PumpTech SA', category: 'controllers', price: 1850, rating: 4.5, reviews: 21, location: 'Gauteng', image: null, inStock: true },
  { id: '12', name: 'Sand Trap Filter 1"', supplier: 'AquaStore Solutions', category: 'filters', price: 780, rating: 4.4, reviews: 33, location: 'KwaZulu-Natal', image: null, inStock: true },
  { id: '13', name: 'Booster Pump 0.75kW', supplier: 'PumpTech SA', category: 'pumps', price: 4500, rating: 4.6, reviews: 29, location: 'Gauteng', image: null, inStock: true },
  { id: '14', name: '32mm Galvanised Pipe Fittings Kit', supplier: 'Borehole Supplies Co', category: 'pipes', price: 560, rating: 4.2, reviews: 16, location: 'Western Cape', image: null, inStock: true },
  { id: '15', name: 'Dolomite Drill Bit 165mm', supplier: 'DrillPro Equipment', category: 'bits', price: 5600, rating: 4.5, reviews: 7, location: 'Mpumalanga', image: null, inStock: false },
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

const PRICE_RANGES = [
  { label: 'Under R1,000', min: 0, max: 1000 },
  { label: 'R1,000 - R5,000', min: 1000, max: 5000 },
  { label: 'R5,000 - R10,000', min: 5000, max: 10000 },
  { label: 'Over R10,000', min: 10000, max: Infinity },
]

const SUPPLIERS = [...new Set(MOCK_PRODUCTS.map(p => p.supplier))]

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('newest')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [cart, setCart] = useState<string[]>([])

  const filtered = useMemo(() => {
    let results = MOCK_PRODUCTS.filter((p) => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.supplier.toLowerCase().includes(search.toLowerCase())
      const matchCategory = !selectedCategory || p.category === selectedCategory
      const matchSupplier = !selectedSupplier || p.supplier === selectedSupplier
      const matchLocation = !selectedLocation || p.location === selectedLocation
      const matchPrice = selectedPriceRange === null || (p.price >= PRICE_RANGES[selectedPriceRange].min && p.price < PRICE_RANGES[selectedPriceRange].max)
      return matchSearch && matchCategory && matchSupplier && matchLocation && matchPrice
    })

    switch (sortBy) {
      case 'price_asc': results.sort((a, b) => a.price - b.price); break
      case 'price_desc': results.sort((a, b) => b.price - a.price); break
      case 'rating': results.sort((a, b) => b.rating - a.rating); break
      default: break
    }
    return results
  }, [search, selectedCategory, selectedSupplier, selectedLocation, selectedPriceRange, sortBy])

  const addToCart = (id: string) => {
    setCart((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const clearFilters = () => {
    setSearch(''); setSelectedCategory(''); setSelectedSupplier(''); setSelectedLocation(''); setSelectedPriceRange(null); setSortBy('newest')
  }

  const hasFilters = search || selectedCategory || selectedSupplier || selectedLocation || selectedPriceRange !== null

  const FilterSidebar = ({ className }: { className?: string }) => (
    <div className={cn('space-y-6', className)}>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Category</h3>
        <div className="space-y-2">
          {PRODUCT_CATEGORIES.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat.id}
                onChange={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange === i}
                onChange={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Supplier</h3>
        <div className="space-y-2">
          {SUPPLIERS.map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="supplier"
                checked={selectedSupplier === s}
                onChange={() => setSelectedSupplier(selectedSupplier === s ? '' : s)}
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Location</h3>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary"
        >
          <option value="">All Provinces</option>
          {PROVINCES.map((prov) => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>
      </div>

      {hasFilters && (
        <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-1" /> Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">{filtered.length} products available</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="outline">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart ({cart.length})
            </Button>
          </Link>
          <Button variant="outline" className="lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>
      </div>

      {/* Search + Sort Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              <FilterSidebar />
            </CardContent>
          </Card>
        </aside>

        {/* Mobile Filters Overlay */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
            <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}><X className="h-5 w-5" /></button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <Card key={product.id} hover>
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-gray-400 text-center">
                        <ShoppingCart className="h-10 w-10 mx-auto mb-2 opacity-40" />
                        <span className="text-xs">Product Image</span>
                      </div>
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant={product.inStock ? 'success' : 'error'}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{product.supplier}</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      R{product.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      size="sm"
                      className="w-full"
                      variant={cart.includes(product.id) ? 'secondary' : 'primary'}
                      disabled={!product.inStock}
                      onClick={() => addToCart(product.id)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {cart.includes(product.id) ? 'Remove from Cart' : 'Add to Cart'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}