# 🎨 OrderBean 디자인 문서

## 시스템 아키텍처

### 전체 구조

```
┌─────────────┐
│   Client    │  (React + TypeScript)
│  (Browser)  │
└──────┬──────┘
       │ HTTP/REST API
       │
┌──────▼──────┐
│   Backend  │  (Node.js + Express)
│   Server   │
└──────┬──────┘
       │
┌──────▼──────┐
│  Database   │  (PostgreSQL)
│  (Prisma)   │
└─────────────┘
```

## 데이터베이스 스키마

### ERD (Entity Relationship Diagram)

```
Menu (메뉴)
├── id (UUID)
├── name
├── description
├── price
├── category
├── imageUrl
├── isAvailable
└── options (JSON)

Order (주문)
├── id (UUID)
├── customerId
├── status (enum)
├── totalPrice
└── items (1:N)

OrderItem (주문 항목)
├── id (UUID)
├── orderId (FK)
├── menuId (FK)
├── quantity
├── customizations (JSON)
└── price
```

### 관계
- `Menu` 1:N `OrderItem`
- `Order` 1:N `OrderItem`

## 기술 스택

### Frontend
- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구
- **React Router** - 라우팅
- **Zustand** - 상태 관리
- **Axios** - HTTP 클라이언트

### Backend
- **Node.js** - 런타임
- **Express** - 웹 프레임워크
- **TypeScript** - 타입 안정성
- **Prisma** - ORM
- **PostgreSQL** - 데이터베이스

## 주요 기능 플로우

### 주문 플로우

```
1. 고객이 메뉴 선택
   ↓
2. 장바구니에 추가
   ↓
3. 주문 생성 (POST /api/orders)
   ↓
4. 주문 상태: PENDING
   ↓
5. 관리자가 주문 확인
   ↓
6. 주문 상태: PREPARING
   ↓
7. 제조 완료
   ↓
8. 주문 상태: READY
   ↓
9. 고객 픽업
   ↓
10. 주문 상태: COMPLETED
```

### 재주문 플로우

```
1. 주문 내역에서 완료된 주문 선택
   ↓
2. "재주문" 버튼 클릭
   ↓
3. 해당 주문의 모든 항목이 장바구니에 추가
   ↓
4. 주문 페이지로 이동
   ↓
5. 필요시 수정 후 주문
```

## UI/UX 디자인 원칙

### 색상 팔레트
- **Primary**: #3498db (파란색) - 주요 액션 버튼
- **Success**: #27ae60 (초록색) - 성공 상태, 완료
- **Warning**: #f39c12 (주황색) - 대기 중
- **Danger**: #e74c3c (빨간색) - 삭제, 취소
- **Neutral**: #95a5a6 (회색) - 비활성, 완료됨

### 타이포그래피
- **제목**: 2rem, 굵게
- **부제목**: 1.5rem, 굵게
- **본문**: 1rem, 일반
- **작은 텍스트**: 0.875rem

### 간격 시스템
- **작은 간격**: 0.5rem
- **기본 간격**: 1rem
- **큰 간격**: 2rem

## 성능 최적화

### 프론트엔드
- 코드 스플리팅 (React Router)
- 이미지 지연 로딩
- 상태 관리 최적화 (Zustand)

### 백엔드
- 데이터베이스 인덱싱
- 쿼리 최적화
- 에러 핸들링

## 보안 고려사항

- HTTPS 통신
- 입력 데이터 검증
- SQL Injection 방지 (Prisma ORM)
- CORS 설정

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024-12-16

