import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useUpdateOptionGroupDisplayOrdersMutation } from '@/api/options-groups';

interface OptionGroupOrderDialogProps {
  children: React.ReactNode;
  optionGroups: Array<{
    id: string;
    title: string;
    order: number;
  }>;
}

export function OptionGroupOrderDialog({
  children,
  optionGroups,
}: OptionGroupOrderDialogProps) {
  const [open, setOpen] = useState(false);
  const [orderedGroups, setOrderedGroups] = useState(optionGroups);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const updateOrderMutation = useUpdateOptionGroupDisplayOrdersMutation();

  useEffect(() => {
    if (open) {
      // Sort by order when dialog opens
      const sorted = [...optionGroups].sort((a, b) => a.order - b.order);
      setOrderedGroups(sorted);
      setSelectedId(null);
    }
  }, [open, optionGroups]);

  const moveUp = (index: number) => {
    if (index === 0) return;

    const newGroups = [...orderedGroups];
    [newGroups[index - 1], newGroups[index]] = [
      newGroups[index],
      newGroups[index - 1],
    ];
    setOrderedGroups(newGroups);
  };

  const moveDown = (index: number) => {
    if (index === orderedGroups.length - 1) return;

    const newGroups = [...orderedGroups];
    [newGroups[index], newGroups[index + 1]] = [
      newGroups[index + 1],
      newGroups[index],
    ];
    setOrderedGroups(newGroups);
  };

  const handleSave = async () => {
    try {
      // Check if order changed
      const hasChanged = orderedGroups.some(
        (group, index) => group.id !== optionGroups[index]?.id,
      );

      if (!hasChanged) {
        setOpen(false);
        return;
      }

      await updateOrderMutation.mutateAsync({
        optionGroupIds: orderedGroups.map((g) => g.id),
      });
      toast.success('순서가 저장되었습니다.');
      setOpen(false);
    } catch (error) {
      toast.error('순서 저장에 실패했습니다.');
    }
  };

  const handleClose = () => {
    const hasChanged = orderedGroups.some(
      (group, index) => group.id !== optionGroups[index]?.id,
    );

    if (hasChanged) {
      if (
        confirm('저장하지 않으면 수정내용이 삭제됩니다. 계속하시겠습니까?')
      ) {
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>옵션이름 순서편집</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 overflow-y-auto max-h-[500px] py-4">
          {orderedGroups.map((group, index) => (
            <div
              key={group.id}
              className={`flex items-center gap-3 p-4 border rounded-lg ${
                selectedId === group.id ? 'bg-blue-50 border-blue-500' : ''
              }`}
              onClick={() => setSelectedId(group.id)}
            >
              <GripVertical className="h-5 w-5 text-gray-400" />
              <span className="flex-1 font-semibold">{group.title}</span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveUp(index);
                  }}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveDown(index);
                  }}
                  disabled={index === orderedGroups.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            취소
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={updateOrderMutation.isPending}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
