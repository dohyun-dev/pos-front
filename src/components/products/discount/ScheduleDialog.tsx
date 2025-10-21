import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
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

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: any;
  onSave: (schedule: any) => void;
}

export function ScheduleDialog({
  open,
  onOpenChange,
  value,
  onSave,
}: ScheduleDialogProps) {
  const [schedule, setSchedule] = useState(
    value || {
      dayOfWeeks: null,
      timeRange: null,
      dateRange: null,
    },
  );

  useEffect(() => {
    if (open) {
      setSchedule(
        value || {
          dayOfWeeks: null,
          timeRange: null,
          dateRange: null,
        },
      );
    }
  }, [open, value]);

  const allDayOfWeeks: DayOfWeek[] = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  const toggleDayOfWeek = (day: DayOfWeek) => {
    const current = schedule.dayOfWeeks || [];
    if (current.includes(day)) {
      const newDays = current.filter((d: DayOfWeek) => d !== day);
      setSchedule({
        ...schedule,
        dayOfWeeks: newDays.length > 0 ? newDays : null,
      });
    } else {
      setSchedule({
        ...schedule,
        dayOfWeeks: [...current, day],
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle>할인 시간대 ・ 기간</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 요일 */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">요일</Label>
            <div className="flex gap-2">
              {allDayOfWeeks.map((day) => (
                <Button
                  key={day}
                  type="button"
                  variant={
                    schedule.dayOfWeeks?.includes(day) ? "default" : "outline"
                  }
                  size="sm"
                  className="flex-1 max-w-[70px]"
                  onClick={() => toggleDayOfWeek(day)}
                >
                  {dayOfWeekLabels[day]}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* 시간대 설정 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">시간대 설정</Label>
              <Switch
                checked={!!schedule.timeRange}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSchedule({
                      ...schedule,
                      timeRange: { start: "09:00", end: "18:00" },
                    });
                  } else {
                    setSchedule({
                      ...schedule,
                      timeRange: null,
                    });
                  }
                }}
              />
            </div>

            {schedule.timeRange && (
              <div className="flex gap-3 items-center">
                <div className="flex-1 space-y-2">
                  <Label className="text-sm text-muted-foreground">시작</Label>
                  <Input
                    type="time"
                    value={schedule.timeRange.start}
                    onChange={(e) =>
                      setSchedule({
                        ...schedule,
                        timeRange: {
                          ...schedule.timeRange!,
                          start: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <span className="text-muted-foreground pt-7">~</span>
                <div className="flex-1 space-y-2">
                  <Label className="text-sm text-muted-foreground">종료</Label>
                  <Input
                    type="time"
                    value={schedule.timeRange.end}
                    onChange={(e) =>
                      setSchedule({
                        ...schedule,
                        timeRange: {
                          ...schedule.timeRange!,
                          end: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* 기간 설정 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">기간 설정</Label>
              <Switch
                checked={!!schedule.dateRange}
                onCheckedChange={(checked) => {
                  if (checked) {
                    const today = new Date().toISOString().split("T")[0];
                    setSchedule({
                      ...schedule,
                      dateRange: { start: today, end: today },
                    });
                  } else {
                    setSchedule({
                      ...schedule,
                      dateRange: null,
                    });
                  }
                }}
              />
            </div>

            {schedule.dateRange && (
              <div className="flex gap-3 items-center">
                <div className="flex-1 space-y-2">
                  <Label className="text-sm text-muted-foreground">시작</Label>
                  <Input
                    type="date"
                    value={schedule.dateRange.start}
                    onChange={(e) =>
                      setSchedule({
                        ...schedule,
                        dateRange: {
                          ...schedule.dateRange!,
                          start: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <span className="text-muted-foreground pt-7">~</span>
                <div className="flex-1 space-y-2">
                  <Label className="text-sm text-muted-foreground">종료</Label>
                  <Input
                    type="date"
                    value={schedule.dateRange.end}
                    onChange={(e) =>
                      setSchedule({
                        ...schedule,
                        dateRange: {
                          ...schedule.dateRange!,
                          end: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={() => onSave(schedule)} className="min-w-[160px]">
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
