import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="container mx-auto p-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold">대시보드</h1>
          <p className="text-muted-foreground">POS 시스템 개요</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 매출</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₩12,345,678</div>
              <p className="text-xs text-muted-foreground">
                전월 대비 +20.1%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">주문 수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2,350</div>
              <p className="text-xs text-muted-foreground">
                전월 대비 +180.1%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">상품 수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                재고 있음: 468개
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">활성 고객</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+1,234</div>
              <p className="text-xs text-muted-foreground">
                이번 달 신규: +54
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>최근 주문</CardTitle>
              <CardDescription>
                오늘 접수된 최신 주문 목록입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">주문 데이터가 없습니다.</p>
                <Button variant="outline" size="sm">주문 보기</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>재고 알림</CardTitle>
              <CardDescription>
                재고가 부족한 상품 목록입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">모든 상품의 재고가 충분합니다.</p>
                <Button variant="outline" size="sm">재고 관리</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-2">
          <Button asChild>
            <a href="/">홈으로</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/products">상품 관리</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
