import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Switch} from '@/components/ui/switch';
import {Textarea} from '@/components/ui/textarea';
import {Plus, Trash2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {
  type CreateOptionGroupDto,
  type UpdateOptionGroupDto,
  useCreateOptionGroupMutation,
  useUpdateOptionGroupMutation,
} from '@/api/products';

interface OptionForm {
  name: string;
  description?: string;
  extraPrice: number;
}

interface OptionGroupForm {
  name: string;
  description?: string;
  isRequired: boolean;
  selectableOptionCount: number;
  options: OptionForm[];
}

interface OptionGroupDialogProps {
  children: React.ReactNode;
  optionGroup?: {
    id: string;
    name: string;
    description?: string;
    isRequired: boolean;
    selectableOptionCount: number;
    options: Array<{
      id: string;
      name: string;
      description?: string;
      extraPrice: number;
    }>;
  } | null;
}

export function OptionGroupDialog({ children, optionGroup }: OptionGroupDialogProps) {
  const [open, setOpen] = useState(false);

  // Mutations
  const createOptionGroupMutation = useCreateOptionGroupMutation();
  const updateOptionGroupMutation = useUpdateOptionGroupMutation();

  // Form
  const form = useForm<OptionGroupForm>({
    defaultValues: {
      name: '',
      description: '',
      isRequired: false,
      selectableOptionCount: 1,
      options: [{ name: '', description: '', extraPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'options',
  });

  // Reset form and mutations when dialog opens
  useEffect(() => {
    if (open) {
      if (optionGroup) {
        form.reset({
          name: optionGroup.name,
          description: optionGroup.description || '',
          isRequired: optionGroup.isRequired,
          selectableOptionCount: optionGroup.selectableOptionCount,
          options: optionGroup.options.map((opt) => ({
            name: opt.name,
            description: opt.description || '',
            extraPrice: opt.extraPrice,
          })),
        });
      } else {
        form.reset({
          name: '',
          description: '',
          isRequired: false,
          selectableOptionCount: 1,
          options: [{ name: '', description: '', extraPrice: 0 }],
        });
      }
      createOptionGroupMutation.reset();
      updateOptionGroupMutation.reset();
    }
  }, [open, optionGroup]);

  const onSubmit = async (data: OptionGroupForm) => {
    if (!data.name.trim()) {
      toast.error('옵션 그룹명을 입력해주세요.');
      return;
    }

    const validOptions = data.options.filter((opt) => opt.name.trim());
    if (validOptions.length === 0) {
      toast.error('최소 1개 이상의 옵션을 입력해주세요.');
      return;
    }

    try {
      const payload: CreateOptionGroupDto | UpdateOptionGroupDto = {
        name: data.name,
        description: data.description || undefined,
        isRequired: data.isRequired,
        selectableOptionCount: data.selectableOptionCount,
        options: validOptions.map((opt) => ({
          name: opt.name,
          description: opt.description || undefined,
          extraPrice: opt.extraPrice,
        })),
      };

      if (optionGroup) {
        await updateOptionGroupMutation.mutateAsync({
          id: optionGroup.id,
          data: payload as UpdateOptionGroupDto,
        });
        toast.success('옵션 그룹이 수정되었습니다.');
      } else {
        await createOptionGroupMutation.mutateAsync(payload as CreateOptionGroupDto);
        toast.success('옵션 그룹이 생성되었습니다.');
      }
      setOpen(false);
    } catch (error) {
      toast.error(
        optionGroup
          ? '옵션 그룹 수정에 실패했습니다.'
          : '옵션 그룹 생성에 실패했습니다.'
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {optionGroup ? '옵션 그룹 수정' : '옵션 그룹 추가'}
          </DialogTitle>
          <DialogDescription>
            옵션 그룹과 하위 옵션들을 설정합니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6 py-4">
            {/* 옵션 그룹 정보 */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">옵션 그룹명 *</Label>
                <Input
                  id="name"
                  placeholder="예: 사이즈, 온도, 샷추가"
                  {...form.register('name')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <Textarea
                  id="description"
                  placeholder="옵션 그룹에 대한 설명"
                  {...form.register('description')}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="selectableCount">선택 가능 개수 *</Label>
                  <Input
                    id="selectableCount"
                    type="number"
                    min="0"
                    {...form.register('selectableOptionCount', {
                      valueAsNumber: true,
                    })}
                  />
                </div>

                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    id="required"
                    checked={form.watch('isRequired')}
                    onCheckedChange={(checked) =>
                      form.setValue('isRequired', checked)
                    }
                  />
                  <Label htmlFor="required">필수 선택</Label>
                </div>
              </div>
            </div>

            {/* 옵션 목록 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>옵션 목록</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({ name: '', description: '', extraPrice: 0 })
                  }
                >
                  <Plus className="h-4 w-4 mr-1" />
                  옵션 추가
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-start gap-2 p-4 border rounded-lg"
                  >
                    <div className="flex-1 space-y-3">
                      <Input
                        placeholder="옵션명 *"
                        {...form.register(`options.${index}.name`)}
                      />
                      <Input
                        placeholder="설명 (선택사항)"
                        {...form.register(`options.${index}.description`)}
                      />
                      <Input
                        type="number"
                        placeholder="추가 금액"
                        {...form.register(`options.${index}.extraPrice`, {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={
                createOptionGroupMutation.isPending ||
                updateOptionGroupMutation.isPending
              }
            >
              {optionGroup ? '수정' : '추가'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
