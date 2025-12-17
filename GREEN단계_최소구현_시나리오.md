# 🟢 GREEN 단계 최소 구현 시나리오

**목표**: RED 단계에서 작성된 테스트를 통과시키는 최소한의 구현

**원칙**: 
- 테스트를 통과시키는 데 필요한 최소한의 코드만 작성
- 완벽한 기능보다 테스트 통과 우선
- 리팩토링은 REFACTOR 단계에서 진행

---

## 📋 구현 순서

### Phase 1: 데이터베이스 설정 (우선순위: 최고)

#### 1.1 Prisma 스키마 생성
- [ ] `backend/prisma/schema.prisma` 파일 생성
- [ ] Menu 모델 정의
- [ ] Order 모델 정의
- [ ] OrderItem 모델 정의
- [ ] OrderStatus enum 정의
- [ ] 관계 설정 (Menu ↔ OrderItem, Order ↔ OrderItem)

#### 1.2 데이터베이스 마이그레이션
- [ ] Prisma Client 생성 (`npm run prisma:generate`)
- [ ] 초기 마이그레이션 실행 (`npm run prisma:migrate`)
- [ ] 테스트용 시드 데이터 (선택사항, 최소 구현에서는 생략 가능)

---





---

### Phase 3: 메뉴 API 구현 (우선순위: 높음)

#### 3.1 메뉴 서비스
- [ ] `backend/src/services/menuService.ts` 생성
  - `getAllMenus()` - 빈 배열 반환 (최소 구현)
  - `getMenuById(id)` - 기본 구조만
  - `createMenu(data)` - 기본 구조만
  - `updateMenu(id, data)` - 기본 구조만
  - `deleteMenu(id)` - 기본 구조만
  - `toggleAvailability(id)` - 기본 구조만

#### 3.2 메뉴 컨트롤러
- [ ] `backend/src/controllers/menuController.ts` 생성
  - `GET /api/menus` → 빈 배열 반환
  - `GET /api/menus/:id` → 404 또는 기본 응답
  - `POST /api/menus` → 기본 응답
  - `PUT /api/menus/:id` → 기본 응답
  - `DELETE /api/menus/:id` → 기본 응답
  - `PATCH /api/menus/:id/toggle-availability` → 기본 응답

#### 3.3 메뉴 라우트
- [ ] `backend/src/routes/menuRoutes.ts` 생성
  - 모든 메뉴 엔드포인트 라우트 정의
  - 컨트롤러 연결

#### 3.4 메인 앱에 라우트 등록
- [ ] `backend/src/index.ts`에 메뉴 라우트 등록

---

### Phase 4: 주문 API 구현 (우선순위: 높음)

#### 4.1 주문 서비스
- [ ] `backend/src/services/orderService.ts` 생성
  - `createOrder(data)` - 기본 구조만
  - `getAllOrders(filters)` - 빈 배열 반환 (최소 구현)
  - `getOrderById(id)` - 기본 구조만
  - `updateOrderStatus(id, status)` - 기본 구조만

#### 4.2 주문 컨트롤러
- [ ] `backend/src/controllers/orderController.ts` 생성
  - `POST /api/orders` → 기본 응답
  - `GET /api/orders` → 빈 배열 반환
  - `GET /api/orders/:id` → 기본 응답
  - `PATCH /api/orders/:id/status` → 기본 응답

#### 4.3 주문 라우트
- [ ] `backend/src/routes/orderRoutes.ts` 생성
  - 모든 주문 엔드포인트 라우트 정의
  - 컨트롤러 연결

#### 4.4 메인 앱에 라우트 등록
- [ ] `backend/src/index.ts`에 주문 라우트 등록

---

### Phase 5: 관리자 API 구현 (우선순위: 중간)

#### 5.1 관리자 서비스
- [ ] `backend/src/services/adminService.ts` 생성
  - `getDashboardStats()` - 기본 통계 객체 반환
  - `getRecentOrders(limit)` - 빈 배열 반환 (최소 구현)

#### 5.2 관리자 컨트롤러
- [ ] `backend/src/controllers/adminController.ts` 생성
  - `GET /api/admin/dashboard` → 기본 통계 객체 반환
  - `GET /api/admin/recent-orders` → 빈 배열 반환

#### 5.3 관리자 라우트
- [ ] `backend/src/routes/adminRoutes.ts` 생성
  - 관리자 엔드포인트 라우트 정의
  - 컨트롤러 연결

#### 5.4 메인 앱에 라우트 등록
- [ ] `backend/src/index.ts`에 관리자 라우트 등록

---

### Phase 6: 프론트엔드 기본 구조 (우선순위: 높음)

#### 6.1 React 앱 진입점
- [ ] `frontend/src/main.tsx` 생성
  - React 18 createRoot 사용
  - App 컴포넌트 렌더링

#### 6.2 메인 App 컴포넌트
- [ ] `frontend/src/App.tsx` 생성
  - React Router 기본 설정
  - 기본 라우트 정의 (HomePage, OrderPage 등)

