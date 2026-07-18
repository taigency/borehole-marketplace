'use client'

import { useState, useEffect, useCallback } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  supplier: string
}

const STORAGE_KEY = 'borehub-cart'

function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setItems(getStoredCart())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, mounted])

  const addToCart = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }
      return [...prev, item]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id))
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const getCartTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [items])

  const getCartCount = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }, [items])

  return {
    items,
    mounted,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  }
}