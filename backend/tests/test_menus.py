import pytest
from fastapi.testclient import TestClient

def test_get_all_menus(client: TestClient):
    """GET /api/menus - 빈 배열 반환"""
    response = client.get("/api/menus")
    assert response.status_code == 200
    assert response.json() == []

def test_get_menu_by_id_not_found(client: TestClient):
    """GET /api/menus/:id - 존재하지 않는 메뉴"""
    response = client.get("/api/menus/non-existent-id")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()

def test_create_menu(client: TestClient):
    """POST /api/menus - 메뉴 생성"""
    menu_data = {
        "name": "아메리카노",
        "price": 4000,
        "category": "커피"
    }
    response = client.post("/api/menus", json=menu_data)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "아메리카노"
    assert data["price"] == 4000
    assert "id" in data

def test_update_menu(client: TestClient):
    """PUT /api/menus/:id - 메뉴 수정"""
    # 먼저 메뉴 생성
    menu_data = {
        "name": "아메리카노",
        "price": 4000,
        "category": "커피"
    }
    create_response = client.post("/api/menus", json=menu_data)
    menu_id = create_response.json()["id"]
    
    # 메뉴 수정
    update_data = {
        "price": 4500
    }
    response = client.put(f"/api/menus/{menu_id}", json=update_data)
    assert response.status_code == 200
    assert response.json()["price"] == 4500

def test_delete_menu(client: TestClient):
    """DELETE /api/menus/:id - 메뉴 삭제"""
    # 먼저 메뉴 생성
    menu_data = {
        "name": "아메리카노",
        "price": 4000,
        "category": "커피"
    }
    create_response = client.post("/api/menus", json=menu_data)
    menu_id = create_response.json()["id"]
    
    # 메뉴 삭제
    response = client.delete(f"/api/menus/{menu_id}")
    assert response.status_code == 200
    assert response.json()["success"] is True

def test_toggle_availability(client: TestClient):
    """PATCH /api/menus/:id/toggle-availability - 메뉴 가용성 토글"""
    # 먼저 메뉴 생성
    menu_data = {
        "name": "아메리카노",
        "price": 4000,
        "category": "커피"
    }
    create_response = client.post("/api/menus", json=menu_data)
    menu_id = create_response.json()["id"]
    
    # 가용성 토글
    response = client.patch(f"/api/menus/{menu_id}/toggle-availability")
    assert response.status_code == 200
    assert response.json()["id"] == menu_id
    assert "is_available" in response.json()

