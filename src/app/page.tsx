'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, Drill, Wrench, Package, ArrowRight, Star, Shield, Zap, Droplets, MapPin, Phone, Mail, CheckCircle, Users, TrendingUp, Globe, ChevronRight, Building2, FileText, Truck } from 'lucide-react'

const PRIMARY = '#0c4a6e'
const PRIMARY_LIGHT = '#0369a1'
const PRIMARY_DARK = '#082f49'
const ACCENT = '#0d9488'
const ACCENT_LIGHT = '#14b8a6'

function AnimatedCounter({ target }: { target: string }) {
  const [count, setCount] = useState(0)
  const numericPart = parseInt(target.replace(/[^0-9]/g, ''))
  const prefix = target.startsWith('R') ? 'R' : ''
  const suffix = target.includes('M') ? 'M+' : target.includes('+') ? '+' : ''

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

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>
}

export default function HomePage() {
  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${PRIMARY_DARK} 0%, ${PRIMARY} 50%, ${PRIMARY_LIGHT} 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background orbs */}
        <div style={{
          position: 'absolute', top: '20%', left: '-10%', width: '500px', height: '500px',
          background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 70%)`, borderRadius: '50%', filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-10%', width: '400px', height: '400px',
          background: `radial-gradient(circle, ${PRIMARY_LIGHT}44 0%, transparent 70%)`, borderRadius: '50%', filter: 'blur(60px)'
        }} />

        {/* Floating droplets */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-float" style={{
            position: 'absolute',
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
            opacity: 0.1
          }}>
            <Droplets size={24 + i * 4} color="white" />
          </div>
        ))}

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <div className="animate-fade-in">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 20px', borderRadius: '50px', marginBottom: '32px'
            }} className="glass">
              <Droplets size={16} color={ACCENT_LIGHT} />
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', fontWeight: 500 }}>
                Trusted by 2,500+ customers across South Africa
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              South Africa&apos;s #1<br />
              <span style={{
                background: `linear-gradient(135deg, ${ACCENT_LIGHT}, #38bdf8)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Borehole Marketplace
              </span>
            </h1>

            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '600px',
              margin: '0 auto 40px',
              lineHeight: 1.6
            }}>
              Connect with verified drillers, source quality spare parts, and manage your borehole projects — all in one platform.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
              <Link href="/products">
                <button style={{
                  padding: '16px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: 600,
                  background: ACCENT, color: 'white', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  boxShadow: `0 4px 20px ${ACCENT}66`, transition: 'all 0.3s'
                }}>
                  Browse Products <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/demo">
                <button style={{
                  padding: '16px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: 600,
                  background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                  backdropFilter: 'blur(8px)', transition: 'all 0.3s'
                }}>
                  Try Demo <Zap size={18} />
                </button>
              </Link>
            </div>

            {/* Search bar */}
            <div style={{
              maxWidth: '600px', margin: '0 auto', background: 'rgba(255,255,255,0.15)',
              borderRadius: '16px', padding: '6px', backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center'
            }}>
              <Search size={20} color="rgba(255,255,255,0.6)" style={{ marginLeft: '16px' }} />
              <input
                type="text"
                placeholder="Search for pumps, casings, drilling services..."
                style={{
                  flex: 1, padding: '14px 16px', background: 'transparent', border: 'none',
                  color: 'white', fontSize: '16px', outline: 'none'
                }}
              />
              <button style={{
                padding: '12px 24px', borderRadius: '12px', background: ACCENT,
                color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer'
              }}>
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '60px 24px', background: 'white', marginTop: '-40px', position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px',
            background: 'white', borderRadius: '20px', padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9'
          }}>
            {[
              { label: 'Verified Suppliers', value: '150+', icon: Users, color: ACCENT },
              { label: 'Orders Completed', value: '2500+', icon: TrendingUp, color: PRIMARY_LIGHT },
              { label: 'Value Traded', value: 'R15M+', icon: Star, color: '#f59e0b' },
              { label: 'Provinces', value: '9', icon: Globe, color: '#8b5cf6' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '16px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px', margin: '0 auto 12px',
                  background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <stat.icon size={24} color={stat.color} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>
                  <AnimatedCounter target={stat.value} />
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '100px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 16px', borderRadius: '50px',
              background: `${ACCENT}15`, color: ACCENT, fontSize: '14px', fontWeight: 600, marginBottom: '16px'
            }}>
              How It Works
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              Get Started in 4 Simple Steps
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '500px', margin: '0 auto' }}>
              From requirement to completion in under 24 hours
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            {[
              { step: 1, title: 'Post Your Need', desc: 'Describe what you need in under 2 minutes', icon: FileText, color: '#3b82f6' },
              { step: 2, title: 'Get Matched', desc: 'Receive quotes from verified providers', icon: Users, color: ACCENT },
              { step: 3, title: 'Compare & Choose', desc: 'Review ratings, prices, and certifications', icon: Star, color: '#f59e0b' },
              { step: 4, title: 'Get It Done', desc: 'Book with secure payment protection', icon: CheckCircle, color: '#10b981' },
            ].map((item, i) => (
              <div key={i} className="hover-lift" style={{
                background: 'white', borderRadius: '20px', padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
                textAlign: 'center', position: 'relative'
              }}>
                <div style={{
                  position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)',
                  width: '32px', height: '32px', borderRadius: '50%', background: item.color,
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 700
                }}>
                  {item.step}
                </div>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '16px', margin: '16px auto 20px',
                  background: `${item.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <item.icon size={28} color={item.color} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section style={{ padding: '100px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 16px', borderRadius: '50px',
              background: `${PRIMARY}12`, color: PRIMARY, fontSize: '14px', fontWeight: 600, marginBottom: '16px'
            }}>
              Services
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              Featured Borehole Services
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
              Professional services from verified providers
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Premium Borehole Drilling', provider: 'AquaDrill SA', rating: 4.9, reviews: 127, price: 'From R180/m', location: 'Gauteng', tag: 'Most Popular', color: '#3b82f6' },
              { name: 'Pump Installation', provider: 'HydroTech Solutions', rating: 4.8, reviews: 89, price: 'From R4,500', location: 'Western Cape', tag: 'Top Rated', color: ACCENT },
              { name: 'Geophysics Survey', provider: 'GeoFind Consulting', rating: 4.7, reviews: 64, price: 'From R3,200', location: 'KwaZulu-Natal', tag: 'Expert', color: '#8b5cf6' },
              { name: 'Borehole Rehabilitation', provider: 'WellFix Pro', rating: 4.9, reviews: 103, price: 'From R2,800', location: 'Limpopo', tag: 'Fast Response', color: '#f59e0b' },
            ].map((service, i) => (
              <Link key={i} href="/services" style={{ textDecoration: 'none' }}>
                <div className="hover-lift" style={{
                  background: 'white', borderRadius: '16px', overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
                  transition: 'all 0.3s', cursor: 'pointer'
                }}>
                  <div style={{
                    height: '8px', background: `linear-gradient(90deg, ${service.color}, ${service.color}88)`
                  }} />
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 600,
                        background: `${service.color}15`, color: service.color
                      }}>
                        {service.tag}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}>{service.rating}</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8' }}>({service.reviews})</span>
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{service.name}</h3>
                    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>{service.provider}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: PRIMARY }}>{service.price}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                          <MapPin size={12} color="#94a3b8" />
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>{service.location}</span>
                        </div>
                      </div>
                      <button style={{
                        padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
                        background: `${service.color}12`, color: service.color, border: 'none', cursor: 'pointer'
                      }}>
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/services">
              <button style={{
                padding: '14px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 600,
                background: 'white', color: PRIMARY, border: `2px solid ${PRIMARY}20`, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '8px'
              }}>
                View All Services <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '100px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 16px', borderRadius: '50px',
              background: `${ACCENT}15`, color: ACCENT, fontSize: '14px', fontWeight: 600, marginBottom: '16px'
            }}>
              Products
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
              Top Selling Products
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b' }}>
              Quality equipment from verified suppliers
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {[
              { name: 'DAB Submersible Pump 0.75kW', supplier: 'PumpWorld SA', price: 4299, originalPrice: 5199, rating: 4.8, emoji: '💧' },
              { name: '110mm UPVC Borehole Casing', supplier: 'BoreParts Co', price: 899, originalPrice: 1099, rating: 4.6, emoji: '🔧' },
              { name: 'Grundfos Control Box CU200', supplier: 'ElectroDrill', price: 2450, originalPrice: 2999, rating: 4.9, emoji: '⚡' },
              { name: '2500L JoJo Water Tank', supplier: 'TankDepot', price: 3199, originalPrice: 3799, rating: 4.7, emoji: '🏗️' },
            ].map((product, i) => (
              <Link key={i} href="/products" style={{ textDecoration: 'none' }}>
                <div className="hover-lift" style={{
                  background: 'white', borderRadius: '16px', overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9',
                  cursor: 'pointer'
                }}>
                  <div style={{
                    height: '160px', background: `linear-gradient(135deg, ${PRIMARY}08, ${ACCENT}08)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem'
                  }}>
                    {product.emoji}
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                      <Star size={12} fill="#f59e0b" color="#f59e0b" />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{product.rating}</span>
                    </div>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', marginBottom: '4px', lineHeight: 1.3 }}>{product.name}</h3>
                    <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>{product.supplier}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: PRIMARY }}>R{product.price.toLocaleString()}</span>
                      <span style={{ fontSize: '14px', color: '#94a3b8', textDecoration: 'line-through' }}>R{product.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/products">
              <button style={{
                padding: '14px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 600,
                background: ACCENT, color: 'white', border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                boxShadow: `0 4px 20px ${ACCENT}44`
              }}>
                Browse All Products <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '100px 24px', background: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 16px', borderRadius: '50px',
              background: '#f59e0b15', color: '#f59e0b', fontSize: '14px', fontWeight: 600, marginBottom: '16px'
            }}>
              Testimonials
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>
              Trusted by Industry Leaders
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Thabo Mokoena', role: 'Game Farmer, Limpopo', quote: 'BoreHub connected me with an amazing drilling team. My borehole was completed in 3 days. Saved over R15,000!', avatar: 'TM', color: '#3b82f6' },
              { name: 'Sarah van der Merwe', role: 'Estate Manager, Stellenbosch', quote: 'Found genuine Grundfos pumps at wholesale prices with next-day delivery. The escrow payment gives great peace of mind.', avatar: 'SV', color: ACCENT },
              { name: 'David Nkosi', role: 'Municipal Engineer, Mpumalanga', quote: 'We use BoreHub for all municipal borehole projects. The competitive quoting system has streamlined our procurement.', avatar: 'DN', color: '#8b5cf6' },
            ].map((testimonial, i) => (
              <div key={i} className="hover-lift" style={{
                background: 'white', borderRadius: '20px', padding: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9'
              }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, marginBottom: '24px', fontStyle: 'italic' }}>
                  &quot;{testimonial.quote}&quot;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%', background: testimonial.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '16px'
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{testimonial.name}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{ padding: '80px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            {[
              { icon: Shield, title: 'Verified Suppliers', desc: 'All suppliers vetted and verified', color: '#10b981' },
              { icon: Zap, title: 'Secure Payments', desc: 'Escrow protection on all orders', color: '#3b82f6' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Nationwide logistics network', color: '#f59e0b' },
              { icon: Phone, title: '24/7 Support', desc: 'Always here to help', color: '#8b5cf6' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto 16px',
                  background: `${item.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <item.icon size={24} color={item.color} />
                </div>
                <h3 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 24px',
        background: `linear-gradient(135deg, ${PRIMARY_DARK}, ${PRIMARY}, ${PRIMARY_LIGHT})`,
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-50%', right: '-20%', width: '600px', height: '600px',
          background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 70%)`, borderRadius: '50%'
        }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white', marginBottom: '16px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '40px' }}>
            Join thousands of satisfied customers and suppliers on South Africa&apos;s leading borehole marketplace.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/auth/register">
              <button style={{
                padding: '16px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: 600,
                background: ACCENT, color: 'white', border: 'none', cursor: 'pointer',
                boxShadow: `0 4px 20px ${ACCENT}66`
              }}>
                Create Free Account
              </button>
            </Link>
            <Link href="/demo">
              <button style={{
                padding: '16px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: 600,
                background: 'rgba(255,255,255,0.15)', color: 'white',
                border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer',
                backdropFilter: 'blur(8px)'
              }}>
                Watch Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '60px 24px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Droplets size={24} color={ACCENT} />
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>BoreHub</span>
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6 }}>
                South Africa&apos;s leading marketplace for borehole services and equipment.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '16px' }}>Marketplace</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/products" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Products</Link>
                <Link href="/services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Services</Link>
                <Link href="/suppliers" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Suppliers</Link>
                <Link href="/leads" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Post Requirement</Link>
              </div>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '16px' }}>For Business</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/dashboard/supplier" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Supplier Dashboard</Link>
                <Link href="/dashboard/provider" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Provider Dashboard</Link>
                <Link href="/auth/register" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>Register</Link>
              </div>
            </div>
            <div>
              <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '16px' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} /> info@borehub.co.za
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Phone size={14} /> +27 11 123 4567
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={14} /> Johannesburg, South Africa
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '24px', textAlign: 'center', fontSize: '13px' }}>
            © {new Date().getFullYear()} BoreHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
