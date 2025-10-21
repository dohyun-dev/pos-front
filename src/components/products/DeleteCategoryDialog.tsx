import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useCategories,
  useDeleteCategoryMutation,
} from "@/hooks/useCategories";
import { useConfirm } from "@/hooks/useConfirm";
import { addJosa } from "@/lib/korean-utils";

interface DeleteCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
}

export function DeleteCategoryDialog({
  open,
  onOpenChange,
  onBack,
}: DeleteCategoryDialogProps) {
  const { data: categories = [] } = useCategories();
  const deleteMutation = useDeleteCategoryMutation();
  const { confirm } = useConfirm();

  const handleDeleteClick = async (
    categoryId: number,
    categoryTitle: string,
  ) => {
    const confirmed = await confirm({
      title: `${addJosa(categoryTitle, "을/를")} 삭제할게요`,
      description: "이 작업은 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
      confirmText: "확인",
      cancelText: "취소",
      variant: "destructive",
    });

    if (confirmed) {
      await deleteMutation.mutateAsync(categoryId);
    }
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
            <DialogTitle className="text-xl font-semibold">
              카테고리 삭제
            </DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <ul className="space-y-0">
            {categories.map((category) => (
              <li key={category.id} className="py-5 border-b">
                <div className="flex items-center justify-between px-5">
                  <span className="text-base font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                    {category.title}
                  </span>
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={() =>
                      handleDeleteClick(category.id, category.title)
                    }
                    disabled={deleteMutation.isPending}
                  >
                    삭제
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
