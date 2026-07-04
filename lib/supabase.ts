import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — cannot set cookies, ignored
          }
        },
      },
    }
  )
}

export type Doctor = {
  id: string
  full_name: string
  specialty: string | null
  bio: string | null
  avatar_url: string | null
  is_active: boolean
  is_online: boolean
  days: number[]
}
