'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

export interface ProductFormData {
  name: string
  category: string
  subcategory: string
  description: string
  price: number
  stock: number
  specifications: Record<string, string>
}

interface ProductFormProps {
  initialData?: Partial<ProductFormData>
  onSubmit: (data: ProductFormData) => Promise<void> | void
  className?: string
}

const categories = [
  { value: 'pumps', label: 'Pumps', subcategories: ['Submersible', 'Centrifugal', 'Jet', 'Solar'] },
  { value: 'pipes', label: 'Pipes & Fittings', subcategories: ['PVC', 'HDPE', 'Steel', 'Galvanized'] },
  { value: 'drilling_equipment', label: 'Drilling Equipment', subcategories: ['Bits', 'Rods', 'Casings', 'Hammers'] },
  { value: 'water_treatment', label: 'Water Treatment', subcategories: ['Filtration', 'Purification', 'Chemical', 'UV'] },
  { value: 'tanks', label: 'Storage Tanks', subcategories: ['Steel', 'Plastic', 'JoJo', 'Elevated'] },
  { value: 'accessories', label: 'Accessories', subcategories: ['Control Panels', 'Pressure Switches', 'Valves', 'Gauges'] },
]

export function ProductForm({ initialData, onSubmit, className }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>({
    name: initialData?.name ?? '',
    category: initialData?.category ?? '',
    subcategory: initialData?.subcategory ?? '',
    description: initialData?.description ?? '',
    price: initialData?.price ?? 0,
    stock: initialData?.stock ?? 0,
    specifications: initialData?.specifications ?? {},
  })
  const [specKey, setSpecKey] = useState('')
  const [specValue, setSpecValue] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const selectedCategory = categories.find((c) => c.value === form.category)

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Product name is required'
    if (!form.category) errs.category = 'Category is required'
    if (!form.description.trim()) errs.description = 'Description is required'
    if (form.price <= 0) errs.price = 'Price must be greater than 0'
    if (form.stock < 0) errs.stock = 'Stock cannot be negative'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSubmit(form)
    } finally {
      setSubmitting(false)
    }
  }

  function update<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  function addSpecification() {
    if (!specKey.trim() || !specValue.trim()) return
    setForm((prev) => ({
      ...prev,
      specifications: { ...prev.specifications, [specKey.trim()]: specValue.trim() },
    }))
    setSpecKey('')
    setSpecValue('')
  }

  function removeSpecification(key: string) {
    setForm((prev) => {
      const specs = { ...prev.specifications }
      delete specs[key]
      return { ...prev, specifications: specs }
    })
  }

  return (
    <Card className={cn('max-w-2xl', className)}>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900">
            {initialData?.name ? 'Edit Product' : 'Add New Product'}
          </h3>
        </CardHeader>

        <CardContent className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className={cn(
                'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50',
                errors.name ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="e.g. 4-inch Submersible Pump"
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => {
                  update('category', e.target.value)
                  update('subcategory', '')
                }}
                className={cn(
                  'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50',
                  errors.category ? 'border-red-300' : 'border-gray-300'
                )}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
              <select
                value={form.subcategory}
                onChange={(e) => update('subcategory', e.target.value)}
                disabled={!form.category}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:bg-gray-100"
              >
                <option value="">Select subcategory</option>
                {selectedCategory?.subcategories.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={4}
              className={cn(
                'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none',
                errors.description ? 'border-red-300' : 'border-gray-300'
              )}
              placeholder="Describe the product, its features, and use cases"
            />
            {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (ZAR)</label>
              <input
                type="number"
                value={form.price || ''}
                onChange={(e) => update('price', parseFloat(e.target.value) || 0)}
                min="0"
                step="0.01"
                className={cn(
                  'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50',
                  errors.price ? 'border-red-300' : 'border-gray-300'
                )}
                placeholder="0.00"
              />
              {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                value={form.stock || ''}
                onChange={(e) => update('stock', parseInt(e.target.value) || 0)}
                min="0"
                className={cn(
                  'w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50',
                  errors.stock ? 'border-red-300' : 'border-gray-300'
                )}
                placeholder="0"
              />
              {errors.stock && <p className="mt-1 text-xs text-red-600">{errors.stock}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={specKey}
                onChange={(e) => setSpecKey(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Key (e.g. Flow Rate)"
              />
              <input
                type="text"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Value (e.g. 50 L/min)"
              />
              <Button type="button" variant="outline" onClick={addSpecification}>
                Add
              </Button>
            </div>
            {Object.entries(form.specifications).length > 0 && (
              <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
                {Object.entries(form.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm">
                      <span className="font-medium text-gray-700">{key}:</span>{' '}
                      <span className="text-gray-600">{value}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSpecification(key)}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-3">
          <Button type="submit" loading={submitting}>
            {initialData?.name ? 'Update Product' : 'Add Product'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}