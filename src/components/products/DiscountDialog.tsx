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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { Discount, DayOfWeek, DiningOption } from "@/api/discounts";
import { Tag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const dayOfWeekLabels: Record<DayOfWeek, string> = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};

const diningOptionLabels: Record<DiningOption, string> = {
  HERE: "매장",
  TOGO: "포장",
  DELIVERY: "배달",
  PICKUP: "픽업",
};

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

interface DiscountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  discount?: Discount;
  onSubmit: (data: DiscountFormData) => void;
  onDelete?: () => void;
}

export function DiscountDialog({
  open,
  onOpenChange,
  discount,
  onSubmit,
  onDelete,
}: DiscountDialogProps) {
  const [enableSchedule, setEnableSchedule] = useState(false);
  const [enableDayOfWeeks, setEnableDayOfWeeks] = useState(false);
  const [enableTimeRange, setEnableTimeRange] = useState(false);
  const [enableDateRange, setEnableDateRange] = useState(false);

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
      const autoApplyEnabled = !!discount.autoApply;
      const schedule = discount.autoApply?.condition.schedule;

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

      if (schedule) {
        setEnableSchedule(true);
        setEnableDayOfWeeks(!!schedule.dayOfWeeks);
        setEnableTimeRange(!!schedule.timeRange);
        setEnableDateRange(!!schedule.dateRange);
      } else {
        setEnableSchedule(false);
        setEnableDayOfWeeks(false);
        setEnableTimeRange(false);
        setEnableDateRange(false);
      }
    } else {
      form.reset({
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
      });
      setEnableSchedule(false);
      setEnableDayOfWeeks(false);
      setEnableTimeRange(false);
      setEnableDateRange(false);
    }
  }, [discount, form, open]);

  const handleSubmit = (data: DiscountFormData) => {
    onSubmit(data);
    form.reset();
  };

  const watchType = form.watch("type");
  const watchAutoApplyEnabled = form.watch("autoApply.enabled");
  const watchAppliedToAll = form.watch("autoApply.condition.appliedToAll");

  const allDayOfWeeks: DayOfWeek[] = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{discount ? "할인 수정" : "새 할인 추가"}</DialogTitle>
          <DialogDescription>할인 정보를 입력해주세요</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">기본 정보</TabsTrigger>
                <TabsTrigger value="auto">자동 할인</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>할인 이름 *</FormLabel>
                      <FormControl>
                        <Input placeholder="할인 이름" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>할인 금액 *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              {watchType === "FIXED_PERCENTAGE" ? "%" : "원"}
                            </span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>할인 유형 *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="FIXED_AMOUNT"
                                id="amount"
                              />
                              <Label htmlFor="amount">원</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="FIXED_PERCENTAGE"
                                id="percentage"
                              />
                              <Label htmlFor="percentage">%</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="titleI18n.languages.en-US"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>영어 이름 (선택)</FormLabel>
                      <FormControl>
                        <Input placeholder="영어로 작성해 주세요" {...field} />
                      </FormControl>
                      <FormDescription>
                        키오스크에서 English를 누르면 보이는 할인 이름이에요.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="auto" className="space-y-6 mt-6">
                <FormField
                  control={form.control}
                  name="autoApply.enabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          자동으로 할인 적용하기
                        </FormLabel>
                        <FormDescription>
                          3가지 조건에 맞춰 자동으로 적용되어요
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {watchAutoApplyEnabled && (
                  <>
                    <Separator />

                    {/* 주문 타입 */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">1</Badge>
                        <FormLabel>주문 타입 (매장/포장)</FormLabel>
                      </div>
                      <FormField
                        control={form.control}
                        name="autoApply.condition.diningOptions"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex gap-2 flex-wrap">
                              {(
                                [
                                  "HERE",
                                  "TOGO",
                                  "DELIVERY",
                                  "PICKUP",
                                ] as DiningOption[]
                              ).map((option) => (
                                <FormItem
                                  key={option}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              option,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {diningOptionLabels[option]}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    {/* 할인 상품 */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">2</Badge>
                        <FormLabel>할인 상품</FormLabel>
                      </div>
                      <FormField
                        control={form.control}
                        name="autoApply.condition.appliedToAll"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) =>
                                  field.onChange(value === "all")
                                }
                                value={field.value ? "all" : "selected"}
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="all"
                                    id="all-products"
                                  />
                                  <Label htmlFor="all-products">전체</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="selected"
                                    id="selected-products"
                                  />
                                  <Label htmlFor="selected-products">
                                    선택
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {!watchAppliedToAll && (
                        <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
                          <Tag className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>상품 선택 기능은 추후 구현 예정입니다</p>
                        </div>
                      )}
                    </div>

                    <Separator />

                    {/* 할인 시간대・기간 */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">3</Badge>
                        <FormLabel>할인 시간대 ・ 기간</FormLabel>
                      </div>

                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <Label>스케줄 설정 활성화</Label>
                        <Switch
                          checked={enableSchedule}
                          onCheckedChange={(checked) => {
                            setEnableSchedule(checked);
                            if (!checked) {
                              form.setValue(
                                "autoApply.condition.schedule",
                                null,
                              );
                              setEnableDayOfWeeks(false);
                              setEnableTimeRange(false);
                              setEnableDateRange(false);
                            } else {
                              form.setValue("autoApply.condition.schedule", {
                                dayOfWeeks: null,
                                timeRange: null,
                                dateRange: null,
                              });
                            }
                          }}
                        />
                      </div>

                      {enableSchedule && (
                        <div className="space-y-4 pl-4 border-l-2 border-primary/20">
                          {/* 요일 선택 */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>요일</Label>
                              <Switch
                                checked={enableDayOfWeeks}
                                onCheckedChange={(checked) => {
                                  setEnableDayOfWeeks(checked);
                                  if (!checked) {
                                    form.setValue(
                                      "autoApply.condition.schedule.dayOfWeeks",
                                      null,
                                    );
                                  } else {
                                    form.setValue(
                                      "autoApply.condition.schedule.dayOfWeeks",
                                      [],
                                    );
                                  }
                                }}
                              />
                            </div>

                            {enableDayOfWeeks && (
                              <FormField
                                control={form.control}
                                name="autoApply.condition.schedule.dayOfWeeks"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="flex gap-2 flex-wrap">
                                      {allDayOfWeeks.map((day) => (
                                        <Button
                                          key={day}
                                          type="button"
                                          variant={
                                            field.value?.includes(day)
                                              ? "default"
                                              : "outline"
                                          }
                                          size="sm"
                                          onClick={() => {
                                            const current = field.value || [];
                                            if (current.includes(day)) {
                                              field.onChange(
                                                current.filter(
                                                  (d) => d !== day,
                                                ),
                                              );
                                            } else {
                                              field.onChange([...current, day]);
                                            }
                                          }}
                                        >
                                          {dayOfWeekLabels[day]}
                                        </Button>
                                      ))}
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>

                          {/* 시간대 */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>시간대</Label>
                              <Switch
                                checked={enableTimeRange}
                                onCheckedChange={(checked) => {
                                  setEnableTimeRange(checked);
                                  if (!checked) {
                                    form.setValue(
                                      "autoApply.condition.schedule.timeRange",
                                      null,
                                    );
                                  } else {
                                    form.setValue(
                                      "autoApply.condition.schedule.timeRange",
                                      {
                                        start: "09:00",
                                        end: "18:00",
                                      },
                                    );
                                  }
                                }}
                              />
                            </div>

                            {enableTimeRange && (
                              <div className="flex gap-2 items-center">
                                <FormField
                                  control={form.control}
                                  name="autoApply.condition.schedule.timeRange.start"
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input type="time" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <span>~</span>
                                <FormField
                                  control={form.control}
                                  name="autoApply.condition.schedule.timeRange.end"
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input type="time" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}
                          </div>

                          {/* 기간 */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>기간</Label>
                              <Switch
                                checked={enableDateRange}
                                onCheckedChange={(checked) => {
                                  setEnableDateRange(checked);
                                  if (!checked) {
                                    form.setValue(
                                      "autoApply.condition.schedule.dateRange",
                                      null,
                                    );
                                  } else {
                                    const today = new Date()
                                      .toISOString()
                                      .split("T")[0];
                                    form.setValue(
                                      "autoApply.condition.schedule.dateRange",
                                      {
                                        start: today,
                                        end: today,
                                      },
                                    );
                                  }
                                }}
                              />
                            </div>

                            {enableDateRange && (
                              <div className="flex gap-2 items-center">
                                <FormField
                                  control={form.control}
                                  name="autoApply.condition.schedule.dateRange.start"
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input type="date" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <span>~</span>
                                <FormField
                                  control={form.control}
                                  name="autoApply.condition.schedule.dateRange.end"
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormControl>
                                        <Input type="date" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>

            <DialogFooter className="gap-2">
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
              <Button type="submit">{discount ? "수정" : "추가"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
