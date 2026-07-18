-- Borehole Marketplace — Security hardening (RLS)
-- Run this in the Supabase SQL Editor AFTER 001_initial_schema.sql.
-- It is idempotent: safe to run more than once.
--
-- Model:
--   * All order/order_item WRITES happen server-side via the service-role key
--     (see src/lib/supabase/admin.ts), which bypasses RLS. Clients get NO
--     insert/update path to orders, so prices and ownership can't be forged.
--   * Clients (anon + authenticated) may only READ what these policies allow.

-- ---------------------------------------------------------------------------
-- Ensure RLS is enabled everywhere (order_items was previously missing).
-- ---------------------------------------------------------------------------
ALTER TABLE users        ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers    ENABLE ROW LEVEL SECURITY;
ALTER TABLE services     ENABLE ROW LEVEL SECURITY;
ALTER TABLE products     ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders       ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items  ENABLE ROW LEVEL SECURITY;  -- was NOT enabled before
ALTER TABLE quotes       ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews      ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- USERS
-- Public marketplace listings join to users for a provider/supplier name, so
-- profiles are readable. NOTE: this makes all user columns readable via the
-- anon key. See the optional PII lock-down block at the bottom to restrict
-- email/phone to the service role only.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Public profiles are viewable" ON users;
CREATE POLICY "Public profiles are viewable" ON users
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users insert own profile" ON users;
CREATE POLICY "Users insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users update own profile" ON users;
CREATE POLICY "Users update own profile" ON users
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- SUPPLIERS  (public read already exists; add owner management)
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view suppliers" ON suppliers;
CREATE POLICY "Public can view suppliers" ON suppliers
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Owners manage supplier profile" ON suppliers;
CREATE POLICY "Owners manage supplier profile" ON suppliers
  FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- SERVICES  (public read already exists; add provider management)
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view services" ON services;
CREATE POLICY "Public can view services" ON services
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Providers manage own services" ON services;
CREATE POLICY "Providers manage own services" ON services
  FOR ALL USING (provider_id = auth.uid()) WITH CHECK (provider_id = auth.uid());

-- ---------------------------------------------------------------------------
-- PRODUCTS  (public read already exists; add supplier management)
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view products" ON products;
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Suppliers manage own products" ON products;
CREATE POLICY "Suppliers manage own products" ON products
  FOR ALL
  USING (supplier_id IN (SELECT id FROM suppliers WHERE user_id = auth.uid()))
  WITH CHECK (supplier_id IN (SELECT id FROM suppliers WHERE user_id = auth.uid()));

-- ---------------------------------------------------------------------------
-- LEADS  (anyone may submit; only staff may read/update)
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can create leads" ON leads;
CREATE POLICY "Anyone can create leads" ON leads
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Staff can view leads" ON leads;
CREATE POLICY "Staff can view leads" ON leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid()
        AND u.role IN ('service_provider', 'supplier', 'admin')
    )
  );

DROP POLICY IF EXISTS "Assigned staff update leads" ON leads;
CREATE POLICY "Assigned staff update leads" ON leads
  FOR UPDATE USING (
    assigned_to = auth.uid()
    OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin')
  ) WITH CHECK (true);

-- ---------------------------------------------------------------------------
-- ORDERS  (read-only for clients; writes go through the service role)
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own orders" ON orders;
DROP POLICY IF EXISTS "Customers view own orders" ON orders;
CREATE POLICY "Customers view own orders" ON orders
  FOR SELECT USING (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Suppliers view their orders" ON orders;
CREATE POLICY "Suppliers view their orders" ON orders
  FOR SELECT USING (
    supplier_id IN (SELECT id FROM suppliers WHERE user_id = auth.uid())
  );

-- ---------------------------------------------------------------------------
-- ORDER ITEMS  (visible to the order's customer and its supplier; no client writes)
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "View own order items" ON order_items;
CREATE POLICY "View own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders o
      WHERE o.id = order_items.order_id
        AND (
          o.customer_id = auth.uid()
          OR o.supplier_id IN (SELECT id FROM suppliers WHERE user_id = auth.uid())
        )
    )
  );

-- ---------------------------------------------------------------------------
-- QUOTES
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Providers create quotes" ON quotes;
CREATE POLICY "Providers create quotes" ON quotes
  FOR INSERT WITH CHECK (provider_id = auth.uid());

DROP POLICY IF EXISTS "View relevant quotes" ON quotes;
CREATE POLICY "View relevant quotes" ON quotes
  FOR SELECT USING (
    provider_id = auth.uid()
    OR EXISTS (SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

-- ---------------------------------------------------------------------------
-- REVIEWS
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view reviews" ON reviews;
CREATE POLICY "Public can view reviews" ON reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated create own reviews" ON reviews;
CREATE POLICY "Authenticated create own reviews" ON reviews
  FOR INSERT WITH CHECK (reviewer_id = auth.uid());

-- ---------------------------------------------------------------------------
-- OPTIONAL — lock down customer PII on the users table.
-- The listing joins only need id/name/company/province/city, so you can hide
-- email/phone/coordinates from the anon + authenticated roles (the service
-- role still sees everything). Uncomment to apply, but first confirm no
-- client-side query selects those columns (e.g. supplier/service detail pages).
-- ---------------------------------------------------------------------------
-- REVOKE SELECT ON public.users FROM anon, authenticated;
-- GRANT SELECT (id, name, role, company, province, city, verified, created_at, updated_at)
--   ON public.users TO anon, authenticated;
