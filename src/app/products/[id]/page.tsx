'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { Star, ShoppingCart, Minus, Plus, MapPin, Phone, Mail, ChevronLeft, Package, Truck, Shield, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const MOCK_PRODUCTS: Record<string, {
  id: string; name: string; price: number; description: string; category: string;
  supplier: { name: string; location: string; rating: number; phone: string; email: string; memberSince: string };
  specs: Record<string, string>; stock: number; rating: number; reviewCount: number;
}> = {
  '1': {
    id: '1', name: 'Grundfos SP 30-8 Submersible Pump', price: 18500,
    description: 'High-performance stainless steel submersible pump designed for groundwater supply, irrigation, and industrial applications. The SP 30-8 delivers reliable water flow with energy-efficient operation and corrosion-resistant construction suitable for South African borehole conditions.',
    category: 'Water Pumps', stock: 12, rating: 4.8, reviewCount: 42,
    specs: { 'Flow Rate': '30 m³/h', 'Head': '80m', 'Power': '5.5 kW', 'Voltage': '380V 3-phase', 'Material': 'AISI 304 Stainless Steel', 'Outlet': '2" BSP', 'Max Temp': '40°C', 'Weight': '28 kg' },
    supplier: { name: 'PumpTech SA', location: 'Gauteng', rating: 4.7, phone: '+27 11 234 5678', email: 'sales@pumptechsa.co.za', memberSince: '2019' },
  },
  '2': {
    id: '2', name: '110mm uPVC Borehole Casing (6m)', price: 890,
    description: 'Heavy-duty uPVC borehole casing pipe manufactured to SANS 966 specifications. UV-stabilised and resistant to corrosion, this casing provides long-term borehole integrity for residential and agricultural installations.',
    category: 'Borehole Casings', stock: 200, rating: 4.6, reviewCount: 31,
    specs: { 'Diameter': '110mm', 'Length': '6m', 'Material': 'uPVC', 'Wall Thickness': '5.3mm', 'Pressure Rating': 'PN 10', 'Standard': 'SANS 966', 'Colour': 'Blue/Grey', 'Joint Type': 'Solvent Weld' },
    supplier: { name: 'Borehole Supplies Co', location: 'Western Cape', rating: 4.5, phone: '+27 21 456 7890', email: 'orders@boresupplies.co.za', memberSince: '2017' },
  },
  '3': {
    id: '3', name: 'PDC Drag Bit 152mm', price: 4200,
    description: 'Polycrystalline Diamond Compact drag bit for efficient drilling in soft to medium formations. Optimised blade design provides excellent penetration rates and durability in sedimentary conditions common across South Africa.',
    category: 'Drill Bits', stock: 8, rating: 4.4, reviewCount: 18,
    specs: { 'Diameter': '152mm (6")', 'Type': 'PDC Drag Bit', 'Blades': '3', 'Nozzles': '3x 12mm', 'Connection': '2 7/8" API Reg', 'Formation': 'Soft-Medium', 'IADC Code': 'M222', 'Weight': '12 kg' },
    supplier: { name: 'DrillPro Equipment', location: 'Mpumalanga', rating: 4.4, phone: '+27 13 567 8901', email: 'info@drillpro.co.za', memberSince: '2020' },
  },
}

const MOCK_REVIEWS = [
  { id: '1', author: 'Peter Nkosi', rating: 5, date: '2025-11-15', comment: 'Excellent pump, been running for 6 months with zero issues. Installation was straightforward and the motor is very quiet.' },
  { id: '2', author: 'Anna van der Merwe', rating: 4, date: '2025-10-22', comment: 'Good quality product. Delivery was a bit slow but the product itself is top notch. Would recommend for residential boreholes.' },
  { id: '3', author: 'David Motaung', rating: 5, date: '2025-09-08', comment: 'This is the second one I\'ve purchased. Very reliable and efficient. Great support from the supplier as well.' },
]

const RELATED_PRODUCTS = [
  { id: '2', name: '110mm uPVC Borehole Casing (6m)', price: 890, rating: 4.6, reviews: 31 },
  { id: '5', name: '50mm HDPE Pipe (100m Roll)', price: 2340, rating: 4.5, reviews: 24 },
  { id: '7', name: 'Franklin Electric Submersible Motor 1.5kW', price: 9800, rating: 4.7, reviews: 38 },
]

const DEFAULT_PRODUCT = MOCK_PRODUCTS['1']

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = MOCK_PRODUCTS[id] || DEFAULT_PRODUCT
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs')
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/products" className="hover:text-primary flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" /> Products
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div>
          <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4">
            <div className="text-gray-400 text-center">
              <Package className="h-16 w-16 mx-auto mb-3 opacity-40" />
              <span className="text-sm">Product Image {selectedImage + 1}</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  'aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 transition-colors',
                  selectedImage === i ? 'border-primary' : 'border-transparent hover:border-gray-300'
                )}
              >
                <span className="text-xs text-gray-400">Img {i + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <Badge variant={product.stock > 0 ? 'success' : 'error'} className="mb-3">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </Badge>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-4">{product.category}</p>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={cn('h-5 w-5', s <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300')} />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mb-6">
            R{product.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="p-3 hover:bg-gray-50 transition-colors rounded-l-lg"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-5 py-3 text-center min-w-[3rem] font-medium">{qty}</span>
              <button
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                className="p-3 hover:bg-gray-50 transition-colors rounded-r-lg"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button size="lg" className="flex-1" disabled={product.stock === 0} onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck, label: 'Free shipping on orders over R5,000' },
              { icon: Shield, label: '2-year warranty included' },
              { icon: Package, label: 'Estimated 3-5 business days' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-lg">
                <Icon className="h-5 w-5 text-primary mb-2" />
                <span className="text-xs text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Specs & Reviews */}
      <div className="mt-12">
        <div className="flex border-b border-gray-200 mb-6">
          {(['specs', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors',
                activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              {tab === 'specs' ? 'Specifications' : `Reviews (${product.reviewCount})`}
            </button>
          ))}
        </div>

        {activeTab === 'specs' && (
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-3 text-sm font-medium text-gray-600 w-1/3">{key}</td>
                      <td className="px-6 py-3 text-sm text-gray-900">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {MOCK_REVIEWS.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{review.author}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={cn('h-4 w-4', s <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300')} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Supplier Info */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Supplier Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900">{product.supplier.name}</p>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {product.supplier.location}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">{product.supplier.rating}</span>
              </div>
              <p className="text-sm text-gray-500">Member since {product.supplier.memberSince}</p>
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" /> {product.supplier.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" /> {product.supplier.email}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                <Mail className="h-4 w-4 mr-2" /> Contact Supplier
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Related Products */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {RELATED_PRODUCTS.map((rp) => (
              <Link key={rp.id} href={`/products/${rp.id}`}>
                <Card hover>
                  <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Package className="h-8 w-8 text-gray-400 opacity-40" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">{rp.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium">{rp.rating}</span>
                      <span className="text-xs text-gray-500">({rp.reviews})</span>
                    </div>
                    <p className="font-bold text-gray-900">R{rp.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button size="sm" variant="outline" className="w-full">
                      View Product <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}