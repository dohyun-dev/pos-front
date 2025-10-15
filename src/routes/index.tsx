import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">POS System</CardTitle>
          <CardDescription>
            Point of Sale 시스템에 오신 것을 환영합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            이 시스템은 다음 기술로 구축되었습니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>React 19 + TypeScript</li>
            <li>TanStack Router - 타입 안전한 라우팅</li>
            <li>TanStack Query - 서버 상태 관리</li>
            <li>Zustand - 클라이언트 상태 관리</li>
            <li>shadcn/ui - UI 컴포넌트</li>
            <li>Tailwind CSS - 스타일링</li>
            <li>React Compiler - 자동 최적화</li>
          </ul>
          <div className="flex gap-2 pt-4">
            <Button asChild>
              <Link to="/dashboard">대시보드로 이동</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/products">상품 관리</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
