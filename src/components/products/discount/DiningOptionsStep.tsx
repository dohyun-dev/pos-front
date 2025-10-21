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

export function DiningOptionsStep() {
  const { control } = useFormContext();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
          1
        </div>
        <FormLabel className="text-base font-semibold m-0">
          주문 타입 (매장/포장)
        </FormLabel>
      </div>
      <FormField
        control={control}
        name="autoApply.condition.diningOptions"
        render={({ field }) => (
          <FormItem>
            <div className="flex gap-2 flex-wrap pl-9">
              <FormControl>
                <RadioGroup
                  value={
                    field.value?.length === 4
                      ? "all"
                      : field.value?.includes("TOGO")
                        ? "togo"
                        : "all"
                  }
                  onValueChange={(value) => {
                    if (value === "all") {
                      field.onChange(["HERE", "TOGO", "DELIVERY", "PICKUP"]);
                    } else {
                      field.onChange(["TOGO"]);
                    }
                  }}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all-dining" />
                    <Label htmlFor="all-dining">전체</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="togo" id="togo-dining" />
                    <Label htmlFor="togo-dining">포장</Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
