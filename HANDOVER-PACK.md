# BoreHub - Complete Build & Deployment Handover Pack

> **Purpose:** This document contains everything needed to build, deploy, and run the BoreHub borehole marketplace. Load this into any AI agent to continue development or deploy.

---

## 1. PROJECT OVERVIEW

### What is BoreHub?
Online marketplace connecting borehole industry stakeholders in South Africa:
- **Customers** (borehole owners) find drillers, order parts
- **Suppliers** sell spare parts (pumps, casings, bits, tanks)
- **Service Providers** offer services (drilling, geophysics, maintenance)

### Business Model
- Commission: 8-15% per transaction
- Supplier subscriptions: R500-R2,000/month
- Lead fees: R200-R500 per qualified lead

### Tech Stack
- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend:** Next.js API Routes, Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Payments:** PayFast + Yoco (South African gateways)
- **Hosting:** Vercel
- **CI/CD:** GitHub Actions

---

## 2. REPOSITORY STRUCTURE

```
borehole-marketplace/
├── .github/workflows/
│   ├── ci.yml              # Lint, typecheck, build
│   ├── deploy.yml          # Vercel deployment
│   └── release.yml         # GitHub releases on tags
├── docs/
│   ├── COST-ANALYSIS.md    # Hosting costs & pricing
│   ├── PAYMENT-GATEWAY.md  # Payment integration guide
│   ├── SUPABASE-SETUP.md   # Database setup
│   └── VERSION-CONTROL.md  # Branching strategy
├── scripts/
│   └── version.sh          # Version bump script
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/       # Login, register, logout
│   │   │   ├── leads/      # Lead CRUD
│   │   │   ├── orders/     # Order CRUD
│   │   │   ├── services/   # Service queries
│   │   │   ├── suppliers/  # Supplier queries
│   │   │   └── webhooks/   # PayFast, Yoco webhooks
│   │   ├── auth/           # Login & register pages
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout flow + success/cancel
│   │   ├── dashboard/
│   │   │   ├── client/     # Client dashboard
│   │   │   ├── provider/   # Service provider dashboard
│   │   │   └── supplier/   # Supplier dashboard
│   │   ├── leads/          # Post requirement form
│   │   ├── orders/         # Order tracking
│   │   ├── products/       # Product catalog + detail
│   │   ├── services/       # Services marketplace
│   │   └── suppliers/      # Supplier directory
│   ├── components/
│   │   ├── dashboard/      # Sidebar, stats, table, badges
│   │   ├── layout/         # Header, footer
│   │   ├── supplier/       # Product form, order actions
│   │   └── ui/             # Button, Card, Badge
│   ├── hooks/
│   │   ├── use-auth.ts     # Auth state management
│   │   └── use-cart.ts     # Cart with localStorage
│   ├── lib/
│   │   ├── constants.ts    # App constants
│   │   ├── db.ts           # Database query helpers
│   │   ├── payments/       # PayFast + Yoco integration
│   │   ├── supabase/       # Supabase client utilities
│   │   ├── utils.ts        # Utility functions
│   │   └── version.ts      # App version
│   ├── proxy.ts            # Auth session refresh
│   └── types/              # TypeScript types
├── supabase/migrations/
│   └── 001_initial_schema.sql
├── .env.example
├── vercel.json
└── package.json
```

---

## 3. DATABASE SCHEMA (PostgreSQL/Supabase)

