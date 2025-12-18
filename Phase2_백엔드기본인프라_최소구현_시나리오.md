# Phase 2: 백엔드 기본 인프라 - 최소 구현 시나리오

**목표**: Express 서버를 설정하고 데이터베이스 연결 및 기본 에러 핸들링을 구현하여 GREEN 단계의 백엔드 기반을 마련

**원칙**: 
- 테스트를 통과시키는 최소한의 코드만 작성
- 실제 기능보다 서버 실행 및 기본 구조 우선
- 에러 핸들링은 기본적인 것만 구현

---

## 📋 구현 단계

### Step 1: 디렉토리 구조 생성

#### 1.1 필요한 폴더 생성
- [ ] `backend/src/` 디렉토리 생성
- [ ] `backend/src/config/` 디렉토리 생성
- [ ] `backend/src/utils/` 디렉토리 생성

---

### Step 2: 데이터베이스 연결 설정

#### 2.1 `backend/src/config/database.ts` 생성

**구현 내용:**
- [ ] Prisma Client import
- [ ] Prisma Client 인스턴스 생성
- [ ] Singleton 패턴으로 export
- [ ] 연결 테스트 함수 (선택사항, 최소 구현에서는 생략 가능)

**예상 코드:**
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
```

**최소 구현:**
- Prisma Client 인스턴스만 생성하고 export
- 연결 테스트나 에러 핸들링은 나중에 추가

---

### Step 3: 에러 핸들링 설정

#### 3.1 `backend/src/utils/errorHandler.ts` 생성

**구현 내용:**
- [ ] 기본 에러 핸들러 미들웨어 함수
- [ ] 404 핸들러 미들웨어 함수
- [ ] Express의 Request, Response, NextFunction 타입 사용

**예상 코드:**
```typescript
import { Request, Response, NextFunction } from 'express'

// 404 핸들러
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Not Found' })
}

// 기본 에러 핸들러
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
}
```

**최소 구현:**
- 기본적인 404와 500 에러 핸들러만 구현
- 상세한 에러 분류는 나중에 추가

---

### Step 4: Express 서버 설정

#### 4.1 `backend/src/index.ts` 생성

**구현 내용:**
- [ ] Express 앱 초기화
- [ ] dotenv 설정 (환경 변수 로드)
- [ ] JSON 미들웨어 설정 (`express.json()`)
- [ ] CORS 설정 (`cors()`)
- [ ] 기본 라우트 (Health check 등)
- [ ] 에러 핸들러 등록
- [ ] 404 핸들러 등록
- [ ] 서버 시작 로직

**예상 코드 구조:**
```typescript
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { notFoundHandler, errorHandler } from './utils/errorHandler'

// 환경 변수 로드
dotenv.config()

// Express 앱 생성
const app = express()
const PORT = process.env.PORT || 5000

// 미들웨어 설정
app.use(cors())
app.use(express.json())

// 기본 라우트 (Health check)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// API 라우트는 나중에 추가
// app.use('/api/menus', menuRoutes)
// app.use('/api/orders', orderRoutes)
// app.use('/api/admin', adminRoutes)

// 에러 핸들링
app.use(notFoundHandler)
app.use(errorHandler)

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
```

**최소 구현:**
- 서버가 시작되고 기본 라우트가 동작하면 됨
- API 라우트는 Phase 3에서 추가
- Health check 엔드포인트만 구현

---

### Step 5: TypeScript 설정 확인

#### 5.1 `backend/tsconfig.json` 생성 (없는 경우)

**구현 내용:**
- [ ] TypeScript 컴파일러 옵션 설정
- [ ] Node.js 타입 지원
- [ ] 소스 맵 생성
- [ ] 출력 디렉토리 설정

**예상 코드:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

---

### Step 6: 환경 변수 설정

#### 6.1 `.env` 파일 생성 (선택사항)

**구현 내용:**
- [ ] `backend/.env` 파일 생성
- [ ] PORT 설정 (선택사항, 기본값 5000 사용 가능)
- [ ] DATABASE_URL 설정 (나중에 DB 연결 시 필요)

**예상 내용:**
```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/orderbean?schema=public
NODE_ENV=development
```

**최소 구현:**
- .env 파일은 선택사항
- 환경 변수가 없어도 기본값으로 동작하도록 구현

---

## 📁 생성될 파일 구조

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts      # Prisma Client 설정
│   ├── utils/
│   │   └── errorHandler.ts  # 에러 핸들링
│   └── index.ts             # Express 서버
├── tsconfig.json            # TypeScript 설정 (없는 경우)
└── .env                     # 환경 변수 (선택사항)
```

