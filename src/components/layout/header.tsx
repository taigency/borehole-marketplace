'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Drill, Search } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Drill className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gray-900">BoreHub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="ghost" size="sm">Log In</Button>
            <Button size="sm">Sign Up</Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200 space-y-2">
              <Button variant="outline" className="w-full">Log In</Button>
              <Button className="w-full">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
