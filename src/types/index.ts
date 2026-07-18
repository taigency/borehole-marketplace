export interface User {
  id: string
  email: string
  phone: string
  name: string
  role: 'customer' | 'supplier' | 'service_provider' | 'admin'
  company?: string
  location: {
    province: string
    city: string
    coordinates?: { lat: number; lng: number }
  }
  verified: boolean
  createdAt: Date
}

export interface Supplier {
  id: string
  userId: string
  companyName: string
  description: string
  categories: string[]
  products: Product[]
  rating: number
  reviewCount: number
  verified: boolean
  subscriptionTier: 'free' | 'basic' | 'premium'
  contactInfo: {
    email: string
    phone: string
    website?: string
  }
}

export interface Service {
  id: string
  providerId: string
  title: string
  description: string
  category: 'drilling' | 'pump_installation' | 'geophysics' | 'maintenance' | 'consulting'
  priceType: 'fixed' | 'per_meter' | 'hourly' | 'quote'
  priceRange?: { min: number; max: number }
  coverageAreas: string[]
  availability: boolean
  rating: number
  reviewCount: number
}

export interface Product {
  id: string
  supplierId: string
  name: string
  description: string
  category: string
  subcategory: string
  specifications: Record<string, string>
  price: number
  currency: 'ZAR'
  stock: number
  images: string[]
  minOrderQuantity: number
  leadTimeDays: number
}

export interface Lead {
  id: string
  source: 'website' | 'phone' | 'referral' | 'marketing'
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceType: string
  location: string
  budget?: number
  description: string
  status: 'new' | 'qualified' | 'assigned' | 'quoted' | 'won' | 'lost'
  assignedTo?: string
  score: number
  createdAt: Date
  followUpDate?: Date
}

export interface Order {
  id: string
  customerId: string
  supplierId: string
  items: OrderItem[]
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled'
  subtotal: number
  commission: number
  total: number
  currency: 'ZAR'
  shippingAddress: Address
  trackingNumber?: string
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Address {
  street: string
  city: string
  province: string
  postalCode: string
  country: string
}

export interface Quote {
  id: string
  leadId: string
  providerId: string
  amount: number
  description: string
  validUntil: Date
  status: 'pending' | 'accepted' | 'rejected' | 'expired'
  createdAt: Date
}

export interface Review {
  id: string
  reviewerId: string
  targetType: 'supplier' | 'service'
  targetId: string
  rating: number
  comment: string
  createdAt: Date
}
