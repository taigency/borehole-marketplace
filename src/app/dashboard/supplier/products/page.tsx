'use client'

import { useState } from 'react'
import {
  Plus, Search, Edit2, Trash2,
  Package, X, ChevronDown,
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const CATEGORIES = ['All', 'Drilling Equipment', 'Pumps & Motors', 'Pipes & Fittings', 'Water Treatment', 'Accessories']

const MOCK_PRODUCTS = [
  { id: 'P001', name: 'Rotary Drill Bit 6"', category: 'Drilling Equipment', price: 4500, stock: 45, status: 'active', sku: 'DE-RDB-006' },
  { id: 'P002', name: 'Submersible Pump 1HP', category: 'Pumps & Motors', price: 8900, stock: 22, status: 'active', sku: 'PM-SP-1HP' },
  { id: 'P003', name: 'PVC Casing Pipe 110mm (6m)', category: 'Pipes & Fittings', price: 1200, stock: 156, status: 'active', sku: 'PF-PVC-110' },
  { id: 'P004', name: 'Borehole Chlorination Kit', category: 'Water Treatment', price: 650, stock: 0, status: 'out_of_stock', sku: 'WT-CK-001' },
  { id: 'P005', name: 'Well Head Assembly Standard', category: 'Accessories', price: 3200, stock: 18, status: 'active', sku: 'AC-WHA-STD' },
  { id: 'P006', name: 'DTH Hammer 8"', category: 'Drilling Equipment', price: 12500, stock: 4, status: 'low_stock', sku: 'DE-DTH-008' },
  { id: 'P007', name: 'Solar Pump Controller', category: 'Pumps & Motors', price: 6700, stock: 3, status: 'low_stock', sku: 'PM-SPC-001' },
  { id: 'P008', name: 'HDPE Pipe 50mm (100m Roll)', category: 'Pipes & Fittings', price: 2800, stock: 67, status: 'active', sku: 'PF-HDPE-050' },
  { id: 'P009', name: 'Water Filter System 5-Stage', category: 'Water Treatment', price: 4200, stock: 12, status: 'active', sku: 'WT-WF-5ST' },
  { id: 'P010', name: 'Pressure Tank 100L', category: 'Accessories', price: 3800, stock: 1, status: 'low_stock', sku: 'AC-PT-100' },
  { id: 'P011', name: 'Drill Rod 3m (Set of 10)', category: 'Drilling Equipment', price: 7800, stock: 28, status: 'active', sku: 'DE-DR-3M10' },
  { id: 'P012', name: 'Bentonite Drilling Mud 25kg', category: 'Drilling Equipment', price: 350, stock: 200, status: 'active', sku: 'DE-BM-25K' },
]

const statusConfig = {
  active: { label: 'In Stock', variant: 'success' as const },
  low_stock: { label: 'Low Stock', variant: 'warning' as const },
  out_of_stock: { label: 'Out of Stock', variant: 'error' as const },
  draft: { label: 'Draft', variant: 'secondary' as const },
}

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Products</h1>
          <p className="text-gray-500 mt-1 text-[14px]">{MOCK_PRODUCTS.length} products in your catalog</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="h-9 text-[13px]"
          style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
          <Plus className="h-4 w-4 mr-1.5" />
          Add Product
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40 focus:bg-white transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none w-full sm:w-52 px-4 py-2.5 pr-10 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Product</th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 hidden md:table-cell">Category</th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3 hidden lg:table-cell">SKU</th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Price</th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Stock</th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#0c4a6e]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="h-4 w-4 text-[#0c4a6e]" />
                        </div>
                        <span className="text-[13px] font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 hidden md:table-cell">
                      <span className="text-[13px] text-gray-500">{product.category}</span>
                    </td>
                    <td className="px-6 py-3.5 hidden lg:table-cell">
                      <span className="text-[12px] font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{product.sku}</span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span className="text-[13px] font-semibold text-gray-900">{formatCurrency(product.price)}</span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <span className={cn(
                        'text-[13px] font-semibold',
                        product.stock === 0 ? 'text-red-600' :
                        product.stock <= 5 ? 'text-amber-600' :
                        'text-gray-900'
                      )}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <Badge variant={statusConfig[product.status as keyof typeof statusConfig].variant} className="text-[11px]">
                        {statusConfig[product.status as keyof typeof statusConfig].label}
                      </Badge>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors" title="Edit">
                          <Edit2 className="h-3.5 w-3.5 text-gray-400 hover:text-[#0c4a6e]" />
                        </button>
                        <button
                          className="p-1.5 rounded-md hover:bg-red-50 transition-colors"
                          title="Delete"
                          onClick={() => setDeleteConfirm(product.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="h-7 w-7 text-gray-300" />
              </div>
              <p className="text-[14px] font-medium text-gray-500">No products found</p>
              <p className="text-[12px] text-gray-400 mt-1">Try adjusting your search or filter</p>
            </div>
          )}
        </CardContent>
      </Card>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-[16px] font-semibold text-gray-900">Add New Product</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Submersible Pump 2HP"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Category</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40">
                    {CATEGORIES.filter(c => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">SKU</label>
                  <input
                    type="text"
                    placeholder="e.g. PM-SP-2HP"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Price (ZAR)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Stock Quantity</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe your product..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-[#0c4a6e]/20 focus:border-[#0c4a6e]/40 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
              <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)} className="h-9 text-[13px]">Cancel</Button>
              <Button size="sm" onClick={() => setShowAddModal(false)} className="h-9 text-[13px]"
                style={{ background: 'linear-gradient(135deg, #0c4a6e, #0d9488)' }}>
                Add Product
              </Button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-[16px] font-semibold text-gray-900 mb-2">Delete Product</h3>
            <p className="text-[13px] text-gray-500 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" size="sm" onClick={() => setDeleteConfirm(null)} className="h-9 text-[13px]">Cancel</Button>
              <Button variant="danger" size="sm" onClick={() => setDeleteConfirm(null)} className="h-9 text-[13px]">Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
