# 백엔드 코드 분석 리포트

## 📋 개요

백엔드 코드베이스의 코드 스멜과 개선점을 분석한 리포트입니다.

---

## 🔴 1. 아키텍처 및 데이터 영속성 문제

### 1.1 메모리 기반 저장소 사용

**위치 및 문제점:**

- **`order_service.py` (5줄)**: `_orders_storage: list = []` - 메모리 기반 저장소
- **`menu_service.py`**: 하드코딩된 샘플 데이터만 반환
- **`admin_service.py`**: 메모리 저장소에 의존

**문제점:**
- 서버 재시작 시 모든 데이터 손실
- 프로덕션 환경에서 사용 불가
- 동시성 문제 (멀티스레드 환경에서 안전하지 않음)
- SQLAlchemy 모델이 정의되어 있지만 실제로 사용되지 않음

**개선 방안:**
- SQLAlchemy를 사용한 실제 데이터베이스 연동
- `database.py`의 `get_db()` 의존성 주입 활용
- 서비스 레이어에서 DB 세션 사용

### 1.2 데이터베이스 세션 미사용

**위치:** 모든 라우터 파일 (`orders.py`, `menus.py`, `admin.py`)

**문제점:**
- `database.py`에 `get_db()` 함수가 정의되어 있지만 사용되지 않음
- 라우터에서 DB 세션을 받지 않음
- 서비스 레이어에 DB 세션을 전달하지 않음

**개선 방안:**
```python
@router.post("/", status_code=201)
async def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    created_order = await order_service_module.create_order(db, order_data)
    return created_order
```

---

## 🔴 2. 타입 안정성 및 검증 문제

### 2.1 타입 힌트 부족

**위치:**
- **`order_service.py`**: 함수 시그니처에 타입 힌트 부족
  ```python
  async def get_all_orders(filters: dict = None):  # dict 타입이 불명확
  async def create_order(order_data: dict):  # dict 타입이 불명확
  ```
- **`menu_service.py`**: 반환 타입 명시 없음
- **`admin_service.py`**: 타입 힌트 부족

**개선 방안:**
- `typing` 모듈 활용 (`Dict`, `List`, `Optional` 등)
- Pydantic 스키마 활용
- 반환 타입 명시

### 2.2 스키마 검증 우회

**위치:**
- **`orders.py` (14-15줄, 26-27줄)**: 스키마 검증을 우회하고 직접 반환
  ```python
  # 스키마 검증을 우회하고 직접 반환 (menu_name 포함)
  return created_order
  ```
- **`admin.py` (20-21줄)**: 동일한 패턴

**문제점:**
- Pydantic 스키마의 검증 기능을 활용하지 않음
- 타입 안정성 저하
- API 응답 형식 불일치 가능성

**개선 방안:**
- Pydantic 스키마를 사용한 응답 검증
- `response_model` 파라미터 활용
- 커스텀 스키마 생성 (필요한 필드 포함)

### 2.3 네이밍 컨벤션 불일치

**위치:**
- **`schemas.py` (50-54줄)**: `OrderItemCreate`에서 `menuId`, `menuName`, `menuPrice` (camelCase)
- **`schemas.py` (44-46줄)**: `OrderItemBase`에서 `menu_id` (snake_case)
- **`schemas.py` (75줄)**: `OrderCreate`에서 `customerId` (camelCase)
- **`schemas.py` (70줄)**: `OrderBase`에서 `customer_id` (snake_case)

**문제점:**
- API 요청/응답에서 camelCase와 snake_case 혼용
- 일관성 없는 네이밍으로 혼란 발생

**개선 방안:**
- 일관된 네이밍 컨벤션 선택
- Pydantic의 `Field`와 `alias` 활용
- 또는 FastAPI의 `response_model_by_alias` 설정

---

## 🟠 3. 코드 품질 문제

### 3.1 프로덕션 코드에 디버그 로그

**위치:** `order_service.py` (7개의 `print` 문)

- 57줄: `print(f"DEBUG: Received item {index}: {item}")`
- 79줄: `print(f"DEBUG: menu_name from item: ...")`
- 125줄: `print(f"DEBUG: Option calculation - ...")`
- 135줄: `print(f"DEBUG: Calculated unit_price: ...")`
- 150줄: `print(f"DEBUG: Created order_item with ...")`
- 171줄: `print(f"DEBUG: Final order total_price: ...")`
- 173줄: `print(f"DEBUG: Item {idx}: ...")`

**개선 방안:**
- Python의 `logging` 모듈 사용
- 로그 레벨 설정 (DEBUG, INFO, WARNING, ERROR)
- 개발 환경에서만 DEBUG 로그 출력

```python
import logging
logger = logging.getLogger(__name__)

# 개발 환경에서만
if os.getenv("ENV") == "development":
    logger.debug(f"Received item {index}: {item}")
```

### 3.2 하드코딩된 값

