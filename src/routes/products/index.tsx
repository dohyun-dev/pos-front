import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Plus,
  ChevronDown,
  ImageIcon,
  Edit,
  Trash2,
  Filter,
} from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  useCategoriesQuery,
  useSearchProducts,
  useUpdateProductMutation,
  useDeleteProductMutation,
  type Product,
} from '@/api/products';
import { DeleteProductDialog } from '@/components/products/DeleteProductDialog';
import { ProductDialog } from '@/components/products/ProductDialog';
import { ProductOrderDialog } from '@/components/products/ProductOrderDialog';
import { CategoryTabs } from '@/components/products/CategoryTabs';
import { InventoryDialog } from '@/components/products/InventoryDialog';
import { useToast } from '@/hooks/use-toast';
import { useConfirm } from '@/hooks/useConfirm';

export const Route = createFileRoute('/products/')({
  component: ProductsIndexPage,
});

function ProductsIndexPage() {
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt.desc');
  const [displayCount, setDisplayCount] = useState('100');
  const [page, setPage] = useState(0);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);

  // Dialog states
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isInventoryDialogOpen, setIsInventoryDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productDialogMode, setProductDialogMode] = useState<'create' | 'edit'>(
    'create',
  );

  // Bulk actions
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  // Queries and mutations
  const { data: categoriesData } = useCategoriesQuery();
  const { data: searchData, isLoading } = useSearchProducts({
    keyword: searchQuery || undefined,
    categoryId: selectedCategory !== 'all' ? selectedCategory : undefined,
    page,
    size: Number(displayCount),
  });
  const updateProductMutation = useUpdateProductMutation();
  const deleteProductMutation = useDeleteProductMutation();

  const products = searchData?.products || [];
  const totalCount = searchData?.totalCount || 0;

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setProductDialogMode('create');
    setIsProductDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductDialogMode('edit');
    setIsProductDialogOpen(true);
  };

  const handleToggleSoldOut = async (product: Product, isSoldOut: boolean) => {
    try {
      await updateProductMutation.mutateAsync({
        id: product.id,
        data: {
          ...product,
          state: isSoldOut ? 'SOLD_OUT' : 'ON_SALE',
        },
      });
      toast({
        title: isSoldOut ? '품절로 변경했습니다' : '판매 중으로 변경했습니다',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: '상태 변경에 실패했습니다',
        variant: 'destructive',
      });
    }
  };

  const handleToggleKioskEnabled = async (
    product: Product,
    enabled: boolean,
  ) => {
    try {
      await updateProductMutation.mutateAsync({
        id: product.id,
        data: {
          ...product,
          kioskEnabled: enabled,
        },
      });
      toast({
        title: enabled
          ? '고객용 채널에 노출됩니다'
          : '고객용 채널에서 숨겨집니다',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: '노출 설정 변경에 실패했습니다',
        variant: 'destructive',
      });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProductIds.length === 0) return;

    const confirmed = await confirm({
      title: `${selectedProductIds.length}개의 상품을 삭제할까요?`,
      description: '삭제하면 복구할 수 없어요.',
      confirmText: '삭제하기',
      cancelText: '닫기',
      variant: 'destructive',
    });

    if (!confirmed) return;

    try {
      await Promise.all(
        selectedProductIds.map((id) => deleteProductMutation.mutateAsync(id)),
      );
      toast({
        title: `${selectedProductIds.length}개의 상품을 삭제했어요!`,
        variant: 'default',
      });
      setSelectedProductIds([]);
      setShowBulkActions(false);
    } catch (error) {
      toast({
        title: '삭제에 실패했습니다',
        variant: 'destructive',
      });
    }
  };

  const handleBulkSoldOut = async (isSoldOut: boolean) => {
    if (selectedProductIds.length === 0) return;

    const action = isSoldOut ? '품절표시' : '품절해제';
    const confirmed = await confirm({
      title: `${selectedProductIds.length}개의 상품을 ${action} 할까요?`,
      confirmText: '확인',
      cancelText: '닫기',
    });

    if (!confirmed) return;

    try {
      const selectedProducts = products.filter((p) =>
        selectedProductIds.includes(p.id),
      );

      await Promise.all(
        selectedProducts.map((product) =>
          updateProductMutation.mutateAsync({
            id: product.id,
            data: {
              ...product,
              state: isSoldOut ? 'SOLD_OUT' : 'ON_SALE',
            },
          }),
        ),
      );

      toast({
        title: `${selectedProductIds.length}개의 상품을 ${action} 했어요!`,
        variant: 'default',
      });
      setSelectedProductIds([]);
      setShowBulkActions(false);
    } catch (error) {
      toast({
        title: `${action}에 실패했습니다`,
        variant: 'destructive',
      });
    }
  };

  const handleSelectAll = () => {
    if (selectedProductIds.length === products.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(products.map((p) => p.id));
    }
  };

  const handleInventoryClick = (product: Product) => {
    setSelectedProduct(product);
    setIsInventoryDialogOpen(true);
  };

  const handleInventoryConfirm = async (data: {
    quantity: number;
    reason?: any;
  }) => {
    if (!selectedProduct) return;

    try {
      const currentStock = selectedProduct.stockQuantity || 0;
      const newStock = currentStock + data.quantity;

      await updateProductMutation.mutateAsync({
        id: selectedProduct.id,
        data: {
          ...selectedProduct,
          stockQuantity: newStock,
        },
      });

      const action = data.quantity > 0 ? '추가' : '차감';
      toast({
        title: `재고를 ${action}했어요`,
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: '재고 변경에 실패했습니다',
        variant: 'destructive',
      });
    }
  };

  const handleOrderSave = async (orderedProducts: Product[]) => {
    // 순서 저장 로직
    console.log('Saving order:', orderedProducts);
  };

  const sortOptions = {
    'createdAt.desc': '최신 순',
    'updatedAt.desc': '수정 순',
    'title.asc': '이름 순',
    'createdAt.asc': '오래된 순',
    'inventory.desc': '재고 많은 순',
    'inventory.asc': '재고 적은 순',
  };

  const filterTypeOptions = {
    SOLD_OUT: '품절상품',
    ON_SALE: '판매상품',
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">상품</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="메뉴명 또는 초성 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOrderDialogOpen(true)}
          >
            순서 편집
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            size="sm"
            onClick={handleCreateProduct}
          >
            <Plus className="h-4 w-4 mr-1" />
            상품 추가
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg border">
        {/* Category Tabs */}
        <div className="p-4 border-b">
          <CategoryTabs
            categories={categoriesData || []}
            selectedCategoryId={
              selectedCategory !== 'all' ? selectedCategory : undefined
            }
            onSelectCategoryId={(id) => setSelectedCategory(id || 'all')}
            withAll
          />
        </div>

        {/* Filter and Sort Options */}
        <div className="p-4 border-b space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(sortOptions).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={displayCount} onValueChange={setDisplayCount}>
                <SelectTrigger className="w-[140px] h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30개씩 보기</SelectItem>
                  <SelectItem value="50">50개씩 보기</SelectItem>
                  <SelectItem value="100">100개씩 보기</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {showBulkActions ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={handleBulkDelete}
                  disabled={selectedProductIds.length === 0}
                >
                  삭제
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkSoldOut(true)}
                  disabled={selectedProductIds.length === 0}
                >
                  품절
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkSoldOut(false)}
                  disabled={selectedProductIds.length === 0}
                >
                  품절해제
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowBulkActions(false);
                    setSelectedProductIds([]);
                  }}
                >
                  버튼 숨기기
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBulkActions(true)}
              >
                전체 삭제/품절
              </Button>
            )}
          </div>
        </div>

        {/* Products Table Header */}
        <div className="px-4 py-3 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">
                상품(총 {totalCount}개)
              </span>
            </div>
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-[100px]">
                    이미지
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                    상품명
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-[120px]">
                    재고수량
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-[110px]">
                    <div className="flex items-center gap-2">
                      품절표시
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                          >
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {Object.entries(filterTypeOptions).map(
                            ([value, label]) => (
                              <DropdownMenuCheckboxItem
                                key={value}
                                checked={filterTypes.includes(value)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setFilterTypes([...filterTypes, value]);
                                  } else {
                                    setFilterTypes(
                                      filterTypes.filter((f) => f !== value),
                                    );
                                  }
                                }}
                              >
                                {label}
                              </DropdownMenuCheckboxItem>
                            ),
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-[110px]">
                    고객용 채널 노출
                  </th>
                  {showBulkActions && (
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 w-[60px]">
                      <Checkbox
                        checked={
                          products.length > 0 &&
                          selectedProductIds.length === products.length
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="w-[72px] h-[72px] rounded bg-gray-100 flex items-center justify-center">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td
                      className="px-4 py-4 cursor-pointer"
                      onClick={() => handleEditProduct(product)}
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {product.basePrice.toLocaleString()}원
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center">
                        <Input
                          type="number"
                          value={product.stockQuantity || 0}
                          className="w-[72px] h-8 text-center"
                          readOnly
                          onClick={() => handleInventoryClick(product)}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center">
                        <Switch
                          checked={product.state === 'SOLD_OUT'}
                          onCheckedChange={(checked) =>
                            handleToggleSoldOut(product, checked)
                          }
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center">
                        <Switch
                          checked={product.kioskEnabled ?? true}
                          onCheckedChange={(checked) =>
                            handleToggleKioskEnabled(product, checked)
                          }
                        />
                      </div>
                    </td>
                    {showBulkActions && (
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-center">
                          <Checkbox
                            checked={selectedProductIds.includes(product.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedProductIds([
                                  ...selectedProductIds,
                                  product.id,
                                ]);
                              } else {
                                setSelectedProductIds(
                                  selectedProductIds.filter(
                                    (id) => id !== product.id,
                                  ),
                                );
                              }
                            }}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Empty State */}
        {!isLoading && products.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500 mb-4">등록된 상품이 없어요</p>
            <Button onClick={handleCreateProduct} variant="outline">
              상품 추가
            </Button>
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

      {/* Dialogs */}
      <ProductDialog
        open={isProductDialogOpen}
        onOpenChange={setIsProductDialogOpen}
        product={selectedProduct}
        mode={productDialogMode}
      />

      <ProductOrderDialog
        open={isOrderDialogOpen}
        onOpenChange={setIsOrderDialogOpen}
        products={products}
        onSave={handleOrderSave}
      />

      {selectedProduct && (
        <InventoryDialog
          open={isInventoryDialogOpen}
          onOpenChange={setIsInventoryDialogOpen}
          priceId={-1}
          initialQuantity={selectedProduct.stockQuantity || 0}
          menuItem={{ title: selectedProduct.name }}
          referrer="상품 관리"
          onConfirm={handleInventoryConfirm}
        />
      )}
    </div>
  );
}
