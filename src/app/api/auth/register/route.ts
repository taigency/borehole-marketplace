import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, phone, role, company, province, city } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone,
          role: role || 'customer',
        },
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        name,
        phone: phone || null,
        role: role || 'customer',
        company: company || null,
        province: province || null,
        city: city || null,
        verified: false,
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Don't fail the request if profile creation fails
      // The user is already created in auth
    }

    // If user is a supplier, create supplier profile
    if (role === 'supplier' && company) {
      const { error: supplierError } = await supabase
        .from('suppliers')
        .insert({
          user_id: authData.user.id,
          company_name: company,
          description: body.description || null,
          categories: body.categories || [],
          contact_email: email,
          contact_phone: phone || null,
        })

      if (supplierError) {
        console.error('Supplier creation error:', supplierError)
      }
    }

    return NextResponse.json({
      success: true,
      user: authData.user,
      session: authData.session,
      message: 'Registration successful. Please check your email to verify your account.',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