#### 6.3 API 서비스 설정
- [ ] `frontend/src/services/api.ts` 생성
  - Axios 인스턴스 생성
  - 기본 API URL 설정

---

### Phase 7: 메뉴 관련 프론트엔드 (우선순위: 높음)

#### 7.1 메뉴 서비스
- [ ] `frontend/src/services/menuService.ts` 생성
  - `getMenus()` - API 호출
  - `getMenuById(id)` - API 호출

#### 7.2 메뉴 스토어
- [ ] `frontend/src/store/useMenuStore.ts` 생성
  - Zustand 스토어 기본 구조
  - menus 상태
  - fetchMenus 액션 (최소 구현)
  - getMenuById 액션

#### 7.3 MenuCard 컴포넌트
- [ ] `frontend/src/components/MenuCard.tsx` 생성
  - 메뉴 정보 표시 (name, price)
  - 기본 버튼 렌더링
  - addToCart prop 처리

---

### Phase 8: 주문 관련 프론트엔드 (우선순위: 높음)

#### 8.1 주문 서비스
- [ ] `frontend/src/services/orderService.ts` 생성
  - `createOrder(data)` - API 호출
  - `getOrders(filters)` - API 호출

#### 8.2 주문 스토어
- [ ] `frontend/src/store/useOrderStore.ts` 생성
  - Zustand 스토어 기본 구조
  - orders 상태
  - cart 상태
  - createOrder 액션 (최소 구현)
  - addToCart 액션

#### 8.3 Cart 컴포넌트
- [ ] `frontend/src/components/Cart.tsx` 생성
  - 장바구니 아이템 표시
  - 기본 UI 구조

#### 8.4 OrderPage
- [ ] `frontend/src/pages/OrderPage.tsx` 생성
  - 메뉴 목록 표시
  - 장바구니 표시
  - 주문 버튼 (최소 구현)

---

### Phase 9: 테스트 통과 확인 (우선순위: 최고)

#### 9.1 백엔드 테스트 실행
- [ ] `cd backend && npm test` 실행
- [ ] 모든 테스트가 통과하는지 확인
- [ ] 실패하는 테스트가 있다면 최소한의 수정으로 통과시키기

#### 9.2 프론트엔드 테스트 실행
- [ ] `cd frontend && npm test` 실행
- [ ] 모든 테스트가 통과하는지 확인
- [ ] 실패하는 테스트가 있다면 최소한의 수정으로 통과시키기

---

## 🎯 최소 구현 체크리스트

### 백엔드
- [ ] Express 서버가 시작됨
- [ ] 모든 API 라우트가 404가 아닌 응답을 반환
- [ ] GET /api/menus → 빈 배열 반환
- [ ] GET /api/orders → 빈 배열 반환
- [ ] GET /api/admin/dashboard → 기본 객체 반환
- [ ] 모든 테스트 통과

### 프론트엔드
- [ ] React 앱이 렌더링됨
- [ ] MenuCard 컴포넌트가 메뉴 정보를 표시
- [ ] Cart 컴포넌트가 렌더링됨
- [ ] useMenuStore가 동작함
- [ ] useOrderStore가 동작함
- [ ] 모든 테스트 통과

---

## 📝 구현 시 주의사항

### 최소 구현 원칙
1. **테스트 통과 우선**: 완벽한 기능보다 테스트 통과가 우선
2. **하드코딩 허용**: 최소 구현 단계에서는 하드코딩된 값도 허용
3. **에러 처리 최소화**: 기본적인 에러 처리만 구현
4. **검증 로직 최소화**: 필수 검증만 구현

### 예시: 최소 구현 코드

#### 메뉴 목록 조회 (최소 구현)
```typescript
// menuController.ts
export const getAllMenus = async (req: Request, res: Response) => {
  res.json([]) // 빈 배열 반환으로 테스트 통과
}
```

#### 메뉴 생성 (최소 구현)
```typescript
// menuController.ts
export const createMenu = async (req: Request, res: Response) => {
  const menu = {
    id: 'temp-id',
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  res.status(201).json(menu)
}
```

---

## 🚀 실행 순서

1. **데이터베이스 설정** (Phase 1)
2. **백엔드 기본 구조** (Phase 2)
3. **메뉴 API** (Phase 3) → 테스트 실행
4. **주문 API** (Phase 4) → 테스트 실행
5. **관리자 API** (Phase 5) → 테스트 실행
6. **프론트엔드 기본 구조** (Phase 6)
7. **메뉴 프론트엔드** (Phase 7) → 테스트 실행
8. **주문 프론트엔드** (Phase 8) → 테스트 실행
9. **최종 테스트 확인** (Phase 9)

---

## ✅ 완료 기준

- [ ] 모든 백엔드 테스트 통과
- [ ] 모든 프론트엔드 테스트 통과
- [ ] 서버가 정상적으로 시작됨
- [ ] 프론트엔드 앱이 정상적으로 렌더링됨
- [ ] API 엔드포인트가 404가 아닌 응답을 반환

---

**작성일**: 2024-12-16  
**다음 단계**: REFACTOR 단계 (코드 개선 및 리팩토링)

