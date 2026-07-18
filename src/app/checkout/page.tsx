'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatCurrency, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { calculateCommission, calculateShipping, COMMISSION_RATE } from '@/lib/pricing'
import {
  CreditCard,
  Building2,
  Banknote,
  MapPin,
  Package,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Truck,
  Shield,
  Lock,
  Smartphone,
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
  { id: '1', name: 'Grundfos SP 30-8 Submersible Pump', supplier: 'PumpTech SA', price: 18500, quantity: 1, image: '💧' },
  { id: '2', name: '50mm HDPE Pipe (100m Roll)', supplier: 'Borehole Supplies Co', price: 2340, quantity: 2, image: '🔧' },
  { id: '3', name: '5000L JoJo Water Tank', supplier: 'AquaStore Solutions', price: 6750, quantity: 1, image: '🏗️' },
]

const PAYMENT_METHODS = [
  { id: 'payfast', label: 'PayFast', icon: CreditCard, description: 'Secure online payment — cards, instant EFT', badge: 'Popular' },
  { id: 'yoco', label: 'Yoco', icon: Smartphone, description: 'Card payments powered by Yoco', badge: null },
  { id: 'eft', label: 'Bank Transfer (EFT)', icon: Building2, description: 'Direct bank transfer — 1-2 day processing', badge: null },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote, description: 'Pay when you receive your order', badge: null },
]

const PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo',
  'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
]

