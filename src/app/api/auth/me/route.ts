import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * Returns the currently authenticated user together with their profile row.
 * Used by the client `useAuth` hook. Returns 401 when there is no session.
 */
export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('users')
      .select('id, name, email, role')
      .eq('id', user.id)
      .single()

    return NextResponse.json({
      user: {
        id: user.id,
        email: profile?.email ?? user.email,
        name: profile?.name ?? user.user_metadata?.name ?? '',
        role: profile?.role ?? user.user_metadata?.role ?? 'customer',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to load user' }, { status: 500 })
  }
}
