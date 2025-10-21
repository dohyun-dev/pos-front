import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  useCategories,
  useBulkUpdateCategoriesMutation,
} from "@/hooks/useCategories";
import type { Category } from "@/api/categories";

interface CategoryOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
}

export function CategoryOrderDialog({
  open,
  onOpenChange,
  onBack,
}: CategoryOrderDialogProps) {
  const { data: categories = [] } = useCategories();
  const bulkUpdateMutation = useBulkUpdateCategoriesMutation();

  const [orderedCategories, setOrderedCategories] = useState<Category[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (categories.length > 0) {
      // 순서대로 정렬
      const sorted = [...categories].sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        return a.id - b.id;
      });
      setOrderedCategories(sorted);
    }
  }, [categories]);

  const selectedIndex = orderedCategories.findIndex(
    (cat) => cat.id === selectedId,
  );
  const canMoveUp = selectedId !== null && selectedIndex > 0;
  const canMoveDown =
    selectedId !== null && selectedIndex < orderedCategories.length - 1;

  const handleMoveUp = () => {
    if (!canMoveUp) return;

    const newCategories = [...orderedCategories];
    [newCategories[selectedIndex], newCategories[selectedIndex - 1]] = [
      newCategories[selectedIndex - 1],
      newCategories[selectedIndex],
    ];
    setOrderedCategories(newCategories);
  };

  const handleMoveDown = () => {
    if (!canMoveDown) return;

    const newCategories = [...orderedCategories];
    [newCategories[selectedIndex], newCategories[selectedIndex + 1]] = [
      newCategories[selectedIndex + 1],
      newCategories[selectedIndex],
    ];
    setOrderedCategories(newCategories);
  };

  const handleSave = async () => {
    const updatedCategories = orderedCategories.map((cat, index) => ({
      ...cat,
      order: index,
      position: index + 1,
    }));

    await bulkUpdateMutation.mutateAsync({
      categories: updatedCategories,
    });

    onOpenChange(false);
  };

  const handleCancel = () => {
    onBack?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              카테고리 순서편집
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMoveUp}
                disabled={!canMoveUp}
              >
                <ArrowUp className="h-4 w-4 mr-1" />
                위로
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleMoveDown}
                disabled={!canMoveDown}
              >
                <ArrowDown className="h-4 w-4 mr-1" />
                아래로
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <ul className="space-y-0">
            {orderedCategories.map((category) => (
              <li
                key={category.id}
                className={`py-5 border-b cursor-pointer ${
                  selectedId === category.id ? "bg-gray-100" : ""
                }`}
                onClick={() => setSelectedId(category.id)}
              >
                <div className="flex items-center justify-between px-5">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-semibold">
                      {category.title}
                    </span>
                    {category.franchiseNewBadge && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        신규
                      </span>
                    )}
                    {category.franchiseUpdateBadge && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                        수정
                      </span>
                    )}
                  </div>
                  <Checkbox
                    checked={selectedId === category.id}
                    onCheckedChange={(checked) => {
                      setSelectedId(checked ? category.id : null);
                    }}
                    aria-label={`${category.title} 선택`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>

        <DialogFooter className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={bulkUpdateMutation.isPending}
          >
            취소
          </Button>
          <Button
            onClick={handleSave}
            disabled={bulkUpdateMutation.isPending}
            className="min-w-[160px]"
          >
            {bulkUpdateMutation.isPending ? "저장 중..." : "저장"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
