import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ImageIcon, X, Plus } from 'lucide-react';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useCategoriesQuery,
  type Product,
  type CreateProductDto,
  type UpdateProductDto,
} from '@/api/products';
import { useOptionGroups } from '@/api/options-groups';
import { useToast } from '@/hooks/use-toast';
import { useConfirm } from '@/hooks/useConfirm';

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  mode: 'create' | 'edit';
  kioskEnabled?: boolean;
  isKioskCatalogItem?: boolean;
}

interface FormData extends CreateProductDto {
  kioskTitle?: string;
  titleI18n?: {
    languages?: {
      'en-US'?: string;
    };
  };
  descriptionI18n?: {
    languages?: {
      'en-US'?: string;
    };
  };
  prices?: Array<{
    id: number;
    title: string;
    isDefault: boolean;
    state: 'ON_SALE' | 'SOLD_OUT';
    sku: string | null;
    barcode: string | null;
    priceType: 'FIXED' | 'VARIABLE' | 'UNIT';
    priceUnit: number;
    priceValue: number;
    isTaxFree: boolean;
    isStockable: boolean;
    stockQuantity: number | null;
    draftInventory?: {
      isStockable: boolean;
      quantity: number;
      reason?: any;
    };
  }>;
  options?: Array<{
    id: string;
    title: string;
    isRequired: boolean;
  }>;
  provenance?: {
    displayProvenance?: string;
  };
}

