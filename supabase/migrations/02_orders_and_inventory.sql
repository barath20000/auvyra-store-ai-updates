-- =====================================================================
-- AUVYRA ONLINE BOOKSTORE — SUPABASE MIGRATION (PART 2 OF 3)
-- File: supabase/migrations/02_orders_and_inventory.sql
-- Description: Customers, orders, order items, digital tokens,
--              inventory ledger, audit logs, order placement RPC,
--              stock release, and payment verification trigger.
-- =====================================================================

-- 1. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  default_address TEXT,
  default_city TEXT,
  default_pincode TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT check_customer_email_normalized CHECK (email = LOWER(TRIM(email)))
);

CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers (email);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON public.customers (phone);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY, -- Formatted order identifier: 'AUV-YYMMDD-XXXXX'
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE RESTRICT,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT,
  shipping_city TEXT,
  shipping_pincode TEXT,
  order_notes TEXT,
  has_digital_items BOOLEAN NOT NULL DEFAULT FALSE,
  has_physical_items BOOLEAN NOT NULL DEFAULT FALSE,
  subtotal_inr INTEGER NOT NULL CHECK (subtotal_inr >= 0),
  shipping_fee_inr INTEGER NOT NULL DEFAULT 0 CHECK (shipping_fee_inr >= 0),
  total_inr INTEGER NOT NULL CHECK (total_inr >= 0),
  payment_status order_payment_status NOT NULL DEFAULT 'pending',
  payment_gateway TEXT NOT NULL DEFAULT 'razorpay',
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT UNIQUE,
  shipping_status shipping_status_enum NOT NULL DEFAULT 'not_applicable',
  shipping_carrier TEXT,
  tracking_number TEXT,
  stock_released BOOLEAN NOT NULL DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON public.orders (customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders (LOWER(customer_email));
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders (payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_shipping_status ON public.orders (shipping_status);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON public.orders (razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);

-- 3. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  edition book_type_enum NOT NULL CHECK (edition IN ('digital', 'physical')),
  unit_price_inr INTEGER NOT NULL CHECK (unit_price_inr >= 0),
  quantity INTEGER NOT NULL CHECK (quantity >= 1),
  subtotal_inr INTEGER NOT NULL CHECK (subtotal_inr >= 0),
  product_name_snapshot TEXT NOT NULL,
  format_snapshot TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_order_item_edition UNIQUE (order_id, product_id, edition)
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items (product_id);

-- 4. DIGITAL DOWNLOAD TOKENS TABLE
CREATE TABLE IF NOT EXISTS public.digital_download_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  order_id TEXT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  order_item_id UUID NOT NULL REFERENCES public.order_items(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  customer_email TEXT NOT NULL,
  download_count INTEGER NOT NULL DEFAULT 0 CHECK (download_count >= 0),
  max_downloads INTEGER NOT NULL DEFAULT 5 CHECK (max_downloads >= 1),
  expires_at TIMESTAMPTZ NOT NULL,
  is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
  last_downloaded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_download_tokens_token ON public.digital_download_tokens (token);
CREATE INDEX IF NOT EXISTS idx_download_tokens_order_id ON public.digital_download_tokens (order_id);
CREATE INDEX IF NOT EXISTS idx_download_tokens_product_id ON public.digital_download_tokens (product_id);
CREATE INDEX IF NOT EXISTS idx_download_tokens_lookup ON public.digital_download_tokens (token, is_revoked, expires_at);

-- 5. INVENTORY LEDGER TABLE (Audit trail for physical stock)
CREATE TABLE IF NOT EXISTS public.inventory_ledger (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  order_id TEXT REFERENCES public.orders(id) ON DELETE SET NULL,
  change_type inventory_change_type NOT NULL,
  quantity_delta INTEGER NOT NULL, -- Negative for allocations, positive for returns/restocks
  balance_after INTEGER NOT NULL CHECK (balance_after >= 0),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inventory_ledger_product ON public.inventory_ledger (product_id);
CREATE INDEX IF NOT EXISTS idx_inventory_ledger_order ON public.inventory_ledger (order_id);

-- 6. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  actor_admin_id UUID REFERENCES auth.users(id),
  actor_name TEXT NOT NULL DEFAULT 'System',
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs (entity_type, entity_id);

-- 7. UPDATED_AT TRIGGERS FOR ORDERS AND CUSTOMERS
DROP TRIGGER IF EXISTS trg_customers_updated_at ON public.customers;
CREATE TRIGGER trg_customers_updated_at
BEFORE UPDATE ON public.customers
FOR EACH ROW
EXECUTE FUNCTION public.fn_set_updated_at();

DROP TRIGGER IF EXISTS trg_orders_updated_at ON public.orders;
CREATE TRIGGER trg_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.fn_set_updated_at();

-- 8. PAYMENT VERIFICATION TRIGGER
-- Generates digital tokens and initiates physical shipping when payment becomes 'verified'
CREATE OR REPLACE FUNCTION public.fn_handle_order_payment_verified()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_settings RECORD;
  v_item RECORD;
  v_validity_interval INTERVAL;
BEGIN
  -- Trigger ONLY when payment_status transitions to 'verified'
  IF (OLD.payment_status != 'verified' AND NEW.payment_status = 'verified') THEN
    NEW.verified_at = NOW();

    -- Fetch download settings
    SELECT
      max_digital_downloads_per_item,
      download_token_validity_days
    INTO v_settings
    FROM public.store_settings
    WHERE id = 1;

    v_validity_interval := (COALESCE(v_settings.download_token_validity_days, 30) || ' days')::INTERVAL;

    -- Update shipping status for orders with physical items
    IF NEW.has_physical_items AND NEW.shipping_status = 'pending_verification' THEN
      NEW.shipping_status = 'processing';
    END IF;

    -- Generate tokens for each digital order item (idempotent: avoid duplicates)
    FOR v_item IN
      SELECT oi.id, oi.product_id, p.digital_file_path
      FROM public.order_items oi
      JOIN public.products p ON p.id = oi.product_id
      WHERE oi.order_id = NEW.id
        AND oi.edition = 'digital'
    LOOP
      IF NOT EXISTS (
        SELECT 1 FROM public.digital_download_tokens
        WHERE order_item_id = v_item.id
      ) THEN
        INSERT INTO public.digital_download_tokens (
          order_id,
          order_item_id,
          product_id,
          customer_email,
          download_count,
          max_downloads,
          expires_at
        ) VALUES (
          NEW.id,
          v_item.id,
          v_item.product_id,
          NEW.customer_email,
          0,
          COALESCE(v_settings.max_digital_downloads_per_item, 5),
          NOW() + v_validity_interval
        );
      END IF;
    END LOOP;

    -- Log to audit
    INSERT INTO public.audit_logs (action, entity_type, entity_id, actor_name, details)
    VALUES (
      'PAYMENT_VERIFIED',
      'order',
      NEW.id,
      'Payment Gateway / System',
      jsonb_build_object(
        'order_id', NEW.id,
        'razorpay_payment_id', NEW.razorpay_payment_id,
        'total_inr', NEW.total_inr
      )
    );
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_order_payment_verified ON public.orders;
CREATE TRIGGER trg_order_payment_verified
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.fn_handle_order_payment_verified();

-- 9. RPC: PLACE STOREFRONT ORDER (Atomic, authoritative server calculations)
CREATE OR REPLACE FUNCTION public.place_storefront_order(
  p_order_id TEXT,
  p_customer_name TEXT,
  p_customer_email TEXT,
  p_customer_phone TEXT,
  p_shipping_address TEXT,
  p_shipping_city TEXT,
  p_shipping_pincode TEXT,
  p_order_notes TEXT,
  p_items JSONB, -- Array of { "product_id": number, "edition": "digital" | "physical", "quantity": number }
  p_payment_gateway TEXT DEFAULT 'razorpay'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_customer_id UUID;
  v_norm_email TEXT;
  v_item JSONB;
  v_product RECORD;
  v_settings RECORD;
  v_pid BIGINT;
  v_edition book_type_enum;
  v_qty INTEGER;
  v_unit_price INTEGER;
  v_item_subtotal INTEGER;
  v_order_subtotal INTEGER := 0;
  v_shipping_fee INTEGER := 0;
  v_order_total INTEGER := 0;
  v_has_digital BOOLEAN := FALSE;
  v_has_physical BOOLEAN := FALSE;
  v_new_balance INTEGER;
BEGIN
  -- Input normalization
  v_norm_email := LOWER(TRIM(p_customer_email));
  IF v_norm_email IS NULL OR v_norm_email = '' OR position('@' in v_norm_email) = 0 THEN
    RAISE EXCEPTION 'A valid customer email is required';
  END IF;

  IF p_customer_name IS NULL OR TRIM(p_customer_name) = '' THEN
    RAISE EXCEPTION 'Customer name is required';
  END IF;

  IF p_customer_phone IS NULL OR TRIM(p_customer_phone) = '' THEN
    RAISE EXCEPTION 'Customer phone number is required';
  END IF;

  IF jsonb_array_length(p_items) = 0 THEN
    RAISE EXCEPTION 'Order must contain at least one item';
  END IF;

  -- Read store settings
  SELECT flat_shipping_rate_inr, free_shipping_threshold_inr
  INTO v_settings
  FROM public.store_settings
  WHERE id = 1;

  -- 1. Find or create customer
  INSERT INTO public.customers (
    email,
    full_name,
    phone,
    default_address,
    default_city,
    default_pincode
  ) VALUES (
    v_norm_email,
    TRIM(p_customer_name),
    TRIM(p_customer_phone),
    NULLIF(TRIM(p_shipping_address), ''),
    NULLIF(TRIM(p_shipping_city), ''),
    NULLIF(TRIM(p_shipping_pincode), '')
  )
  ON CONFLICT (email) DO UPDATE
    SET full_name = EXCLUDED.full_name,
        phone = EXCLUDED.phone,
        default_address = COALESCE(EXCLUDED.default_address, customers.default_address),
        default_city = COALESCE(EXCLUDED.default_city, customers.default_city),
        default_pincode = COALESCE(EXCLUDED.default_pincode, customers.default_pincode),
        updated_at = NOW()
  RETURNING id INTO v_customer_id;

  -- 2. Validate items & calculate totals under row-level lock
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_pid := (v_item->>'product_id')::BIGINT;
    v_edition := (v_item->>'edition')::book_type_enum;
    v_qty := GREATEST(1, (v_item->>'quantity')::INTEGER);

    -- Digital is always 1 per order
    IF v_edition = 'digital' THEN
      v_qty := 1;
    END IF;

    -- Lock product row to prevent race conditions & overselling
    SELECT * INTO v_product
    FROM public.products
    WHERE id = v_pid AND is_active = TRUE
    FOR UPDATE;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product #% is not available or inactive', v_pid;
    END IF;

    -- Format availability check
    IF v_edition = 'physical' THEN
      IF v_product.book_type = 'digital' THEN
        RAISE EXCEPTION 'Book "%" is not offered in physical format', v_product.name;
      END IF;
      IF v_product.stock_quantity < v_qty THEN
        RAISE EXCEPTION 'Insufficient physical stock for "%". Available: %, Requested: %',
          v_product.name, v_product.stock_quantity, v_qty;
      END IF;

      v_has_physical := TRUE;
      v_unit_price := COALESCE(v_product.physical_price, v_product.price);
    ELSE
      IF v_product.book_type = 'physical' THEN
        RAISE EXCEPTION 'Book "%" is not offered in digital format', v_product.name;
      END IF;
      IF v_product.digital_file_path IS NULL OR TRIM(v_product.digital_file_path) = '' THEN
        RAISE EXCEPTION 'Digital file is currently being prepared for "%". Please contact support.', v_product.name;
      END IF;

      v_has_digital := TRUE;
      v_unit_price := COALESCE(v_product.digital_price, v_product.price);
    END IF;

    v_item_subtotal := v_unit_price * v_qty;
    v_order_subtotal := v_order_subtotal + v_item_subtotal;
  END LOOP;

  -- Shipping validation
  IF v_has_physical THEN
    IF NULLIF(TRIM(p_shipping_address), '') IS NULL OR
       NULLIF(TRIM(p_shipping_city), '') IS NULL OR
       NULLIF(TRIM(p_shipping_pincode), '') IS NULL THEN
      RAISE EXCEPTION 'Complete shipping address (street, city, pincode) is required for physical book orders';
    END IF;

    IF v_order_subtotal >= v_settings.free_shipping_threshold_inr THEN
      v_shipping_fee := 0;
    ELSE
      v_shipping_fee := v_settings.flat_shipping_rate_inr;
    END IF;
  ELSE
    v_shipping_fee := 0;
  END IF;

  v_order_total := v_order_subtotal + v_shipping_fee;

  -- 3. Insert order record (Strictly pending payment status)
  INSERT INTO public.orders (
    id,
    customer_id,
    customer_email,
    customer_name,
    customer_phone,
    shipping_address,
    shipping_city,
    shipping_pincode,
    order_notes,
    has_digital_items,
    has_physical_items,
    subtotal_inr,
    shipping_fee_inr,
    total_inr,
    payment_status,
    payment_gateway,
    shipping_status
  ) VALUES (
    p_order_id,
    v_customer_id,
    v_norm_email,
    TRIM(p_customer_name),
    TRIM(p_customer_phone),
    TRIM(p_shipping_address),
    TRIM(p_shipping_city),
    TRIM(p_shipping_pincode),
    TRIM(p_order_notes),
    v_has_digital,
    v_has_physical,
    v_order_subtotal,
    v_shipping_fee,
    v_order_total,
    'pending',
    COALESCE(p_payment_gateway, 'razorpay'),
    CASE WHEN v_has_physical THEN 'pending_verification'::shipping_status_enum ELSE 'not_applicable'::shipping_status_enum END
  );

  -- 4. Insert items and decrement physical stock with ledger entry
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items)
  LOOP
    v_pid := (v_item->>'product_id')::BIGINT;
    v_edition := (v_item->>'edition')::book_type_enum;
    v_qty := GREATEST(1, (v_item->>'quantity')::INTEGER);
    IF v_edition = 'digital' THEN v_qty := 1; END IF;

    SELECT * INTO v_product FROM public.products WHERE id = v_pid;

    IF v_edition = 'physical' THEN
      v_unit_price := COALESCE(v_product.physical_price, v_product.price);
    ELSE
      v_unit_price := COALESCE(v_product.digital_price, v_product.price);
    END IF;

    v_item_subtotal := v_unit_price * v_qty;

    INSERT INTO public.order_items (
      order_id,
      product_id,
      edition,
      unit_price_inr,
      quantity,
      subtotal_inr,
      product_name_snapshot,
      format_snapshot
    ) VALUES (
      p_order_id,
      v_pid,
      v_edition,
      v_unit_price,
      v_qty,
      v_item_subtotal,
      v_product.name,
      v_product.format
    );

    -- Decrement physical inventory
    IF v_edition = 'physical' THEN
      v_new_balance := v_product.stock_quantity - v_qty;
      UPDATE public.products
      SET stock_quantity = v_new_balance,
          version = version + 1
      WHERE id = v_pid;

      INSERT INTO public.inventory_ledger (
        product_id,
        order_id,
        change_type,
        quantity_delta,
        balance_after,
        notes
      ) VALUES (
        v_pid,
        p_order_id,
        'order_hold',
        -v_qty,
        v_new_balance,
        'Physical stock reserved for order #' || p_order_id
      );
    END IF;
  END LOOP;

  -- 5. Audit Log Entry
  INSERT INTO public.audit_logs (action, entity_type, entity_id, actor_name, details)
  VALUES (
    'ORDER_CREATED',
    'order',
    p_order_id,
    'Storefront',
    jsonb_build_object(
      'order_id', p_order_id,
      'customer_email', v_norm_email,
      'total_inr', v_order_total,
      'has_physical', v_has_physical,
      'has_digital', v_has_digital
    )
  );

  RETURN jsonb_build_object(
    'success', true,
    'order_id', p_order_id,
    'subtotal_inr', v_order_subtotal,
    'shipping_fee_inr', v_shipping_fee,
    'total_inr', v_order_total,
    'has_physical_items', v_has_physical,
    'has_digital_items', v_has_digital
  );
END;
$$;

-- 10. RPC: RELEASE EXPIRED OR CANCELLED ORDER STOCK (Idempotent)
CREATE OR REPLACE FUNCTION public.release_order_stock(
  p_order_id TEXT,
  p_reason TEXT DEFAULT 'Payment expired or order cancelled'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_order RECORD;
  v_item RECORD;
  v_new_balance INTEGER;
  v_released_count INTEGER := 0;
BEGIN
  -- Lock order row
  SELECT * INTO v_order
  FROM public.orders
  WHERE id = p_order_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Order not found');
  END IF;

  -- Idempotency check: Cannot restore twice
  IF v_order.stock_released THEN
    RETURN jsonb_build_object('success', true, 'message', 'Stock was already released previously');
  END IF;

  -- Only unpaid or cancelled orders can release held stock
  IF v_order.payment_status = 'verified' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Cannot release stock for verified paid orders');
  END IF;

  -- Iterate through physical items and restore stock
  FOR v_item IN
    SELECT oi.product_id, oi.quantity, p.stock_quantity, p.name
    FROM public.order_items oi
    JOIN public.products p ON p.id = oi.product_id
    WHERE oi.order_id = p_order_id
      AND oi.edition = 'physical'
    FOR UPDATE OF p
  LOOP
    v_new_balance := v_item.stock_quantity + v_item.quantity;

    UPDATE public.products
    SET stock_quantity = v_new_balance,
        version = version + 1
    WHERE id = v_item.product_id;

    INSERT INTO public.inventory_ledger (
      product_id,
      order_id,
      change_type,
      quantity_delta,
      balance_after,
      notes
    ) VALUES (
      v_item.product_id,
      p_order_id,
      'order_cancelled_restored',
      v_item.quantity,
      v_new_balance,
      p_reason
    );

    v_released_count := v_released_count + 1;
  END LOOP;

  -- Mark stock_released and update payment_status to failed if still pending
  UPDATE public.orders
  SET stock_released = TRUE,
      payment_status = CASE WHEN payment_status = 'pending' THEN 'failed'::order_payment_status ELSE payment_status END,
      shipping_status = CASE WHEN has_physical_items THEN 'not_applicable'::shipping_status_enum ELSE shipping_status END
  WHERE id = p_order_id;

  -- Log action
  INSERT INTO public.audit_logs (action, entity_type, entity_id, actor_name, details)
  VALUES (
    'STOCK_RELEASED',
    'order',
    p_order_id,
    'System / Admin',
    jsonb_build_object(
      'order_id', p_order_id,
      'reason', p_reason,
      'items_restored', v_released_count
    )
  );

  RETURN jsonb_build_object(
    'success', true,
    'order_id', p_order_id,
    'items_restored', v_released_count
  );
END;
$$;
