"""관리자 서비스"""
from typing import Dict, Any, List, Optional
from app.utils.logger import logger

# TODO: 실제 데이터베이스 연동으로 전환 필요


async def get_dashboard_stats() -> Dict[str, int]:
    """대시보드 통계 조회"""
    # 최소 구현: order_service에서 주문 목록을 가져와서 통계 계산
    from app.services import order_service
    
    orders = await order_service.get_all_orders()
    
    # 상태별로 주문 개수 계산
    stats = {
        "total_orders": len(orders),
        "pending_orders": 0,      # 주문 접수 (PENDING)
        "preparing_orders": 0,    # 제조 중 (PREPARING)
        "ready_orders": 0,        # 제조 완료 (READY)
        "completed_orders": 0,    # 픽업 완료 (COMPLETED)
        "cancelled_orders": 0,    # 취소됨 (CANCELLED)
    }
    
    for order in orders:
        status = order.get("status", "").upper()
        if status == "PENDING":
            stats["pending_orders"] += 1
        elif status == "PREPARING":
            stats["preparing_orders"] += 1
        elif status == "READY":
            stats["ready_orders"] += 1
        elif status == "COMPLETED":
            stats["completed_orders"] += 1
        elif status == "CANCELLED":
            stats["cancelled_orders"] += 1
    
    return stats


async def get_recent_orders(limit: Optional[int] = None) -> List[Dict[str, Any]]:
    """최근 주문 조회"""
    # 최소 구현: order_service에서 주문 목록 가져오기
    from app.services import order_service
    
    orders = await order_service.get_all_orders()
    
    # 최신순으로 정렬 (created_at 기준)
    if orders:
        orders.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    
    # limit이 지정되면 제한
    if limit and orders:
        orders = orders[:limit]
    
    return orders

