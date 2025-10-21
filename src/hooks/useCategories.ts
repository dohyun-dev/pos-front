import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  bulkUpdateCategories,
  type BulkUpdateCategoriesDto,
  type Category,
  createCategory,
  type CreateCategoryDto,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/api/categories";
import { toast } from "sonner";

export const CATEGORIES_QUERY_KEY = ["categories"];

// 카테고리 목록 조회
export const useCategories = () => {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: getCategories,
  });
};

// 카테고리 생성
export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCategoryDto) => createCategory(dto),
    onSuccess: (newCategory) => {
      queryClient.setQueryData<Category[]>(CATEGORIES_QUERY_KEY, (old = []) => [
        ...old,
        newCategory,
      ]);
      toast.success("카테고리가 생성되었습니다.");
    },
    onError: (error: any) => {
      if (error?.response?.data?.errorCode === "4000") {
        toast.error("중복되는 이름의 카테고리가 있어요!");
      } else {
        toast.error("카테고리 생성에 실패했습니다.");
      }
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...dto }: { id: number } & Partial<CreateCategoryDto>) =>
      updateCategory(id, dto),
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData<Category[]>(CATEGORIES_QUERY_KEY, (old = []) =>
        old.map((cat) =>
          cat.id === updatedCategory.id ? updatedCategory : cat,
        ),
      );
      toast.success("카테고리가 수정되었습니다.");
    },
    onError: (error: any) => {
      if (error?.response?.data?.errorCode === "4000") {
        toast.error("중복되는 이름의 카테고리가 있어요!");
      } else {
        toast.error("카테고리 수정에 실패했습니다.");
      }
    },
  });
};

export const useBulkUpdateCategoriesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: BulkUpdateCategoriesDto) => bulkUpdateCategories(dto),
    onSuccess: (updatedCategories) => {
      queryClient.setQueryData<Category[]>(
        CATEGORIES_QUERY_KEY,
        updatedCategories,
      );
      toast.success("카테고리 순서가 저장되었습니다.");
    },
    onError: () => {
      toast.error("카테고리 순서 저장에 실패했습니다.");
    },
  });
};

// 카테고리 삭제
export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Category[]>(CATEGORIES_QUERY_KEY, (old = []) =>
        old.filter((cat) => cat.id !== deletedId),
      );
      toast.success("카테고리가 삭제되었습니다.");
    },
    onError: (error: any) => {
      if (error?.response?.data?.errorCode === "4000") {
        toast.error("카테고리 내 상품이 있어서 삭제할 수 없어요");
      } else if (error?.response?.data?.errorCode === "4001") {
        toast.error("마지막 남은 카테고리는 삭제할 수 없어요");
      } else {
        toast.error("카테고리 삭제에 실패했습니다.");
      }
    },
  });
};
