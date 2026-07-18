import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/supabase'

type Tables = Database['public']['Tables']

// Services
export async function getServices(filters?: {
  category?: string
  location?: string
  search?: string
  limit?: number
  offset?: number
}) {
  const supabase = createClient()
  
  let query = supabase
    .from('services')
    .select('*, users!inner(name, company, province, city)')
    .eq('available', true)
    .order('rating', { ascending: false })

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }
  if (filters?.location) {
    query = query.eq('users.province', filters.location)
  }
  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  return query
}

export async function getServiceById(id: string) {
  const supabase = createClient()
  return supabase
    .from('services')
    .select('*, users!inner(name, company, province, city, email, phone)')
    .eq('id', id)
    .single()
}

// Suppliers
export async function getSuppliers(filters?: {
  category?: string
  location?: string
  search?: string
  verified?: boolean
  limit?: number
  offset?: number
}) {
  const supabase = createClient()
  
  let query = supabase
    .from('suppliers')
    .select('*, users!inner(name, province, city)')
    .order('rating', { ascending: false })

  if (filters?.category) {
    query = query.contains('categories', [filters.category])
  }
  if (filters?.location) {
    query = query.eq('users.province', filters.location)
  }
  if (filters?.search) {
    query = query.or(`company_name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }
  if (filters?.verified !== undefined) {
    query = query.eq('verified', filters.verified)
  }
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  return query
}

export async function getSupplierById(id: string) {
  const supabase = createClient()
  return supabase
    .from('suppliers')
    .select('*, users!inner(name, province, city, email, phone)')
    .eq('id', id)
    .single()
}

// Products
export async function getProducts(filters?: {
  supplierId?: string
  category?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  limit?: number
  offset?: number
}) {
  const supabase = createClient()
  
  let query = supabase
    .from('products')
    .select('*, suppliers!inner(company_name, verified)')
    .eq('active', true)
    .order('created_at', { ascending: false })

  if (filters?.supplierId) {
    query = query.eq('supplier_id', filters.supplierId)
  }
  if (filters?.category) {
    query = query.eq('category', filters.category)
  }
  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
  }
  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice)
  }
  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice)
  }
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  return query
}

// Leads
export async function createLead(data: Tables['leads']['Insert']) {
  const supabase = createClient()
  return supabase
    .from('leads')
    .insert(data)
    .select()
    .single()
}

export async function getLeads(filters?: {
  status?: string
  serviceType?: string
  limit?: number
  offset?: number
}) {
  const supabase = createClient()
  
  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  if (filters?.serviceType) {
    query = query.eq('service_type', filters.serviceType)
  }
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  return query
}

export async function updateLead(id: string, data: Tables['leads']['Update']) {
  const supabase = createClient()
  return supabase
    .from('leads')
    .update(data)
    .eq('id', id)
    .select()
    .single()
}

// Orders
export async function createOrder(data: Tables['orders']['Insert'], items: Tables['order_items']['Insert'][]) {
  const supabase = createClient()
  
  const { data: order, error } = await supabase
    .from('orders')
    .insert(data)
    .select()
    .single()

  if (error || !order) {
    return { data: null, error }
  }

  const orderItems = items.map(item => ({
    ...item,
    order_id: order.id,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    return { data: null, error: itemsError }
  }

  return { data: order, error: null }
}

export async function getOrders(filters?: {
  customerId?: string
  supplierId?: string
  status?: string
  limit?: number
  offset?: number
}) {
  const supabase = createClient()
  
  let query = supabase
    .from('orders')
    .select('*, order_items(*), suppliers(company_name), users!customer_id(name)')
    .order('created_at', { ascending: false })

  if (filters?.customerId) {
    query = query.eq('customer_id', filters.customerId)
  }
  if (filters?.supplierId) {
    query = query.eq('supplier_id', filters.supplierId)
  }
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  return query
}

export async function getOrderById(id: string) {
  const supabase = createClient()
  return supabase
    .from('orders')
    .select('*, order_items(*), suppliers(company_name, contact_email, contact_phone), users!customer_id(name, email, phone)')
    .eq('id', id)
    .single()
}

export async function updateOrderStatus(id: string, status: Tables['orders']['Update']['status']) {
  const supabase = createClient()
  return supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
}

// Quotes
export async function createQuote(data: Tables['quotes']['Insert']) {
  const supabase = createClient()
  return supabase
    .from('quotes')
    .insert(data)
    .select()
    .single()
}

export async function getQuotesByLead(leadId: string) {
  const supabase = createClient()
  return supabase
    .from('quotes')
    .select('*, users!provider_id(name, company)')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })
}

// Reviews
export async function createReview(data: Tables['reviews']['Insert']) {
  const supabase = createClient()
  return supabase
    .from('reviews')
    .insert(data)
    .select()
    .single()
}

export async function getReviews(targetType: string, targetId: string) {
  const supabase = createClient()
  return supabase
    .from('reviews')
    .select('*, users!reviewer_id(name)')
    .eq('target_type', targetType)
    .eq('target_id', targetId)
    .order('created_at', { ascending: false })
}

// Auth helpers
export async function getCurrentUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return { ...user, profile }
}

export async function getUserProfile(userId: string) {
  const supabase = createClient()
  return supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
}

export async function updateUserProfile(userId: string, data: Tables['users']['Update']) {
  const supabase = createClient()
  return supabase
    .from('users')
    .update(data)
    .eq('id', userId)
    .select()
    .single()
}
