# 🧪 OrderBean 테스트 전략

## 테스트 피라미드

```
        /\
       /  \
      / E2E \          (소수)
     /--------\
    /          \
   / Integration \     (중간)
  /----------------\
 /                  \
/   Unit Tests        \  (다수)
\----------------------/
```

## 테스트 유형

### 1. 단위 테스트 (Unit Tests)
- **대상**: 개별 함수, 컴포넌트, 서비스
- **목표**: 각 단위의 독립적인 동작 검증
- **도구**: Jest (Backend), Vitest (Frontend)

### 2. 통합 테스트 (Integration Tests)
- **대상**: 여러 모듈 간의 상호작용
- **목표**: API 엔드포인트와 데이터베이스 연동 검증
- **도구**: Supertest

### 3. E2E 테스트 (End-to-End Tests)
- **대상**: 전체 사용자 플로우
- **목표**: 실제 사용자 시나리오 검증
- **도구**: (향후 추가 예정)

## RED 단계 테스트 케이스

현재 프로젝트는 **RED 단계**에 있습니다. 모든 테스트는 의도적으로 실패하도록 작성되었습니다.

### 백엔드 테스트

#### 메뉴 API (`menu.test.ts`)
- ✅ GET /api/menus - 메뉴 목록 조회
- ✅ POST /api/menus - 메뉴 생성
- ✅ GET /api/menus/:id - 메뉴 조회
- ✅ PUT /api/menus/:id - 메뉴 수정
- ✅ DELETE /api/menus/:id - 메뉴 삭제
- ✅ PATCH /api/menus/:id/toggle-availability - 품절 처리

#### 주문 API (`order.test.ts`)
- ✅ POST /api/orders - 주문 생성
- ✅ GET /api/orders - 주문 목록 조회
- ✅ GET /api/orders/:id - 주문 조회
- ✅ PATCH /api/orders/:id/status - 주문 상태 업데이트

#### 관리자 API (`admin.test.ts`)
- ✅ GET /api/admin/dashboard - 대시보드 통계
- ✅ GET /api/admin/recent-orders - 최근 주문

### 프론트엔드 테스트

#### 컴포넌트 테스트
- ✅ MenuCard - 메뉴 카드 렌더링 및 상호작용
- ✅ Cart - 장바구니 기능

#### 페이지 테스트
- ✅ OrderPage - 주문 페이지 기능

#### 스토어 테스트
- ✅ useMenuStore - 메뉴 상태 관리
- ✅ useOrderStore - 주문 상태 관리

## 다음 단계: GREEN

RED 테스트를 통과시키기 위해 다음을 구현해야 합니다:

1. **백엔드**
   - API 라우트 구현
   - 서비스 로직 구현
   - 데이터베이스 연동

2. **프론트엔드**
   - 컴포넌트 구현
   - 스토어 구현
   - API 연동

## 테스트 실행 가이드

### 백엔드
```bash
cd backend
npm install
npm test
```

### 프론트엔드
```bash
cd frontend
npm install
npm test
```

## 커버리지 목표

- **단위 테스트**: 80% 이상
- **통합 테스트**: 주요 플로우 100%
- **E2E 테스트**: 핵심 사용자 시나리오 100%

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024-12-16

