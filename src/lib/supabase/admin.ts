import { createClient } from '@supabase/supabase-js'

/**
 * Server-only Supabase client using the service-role key.
 *
 * This bypasses Row Level Security, so it must NEVER be imported into client
 * components or any code that ships to the browser. Use it only in trusted
 * server contexts (webhooks, and privileged writes after the caller has been
 * authenticated) — and always scope queries by IDs you derived server-side,
 * never by IDs taken directly from the request.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase admin credentials: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set.'
    )
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
