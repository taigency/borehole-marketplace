'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  Package,
  ShoppingBag,
  Truck,
  Shield,
  Tag,
  CreditCard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { calculateCommission, calculateShipping, COMMISSION_RATE } from '@/lib/pricing'

interface CartItem {
  id: string
  name: string
  supplier: string
  price: number
  quantity: number
  category: string
  image: string
}

const INITIAL_ITEMS: CartItem[] = [
  { id: '1', name: 'Grundfos SP 30-8 Submersible Pump', supplier: 'PumpTech SA', price: 18500, quantity: 1, category: 'Water Pumps', image: '💧' },
  { id: '5', name: '50mm HDPE Pipe (100m Roll)', supplier: 'Borehole Supplies Co', price: 2340, quantity: 2, category: 'Pipes & Fittings', image: '🔧' },
  { id: '4', name: '5000L JoJo Water Tank', supplier: 'AquaStore Solutions', price: 6750, quantity: 1, category: 'Water Tanks', image: '🏗️' },
]

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQty = (id: string, delta: number) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)
    )
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.05) : 0
  const commission = calculateCommission(subtotal)
  const shipping = calculateShipping(subtotal)
  const total = subtotal + commission + shipping - discount

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center animate-fade-in">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Browse our products and add items to get started.</p>
          <Link href="/products">
            <Button size="lg" className="bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] hover:from-[#082f49] hover:to-[#0c4a6e] rounded-xl shadow-lg shadow-[#0c4a6e]/20">
              <ShoppingCart className="h-5 w-5 mr-2" /> Browse Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-[#0c4a6e]/10 rounded-xl flex items-center justify-center">
          <ShoppingCart className="h-5 w-5 text-[#0c4a6e]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-sm text-gray-500">{items.reduce((s, i) => s + i.quantity, 0)} items in your cart</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center shrink-0 text-3xl">
                  {item.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-semibold text-gray-900 text-sm hover:text-[#0d9488] transition-colors leading-tight">{item.name}</h3>
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">{item.supplier}</p>
                      <span className="inline-block mt-1.5 text-xs font-medium bg-[#0d9488]/10 text-[#0d9488] px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="p-2.5 hover:bg-gray-100 rounded-l-xl transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5 text-gray-500" />
                      </button>
                      <span className="px-4 py-2 text-sm font-semibold text-gray-900 min-w-[2.5rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="p-2.5 hover:bg-gray-100 rounded-r-xl transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5 text-gray-500" />
                      </button>
                    </div>
                    <p className="font-bold text-gray-900 text-lg">
                      R{(item.price * item.quantity).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Promo code */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm"
                  placeholder="Enter promo code"
                  disabled={promoApplied}
                />
              </div>
              <Button
                variant="outline"
                className="rounded-xl px-6"
                disabled={promoApplied || !promoCode}
                onClick={() => setPromoApplied(true)}
              >
                {promoApplied ? 'Applied!' : 'Apply'}
              </Button>
            </div>
            {promoApplied && (
              <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                <Shield className="h-3 w-3" /> 5% discount applied — you save R{discount.toLocaleString()}!
              </p>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-24 overflow-hidden">
            <div className="bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] p-5">
              <h2 className="text-lg font-semibold text-white">Order Summary</h2>
            </div>
            <div className="p-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-medium text-gray-900">R{subtotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-600">
                  <span>Promo discount (5%)</span>
                  <span className="font-medium">-R{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">Platform fee ({Math.round(COMMISSION_RATE * 100)}%)</span>
                <span className="font-medium text-gray-900">R{commission.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className={cn('font-medium', shipping === 0 ? 'text-emerald-600' : 'text-gray-900')}>
                  {shipping === 0 ? 'Free' : `R${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-[#0d9488] bg-[#0d9488]/5 rounded-lg px-3 py-2">
                  Add R{(5000 - subtotal).toLocaleString()} more for free shipping
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">R{total.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="p-5 pt-0 space-y-3">
              <Link href="/checkout">
                <Button size="lg" className="w-full bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] hover:from-[#082f49] hover:to-[#0c4a6e] rounded-xl shadow-lg shadow-[#0c4a6e]/20 font-semibold">
                  <CreditCard className="h-4 w-4 mr-2" /> Proceed to Checkout
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="ghost" className="w-full rounded-xl text-gray-500">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="px-5 pb-5">
              <div className="border-t border-gray-100 pt-4 space-y-2">
                {[
                  { icon: Shield, text: 'Secure checkout' },
                  { icon: Truck, text: 'Free shipping over R5,000' },
                  { icon: Package, text: '30-day returns' },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                      <Icon className="h-3.5 w-3.5" />
                      <span>{item.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
