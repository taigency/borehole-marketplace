'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Send,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  Drill,
  Wrench,
  Cog,
  Map,
  Package,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  DollarSign,
  MessageSquare,
  Shield,
  Clock,
  Users,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PROVINCES } from '@/lib/constants'

const WIZARD_STEPS = [
  { id: 1, title: 'Service', icon: Drill },
  { id: 2, title: 'Details', icon: MapPin },
  { id: 3, title: 'Project', icon: FileText },
  { id: 4, title: 'Contact', icon: User },
  { id: 5, title: 'Confirm', icon: CheckCircle },
]

const SERVICE_OPTIONS = [
  { id: 'drilling', label: 'Borehole Drilling', icon: Drill, desc: 'Complete drilling from survey to completion' },
  { id: 'pump_installation', label: 'Pump Installation', icon: Wrench, desc: 'Submersible & surface pump setup' },
  { id: 'geophysics', label: 'Geophysics Survey', icon: Map, desc: 'Water detection & site assessment' },
  { id: 'maintenance', label: 'Maintenance & Repair', icon: Cog, desc: 'Servicing, repairs & water testing' },
  { id: 'consulting', label: 'Hydrogeology Consulting', icon: Package, desc: 'Expert water resource consulting' },
]

const BUDGET_OPTIONS = [
  'Under R10,000',
  'R10,000 – R50,000',
  'R50,000 – R100,000',
  'Over R100,000',
  'Not sure yet',
]

