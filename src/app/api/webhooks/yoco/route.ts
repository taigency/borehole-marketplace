import { NextResponse } from 'next/server'
import { verifyYocoWebhook } from '@/lib/payments/yoco'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-yoco-signature') || ''

    // Verify webhook signature
    const isValid = verifyYocoWebhook(body, signature)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)
    const supabase = await createClient()

    switch (event.type) {
      case 'payment.succeeded': {
        const orderId = event.payload.metadata?.orderId
        if (orderId) {
          await supabase
            .from('orders')
            .update({
              payment_status: 'paid',
              status: 'confirmed',
            })
            .eq('order_number', orderId)
        }
        break
      }
      case 'payment.failed': {
        const orderId = event.payload.metadata?.orderId
        if (orderId) {
          await supabase
            .from('orders')
            .update({
              payment_status: 'failed',
            })
            .eq('order_number', orderId)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Yoco webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
