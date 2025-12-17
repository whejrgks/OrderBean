# 주문 서비스 - 최소 구현
# 나중에 SQLAlchemy를 사용한 실제 DB 연동으로 확장

# 메모리 기반 주문 저장소 (최소 구현용)
_orders_storage: list = []

async def get_all_orders(filters: dict = None):
    """모든 주문 조회"""
    # 최소 구현: 메모리에서 주문 조회
    orders = _orders_storage.copy()
    
    # 필터 적용
    if filters:
        if filters.get("customer_id"):
            orders = [o for o in orders if o.get("customer_id") == filters["customer_id"]]
        if filters.get("status"):
            orders = [o for o in orders if o.get("status") == filters["status"]]
    
    return orders


async def get_order_by_id(order_id: str):
    """ID로 주문 조회"""
    # 최소 구현: 메모리에서 주문 조회
    for order in _orders_storage:
        if order.get("id") == order_id:
            return order
    return None


async def create_order(order_data: dict):
    """주문 생성"""
    # 최소 구현: 주문 데이터를 그대로 반환 (임시 ID 및 계산된 총액 추가)
    import uuid
    from datetime import datetime
    
    total_price = 0  # 나중에 실제 계산 로직 추가
    
    items = []
    for index, item in enumerate(order_data.get("items", [])):
        # menuId를 menu_id로 변환 (스키마는 menuId로 받지만 DB는 menu_id)
        menu_id_str = item.get("menuId") or item.get("menu_id")
        # 문자열을 UUID로 변환 시도, 실패하면 새 UUID 생성
        try:
            menu_id = str(uuid.UUID(menu_id_str)) if menu_id_str else str(uuid.uuid4())
        except (ValueError, AttributeError):
            # 유효하지 않은 UUID 형식이면 새 UUID 생성
            menu_id = str(uuid.uuid4())
        
        items.append({
            "id": str(uuid.uuid4()),
            "order_id": str(uuid.uuid4()),  # 임시 order_id (나중에 실제 order_id로 업데이트)
            "menu_id": menu_id,
            "quantity": item.get("quantity"),
            "price": 0,  # 나중에 실제 가격 계산
            "customizations": item.get("customizations"),
            "created_at": datetime.utcnow().isoformat(),
        })
    
    order_id = str(uuid.uuid4())
    # items의 order_id를 실제 order_id로 업데이트
    for item in items:
        item["order_id"] = order_id
    
    # customerId 또는 customer_id 둘 다 처리
    customer_id = order_data.get("customerId") or order_data.get("customer_id") or "anonymous"
    
    order = {
        "id": order_id,
        "customer_id": customer_id,
        "status": "PENDING",
        "total_price": total_price,
        "items": items,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }
    
    # 메모리에 저장
    _orders_storage.append(order)
    
    return order


async def update_order_status(order_id: str, status: str):
    """주문 상태 업데이트"""
    # 최소 구현: 메모리에서 주문 찾아서 상태 업데이트
    from datetime import datetime
    
    for order in _orders_storage:
        if order.get("id") == order_id:
            order["status"] = status
            order["updated_at"] = datetime.utcnow().isoformat()
            return order
    
    # 주문을 찾지 못한 경우 기본값 반환
    return {
        "id": order_id,
        "customer_id": "anonymous",
        "status": status,
        "total_price": 0,
        "items": [],
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }

