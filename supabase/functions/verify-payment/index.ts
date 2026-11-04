// =====================================================================
// AUVYRA ONLINE BOOKSTORE — SUPABASE EDGE FUNCTION: VERIFY PAYMENT
// File: supabase/functions/verify-payment/index.ts
// Description: Dual-layer Razorpay payment verification:
//              1. HMAC-SHA256 Signature verification.
//              2. Direct Razorpay REST API status check (captured, amount, currency).
//              3. Atomic, idempotent database verification via verify_order_payment RPC.
// =====================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import { hmac } from 'https://deno.land/x/hmac@v2.0.1/mod.ts'

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
    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID')
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET')

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase service credentials are not configured')
    }
    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error('Razorpay API credentials are not configured')
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    })

    const body = await req.json()
    const { order_id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    if (!order_id || !razorpay_payment_id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing order_id or razorpay_payment_id' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // Step 1: If client-side signature was supplied, verify HMAC-SHA256
    if (razorpay_order_id && razorpay_signature) {
      const generatedSignature = hmac(
        'sha256',
        razorpayKeySecret,
        `${razorpay_order_id}|${razorpay_payment_id}`,
        'utf8',
        'hex',
      )

      if (generatedSignature !== razorpay_signature) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid Razorpay payment signature' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
      }
    }

    // Step 2: Query Razorpay API directly for ground-truth capture status
    const basicAuth = btoa(`${razorpayKeyId}:${razorpayKeySecret}`)
    const rzResponse = await fetch(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
      headers: { Authorization: `Basic ${basicAuth}` },
    })

    if (!rzResponse.ok) {
      const errText = await rzResponse.text()
      return new Response(
        JSON.stringify({ success: false, error: `Failed to query Razorpay: ${errText}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const paymentDetails = await rzResponse.json()

    if (paymentDetails.status !== 'captured') {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Payment is in state "${paymentDetails.status}", not captured.`,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    if (paymentDetails.currency !== 'INR') {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid currency: expected INR' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // Step 3: Invoke trusted backend RPC to verify order in database
    const { data: verifyResult, error: rpcError } = await supabaseAdmin.rpc('verify_order_payment', {
      p_order_id: order_id,
      p_razorpay_payment_id: razorpay_payment_id,
      p_razorpay_order_id: razorpay_order_id || paymentDetails.order_id || null,
      p_amount_paise: paymentDetails.amount,
      p_currency: paymentDetails.currency,
    })

    if (rpcError) {
      return new Response(
        JSON.stringify({ success: false, error: rpcError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    if (!verifyResult || !verifyResult.success) {
      return new Response(
        JSON.stringify(verifyResult || { success: false, error: 'Verification failed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // Step 4: Retrieve generated digital download tokens if digital items exist
    const { data: tokens } = await supabaseAdmin
      .from('digital_download_tokens')
      .select('token, product_id, max_downloads, download_count, expires_at, products(name, format)')
      .eq('order_id', order_id)

    return new Response(
      JSON.stringify({
        success: true,
        order_id,
        payment_id: razorpay_payment_id,
        digital_downloads: tokens || [],
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