```sql
-- USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'supplier', 'service_provider', 'admin')),
  company VARCHAR(255),
  province VARCHAR(100),
  city VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SUPPLIERS TABLE
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  description TEXT,
  categories TEXT[],
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INT DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'premium')),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  website VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SERVICES TABLE
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('drilling', 'pump_installation', 'geophysics', 'maintenance', 'consulting')),
  price_type VARCHAR(20) CHECK (price_type IN ('fixed', 'per_meter', 'hourly', 'quote')),
  price_min DECIMAL(10, 2),
  price_max DECIMAL(10, 2),
  coverage_areas TEXT[],
  available BOOLEAN DEFAULT true,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PRODUCTS TABLE
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supplier_id UUID REFERENCES suppliers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  subcategory VARCHAR(100),
  specifications JSONB DEFAULT '{}',
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'ZAR',
  stock INT DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  min_order_quantity INT DEFAULT 1,
  lead_time_days INT DEFAULT 7,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- LEADS TABLE
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source VARCHAR(50) DEFAULT 'website',
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  service_type VARCHAR(100),
  location VARCHAR(255),
  province VARCHAR(100),
  budget DECIMAL(10, 2),
  description TEXT,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'qualified', 'assigned', 'quoted', 'won', 'lost')),
  assigned_to UUID REFERENCES users(id),
  score INT DEFAULT 50 CHECK (score >= 0 AND score <= 100),
  follow_up_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ORDERS TABLE
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(20) UNIQUE NOT NULL,
  customer_id UUID REFERENCES users(id),
  supplier_id UUID REFERENCES suppliers(id),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'completed', 'cancelled')),
  subtotal DECIMAL(10, 2),
  commission DECIMAL(10, 2),
  total DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'ZAR',
  shipping_street VARCHAR(255),
  shipping_city VARCHAR(100),
  shipping_province VARCHAR(100),
  shipping_postal_code VARCHAR(10),
  tracking_number VARCHAR(100),
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ORDER ITEMS TABLE
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(255),
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2),
  total_price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- QUOTES TABLE
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id),
  provider_id UUID REFERENCES users(id),
  amount DECIMAL(10, 2),
  description TEXT,
  valid_until TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- REVIEWS TABLE
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id UUID REFERENCES users(id),
  target_type VARCHAR(20) CHECK (target_type IN ('supplier', 'service', 'product')),
  target_id UUID,
  order_id UUID REFERENCES orders(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_suppliers_user_id ON suppliers(user_id);
CREATE INDEX idx_services_provider_id ON services(provider_id);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_products_supplier_id ON products(supplier_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_supplier_id ON orders(supplier_id);
CREATE INDEX idx_orders_status ON orders(status);

-- UPDATED_AT TRIGGERS
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON suppliers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ROW LEVEL SECURITY
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public can view services" ON services FOR SELECT USING (true);
CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can view suppliers" ON suppliers FOR SELECT USING (true);
CREATE POLICY "Anyone can create leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
```

---

## 4. ENVIRONMENT VARIABLES

### .env.example
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# PayFast
NEXT_PUBLIC_PAYFAST_MERCHANT_ID=10000100
NEXT_PUBLIC_PAYFAST_MERCHANT_KEY=46f0cd694581a
PAYFAST_PASSPHRASE=your_passphrase
PAYFAST_SANDBOX=true

# Yoco
NEXT_PUBLIC_YOCO_PUBLIC_KEY=pk_test_xxx
YOCO_SECRET_KEY=sk_test_xxx
```

---

## 5. KEY SOURCE FILES

### 5.1 Supabase Client (src/lib/supabase/client.ts)
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### 5.2 Supabase Server (src/lib/supabase/server.ts)
```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {}
        },
      },
    }
  )
}
```

### 5.3 Auth Proxy (src/proxy.ts)
```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
```

### 5.4 Cart Hook (src/hooks/use-cart.ts)
```typescript
'use client'
import { useState, useEffect } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  supplier: string
}

const CART_KEY = 'borehub-cart'

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY)
    if (stored) setItems(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (id: string) => setItems(prev => prev.filter(i => i.id !== id))
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeFromCart(id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
  }
  const clearCart = () => setItems([])
  const getCartTotal = () => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const getCartCount = () => items.reduce((sum, item) => sum + item.quantity, 0)

  return { items, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }
}
```

### 5.5 PayFast Integration (src/lib/payments/payfast.ts)
```typescript
import crypto from 'crypto'

const PAYFAST_CONFIG = {
  merchantId: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID || '',
  merchantKey: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY || '',
  passphrase: process.env.PAYFAST_PASSPHRASE || '',
  sandbox: process.env.PAYFAST_SANDBOX === 'true',
  baseUrl: process.env.PAYFAST_SANDBOX === 'true' 
    ? 'https://sandbox.payfast.co.za/eng/process' 
    : 'https://www.payfast.co.za/eng/process',
}

