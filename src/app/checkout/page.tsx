'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatCurrency, cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  CreditCard,
  Building2,
  Banknote,
  MapPin,
  Package,
  CheckCircle,
  ArrowLeft,
  Truck,
} from 'lucide-react'

interface ShippingForm {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  province: string
  postalCode: string
}

const ORDER_ITEMS = [
  { id: '1', name: 'Submersible Pump 1.5kW', supplier: 'PumpTech SA', price: 8500, quantity: 1 },
  { id: '2', name: 'PVC Casing 160mm x 6m', supplier: 'Borehole Supplies Co', price: 1200, quantity: 5 },
  { id: '3', name: 'Water Tank 2500L', supplier: 'AquaStore Solutions', price: 4500, quantity: 1 },
]

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard' },
  { id: 'eft', label: 'Bank Transfer (EFT)', icon: Building2, description: 'Direct bank transfer' },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive' },
]

const PROVINCES = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
  'Western Cape',
]

export default function CheckoutPage() {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shipping, setShipping] = useState<ShippingForm>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
  })

  const subtotal = ORDER_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = 350
  const total = subtotal + shippingCost

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePlaceOrder = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setStep('confirmation')
  }

  const updateShipping = (field: keyof ShippingForm, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }))
  }

  if (step === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-2">
            Your order has been placed and is being processed.
          </p>
          <p className="text-gray-500 mb-8">
            Order number: <span className="font-semibold text-gray-900">ORD-006</span>
          </p>
          <Card className="text-left mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
              <div className="space-y-3">
                {ORDER_ITEMS.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard/client/orders">
              <Button>
                <Truck className="h-4 w-4 mr-2" />
                Track My Order
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/dashboard/client/cart" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="flex items-center gap-2 mb-8">
        {[
          { key: 'shipping', label: 'Shipping' },
          { key: 'payment', label: 'Payment' },
          { key: 'confirmation', label: 'Confirmation' },
        ].map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                step === s.key
                  ? 'bg-primary text-white'
                  : i < ['shipping', 'payment', 'confirmation'].indexOf(step)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
              )}
            >
              {i < ['shipping', 'payment', 'confirmation'].indexOf(step) ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                i + 1
              )}
            </div>
            <span className={cn('text-sm font-medium', step === s.key ? 'text-gray-900' : 'text-gray-500')}>
              {s.label}
            </span>
            {i < 2 && <div className="w-8 h-0.5 bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 'shipping' && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Shipping Address</h2>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shipping.fullName}
                        onChange={(e) => updateShipping('fullName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={shipping.phone}
                        onChange={(e) => updateShipping('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="+27 82 123 4567"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={shipping.email}
                      onChange={(e) => updateShipping('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={shipping.address}
                      onChange={(e) => updateShipping('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shipping.city}
                        onChange={(e) => updateShipping('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="Johannesburg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Province *
                      </label>
                      <select
                        required
                        value={shipping.province}
                        onChange={(e) => updateShipping('province', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      >
                        <option value="">Select...</option>
                        {PROVINCES.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shipping.postalCode}
                        onChange={(e) => updateShipping('postalCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="2000"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <h2 className="text-lg font-semibold">Shipping Address</h2>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setStep('shipping')}>
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-900 font-medium">{shipping.fullName}</p>
                  <p className="text-sm text-gray-600">{shipping.address}</p>
                  <p className="text-sm text-gray-600">
                    {shipping.city}, {shipping.province} {shipping.postalCode}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{shipping.phone}</p>
                  <p className="text-sm text-gray-600">{shipping.email}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Payment Method</h2>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {PAYMENT_METHODS.map((method) => (
                      <label
                        key={method.id}
                        className={cn(
                          'flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors',
                          paymentMethod === method.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="w-4 h-4 text-primary focus:ring-primary"
                        />
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <method.icon className="h-5 w-5 text-gray-700" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{method.label}</p>
                          <p className="text-xs text-gray-500">{method.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={handlePlaceOrder}
                    loading={isSubmitting}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Place Order - {formatCurrency(total)}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <h2 className="text-lg font-semibold">Order Summary</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                {ORDER_ITEMS.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{item.name}</p>
                      <p className="text-gray-500">{item.supplier} · Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium ml-4">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{formatCurrency(shippingCost)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}