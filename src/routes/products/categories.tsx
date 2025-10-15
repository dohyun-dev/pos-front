import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/products/categories')({
  component: ProductCategoriesPage,
})

// 임시 카테고리 데이터
const mockCategories = [
  { id: 1, name: 'TEA', enabled: true },
  { id: 2, name: '꽃', enabled: false },
  { id: 3, name: 'CAKE', enabled: true },
  { id: 4, name: 'COFFEE', enabled: true },
  { id: 5, name: '포장할인', enabled: false },
  { id: 6, name: '파스타', enabled: true },
  { id: 7, name: '덮밥', enabled: true },
  { id: 8, name: '코스메뉴', enabled: true },
  { id: 9, name: '양꼬치류', enabled: true },
]

function ProductCategoriesPage() {
  const [categories, setCategories] = useState(mockCategories)

  const toggleCategory = (id: number) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, enabled: !category.enabled } : category
      )
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">카테고리</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>카테고리명</span>
            <span className="ml-auto">키오스크 노출</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            순서 편집
          </Button>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            영어 표기
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            카테고리 추가
          </Button>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg border divide-y">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors"
          >
            <span className="text-base text-gray-900">{category.name}</span>
            <Switch
              checked={category.enabled}
              onCheckedChange={() => toggleCategory(category.id)}
            />
          </div>
        ))}
      </div>

      {/* Empty State - 카테고리가 없을 때 */}
      {categories.length === 0 && (
        <div className="bg-white rounded-lg border p-12">
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium">등록된 카테고리가 없습니다</p>
            <p className="text-sm mt-2">새 카테고리를 추가하여 시작하세요</p>
          </div>
        </div>
      )}
    </div>
  )
}
