# 📘 Product Requirements Document (PRD)

## 1. 제품 개요 (Overview)

### 제품명

**OrderBean**

### 한 문장 문제 진술문

바쁜 직장인과 단골 고객은 카페 대기 시간과 복잡한 커스터마이징, 주문 이력 관리의 불편함으로 인해 커피를 빠르고 효율적으로 주문하지 못하고 있다.

### 제품 목표

OrderBean은 커피 주문 과정을 단순화하고 대기 시간을 최소화하여 바쁜 직장인들이 일상 속 시간을 절약할 수 있도록 돕는 웹 기반 커피 주문 서비스이다.

---

## 1-1. 프로젝트 폴더 구조 (Project Structure)

```
OrderBean/
├── frontend/                 # 프론트엔드 애플리케이션
│   ├── src/
│   │   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── pages/           # 페이지 컴포넌트
│   │   ├── hooks/           # 커스텀 훅
│   │   ├── services/        # API 서비스
│   │   ├── store/           # 상태 관리
│   │   ├── utils/           # 유틸리티 함수
│   │   └── styles/          # 스타일 파일
│   ├── public/              # 정적 파일
│   └── package.json
│
├── backend/                  # 백엔드 API 서버
│   ├── src/
│   │   ├── controllers/     # 컨트롤러
│   │   ├── models/          # 데이터 모델
│   │   ├── routes/          # 라우트 정의
│   │   ├── services/        # 비즈니스 로직
│   │   ├── middleware/      # 미들웨어
│   │   ├── config/          # 설정 파일
│   │   └── utils/           # 유틸리티 함수
│   ├── tests/               # 테스트 파일
│   └── package.json
│
├── database/                 # 데이터베이스 관련
│   ├── migrations/          # 마이그레이션 파일
│   └── seeds/               # 시드 데이터
│
├── docs/                     # 문서
│   ├── api/                 # API 문서
│   └── design/              # 디자인 문서
│
├── .gitignore
├── README.md
└── package.json             # 루트 패키지 (모노레포 설정)
```

---

## 2. 목표 사용자 (Target Users)

* **바쁜 직장인**

  * 출근 전·업무 중 빠른 커피 주문 필요

  * 반복 주문, 대기 시간 최소화 요구

* **단골 고객**

  * 항상 같은 메뉴와 옵션 선호

  * 재주문 및 히스토리 관리 중요

* **카페 관리자**

  * 주문 처리 효율 개선

  * 메뉴 및 매출 관리 필요

---

## 3. 핵심 성공 지표 (Success Metrics)

* 평균 주문 완료 시간 ≤ **30초**

* 재주문 기능 사용 비율 ≥ **60%**

* 출근 시간대(08~10시) 주문 실패율 ≤ **1%**

* 관리자 메뉴 관리 작업 소요 시간 ≤ **5분**

---

## 4. 기능적 요구사항 (Functional Requirements)

### FR-1. 간편 커피 주문 및 결제 (고객)

* 즐겨찾기 주문 저장

* 최소 클릭으로 주문 및 결제

* 다양한 커스터마이징 옵션 지원

### FR-2. 주문 히스토리 및 재주문 (고객)

* 과거 주문 자동 저장

* 동일 주문 원클릭 재주문

* 날짜·메뉴 기준 조회 가능

### FR-3. 실시간 주문 상태 확인 (고객)

* 주문 접수 / 제조 중 / 준비 완료 상태 표시

* 상태 변경 시 즉시 반영

### FR-4. 메뉴·가격·옵션 관리 (관리자)

* 메뉴 등록, 수정, 삭제

* 가격 및 커스터마이징 옵션 설정

* 품절/비활성화 처리

### FR-5. 주문 및 매출 관리 대시보드 (관리자)

* 일/주/월 단위 매출 조회

* 시간대별 주문 분석

* 주문 목록 및 상태 관리

---

