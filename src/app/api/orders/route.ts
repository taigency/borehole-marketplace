import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { calculateOrderTotals } from '@/lib/pricing'

interface OrderItemInput {
  product_id: string
  quantity: number
}

/**
 * GET /api/orders
 *
 * Returns orders scoped to the authenticated caller:
 *  - admins may pass customerId/supplierId/status filters
 *  - a user who owns a supplier profile sees that supplier's orders
 *  - everyone else sees only their own orders (customer_id = their id)
 *
 * Client-supplied ids are ignored for non-admins, closing the IDOR where any
 * caller could read any customer's orders via ?customerId=.
 */
export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 50
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0

    const admin = createAdminClient()

    const { data: profile } = await admin
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    let query = admin
      .from('orders')
      .select('*, order_items(*), suppliers(company_name), users!customer_id(name)')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (profile?.role === 'admin') {
      // Admins may filter freely.
      const customerId = searchParams.get('customerId')
      const supplierId = searchParams.get('supplierId')
      if (customerId) query = query.eq('customer_id', customerId)
      if (supplierId) query = query.eq('supplier_id', supplierId)
    } else {
      // Is this user a supplier? If so, scope to their supplier's orders.
      const { data: supplierRow } = await admin
        .from('suppliers')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle()

      if (supplierRow) {
        query = query.eq('supplier_id', supplierRow.id)
      } else {
        query = query.eq('customer_id', user.id)
      }
    }

    if (status) query = query.eq('status', status)

    const { data, error } = await query
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data || [], total: data?.length || 0 })
  } catch (error) {
    console.error('Orders GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

/**
 * POST /api/orders
 *
 * Creates an order for the authenticated user. The customer is taken from the
 * session (never the request body), and every line price is recomputed from the
 * products table, so a client cannot spoof another customer or tamper with
 * prices. Totals are computed by the shared pricing helper.
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    const supplierId: unknown = body.supplier_id
    const rawItems: unknown = body.items

    if (typeof supplierId !== 'string' || !Array.isArray(rawItems) || rawItems.length === 0) {
      return NextResponse.json(
        { error: 'supplier_id and a non-empty items array are required' },
        { status: 400 }
      )
    }

    // Normalise and validate item shape (product_id + positive integer quantity).
    const items: OrderItemInput[] = []
    for (const raw of rawItems) {
      const productId = (raw as { product_id?: unknown }).product_id
      const quantity = (raw as { quantity?: unknown }).quantity
      if (
        typeof productId !== 'string' ||
        typeof quantity !== 'number' ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return NextResponse.json(
          { error: 'Each item needs a product_id and an integer quantity >= 1' },
          { status: 400 }
        )
      }
      items.push({ product_id: productId, quantity })
    }

    const admin = createAdminClient()

    // Confirm the supplier exists.
    const { data: supplier, error: supplierError } = await admin
      .from('suppliers')
      .select('id')
      .eq('id', supplierId)
      .maybeSingle()

    if (supplierError || !supplier) {
      return NextResponse.json({ error: 'Unknown supplier' }, { status: 400 })
    }

    // Fetch authoritative product data. Prices and names come from the DB,
    // never from the request body.
    const productIds = [...new Set(items.map((i) => i.product_id))]
    const { data: products, error: productsError } = await admin
      .from('products')
      .select('id, name, price, active, supplier_id, min_order_quantity')
      .in('id', productIds)

    if (productsError) {
      return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
    }

    const productById = new Map((products ?? []).map((p) => [p.id, p]))

    const orderItems = items.map((item) => {
      const product = productById.get(item.product_id)
      if (!product) {
        throw new OrderValidationError(`Product ${item.product_id} not found`)
      }
      if (!product.active) {
        throw new OrderValidationError(`Product ${product.name} is not available`)
      }
      if (product.supplier_id !== supplierId) {
        throw new OrderValidationError('All items must belong to the same supplier')
      }
      if (product.min_order_quantity && item.quantity < product.min_order_quantity) {
        throw new OrderValidationError(
          `${product.name} requires a minimum quantity of ${product.min_order_quantity}`
        )
      }
      const unitPrice = Number(product.price)
      return {
        product_id: product.id,
        product_name: product.name,
        quantity: item.quantity,
        unit_price: unitPrice,
        total_price: Math.round((unitPrice * item.quantity + Number.EPSILON) * 100) / 100,
      }
    })

    const totals = calculateOrderTotals(orderItems)
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`

    const { data: order, error: orderError } = await admin
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_id: user.id,
        supplier_id: supplierId,
        status: 'pending',
        subtotal: totals.subtotal,
        commission: totals.commission,
        total: totals.total,
        currency: 'ZAR',
        shipping_street: body.shipping_address?.street ?? null,
        shipping_city: body.shipping_address?.city ?? null,
        shipping_province: body.shipping_address?.province ?? null,
        shipping_postal_code: body.shipping_address?.postal_code ?? null,
        payment_status: 'pending',
        notes: typeof body.notes === 'string' ? body.notes : null,
      })
      .select()
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: orderError?.message ?? 'Failed to create order' },
        { status: 500 }
      )
    }

    const { error: itemsError } = await admin
      .from('order_items')
      .insert(orderItems.map((item) => ({ ...item, order_id: order.id })))

    if (itemsError) {
      // Roll back the order so we don't leave an order with no items.
      await admin.from('orders').delete().eq('id', order.id)
      return NextResponse.json({ error: itemsError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: { ...order, shipping: totals.shipping },
      message: 'Order created successfully',
    })
  } catch (error) {
    if (error instanceof OrderValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Orders POST error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}

class OrderValidationError extends Error {}
