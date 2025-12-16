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
- **Node.js** - 런타임 환경
- **Express** - 웹 프레임워크
- **TypeScript** - 타입 안정성
- **Prisma** - ORM 및 데이터베이스 관리
- **PostgreSQL** - 데이터베이스

---

## 10. 시작하기 (Getting Started)

### 사전 요구사항
- Node.js 18 이상
- PostgreSQL 14 이상
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm run install:all
   ```

2. **환경 변수 설정**
   - `backend/env.example`을 참고하여 `backend/.env` 파일 생성
   - PostgreSQL 데이터베이스 URL 설정

3. **데이터베이스 설정**
   ```bash
   # Prisma 클라이언트 생성
   cd backend
   npm run prisma:generate
   
   # 데이터베이스 마이그레이션
   npm run prisma:migrate
   
   # (선택) Prisma Studio로 데이터베이스 확인
   npm run prisma:studio
   ```

4. **개발 서버 실행**
   ```bash
   # 프론트엔드와 백엔드 동시 실행
   npm run dev
   
   # 또는 개별 실행
   npm run dev:frontend  # http://localhost:3000
   npm run dev:backend   # http://localhost:5000
   ```

---

## 11. 테스트 (Testing)

### 테스트 실행

**백엔드 테스트**
```bash
cd backend
npm test
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

📌 **OrderBean PRD v1.0**

