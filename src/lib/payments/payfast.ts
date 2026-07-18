import crypto from 'crypto'

// PayFast Configuration
const PAYFAST_CONFIG = {
  merchantId: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || '',
  merchantKey: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || '',
  passphrase: process.env.PAYFAST_PASSPHRASE || '',
  sandbox: process.env.PAYFAST_SANDBOX === 'true',
  baseUrl: process.env.PAYFAST_SANDBOX === 'true' 
    ? 'https://sandbox.payfast.co.za/eng/process' 
    : 'https://www.payfast.co.za/eng/process',
  validateUrl: process.env.PAYFAST_SANDBOX === 'true'
    ? 'https://sandbox.payfast.co.za/eng/query/validate'
    : 'https://www.payfast.co.za/eng/query/validate',
}

export interface PayFastPaymentData {
  orderId: string
  amount: number
  itemName: string
  itemDescription?: string
  customerEmail: string
  customerFirstName?: string
  customerLastName?: string
  returnUrl: string
  cancelUrl: string
  notifyUrl: string
}

export function generatePayFastUrl(data: PayFastPaymentData): string {
  const params: Record<string, string> = {
    merchant_id: PAYFAST_CONFIG.merchantId,
    merchant_key: PAYFAST_CONFIG.merchantKey,
    return_url: data.returnUrl,
    cancel_url: data.cancelUrl,
    notify_url: data.notifyUrl,
    m_payment_id: data.orderId,
    amount: data.amount.toFixed(2),
    item_name: data.itemName,
    item_description: data.itemDescription || data.itemName,
    email_confirmation: '1',
    confirmation_address: data.customerEmail,
  }

  if (data.customerFirstName) params.name_first = data.customerFirstName
  if (data.customerLastName) params.name_last = data.customerLastName

  // Generate signature
  const signature = generatePayFastSignature(params)
  params.signature = signature

  // Build URL
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

  return `${PAYFAST_CONFIG.baseUrl}?${queryString}`
}

function generatePayFastSignature(params: Record<string, string>): string {
  // Sort parameters alphabetically
  const sortedParams = Object.entries(params)
    .filter(([key]) => key !== 'signature')
    .sort(([a], [b]) => a.localeCompare(b))

  // Create query string
  let queryString = sortedParams
    .map(([key, value]) => `${key}=${encodeURIComponent(value).replace(/%20/g, '+')}`)
    .join('&')

  // Add passphrase if set
  if (PAYFAST_CONFIG.passphrase) {
    queryString += `&passphrase=${encodeURIComponent(PAYFAST_CONFIG.passphrase)}`
  }

  // Generate MD5 hash
  return crypto.createHash('md5').update(queryString).digest('hex')
}

export async function validatePayFastNotification(
  params: Record<string, string>
): Promise<boolean> {
  try {
    // Verify signature
    const receivedSignature = params.signature
    const paramsWithoutSignature = { ...params }
    delete paramsWithoutSignature.signature

    const expectedSignature = generatePayFastSignature(paramsWithoutSignature)
    
    if (receivedSignature !== expectedSignature) {
      console.error('PayFast signature mismatch')
      return false
    }

    // Verify with PayFast server
    const response = await fetch(PAYFAST_CONFIG.validateUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(params).toString(),
    })

    const result = await response.text()
    return result.trim() === 'VALID'
  } catch (error) {
    console.error('PayFast validation error:', error)
    return false
  }
}

export function parsePayFastNotification(body: Record<string, string>) {
  return {
    orderId: body.m_payment_id,
    paymentId: body.pf_payment_id,
    status: body.payment_status,
    amount: parseFloat(body.amount_gross),
    fee: parseFloat(body.amount_fee),
    net: parseFloat(body.amount_net),
    firstName: body.name_first,
    lastName: body.name_last,
    email: body.email_address,
    merchantId: body.merchant_id,
  }
}