---

## ✅ 완료 기준

### 필수 완료 항목
- [ ] `backend/src/config/database.ts` 파일 생성 및 Prisma Client export
- [ ] `backend/src/utils/errorHandler.ts` 파일 생성 (404, 500 핸들러)
- [ ] `backend/src/index.ts` 파일 생성 및 Express 서버 설정
- [ ] 서버가 정상적으로 시작됨 (`npm run dev`)
- [ ] Health check 엔드포인트 동작 (`GET /health`)
- [ ] 404 핸들러 동작 확인
- [ ] TypeScript 컴파일 오류 없음

### 선택 완료 항목
- [ ] `backend/tsconfig.json` 파일 생성 (없는 경우)
- [ ] `.env` 파일 생성
- [ ] 데이터베이스 연결 테스트 함수

---

## 🔍 검증 방법

### 1. 서버 실행 테스트
```bash
cd backend
npm run dev
```

**예상 출력:**
```
Server is running on port 5000
```

### 2. Health Check 테스트
브라우저 또는 curl로 확인:
```bash
curl http://localhost:5000/health
```

**예상 응답:**
```json
{"status":"ok"}
```

### 3. 404 핸들러 테스트
```bash
curl http://localhost:5000/api/nonexistent
```

**예상 응답:**
```json
{"error":"Not Found"}
```

### 4. TypeScript 컴파일 테스트
```bash
cd backend
npm run build
```

**예상 결과:**
- `dist/` 폴더에 컴파일된 JavaScript 파일 생성
- 컴파일 오류 없음

---

## 📝 주의사항

### 최소 구현 원칙
1. **서버 실행 우선**: 서버가 시작되고 기본 라우트가 동작하면 됨
2. **기본 에러 핸들링**: 404와 500 에러만 처리
3. **API 라우트 제외**: Phase 3에서 메뉴/주문/관리자 라우트 추가
4. **환경 변수 선택사항**: 기본값으로도 동작하도록 구현

### 향후 확장 가능한 기능
- 상세한 에러 분류 및 메시지
- 요청 로깅 미들웨어
- 인증 미들웨어
- Rate limiting
- 요청 검증 미들웨어

---

## 🚀 다음 단계

Phase 2 완료 후:
- Phase 3: 메뉴 API 구현
- Phase 4: 주문 API 구현
- Phase 5: 관리자 API 구현

각 Phase에서 API 라우트를 `index.ts`에 등록합니다.

---

## 💡 구현 팁

### 1. 서버 시작 확인
서버가 정상적으로 시작되면:
- 콘솔에 "Server is running on port 5000" 메시지 출력
- Health check 엔드포인트가 응답

### 2. 에러 핸들링 순서
Express에서 미들웨어 순서가 중요합니다:
```typescript
// 1. 일반 라우트
app.get('/health', ...)

// 2. API 라우트 (나중에 추가)
// app.use('/api', ...)

// 3. 404 핸들러 (모든 라우트 뒤에)
app.use(notFoundHandler)

// 4. 에러 핸들러 (가장 마지막)
app.use(errorHandler)
```

### 3. TypeScript 타입 안정성
- 모든 함수에 타입 명시
- Express의 Request, Response, NextFunction 타입 활용
- Prisma Client 타입 자동 생성됨

---

**작성일**: 2024-12-16  
**예상 소요 시간**: 30-45분  
**난이도**: ⭐⭐⭐ (보통)

