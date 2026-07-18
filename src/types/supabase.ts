export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          phone: string | null
          name: string
          role: 'customer' | 'supplier' | 'service_provider' | 'admin'
          company: string | null
          province: string | null
          city: string | null
          latitude: number | null
          longitude: number | null
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          phone?: string | null
          name: string
          role: 'customer' | 'supplier' | 'service_provider' | 'admin'
          company?: string | null
          province?: string | null
          city?: string | null
          latitude?: number | null
          longitude?: number | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string | null
          name?: string
          role?: 'customer' | 'supplier' | 'service_provider' | 'admin'
          company?: string | null
          province?: string | null
          city?: string | null
          latitude?: number | null
          longitude?: number | null
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      suppliers: {
        Row: {
          id: string
          user_id: string
          company_name: string
          description: string | null
          categories: string[]
          rating: number
          review_count: number
          verified: boolean
          subscription_tier: 'free' | 'basic' | 'premium'
          contact_email: string | null
          contact_phone: string | null
          website: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          description?: string | null
          categories?: string[]
          rating?: number
          review_count?: number
          verified?: boolean
          subscription_tier?: 'free' | 'basic' | 'premium'
          contact_email?: string | null
          contact_phone?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          description?: string | null
          categories?: string[]
          rating?: number
          review_count?: number
          verified?: boolean
          subscription_tier?: 'free' | 'basic' | 'premium'
          contact_email?: string | null
          contact_phone?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          provider_id: string
          title: string
          description: string | null
          category: 'drilling' | 'pump_installation' | 'geophysics' | 'maintenance' | 'consulting'
          price_type: 'fixed' | 'per_meter' | 'hourly' | 'quote' | null
          price_min: number | null
          price_max: number | null
          coverage_areas: string[]
          available: boolean
          rating: number
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          title: string
          description?: string | null
          category: 'drilling' | 'pump_installation' | 'geophysics' | 'maintenance' | 'consulting'
          price_type?: 'fixed' | 'per_meter' | 'hourly' | 'quote' | null
          price_min?: number | null
          price_max?: number | null
          coverage_areas?: string[]
          available?: boolean
          rating?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          title?: string
          description?: string | null
          category?: 'drilling' | 'pump_installation' | 'geophysics' | 'maintenance' | 'consulting'
          price_type?: 'fixed' | 'per_meter' | 'hourly' | 'quote' | null
          price_min?: number | null
          price_max?: number | null
          coverage_areas?: string[]
          available?: boolean
          rating?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          supplier_id: string
          name: string
          description: string | null
          category: string | null
          subcategory: string | null
          specifications: Json
          price: number
          currency: string
          stock: number
          images: string[]
          min_order_quantity: number
          lead_time_days: number
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          supplier_id: string
          name: string
          description?: string | null
          category?: string | null
          subcategory?: string | null
          specifications?: Json
          price: number
          currency?: string
          stock?: number
          images?: string[]
          min_order_quantity?: number
          lead_time_days?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          supplier_id?: string
          name?: string
          description?: string | null
          category?: string | null
          subcategory?: string | null
          specifications?: Json
          price?: number
          currency?: string
          stock?: number
          images?: string[]
          min_order_quantity?: number
          lead_time_days?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          source: string
          customer_name: string | null
          customer_email: string | null
          customer_phone: string | null
          service_type: string | null
          location: string | null
          province: string | null
          budget: number | null
          description: string | null
          status: 'new' | 'qualified' | 'assigned' | 'quoted' | 'won' | 'lost'
          assigned_to: string | null
          score: number
          follow_up_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          source?: string
          customer_name?: string | null
          customer_email?: string | null
          customer_phone?: string | null
          service_type?: string | null
          location?: string | null
          province?: string | null
          budget?: number | null
          description?: string | null
          status?: 'new' | 'qualified' | 'assigned' | 'quoted' | 'won' | 'lost'
          assigned_to?: string | null
          score?: number
          follow_up_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          source?: string
          customer_name?: string | null
          customer_email?: string | null
          customer_phone?: string | null
          service_type?: string | null
          location?: string | null
          province?: string | null
          budget?: number | null
          description?: string | null
          status?: 'new' | 'qualified' | 'assigned' | 'quoted' | 'won' | 'lost'
          assigned_to?: string | null
          score?: number
          follow_up_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_id: string
          supplier_id: string
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled'
          subtotal: number | null
          commission: number | null
          total: number | null
          currency: string
          shipping_street: string | null
          shipping_city: string | null
          shipping_province: string | null
          shipping_postal_code: string | null
          tracking_number: string | null
          payment_status: 'pending' | 'paid' | 'refunded' | 'failed'
          payment_method: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          customer_id: string
          supplier_id: string
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled'
          subtotal?: number | null
          commission?: number | null
          total?: number | null
          currency?: string
          shipping_street?: string | null
          shipping_city?: string | null
          shipping_province?: string | null
          shipping_postal_code?: string | null
          tracking_number?: string | null
          payment_status?: 'pending' | 'paid' | 'refunded' | 'failed'
          payment_method?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          customer_id?: string
          supplier_id?: string
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled'
          subtotal?: number | null
          commission?: number | null
          total?: number | null
          currency?: string
          shipping_street?: string | null
          shipping_city?: string | null
          shipping_province?: string | null
          shipping_postal_code?: string | null
          tracking_number?: string | null
          payment_status?: 'pending' | 'paid' | 'refunded' | 'failed'
          payment_method?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          product_name: string | null
          quantity: number
          unit_price: number | null
          total_price: number | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          product_name?: string | null
          quantity: number
          unit_price?: number | null
          total_price?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          product_name?: string | null
          quantity?: number
          unit_price?: number | null
          total_price?: number | null
          created_at?: string
        }
      }
      quotes: {
        Row: {
          id: string
          lead_id: string
          provider_id: string
          amount: number | null
          description: string | null
          valid_until: string | null
          status: 'pending' | 'accepted' | 'rejected' | 'expired'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          provider_id: string
          amount?: number | null
          description?: string | null
          valid_until?: string | null
          status?: 'pending' | 'accepted' | 'rejected' | 'expired'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          provider_id?: string
          amount?: number | null
          description?: string | null
          valid_until?: string | null
          status?: 'pending' | 'accepted' | 'rejected' | 'expired'
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          reviewer_id: string
          target_type: 'supplier' | 'service' | 'product'
          target_id: string
          order_id: string | null
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          reviewer_id: string
          target_type: 'supplier' | 'service' | 'product'
          target_id: string
          order_id?: string | null
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          reviewer_id?: string
          target_type?: 'supplier' | 'service' | 'product'
          target_id?: string
          order_id?: string | null
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