## 5. 비기능 요구사항 (Non-Functional Requirements)

### NFR-1. 성능 (Performance)

* 주문 화면 로딩 시간 ≤ **2초**

* 주문 요청 응답 시간 ≤ **3초**

### NFR-2. 확장성 (Scalability)

* 동시 사용자 **1,000명 이상** 처리 가능

* 트래픽 급증 시 서비스 중단 없음

### NFR-3. 가용성 (Availability)

* 월간 서비스 가동률 **99.9% 이상**

* 장애 발생 시 10분 이내 복구

### NFR-4. 보안 (Security)

* HTTPS 기반 통신

* 개인정보 및 결제 정보 암호화

* 관리자 접근 권한 분리

### NFR-5. 사용성 (Usability)

* 신규 사용자도 3단계 이내 주문 완료

* 모바일·데스크톱 반응형 지원

### NFR-6. 접근성 (Accessibility)

* 스크린 리더 호환

* 버튼·입력 요소 접근성 레이블 제공

### NFR-7. 로깅 및 모니터링 (Logging & Monitoring)

* 주문 실패 및 시스템 오류 로그 기록

* 관리자용 오류 모니터링 기능 제공

---

## 6. MVP 범위 (Minimum Viable Product)

**포함**

* 간편 주문 / 재주문

* 실시간 주문 상태

* 관리자 메뉴·주문 관리

* 기본 매출 대시보드

**제외 (향후 확장)**

* 포인트/멤버십

* AI 취향 추천

* 다중 매장 지원

* 배달 기능

---

## 7. 가정 및 제약 사항 (Assumptions & Constraints)

* 웹 기반 서비스로 시작 (모바일 앱은 추후 고려)

* 외부 결제 모듈 연동 사용

* 초기 타깃은 단일 카페 또는 소규모 프랜차이즈

---

## 8. 향후 확장 아이디어 (Future Enhancements)

* 출근 시간대 자동 추천 주문

* 사무실 단체 주문 기능

* 개인별 소비 리포트 제공

* AI 기반 커피 취향 분석

---

---

## 9. 기술 스택 (Tech Stack)

### Frontend
- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구 및 개발 서버
- **React Router** - 라우팅
- **Zustand** - 상태 관리
- **Axios** - HTTP 클라이언트

### Backend
- **Python 3.11+** - 런타임 환경
- **FastAPI** - 비동기 고성능 Python 웹 프레임워크
- **SQLAlchemy** - ORM 및 데이터베이스 관리
- **Alembic** - 데이터베이스 마이그레이션
- **PostgreSQL** - 데이터베이스
- **Pydantic** - 데이터 검증 및 설정 관리

---

## 10. 시작하기 (Getting Started)

### 사전 요구사항
- Python 3.11 이상
- PostgreSQL 14 이상
- pip (Python 패키지 관리자)
- Node.js 18 이상 (프론트엔드용)
- npm 또는 yarn (프론트엔드용)

### 설치 및 실행

1. **백엔드 의존성 설치**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **프론트엔드 의존성 설치**
   ```bash
   cd frontend
   npm install
   ```

