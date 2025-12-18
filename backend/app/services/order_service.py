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
    from app.services import menu_service
    
    # 모든 메뉴 가져오기 (메뉴 정보 조회용)
    all_menus = await menu_service.get_all_menus()
    # UUID 객체를 문자열로 변환하여 딕셔너리 생성
    menu_dict = {}
    for menu in all_menus:
        # menu는 딕셔너리이므로 직접 접근
        menu_id = menu.get("id")
        if menu_id:
            # UUID 객체를 문자열로 변환
            menu_id_str = str(menu_id)
            menu_dict[menu_id_str] = menu
            # 대소문자 구분 없이도 매칭되도록 소문자 버전도 추가
            menu_dict[menu_id_str.lower()] = menu
    
    total_price = 0
    
    items = []
    for index, item in enumerate(order_data.get("items", [])):
        # 디버깅: 받은 데이터 확인
        print(f"DEBUG: Received item {index}: {item}")
        
        # menuId를 menu_id로 변환 (스키마는 menuId로 받지만 DB는 menu_id)
        menu_id_str = item.get("menuId") or item.get("menu_id")
        if not menu_id_str:
            menu_id = str(uuid.uuid4())
        else:
            # 문자열을 UUID로 변환 시도
            try:
                # UUID 형식으로 정규화 (대소문자 구분 없이)
                menu_id = str(uuid.UUID(str(menu_id_str)))
            except (ValueError, AttributeError):
                # 유효하지 않은 UUID 형식이면 그대로 사용 (이미 문자열인 경우)
                menu_id = str(menu_id_str)
        
        # 메뉴 정보 가져오기 (여러 방법으로 시도)
        menu_info = menu_dict.get(menu_id) or menu_dict.get(menu_id.lower()) or menu_dict.get(str(menu_id).lower())
        
        # 프론트엔드에서 menuName과 menuPrice를 전달한 경우 우선 사용
        menu_name = item.get("menuName") or item.get("menu_name")
        menu_price = item.get("menuPrice") or item.get("menu_price") or 0
        
        print(f"DEBUG: menu_name from item: {menu_name}, menu_price from item: {menu_price}, menu_info found: {menu_info is not None}")
        
        if menu_info:
            # 메뉴 정보가 있으면 가격과 이름 가져오기
            if not menu_name:
                menu_name = menu_info.get("name", "알 수 없음")
            # 프론트엔드에서 가격을 전달하지 않은 경우에만 메뉴 정보에서 가격 가져오기
            if not menu_price or menu_price == 0:
                menu_price = menu_info.get("price", 0)
        else:
            # 메뉴를 찾지 못한 경우
            if not menu_name:
                menu_name = "알 수 없음"
            # 프론트엔드에서 가격을 전달하지 않은 경우 0으로 설정
            if not menu_price:
                menu_price = 0
        
        # 옵션 가격 계산 (customizations가 있을 때만)
        option_price = 0
        selected_options = []
        customizations = item.get("customizations")
        
        if customizations:
            # customizations가 options 배열을 포함하는 경우 (프론트엔드에서 전달하는 형식)
            if isinstance(customizations, dict) and "options" in customizations:
                options_list = customizations.get("options", [])
                if isinstance(options_list, list) and len(options_list) > 0:
                    for opt in options_list:
                        if isinstance(opt, dict):
                            opt_price = opt.get("price", 0)
                            opt_name = opt.get("name", "")
                            if opt_name:  # 옵션 이름이 있을 때만 추가
                                option_price += opt_price
                                selected_options.append(opt_name)
            # customizations가 직접 옵션 정보를 포함하는 경우 (예: {"샷 추가": True})
            elif isinstance(customizations, dict) and menu_info:
                menu_options = menu_info.get("options", {})
                if isinstance(menu_options, dict) and "items" in menu_options:
                    for opt in menu_options.get("items", []):
                        opt_name = opt.get("name", "")
                        # customizations에 해당 옵션 이름이 있고 True인 경우만
                        if opt_name and customizations.get(opt_name) is True:
                            opt_price = opt.get("price", 0)
                            option_price += opt_price
                            selected_options.append(opt_name)
        
        print(f"DEBUG: Option calculation - customizations: {customizations}, option_price: {option_price}, selected_options: {selected_options}")
        
        # 메뉴 가격이 0이면 기본 가격 사용 (메뉴 정보가 있는 경우)
        if menu_price == 0 and menu_info:
            menu_price = menu_info.get("price", 0)
        
        # 단가 계산 (메뉴 가격 + 옵션 가격)
        unit_price = menu_price + option_price
        # 총 가격 계산 (단가 × 수량)
        item_total_price = unit_price * item.get("quantity", 1)
        print(f"DEBUG: Calculated unit_price: {unit_price} (menu_price: {menu_price}, option_price: {option_price}), quantity: {item.get('quantity', 1)}, item_total_price: {item_total_price}")
        total_price += item_total_price
        
        order_item = {
            "id": str(uuid.uuid4()),
            "order_id": str(uuid.uuid4()),  # 임시 order_id (나중에 실제 order_id로 업데이트)
            "menu_id": menu_id,
            "menu_name": menu_name,  # 메뉴 이름 추가
            "quantity": item.get("quantity", 1),
            "price": item_total_price,  # 총 가격 (단가 × 수량)
            "unit_price": unit_price,  # 단가 추가 (표시용)
            "customizations": item.get("customizations"),
            "selected_options": selected_options,  # 선택된 옵션 목록 추가
            "created_at": datetime.utcnow().isoformat(),
        }
        print(f"DEBUG: Created order_item with menu_name: {order_item.get('menu_name')}, unit_price: {unit_price}, total_price: {item_total_price}, quantity: {item.get('quantity', 1)}, options: {selected_options}")
        items.append(order_item)
    
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
    
    print(f"DEBUG: Final order total_price: {total_price}, items count: {len(items)}")
    for idx, itm in enumerate(items):
        print(f"DEBUG: Item {idx}: {itm.get('menu_name')} x {itm.get('quantity')} = {itm.get('price')}원")
    
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

