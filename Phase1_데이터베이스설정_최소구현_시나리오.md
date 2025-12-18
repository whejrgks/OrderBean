# Phase 1: 데이터베이스 설정 - 최소 구현 시나리오

**목표**: Prisma 스키마를 생성하고 기본 구조를 설정하여 GREEN 단계의 데이터베이스 기반을 마련

**원칙**: 
- 실제 데이터베이스 연결 없이도 스키마 파일 생성 가능
- 최소한의 필수 필드만 포함
- 테스트 통과를 위한 기본 구조만 구현

---

## 📋 구현 단계

### Step 1: Prisma 폴더 및 스키마 파일 생성

#### 1.1 폴더 구조 생성
- [ ] `backend/prisma/` 디렉토리 생성
- [ ] `backend/prisma/schema.prisma` 파일 생성

#### 1.2 기본 Prisma 설정
- [ ] 데이터소스 설정 (PostgreSQL)
- [ ] Generator 설정 (Prisma Client)

**예상 코드 구조:**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

### Step 2: OrderStatus Enum 정의

#### 2.1 Enum 생성
- [ ] `OrderStatus` enum 정의
- [ ] 다음 값 포함:
  - `PENDING` - 주문 접수
  - `PREPARING` - 제조 중
  - `READY` - 준비 완료
  - `COMPLETED` - 픽업 완료
  - `CANCELLED` - 취소됨

**예상 코드:**
```prisma
enum OrderStatus {
  PENDING
  PREPARING
  READY
  COMPLETED
  CANCELLED
}
```

---

### Step 3: Menu 모델 정의

#### 3.1 Menu 모델 생성
- [ ] 기본 필드 정의:
  - `id` (String, @id, @default(uuid()))
  - `name` (String)
  - `description` (String?, optional)
  - `price` (Int)
  - `category` (String)
  - `imageUrl` (String?, optional)
  - `isAvailable` (Boolean, @default(true))
  - `options` (Json?, optional) - 커스터마이징 옵션
  - `createdAt` (DateTime, @default(now()))
  - `updatedAt` (DateTime, @updatedAt)

- [ ] 관계 설정:
  - `orderItems` (OrderItem[])

**예상 코드:**
```prisma
model Menu {
  id          String      @id @default(uuid())
  name        String
  description String?
  price       Int
  category    String
  imageUrl    String?
  isAvailable Boolean     @default(true)
  options     Json?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  orderItems  OrderItem[]
}
```

---

### Step 4: Order 모델 정의

#### 4.1 Order 모델 생성
- [ ] 기본 필드 정의:
  - `id` (String, @id, @default(uuid()))
  - `customerId` (String) - 고객 식별자 (최소 구현에서는 단순 문자열)
  - `status` (OrderStatus, @default(PENDING))
  - `totalPrice` (Int)
  - `createdAt` (DateTime, @default(now()))
  - `updatedAt` (DateTime, @updatedAt)

- [ ] 관계 설정:
  - `items` (OrderItem[])

**예상 코드:**
```prisma
model Order {
  id         String       @id @default(uuid())
  customerId String
  status     OrderStatus  @default(PENDING)
  totalPrice Int
  createdAt  DateTime     @default(now())
  updatedAt  DateTime     @updatedAt
  items      OrderItem[]
}
```

---

### Step 5: OrderItem 모델 정의

#### 5.1 OrderItem 모델 생성
- [ ] 기본 필드 정의:
  - `id` (String, @id, @default(uuid()))
  - `orderId` (String) - Foreign Key
  - `menuId` (String) - Foreign Key
  - `quantity` (Int)
  - `price` (Int) - 주문 시점의 가격 (메뉴 가격 변경 대비)
  - `customizations` (Json?, optional) - 커스터마이징 옵션
  - `createdAt` (DateTime, @default(now()))

- [ ] 관계 설정:
  - `order` (Order, relation)
  - `menu` (Menu, relation)

