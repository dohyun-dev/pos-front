import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Discount } from "@/api/discounts";

// 분리된 컴포넌트 import
import { DiscountBasicInfo } from "./DiscountBasicInfo";
import { AutoApplyToggle } from "./AutoApplyToggle";
import { DiningOptionsStep } from "./DiningOptionsStep";
import { ItemsSelectionStep } from "./ItemsSelectionStep";
import { ScheduleStep } from "./ScheduleStep";
import { EnglishNameField } from "./EnglishNameField";
import { ScheduleDialog } from "./ScheduleDialog";
import { ItemsSelectionDialog } from "./ItemsSelectionDialog";

const discountSchema = z.object({
  title: z.string().min(1, "할인 이름을 입력해주세요"),
  type: z.enum(["FIXED_AMOUNT", "FIXED_PERCENTAGE"]),
  value: z.number().min(0, "할인 금액은 0 이상이어야 합니다"),
  titleI18n: z
    .object({
      languages: z.object({
        "en-US": z.string().optional(),
      }),
    })
    .optional(),
  autoApply: z
    .object({
      enabled: z.boolean(),
      condition: z.object({
        appliedToAll: z.boolean(),
        diningOptions: z.array(z.enum(["HERE", "TOGO", "DELIVERY", "PICKUP"])),
        schedule: z
          .object({
            dayOfWeeks: z
              .array(
                z.enum([
                  "MONDAY",
                  "TUESDAY",
                  "WEDNESDAY",
                  "THURSDAY",
                  "FRIDAY",
                  "SATURDAY",
                  "SUNDAY",
                ]),
              )
              .nullable(),
            timeRange: z
              .object({
                start: z.string(),
                end: z.string(),
              })
              .nullable(),
            dateRange: z
              .object({
                start: z.string(),
                end: z.string(),
              })
              .nullable(),
          })
          .nullable(),
      }),
      targets: z.array(
        z.object({
          targetType: z.enum(["CATEGORY", "ITEM"]),
          targetId: z.number(),
        }),
      ),
    })
    .optional(),
});

type DiscountFormData = z.infer<typeof discountSchema>;

interface DiscountDialogRefactoredProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  discount?: Discount;
  onSubmit: (data: DiscountFormData) => void;
  onDelete?: () => void;
}

export function DiscountDialogRefactored({
  open,
  onOpenChange,
  discount,
  onSubmit,
  onDelete,
}: DiscountDialogRefactoredProps) {
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showItemsDialog, setShowItemsDialog] = useState(false);

  const form = useForm<DiscountFormData>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      title: "",
      type: "FIXED_AMOUNT",
      value: 0,
      autoApply: {
        enabled: false,
        condition: {
          appliedToAll: true,
          diningOptions: ["HERE", "TOGO", "DELIVERY", "PICKUP"],
          schedule: null,
        },
        targets: [],
      },
    },
  });

  useEffect(() => {
    if (discount) {
      form.reset({
        title: discount.title,
        type: discount.type,
        value:
          discount.type === "FIXED_PERCENTAGE"
            ? discount.percentage || 0
            : discount.amountMoney || 0,
        titleI18n: discount.titleI18n,
        autoApply: discount.autoApply
          ? {
              enabled: true,
              ...discount.autoApply,
            }
          : {
              enabled: false,
              condition: {
                appliedToAll: true,
                diningOptions: ["HERE", "TOGO", "DELIVERY", "PICKUP"],
                schedule: null,
              },
              targets: [],
            },
      });
    } else {
      form.reset();
    }
  }, [discount, form, open]);

  const handleSubmit = (data: DiscountFormData) => {
    onSubmit(data);
    form.reset();
  };

  const watchAutoApplyEnabled = form.watch("autoApply.enabled");
  const watchSchedule = form.watch("autoApply.condition.schedule");
  const watchTargets = form.watch("autoApply.targets");

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] p-0 gap-0">
          <DialogHeader className="px-10 pt-10 pb-5">
            <DialogTitle className="text-2xl">
              {discount ? "할인 수정" : "새 할인 추가"}
            </DialogTitle>
            <DialogDescription>할인 정보를 입력해주세요</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col"
            >
              <ScrollArea className="flex-1 px-10 max-h-[calc(90vh-200px)]">
                <div className="space-y-6 pb-6">
                  {/* 기본 정보 */}
                  <DiscountBasicInfo />

                  <Separator />

                  {/* 자동 할인 */}
                  <div className="space-y-6">
                    <AutoApplyToggle />

                    {watchAutoApplyEnabled && (
                      <div className="space-y-6 pt-2">
                        {/* Step 1: 주문 타입 */}
                        <DiningOptionsStep />

                        <Separator />

                        {/* Step 2: 할인 상품 */}
                        <ItemsSelectionStep
                          onOpenItemsDialog={() => setShowItemsDialog(true)}
                        />

                        <Separator />

                        {/* Step 3: 할인 시간대・기간 */}
                        <ScheduleStep
                          onOpenScheduleDialog={() =>
                            setShowScheduleDialog(true)
                          }
                        />
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* 영어 이름 */}
                  <EnglishNameField />
                </div>
              </ScrollArea>

              <DialogFooter className="px-10 py-6 border-t gap-2">
                {discount && onDelete && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={onDelete}
                    className="mr-auto"
                  >
                    삭제
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  취소
                </Button>
                <Button type="submit" className="min-w-[160px]">
                  확인
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* 시간대・기간 설정 다이얼로그 */}
      <ScheduleDialog
        open={showScheduleDialog}
        onOpenChange={setShowScheduleDialog}
        value={watchSchedule}
        onSave={(schedule) => {
          form.setValue("autoApply.condition.schedule", schedule);
          setShowScheduleDialog(false);
        }}
      />

      {/* 상품 선택 다이얼로그 */}
      <ItemsSelectionDialog
        open={showItemsDialog}
        onOpenChange={setShowItemsDialog}
        value={watchTargets || []}
        onSave={(targets) => {
          form.setValue("autoApply.targets", targets);
          setShowItemsDialog(false);
        }}
      />
    </>
  );
}
