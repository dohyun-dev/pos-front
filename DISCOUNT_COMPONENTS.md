# 할인 다이얼로그 컴포넌트 구조

리버스 엔지니어링한 원본 코드를 기반으로 shadcn/ui를 사용하여 재구성한 할인 관리 시스템입니다.

## 📁 컴포넌트 구조

```
src/components/products/discount/
├── index.ts                          # Export 정리
├── DiscountDialogRefactored.tsx     # 메인 다이얼로그 (통합)
├── DiscountBasicInfo.tsx            # 기본 정보 섹션
├── AutoApplyToggle.tsx              # 자동 할인 토글
├── DiningOptionsStep.tsx            # Step 1: 주문 타입
├── ItemsSelectionStep.tsx           # Step 2: 할인 상품
├── ScheduleStep.tsx                 # Step 3: 시간대・기간
├── EnglishNameField.tsx             # 영어 이름 필드
├── ScheduleDialog.tsx               # 시간대 설정 서브 다이얼로그
└── ItemsSelectionDialog.tsx         # 상품 선택 서브 다이얼로그
```

## 🎯 주요 기능

### 1. 할인 기본 정보 (`DiscountBasicInfo`)
- 할인 이름 입력
- 할인 금액 입력 (숫자)
- 할인 유형 선택 (원/%)

### 2. 자동 할인 설정

#### AutoApplyToggle
- 자동 할인 ON/OFF 토글
- 3가지 조건 섹션 표시/숨김

#### DiningOptionsStep (Step 1)
- 주문 타입 선택
  - 전체 (매장/포장/배달/픽업)
  - 포장만

#### ItemsSelectionStep (Step 2)
- 할인 상품 선택
  - 전체 상품
  - 선택 (ItemsSelectionDialog 열기)
- 선택된 상품 표시 (Badge)
- 추가/수정 버튼

#### ScheduleStep (Step 3)
- 시간대・기간 설정
  - 항상
  - 설정 (ScheduleDialog 열기)
- 설정된 스케줄 표시
  - 요일 (월, 화, 수...)
  - 시간대 (09:00 ~ 18:00)
  - 기간 (2024-01-01 ~ 2024-12-31)

### 3. 서브 다이얼로그

#### ScheduleDialog
- **요일 선택**: 월~일 버튼으로 다중 선택
- **시간대 설정**: 
  - Toggle ON/OFF
  - 시작/종료 시간 입력 (time input)
- **기간 설정**:
  - Toggle ON/OFF
  - 시작/종료 날짜 입력 (date input)
- 뒤로가기 버튼으로 메인 다이얼로그로 복귀

#### ItemsSelectionDialog
- **카테고리 단위 선택**: 전체 카테고리 내 상품 선택
- **개별 상품 선택**: 특정 상품만 선택
- **전체선택/모두해제** 버튼
- 트리 구조로 표시
  - 카테고리 (체크박스 + 상품 개수 Badge)
    - 상품 (체크박스)
- 뒤로가기 버튼으로 메인 다이얼로그로 복귀

### 4. 기타

#### EnglishNameField
- 영어 이름 입력 (키오스크용)
- 자동 할인 활성화 시에만 입력 가능

## 💡 사용 예제

```tsx
import { DiscountDialogRefactored } from "@/components/products/discount";

function MyComponent() {
  const [open, setOpen] = useState(false);
  
  const handleSubmit = (data) => {
    console.log('할인 데이터:', data);
    // API 호출
  };
  
  return (
    <DiscountDialogRefactored
      open={open}
      onOpenChange={setOpen}
      discount={selectedDiscount} // 수정 시
      onSubmit={handleSubmit}
      onDelete={handleDelete} // 삭제 버튼 표시
    />
  );
}
```

## 📊 데이터 구조

```typescript
{
  title: "할인 이름",
  type: "FIXED_AMOUNT" | "FIXED_PERCENTAGE",
  value: 5000,
  titleI18n: {
    languages: {
      "en-US": "Discount Name"
    }
  },
  autoApply: {
    enabled: true,
    condition: {
      appliedToAll: false,
      diningOptions: ["HERE", "TOGO", "DELIVERY", "PICKUP"],
      schedule: {
        dayOfWeeks: ["MONDAY", "FRIDAY"],
        timeRange: {
          start: "09:00",
          end: "18:00"
        },
        dateRange: {
          start: "2024-01-01",
          end: "2024-12-31"
        }
      }
    },
    targets: [
      { targetType: "CATEGORY", targetId: 1 },
      { targetType: "ITEM", targetId: 5 }
    ]
  }
}
```

## 🎨 디자인 특징

1. **단계별 구분**: 숫자 뱃지로 3단계 명확히 표시
2. **인터랙티브**: 설정 내용을 즉시 확인 가능
3. **편집 용이**: 각 설정 항목마다 X 버튼으로 개별 삭제 가능
4. **접근성**: 뒤로가기 버튼으로 네비게이션 명확화
5. **반응형**: ScrollArea로 긴 내용도 스크롤 가능

## 🔧 개선 포인트

원본 대비 개선된 점:
- ✅ 컴포넌트 모듈화 (재사용성 증가)
- ✅ shadcn/ui 통일된 디자인
- ✅ 타입 안정성 강화
- ✅ 코드 가독성 향상
- ✅ 유지보수 용이성
