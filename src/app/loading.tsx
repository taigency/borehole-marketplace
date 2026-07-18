import { Droplet } from 'lucide-react'

/**
 * App-level splash shown while a route segment is loading.
 * Uses the BoreHub brand gradient so navigations feel intentional.
 */
export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0c4a6e] to-[#0d9488] flex items-center justify-center shadow-lg shadow-[#0c4a6e]/25 animate-pulse-glow">
          <Droplet className="h-8 w-8 text-white" />
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-[#0d9488]/40 animate-ping" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-semibold text-gray-900">BoreHub</span>
        <span className="text-xs text-gray-400">Loading…</span>
      </div>
    </div>
  )
}
