# Phase 5: 관리자 API - 최소 구현 시나리오

**목표**: 관리자 API를 최소한으로 구현하여 테스트를 통과시키고, 이미지의 관리자 대시보드 요구사항을 반영

**원칙**: 
- 테스트를 통과시키는 최소한의 코드만 작성
- 실제 DB 연동 없이도 동작하도록 구현 (최소 구현)
- 이미지의 대시보드 통계 및 최근 주문 기능 고려

---

## 📋 구현 단계

### Step 1: 관리자 서비스 생성

#### 1.1 `backend/src/services/adminService.ts` 생성

**구현 내용:**
- [ ] `getDashboardStats()` - 기본 통계 객체 반환 (이미지의 대시보드 통계 반영)
- [ ] `getRecentOrders(limit)` - 빈 배열 반환 (최소 구현)

**이미지 요구사항 반영:**
이미지에서 확인된 대시보드 통계:
- 총 주문 수 (Total Orders)
- 주문 접수 수 (Orders Received / PENDING)
- 제조 중 수 (In Production / PREPARING)
- 제조 완료 수 (Production Completed / READY)

**예상 코드:**
```typescript
// 관리자 서비스 - 최소 구현
// 나중에 Prisma를 사용한 실제 DB 연동으로 확장

export const getDashboardStats = async () => {
  // 최소 구현: 기본 통계 객체 반환
  // 이미지의 대시보드 통계 구조 반영
  return {
    totalOrders: 0,
    pendingOrders: 0,      // 주문 접수
    preparingOrders: 0,    // 제조 중
    readyOrders: 0,        // 제조 완료
    completedOrders: 0,    // 픽업 완료
    cancelledOrders: 0,    // 취소됨
  }
}

export const getRecentOrders = async (limit?: number) => {
  // 최소 구현: 빈 배열 반환
  // limit 파라미터는 나중에 사용
  return []
}
```

**이미지 요구사항:**
- 대시보드 통계는 이미지의 구조를 반영하여 반환
- 최근 주문은 빈 배열로 시작 (나중에 실제 데이터 연동)

---

### Step 2: 관리자 컨트롤러 생성

#### 2.1 `backend/src/controllers/adminController.ts` 생성

**구현 내용:**
- [ ] `GET /api/admin/dashboard` → 기본 통계 객체 반환 (200 OK)
- [ ] `GET /api/admin/recent-orders` → 빈 배열 반환 (200 OK)
- [ ] `limit` 쿼리 파라미터 처리 (최소 구현에서는 무시)

**예상 코드:**
```typescript
import { Request, Response } from 'express'
import * as adminService from '../services/adminService'

export const getDashboard = async (req: Request, res: Response) => {
  const stats = await adminService.getDashboardStats()
  res.json(stats)
}

export const getRecentOrders = async (req: Request, res: Response) => {
  const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined
  const orders = await adminService.getRecentOrders(limit)
  res.json(orders)
}
```

---

### Step 3: 관리자 라우트 생성

#### 3.1 `backend/src/routes/adminRoutes.ts` 생성

**구현 내용:**
- [ ] Express Router 생성
- [ ] 관리자 엔드포인트 라우트 정의
- [ ] 컨트롤러 함수 연결

**예상 코드:**
```typescript
import { Router } from 'express'
import * as adminController from '../controllers/adminController'

const router = Router()

router.get('/dashboard', adminController.getDashboard)
router.get('/recent-orders', adminController.getRecentOrders)

export default router
```

---

### Step 4: 메인 앱에 관리자 라우트 등록

#### 4.1 `backend/src/index.ts` 수정

**구현 내용:**
- [ ] 관리자 라우트 import
- [ ] `/api/admin` 경로에 라우트 등록

**추가할 코드:**
```typescript
import adminRoutes from './routes/adminRoutes'

// API 라우트 등록
app.use('/api/admin', adminRoutes)
```

---

## 📁 생성될 파일 구조

```
backend/src/
├── services/
│   └── adminService.ts      ✅ 관리자 서비스
├── controllers/
│   └── adminController.ts   ✅ 관리자 컨트롤러
├── routes/
│   └── adminRoutes.ts       ✅ 관리자 라우트
└── index.ts                 ✅ (수정) 라우트 등록
```

