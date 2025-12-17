from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app import schemas
from app.services import order_service as order_service_module

router = APIRouter()


@router.post("/", response_model=schemas.Order, status_code=201)
async def create_order(order: schemas.OrderCreate):
    """주문 생성"""
    order_data = order.model_dump()
    created_order = await order_service_module.create_order(order_data)
    return created_order


@router.get("/", response_model=List[schemas.Order])
async def get_all_orders(
    customer_id: Optional[str] = Query(None),
    status: Optional[str] = Query(None)
):
    """모든 주문 조회"""
    filters = {"customer_id": customer_id, "status": status}
    orders = await order_service_module.get_all_orders(filters)
    return orders


@router.get("/{order_id}", response_model=schemas.Order)
async def get_order_by_id(order_id: str):
    """ID로 주문 조회"""
    order = await order_service_module.get_order_by_id(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


@router.patch("/{order_id}/status", response_model=schemas.Order)
async def update_order_status(order_id: str, status_update: schemas.OrderUpdate):
    """주문 상태 업데이트"""
    status = status_update.status.value if status_update.status else None
    if not status:
        raise HTTPException(status_code=400, detail="Status is required")
    order = await order_service_module.update_order_status(order_id, status)
    return order

