import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useCategories,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/hooks/useCategories";
import { toast } from "sonner";
import type { Category } from "@/api/categories";

interface CategoryManageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenOrderDialog: () => void;
  onOpenForeignNameDialog: () => void;
  onOpenDeleteDialog: () => void;
}

export function CategoryManageDialog({
  open,
  onOpenChange,
  onOpenOrderDialog,
  onOpenForeignNameDialog,
  onOpenDeleteDialog,
}: CategoryManageDialogProps) {
  const { data: categories = [] } = useCategories();
  const createMutation = useCreateCategoryMutation();
  const updateMutation = useUpdateCategoryMutation();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleCreate = async () => {
    const trimmedName = newCategoryName.trim();

    if (!trimmedName) {
      return;
    }

    if (trimmedName.length > 20) {
      toast.error("20자 이내로 작성해주세요!");
      return;
    }

    await createMutation.mutateAsync({ title: trimmedName });
    setNewCategoryName("");
  };

  const handleStartEdit = (category: Category) => {
    setEditingId(category.id);
    setEditValue(category.title);
  };

  const handleSaveEdit = async (categoryId: number) => {
    const trimmedValue = editValue.trim();

    if (!trimmedValue) {
      return;
    }

    if (trimmedValue.length > 20) {
      toast.error("20자 이내로 작성해주세요!");
      return;
    }

    await updateMutation.mutateAsync({
      id: categoryId,
      title: trimmedValue,
    });

    setEditingId(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              카테고리 관리
            </DialogTitle>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={onOpenDeleteDialog}>
                삭제
              </Button>
              <Button variant="ghost" onClick={onOpenForeignNameDialog}>
                영어 표기
              </Button>
              <Button variant="ghost" onClick={onOpenOrderDialog}>
                순서편집
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          {/* 새 카테고리 추가 */}
          <div className="flex items-center gap-3 py-5 border-b">
            <Input
              placeholder="새로운 카테고리 이름"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && newCategoryName.trim()) {
                  handleCreate();
                }
              }}
              className={newCategoryName.length > 20 ? "border-red-500" : ""}
            />
            <Button
              variant="outline"
              onClick={handleCreate}
              disabled={!newCategoryName.trim() || createMutation.isPending}
            >
              저장
            </Button>
          </div>

          {/* 카테고리 목록 */}
          <ul className="space-y-0">
            {categories.map((category) => (
              <li key={category.id} className="py-5 border-b">
                {editingId === category.id ? (
                  <div className="flex items-center gap-3">
                    <Input
                      autoFocus
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && editValue.trim()) {
                          handleSaveEdit(category.id);
                        }
                      }}
                      className={editValue.length > 20 ? "border-red-500" : ""}
                    />
                    <Button
                      variant="outline"
                      onClick={() => handleSaveEdit(category.id)}
                      disabled={!editValue.trim() || updateMutation.isPending}
                    >
                      저장
                    </Button>
                    <Button variant="ghost" onClick={handleCancelEdit}>
                      취소
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold ml-5 overflow-hidden text-ellipsis whitespace-nowrap">
                      {category.title}
                    </span>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleStartEdit(category)}
                    >
                      수정
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
