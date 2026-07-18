'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, Package, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CartItem {
  id: string
  name: string
  supplier: string
  price: number
  quantity: number
  category: string
}

const INITIAL_ITEMS: CartItem[] = [
  { id: '1', name: 'Grundfos SP 30-8 Submersible Pump', supplier: 'PumpTech SA', price: 18500, quantity: 1, category: 'Water Pumps' },
  { id: '5', name: '50mm HDPE Pipe (100m Roll)', supplier: 'Borehole Supplies Co', price: 2340, quantity: 2, category: 'Pipes & Fittings' },
  { id: '4', name: '5000L JoJo Water Tank', supplier: 'AquaStore Solutions', price: 6750, quantity: 1, category: 'Water Tanks' },
]

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS)

  const updateQty = (id: string, delta: number) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)
    )
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 5000 ? 0 : 350
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-10 w-10 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Browse our products and add items to your cart.</p>
        <Link href="/products">
          <Button size="lg">
            <ShoppingCart className="h-5 w-5 mr-2" /> Browse Products
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center shrink-0">
                    <Package className="h-6 w-6 text-gray-400 opacity-40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link href={`/products/${item.id}`}>
                          <h3 className="font-medium text-gray-900 text-sm hover:text-primary transition-colors">{item.name}</h3>
                        </Link>
                        <p className="text-sm text-gray-500 mt-0.5">{item.supplier}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button onClick={() => updateQty(item.id, -1)} className="p-2 hover:bg-gray-50 rounded-l-lg">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 py-1.5 text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="p-2 hover:bg-gray-50 rounded-r-lg">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-bold text-gray-900">
                        R{(item.price * item.quantity).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-medium">R{subtotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={cn('font-medium', shipping === 0 && 'text-green-600')}>
                    {shipping === 0 ? 'Free' : `R${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-primary">Free shipping on orders over R5,000</p>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">R{total.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button size="lg" className="w-full">
                Proceed to Checkout <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          <Link href="/products">
            <Button variant="ghost" className="w-full mt-4">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}