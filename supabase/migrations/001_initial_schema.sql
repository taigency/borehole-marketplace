-- Borehole Marketplace Database Schema
-- Run this in Supabase SQL Editor

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Suppliers table
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(255),
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2),
  total_price DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quotes table
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  provider_id UUID REFERENCES users(id),
  amount DECIMAL(10, 2),
  description TEXT,
  valid_until TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID REFERENCES users(id),
  target_type VARCHAR(20) CHECK (target_type IN ('supplier', 'service', 'product')),
  target_id UUID,
  order_id UUID REFERENCES orders(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_suppliers_user_id ON suppliers(user_id);
CREATE INDEX idx_services_provider_id ON services(provider_id);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_products_supplier_id ON products(supplier_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_service_type ON leads(service_type);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_supplier_id ON orders(supplier_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_reviews_target ON reviews(target_type, target_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON suppliers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (adjust based on your auth setup)
-- Public read access for marketplace listings
CREATE POLICY "Public can view services" ON services FOR SELECT USING (true);
CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can view suppliers" ON suppliers FOR SELECT USING (true);

-- Authenticated users can create leads
CREATE POLICY "Anyone can create leads" ON leads FOR INSERT WITH CHECK (true);

-- Users can view their own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = customer_id);

-- Users can view their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