export interface PayFastPaymentData {
  orderId: string
  amount: number
  itemName: string
  customerEmail: string
  customerFirstName?: string
  customerLastName?: string
  returnUrl: string
  cancelUrl: string
  notifyUrl: string
}

export function generatePayFastUrl(data: PayFastPaymentData): string {
  const params: Record<string, string> = {
    merchant_id: PAYFAST_CONFIG.merchantId,
    merchant_key: PAYFAST_CONFIG.merchantKey,
    return_url: data.returnUrl,
    cancel_url: data.cancelUrl,
    notify_url: data.notifyUrl,
    m_payment_id: data.orderId,
    amount: data.amount.toFixed(2),
    item_name: data.itemName,
    email_confirmation: '1',
    confirmation_address: data.customerEmail,
  }

  if (data.customerFirstName) params.name_first = data.customerFirstName
  if (data.customerLastName) params.name_last = data.customerLastName

  const signature = generatePayFastSignature(params)
  params.signature = signature

  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

  return `${PAYFAST_CONFIG.baseUrl}?${queryString}`
}

function generatePayFastSignature(params: Record<string, string>): string {
  const sortedParams = Object.entries(params)
    .filter(([key]) => key !== 'signature')
    .sort(([a], [b]) => a.localeCompare(b))

  let queryString = sortedParams
    .map(([key, value]) => `${key}=${encodeURIComponent(value).replace(/%20/g, '+')}`)
    .join('&')

  if (PAYFAST_CONFIG.passphrase) {
    queryString += `&passphrase=${encodeURIComponent(PAYFAST_CONFIG.passphrase)}`
  }

  return crypto.createHash('md5').update(queryString).digest('hex')
}
```

### 5.6 Database Helpers (src/lib/db.ts)
```typescript
import { createClient } from '@/lib/supabase/client'

export async function getServices(filters?: {
  category?: string; location?: string; search?: string; limit?: number
}) {
  const supabase = createClient()
  let query = supabase.from('services').select('*, users!inner(name, company, province, city)').eq('available', true).order('rating', { ascending: false })
  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.location) query = query.eq('users.province', filters.location)
  if (filters?.search) query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  if (filters?.limit) query = query.limit(filters.limit)
  return query
}