export function ProductDialog({
  open,
  onOpenChange,
  product,
  mode,
  kioskEnabled = false,
  isKioskCatalogItem = false,
}: ProductDialogProps) {
  const { toast } = useToast();
  const { confirm } = useConfirm();
  const [imageUrl, setImageUrl] = useState<string | null>(
    product?.imageUrl || null,
  );

  const { data: categories = [] } = useCategoriesQuery();
  const { data: optionGroups = [] } = useOptionGroups();
  const createMutation = useCreateProductMutation();
  const updateMutation = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: product
      ? {
          code: product.code,
          name: product.name,
          basePrice: product.basePrice,
          barcode: product.barcode,
          description: product.description,
          category: product.category,
          kioskEnabled: product.kioskEnabled ?? true,
          kioskTitle: product.kioskTitle || product.name,
          state: product.state || 'ON_SALE',
          isTaxFree: product.isTaxFree || false,
          priceType: product.priceType || 'FIXED',
          stockQuantity: product.stockQuantity || 0,
          durationMinutes: product.durationMinutes,
          labels: product.labels || [],
          prices: [
            {
              id: -1,
              title: '기본',
              isDefault: true,
              state: product.state || 'ON_SALE',
              sku: null,
              barcode: product.barcode || null,
              priceType: product.priceType || 'FIXED',
              priceUnit: 1,
              priceValue: product.basePrice,
              isTaxFree: product.isTaxFree || false,
              isStockable: (product.stockQuantity ?? 0) > 0,
              stockQuantity: product.stockQuantity || null,
              draftInventory: {
                isStockable: (product.stockQuantity ?? 0) > 0,
                quantity: product.stockQuantity || 0,
              },
            },
          ],
          options: [],
        }
      : {
          code: '',
          name: '',
          basePrice: 0,
          barcode: '',
          description: '',
          category: null,
          kioskEnabled: true,
          kioskTitle: '',
          state: 'ON_SALE',
          isTaxFree: false,
          priceType: 'FIXED',
          stockQuantity: 0,
          labels: [],
          prices: [
            {
              id: -1,
              title: '기본',
              isDefault: true,
              state: 'ON_SALE',
              sku: null,
              barcode: null,
              priceType: 'FIXED',
              priceUnit: 1,
              priceValue: 0,
              isTaxFree: false,
              isStockable: false,
              stockQuantity: null,
              draftInventory: {
                isStockable: false,
                quantity: 0,
              },
            },
          ],
          options: [],
        },
  });

  const selectedCategory = watch('category');
  const kioskEnabledValue = watch('kioskEnabled');
  const priceType = watch('prices.0.priceType');
  const isTaxFree = watch('prices.0.isTaxFree');
  const state = watch('state');
  const isStockable = watch('prices.0.draftInventory.isStockable');
  const stockQuantity = watch('prices.0.draftInventory.quantity');
  const selectedOptions = watch('options') || [];

  // 품절 상태 자동 관리
  useEffect(() => {
    if (isStockable && stockQuantity <= 0) {
      setValue('state', 'SOLD_OUT');
    }
  }, [isStockable, stockQuantity, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload: CreateProductDto | UpdateProductDto = {
        code: data.code,
        name: data.name,
        basePrice: data.prices?.[0]?.priceValue || data.basePrice,
        barcode: data.prices?.[0]?.barcode || data.barcode,
        description: data.description,
        category: data.category,
        imageUrl: imageUrl || undefined,
        kioskEnabled: data.kioskEnabled,
        kioskTitle: data.kioskTitle,
        state: data.state,
        isTaxFree: data.prices?.[0]?.isTaxFree,
        priceType: data.prices?.[0]?.priceType,
        stockQuantity: data.prices?.[0]?.draftInventory?.quantity,
        durationMinutes: data.durationMinutes,
        labels: data.labels,
        optionGroupIds: selectedOptions.map((opt) => opt.id),
      };

      if (mode === 'create') {
        await createMutation.mutateAsync(payload as CreateProductDto);
        toast({
          title: `"${data.name}" 상품을 등록했어요.`,
          variant: 'default',
        });
      } else if (product) {
        await updateMutation.mutateAsync({
          id: product.id,
          data: payload as UpdateProductDto,
        });
        toast({
          title: `"${data.name}" 상품을 수정했어요.`,
          variant: 'default',
        });
      }
      onOpenChange(false);
      reset();
    } catch (error) {
      toast({
        title: '오류가 발생했습니다',
        description: error instanceof Error ? error.message : '알 수 없는 오류',
        variant: 'destructive',
      });
    }
  };

  const handleClose = async () => {
    if (isDirty) {
      const confirmed = await confirm({
        title: '변경사항을 저장하지 않고 나갈까요?',
        confirmText: '저장하기',
        cancelText: '나가기',
      });
      if (!confirmed) {
        return;
      }
    }
    onOpenChange(false);
    reset();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePriceTypeChange = async (type: 'FIXED' | 'VARIABLE' | 'UNIT') => {
    if (type === 'VARIABLE' && selectedOptions.length > 0) {
      const confirmed = await confirm({
        title: '가격을 매번 직접 입력할까요?',
        description: '이렇게 하면 설정한 옵션 정보가 사라져요.',
      });
      if (!confirmed) {
        return;
      }
      setValue('options', []);
    }
    setValue('prices.0.priceType', type);
    setValue('kioskEnabled', false);
  };

  const handleOptionToggle = (optionId: string) => {
    const currentOptions = selectedOptions || [];
    const optionExists = currentOptions.some((opt) => opt.id === optionId);

    if (optionExists) {
      setValue(
        'options',
        currentOptions.filter((opt) => opt.id !== optionId),
      );
    } else {
      const optionGroup = optionGroups.find((og) => og.id === optionId);
      if (optionGroup) {
        setValue('options', [
          ...currentOptions,
          {
            id: optionGroup.id,
            title: optionGroup.name,
            isRequired: false,
          },
        ]);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? '상품 추가' : '상품 수정'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 키오스크 설정 (kioskEnabled가 true일 때만) */}
          {kioskEnabledValue && (
            <div className="grid grid-cols-[160px_1fr] gap-6">
              {/* 이미지 업로드 */}
              <div>
                <Label>상품 이미지</Label>
                <div className="mt-2">
                  <label
                    htmlFor="image-upload"
                    className="block w-[140px] h-[140px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 relative"
                  >
                    {imageUrl ? (
                      <>
                        <img
                          src={imageUrl}
                          alt="Product"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setImageUrl(null);
                          }}
                          className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {/* 상품명 */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-semibold">
                    상품이름 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    {...register('name', { required: true, maxLength: 255 })}
                    placeholder="상품이름"
                    className="mt-1"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      255자 이상 입력할 수 없어요
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="kioskTitle" className="text-sm font-semibold">
                    키오스크・매장페이지 용
                  </Label>
                  <Input
                    id="kioskTitle"
                    {...register('kioskTitle', { maxLength: 255 })}
                    placeholder="상품이름"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 일반 상품명 (kioskEnabled가 false일 때) */}
          {!kioskEnabledValue && (
            <div>
              <Label htmlFor="name" className="text-sm font-semibold">
                상품이름 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...register('name', { required: true, maxLength: 255 })}
                placeholder="상품이름"
                className="mt-1"
                autoFocus={mode === 'create'}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  255자 이상 입력할 수 없어요
                </p>
              )}
            </div>
          )}

          <Separator />

          {/* 카테고리 선택 */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">
              카테고리 선택 <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  type="button"
                  variant={
                    selectedCategory?.id === category.id ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() =>
                    setValue('category', {
                      id: category.id,
                      name: category.name,
                    })
                  }
                  className={
                    selectedCategory?.id === category.id
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : ''
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          {/* 가격 정보 */}
          <div>
            <Label className="text-sm font-semibold">
              기본가격 <span className="text-red-500">*</span>
            </Label>
            <div className="mt-1 relative">
              <Controller
                name="prices.0.priceValue"
                control={control}
                rules={{ required: true, min: 0 }}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    placeholder="0"
                    disabled={priceType === 'VARIABLE'}
                    className="pr-8"
                  />
                )}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                원
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={priceType === 'VARIABLE'}
                  onCheckedChange={(checked) =>
                    handlePriceTypeChange(checked ? 'VARIABLE' : 'FIXED')
                  }
                />
                매번 직접 입력할게요
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={priceType === 'UNIT'}
                  onCheckedChange={(checked) =>
                    handlePriceTypeChange(checked ? 'UNIT' : 'FIXED')
                  }
                />
                무게에 따라 계산할게요
              </label>
            </div>
          </div>

          {/* 옵션 선택 */}
          {priceType !== 'VARIABLE' && (
            <div>
              <Label className="text-sm font-medium mb-3 block">
                상품에 넣을 옵션을 선택하세요
              </Label>
              <div className="flex flex-wrap gap-2">
                {optionGroups.map((optionGroup) => {
                  const isSelected = selectedOptions.some(
                    (opt) => opt.id === optionGroup.id,
                  );
                  return (
                    <Button
                      key={optionGroup.id}
                      type="button"
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleOptionToggle(optionGroup.id)}
                      className={
                        isSelected ? 'bg-blue-600 hover:bg-blue-700' : ''
                      }
                    >
                      {optionGroup.name}
                    </Button>
                  );
                })}
                <Button type="button" variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  새옵션 추가
                </Button>
              </div>
            </div>
          )}

          {/* 바코드 */}
          <div>
            <Label htmlFor="barcode">바코드</Label>
            <Controller
              name="prices.0.barcode"
              control={control}
              render={({ field }) => (
                <Input
                  id="barcode"
                  {...field}
                  value={field.value || ''}
                  placeholder="바코드 스캐너로 바코드를 스캔하거나 직접 입력해 주세요"
                  className="mt-1"
                />
              )}
            />
          </div>

          {/* 설명 */}
          <div>
            <Label htmlFor="description">상품 설명</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="한글설명(800자 이내)"
              maxLength={800}
              rows={4}
              className="mt-1"
            />
          </div>

          {/* 재고 관리 */}
          <div className="flex items-center justify-between py-3 border-t">
            <Label className="text-sm font-semibold">재고 관리</Label>
            <Controller
              name="prices.0.draftInventory.isStockable"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {isStockable && (
            <div>
              <Label>현재 수량 <span className="text-red-500">*</span></Label>
              <div className="mt-1 relative">
                <Controller
                  name="prices.0.draftInventory.quantity"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      className="pr-8"
                      min={0}
                    />
                  )}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  개
                </span>
              </div>
            </div>
          )}

          {/* 세금 */}
          <div className="flex items-center justify-between py-3 border-t">
            <Label className="text-sm font-semibold">세금</Label>
            <Controller
              name="prices.0.isTaxFree"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value ? 'true' : 'false'}
                  onValueChange={(value) => field.onChange(value === 'true')}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="taxable" />
                    <Label htmlFor="taxable" className="font-normal">
                      과세
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="tax-free" />
                    <Label htmlFor="tax-free" className="font-normal">
                      면세
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          {/* 품절 표시 */}
          <div className="flex items-center justify-between py-3 border-t">
            <Label className="text-sm font-semibold">품절 표시</Label>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value === 'SOLD_OUT'}
                  onCheckedChange={(checked) =>
                    field.onChange(checked ? 'SOLD_OUT' : 'ON_SALE')
                  }
                  disabled={isStockable && stockQuantity <= 0}
                />
              )}
            />
          </div>

          {/* 고객용 채널 노출 */}
          <div className="flex items-center justify-between py-3 border-t">
            <div>
              <Label className="text-sm font-semibold">고객용 채널 노출</Label>
              <p className="text-xs text-gray-500 mt-1">
                키오스크・매장페이지에 보여져요
              </p>
            </div>
            <Controller
              name="kioskEnabled"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={priceType === 'VARIABLE' || priceType === 'UNIT'}
                />
              )}
            />
          </div>

          <DialogFooter className="gap-2">
            {mode === 'edit' && (
              <Button type="button" variant="destructive" className="mr-auto">
                삭제
              </Button>
            )}
            <Button type="button" variant="outline" onClick={handleClose}>
              취소
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="min-w-[160px]"
            >
              {mode === 'create' ? '등록' : '확인'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
