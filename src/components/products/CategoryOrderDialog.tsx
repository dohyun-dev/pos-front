"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useCategoriesQuery,
  useUpdateCategoryDisplayOrdersMutation,
} from "@/api/products";
import { toast } from "sonner";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

export function CategoryOrderDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: categories = [], refetch } = useCategoriesQuery();
  const updateCategoryDisplayOrdersMutation =
    useUpdateCategoryDisplayOrdersMutation();

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(categories);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 카테고리 목록이 갱신될 때 state 업데이트
  useEffect(() => {
    setItems(categories);
  }, [categories]);

  const handleMove = (direction: "up" | "down") => {
    if (!selectedId) return;
    const idx = items.findIndex((i) => i.id === selectedId);
    if (idx === -1) return;

    const newItems = [...items];
    if (direction === "up" && idx > 0) {
      [newItems[idx - 1], newItems[idx]] = [newItems[idx], newItems[idx - 1]];
    } else if (direction === "down" && idx < newItems.length - 1) {
      [newItems[idx + 1], newItems[idx]] = [newItems[idx], newItems[idx + 1]];
    }
    setItems(newItems);
  };

  const handleSave = async () => {
    const order = items.map((i) => i.id); // ✅ string[]
    await updateCategoryDisplayOrdersMutation.mutateAsync({
      categoryIds: order,
    });
    toast.success("카테고리 순서가 변경되었습니다.");
    refetch();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>카테고리 순서편집</DialogTitle>
          <p className="text-sm text-muted-foreground">
            포스와 키오스크 둘 다 반영돼요.
          </p>
        </DialogHeader>

        {/* 위로 / 아래로 버튼 */}
        <div className="flex justify-end gap-2 mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleMove("up")}
            disabled={!selectedId}
          >
            <ChevronUp className="w-4 h-4 mr-1" /> 위로
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleMove("down")}
            disabled={!selectedId}
          >
            <ChevronDown className="w-4 h-4 mr-1" /> 아래로
          </Button>
        </div>

        {/* 리스트 영역 */}
        <div className="max-h-[320px] overflow-y-auto border rounded-md divide-y">
          {items.map((cat) => {
            const selected = cat.id === selectedId;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedId(cat.id)}
                className={clsx(
                  "flex w-full items-center justify-between px-4 py-3 text-left transition",
                  selected ? "bg-blue-50" : "hover:bg-gray-50",
                )}
              >
                <span className="text-sm font-medium">{cat.name}</span>
                <div
                  className={clsx(
                    "h-5 w-5 flex items-center justify-center rounded-full border",
                    selected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300",
                  )}
                >
                  {selected && <Check className="w-3 h-3" />}
                </div>
              </button>
            );
          })}
          {items.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              등록된 카테고리가 없습니다.
            </div>
          )}
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateCategoryDisplayOrdersMutation.isPending}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
