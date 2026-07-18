'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { Star, ShoppingCart, Minus, Plus, MapPin, Phone, Mail, ChevronLeft, Package, Truck, Shield, ArrowRight, Heart, Check, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const MOCK_PRODUCTS: Record<string, {
  id: string; name: string; price: number; description: string; category: string;
  supplier: { name: string; location: string; rating: number; phone: string; email: string; memberSince: string; verified: boolean };
  specs: Record<string, string>; stock: number; rating: number; reviewCount: number; gradient: string;
}> = {
  '1': {
    id: '1', name: 'Grundfos SP 5A-12 Submersible Pump', price: 12500, gradient: 'from-blue-500 to-cyan-400',
    description: 'High-performance stainless steel submersible pump designed for groundwater supply, irrigation, and industrial applications. The Grundfos SP 5A-12 delivers reliable water flow with energy-efficient operation and corrosion-resistant construction suitable for South African borehole conditions. Built with precision-engineered hydraulics for maximum efficiency and long service life.',
    category: 'Water Pumps', stock: 12, rating: 4.8, reviewCount: 42,
    specs: { 'Flow Rate': '5 m³/h', 'Head': '120m', 'Power': '1.5 kW', 'Voltage': '220V Single Phase', 'Material': 'AISI 304 Stainless Steel', 'Outlet': '1¼" BSP', 'Max Temp': '40°C', 'Weight': '14 kg', 'Impellers': '12 stages', 'Motor Type': 'Water-filled' },
    supplier: { name: 'PumpTech SA', location: 'Gauteng', rating: 4.7, phone: '+27 11 234 5678', email: 'sales@pumptechsa.co.za', memberSince: '2019', verified: true },
  },
  '2': {
    id: '2', name: '160mm PVC Casing 6m Length', price: 1200, gradient: 'from-gray-500 to-slate-400',
    description: 'Heavy-duty uPVC borehole casing pipe manufactured to SANS 966 specifications. UV-stabilised and resistant to corrosion, this casing provides long-term borehole integrity for residential and agricultural installations across South Africa.',
    category: 'Borehole Casings', stock: 200, rating: 4.6, reviewCount: 31,
    specs: { 'Diameter': '160mm', 'Length': '6m', 'Material': 'uPVC', 'Wall Thickness': '6.2mm', 'Pressure Rating': 'PN 10', 'Standard': 'SANS 966', 'Colour': 'Blue/Grey', 'Joint Type': 'Solvent Weld' },
    supplier: { name: 'Borehole Supplies Co', location: 'Western Cape', rating: 4.5, phone: '+27 21 456 7890', email: 'orders@boresupplies.co.za', memberSince: '2017', verified: true },
  },
  '3': {
    id: '3', name: 'Diamond Drill Bit 150mm', price: 8500, gradient: 'from-amber-500 to-yellow-400',
    description: 'Premium polycrystalline diamond compact drill bit for efficient drilling in soft to medium formations. Optimised blade design provides excellent penetration rates and durability in sedimentary conditions common across South Africa.',
    category: 'Drill Bits', stock: 8, rating: 4.7, reviewCount: 18,
    specs: { 'Diameter': '150mm', 'Type': 'PDC Drag Bit', 'Blades': '3', 'Nozzles': '3x 12mm', 'Connection': '2 7/8" API Reg', 'Formation': 'Soft-Medium', 'IADC Code': 'M222', 'Weight': '11 kg' },
    supplier: { name: 'DrillPro Equipment', location: 'Mpumalanga', rating: 4.4, phone: '+27 13 567 8901', email: 'info@drillpro.co.za', memberSince: '2020', verified: false },
  },
  '4': {
    id: '4', name: 'Jojo 2500L Water Tank', price: 4500, gradient: 'from-emerald-500 to-green-400',
    description: 'JoJo 2500 litre vertical water storage tank manufactured from food-grade polyethylene. UV-stabilised for outdoor use, this tank is ideal for rainwater harvesting and borehole water storage at residential properties.',
    category: 'Water Tanks', stock: 45, rating: 4.9, reviewCount: 87,
    specs: { 'Capacity': '2500 Litres', 'Material': 'Food-grade PE', 'Colour': 'Standard Black', 'Height': '1.55m', 'Diameter': '1.10m', 'Inlet': '40mm', 'Outlet': '25mm', 'Warranty': '8 Years', 'UV Stabilised': 'Yes', 'Weight': '45 kg' },
    supplier: { name: 'AquaStore Solutions', location: 'KwaZulu-Natal', rating: 4.8, phone: '+27 31 234 5678', email: 'info@aquaStore.co.za', memberSince: '2018', verified: true },
  },
  '5': {
    id: '5', name: 'Borehole Stainless Steel Screen', price: 3200, gradient: 'from-zinc-500 to-gray-400',
    description: 'Precision-welded stainless steel borehole screen designed for optimal water flow and sand filtration. AISI 304 construction ensures corrosion resistance and longevity in various water conditions.',
    category: 'Filters & Screens', stock: 30, rating: 4.7, reviewCount: 15,
    specs: { 'Diameter': '150mm', 'Length': '3m', 'Material': 'AISI 304 SS', 'Slot Size': '0.5mm', 'Open Area': '12%', 'Connection': 'Threaded', 'Wire Type': 'V-wire', 'Support Rods': '8' },
    supplier: { name: 'AquaStore Solutions', location: 'KwaZulu-Natal', rating: 4.8, phone: '+27 31 234 5678', email: 'info@aquaStore.co.za', memberSince: '2018', verified: true },
  },
  '6': {
    id: '6', name: 'Franklin Electric Submersible Motor', price: 9800, gradient: 'from-violet-500 to-purple-400',
    description: 'Franklin Electric submersible motor engineered for reliability and efficiency in borehole applications. Water-filled design with stainless steel construction for long service life.',
    category: 'Water Pumps', stock: 15, rating: 4.7, reviewCount: 38,
    specs: { 'Power': '1.5 kW', 'Voltage': '220V Single Phase', 'Speed': '2850 RPM', 'Material': 'Stainless Steel', 'Insulation': 'Class F', 'Protection': 'IP68', 'Max Temp': '35°C', 'Weight': '18 kg' },
    supplier: { name: 'PumpTech SA', location: 'Gauteng', rating: 4.7, phone: '+27 11 234 5678', email: 'sales@pumptechsa.co.za', memberSince: '2019', verified: true },
  },
  '7': {
    id: '7', name: 'Pressure Controller 2.2kW', price: 2800, gradient: 'from-rose-500 to-pink-400',
    description: 'Automatic pressure controller for borehole pumps. Maintains consistent water pressure and protects the pump from dry running. Easy to install with built-in check valve.',
    category: 'Controllers & Panels', stock: 25, rating: 4.5, reviewCount: 21,
    specs: { 'Power Rating': '2.2 kW', 'Voltage': '220V', 'Max Pressure': '10 bar', 'Flow Range': '0-6 m³/h', 'Protection': 'Dry Run', 'Check Valve': 'Built-in', 'Display': 'LED', 'IP Rating': 'IP65' },
    supplier: { name: 'PumpTech SA', location: 'Gauteng', rating: 4.7, phone: '+27 11 234 5678', email: 'sales@pumptechsa.co.za', memberSince: '2019', verified: true },
  },
  '8': {
    id: '8', name: 'HDPE Pipe 50mm x 100m Roll', price: 5600, gradient: 'from-teal-500 to-emerald-400',
    description: 'High-density polyethylene pipe in a convenient 100-metre roll. Ideal for borehole water reticulation, irrigation systems, and submersible pump installations.',
    category: 'Pipes & Fittings', stock: 18, rating: 4.5, reviewCount: 24,
    specs: { 'Diameter': '50mm', 'Length': '100m Roll', 'Material': 'HDPE PE100', 'Pressure Rating': 'PN 12.5', 'SDR': '11', 'Colour': 'Black', 'Standard': 'SANS 4427', 'Coil Weight': '185 kg' },
    supplier: { name: 'Borehole Supplies Co', location: 'Western Cape', rating: 4.5, phone: '+27 21 456 7890', email: 'orders@boresupplies.co.za', memberSince: '2017', verified: true },
  },
  '9': {
    id: '9', name: 'Borehole Seal Kit', price: 1500, gradient: 'from-orange-500 to-amber-400',
    description: 'Complete borehole sealing kit including bentonite pellets, sanitary seal, and installation accessories. Ensures proper borehole sanitation and prevents surface water contamination.',
    category: 'Accessories', stock: 50, rating: 4.3, reviewCount: 12,
    specs: { 'Seal Type': 'Bentonite Pellets', 'Weight': '25 kg', 'Casing Size': '110-160mm', 'Set Time': '24 hours', 'Expansion': '15x volume', 'NSF Certified': 'Yes', 'Shelf Life': '5 years', 'Kit Contents': 'Pellets + Instructions' },
    supplier: { name: 'BoreParts Direct', location: 'Gauteng', rating: 4.3, phone: '+27 11 678 9012', email: 'orders@boreparts.co.za', memberSince: '2021', verified: false },
  },
  '10': {
    id: '10', name: 'Water Level Meter 100m', price: 6200, gradient: 'from-sky-500 to-blue-400',
    description: 'Professional water level meter for accurate borehole water level measurement. Features a stainless steel probe, tape guide, and robust carrying case for field use.',
    category: 'Accessories', stock: 10, rating: 4.6, reviewCount: 9,
    specs: { 'Length': '100m', 'Tape Width': '10mm', 'Probe': 'Stainless Steel', 'Accuracy': '±1mm', 'Sensitivity': 'Adjustable', 'Power': '9V Battery', 'Case': 'Pelican Style', 'Weight': '4.5 kg' },
    supplier: { name: 'WaterWorks Pro', location: 'Free State', rating: 4.6, phone: '+27 51 456 7890', email: 'info@waterworkspro.co.za', memberSince: '2016', verified: true },
  },
  '11': {
    id: '11', name: 'Solar Pump Controller', price: 15000, gradient: 'from-yellow-500 to-orange-400',
    description: 'Advanced solar pump controller with MPPT technology for maximum energy harvesting. Compatible with most submersible pumps and includes dry-run protection.',
    category: 'Controllers & Panels', stock: 7, rating: 4.8, reviewCount: 33,
    specs: { 'Power': '2.2 kW Max', 'Input': 'Solar/AC', 'MPPT': 'Yes', 'Voltage Range': '30-430V DC', 'Protection': 'Dry Run + Overload', 'Display': 'LCD', 'Efficiency': '>98%', 'IP Rating': 'IP65', 'Communication': 'RS485', 'Dimensions': '350x250x150mm' },
    supplier: { name: 'PumpTech SA', location: 'Gauteng', rating: 4.7, phone: '+27 11 234 5678', email: 'sales@pumptechsa.co.za', memberSince: '2019', verified: true },
  },
  '12': {
    id: '12', name: 'Casing Centralizer Set', price: 850, gradient: 'from-indigo-500 to-blue-400',
    description: 'Heavy-duty casing centralizers designed to keep the borehole casing centred during installation. Ensures uniform gravel pack thickness and improved well development.',
    category: 'Accessories', stock: 60, rating: 4.4, reviewCount: 16,
    specs: { 'Casing Size': '160mm', 'Quantity': 'Set of 4', 'Material': 'Heavy-duty PVC', 'Outer Diameter': '200mm', 'Clip Type': 'Spring Steel', 'Max Temp': '60°C', 'Reusable': 'Yes', 'Weight': '2.4 kg/set' },
    supplier: { name: 'Borehole Supplies Co', location: 'Western Cape', rating: 4.5, phone: '+27 21 456 7890', email: 'orders@boresupplies.co.za', memberSince: '2017', verified: true },
  },
}

