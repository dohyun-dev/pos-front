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
import {useDeleteOptionGroupMutation} from '@/api/products';

interface DeleteOptionGroupDialogProps {
  children: React.ReactNode;
  optionGroupId: string;
}

export function DeleteOptionGroupDialog({
  children,
  optionGroupId,
}: DeleteOptionGroupDialogProps) {
  const [open, setOpen] = useState(false);
  const deleteOptionGroupMutation = useDeleteOptionGroupMutation();

  // Reset mutation when dialog opens
  useEffect(() => {
    if (open) {
      deleteOptionGroupMutation.reset();
    }
  }, [open]);

  const handleDeleteConfirm = async () => {
    try {
      await deleteOptionGroupMutation.mutateAsync(optionGroupId);
      toast.success('옵션 그룹이 삭제되었습니다.');
      setOpen(false);
    } catch (error) {
      toast.error('옵션 그룹 삭제에 실패했습니다.');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>옵션 그룹 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            정말로 이 옵션 그룹을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteConfirm}
            className="bg-red-600 hover:bg-red-700"
            disabled={deleteOptionGroupMutation.isPending}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
