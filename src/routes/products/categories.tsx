import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Boxes, Plus } from "lucide-react";
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
import { useCategories } from "@/hooks/useCategories";
import type { Category } from "@/api/categories";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const Route = createFileRoute("/products/categories")({
  component: CategoriesPage,
});

export function CategoriesPage() {
  const { data: categories = [], isLoading } = useCategories();
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();

  useState(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
    }
  });

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "title",
      header: "카테고리명",
    },
    {
      accessorKey: "order",
      header: "순서",
      cell: ({ row }) => {
        return row.original.order ?? "-";
      },
    },
    {
      accessorKey: "titleI18n",
      header: "영어 이름",
      cell: ({ row }) => {
        return row.original.titleI18n?.languages?.["en-US"] || "-";
      },
    },
  ];

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col h-full">
      {/* 메인 컨텐츠 */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">카테고리 관리</h2>
            <Button onClick={() => setCategoryDialogOpen(true)}>
              <Plus className="mr-1 h-4 w-4" />
              카테고리 관리
            </Button>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-gray-500">로딩 중...</div>
          ) : categories.length === 0 ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Boxes className="h-8 w-8 text-muted-foreground" />
                </EmptyMedia>
                <EmptyTitle>등록된 카테고리가 없습니다</EmptyTitle>
                <EmptyDescription>
                  새 카테고리를 추가하여 상품을 관리해보세요.
                </EmptyDescription>
              </EmptyHeader>

              <EmptyContent>
                <Button onClick={() => setCategoryDialogOpen(true)}>
                  <Plus className="mr-1 h-4 w-4" />
                  카테고리 추가
                </Button>
              </EmptyContent>
            </Empty>
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
      />
    </div>
  );
}
