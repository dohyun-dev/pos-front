import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

export function AutoApplyToggle() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="autoApply.enabled"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <FormLabel className="text-base font-semibold">
              자동으로 할인 적용하기
            </FormLabel>
            <FormDescription>
              3가지 조건에 맞춰 자동으로 적용되어요
            </FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
