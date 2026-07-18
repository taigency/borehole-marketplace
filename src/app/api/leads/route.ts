import { NextResponse } from 'next/server'
import { createLead, getLeads } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['customer_name', 'customer_email', 'customer_phone', 'service_type', 'location', 'description']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        )
      }
    }

    const { data, error } = await createLead({
      source: 'website',
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      service_type: body.service_type,
      location: body.location,
      province: body.province || body.location,
      budget: body.budget ? parseFloat(body.budget) : null,
      description: body.description,
      status: 'new',
      score: 50,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data,
      message: 'Lead submitted successfully',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || undefined
    const serviceType = searchParams.get('serviceType') || undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined

    const { data, error } = await getLeads({
      status,
      serviceType,
      limit,
      offset,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data || [], total: data?.length || 0 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}
