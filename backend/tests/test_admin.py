import pytest
from fastapi.testclient import TestClient

def test_get_dashboard(client: TestClient):
    """GET /api/admin/dashboard - 대시보드 통계"""
    response = client.get("/api/admin/dashboard")
    assert response.status_code == 200
    data = response.json()
    assert "total_orders" in data
    assert "pending_orders" in data
    assert "preparing_orders" in data
    assert "ready_orders" in data
    assert "completed_orders" in data
    assert "cancelled_orders" in data
    # 최소 구현에서는 모두 0
    assert data["total_orders"] == 0

def test_get_recent_orders(client: TestClient):
    """GET /api/admin/recent-orders - 최근 주문"""
    response = client.get("/api/admin/recent-orders")
    assert response.status_code == 200
    assert response.json() == []

def test_get_recent_orders_with_limit(client: TestClient):
    """GET /api/admin/recent-orders?limit=10 - limit 파라미터"""
    response = client.get("/api/admin/recent-orders?limit=10")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