3. **환경 변수 설정**
   - `backend/.env.example`을 참고하여 `backend/.env` 파일 생성
   - PostgreSQL 데이터베이스 URL 설정
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/orderbean
   ```

4. **데이터베이스 설정**
   ```bash
   cd backend
   # Alembic 마이그레이션 초기화 (최초 1회)
   alembic init alembic
   
   # 데이터베이스 마이그레이션
   alembic revision --autogenerate -m "Initial migration"
   alembic upgrade head
   ```

5. **개발 서버 실행**
   ```bash
   # 백엔드 실행 (FastAPI)
   cd backend
   python run.py
   # 또는
   uvicorn app.main:app --reload --port 5000
   
   # 프론트엔드 실행
   cd frontend
   npm run dev  # http://localhost:3000
   ```

6. **API 문서 확인**
   - Swagger UI: http://localhost:5000/docs
   - ReDoc: http://localhost:5000/redoc

---

## 11. 테스트 (Testing)

### 테스트 실행

**백엔드 테스트**
```bash
cd backend
pytest
# 또는 상세 출력
pytest -v
```

**프론트엔드 테스트**
```bash
cd frontend
npm test
```

### 테스트 전략

현재 프로젝트는 **RED 단계**의 테스트 케이스를 포함하고 있습니다. TDD(Test-Driven Development) 접근법을 따릅니다.

- **RED**: 실패하는 테스트 작성 (현재 단계)
- **GREEN**: 테스트를 통과시키는 코드 구현
- **REFACTOR**: 코드 개선 및 리팩토링

자세한 내용은 [`docs/tests/TEST_STRATEGY.md`](./docs/tests/TEST_STRATEGY.md)를 참고하세요.

---

## 12. 리팩토링 할 일 목록 (Refactoring TODO)

프론트엔드 코드 분석 결과를 바탕으로 한 리팩토링 작업 목록입니다. 자세한 내용은 [`frontend/CODE_REVIEW.md`](./frontend/CODE_REVIEW.md)를 참고하세요.

### 🔴 높은 우선순위 (즉시 개선 필요)

#### 1. 타입 안정성 개선
- [ ] `any` 타입 제거 및 명확한 인터페이스 정의
  - [ ] `Cart.tsx`: `calculateItemPrice`, `formatItemName` 함수 타입 정의
  - [ ] `MenuCard.tsx`: 옵션 파싱 로직 타입 정의
  - [ ] `AdminPage.tsx`: `Order`, `OrderItem` 인터페이스 명확화
  - [ ] `orderService.ts`, `adminService.ts`: `items: any[]` 타입 개선
- [ ] `Menu.options` 타입 명확화 (`menuService.ts`)
- [ ] `CartItem`, `OrderItem`의 `customizations` 타입 정의
- [ ] 주문 아이템 구조 일관성 확보 (menu_name, menu_id, menuId 통일)

#### 2. 상태 관리 개선
- [ ] Zustand 상태 업데이트 시 불변성 원칙 준수
  - [ ] `useOrderStore.ts`: `addToCart` 함수 불변성 수정 (44줄)
  - [ ] `useOrderStore.ts`: `updateQuantity` 함수 불변성 수정 (55-61줄)
- [ ] 상태 업데이트 패턴 통일

#### 3. 코드 중복 제거
- [ ] 가격 계산 로직 통합
  - [ ] `utils/priceCalculator.ts` 생성
  - [ ] `Cart.tsx`, `MenuCard.tsx`, `AdminPage.tsx`에서 공통 함수 사용
- [ ] 날짜 포맷팅 로직 분리
  - [ ] `utils/dateFormatter.ts` 생성
  - [ ] `AdminPage.tsx`의 `formatOrderDate` 함수 이동
- [ ] 옵션 파싱 로직 통합
  - [ ] `utils/optionParser.ts` 생성
  - [ ] `MenuCard.tsx`, `AdminPage.tsx`의 옵션 처리 로직 통합

#### 4. 에러 처리 개선
- [ ] 일관된 에러 처리 전략 수립
  - [ ] `useMenuStore.ts`, `useOrderStore.ts` 에러 메시지 통일
  - [ ] `AdminPage.tsx` 에러 처리 UI 피드백 추가
- [ ] 사용자 피드백 추가
  - [ ] 토스트 메시지 또는 알림 컴포넌트 구현
  - [ ] 주문 성공/실패 시 피드백 제공
  - [ ] 재고 업데이트 시 피드백 제공

### 🟠 중간 우선순위 (단기 개선)

#### 5. 컴포넌트 분리
- [ ] `AdminPage.tsx` 리팩토링 (258줄 → 여러 컴포넌트로 분리)
  - [ ] `DashboardStats` 컴포넌트 분리
  - [ ] `InventorySection` 컴포넌트 분리
  - [ ] `OrdersSection` 컴포넌트 분리
- [ ] `OrderStatusButton` 컴포넌트 생성
  - [ ] `AdminPage.tsx`의 조건부 렌더링 로직 분리
- [ ] 인라인 스타일 제거
  - [ ] `OrderPage.tsx`의 인라인 스타일을 CSS 클래스로 변환

#### 6. 성능 최적화
- [ ] 불필요한 리렌더링 방지
  - [ ] `Cart.tsx`: `calculateItemPrice`, `formatItemName` 함수 메모이제이션
  - [ ] `MenuCard.tsx`: `getOptionsFromMenu` 함수 메모이제이션
- [ ] 컴포넌트 메모이제이션
  - [ ] `OrderPage.tsx`: `menus.map` 결과 메모이제이션
  - [ ] `AdminPage.tsx`: 복잡한 계산 로직 메모이제이션
  - [ ] `React.memo` 적용 검토

#### 7. 프로덕션 코드 정리
- [ ] 디버그 로그 제거 또는 조건부 처리
  - [ ] `api.ts`: 12개의 `console.log/error` 조건부 처리
  - [ ] `useMenuStore.ts`: 4개의 `console.log/error` 조건부 처리
  - [ ] 개발 환경에서만 로깅하도록 수정
- [ ] 하드코딩된 값 제거
  - [ ] `AdminPage.tsx`: 매직 넘버 `10` 상수화
  - [ ] `api.ts`: `timeout: 5000` 설정 파일로 분리
  - [ ] `OrderPage.tsx`: `http://localhost:5000` 환경 변수로 분리
  - [ ] `constants/config.ts` 파일 생성