const MOCK_REVIEWS = [
  { id: '1', author: 'Peter Nkosi', rating: 5, date: '15 Nov 2025', comment: 'Excellent pump, been running for 6 months with zero issues. Installation was straightforward and the motor is very quiet. Highly recommend for residential boreholes.', avatar: 'PN' },
  { id: '2', author: 'Anna van der Merwe', rating: 4, date: '22 Oct 2025', comment: 'Good quality product. Delivery was a bit slow to Cape Town but the product itself is top notch. Would recommend for residential boreholes.', avatar: 'AM' },
  { id: '3', author: 'David Motaung', rating: 5, date: '08 Sep 2025', comment: 'This is the second one I\'ve purchased for my farm. Very reliable and efficient. Great support from PumpTech SA as well. The warranty gives peace of mind.', avatar: 'DM' },
  { id: '4', author: 'Sarah Botha', rating: 4, date: '15 Aug 2025', comment: 'Installed at our guest house in the Drakensberg. Working perfectly so far. The energy efficiency is noticeably better than our previous pump.', avatar: 'SB' },
]

const RELATED_PRODUCTS = [
  { id: '2', name: '160mm PVC Casing 6m Length', price: 1200, rating: 4.6, reviews: 31, gradient: 'from-gray-500 to-slate-400' },
  { id: '7', name: 'Pressure Controller 2.2kW', price: 2800, rating: 4.5, reviews: 21, gradient: 'from-rose-500 to-pink-400' },
  { id: '8', name: 'HDPE Pipe 50mm x 100m Roll', price: 5600, rating: 4.5, reviews: 24, gradient: 'from-teal-500 to-emerald-400' },
]

