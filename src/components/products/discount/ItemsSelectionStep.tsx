import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, X } from "lucide-react";

interface ItemsSelectionStepProps {
  onOpenItemsDialog: () => void;
}

export function ItemsSelectionStep({
  onOpenItemsDialog,
}: ItemsSelectionStepProps) {
  const { control, watch, setValue } = useFormContext();
  const watchAppliedToAll = watch("autoApply.condition.appliedToAll");
  const watchTargets = watch("autoApply.targets");

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
          2
        </div>
        <FormLabel className="text-base font-semibold m-0">
          할인 상품
        </FormLabel>
      </div>
      <FormField
        control={control}
        name="autoApply.condition.appliedToAll"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value === "all");
                  if (value === "selected") {
                    onOpenItemsDialog();
                  }
                }}
                value={field.value ? "all" : "selected"}
                className="flex gap-4 pl-9"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="all-products" />
                  <Label htmlFor="all-products">전체</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="selected" id="selected-products" />
                  <Label htmlFor="selected-products">선택</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {!watchAppliedToAll && (
        <div className="pl-9">
          {watchTargets && watchTargets.length > 0 ? (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {watchTargets.map((target: any, idx: number) => (
                  <Badge key={idx} variant="secondary" className="gap-1">
                    {target.targetType === "CATEGORY" ? "카테고리" : "상품"} #
                    {target.targetId}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        const newTargets = watchTargets.filter(
                          (_: any, i: number) => i !== idx,
                        );
                        setValue("autoApply.targets", newTargets);
                      }}
                    />
                  </Badge>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onOpenItemsDialog}
              >
                <Edit className="h-3 w-3 mr-2" />
                상품 수정
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed"
              onClick={onOpenItemsDialog}
            >
              <Plus className="h-4 w-4 mr-2" />
              상품 추가
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
