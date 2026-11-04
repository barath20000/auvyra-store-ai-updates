// =====================================================================
// AUVYRA ONLINE BOOKSTORE — SUPABASE EDGE FUNCTION: RELEASE EXPIRED STOCK
// File: supabase/functions/release-expired-stock/index.ts
// Description: Scheduled / CRON background worker that scans for abandoned
//              pending orders older than order_payment_timeout_minutes,
//              restores physical inventory via release_order_stock RPC,
//              and marks the orders failed.
// =====================================================================

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

serve(async (req: Request) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    const cronSecret = Deno.env.get('CRON_SECRET')

    // Verify authorized caller (cron secret or bearer service key)
    const authHeader = req.headers.get('Authorization')
    const cronHeader = req.headers.get('x-cron-secret')

    const isAuthorized =
      (cronSecret && cronHeader === cronSecret) ||
      (authHeader && authHeader === `Bearer ${supabaseServiceKey}`)

    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'Unauthorized invocation' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase service credentials not configured')
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    })

    // Fetch store payment timeout setting
    const { data: settings } = await supabaseAdmin
      .from('store_settings')
      .select('order_payment_timeout_minutes')
      .eq('id', 1)
      .single()

    const timeoutMinutes = settings?.order_payment_timeout_minutes || 30
    const cutoffTimestamp = new Date(Date.now() - timeoutMinutes * 60 * 1000).toISOString()

    // Find pending orders with unreleased physical stock older than cutoff
    const { data: expiredOrders, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('id, created_at, total_inr')
      .eq('payment_status', 'pending')
      .eq('stock_released', false)
      .eq('has_physical_items', true)
      .lt('created_at', cutoffTimestamp)
      .limit(50)

    if (fetchError) {
      throw fetchError
    }

    const results = []
    for (const order of expiredOrders || []) {
      const { data: releaseResult, error: rpcError } = await supabaseAdmin.rpc('release_order_stock', {
        p_order_id: order.id,
        p_reason: `Automatic expiration: unpaid after ${timeoutMinutes} minutes`,
      })

      results.push({
        order_id: order.id,
        success: !rpcError && releaseResult?.success,
        details: rpcError?.message || releaseResult,
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        timeout_minutes: timeoutMinutes,
        scanned: expiredOrders?.length || 0,
        processed: results,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Worker failure' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
})
