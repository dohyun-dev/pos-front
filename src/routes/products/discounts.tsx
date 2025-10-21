import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Percent, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DiscountDialogRefactored } from "@/components/products/discount";
import {
  useCreateDiscount,
  useDeleteDiscount,
  useDiscounts,
  useUpdateDiscount,
} from "@/hooks/useDiscounts";
import type { CreateDiscountRequest, Discount } from "@/api/discounts";
import { useConfirm } from "@/hooks/useConfirm";

export const Route = createFileRoute("/products/discounts")({
  component: DiscountsPage,
});

function DiscountsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<
    Discount | undefined
  >();

  const { data: discounts = [], isLoading } = useDiscounts();
  const createMutation = useCreateDiscount();
  const updateMutation = useUpdateDiscount();
  const deleteMutation = useDeleteDiscount();
  const confirm = useConfirm();

  const handleCreate = () => {
    setSelectedDiscount(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (discount: Discount) => {
    setSelectedDiscount(discount);
    setDialogOpen(true);
  };

  const handleDelete = async (discount: Discount) => {
    const confirmed = await confirm({
      title: "할인 삭제",
      description: `"${discount.title}" 할인을 삭제하시겠습니까?`,
    });

    if (confirmed) {
      deleteMutation.mutate(discount.id);
    }
  };

  const handleSubmit = (data: any) => {
    const requestData: CreateDiscountRequest = {
      title: data.title,
      type: data.type,
      discountType: data.type,
      source: "POS",
      amountMoney: data.type === "FIXED_AMOUNT" ? data.value : undefined,
      percentage: data.type === "FIXED_PERCENTAGE" ? data.value : undefined,
      titleI18n: data.titleI18n?.languages?.["en-US"] ? data.titleI18n : null,
      autoApply: data.autoApply?.enabled
        ? {
            condition: data.autoApply.condition,
            targets: data.autoApply.targets,
          }
        : undefined,
    };

    if (selectedDiscount) {
      updateMutation.mutate(
        { id: selectedDiscount.id, data: requestData },
        {
          onSuccess: () => setDialogOpen(false),
        },
      );
    } else {
      createMutation.mutate(requestData, {
        onSuccess: () => setDialogOpen(false),
      });
    }
  };

  const formatDiscountValue = (discount: Discount) => {
    if (discount.type === "FIXED_PERCENTAGE") {
      return `${discount.percentage}%`;
    }
    return `${discount.amountMoney?.toLocaleString()}원`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">로딩중...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">할인 관리</h1>
          <p className="text-muted-foreground mt-1">
            상품에 적용할 할인을 관리합니다
          </p>
        </div>
        <Button onClick={handleCreate} size="lg">
          <Plus className="mr-2 h-4 w-4" />새 할인 추가
        </Button>
      </div>

      <div className="space-y-3">
        {discounts.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            등록된 할인이 없습니다.
          </Card>
        ) : (
          discounts.map((discount) => (
            <Card
              key={discount.id}
              className="flex items-center justify-between p-4 hover:bg-muted/40 transition-colors cursor-pointer"
              onClick={() => handleEdit(discount)}
            >
              <div className="flex items-center gap-3">
                {discount.type === "FIXED_PERCENTAGE" ? (
                  <Percent className="h-5 w-5 text-primary" />
                ) : (
                  "원"
                )}
                <div>
                  <div className="font-medium">{discount.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDiscountValue(discount)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {discount.autoApply ? (
                  <Badge className="bg-green-500 text-white">자동</Badge>
                ) : (
                  <Badge variant="secondary">수동</Badge>
                )}

                {discount.autoApply?.condition.schedule && (
                  <Badge
                    variant="outline"
                    className="text-xs flex items-center gap-1"
                  >
                    <Settings className="h-3 w-3" /> 스케줄
                  </Badge>
                )}
              </div>
            </Card>
          ))
        )}
      </div>

      <DiscountDialogRefactored
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        discount={selectedDiscount}
        onSubmit={handleSubmit}
        onDelete={
          selectedDiscount
            ? () => {
                handleDelete(selectedDiscount);
                setDialogOpen(false);
              }
            : undefined
        }
      />
    </div>
  );
}
