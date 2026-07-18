export const PROVINCES = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
  'Western Cape',
] as const

export const SERVICE_CATEGORIES = [
  { id: 'drilling', label: 'Borehole Drilling', icon: 'Drill' },
  { id: 'pump_installation', label: 'Pump Installation', icon: 'Wrench' },
  { id: 'geophysics', label: 'Geophysics Survey', icon: 'Map' },
  { id: 'maintenance', label: 'Maintenance & Repair', icon: 'Settings' },
  { id: 'consulting', label: 'Hydrogeology Consulting', icon: 'BookOpen' },
] as const

export const PRODUCT_CATEGORIES = [
  { id: 'pumps', label: 'Water Pumps' },
  { id: 'casings', label: 'Borehole Casings' },
  { id: 'bits', label: 'Drill Bits' },
  { id: 'pipes', label: 'Pipes & Fittings' },
  { id: 'tanks', label: 'Water Tanks' },
  { id: 'filters', label: 'Filters & Screens' },
  { id: 'controllers', label: 'Controllers & Panels' },
  { id: 'accessories', label: 'Accessories' },
] as const

export const LEAD_STATUSES = [
  { id: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { id: 'qualified', label: 'Qualified', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'assigned', label: 'Assigned', color: 'bg-purple-100 text-purple-800' },
  { id: 'quoted', label: 'Quoted', color: 'bg-orange-100 text-orange-800' },
  { id: 'won', label: 'Won', color: 'bg-green-100 text-green-800' },
  { id: 'lost', label: 'Lost', color: 'bg-red-100 text-red-800' },
] as const

export const ORDER_STATUSES = [
  { id: 'pending', label: 'Pending', color: 'bg-gray-100 text-gray-800' },
  { id: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  { id: 'processing', label: 'Processing', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'shipped', label: 'Shipped', color: 'bg-purple-100 text-purple-800' },
  { id: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-800' },
  { id: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { id: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
] as const

export const NAV_ITEMS = [
  { href: '/services', label: 'Services' },
  { href: '/suppliers', label: 'Suppliers' },
  { href: '/leads', label: 'Post a Requirement' },
  { href: '/about', label: 'How It Works' },
] as const