---

## ✅ 완료 기준

### Phase 5: 관리자 API
- [ ] `GET /api/admin/dashboard` → 기본 통계 객체 반환 (200 OK)
- [ ] `GET /api/admin/recent-orders` → 빈 배열 반환 (200 OK)
- [ ] `limit` 쿼리 파라미터 처리 (최소 구현에서는 무시 가능)
- [ ] 모든 라우트가 404가 아닌 응답 반환
- [ ] TypeScript 컴파일 오류 없음
- [ ] 서버가 정상적으로 시작됨

---

## 🎨 이미지 요구사항 반영

### 관리자 대시보드 통계
이미지에서 확인된 통계 항목:
- **총 주문** (Total Orders): 모든 주문 수
- **주문 접수** (Orders Received): PENDING 상태 주문 수
- **제조 중** (In Production): PREPARING 상태 주문 수
- **제조 완료** (Production Completed): READY 상태 주문 수

**구현 방식:**
- `getDashboardStats()` 함수에서 통계 객체 반환
- 각 상태별 주문 수를 포함한 객체 구조
- 최소 구현에서는 모두 0으로 반환 (나중에 실제 계산)

**예시 응답 구조:**
```typescript
{
  totalOrders: 0,
  pendingOrders: 0,      // 주문 접수
  preparingOrders: 0,    // 제조 중
  readyOrders: 0,        // 제조 완료
  completedOrders: 0,    // 픽업 완료
  cancelledOrders: 0     // 취소됨
}
```

### 최근 주문 목록
이미지에서 확인된 주문 정보:
- 날짜/시간: "7월 31일 13:00"
- 메뉴 및 수량: "아메리카노(ICE) x 1"
- 가격: "4,000원"
- 액션 버튼: "주문 접수"

**구현 방식:**
- `getRecentOrders(limit)` 함수에서 주문 목록 반환
- 최소 구현에서는 빈 배열 반환
- 나중에 실제 주문 데이터와 연동

**향후 확장 시 예시 응답 구조:**
```typescript
[
  {
    id: "order-id",
    createdAt: "2024-07-31T13:00:00Z",
    status: "PENDING",
    totalPrice: 4000,
    items: [
      {
        menuName: "아메리카노(ICE)",
        quantity: 1,
        price: 4000
      }
    ]
  }
]
```

---

## 🔍 검증 방법

### 1. 대시보드 통계 API 테스트
```bash
# 대시보드 통계 조회
curl http://localhost:5000/api/admin/dashboard
# 예상: 통계 객체 반환
```

**예상 응답:**
```json
{
  "totalOrders": 0,
  "pendingOrders": 0,
  "preparingOrders": 0,
  "readyOrders": 0,
  "completedOrders": 0,
  "cancelledOrders": 0
}
```

### 2. 최근 주문 API 테스트
```bash
# 최근 주문 목록 조회
curl http://localhost:5000/api/admin/recent-orders
# 예상: []

# limit 파라미터 포함
curl http://localhost:5000/api/admin/recent-orders?limit=10
# 예상: []
```

---

## 📝 주의사항

### 최소 구현 원칙
1. **테스트 통과 우선**: 404가 아닌 응답만 반환하면 됨
2. **기본 통계 구조**: 이미지의 대시보드 구조를 반영한 객체 반환
3. **빈 배열 반환**: 최근 주문은 빈 배열로 시작
4. **DB 연동 제외**: 실제 데이터베이스 연동은 나중에 추가

### 향후 확장
- 실제 Prisma를 사용한 DB 연동
- 주문 상태별 통계 계산 로직
- 최근 주문 목록 조회 및 정렬
- 날짜/시간 포맷팅
- 페이지네이션 지원

---

## 🚀 다음 단계

Phase 5 완료 후:
- Phase 6-8: 프론트엔드 구현
- 실제 데이터베이스 연동
- 통계 계산 로직 구현
- 최근 주문 조회 로직 구현

---

**작성일**: 2024-12-16  
**예상 소요 시간**: 20-30분  
**난이도**: ⭐⭐ (쉬움)

