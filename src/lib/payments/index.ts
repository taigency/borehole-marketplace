export { generatePayFastUrl, validatePayFastNotification, parsePayFastNotification } from './payfast'
export { createYocoCheckout, verifyYocoPayment, verifyYocoWebhook } from './yoco'

export type PaymentGateway = 'payfast' | 'yoco'

export interface PaymentResult {
  success: boolean
  orderId: string
  paymentId?: string
  redirectUrl?: string
  error?: string
}

// Unified payment interface
export async function createPayment(
  gateway: PaymentGateway,
  data: {
    orderId: string
    amount: number
    currency: string
    customerEmail: string
    customerName?: string
    itemName: string
  }
): Promise<PaymentResult> {
  try {
    if (gateway === 'payfast') {
      const { generatePayFastUrl } = await import('./payfast')
      const url = generatePayFastUrl({
        orderId: data.orderId,
        amount: data.amount,
        itemName: data.itemName,
        customerEmail: data.customerEmail,
        customerFirstName: data.customerName?.split(' ')[0],
        customerLastName: data.customerName?.split(' ').slice(1).join(' '),
        returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
        notifyUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/payfast`,
      })
      return { success: true, orderId: data.orderId, redirectUrl: url }
    }

    if (gateway === 'yoco') {
      const { createYocoCheckout } = await import('./yoco')
      const checkout = await createYocoCheckout({
        orderId: data.orderId,
        amount: data.amount,
        currency: data.currency,
        customerEmail: data.customerEmail,
      })
      return { success: true, orderId: data.orderId, redirectUrl: checkout.redirectUrl }
    }

    return { success: false, orderId: data.orderId, error: 'Unsupported gateway' }
  } catch (error) {
    return {
      success: false,
      orderId: data.orderId,
      error: error instanceof Error ? error.message : 'Payment creation failed',
    }
  }
}
