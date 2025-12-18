# Phase 6-8: 프론트엔드 최소 구현 시나리오

**목표**: 프론트엔드 기본 구조, 메뉴 관련, 주문 관련 기능을 최소한으로 구현하여 테스트를 통과시키기

**원칙**: 
- 테스트를 통과시키는 최소한의 코드만 작성
- 완벽한 UI보다 테스트 통과 우선
- 리팩토링은 REFACTOR 단계에서 진행

---

## 📋 Phase 6: 프론트엔드 기본 구조

### Step 1: React 앱 진입점 생성

#### 1.1 `frontend/src/main.tsx` 생성

**구현 내용:**
- [ ] React 18 createRoot 사용
- [ ] App 컴포넌트 렌더링
- [ ] 기본 스타일 import (선택사항)

**예상 코드:**
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css' // 선택사항

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

### Step 2: 메인 App 컴포넌트 생성

#### 2.1 `frontend/src/App.tsx` 생성

**구현 내용:**
- [ ] React Router 기본 설정
- [ ] 기본 라우트 정의 (HomePage, OrderPage 등)
- [ ] 최소한의 레이아웃 구조

**예상 코드:**
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OrderPage from './pages/OrderPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

**최소 구현:**
- OrderPage 라우트만 설정 (다른 페이지는 나중에 추가)
- 기본 레이아웃은 최소한으로

---

### Step 3: API 서비스 설정

#### 3.1 `frontend/src/services/api.ts` 생성

**구현 내용:**
- [ ] Axios 인스턴스 생성
- [ ] 기본 API URL 설정
- [ ] 요청/응답 인터셉터 (선택사항, 최소 구현에서는 생략)

**예상 코드:**
```typescript
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
```

---

## 📋 Phase 7: 메뉴 관련 프론트엔드

### Step 4: 메뉴 서비스 생성

#### 4.1 `frontend/src/services/menuService.ts` 생성

**구현 내용:**
- [ ] `getMenus()` - API 호출
- [ ] `getMenuById(id)` - API 호출

**예상 코드:**
```typescript
import api from './api'

export interface Menu {
  id: string
  name: string
  description?: string
  price: number
  category: string
  imageUrl?: string
  isAvailable: boolean
  options?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export const getMenus = async (): Promise<Menu[]> => {
  const response = await api.get<Menu[]>('/menus')
  return response.data
}

export const getMenuById = async (id: string): Promise<Menu> => {
  const response = await api.get<Menu>(`/menus/${id}`)
  return response.data
}
```

---

### Step 5: 메뉴 스토어 생성

#### 5.1 `frontend/src/store/useMenuStore.ts` 생성

**구현 내용:**
- [ ] Zustand 스토어 기본 구조
- [ ] menus 상태
- [ ] loading, error 상태
- [ ] fetchMenus 액션 (최소 구현)
- [ ] getMenuById 액션

**예상 코드:**
```typescript
import { create } from 'zustand'
import { getMenus, getMenuById, Menu } from '../services/menuService'

interface MenuStore {
  menus: Menu[]
  loading: boolean
  error: string | null
  fetchMenus: () => Promise<void>
  getMenuById: (id: string) => Menu | undefined
}

export const useMenuStore = create<MenuStore>((set, get) => ({
  menus: [],
  loading: false,
  error: null,
  
  fetchMenus: async () => {
    set({ loading: true, error: null })
    try {
      const menus = await getMenus()
      set({ menus, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch menus', loading: false })
    }
  },
  
  getMenuById: (id: string) => {
    return get().menus.find(menu => menu.id === id)
  },
}))
```

---

### Step 6: MenuCard 컴포넌트 생성

#### 6.1 `frontend/src/components/MenuCard.tsx` 생성

**구현 내용:**
- [ ] 메뉴 정보 표시 (name, price)
- [ ] description 표시 (있는 경우)
- [ ] 기본 버튼 렌더링
- [ ] addToCart prop 처리
- [ ] isAvailable에 따른 버튼 비활성화

**예상 코드:**
```typescript
import React from 'react'
import { Menu } from '../services/menuService'

interface MenuCardProps {
  menu: Menu
  addToCart?: (menu: Menu) => void
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, addToCart }) => {
  return (
    <div className="menu-card">
      <h3>{menu.name}</h3>
      {menu.description && <p>{menu.description}</p>}
      <p>{menu.price.toLocaleString()}원</p>
      <button
        onClick={() => addToCart?.(menu)}
        disabled={!menu.isAvailable}
      >
        담기
      </button>
    </div>
  )
}

export default MenuCard
```

**최소 구현:**
- 기본적인 메뉴 정보만 표시
- 스타일링은 최소한으로

---

## 📋 Phase 8: 주문 관련 프론트엔드

### Step 7: 주문 서비스 생성

#### 7.1 `frontend/src/services/orderService.ts` 생성

**구현 내용:**
- [ ] `createOrder(data)` - API 호출
- [ ] `getOrders(filters)` - API 호출

