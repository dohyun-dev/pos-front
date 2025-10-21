import { useState } from "react";
import { CategoryManageDialog } from "./CategoryManageDialog";
import { CategoryOrderDialog } from "./CategoryOrderDialog";
import { CategoryForeignNameDialog } from "./CategoryForeignNameDialog";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";

type DialogMode = "manage" | "order" | "foreignName" | "delete";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: DialogMode;
}

export function CategoryDialog({
  open,
  onOpenChange,
  initialMode = "manage",
}: CategoryDialogProps) {
  const [mode, setMode] = useState<DialogMode>(initialMode);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setMode(initialMode);
    }
    onOpenChange(newOpen);
  };

  return (
    <>
      {mode === "manage" && (
        <CategoryManageDialog
          open={open}
          onOpenChange={handleOpenChange}
          onOpenOrderDialog={() => setMode("order")}
          onOpenForeignNameDialog={() => setMode("foreignName")}
          onOpenDeleteDialog={() => setMode("delete")}
        />
      )}

      {mode === "order" && (
        <CategoryOrderDialog
          open={open}
          onOpenChange={handleOpenChange}
          onBack={() => setMode("manage")}
        />
      )}

      {mode === "foreignName" && (
        <CategoryForeignNameDialog
          open={open}
          onOpenChange={handleOpenChange}
          onBack={() => setMode("manage")}
        />
      )}

      {mode === "delete" && (
        <DeleteCategoryDialog
          open={open}
          onOpenChange={handleOpenChange}
          onBack={() => setMode("manage")}
        />
      )}
    </>
  );
}
