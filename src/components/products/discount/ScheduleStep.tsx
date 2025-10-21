import { useFormContext } from "react-hook-form";
import { FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Edit, X } from "lucide-react";
import type { DayOfWeek } from "@/api/discounts";

const dayOfWeekLabels: Record<DayOfWeek, string> = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};

interface ScheduleStepProps {
  onOpenScheduleDialog: () => void;
}

export function ScheduleStep({ onOpenScheduleDialog }: ScheduleStepProps) {
  const { watch, setValue } = useFormContext();
  const watchSchedule = watch("autoApply.condition.schedule");

  const hasSchedule =
    watchSchedule &&
    (watchSchedule.dayOfWeeks ||
      watchSchedule.timeRange ||
      watchSchedule.dateRange);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
          3
        </div>
        <FormLabel className="text-base font-semibold m-0">
          할인 시간대 ・ 기간
        </FormLabel>
      </div>

      <div className="pl-9 space-y-3">
        <RadioGroup
          value={hasSchedule ? "scheduled" : "always"}
          onValueChange={(value) => {
            if (value === "always") {
              setValue("autoApply.condition.schedule", null);
            } else {
              onOpenScheduleDialog();
            }
          }}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="always" id="always" />
            <Label htmlFor="always">항상</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="scheduled" id="scheduled" />
            <Label htmlFor="scheduled">설정</Label>
          </div>
        </RadioGroup>

        {hasSchedule && (
          <div className="space-y-2">
            {watchSchedule?.dayOfWeeks && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">요일:</span>
                <span>
                  {watchSchedule.dayOfWeeks
                    .map((d: DayOfWeek) => dayOfWeekLabels[d])
                    .join(", ")}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() =>
                    setValue("autoApply.condition.schedule.dayOfWeeks", null)
                  }
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {watchSchedule?.timeRange && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">시간대:</span>
                <span>
                  {watchSchedule.timeRange.start} ~{" "}
                  {watchSchedule.timeRange.end}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() =>
                    setValue("autoApply.condition.schedule.timeRange", null)
                  }
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {watchSchedule?.dateRange && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">기간:</span>
                <span>
                  {watchSchedule.dateRange.start} ~ {watchSchedule.dateRange.end}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() =>
                    setValue("autoApply.condition.schedule.dateRange", null)
                  }
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onOpenScheduleDialog}
            >
              <Edit className="h-3 w-3 mr-2" />
              시간대 ・ 기간 수정
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
