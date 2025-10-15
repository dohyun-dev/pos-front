# POS Front-end

React + TypeScript + Vite 기반의 POS(Point of Sale) 시스템 프론트엔드 프로젝트

## 🚀 기술 스택

### Core
- **React 19.1.1** - UI 라이브러리
- **TypeScript 5.9.3** - 타입 안정성
- **Vite 7.1.7** - 빌드 도구 및 개발 서버
- **React Compiler** - 자동 성능 최적화

### UI & Styling
- **Tailwind CSS 4.1.14** - 유틸리티 CSS 프레임워크
- **shadcn/ui** - 재사용 가능한 컴포넌트 라이브러리
- **Radix UI** - 접근성 좋은 헤드리스 컴포넌트
- **Lucide React** - 아이콘 라이브러리
- **class-variance-authority** - 컴포넌트 변형 관리
- **tailwind-merge** - Tailwind 클래스 병합

### State Management & Data Fetching
- **Zustand 5.0.8** - 경량 상태 관리
- **TanStack Query 5.90.3** - 서버 상태 관리
- **TanStack Router** - 타입 안전한 라우팅
- **Axios 1.12.2** - HTTP 클라이언트

### Form & Validation
- **React Hook Form 7.65.0** - 폼 관리
- **Zod 4.1.12** - 스키마 검증

### Others
- **date-fns** - 날짜 처리
- **recharts** - 차트 라이브러리
- **sonner** - 토스트 알림

## 📦 설치된 shadcn/ui 컴포넌트

모든 주요 UI 컴포넌트가 설치되어 있습니다:

- ✅ Accordion
- ✅ Alert / Alert Dialog
- ✅ Avatar
- ✅ Badge
- ✅ Breadcrumb
- ✅ Button
- ✅ Calendar
- ✅ Card
- ✅ Carousel
- ✅ Chart
- ✅ Checkbox
- ✅ Collapsible
- ✅ Command
- ✅ Context Menu
- ✅ Dialog
- ✅ Drawer
- ✅ Dropdown Menu
- ✅ Form
- ✅ Hover Card
- ✅ Input / Input OTP
- ✅ Label
- ✅ Menubar
- ✅ Navigation Menu
- ✅ Pagination
- ✅ Popover
- ✅ Progress
- ✅ Radio Group
- ✅ Resizable
- ✅ Scroll Area
- ✅ Select
- ✅ Separator
- ✅ Sheet
- ✅ Sidebar
- ✅ Skeleton
- ✅ Slider
- ✅ Sonner (Toast)
- ✅ Switch
- ✅ Table
- ✅ Tabs
- ✅ Textarea
- ✅ Toggle / Toggle Group
- ✅ Tooltip
- ✅ KBD

## 📁 프로젝트 구조

```
pos-front/
├── src/
│   ├── api/                 # API 호출 함수 및 React Query hooks
│   │   ├── auth.ts         # 인증 API
│   │   └── products.ts     # 상품 API
│   ├── components/
│   │   └── ui/             # shadcn/ui 컴포넌트
│   ├── lib/
│   │   ├── axios.ts        # Axios 인스턴스 설정
│   │   ├── queryClient.ts  # React Query 설정
│   │   └── utils.ts        # 유틸리티 함수
│   ├── routes/             # TanStack Router 라우트
│   │   ├── __root.tsx      # 루트 레이아웃
│   │   ├── index.tsx       # 홈페이지
│   │   ├── dashboard.tsx   # 대시보드
│   │   └── products.tsx    # 상품 관리
│   ├── stores/             # Zustand 스토어
│   │   ├── authStore.ts    # 인증 상태 관리
│   │   └── cartStore.ts    # 장바구니 상태 관리
│   ├── hooks/              # Custom hooks
│   ├── routeTree.gen.ts    # 자동 생성된 라우트 트리
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example            # 환경 변수 예제
├── components.json         # shadcn/ui 설정
├── tsconfig.json
├── vite.config.ts
└── package.json
```
│   │   ├── queryClient.ts  # React Query 설정
│   │   └── utils.ts        # 유틸리티 함수
│   ├── stores/             # Zustand 스토어
│   │   ├── authStore.ts    # 인증 상태 관리
│   │   └── cartStore.ts    # 장바구니 상태 관리
│   ├── hooks/              # Custom hooks
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example            # 환경 변수 예제
├── components.json         # shadcn/ui 설정
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## 🛠️ 설정된 기능

### 1. Axios 설정 (`src/lib/axios.ts`)
- Base URL 설정
- 요청/응답 인터셉터
- 자동 토큰 갱신
- 에러 핸들링

### 2. React Query 설정 (`src/lib/queryClient.ts`)
- 전역 Query 옵션
- 캐싱 전략
- DevTools 통합

### 3. Zustand 스토어
- **authStore**: 사용자 인증 상태 관리
- **cartStore**: POS 장바구니 관리

### 4. API 모듈 예제
- **auth.ts**: 로그인, 회원가입, 로그아웃
- **products.ts**: 상품 CRUD 작업

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가하세요:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드
```bash
npm run build
```

### 5. 프리뷰
```bash
npm run preview
```

## 📝 사용 예제

### TanStack Router 사용
```tsx
import { Link, useNavigate } from '@tanstack/react-router';

function Navigation() {
  const navigate = useNavigate();
  
  return (
    <nav>
      <Link to="/">홈</Link>
      <Link to="/dashboard">대시보드</Link>
      <Link to="/products">상품</Link>
      
      <button onClick={() => navigate({ to: '/dashboard' })}>
        대시보드로 이동
      </button>
    </nav>
  );
}
```

### Zustand 스토어 사용
```tsx
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

function MyComponent() {
  const { user, login, logout } = useAuthStore();
  const { items, addItem, clearCart } = useCartStore();
  
  // ...
}
```

### React Query 사용
```tsx
import { useProducts, useCreateProduct } from '@/api/products';

function ProductList() {
  const { data, isLoading } = useProducts({ page: 1, limit: 10 });
  const createMutation = useCreateProduct();
  
  // ...
}
```

### shadcn/ui 컴포넌트 사용
```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

function MyForm() {
  return (
    <Card>
      <Input placeholder="입력..." />
      <Button>제출</Button>
    </Card>
  );
}
```

## 🔧 개발 도구

- **ESLint**: 코드 린팅
- **TypeScript**: 타입 체킹
- **React Query DevTools**: Query 상태 디버깅 (개발 모드에서만)
- **TanStack Router DevTools**: 라우트 상태 디버깅 (개발 모드에서만)
- **React Compiler**: 자동 성능 최적화

## 📚 참고 자료

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Query Documentation](https://tanstack.com/query)
- [TanStack Router Documentation](https://tanstack.com/router)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Compiler Documentation](https://react.dev/learn/react-compiler)

## 👥 개발자

POS Front-end Team

## 📄 라이센스

MIT