export async function getSuppliers(filters?: {
  category?: string; location?: string; search?: string; verified?: boolean; limit?: number
}) {
  const supabase = createClient()
  let query = supabase.from('suppliers').select('*, users!inner(name, province, city)').order('rating', { ascending: false })
  if (filters?.category) query = query.contains('categories', [filters.category])
  if (filters?.location) query = query.eq('users.province', filters.location)
  if (filters?.search) query = query.or(`company_name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  if (filters?.verified !== undefined) query = query.eq('verified', filters.verified)
  if (filters?.limit) query = query.limit(filters.limit)
  return query
}

export async function createLead(data: any) {
  const supabase = createClient()
  return supabase.from('leads').insert(data).select().single()
}

export async function getLeads(filters?: { status?: string; serviceType?: string; limit?: number }) {
  const supabase = createClient()
  let query = supabase.from('leads').select('*').order('created_at', { ascending: false })
  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.serviceType) query = query.eq('service_type', filters.serviceType)
  if (filters?.limit) query = query.limit(filters.limit)
  return query
}

export async function createOrder(orderData: any, items: any[]) {
  const supabase = createClient()
  const { data: order, error } = await supabase.from('orders').insert(orderData).select().single()
  if (error || !order) return { data: null, error }
  const orderItems = items.map(item => ({ ...item, order_id: order.id }))
  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
  if (itemsError) return { data: null, error: itemsError }
  return { data: order, error: null }
}

export async function getOrders(filters?: {
  customerId?: string; supplierId?: string; status?: string; limit?: number
}) {
  const supabase = createClient()
  let query = supabase.from('orders').select('*, order_items(*), suppliers(company_name)').order('created_at', { ascending: false })
  if (filters?.customerId) query = query.eq('customer_id', filters.customerId)
  if (filters?.supplierId) query = query.eq('supplier_id', filters.supplierId)
  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.limit) query = query.limit(filters.limit)
  return query
}
```

### 5.7 PayFast Webhook (src/app/api/webhooks/payfast/route.ts)
```typescript
import { NextResponse } from 'next/server'
import { validatePayFastNotification, parsePayFastNotification } from '@/lib/payments/payfast'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const body: Record<string, string> = {}
    formData.forEach((value, key) => { body[key] = value.toString() })

    const isValid = await validatePayFastNotification(body)
    if (!isValid) return NextResponse.json({ error: 'Invalid notification' }, { status: 400 })

    const payment = parsePayFastNotification(body)
    const supabase = await createClient()

    if (payment.status === 'COMPLETE') {
      await supabase.from('orders').update({ payment_status: 'paid', status: 'confirmed' }).eq('order_number', payment.orderId)
    } else if (payment.status === 'FAILED') {
      await supabase.from('orders').update({ payment_status: 'failed' }).eq('order_number', payment.orderId)
    }

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('PayFast webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
```

### 5.8 Auth API - Register (src/app/api/auth/register/route.ts)
```typescript
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, phone, role, company, province, city } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email, password, and name are required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email, password,
      options: { data: { name, phone, role: role || 'customer' } },
    })

    if (authError) return NextResponse.json({ error: authError.message }, { status: 400 })
    if (!authData.user) return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })

    await supabase.from('users').insert({
      id: authData.user.id, email, name,
      phone: phone || null, role: role || 'customer',
      company: company || null, province: province || null, city: city || null,
    })

    if (role === 'supplier' && company) {
      await supabase.from('suppliers').insert({
        user_id: authData.user.id, company_name: company,
        description: body.description || null, categories: body.categories || [],
        contact_email: email, contact_phone: phone || null,
      })
    }

    return NextResponse.json({
      success: true, user: authData.user, session: authData.session,
      message: 'Registration successful. Please check your email to verify.',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
```

### 5.9 Landing Page (src/app/page.tsx)
```typescript
import Link from 'next/link'
import { Search, Drill, Package, ArrowRight, Star, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SERVICE_CATEGORIES, PRODUCT_CATEGORIES } from '@/lib/constants'

const STATS = [
  { label: 'Active Suppliers', value: '150+' },
  { label: 'Service Providers', value: '250+' },
  { label: 'Orders Completed', value: '5,000+' },
  { label: 'Provinces Covered', value: '9' },
]

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            South Africa&apos;s Borehole Marketplace
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Find trusted drillers, source quality spare parts, and manage your borehole projects — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services"><Button size="lg">Find Services</Button></Link>
            <Link href="/suppliers"><Button size="lg" variant="outline">Browse Suppliers</Button></Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Post Your Need', desc: 'Tell us what you need' },
              { step: 2, title: 'Get Matched', desc: 'Receive verified quotes' },
              { step: 3, title: 'Compare & Choose', desc: 'Review and decide' },
              { step: 4, title: 'Get It Done', desc: 'Book and pay securely' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">{item.step}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
```

### 5.10 Constants (src/lib/constants.ts)
```typescript
export const PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
  'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
] as const

export const SERVICE_CATEGORIES = [
  { id: 'drilling', label: 'Borehole Drilling', icon: 'Drill' },
  { id: 'pump_installation', label: 'Pump Installation', icon: 'Wrench' },
  { id: 'geophysics', label: 'Geophysics Survey', icon: 'Map' },
  { id: 'maintenance', label: 'Maintenance & Repair', icon: 'Settings' },
  { id: 'consulting', label: 'Hydrogeology Consulting', icon: 'BookOpen' },
] as const

export const PRODUCT_CATEGORIES = [
  { id: 'pumps', label: 'Water Pumps' },
  { id: 'casings', label: 'Borehole Casings' },
  { id: 'bits', label: 'Drill Bits' },
  { id: 'pipes', label: 'Pipes & Fittings' },
  { id: 'tanks', label: 'Water Tanks' },
  { id: 'filters', label: 'Filters & Screens' },
  { id: 'controllers', label: 'Controllers & Panels' },
  { id: 'accessories', label: 'Accessories' },
] as const

export const NAV_ITEMS = [
  { href: '/services', label: 'Services' },
  { href: '/suppliers', label: 'Suppliers' },
  { href: '/products', label: 'Products' },
  { href: '/leads', label: 'Post a Requirement' },
] as const
```

---

## 6. UI COMPONENTS

### 6.1 Button (src/components/ui/button.tsx)
```typescript
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export function Button({ children, variant = 'primary', size = 'md', loading = false, className, disabled, ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' }

  return (
    <button
      className={cn('inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed', variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
```

### 6.2 Card (src/components/ui/card.tsx)
```typescript
import { cn } from '@/lib/utils'

export function Card({ children, className, hover = false }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return <div className={cn('bg-white rounded-xl border border-gray-200 shadow-sm', hover && 'hover:shadow-md transition-shadow', className)}>{children}</div>
}
export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 py-4 border-b border-gray-100', className)}>{children}</div>
}
export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>
}
export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 py-4 border-t border-gray-100', className)}>{children}</div>
}
```

### 6.3 Badge (src/components/ui/badge.tsx)
```typescript
import { cn } from '@/lib/utils'

export function Badge({ children, variant = 'default', className }: { children: React.ReactNode; variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error'; className?: string }) {
  const variants = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  }
  return <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>{children}</span>
}
```

### 6.4 Utils (src/lib/utils.ts)
```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }

export function formatCurrency(amount: number, currency: string = 'ZAR') {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency }).format(amount)
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })
}
```

---

## 7. GITHUB ACTIONS WORKFLOWS

### 7.1 CI (ci.yml)
```yaml
name: CI
on:
  push:
    branches: [dev, beta, main]
  pull_request:
    branches: [dev, beta, main]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
```

### 7.2 Deploy (deploy.yml)
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [dev, beta, main]

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm install -g vercel
      - run: vercel pull --yes --environment=${{ github.ref_name == 'main' && 'production' || 'preview' }} --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy
        run: |
          if [[ "${{ github.ref_name }}" == "main" ]]; then
            vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
          else
            vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
          fi
```

---

## 8. VERCEL CONFIGURATION

### vercel.json
```json
{
  "version": 2,
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "regions": ["cpt1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

---

## 9. PACKAGE.JSON

```json
{
  "name": "borehole-marketplace",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@supabase/ssr": "^0.12.3",
    "@supabase/supabase-js": "^2.110.7",
    "clsx": "^2.1.1",
    "lucide-react": "^1.25.0",
    "next": "16.2.10",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "tailwind-merge": "^3.6.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.10",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## 10. DEPLOYMENT CHECKLIST

### Step 1: Create Supabase Projects (5 min)
1. Go to https://supabase.com
2. Create 3 projects: `borehub-dev`, `borehub-beta`, `borehub-prod`
3. In each project, go to SQL Editor
4. Paste and run the database schema from Section 3
5. Go to Authentication → Providers → Enable Email
6. Copy Project URL and anon key for each

### Step 2: Push to GitHub (2 min)
```bash
gh auth login
gh repo create borehole-marketplace --public --source=. --remote=origin --push
git checkout -b dev && git push origin dev
git checkout -b beta && git push origin beta
git checkout main && git push origin main
```

### Step 3: Connect Vercel (3 min)
1. Go to https://vercel.com
2. New Project → Import GitHub repo
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. Deploy

### Step 4: Set Up GitHub Secrets (2 min)
In GitHub repo → Settings → Secrets:
- `VERCEL_TOKEN` - Get from Vercel account settings
- `VERCEL_ORG_ID` - Get from Vercel project settings
- `VERCEL_PROJECT_ID` - Get from Vercel project settings
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key

### Step 5: Configure Branch Deployments (1 min)
In Vercel → Project → Settings → Git:
- Production Branch: `main`
- Connect `dev` branch to dev environment
- Connect `beta` branch to beta environment

### Step 6: Set Up PayFast (5 min)
1. Go to https://www.payfast.co.za
2. Register for sandbox account
3. Get merchant ID and key
4. Add to Vercel environment variables
5. Set notify URL to `https://your-domain.co.za/api/webhooks/payfast`

---

## 11. COST BREAKDOWN

### Monthly Hosting Costs
| Item | Dev | Beta | Production |
|------|-----|------|------------|
| Vercel | Free | R380 | R380 |
| Supabase | Free | Free | R475 |
| Domain | R8 | R8 | R8 |
| Email | Free | Free | R380 |
| **Total** | **R8** | **R388** | **R1,243** |

### Payment Gateway Fees
| Gateway | Fee | Settlement |
|---------|-----|------------|
| PayFast | 3.5% + R2 | T+2 days |
| Yoco | 2.95% | Next day |
| Stripe | 3.5% + R3 | 7 days |

### Revenue Model
- Commission: 10% per transaction
- Supplier Basic: R500/month
- Supplier Premium: R2,000/month
- Lead fees: R200-R500 per lead

### Break-Even
- Month 3: 25 orders × R5,000 avg × 10% = R12,500 revenue
- Month 6: 100 orders × R8,000 avg × 10% = R80,000 revenue
- Month 12: 500 orders × R10,000 avg × 10% = R500,000 revenue

---

## 12. VERSION CONTROL STRATEGY

### Branches
- `main` - Production (tagged v1.x.x)
- `beta` - Staging
- `dev` - Development
- `feature/*` - Feature branches

### Commit Convention
```
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting
refactor: Code refactoring
test:     Tests
chore:    Maintenance
```

### Version Bump
```bash
./scripts/version.sh patch  # v0.1.0 → v0.1.1
./scripts/version.sh minor  # v0.1.1 → v0.2.0
./scripts/version.sh major  # v0.2.0 → v1.0.0
```

---

## 13. ROUTES SUMMARY

| Route | Type | Description |
|-------|------|-------------|
| `/` | Page | Landing page |
| `/products` | Page | Product catalog |
| `/products/[id]` | Page | Product detail |
| `/services` | Page | Services marketplace |
| `/suppliers` | Page | Supplier directory |
| `/leads` | Page | Post requirement |
| `/cart` | Page | Shopping cart |
| `/checkout` | Page | Checkout flow |
| `/checkout/success` | Page | Payment success |
| `/checkout/cancel` | Page | Payment cancelled |
| `/auth/login` | Page | Login |
| `/auth/register` | Page | Register |
| `/dashboard` | Page | Dashboard home |
| `/dashboard/client` | Page | Client dashboard |
| `/dashboard/client/orders` | Page | Client orders |
| `/dashboard/client/quotes` | Page | Client quotes |
| `/dashboard/client/cart` | Page | Client cart |
| `/dashboard/supplier` | Page | Supplier dashboard |
| `/dashboard/supplier/products` | Page | Manage products |
| `/dashboard/supplier/orders` | Page | Manage orders |
| `/dashboard/supplier/leads` | Page | Manage leads |
| `/dashboard/supplier/analytics` | Page | Analytics |
| `/dashboard/provider` | Page | Provider dashboard |
| `/dashboard/provider/services` | Page | Manage services |
| `/dashboard/provider/leads` | Page | Provider leads |
| `/dashboard/provider/quotes` | Page | Provider quotes |
| `/api/auth/login` | API | Login endpoint |
| `/api/auth/register` | API | Register endpoint |
| `/api/auth/logout` | API | Logout endpoint |
| `/api/services` | API | Services CRUD |
| `/api/suppliers` | API | Suppliers CRUD |
| `/api/leads` | API | Leads CRUD |
| `/api/orders` | API | Orders CRUD |
| `/api/webhooks/payfast` | API | PayFast webhook |
| `/api/webhooks/yoco` | API | Yoco webhook |

---

## 14. IMMEDIATE ACTION ITEMS

1. **Run `gh auth login`** to authenticate GitHub CLI
2. **Create GitHub repo** with the command in Step 2
3. **Create 3 Supabase projects** (dev/beta/prod)
4. **Run database migration** in each Supabase project
5. **Connect Vercel** to GitHub repo
6. **Add environment variables** in Vercel
7. **Register PayFast sandbox** account
8. **Test the deployment** by pushing to `dev` branch

---

**End of Handover Pack**

> This document contains everything needed to build and deploy BoreHub. Load it into any AI agent to continue development.
