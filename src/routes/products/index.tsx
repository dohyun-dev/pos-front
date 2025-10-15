import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Search, Plus, ChevronDown, ImageIcon } from 'lucide-react'
import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const Route = createFileRoute('/products/')({
  component: ProductsIndexPage,
})

// 임시 상품 데이터
const mockProducts = [
  { id: 1, name: '오징어덮밥', price: 10000, stock: 1, category: '덮밥', image: null, soldOut: false, active: true },
  { id: 2, name: '어향육슬덮밥', price: 10000, stock: 0, category: '덮밥', image: null, soldOut: true, active: true },
  { id: 3, name: '캐런토마토덮밥', price: 10000, stock: 0, category: '덮밥', image: null, soldOut: true, active: true },
  { id: 4, name: '마파두부덮밥', price: 10000, stock: 1, category: '덮밥', image: null, soldOut: false, active: true },
  { id: 5, name: '카지튀김덮밥', price: 10000, stock: -1, category: '덮밥', image: null, soldOut: false, active: true },
  { id: 6, name: '제육덮밥', price: 10000, stock: 1, category: '덮밥', image: null, soldOut: false, active: true },
]

const categories = ['전체', 'TEA', '꽃', 'CAKE', 'COFFEE', '포장할인', '파스타', '덮밥', '코스']

function ProductsIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [displayCount, setDisplayCount] = useState('100')

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === '전체' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm">
          순서 편집
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          상품 추가
        </Button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg border">
        {/* Search and Filter Bar */}
        <div className="p-4 border-b space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="메뉴명 또는 초성 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? 'bg-gray-800 hover:bg-gray-900'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }
              >
                {category}
              </Button>
            ))}
            <Button variant="ghost" size="sm" className="text-gray-500">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신 순</SelectItem>
                  <SelectItem value="name">이름 순</SelectItem>
                  <SelectItem value="price">가격 순</SelectItem>
                </SelectContent>
              </Select>

              <Select value={displayCount} onValueChange={setDisplayCount}>
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100개씩 보기</SelectItem>
                  <SelectItem value="50">50개씩 보기</SelectItem>
                  <SelectItem value="20">20개씩 보기</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-600">
              상품(총 {filteredProducts.length}개)
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-[80px]"></th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  상품명
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  재고수량
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                  품절표시
                </th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                  키오스크노출
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center relative">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                        <span className="text-xs text-gray-400 absolute bottom-0 text-[10px]">이미지</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.price.toLocaleString()}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={product.stock}
                        className="w-20 h-8 text-center"
                        readOnly
                      />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Switch checked={product.soldOut} />
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <Switch checked={product.active} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <p>검색 결과가 없습니다</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-start gap-2 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
        <div className="text-blue-600 font-bold">💡</div>
        <div className="space-y-1">
          <p className="font-medium text-gray-700">의견 보내기</p>
          <p className="text-xs">전체 삭제/품절 처리 완료</p>
          <p className="text-xs">체크 색깔/버튼 크기</p>
        </div>
      </div>
    </div>
  )
}
