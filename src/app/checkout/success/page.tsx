'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. Your payment has been processed successfully.
          </p>

          {orderId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500">Order Number</p>
              <p className="text-lg font-semibold text-gray-900">{orderId}</p>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              You will receive an email confirmation shortly with your order details.
            </p>
            
            <div className="flex flex-col gap-3 pt-4">
              <Link href="/dashboard/client/orders">
                <Button className="w-full">
                  <Package className="h-4 w-4 mr-2" />
                  View My Orders
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
