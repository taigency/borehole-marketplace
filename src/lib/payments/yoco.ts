// Yoco Payment Gateway Integration

import crypto from 'crypto'

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

/**
 * Verifies a Yoco webhook using its Svix-style signing scheme.
 *
 * Yoco signs `${webhook-id}.${webhook-timestamp}.${body}` with an HMAC-SHA256
 * keyed by the base64 material of the webhook signing secret (the part after
 * the `whsec_` prefix), and sends the result base64-encoded in the
 * `webhook-signature` header as one or more space-separated `v1,<sig>` tokens.
 *
 * Pass the RAW request body (not re-serialised JSON) and the relevant headers.
 * Comparison is constant-time to avoid leaking the signature via timing.
 */
export function verifyYocoWebhook(
  payload: string,
  headers: {
    id: string | null
    timestamp: string | null
    signature: string | null
  }
): boolean {
  const secret = process.env.YOCO_WEBHOOK_SECRET || ''
  if (!secret || !headers.id || !headers.timestamp || !headers.signature) {
    return false
  }

  // The signing key is the base64 payload after the `whsec_` prefix.
  const secretBytes = Buffer.from(secret.replace(/^whsec_/, ''), 'base64')
  const signedContent = `${headers.id}.${headers.timestamp}.${payload}`

  const expected = crypto
    .createHmac('sha256', secretBytes)
    .update(signedContent)
    .digest('base64')
  const expectedBuf = Buffer.from(expected)

  // The header may carry multiple space-separated `v1,<signature>` tokens.
  return headers.signature.split(' ').some((token) => {
    const provided = token.includes(',') ? token.split(',')[1] : token
    const providedBuf = Buffer.from(provided)
    return (
      providedBuf.length === expectedBuf.length &&
      crypto.timingSafeEqual(providedBuf, expectedBuf)
    )
  })
}
