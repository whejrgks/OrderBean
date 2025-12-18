"""메뉴 관련 유틸리티"""
from typing import Dict, Any, Optional
from uuid import UUID


def normalize_menu_id(menu_id: str) -> str:
    """메뉴 ID를 정규화합니다.
    
    Args:
        menu_id: 메뉴 ID 문자열
        
    Returns:
        정규화된 메뉴 ID 문자열
    """
    try:
        return str(UUID(str(menu_id)))
    except (ValueError, AttributeError):
        return str(menu_id)


def build_menu_dict(menus: list) -> Dict[str, Dict[str, Any]]:
    """메뉴 리스트를 딕셔너리로 변환합니다.
    
    Args:
        menus: 메뉴 리스트
        
    Returns:
        메뉴 ID를 키로 하는 딕셔너리
    """
    menu_dict: Dict[str, Dict[str, Any]] = {}
    for menu in menus:
        menu_id = menu.get("id")
        if menu_id:
            menu_id_str = str(menu_id)
            menu_dict[menu_id_str] = menu
            menu_dict[menu_id_str.lower()] = menu
    return menu_dict


def get_menu_info(
    menu_dict: Dict[str, Dict[str, Any]],
    menu_id: str,
    fallback_name: str = "알 수 없음",
    fallback_price: int = 0
) -> tuple[str, int]:
    """메뉴 정보를 가져옵니다.
    
    Args:
        menu_dict: 메뉴 딕셔너리
        menu_id: 메뉴 ID
        fallback_name: 메뉴를 찾지 못한 경우 사용할 기본 이름
        fallback_price: 메뉴를 찾지 못한 경우 사용할 기본 가격
        
    Returns:
        (메뉴 이름, 메뉴 가격) 튜플
    """
    menu_info = menu_dict.get(menu_id) or menu_dict.get(menu_id.lower())
    
    if menu_info:
        return (
            menu_info.get("name", fallback_name),
            menu_info.get("price", fallback_price)
        )
    
    return (fallback_name, fallback_price)

