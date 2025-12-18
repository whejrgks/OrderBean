"""가격 계산 유틸리티"""
from typing import Dict, Any, List, Optional


def calculate_option_price(customizations: Optional[Dict[str, Any]]) -> int:
    """옵션 가격을 계산합니다.
    
    Args:
        customizations: 커스터마이징 옵션 딕셔너리
        
    Returns:
        옵션 가격의 합계
    """
    if not customizations:
        return 0
    
    option_price = 0
    
    # customizations가 options 배열을 포함하는 경우
    if isinstance(customizations, dict) and "options" in customizations:
        options_list = customizations.get("options", [])
        if isinstance(options_list, list):
            for opt in options_list:
                if isinstance(opt, dict):
                    option_price += opt.get("price", 0)
    
    return option_price


def extract_selected_options(customizations: Optional[Dict[str, Any]]) -> List[str]:
    """선택된 옵션 이름 목록을 추출합니다.
    
    Args:
        customizations: 커스터마이징 옵션 딕셔너리
        
    Returns:
        선택된 옵션 이름 리스트
    """
    if not customizations:
        return []
    
    selected_options = []
    
    # customizations가 options 배열을 포함하는 경우
    if isinstance(customizations, dict) and "options" in customizations:
        options_list = customizations.get("options", [])
        if isinstance(options_list, list):
            for opt in options_list:
                if isinstance(opt, dict):
                    opt_name = opt.get("name", "")
                    if opt_name:
                        selected_options.append(opt_name)
    
    return selected_options


def calculate_item_total_price(
    base_price: int,
    quantity: int,
    customizations: Optional[Dict[str, Any]] = None
) -> int:
    """아이템의 총 가격을 계산합니다.
    
    Args:
        base_price: 기본 가격
        quantity: 수량
        customizations: 커스터마이징 옵션
        
    Returns:
        총 가격 (기본 가격 + 옵션 가격) × 수량
    """
    option_price = calculate_option_price(customizations)
    unit_price = base_price + option_price
    return unit_price * quantity

