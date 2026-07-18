'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatCurrency, cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react'

interface CartItem {
  id: string
  name: string
  supplier: string
  price: number
  quantity: number
  image?: string
}

const INITIAL_CART: CartItem[] = [
  {
    id: '1',
    name: 'Submersible Pump 1.5kW',
    supplier: 'PumpTech SA',
    price: 8500,
    quantity: 1,
  },
  {
    id: '2',
    name: 'PVC Casing 160mm x 6m',
    supplier: 'Borehole Supplies Co',
    price: 1200,
    quantity: 5,
  },
  {
    id: '3',
    name: 'Water Tank 2500L',
    supplier: 'AquaStore Solutions',
    price: 4500,
    quantity: 1,
  },
  {
    id: '4',
    name: 'Pump Controller',
    supplier: 'PumpTech SA',
    price: 2200,
    quantity: 2,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART)

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 350
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Browse our products and services to add items to your cart.
          </p>
          <Link href="/services">
            <Button size="lg">
              Browse Services
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="h-6 w-6 text-gray-700" />
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <span className="text-gray-500">({cartItems.length} items)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Supplier: <span className="font-medium text-gray-700">{item.supplier}</span>
                    </p>
                    <p className="text-lg font-bold text-gray-900 mt-2">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="px-4 py-2 text-sm font-medium text-gray-900 min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <h2 className="text-lg font-semibold">Order Summary</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{formatCurrency(shipping)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full mt-6" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="ghost" className="w-full mt-2">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}