- [ ] Foreign Key 제약조건:
  - `@relation` 어노테이션으로 관계 명시
  - `onDelete: Cascade` 설정 (주문 삭제 시 항목도 삭제)

**예상 코드:**
```prisma
model OrderItem {
  id            String    @id @default(uuid())
  orderId       String
  menuId        String
  quantity      Int
  price         Int
  customizations Json?
  createdAt     DateTime  @default(now())
  order         Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  menu          Menu      @relation(fields: [menuId], references: [id])
  
  @@index([orderId])
  @@index([menuId])
}
```

---

### Step 6: 관계 설정 완료

#### 6.1 양방향 관계 확인
- [ ] Menu ↔ OrderItem 관계 확인
- [ ] Order ↔ OrderItem 관계 확인
- [ ] 모든 Foreign Key 제약조건 확인

---

### Step 7: Prisma Client 생성 (선택사항)

#### 7.1 Client 생성
- [ ] `npm run prisma:generate` 실행
  - **주의**: 실제 데이터베이스 연결 없이도 가능
  - 스키마 파일만으로 Prisma Client 타입 생성 가능

**실행 명령:**
```bash
cd backend
npm run prisma:generate
```

---

### Step 8: 마이그레이션 준비 (선택사항, DB 연결 필요)

#### 8.1 마이그레이션 파일 생성 준비
- [ ] `.env` 파일에 `DATABASE_URL` 설정 (나중에)
- [ ] `npm run prisma:migrate` 실행 준비
  - **주의**: 실제 PostgreSQL 데이터베이스 연결이 필요
  - 최소 구현 단계에서는 스키마 파일만 생성해도 충분

**마이그레이션 실행 (DB 연결 후):**
```bash
cd backend
npm run prisma:migrate
```

---

## 📁 생성될 파일 구조

```
backend/
└── prisma/
    └── schema.prisma    # Prisma 스키마 파일
```

---

## ✅ 완료 기준

### 필수 완료 항목
- [ ] `backend/prisma/schema.prisma` 파일 생성
- [ ] Generator 및 Datasource 설정 완료
- [ ] OrderStatus enum 정의 완료
- [ ] Menu 모델 정의 완료
- [ ] Order 모델 정의 완료
- [ ] OrderItem 모델 정의 완료
- [ ] 모든 관계 설정 완료
- [ ] 스키마 파일 문법 오류 없음

### 선택 완료 항목 (DB 연결 후)
- [ ] Prisma Client 생성 (`npm run prisma:generate`)
- [ ] 초기 마이그레이션 실행 (`npm run prisma:migrate`)
- [ ] 데이터베이스 테이블 생성 확인

---

## 🔍 검증 방법

### 1. 스키마 파일 검증
```bash
cd backend
npx prisma validate
```

### 2. Prisma Client 생성 테스트
```bash
cd backend
npm run prisma:generate
# 성공 시: Prisma Client generated successfully
```

### 3. 스키마 포맷 확인
```bash
cd backend
npx prisma format
```

---

## 📝 주의사항

### 최소 구현 원칙
1. **스키마 파일만 생성**: 실제 DB 연결 없이도 가능
2. **필수 필드만 포함**: 최소한의 필드로 시작
3. **타입 안정성**: Prisma의 타입 시스템 활용
4. **관계 명시**: Foreign Key 관계를 명확히 정의

### 향후 확장 가능한 필드
- Menu: `tags`, `nutritionInfo` 등
- Order: `paymentMethod`, `deliveryAddress` 등
- OrderItem: `notes`, `specialInstructions` 등

---

## 🚀 다음 단계

Phase 1 완료 후:
- Phase 2: 백엔드 기본 인프라 구현
- 데이터베이스 연결 설정 (`src/config/database.ts`)
- Prisma Client 사용 준비 완료

---

**작성일**: 2024-12-16  
**예상 소요 시간**: 15-30분  
**난이도**: ⭐⭐ (쉬움)

