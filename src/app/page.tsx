'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, Drill, Wrench, Package, ArrowRight, Star, Shield, Zap, Droplets, MapPin, Phone, Mail, CheckCircle, Users, TrendingUp, Globe, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SERVICE_CATEGORIES, PRODUCT_CATEGORIES } from '@/lib/constants'

const STATS = [
  { label: 'Verified Suppliers', value: '150+', icon: Users },
  { label: 'Orders Completed', value: '2,500+', icon: TrendingUp },
  { label: 'Total Value Traded', value: 'R15M+', icon: Star },
  { label: 'Provinces Covered', value: '9', icon: Globe },
]

const HOW_IT_WORKS = [
  { step: 1, title: 'Post Your Need', description: 'Describe the borehole service or equipment you require. It takes under 2 minutes.', icon: Search },
  { step: 2, title: 'Get Matched', description: 'Receive competitive quotes from verified suppliers and service providers.', icon: Users },
  { step: 3, title: 'Compare & Choose', description: 'Review profiles, ratings, certifications and pricing to make the right choice.', icon: Star },
  { step: 4, title: 'Get It Done', description: 'Book the service or order parts with secure escrow payment protection.', icon: CheckCircle },
]

const FEATURED_SERVICES = [
  { id: 1, name: 'Premium Borehole Drilling', provider: 'AquaDrill SA', rating: 4.9, reviews: 127, price: 'From R180/m', location: 'Gauteng', tag: 'Most Popular' },
  { id: 2, name: 'Submersible Pump Installation', provider: 'HydroTech Solutions', rating: 4.8, reviews: 89, price: 'From R4,500', location: 'Western Cape', tag: 'Top Rated' },
  { id: 3, name: 'Geophysics Survey & Siting', provider: 'GeoFind Consulting', rating: 4.7, reviews: 64, price: 'From R3,200', location: 'KwaZulu-Natal', tag: 'Expert' },
  { id: 4, name: 'Borehole Rehabilitation', provider: 'WellFix Pro', rating: 4.9, reviews: 103, price: 'From R2,800', location: 'Limpopo', tag: 'Fast Response' },
]

const FEATURED_PRODUCTS = [
  { id: 1, name: 'DAB Submersible Pump 0.75kW', supplier: 'PumpWorld SA', price: 4299, originalPrice: 5199, rating: 4.8, image: '💧' },
  { id: 2, name: '110mm UPVC Borehole Casing (6m)', supplier: 'BoreParts Co', price: 899, originalPrice: 1099, rating: 4.6, image: '🔧' },
  { id: 3, name: 'Grundfos Control Box CU200', supplier: 'ElectroDrill', price: 2450, originalPrice: 2999, rating: 4.9, image: '⚡' },
  { id: 4, name: '2500L JoJo Water Tank', supplier: 'TankDepot', price: 3199, originalPrice: 3799, rating: 4.7, image: '🏗️' },
]