- [ ] ESLint 비활성화 해결
  - [ ] `OrderPage.tsx`, `AdminPage.tsx`의 `eslint-disable` 제거
  - [ ] 의존성 배열 수정 또는 명시적 의도 주석 추가

### 🟡 낮은 우선순위 (장기 개선)

#### 8. 타입 정의 통합
- [ ] snake_case vs camelCase 통일
  - [ ] `adminService.ts`의 `DashboardStats`, `Order` 인터페이스 camelCase로 변환
  - [ ] 백엔드 응답 변환 시점에 camelCase로 통일
- [ ] 중복 인터페이스 제거
  - [ ] `types/index.ts` 공통 타입 파일 생성
  - [ ] `AdminPage.tsx`, `adminService.ts`의 중복 인터페이스 통합

#### 9. 접근성 개선
- [ ] ARIA 속성 추가
  - [ ] 버튼에 `aria-label` 추가
  - [ ] 에러 메시지에 `role="alert"` 추가
- [ ] 로딩 스피너 컴포넌트 추가
- [ ] 스크린 리더 최적화

#### 10. 테스트 가능성 향상
- [ ] 순수 함수 분리
  - [ ] 비즈니스 로직을 컴포넌트에서 유틸리티 함수로 분리
  - [ ] 단위 테스트 작성 용이하도록 구조 개선
- [ ] 의존성 주입 패턴 적용
  - [ ] 서비스 레이어 모킹 가능한 구조로 변경

---

### 리팩토링 진행 시 주의사항

1. **점진적 개선**: 한 번에 모든 것을 바꾸지 말고 단계적으로 개선
2. **테스트 작성**: 리팩토링 전후 테스트 작성으로 회귀 방지
3. **기능 검증**: 각 리팩토링 단계마다 기능 동작 확인
4. **문서화**: 변경 사항과 이유를 문서화

---

## 13. 백엔드 리팩토링 할 일 목록 (Backend Refactoring TODO)

백엔드 코드 분석 결과를 바탕으로 한 리팩토링 작업 목록입니다. 자세한 내용은 [`backend/CODE_REVIEW.md`](./backend/CODE_REVIEW.md)를 참고하세요.

