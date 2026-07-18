'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Drill,
  Wrench,
  Cog,
  Map,
  Package,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Star,
  MapPin,
  BadgeCheck,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const STEPS = [
  { id: 1, title: 'Service' },
  { id: 2, title: 'Location' },
  { id: 3, title: 'Budget' },
  { id: 4, title: 'Matches' },
  { id: 5, title: 'Done' },
]

const SERVICES = [
  { id: 'drilling', label: 'Borehole Drilling', icon: Drill, desc: 'Complete borehole drilling from site survey to completion' },
  { id: 'pump', label: 'Pump Installation', icon: Wrench, desc: 'Submersible & surface pump installation and setup' },
  { id: 'spare_parts', label: 'Spare Parts', icon: Package, desc: 'Casings, pipes, fittings, and replacement parts' },
  { id: 'maintenance', label: 'Maintenance', icon: Cog, desc: 'Scheduled servicing, repairs, and water testing' },
  { id: 'geophysics', label: 'Geophysics Survey', icon: Map, desc: 'Underground water detection and site assessment' },
]

const PROVINCES = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
  'Western Cape',
]

const BUDGETS = [
  { id: 'under10', label: 'Under R10,000', range: 'R0 – R10,000' },
  { id: '10to50', label: 'R10,000 – R50,000', range: 'R10,000 – R50,000' },
  { id: '50to100', label: 'R50,000 – R100,000', range: 'R50,000 – R100,000' },
  { id: 'over100', label: 'Over R100,000', range: 'R100,000+' },
]

const PROVIDERS = [
  {
    name: 'AquaDrill Pro',
    rating: 4.9,
    reviews: 127,
    priceRange: 'R45,000 – R85,000',
    tagline: 'Leading borehole drilling specialists in Gauteng',
    badges: ['Verified', 'Top Rated'],
  },
  {
    name: 'BoreTech Solutions',
    rating: 4.7,
    reviews: 89,
    priceRange: 'R38,000 – R72,000',
    tagline: 'Affordable quality drilling with 15+ years experience',
    badges: ['Verified', 'Fast Response'],
  },
  {
    name: 'GroundWater SA',
    rating: 4.8,
    reviews: 203,
    priceRange: 'R55,000 – R110,000',
    tagline: 'Full-service hydrogeology and drilling company',
    badges: ['Verified', 'Premium'],
  },
]

