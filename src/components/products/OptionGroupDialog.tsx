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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  type CreateOptionGroupDto,
  type UpdateOptionGroupDto,
  useCreateOptionGroupMutation,
  useUpdateOptionGroupMutation,
} from '@/api/options-groups';
import { Checkbox } from '@/components/ui/checkbox';

interface OptionChoice {
  id?: string;
  title: string;
  priceValue: string;
  order: number;
  state: 'ON_SALE' | 'SOLD_OUT';
  imageUrl?: string | null;
}

interface OptionGroupForm {
  id?: number;
  title: string;
  titleI18n?: {
    languages: {
      'en-US': string;
    };
  };
  choices: OptionChoice[];
  isRequired: boolean;
  minChoices: number;
  maxChoices: number;
  defaultChoices: string[];
  order: number;
  kioskEnabled: boolean;
}

interface OptionGroupDialogProps {
  children: React.ReactNode;
  mode: 'create' | 'editOrDelete';
  item?: {
    id: string;
    title: string;
    titleI18n?: {
      languages: {
        'en-US': string;
      };
    };
    choices: Array<{
      id: string;
      title: string;
      priceValue: number;
      order: number;
      state: 'ON_SALE' | 'SOLD_OUT';
    }>;
    isRequired: boolean;
    minChoices: number;
    maxChoices: number;
    defaultChoices: string[];
    order: number;
    kioskEnabled: boolean;
  };
  isKioskEnabled?: boolean;
}

function getDefaultValues(
  props: Pick<OptionGroupDialogProps, 'mode' | 'item' | 'isKioskEnabled'>,
): OptionGroupForm {
  if (props.mode === 'create') {
    return {
      id: -1,
      title: '',
      choices: [
        {
          id: '0',
          title: '',
          priceValue: '',
          order: 0,
          state: 'ON_SALE',
          imageUrl: null,
        },
      ],
      isRequired: false,
      minChoices: 0,
      maxChoices: 1,
      defaultChoices: [],
      order: -1,
      kioskEnabled: props.isKioskEnabled ?? false,
    };
  }

  // editOrDelete mode
  const item = props.item!;
  return {
    ...item,
    choices: item.choices.map((choice) => ({
      ...choice,
      priceValue: String(choice.priceValue),
    })),
    isRequired: item.minChoices > 0,
  };
}

// Validate if kiosk emoji is required but missing
function validateKioskImage(data: OptionGroupForm): number | undefined {
  if (data.kioskEnabled !== true) return undefined;
  if (data.choices.every((c) => c.imageUrl == null)) return undefined;

  const index = data.choices.findIndex((c) => c.imageUrl == null);
  return index > -1 ? index : undefined;
}

