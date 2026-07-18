import { NextResponse } from 'next/server'
import { validatePayFastNotification, parsePayFastNotification } from '@/lib/payments/payfast'
import { createAdminClient } from '@/lib/supabase/admin'

// Small tolerance (in ZAR) for float rounding when comparing paid vs expected.
const AMOUNT_TOLERANCE = 0.01

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const body: Record<string, string> = {}
    formData.forEach((value, key) => {
      body[key] = value.toString()
    })

    // Validate notification with PayFast (signature + server-side confirmation).
    const isValid = await validatePayFastNotification(body)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid notification' }, { status: 400 })
    }

    const payment = parsePayFastNotification(body)
    const supabase = createAdminClient()

    if (payment.status === 'COMPLETE') {
      // Confirm the gross amount matches what we expect for this order before
      // marking it paid — never trust the notification's amount alone.
      const { data: order } = await supabase
        .from('orders')
        .select('total')
        .eq('order_number', payment.orderId)
        .maybeSingle()

      if (!order) {
        console.error(`PayFast webhook: unknown order ${payment.orderId}`)
        return new NextResponse('OK', { status: 200 })
      }

      const expected = Number(order.total ?? 0)
      if (Math.abs(payment.amount - expected) > AMOUNT_TOLERANCE) {
        console.error(
          `PayFast webhook: amount mismatch for ${payment.orderId} — paid ${payment.amount}, expected ${expected}`
        )
        return new NextResponse('OK', { status: 200 })
      }

      await supabase
        .from('orders')
        .update({ payment_status: 'paid', status: 'confirmed' })
        .eq('order_number', payment.orderId)
    } else if (payment.status === 'FAILED') {
      await supabase
        .from('orders')
        .update({ payment_status: 'failed' })
        .eq('order_number', payment.orderId)
    } else if (payment.status === 'CANCELLED') {
      await supabase
        .from('orders')
        .update({ payment_status: 'failed', status: 'cancelled' })
        .eq('order_number', payment.orderId)
    }

    // Always return 200 so PayFast does not retry a notification we've handled.
    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('PayFast webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
