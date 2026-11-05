import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export interface SupabaseConfig {
  url: string
  anonKey: string
  isConfigured: boolean
}

/**
 * Universal environment variable resolver for Supabase.
 * Works seamlessly in both browser (Vite import.meta.env) and server/SSR (Node process.env)
 * on Vercel, Netlify, and local development.
 */
export function getSupabaseConfig(): SupabaseConfig {
  let url = ''
  let anonKey = ''

  // 1. Check Node / Server environment (process.env on Vercel)
  if (typeof process !== 'undefined' && process.env) {
    url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || ''
    anonKey =
      process.env.VITE_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.SUPABASE_KEY ||
      ''
  }

  // 2. Check Browser / Client Vite environment (import.meta.env)
  if ((!url || !anonKey) && typeof import.meta !== 'undefined' && import.meta.env) {
    url = url || import.meta.env.VITE_SUPABASE_URL || ''
    anonKey = anonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  }

  const isConfigured = Boolean(
    url &&
      anonKey &&
      url.trim().startsWith('http') &&
      anonKey.trim().length > 10,
  )

  return {
    url: url.trim(),
    anonKey: anonKey.trim(),
    isConfigured,
  }
}

let cachedClient: SupabaseClient | null = null

/**
 * Client-safe Supabase instance (uses anonymous key with RLS enforcement)
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (cachedClient) return cachedClient

  const { url, anonKey, isConfigured } = getSupabaseConfig()
  if (!isConfigured) {
    return null
  }

  try {
    cachedClient = createClient(url, anonKey, {
      auth: {
        persistSession: typeof window !== 'undefined',
        autoRefreshToken: typeof window !== 'undefined',
      },
    })
    return cachedClient
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err)
    return null
  }
}

/**
 * Server-safe Supabase instance (optionally utilizes SUPABASE_SERVICE_ROLE_KEY if present)
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  const { url, anonKey, isConfigured } = getSupabaseConfig()
  if (!isConfigured) return null

  const serviceKey =
    (typeof process !== 'undefined' && process.env?.SUPABASE_SERVICE_ROLE_KEY) || anonKey

  try {
    return createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  } catch (err) {
    console.error('Failed to initialize Supabase server client:', err)
    return null
  }
}

export const supabase = getSupabaseClient()
