import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, ChevronDown, ImageIcon, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useCategories,
  useSearchProducts,
} from '@/api/products';
import { DeleteProductDialog } from '@/components/products/DeleteProductDialog';

export const Route = createFileRoute('/products/')({
  component: ProductsIndexPage,
});

function ProductsIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [displayCount, setDisplayCount] = useState('100');
  const [page, setPage] = useState(0);

  // Queries
  const { data: categoriesData } = useCategories();
  const { data: searchData, isLoading } = useSearchProducts({
    keyword: searchQuery || undefined,
    categoryId: selectedCategory !== 'all' ? selectedCategory : undefined,
    page,
    size: Number(displayCount),
  });

  const products = searchData?.products || [];
  const totalCount = searchData?.totalCount || 0;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">상품 관리</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            순서 편집
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            상품 추가
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg border">
        {/* Search and Filter Bar */}
        <div className="p-4 border-b space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="상품명 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className={
                selectedCategory === 'all'
                  ? 'bg-gray-800 hover:bg-gray-900'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            >
              전체
            </Button>
            {categoriesData?.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? 'bg-gray-800 hover:bg-gray-900'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }
              >
                {category.name}
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

            <div className="text-sm text-gray-600">상품(총 {totalCount}개)</div>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500">
              <p>로딩 중...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-[80px]">
                    이미지
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    상품 코드
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    상품명
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    카테고리
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    기본 가격
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    바코드
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono text-sm text-gray-600">{product.code}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        {product.description && (
                          <div className="text-sm text-gray-500">{product.description}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600">
                        {product.category?.name || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium">
                        {product.basePrice.toLocaleString()}원
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-600 font-mono">
                        {product.barcode || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DeleteProductDialog productId={product.id}>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </DeleteProductDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* No Results */}
        {!isLoading && products.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <p>등록된 상품이 없습니다</p>
          </div>
        )}

        {/* Pagination */}
        {searchData && searchData.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 p-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              이전
            </Button>
            <span className="text-sm text-gray-600">
              {page + 1} / {searchData.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= searchData.totalPages - 1}
            >
              다음
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
