from fastapi import APIRouter, Query
from typing import Optional, List
from app import schemas
from app.services import admin_service as admin_service_module

router = APIRouter()


@router.get("/dashboard", response_model=schemas.DashboardStats)
async def get_dashboard():
    """대시보드 통계 조회"""
    stats = await admin_service_module.get_dashboard_stats()
    return stats


@router.get("/recent-orders", response_model=List[schemas.Order])
async def get_recent_orders(limit: Optional[int] = Query(None)):
    """최근 주문 조회"""
    orders = await admin_service_module.get_recent_orders(limit)
    return orders

