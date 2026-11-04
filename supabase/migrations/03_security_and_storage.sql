-- =====================================================================
-- AUVYRA ONLINE BOOKSTORE — SUPABASE MIGRATION (PART 3 OF 3)
-- File: supabase/migrations/03_security_and_storage.sql
-- Description: Storage buckets, storage security policies,
--              Row Level Security (RLS) for all 9 tables,
--              is_auvyra_admin() helper, payment verification RPC,
--              two-phase digital download fulfillment, and safe grants.
-- =====================================================================

-- 1. ADMIN AUTHORIZATION HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION public.is_auvyra_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
      AND is_active = TRUE
  );
$$;

CREATE OR REPLACE FUNCTION public.is_auvyra_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, auth, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid()
      AND role = 'super_admin'
      AND is_active = TRUE
  );
$$;

-- 2. STORAGE BUCKETS INITIALIZATION
-- Bucket: product-covers (Public for CDN image caching)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-covers',
  'product-covers',
  TRUE,
  5242880, -- 5 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = TRUE,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

-- Bucket: digital-assets (STRICTLY PRIVATE: NEVER PUBLIC)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'digital-assets',
  'digital-assets',
  FALSE,
  104857600, -- 100 MB
  ARRAY['application/pdf', 'application/epub+zip']
)
ON CONFLICT (id) DO UPDATE SET
  public = FALSE,
  file_size_limit = 104857600,
  allowed_mime_types = ARRAY['application/pdf', 'application/epub+zip'];

-- 3. STORAGE POLICIES
-- Clean old storage policies
DO $$ BEGIN
  DELETE FROM pg_catalog.pg_policy WHERE polrelid = 'storage.objects'::regclass AND polname LIKE 'auvyra_%';
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Policy 1: Public can view product covers
CREATE POLICY "auvyra_covers_public_read"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-covers');

-- Policy 2: Admins can upload, modify, delete covers
CREATE POLICY "auvyra_covers_admin_write"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-covers' AND public.is_auvyra_admin());

CREATE POLICY "auvyra_covers_admin_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-covers' AND public.is_auvyra_admin())
WITH CHECK (bucket_id = 'product-covers' AND public.is_auvyra_admin());

CREATE POLICY "auvyra_covers_admin_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-covers' AND public.is_auvyra_admin());

-- Policy 3: Digital assets: Admins can view/upload; PUBLIC HAS ZERO ACCESS
CREATE POLICY "auvyra_digital_admin_read"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'digital-assets' AND public.is_auvyra_admin());

CREATE POLICY "auvyra_digital_admin_write"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'digital-assets' AND public.is_auvyra_admin());

CREATE POLICY "auvyra_digital_admin_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'digital-assets' AND public.is_auvyra_admin())
WITH CHECK (bucket_id = 'digital-assets' AND public.is_auvyra_admin());

CREATE POLICY "auvyra_digital_admin_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'digital-assets' AND public.is_auvyra_admin());

-- 4. ENABLE ROW LEVEL SECURITY ON ALL 9 TABLES
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_download_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 5. RLS POLICIES FOR EACH TABLE

-- Table 1: store_settings
-- Base table accessible only to authenticated admins (Public reads public_store_settings view)
CREATE POLICY "store_settings_admin_select"
ON public.store_settings FOR SELECT
TO authenticated
USING (public.is_auvyra_admin());

CREATE POLICY "store_settings_admin_update"
ON public.store_settings FOR UPDATE
TO authenticated
USING (public.is_auvyra_admin())
WITH CHECK (public.is_auvyra_admin());

-- Table 2: admin_users
-- Admins can view fellow admins; ONLY super_admin can insert, update, or remove admins
CREATE POLICY "admin_users_admin_select"
ON public.admin_users FOR SELECT
TO authenticated
USING (public.is_auvyra_admin());

CREATE POLICY "admin_users_super_admin_insert"
ON public.admin_users FOR INSERT
TO authenticated
WITH CHECK (public.is_auvyra_super_admin());

CREATE POLICY "admin_users_super_admin_update"
ON public.admin_users FOR UPDATE
TO authenticated
USING (public.is_auvyra_super_admin())
WITH CHECK (public.is_auvyra_super_admin());

CREATE POLICY "admin_users_super_admin_delete"
ON public.admin_users FOR DELETE
TO authenticated
USING (public.is_auvyra_super_admin());

-- Table 3: products
-- Base table readable/writable ONLY by admins (protecting digital_file_path). Storefront uses storefront_catalog view!
CREATE POLICY "products_admin_all"
ON public.products FOR ALL
TO authenticated
USING (public.is_auvyra_admin())
WITH CHECK (public.is_auvyra_admin());

