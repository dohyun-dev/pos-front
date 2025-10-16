import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '@/api/products';

interface CategoryDialogProps {
  children: React.ReactNode;
  category?: { id: string; name: string } | null;
}

export function CategoryDialog({ children, category }: CategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  // Mutations
  const createCategoryMutation = useCreateCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      if (category) {
        setCategoryName(category.name);
      } else {
        setCategoryName('');
      }
      createCategoryMutation.reset();
      updateCategoryMutation.reset();
    }
  }, [open, category]);

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      toast.error('카테고리명을 입력해주세요.');
      return;
    }

    try {
      if (category) {
        await updateCategoryMutation.mutateAsync({
          id: category.id,
          data: { name: categoryName },
        });
        toast.success('카테고리가 수정되었습니다.');
      } else {
        await createCategoryMutation.mutateAsync({ name: categoryName });
        toast.success('카테고리가 생성되었습니다.');
      }
      setOpen(false);
    } catch (error) {
      toast.error(
        category
          ? '카테고리 수정에 실패했습니다.'
          : '카테고리 생성에 실패했습니다.'
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {category ? '카테고리 수정' : '카테고리 추가'}
          </DialogTitle>
          <DialogDescription>
            {category
              ? '카테고리 정보를 수정합니다.'
              : '새로운 카테고리를 추가합니다.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">카테고리명</Label>
            <Input
              id="name"
              placeholder="카테고리명을 입력하세요"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              createCategoryMutation.isPending || updateCategoryMutation.isPending
            }
          >
            {category ? '수정' : '추가'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
