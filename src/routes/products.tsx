import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/products")({
  component: ProductsLayout,
});

const navItems = [
  { label: "상품", path: "/products" },
  { label: "옵션", path: "/products/options" },
  { label: "카테고리", path: "/products/categories" },
  { label: "할인", path: "/products/discounts" },
];

function ProductsLayout() {
  return (
    <div className="flex h-full">
      <Card className="w-65 flex flex-col border-r rounded-none">
        <div className="p-4 flex flex-col h-full">
          <h2 className="text-lg font-semibold tracking-tight mb-4">
            상품 관리
          </h2>

          <ScrollArea className="pr-2">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  activeProps={{
                    className: "bg-primary text-primary-foreground",
                  }}
                  activeOptions={{ exact: item.path === "/products" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>

          <Separator className="my-4" />

          <div className="flex flex-col gap-2">
            <Button variant="secondary" className="justify-start w-full">
              ✏️ 상품 편집으로 이동
            </Button>
            <Button variant="outline" className="justify-start w-full">
              📦 상품 한 번에 등록
            </Button>
          </div>
        </div>
      </Card>

      <main className="flex-1 overflow-auto bg-background">
        <Outlet />
      </main>
    </div>
  );
}
