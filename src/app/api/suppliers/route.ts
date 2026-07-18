import { NextResponse } from 'next/server'
import { getSuppliers } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const location = searchParams.get('location') || undefined
    const search = searchParams.get('search') || undefined
    const verified = searchParams.get('verified') === 'true' ? true : undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined

    const { data, error } = await getSuppliers({
      category,
      location,
      search,
      verified,
      limit,
      offset,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data || [], total: data?.length || 0 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch suppliers' }, { status: 500 })
  }
}
