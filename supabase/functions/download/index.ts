// =====================================================================
// AUVYRA ONLINE BOOKSTORE — SUPABASE EDGE FUNCTION: SECURE DIGITAL DOWNLOAD
// File: supabase/functions/download/index.ts
// Description: Two-phase safe download token consumption:
//              1. Validates token, payment status, expiry, and download limits under row lock.
//              2. Generates short-lived (60-second) signed URL from private 'digital-assets' bucket.
//              3. Records download count increment ONLY after signed URL is successfully created.
//              NEVER reveals internal storage paths or service keys to the client.
// =====================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase service credentials are not configured')
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    })

    // Extract token from query params or request body
    const url = new URL(req.url)
    let token = url.searchParams.get('token')
    const redirectMode = url.searchParams.get('redirect') === 'true'

    if (!token && req.method === 'POST') {
      try {
        const body = await req.json()
        token = body.token
      } catch {
        // No body
      }
    }

    if (!token || token.trim() === '') {
      return new Response(
        JSON.stringify({ success: false, error: 'A valid download token is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // PHASE 1: Validate token, check payment, and retrieve private file path under lock
    const { data: valResult, error: valError } = await supabaseAdmin.rpc('validate_download_token', {
      p_token: token.trim(),
    })

    if (valError) {
      return new Response(
        JSON.stringify({ success: false, error: valError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    if (!valResult || !valResult.valid) {
      return new Response(
        JSON.stringify({ success: false, error: valResult?.error || 'Download link is invalid or expired' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const { token_id, digital_file_path, product_name, remaining_downloads } = valResult

    // PHASE 2: Generate short-lived signed URL (60 seconds)
    // Note: private bucket is 'digital-assets'
    const { data: signedData, error: signError } = await supabaseAdmin.storage
      .from('digital-assets')
      .createSignedUrl(digital_file_path, 60, {
        download: `${product_name.replace(/[^a-zA-Z0-9.-]/g, '_')}.pdf`,
      })

    if (signError || !signedData?.signedUrl) {
      console.error('Storage signed URL error:', signError)
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Digital file asset is currently unavailable. Please contact AUVYRA support.',
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // PHASE 3: Commit download consumption only after signed URL is verified
    await supabaseAdmin.rpc('record_download_success', {
      p_token_id: token_id,
    })

    // If client requested direct redirect
    if (redirectMode) {
      return Response.redirect(signedData.signedUrl, 307)
    }

    return new Response(
      JSON.stringify({
        success: true,
        download_url: signedData.signedUrl,
        expires_in_seconds: 60,
        product_name,
        remaining_downloads: remaining_downloads - 1,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Download fulfillment failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
