# 📡 OrderBean API 문서

## Base URL
```
http://localhost:5000/api
```

## 인증
현재 버전에서는 인증이 필요하지 않습니다. 향후 버전에서 JWT 기반 인증이 추가될 예정입니다.

---

## 엔드포인트

### Health Check

#### `GET /health`
서버 상태를 확인합니다.

**응답 예시:**
```json
{
  "status": "ok",
  "message": "OrderBean API Server"
}
```

---

### 메뉴 (Menus)

#### `GET /menus`
모든 메뉴를 조회합니다.

**Query Parameters:**
- `category` (선택) - 카테고리로 필터링

**응답 예시:**
```json
{
  "menus": [
    {
      "id": "uuid",
      "name": "아메리카노",
      "description": "진한 에스프레소에 뜨거운 물을 부어 만든 깔끔한 커피",
      "price": 4000,
      "category": "커피",
      "imageUrl": "https://example.com/image.jpg",
      "isAvailable": true,
      "options": {
        "shots": { "min": 1, "max": 4, "default": 2 },
        "size": { "type": ["Small", "Medium", "Large"], "default": "Medium" }
      },
      "createdAt": "2024-12-16T00:00:00.000Z",
      "updatedAt": "2024-12-16T00:00:00.000Z"
    }
  ]
}
```

#### `GET /menus/:id`
특정 메뉴를 조회합니다.

**Path Parameters:**
- `id` - 메뉴 UUID

**응답 예시:**
```json
{
  "menu": {
    "id": "uuid",
    "name": "아메리카노",
    ...
  }
}
```

#### `POST /menus`
새 메뉴를 생성합니다.

**Request Body:**
```json
{
  "name": "카페라떼",
  "description": "부드러운 우유와 에스프레소의 조화",
  "price": 4500,
  "category": "라떼",
  "imageUrl": "https://example.com/latte.jpg",
  "isAvailable": true,
  "options": {
    "shots": { "min": 1, "max": 4, "default": 2 },
    "milk": { "type": ["일반우유", "저지방우유", "두유"], "default": "일반우유" }
  }
}
```

**응답:** 생성된 메뉴 객체

#### `PUT /menus/:id`
메뉴 정보를 수정합니다.

**Path Parameters:**
- `id` - 메뉴 UUID

**Request Body:** 수정할 필드만 포함

#### `DELETE /menus/:id`
메뉴를 삭제합니다.

**Path Parameters:**
- `id` - 메뉴 UUID

**응답:**
```json
{
  "message": "Menu deleted successfully"
}
```

#### `PATCH /menus/:id/toggle-availability`
메뉴의 품절/판매 재개 상태를 전환합니다.

**Path Parameters:**
- `id` - 메뉴 UUID

**응답:** 업데이트된 메뉴 객체

---

### 주문 (Orders)

#### `POST /orders`
새 주문을 생성합니다.

**Request Body:**
```json
{
  "customerId": "customer-123",  // 선택사항
  "items": [
    {
      "menuId": "menu-uuid",
      "quantity": 2,
      "customizations": {
        "shots": 3,
        "size": "Large",
        "milk": "두유"
      }
    }
  ]
}
```

**응답 예시:**
```json
{
  "order": {
    "id": "order-uuid",
    "customerId": "customer-123",
    "status": "PENDING",
    "totalPrice": 9000,
    "items": [
      {
        "id": "item-uuid",
        "menuId": "menu-uuid",
        "quantity": 2,
        "customizations": { ... },
        "price": 9000,
        "menu": {
          "id": "menu-uuid",
          "name": "카페라떼",
          "price": 4500
        }
      }
    ],
    "createdAt": "2024-12-16T00:00:00.000Z",
    "updatedAt": "2024-12-16T00:00:00.000Z"
  }
}
```

#### `GET /orders`
주문 목록을 조회합니다.

**Query Parameters:**
- `customerId` (선택) - 고객 ID로 필터링
- `status` (선택) - 주문 상태로 필터링 (`PENDING`, `PREPARING`, `READY`, `COMPLETED`, `CANCELLED`)

**응답 예시:**
```json
{
  "orders": [
    {
      "id": "order-uuid",
      "customerId": "customer-123",
      "status": "PENDING",
      "totalPrice": 9000,
      "items": [ ... ],
      "createdAt": "2024-12-16T00:00:00.000Z"
    }
  ]
}
```

#### `GET /orders/:id`
특정 주문을 조회합니다.

**Path Parameters:**
- `id` - 주문 UUID

**응답:** 주문 객체 (items 포함)

#### `PATCH /orders/:id/status`
주문 상태를 업데이트합니다.

**Path Parameters:**
- `id` - 주문 UUID

**Request Body:**
```json
{
  "status": "PREPARING"
}
```

**응답:** 업데이트된 주문 객체

---

### 관리자 (Admin)

#### `GET /admin/dashboard`
대시보드 통계를 조회합니다.

**응답 예시:**
```json
{
  "totalOrders": 150,
  "totalRevenue": 675000,
  "todayOrders": 25,
  "todayRevenue": 112500,
  "pendingOrders": 3,
  "preparingOrders": 5,
  "readyOrders": 2,
  "hourlyStats": {
    "8": 5,
    "9": 8,
    "10": 12,
    ...
  },
  "dailyStats": {
    "2024-12-16": 112500,
    "2024-12-15": 98000,
    ...
  }
}
```

#### `GET /admin/recent-orders`
최근 주문 목록을 조회합니다.

**Query Parameters:**
- `limit` (선택) - 조회할 주문 수 (기본값: 10)

**응답 예시:**
```json
{
  "orders": [
    {
      "id": "order-uuid",
      "customerId": "customer-123",
      "status": "PENDING",
      "totalPrice": 9000,
      "items": [ ... ],
      "createdAt": "2024-12-16T00:00:00.000Z"
    }
  ]
}
```

---

## 주문 상태 (Order Status)

주문은 다음 상태를 가질 수 있습니다:

| 상태 | 설명 | 다음 가능한 상태 |
|------|------|------------------|
| `PENDING` | 주문 접수 | `PREPARING`, `CANCELLED` |
| `PREPARING` | 제조 중 | `READY`, `CANCELLED` |
| `READY` | 준비 완료 | `COMPLETED`, `CANCELLED` |
| `COMPLETED` | 픽업 완료 | (최종 상태) |
| `CANCELLED` | 취소됨 | (최종 상태) |

---

## 에러 응답

모든 에러는 다음 형식으로 반환됩니다:

```json
{
  "error": "에러 메시지"
}
```

### HTTP 상태 코드
- `200` - 성공
- `201` - 생성 성공
- `400` - 잘못된 요청
- `404` - 리소스를 찾을 수 없음
- `500` - 서버 오류

---

## 예제 요청

### cURL 예제

```bash
# 메뉴 목록 조회
curl http://localhost:5000/api/menus

# 주문 생성
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "menuId": "menu-uuid",
        "quantity": 1
      }
    ]
  }'

# 주문 상태 업데이트
curl -X PATCH http://localhost:5000/api/orders/order-uuid/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "PREPARING"
  }'
```

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024-12-16

