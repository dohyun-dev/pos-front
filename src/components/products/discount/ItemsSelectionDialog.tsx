import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Tag } from "lucide-react";

interface ItemsSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: Array<{ targetType: "CATEGORY" | "ITEM"; targetId: number }>;
  onSave: (
    targets: Array<{ targetType: "CATEGORY" | "ITEM"; targetId: number }>,
  ) => void;
}

export function ItemsSelectionDialog({
  open,
  onOpenChange,
  value,
  onSave,
}: ItemsSelectionDialogProps) {
  const [selectedItems, setSelectedItems] = useState<
    Array<{ targetType: "CATEGORY" | "ITEM"; targetId: number }>
  >([]);
  const [selectAll, setSelectAll] = useState(false);

  // 임시 데모 데이터 - 실제로는 API에서 가져와야 함
  const categories = [
    { id: 1, name: "음료", items: [1, 2, 3] },
    { id: 2, name: "디저트", items: [4, 5] },
    { id: 3, name: "베이커리", items: [6, 7, 8, 9] },
  ];

  const items = [
    { id: 1, name: "아메리카노", categoryId: 1 },
    { id: 2, name: "카페라떼", categoryId: 1 },
    { id: 3, name: "카푸치노", categoryId: 1 },
    { id: 4, name: "티라미수", categoryId: 2 },
    { id: 5, name: "치즈케이크", categoryId: 2 },
    { id: 6, name: "크루아상", categoryId: 3 },
    { id: 7, name: "베이글", categoryId: 3 },
    { id: 8, name: "스콘", categoryId: 3 },
    { id: 9, name: "마들렌", categoryId: 3 },
  ];

  useEffect(() => {
    if (open) {
      setSelectedItems(value);
    }
  }, [open, value]);

  const toggleCategory = (categoryId: number) => {
    const isSelected = selectedItems.some(
      (item) => item.targetType === "CATEGORY" && item.targetId === categoryId,
    );

    if (isSelected) {
      setSelectedItems(
        selectedItems.filter(
          (item) =>
            !(item.targetType === "CATEGORY" && item.targetId === categoryId),
        ),
      );
    } else {
      setSelectedItems([
        ...selectedItems,
        { targetType: "CATEGORY", targetId: categoryId },
      ]);
    }
  };

  const toggleItem = (itemId: number) => {
    const isSelected = selectedItems.some(
      (item) => item.targetType === "ITEM" && item.targetId === itemId,
    );

    if (isSelected) {
      setSelectedItems(
        selectedItems.filter(
          (item) => !(item.targetType === "ITEM" && item.targetId === itemId),
        ),
      );
    } else {
      setSelectedItems([
        ...selectedItems,
        { targetType: "ITEM", targetId: itemId },
      ]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allCategories = categories.map((cat) => ({
        targetType: "CATEGORY" as const,
        targetId: cat.id,
      }));
      setSelectedItems(allCategories);
    }
    setSelectAll(!selectAll);
  };

  const isCategorySelected = (categoryId: number) => {
    return selectedItems.some(
      (item) => item.targetType === "CATEGORY" && item.targetId === categoryId,
    );
  };

  const isItemSelected = (itemId: number) => {
    return selectedItems.some(
      (item) => item.targetType === "ITEM" && item.targetId === itemId,
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle>할인할 상품 선택</DialogTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
            className="text-primary"
          >
            {selectAll ? "모두해제" : "전체선택"}
          </Button>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 max-h-[50vh]">
          <div className="space-y-4 pb-4">
            {categories.map((category) => {
              const categoryItems = items.filter(
                (item) => item.categoryId === category.id,
              );
              const categorySelected = isCategorySelected(category.id);

              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center gap-2 p-3 rounded-lg border bg-muted/50">
                    <Checkbox
                      checked={categorySelected}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <Label className="flex-1 font-semibold cursor-pointer">
                      {category.name}
                    </Label>
                    <Badge variant="secondary">{categoryItems.length}개</Badge>
                  </div>

                  <div className="pl-6 space-y-2">
                    {categoryItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={isItemSelected(item.id)}
                          onCheckedChange={() => toggleItem(item.id)}
                        />
                        <Label className="flex-1 cursor-pointer">
                          {item.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {categories.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Tag className="mx-auto h-12 w-12 mb-3 opacity-50" />
                <p>등록된 상품이 없어요.</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button
            onClick={() => onSave(selectedItems)}
            disabled={selectedItems.length === 0}
            className="min-w-[160px]"
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
