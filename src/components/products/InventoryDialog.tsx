import { useState } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface InventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  priceId: number;
  initialQuantity: number;
  menuItem?: {
    title: string;
  };
  referrer?: string;
  onConfirm: (data: { quantity: number; reason?: any }) => void;
}

export function InventoryDialog({
  open,
  onOpenChange,
  priceId,
  initialQuantity = 0,
  menuItem,
  referrer,
  onConfirm,
}: InventoryDialogProps) {
  const { toast } = useToast();
  const [inventoryType, setInventoryType] = useState<'IN' | 'OUT'>('IN');
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState<string>('');

  const handleSubmit = () => {
    if (quantity === 0) {
      toast({
        title: '수량을 입력해주세요',
        variant: 'destructive',
      });
      return;
    }

    const finalQuantity = inventoryType === 'IN' ? quantity : -quantity;
    onConfirm({
      quantity: finalQuantity,
      reason: reason || undefined,
    });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setQuantity(0);
    setReason('');
  };

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value) || 0;
    setQuantity(Math.max(0, num));
  };

  const getPreviewText = () => {
    if (quantity === 0) return `현재 수량 : ${initialQuantity}`;
    const multiplier = inventoryType === 'IN' ? 1 : -1;
    const newQuantity = initialQuantity + multiplier * quantity;
    return `현재 수량 : ${initialQuantity}, 변경될 수량 : ${initialQuantity}${inventoryType === 'IN' ? '+' : '-'}${quantity}=${newQuantity}개`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>재고 수량 더하기/빼기</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 탭 */}
          <Tabs
            value={inventoryType}
            onValueChange={(value) => setInventoryType(value as 'IN' | 'OUT')}
          >
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="IN">수량 더하기</TabsTrigger>
              <TabsTrigger value="OUT">수량 빼기</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 상품 정보 */}
          {menuItem && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">
                {menuItem.title}
              </p>
            </div>
          )}

          {/* 수량 입력 */}
          <div>
            <Label className="text-lg font-semibold">
              {inventoryType === 'IN' ? '몇 개를 더할까요?' : '몇 개를 뺄까요?'}
            </Label>
            <div className="mt-3">
              <div className="relative">
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  placeholder="0개"
                  className="text-2xl h-14 pr-12"
                  autoFocus
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  개
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{getPreviewText()}</p>
            </div>
          </div>

          {/* 사유 */}
          <div>
            <Label className="font-medium text-gray-700">
              수량 {inventoryType === 'IN' ? '추가' : '차감'} 사유를 선택하세요
            </Label>
            <div className="mt-2">
              <Input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="직접 입력"
                className="h-10"
              />
            </div>
          </div>

          {/* 빠른 수량 버튼 */}
          <div>
            <Label className="text-sm text-gray-600 mb-2 block">
              자주 사용하는 수량
            </Label>
            <div className="flex gap-2 flex-wrap">
              {[10, 20, 50, 100].map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity((prev) => prev + value)}
                >
                  {inventoryType === 'OUT' ? '-' : '+'}
                  {value}개
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={quantity === 0}
            className="min-w-[160px]"
          >
            {inventoryType === 'IN' ? '수량 더하기' : '수량 빼기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
