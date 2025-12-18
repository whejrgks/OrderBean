# Phase 3-4: 메뉴 및 주문 API - 최소 구현 시나리오

**목표**: 메뉴 API와 주문 API를 최소한으로 구현하여 테스트를 통과시키고, 이미지의 UI 요구사항을 반영

**원칙**: 
- 테스트를 통과시키는 최소한의 코드만 작성
- 실제 DB 연동 없이도 동작하도록 구현 (최소 구현)
- 이미지의 옵션 기능 고려 (샷 추가, 시럽 추가 등)

---

## 📋 Phase 3: 메뉴 API 구현

### Step 1: 메뉴 서비스 생성

#### 1.1 `backend/src/services/menuService.ts` 생성

**구현 내용:**
- [ ] `getAllMenus()` - 빈 배열 반환 (최소 구현)
- [ ] `getMenuById(id)` - 기본 구조 (나중에 DB 연동)
- [ ] `createMenu(data)` - 기본 구조
- [ ] `updateMenu(id, data)` - 기본 구조
- [ ] `deleteMenu(id)` - 기본 구조
- [ ] `toggleAvailability(id)` - 기본 구조

**예상 코드:**
```typescript
// 최소 구현: 빈 배열 반환으로 테스트 통과
export const getAllMenus = async () => {
  return []
}

// 나머지는 기본 구조만 (나중에 DB 연동)
export const getMenuById = async (id: string) => {
  // 최소 구현에서는 null 반환
  return null
}

export const createMenu = async (data: any) => {
  // 최소 구현: 요청 데이터를 그대로 반환 (임시 ID 추가)
  return {
    id: 'temp-id',
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const updateMenu = async (id: string, data: any) => {
  // 최소 구현: 업데이트된 데이터 반환
  return {
    id,
    ...data,
    updatedAt: new Date(),
  }
}

export const deleteMenu = async (id: string) => {
  // 최소 구현: 성공 응답만
  return { success: true }
}

export const toggleAvailability = async (id: string) => {
  // 최소 구현: 토글된 상태 반환
  return {
    id,
    isAvailable: true,
  }
}
```

---

### Step 2: 메뉴 컨트롤러 생성

#### 2.1 `backend/src/controllers/menuController.ts` 생성

**구현 내용:**
- [ ] `GET /api/menus` → 빈 배열 반환 (200 OK)
- [ ] `GET /api/menus/:id` → 404 또는 기본 응답
- [ ] `POST /api/menus` → 생성된 메뉴 반환 (201 Created)
- [ ] `PUT /api/menus/:id` → 업데이트된 메뉴 반환 (200 OK)
- [ ] `DELETE /api/menus/:id` → 성공 응답 (200 OK)
- [ ] `PATCH /api/menus/:id/toggle-availability` → 토글된 상태 반환 (200 OK)

**예상 코드:**
```typescript
import { Request, Response } from 'express'
import * as menuService from '../services/menuService'

export const getAllMenus = async (req: Request, res: Response) => {
  const menus = await menuService.getAllMenus()
  res.json(menus)
}

export const getMenuById = async (req: Request, res: Response) => {
  const { id } = req.params
  const menu = await menuService.getMenuById(id)
  
  if (!menu) {
    return res.status(404).json({ error: 'Menu not found' })
  }
  
  res.json(menu)
}

export const createMenu = async (req: Request, res: Response) => {
  const menu = await menuService.createMenu(req.body)
  res.status(201).json(menu)
}

export const updateMenu = async (req: Request, res: Response) => {
  const { id } = req.params
  const menu = await menuService.updateMenu(id, req.body)
  res.json(menu)
}

export const deleteMenu = async (req: Request, res: Response) => {
  const { id } = req.params
  await menuService.deleteMenu(id)
  res.json({ success: true })
}

export const toggleAvailability = async (req: Request, res: Response) => {
  const { id } = req.params
  const menu = await menuService.toggleAvailability(id)
  res.json(menu)
}
```

---

### Step 3: 메뉴 라우트 생성

#### 3.1 `backend/src/routes/menuRoutes.ts` 생성

**구현 내용:**
- [ ] Express Router 생성
- [ ] 모든 메뉴 엔드포인트 라우트 정의
- [ ] 컨트롤러 함수 연결

**예상 코드:**
```typescript
import { Router } from 'express'
import * as menuController from '../controllers/menuController'

const router = Router()

router.get('/', menuController.getAllMenus)
router.get('/:id', menuController.getMenuById)
router.post('/', menuController.createMenu)
router.put('/:id', menuController.updateMenu)
router.delete('/:id', menuController.deleteMenu)
router.patch('/:id/toggle-availability', menuController.toggleAvailability)

export default router
```