### 🔴 높은 우선순위 (즉시 개선 필요)

#### 1. 데이터베이스 연동
- [ ] SQLAlchemy를 사용한 실제 DB 연동
  - [ ] 메모리 저장소 제거 (`order_service.py`의 `_orders_storage`)
  - [ ] DB 세션 의존성 주입 (`get_db()` 활용)
  - [ ] 라우터에서 DB 세션 받기 (`orders.py`, `menus.py`, `admin.py`)
  - [ ] 서비스 레이어에 DB 세션 전달
- [ ] 실제 데이터베이스 쿼리 구현
  - [ ] `order_service.py`: 메모리 저장소 → DB 쿼리로 전환
  - [ ] `menu_service.py`: 하드코딩된 데이터 → DB 쿼리로 전환
  - [ ] `admin_service.py`: DB 쿼리 기반으로 전환

#### 2. 타입 안정성 개선
- [ ] 타입 힌트 추가
  - [ ] `order_service.py`: 함수 시그니처에 타입 힌트 추가 (`Dict`, `List`, `Optional` 사용)
  - [ ] `menu_service.py`: 반환 타입 명시
  - [ ] `admin_service.py`: 타입 힌트 추가
- [ ] Pydantic 스키마 검증 활용
  - [ ] `orders.py`: 스키마 검증 우회 제거 (14-15줄, 26-27줄)
  - [ ] `admin.py`: 스키마 검증 우회 제거 (20-21줄)
  - [ ] `response_model` 파라미터 활용
  - [ ] 커스텀 스키마 생성 (필요한 필드 포함)
- [ ] 네이밍 컨벤션 통일
  - [ ] `schemas.py`: camelCase vs snake_case 통일
  - [ ] `OrderItemCreate`의 `menuId`, `menuName`, `menuPrice` 처리
  - [ ] `OrderCreate`의 `customerId` 처리
  - [ ] Pydantic의 `Field`와 `alias` 활용

#### 3. 에러 처리 개선
- [ ] 일관된 예외 처리 전략 수립
  - [ ] 서비스 레이어에서 커스텀 예외 발생
  - [ ] 라우터에서 예외 처리 통일
  - [ ] 에러 핸들러 미들웨어 추가
- [ ] 에러 처리 구현
  - [ ] `order_service.py`: 주문을 찾지 못한 경우 `HTTPException` 발생 (181-201줄)
  - [ ] `menu_service.py`: `get_menu_by_id` 실제 구현
  - [ ] `menu_service.py`: `delete_menu` 실제 삭제 구현
  - [ ] 일관된 에러 응답 형식

#### 4. 보안 개선
- [ ] CORS 설정 환경별 분리
  - [ ] `main.py`: `allow_origins=["*"]` 환경 변수로 분리
  - [ ] 개발/프로덕션 환경별 설정
  - [ ] `ALLOWED_ORIGINS` 환경 변수 사용
- [ ] 데이터베이스 URL 보안 강화
  - [ ] `database.py`: 기본값 제거 또는 빈 문자열
  - [ ] 필수 환경 변수 검증
  - [ ] 하드코딩된 자격 증명 제거

### 🟠 중간 우선순위 (단기 개선)

#### 5. 코드 품질 개선
- [ ] 디버그 로그 제거 또는 로깅 모듈 사용
  - [ ] `order_service.py`: 7개의 `print` 문 제거
  - [ ] Python `logging` 모듈 사용
  - [ ] 로그 레벨 설정 (DEBUG, INFO, WARNING, ERROR)
  - [ ] 개발 환경에서만 DEBUG 로그 출력
- [ ] 하드코딩된 값 제거
  - [ ] `main.py`: `port=5000` 환경 변수로 분리
  - [ ] `run.py`: `port=5000` 환경 변수로 분리
  - [ ] `order_service.py`: `"anonymous"` 상수화
  - [ ] `menu_service.py`: 하드코딩된 샘플 데이터 제거
  - [ ] `config.py` 설정 파일 생성
