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
  useUpdateCategoryMutation,
} from "@/hooks/useCategories";
import { toast } from "sonner";
import type { Category } from "@/api/categories";

interface CategoryForeignNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
}

export function CategoryForeignNameDialog({
  open,
  onOpenChange,
  onBack,
}: CategoryForeignNameDialogProps) {
  const { data: categories = [] } = useCategories();
  const updateMutation = useUpdateCategoryMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [registeringId, setRegisteringId] = useState<number | null>(null);
  const [registerValue, setRegisterValue] = useState("");

  // 영어 이름이 없는 카테고리와 있는 카테고리 분리
  const categoriesWithoutEnglish = categories.filter(
    (cat) => !cat.titleI18n?.languages?.["en-US"],
  );
  const categoriesWithEnglish = categories.filter(
    (cat) => cat.titleI18n?.languages?.["en-US"],
  );

  const handleStartEdit = (category: Category) => {
    setEditingId(category.id);
    setEditValue(category.titleI18n?.languages?.["en-US"] || "");
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
      titleI18n: {
        languages: {
          "en-US": trimmedValue,
        },
      },
    });

    setEditingId(null);
    setEditValue("");
  };

  const handleStartRegister = (categoryId: number) => {
    setRegisteringId(categoryId);
  };

  const handleSaveRegister = async (categoryId: number) => {
    const trimmedValue = registerValue.trim();

    if (!trimmedValue) {
      return;
    }

    if (trimmedValue.length > 20) {
      toast.error("20자 이내로 작성해주세요!");
      return;
    }

    await updateMutation.mutateAsync({
      id: categoryId,
      titleI18n: {
        languages: {
          "en-US": trimmedValue,
        },
      },
    });

    setRegisteringId(null);
    setRegisterValue("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="h-8 w-8"
              >
                ←
              </Button>
            )}
            <div className="flex flex-col">
              <DialogTitle className="text-xl font-semibold">
                카테고리 영어 표기
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                키오스크에서 English를 누르면 보이는 이름이에요.
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <ul className="space-y-0">
            {/* 영어 이름이 없는 카테고리 - 등록 모드 */}
            {categoriesWithoutEnglish.map((category) => (
              <li key={category.id} className="py-5 border-b">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">{category.title}</p>
                  {registeringId === category.id ? (
                    <div className="flex items-center gap-3">
                      <Input
                        placeholder="영어로 작성해 주세요"
                        value={registerValue}
                        onChange={(e) => setRegisterValue(e.target.value)}
                        className={
                          registerValue.length > 20 ? "border-red-500" : ""
                        }
                      />
                      <Button
                        variant="outline"
                        onClick={() => handleSaveRegister(category.id)}
                        disabled={
                          !registerValue.trim() || updateMutation.isPending
                        }
                      >
                        저장
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Input
                        placeholder="영어로 작성해 주세요"
                        readOnly
                        className="bg-gray-50"
                      />
                      <Button
                        variant="outline"
                        onClick={() => handleStartRegister(category.id)}
                      >
                        등록
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            ))}

            {/* 영어 이름이 있는 카테고리 - 수정 모드 */}
            {categoriesWithEnglish.map((category) => (
              <li key={category.id} className="py-5 border-b">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">{category.title}</p>
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
                        className={
                          editValue.length > 20 ? "border-red-500" : ""
                        }
                      />
                      <Button
                        variant="outline"
                        onClick={() => handleSaveEdit(category.id)}
                        disabled={!editValue.trim() || updateMutation.isPending}
                      >
                        저장
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                        {category.titleI18n?.languages?.["en-US"]}
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => handleStartEdit(category)}
                        className="ml-3"
                      >
                        수정
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