---

### Step 4: 메인 앱에 메뉴 라우트 등록

#### 4.1 `backend/src/index.ts` 수정

**구현 내용:**
- [ ] 메뉴 라우트 import
- [ ] `/api/menus` 경로에 라우트 등록

**추가할 코드:**
```typescript
import menuRoutes from './routes/menuRoutes'

// API 라우트 등록
app.use('/api/menus', menuRoutes)
```

---

## 📋 Phase 4: 주문 API 구현

### Step 5: 주문 서비스 생성

#### 5.1 `backend/src/services/orderService.ts` 생성

**구현 내용:**
- [ ] `createOrder(data)` - 기본 구조 (이미지의 옵션 기능 고려)
- [ ] `getAllOrders(filters)` - 빈 배열 반환 (최소 구현)
- [ ] `getOrderById(id)` - 기본 구조
- [ ] `updateOrderStatus(id, status)` - 기본 구조

**예상 코드:**
```typescript
// 최소 구현: 빈 배열 반환
export const getAllOrders = async (filters?: any) => {
  return []
}

export const getOrderById = async (id: string) => {
  // 최소 구현에서는 null 반환
  return null
}

export const createOrder = async (data: {
  customerId?: string
  items: Array<{
    menuId: string
    quantity: number
    customizations?: any  // 이미지의 옵션 (샷 추가, 시럽 추가 등)
  }>
}) => {
  // 최소 구현: 주문 데이터를 그대로 반환 (임시 ID 및 계산된 총액 추가)
  const totalPrice = 0 // 나중에 실제 계산 로직 추가
  
  return {
    id: 'temp-order-id',
    customerId: data.customerId || 'anonymous',
    status: 'PENDING',
    totalPrice,
    items: data.items.map(item => ({
      id: 'temp-item-id',
      menuId: item.menuId,
      quantity: item.quantity,
      price: 0, // 나중에 실제 가격 계산
      customizations: item.customizations || null,
    })),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const updateOrderStatus = async (id: string, status: string) => {
  // 최소 구현: 업데이트된 주문 반환
  return {
    id,
    status,
    updatedAt: new Date(),
  }
}
```

**이미지 요구사항 반영:**
- `customizations` 필드로 옵션 저장 (샷 추가, 시럽 추가 등)
- 주문 항목에 옵션 정보 포함

---

### Step 6: 주문 컨트롤러 생성

#### 6.1 `backend/src/controllers/orderController.ts` 생성

**구현 내용:**
- [ ] `POST /api/orders` → 생성된 주문 반환 (201 Created)
- [ ] `GET /api/orders` → 빈 배열 반환 (200 OK)
- [ ] `GET /api/orders/:id` → 주문 반환 또는 404
- [ ] `PATCH /api/orders/:id/status` → 업데이트된 주문 반환 (200 OK)

**예상 코드:**
```typescript
import { Request, Response } from 'express'
import * as orderService from '../services/orderService'

export const createOrder = async (req: Request, res: Response) => {
  const order = await orderService.createOrder(req.body)
  res.status(201).json(order)
}

export const getAllOrders = async (req: Request, res: Response) => {
  const { customerId, status } = req.query
  const filters = { customerId, status }
  const orders = await orderService.getAllOrders(filters)
  res.json(orders)
}

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params
  const order = await orderService.getOrderById(id)
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' })
  }
  
  res.json(order)
}

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params
  const { status } = req.body
  const order = await orderService.updateOrderStatus(id, status)
  res.json(order)
}
```

---

### Step 7: 주문 라우트 생성

#### 7.1 `backend/src/routes/orderRoutes.ts` 생성

**구현 내용:**
- [ ] Express Router 생성
- [ ] 모든 주문 엔드포인트 라우트 정의
- [ ] 컨트롤러 함수 연결

**예상 코드:**
```typescript
import { Router } from 'express'
import * as orderController from '../controllers/orderController'

const router = Router()

router.post('/', orderController.createOrder)
router.get('/', orderController.getAllOrders)
router.get('/:id', orderController.getOrderById)
router.patch('/:id/status', orderController.updateOrderStatus)

export default router
```

---

### Step 8: 메인 앱에 주문 라우트 등록

#### 8.1 `backend/src/index.ts` 수정

