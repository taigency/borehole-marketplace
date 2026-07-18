import { NextResponse } from 'next/server'
import { createOrder, getOrders } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const customerId = searchParams.get('customerId') || undefined
    const supplierId = searchParams.get('supplierId') || undefined
    const status = searchParams.get('status') || undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined

    const { data, error } = await getOrders({
      customerId,
      supplierId,
      status,
      limit,
      offset,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data || [], total: data?.length || 0 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.customer_id || !body.supplier_id || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: 'customer_id, supplier_id, and items are required' },
        { status: 400 }
      )
    }

    // Calculate totals
    const subtotal = body.items.reduce((sum: number, item: { total_price: number }) => sum + (item.total_price || 0), 0)
    const commission = subtotal * 0.10 // 10% commission
    const total = subtotal + commission

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`

    const { data, error } = await createOrder(
      {
        order_number: orderNumber,
        customer_id: body.customer_id,
        supplier_id: body.supplier_id,
        status: 'pending',
        subtotal,
        commission,
        total,
        currency: 'ZAR',
        shipping_street: body.shipping_address?.street,
        shipping_city: body.shipping_address?.city,
        shipping_province: body.shipping_address?.province,
        shipping_postal_code: body.shipping_address?.postal_code,
        payment_status: 'pending',
        notes: body.notes,
      },
      body.items.map((item: { product_id: string; product_name: string; quantity: number; unit_price: number; total_price: number }) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
      }))
    )

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Order created successfully',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
