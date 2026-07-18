import Link from 'next/link'
import { Search, Drill, Wrench, Package, ArrowRight, Star, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SERVICE_CATEGORIES, PRODUCT_CATEGORIES } from '@/lib/constants'

const STATS = [
  { label: 'Active Suppliers', value: '150+' },
  { label: 'Service Providers', value: '250+' },
  { label: 'Orders Completed', value: '5,000+' },
  { label: 'Provinces Covered', value: '9' },
]

const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Post Your Need',
    description: 'Tell us what borehole service or parts you need.',
  },
  {
    step: 2,
    title: 'Get Matched',
    description: 'Receive quotes from verified suppliers and providers.',
  },
  {
    step: 3,
    title: 'Compare & Choose',
    description: 'Review profiles, ratings, and pricing to decide.',
  },
  {
    step: 4,
    title: 'Get It Done',
    description: 'Book the service or order parts with secure payment.',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              South Africa&apos;s Borehole Marketplace
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find trusted drillers, source quality spare parts, and manage your borehole projects — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg">Find Services</Button>
              </Link>
              <Link href="/suppliers">
                <Button size="lg" variant="outline">Browse Suppliers</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="relative -mt-6 max-w-4xl mx-auto px-4">
        <Card className="p-2">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-gray-400 ml-3" />
            <input
              type="text"
              placeholder="Search for borehole drilling, pumps, casings, or any service..."
              className="flex-1 py-3 px-2 text-gray-900 placeholder-gray-400 focus:outline-none"
            />
            <Button>Search</Button>
          </div>
        </Card>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Borehole Services</h2>
            <p className="text-gray-600 mt-2">Find the right professional for your project</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.map((category) => (
              <Link key={category.id} href={`/services?category=${category.id}`}>
                <Card hover className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Drill className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.label}</h3>
                        <p className="text-sm text-gray-500">View providers</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Spare Parts & Equipment</h2>
            <p className="text-gray-600 mt-2">Quality products from verified suppliers</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PRODUCT_CATEGORIES.map((category) => (
              <Link key={category.id} href={`/suppliers?category=${category.id}`}>
                <Card hover className="h-full">
                  <CardContent className="p-5 text-center">
                    <Package className="h-8 w-8 text-primary mx-auto mb-3" />
                    <h3 className="font-medium text-gray-900">{category.label}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-600 mt-2">Get your borehole project done in 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Verified Suppliers</h3>
              <p className="text-sm text-gray-600">All suppliers are vetted and verified for your peace of mind.</p>
            </Card>
            <Card className="p-6 text-center">
              <Star className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Trusted Reviews</h3>
              <p className="text-sm text-gray-600">Read genuine reviews from real customers before you buy.</p>
            </Card>
            <Card className="p-6 text-center">
              <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Fast Matching</h3>
              <p className="text-sm text-gray-600">Get matched with the right providers within 24 hours.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start?</h2>
          <p className="text-blue-100 mb-8">
            Whether you need a borehole drilled, pumps installed, or spare parts delivered — we&apos;ve got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/leads">
              <Button size="lg" variant="secondary">Post a Requirement</Button>
            </Link>
            <Link href="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">Join as Supplier</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
