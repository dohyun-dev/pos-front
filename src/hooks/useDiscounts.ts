import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDiscount,
  type CreateDiscountRequest,
  deleteDiscount,
  getDiscounts,
  updateDiscount,
  type UpdateDiscountRequest,
} from "@/api/discounts";
import { toast } from "sonner";

export const DISCOUNT_QUERY_KEY = ["discounts"];

export function useDiscounts() {
  return useQuery({
    queryKey: DISCOUNT_QUERY_KEY,
    queryFn: getDiscounts,
  });
}

export function useCreateDiscount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDiscountRequest) => createDiscount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DISCOUNT_QUERY_KEY });
      toast.success("할인이 추가되었습니다.");
    },
    onError: (error: any) => {
      if (error.response?.data?.errorCode === "4000") {
        toast.error("중복되는 이름의 할인이 있습니다.");
      } else {
        toast.error("할인 추가에 실패했습니다.");
      }
    },
  });
}

export function useUpdateDiscount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateDiscountRequest }) =>
      updateDiscount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DISCOUNT_QUERY_KEY });
      toast.success("할인이 수정되었습니다.");
    },
    onError: (error: any) => {
      if (error.response?.data?.errorCode === "4000") {
        toast.error("중복되는 이름의 할인이 있습니다.");
      } else {
        toast.error("할인 수정에 실패했습니다.");
      }
    },
  });
}

export function useDeleteDiscount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteDiscount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DISCOUNT_QUERY_KEY });
      toast.success("할인이 삭제되었습니다.");
    },
    onError: () => {
      toast.error("할인 삭제에 실패했습니다.");
    },
  });
}
