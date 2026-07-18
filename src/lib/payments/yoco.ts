// Yoco Payment Gateway Integration

const YOCO_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_YOCO_PUBLIC_KEY || '',
  secretKey: process.env.YOCO_SECRET_KEY || '',
  baseUrl: 'https://payments.yoco.com/api',
}

export interface YocoPaymentData {
  orderId: string
  amount: number // Amount in cents
  currency: string
  customerEmail: string
  metadata?: Record<string, string>
}

export interface YocoCheckoutResponse {
  id: string
  redirectUrl: string
  status: string
}

export async function createYocoCheckout(
  data: YocoPaymentData
): Promise<YocoCheckoutResponse> {
  const response = await fetch(`${YOCO_CONFIG.baseUrl}/checkouts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${YOCO_CONFIG.secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: Math.round(data.amount * 100), // Convert to cents
      currency: data.currency || 'ZAR',
      metadata: {
        orderId: data.orderId,
        ...data.metadata,
      },
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?orderId=${data.orderId}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel?orderId=${data.orderId}`,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Yoco checkout failed: ${error.message}`)
  }

  return response.json()
}

export async function verifyYocoPayment(
  checkoutId: string
): Promise<{ status: string; amount: number }> {
  const response = await fetch(`${YOCO_CONFIG.baseUrl}/checkouts/${checkoutId}`, {
    headers: {
      'Authorization': `Bearer ${YOCO_CONFIG.secretKey}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to verify Yoco payment')
  }

  const data = await response.json()
  return {
    status: data.status,
    amount: data.amount / 100, // Convert from cents
  }
}

export function verifyYocoWebhook(
  payload: string,
  signature: string
): boolean {
  // Yoco uses HMAC SHA256 for webhook verification
  const crypto = require('crypto')
  const expectedSignature = crypto
    .createHmac('sha256', YOCO_CONFIG.secretKey)
    .update(payload)
    .digest('hex')

  return signature === expectedSignature
}
