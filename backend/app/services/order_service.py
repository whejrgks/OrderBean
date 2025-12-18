"""주문 서비스"""
import logging
import uuid
from typing import Dict, List, Optional, Any
from uuid import UUID
from app.utils.logger import logger
from app.utils.exceptions import OrderNotFoundError, InvalidOrderDataError
from app.utils.price_calculator import calculate_item_total_price, extract_selected_options
from app.utils.datetime_utils import get_current_utc_time, format_datetime_iso
from app.utils.menu_utils import normalize_menu_id, build_menu_dict, get_menu_info
from app.config import DEFAULT_CUSTOMER_ID

# 메모리 기반 주문 저장소 (최소 구현용)
# TODO: 실제 데이터베이스 연동으로 전환 필요
_orders_storage: List[Dict[str, Any]] = []


async def get_all_orders(filters: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
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


async def get_order_by_id(order_id: str) -> Optional[Dict[str, Any]]:
    """ID로 주문 조회
    
    Args:
        order_id: 주문 ID
        
    Returns:
        주문 딕셔너리 또는 None
    """
    # 최소 구현: 메모리에서 주문 조회
    for order in _orders_storage:
        if order.get("id") == order_id:
            return order
    return None


async def _get_menu_dict() -> Dict[str, Dict[str, Any]]:
    """메뉴 딕셔너리를 가져옵니다.
    
    Returns:
        메뉴 ID를 키로 하는 딕셔너리
    """
    from app.services import menu_service
    
    all_menus = await menu_service.get_all_menus()
    return build_menu_dict(all_menus)


def _process_order_item(
    item: Dict[str, Any],
    index: int,
    menu_dict: Dict[str, Dict[str, Any]]
) -> Dict[str, Any]:
    """주문 항목을 처리합니다.
    
    Args:
        item: 주문 항목 딕셔너리
        index: 항목 인덱스
        menu_dict: 메뉴 딕셔너리
        
    Returns:
        처리된 주문 항목 딕셔너리
        
    Raises:
        InvalidOrderDataError: 주문 항목이 유효하지 않은 경우
    """
    # menuId를 menu_id로 변환
    menu_id_str = item.get("menuId") or item.get("menu_id")
    if not menu_id_str:
        raise InvalidOrderDataError(f"주문 항목 {index}에 menuId가 없습니다")
    
    menu_id = normalize_menu_id(menu_id_str)
    
    # 프론트엔드에서 전달한 값 우선 사용
    menu_name = item.get("menuName") or item.get("menu_name")
    menu_price = item.get("menuPrice") or item.get("menu_price") or 0
    
    # 메뉴 정보 가져오기
    menu_info_name, menu_info_price = get_menu_info(menu_dict, menu_id)
    
    # 메뉴 정보가 있으면 사용
    if not menu_name:
        menu_name = menu_info_name
    if not menu_price or menu_price == 0:
        menu_price = menu_info_price
    
    customizations = item.get("customizations")
    selected_options = extract_selected_options(customizations)
    
    # 수량 검증
    quantity = item.get("quantity", 1)
    if quantity <= 0:
        raise InvalidOrderDataError(f"주문 항목 {index}의 수량이 유효하지 않습니다")
    
    # 가격 계산
    item_total_price = calculate_item_total_price(menu_price, quantity, customizations)
    
    return {
        "id": str(uuid.uuid4()),
        "order_id": "",  # 나중에 실제 order_id로 업데이트
        "menu_id": menu_id,
        "menu_name": menu_name,
        "quantity": quantity,
        "price": item_total_price,
        "customizations": customizations,
        "selected_options": selected_options,
        "created_at": format_datetime_iso(),
    }


def _create_order_items(
    items_data: List[Dict[str, Any]],
    menu_dict: Dict[str, Dict[str, Any]]
) -> tuple[List[Dict[str, Any]], int]:
    """주문 항목들을 생성합니다.
    
    Args:
        items_data: 주문 항목 데이터 리스트
        menu_dict: 메뉴 딕셔너리
        
    Returns:
        (주문 항목 리스트, 총 가격) 튜플
        
    Raises:
        InvalidOrderDataError: 주문 항목이 유효하지 않은 경우
    """
    total_price = 0
    items: List[Dict[str, Any]] = []
    
    for index, item in enumerate(items_data):
        if logger.isEnabledFor(logging.DEBUG):
            logger.debug(f"Processing order item {index}: {item}")
        
        order_item = _process_order_item(item, index, menu_dict)
        total_price += order_item["price"]
        items.append(order_item)
    
    return items, total_price


async def create_order(order_data: Dict[str, Any]) -> Dict[str, Any]:
    """주문 생성
    
    Args:
        order_data: 주문 데이터 딕셔너리
        
    Returns:
        생성된 주문 딕셔너리
        
    Raises:
        InvalidOrderDataError: 주문 데이터가 유효하지 않은 경우
    """
    from app.services import menu_service
    
    if not order_data.get("items"):
        raise InvalidOrderDataError("주문 항목이 없습니다")
    
    # 모든 메뉴 가져오기 (메뉴 정보 조회용)
    menu_dict = await _get_menu_dict()
    
    # 주문 항목 생성
    items, total_price = _create_order_items(order_data.get("items", []), menu_dict)
    
    # order_id 생성 후 items 업데이트
    order_id = str(uuid.uuid4())
    for item in items:
        item["order_id"] = order_id
    
    # customerId 또는 customer_id 처리
    customer_id = order_data.get("customerId") or order_data.get("customer_id") or DEFAULT_CUSTOMER_ID
    
    now = format_datetime_iso()
    order = {
        "id": order_id,
        "customer_id": customer_id,
        "status": "PENDING",
        "total_price": total_price,
        "items": items,
        "created_at": now,
        "updated_at": now,
    }
    
    logger.info(f"Created order: id={order_id}, total_price={total_price}, items_count={len(items)}")
    
    # 메모리에 저장
    _orders_storage.append(order)
    
    return order


async def update_order_status(order_id: str, status: str) -> Dict[str, Any]:
    """주문 상태 업데이트
    
    Args:
        order_id: 주문 ID
        status: 새로운 상태
        
    Returns:
        업데이트된 주문 딕셔너리
        
    Raises:
        OrderNotFoundError: 주문을 찾을 수 없는 경우
    """
    for order in _orders_storage:
        if order.get("id") == order_id:
            order["status"] = status
            order["updated_at"] = format_datetime_iso()
            logger.info(f"Order {order_id} status updated to {status}")
            return order
    
    # 주문을 찾지 못한 경우 예외 발생
    raise OrderNotFoundError(order_id)

