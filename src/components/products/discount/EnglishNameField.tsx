import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function EnglishNameField() {
  const { control, watch } = useFormContext();
  const watchAutoApplyEnabled = watch("autoApply.enabled");

  return (
    <FormField
      control={control}
      name="titleI18n.languages.en-US"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">
            자동 할인 영어이름 표기
          </FormLabel>
          <FormControl>
            <Input
              placeholder="영어로 작성해 주세요"
              {...field}
              disabled={!watchAutoApplyEnabled}
            />
          </FormControl>
          <FormDescription>
            키오스크에서 English를 누르면 보이는 할인 이름이에요.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
