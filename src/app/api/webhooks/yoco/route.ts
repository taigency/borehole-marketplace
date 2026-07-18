import { NextResponse } from 'next/server'
import { verifyYocoWebhook } from '@/lib/payments/yoco'
import { createAdminClient } from '@/lib/supabase/admin'

// Small tolerance (in ZAR) for float rounding when comparing paid vs expected.
const AMOUNT_TOLERANCE = 0.01

export async function POST(request: Request) {
  try {
    // Read the raw body — signature verification must run over the exact bytes.
    const body = await request.text()

    const isValid = verifyYocoWebhook(body, {
      id: request.headers.get('webhook-id'),
      timestamp: request.headers.get('webhook-timestamp'),
      signature: request.headers.get('webhook-signature'),
    })

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)
    const supabase = createAdminClient()

    switch (event.type) {
      case 'payment.succeeded': {
        const orderId = event.payload?.metadata?.orderId
        if (!orderId) break

        // Verify the amount paid matches the order total before confirming.
        const { data: order } = await supabase
          .from('orders')
          .select('total, payment_status')
          .eq('order_number', orderId)
          .maybeSingle()

        if (!order) {
          console.error(`Yoco webhook: unknown order ${orderId}`)
          break
        }

        // Yoco reports the amount in cents.
        const paid = Number(event.payload?.amount ?? 0) / 100
        const expected = Number(order.total ?? 0)
        if (Math.abs(paid - expected) > AMOUNT_TOLERANCE) {
          console.error(
            `Yoco webhook: amount mismatch for ${orderId} — paid ${paid}, expected ${expected}`
          )
          break
        }

        await supabase
          .from('orders')
          .update({ payment_status: 'paid', status: 'confirmed' })
          .eq('order_number', orderId)
        break
      }
      case 'payment.failed': {
        const orderId = event.payload?.metadata?.orderId
        if (orderId) {
          await supabase
            .from('orders')
            .update({ payment_status: 'failed' })
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