export default function LeadsPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    service_type: '',
    location: '',
    budget: '',
    description: '',
    timeline: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const canNext = () => {
    if (step === 1) return formData.service_type !== ''
    if (step === 2) return formData.location !== '' && formData.budget !== ''
    if (step === 3) return formData.description.length > 10
    if (step === 4) return formData.customer_name && formData.customer_email && formData.customer_phone
    return true
  }

  const next = () => { if (canNext() && step < 5) setStep(s => s + 1) }
  const back = () => { if (step > 1) setStep(s => s - 1) }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit requirement')
      }

      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit requirement')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center animate-fade-in">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Requirement Submitted!</h1>
          <p className="text-gray-500 mb-8">
            We&apos;ve received your requirement and will match you with verified providers within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => { setSubmitted(false); setStep(1); setFormData({ service_type: '', location: '', budget: '', description: '', timeline: '', customer_name: '', customer_email: '', customer_phone: '' }) }}>
              Submit Another
            </Button>
            <Link href="/demo">
              <Button variant="outline">Try Demo Wizard</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post a Requirement</h1>
        <p className="text-gray-500 mt-1">Tell us what you need and get matched with the best providers</p>
      </div>

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-between">
          {WIZARD_STEPS.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500',
                      step > s.id
                        ? 'bg-emerald-500 text-white'
                        : step === s.id
                          ? 'bg-[#0c4a6e] text-white shadow-lg shadow-[#0c4a6e]/30 scale-110'
                          : 'bg-gray-200 text-gray-400'
                    )}
                  >
                    {step > s.id ? <CheckCircle className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <span className={cn('text-xs mt-1.5 font-medium hidden sm:block', step >= s.id ? 'text-gray-900' : 'text-gray-400')}>
                    {s.title}
                  </span>
                </div>
                {i < WIZARD_STEPS.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-3 h-1 rounded-full overflow-hidden bg-gray-200">
                    <div className={cn('h-full rounded-full transition-all duration-700 ease-out', step > s.id ? 'bg-emerald-500 w-full' : 'w-0')} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            {/* Step 1: Service type */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-gray-900 mb-1">What service do you need?</h2>
                <p className="text-sm text-gray-500 mb-6">Select the type of service you&apos;re looking for</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICE_OPTIONS.map((svc) => {
                    const Icon = svc.icon
                    const active = formData.service_type === svc.id
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, service_type: svc.id }))}
                        className={cn(
                          'relative flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-300',
                          active
                            ? 'border-[#0d9488] bg-[#0d9488]/5 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        )}
                      >
                        {active && <CheckCircle className="absolute top-2 right-2 h-4 w-4 text-[#0d9488]" />}
                        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', active ? 'bg-[#0d9488]/10' : 'bg-gray-100')}>
                          <Icon className={cn('h-5 w-5', active ? 'text-[#0d9488]' : 'text-gray-500')} />
                        </div>
                        <div>
                          <h3 className={cn('text-sm font-semibold', active ? 'text-[#0d9488]' : 'text-gray-900')}>{svc.label}</h3>
                          <p className="text-xs text-gray-500">{svc.desc}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Location and budget */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Location & Budget</h2>
                <p className="text-sm text-gray-500 mb-6">Help us find providers in your area and price range</p>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" /> Province *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PROVINCES.map((prov) => {
                        const active = formData.location === prov
                        return (
                          <button
                            key={prov}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, location: prov }))}
                            className={cn(
                              'p-3 rounded-xl border-2 text-sm font-medium text-left transition-all',
                              active
                                ? 'border-[#0d9488] bg-[#0d9488]/5 text-[#0d9488]'
                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                            )}
                          >
                            {prov}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="inline h-4 w-4 mr-1" /> Budget Range *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {BUDGET_OPTIONS.map((b) => {
                        const active = formData.budget === b
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, budget: b }))}
                            className={cn(
                              'p-3 rounded-xl border-2 text-sm font-medium text-left transition-all',
                              active
                                ? 'border-[#0d9488] bg-[#0d9488]/5 text-[#0d9488]'
                                : 'border-gray-200 text-gray-600 hover:border-gray-300'
                            )}
                          >
                            {b}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Project details */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Project Details</h2>
                <p className="text-sm text-gray-500 mb-6">Describe your project so providers can prepare accurate quotes</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <MessageSquare className="inline h-4 w-4 mr-1" /> Project Description *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm resize-none"
                      placeholder="Describe your project requirements, any specific needs, site conditions, etc..."
                    />
                    <p className="text-xs text-gray-400 mt-1">{formData.description.length} characters (min 10)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <Clock className="inline h-4 w-4 mr-1" /> Preferred Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">As soon as possible</option>
                      <option value="1-2weeks">1 – 2 weeks</option>
                      <option value="1month">Within a month</option>
                      <option value="flexible">Flexible / Just exploring</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Contact info */}
            {step === 4 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Contact Information</h2>
                <p className="text-sm text-gray-500 mb-6">How can providers reach you with their quotes?</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input type="text" name="customer_name" required value={formData.customer_name} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="John Smith" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input type="email" name="customer_email" required value={formData.customer_email} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input type="tel" name="customer_phone" required value={formData.customer_phone} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="+27 82 123 4567" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {step === 5 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-gray-900 mb-1">Review & Submit</h2>
                <p className="text-sm text-gray-500 mb-6">Please review your details before submitting</p>
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 mb-4">
                    {error}
                  </div>
                )}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Service</p>
                    <p className="text-sm font-medium text-gray-900">
                      {SERVICE_OPTIONS.find(s => s.id === formData.service_type)?.label}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Location</p>
                      <p className="text-sm font-medium text-gray-900">{formData.location}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Budget</p>
                      <p className="text-sm font-medium text-gray-900">{formData.budget}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Description</p>
                    <p className="text-sm text-gray-700">{formData.description}</p>
                  </div>
                  {formData.timeline && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Timeline</p>
                      <p className="text-sm font-medium text-gray-900">{formData.timeline}</p>
                    </div>
                  )}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Contact</p>
                    <p className="text-sm font-medium text-gray-900">{formData.customer_name}</p>
                    <p className="text-sm text-gray-500">{formData.customer_email} · {formData.customer_phone}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <Button variant="ghost" onClick={back} disabled={step === 1} className={cn(step === 1 && 'opacity-0')}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back
              </Button>
              {step < 5 ? (
                <Button onClick={next} disabled={!canNext()} className="bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] hover:from-[#082f49] hover:to-[#0c4a6e] rounded-xl px-6">
                  Continue <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} loading={loading} className="bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] hover:from-[#082f49] hover:to-[#0c4a6e] rounded-xl px-6 shadow-lg shadow-[#0c4a6e]/20">
                  <Send className="h-4 w-4 mr-2" /> Submit Requirement
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#082f49] to-[#0c4a6e] rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-4">How It Works</h3>
            <div className="space-y-4">
              {[
                { num: '1', text: 'Submit your requirement in under 2 minutes' },
                { num: '2', text: 'We match you with verified local providers' },
                { num: '3', text: 'Receive up to 3 competitive quotes' },
                { num: '4', text: 'Compare, choose & get your project done' },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                    {item.num}
                  </div>
                  <p className="text-sm text-white/80">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Why Use BoreHub?</h3>
            <div className="space-y-3">
              {[
                { icon: Shield, text: 'All providers verified & vetted' },
                { icon: Clock, text: 'Quotes within 24 hours' },
                { icon: Users, text: '500+ trusted providers' },
                { icon: Star, text: '4.8 average provider rating' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0d9488]/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-[#0d9488]" />
                    </div>
                    <span className="text-sm text-gray-600">{item.text}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6">
            <p className="text-sm text-emerald-800 font-medium mb-1">Free Service</p>
            <p className="text-xs text-emerald-600">Posting a requirement is completely free. No obligations, no hidden fees.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
