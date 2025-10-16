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
import {useDeleteProductMutation} from '@/api/products';

interface DeleteProductDialogProps {
  children: React.ReactNode;
  productId: string;
}

export function DeleteProductDialog({ children, productId }: DeleteProductDialogProps) {
  const [open, setOpen] = useState(false);
  const deleteProductMutation = useDeleteProductMutation();

  // Reset mutation when dialog opens
  useEffect(() => {
    if (open) {
      deleteProductMutation.reset();
    }
  }, [open]);

  const handleDeleteConfirm = async () => {
    try {
      await deleteProductMutation.mutateAsync(productId);
      toast.success('상품이 삭제되었습니다.');
      setOpen(false);
    } catch (error) {
      toast.error('상품 삭제에 실패했습니다.');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>상품 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            정말로 이 상품을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteConfirm}
            className="bg-red-600 hover:bg-red-700"
            disabled={deleteProductMutation.isPending}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
