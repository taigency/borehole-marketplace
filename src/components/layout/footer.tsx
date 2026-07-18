import Link from 'next/link'
import { Droplets, Mail, Phone, MapPin, ArrowRight, Globe, MessageSquare, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const FOOTER_LINKS = {
  marketplace: {
    title: 'Marketplace',
    links: [
      { href: '/services', label: 'Browse Services' },
      { href: '/suppliers', label: 'Find Suppliers' },
      { href: '/leads', label: 'Post a Requirement' },
      { href: '/orders', label: 'Track Orders' },
      { href: '/pricing', label: 'Pricing' },
    ],
  },
  business: {
    title: 'For Business',
    links: [
      { href: '/register', label: 'Become a Supplier' },
      { href: '/dashboard', label: 'Supplier Dashboard' },
      { href: '/api', label: 'API Access' },
      { href: '/bulk', label: 'Bulk Orders' },
      { href: '/partner', label: 'Partner Program' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { href: '/help', label: 'Help Centre' },
      { href: '/faq', label: 'FAQs' },
      { href: '/contact', label: 'Contact Us' },
      { href: '/disputes', label: 'Dispute Resolution' },
      { href: '/privacy', label: 'Privacy Policy' },
    ],
  },
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Newsletter Banner */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Stay updated with BoreHub</h3>
              <p className="text-gray-400 text-sm">Get the latest deals, industry news, and supplier updates delivered to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent text-sm"
              />
              <Button className="bg-accent hover:bg-accent-light text-white px-6 whitespace-nowrap">
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Bore<span className="text-accent-light">Hub</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              South Africa&apos;s leading marketplace for borehole services and equipment. Connecting customers with verified suppliers since 2023.
            </p>

            {/* Contact Info */}
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                  <Mail className="h-4 w-4 text-accent-light" />
                </div>
                <span>info@borehub.co.za</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-accent-light" />
                </div>
                <span>+27 11 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-accent-light" />
                </div>
                <span>Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>

          {/* Link Columns */}
          {Object.values(FOOTER_LINKS).map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-white transition-colors inline-flex items-center gap-1 group">
                      <span className="w-0 group-hover:w-2 h-px bg-accent-light transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} BoreHub (Pty) Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Globe, href: '#', label: 'Website' },
                { icon: MessageSquare, href: '#', label: 'WhatsApp' },
                { icon: Users, href: '#', label: 'Community' },
                { icon: Zap, href: '#', label: 'Updates' },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-accent/20 flex items-center justify-center transition-colors group"
                  >
                    <Icon className="h-4 w-4 text-gray-400 group-hover:text-accent-light transition-colors" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