const CHECKOUT_STEPS = [
  { id: 1, title: 'Shipping', icon: Truck },
  { id: 2, title: 'Payment', icon: CreditCard },
  { id: 3, title: 'Review', icon: CheckCircle },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('payfast')
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
  const commission = calculateCommission(subtotal)
  const shippingCost = calculateShipping(subtotal)
  const total = subtotal + commission + shippingCost

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePlaceOrder = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setStep(4)
  }

  const updateShipping = (field: keyof ShippingForm, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }))
  }

  // Confirmation step
  if (step === 4) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-lg text-center animate-fade-in">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <CheckCircle className="h-12 w-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h1>
          <p className="text-gray-500 mb-2">Your order has been placed and is being processed.</p>
          <p className="text-sm text-gray-400 mb-8">
            Order number: <span className="font-semibold text-[#0c4a6e]">ORD-2024-006</span>
          </p>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-left mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
            <div className="space-y-3">
              {ORDER_ITEMS.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity}x {item.name}</span>
                  <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard/client/orders">
              <Button className="bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] hover:from-[#082f49] hover:to-[#0c4a6e] rounded-xl">
                <Truck className="h-4 w-4 mr-2" /> Track My Order
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="rounded-xl">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-3 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      </div>

      {/* Progress steps */}
      <div className="max-w-md mx-auto mb-10">
        <div className="flex items-center justify-between">
          {CHECKOUT_STEPS.map((s, i) => {
            const Icon = s.icon
            const active = step === s.id
            const completed = step > s.id
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500',
                      completed
                        ? 'bg-emerald-500 text-white'
                        : active
                          ? 'bg-[#0c4a6e] text-white shadow-lg shadow-[#0c4a6e]/30 scale-110'
                          : 'bg-gray-200 text-gray-400'
                    )}
                  >
                    {completed ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <span className={cn('text-xs mt-1.5 font-medium', step >= s.id ? 'text-gray-900' : 'text-gray-400')}>
                    {s.title}
                  </span>
                </div>
                {i < CHECKOUT_STEPS.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-3 h-1 rounded-full overflow-hidden bg-gray-200">
                    <div className={cn('h-full rounded-full transition-all duration-700 ease-out', completed ? 'bg-emerald-500 w-full' : 'w-0')} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 animate-fade-in">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="h-5 w-5 text-[#0d9488]" />
                <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
              </div>
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input type="text" required value={shipping.fullName} onChange={(e) => updateShipping('fullName', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                    <input type="tel" required value={shipping.phone} onChange={(e) => updateShipping('phone', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="+27 82 123 4567" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                  <input type="email" required value={shipping.email} onChange={(e) => updateShipping('email', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address *</label>
                  <input type="text" required value={shipping.address} onChange={(e) => updateShipping('address', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="123 Main Street" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                    <input type="text" required value={shipping.city} onChange={(e) => updateShipping('city', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="Johannesburg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Province *</label>
                    <select required value={shipping.province} onChange={(e) => updateShipping('province', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm">
                      <option value="">Select...</option>
                      {PROVINCES.map((p) => (<option key={p} value={p}>{p}</option>))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Postal Code *</label>
                    <input type="text" required value={shipping.postalCode} onChange={(e) => updateShipping('postalCode', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="2000" />
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] hover:from-[#082f49] hover:to-[#0c4a6e] rounded-xl shadow-lg shadow-[#0c4a6e]/20 font-semibold mt-2">
                  Continue to Payment <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              {/* Shipping summary */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#0d9488]" />
                    <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-[#0d9488] hover:text-[#0c4a6e]">
                    Edit
                  </Button>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-900">{shipping.fullName}</p>
                  <p className="text-sm text-gray-500">{shipping.address}</p>
                  <p className="text-sm text-gray-500">{shipping.city}, {shipping.province} {shipping.postalCode}</p>
                  <p className="text-sm text-gray-500 mt-1">{shipping.phone} · {shipping.email}</p>
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="h-5 w-5 text-[#0d9488]" />
                  <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
                </div>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => {
                    const active = paymentMethod === method.id
                    return (
                      <label
                        key={method.id}
                        className={cn(
                          'flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300',
                          active
                            ? 'border-[#0d9488] bg-[#0d9488]/5 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={active}
                          onChange={() => setPaymentMethod(method.id)}
                          className="w-4 h-4 text-[#0d9488] focus:ring-[#0d9488]"
                        />
                        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', active ? 'bg-[#0d9488]/10' : 'bg-gray-100')}>
                          <method.icon className={cn('h-5 w-5', active ? 'text-[#0d9488]' : 'text-gray-500')} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-900">{method.label}</p>
                            {method.badge && (
                              <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                {method.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{method.description}</p>
                        </div>
                        {active && <CheckCircle className="h-5 w-5 text-[#0d9488] shrink-0" />}
                      </label>
                    )
                  })}
                </div>
                <Button
                  size="lg"
                  className="w-full mt-6 bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] hover:from-[#082f49] hover:to-[#0c4a6e] rounded-xl shadow-lg shadow-[#0c4a6e]/20 font-semibold"
                  onClick={() => setStep(3)}
                >
                  Review Order <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              {/* Shipping summary */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#0d9488]" />
                    <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-[#0d9488]">Edit</Button>
                </div>
                <p className="text-sm text-gray-700">{shipping.fullName}, {shipping.address}, {shipping.city}, {shipping.province} {shipping.postalCode}</p>
              </div>

              {/* Payment summary */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#0d9488]" />
                    <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setStep(2)} className="text-[#0d9488]">Edit</Button>
                </div>
                <p className="text-sm text-gray-700">{PAYMENT_METHODS.find(m => m.id === paymentMethod)?.label}</p>
              </div>

              {/* Items */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-5 w-5 text-[#0d9488]" />
                  <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
                </div>
                <div className="space-y-3">
                  {ORDER_ITEMS.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-lg shrink-0">
                        {item.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.supplier} · Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] hover:from-[#082f49] hover:to-[#0c4a6e] rounded-xl shadow-lg shadow-[#0c4a6e]/20 font-semibold"
                onClick={handlePlaceOrder}
                loading={isSubmitting}
              >
                <Lock className="h-4 w-4 mr-2" />
                Place Order — {formatCurrency(total)}
              </Button>
              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" /> Your payment information is secure and encrypted
              </p>
            </div>
          )}
        </div>

        {/* Order Summary sidebar */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-24 overflow-hidden">
            <div className="bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] p-5">
              <h2 className="text-lg font-semibold text-white">Order Summary</h2>
            </div>
            <div className="p-5">
              <div className="space-y-3 mb-4">
                {ORDER_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-lg shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900 shrink-0">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Platform fee ({Math.round(COMMISSION_RATE * 100)}%)</span>
                  <span className="font-medium">{formatCurrency(commission)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={cn('font-medium', shippingCost === 0 ? 'text-emerald-600' : '')}>
                    {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
            <div className="px-5 pb-5">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Shield className="h-3.5 w-3.5" />
                <span>Secure checkout · 30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