const TESTIMONIALS = [
  { name: 'Thabo Mokoena', role: 'Game Farmer, Limpopo', quote: 'BoreHub connected me with an amazing drilling team. My borehole was completed in 3 days and the water quality is excellent. Saved over R15,000 compared to my previous quote.', avatar: 'TM' },
  { name: 'Sarah van der Merwe', role: 'Estate Manager, Stellenbosch', quote: 'The supplier marketplace is incredible. Found genuine Grundfos pumps at wholesale prices with next-day delivery. The escrow payment system gives great peace of mind.', avatar: 'SV' },
  { name: 'David Nkosi', role: 'Municipal Engineer, Mpumalanga', quote: 'We use BoreHub for all our municipal borehole projects. The vetted supplier network and competitive quoting system has streamlined our procurement process significantly.', avatar: 'DN' },
]

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const numericPart = parseInt(target.replace(/[^0-9]/g, ''))

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = numericPart / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numericPart) {
        setCount(numericPart)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [numericPart])

  const prefix = target.startsWith('R') ? 'R' : ''
  const formatted = count.toLocaleString()
  return <span>{prefix}{formatted}{suffix}</span>
}

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
        {/* Animated droplets background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-droplet"
              style={{
                left: `${8 + i * 8}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2.5 + Math.random() * 2}s`,
              }}
            >
              <Droplets className="h-5 w-5 text-white/10" />
            </div>
          ))}
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-light/30 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Droplets className="h-4 w-4 text-accent-light" />
              <span className="text-sm text-white/90 font-medium">Trusted by 2,500+ customers across South Africa</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            South Africa&apos;s #1<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-emerald-300">
              Borehole Marketplace
            </span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.15s' }}>
            Find trusted drillers, source quality parts, and manage your borehole projects — all in one place. Save time, save money, build with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/services">
              <Button size="lg" className="bg-accent hover:bg-accent-light text-white px-8 py-4 text-base shadow-lg shadow-accent/30 hover:shadow-accent/40 transition-all">
                <Search className="h-5 w-5 mr-2" />
                Find Services
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-base backdrop-blur-sm">
                List Your Business
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mt-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.45s' }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary-light rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative flex items-center bg-white rounded-xl shadow-2xl p-2">
                <Search className="h-5 w-5 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search drilling, pumps, casings, surveys..."
                  className="flex-1 py-4 px-3 text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent text-base"
                />
                <Button className="bg-accent hover:bg-accent-light px-6 py-3 rounded-lg">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L48 110C96 100 192 80 288 73.3C384 67 480 73 576 83.3C672 93 768 107 864 103.3C960 100 1056 80 1152 70C1248 60 1344 60 1392 60L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary">
                    <AnimatedCounter target={stat.value} />
                  </div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">Simple Process</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How BoreHub Works</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">Get your borehole project done in 4 simple steps — from request to completion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20" />

            {HOW_IT_WORKS.map((item, i) => {
              const Icon = item.icon
              return (
                <div key={item.step} className="relative text-center group">
                  <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white border-2 border-gray-100 shadow-sm mb-6 group-hover:border-accent/30 group-hover:shadow-lg transition-all duration-300">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <div className="absolute top-0 right-0 md:right-auto md:-top-2 md:left-1/2 md:translate-x-8 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center shadow-md">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Services</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Services</h2>
              <p className="text-lg text-gray-500">Top-rated borehole professionals ready to help</p>
            </div>
            <Link href="/services" className="hidden md:flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_SERVICES.map((service) => (
              <Link key={service.id} href={`/services/${service.id}`}>
                <Card className="h-full hover-lift cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">
                        {service.tag}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold text-gray-900">{service.rating}</span>
                        <span className="text-xs text-gray-400">({service.reviews})</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">{service.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{service.provider}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-semibold text-primary">{service.price}</span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <MapPin className="h-3 w-3" />
                        {service.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/services" className="inline-flex items-center gap-2 text-accent font-semibold">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Equipment</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Top Products</h2>
              <p className="text-lg text-gray-500">Quality equipment from verified suppliers</p>
            </div>
            <Link href="/suppliers" className="hidden md:flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
              Browse all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <Link key={product.id} href={`/suppliers/product/${product.id}`}>
                <Card className="h-full hover-lift cursor-pointer group overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-surface to-surface-dark flex items-center justify-center text-6xl">
                    {product.image}
                  </div>
                  <CardContent className="p-5">
                    <p className="text-xs text-gray-400 mb-1">{product.supplier}</p>
                    <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">R{product.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-400 line-through">R{product.originalPrice.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories Grid */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">Explore</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Borehole Services</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">Find the right professional for every stage of your borehole project</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.map((category) => (
              <Link key={category.id} href={`/services?category=${category.id}`}>
                <Card className="h-full hover-lift cursor-pointer group">
                  <CardContent className="p-7">
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl group-hover:from-accent/20 group-hover:to-primary/20 transition-colors">
                        <Drill className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1">{category.label}</h3>
                        <p className="text-sm text-gray-500">View verified providers</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Shop</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Spare Parts & Equipment</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">Quality products from verified South African suppliers</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {PRODUCT_CATEGORIES.map((category) => (
              <Link key={category.id} href={`/suppliers?category=${category.id}`}>
                <Card className="h-full hover-lift cursor-pointer group text-center">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 mb-4 group-hover:from-accent/10 group-hover:to-primary/10 transition-colors">
                      <Package className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">{category.label}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">Testimonials</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted Across South Africa</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">See what our customers have to say about their BoreHub experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <Card key={i} className="hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">Why BoreHub</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built on Trust</h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">Every transaction is protected, every supplier is verified</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Verified Suppliers', desc: 'Every supplier undergoes rigorous vetting including business registration, insurance verification, and reference checks.', color: 'from-primary/10 to-primary/5' },
              { icon: Zap, title: 'Secure Payments', desc: 'Our escrow payment system protects both buyers and suppliers. Funds are only released when work is completed and approved.', color: 'from-accent/10 to-accent/5' },
              { icon: Phone, title: '24/7 Dedicated Support', desc: 'Our local support team is available around the clock to assist with any questions, disputes, or project guidance.', color: 'from-primary/10 to-accent/5' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <Card key={i} className="hover-lift text-center border-0 shadow-md">
                  <CardContent className="p-10">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} mb-6`}>
                      <Icon className="h-9 w-9 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Borehole Project?</h2>
          <p className="text-lg text-blue-100/90 mb-10 max-w-2xl mx-auto">
            Whether you need a borehole drilled, pumps installed, or spare parts delivered — BoreHub connects you with the best in the industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/leads">
              <Button size="lg" className="bg-accent hover:bg-accent-light text-white px-8 py-4 text-base shadow-lg shadow-accent/30">
                Post a Requirement
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-base">
                Join as Supplier
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