**위치:**
- **`main.py` (17줄)**: `allow_origins=["*"]` - 개발 환경에서만 사용해야 함
- **`main.py` (37줄)**: `port=5000` - 하드코딩
- **`run.py` (9줄)**: `port=5000` - 하드코딩
- **`database.py` (9줄)**: 기본값 하드코딩
- **`order_service.py` (159줄)**: `"anonymous"` - 매직 문자열
- **`menu_service.py` (12-64줄)**: 하드코딩된 샘플 메뉴 데이터

**개선 방안:**
- 환경 변수 사용
- 설정 파일 분리 (`config.py`)
- 상수 파일 생성

### 3.3 복잡한 비즈니스 로직

**위치:** `order_service.py` (31-178줄) - `create_order` 함수

**문제점:**
- 함수가 150줄 이상으로 너무 김
- 여러 책임을 가짐 (가격 계산, 옵션 처리, 메뉴 조회, 주문 생성)
- 테스트하기 어려운 구조
- 가독성 저하

**개선 방안:**
- 함수 분리:
  - `_calculate_item_price()` - 가격 계산
  - `_parse_customizations()` - 옵션 파싱
  - `_get_menu_info()` - 메뉴 정보 조회
  - `_create_order_items()` - 주문 항목 생성

---

## 🟡 4. 에러 처리 문제

### 4.1 에러 처리 부족

**위치:**
- **`order_service.py` (181-201줄)**: 주문을 찾지 못한 경우 기본값 반환
  ```python
  # 주문을 찾지 못한 경우 기본값 반환
  return {
      "id": order_id,
      "customer_id": "anonymous",
      "status": status,
      "total_price": 0,
      "items": [],
      ...
  }
  ```
- **`menu_service.py` (67-70줄)**: `get_menu_by_id`가 항상 `None` 반환
- **`menu_service.py` (110-113줄)**: `delete_menu`가 실제 삭제하지 않음

**문제점:**
- 예외를 발생시키지 않고 잘못된 데이터 반환
- 호출자가 에러 상황을 인지하기 어려움
- 일관성 없는 에러 처리

**개선 방안:**
- `HTTPException` 사용
- 커스텀 예외 클래스 생성
- 일관된 에러 응답 형식

### 4.2 예외 처리 일관성 부족

**위치:**
- **`orders.py` (34-36줄)**: `HTTPException` 사용
- **`menus.py` (20-22줄)**: `HTTPException` 사용
- **`order_service.py`**: 예외 처리 없음

**개선 방안:**
- 서비스 레이어에서 커스텀 예외 발생
- 라우터에서 예외 처리 통일
- 에러 핸들러 미들웨어 추가

---

## 🟡 5. 보안 문제

### 5.1 CORS 설정이 너무 개방적

**위치:** `main.py` (15-21줄)

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 환경에서는 모든 origin 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**문제점:**
- 프로덕션 환경에서 보안 위험
- 모든 origin 허용은 CSRF 공격에 취약

**개선 방안:**
- 환경 변수로 CORS 설정 분리
- 개발/프로덕션 환경별 설정

```python
import os
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
```

### 5.2 데이터베이스 URL 하드코딩

**위치:** `database.py` (9줄)

```python
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/orderbean")
```

**문제점:**
- 기본값에 하드코딩된 자격 증명
- 환경 변수가 없을 때 잘못된 연결 시도

**개선 방안:**
- 기본값 제거 또는 빈 문자열
- 필수 환경 변수 검증

---

## 🟡 6. 비동기 처리 문제

### 6.1 비동기 함수가 실제로 비동기 작업을 하지 않음

**위치:** 모든 서비스 파일

**문제점:**
- 모든 서비스 함수가 `async`로 정의되어 있지만 실제 비동기 작업 없음
- 메모리 조작만 수행 (I/O 작업 없음)
- 불필요한 `async/await` 오버헤드

**개선 방안:**
- 실제 DB 쿼리 시 비동기 사용 (SQLAlchemy async)
- 또는 동기 함수로 변경 (현재 구현 기준)

### 6.2 데이터베이스 세션 관리 부재

**위치:** 모든 서비스 파일

**문제점:**
- DB 세션을 받지 않음
- 트랜잭션 관리 없음
- 롤백 처리 없음

**개선 방안:**
- FastAPI의 `Depends(get_db)` 활용
- 컨텍스트 매니저로 세션 관리
- 트랜잭션 처리

---

## 🟡 7. 코드 중복

### 7.1 날짜/시간 생성 중복

**위치:**
- **`order_service.py`**: `datetime.utcnow()` 여러 번 사용
- **`menu_service.py`**: `datetime.utcnow()` 여러 번 사용

**개선 방안:**
- 유틸리티 함수로 분리
- 또는 모델의 `default` 값 활용

### 7.2 UUID 생성 중복

**위치:**
- **`order_service.py`**: `uuid.uuid4()` 여러 번 사용
- **`menu_service.py`**: `uuid.uuid4()` 사용

**개선 방안:**
- 모델의 `default=uuid.uuid4` 활용
- 또는 유틸리티 함수로 분리

### 7.3 메뉴 정보 조회 로직 중복

**위치:** `order_service.py` (38-50줄, 72-94줄)