export function OptionGroupDialog({
  children,
  mode,
  item,
  isKioskEnabled,
}: OptionGroupDialogProps) {
  const [open, setOpen] = useState(false);
  const [showDefaultChoices, setShowDefaultChoices] = useState(false);

  // Mutations
  const createOptionGroupMutation = useCreateOptionGroupMutation();
  const updateOptionGroupMutation = useUpdateOptionGroupMutation();

  // Form
  const form = useForm<OptionGroupForm>({
    defaultValues: getDefaultValues({ mode, item, isKioskEnabled }),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'choices',
  });

  const watchedChoices = form.watch('choices');
  const watchedMaxChoices = form.watch('maxChoices');
  const watchedIsRequired = form.watch('isRequired');
  const watchedDefaultChoices = form.watch('defaultChoices');

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset(getDefaultValues({ mode, item, isKioskEnabled }));
      setShowDefaultChoices(false);
      createOptionGroupMutation.reset();
      updateOptionGroupMutation.reset();
    }
  }, [open, mode, item, isKioskEnabled]);

  // Auto-adjust maxChoices when choices length changes
  useEffect(() => {
    const choicesCount = watchedChoices.length;
    if (watchedMaxChoices > choicesCount) {
      form.setValue('maxChoices', Math.max(1, choicesCount));
    }
  }, [watchedChoices.length, watchedMaxChoices]);

  const onSubmit = async (data: OptionGroupForm) => {
    if (!data.title.trim()) {
      toast.error('옵션 그룹명을 입력해주세요.');
      return;
    }

    const validChoices = data.choices.filter((choice) => choice.title.trim());
    if (validChoices.length === 0) {
      toast.error('최소 1개 이상의 옵션을 입력해주세요.');
      return;
    }

    // Validate kiosk images
    const invalidIndex = validateKioskImage(data);
    if (invalidIndex !== undefined) {
      toast.error('모든 항목에 이모지를 넣어야 해요');
      return;
    }

    try {
      // Convert form data to API format
      const payload = {
        name: data.title,
        description: data.titleI18n?.languages['en-US'] || undefined,
        isRequired: data.isRequired,
        selectableOptionCount: data.maxChoices,
        options: validChoices.map((choice) => ({
          name: choice.title,
          extraPrice: Number(choice.priceValue) || 0,
        })),
      };

      if (mode === 'editOrDelete' && item) {
        await updateOptionGroupMutation.mutateAsync({
          id: item.id,
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
        mode === 'editOrDelete'
          ? '옵션 그룹 수정에 실패했습니다.'
          : '옵션 그룹 생성에 실패했습니다.',
      );
    }
  };

  const getNextId = () => {
    const existingIds = fields.map((f) => Number(f.id) || 0);
    const minId = Math.min(...existingIds, 0);
    return minId > 0 ? '-1' : String(minId - 1);
  };

  const getNextOrder = () => {
    const orders = fields.map((f) => f.order);
    return Math.max(...orders, 0) + 1;
  };

  const toggleDefaultChoice = (choiceId: string) => {
    const current = form.getValues('defaultChoices');
    const maxChoices = form.getValues('maxChoices');

    if (current.includes(choiceId)) {
      form.setValue(
        'defaultChoices',
        current.filter((id) => id !== choiceId),
      );
    } else {
      if (current.length >= maxChoices) {
        // Remove first and add new one
        form.setValue('defaultChoices', [...current.slice(1), choiceId]);
      } else {
        form.setValue('defaultChoices', [...current, choiceId]);
      }
    }
  };

  // Check if should show default choices section
  const shouldShowDefaultChoices =
    watchedIsRequired && watchedChoices.some((c) => c.title.trim().length > 0);

  if (showDefaultChoices) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <button
              type="button"
              onClick={() => setShowDefaultChoices(false)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              뒤로가기
            </button>
            <DialogTitle>
              {form.watch('title') ? `"${form.watch('title')}" 기본값 설정` : '기본값 설정'}{' '}
              옵션 등록
            </DialogTitle>
            <DialogDescription>
              기본값으로 체크할 옵션이름을 정해주세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            {watchedChoices
              .filter((choice) => choice.title.trim())
              .map((choice) => (
                <div
                  key={choice.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleDefaultChoice(choice.id!)}
                >
                  <Checkbox
                    checked={watchedDefaultChoices.includes(choice.id!)}
                    disabled={choice.state === 'SOLD_OUT'}
                  />
                  <span className="flex-1">
                    {choice.state === 'SOLD_OUT' && '(품절) '}
                    {choice.title}
                  </span>
                </div>
              ))}
          </div>

          <DialogFooter>
            <Button type="button" onClick={() => setShowDefaultChoices(false)}>
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'editOrDelete' ? '옵션 수정' : '옵션 추가'}
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
                <Label htmlFor="title">옵션 그룹 *</Label>
                <Input
                  id="title"
                  placeholder="예) 온도"
                  autoFocus
                  {...form.register('title', { required: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="titleI18n">영문명</Label>
                <Input
                  id="titleI18n"
                  placeholder="키오스크・픽업오더・테이블오더용 영문명"
                  {...form.register('titleI18n.languages.en-US')}
                />
              </div>
            </div>

            {/* 옵션 이름 목록 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">옵션이름</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      id: getNextId(),
                      title: '',
                      priceValue: '',
                      order: getNextOrder(),
                      state: 'ON_SALE',
                      imageUrl: null,
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-1" />
                  추가하기
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center gap-3"
                  >
                    <Input
                      placeholder="예) HOT"
                      maxLength={13}
                      className="flex-1"
                      {...form.register(`choices.${index}.title`, {
                        required: true,
                      })}
                    />
                    <div className="flex items-center gap-2 min-w-[150px]">
                      <Input
                        type="text"
                        placeholder="0"
                        className="w-full"
                        {...form.register(`choices.${index}.priceValue`)}
                      />
                      <span className="text-sm text-gray-500 whitespace-nowrap">원</span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="min-w-[80px]"
                      onClick={() => {
                        const currentState = form.watch(`choices.${index}.state`);
                        form.setValue(
                          `choices.${index}.state`,
                          currentState === 'SOLD_OUT' ? 'ON_SALE' : 'SOLD_OUT',
                        );
                      }}
                    >
                      <span
                        className={
                          form.watch(`choices.${index}.state`) === 'SOLD_OUT'
                            ? 'text-blue-600 font-medium'
                            : ''
                        }
                      >
                        ✓ 품절
                      </span>
                    </Button>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          remove(index);
                          // Remove from defaultChoices if exists
                          const currentDefaults = form.getValues('defaultChoices');
                          const removedId = field.id;
                          form.setValue(
                            'defaultChoices',
                            currentDefaults.filter((id) => id !== removedId),
                          );
                        }}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 필수 선택 설정 */}
            <div className="flex items-center justify-between py-3 border-t">
              <Label className="text-base font-medium">이 옵션은 필수선택이에요</Label>
              <Switch
                id="isRequired"
                checked={watchedIsRequired}
                onCheckedChange={(checked) => {
                  form.setValue('isRequired', checked);
                  if (checked && form.getValues('minChoices') === 0) {
                    form.setValue('minChoices', 1);
                  }
                  if (!checked) {
                    form.setValue('defaultChoices', []);
                  }
                }}
              />
            </div>

            {/* 최대 선택 개수 */}
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium flex-1">
                주문할 때 최대 몇개를 선택할까요?
              </Label>
              <Select
                value={String(watchedMaxChoices)}
                onValueChange={(value) => form.setValue('maxChoices', Number(value))}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: watchedChoices.length }, (_, i) => i + 1).map(
                    (num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num}개
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* 기본값 설정 버튼 */}
            {shouldShowDefaultChoices && (
              <Button
                type="button"
                variant="outline"
                className="w-full justify-between"
                onClick={() => setShowDefaultChoices(true)}
              >
                <span className="font-medium">
                  기본값으로 체크할 옵션이름을 정해주세요
                </span>
                {watchedDefaultChoices.length > 0 && (
                  <span className="text-blue-600 font-normal">
                    {watchedChoices
                      .filter((c) => watchedDefaultChoices.includes(c.id!))
                      .map((c) => c.title)
                      .join(', ')}
                  </span>
                )}
              </Button>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button
              type="submit"
              disabled={
                createOptionGroupMutation.isPending ||
                updateOptionGroupMutation.isPending
              }
            >
              {mode === 'editOrDelete' ? '확인' : '등록'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
