# BeanTaste Map 설치 및 실행 가이드

이 문서는 BeanTaste Map 프로젝트를 로컬 환경에 설치하고 실행하는 방법을 안내합니다.

## 📋 사전 요구사항

다음 소프트웨어가 설치되어 있어야 합니다:

- **Node.js** (v16 이상 권장)
- **npm** (v7 이상) 또는 **yarn**
- **PostgreSQL** (v12 이상)
- **Git**

### Node.js 설치 확인

```bash
node --version
npm --version
```

### PostgreSQL 설치 확인

```bash
psql --version
```

---

## 🗄️ 데이터베이스 설정

### 1. PostgreSQL 데이터베이스 생성

PostgreSQL에 접속하여 데이터베이스를 생성합니다:

```bash
# PostgreSQL 접속
psql -U postgres

# 데이터베이스 생성
CREATE DATABASE beantaste;

# 데이터베이스 사용자 생성 (선택사항)
CREATE USER beantaste_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE beantaste TO beantaste_user;

# 종료
\q
```

### 2. 데이터베이스 스키마 적용

프로젝트 루트 디렉토리에서 스키마를 적용합니다:

```bash
# PostgreSQL에 스키마 적용
psql -U postgres -d beantaste -f database/schema.sql
```

또는 PostgreSQL 사용자 이름이 다른 경우:

```bash
psql -U your_username -d beantaste -f database/schema.sql
```

---

## ⚙️ 환경 변수 설정

### 백엔드 환경 변수

`backend/` 디렉토리에 `.env` 파일을 생성합니다:

```bash
cd backend
touch .env
```

`.env` 파일에 다음 내용을 추가합니다:

```env
# 서버 설정
PORT=3000
NODE_ENV=development
API_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001

# JWT 설정
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# 데이터베이스 설정
DB_HOST=localhost
DB_PORT=5432
DB_NAME=beantaste
DB_USER=postgres
DB_PASSWORD=your_password
```

> ⚠️ **보안 주의**: 프로덕션 환경에서는 반드시 강력한 `JWT_SECRET`을 사용하고, `.env` 파일을 Git에 커밋하지 마세요.

### 프론트엔드 환경 변수

`frontend/` 디렉토리에 `.env` 파일을 생성합니다:

```bash
cd frontend
touch .env
```

`.env` 파일에 다음 내용을 추가합니다:

```env
REACT_APP_API_URL=http://localhost:3000/api
```

---

## 📦 의존성 설치

### 방법 1: 루트에서 한 번에 설치 (권장)

프로젝트 루트 디렉토리에서:

```bash
# 모든 의존성 설치
npm run install:all
```

### 방법 2: 각각 개별 설치

프론트엔드와 백엔드를 각각 설치:

```bash
# 루트 디렉토리
npm install

# 프론트엔드 의존성 설치
cd frontend
npm install

# 백엔드 의존성 설치
cd ../backend
npm install
```

---

## 🚀 개발 서버 실행

### 백엔드 서버 실행

터미널 1에서:

```bash
cd backend
npm run dev
```

또는 루트 디렉토리에서:

```bash
npm run dev:backend
```

백엔드 서버가 `http://localhost:3000`에서 실행됩니다.

### 프론트엔드 서버 실행

터미널 2에서:

```bash
cd frontend
npm start
```

또는 루트 디렉토리에서:

```bash
npm run dev:frontend
```

프론트엔드 서버가 `http://localhost:3001`에서 실행됩니다 (또는 사용 가능한 다른 포트).

브라우저가 자동으로 열리며, 열리지 않으면 수동으로 `http://localhost:3001`에 접속하세요.

---

## 🏗️ 프로덕션 빌드

### 프론트엔드 빌드

```bash
cd frontend
npm run build
```

또는 루트 디렉토리에서:

```bash
npm run build:frontend
```

빌드된 파일은 `frontend/build/` 디렉토리에 생성됩니다.

### 프로덕션 서버 실행

```bash
cd backend
npm start
```

---

## 🧪 테스트 실행

### 모든 테스트 실행

```bash
npm test
```

### 프론트엔드 테스트만 실행

```bash
cd frontend
npm test
```

### 백엔드 테스트만 실행

```bash
cd backend
npm test
```

---

## 🔧 문제 해결

### 포트가 이미 사용 중인 경우

백엔드 포트를 변경하려면 `backend/.env` 파일에서 `PORT` 값을 변경하세요.

프론트엔드 포트를 변경하려면 `frontend/.env` 파일에 다음을 추가:

```env
PORT=3002
```

### 데이터베이스 연결 오류

1. PostgreSQL이 실행 중인지 확인:
   ```bash
   # Windows
   net start postgresql-x64-12
   
   # macOS/Linux
   sudo service postgresql start
   ```

2. 데이터베이스 설정이 올바른지 확인:
   - `backend/.env` 파일의 데이터베이스 정보 확인
   - 데이터베이스가 생성되었는지 확인
   - 사용자 권한이 올바른지 확인

### 모듈을 찾을 수 없는 오류

의존성을 다시 설치:

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

### CORS 오류

백엔드의 `backend/src/index.js`에서 CORS 설정을 확인하세요. 프론트엔드 URL이 `FRONTEND_URL` 환경 변수에 올바르게 설정되어 있는지 확인하세요.

---

## 📁 프로젝트 구조

```
OrderBean/
├── frontend/          # React 프론트엔드
├── backend/           # Node.js/Express 백엔드
├── database/          # 데이터베이스 스키마 및 마이그레이션
├── docs/              # 문서
└── tests/             # 테스트 파일
```

---

## 🔐 초기 관리자 계정 생성

데이터베이스에 직접 관리자 계정을 생성하거나, 회원가입 후 데이터베이스에서 역할을 변경할 수 있습니다:

```sql
-- 사용자 역할을 admin으로 변경
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

---

## 📚 추가 문서

- [API 문서](./api/README.md) - API 엔드포인트 상세 정보
- [디자인 문서](./design/README.md) - UI/UX 및 데이터 모델 정보

---

## 💡 개발 팁

### 핫 리로드

- **백엔드**: `nodemon`이 설치되어 있어 파일 변경 시 자동으로 재시작됩니다.
- **프론트엔드**: React의 핫 리로드가 기본적으로 활성화되어 있습니다.

### 데이터베이스 마이그레이션

새로운 마이그레이션 파일을 추가할 때는 `database/migrations/` 디렉토리에 추가하세요.

### 환경 변수 변경

환경 변수를 변경한 후에는 서버를 재시작해야 합니다.

---

## 🆘 도움이 필요하신가요?

문제가 발생하면 다음을 확인하세요:

1. 모든 사전 요구사항이 설치되어 있는지
2. 환경 변수가 올바르게 설정되었는지
3. 데이터베이스가 실행 중이고 연결 가능한지
4. 포트가 다른 프로세스에 의해 사용되지 않는지

추가 도움이 필요하면 이슈를 등록해주세요.