-- Table 4: customers
-- Admins can inspect and update customer records
CREATE POLICY "customers_admin_select"
ON public.customers FOR SELECT
TO authenticated
USING (public.is_auvyra_admin());

CREATE POLICY "customers_admin_update"
ON public.customers FOR UPDATE
TO authenticated
USING (public.is_auvyra_admin())
WITH CHECK (public.is_auvyra_admin());

-- Table 5: orders
-- Public can view their order status on success page using order ID and verified customer email
CREATE POLICY "orders_customer_lookup"
ON public.orders FOR SELECT
TO anon, authenticated
USING (
  customer_email = LOWER(TRIM(current_setting('request.jwt.claims', true)::json->>'email'))
  OR (current_setting('request.headers', true)::json->>'x-auvyra-order-email') = LOWER(TRIM(customer_email))
);

CREATE POLICY "orders_admin_all"
ON public.orders FOR ALL
TO authenticated
USING (public.is_auvyra_admin())
WITH CHECK (public.is_auvyra_admin());

-- Prevent ordinary client updates from forcing payment_status = 'verified'
CREATE OR REPLACE FUNCTION public.fn_prevent_client_payment_verification()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- If client tries to directly mark payment_status = 'verified' without backend RPC
  IF (OLD.payment_status != 'verified' AND NEW.payment_status = 'verified') THEN
    IF current_setting('auvyra.trusted_payment_caller', true) IS DISTINCT FROM 'trusted_backend' THEN
      RAISE EXCEPTION 'payment_status can only be verified via trusted backend signature verification';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_client_payment_verification ON public.orders;
CREATE TRIGGER trg_prevent_client_payment_verification
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.fn_prevent_client_payment_verification();

-- Table 6: order_items
CREATE POLICY "order_items_admin_all"
ON public.order_items FOR ALL
TO authenticated
USING (public.is_auvyra_admin())
WITH CHECK (public.is_auvyra_admin());

CREATE POLICY "order_items_customer_select"
ON public.order_items FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id
      AND (
        o.customer_email = LOWER(TRIM(current_setting('request.jwt.claims', true)::json->>'email'))
        OR (current_setting('request.headers', true)::json->>'x-auvyra-order-email') = LOWER(TRIM(o.customer_email))
      )
  )
);

-- Table 7: digital_download_tokens
-- Zero public access. Only admins can view/revoke tokens
CREATE POLICY "tokens_admin_select"
ON public.digital_download_tokens FOR SELECT
TO authenticated
USING (public.is_auvyra_admin());

CREATE POLICY "tokens_admin_update"
ON public.digital_download_tokens FOR UPDATE
TO authenticated
USING (public.is_auvyra_admin())
WITH CHECK (public.is_auvyra_admin());

-- Table 8: inventory_ledger
-- Admins can view audit ledger
CREATE POLICY "ledger_admin_select"
ON public.inventory_ledger FOR SELECT
TO authenticated
USING (public.is_auvyra_admin());

-- Table 9: audit_logs
-- Admins can view audit logs
CREATE POLICY "audit_logs_admin_select"
ON public.audit_logs FOR SELECT
TO authenticated
USING (public.is_auvyra_admin());

-- 6. TRUSTED BACKEND PAYMENT VERIFICATION RPC
CREATE OR REPLACE FUNCTION public.verify_order_payment(
  p_order_id TEXT,
  p_razorpay_payment_id TEXT,
  p_razorpay_order_id TEXT,
  p_amount_paise BIGINT,
  p_currency TEXT DEFAULT 'INR'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_order RECORD;
  v_expected_paise BIGINT;
BEGIN
  -- Set transaction flag allowing the payment verification trigger to proceed
  PERFORM set_config('auvyra.trusted_payment_caller', 'trusted_backend', true);

  -- Lock order row
  SELECT * INTO v_order
  FROM public.orders
  WHERE id = p_order_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Order not found');
  END IF;

  -- Idempotency check: Already verified with same payment ID
  IF v_order.payment_status = 'verified' AND v_order.razorpay_payment_id = p_razorpay_payment_id THEN
    RETURN jsonb_build_object('success', true, 'message', 'Payment was already verified');
  END IF;

  -- Strict validation of currency and exact amount
  IF UPPER(p_currency) != 'INR' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid payment currency: expected INR');
  END IF;

  v_expected_paise := (v_order.total_inr::BIGINT) * 100;
  IF p_amount_paise != v_expected_paise THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Payment amount mismatch. Expected: ' || v_expected_paise || ' paise, Received: ' || p_amount_paise || ' paise'
    );
  END IF;

  -- Update order to verified
  UPDATE public.orders
  SET payment_status = 'verified',
      razorpay_payment_id = p_razorpay_payment_id,
      razorpay_order_id = COALESCE(p_razorpay_order_id, razorpay_order_id),
      verified_at = NOW(),
      updated_at = NOW()
  WHERE id = p_order_id;

  RETURN jsonb_build_object(
    'success', true,
    'order_id', p_order_id,
    'payment_id', p_razorpay_payment_id,
    'total_inr', v_order.total_inr
  );