const DEFAULT_PRODUCT = MOCK_PRODUCTS['1']

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = MOCK_PRODUCTS[id] || DEFAULT_PRODUCT
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs')
  const [selectedImage, setSelectedImage] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/products" className="text-gray-500 hover:text-blue-600 flex items-center gap-1 transition-colors">
              <ChevronLeft className="h-4 w-4" /> Products
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium truncate max-w-[300px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div>
            <div className={cn('aspect-[4/3] bg-gradient-to-br rounded-2xl flex items-center justify-center mb-4 shadow-lg', product.gradient)}>
              <div className="text-white/80 text-center">
                <Package className="h-20 w-20 mx-auto mb-3 opacity-60" />
                <span className="text-lg font-medium opacity-80">{product.name}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'aspect-square bg-gradient-to-br rounded-xl flex items-center justify-center border-2 transition-all duration-200',
                    product.gradient,
                    selectedImage === i ? 'border-blue-500 shadow-lg scale-[1.02]' : 'border-transparent hover:border-gray-300 opacity-70 hover:opacity-100'
                  )}
                >
                  <span className="text-xs text-white/60 font-medium">View {i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={product.stock > 0 ? 'success' : 'error'}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </Badge>
              <Badge variant="secondary">{product.category}</Badge>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={cn('h-5 w-5', s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200')} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <p className="text-4xl font-bold text-gray-900 mb-1">
                R{product.price.toLocaleString('en-ZA')}
              </p>
              <p className="text-sm text-gray-500">Price excl. VAT &bull; Free delivery on orders over R5,000</p>
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors rounded-l-xl"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-5 py-3 text-center min-w-[3rem] font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="p-3 hover:bg-gray-50 transition-colors rounded-r-xl"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                size="lg"
                className="flex-1 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 rounded-xl"
                disabled={product.stock === 0}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <><Check className="h-5 w-5 mr-2" /> Added to Cart!</>
                ) : (
                  <><ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart</>
                )}
              </Button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={cn(
                  'p-3.5 rounded-xl border-2 transition-all',
                  wishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:text-red-400 hover:border-red-200'
                )}
              >
                <Heart className="h-5 w-5" fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: 'Free Shipping', sub: 'Orders over R5,000' },
                { icon: Shield, label: '2-Year Warranty', sub: 'Full coverage' },
                { icon: Package, label: '3-5 Days', sub: 'Estimated delivery' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100">
                  <Icon className="h-5 w-5 text-blue-600 mb-2" />
                  <span className="text-xs font-semibold text-gray-900">{label}</span>
                  <span className="text-xs text-gray-500">{sub}</span>
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
                  'px-6 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors',
                  activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                )}
              >
                {tab === 'specs' ? 'Specifications' : `Reviews (${product.reviewCount})`}
              </button>
            ))}
          </div>

          {activeTab === 'specs' && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                      <td className="px-6 py-3.5 text-sm font-medium text-gray-500 w-1/3">{key}</td>
                      <td className="px-6 py-3.5 text-sm font-semibold text-gray-900">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {MOCK_REVIEWS.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-gray-900">{review.author}</p>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={cn('h-4 w-4', s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200')} />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Supplier Info + Related Products */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {product.supplier.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{product.supplier.name}</h3>
                    {product.supplier.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-blue-100">
                        <Check className="h-3 w-3" /> Verified Supplier
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-300 fill-amber-300" />
                  <span className="text-sm font-semibold">{product.supplier.rating}</span>
                  <span className="text-sm text-blue-200">&bull; Member since {product.supplier.memberSince}</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {product.supplier.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {product.supplier.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {product.supplier.email}
                </div>
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
                    <MessageSquare className="h-4 w-4 mr-2" /> Contact Supplier
                  </Button>
                  <Link href="/suppliers">
                    <Button variant="outline" className="w-full rounded-xl">
                      View All Products <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {RELATED_PRODUCTS.map((rp) => (
                <Link key={rp.id} href={`/products/${rp.id}`}>
                  <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden">
                    <div className={cn('aspect-[4/3] bg-gradient-to-br flex items-center justify-center', rp.gradient)}>
                      <Package className="h-10 w-10 text-white/60" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">{rp.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold">{rp.rating}</span>
                        <span className="text-xs text-gray-400">({rp.reviews})</span>
                      </div>
                      <p className="font-bold text-gray-900 text-lg">R{rp.price.toLocaleString('en-ZA')}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