export default function DemoPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')

  const canNext = () => {
    if (step === 1) return selectedService !== ''
    if (step === 2) return selectedProvince !== ''
    if (step === 3) return selectedBudget !== ''
    return true
  }

  const next = () => { if (canNext() && step < 5) setStep(s => s + 1) }
  const back = () => { if (step > 1) setStep(s => s - 1) }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#082f49] via-[#0c4a6e] to-[#0d9488] flex flex-col">
      {/* Top bar */}
      <div className="px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Drill className="h-7 w-7 text-white" />
          <span className="text-xl font-bold text-white">BoreHub</span>
        </Link>
        <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors">
          Back to Home
        </Link>
      </div>

      {/* Progress bar */}
      <div className="px-8 md:px-16 lg:px-32 mt-4">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500',
                    step > s.id
                      ? 'bg-emerald-400 text-white scale-100'
                      : step === s.id
                        ? 'bg-white text-[#0c4a6e] scale-110 shadow-lg shadow-white/30'
                        : 'bg-white/20 text-white/50'
                  )}
                >
                  {step > s.id ? <CheckCircle className="h-5 w-5" /> : s.id}
                </div>
                <span
                  className={cn(
                    'text-xs mt-1.5 font-medium transition-colors hidden sm:block',
                    step >= s.id ? 'text-white' : 'text-white/40'
                  )}
                >
                  {s.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-3 h-1 rounded-full overflow-hidden bg-white/20">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-700 ease-out',
                      step > s.id ? 'bg-emerald-400 w-full' : 'w-0'
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-8">
        <div className="w-full max-w-3xl">
          {/* Step 1: Service selection */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">What do you need?</h1>
                <p className="text-white/70 text-lg">Select the service you&apos;re looking for</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SERVICES.map((svc) => {
                  const Icon = svc.icon
                  const active = selectedService === svc.id
                  return (
                    <button
                      key={svc.id}
                      onClick={() => setSelectedService(svc.id)}
                      className={cn(
                        'group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover-lift',
                        active
                          ? 'border-emerald-400 bg-white/15 shadow-lg shadow-emerald-500/20'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'
                      )}
                    >
                      {active && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                        </div>
                      )}
                      <div
                        className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors',
                          active ? 'bg-emerald-400/20' : 'bg-white/10'
                        )}
                      >
                        <Icon className={cn('h-6 w-6', active ? 'text-emerald-400' : 'text-white/70')} />
                      </div>
                      <h3 className={cn('font-semibold text-lg mb-1', active ? 'text-white' : 'text-white/90')}>
                        {svc.label}
                      </h3>
                      <p className="text-sm text-white/50 leading-relaxed">{svc.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Province selector */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Where are you located?</h1>
                <p className="text-white/70 text-lg">We&apos;ll match you with providers in your area</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PROVINCES.map((prov) => {
                  const active = selectedProvince === prov
                  return (
                    <button
                      key={prov}
                      onClick={() => setSelectedProvince(prov)}
                      className={cn(
                        'relative p-4 rounded-xl border-2 text-left transition-all duration-300 hover-lift',
                        active
                          ? 'border-emerald-400 bg-white/15 shadow-lg shadow-emerald-500/20'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'
                      )}
                    >
                      {active && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                        </div>
                      )}
                      <MapPin className={cn('h-5 w-5 mb-2', active ? 'text-emerald-400' : 'text-white/50')} />
                      <span className={cn('text-sm font-medium', active ? 'text-white' : 'text-white/80')}>
                        {prov}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 3: Budget selector */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">What&apos;s your budget?</h1>
                <p className="text-white/70 text-lg">Help us find providers within your price range</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {BUDGETS.map((b) => {
                  const active = selectedBudget === b.id
                  return (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBudget(b.id)}
                      className={cn(
                        'relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover-lift',
                        active
                          ? 'border-emerald-400 bg-white/15 shadow-lg shadow-emerald-500/20'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'
                      )}
                    >
                      {active && (
                        <div className="absolute top-3 right-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                        </div>
                      )}
                      <p className={cn('text-2xl font-bold mb-1', active ? 'text-emerald-400' : 'text-white')}>
                        {b.label}
                      </p>
                      <p className="text-sm text-white/50">{b.range}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 4: Matched providers */}
          {step === 4 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                  <Sparkles className="h-4 w-4" />
                  AI Matched
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">We found matches!</h1>
                <p className="text-white/70 text-lg">
                  Top providers for {SERVICES.find(s => s.id === selectedService)?.label} in {selectedProvince}
                </p>
              </div>
              <div className="space-y-4">
                {PROVIDERS.map((prov, i) => (
                  <div
                    key={prov.name}
                    className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover-lift transition-all duration-300"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xl shrink-0">
                        {prov.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-white">{prov.name}</h3>
                          {prov.badges.map((b) => (
                            <span
                              key={b}
                              className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full"
                            >
                              <BadgeCheck className="h-3 w-3" />
                              {b}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-white/60 mb-2">{prov.tagline}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-amber-400">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-medium">{prov.rating}</span>
                            <span className="text-white/40">({prov.reviews} reviews)</span>
                          </span>
                          <span className="text-white/70 font-medium">{prov.priceRange}</span>
                        </div>
                      </div>
                      <Button
                        size="lg"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white shrink-0 shadow-lg shadow-emerald-500/30"
                      >
                        Get Quote
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <div className="animate-fade-in text-center">
              <div className="w-24 h-24 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <CheckCircle className="h-12 w-12 text-emerald-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Request sent!</h1>
              <p className="text-white/70 text-lg max-w-md mx-auto mb-8">
                Your quote request has been sent to the matched providers. Expect to hear back within 24 hours.
              </p>
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 max-w-md mx-auto mb-8 text-left">
                <h3 className="font-semibold text-white mb-4">What happens next?</h3>
                <div className="space-y-3">
                  {[
                    'Providers review your requirement',
                    'You receive up to 3 quotes via email',
                    'Compare prices, reviews & timelines',
                    'Choose your provider and get started',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-sm text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/leads">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30">
                    Post Another Requirement
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      {step < 5 && (
        <div className="px-8 md:px-16 lg:px-32 py-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={back}
            disabled={step === 1}
            className="text-white hover:bg-white/10 disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={next}
            disabled={!canNext()}
            size="lg"
            className="bg-white text-[#0c4a6e] hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg font-semibold px-8"
          >
            {step === 4 ? 'Send Request' : 'Continue'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