**예상 코드:**
```typescript
import api from './api'

export interface OrderItem {
  menuId: string
  quantity: number
  customizations?: Record<string, any>
}

export interface CreateOrderRequest {
  customerId?: string
  items: OrderItem[]
}

export interface Order {
  id: string
  customerId: string
  status: string
  totalPrice: number
  items: any[]
  createdAt: string
  updatedAt: string
}

export const createOrder = async (data: CreateOrderRequest): Promise<Order> => {
  const response = await api.post<Order>('/orders', data)
  return response.data
}

export const getOrders = async (filters?: {
  customerId?: string
  status?: string
}): Promise<Order[]> => {
  const response = await api.get<Order[]>('/orders', { params: filters })
  return response.data
}
```

---

### Step 8: 주문 스토어 생성

#### 8.1 `frontend/src/store/useOrderStore.ts` 생성

**구현 내용:**
- [ ] Zustand 스토어 기본 구조
- [ ] cart 상태 (장바구니 아이템)
- [ ] orders 상태
- [ ] addToCart 액션
- [ ] createOrder 액션 (최소 구현)
- [ ] removeFromCart, updateQuantity 등 (최소 구현에서는 선택사항)

**예상 코드:**
```typescript
import { create } from 'zustand'
import { createOrder, getOrders, Order, CreateOrderRequest } from '../services/orderService'
import { Menu } from '../services/menuService'

interface CartItem {
  menu: Menu
  quantity: number
  customizations?: Record<string, any>
}

interface OrderStore {
  cart: CartItem[]
  orders: Order[]
  loading: boolean
  error: string | null
  addToCart: (menu: Menu, quantity?: number, customizations?: Record<string, any>) => void
  removeFromCart: (menuId: string) => void
  updateQuantity: (menuId: string, quantity: number) => void
  clearCart: () => void
  createOrder: (customerId?: string) => Promise<void>
  fetchOrders: (filters?: { customerId?: string; status?: string }) => Promise<void>
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  cart: [],
  orders: [],
  loading: false,
  error: null,
  
  addToCart: (menu, quantity = 1, customizations) => {
    const cart = get().cart
    const existingItem = cart.find(item => item.menu.id === menu.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
      set({ cart: [...cart] })
    } else {
      set({ cart: [...cart, { menu, quantity, customizations }] })
    }
  },
  
  removeFromCart: (menuId) => {
    set({ cart: get().cart.filter(item => item.menu.id !== menuId) })
  },
  
  updateQuantity: (menuId, quantity) => {
    const cart = get().cart
    const item = cart.find(item => item.menu.id === menuId)
    if (item) {
      item.quantity = quantity
      set({ cart: [...cart] })
    }
  },
  
  clearCart: () => {
    set({ cart: [] })
  },
  
  createOrder: async (customerId) => {
    set({ loading: true, error: null })
    try {
      const cart = get().cart
      const items = cart.map(item => ({
        menuId: item.menu.id,
        quantity: item.quantity,
        customizations: item.customizations,
      }))
      
      const order = await createOrder({ customerId, items })
      set({ orders: [...get().orders, order], cart: [], loading: false })
    } catch (error) {
      set({ error: 'Failed to create order', loading: false })
    }
  },
  
  fetchOrders: async (filters) => {
    set({ loading: true, error: null })
    try {
      const orders = await getOrders(filters)
      set({ orders, loading: false })
    } catch (error) {
      set({ error: 'Failed to fetch orders', loading: false })
    }
  },
}))
```

---

### Step 9: Cart 컴포넌트 생성

#### 9.1 `frontend/src/components/Cart.tsx` 생성

**구현 내용:**
- [ ] 장바구니 아이템 표시
- [ ] 총 금액 계산 및 표시
- [ ] 빈 장바구니 메시지
- [ ] 주문하기 버튼

**예상 코드:**
```typescript
import React from 'react'
import { useOrderStore } from '../store/useOrderStore'

const Cart: React.FC = () => {
  const { cart, clearCart, createOrder } = useOrderStore()
  
  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.menu.price * item.quantity)
  }, 0)
  
  if (cart.length === 0) {
    return <div>장바구니가 비어있습니다.</div>
  }
  
  return (
    <div className="cart">
      <h2>장바구니</h2>
      {cart.map((item) => (
        <div key={item.menu.id}>
          <span>{item.menu.name} x {item.quantity}</span>
          <span>{(item.menu.price * item.quantity).toLocaleString()}원</span>
        </div>
      ))}
      <div>
        <strong>총 금액: {totalPrice.toLocaleString()}원</strong>
      </div>
      <button onClick={() => createOrder()}>주문하기</button>
    </div>
  )
}

export default Cart
```

---

### Step 10: OrderPage 생성

#### 10.1 `frontend/src/pages/OrderPage.tsx` 생성

**구현 내용:**
- [ ] 메뉴 목록 표시
- [ ] 장바구니 표시
- [ ] 주문 버튼 (최소 구현)
- [ ] 로딩 상태 처리

