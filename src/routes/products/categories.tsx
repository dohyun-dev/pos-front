import { createFileRoute } from "@tanstack/react-router";
import {
  type ProductCategory,
  useCategoriesQuery,
  useToggleActiveCategoryMutation,
} from "@/api/products";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CategoryDialog } from "@/components/products/CategoryDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryOrderDialog } from "@/components/products/CategoryOrderDialog.tsx";

export const Route = createFileRoute("/products/categories")({
  component: ProductCategoriesPage,
});

export function ProductCategoriesPage() {
  const { data: categories = [], isLoading } = useCategoriesQuery();
  const toggleMutation = useToggleActiveCategoryMutation();

  // 테이블 컬럼 정의
  const columns: ColumnDef<ProductCategory>[] = [
    {
      accessorKey: "name",
      header: "카테고리명",
    },
    {
      accessorKey: "isActive",
      header: "키오스크 노출",
      cell: ({ row }) => {
        const category = row.original;

        return (
          <div className="flex justify-center">
            <Switch
              checked={category.isActive}
              onCheckedChange={() => toggleMutation.mutate({ id: category.id })}
              disabled={toggleMutation.isPending}
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">카테고리 관리</h2>
        <div className="flex items-center gap-2">
          <CategoryOrderDialog>
            <Button variant="outline">순서 편집</Button>
          </CategoryOrderDialog>
          <CategoryDialog>
            <Button>
              <Plus className="mr-1 h-4 w-4" />
              카테고리 추가
            </Button>
          </CategoryDialog>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-gray-500">로딩 중...</div>
      ) : (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
