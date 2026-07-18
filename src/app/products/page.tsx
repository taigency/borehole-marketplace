'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, SlidersHorizontal, Star, ShoppingCart, X, ChevronDown, Heart, Eye, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PRODUCT_CATEGORIES, PROVINCES } from '@/lib/constants'

const MOCK_PRODUCTS = [
  { id: '1', name: 'Grundfos SP 5A-12 Submersible Pump', supplier: 'PumpTech SA', category: 'pumps', price: 12500, rating: 4.8, reviews: 42, location: 'Gauteng', inStock: true, gradient: 'from-blue-500 to-cyan-400', badge: 'Best Seller' },
  { id: '2', name: '160mm PVC Casing 6m Length', supplier: 'Borehole Supplies Co', category: 'casings', price: 1200, rating: 4.6, reviews: 31, location: 'Western Cape', inStock: true, gradient: 'from-gray-500 to-slate-400', badge: null },
  { id: '3', name: 'Diamond Drill Bit 150mm', supplier: 'DrillPro Equipment', category: 'bits', price: 8500, rating: 4.7, reviews: 18, location: 'Mpumalanga', inStock: true, gradient: 'from-amber-500 to-yellow-400', badge: 'Popular' },
  { id: '4', name: 'Jojo 2500L Water Tank', supplier: 'AquaStore Solutions', category: 'tanks', price: 4500, rating: 4.9, reviews: 87, location: 'KwaZulu-Natal', inStock: true, gradient: 'from-emerald-500 to-green-400', badge: 'Top Rated' },
  { id: '5', name: 'Borehole Stainless Steel Screen', supplier: 'AquaStore Solutions', category: 'filters', price: 3200, rating: 4.7, reviews: 15, location: 'KwaZulu-Natal', inStock: true, gradient: 'from-zinc-500 to-gray-400', badge: null },
  { id: '6', name: 'Franklin Electric Submersible Motor', supplier: 'PumpTech SA', category: 'pumps', price: 9800, rating: 4.7, reviews: 38, location: 'Gauteng', inStock: true, gradient: 'from-violet-500 to-purple-400', badge: null },
  { id: '7', name: 'Pressure Controller 2.2kW', supplier: 'PumpTech SA', category: 'controllers', price: 2800, rating: 4.5, reviews: 21, location: 'Gauteng', inStock: true, gradient: 'from-rose-500 to-pink-400', badge: null },
  { id: '8', name: 'HDPE Pipe 50mm x 100m Roll', supplier: 'Borehole Supplies Co', category: 'pipes', price: 5600, rating: 4.5, reviews: 24, location: 'Western Cape', inStock: true, gradient: 'from-teal-500 to-emerald-400', badge: null },
  { id: '9', name: 'Borehole Seal Kit', supplier: 'BoreParts Direct', category: 'accessories', price: 1500, rating: 4.3, reviews: 12, location: 'Gauteng', inStock: true, gradient: 'from-orange-500 to-amber-400', badge: null },
  { id: '10', name: 'Water Level Meter 100m', supplier: 'WaterWorks Pro', category: 'accessories', price: 6200, rating: 4.6, reviews: 9, location: 'Free State', inStock: true, gradient: 'from-sky-500 to-blue-400', badge: 'New' },
  { id: '11', name: 'Solar Pump Controller', supplier: 'PumpTech SA', category: 'controllers', price: 15000, rating: 4.8, reviews: 33, location: 'Gauteng', inStock: true, gradient: 'from-yellow-500 to-orange-400', badge: 'Premium' },
  { id: '12', name: 'Casing Centralizer Set', supplier: 'Borehole Supplies Co', category: 'accessories', price: 850, rating: 4.4, reviews: 16, location: 'Western Cape', inStock: true, gradient: 'from-indigo-500 to-blue-400', badge: null },
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

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={cn(sizeClass, s <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200')} />
      ))}
    </div>
  )
}

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSupplier, setSelectedSupplier] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('newest')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [cart, setCart] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])

  const filtered = useMemo(() => {
    const results = MOCK_PRODUCTS.filter((p) => {
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

  const toggleCart = (id: string) => {
    setCart((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const clearFilters = () => {
    setSearch(''); setSelectedCategory(''); setSelectedSupplier(''); setSelectedLocation(''); setSelectedPriceRange(null); setSortBy('newest')
  }

  const hasFilters = search || selectedCategory || selectedSupplier || selectedLocation || selectedPriceRange !== null

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-1.5">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                selectedCategory === cat.id
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Price Range</h3>
        <div className="space-y-1.5">
          {PRICE_RANGES.map((range, i) => (
            <button
              key={i}
              onClick={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                selectedPriceRange === i
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Supplier</h3>
        <div className="space-y-1.5">
          {SUPPLIERS.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSupplier(selectedSupplier === s ? '' : s)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-all',
                selectedSupplier === s
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Location</h3>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        >
          <option value="">All Provinces</option>
          {PROVINCES.map((prov) => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>
      </div>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="w-full px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <X className="h-4 w-4" /> Clear All Filters
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-2">Borehole Equipment & Supplies</p>
              <h1 className="text-4xl font-bold mb-2">Product Catalog</h1>
              <p className="text-blue-100 text-lg">{MOCK_PRODUCTS.length} products from trusted South African suppliers</p>
            </div>
            <Link href="/cart">
              <Button className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-blue-900/30">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View Cart ({cart.length})
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for pumps, casings, drill bits, tanks..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
        {/* Active Filters */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-500">Active filters:</span>
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                {PRODUCT_CATEGORIES.find(c => c.id === selectedCategory)?.label}
                <button onClick={() => setSelectedCategory('')}><X className="h-3 w-3" /></button>
              </span>
            )}
            {selectedSupplier && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                {selectedSupplier}
                <button onClick={() => setSelectedSupplier('')}><X className="h-3 w-3" /></button>
              </span>
            )}
            {selectedPriceRange !== null && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                {PRICE_RANGES[selectedPriceRange].label}
                <button onClick={() => setSelectedPriceRange(null)}><X className="h-3 w-3" /></button>
              </span>
            )}
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filters
                </h2>
                <button className="lg:hidden"><X className="h-5 w-5" /></button>
              </div>
              {filterContent}
            </div>
          </aside>

          {/* Mobile Filters Overlay */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
              <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button onClick={() => setMobileFiltersOpen(false)}><X className="h-5 w-5" /></button>
                </div>
                {filterContent}
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-900">{filtered.length}</span> products
              </p>
              <Button variant="outline" className="lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
                <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
              </Button>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-900 font-semibold mb-1">No products found</p>
                <p className="text-gray-500 text-sm mb-4">Try adjusting your search or filters</p>
                <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden"
                  >
                    {/* Image Area */}
                    <div className="relative">
                      <Link href={`/products/${product.id}`}>
                        <div className={cn('aspect-[4/3] bg-gradient-to-br flex items-center justify-center', product.gradient)}>
                          <div className="text-white/80 text-center">
                            <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-60" />
                            <span className="text-xs font-medium opacity-80">{product.name.split(' ').slice(0, 2).join(' ')}</span>
                          </div>
                        </div>
                      </Link>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.badge && (
                          <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-lg shadow-sm">
                            {product.badge}
                          </span>
                        )}
                        {!product.inStock && (
                          <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id) }}
                          className={cn(
                            'p-2 rounded-lg shadow-sm backdrop-blur-sm transition-colors',
                            wishlist.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white/95 text-gray-600 hover:text-red-500'
                          )}
                        >
                          <Heart className="h-4 w-4" fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                        </button>
                        <Link href={`/products/${product.id}`}>
                          <button className="p-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm text-gray-600 hover:text-blue-600 transition-colors">
                            <Eye className="h-4 w-4" />
                          </button>
                        </Link>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={product.rating} />
                        <span className="text-xs text-gray-400">({product.reviews})</span>
                      </div>

                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-xs text-gray-500 mb-3">{product.supplier}</p>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xl font-bold text-gray-900">
                            R{product.price.toLocaleString('en-ZA')}
                          </p>
                          <p className="text-xs text-gray-400">excl. VAT</p>
                        </div>
                        <button
                          onClick={() => toggleCart(product.id)}
                          disabled={!product.inStock}
                          className={cn(
                            'p-2.5 rounded-xl transition-all duration-200',
                            cart.includes(product.id)
                              ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                              : product.inStock
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          )}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
