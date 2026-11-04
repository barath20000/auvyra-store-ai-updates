-- =====================================================================
-- AUVYRA ONLINE BOOKSTORE — ADMIN SETUP SCRIPT
-- File: supabase/admin_setup.sql
-- Description: Idempotent role mapping for Barath (super_admin) and
--              Kavi (admin). Links directly to Supabase Auth UUIDs.
-- =====================================================================

-- INSTRUCTIONS:
-- 1. Create the two admin user accounts in your Supabase Project:
--    Dashboard -> Authentication -> Users -> Add User -> Create User
--    - Email 1: vsbarathsudhakar@gmail.com (Barath)
--    - Email 2: kaviravi1905@gmail.com (Kavi)
-- 2. Run this script in the Supabase SQL Editor. It will automatically
--    look up their auth.users UUIDs and map them to public.admin_users.
--    If you prefer manual UUIDs, replace the placeholders below.

DO $$
DECLARE
  v_barath_id UUID;
  v_kavi_id UUID;
BEGIN
  -- 1. Automatically resolve Barath's auth UUID
  SELECT id INTO v_barath_id
  FROM auth.users
  WHERE LOWER(email) = 'vsbarathsudhakar@gmail.com';

  -- If not found automatically, uncomment and supply manual UUID:
  -- v_barath_id := '00000000-0000-0000-0000-000000000001'::uuid;

  IF v_barath_id IS NOT NULL THEN
    INSERT INTO public.admin_users (id, email, full_name, role, is_active)
    VALUES (
      v_barath_id,
      'vsbarathsudhakar@gmail.com',
      'Barath',
      'super_admin',
      TRUE
    )
    ON CONFLICT (id) DO UPDATE
      SET role = 'super_admin',
          full_name = 'Barath',
          is_active = TRUE;
    RAISE NOTICE 'Successfully configured Barath (super_admin) with Auth UUID: %', v_barath_id;
  ELSE
    RAISE WARNING 'Barath account (vsbarathsudhakar@gmail.com) not found in auth.users yet. Please create it in Supabase Auth first.';
  END IF;

  -- 2. Automatically resolve Kavi's auth UUID
  SELECT id INTO v_kavi_id
  FROM auth.users
  WHERE LOWER(email) = 'kaviravi1905@gmail.com';

  -- If not found automatically, uncomment and supply manual UUID:
  -- v_kavi_id := '00000000-0000-0000-0000-000000000002'::uuid;

  IF v_kavi_id IS NOT NULL THEN
    INSERT INTO public.admin_users (id, email, full_name, role, is_active)
    VALUES (
      v_kavi_id,
      'kaviravi1905@gmail.com',
      'Kavi',
      'admin',
      TRUE
    )
    ON CONFLICT (id) DO UPDATE
      SET role = 'admin',
          full_name = 'Kavi',
          is_active = TRUE;
    RAISE NOTICE 'Successfully configured Kavi (admin) with Auth UUID: %', v_kavi_id;
  ELSE
    RAISE WARNING 'Kavi account (kaviravi1905@gmail.com) not found in auth.users yet. Please create it in Supabase Auth first.';
  END IF;

END $$;
