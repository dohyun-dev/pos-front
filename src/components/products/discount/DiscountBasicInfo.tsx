import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function DiscountBasicInfo() {
  const { control, watch } = useFormContext();
  const watchType = watch("type");

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">
              할인 이름 *
            </FormLabel>
            <FormControl>
              <Input placeholder="할인 이름" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-4">
        <FormField
          control={control}
          name="value"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="text-base font-semibold">
                할인 금액 *
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="pr-12"
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
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-semibold">
                할인 유형 *
              </FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={
                      field.value === "FIXED_AMOUNT" ? "default" : "outline"
                    }
                    className="w-12"
                    onClick={() => field.onChange("FIXED_AMOUNT")}
                  >
                    원
                  </Button>
                  <Button
                    type="button"
                    variant={
                      field.value === "FIXED_PERCENTAGE" ? "default" : "outline"
                    }
                    className="w-12"
                    onClick={() => field.onChange("FIXED_PERCENTAGE")}
                  >
                    %
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
