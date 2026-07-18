import { NextResponse } from 'next/server'
import { validatePayFastNotification, parsePayFastNotification } from '@/lib/payments/payfast'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const body: Record<string, string> = {}
    formData.forEach((value, key) => {
      body[key] = value.toString()
    })

    // Validate notification with PayFast
    const isValid = await validatePayFastNotification(body)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid notification' }, { status: 400 })
    }

    const payment = parsePayFastNotification(body)
    const supabase = await createClient()

    // Update order based on payment status
    if (payment.status === 'COMPLETE') {
      await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          status: 'confirmed',
        })
        .eq('order_number', payment.orderId)
    } else if (payment.status === 'FAILED') {
      await supabase
        .from('orders')
        .update({
          payment_status: 'failed',
        })
        .eq('order_number', payment.orderId)
    } else if (payment.status === 'CANCELLED') {
      await supabase
        .from('orders')
        .update({
          payment_status: 'failed',
          status: 'cancelled',
        })
        .eq('order_number', payment.orderId)
    }

    // Return 200 to PayFast
    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('PayFast webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
