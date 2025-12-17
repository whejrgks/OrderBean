import pytest
from fastapi.testclient import TestClient

def test_get_all_orders(client: TestClient):
    """GET /api/orders - 빈 배열 반환"""
    response = client.get("/api/orders")
    assert response.status_code == 200
    assert response.json() == []

def test_create_order(client: TestClient):
    """POST /api/orders - 주문 생성"""
    order_data = {
        "items": [
            {
                "menuId": "menu-id-1",
                "quantity": 2
            }
        ]
    }
    response = client.post("/api/orders", json=order_data)
    assert response.status_code == 201
    data = response.json()
    assert data["status"] == "PENDING"
    assert "id" in data
    assert "items" in data
    assert len(data["items"]) == 1

def test_create_order_with_customer_id(client: TestClient):
    """POST /api/orders - 고객 ID와 함께 주문 생성"""
    order_data = {
        "customerId": "customer-123",
        "items": [
            {
                "menuId": "menu-id-1",
                "quantity": 1
            }
        ]
    }
    response = client.post("/api/orders", json=order_data)
    assert response.status_code == 201
    data = response.json()
    # Pydantic은 기본적으로 snake_case로 반환 (customer_id)
    assert data["customer_id"] == "customer-123"

def test_get_order_by_id_not_found(client: TestClient):
    """GET /api/orders/:id - 존재하지 않는 주문"""
    response = client.get("/api/orders/non-existent-id")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()

def test_get_orders_with_filters(client: TestClient):
    """GET /api/orders?customerId=xxx&status=PENDING - 필터링"""
    # 주문 생성
    order_data = {
        "customerId": "customer-123",
        "items": [{"menuId": "menu-1", "quantity": 1}]
    }
    client.post("/api/orders", json=order_data)
    
    # 필터링된 주문 조회
    response = client.get("/api/orders?customerId=customer-123&status=PENDING")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_order_status(client: TestClient):
    """PATCH /api/orders/:id/status - 주문 상태 업데이트"""
    # 먼저 주문 생성
    order_data = {
        "items": [{"menuId": "menu-1", "quantity": 1}]
    }
    create_response = client.post("/api/orders", json=order_data)
    order_id = create_response.json()["id"]
    
    # 상태 업데이트
    response = client.patch(
        f"/api/orders/{order_id}/status",
        json={"status": "PREPARING"}
    )
    assert response.status_code == 200
    assert response.json()["status"] == "PREPARING"

