import Link from 'next/link'
import { Drill, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Drill className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-white">BoreHub</span>
            </div>
            <p className="text-sm text-gray-400">
              South Africa&apos;s marketplace for borehole services and supplies.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Marketplace</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/suppliers" className="hover:text-white transition-colors">Suppliers</Link></li>
              <li><Link href="/leads" className="hover:text-white transition-colors">Post Requirement</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">For Business</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Become a Supplier</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/api" className="hover:text-white transition-colors">API Access</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@borehub.co.za</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+27 11 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} BoreHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
