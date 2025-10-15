import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/products')({
  component: ProductsLayout,
})

const navItems = [
  { label: '상품', path: '/products' },
  { label: '옵션', path: '/products/options' },
  { label: '카테고리', path: '/products/categories' },
]

function ProductsLayout() {
  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <div className="w-56 bg-gray-50 border-r min-h-screen p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">상품 관리</h2>
        
        {/* Action Buttons */}
        <div className="space-y-2 mb-6">
          <Button variant="ghost" className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-normal text-sm">
            ✏️ 상품 편집으로 이동
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-200 font-normal text-sm">
            📦 상품 한 번에 등록
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'block px-3 py-2 text-sm rounded-md transition-colors',
                'hover:bg-gray-200',
                '[&.active]:bg-blue-600 [&.active]:text-white',
                'text-gray-700'
              )}
              activeProps={{
                className: 'active',
              }}
              activeOptions={{ exact: item.path === '/products' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}
