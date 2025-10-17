import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  type ProductCategory,
  useCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/api/products";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CategoryFormValues {
  name: string;
}

interface CategoryDialogProps {
  children: React.ReactNode;
}

export function CategoryDialog({ children }: CategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const { data: categories = [], refetch } = useCategoriesQuery();
  const createMutation = useCreateCategoryMutation();
  const deleteMutation = useDeleteCategoryMutation();

  const [editingId, setEditingId] = useState<string | null>(null);

  // 새 카테고리 추가 form
  const createForm = useForm<CategoryFormValues>({
    defaultValues: { name: "" },
  });

  const handleCreate = async (values: CategoryFormValues) => {
    if (!values.name.trim()) return;
    await createMutation.mutateAsync({ name: values.name });
    createForm.reset();
    refetch();
  };

  const handleDelete = async (cat: ProductCategory) => {
    if (confirm(`'${cat.name}' 카테고리를 삭제하시겠습니까?`)) {
      await deleteMutation.mutateAsync(cat.id);
      if (editingId === cat.id) setEditingId(null);
      refetch();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>카테고리 관리</DialogTitle>
        </DialogHeader>

        {/* 항상 상단에 위치하는 새 카테고리 추가 필드 */}
        <Form {...createForm}>
          <form
            onSubmit={createForm.handleSubmit(handleCreate)}
            className="flex gap-2 mb-4"
            autoComplete="off"
          >
            <FormField
              control={createForm.control}
              name="name"
              rules={{ required: "카테고리명을 입력해주세요." }}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="새로운 카테고리 이름"
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={
                createMutation.isPending || !createForm.watch("name")?.trim()
              }
            >
              저장
            </Button>
          </form>
        </Form>

        {/* 목록 */}
        <div className="max-h-[300px] overflow-y-auto border rounded-md divide-y">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
            >
              {editingId === cat.id ? (
                <CategoryEditForm
                  cat={cat}
                  onCancel={() => setEditingId(null)}
                  refetch={refetch}
                />
              ) : (
                <>
                  <span className="text-sm font-medium text-gray-900">
                    {cat.name}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingId(cat.id)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(cat)}
                    >
                      삭제
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
          {categories.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              등록된 카테고리가 없습니다.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** 각 카테고리 수정용 Form (개별적으로 동작) */
function CategoryEditForm({
  cat,
  onCancel,
  refetch,
}: {
  cat: ProductCategory;
  onCancel: () => void;
  refetch: () => void;
}) {
  const updateMutation = useUpdateCategoryMutation();
  const form = useForm<CategoryFormValues>({
    defaultValues: { name: cat.name },
  });

  const handleUpdate = async (values: CategoryFormValues) => {
    if (!values.name.trim()) return;
    await updateMutation.mutateAsync({
      id: cat.id,
      data: { name: values.name },
    });
    refetch();
    onCancel();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdate)}
        className="flex gap-2 w-full"
        autoComplete="off"
      >
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "카테고리명을 입력해주세요." }}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input {...field} autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
          disabled={updateMutation.isPending || !form.watch("name")?.trim()}
        >
          저장
        </Button>
        <Button variant="outline" size="sm" type="button" onClick={onCancel}>
          취소
        </Button>
      </form>
    </Form>
  );
}
