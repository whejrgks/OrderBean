# Phase 1: 데이터베이스 설정 - 실행 방법 가이드

## 📋 실행 단계

### Step 1: Prisma 스키마 검증

스키마 파일의 문법이 올바른지 검증합니다.

#### 방법 1: npm script 사용 (권장)
```bash
cd backend
npm run prisma:generate
```
이 명령은 자동으로 스키마를 검증하고 Prisma Client를 생성합니다.

#### 방법 2: Prisma CLI 직접 사용
```bash
cd backend
npx prisma validate
```

**예상 출력:**
```
✔ The schema is valid
```

---

### Step 2: Prisma Client 생성

스키마 파일을 기반으로 TypeScript 타입이 포함된 Prisma Client를 생성합니다.

#### 실행 명령
```bash
cd backend
npm run prisma:generate
```

**예상 출력:**
```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
✔ Generated Prisma Client (5.7.1) to .\node_modules\.prisma\client in XXXms
```

**생성되는 파일:**
- `node_modules/.prisma/client/` - Prisma Client 코드
- TypeScript 타입 정의 파일

**주의사항:**
- 실제 데이터베이스 연결 없이도 실행 가능
- 스키마 파일만으로 타입 생성 가능

---

### Step 3: 스키마 포맷팅 (선택사항)

스키마 파일을 자동으로 포맷팅합니다.

```bash
cd backend
npx prisma format
```

**예상 출력:**
```
Formatted prisma/schema.prisma in XXXms
```

---

### Step 4: 마이그레이션 실행 (DB 연결 필요)

**⚠️ 주의: 이 단계는 실제 PostgreSQL 데이터베이스 연결이 필요합니다.**

#### 4.1 환경 변수 설정

`backend/.env` 파일을 생성하고 데이터베이스 URL을 설정합니다.

```env
DATABASE_URL="postgresql://username:password@localhost:5432/orderbean?schema=public"
```

**예시 (로컬 PostgreSQL):**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/orderbean?schema=public"
```

#### 4.2 마이그레이션 실행

```bash
cd backend
npm run prisma:migrate
```

**대화형 프롬프트:**
```
? Enter a name for the new migration: › init
```

마이그레이션 이름을 입력하면 (예: `init`):
- 마이그레이션 파일이 생성됩니다
- 데이터베이스에 테이블이 생성됩니다

**예상 출력:**
```
The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20241216000000_init/
    └─ migration.sql

✔ Generated Prisma Client (5.7.1) to .\node_modules\.prisma\client in XXXms
```

---

### Step 5: Prisma Studio 실행 (선택사항)

데이터베이스를 시각적으로 확인하고 관리할 수 있는 GUI 도구입니다.

```bash
cd backend
npm run prisma:studio
```

**예상 출력:**
```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Prisma Studio is up on http://localhost:5555
```

브라우저에서 `http://localhost:5555`로 접속하여 데이터베이스를 확인할 수 있습니다.

---

## 🔍 문제 해결

### 문제 1: PowerShell 실행 정책 오류

**오류 메시지:**
```
npx : 이 시스템에서 스크립트를 실행할 수 없으므로...
```

**해결 방법:**

#### 방법 1: npm script 사용 (가장 간단)
```bash
cd backend
npm run prisma:generate
```

#### 방법 2: PowerShell 실행 정책 변경
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### 방법 3: cmd 사용
Windows 명령 프롬프트(cmd)를 사용하여 실행:
```cmd
cd backend
npm run prisma:generate
```

---

### 문제 2: DATABASE_URL 환경 변수 없음

**오류 메시지:**
```
Environment variable not found: DATABASE_URL
```

**해결 방법:**
- Prisma Client 생성은 DATABASE_URL 없이도 가능합니다
- 마이그레이션 실행 시에만 필요합니다
- `.env` 파일을 생성하고 DATABASE_URL을 설정하세요

---

### 문제 3: 데이터베이스 연결 실패

**오류 메시지:**
```
Can't reach database server at `localhost:5432`
```

**해결 방법:**
1. PostgreSQL이 실행 중인지 확인
2. DATABASE_URL이 올바른지 확인
3. 데이터베이스가 존재하는지 확인
4. 사용자 권한이 올바른지 확인

---

## ✅ 검증 체크리스트

### 최소 구현 완료 확인
- [ ] `backend/prisma/schema.prisma` 파일 존재
- [ ] `npm run prisma:generate` 실행 성공
- [ ] `node_modules/.prisma/client/` 폴더 생성 확인
- [ ] TypeScript 타입 정의 파일 생성 확인

### 데이터베이스 연결 후 (선택사항)
- [ ] `.env` 파일에 DATABASE_URL 설정
- [ ] `npm run prisma:migrate` 실행 성공
- [ ] 데이터베이스에 테이블 생성 확인
- [ ] Prisma Studio로 데이터베이스 확인

---

## 🚀 빠른 시작 (최소 구현)

데이터베이스 연결 없이 스키마만 검증하고 Client를 생성하려면:

```bash
# 1. backend 디렉토리로 이동
cd backend

# 2. Prisma Client 생성 (자동으로 스키마 검증 포함)
npm run prisma:generate
```

이것만으로도 Phase 1의 최소 구현은 완료됩니다!

---

## 📝 다음 단계

Phase 1 완료 후:
- Phase 2: 백엔드 기본 인프라 구현
- `src/config/database.ts`에서 Prisma Client import 및 사용
- 실제 데이터베이스 연결 설정

---

**작성일**: 2024-12-16

