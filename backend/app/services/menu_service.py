"""메뉴 서비스"""
import uuid
from typing import List, Dict, Any, Optional
from uuid import UUID
from app.utils.logger import logger
from app.utils.exceptions import MenuNotFoundError
from app.utils.datetime_utils import get_current_utc_time

# TODO: 실제 데이터베이스 연동으로 전환 필요

# 샘플 메뉴 데이터 (실제 DB 연동 전까지 사용)
_SAMPLE_MENUS = [
    {
        "name": "아메리카노(ICE)",
        "description": "시원한 아이스 아메리카노",
        "price": 4000,
        "category": "커피",
        "image_url": "/americano-ice.jpg",
        "is_available": True,
        "options": {
            "items": [
                {"name": "샷 추가", "price": 500},
                {"name": "시럽 추가", "price": 0}
            ]
        },
    },
    {
        "name": "아메리카노(HOT)",
        "description": "따뜻한 핫 아메리카노",
        "price": 4000,
        "category": "커피",
        "image_url": "/americano-hot.jpg",
        "is_available": True,
        "options": {
            "items": [
                {"name": "샷 추가", "price": 500},
                {"name": "시럽 추가", "price": 0}
            ]
        },
    },
    {
        "name": "카페라떼",
        "description": "부드러운 카페라떼",
        "price": 5000,
        "category": "커피",
        "image_url": "/cafe-latte.jpg",
        "is_available": True,
        "options": {
            "items": [
                {"name": "샷 추가", "price": 500},
                {"name": "시럽 추가", "price": 0}
            ]
        },
    },
]


def _create_menu_with_metadata(menu_data: Dict[str, Any]) -> Dict[str, Any]:
    """메뉴 데이터에 메타데이터를 추가합니다.
    
    Args:
        menu_data: 메뉴 데이터 딕셔너리
        
    Returns:
        메타데이터가 추가된 메뉴 딕셔너리
    """
    now = get_current_utc_time()
    return {
        "id": UUID(str(uuid.uuid4())),
        **menu_data,
        "created_at": now,
        "updated_at": now,
    }


async def get_all_menus() -> List[Dict[str, Any]]:
    """모든 메뉴 조회
    
    Returns:
        메뉴 리스트
    """
    # TODO: 실제 데이터베이스에서 조회하도록 구현 필요
    return [_create_menu_with_metadata(menu) for menu in _SAMPLE_MENUS]


async def get_menu_by_id(menu_id: str) -> Optional[Dict[str, Any]]:
    """ID로 메뉴 조회
    
    Args:
        menu_id: 메뉴 ID
        
    Returns:
        메뉴 딕셔너리 또는 None
        
    Raises:
        MenuNotFoundError: 메뉴를 찾을 수 없는 경우
    """
    # TODO: 실제 데이터베이스에서 조회하도록 구현 필요
    all_menus = await get_all_menus()
    for menu in all_menus:
        if str(menu.get("id")) == str(menu_id):
            return menu
    return None


async def create_menu(menu_data: Dict[str, Any]) -> Dict[str, Any]:
    """메뉴 생성
    
    Args:
        menu_data: 메뉴 데이터 딕셔너리
        
    Returns:
        생성된 메뉴 딕셔너리
    """
    # TODO: 실제 데이터베이스에 저장하도록 구현 필요
    menu = _create_menu_with_metadata(menu_data)
    logger.info(f"Menu created: id={menu['id']}, name={menu_data.get('name')}")
    return menu


async def update_menu(menu_id: str, menu_data: Dict[str, Any]) -> Dict[str, Any]:
    """메뉴 수정
    
    Args:
        menu_id: 메뉴 ID
        menu_data: 업데이트할 메뉴 데이터
        
    Returns:
        업데이트된 메뉴 딕셔너리
        
    Raises:
        MenuNotFoundError: 메뉴를 찾을 수 없는 경우
    """
    # TODO: 실제 데이터베이스에서 조회 및 업데이트하도록 구현 필요
    existing_menu = await get_menu_by_id(menu_id)
    if not existing_menu:
        raise MenuNotFoundError(menu_id)
    
    from app.utils.datetime_utils import format_datetime_iso
    
    updated_menu = {
        **existing_menu,
        **menu_data,
        "updated_at": format_datetime_iso(),
    }
    logger.info(f"Menu updated: id={menu_id}")
    return updated_menu


async def delete_menu(menu_id: str) -> None:
    """메뉴 삭제
    
    Args:
        menu_id: 메뉴 ID
        
    Raises:
        MenuNotFoundError: 메뉴를 찾을 수 없는 경우
    """
    # TODO: 실제 데이터베이스에서 삭제하도록 구현 필요
    existing_menu = await get_menu_by_id(menu_id)
    if not existing_menu:
        raise MenuNotFoundError(menu_id)
    
    logger.info(f"Menu deleted: id={menu_id}")


async def toggle_availability(menu_id: str) -> Dict[str, Any]:
    """메뉴 가용성 토글
    
    Args:
        menu_id: 메뉴 ID
        
    Returns:
        업데이트된 메뉴 딕셔너리
        
    Raises:
        MenuNotFoundError: 메뉴를 찾을 수 없는 경우
    """
    # TODO: 실제 데이터베이스에서 토글하도록 구현 필요
    existing_menu = await get_menu_by_id(menu_id)
    if not existing_menu:
        raise MenuNotFoundError(menu_id)
    
    from app.utils.datetime_utils import format_datetime_iso
    
    existing_menu["is_available"] = not existing_menu.get("is_available", True)
    existing_menu["updated_at"] = format_datetime_iso()
    
    logger.info(f"Menu availability toggled: id={menu_id}, is_available={existing_menu['is_available']}")
    return existing_menu

