'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Drill,
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  MapPin,
  Eye,
  EyeOff,
  ShoppingBag,
  Store,
  Wrench,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { PROVINCES } from '@/lib/constants'

const ROLES = [
  {
    value: 'customer',
    label: 'Customer',
    desc: 'Buy borehole services and products',
    icon: ShoppingBag,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    value: 'supplier',
    label: 'Supplier',
    desc: 'Sell borehole equipment and parts',
    icon: Store,
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    value: 'service_provider',
    label: 'Service Provider',
    desc: 'Offer drilling and maintenance services',
    icon: Wrench,
    gradient: 'from-violet-500 to-purple-500',
  },
] as const

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '' as '' | 'customer' | 'supplier' | 'service_provider',
    company: '',
    province: '',
    city: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [agreed, setAgreed] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const canNext = () => {
    if (step === 1) return formData.role !== ''
    if (step === 2) return formData.name && formData.email && formData.phone
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
          company: formData.company || undefined,
          province: formData.province || undefined,
          city: formData.city || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      router.push('/auth/login?registered=true')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - Brand */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#082f49] via-[#0c4a6e] to-[#0d9488] items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full" />
        </div>

        <div className="relative z-10 max-w-md text-center">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20">
            <Drill className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Join <span className="text-emerald-400">BoreHub</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Create your account and start connecting with South Africa&apos;s borehole industry today.
          </p>

          <div className="space-y-4">
            {[
              { num: '500+', label: 'Verified Providers' },
              { num: '9', label: 'Provinces Covered' },
              { num: 'R2M+', label: 'Projects Completed' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10">
                <span className="text-2xl font-bold text-emerald-400 w-20 text-right">{stat.num}</span>
                <span className="text-white/70 text-sm text-left">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0c4a6e] to-[#0d9488] rounded-xl flex items-center justify-center">
                <Drill className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">BoreHub</span>
            </Link>
          </div>

          {/* Progress steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                    step > s
                      ? 'bg-emerald-500 text-white'
                      : step === s
                        ? 'bg-[#0c4a6e] text-white shadow-lg shadow-[#0c4a6e]/30'
                        : 'bg-gray-200 text-gray-400'
                  )}
                >
                  {step > s ? <CheckCircle className="h-4 w-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={cn('w-12 h-0.5 rounded-full transition-colors', step > s ? 'bg-emerald-500' : 'bg-gray-200')} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Role selection */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">How will you use BoreHub?</h1>
                <p className="text-gray-500 text-sm">Select your account type to get started</p>
              </div>
              <div className="space-y-3">
                {ROLES.map((role) => {
                  const Icon = role.icon
                  const active = formData.role === role.value
                  return (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: role.value }))}
                      className={cn(
                        'w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-300',
                        active
                          ? 'border-[#0d9488] bg-[#0d9488]/5 shadow-lg shadow-[#0d9488]/10'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                      )}
                    >
                      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br', role.gradient)}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className={cn('font-semibold', active ? 'text-[#0d9488]' : 'text-gray-900')}>{role.label}</h3>
                        <p className="text-sm text-gray-500">{role.desc}</p>
                      </div>
                      {active && <CheckCircle className="h-5 w-5 text-[#0d9488] shrink-0" />}
                    </button>
                  )
                })}
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!canNext()} className="bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] hover:from-[#082f49] hover:to-[#0c4a6e] rounded-xl px-8">
                  Continue <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Personal details */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Your Details</h1>
                <p className="text-gray-500 text-sm">Tell us about yourself</p>
              </div>
              <div className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="John Smith" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="+27 82 123 4567" />
                  </div>
                </div>
                {(formData.role === 'supplier' || formData.role === 'service_provider') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="Your company name" />
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Province</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select name="province" value={formData.province} onChange={handleChange} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm appearance-none">
                        <option value="">Select</option>
                        {PROVINCES.map((prov) => (
                          <option key={prov} value={prov}>{prov}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm" placeholder="City" />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)} className="text-gray-500">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={!canNext()} className="bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] hover:from-[#082f49] hover:to-[#0c4a6e] rounded-xl px-8">
                  Continue <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Password & Terms */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="animate-fade-in">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Secure Your Account</h1>
                <p className="text-gray-500 text-sm">Create a strong password</p>
              </div>
              <div className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-11 pr-11 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm"
                      placeholder="Min. 6 characters"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0d9488]/30 focus:border-[#0d9488] transition-all text-sm"
                      placeholder="Re-enter password"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#0d9488] focus:ring-[#0d9488]"
                  />
                  <span className="text-sm text-gray-500">
                    I agree to the{' '}
                    <Link href="/terms" className="text-[#0d9488] hover:underline font-medium">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-[#0d9488] hover:underline font-medium">Privacy Policy</Link>
                  </span>
                </label>
              </div>
              <div className="mt-6 flex justify-between">
                <Button type="button" variant="ghost" onClick={() => setStep(2)} className="text-gray-500">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                <Button type="submit" loading={loading} disabled={!agreed} className="bg-gradient-to-r from-[#0c4a6e] to-[#0d9488] hover:from-[#082f49] hover:to-[#0c4a6e] rounded-xl px-8 shadow-lg shadow-[#0c4a6e]/20">
                  Create Account <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#0d9488] font-semibold hover:text-[#0c4a6e] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
