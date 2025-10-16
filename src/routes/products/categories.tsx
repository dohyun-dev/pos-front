import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useCategories } from '@/api/products';
import { CategoryDialog } from '@/components/products/CategoryDialog';
import { DeleteCategoryDialog } from '@/components/products/DeleteCategoryDialog';

export const Route = createFileRoute('/products/categories')({
  component: ProductCategoriesPage,
});

function ProductCategoriesPage() {
  // Queries
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">카테고리 관리</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            순서 편집
          </Button>
          <CategoryDialog>
            <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              카테고리 추가
            </Button>
          </CategoryDialog>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg border">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">
            <p>로딩 중...</p>
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="divide-y">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <span className="text-base text-gray-900 font-medium">
                    {category.name}
                  </span>
                  <span className="ml-4 text-sm text-gray-500">
                    순서: {category.displayOrder}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      category.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {category.isActive ? '활성' : '비활성'}
                  </div>
                  <CategoryDialog category={category}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </CategoryDialog>
                  <DeleteCategoryDialog categoryId={category.id}>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </DeleteCategoryDialog>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg font-medium">등록된 카테고리가 없습니다</p>
            <p className="text-sm mt-2">새 카테고리를 추가하여 시작하세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