**구현 내용:**
- [ ] 주문 라우트 import
- [ ] `/api/orders` 경로에 라우트 등록

**추가할 코드:**
```typescript
import orderRoutes from './routes/orderRoutes'

// API 라우트 등록
app.use('/api/orders', orderRoutes)
```

---

## 📁 생성될 파일 구조

```
backend/src/
├── services/
│   ├── menuService.ts      ✅ 메뉴 서비스
│   └── orderService.ts     ✅ 주문 서비스
├── controllers/
│   ├── menuController.ts   ✅ 메뉴 컨트롤러
│   └── orderController.ts  ✅ 주문 컨트롤러
├── routes/
│   ├── menuRoutes.ts       ✅ 메뉴 라우트
│   └── orderRoutes.ts      ✅ 주문 라우트
└── index.ts                ✅ (수정) 라우트 등록
```

---

## ✅ 완료 기준

### Phase 3: 메뉴 API
- [ ] `GET /api/menus` → 빈 배열 반환 (200 OK)
- [ ] `GET /api/menus/:id` → 404 또는 메뉴 반환
- [ ] `POST /api/menus` → 생성된 메뉴 반환 (201 Created)
- [ ] `PUT /api/menus/:id` → 업데이트된 메뉴 반환 (200 OK)
- [ ] `DELETE /api/menus/:id` → 성공 응답 (200 OK)
- [ ] `PATCH /api/menus/:id/toggle-availability` → 토글된 상태 반환 (200 OK)

### Phase 4: 주문 API
- [ ] `POST /api/orders` → 생성된 주문 반환 (201 Created)
- [ ] `GET /api/orders` → 빈 배열 반환 (200 OK)
- [ ] `GET /api/orders/:id` → 주문 반환 또는 404
- [ ] `PATCH /api/orders/:id/status` → 업데이트된 주문 반환 (200 OK)

### 공통
- [ ] 모든 라우트가 404가 아닌 응답 반환
- [ ] TypeScript 컴파일 오류 없음
- [ ] 서버가 정상적으로 시작됨

---

## 🎨 이미지 요구사항 반영

### 메뉴 옵션 기능
이미지에서 확인된 옵션:
- "샷 추가 (+500원)"
- "시럽 추가 (+0원)"

**구현 방식:**
- Menu 모델의 `options` 필드 (Json 타입)에 옵션 정보 저장
- OrderItem 모델의 `customizations` 필드 (Json 타입)에 선택된 옵션 저장

**예시 데이터 구조:**
```typescript
// Menu.options 예시
{
  "shots": { "name": "샷 추가", "price": 500 },
  "syrup": { "name": "시럽 추가", "price": 0 }
}

// OrderItem.customizations 예시
{
  "shots": true,  // 샷 추가 선택
  "syrup": false  // 시럽 추가 미선택
}
```

---

## 🔍 검증 방법

### 1. 메뉴 API 테스트
```bash
# 메뉴 목록 조회
curl http://localhost:5000/api/menus
# 예상: []

# 메뉴 생성
curl -X POST http://localhost:5000/api/menus \
  -H "Content-Type: application/json" \
  -d '{"name":"아메리카노","price":4000,"category":"커피"}'
# 예상: 생성된 메뉴 객체
```

### 2. 주문 API 테스트
```bash
# 주문 목록 조회
curl http://localhost:5000/api/orders
# 예상: []

# 주문 생성
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "menuId": "menu-1",
        "quantity": 1,
        "customizations": {"shots": true}
      }
    ]
  }'
# 예상: 생성된 주문 객체
```

---

## 📝 주의사항

### 최소 구현 원칙
1. **테스트 통과 우선**: 404가 아닌 응답만 반환하면 됨
2. **하드코딩 허용**: 임시 ID나 기본값 사용 가능
3. **DB 연동 제외**: 실제 데이터베이스 연동은 나중에 추가
4. **옵션 기능 준비**: 이미지의 옵션 기능을 고려한 구조만 준비

### 향후 확장
- 실제 Prisma를 사용한 DB 연동
- 메뉴 가격 및 옵션 가격 계산 로직
- 주문 총액 계산 로직
- 메뉴 존재 여부 및 가용성 검증
- 주문 상태 검증

---

## 🚀 다음 단계

Phase 3-4 완료 후:
- Phase 5: 관리자 API 구현
- 실제 데이터베이스 연동
- 가격 계산 로직 구현

---

**작성일**: 2024-12-16  
**예상 소요 시간**: 1-2시간  
**난이도**: ⭐⭐⭐ (보통)

