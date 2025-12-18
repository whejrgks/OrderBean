from fastapi import APIRouter, Query, Depends
from typing import Optional, List, Dict, Any
from sqlalchemy.orm import Session
from app import schemas
from app.database import get_db
from app.services import admin_service as admin_service_module

router = APIRouter()


@router.get("/dashboard", response_model=schemas.DashboardStats)
async def get_dashboard(db: Session = Depends(get_db)) -> schemas.DashboardStats:
    """대시보드 통계 조회"""
    stats = await admin_service_module.get_dashboard_stats()
    return stats


@router.get("/recent-orders", response_model=List[schemas.Order])
async def get_recent_orders(
    limit: Optional[int] = Query(None),
    db: Session = Depends(get_db)
) -> List[Dict[str, Any]]:
    """최근 주문 조회"""
    orders = await admin_service_module.get_recent_orders(limit)
    # TODO: 스키마 검증을 통과하도록 Order 스키마에 menu_name 필드 추가 필요
    return orders

