# TanStack Router 가이드

## ✅ 설치 완료

- ✅ **@tanstack/react-router** - 타입 안전한 라우팅
- ✅ **@tanstack/router-devtools** - 라우터 개발 도구
- ✅ **@tanstack/router-plugin** - Vite 플러그인
- ✅ **babel-plugin-react-compiler** - React 19 컴파일러

## 📁 라우트 구조

```
src/
├── routes/
│   ├── __root.tsx          # 루트 레이아웃
│   ├── index.tsx           # 홈페이지 (/)
│   ├── dashboard.tsx       # 대시보드 (/dashboard)
│   └── products.tsx        # 상품 관리 (/products)
└── routeTree.gen.ts        # 자동 생성된 라우트 트리
```

## 🚀 라우트 생성 방법

### 1. 기본 라우트
`src/routes/` 폴더에 파일을 생성하면 자동으로 라우트가 됩니다.

```typescript
// src/routes/about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <div>About Page</div>
}
```

### 2. 동적 라우트
```typescript
// src/routes/products/$productId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$productId')({
  component: ProductDetail,
})

function ProductDetail() {
  const { productId } = Route.useParams()
  return <div>Product: {productId}</div>
}
```

### 3. 레이아웃 라우트
```typescript
// src/routes/_layout.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  component: Layout,
})

function Layout() {
  return (
    <div>
      <nav>Navigation</nav>
      <Outlet /> {/* 자식 라우트 렌더링 */}
    </div>
  )
}

// src/routes/_layout/dashboard.tsx - _layout의 자식
```

### 4. 데이터 로딩 (Loader)
```typescript
import { createFileRoute } from '@tanstack/react-router'

type Product = {
  id: string
  name: string
}

export const Route = createFileRoute('/products/$productId')({
  loader: async ({ params }) => {
    const response = await fetch(`/api/products/${params.productId}`)
    return response.json() as Promise<Product>
  },
  component: ProductDetail,
})

function ProductDetail() {
  const product = Route.useLoaderData()
  return <div>{product.name}</div>
}
```

### 5. Search Params (쿼리 파라미터)
```typescript
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const productSearchSchema = z.object({
  page: z.number().optional().default(1),
  category: z.string().optional(),
})

export const Route = createFileRoute('/products')({
  validateSearch: productSearchSchema,
  component: Products,
})

function Products() {
  const { page, category } = Route.useSearch()
  // page와 category는 타입 안전합니다
}
```

## 🔗 네비게이션

### 1. Link 컴포넌트
```typescript
import { Link } from '@tanstack/react-router'

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link 
        to="/products/$productId" 
        params={{ productId: '123' }}
      >
        Product 123
      </Link>
      <Link 
        to="/products" 
        search={{ page: 2, category: 'food' }}
      >
        Products Page 2
      </Link>
    </nav>
  )
}
```

### 2. 프로그래밍 방식 네비게이션
```typescript
import { useNavigate } from '@tanstack/react-router'

function MyComponent() {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate({ to: '/dashboard' })
  }
  
  const handleProductClick = (id: string) => {
    navigate({ 
      to: '/products/$productId',
      params: { productId: id }
    })
  }
}
```

## 🎯 React Query와 함께 사용

```typescript
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useProducts } from '@/api/products'

export const Route = createFileRoute('/products')({
  component: Products,
})

function Products() {
  const { data, isLoading } = useProducts()
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      {data?.data.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
```

## 🔒 인증 가드

```typescript
// src/routes/_authenticated.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/authStore'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const { isAuthenticated } = useAuthStore.getState()
    
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

// src/routes/_authenticated/dashboard.tsx
// 이제 이 라우트는 인증이 필요합니다
```

## 📝 routeTree 재생성

라우트 파일을 추가하거나 수정한 후, 개발 서버가 자동으로 `routeTree.gen.ts`를 재생성합니다.

수동으로 생성하려면:
```bash
npm run dev
```

## 🎨 현재 활성 라우트 스타일링

```typescript
import { Link } from '@tanstack/react-router'

function Navigation() {
  return (
    <Link 
      to="/dashboard"
      activeProps={{
        className: 'font-bold text-blue-600'
      }}
      inactiveProps={{
        className: 'text-gray-600'
      }}
    >
      Dashboard
    </Link>
  )
}
```

## 🛠️ DevTools

개발 모드에서 자동으로 활성화됩니다. 화면 하단에 Router DevTools 아이콘이 표시됩니다.

## 📚 예제 라우트

### 홈페이지 (/)
```bash
http://localhost:5173/
```

### 대시보드 (/dashboard)
```bash
http://localhost:5173/dashboard
```

### 상품 관리 (/products)
```bash
http://localhost:5173/products
```

## 🔧 Vite 설정

`vite.config.ts`에 이미 설정되어 있습니다:

```typescript
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    TanStackRouterVite(), // 라우트 자동 생성
    react({
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {}], // React 컴파일러
        ],
      },
    }),
  ],
})
```

## ⚡ React Compiler

React 19 Compiler가 활성화되어 있어 자동으로 성능 최적화가 적용됩니다:

- ✅ 자동 메모이제이션
- ✅ 불필요한 리렌더링 방지
- ✅ useMemo/useCallback 불필요

더 이상 수동으로 `useMemo`나 `useCallback`을 사용할 필요가 없습니다!

## 🎉 완료!

TanStack Router와 React Compiler가 모두 설정되었습니다.

타입 안전한 라우팅을 즐기세요! 🚀