- [ ] 복잡한 함수 분리
  - [ ] `order_service.py`: `create_order` 함수 분리 (150줄 → 여러 함수)
    - [ ] `_calculate_item_price()` - 가격 계산
    - [ ] `_parse_customizations()` - 옵션 파싱
    - [ ] `_get_menu_info()` - 메뉴 정보 조회
    - [ ] `_create_order_items()` - 주문 항목 생성

#### 6. 비동기 처리 개선
- [ ] 실제 비동기 작업 구현
  - [ ] SQLAlchemy async 사용
  - [ ] 또는 동기 함수로 변경 (현재 구현 기준)
- [ ] 데이터베이스 세션 관리
  - [ ] FastAPI의 `Depends(get_db)` 활용
  - [ ] 컨텍스트 매니저로 세션 관리
  - [ ] 트랜잭션 처리

#### 7. 코드 중복 제거
- [ ] 공통 로직 함수화
  - [ ] 날짜/시간 생성: `datetime.utcnow()` 유틸리티 함수로 분리
  - [ ] UUID 생성: 모델의 `default=uuid.uuid4` 활용 또는 유틸리티 함수
  - [ ] 메뉴 정보 조회: `_get_menu_by_id()` 헬퍼 함수 생성
- [ ] 유틸리티 모듈 생성
  - [ ] `utils/datetime_utils.py` 생성
  - [ ] `utils/uuid_utils.py` 생성 (필요시)
  - [ ] `utils/menu_utils.py` 생성

### 🟡 낮은 우선순위 (장기 개선)

#### 8. 테스트 가능성 향상
- [ ] 의존성 주입 패턴 적용
  - [ ] 저장소를 의존성으로 주입
  - [ ] 인터페이스 기반 설계
  - [ ] 리포지토리 패턴 적용
- [ ] 전역 상태 제거
  - [ ] `order_service.py`: `_orders_storage` 전역 변수 제거
  - [ ] 저장소를 클래스로 캡슐화
  - [ ] 인스턴스 기반 접근
  - [ ] 테스트용 모킹 저장소 제공

#### 9. 문서화 개선
- [ ] Docstring 추가
  - [ ] Google/NumPy 스타일 docstring 추가
  - [ ] 복잡한 로직에 인라인 주석
  - [ ] 타입 힌트와 함께 자동 문서화
- [ ] API 문서 보완
  - [ ] Swagger 문서 개선
  - [ ] 예제 추가
- [ ] 주석 개선
  - [ ] "최소 구현" 주석에 구체적인 계획 명시
  - [ ] TODO 주석 추가

#### 10. 데이터 일관성 개선
- [ ] 주문 생성 로직 개선
  - [ ] `order_service.py`: 임시 order_id 생성 패턴 개선 (140, 155-156줄)
  - [ ] 먼저 order_id 생성 후 사용
  - [ ] 트랜잭션 내에서 처리
- [ ] 메뉴 유효성 검증 강화
  - [ ] `order_service.py`: 메뉴 조회 실패 시 예외 발생 (88-94줄)
  - [ ] 주문 생성 전 메뉴 유효성 검증
  - [ ] 데이터 무결성 보장

---

### 백엔드 리팩토링 진행 시 주의사항

1. **점진적 개선**: 한 번에 모든 것을 바꾸지 말고 단계적으로 개선
2. **데이터 마이그레이션**: 메모리 저장소에서 DB로 전환 시 데이터 마이그레이션 계획
3. **테스트 작성**: 리팩토링 전후 테스트 작성으로 회귀 방지
4. **기능 검증**: 각 리팩토링 단계마다 기능 동작 확인
5. **문서화**: 변경 사항과 이유를 문서화

---

📌 **OrderBean PRD v1.0**

