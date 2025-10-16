import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {useDeleteCategoryMutation} from '@/api/products';

interface DeleteCategoryDialogProps {
  children: React.ReactNode;
  categoryId: string;
}

export function DeleteCategoryDialog({ children, categoryId }: DeleteCategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const deleteCategoryMutation = useDeleteCategoryMutation();

  // Reset mutation when dialog opens
  useEffect(() => {
    if (open) {
      deleteCategoryMutation.reset();
    }
  }, [open]);

  const handleDeleteConfirm = async () => {
    try {
      await deleteCategoryMutation.mutateAsync(categoryId);
      toast.success('카테고리가 삭제되었습니다.');
      setOpen(false);
    } catch (error) {
      toast.error('카테고리 삭제에 실패했습니다.');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>카테고리 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            정말로 이 카테고리를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteConfirm}
            className="bg-red-600 hover:bg-red-700"
            disabled={deleteCategoryMutation.isPending}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