**예상 코드:**
```typescript
import React, { useEffect } from 'react'
import { useMenuStore } from '../store/useMenuStore'
import { useOrderStore } from '../store/useOrderStore'
import MenuCard from '../components/MenuCard'
import Cart from '../components/Cart'

const OrderPage: React.FC = () => {
  const { menus, loading, fetchMenus } = useMenuStore()
  const { addToCart } = useOrderStore()
  
  useEffect(() => {
    fetchMenus()
  }, [fetchMenus])
  
  if (loading) {
    return <div>로딩 중...</div>
  }
  
  return (
    <div className="order-page">
      <h1>주문하기</h1>
      <div className="menu-list">
        {menus.map((menu) => (
          <MenuCard
            key={menu.id}
            menu={menu}
            addToCart={addToCart}
          />
        ))}
      </div>
      <Cart />
    </div>
  )
}

export default OrderPage
```

---

## 📁 생성될 파일 구조

```
frontend/src/
├── main.tsx                    ✅ React 앱 진입점
├── App.tsx                     ✅ 메인 App 컴포넌트
├── services/
│   ├── api.ts                  ✅ Axios 인스턴스
│   ├── menuService.ts          ✅ 메뉴 API 서비스
│   └── orderService.ts         ✅ 주문 API 서비스
├── store/
│   ├── useMenuStore.ts         ✅ 메뉴 스토어
│   └── useOrderStore.ts        ✅ 주문 스토어
├── components/
│   ├── MenuCard.tsx            ✅ 메뉴 카드 컴포넌트
│   └── Cart.tsx                ✅ 장바구니 컴포넌트
├── pages/
│   └── OrderPage.tsx           ✅ 주문 페이지
└── styles/
    └── index.css               ✅ (선택사항) 기본 스타일
```

---

## ✅ 완료 기준

### Phase 6: 프론트엔드 기본 구조
- [ ] `main.tsx` 생성 및 React 앱 렌더링
- [ ] `App.tsx` 생성 및 React Router 설정
- [ ] `services/api.ts` 생성 및 Axios 인스턴스 설정
- [ ] 앱이 정상적으로 실행됨 (`npm run dev`)

### Phase 7: 메뉴 관련 프론트엔드
- [ ] `services/menuService.ts` 생성 및 API 호출 함수
- [ ] `store/useMenuStore.ts` 생성 및 Zustand 스토어
- [ ] `components/MenuCard.tsx` 생성 및 메뉴 정보 표시
- [ ] 메뉴 목록이 정상적으로 표시됨

### Phase 8: 주문 관련 프론트엔드
- [ ] `services/orderService.ts` 생성 및 API 호출 함수
- [ ] `store/useOrderStore.ts` 생성 및 Zustand 스토어
- [ ] `components/Cart.tsx` 생성 및 장바구니 표시
- [ ] `pages/OrderPage.tsx` 생성 및 주문 페이지 표시
- [ ] 장바구니 기능이 정상적으로 동작함

### 공통
- [ ] TypeScript 컴파일 오류 없음
- [ ] 모든 컴포넌트가 정상적으로 렌더링됨
- [ ] API 연동이 정상적으로 동작함

---

## 🔍 검증 방법

### 1. 개발 서버 실행
```bash
cd frontend
npm run dev
```

**예상 결과:**
- 브라우저에서 http://localhost:3000 접속 가능
- OrderPage가 정상적으로 렌더링됨

### 2. 컴포넌트 테스트
```bash
cd frontend
npm test
```

**예상 결과:**
- 모든 테스트가 통과하거나 스킵됨
- 컴포넌트가 정상적으로 렌더링됨

### 3. 기능 테스트
- 메뉴 목록이 표시됨
- 메뉴 카드의 "담기" 버튼 클릭 시 장바구니에 추가됨
- 장바구니에 아이템이 표시됨
- 총 금액이 정상적으로 계산됨
- "주문하기" 버튼 클릭 시 주문 생성됨

---

## 📝 주의사항

### 최소 구현 원칙
1. **테스트 통과 우선**: 완벽한 UI보다 테스트 통과가 우선
2. **기본 스타일링**: 최소한의 스타일만 적용
3. **에러 처리 최소화**: 기본적인 에러 처리만 구현
4. **타입 안정성**: TypeScript 타입을 명확히 정의

### 향후 확장 가능한 기능
- 상세한 에러 메시지 표시
- 로딩 스피너 및 스켈레톤 UI
- 카테고리 필터링
- 메뉴 옵션 선택 UI
- 주문 내역 페이지
- 관리자 페이지

---

## 🚀 다음 단계

Phase 6-8 완료 후:
- Phase 9: 테스트 통과 확인
- 실제 백엔드 API 연동 테스트
- UI/UX 개선
- 추가 페이지 구현 (주문 내역, 관리자 등)

---

**작성일**: 2024-12-16  
**예상 소요 시간**: 2-3시간  
**난이도**: ⭐⭐⭐ (보통)

