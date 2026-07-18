'use client'

import { useState, useEffect, useCallback } from 'react'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'customer' | 'supplier' | 'service_provider' | 'admin'
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/me')
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      setUser(data.user)
      return data.user
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (data: {
    name: string
    email: string
    password: string
    phone?: string
    role?: string
  }) => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Registration failed')
      setUser(json.user)
      return json.user
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return { user, loading, login, register, logout }
}