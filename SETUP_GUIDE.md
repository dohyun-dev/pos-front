# POS Front-end 설치 가이드

## ✅ 설치 완료 항목

### 1. shadcn/ui 컴포넌트 (47개)
모든 주요 UI 컴포넌트가 `src/components/ui/` 디렉토리에 설치되었습니다.

#### Form & Input Components
- ✅ Input, Input OTP, Textarea
- ✅ Checkbox, Radio Group, Select
- ✅ Switch, Slider
- ✅ Form, Label

#### Layout Components
- ✅ Card, Separator, Tabs
- ✅ Accordion, Collapsible, Resizable
- ✅ Scroll Area, Aspect Ratio

#### Navigation Components
- ✅ Breadcrumb, Navigation Menu
- ✅ Menubar, Pagination, Sidebar

#### Overlay Components
- ✅ Dialog, Alert Dialog, Sheet, Drawer
- ✅ Popover, Hover Card, Tooltip
- ✅ Context Menu, Dropdown Menu, Command

#### Feedback & Display Components
- ✅ Alert, Sonner (Toast), Progress, Skeleton
- ✅ Table, Badge, Avatar, Calendar, Chart
- ✅ Carousel, KBD
- ✅ Button, Toggle, Toggle Group

### 2. 상태 관리 & 데이터 페칭
- ✅ **Zustand 5.0.8** - 전역 상태 관리
- ✅ **TanStack Query 5.90.3** - 서버 상태 관리
- ✅ **Axios 1.12.2** - HTTP 클라이언트

### 3. 생성된 설정 파일
- ✅ `src/lib/axios.ts` - Axios 인스턴스 및 인터셉터
- ✅ `src/lib/queryClient.ts` - React Query 설정
- ✅ `src/stores/authStore.ts` - 인증 상태 관리
- ✅ `src/stores/cartStore.ts` - 장바구니 상태 관리
- ✅ `src/api/auth.ts` - 인증 API hooks
- ✅ `src/api/products.ts` - 상품 API hooks
- ✅ `.env` - 환경 변수

## 🚀 사용 예제

### 1. Zustand 스토어
```typescript
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

function MyComponent() {
  const { user, login, logout } = useAuthStore();
  const { items, addItem, clearCart } = useCartStore();
}
```

### 2. React Query
```typescript
import { useProducts, useCreateProduct } from '@/api/products';

function ProductList() {
  const { data, isLoading } = useProducts({ page: 1, limit: 10 });
  const createMutation = useCreateProduct();
}
```

### 3. shadcn/ui + React Hook Form
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">로그인</Button>
      </form>
    </Form>
  );
}
```

## 🎉 완료!

모든 설정이 완료되었습니다. `npm run dev`로 개발 서버를 실행하세요!