END;
$$;

-- 7. TWO-PHASE DIGITAL DOWNLOAD FULFILLMENT RPCS
-- Phase 1: Validate token and retrieve storage path under row lock WITHOUT premature consumption
CREATE OR REPLACE FUNCTION public.validate_download_token(
  p_token TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_token RECORD;
  v_order RECORD;
  v_product RECORD;
BEGIN
  -- Lock token row
  SELECT * INTO v_token
  FROM public.digital_download_tokens
  WHERE token = p_token
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Invalid or expired download link');
  END IF;

  IF v_token.is_revoked THEN
    RETURN jsonb_build_object('valid', false, 'error', 'This download link has been revoked');
  END IF;

  IF v_token.expires_at <= NOW() THEN
    RETURN jsonb_build_object('valid', false, 'error', 'This download link has expired');
  END IF;

  IF v_token.download_count >= v_token.max_downloads THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Maximum download limit reached (' || v_token.max_downloads || ' downloads)');
  END IF;

  -- Ensure order payment was verified
  SELECT payment_status INTO v_order
  FROM public.orders
  WHERE id = v_token.order_id;

  IF v_order.payment_status != 'verified' THEN
    RETURN jsonb_build_object('valid', false, 'error', 'Order payment has not been verified');
  END IF;

  -- Fetch product digital file path
  SELECT name, digital_file_path INTO v_product
  FROM public.products
  WHERE id = v_token.product_id;

  IF v_product.digital_file_path IS NULL OR TRIM(v_product.digital_file_path) = '' THEN
    RETURN jsonb_build_object('valid', false, 'error', 'File not found on secure storage');
  END IF;

  RETURN jsonb_build_object(
    'valid', true,
    'token_id', v_token.id,
    'product_name', v_product.name,
    'digital_file_path', v_product.digital_file_path,
    'remaining_downloads', (v_token.max_downloads - v_token.download_count)
  );
END;
$$;

-- Phase 2: Record successful download ONLY after storage generates signed URL
CREATE OR REPLACE FUNCTION public.record_download_success(
  p_token_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_token RECORD;
BEGIN
  UPDATE public.digital_download_tokens
  SET download_count = download_count + 1,
      last_downloaded_at = NOW()
  WHERE id = p_token_id
  RETURNING * INTO v_token;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Token not found');
  END IF;

  -- Audit log entry
  INSERT INTO public.audit_logs (action, entity_type, entity_id, actor_name, details)
  VALUES (
    'DIGITAL_DOWNLOAD',
    'download_token',
    p_token_id::TEXT,
    'Customer (' || v_token.customer_email || ')',
    jsonb_build_object(
      'order_id', v_token.order_id,
      'product_id', v_token.product_id,
      'downloads_used', v_token.download_count,
      'max_downloads', v_token.max_downloads
    )
  );

  RETURN jsonb_build_object(
    'success', true,
    'download_count', v_token.download_count,
    'max_downloads', v_token.max_downloads
  );
END;
$$;

-- 8. PERMISSIONS & SAFE GRANTS

-- Revoke dangerous direct permissions from anon and authenticated on base catalog
REVOKE ALL ON public.products FROM anon, authenticated;
REVOKE ALL ON public.store_settings FROM anon;
REVOKE ALL ON public.digital_download_tokens FROM anon;
REVOKE ALL ON public.inventory_ledger FROM anon;
REVOKE ALL ON public.audit_logs FROM anon;

-- Grant public view access to the safe views
GRANT SELECT ON public.storefront_catalog TO anon, authenticated;
GRANT SELECT ON public.public_store_settings TO anon, authenticated;

-- Allow public order placement RPC
GRANT EXECUTE ON FUNCTION public.place_storefront_order TO anon, authenticated;

-- Restrict verification and fulfillment functions to service_role and backend
REVOKE EXECUTE ON FUNCTION public.verify_order_payment FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.verify_order_payment TO service_role;

REVOKE EXECUTE ON FUNCTION public.validate_download_token FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_download_token TO service_role;

REVOKE EXECUTE ON FUNCTION public.record_download_success FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.record_download_success TO service_role;

REVOKE EXECUTE ON FUNCTION public.release_order_stock FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.release_order_stock TO service_role;
