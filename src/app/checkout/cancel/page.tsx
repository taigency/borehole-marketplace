'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { XCircle, ArrowRight, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function CheckoutCancelPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600 mb-6">
            Your payment was not completed. No charges have been made to your account.
          </p>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              If you experienced any issues, please try again or contact our support team.
            </p>
            
            <div className="flex flex-col gap-3 pt-4">
              {orderId && (
                <Link href={`/checkout?orderId=${orderId}`}>
                  <Button className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                </Link>
              )}
              <Link href="/cart">
                <Button variant="outline" className="w-full">
                  Return to Cart
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
