import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { useCategoriesQuery, type Product } from '@/api/products';
import { CategoryTabs } from './CategoryTabs';
import { useToast } from '@/hooks/use-toast';
import { useConfirm } from '@/hooks/useConfirm';

interface ProductOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  onSave: (orderedProducts: Product[]) => Promise<void>;
}

export function ProductOrderDialog({
  open,
  onOpenChange,
  products,
  onSave,
}: ProductOrderDialogProps) {
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const { data: categories = [] } = useCategoriesQuery();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [orderedProducts, setOrderedProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);

  // 카테고리별 상품 필터링
  const filteredProducts = orderedProducts.filter((product) => {
    if (!selectedCategoryId) return true;
    return product.category?.id === selectedCategoryId;
  });

  useEffect(() => {
    if (open) {
      setOrderedProducts([...products]);
      setSelectedProductId(null);
      if (categories.length > 0) {
        setSelectedCategoryId(categories[0].id);
      }
    }
  }, [open, products, categories]);

  const moveProductUp = () => {
    if (!selectedProductId) return;

    const index = filteredProducts.findIndex(
      (p) => p.id === selectedProductId,
    );
    if (index <= 0) return;

    const newProducts = [...orderedProducts];
    const currentIndex = newProducts.findIndex((p) => p.id === selectedProductId);
    const targetIndex = currentIndex - 1;

    [newProducts[currentIndex], newProducts[targetIndex]] = [
      newProducts[targetIndex],
      newProducts[currentIndex],
    ];

    setOrderedProducts(newProducts);
  };

  const moveProductDown = () => {
    if (!selectedProductId) return;

    const index = filteredProducts.findIndex(
      (p) => p.id === selectedProductId,
    );
    if (index < 0 || index >= filteredProducts.length - 1) return;

    const newProducts = [...orderedProducts];
    const currentIndex = newProducts.findIndex((p) => p.id === selectedProductId);
    const targetIndex = currentIndex + 1;

    [newProducts[currentIndex], newProducts[targetIndex]] = [
      newProducts[targetIndex],
      newProducts[currentIndex],
    ];

    setOrderedProducts(newProducts);
  };

  const hasChanges = () => {
    return !products.every((product, index) => {
      return product.id === orderedProducts[index]?.id;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(orderedProducts);
      toast({
        title: '편집한 내용을 저장했어요',
        variant: 'default',
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: '저장에 실패했습니다',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = async () => {
    if (hasChanges()) {
      const confirmed = await confirm({
        title: '변경사항을 저장하지 않고 나갈까요?',
        confirmText: '저장하기',
        cancelText: '나가기',
      });
      if (confirmed) {
        await handleSave();
        return;
      }
    }
    onOpenChange(false);
  };

  const selectedIndex = filteredProducts.findIndex(
    (p) => p.id === selectedProductId,
  );
  const canMoveUp = selectedProductId && selectedIndex > 0;
  const canMoveDown =
    selectedProductId && selectedIndex < filteredProducts.length - 1;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              순서편집
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={moveProductUp}
                disabled={!canMoveUp}
              >
                <ArrowUp className="h-4 w-4 mr-1" />
                위로
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={moveProductDown}
                disabled={!canMoveDown}
              >
                <ArrowDown className="h-4 w-4 mr-1" />
                아래로
              </Button>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            키오스크・매장페이지에 순서가 반영되요
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* 카테고리 탭 */}
          <CategoryTabs
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategoryId={setSelectedCategoryId}
            withAll={false}
          />

          <div className="border-t" />

          {/* 상품 리스트 */}
          <ScrollArea className="h-[400px]">
            <div className="space-y-1 pr-4">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>등록된 상품이 없어요</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedProductId === product.id
                        ? 'bg-blue-50 border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedProductId(product.id)}
                  >
                    <Checkbox
                      checked={selectedProductId === product.id}
                      onCheckedChange={() => setSelectedProductId(product.id)}
                    />
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {product.basePrice.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            취소
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges() || isSaving}
            className="min-w-[160px]"
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