**문제점:**
- 메뉴 정보를 조회하는 로직이 복잡하고 중복됨
- UUID 변환 로직 반복

**개선 방안:**
- `_get_menu_by_id()` 헬퍼 함수 생성
- 메뉴 조회 로직 통합

---

## 🟢 8. 테스트 가능성 문제

### 8.1 의존성 주입 부족

**위치:** 모든 서비스 파일

**문제점:**
- 서비스 함수가 전역 상태에 의존 (`_orders_storage`)
- 모킹이 어려운 구조
- 테스트 격리 불가능

**개선 방안:**
- 저장소를 의존성으로 주입
- 인터페이스 기반 설계
- 리포지토리 패턴 적용

### 8.2 전역 상태 사용

**위치:** `order_service.py` (5줄)

```python
_orders_storage: list = []
```

**문제점:**
- 테스트 간 상태 공유
- 테스트 격리 불가능
- 동시성 문제

**개선 방안:**
- 저장소를 클래스로 캡슐화
- 인스턴스 기반 접근
- 테스트용 모킹 저장소 제공

---

## 🟢 9. 문서화 및 주석 문제

### 9.1 주석 부족

**위치:** 여러 파일

**문제점:**
- 복잡한 로직에 주석 없음
- 함수 docstring 부족
- 비즈니스 로직 설명 없음

**개선 방안:**
- Google/NumPy 스타일 docstring 추가
- 복잡한 로직에 인라인 주석
- 타입 힌트와 함께 자동 문서화

### 9.2 불명확한 주석

**위치:**
- **`order_service.py` (1-2줄)**: "최소 구현" 주석만 있음
- **`menu_service.py` (1-2줄)**: "최소 구현" 주석만 있음

**개선 방안:**
- TODO 주석에 구체적인 계획 명시
- 또는 실제 구현으로 전환

---

## 🟢 10. 데이터 일관성 문제

### 10.1 주문 항목의 order_id 불일치

**위치:** `order_service.py` (140, 155-156줄)

```python
order_item = {
    "order_id": str(uuid.uuid4()),  # 임시 order_id
    ...
}
# 나중에 실제 order_id로 업데이트
for item in items:
    item["order_id"] = order_id
```

**문제점:**
- 임시 ID 생성 후 나중에 업데이트하는 패턴
- 데이터 일관성 문제 가능성

**개선 방안:**
- 먼저 order_id 생성 후 사용
- 또는 트랜잭션 내에서 처리

### 10.2 메뉴 정보 조회 실패 시 처리

**위치:** `order_service.py` (88-94줄)

**문제점:**
- 메뉴를 찾지 못한 경우 "알 수 없음"으로 처리
- 데이터 무결성 문제

**개선 방안:**
- 메뉴가 존재하지 않으면 예외 발생
- 또는 주문 생성 전 메뉴 유효성 검증

---

## 📊 우선순위별 개선 권장사항

### 🔴 높은 우선순위 (즉시 개선 필요)

1. **데이터베이스 연동**
   - SQLAlchemy를 사용한 실제 DB 연동
   - 메모리 저장소 제거
   - DB 세션 의존성 주입

2. **타입 안정성**
   - 타입 힌트 추가
   - Pydantic 스키마 검증 활용
   - 네이밍 컨벤션 통일

3. **에러 처리**
   - 일관된 예외 처리 전략
   - HTTPException 활용
   - 에러 핸들러 미들웨어

4. **보안**
   - CORS 설정 환경별 분리
   - 데이터베이스 URL 보안 강화

### 🟠 중간 우선순위 (단기 개선)

5. **코드 품질**
   - 디버그 로그 제거 또는 로깅 모듈 사용
   - 하드코딩된 값 제거
   - 복잡한 함수 분리

6. **비동기 처리**
   - 실제 비동기 작업 구현
   - 또는 동기 함수로 변경
   - DB 세션 관리

7. **코드 중복 제거**
   - 공통 로직 함수화
   - 유틸리티 모듈 생성

### 🟡 낮은 우선순위 (장기 개선)

8. **테스트 가능성**
   - 의존성 주입 패턴 적용
   - 전역 상태 제거
   - 리포지토리 패턴 적용

9. **문서화**
   - Docstring 추가
   - API 문서 보완
   - 주석 개선

10. **데이터 일관성**
    - 주문 생성 로직 개선
    - 메뉴 유효성 검증 강화
    - 트랜잭션 처리

---

## 📝 참고사항

이 분석은 코드 개선을 위한 가이드라인입니다. 실제 리팩토링 시에는 다음을 고려하세요:

1. **점진적 개선**: 한 번에 모든 것을 바꾸지 말고 단계적으로 개선
2. **테스트 작성**: 리팩토링 전후 테스트 작성으로 회귀 방지
3. **데이터 마이그레이션**: 메모리 저장소에서 DB로 전환 시 데이터 마이그레이션 계획
4. **문서화**: 변경 사항과 이유를 문서화

---

**생성일:** 2024년  
**분석 범위:** `backend/app/` 디렉토리 전체

