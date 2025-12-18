# OrderBean Backend (FastAPI)

FastAPI 기반 백엔드 API 서버

## 기술 스택

- **FastAPI** - 비동기 고성능 Python 웹 프레임워크
- **SQLAlchemy** - ORM 및 데이터베이스 관리
- **Alembic** - 데이터베이스 마이그레이션
- **PostgreSQL** - 데이터베이스
- **Pydantic** - 데이터 검증 및 설정 관리
- **pytest** - 테스트 프레임워크

## 설치

```bash
pip install -r requirements.txt
```

## 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 설정하세요:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/orderbean
PORT=5000
ENVIRONMENT=development
```

## 실행

### 개발 모드
```bash
python run.py
# 또는
uvicorn app.main:app --reload --port 5000
```

### 프로덕션 모드
```bash
uvicorn app.main:app --host 0.0.0.0 --port 5000
```

## API 문서

- **Swagger UI**: http://localhost:5000/docs
- **ReDoc**: http://localhost:5000/redoc

## 데이터베이스 마이그레이션

```bash
# 마이그레이션 생성
alembic revision --autogenerate -m "Migration message"

# 마이그레이션 적용
alembic upgrade head

# 마이그레이션 롤백
alembic downgrade -1
```

## 테스트

```bash
pytest
pytest -v  # 상세 출력
pytest tests/  # 특정 디렉토리만
```

## 프로젝트 구조

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI 앱 진입점
│   ├── database.py          # 데이터베이스 설정
│   ├── models.py            # SQLAlchemy 모델
│   ├── schemas.py           # Pydantic 스키마
│   ├── routers/             # API 라우터
│   │   ├── menus.py
│   │   ├── orders.py
│   │   └── admin.py
│   └── services/            # 비즈니스 로직
│       ├── menu_service.py
│       ├── order_service.py
│       └── admin_service.py
├── tests/                   # 테스트 파일
├── alembic/                 # 마이그레이션 파일
├── requirements.txt         # Python 의존성
├── pytest.ini              # pytest 설정
├── alembic.ini             # Alembic 설정
└── run.py                  # 서버 실행 스크립트
```

