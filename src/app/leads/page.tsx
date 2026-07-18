'use client'

import { useState } from 'react'
import { Send, MapPin, Phone, Mail, User, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SERVICE_CATEGORIES, PROVINCES } from '@/lib/constants'

export default function LeadsPage() {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    service_type: '',
    location: '',
    budget: '',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <Send className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Requirement Submitted!</h1>
        <p className="text-gray-600 mb-8">
          We&apos;ve received your requirement and will match you with verified providers within 24 hours.
        </p>
        <Button onClick={() => { setSubmitted(false); setFormData({ customer_name: '', customer_email: '', customer_phone: '', service_type: '', location: '', budget: '', description: '' }) }}>
          Submit Another Requirement
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Post a Requirement</h1>
        <p className="text-gray-600 mt-2">Tell us what you need and get matched with the best providers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold">Your Requirements</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="h-4 w-4 inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    required
                    value={formData.customer_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="customer_email"
                    required
                    value={formData.customer_email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="customer_phone"
                    required
                    value={formData.customer_phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="+27 82 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Location *
                  </label>
                  <select
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="">Select province</option>
                    {PROVINCES.map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FileText className="h-4 w-4 inline mr-1" />
                    Service Type *
                  </label>
                  <select
                    name="service_type"
                    required
                    value={formData.service_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="">Select service</option>
                    {SERVICE_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Budget (ZAR)
                  </label>
                  <input
                    type="text"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="e.g., 50,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Describe your project requirements, timeline, and any specific needs..."
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                  {error}
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" loading={loading}>
                <Send className="h-4 w-4 mr-2" />
                Submit Requirement
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">What Happens Next?</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</div>
                  <p className="text-sm text-gray-600">We review your requirement within 2 hours</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</div>
                  <p className="text-sm text-gray-600">Matched providers are notified immediately</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</div>
                  <p className="text-sm text-gray-600">You receive up to 3 quotes within 24 hours</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</div>
                  <p className="text-sm text-gray-600">Compare, choose, and get your project done</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Why Use BoreHub?</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Free to post requirements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  All providers are verified
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Compare multiple quotes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Secure payment protection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Customer support included
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
