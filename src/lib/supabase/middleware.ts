import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Page routes that require an authenticated session. API routes enforce their
// own auth (returning 401 JSON rather than redirecting), so they are not listed
// here.
const PROTECTED_PREFIXES = ['/dashboard', '/checkout']

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Do NOT run any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very
  // hard to debug issues with users being randomly logged out.
  //
  // IMPORTANT: Use getUser() instead of getSession() in server code.
  // getUser() is safe and hits the Supabase Auth server.
  // getSession() reads from cookies which can be tampered with.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect authenticated areas. Unauthenticated users hitting a protected
  // page are redirected to login with a `redirectedFrom` param so they can be
  // returned to where they were headed after signing in.
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )

  if (!user && isProtected) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
